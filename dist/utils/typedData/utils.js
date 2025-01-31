'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateTypedData = void 0;
var superstruct_1 = require('superstruct');
var types_1 = require('./types');
/**
 * Validates that `data` matches the EIP-712 JSON schema.
 *
 * @param {any} data
 * @return {boolean}
 */
var validateTypedData = function (data) {
  return (0, superstruct_1.is)(data, types_1.STARKNET_TYPED_DATA_TYPE);
};
exports.validateTypedData = validateTypedData;
