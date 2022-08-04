import { parse, stringify } from '../src';
import * as T from '../src/types';

describe('parse - core', () => {
    it('should parse a short data', () => {
        const data = '!3m1';
        const ast = parse(data);
        expect(ast.matrix[3].id).toBe(3);
        expect(ast.matrix[3].code).toBe('m');
        expect(ast.matrix[3].value).toBe('1');
    });
});

describe('stringify - core', () => {
    it('should stringify a short data', () => {
        const ast = {
            matrix: {
                '3': {
                    id: 3,
                    code: 'm' as T.ParameterCodes,
                    value: '1'
                }
            }
        };
        const data = stringify(ast);
        expect(data).toBe('!3m1');
    });
});
