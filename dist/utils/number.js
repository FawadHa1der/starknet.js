'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.bigNumberishArrayToDecimalStringArray =
  exports.assertInRange =
  exports.toFelt =
  exports.hexToDecimalString =
  exports.toHex =
  exports.toBN =
  exports.isHex =
    void 0;
var bn_js_1 = __importStar(require('bn.js'));
var minimalistic_assert_1 = __importDefault(require('minimalistic-assert'));
var encode_1 = require('./encode');
function isHex(hex) {
  return hex.startsWith('0x');
}
exports.isHex = isHex;
function toBN(number, base) {
  if (typeof number === 'string' && isHex(number) && !base)
    return new bn_js_1.default((0, encode_1.removeHexPrefix)(number), 'hex');
  return new bn_js_1.default(number, base);
}
exports.toBN = toBN;
function toHex(number) {
  return (0, encode_1.addHexPrefix)(number.toString('hex'));
}
exports.toHex = toHex;
function hexToDecimalString(hex) {
  return toBN('0x' + hex.replace(/^0x/, '')).toString();
}
exports.hexToDecimalString = hexToDecimalString;
function toFelt(num) {
  if ((0, bn_js_1.isBN)(num)) {
    return num.toString();
  }
  return toBN(num).toString();
}
exports.toFelt = toFelt;
/*
 Asserts input is equal to or greater then lowerBound and lower then upperBound.
 Assert message specifies inputName.
 input, lowerBound, and upperBound should be of type BN.
 inputName should be a string.
*/
function assertInRange(input, lowerBound, upperBound, inputName) {
  if (inputName === void 0) {
    inputName = '';
  }
  var messageSuffix = inputName === '' ? 'invalid length' : 'invalid ' + inputName + ' length';
  var inputBn = toBN(input);
  (0, minimalistic_assert_1.default)(
    inputBn.gte(toBN(lowerBound)) && inputBn.lt(toBN(upperBound)),
    'Message not signable, ' + messageSuffix + '.'
  );
}
exports.assertInRange = assertInRange;
function bigNumberishArrayToDecimalStringArray(rawCalldata) {
  return rawCalldata.map(function (x) {
    return toBN(x).toString(10);
  });
}
exports.bigNumberishArrayToDecimalStringArray = bigNumberishArrayToDecimalStringArray;
