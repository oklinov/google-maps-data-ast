<br>

![Illustration](media/banner.jpg)

<br>

    Parse and/or stringify Google Maps proprietary data type (aka !1m3 style)

`npm i google-maps-data-ast` / `yarn add google-maps-data-ast`

[![Version](https://img.shields.io/npm/v/google-maps-data-ast?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/google-maps-data-ast)
[![Downloads](https://img.shields.io/npm/dt/google-maps-data-ast.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/google-maps-data-ast)

# Get started
```ts
import { parse, stringify } from 'google-maps-data-ast';

const data = '!3m1!4b1!4m5!3m4!1s0x0:0xe665b3308d32f379!8m2!3d-37.8805676!4d145.1644849';

const ast = parse(data);
```

Abstract syntax tree for `!3m1!4b1!4m5!3m4!1s0x0:0xe665b3308d32f379!8m2!3d-37.8805676!4d145.1644849`:
```ts
[
  {
    id: 3,
    code: 'm',
    type: 'matrix',
    value: '1',
    data: 1,
    children: [ { id: 4, code: 'b', type: 'boolean', value: '1', data: true } ]
  },
  {
    id: 4,
    code: 'm',
    type: 'matrix',
    value: '5',
    data: 5,
    children: [
      {
        id: 3,
        code: 'm',
        type: 'matrix',
        value: '4',
        data: 4,
        children: [
          {
            id: 1,
            code: 's',
            type: 'string',
            value: '0x0:0xe665b3308d32f379',
            data: [ 0, 16601872622479930000 ]
          },
          {
            id: 8,
            code: 'm',
            type: 'matrix',
            value: '2',
            data: 2,
            children: [
              {
                id: 3,
                code: 'd',
                type: 'double',
                value: '-37.8805676',
                data: -37.8805676
              },
              {
                id: 4,
                code: 'd',
                type: 'double',
                value: '145.1644849',
                data: 145.1644849
              }
            ]
          }
        ]
      }
    ]
  }
]
```

```ts

const modifiedData = stringify([
  {
    code: 'b',
    type: 'boolean',
    value: '0',
    id: 1,
  },
  ...ast
])

// is now equivalent to

const modifiedData = '!1b0!3m1!4b1!4m5!3m4!1s0x0:0xe665b3308d32f379!8m2!3d-37.8805676!4d145.1644849'

```
