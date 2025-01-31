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
exports.utf8ToArray =
  exports.sanitizeHex =
  exports.sanitizeBytes =
  exports.calcByteLength =
  exports.padLeft =
  exports.addHexPrefix =
  exports.removeHexPrefix =
  exports.buf2hex =
  exports.btoaUniversal =
  exports.arrayBufferToString =
  exports.IS_BROWSER =
    void 0;
/* eslint-disable no-param-reassign */
exports.IS_BROWSER = typeof window !== 'undefined';
var STRING_ZERO = '0';
function arrayBufferToString(array) {
  return new Uint8Array(array).reduce(function (data, byte) {
    return data + String.fromCharCode(byte);
  }, '');
}
exports.arrayBufferToString = arrayBufferToString;
function btoaUniversal(b) {
  return exports.IS_BROWSER ? btoa(arrayBufferToString(b)) : Buffer.from(b).toString('base64');
}
exports.btoaUniversal = btoaUniversal;
function buf2hex(buffer) {
  return __spreadArray([], __read(buffer), false)
    .map(function (x) {
      return x.toString(16).padStart(2, '0');
    })
    .join('');
}
exports.buf2hex = buf2hex;
/**
 * Some function imported from https://github.com/pedrouid/enc-utils/blob/master/src/index.ts
 * enc-utils is no dependency to avoid using `Buffer` which just works in node and no browsers
 */
function removeHexPrefix(hex) {
  return hex.replace(/^0x/, '');
}
exports.removeHexPrefix = removeHexPrefix;
function addHexPrefix(hex) {
  return '0x' + removeHexPrefix(hex);
}
exports.addHexPrefix = addHexPrefix;
function padString(str, length, left, padding) {
  if (padding === void 0) {
    padding = STRING_ZERO;
  }
  var diff = length - str.length;
  var result = str;
  if (diff > 0) {
    var pad = padding.repeat(diff);
    result = left ? pad + str : str + pad;
  }
  return result;
}
function padLeft(str, length, padding) {
  if (padding === void 0) {
    padding = STRING_ZERO;
  }
  return padString(str, length, true, padding);
}
exports.padLeft = padLeft;
function calcByteLength(length, byteSize) {
  if (byteSize === void 0) {
    byteSize = 8;
  }
  var remainder = length % byteSize;
  return remainder ? ((length - remainder) / byteSize) * byteSize + byteSize : length;
}
exports.calcByteLength = calcByteLength;
function sanitizeBytes(str, byteSize, padding) {
  if (byteSize === void 0) {
    byteSize = 8;
  }
  if (padding === void 0) {
    padding = STRING_ZERO;
  }
  return padLeft(str, calcByteLength(str.length, byteSize), padding);
}
exports.sanitizeBytes = sanitizeBytes;
function sanitizeHex(hex) {
  hex = removeHexPrefix(hex);
  hex = sanitizeBytes(hex, 2);
  if (hex) {
    hex = addHexPrefix(hex);
  }
  return hex;
}
exports.sanitizeHex = sanitizeHex;
// implemented using TextEncoder to make it isomorphic
function utf8ToArray(str) {
  return new TextEncoder().encode(str);
}
exports.utf8ToArray = utf8ToArray;
