import BN from 'bn.js';

import { StarknetChainId, TransactionHashPrefix } from '../constants';
import { BigNumberish } from './number';
export declare const transactionVersion = 0;
export declare const feeTransactionVersion: BN;
/**
 * Function to get the starknet keccak hash from a string
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L17-L22)
 * @param value - string you want to get the starknetKeccak hash from
 * @returns starknet keccak hash as BigNumber
 */
export declare function starknetKeccak(value: string): BN;
/**
 * Function to get the hex selector from a given function name
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L25-L26)
 * @param funcName - selectors abi function name
 * @returns hex selector of given abi function name
 */
export declare function getSelectorFromName(funcName: string): string;
export declare function pedersen(input: [BigNumberish, BigNumberish]): string;
export declare function computeHashOnElements(data: BigNumberish[]): string;
export declare function calculateTransactionHashCommon(
  txHashPrefix: TransactionHashPrefix,
  version: BigNumberish,
  contractAddress: BigNumberish,
  entryPointSelector: BigNumberish,
  calldata: BigNumberish[],
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  additionalData?: BigNumberish[]
): string;
export declare function calculateDeployTransactionHash(
  contractAddress: BigNumberish,
  constructorCalldata: BigNumberish[],
  version: BigNumberish,
  chainId: StarknetChainId
): string;
export declare function calculcateTransactionHash(
  contractAddress: BigNumberish,
  version: BigNumberish,
  entryPointSelector: BigNumberish,
  calldata: BigNumberish[],
  maxFee: BigNumberish,
  chainId: StarknetChainId
): string;
