export type ParameterCodes = 'm' | 'f' | 'd' | 'i' | 'b' | 's' | 'e' | 'u' | 'x' | 'z' | 'v' | 'y';
export type ParameterType = string;
export type ParameterId = string | number;

export type ParameterTreeChildrenKeyValues = Record<ParameterId, ParameterTree>;
export type ParameterTreeChildren = Record<ParameterType, ParameterTreeChildrenKeyValues>;
export type ParameterTreeRoot = ParameterTreeChildren;

export type ParameterTree = {
  id: number,
  code: ParameterCodes,
  type?: string,
  value: string,
  data?: ReallyAny,
  children?: ParameterTreeChildren
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReallyAny = any;
