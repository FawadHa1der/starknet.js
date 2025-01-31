'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __read =
  (this && this.__read) ||
  function (o, n) {
    var m = typeof Symbol === 'function' && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
      r,
      ar = [],
      e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error: error };
    } finally {
      try {
        if (r && !r.done && (m = i['return'])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Provider = void 0;
var axios_1 = __importDefault(require('axios'));
var url_join_1 = __importDefault(require('url-join'));
var constants_1 = require('../constants');
var hash_1 = require('../utils/hash');
var json_1 = require('../utils/json');
var number_1 = require('../utils/number');
var stark_1 = require('../utils/stark');
var interface_1 = require('./interface');
var utils_1 = require('./utils');
function wait(delay) {
  return new Promise(function (res) {
    return setTimeout(res, delay);
  });
}
function isEmptyQueryObject(obj) {
  return (
    obj === undefined ||
    Object.keys(obj).length === 0 ||
    (Object.keys(obj).length === 1 &&
      Object.entries(obj).every(function (_a) {
        var _b = __read(_a, 2),
          k = _b[0],
          v = _b[1];
        return k === 'blockIdentifier' && v === null;
      }))
  );
}
var Provider = /** @class */ (function () {
  function Provider(optionsOrProvider) {
    if (optionsOrProvider === void 0) {
      optionsOrProvider = { network: 'goerli-alpha' };
    }
    var _a;
    if (optionsOrProvider instanceof interface_1.ProviderInterface) {
      this.baseUrl = optionsOrProvider.baseUrl;
      this.feederGatewayUrl = optionsOrProvider.feederGatewayUrl;
      this.gatewayUrl = optionsOrProvider.gatewayUrl;
      this.chainId =
        (_a = optionsOrProvider.chainId) !== null && _a !== void 0
          ? _a
          : Provider.getChainIdFromBaseUrl(optionsOrProvider.baseUrl);
    } else {
      var baseUrl =
        'baseUrl' in optionsOrProvider
          ? optionsOrProvider.baseUrl
          : Provider.getNetworkFromName(optionsOrProvider.network);
      this.baseUrl = baseUrl;
      this.chainId = Provider.getChainIdFromBaseUrl(baseUrl);
      this.feederGatewayUrl = (0, url_join_1.default)(baseUrl, 'feeder_gateway');
      this.gatewayUrl = (0, url_join_1.default)(baseUrl, 'gateway');
    }
  }
  Provider.getNetworkFromName = function (name) {
    switch (name) {
      case 'mainnet-alpha':
        return 'https://alpha-mainnet.starknet.io';
      case 'goerli-alpha':
      default:
        return 'https://alpha4.starknet.io';
    }
  };
  Provider.getChainIdFromBaseUrl = function (baseUrl) {
    try {
      var url = new URL(baseUrl);
      if (url.host.includes('mainnet.starknet.io')) {
        return constants_1.StarknetChainId.MAINNET;
      }
    } catch (_a) {
      // eslint-disable-next-line no-console
      console.error('Could not parse baseUrl: ' + baseUrl);
    }
    return constants_1.StarknetChainId.TESTNET;
  };
  Provider.prototype.getFetchUrl = function (endpoint) {
    var gatewayUrlEndpoints = ['add_transaction'];
    return gatewayUrlEndpoints.includes(endpoint) ? this.gatewayUrl : this.feederGatewayUrl;
  };
  Provider.prototype.getFetchMethod = function (endpoint) {
    var postMethodEndpoints = ['add_transaction', 'call_contract', 'estimate_fee'];
    return postMethodEndpoints.includes(endpoint) ? 'POST' : 'GET';
  };
  Provider.prototype.getQueryString = function (query) {
    if (isEmptyQueryObject(query)) {
      return '';
    }
    var queryString = Object.entries(query)
      .map(function (_a) {
        var _b = __read(_a, 2),
          key = _b[0],
          value = _b[1];
        if (key === 'blockIdentifier') {
          return '' + (0, utils_1.getFormattedBlockIdentifier)(value);
        }
        return key + '=' + value;
      })
      .join('&');
    return '?' + queryString;
  };
  Provider.prototype.getHeaders = function (method) {
    if (method === 'POST') {
      return {
        'Content-Type': 'application/json',
      };
    }
    return undefined;
  };
  // typesafe fetch
  Provider.prototype.fetchEndpoint = function (endpoint) {
    var _a;
    // typescript type magiuc to create a nice fitting function interface
    var _b = []; // when both query and request are needed, we cant omit anything
    for (
      // typescript type magiuc to create a nice fitting function interface
      var _i = 1; // when both query and request are needed, we cant omit anything
      // typescript type magiuc to create a nice fitting function interface
      _i < arguments.length; // when both query and request are needed, we cant omit anything
      // typescript type magiuc to create a nice fitting function interface
      _i++ // when both query and request are needed, we cant omit anything
    ) {
      // typescript type magiuc to create a nice fitting function interface
      _b[_i - 1] = arguments[_i]; // when both query and request are needed, we cant omit anything
    }
    // typescript type magiuc to create a nice fitting function interface
    var _c = __read(_b, 2),
      query = _c[0],
      request = _c[1]; // when both query and request are needed, we cant omit anything
    return __awaiter(this, void 0, void 0, function () {
      var baseUrl, method, queryString, headers, data, error_1, data;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            baseUrl = this.getFetchUrl(endpoint);
            method = this.getFetchMethod(endpoint);
            queryString = this.getQueryString(query);
            headers = this.getHeaders(method);
            _d.label = 1;
          case 1:
            _d.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              axios_1.default.request({
                method: method,
                url: (0, url_join_1.default)(baseUrl, endpoint, queryString),
                data: (0, json_1.stringify)(request),
                headers: headers,
              }),
            ];
          case 2:
            data = _d.sent().data;
            return [2 /*return*/, data];
          case 3:
            error_1 = _d.sent();
            data =
              (_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null ||
              _a === void 0
                ? void 0
                : _a.data;
            if (data === null || data === void 0 ? void 0 : data.message) {
              throw new Error(data.code + ': ' + data.message);
            }
            throw error_1;
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Gets the smart contract address on the goerli testnet.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15)
   * @returns starknet smart contract addresses
   */
  Provider.prototype.getContractAddresses = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.fetchEndpoint('get_contract_addresses')];
      });
    });
  };
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
  Provider.prototype.callContract = function (_a, _b) {
    var contractAddress = _a.contractAddress,
      entrypoint = _a.entrypoint,
      _c = _a.calldata,
      calldata = _c === void 0 ? [] : _c;
    var _d = _b === void 0 ? {} : _b,
      _e = _d.blockIdentifier,
      blockIdentifier = _e === void 0 ? 'pending' : _e;
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_f) {
        return [
          2 /*return*/,
          this.fetchEndpoint(
            'call_contract',
            { blockIdentifier: blockIdentifier },
            {
              signature: [],
              contract_address: contractAddress,
              entry_point_selector: (0, hash_1.getSelectorFromName)(entrypoint),
              calldata: calldata,
            }
          ),
        ];
      });
    });
  };
  /**
   * Gets the block information
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L41-L53)
   *
   * @param blockHash
   * @param blockNumber
   * @returns the block object { block_number, previous_block_number, state_root, status, timestamp, transaction_receipts, transactions }
   */
  Provider.prototype.getBlock = function (blockIdentifier) {
    if (blockIdentifier === void 0) {
      blockIdentifier = null;
    }
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          this.fetchEndpoint('get_block', { blockIdentifier: blockIdentifier }),
        ];
      });
    });
  };
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
  Provider.prototype.getCode = function (contractAddress, blockIdentifier) {
    if (blockIdentifier === void 0) {
      blockIdentifier = 'pending';
    }
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          this.fetchEndpoint('get_code', {
            blockIdentifier: blockIdentifier,
            contractAddress: contractAddress,
          }),
        ];
      });
    });
  };
  // TODO: add proper type
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
  Provider.prototype.getStorageAt = function (contractAddress, key, blockIdentifier) {
    if (blockIdentifier === void 0) {
      blockIdentifier = 'pending';
    }
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          this.fetchEndpoint('get_storage_at', {
            blockIdentifier: blockIdentifier,
            contractAddress: contractAddress,
            key: key,
          }),
        ];
      });
    });
  };
  /**
   * Gets the status of a transaction.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L48-L52)
   *
   * @param txHash
   * @returns the transaction status object { block_number, tx_status: NOT_RECEIVED | RECEIVED | PENDING | REJECTED | ACCEPTED_ONCHAIN }
   */
  Provider.prototype.getTransactionStatus = function (txHash) {
    return __awaiter(this, void 0, void 0, function () {
      var txHashHex;
      return __generator(this, function (_a) {
        txHashHex = (0, number_1.toHex)((0, number_1.toBN)(txHash));
        return [
          2 /*return*/,
          this.fetchEndpoint('get_transaction_status', { transactionHash: txHashHex }),
        ];
      });
    });
  };
  /**
   * Gets the transaction receipt from a tx hash or tx id.
   *
   * [Reference] (https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L104-L111)
   *
   * @param txHash
   * @param txId
   * @returns the transaction receipt object
   */
  Provider.prototype.getTransactionReceipt = function (_a) {
    var txHash = _a.txHash,
      txId = _a.txId;
    return __awaiter(this, void 0, void 0, function () {
      var data;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              axios_1.default.get(
                (0, url_join_1.default)(
                  this.feederGatewayUrl,
                  'get_transaction_receipt',
                  '?' + (0, utils_1.txIdentifier)(txHash, txId)
                )
              ),
            ];
          case 1:
            data = _b.sent().data;
            return [2 /*return*/, data];
        }
      });
    });
  };
  /**
   * Gets the transaction information from a tx id.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L54-L58)
   *
   * @param txHash
   * @returns the transacton object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }
   */
  Provider.prototype.getTransaction = function (txHash) {
    return __awaiter(this, void 0, void 0, function () {
      var txHashHex;
      return __generator(this, function (_a) {
        txHashHex = (0, number_1.toHex)((0, number_1.toBN)(txHash));
        return [
          2 /*return*/,
          this.fetchEndpoint('get_transaction', { transactionHash: txHashHex }),
        ];
      });
    });
  };
  /**
   * Gets the transaction trace from a tx id.
   *
   *
   * @param txHash
   * @returns the transaction trace
   */
  Provider.prototype.getTransactionTrace = function (txHash) {
    return __awaiter(this, void 0, void 0, function () {
      var txHashHex;
      return __generator(this, function (_a) {
        txHashHex = (0, number_1.toHex)((0, number_1.toBN)(txHash));
        return [
          2 /*return*/,
          this.fetchEndpoint('get_transaction_trace', { transactionHash: txHashHex }),
        ];
      });
    });
  };
  /**
   * Deploys a given compiled contract (json) to starknet
   *
   * @param contract - a json object containing the compiled contract
   * @param address - (optional, defaults to a random address) the address where the contract should be deployed (alpha)
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  Provider.prototype.deployContract = function (payload, _abi) {
    var _a, _b;
    var parsedContract =
      typeof payload.contract === 'string' ? (0, json_1.parse)(payload.contract) : payload.contract;
    var contractDefinition = __assign(__assign({}, parsedContract), {
      program: (0, stark_1.compressProgram)(parsedContract.program),
    });
    return this.fetchEndpoint('add_transaction', undefined, {
      type: 'DEPLOY',
      contract_address_salt:
        (_a = payload.addressSalt) !== null && _a !== void 0 ? _a : (0, stark_1.randomAddress)(),
      constructor_calldata: (0, number_1.bigNumberishArrayToDecimalStringArray)(
        (_b = payload.constructorCalldata) !== null && _b !== void 0 ? _b : []
      ),
      contract_definition: contractDefinition,
    });
  };
  /**
   * Invokes a function on starknet
   * @deprecated This method wont be supported as soon as fees are mandatory
   *
   * @param invocation
   * @param _abi - (optional) signature to send along
   * @returns response from addTransaction
   */
  Provider.prototype.invokeFunction = function (invocation, _abi) {
    var _a, _b;
    return this.fetchEndpoint('add_transaction', undefined, {
      type: 'INVOKE_FUNCTION',
      contract_address: invocation.contractAddress,
      entry_point_selector: (0, hash_1.getSelectorFromName)(invocation.entrypoint),
      calldata: (0, number_1.bigNumberishArrayToDecimalStringArray)(
        (_a = invocation.calldata) !== null && _a !== void 0 ? _a : []
      ),
      signature: (0, number_1.bigNumberishArrayToDecimalStringArray)(
        (_b = invocation.signature) !== null && _b !== void 0 ? _b : []
      ),
    });
  };
  Provider.prototype.waitForTransaction = function (txHash, retryInterval) {
    if (retryInterval === void 0) {
      retryInterval = 8000;
    }
    return __awaiter(this, void 0, void 0, function () {
      var onchain, res, successStates, errorStates, message, error;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            onchain = false;
            _a.label = 1;
          case 1:
            if (!!onchain) return [3 /*break*/, 4];
            // eslint-disable-next-line no-await-in-loop
            return [4 /*yield*/, wait(retryInterval)];
          case 2:
            // eslint-disable-next-line no-await-in-loop
            _a.sent();
            return [4 /*yield*/, this.getTransactionStatus(txHash)];
          case 3:
            res = _a.sent();
            successStates = ['ACCEPTED_ON_L1', 'ACCEPTED_ON_L2', 'PENDING'];
            errorStates = ['REJECTED', 'NOT_RECEIVED'];
            if (successStates.includes(res.tx_status)) {
              onchain = true;
            } else if (errorStates.includes(res.tx_status)) {
              message = res.tx_failure_reason
                ? res.tx_status +
                  ': ' +
                  res.tx_failure_reason.code +
                  '\n' +
                  res.tx_failure_reason.error_message
                : res.tx_status;
              error = new Error(message);
              error.response = res;
              throw error;
            }
            return [3 /*break*/, 1];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * @deprecated use `waitForTransaction` instead
   */
  Provider.prototype.waitForTx = function (txHash, retryInterval) {
    if (retryInterval === void 0) {
      retryInterval = 8000;
    }
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.waitForTransaction(txHash, retryInterval)];
      });
    });
  };
  return Provider;
})();
exports.Provider = Provider;
