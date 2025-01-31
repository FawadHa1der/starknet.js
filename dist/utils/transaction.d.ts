import { Call, ParsedStruct } from '../types';
import { BigNumberish } from './number';
/**
 * Transforms a list of Calls, each with their own calldata, into
 * two arrays: one with the entrypoints, and one with the concatenated calldata.
 * @param calls
 * @returns
 */
export declare const transformCallsToMulticallArrays: (calls: Call[]) => {
  callArray: ParsedStruct[];
  calldata: string[];
};
/**
 * Transforms a list of calls in the full flattened calldata expected
 * by the __execute__ protocol.
 * @param calls
 * @returns
 */
export declare const fromCallsToExecuteCalldata: (calls: Call[]) => string[];
export declare const fromCallsToExecuteCalldataWithNonce: (
  calls: Call[],
  nonce: BigNumberish
) => string[];
