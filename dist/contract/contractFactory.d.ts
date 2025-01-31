import { AccountInterface } from '../account';
import { ProviderInterface } from '../provider';
import { Abi, CompiledContract, RawCalldata } from '../types';
import { BigNumberish } from '../utils/number';
import { Contract } from './default';
export declare class ContractFactory {
  abi: Abi;
  compiledContract: CompiledContract;
  providerOrAccount: ProviderInterface | AccountInterface;
  constructor(
    compiledContract: CompiledContract,
    providerOrAccount?: ProviderInterface | AccountInterface,
    abi?: Abi
  );
  /**
   * Deploys contract and returns new instance of the Contract
   *
   * @param constructorCalldata - Constructor Calldata
   * @param addressSalt (optional) - Address Salt for deployment
   * @returns deployed Contract
   */
  deploy(constructorCalldata?: RawCalldata, addressSalt?: BigNumberish): Promise<Contract>;
  /**
   * Attaches to new Provider or Account
   *
   * @param providerOrAccount - new Provider or Account to attach to
   */
  connect(providerOrAccount: ProviderInterface | AccountInterface): ContractFactory;
  /**
   * Attaches current abi and provider or account to the new address
   *
   * @param address - Contract address
   * @returns Contract
   */
  attach(address: string): Contract;
}
