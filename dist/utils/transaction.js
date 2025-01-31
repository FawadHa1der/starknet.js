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
exports.fromCallsToExecuteCalldataWithNonce =
  exports.fromCallsToExecuteCalldata =
  exports.transformCallsToMulticallArrays =
    void 0;
var hash_1 = require('./hash');
var number_1 = require('./number');
/**
 * Transforms a list of Calls, each with their own calldata, into
 * two arrays: one with the entrypoints, and one with the concatenated calldata.
 * @param calls
 * @returns
 */
var transformCallsToMulticallArrays = function (calls) {
  var callArray = [];
  var calldata = [];
  calls.forEach(function (call) {
    var data = call.calldata || [];
    callArray.push({
      to: (0, number_1.toBN)(call.contractAddress).toString(10),
      selector: (0, number_1.toBN)((0, hash_1.getSelectorFromName)(call.entrypoint)).toString(10),
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
exports.transformCallsToMulticallArrays = transformCallsToMulticallArrays;
/**
 * Transforms a list of calls in the full flattened calldata expected
 * by the __execute__ protocol.
 * @param calls
 * @returns
 */
var fromCallsToExecuteCalldata = function (calls) {
  var _a = (0, exports.transformCallsToMulticallArrays)(calls),
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
exports.fromCallsToExecuteCalldata = fromCallsToExecuteCalldata;
var fromCallsToExecuteCalldataWithNonce = function (calls, nonce) {
  return __spreadArray(
    __spreadArray([], __read((0, exports.fromCallsToExecuteCalldata)(calls)), false),
    [(0, number_1.toBN)(nonce).toString()],
    false
  );
};
exports.fromCallsToExecuteCalldataWithNonce = fromCallsToExecuteCalldataWithNonce;
