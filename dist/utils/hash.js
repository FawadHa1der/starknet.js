'use strict';
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
exports.calculcateTransactionHash =
  exports.calculateDeployTransactionHash =
  exports.calculateTransactionHashCommon =
  exports.computeHashOnElements =
  exports.pedersen =
  exports.getSelectorFromName =
  exports.starknetKeccak =
  exports.feeTransactionVersion =
  exports.transactionVersion =
    void 0;
var keccak_1 = require('ethereum-cryptography/keccak');
var minimalistic_assert_1 = __importDefault(require('minimalistic-assert'));
var constants_1 = require('../constants');
var ellipticCurve_1 = require('./ellipticCurve');
var encode_1 = require('./encode');
var number_1 = require('./number');
exports.transactionVersion = 0;
exports.feeTransactionVersion = (0, number_1.toBN)(2)
  .pow((0, number_1.toBN)(128))
  .add((0, number_1.toBN)(exports.transactionVersion));
function keccakHex(value) {
  return (0, encode_1.addHexPrefix)(
    (0, encode_1.buf2hex)((0, keccak_1.keccak256)((0, encode_1.utf8ToArray)(value)))
  );
}
/**
 * Function to get the starknet keccak hash from a string
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L17-L22)
 * @param value - string you want to get the starknetKeccak hash from
 * @returns starknet keccak hash as BigNumber
 */
function starknetKeccak(value) {
  return (0, number_1.toBN)(keccakHex(value)).and(constants_1.MASK_250);
}
exports.starknetKeccak = starknetKeccak;
/**
 * Function to get the hex selector from a given function name
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L25-L26)
 * @param funcName - selectors abi function name
 * @returns hex selector of given abi function name
 */
function getSelectorFromName(funcName) {
  // sometimes BigInteger pads the hex string with zeros, which isnt allowed in the starknet api
  return (0, number_1.toHex)(starknetKeccak(funcName));
}
exports.getSelectorFromName = getSelectorFromName;
var constantPoints = constants_1.CONSTANT_POINTS.map(function (coords) {
  return ellipticCurve_1.ec.curve.point(coords[0], coords[1]);
});
function pedersen(input) {
  var point = constantPoints[0];
  for (var i = 0; i < input.length; i += 1) {
    var x = (0, number_1.toBN)(input[i]);
    (0, minimalistic_assert_1.default)(
      x.gte(constants_1.ZERO) &&
        x.lt((0, number_1.toBN)((0, encode_1.addHexPrefix)(constants_1.FIELD_PRIME))),
      'Invalid input: ' + input[i]
    );
    for (var j = 0; j < 252; j += 1) {
      var pt = constantPoints[2 + i * 252 + j];
      (0, minimalistic_assert_1.default)(!point.getX().eq(pt.getX()));
      if (x.and(constants_1.ONE).toNumber() !== 0) {
        point = point.add(pt);
      }
      x = x.shrn(1);
    }
  }
  return (0, encode_1.addHexPrefix)(point.getX().toString(16));
}
exports.pedersen = pedersen;
function computeHashOnElements(data) {
  return __spreadArray(__spreadArray([], __read(data), false), [data.length], false)
    .reduce(function (x, y) {
      return pedersen([x, y]);
    }, 0)
    .toString();
}
exports.computeHashOnElements = computeHashOnElements;
// following implementation is based on this python implementation:
// https://github.com/starkware-libs/cairo-lang/blob/b614d1867c64f3fb2cf4a4879348cfcf87c3a5a7/src/starkware/starknet/core/os/transaction_hash/transaction_hash.py
function calculateTransactionHashCommon(
  txHashPrefix,
  version,
  contractAddress,
  entryPointSelector,
  calldata,
  maxFee,
  chainId,
  additionalData
) {
  if (additionalData === void 0) {
    additionalData = [];
  }
  var calldataHash = computeHashOnElements(calldata);
  var dataToHash = __spreadArray(
    [txHashPrefix, version, contractAddress, entryPointSelector, calldataHash, maxFee, chainId],
    __read(additionalData),
    false
  );
  return computeHashOnElements(dataToHash);
}
exports.calculateTransactionHashCommon = calculateTransactionHashCommon;
function calculateDeployTransactionHash(contractAddress, constructorCalldata, version, chainId) {
  return calculateTransactionHashCommon(
    constants_1.TransactionHashPrefix.DEPLOY,
    version,
    contractAddress,
    getSelectorFromName('constructor'),
    constructorCalldata,
    constants_1.ZERO,
    chainId
  );
}
exports.calculateDeployTransactionHash = calculateDeployTransactionHash;
function calculcateTransactionHash(
  contractAddress,
  version,
  entryPointSelector,
  calldata,
  maxFee,
  chainId
) {
  return calculateTransactionHashCommon(
    constants_1.TransactionHashPrefix.INVOKE,
    version,
    contractAddress,
    entryPointSelector,
    calldata,
    maxFee,
    chainId
  );
}
exports.calculcateTransactionHash = calculcateTransactionHash;
