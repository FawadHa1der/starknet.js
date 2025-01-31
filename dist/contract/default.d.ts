import { AccountInterface } from '../account';
import { ProviderInterface } from '../provider';
import { BlockIdentifier } from '../provider/utils';
import {
  Abi,
  AbiEntry,
  AddTransactionResponse,
  Args,
  AsyncContractFunction,
  Calldata,
  ContractFunction,
  Invocation,
  Overrides,
  ParsedStruct,
  Result,
  StructAbi,
} from '../types';
import { BigNumberish } from '../utils/number';
import { ContractInterface } from './interface';
export declare class Contract implements ContractInterface {
  abi: Abi;
  address: string;
  providerOrAccount: ProviderInterface | AccountInterface;
  deployTransactionHash?: string;
  protected readonly structs: {
    [name: string]: StructAbi;
  };
  readonly functions: {
    [name: string]: AsyncContractFunction;
  };
  readonly callStatic: {
    [name: string]: AsyncContractFunction;
  };
  readonly populateTransaction: {
    [name: string]: ContractFunction;
  };
  readonly estimateFee: {
    [name: string]: ContractFunction;
  };
  readonly [key: string]: AsyncContractFunction | any;
  /**
   * Contract class to handle contract methods
   *
   * @param abi - Abi of the contract object
   * @param address (optional) - address to connect to
   * @param providerOrAccount (optional) - Provider or Account to attach to
   */
  constructor(abi: Abi, address: string, providerOrAccount?: ProviderInterface | AccountInterface);
  /**
   * Saves the address of the contract deployed on network that will be used for interaction
   *
   * @param address - address of the contract
   */
  attach(address: string): void;
  /**
   * Attaches to new Provider or Account
   *
   * @param providerOrAccount - new Provider or Account to attach to
   */
  connect(providerOrAccount: ProviderInterface | AccountInterface): void;
  /**
   * Resolves when contract is deployed on the network or when no deployment transaction is found
   *
   * @returns Promise that resolves when contract is deployed on the network or when no deployment transaction is found
   * @throws When deployment fails
   */
  deployed(): Promise<Contract>;
  /**
   * Validates if all arguments that are passed to the method are corresponding to the ones in the abi
   *
   * @param type - type of the method
   * @param method  - name of the method
   * @param args - arguments that are passed to the method
   */
  protected validateMethodAndArgs(type: 'INVOKE' | 'CALL', method: string, args?: Array<any>): void;
  /**
   * Deep parse of the object that has been passed to the method
   *
   * @param struct - struct that needs to be calculated
   * @return {number} - number of members for the given struct
   */
  private calculateStructMembers;
  /**
   * Deep parse of the object that has been passed to the method
   *
   * @param element - element that needs to be parsed
   * @param type  - name of the method
   * @return {string | string[]} - parsed arguments in format that contract is expecting
   */
  protected parseCalldataValue(
    element: ParsedStruct | BigNumberish | BigNumberish[],
    type: string
  ): string | string[];
  /**
   * Parse of the response elements that are converted to Object (Struct) by using the abi
   *
   * @param responseIterator - iterator of the response
   * @param type - type of the struct
   * @return {BigNumberish | ParsedStruct} - parsed arguments in format that contract is expecting
   */
  protected parseResponseStruct(
    responseIterator: Iterator<string>,
    type: string
  ): BigNumberish | ParsedStruct;
  /**
   * Parse one field of the calldata by using input field from the abi for that method
   *
   * @param args - value of the field
   * @param input  - input(field) information from the abi that will be used to parse the data
   * @return {string | string[]} - parsed arguments in format that contract is expecting
   */
  protected parseCalldataField(argsIterator: Iterator<any>, input: AbiEntry): string | string[];
  /**
   * Parse the calldata by using input fields from the abi for that method
   *
   * @param args - arguments passed the the method
   * @param inputs  - list of inputs(fields) that are in the abi
   * @return {Calldata} - parsed arguments in format that contract is expecting
   */
  protected compileCalldata(args: Array<any>, inputs: AbiEntry[]): Calldata;
  /**
   * Parse elements of the response and structuring them into one field by using output property from the abi for that method
   *
   * @param responseIterator - iterator of the response
   * @param output  - output(field) information from the abi that will be used to parse the data
   * @return - parsed response corresponding to the abi structure of the field
   */
  protected parseResponseField(
    responseIterator: Iterator<string>,
    output: AbiEntry,
    parsedResult?: Args
  ): any;
  /**
   * Parse elements of the response array and structuring them into response object
   *
   * @param method - method name
   * @param response  - response from the method
   * @return - parsed response corresponding to the abi
   */
  protected parseResponse(method: string, response: string[]): Result;
  invoke(method: string, args?: Array<any>, options?: Overrides): Promise<AddTransactionResponse>;
  call(
    method: string,
    args?: Array<any>,
    {
      blockIdentifier,
    }?: {
      blockIdentifier?: BlockIdentifier;
    }
  ): Promise<Result>;
  estimate(method: string, args?: Array<any>): Promise<import('../types').EstimateFeeResponse>;
  populate(method: string, args?: Array<any>): Invocation;
}
