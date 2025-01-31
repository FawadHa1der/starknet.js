/// <reference types="bn.js" />
export { IS_BROWSER } from './utils/encode';
export declare const ZERO: import('bn.js');
export declare const ONE: import('bn.js');
export declare const TWO: import('bn.js');
export declare const MASK_250: import('bn.js');
export declare const MASK_251: import('bn.js');
export declare enum StarknetChainId {
  MAINNET = '0x534e5f4d41494e',
  TESTNET = '0x534e5f474f45524c49',
}
export declare enum TransactionHashPrefix {
  DEPLOY = '0x6465706c6f79',
  INVOKE = '0x696e766f6b65',
  L1_HANDLER = '0x6c315f68616e646c6572',
}
/**
 * The following is taken from https://github.com/starkware-libs/starkex-resources/blob/master/crypto/starkware/crypto/signature/pedersen_params.json but converted to hex, because JS is very bad handling big integers by default
 * Please do not edit until the JSON changes.
 */
export declare const FIELD_PRIME =
  '800000000000011000000000000000000000000000000000000000000000001';
export declare const FIELD_GEN = '3';
export declare const FIELD_SIZE = 251;
export declare const EC_ORDER = '800000000000010FFFFFFFFFFFFFFFFB781126DCAE7B2321E66A241ADC64D2F';
export declare const ALPHA = '1';
export declare const BETA = '6F21413EFBE40DE150E596D72F7A8C5609AD26C15C915C1F4CDFCB99CEE9E89';
export declare const MAX_ECDSA_VAL =
  '800000000000000000000000000000000000000000000000000000000000000';
export declare const CONSTANT_POINTS: string[][];
