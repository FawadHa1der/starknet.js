import { Infer } from 'superstruct';
export declare const ATOMIC_TYPES: string[];
/**
 * Checks if a type is valid with the given `typedData`. The following types are valid:
 * - Atomic types: felt, felt*
 * - Reference types: struct type (e.g. SomeStruct)
 *
 * @param {Record<string, unknown>} types
 * @param {string} type
 * @return {boolean}
 */
export declare const isValidType: (types: Record<string, unknown>, type: string) => boolean;
export declare const STARKNET_TYPE: import('superstruct').Struct<
  {
    type: string;
    name: string;
  },
  {
    name: import('superstruct').Struct<string, null>;
    type: import('superstruct').Struct<string, null>;
  }
>;
/**
 * A single type, as part of a struct. The `type` field can be any of the EIP-712 supported types.
 *
 * Note that the `uint` and `int` aliases like in Solidity, and fixed point numbers are not supported by the EIP-712
 * standard.
 */
export declare type StarkNetType = Infer<typeof STARKNET_TYPE>;
export declare const STARKNET_DOMAIN_TYPE: import('superstruct').Struct<
  {
    version?: string | undefined;
    chainId?: string | number | undefined;
    name?: string | undefined;
  },
  {
    name: import('superstruct').Struct<string | undefined, null>;
    version: import('superstruct').Struct<string | undefined, null>;
    chainId: import('superstruct').Struct<string | number | undefined, null>;
  }
>;
/**
 * The EIP712 domain struct. Any of these fields are optional, but it must contain at least one field.
 */
export declare type StarkNetDomain = Infer<typeof STARKNET_DOMAIN_TYPE>;
export declare const STARKNET_TYPED_DATA_TYPE: import('superstruct').Struct<
  {
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
  },
  {
    types: import('superstruct').Struct<
      {
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
      >,
      null
    >;
    primaryType: import('superstruct').Struct<string, null>;
    domain: import('superstruct').Struct<
      {
        version?: string | undefined;
        chainId?: string | number | undefined;
        name?: string | undefined;
      },
      {
        name: import('superstruct').Struct<string | undefined, null>;
        version: import('superstruct').Struct<string | undefined, null>;
        chainId: import('superstruct').Struct<string | number | undefined, null>;
      }
    >;
    message: import('superstruct').Struct<Record<string, unknown>, null>;
  }
>;
/**
 * The complete typed data, with all the structs, domain data, primary type of the message, and the message itself.
 */
export declare type TypedData = Infer<typeof STARKNET_TYPED_DATA_TYPE>;
