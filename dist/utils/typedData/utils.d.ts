/**
 * Validates that `data` matches the EIP-712 JSON schema.
 *
 * @param {any} data
 * @return {boolean}
 */
export declare const validateTypedData: (data: unknown) => data is {
  types: {
    StarkNetDomain: {
      type: string;
      name: string;
    }[];
  } & Record<
    string,
    {
      type: string;
      name: string;
    }[]
  >;
  primaryType: string;
  domain: {
    version?: string | undefined;
    chainId?: string | number | undefined;
    name?: string | undefined;
  };
  message: Record<string, unknown>;
};
