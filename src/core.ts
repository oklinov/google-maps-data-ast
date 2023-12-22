import * as T from './types';

const datatTypesMap: Record<T.ParameterCodes, string | undefined> = {
    m: 'matrix',
    f: 'float',
    d: 'double',
    i: 'integer',
    b: 'boolean',
    s: 'string',
    e: 'enum', // as int
    u: 'uinteger',
    x: 'hex',
    z: 'coordinates',
    v: 'timestamp',
    y: undefined,
};

export const parseStringValue = (str: string): number | string => {
    return str.startsWith('0x') ? parseInt(str.slice(2), 16) : str;
};

export const parseValue = (code: string, value: string | undefined): T.ReallyAny => {
    if (!value) {
        return undefined;
    }
    switch (code) {
        case 'm':
            return parseInt(value, 10);
        case 'f':
            return parseFloat(value);
        case 'd':
            return parseFloat(value);
        case 'i':
            return parseInt(value, 10);
        case 'b':
            return value === '1';
        case 's':
            if (value.includes(':')) {
                return value.split(':').map(parseStringValue);
            }
            return parseStringValue(value);
        case 'e':
            return parseInt(value, 10);
        case 'u':
            return parseInt(value, 10);
        case 'x':
            return parseInt(value, 16);
        case 'z':
            return value.split(',').map(parseFloat);
        case 'v':
            try {
                return new Date(parseInt(value, 10) / 1000);
            } catch (error) {
                return value;
            }
        case 'y':
            return undefined;
        default:
            return value;
    }
};

export const parseSegment = (segment: string): T.ParameterTree => {
    let id: string;
    let code: string;
    let value: string | undefined;
    if (segment === '') {
        return null;
    }

    [id, code, value] = (segment.match(/(\d+)([a-zA-Z])(.+)?/) || []).slice(1);

    // If no id, catch root type (usually a matrix)
    if (!id) {
        id = '0';
        [code, value] = (segment.match(/([a-zA-Z])(.+)/) || []).slice(1);
    }

    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
        throw new Error(`Invalid id: ${id}`);
    }
    const data = parseValue(code, value);

    return {
        id: idNum,
        code: code as T.ParameterCodes,
        type: datatTypesMap[code as T.ParameterCodes] || 'unknown',
        value,
        data,
    };
};

export const parse = (data: string, options?: { loose: boolean }): T.ParameterArray => {
    const { loose = false } = options || {};
    if (!data) return [];

    const segmentsList = decodeURIComponent(data).split('!').slice(1);

    const reduce = (segments: string[]): T.ParameterArray => {
        const children: T.ParameterArray = [];

        while (segments.length) {
            const segment = segments.shift() as string;
            const node = parseSegment(segment);

            if (node?.type === 'matrix') {
                const matrixSize = node.value && parseInt(node.value, 10);
                if (typeof matrixSize !== 'number') {
                    throw new Error(`Invalid matrix value: ${node.value}`);
                }
                if (segments.length < matrixSize - 1 && !loose) {
                    throw new Error(`Invalid matrix length: ${node.value}`);
                }
                const mappedSegments = segments.splice(0, matrixSize);
                children.push({
                    ...node,
                    children: matrixSize === 0 ? undefined : reduce(mappedSegments),
                });
            } else {
                children.push(node);
            }
        }

        return children;
    };

    return reduce(segmentsList);
};

export const stringifySegment = (segment: T.ParameterTree): string => {
    if (segment === null) {
        return '';
    }
    const { id, code, value, children } = segment;
    const segmentString = `${id}${code}${value ?? ''}`;

    if (children) {
        const mappedChildren = stringifyChildren(children);
        return [segmentString, mappedChildren].join('!');
    }

    return segmentString;
};

export const stringifyChildren = (children: T.ParameterArray): string => {
    return children.map(stringifySegment).join('!');
};

export const stringify = <T extends T.ParameterArray>(tree: T): string => {
    if (!tree) {
        throw new Error('Invalid ast input');
    }
    return `!${stringifyChildren(tree)}`;
};

export default { parse, stringify };
