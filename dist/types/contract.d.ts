export declare type AsyncContractFunction<T = any> = (...args: Array<any>) => Promise<T>;
export declare type ContractFunction = (...args: Array<any>) => any;
export interface Result extends Array<any> {
  [key: string]: any;
}
