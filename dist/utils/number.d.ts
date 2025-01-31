import BN from 'bn.js';
export declare type BigNumberish = string | number | BN;
export declare function isHex(hex: string): boolean;
export declare function toBN(number: BigNumberish, base?: number | 'hex'): BN;
export declare function toHex(number: BN): string;
export declare function hexToDecimalString(hex: string): string;
export declare function toFelt(num: BigNumberish): string;
export declare function assertInRange(
  input: BigNumberish,
  lowerBound: BigNumberish,
  upperBound: BigNumberish,
  inputName?: string
): void;
export declare function bigNumberishArrayToDecimalStringArray(
  rawCalldata: BigNumberish[]
): string[];
