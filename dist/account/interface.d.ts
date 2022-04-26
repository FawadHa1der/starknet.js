import { ProviderInterface } from '../provider';
import { SignerInterface } from '../signer';
import {
  Abi,
  AddTransactionResponse,
  Call,
  DeployContractPayload,
  EstimateFeeResponse,
  Invocation,
  InvocationsDetails,
  Signature,
} from '../types';
import { BigNumberish } from '../utils/number';
import { TypedData } from '../utils/typedData/types';
export declare abstract class AccountInterface extends ProviderInterface {
  abstract address: string;
  abstract signer: SignerInterface;
  /**
   * Deploys a given compiled contract (json) to starknet
   *
   * @param payload payload to be deployed containing:
   * - compiled contract code
   * - constructor calldata
   * - address salt
   * @param abi the abi of the contract
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  abstract deployContract(
    payload: DeployContractPayload,
    abi?: Abi
  ): Promise<AddTransactionResponse>;
  /**
   * Estimate Fee for a method on starknet
   *
   * @param invocation the invocation object containing:
   * - contractAddress - the address of the contract
   * - entrypoint - the entrypoint of the contract
   * - calldata - (defaults to []) the calldata
   * - signature - (defaults to []) the signature
   *
   * @returns response from addTransaction
   */
  abstract estimateFee(invocation: Invocation): Promise<EstimateFeeResponse>;
  /**
   * Invoke execute function in account contract
   *
   * @param transactions the invocation object or an array of them, containing:
   * - contractAddress - the address of the contract
   * - entrypoint - the entrypoint of the contract
   * - calldata - (defaults to []) the calldata
   * - signature - (defaults to []) the signature
   * @param abi (optional) the abi of the contract for better displaying
   *
   * @returns response from addTransaction
   */
  abstract execute(
    transactions: Call | Call[],
    abis?: Abi[],
    transactionsDetail?: InvocationsDetails
  ): Promise<AddTransactionResponse>;
  /**
   * Sign an JSON object for off-chain usage with the starknet private key and return the signature
   * This adds a message prefix so it cant be interchanged with transactions
   *
   * @param json - JSON object to be signed
   * @returns the signature of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  abstract signMessage(typedData: TypedData): Promise<Signature>;
  /**
   * Hash a JSON object with pederson hash and return the hash
   * This adds a message prefix so it cant be interchanged with transactions
   *
   * @param json - JSON object to be hashed
   * @returns the hash of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  abstract hashMessage(typedData: TypedData): Promise<string>;
  /**
   * Verify a signature of a JSON object
   *
   * @param json - JSON object to be verified
   * @param signature - signature of the JSON object
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the JSON object is not a valid JSON or the signature is not a valid signature
   */
  abstract verifyMessage(typedData: TypedData, signature: Signature): Promise<boolean>;
  /**
   * Verify a signature of a given hash
   * @warning This method is not recommended, use verifyMessage instead
   *
   * @param hash - hash to be verified
   * @param signature - signature of the hash
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the signature is not a valid signature
   */
  abstract verifyMessageHash(hash: BigNumberish, signature: Signature): Promise<boolean>;
  abstract getNonce(): Promise<string>;
}
