import { StarknetChainId } from '../constants';
import {
  Abi,
  AddTransactionResponse,
  Call,
  CallContractResponse,
  DeployContractPayload,
  Endpoints,
  GetBlockResponse,
  GetCodeResponse,
  GetContractAddressesResponse,
  GetTransactionResponse,
  GetTransactionStatusResponse,
  GetTransactionTraceResponse,
  Invocation,
  TransactionReceipt,
} from '../types';
import { BigNumberish } from '../utils/number';
import { ProviderInterface } from './interface';
import { BlockIdentifier } from './utils';
declare type NetworkName = 'mainnet-alpha' | 'goerli-alpha';
declare type ProviderOptions =
  | {
      network: NetworkName;
    }
  | {
      baseUrl: string;
    };
export declare class Provider implements ProviderInterface {
  baseUrl: string;
  feederGatewayUrl: string;
  gatewayUrl: string;
  chainId: StarknetChainId;
  constructor(optionsOrProvider?: ProviderOptions | ProviderInterface);
  protected static getNetworkFromName(
    name: NetworkName
  ): 'https://alpha-mainnet.starknet.io' | 'https://alpha4.starknet.io';
  protected static getChainIdFromBaseUrl(baseUrl: string): StarknetChainId;
  private getFetchUrl;
  private getFetchMethod;
  private getQueryString;
  private getHeaders;
  protected fetchEndpoint<T extends keyof Endpoints>(
    endpoint: T,
    ...[query, request]: Endpoints[T]['QUERY'] extends never
      ? Endpoints[T]['REQUEST'] extends never
        ? []
        : [undefined, Endpoints[T]['REQUEST']]
      : Endpoints[T]['REQUEST'] extends never
      ? [Endpoints[T]['QUERY']]
      : [Endpoints[T]['QUERY'], Endpoints[T]['REQUEST']]
  ): Promise<Endpoints[T]['RESPONSE']>;
  /**
   * Gets the smart contract address on the goerli testnet.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15)
   * @returns starknet smart contract addresses
   */
  getContractAddresses(): Promise<GetContractAddressesResponse>;
  /**
   * Calls a function on the StarkNet contract.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L25-L39)
   *
   * @param invokeTransaction - transaction to be invoked
   * @param blockHash
   * @param blockNumber
   * @returns the result of the function on the smart contract.
   */
  callContract(
    { contractAddress, entrypoint, calldata }: Call,
    {
      blockIdentifier,
    }?: {
      blockIdentifier?: BlockIdentifier;
    }
  ): Promise<CallContractResponse>;
  /**
   * Gets the block information
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L41-L53)
   *
   * @param blockHash
   * @param blockNumber
   * @returns the block object { block_number, previous_block_number, state_root, status, timestamp, transaction_receipts, transactions }
   */
  getBlock(blockIdentifier?: BlockIdentifier): Promise<GetBlockResponse>;
  /**
   * Gets the code of the deployed contract.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L55-L68)
   *
   * @param contractAddress
   * @param blockHash
   * @param blockNumber
   * @returns Bytecode and ABI of compiled contract
   */
  getCode(contractAddress: string, blockIdentifier?: BlockIdentifier): Promise<GetCodeResponse>;
  /**
   * Gets the contract's storage variable at a specific key.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L70-L85)
   *
   * @param contractAddress
   * @param key - from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP)
   * @param blockHash
   * @param blockNumber
   * @returns the value of the storage variable
   */
  getStorageAt(
    contractAddress: string,
    key: number,
    blockIdentifier?: BlockIdentifier
  ): Promise<object>;
  /**
   * Gets the status of a transaction.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L48-L52)
   *
   * @param txHash
   * @returns the transaction status object { block_number, tx_status: NOT_RECEIVED | RECEIVED | PENDING | REJECTED | ACCEPTED_ONCHAIN }
   */
  getTransactionStatus(txHash: BigNumberish): Promise<GetTransactionStatusResponse>;
  /**
   * Gets the transaction receipt from a tx hash or tx id.
   *
   * [Reference] (https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L104-L111)
   *
   * @param txHash
   * @param txId
   * @returns the transaction receipt object
   */
  getTransactionReceipt({
    txHash,
    txId,
  }: {
    txHash?: BigNumberish;
    txId?: BigNumberish;
  }): Promise<TransactionReceipt>;
  /**
   * Gets the transaction information from a tx id.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L54-L58)
   *
   * @param txHash
   * @returns the transacton object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }
   */
  getTransaction(txHash: BigNumberish): Promise<GetTransactionResponse>;
  /**
   * Gets the transaction trace from a tx id.
   *
   *
   * @param txHash
   * @returns the transaction trace
   */
  getTransactionTrace(txHash: BigNumberish): Promise<GetTransactionTraceResponse>;
  /**
   * Deploys a given compiled contract (json) to starknet
   *
   * @param contract - a json object containing the compiled contract
   * @param address - (optional, defaults to a random address) the address where the contract should be deployed (alpha)
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  deployContract(payload: DeployContractPayload, _abi?: Abi): Promise<AddTransactionResponse>;
  /**
   * Invokes a function on starknet
   * @deprecated This method wont be supported as soon as fees are mandatory
   *
   * @param invocation
   * @param _abi - (optional) signature to send along
   * @returns response from addTransaction
   */
  invokeFunction(invocation: Invocation, _abi?: Abi): Promise<AddTransactionResponse>;
  waitForTransaction(txHash: BigNumberish, retryInterval?: number): Promise<void>;
  /**
   * @deprecated use `waitForTransaction` instead
   */
  waitForTx(txHash: BigNumberish, retryInterval?: number): Promise<void>;
}
export {};
