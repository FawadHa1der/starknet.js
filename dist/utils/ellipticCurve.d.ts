import { ec as EC } from 'elliptic';

import { KeyPair, Signature } from '../types';
import { BigNumberish } from './number';
export declare const ec: EC;
export declare const genKeyPair: (options?: EC.GenKeyPairOptions | undefined) => EC.KeyPair;
export declare function getKeyPair(pk: BigNumberish): KeyPair;
export declare function getStarkKey(keyPair: KeyPair): string;
/**
 * Takes a public key and casts it into `elliptic` KeyPair format.
 *
 * @param publicKey - public key which should get casted to a KeyPair
 * @returns keyPair with public key only, which can be used to verify signatures, but cant sign anything
 */
export declare function getKeyPairFromPublicKey(publicKey: BigNumberish): KeyPair;
export declare function sign(keyPair: KeyPair, msgHash: string): Signature;
export declare function verify(
  keyPair: KeyPair | KeyPair[],
  msgHash: string,
  sig: Signature
): boolean;
