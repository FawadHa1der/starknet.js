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
exports.Contract = void 0;
var bn_js_1 = __importDefault(require('bn.js'));
var minimalistic_assert_1 = __importDefault(require('minimalistic-assert'));
var provider_1 = require('../provider');
var number_1 = require('../utils/number');
function parseFelt(candidate) {
  try {
    return (0, number_1.toBN)(candidate);
  } catch (e) {
    throw Error('Couldnt parse felt');
  }
}
/**
 * Adds call methods to the contract
 *
 */
function buildCall(contract, functionAbi) {
  return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, contract.call(functionAbi.name, args)];
      });
    });
  };
}
/**
 * Adds invoke methods to the contract
 *
 */
function buildInvoke(contract, functionAbi) {
  return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
      var inputs, inputsLength, options;
      return __generator(this, function (_a) {
        inputs = functionAbi.inputs;
        inputsLength = inputs.reduce(function (acc, input) {
          if (!/_len$/.test(input.name)) {
            return acc + 1;
          }
          return acc;
        }, 0);
        options = {};
        if (inputsLength + 1 === args.length && typeof args[args.length - 1] === 'object') {
          Object.assign(options, args.pop());
        }
        return [2 /*return*/, contract.invoke(functionAbi.name, args, options)];
      });
    });
  };
}
/**
 * Adds call/invoke methods to the contract
 *
 */
function buildDefault(contract, functionAbi) {
  if (functionAbi.stateMutability === 'view') {
    return buildCall(contract, functionAbi);
  }
  return buildInvoke(contract, functionAbi);
}
/**
 * Adds populate for methods to the contract
 *
 */
function buildPopulate(contract, functionAbi) {
  return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return contract.populate(functionAbi.name, args);
  };
}
/**
 * Adds estimateFee for methods to the contract
 *
 */
function buildEstimate(contract, functionAbi) {
  return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return contract.estimate(functionAbi.name, args);
  };
}
var Contract = /** @class */ (function () {
  /**
   * Contract class to handle contract methods
   *
   * @param abi - Abi of the contract object
   * @param address (optional) - address to connect to
   * @param providerOrAccount (optional) - Provider or Account to attach to
   */
  function Contract(abi, address, providerOrAccount) {
    var _this = this;
    if (providerOrAccount === void 0) {
      providerOrAccount = provider_1.defaultProvider;
    }
    this.address = address;
    this.providerOrAccount = providerOrAccount;
    this.abi = abi;
    this.structs = abi
      .filter(function (abiEntry) {
        return abiEntry.type === 'struct';
      })
      .reduce(function (acc, abiEntry) {
        var _a;
        return __assign(__assign({}, acc), ((_a = {}), (_a[abiEntry.name] = abiEntry), _a));
      }, {});
    Object.defineProperty(this, 'functions', {
      enumerable: true,
      value: {},
      writable: false,
    });
    Object.defineProperty(this, 'callStatic', {
      enumerable: true,
      value: {},
      writable: false,
    });
    Object.defineProperty(this, 'populateTransaction', {
      enumerable: true,
      value: {},
      writable: false,
    });
    Object.defineProperty(this, 'estimateFee', {
      enumerable: true,
      value: {},
      writable: false,
    });
    this.abi.forEach(function (abiElement) {
      if (abiElement.type !== 'function') {
        return;
      }
      var signature = abiElement.name;
      if (!_this[signature]) {
        Object.defineProperty(_this, signature, {
          enumerable: true,
          value: buildDefault(_this, abiElement),
          writable: false,
        });
      }
      if (!_this.functions[signature]) {
        Object.defineProperty(_this.functions, signature, {
          enumerable: true,
          value: buildDefault(_this, abiElement),
          writable: false,
        });
      }
      if (!_this.callStatic[signature]) {
        Object.defineProperty(_this.callStatic, signature, {
          enumerable: true,
          value: buildCall(_this, abiElement),
          writable: false,
        });
      }
      if (!_this.populateTransaction[signature]) {
        Object.defineProperty(_this.populateTransaction, signature, {
          enumerable: true,
          value: buildPopulate(_this, abiElement),
          writable: false,
        });
      }
      if (!_this.estimateFee[signature]) {
        Object.defineProperty(_this.estimateFee, signature, {
          enumerable: true,
          value: buildEstimate(_this, abiElement),
          writable: false,
        });
      }
    });
  }
  /**
   * Saves the address of the contract deployed on network that will be used for interaction
   *
   * @param address - address of the contract
   */
  Contract.prototype.attach = function (address) {
    this.address = address;
  };
  /**
   * Attaches to new Provider or Account
   *
   * @param providerOrAccount - new Provider or Account to attach to
   */
  Contract.prototype.connect = function (providerOrAccount) {
    this.providerOrAccount = providerOrAccount;
  };
  /**
   * Resolves when contract is deployed on the network or when no deployment transaction is found
   *
   * @returns Promise that resolves when contract is deployed on the network or when no deployment transaction is found
   * @throws When deployment fails
   */
  Contract.prototype.deployed = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.deployTransactionHash) return [3 /*break*/, 2];
            return [
              4 /*yield*/,
              this.providerOrAccount.waitForTransaction(this.deployTransactionHash),
            ];
          case 1:
            _a.sent();
            this.deployTransactionHash = undefined;
            _a.label = 2;
          case 2:
            return [2 /*return*/, this];
        }
      });
    });
  };
  /**
   * Validates if all arguments that are passed to the method are corresponding to the ones in the abi
   *
   * @param type - type of the method
   * @param method  - name of the method
   * @param args - arguments that are passed to the method
   */
  Contract.prototype.validateMethodAndArgs = function (type, method, args) {
    var _this = this;
    if (args === void 0) {
      args = [];
    }
    // ensure provided method exists
    var invokeableFunctionNames = this.abi
      .filter(function (abi) {
        if (abi.type !== 'function') return false;
        var isView = abi.stateMutability === 'view';
        return type === 'INVOKE' ? !isView : isView;
      })
      .map(function (abi) {
        return abi.name;
      });
    (0, minimalistic_assert_1.default)(
      invokeableFunctionNames.includes(method),
      (type === 'INVOKE' ? 'invokeable' : 'viewable') + ' method not found in abi'
    );
    // ensure args match abi type
    var methodAbi = this.abi.find(function (abi) {
      return abi.name === method && abi.type === 'function';
    });
    var argPosition = 0;
    methodAbi.inputs.forEach(function (input) {
      if (/_len$/.test(input.name)) {
        return;
      }
      if (input.type === 'felt') {
        (0, minimalistic_assert_1.default)(
          typeof args[argPosition] === 'string' ||
            typeof args[argPosition] === 'number' ||
            args[argPosition] instanceof bn_js_1.default,
          'arg ' + input.name + ' should be a felt (string, number, BigNumber)'
        );
        argPosition += 1;
      } else if (input.type in _this.structs && typeof args[argPosition] === 'object') {
        if (Array.isArray(args[argPosition])) {
          var structMembersLength = _this.calculateStructMembers(input.type);
          (0, minimalistic_assert_1.default)(
            args[argPosition].length === structMembersLength,
            'arg should be of length ' + structMembersLength
          );
        } else {
          _this.structs[input.type].members.forEach(function (_a) {
            var name = _a.name;
            (0,
            minimalistic_assert_1.default)(Object.keys(args[argPosition]).includes(name), 'arg should have a property ' + name);
          });
        }
        argPosition += 1;
      } else {
        (0, minimalistic_assert_1.default)(
          Array.isArray(args[argPosition]),
          'arg ' + input.name + ' should be an Array'
        );
        if (input.type === 'felt*') {
          args[argPosition].forEach(function (felt) {
            (0,
            minimalistic_assert_1.default)(typeof felt === 'string' || typeof felt === 'number' || felt instanceof bn_js_1.default, 'arg ' + input.name + ' should be an array of string, number or BigNumber');
          });
          argPosition += 1;
        } else if (/\(felt/.test(input.type)) {
          var tupleLength = input.type.split(',').length;
          (0, minimalistic_assert_1.default)(
            args[argPosition].length === tupleLength,
            'arg ' + input.name + ' should have ' + tupleLength + ' elements in tuple'
          );
          args[argPosition].forEach(function (felt) {
            (0,
            minimalistic_assert_1.default)(typeof felt === 'string' || typeof felt === 'number' || felt instanceof bn_js_1.default, 'arg ' + input.name + ' should be an array of string, number or BigNumber');
          });
          argPosition += 1;
        } else {
          var arrayType_1 = input.type.replace('*', '');
          args[argPosition].forEach(function (struct) {
            _this.structs[arrayType_1].members.forEach(function (_a) {
              var name = _a.name;
              if (Array.isArray(struct)) {
                var structMembersLength = _this.calculateStructMembers(arrayType_1);
                (0, minimalistic_assert_1.default)(
                  struct.length === structMembersLength,
                  'arg should be of length ' + structMembersLength
                );
              } else {
                (0, minimalistic_assert_1.default)(
                  Object.keys(struct).includes(name),
                  'arg ' + input.name + ' should be an array of ' + arrayType_1
                );
              }
            });
          });
          argPosition += 1;
        }
      }
    });
  };
  /**
   * Deep parse of the object that has been passed to the method
   *
   * @param struct - struct that needs to be calculated
   * @return {number} - number of members for the given struct
   */
  Contract.prototype.calculateStructMembers = function (struct) {
    var _this = this;
    return this.structs[struct].members.reduce(function (acc, member) {
      if (member.type === 'felt') {
        return acc + 1;
      }
      return acc + _this.calculateStructMembers(member.type);
    }, 0);
  };
  /**
   * Deep parse of the object that has been passed to the method
   *
   * @param element - element that needs to be parsed
   * @param type  - name of the method
   * @return {string | string[]} - parsed arguments in format that contract is expecting
   */
  Contract.prototype.parseCalldataValue = function (element, type) {
    var _this = this;
    if (element === undefined) {
      throw Error('Missing element in calldata');
    }
    if (Array.isArray(element)) {
      var structMemberNum = this.calculateStructMembers(type);
      if (element.length !== structMemberNum) {
        throw Error('Missing element in calldata');
      }
      return element.map(function (el) {
        return (0, number_1.toFelt)(el);
      });
    }
    // checking if the passed element is struct or element in struct
    if (this.structs[type] && this.structs[type].members.length) {
      // going through all the members of the struct and parsing the value
      return this.structs[type].members.reduce(function (acc, member) {
        // if the member of the struct is another struct this will return array of the felts if not it will be single felt
        // TODO: refactor types so member name can be used as keyof ParsedStruct
        /* @ts-ignore */
        var parsedData = _this.parseCalldataValue(element[member.name], member.type);
        if (typeof parsedData === 'string') {
          acc.push(parsedData);
        } else {
          acc.push.apply(acc, __spreadArray([], __read(parsedData), false));
        }
        return acc;
      }, []);
    }
    return (0, number_1.toFelt)(element);
  };
  /**
   * Parse of the response elements that are converted to Object (Struct) by using the abi
   *
   * @param responseIterator - iterator of the response
   * @param type - type of the struct
   * @return {BigNumberish | ParsedStruct} - parsed arguments in format that contract is expecting
   */
  Contract.prototype.parseResponseStruct = function (responseIterator, type) {
    var _this = this;
    // check the type of current element
    if (type in this.structs && this.structs[type]) {
      return this.structs[type].members.reduce(function (acc, el) {
        // parse each member of the struct (member can felt or nested struct)
        acc[el.name] = _this.parseResponseStruct(responseIterator, el.type);
        return acc;
      }, {});
    }
    return parseFelt(responseIterator.next().value);
  };
  /**
   * Parse one field of the calldata by using input field from the abi for that method
   *
   * @param args - value of the field
   * @param input  - input(field) information from the abi that will be used to parse the data
   * @return {string | string[]} - parsed arguments in format that contract is expecting
   */
  Contract.prototype.parseCalldataField = function (argsIterator, input) {
    var _this = this;
    var name = input.name,
      type = input.type;
    var value = argsIterator.next().value;
    var parsedCalldata = [];
    switch (true) {
      case /\*/.test(type):
        if (Array.isArray(value)) {
          parsedCalldata.push((0, number_1.toFelt)(value.length));
          return value.reduce(function (acc, el) {
            if (/felt/.test(type)) {
              acc.push((0, number_1.toFelt)(el));
            } else {
              acc.push.apply(
                acc,
                __spreadArray(
                  [],
                  __read(_this.parseCalldataValue(el, type.replace('*', ''))),
                  false
                )
              );
            }
            return acc;
          }, parsedCalldata);
        }
        throw Error('Expected ' + name + ' to be array');
      case type in this.structs:
        return this.parseCalldataValue(value, type);
      case /\(felt/.test(type):
        if (Array.isArray(value)) {
          return value.map(function (el) {
            return (0, number_1.toFelt)(el);
          });
        }
        throw Error('Expected ' + name + ' to be array');
      default:
        return (0, number_1.toFelt)(value);
    }
  };
  /**
   * Parse the calldata by using input fields from the abi for that method
   *
   * @param args - arguments passed the the method
   * @param inputs  - list of inputs(fields) that are in the abi
   * @return {Calldata} - parsed arguments in format that contract is expecting
   */
  Contract.prototype.compileCalldata = function (args, inputs) {
    var _this = this;
    var argsIterator = args[Symbol.iterator]();
    return inputs.reduce(function (acc, input) {
      if (/_len$/.test(input.name)) {
        return acc;
      }
      var parsedData = _this.parseCalldataField(argsIterator, input);
      if (Array.isArray(parsedData)) {
        acc.push.apply(acc, __spreadArray([], __read(parsedData), false));
      } else {
        acc.push(parsedData);
      }
      return acc;
    }, []);
  };
  /**
   * Parse elements of the response and structuring them into one field by using output property from the abi for that method
   *
   * @param responseIterator - iterator of the response
   * @param output  - output(field) information from the abi that will be used to parse the data
   * @return - parsed response corresponding to the abi structure of the field
   */
  Contract.prototype.parseResponseField = function (responseIterator, output, parsedResult) {
    var name = output.name,
      type = output.type;
    var parsedDataArr = [];
    switch (true) {
      case /_len$/.test(name):
        return parseFelt(responseIterator.next().value).toNumber();
      case /\(felt/.test(type):
        return type.split(',').reduce(function (acc) {
          acc.push(parseFelt(responseIterator.next().value));
          return acc;
        }, []);
      case /\*/.test(type):
        if (parsedResult && parsedResult[name + '_len']) {
          var arrLen = parsedResult[name + '_len'];
          while (parsedDataArr.length < arrLen) {
            parsedDataArr.push(
              this.parseResponseStruct(responseIterator, output.type.replace('*', ''))
            );
          }
        }
        return parsedDataArr;
      case type in this.structs:
        return this.parseResponseStruct(responseIterator, type);
      default:
        return parseFelt(responseIterator.next().value);
    }
  };
  /**
   * Parse elements of the response array and structuring them into response object
   *
   * @param method - method name
   * @param response  - response from the method
   * @return - parsed response corresponding to the abi
   */
  Contract.prototype.parseResponse = function (method, response) {
    var _this = this;
    var outputs = this.abi.find(function (abi) {
      return abi.name === method;
    }).outputs;
    var responseIterator = response.flat()[Symbol.iterator]();
    var resultObject = outputs.flat().reduce(function (acc, output) {
      acc[output.name] = _this.parseResponseField(responseIterator, output, acc);
      if (acc[output.name] && acc[output.name + '_len']) {
        delete acc[output.name + '_len'];
      }
      return acc;
    }, {});
    return Object.entries(resultObject).reduce(function (acc, _a) {
      var _b = __read(_a, 2),
        key = _b[0],
        value = _b[1];
      acc.push(value);
      acc[key] = value;
      return acc;
    }, []);
  };
  Contract.prototype.invoke = function (method, args, options) {
    if (args === void 0) {
      args = [];
    }
    if (options === void 0) {
      options = {};
    }
    // ensure contract is connected
    (0, minimalistic_assert_1.default)(
      this.address !== null,
      'contract isnt connected to an address'
    );
    // validate method and args
    this.validateMethodAndArgs('INVOKE', method, args);
    var inputs = this.abi.find(function (abi) {
      return abi.name === method;
    }).inputs;
    var inputsLength = inputs.reduce(function (acc, input) {
      if (!/_len$/.test(input.name)) {
        return acc + 1;
      }
      return acc;
    }, 0);
    if (args.length !== inputsLength) {
      throw Error(
        'Invalid number of arguments, expected ' +
          inputsLength +
          ' arguments, but got ' +
          args.length
      );
    }
    // compile calldata
    var calldata = this.compileCalldata(args, inputs);
    var invocation = {
      contractAddress: this.address,
      calldata: calldata,
      entrypoint: method,
    };
    if ('execute' in this.providerOrAccount) {
      return this.providerOrAccount.execute(invocation, undefined, {
        maxFee: options.maxFee,
        nonce: options.nonce,
      });
    }
    return this.providerOrAccount.invokeFunction(
      __assign(__assign({}, invocation), { signature: options.signature || [] })
    );
  };
  Contract.prototype.call = function (method, args, _a) {
    if (args === void 0) {
      args = [];
    }
    var _b = _a === void 0 ? {} : _a,
      _c = _b.blockIdentifier,
      blockIdentifier = _c === void 0 ? 'pending' : _c;
    return __awaiter(this, void 0, void 0, function () {
      var inputs, calldata;
      var _this = this;
      return __generator(this, function (_d) {
        // ensure contract is connected
        (0,
        minimalistic_assert_1.default)(this.address !== null, 'contract isnt connected to an address');
        // validate method and args
        this.validateMethodAndArgs('CALL', method, args);
        inputs = this.abi.find(function (abi) {
          return abi.name === method;
        }).inputs;
        calldata = this.compileCalldata(args, inputs);
        return [
          2 /*return*/,
          this.providerOrAccount
            .callContract(
              {
                contractAddress: this.address,
                calldata: calldata,
                entrypoint: method,
              },
              { blockIdentifier: blockIdentifier }
            )
            .then(function (x) {
              return _this.parseResponse(method, x.result);
            }),
        ];
      });
    });
  };
  Contract.prototype.estimate = function (method, args) {
    if (args === void 0) {
      args = [];
    }
    return __awaiter(this, void 0, void 0, function () {
      var invocation;
      var _a;
      return __generator(this, function (_b) {
        //  TODO; remove error as soon as estimate fees are supported
        // ensure contract is connected
        (0,
        minimalistic_assert_1.default)(this.address !== null, 'contract isnt connected to an address');
        // validate method and args
        this.validateMethodAndArgs('INVOKE', method, args);
        invocation = (_a = this.populateTransaction)[method].apply(
          _a,
          __spreadArray([], __read(args), false)
        );
        if ('estimateFee' in this.providerOrAccount) {
          return [2 /*return*/, this.providerOrAccount.estimateFee(invocation)];
        }
        throw Error('Contract must be connected to the account contract to estimate');
      });
    });
  };
  Contract.prototype.populate = function (method, args) {
    if (args === void 0) {
      args = [];
    }
    var inputs = this.abi.find(function (abi) {
      return abi.name === method;
    }).inputs;
    return {
      contractAddress: this.address,
      entrypoint: method,
      calldata: this.compileCalldata(args, inputs),
      signature: [],
    };
  };
  return Contract;
})();
exports.Contract = Contract;
