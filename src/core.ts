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

export const parseStringValue = (str: string): T.ReallyAny => {
    if (str.startsWith('0x')) return parseInt(str.slice(2), 16);
    return str;
};

export const parseValue = (code: T.ParameterCodes, value: string) => {
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
            if (value.includes(':')) return value.split(':').map(parseStringValue);
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

export const parseSegment = (segment: string): { id: number, code: T.ParameterCodes, type: string, value: string } => {
    let id: string; let code: string; let
        value: any;

    ([id, code, value] = (segment.match(/(\d+)(\w)(.+)/) || []).slice(1));

    // If no id, catch root type (usually a matrix)
    if (!id) {
        id = '0';
        ([code, value] = (segment.match(/(\w)(.+)/) || []).slice(1));
    }

    if (Number.isNaN(parseInt(id, 10))) {
        throw new Error(`Invalid id: ${id}`);
    }

    return {
        id: parseInt(id, 10),
        code: code as T.ParameterCodes,
        type: datatTypesMap[code as T.ParameterCodes] || 'unknown',
        value,
    };
};

export const parse = (data: string, options?: { loose: boolean }): T.ParameterTreeRoot => {
    const { loose = false } = options || {};

    const segmentsList = decodeURIComponent(data).split('!').filter(Boolean);

    const reduce = (segments: string[]): T.ParameterTreeChildren => {
        const children = {} as T.ParameterTreeChildren;

        while (segments.length) {
            const segment = segments.shift() as string;
            const { id, code, type, value } = parseSegment(segment);
            if (!children[type]) children[type] = {};

            children[type][id] = {
                id,
                code,
                type,
                value,
                data: parseValue(code, value),
            };

            if (type === 'matrix') {
                if (segments.length < (parseInt(value, 10) - 1) && !loose) {
                    throw new Error(`Invalid matrix length: ${value}`);
                }
                const mappedSegments = segments.splice(0, parseInt(value, 10));
                children[type][id].children = reduce(mappedSegments);
            }
        }

        return children;
    };

    return reduce(segmentsList);
};

export const stringifySegment = (segment: T.ParameterTree): string => {
    const { id, code, value, children } = segment;
    const segmentString = `${id}${code}${value}`;

    if (children) {
        const mappedChildren = stringifyChildren(children);
        return [segmentString, mappedChildren].join('!');
    }

    return segmentString;
};

export const stringifyChildren = (children: T.ParameterTreeChildren): string => {
    return Object.values(children)
        .flatMap(
            (typeKeyValues: T.ParameterTreeChildrenKeyValues) => Object.values(typeKeyValues)
                .map(stringifySegment),
        )
        .join('!');
};

export const stringify = <T extends T.ParameterTreeRoot>(tree: T): string => {
    return `!${stringifyChildren(tree)}`;
};

export default { parse, stringify };
