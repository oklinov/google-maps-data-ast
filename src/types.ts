export type ParameterCodes = 'm' | 'f' | 'd' | 'i' | 'b' | 's' | 'e' | 'u' | 'x' | 'z' | 'v' | 'y';
export type ParameterType = string;
export type ParameterId = string | number;

/* export type ParameterTreeChildrenKeyValues = Record<ParameterId, ParameterTree>;
export type ParameterTreeChildren = Record<ParameterType, ParameterTreeChildrenKeyValues>;
export type ParameterTreeRoot = ParameterTreeChildren; */
export type ParameterArray = ParameterTree[]

export type ParameterTree = null | {
    id: number,
    code: ParameterCodes,
    type?: string,
    value: string | undefined,
    data?: ReallyAny,
    children?: ParameterArray
    changed?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReallyAny =
    | boolean
    | number
    | string
    | undefined
    | string[]
    | number[]
    | (string | number)[]
    | Date
