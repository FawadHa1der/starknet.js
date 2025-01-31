import { BigNumberish } from '../number';
import { TypedData } from './types';
export * from './types';
/**
 * Get the dependencies of a struct type. If a struct has the same dependency multiple times, it's only included once
 * in the resulting array.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @param {string[]} [dependencies]
 * @return {string[]}
 */
export declare const getDependencies: (
  typedData: TypedData,
  type: string,
  dependencies?: string[]
) => string[];
/**
 * Encode a type to a string. All dependant types are alphabetically sorted.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @return {string}
 */
export declare const encodeType: (typedData: TypedData, type: string) => string;
/**
 * Get a type string as hash.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @return {string}
 */
export declare const getTypeHash: (typedData: TypedData, type: string) => string;
/**
 * Encode the data to an ABI encoded Buffer. The data should be a key -> value object with all the required values. All
 * dependant types are automatically encoded.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @param {Record<string, any>} data
 */
export declare const encodeData: <
  T extends {
    types: {
      StarkNetDomain: {
        type: string;
        name: string;
      }[];
    } & Record<
      string,
      {
        type: string;
        name: string;
      }[]
    >;
    primaryType: string;
    domain: {
      version?: string | undefined;
      chainId?: string | number | undefined;
      name?: string | undefined;
    };
    message: Record<string, unknown>;
  }
>(
  typedData: T,
  type: string,
  data: T['message']
) => string[][];
/**
 * Get encoded data as a hash. The data should be a key -> value object with all the required values. All dependant
 * types are automatically encoded.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @param {Record<string, any>} data
 * @return {Buffer}
 */
export declare const getStructHash: <
  T extends {
    types: {
      StarkNetDomain: {
        type: string;
        name: string;
      }[];
    } & Record<
      string,
      {
        type: string;
        name: string;
      }[]
    >;
    primaryType: string;
    domain: {
      version?: string | undefined;
      chainId?: string | number | undefined;
      name?: string | undefined;
    };
    message: Record<string, unknown>;
  }
>(
  typedData: T,
  type: string,
  data: T['message']
) => string;
/**
 * Get the EIP-191 encoded message to sign, from the typedData object. If `hash` is enabled, the message will be hashed
 * with Keccak256.
 *
 * @param {TypedData} typedData
 * @param {BigNumberish} account
 * @return {string}
 */
export declare const getMessageHash: (typedData: TypedData, account: BigNumberish) => string;
