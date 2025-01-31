import { Abi, Invocation, InvocationsSignerDetails, KeyPair, Signature } from '../types';
import { TypedData } from '../utils/typedData';
import { SignerInterface } from './interface';
export declare class Signer implements SignerInterface {
  protected keyPair: KeyPair;
  constructor(keyPair: KeyPair);
  getPubKey(): Promise<string>;
  signTransaction(
    transactions: Invocation[],
    transactionsDetail: InvocationsSignerDetails,
    abis?: Abi[]
  ): Promise<Signature>;
  signMessage(typedData: TypedData, accountAddress: string): Promise<Signature>;
}
