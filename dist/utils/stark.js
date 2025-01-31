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
Object.defineProperty(exports, '__esModule', { value: true });
exports.estimatedFeeToMaxFee =
  exports.compileCalldata =
  exports.formatSignature =
  exports.makeAddress =
  exports.randomAddress =
  exports.compressProgram =
    void 0;
var pako_1 = require('pako');
var ellipticCurve_1 = require('./ellipticCurve');
var encode_1 = require('./encode');
var json_1 = require('./json');
var number_1 = require('./number');
/**
 * Function to compress compiled cairo program
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)
 * @param jsonProgram - json file representing the compiled cairo program
 * @returns Compressed cairo program
 */
function compressProgram(jsonProgram) {
  var stringified =
    typeof jsonProgram === 'string' ? jsonProgram : (0, json_1.stringify)(jsonProgram);
  var compressedProgram = (0, pako_1.gzip)(stringified);
  return (0, encode_1.btoaUniversal)(compressedProgram);
}
exports.compressProgram = compressProgram;
function randomAddress() {
  var randomKeyPair = (0, ellipticCurve_1.genKeyPair)();
  return (0, ellipticCurve_1.getStarkKey)(randomKeyPair);
}
exports.randomAddress = randomAddress;
function makeAddress(input) {
  return (0, encode_1.addHexPrefix)(input).toLowerCase();
}
exports.makeAddress = makeAddress;
function formatSignature(sig) {
  if (!sig) return [];
  try {
    return sig
      .map(function (x) {
        return (0, number_1.toBN)(x);
      })
      .map(function (x) {
        return x.toString();
      });
  } catch (e) {
    return [];
  }
}
exports.formatSignature = formatSignature;
function compileCalldata(args) {
  return Object.values(args).flatMap(function (value) {
    if (Array.isArray(value))
      return __spreadArray(
        [(0, number_1.toBN)(value.length).toString()],
        __read(
          value.map(function (x) {
            return (0, number_1.toBN)(x).toString();
          })
        ),
        false
      );
    if (typeof value === 'object' && 'type' in value)
      return Object.entries(value)
        .filter(function (_a) {
          var _b = __read(_a, 1),
            k = _b[0];
          return k !== 'type';
        })
        .map(function (_a) {
          var _b = __read(_a, 2),
            v = _b[1];
          return (0, number_1.toBN)(v).toString();
        });
    return (0, number_1.toBN)(value).toString();
  });
}
exports.compileCalldata = compileCalldata;
function estimatedFeeToMaxFee(estimatedFee, overhead) {
  if (overhead === void 0) {
    overhead = 0.15;
  }
  // BN can only handle Integers, so we need to do all calulations with integers
  var overHeadPercent = Math.round((1 + overhead) * 100);
  return (0, number_1.toBN)(estimatedFee)
    .mul((0, number_1.toBN)(overHeadPercent))
    .div((0, number_1.toBN)(100));
}
exports.estimatedFeeToMaxFee = estimatedFeeToMaxFee;
