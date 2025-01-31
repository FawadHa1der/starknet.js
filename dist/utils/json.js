'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.stringify = exports.parse = void 0;
var json_bigint_1 = __importDefault(require('json-bigint'));
var _a = (0, json_bigint_1.default)({
    alwaysParseAsBig: true,
    useNativeBigInt: true,
    protoAction: 'preserve',
    constructorAction: 'preserve',
  }),
  parse = _a.parse,
  stringify = _a.stringify;
exports.parse = parse;
exports.stringify = stringify;
exports.default = { parse: parse, stringify: stringify };
