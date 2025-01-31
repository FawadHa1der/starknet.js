'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Account = void 0;
var minimalistic_assert_1 = __importDefault(require('minimalistic-assert'));
var constants_1 = require('../constants');
var provider_1 = require('../provider');
var signer_1 = require('../signer');
var ellipticCurve_1 = require('../utils/ellipticCurve');
var hash_1 = require('../utils/hash');
var number_1 = require('../utils/number');
var shortString_1 = require('../utils/shortString');
var stark_1 = require('../utils/stark');
var transaction_1 = require('../utils/transaction');
var typedData_1 = require('../utils/typedData');
var Account = /** @class */ (function (_super) {
  __extends(Account, _super);
  function Account(provider, address, keyPairOrSigner) {
    var _this = _super.call(this, provider) || this;
    _this.signer =
      'getPubKey' in keyPairOrSigner ? keyPairOrSigner : new signer_1.Signer(keyPairOrSigner);
    _this.address = address;
    return _this;
  }
  Account.prototype.getNonce = function () {
    return __awaiter(this, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.callContract({
                contractAddress: this.address,
                entrypoint: 'get_nonce',
              }),
            ];
          case 1:
            result = _a.sent().result;
            return [2 /*return*/, (0, number_1.toHex)((0, number_1.toBN)(result[0]))];
        }
      });
    });
  };
  Account.prototype.estimateFee = function (calls, _a) {
    var _b = _a === void 0 ? {} : _a,
      providedNonce = _b.nonce,
      _c = _b.blockIdentifier,
      blockIdentifier = _c === void 0 ? 'pending' : _c;
    return __awaiter(this, void 0, void 0, function () {
      var transactions, nonce, _d, version, signerDetails, signature, calldata;
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            transactions = Array.isArray(calls) ? calls : [calls];
            if (!(providedNonce !== null && providedNonce !== void 0)) return [3 /*break*/, 1];
            _d = providedNonce;
            return [3 /*break*/, 3];
          case 1:
            return [4 /*yield*/, this.getNonce()];
          case 2:
            _d = _e.sent();
            _e.label = 3;
          case 3:
            nonce = _d;
            version = (0, number_1.toBN)(hash_1.feeTransactionVersion);
            signerDetails = {
              walletAddress: this.address,
              nonce: (0, number_1.toBN)(nonce),
              maxFee: constants_1.ZERO,
              version: version,
              chainId: this.chainId,
            };
            return [4 /*yield*/, this.signer.signTransaction(transactions, signerDetails)];
          case 4:
            signature = _e.sent();
            calldata = (0, transaction_1.fromCallsToExecuteCalldataWithNonce)(transactions, nonce);
            return [
              2 /*return*/,
              this.fetchEndpoint(
                'estimate_fee',
                { blockIdentifier: blockIdentifier },
                {
                  contract_address: this.address,
                  entry_point_selector: (0, hash_1.getSelectorFromName)('__execute__'),
                  calldata: calldata,
                  version: (0, number_1.toHex)(version),
                  signature: (0, number_1.bigNumberishArrayToDecimalStringArray)(signature),
                }
              ),
            ];
        }
      });
    });
  };
  /**
   * Invoke execute function in account contract
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
   *
   * @param transaction - transaction to be invoked
   * @returns a confirmation of invoking a function on the starknet contract
   */
  Account.prototype.execute = function (calls, abis, transactionsDetail) {
    var _a;
    if (abis === void 0) {
      abis = undefined;
    }
    if (transactionsDetail === void 0) {
      transactionsDetail = {};
    }
    return __awaiter(this, void 0, void 0, function () {
      var transactions, nonce, _b, _c, maxFee, estimatedFee, signerDetails, signature, calldata;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            transactions = Array.isArray(calls) ? calls : [calls];
            _b = number_1.toBN;
            if (!((_a = transactionsDetail.nonce) !== null && _a !== void 0))
              return [3 /*break*/, 1];
            _c = _a;
            return [3 /*break*/, 3];
          case 1:
            return [4 /*yield*/, this.getNonce()];
          case 2:
            _c = _d.sent();
            _d.label = 3;
          case 3:
            nonce = _b.apply(void 0, [_c]);
            maxFee = '0';
            if (!(transactionsDetail.maxFee || transactionsDetail.maxFee === 0))
              return [3 /*break*/, 4];
            maxFee = transactionsDetail.maxFee;
            return [3 /*break*/, 6];
          case 4:
            return [4 /*yield*/, this.estimateFee(transactions, { nonce: nonce })];
          case 5:
            estimatedFee = _d.sent().amount;
            maxFee = (0, stark_1.estimatedFeeToMaxFee)(estimatedFee).toString();
            _d.label = 6;
          case 6:
            signerDetails = {
              walletAddress: this.address,
              nonce: nonce,
              maxFee: maxFee,
              version: (0, number_1.toBN)(hash_1.transactionVersion),
              chainId: this.chainId,
            };
            return [4 /*yield*/, this.signer.signTransaction(transactions, signerDetails, abis)];
          case 7:
            signature = _d.sent();
            calldata = (0, transaction_1.fromCallsToExecuteCalldataWithNonce)(transactions, nonce);
            return [
              2 /*return*/,
              this.fetchEndpoint('add_transaction', undefined, {
                type: 'INVOKE_FUNCTION',
                contract_address: this.address,
                entry_point_selector: (0, hash_1.getSelectorFromName)('__execute__'),
                calldata: calldata,
                signature: (0, number_1.bigNumberishArrayToDecimalStringArray)(signature),
                max_fee: (0, number_1.toHex)((0, number_1.toBN)(maxFee)),
              }),
            ];
        }
      });
    });
  };
  /**
   * Temporary method to allow dapps on starknet.js v2 to work with Argent X v3
   * @deprecated to remove ASAP
   */
  Account.prototype.LEGACY_addTransaction = function (transaction) {
    return __awaiter(this, void 0, void 0, function () {
      function hashMulticall(account, transactions, nonce, maxFee) {
        var hashArray = transactions
          .map(function (_a) {
            var contract_address = _a.contract_address,
              entry_point_selector = _a.entry_point_selector,
              calldata = _a.calldata;
            return [
              contract_address,
              entry_point_selector,
              (0, hash_1.computeHashOnElements)(calldata || []),
            ];
          })
          .map(number_1.bigNumberishArrayToDecimalStringArray)
          .map(hash_1.computeHashOnElements);
        return (0,
        hash_1.computeHashOnElements)([(0, shortString_1.encodeShortString)('StarkNet Transaction'), account, (0, hash_1.computeHashOnElements)(hashArray), nonce, maxFee, hash_1.transactionVersion]);
      }
      var nonceBn,
        result,
        msgHash,
        signature,
        transformCallsToMulticallArrays,
        fromCallsToExecuteCalldata2,
        calldata;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (transaction.type === 'DEPLOY') throw new Error('No DEPLOYS');
            (0,
            minimalistic_assert_1.default)(!transaction.signature, "Adding signatures to a signer transaction currently isn't supported");
            if (!transaction.nonce) return [3 /*break*/, 1];
            nonceBn = (0, number_1.toBN)(transaction.nonce);
            return [3 /*break*/, 3];
          case 1:
            return [
              4 /*yield*/,
              this.callContract({
                contractAddress: this.address,
                entrypoint: 'get_nonce',
              }),
            ];
          case 2:
            result = _a.sent().result;
            nonceBn = (0, number_1.toBN)(result[0]);
            _a.label = 3;
          case 3:
            msgHash = hashMulticall(this.address, [transaction], nonceBn.toString(), '0');
            if (!('keyPair' in this.signer)) {
              throw new Error('No keyPair');
            }
            signature = (0, ellipticCurve_1.sign)(this.signer.keyPair, msgHash);
            transformCallsToMulticallArrays = function (calls) {
              var callArray = [];
              var calldata = [];
              calls.forEach(function (call) {
                var data = call.calldata || [];
                callArray.push({
                  to: (0, number_1.toBN)(call.contract_address).toString(10),
                  selector: (0, number_1.toBN)(call.entry_point_selector).toString(10),
                  data_offset: calldata.length.toString(),
                  data_len: data.length.toString(),
                });
                calldata.push.apply(calldata, __spreadArray([], __read(data), false));
              });
              return {
                callArray: callArray,
                calldata: (0, number_1.bigNumberishArrayToDecimalStringArray)(calldata),
              };
            };
            fromCallsToExecuteCalldata2 = function (calls) {
              var _a = transformCallsToMulticallArrays(calls),
                callArray = _a.callArray,
                calldata = _a.calldata;
              return __spreadArray(
                __spreadArray(
                  __spreadArray(
                    [callArray.length.toString()],
                    __read(
                      callArray
                        .map(function (_a) {
                          var to = _a.to,
                            selector = _a.selector,
                            data_offset = _a.data_offset,
                            data_len = _a.data_len;
                          return [to, selector, data_offset, data_len];
                        })
                        .flat()
                    ),
                    false
                  ),
                  [calldata.length.toString()],
                  false
                ),
                __read(calldata),
                false
              );
            };
            calldata = __spreadArray(
              __spreadArray([], __read(fromCallsToExecuteCalldata2([transaction])), false),
              [nonceBn.toString()],
              false
            );
            return [
              2 /*return*/,
              this.fetchEndpoint('add_transaction', undefined, {
                type: 'INVOKE_FUNCTION',
                contract_address: this.address,
                entry_point_selector: (0, hash_1.getSelectorFromName)('__execute__'),
                calldata: calldata,
                signature: (0, number_1.bigNumberishArrayToDecimalStringArray)(signature),
              }),
            ];
        }
      });
    });
  };
  /**
   * Sign an JSON object with the starknet private key and return the signature
   *
   * @param json - JSON object to be signed
   * @returns the signature of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  Account.prototype.signMessage = function (typedData) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.signer.signMessage(typedData, this.address)];
      });
    });
  };
  /**
   * Hash a JSON object with pederson hash and return the hash
   *
   * @param json - JSON object to be hashed
   * @returns the hash of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  Account.prototype.hashMessage = function (typedData) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, (0, typedData_1.getMessageHash)(typedData, this.address)];
      });
    });
  };
  /**
   * Verify a signature of a given hash
   * @warning This method is not recommended, use verifyMessage instead
   *
   * @param hash - JSON object to be verified
   * @param signature - signature of the JSON object
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the JSON object is not a valid JSON or the signature is not a valid signature
   */
  Account.prototype.verifyMessageHash = function (hash, signature) {
    return __awaiter(this, void 0, void 0, function () {
      var _a;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              this.callContract({
                contractAddress: this.address,
                entrypoint: 'is_valid_signature',
                calldata: (0, stark_1.compileCalldata)({
                  hash: (0, number_1.toBN)(hash).toString(),
                  signature: signature.map(function (x) {
                    return (0, number_1.toBN)(x).toString();
                  }),
                }),
              }),
            ];
          case 1:
            _b.sent();
            return [2 /*return*/, true];
          case 2:
            _a = _b.sent();
            return [2 /*return*/, false];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Verify a signature of a JSON object
   *
   * @param hash - hash to be verified
   * @param signature - signature of the hash
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the signature is not a valid signature
   */
  Account.prototype.verifyMessage = function (typedData, signature) {
    return __awaiter(this, void 0, void 0, function () {
      var hash;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.hashMessage(typedData)];
          case 1:
            hash = _a.sent();
            return [2 /*return*/, this.verifyMessageHash(hash, signature)];
        }
      });
    });
  };
  return Account;
})(provider_1.Provider);
exports.Account = Account;
