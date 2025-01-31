'use strict';
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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.LedgerBlindSigner = void 0;
var hw_app_eth_1 = __importDefault(require('@ledgerhq/hw-app-eth'));
var hw_transport_webhid_1 = __importDefault(require('@ledgerhq/hw-transport-webhid'));
var encode_1 = require('../utils/encode');
var hash_1 = require('../utils/hash');
var transaction_1 = require('../utils/transaction');
var typedData_1 = require('../utils/typedData');
function hexZeroPad(hash, length) {
  var value = hash;
  if (value.length > 2 * length + 2) {
    throw new Error('value out of range');
  }
  while (value.length < 2 * length + 2) {
    value = '0x0' + value.substring(2);
  }
  return value;
}
var LedgerBlindSigner = /** @class */ (function () {
  function LedgerBlindSigner() {
    this.derivationPath = "/2645'/579218131'/1148870696'/0'/0'/0";
  }
  LedgerBlindSigner.prototype.getEthApp = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (!!this.transport) return [3 /*break*/, 4];
            _c.label = 1;
          case 1:
            _c.trys.push([1, 3, , 4]);
            _a = this;
            return [4 /*yield*/, hw_transport_webhid_1.default.create()];
          case 2:
            _a.transport = _c.sent();
            return [3 /*break*/, 4];
          case 3:
            _b = _c.sent();
            throw new Error('Device connection error');
          case 4:
            return [2 /*return*/, new hw_app_eth_1.default(this.transport)];
        }
      });
    });
  };
  LedgerBlindSigner.prototype.getPubKey = function () {
    return __awaiter(this, void 0, void 0, function () {
      var eth, response, starkPub;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.getEthApp()];
          case 1:
            eth = _a.sent();
            return [4 /*yield*/, eth.starkGetPublicKey(this.derivationPath)];
          case 2:
            response = _a.sent();
            starkPub = '0x' + response.slice(1, 1 + 32).toString('hex');
            return [2 /*return*/, starkPub];
        }
      });
    });
  };
  LedgerBlindSigner.prototype.signTransaction = function (transactions, transactionsDetail) {
    return __awaiter(this, void 0, void 0, function () {
      var calldata, msgHash;
      return __generator(this, function (_a) {
        calldata = (0, transaction_1.fromCallsToExecuteCalldataWithNonce)(
          transactions,
          transactionsDetail.nonce
        );
        msgHash = (0, hash_1.calculcateTransactionHash)(
          transactionsDetail.walletAddress,
          transactionsDetail.version,
          (0, hash_1.getSelectorFromName)('__execute__'),
          calldata,
          transactionsDetail.maxFee,
          transactionsDetail.chainId
        );
        return [2 /*return*/, this.sign(msgHash)];
      });
    });
  };
  LedgerBlindSigner.prototype.signMessage = function (typedData, accountAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var msgHash;
      return __generator(this, function (_a) {
        msgHash = (0, typedData_1.getMessageHash)(typedData, accountAddress);
        return [2 /*return*/, this.sign(msgHash)];
      });
    });
  };
  LedgerBlindSigner.prototype.sign = function (msgHash) {
    return __awaiter(this, void 0, void 0, function () {
      var eth, _a, r, s;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4 /*yield*/, this.getEthApp()];
          case 1:
            eth = _b.sent();
            return [4 /*yield*/, eth.starkUnsafeSign(this.derivationPath, hexZeroPad(msgHash, 32))];
          case 2:
            (_a = _b.sent()), (r = _a.r), (s = _a.s);
            return [2 /*return*/, [(0, encode_1.addHexPrefix)(r), (0, encode_1.addHexPrefix)(s)]];
        }
      });
    });
  };
  return LedgerBlindSigner;
})();
exports.LedgerBlindSigner = LedgerBlindSigner;
