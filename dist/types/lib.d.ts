import type { ec as EC } from 'elliptic';

import type { BigNumberish } from '../utils/number';
export declare type KeyPair = EC.KeyPair;
export declare type Signature = string[];
export declare type RawCalldata = BigNumberish[];
export declare type DeployContractPayload = {
  contract: CompiledContract | string;
  constructorCalldata?: RawCalldata;
  addressSalt?: BigNumberish;
};
export declare type Invocation = {
  contractAddress: string;
  entrypoint: string;
  calldata?: RawCalldata;
  signature?: Signature;
};
export declare type Call = Omit<Invocation, 'signature'>;
export declare type InvocationsDetails = {
  nonce?: BigNumberish;
  maxFee?: BigNumberish;
  version?: BigNumberish;
};
export declare type Status =
  | 'NOT_RECEIVED'
  | 'RECEIVED'
  | 'PENDING'
  | 'ACCEPTED_ON_L2'
  | 'ACCEPTED_ON_L1'
  | 'REJECTED';
export declare type TransactionStatus = 'TRANSACTION_RECEIVED';
export declare type Type = 'DEPLOY' | 'INVOKE_FUNCTION';
export declare type EntryPointType = 'EXTERNAL';
export declare type CompressedProgram = string;
export declare type AbiEntry = {
  name: string;
  type: 'felt' | 'felt*' | string;
};
export declare type FunctionAbi = {
  inputs: AbiEntry[];
  name: string;
  outputs: AbiEntry[];
  stateMutability?: 'view';
  type: 'function' | 'constructor';
};
export declare type StructAbi = {
  members: (AbiEntry & {
    offset: number;
  })[];
  name: string;
  size: number;
  type: 'struct';
};
export declare type Abi = Array<FunctionAbi | StructAbi>;
export declare type EntryPointsByType = object;
export declare type Program = Record<any, any>;
export declare type BlockNumber = 'pending' | null | number;
export declare type CompiledContract = {
  abi: Abi;
  entry_points_by_type: EntryPointsByType;
  program: Program;
};
export declare type CompressedCompiledContract = Omit<CompiledContract, 'program'> & {
  program: CompressedProgram;
};
export declare type Struct = {
  type: 'struct';
  [k: string]: BigNumberish;
};
export declare type Args = {
  [inputName: string]: BigNumberish | BigNumberish[] | ParsedStruct | ParsedStruct[];
};
export declare type ParsedStruct = {
  [key: string]: BigNumberish | ParsedStruct;
};
