import { Provider, ProviderInterface } from '../provider';
import { BlockIdentifier } from '../provider/utils';
import { SignerInterface } from '../signer';
import {
  Abi,
  AddTransactionResponse,
  Call,
  EstimateFeeResponse,
  InvocationsDetails,
  KeyPair,
  Signature,
  Transaction,
} from '../types';
import { BigNumberish } from '../utils/number';
import { TypedData } from '../utils/typedData';
import { AccountInterface } from './interface';
export declare class Account extends Provider implements AccountInterface {
  address: string;
  signer: SignerInterface;
  constructor(
    provider: ProviderInterface,
    address: string,
    keyPairOrSigner: KeyPair | SignerInterface
  );
  getNonce(): Promise<string>;
  estimateFee(
    calls: Call | Call[],
    {
      nonce: providedNonce,
      blockIdentifier,
    }?: {
      nonce?: BigNumberish;
      blockIdentifier?: BlockIdentifier;
    }
  ): Promise<EstimateFeeResponse>;
  /**
   * Invoke execute function in account contract
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
   *
   * @param transaction - transaction to be invoked
   * @returns a confirmation of invoking a function on the starknet contract
   */
  execute(
    calls: Call | Call[],
    abis?: Abi[] | undefined,
    transactionsDetail?: InvocationsDetails
  ): Promise<AddTransactionResponse>;
  /**
   * Temporary method to allow dapps on starknet.js v2 to work with Argent X v3
   * @deprecated to remove ASAP
   */
  LEGACY_addTransaction(transaction: Transaction): Promise<AddTransactionResponse>;
  /**
   * Sign an JSON object with the starknet private key and return the signature
   *
   * @param json - JSON object to be signed
   * @returns the signature of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  signMessage(typedData: TypedData): Promise<Signature>;
  /**
   * Hash a JSON object with pederson hash and return the hash
   *
   * @param json - JSON object to be hashed
   * @returns the hash of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  hashMessage(typedData: TypedData): Promise<string>;
  /**
   * Verify a signature of a given hash
   * @warning This method is not recommended, use verifyMessage instead
   *
   * @param hash - JSON object to be verified
   * @param signature - signature of the JSON object
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the JSON object is not a valid JSON or the signature is not a valid signature
   */
  verifyMessageHash(hash: BigNumberish, signature: Signature): Promise<boolean>;
  /**
   * Verify a signature of a JSON object
   *
   * @param hash - hash to be verified
   * @param signature - signature of the hash
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the signature is not a valid signature
   */
  verifyMessage(typedData: TypedData, signature: Signature): Promise<boolean>;
}
