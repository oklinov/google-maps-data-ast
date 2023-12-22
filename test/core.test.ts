import { parse, stringify } from '../src';
import * as T from '../src/types';

describe('parse - core', () => {
    it('should parse a short data', () => {
        const data = '!3m1';
        const ast = parse(data);
        expect(ast[0]?.id).toBe(3);
        expect(ast[0]?.code).toBe('m');
        expect(ast[0]?.value).toBe('1');
    });
});

describe('stringify - core', () => {
    it('should stringify a short data', () => {
        const ast = [
            {
                id: 3,
                code: 'm' as T.ParameterCodes,
                value: '1',
            },
        ];
        const data = stringify(ast);
        expect(data).toBe('!3m1');
    });
});

describe('complex', () => {
    it('empty', () => {
        const data = '!1m3!1s!!2s';
        const ast = parse(data);
        const str = stringify(ast);
        expect(str).toEqual(data);
    });

    it('identity reviews pb', () => {
        // eslint-disable-next-line max-len
        const data = '!1m7!1s0x471295dd10df804d:0x176ef4820c7242ca!3s!6m4!4m1!1e1!4m1!1e3!2m2!1i10!2s!3e1!5m2!1sIkxFZfbpCt6I9u8P8a6FsAs!7e81!8m5!1b1!2b1!3b1!5b1!7b1!11m6!1e3!2e1!3scs!4scz!6m1!1i2';
        const ast = parse(data);
        const str = stringify(ast);
        expect(str).toEqual(data);
    });

    it('identity search this area pb', () => {
        // eslint-disable-next-line max-len
        const data = '!4m9!1m3!1d52343.383099669605!2d16.573581392499968!3d49.2136566140731!2m0!3m2!1i1198!2i964!4f13.1!7i20!8i100!10b1!12m34!1m1!18b1!2m3!5m1!6e2!20e3!6m16!4b1!49b1!63m0!73m0!74i150000!75b1!85b1!89b1!91b1!110m0!114b1!149b1!170i6!176f8!179f90!183m0!10b1!12b1!13b1!14b1!16b1!17m1!3e1!20m3!5e2!6b1!14b1!19m4!2m3!1i360!2i120!4i8!20m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m42!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!2b1!4b1!9b0!22m2!1sAkhFZbCEFaWD9u8Pvf2_2AI!7e81!24m90!1m26!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m15!3b1!4b1!5b1!6b1!13b1!14b1!15b1!17b1!21b1!22b0!25b1!27m1!1b0!28b0!31b0!2b1!5m5!2b1!5b1!6b1!7b1!10b1!10m1!8e3!11m1!3e1!14m1!3b1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!29b1!30m1!2b1!36b1!39m3!2m2!2i1!3i1!43b1!52b1!55b1!56m2!1b1!3b1!65m5!3m4!1m3!1m2!1i224!2i298!71b1!72m17!1m5!1b1!2b1!3b1!5b1!7b1!4b1!8m8!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_reviews!9b1!89b1!103b1!113b1!117b1!26m4!2m3!1i80!2i92!4i8!30m28!1m6!1m2!1i0!2i0!2m2!1i530!2i964!1m6!1m2!1i1148!2i0!2m2!1i1198!2i964!1m6!1m2!1i0!2i0!2m2!1i1198!2i20!1m6!1m2!1i0!2i944!2m2!1i1198!2i964!31b1!34m19!2b1!3b1!4b1!6b1!7b1!8m6!1b1!3b1!4b1!5b1!6b1!7b1!9b1!12b1!14b1!20b1!23b1!25b1!26b1!37m1!1e81!42b1!46m1!1e9!47m0!49m7!3b1!6m2!1b1!2b1!7m2!1e3!2b1!50m43!1m39!2m7!1u3!4zT3RldsWZZW7DqQ!5e1!9s0ahUKEwjiqa7vxqiCAxX0hv0HHfIzASMQ_KkBCI8HKBY!10m2!3m1!1e1!2m7!1u2!4zTmVqbMOpcGUgaG9kbm9jZW7DqQ!5e1!9s0ahUKEwjiqa7vxqiCAxX0hv0HHfIzASMQ_KkBCJAHKBc!10m2!2m1!1e1!2m7!1u1!4zTGV2bsOp!5e1!9s0ahUKEwjiqa7vxqiCAxX0hv0HHfIzASMQ_KkBCJEHKBg!10m2!1m1!1e1!2m7!1u1!4zTHV4dXNuw60!5e1!9s0ahUKEwjiqa7vxqiCAxX0hv0HHfIzASMQ_KkBCJIHKBk!10m2!1m1!1e2!3m1!1u3!3m1!1u2!3m1!1u1!4BIAE!2e2!3m1!3b1!59BQ2dBd0Fn!67m3!7b1!10b1!14b0!69i669';
        const ast = parse(data);
        const str = stringify(ast);
        expect(str).toEqual(data);
    });
});
