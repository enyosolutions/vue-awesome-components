
/**
 * vue-enyo-components 0.6.1
 * https://github.com/enyosolutions-team/vue-enyo-components/
 * Released under the MIT License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue2-daterange-picker"), require("lodash"), require("vue-multiselect"), require("qs"), require("vue-form-generator"), require("moment"), (function webpackLoadOptionalExternalModule() { try { return require("axios"); } catch(e) {} }()), require("vue-good-table"));
	else if(typeof define === 'function' && define.amd)
		define(["vue2-daterange-picker", "lodash", "vue-multiselect", "qs", "vue-form-generator", "moment", "axios", "vue-good-table"], factory);
	else if(typeof exports === 'object')
		exports["vec"] = factory(require("vue2-daterange-picker"), require("lodash"), require("vue-multiselect"), require("qs"), require("vue-form-generator"), require("moment"), (function webpackLoadOptionalExternalModule() { try { return require("axios"); } catch(e) {} }()), require("vue-good-table"));
	else
		root["vec"] = factory(root["vue2-daterange-picker"], root["lodash"], root["vue-multiselect"], root["qs"], root["vue-form-generator"], root["moment"], root["axios"], root["vue-good-table"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__33a0__, __WEBPACK_EXTERNAL_MODULE__60bb__, __WEBPACK_EXTERNAL_MODULE__6c45__, __WEBPACK_EXTERNAL_MODULE__796d__, __WEBPACK_EXTERNAL_MODULE_a81f__, __WEBPACK_EXTERNAL_MODULE_c32d__, __WEBPACK_EXTERNAL_MODULE_cebe__, __WEBPACK_EXTERNAL_MODULE_ddbd__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "vec.umd." + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = (typeof self !== 'undefined' ? self : this)["webpackJsonpvec"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpvec"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0129":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "014b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("e53d");
var has = __webpack_require__("07e3");
var DESCRIPTORS = __webpack_require__("8e60");
var $export = __webpack_require__("63b6");
var redefine = __webpack_require__("9138");
var META = __webpack_require__("ebfd").KEY;
var $fails = __webpack_require__("294c");
var shared = __webpack_require__("dbdb");
var setToStringTag = __webpack_require__("45f2");
var uid = __webpack_require__("62a0");
var wks = __webpack_require__("5168");
var wksExt = __webpack_require__("ccb9");
var wksDefine = __webpack_require__("6718");
var enumKeys = __webpack_require__("47ee");
var isArray = __webpack_require__("9003");
var anObject = __webpack_require__("e4ae");
var isObject = __webpack_require__("f772");
var toObject = __webpack_require__("241e");
var toIObject = __webpack_require__("36c3");
var toPrimitive = __webpack_require__("1bc3");
var createDesc = __webpack_require__("aebd");
var _create = __webpack_require__("a159");
var gOPNExt = __webpack_require__("0395");
var $GOPD = __webpack_require__("bf0b");
var $GOPS = __webpack_require__("9aa9");
var $DP = __webpack_require__("d9f6");
var $keys = __webpack_require__("c3a1");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("6abf").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("355d").f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("b8e3")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("35e8")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0395":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("36c3");
var gOPN = __webpack_require__("6abf").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "07e3":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "097d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var speciesConstructor = __webpack_require__("ebd6");
var promiseResolve = __webpack_require__("bcaa");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "0fc9":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "1173":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1654":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("71c1")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("30f1")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "1691":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "1991":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var invoke = __webpack_require__("31f4");
var html = __webpack_require__("fab2");
var cel = __webpack_require__("230e");
var global = __webpack_require__("7726");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("2d95")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "1af6":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__("63b6");

$export($export.S, 'Array', { isArray: __webpack_require__("9003") });


/***/ }),

/***/ "1bc3":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("f772");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "1c4c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("9b43");
var $export = __webpack_require__("5ca1");
var toObject = __webpack_require__("4bf8");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var toLength = __webpack_require__("9def");
var createProperty = __webpack_require__("f1ae");
var getIterFn = __webpack_require__("27ee");

$export($export.S + $export.F * !__webpack_require__("5cc5")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "1c82":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldFileInput_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d608");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldFileInput_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldFileInput_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldFileInput_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "1ec9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
var document = __webpack_require__("e53d").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "1fa8":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("cb7c");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "20fd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "2154":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "241a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveEdit_vue_vue_type_style_index_0_id_08e19925_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("29a3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveEdit_vue_vue_type_style_index_0_id_08e19925_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveEdit_vue_vue_type_style_index_0_id_08e19925_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LiveEdit_vue_vue_type_style_index_0_id_08e19925_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "241e":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "24c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b8e3");
var global = __webpack_require__("e53d");
var ctx = __webpack_require__("d864");
var classof = __webpack_require__("40c3");
var $export = __webpack_require__("63b6");
var isObject = __webpack_require__("f772");
var aFunction = __webpack_require__("79aa");
var anInstance = __webpack_require__("1173");
var forOf = __webpack_require__("a22a");
var speciesConstructor = __webpack_require__("f201");
var task = __webpack_require__("4178").set;
var microtask = __webpack_require__("aba2")();
var newPromiseCapabilityModule = __webpack_require__("656e");
var perform = __webpack_require__("4439");
var userAgent = __webpack_require__("bc13");
var promiseResolve = __webpack_require__("cd78");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("5168")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("5c95")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("45f2")($Promise, PROMISE);
__webpack_require__("4c95")(PROMISE);
Wrapper = __webpack_require__("584a")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("4ee1")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "25eb":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "26cd":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "26d5":
/***/ (function(module) {

module.exports = JSON.parse("{\"AwesomeDefault\":{\"messages\":{\"are_you_sure\":\"Are you sure ?\",\"wont_be_able_recover\":\"This action cannot be reverted\",\"successfullyCreated\":\"Successfully created.\",\"successfullyModified\":\"Successfully modified.\",\"successfullyImported\":\"successfullyImported\",\"no_data_imported\":\"no_data_imported\",\"not_imported\":\"not_imported\"}},\"AwesomeTable\":{\"buttons\":{\"filters\":\"filters\",\"refresh\":\"refresh\",\"excel-currentpage\":\"excel-currentpage\",\"searchInput\":\"Search\",\"view\":\"view\",\"cancel\":\"cancel\",\"close\":\"close\"},\"next\":\"next\",\"prev\":\"prev\",\"rows_per_page\":\"Rows per page\",\"of\":\"of\",\"page\":\"page\",\"all\":\"all\",\"empty\":\"empty\",\"searchInput\":\"Search\"},\"EnyoCrudComponent\":{\"labels\":{\"manageTitle\":\"Manage\",\"createNew\":\"Create a new\"},\"buttons\":{\"yes_delete_it\":\"Yes i confirm\",\"view\":\"Open\",\"cancel\":\"Cancel\",\"close\":\"Close\",\"edit\":\"Edit\"},\"messages\":{\"successfullyModified\":\"Successfully modified.\"}}}");

/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("23c6");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var Iterators = __webpack_require__("84f2");
module.exports = __webpack_require__("8378").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__("aae3");
var anObject = __webpack_require__("cb7c");
var speciesConstructor = __webpack_require__("ebd6");
var advanceStringIndex = __webpack_require__("0390");
var toLength = __webpack_require__("9def");
var callRegExpExec = __webpack_require__("5f1b");
var regexpExec = __webpack_require__("520a");
var fails = __webpack_require__("79e5");
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ "294c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "29a3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "3024":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "30f1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b8e3");
var $export = __webpack_require__("63b6");
var redefine = __webpack_require__("9138");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var $iterCreate = __webpack_require__("8f60");
var setToStringTag = __webpack_require__("45f2");
var getPrototypeOf = __webpack_require__("53e2");
var ITERATOR = __webpack_require__("5168")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "31f4":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "32fc":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("e53d").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "335c":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("6b4c");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "33a0":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__33a0__;

/***/ }),

/***/ "33a4":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("84f2");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "355d":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "35e8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");
module.exports = __webpack_require__("8e60") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "36c3":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("335c");
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "3702":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("481b");
var ITERATOR = __webpack_require__("5168")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3a38":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "3c11":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("63b6");
var core = __webpack_require__("584a");
var global = __webpack_require__("e53d");
var speciesConstructor = __webpack_require__("f201");
var promiseResolve = __webpack_require__("cd78");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "3dd1":
/***/ (function(module, exports, __webpack_require__) {

/*!
* sweetalert2 v8.19.0
* Released under the MIT License.
*/
(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

var consolePrefix = 'SweetAlert2:';
/**
 * Filter the unique values into a new array
 * @param arr
 */

var uniqueArray = function uniqueArray(arr) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }

  return result;
};
/**
 * Returns the array ob object values (Object.values isn't supported in IE11)
 * @param obj
 */

var objectValues = function objectValues(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
};
/**
 * Convert NodeList to Array
 * @param nodeList
 */

var toArray = function toArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
};
/**
 * Standardise console warnings
 * @param message
 */

var warn = function warn(message) {
  console.warn("".concat(consolePrefix, " ").concat(message));
};
/**
 * Standardise console errors
 * @param message
 */

var error = function error(message) {
  console.error("".concat(consolePrefix, " ").concat(message));
};
/**
 * Private global state for `warnOnce`
 * @type {Array}
 * @private
 */

var previousWarnOnceMessages = [];
/**
 * Show a console warning, but only if it hasn't already been shown
 * @param message
 */

var warnOnce = function warnOnce(message) {
  if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
    previousWarnOnceMessages.push(message);
    warn(message);
  }
};
/**
 * Show a one-time console warning about deprecated params/methods
 */

var warnAboutDepreation = function warnAboutDepreation(deprecatedParam, useInstead) {
  warnOnce("\"".concat(deprecatedParam, "\" is deprecated and will be removed in the next major release. Please use \"").concat(useInstead, "\" instead."));
};
/**
 * If `arg` is a function, call it (with no arguments or context) and return the result.
 * Otherwise, just pass the value through
 * @param arg
 */

var callIfFunction = function callIfFunction(arg) {
  return typeof arg === 'function' ? arg() : arg;
};
var isPromise = function isPromise(arg) {
  return arg && Promise.resolve(arg) === arg;
};

var DismissReason = Object.freeze({
  cancel: 'cancel',
  backdrop: 'backdrop',
  close: 'close',
  esc: 'esc',
  timer: 'timer'
});

var argsToParams = function argsToParams(args) {
  var params = {};

  switch (_typeof(args[0])) {
    case 'object':
      _extends(params, args[0]);

      break;

    default:
      ['title', 'html', 'type'].forEach(function (name, index) {
        switch (_typeof(args[index])) {
          case 'string':
            params[name] = args[index];
            break;

          case 'undefined':
            break;

          default:
            error("Unexpected type of ".concat(name, "! Expected \"string\", got ").concat(_typeof(args[index])));
        }
      });
  }

  return params;
};

var swalPrefix = 'swal2-';
var prefix = function prefix(items) {
  var result = {};

  for (var i in items) {
    result[items[i]] = swalPrefix + items[i];
  }

  return result;
};
var swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'toast-column', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl']);
var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

var states = {
  previousBodyPadding: null
};
var hasClass = function hasClass(elem, className) {
  return elem.classList.contains(className);
};

var removeCustomClasses = function removeCustomClasses(elem) {
  toArray(elem.classList).forEach(function (className) {
    if (!(objectValues(swalClasses).indexOf(className) !== -1) && !(objectValues(iconTypes).indexOf(className) !== -1)) {
      elem.classList.remove(className);
    }
  });
};

var applyCustomClass = function applyCustomClass(elem, customClass, className) {
  removeCustomClasses(elem);

  if (customClass && customClass[className]) {
    if (typeof customClass[className] !== 'string' && !customClass[className].forEach) {
      return warn("Invalid type of customClass.".concat(className, "! Expected string or iterable object, got \"").concat(_typeof(customClass[className]), "\""));
    }

    addClass(elem, customClass[className]);
  }
};
function getInput(content, inputType) {
  if (!inputType) {
    return null;
  }

  switch (inputType) {
    case 'select':
    case 'textarea':
    case 'file':
      return getChildByClass(content, swalClasses[inputType]);

    case 'checkbox':
      return content.querySelector(".".concat(swalClasses.checkbox, " input"));

    case 'radio':
      return content.querySelector(".".concat(swalClasses.radio, " input:checked")) || content.querySelector(".".concat(swalClasses.radio, " input:first-child"));

    case 'range':
      return content.querySelector(".".concat(swalClasses.range, " input"));

    default:
      return getChildByClass(content, swalClasses.input);
  }
}
var focusInput = function focusInput(input) {
  input.focus(); // place cursor at end of text in text input

  if (input.type !== 'file') {
    // http://stackoverflow.com/a/2345915
    var val = input.value;
    input.value = '';
    input.value = val;
  }
};
var toggleClass = function toggleClass(target, classList, condition) {
  if (!target || !classList) {
    return;
  }

  if (typeof classList === 'string') {
    classList = classList.split(/\s+/).filter(Boolean);
  }

  classList.forEach(function (className) {
    if (target.forEach) {
      target.forEach(function (elem) {
        condition ? elem.classList.add(className) : elem.classList.remove(className);
      });
    } else {
      condition ? target.classList.add(className) : target.classList.remove(className);
    }
  });
};
var addClass = function addClass(target, classList) {
  toggleClass(target, classList, true);
};
var removeClass = function removeClass(target, classList) {
  toggleClass(target, classList, false);
};
var getChildByClass = function getChildByClass(elem, className) {
  for (var i = 0; i < elem.childNodes.length; i++) {
    if (hasClass(elem.childNodes[i], className)) {
      return elem.childNodes[i];
    }
  }
};
var applyNumericalStyle = function applyNumericalStyle(elem, property, value) {
  if (value || parseInt(value) === 0) {
    elem.style[property] = typeof value === 'number' ? value + 'px' : value;
  } else {
    elem.style.removeProperty(property);
  }
};
var show = function show(elem) {
  var display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'flex';
  elem.style.opacity = '';
  elem.style.display = display;
};
var hide = function hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};
var toggle = function toggle(elem, condition, display) {
  condition ? show(elem, display) : hide(elem);
}; // borrowed from jquery $(elem).is(':visible') implementation

var isVisible = function isVisible(elem) {
  return !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
};
var isScrollable = function isScrollable(elem) {
  return !!(elem.scrollHeight > elem.clientHeight);
}; // borrowed from https://stackoverflow.com/a/46352119

var hasCssAnimation = function hasCssAnimation(elem) {
  var style = window.getComputedStyle(elem);
  var animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
  var transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
  return animDuration > 0 || transDuration > 0;
};
var contains = function contains(haystack, needle) {
  if (typeof haystack.contains === 'function') {
    return haystack.contains(needle);
  }
};

var getContainer = function getContainer() {
  return document.body.querySelector('.' + swalClasses.container);
};
var elementBySelector = function elementBySelector(selectorString) {
  var container = getContainer();
  return container ? container.querySelector(selectorString) : null;
};

var elementByClass = function elementByClass(className) {
  return elementBySelector('.' + className);
};

var getPopup = function getPopup() {
  return elementByClass(swalClasses.popup);
};
var getIcons = function getIcons() {
  var popup = getPopup();
  return toArray(popup.querySelectorAll('.' + swalClasses.icon));
};
var getIcon = function getIcon() {
  var visibleIcon = getIcons().filter(function (icon) {
    return isVisible(icon);
  });
  return visibleIcon.length ? visibleIcon[0] : null;
};
var getTitle = function getTitle() {
  return elementByClass(swalClasses.title);
};
var getContent = function getContent() {
  return elementByClass(swalClasses.content);
};
var getImage = function getImage() {
  return elementByClass(swalClasses.image);
};
var getProgressSteps = function getProgressSteps() {
  return elementByClass(swalClasses['progress-steps']);
};
var getValidationMessage = function getValidationMessage() {
  return elementByClass(swalClasses['validation-message']);
};
var getConfirmButton = function getConfirmButton() {
  return elementBySelector('.' + swalClasses.actions + ' .' + swalClasses.confirm);
};
var getCancelButton = function getCancelButton() {
  return elementBySelector('.' + swalClasses.actions + ' .' + swalClasses.cancel);
};
var getActions = function getActions() {
  return elementByClass(swalClasses.actions);
};
var getHeader = function getHeader() {
  return elementByClass(swalClasses.header);
};
var getFooter = function getFooter() {
  return elementByClass(swalClasses.footer);
};
var getCloseButton = function getCloseButton() {
  return elementByClass(swalClasses.close);
}; // https://github.com/jkup/focusable/blob/master/index.js

var focusable = "\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex=\"0\"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n";
var getFocusableElements = function getFocusableElements() {
  var focusableElementsWithTabindex = toArray(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')) // sort according to tabindex
  .sort(function (a, b) {
    a = parseInt(a.getAttribute('tabindex'));
    b = parseInt(b.getAttribute('tabindex'));

    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }

    return 0;
  });
  var otherFocusableElements = toArray(getPopup().querySelectorAll(focusable)).filter(function (el) {
    return el.getAttribute('tabindex') !== '-1';
  });
  return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements)).filter(function (el) {
    return isVisible(el);
  });
};
var isModal = function isModal() {
  return !isToast() && !document.body.classList.contains(swalClasses['no-backdrop']);
};
var isToast = function isToast() {
  return document.body.classList.contains(swalClasses['toast-shown']);
};
var isLoading = function isLoading() {
  return getPopup().hasAttribute('data-loading');
};

// Detect Node env
var isNodeEnv = function isNodeEnv() {
  return typeof window === 'undefined' || typeof document === 'undefined';
};

var sweetHTML = "\n <div aria-labelledby=\"".concat(swalClasses.title, "\" aria-describedby=\"").concat(swalClasses.content, "\" class=\"").concat(swalClasses.popup, "\" tabindex=\"-1\">\n   <div class=\"").concat(swalClasses.header, "\">\n     <ul class=\"").concat(swalClasses['progress-steps'], "\"></ul>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.error, "\">\n       <span class=\"swal2-x-mark\"><span class=\"swal2-x-mark-line-left\"></span><span class=\"swal2-x-mark-line-right\"></span></span>\n     </div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.question, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.warning, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.info, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.success, "\">\n       <div class=\"swal2-success-circular-line-left\"></div>\n       <span class=\"swal2-success-line-tip\"></span> <span class=\"swal2-success-line-long\"></span>\n       <div class=\"swal2-success-ring\"></div> <div class=\"swal2-success-fix\"></div>\n       <div class=\"swal2-success-circular-line-right\"></div>\n     </div>\n     <img class=\"").concat(swalClasses.image, "\" />\n     <h2 class=\"").concat(swalClasses.title, "\" id=\"").concat(swalClasses.title, "\"></h2>\n     <button type=\"button\" class=\"").concat(swalClasses.close, "\"></button>\n   </div>\n   <div class=\"").concat(swalClasses.content, "\">\n     <div id=\"").concat(swalClasses.content, "\"></div>\n     <input class=\"").concat(swalClasses.input, "\" />\n     <input type=\"file\" class=\"").concat(swalClasses.file, "\" />\n     <div class=\"").concat(swalClasses.range, "\">\n       <input type=\"range\" />\n       <output></output>\n     </div>\n     <select class=\"").concat(swalClasses.select, "\"></select>\n     <div class=\"").concat(swalClasses.radio, "\"></div>\n     <label for=\"").concat(swalClasses.checkbox, "\" class=\"").concat(swalClasses.checkbox, "\">\n       <input type=\"checkbox\" />\n       <span class=\"").concat(swalClasses.label, "\"></span>\n     </label>\n     <textarea class=\"").concat(swalClasses.textarea, "\"></textarea>\n     <div class=\"").concat(swalClasses['validation-message'], "\" id=\"").concat(swalClasses['validation-message'], "\"></div>\n   </div>\n   <div class=\"").concat(swalClasses.actions, "\">\n     <button type=\"button\" class=\"").concat(swalClasses.confirm, "\">OK</button>\n     <button type=\"button\" class=\"").concat(swalClasses.cancel, "\">Cancel</button>\n   </div>\n   <div class=\"").concat(swalClasses.footer, "\">\n   </div>\n </div>\n").replace(/(^|\n)\s*/g, '');

var resetOldContainer = function resetOldContainer() {
  var oldContainer = getContainer();

  if (!oldContainer) {
    return;
  }

  oldContainer.parentNode.removeChild(oldContainer);
  removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]);
};

var oldInputVal; // IE11 workaround, see #1109 for details

var resetValidationMessage = function resetValidationMessage(e) {
  if (Swal.isVisible() && oldInputVal !== e.target.value) {
    Swal.resetValidationMessage();
  }

  oldInputVal = e.target.value;
};

var addInputChangeListeners = function addInputChangeListeners() {
  var content = getContent();
  var input = getChildByClass(content, swalClasses.input);
  var file = getChildByClass(content, swalClasses.file);
  var range = content.querySelector(".".concat(swalClasses.range, " input"));
  var rangeOutput = content.querySelector(".".concat(swalClasses.range, " output"));
  var select = getChildByClass(content, swalClasses.select);
  var checkbox = content.querySelector(".".concat(swalClasses.checkbox, " input"));
  var textarea = getChildByClass(content, swalClasses.textarea);
  input.oninput = resetValidationMessage;
  file.onchange = resetValidationMessage;
  select.onchange = resetValidationMessage;
  checkbox.onchange = resetValidationMessage;
  textarea.oninput = resetValidationMessage;

  range.oninput = function (e) {
    resetValidationMessage(e);
    rangeOutput.value = range.value;
  };

  range.onchange = function (e) {
    resetValidationMessage(e);
    range.nextSibling.value = range.value;
  };
};

var getTarget = function getTarget(target) {
  return typeof target === 'string' ? document.querySelector(target) : target;
};

var setupAccessibility = function setupAccessibility(params) {
  var popup = getPopup();
  popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
  popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

  if (!params.toast) {
    popup.setAttribute('aria-modal', 'true');
  }
};

var setupRTL = function setupRTL(targetElement) {
  if (window.getComputedStyle(targetElement).direction === 'rtl') {
    addClass(getContainer(), swalClasses.rtl);
  }
};
/*
 * Add modal + backdrop to DOM
 */


var init = function init(params) {
  // Clean up the old popup container if it exists
  resetOldContainer();
  /* istanbul ignore if */

  if (isNodeEnv()) {
    error('SweetAlert2 requires document to initialize');
    return;
  }

  var container = document.createElement('div');
  container.className = swalClasses.container;
  container.innerHTML = sweetHTML;
  var targetElement = getTarget(params.target);
  targetElement.appendChild(container);
  setupAccessibility(params);
  setupRTL(targetElement);
  addInputChangeListeners();
};

var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
  // DOM element
  if (param instanceof HTMLElement) {
    target.appendChild(param); // JQuery element(s)
  } else if (_typeof(param) === 'object') {
    handleJqueryElem(target, param); // Plain string
  } else if (param) {
    target.innerHTML = param;
  }
};

var handleJqueryElem = function handleJqueryElem(target, elem) {
  target.innerHTML = '';

  if (0 in elem) {
    for (var i = 0; i in elem; i++) {
      target.appendChild(elem[i].cloneNode(true));
    }
  } else {
    target.appendChild(elem.cloneNode(true));
  }
};

var animationEndEvent = function () {
  // Prevent run in Node env

  /* istanbul ignore if */
  if (isNodeEnv()) {
    return false;
  }

  var testEl = document.createElement('div');
  var transEndEventNames = {
    WebkitAnimation: 'webkitAnimationEnd',
    OAnimation: 'oAnimationEnd oanimationend',
    animation: 'animationend'
  };

  for (var i in transEndEventNames) {
    if (Object.prototype.hasOwnProperty.call(transEndEventNames, i) && typeof testEl.style[i] !== 'undefined') {
      return transEndEventNames[i];
    }
  }

  return false;
}();

// Measure width of scrollbar
// https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
var measureScrollbar = function measureScrollbar() {
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

  if (supportsTouch) {
    return 0;
  }

  var scrollDiv = document.createElement('div');
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

var renderActions = function renderActions(instance, params) {
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton(); // Actions (buttons) wrapper

  if (!params.showConfirmButton && !params.showCancelButton) {
    hide(actions);
  } // Custom class


  applyCustomClass(actions, params.customClass, 'actions'); // Render confirm button

  renderButton(confirmButton, 'confirm', params); // render Cancel Button

  renderButton(cancelButton, 'cancel', params);

  if (params.buttonsStyling) {
    handleButtonsStyling(confirmButton, cancelButton, params);
  } else {
    removeClass([confirmButton, cancelButton], swalClasses.styled);
    confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
    cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
  }

  if (params.reverseButtons) {
    confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
  }
};

function handleButtonsStyling(confirmButton, cancelButton, params) {
  addClass([confirmButton, cancelButton], swalClasses.styled); // Buttons background colors

  if (params.confirmButtonColor) {
    confirmButton.style.backgroundColor = params.confirmButtonColor;
  }

  if (params.cancelButtonColor) {
    cancelButton.style.backgroundColor = params.cancelButtonColor;
  } // Loading state


  var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
  confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
  confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
}

function renderButton(button, buttonType, params) {
  toggle(button, params['showC' + buttonType.substring(1) + 'Button'], 'inline-block');
  button.innerHTML = params[buttonType + 'ButtonText']; // Set caption text

  button.setAttribute('aria-label', params[buttonType + 'ButtonAriaLabel']); // ARIA label
  // Add buttons custom classes

  button.className = swalClasses[buttonType];
  applyCustomClass(button, params.customClass, buttonType + 'Button');
  addClass(button, params[buttonType + 'ButtonClass']);
}

function handleBackdropParam(container, backdrop) {
  if (typeof backdrop === 'string') {
    container.style.background = backdrop;
  } else if (!backdrop) {
    addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
  }
}

function handlePositionParam(container, position) {
  if (position in swalClasses) {
    addClass(container, swalClasses[position]);
  } else {
    warn('The "position" parameter is not valid, defaulting to "center"');
    addClass(container, swalClasses.center);
  }
}

function handleGrowParam(container, grow) {
  if (grow && typeof grow === 'string') {
    var growClass = 'grow-' + grow;

    if (growClass in swalClasses) {
      addClass(container, swalClasses[growClass]);
    }
  }
}

var renderContainer = function renderContainer(instance, params) {
  var container = getContainer();

  if (!container) {
    return;
  }

  handleBackdropParam(container, params.backdrop);

  if (!params.backdrop && params.allowOutsideClick) {
    warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
  }

  handlePositionParam(container, params.position);
  handleGrowParam(container, params.grow); // Custom class

  applyCustomClass(container, params.customClass, 'container');

  if (params.customContainerClass) {
    // @deprecated
    addClass(container, params.customContainerClass);
  }
};

/**
 * This module containts `WeakMap`s for each effectively-"private  property" that a `Swal` has.
 * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
 * This is the approach that Babel will probably take to implement private methods/fields
 *   https://github.com/tc39/proposal-private-methods
 *   https://github.com/babel/babel/pull/7555
 * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
 *   then we can use that language feature.
 */
var privateProps = {
  promise: new WeakMap(),
  innerParams: new WeakMap(),
  domCache: new WeakMap()
};

var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
var renderInput = function renderInput(instance, params) {
  var content = getContent();
  var innerParams = privateProps.innerParams.get(instance);
  var rerender = !innerParams || params.input !== innerParams.input;
  inputTypes.forEach(function (inputType) {
    var inputClass = swalClasses[inputType];
    var inputContainer = getChildByClass(content, inputClass); // set attributes

    setAttributes(inputType, params.inputAttributes); // set class

    inputContainer.className = inputClass;

    if (rerender) {
      hide(inputContainer);
    }
  });

  if (params.input) {
    if (rerender) {
      showInput(params);
    } // set custom class


    setCustomClass(params);
  }
};

var showInput = function showInput(params) {
  if (!renderInputType[params.input]) {
    return error("Unexpected type of input! Expected \"text\", \"email\", \"password\", \"number\", \"tel\", \"select\", \"radio\", \"checkbox\", \"textarea\", \"file\" or \"url\", got \"".concat(params.input, "\""));
  }

  var inputContainer = getInputContainer(params.input);
  var input = renderInputType[params.input](inputContainer, params);
  show(input); // input autofocus

  setTimeout(function () {
    focusInput(input);
  });
};

var removeAttributes = function removeAttributes(input) {
  for (var i = 0; i < input.attributes.length; i++) {
    var attrName = input.attributes[i].name;

    if (!(['type', 'value', 'style'].indexOf(attrName) !== -1)) {
      input.removeAttribute(attrName);
    }
  }
};

var setAttributes = function setAttributes(inputType, inputAttributes) {
  var input = getInput(getContent(), inputType);

  if (!input) {
    return;
  }

  removeAttributes(input);

  for (var attr in inputAttributes) {
    // Do not set a placeholder for <input type="range">
    // it'll crash Edge, #1298
    if (inputType === 'range' && attr === 'placeholder') {
      continue;
    }

    input.setAttribute(attr, inputAttributes[attr]);
  }
};

var setCustomClass = function setCustomClass(params) {
  var inputContainer = getInputContainer(params.input);

  if (params.inputClass) {
    addClass(inputContainer, params.inputClass);
  }

  if (params.customClass) {
    addClass(inputContainer, params.customClass.input);
  }
};

var setInputPlaceholder = function setInputPlaceholder(input, params) {
  if (!input.placeholder || params.inputPlaceholder) {
    input.placeholder = params.inputPlaceholder;
  }
};

var getInputContainer = function getInputContainer(inputType) {
  var inputClass = swalClasses[inputType] ? swalClasses[inputType] : swalClasses.input;
  return getChildByClass(getContent(), inputClass);
};

var renderInputType = {};

renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = function (input, params) {
  if (typeof params.inputValue === 'string' || typeof params.inputValue === 'number') {
    input.value = params.inputValue;
  } else if (!isPromise(params.inputValue)) {
    warn("Unexpected type of inputValue! Expected \"string\", \"number\" or \"Promise\", got \"".concat(_typeof(params.inputValue), "\""));
  }

  setInputPlaceholder(input, params);
  input.type = params.input;
  return input;
};

renderInputType.file = function (input, params) {
  setInputPlaceholder(input, params);
  return input;
};

renderInputType.range = function (range, params) {
  var rangeInput = range.querySelector('input');
  var rangeOutput = range.querySelector('output');
  rangeInput.value = params.inputValue;
  rangeInput.type = params.input;
  rangeOutput.value = params.inputValue;
  return range;
};

renderInputType.select = function (select, params) {
  select.innerHTML = '';

  if (params.inputPlaceholder) {
    var placeholder = document.createElement('option');
    placeholder.innerHTML = params.inputPlaceholder;
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);
  }

  return select;
};

renderInputType.radio = function (radio) {
  radio.innerHTML = '';
  return radio;
};

renderInputType.checkbox = function (checkboxContainer, params) {
  var checkbox = getInput(getContent(), 'checkbox');
  checkbox.value = 1;
  checkbox.id = swalClasses.checkbox;
  checkbox.checked = Boolean(params.inputValue);
  var label = checkboxContainer.querySelector('span');
  label.innerHTML = params.inputPlaceholder;
  return checkboxContainer;
};

renderInputType.textarea = function (textarea, params) {
  textarea.value = params.inputValue;
  setInputPlaceholder(textarea, params);

  if ('MutationObserver' in window) {
    // #1699
    var initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);
    var popupPadding = parseInt(window.getComputedStyle(getPopup()).paddingLeft) + parseInt(window.getComputedStyle(getPopup()).paddingRight);

    var outputsize = function outputsize() {
      var contentWidth = textarea.offsetWidth + popupPadding;

      if (contentWidth > initialPopupWidth) {
        getPopup().style.width = contentWidth + 'px';
      } else {
        getPopup().style.width = null;
      }
    };

    new MutationObserver(outputsize).observe(textarea, {
      attributes: true,
      attributeFilter: ['style']
    });
  }

  return textarea;
};

var renderContent = function renderContent(instance, params) {
  var content = getContent().querySelector('#' + swalClasses.content); // Content as HTML

  if (params.html) {
    parseHtmlToContainer(params.html, content);
    show(content, 'block'); // Content as plain text
  } else if (params.text) {
    content.textContent = params.text;
    show(content, 'block'); // No content
  } else {
    hide(content);
  }

  renderInput(instance, params); // Custom class

  applyCustomClass(getContent(), params.customClass, 'content');
};

var renderFooter = function renderFooter(instance, params) {
  var footer = getFooter();
  toggle(footer, params.footer);

  if (params.footer) {
    parseHtmlToContainer(params.footer, footer);
  } // Custom class


  applyCustomClass(footer, params.customClass, 'footer');
};

var renderCloseButton = function renderCloseButton(instance, params) {
  var closeButton = getCloseButton();
  closeButton.innerHTML = params.closeButtonHtml; // Custom class

  applyCustomClass(closeButton, params.customClass, 'closeButton');
  toggle(closeButton, params.showCloseButton);
  closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
};

var renderIcon = function renderIcon(instance, params) {
  var innerParams = privateProps.innerParams.get(instance); // if the icon with the given type already rendered,
  // apply the custom class without re-rendering the icon

  if (innerParams && params.type === innerParams.type && getIcon()) {
    applyCustomClass(getIcon(), params.customClass, 'icon');
    return;
  }

  hideAllIcons();

  if (!params.type) {
    return;
  }

  adjustSuccessIconBackgoundColor();

  if (Object.keys(iconTypes).indexOf(params.type) !== -1) {
    var icon = elementBySelector(".".concat(swalClasses.icon, ".").concat(iconTypes[params.type]));
    show(icon); // Custom class

    applyCustomClass(icon, params.customClass, 'icon'); // Animate icon

    toggleClass(icon, "swal2-animate-".concat(params.type, "-icon"), params.animation);
  } else {
    error("Unknown type! Expected \"success\", \"error\", \"warning\", \"info\" or \"question\", got \"".concat(params.type, "\""));
  }
};

var hideAllIcons = function hideAllIcons() {
  var icons = getIcons();

  for (var i = 0; i < icons.length; i++) {
    hide(icons[i]);
  }
}; // Adjust success icon background color to match the popup background color


var adjustSuccessIconBackgoundColor = function adjustSuccessIconBackgoundColor() {
  var popup = getPopup();
  var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
  var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');

  for (var i = 0; i < successIconParts.length; i++) {
    successIconParts[i].style.backgroundColor = popupBackgroundColor;
  }
};

var renderImage = function renderImage(instance, params) {
  var image = getImage();

  if (!params.imageUrl) {
    return hide(image);
  }

  show(image); // Src, alt

  image.setAttribute('src', params.imageUrl);
  image.setAttribute('alt', params.imageAlt); // Width, height

  applyNumericalStyle(image, 'width', params.imageWidth);
  applyNumericalStyle(image, 'height', params.imageHeight); // Class

  image.className = swalClasses.image;
  applyCustomClass(image, params.customClass, 'image');

  if (params.imageClass) {
    addClass(image, params.imageClass);
  }
};

var createStepElement = function createStepElement(step) {
  var stepEl = document.createElement('li');
  addClass(stepEl, swalClasses['progress-step']);
  stepEl.innerHTML = step;
  return stepEl;
};

var createLineElement = function createLineElement(params) {
  var lineEl = document.createElement('li');
  addClass(lineEl, swalClasses['progress-step-line']);

  if (params.progressStepsDistance) {
    lineEl.style.width = params.progressStepsDistance;
  }

  return lineEl;
};

var renderProgressSteps = function renderProgressSteps(instance, params) {
  var progressStepsContainer = getProgressSteps();

  if (!params.progressSteps || params.progressSteps.length === 0) {
    return hide(progressStepsContainer);
  }

  show(progressStepsContainer);
  progressStepsContainer.innerHTML = '';
  var currentProgressStep = parseInt(params.currentProgressStep === null ? Swal.getQueueStep() : params.currentProgressStep);

  if (currentProgressStep >= params.progressSteps.length) {
    warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
  }

  params.progressSteps.forEach(function (step, index) {
    var stepEl = createStepElement(step);
    progressStepsContainer.appendChild(stepEl);

    if (index === currentProgressStep) {
      addClass(stepEl, swalClasses['active-progress-step']);
    }

    if (index !== params.progressSteps.length - 1) {
      var lineEl = createLineElement(step);
      progressStepsContainer.appendChild(lineEl);
    }
  });
};

var renderTitle = function renderTitle(instance, params) {
  var title = getTitle();
  toggle(title, params.title || params.titleText);

  if (params.title) {
    parseHtmlToContainer(params.title, title);
  }

  if (params.titleText) {
    title.innerText = params.titleText;
  } // Custom class


  applyCustomClass(title, params.customClass, 'title');
};

var renderHeader = function renderHeader(instance, params) {
  var header = getHeader(); // Custom class

  applyCustomClass(header, params.customClass, 'header'); // Progress steps

  renderProgressSteps(instance, params); // Icon

  renderIcon(instance, params); // Image

  renderImage(instance, params); // Title

  renderTitle(instance, params); // Close button

  renderCloseButton(instance, params);
};

var renderPopup = function renderPopup(instance, params) {
  var popup = getPopup(); // Width

  applyNumericalStyle(popup, 'width', params.width); // Padding

  applyNumericalStyle(popup, 'padding', params.padding); // Background

  if (params.background) {
    popup.style.background = params.background;
  } // Default Class


  popup.className = swalClasses.popup;

  if (params.toast) {
    addClass([document.documentElement, document.body], swalClasses['toast-shown']);
    addClass(popup, swalClasses.toast);
  } else {
    addClass(popup, swalClasses.modal);
  } // Custom class


  applyCustomClass(popup, params.customClass, 'popup');

  if (typeof params.customClass === 'string') {
    addClass(popup, params.customClass);
  } // CSS animation


  toggleClass(popup, swalClasses.noanimation, !params.animation);
};

var render = function render(instance, params) {
  renderPopup(instance, params);
  renderContainer(instance, params);
  renderHeader(instance, params);
  renderContent(instance, params);
  renderActions(instance, params);
  renderFooter(instance, params);

  if (typeof params.onRender === 'function') {
    params.onRender(getPopup());
  }
};

/*
 * Global function to determine if SweetAlert2 popup is shown
 */

var isVisible$1 = function isVisible$$1() {
  return isVisible(getPopup());
};
/*
 * Global function to click 'Confirm' button
 */

var clickConfirm = function clickConfirm() {
  return getConfirmButton() && getConfirmButton().click();
};
/*
 * Global function to click 'Cancel' button
 */

var clickCancel = function clickCancel() {
  return getCancelButton() && getCancelButton().click();
};

function fire() {
  var Swal = this;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _construct(Swal, args);
}

/**
 * Returns an extended version of `Swal` containing `params` as defaults.
 * Useful for reusing Swal configuration.
 *
 * For example:
 *
 * Before:
 * const textPromptOptions = { input: 'text', showCancelButton: true }
 * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
 * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
 *
 * After:
 * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
 * const {value: firstName} = await TextPrompt('What is your first name?')
 * const {value: lastName} = await TextPrompt('What is your last name?')
 *
 * @param mixinParams
 */
function mixin(mixinParams) {
  var MixinSwal =
  /*#__PURE__*/
  function (_this) {
    _inherits(MixinSwal, _this);

    function MixinSwal() {
      _classCallCheck(this, MixinSwal);

      return _possibleConstructorReturn(this, _getPrototypeOf(MixinSwal).apply(this, arguments));
    }

    _createClass(MixinSwal, [{
      key: "_main",
      value: function _main(params) {
        return _get(_getPrototypeOf(MixinSwal.prototype), "_main", this).call(this, _extends({}, mixinParams, params));
      }
    }]);

    return MixinSwal;
  }(this);

  return MixinSwal;
}

// private global state for the queue feature
var currentSteps = [];
/*
 * Global function for chaining sweetAlert popups
 */

var queue = function queue(steps) {
  var Swal = this;
  currentSteps = steps;

  var resetAndResolve = function resetAndResolve(resolve, value) {
    currentSteps = [];
    document.body.removeAttribute('data-swal2-queue-step');
    resolve(value);
  };

  var queueResult = [];
  return new Promise(function (resolve) {
    (function step(i, callback) {
      if (i < currentSteps.length) {
        document.body.setAttribute('data-swal2-queue-step', i);
        Swal.fire(currentSteps[i]).then(function (result) {
          if (typeof result.value !== 'undefined') {
            queueResult.push(result.value);
            step(i + 1, callback);
          } else {
            resetAndResolve(resolve, {
              dismiss: result.dismiss
            });
          }
        });
      } else {
        resetAndResolve(resolve, {
          value: queueResult
        });
      }
    })(0);
  });
};
/*
 * Global function for getting the index of current popup in queue
 */

var getQueueStep = function getQueueStep() {
  return document.body.getAttribute('data-swal2-queue-step');
};
/*
 * Global function for inserting a popup to the queue
 */

var insertQueueStep = function insertQueueStep(step, index) {
  if (index && index < currentSteps.length) {
    return currentSteps.splice(index, 0, step);
  }

  return currentSteps.push(step);
};
/*
 * Global function for deleting a popup from the queue
 */

var deleteQueueStep = function deleteQueueStep(index) {
  if (typeof currentSteps[index] !== 'undefined') {
    currentSteps.splice(index, 1);
  }
};

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */

var showLoading = function showLoading() {
  var popup = getPopup();

  if (!popup) {
    Swal.fire('');
  }

  popup = getPopup();
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();
  show(actions);
  show(confirmButton);
  addClass([popup, actions], swalClasses.loading);
  confirmButton.disabled = true;
  cancelButton.disabled = true;
  popup.setAttribute('data-loading', true);
  popup.setAttribute('aria-busy', true);
  popup.focus();
};

var RESTORE_FOCUS_TIMEOUT = 100;

var globalState = {};
var focusPreviousActiveElement = function focusPreviousActiveElement() {
  if (globalState.previousActiveElement && globalState.previousActiveElement.focus) {
    globalState.previousActiveElement.focus();
    globalState.previousActiveElement = null;
  } else if (document.body) {
    document.body.focus();
  }
}; // Restore previous active (focused) element


var restoreActiveElement = function restoreActiveElement() {
  return new Promise(function (resolve) {
    var x = window.scrollX;
    var y = window.scrollY;
    globalState.restoreFocusTimeout = setTimeout(function () {
      focusPreviousActiveElement();
      resolve();
    }, RESTORE_FOCUS_TIMEOUT); // issues/900

    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      // IE doesn't have scrollX/scrollY support
      window.scrollTo(x, y);
    }
  });
};

/**
 * If `timer` parameter is set, returns number of milliseconds of timer remained.
 * Otherwise, returns undefined.
 */

var getTimerLeft = function getTimerLeft() {
  return globalState.timeout && globalState.timeout.getTimerLeft();
};
/**
 * Stop timer. Returns number of milliseconds of timer remained.
 * If `timer` parameter isn't set, returns undefined.
 */

var stopTimer = function stopTimer() {
  return globalState.timeout && globalState.timeout.stop();
};
/**
 * Resume timer. Returns number of milliseconds of timer remained.
 * If `timer` parameter isn't set, returns undefined.
 */

var resumeTimer = function resumeTimer() {
  return globalState.timeout && globalState.timeout.start();
};
/**
 * Resume timer. Returns number of milliseconds of timer remained.
 * If `timer` parameter isn't set, returns undefined.
 */

var toggleTimer = function toggleTimer() {
  var timer = globalState.timeout;
  return timer && (timer.running ? timer.stop() : timer.start());
};
/**
 * Increase timer. Returns number of milliseconds of an updated timer.
 * If `timer` parameter isn't set, returns undefined.
 */

var increaseTimer = function increaseTimer(n) {
  return globalState.timeout && globalState.timeout.increase(n);
};
/**
 * Check if timer is running. Returns true if timer is running
 * or false if timer is paused or stopped.
 * If `timer` parameter isn't set, returns undefined
 */

var isTimerRunning = function isTimerRunning() {
  return globalState.timeout && globalState.timeout.isRunning();
};

var defaultParams = {
  title: '',
  titleText: '',
  text: '',
  html: '',
  footer: '',
  type: null,
  toast: false,
  customClass: '',
  customContainerClass: '',
  target: 'body',
  backdrop: true,
  animation: true,
  heightAuto: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  stopKeydownPropagation: true,
  keydownListenerCapture: false,
  showConfirmButton: true,
  showCancelButton: false,
  preConfirm: null,
  confirmButtonText: 'OK',
  confirmButtonAriaLabel: '',
  confirmButtonColor: null,
  confirmButtonClass: '',
  cancelButtonText: 'Cancel',
  cancelButtonAriaLabel: '',
  cancelButtonColor: null,
  cancelButtonClass: '',
  buttonsStyling: true,
  reverseButtons: false,
  focusConfirm: true,
  focusCancel: false,
  showCloseButton: false,
  closeButtonHtml: '&times;',
  closeButtonAriaLabel: 'Close this dialog',
  showLoaderOnConfirm: false,
  imageUrl: null,
  imageWidth: null,
  imageHeight: null,
  imageAlt: '',
  imageClass: '',
  timer: null,
  width: null,
  padding: null,
  background: null,
  input: null,
  inputPlaceholder: '',
  inputValue: '',
  inputOptions: {},
  inputAutoTrim: true,
  inputClass: '',
  inputAttributes: {},
  inputValidator: null,
  validationMessage: null,
  grow: false,
  position: 'center',
  progressSteps: [],
  currentProgressStep: null,
  progressStepsDistance: null,
  onBeforeOpen: null,
  onOpen: null,
  onRender: null,
  onClose: null,
  onAfterClose: null,
  scrollbarPadding: true
};
var updatableParams = ['title', 'titleText', 'text', 'html', 'type', 'customClass', 'showConfirmButton', 'showCancelButton', 'confirmButtonText', 'confirmButtonAriaLabel', 'confirmButtonColor', 'confirmButtonClass', 'cancelButtonText', 'cancelButtonAriaLabel', 'cancelButtonColor', 'cancelButtonClass', 'buttonsStyling', 'reverseButtons', 'imageUrl', 'imageWidth', 'imageHeigth', 'imageAlt', 'imageClass', 'progressSteps', 'currentProgressStep'];
var deprecatedParams = {
  customContainerClass: 'customClass',
  confirmButtonClass: 'customClass',
  cancelButtonClass: 'customClass',
  imageClass: 'customClass',
  inputClass: 'customClass'
};
var toastIncompatibleParams = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'focusConfirm', 'focusCancel', 'heightAuto', 'keydownListenerCapture'];
/**
 * Is valid parameter
 * @param {String} paramName
 */

var isValidParameter = function isValidParameter(paramName) {
  return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
};
/**
 * Is valid parameter for Swal.update() method
 * @param {String} paramName
 */

var isUpdatableParameter = function isUpdatableParameter(paramName) {
  return updatableParams.indexOf(paramName) !== -1;
};
/**
 * Is deprecated parameter
 * @param {String} paramName
 */

var isDeprecatedParameter = function isDeprecatedParameter(paramName) {
  return deprecatedParams[paramName];
};

var checkIfParamIsValid = function checkIfParamIsValid(param) {
  if (!isValidParameter(param)) {
    warn("Unknown parameter \"".concat(param, "\""));
  }
};

var checkIfToastParamIsValid = function checkIfToastParamIsValid(param) {
  if (toastIncompatibleParams.indexOf(param) !== -1) {
    warn("The parameter \"".concat(param, "\" is incompatible with toasts"));
  }
};

var checkIfParamIsDeprecated = function checkIfParamIsDeprecated(param) {
  if (isDeprecatedParameter(param)) {
    warnAboutDepreation(param, isDeprecatedParameter(param));
  }
};
/**
 * Show relevant warnings for given params
 *
 * @param params
 */


var showWarningsForParams = function showWarningsForParams(params) {
  for (var param in params) {
    checkIfParamIsValid(param);

    if (params.toast) {
      checkIfToastParamIsValid(param);
    }

    checkIfParamIsDeprecated();
  }
};



var staticMethods = Object.freeze({
	isValidParameter: isValidParameter,
	isUpdatableParameter: isUpdatableParameter,
	isDeprecatedParameter: isDeprecatedParameter,
	argsToParams: argsToParams,
	isVisible: isVisible$1,
	clickConfirm: clickConfirm,
	clickCancel: clickCancel,
	getContainer: getContainer,
	getPopup: getPopup,
	getTitle: getTitle,
	getContent: getContent,
	getImage: getImage,
	getIcon: getIcon,
	getIcons: getIcons,
	getCloseButton: getCloseButton,
	getActions: getActions,
	getConfirmButton: getConfirmButton,
	getCancelButton: getCancelButton,
	getHeader: getHeader,
	getFooter: getFooter,
	getFocusableElements: getFocusableElements,
	getValidationMessage: getValidationMessage,
	isLoading: isLoading,
	fire: fire,
	mixin: mixin,
	queue: queue,
	getQueueStep: getQueueStep,
	insertQueueStep: insertQueueStep,
	deleteQueueStep: deleteQueueStep,
	showLoading: showLoading,
	enableLoading: showLoading,
	getTimerLeft: getTimerLeft,
	stopTimer: stopTimer,
	resumeTimer: resumeTimer,
	toggleTimer: toggleTimer,
	increaseTimer: increaseTimer,
	isTimerRunning: isTimerRunning
});

/**
 * Enables buttons and hide loader.
 */

function hideLoading() {
  var innerParams = privateProps.innerParams.get(this);
  var domCache = privateProps.domCache.get(this);

  if (!innerParams.showConfirmButton) {
    hide(domCache.confirmButton);

    if (!innerParams.showCancelButton) {
      hide(domCache.actions);
    }
  }

  removeClass([domCache.popup, domCache.actions], swalClasses.loading);
  domCache.popup.removeAttribute('aria-busy');
  domCache.popup.removeAttribute('data-loading');
  domCache.confirmButton.disabled = false;
  domCache.cancelButton.disabled = false;
}

function getInput$1(instance) {
  var innerParams = privateProps.innerParams.get(instance || this);
  var domCache = privateProps.domCache.get(instance || this);

  if (!domCache) {
    return null;
  }

  return getInput(domCache.content, innerParams.input);
}

var fixScrollbar = function fixScrollbar() {
  // for queues, do not do this more than once
  if (states.previousBodyPadding !== null) {
    return;
  } // if the body has overflow


  if (document.body.scrollHeight > window.innerHeight) {
    // add padding so the content doesn't shift after removal of scrollbar
    states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
    document.body.style.paddingRight = states.previousBodyPadding + measureScrollbar() + 'px';
  }
};
var undoScrollbar = function undoScrollbar() {
  if (states.previousBodyPadding !== null) {
    document.body.style.paddingRight = states.previousBodyPadding + 'px';
    states.previousBodyPadding = null;
  }
};

/* istanbul ignore next */

var iOSfix = function iOSfix() {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

  if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
    var offset = document.body.scrollTop;
    document.body.style.top = offset * -1 + 'px';
    addClass(document.body, swalClasses.iosfix);
    lockBodyScroll();
  }
};

var lockBodyScroll = function lockBodyScroll() {
  // #1246
  var container = getContainer();
  var preventTouchMove;

  container.ontouchstart = function (e) {
    preventTouchMove = e.target === container || !isScrollable(container) && e.target.tagName !== 'INPUT' // #1603
    ;
  };

  container.ontouchmove = function (e) {
    if (preventTouchMove) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
};
/* istanbul ignore next */


var undoIOSfix = function undoIOSfix() {
  if (hasClass(document.body, swalClasses.iosfix)) {
    var offset = parseInt(document.body.style.top, 10);
    removeClass(document.body, swalClasses.iosfix);
    document.body.style.top = '';
    document.body.scrollTop = offset * -1;
  }
};

var isIE11 = function isIE11() {
  return !!window.MSInputMethodContext && !!document.documentMode;
}; // Fix IE11 centering sweetalert2/issues/933

/* istanbul ignore next */


var fixVerticalPositionIE = function fixVerticalPositionIE() {
  var container = getContainer();
  var popup = getPopup();
  container.style.removeProperty('align-items');

  if (popup.offsetTop < 0) {
    container.style.alignItems = 'flex-start';
  }
};
/* istanbul ignore next */


var IEfix = function IEfix() {
  if (typeof window !== 'undefined' && isIE11()) {
    fixVerticalPositionIE();
    window.addEventListener('resize', fixVerticalPositionIE);
  }
};
/* istanbul ignore next */

var undoIEfix = function undoIEfix() {
  if (typeof window !== 'undefined' && isIE11()) {
    window.removeEventListener('resize', fixVerticalPositionIE);
  }
};

// Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
// elements not within the active modal dialog will not be surfaced if a user opens a screen
// reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

var setAriaHidden = function setAriaHidden() {
  var bodyChildren = toArray(document.body.children);
  bodyChildren.forEach(function (el) {
    if (el === getContainer() || contains(el, getContainer())) {
      return;
    }

    if (el.hasAttribute('aria-hidden')) {
      el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden'));
    }

    el.setAttribute('aria-hidden', 'true');
  });
};
var unsetAriaHidden = function unsetAriaHidden() {
  var bodyChildren = toArray(document.body.children);
  bodyChildren.forEach(function (el) {
    if (el.hasAttribute('data-previous-aria-hidden')) {
      el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden'));
      el.removeAttribute('data-previous-aria-hidden');
    } else {
      el.removeAttribute('aria-hidden');
    }
  });
};

/**
 * This module containts `WeakMap`s for each effectively-"private  property" that a `Swal` has.
 * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
 * This is the approach that Babel will probably take to implement private methods/fields
 *   https://github.com/tc39/proposal-private-methods
 *   https://github.com/babel/babel/pull/7555
 * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
 *   then we can use that language feature.
 */
var privateMethods = {
  swalPromiseResolve: new WeakMap()
};

/*
 * Instance method to close sweetAlert
 */

function removePopupAndResetState(instance, container, isToast, onAfterClose) {
  if (isToast) {
    triggerOnAfterCloseAndDispose(instance, onAfterClose);
  } else {
    restoreActiveElement().then(function () {
      return triggerOnAfterCloseAndDispose(instance, onAfterClose);
    });
    globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
      capture: globalState.keydownListenerCapture
    });
    globalState.keydownHandlerAdded = false;
  }

  if (container.parentNode) {
    container.parentNode.removeChild(container);
  }

  if (isModal()) {
    undoScrollbar();
    undoIOSfix();
    undoIEfix();
    unsetAriaHidden();
  }

  removeBodyClasses();
}

function removeBodyClasses() {
  removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['toast-column']]);
}

function disposeSwal(instance) {
  // Unset this.params so GC will dispose it (#1569)
  delete instance.params; // Unset globalState props so GC will dispose globalState (#1569)

  delete globalState.keydownHandler;
  delete globalState.keydownTarget; // Unset WeakMaps so GC will be able to dispose them (#1569)

  unsetWeakMaps(privateProps);
  unsetWeakMaps(privateMethods);
}

function close(resolveValue) {
  var popup = getPopup();

  if (!popup || hasClass(popup, swalClasses.hide)) {
    return;
  }

  var innerParams = privateProps.innerParams.get(this);

  if (!innerParams) {
    return;
  }

  var swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
  removeClass(popup, swalClasses.show);
  addClass(popup, swalClasses.hide);
  handlePopupAnimation(this, popup, innerParams); // Resolve Swal promise

  swalPromiseResolve(resolveValue || {});
}

var handlePopupAnimation = function handlePopupAnimation(instance, popup, innerParams) {
  var container = getContainer(); // If animation is supported, animate

  var animationIsSupported = animationEndEvent && hasCssAnimation(popup);
  var onClose = innerParams.onClose,
      onAfterClose = innerParams.onAfterClose;

  if (onClose !== null && typeof onClose === 'function') {
    onClose(popup);
  }

  if (animationIsSupported) {
    animatePopup(instance, popup, container, onAfterClose);
  } else {
    // Otherwise, remove immediately
    removePopupAndResetState(instance, container, isToast(), onAfterClose);
  }
};

var animatePopup = function animatePopup(instance, popup, container, onAfterClose) {
  globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, isToast(), onAfterClose);
  popup.addEventListener(animationEndEvent, function (e) {
    if (e.target === popup) {
      globalState.swalCloseEventFinishedCallback();
      delete globalState.swalCloseEventFinishedCallback;
    }
  });
};

var unsetWeakMaps = function unsetWeakMaps(obj) {
  for (var i in obj) {
    obj[i] = new WeakMap();
  }
};

var triggerOnAfterCloseAndDispose = function triggerOnAfterCloseAndDispose(instance, onAfterClose) {
  setTimeout(function () {
    if (onAfterClose !== null && typeof onAfterClose === 'function') {
      onAfterClose();
    }

    if (!getPopup()) {
      disposeSwal(instance);
    }
  });
};

function setButtonsDisabled(instance, buttons, disabled) {
  var domCache = privateProps.domCache.get(instance);
  buttons.forEach(function (button) {
    domCache[button].disabled = disabled;
  });
}

function setInputDisabled(input, disabled) {
  if (!input) {
    return false;
  }

  if (input.type === 'radio') {
    var radiosContainer = input.parentNode.parentNode;
    var radios = radiosContainer.querySelectorAll('input');

    for (var i = 0; i < radios.length; i++) {
      radios[i].disabled = disabled;
    }
  } else {
    input.disabled = disabled;
  }
}

function enableButtons() {
  setButtonsDisabled(this, ['confirmButton', 'cancelButton'], false);
}
function disableButtons() {
  setButtonsDisabled(this, ['confirmButton', 'cancelButton'], true);
} // @deprecated

function enableConfirmButton() {
  warnAboutDepreation('Swal.enableConfirmButton()', "Swal.getConfirmButton().removeAttribute('disabled')");
  setButtonsDisabled(this, ['confirmButton'], false);
} // @deprecated

function disableConfirmButton() {
  warnAboutDepreation('Swal.disableConfirmButton()', "Swal.getConfirmButton().setAttribute('disabled', '')");
  setButtonsDisabled(this, ['confirmButton'], true);
}
function enableInput() {
  return setInputDisabled(this.getInput(), false);
}
function disableInput() {
  return setInputDisabled(this.getInput(), true);
}

function showValidationMessage(error) {
  var domCache = privateProps.domCache.get(this);
  domCache.validationMessage.innerHTML = error;
  var popupComputedStyle = window.getComputedStyle(domCache.popup);
  domCache.validationMessage.style.marginLeft = "-".concat(popupComputedStyle.getPropertyValue('padding-left'));
  domCache.validationMessage.style.marginRight = "-".concat(popupComputedStyle.getPropertyValue('padding-right'));
  show(domCache.validationMessage);
  var input = this.getInput();

  if (input) {
    input.setAttribute('aria-invalid', true);
    input.setAttribute('aria-describedBy', swalClasses['validation-message']);
    focusInput(input);
    addClass(input, swalClasses.inputerror);
  }
} // Hide block with validation message

function resetValidationMessage$1() {
  var domCache = privateProps.domCache.get(this);

  if (domCache.validationMessage) {
    hide(domCache.validationMessage);
  }

  var input = this.getInput();

  if (input) {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedBy');
    removeClass(input, swalClasses.inputerror);
  }
}

function getProgressSteps$1() {
  warnAboutDepreation('Swal.getProgressSteps()', "const swalInstance = Swal.fire({progressSteps: ['1', '2', '3']}); const progressSteps = swalInstance.params.progressSteps");
  var innerParams = privateProps.innerParams.get(this);
  return innerParams.progressSteps;
}
function setProgressSteps(progressSteps) {
  warnAboutDepreation('Swal.setProgressSteps()', 'Swal.update()');
  var innerParams = privateProps.innerParams.get(this);

  var updatedParams = _extends({}, innerParams, {
    progressSteps: progressSteps
  });

  renderProgressSteps(this, updatedParams);
  privateProps.innerParams.set(this, updatedParams);
}
function showProgressSteps() {
  var domCache = privateProps.domCache.get(this);
  show(domCache.progressSteps);
}
function hideProgressSteps() {
  var domCache = privateProps.domCache.get(this);
  hide(domCache.progressSteps);
}

var Timer =
/*#__PURE__*/
function () {
  function Timer(callback, delay) {
    _classCallCheck(this, Timer);

    this.callback = callback;
    this.remaining = delay;
    this.running = false;
    this.start();
  }

  _createClass(Timer, [{
    key: "start",
    value: function start() {
      if (!this.running) {
        this.running = true;
        this.started = new Date();
        this.id = setTimeout(this.callback, this.remaining);
      }

      return this.remaining;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.running) {
        this.running = false;
        clearTimeout(this.id);
        this.remaining -= new Date() - this.started;
      }

      return this.remaining;
    }
  }, {
    key: "increase",
    value: function increase(n) {
      var running = this.running;

      if (running) {
        this.stop();
      }

      this.remaining += n;

      if (running) {
        this.start();
      }

      return this.remaining;
    }
  }, {
    key: "getTimerLeft",
    value: function getTimerLeft() {
      if (this.running) {
        this.stop();
        this.start();
      }

      return this.remaining;
    }
  }, {
    key: "isRunning",
    value: function isRunning() {
      return this.running;
    }
  }]);

  return Timer;
}();

var defaultInputValidators = {
  email: function email(string, validationMessage) {
    return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid email address');
  },
  url: function url(string, validationMessage) {
    // taken from https://stackoverflow.com/a/3809435 with a small change from #1306
    return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid URL');
  }
};

function setDefaultInputValidators(params) {
  // Use default `inputValidator` for supported input types if not provided
  if (!params.inputValidator) {
    Object.keys(defaultInputValidators).forEach(function (key) {
      if (params.input === key) {
        params.inputValidator = defaultInputValidators[key];
      }
    });
  }
}

function validateCustomTargetElement(params) {
  // Determine if the custom target element is valid
  if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
    warn('Target parameter is not valid, defaulting to "body"');
    params.target = 'body';
  }
}
/**
 * Set type, text and actions on popup
 *
 * @param params
 * @returns {boolean}
 */


function setParameters(params) {
  setDefaultInputValidators(params); // showLoaderOnConfirm && preConfirm

  if (params.showLoaderOnConfirm && !params.preConfirm) {
    warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
  } // params.animation will be actually used in renderPopup.js
  // but in case when params.animation is a function, we need to call that function
  // before popup (re)initialization, so it'll be possible to check Swal.isVisible()
  // inside the params.animation function


  params.animation = callIfFunction(params.animation);
  validateCustomTargetElement(params); // Replace newlines with <br> in title

  if (typeof params.title === 'string') {
    params.title = params.title.split('\n').join('<br />');
  }

  init(params);
}

function swalOpenAnimationFinished(popup, container) {
  popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished);
  container.style.overflowY = 'auto';
}
/**
 * Open popup, add necessary classes and styles, fix scrollbar
 *
 * @param {Array} params
 */


var openPopup = function openPopup(params) {
  var container = getContainer();
  var popup = getPopup();

  if (typeof params.onBeforeOpen === 'function') {
    params.onBeforeOpen(popup);
  }

  addClasses(container, popup, params); // scrolling is 'hidden' until animation is done, after that 'auto'

  setScrollingVisibility(container, popup);

  if (isModal()) {
    fixScrollContainer(container, params.scrollbarPadding);
  }

  if (!isToast() && !globalState.previousActiveElement) {
    globalState.previousActiveElement = document.activeElement;
  }

  if (typeof params.onOpen === 'function') {
    setTimeout(function () {
      return params.onOpen(popup);
    });
  }
};

var setScrollingVisibility = function setScrollingVisibility(container, popup) {
  if (animationEndEvent && hasCssAnimation(popup)) {
    container.style.overflowY = 'hidden';
    popup.addEventListener(animationEndEvent, swalOpenAnimationFinished.bind(null, popup, container));
  } else {
    container.style.overflowY = 'auto';
  }
};

var fixScrollContainer = function fixScrollContainer(container, scrollbarPadding) {
  iOSfix();
  IEfix();
  setAriaHidden();

  if (scrollbarPadding) {
    fixScrollbar();
  } // sweetalert2/issues/1247


  setTimeout(function () {
    container.scrollTop = 0;
  });
};

var addClasses = function addClasses(container, popup, params) {
  if (params.animation) {
    addClass(popup, swalClasses.show);
  }

  show(popup);
  addClass([document.documentElement, document.body, container], swalClasses.shown);

  if (params.heightAuto && params.backdrop && !params.toast) {
    addClass([document.documentElement, document.body], swalClasses['height-auto']);
  }
};

var handleInputOptionsAndValue = function handleInputOptionsAndValue(instance, params) {
  if (params.input === 'select' || params.input === 'radio') {
    handleInputOptions(instance, params);
  } else if (['text', 'email', 'number', 'tel', 'textarea'].indexOf(params.input) !== -1 && isPromise(params.inputValue)) {
    handleInputValue(instance, params);
  }
};
var getInputValue = function getInputValue(instance, innerParams) {
  var input = instance.getInput();

  if (!input) {
    return null;
  }

  switch (innerParams.input) {
    case 'checkbox':
      return getCheckboxValue(input);

    case 'radio':
      return getRadioValue(input);

    case 'file':
      return getFileValue(input);

    default:
      return innerParams.inputAutoTrim ? input.value.trim() : input.value;
  }
};

var getCheckboxValue = function getCheckboxValue(input) {
  return input.checked ? 1 : 0;
};

var getRadioValue = function getRadioValue(input) {
  return input.checked ? input.value : null;
};

var getFileValue = function getFileValue(input) {
  return input.files.length ? input.getAttribute('multiple') !== null ? input.files : input.files[0] : null;
};

var handleInputOptions = function handleInputOptions(instance, params) {
  var content = getContent();

  var processInputOptions = function processInputOptions(inputOptions) {
    return populateInputOptions[params.input](content, formatInputOptions(inputOptions), params);
  };

  if (isPromise(params.inputOptions)) {
    showLoading();
    params.inputOptions.then(function (inputOptions) {
      instance.hideLoading();
      processInputOptions(inputOptions);
    });
  } else if (_typeof(params.inputOptions) === 'object') {
    processInputOptions(params.inputOptions);
  } else {
    error("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(_typeof(params.inputOptions)));
  }
};

var handleInputValue = function handleInputValue(instance, params) {
  var input = instance.getInput();
  hide(input);
  params.inputValue.then(function (inputValue) {
    input.value = params.input === 'number' ? parseFloat(inputValue) || 0 : inputValue + '';
    show(input);
    input.focus();
    instance.hideLoading();
  })["catch"](function (err) {
    error('Error in inputValue promise: ' + err);
    input.value = '';
    show(input);
    input.focus();
    instance.hideLoading();
  });
};

var populateInputOptions = {
  select: function select(content, inputOptions, params) {
    var select = getChildByClass(content, swalClasses.select);
    inputOptions.forEach(function (inputOption) {
      var optionValue = inputOption[0];
      var optionLabel = inputOption[1];
      var option = document.createElement('option');
      option.value = optionValue;
      option.innerHTML = optionLabel;

      if (params.inputValue.toString() === optionValue.toString()) {
        option.selected = true;
      }

      select.appendChild(option);
    });
    select.focus();
  },
  radio: function radio(content, inputOptions, params) {
    var radio = getChildByClass(content, swalClasses.radio);
    inputOptions.forEach(function (inputOption) {
      var radioValue = inputOption[0];
      var radioLabel = inputOption[1];
      var radioInput = document.createElement('input');
      var radioLabelElement = document.createElement('label');
      radioInput.type = 'radio';
      radioInput.name = swalClasses.radio;
      radioInput.value = radioValue;

      if (params.inputValue.toString() === radioValue.toString()) {
        radioInput.checked = true;
      }

      var label = document.createElement('span');
      label.innerHTML = radioLabel;
      label.className = swalClasses.label;
      radioLabelElement.appendChild(radioInput);
      radioLabelElement.appendChild(label);
      radio.appendChild(radioLabelElement);
    });
    var radios = radio.querySelectorAll('input');

    if (radios.length) {
      radios[0].focus();
    }
  }
};
/**
 * Converts `inputOptions` into an array of `[value, label]`s
 * @param inputOptions
 */

var formatInputOptions = function formatInputOptions(inputOptions) {
  var result = [];

  if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
    inputOptions.forEach(function (value, key) {
      result.push([key, value]);
    });
  } else {
    Object.keys(inputOptions).forEach(function (key) {
      result.push([key, inputOptions[key]]);
    });
  }

  return result;
};

var handleConfirmButtonClick = function handleConfirmButtonClick(instance, innerParams) {
  instance.disableButtons();

  if (innerParams.input) {
    handleConfirmWithInput(instance, innerParams);
  } else {
    confirm(instance, innerParams, true);
  }
};
var handleCancelButtonClick = function handleCancelButtonClick(instance, dismissWith) {
  instance.disableButtons();
  dismissWith(DismissReason.cancel);
};

var handleConfirmWithInput = function handleConfirmWithInput(instance, innerParams) {
  var inputValue = getInputValue(instance, innerParams);

  if (innerParams.inputValidator) {
    instance.disableInput();
    var validationPromise = Promise.resolve().then(function () {
      return innerParams.inputValidator(inputValue, innerParams.validationMessage);
    });
    validationPromise.then(function (validationMessage) {
      instance.enableButtons();
      instance.enableInput();

      if (validationMessage) {
        instance.showValidationMessage(validationMessage);
      } else {
        confirm(instance, innerParams, inputValue);
      }
    });
  } else if (!instance.getInput().checkValidity()) {
    instance.enableButtons();
    instance.showValidationMessage(innerParams.validationMessage);
  } else {
    confirm(instance, innerParams, inputValue);
  }
};

var succeedWith = function succeedWith(instance, value) {
  instance.closePopup({
    value: value
  });
};

var confirm = function confirm(instance, innerParams, value) {
  if (innerParams.showLoaderOnConfirm) {
    showLoading(); // TODO: make showLoading an *instance* method
  }

  if (innerParams.preConfirm) {
    instance.resetValidationMessage();
    var preConfirmPromise = Promise.resolve().then(function () {
      return innerParams.preConfirm(value, innerParams.validationMessage);
    });
    preConfirmPromise.then(function (preConfirmValue) {
      if (isVisible(getValidationMessage()) || preConfirmValue === false) {
        instance.hideLoading();
      } else {
        succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
      }
    });
  } else {
    succeedWith(instance, value);
  }
};

var addKeydownHandler = function addKeydownHandler(instance, globalState, innerParams, dismissWith) {
  if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
    globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
      capture: globalState.keydownListenerCapture
    });
    globalState.keydownHandlerAdded = false;
  }

  if (!innerParams.toast) {
    globalState.keydownHandler = function (e) {
      return keydownHandler(instance, e, innerParams, dismissWith);
    };

    globalState.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
    globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
    globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
      capture: globalState.keydownListenerCapture
    });
    globalState.keydownHandlerAdded = true;
  }
}; // Focus handling

var setFocus = function setFocus(innerParams, index, increment) {
  var focusableElements = getFocusableElements(); // search for visible elements and select the next possible match

  for (var i = 0; i < focusableElements.length; i++) {
    index = index + increment; // rollover to first item

    if (index === focusableElements.length) {
      index = 0; // go to last item
    } else if (index === -1) {
      index = focusableElements.length - 1;
    }

    return focusableElements[index].focus();
  } // no visible focusable elements, focus the popup


  getPopup().focus();
};
var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
];
var escKeys = ['Escape', 'Esc' // IE11
];

var keydownHandler = function keydownHandler(instance, e, innerParams, dismissWith) {
  if (innerParams.stopKeydownPropagation) {
    e.stopPropagation();
  } // ENTER


  if (e.key === 'Enter') {
    handleEnter(instance, e, innerParams); // TAB
  } else if (e.key === 'Tab') {
    handleTab(e, innerParams); // ARROWS - switch focus between buttons
  } else if (arrowKeys.indexOf(e.key) !== -1) {
    handleArrows(); // ESC
  } else if (escKeys.indexOf(e.key) !== -1) {
    handleEsc(e, innerParams, dismissWith);
  }
};

var handleEnter = function handleEnter(instance, e, innerParams) {
  // #720 #721
  if (e.isComposing) {
    return;
  }

  if (e.target && instance.getInput() && e.target.outerHTML === instance.getInput().outerHTML) {
    if (['textarea', 'file'].indexOf(innerParams.input) !== -1) {
      return; // do not submit
    }

    clickConfirm();
    e.preventDefault();
  }
};

var handleTab = function handleTab(e, innerParams) {
  var targetElement = e.target;
  var focusableElements = getFocusableElements();
  var btnIndex = -1;

  for (var i = 0; i < focusableElements.length; i++) {
    if (targetElement === focusableElements[i]) {
      btnIndex = i;
      break;
    }
  }

  if (!e.shiftKey) {
    // Cycle to the next button
    setFocus(innerParams, btnIndex, 1);
  } else {
    // Cycle to the prev button
    setFocus(innerParams, btnIndex, -1);
  }

  e.stopPropagation();
  e.preventDefault();
};

var handleArrows = function handleArrows() {
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton(); // focus Cancel button if Confirm button is currently focused

  if (document.activeElement === confirmButton && isVisible(cancelButton)) {
    cancelButton.focus(); // and vice versa
  } else if (document.activeElement === cancelButton && isVisible(confirmButton)) {
    confirmButton.focus();
  }
};

var handleEsc = function handleEsc(e, innerParams, dismissWith) {
  if (callIfFunction(innerParams.allowEscapeKey)) {
    e.preventDefault();
    dismissWith(DismissReason.esc);
  }
};

var handlePopupClick = function handlePopupClick(domCache, innerParams, dismissWith) {
  if (innerParams.toast) {
    handleToastClick(domCache, innerParams, dismissWith);
  } else {
    // Ignore click events that had mousedown on the popup but mouseup on the container
    // This can happen when the user drags a slider
    handleModalMousedown(domCache); // Ignore click events that had mousedown on the container but mouseup on the popup

    handleContainerMousedown(domCache);
    handleModalClick(domCache, innerParams, dismissWith);
  }
};

var handleToastClick = function handleToastClick(domCache, innerParams, dismissWith) {
  // Closing toast by internal click
  domCache.popup.onclick = function () {
    if (innerParams.showConfirmButton || innerParams.showCancelButton || innerParams.showCloseButton || innerParams.input) {
      return;
    }

    dismissWith(DismissReason.close);
  };
};

var ignoreOutsideClick = false;

var handleModalMousedown = function handleModalMousedown(domCache) {
  domCache.popup.onmousedown = function () {
    domCache.container.onmouseup = function (e) {
      domCache.container.onmouseup = undefined; // We only check if the mouseup target is the container because usually it doesn't
      // have any other direct children aside of the popup

      if (e.target === domCache.container) {
        ignoreOutsideClick = true;
      }
    };
  };
};

var handleContainerMousedown = function handleContainerMousedown(domCache) {
  domCache.container.onmousedown = function () {
    domCache.popup.onmouseup = function (e) {
      domCache.popup.onmouseup = undefined; // We also need to check if the mouseup target is a child of the popup

      if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
        ignoreOutsideClick = true;
      }
    };
  };
};

var handleModalClick = function handleModalClick(domCache, innerParams, dismissWith) {
  domCache.container.onclick = function (e) {
    if (ignoreOutsideClick) {
      ignoreOutsideClick = false;
      return;
    }

    if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
      dismissWith(DismissReason.backdrop);
    }
  };
};

function _main(userParams) {
  showWarningsForParams(userParams); // Check if there is another Swal closing

  if (getPopup() && globalState.swalCloseEventFinishedCallback) {
    globalState.swalCloseEventFinishedCallback();
    delete globalState.swalCloseEventFinishedCallback;
  } // Check if there is a swal disposal defer timer


  if (globalState.deferDisposalTimer) {
    clearTimeout(globalState.deferDisposalTimer);
    delete globalState.deferDisposalTimer;
  }

  var innerParams = _extends({}, defaultParams, userParams);

  setParameters(innerParams);
  Object.freeze(innerParams); // clear the previous timer

  if (globalState.timeout) {
    globalState.timeout.stop();
    delete globalState.timeout;
  } // clear the restore focus timeout


  clearTimeout(globalState.restoreFocusTimeout);
  var domCache = populateDomCache(this);
  render(this, innerParams);
  privateProps.innerParams.set(this, innerParams);
  return swalPromise(this, domCache, innerParams);
}

var swalPromise = function swalPromise(instance, domCache, innerParams) {
  return new Promise(function (resolve) {
    // functions to handle all closings/dismissals
    var dismissWith = function dismissWith(dismiss) {
      instance.closePopup({
        dismiss: dismiss
      });
    };

    privateMethods.swalPromiseResolve.set(instance, resolve);
    setupTimer(globalState, innerParams, dismissWith);

    domCache.confirmButton.onclick = function () {
      return handleConfirmButtonClick(instance, innerParams);
    };

    domCache.cancelButton.onclick = function () {
      return handleCancelButtonClick(instance, dismissWith);
    };

    domCache.closeButton.onclick = function () {
      return dismissWith(DismissReason.close);
    };

    handlePopupClick(domCache, innerParams, dismissWith);
    addKeydownHandler(instance, globalState, innerParams, dismissWith);

    if (innerParams.toast && (innerParams.input || innerParams.footer || innerParams.showCloseButton)) {
      addClass(document.body, swalClasses['toast-column']);
    } else {
      removeClass(document.body, swalClasses['toast-column']);
    }

    handleInputOptionsAndValue(instance, innerParams);
    openPopup(innerParams);
    initFocus(domCache, innerParams); // Scroll container to top on open (#1247)

    domCache.container.scrollTop = 0;
  });
};

var populateDomCache = function populateDomCache(instance) {
  var domCache = {
    popup: getPopup(),
    container: getContainer(),
    content: getContent(),
    actions: getActions(),
    confirmButton: getConfirmButton(),
    cancelButton: getCancelButton(),
    closeButton: getCloseButton(),
    validationMessage: getValidationMessage(),
    progressSteps: getProgressSteps()
  };
  privateProps.domCache.set(instance, domCache);
  return domCache;
};

var setupTimer = function setupTimer(globalState$$1, innerParams, dismissWith) {
  if (innerParams.timer) {
    globalState$$1.timeout = new Timer(function () {
      dismissWith('timer');
      delete globalState$$1.timeout;
    }, innerParams.timer);
  }
};

var initFocus = function initFocus(domCache, innerParams) {
  if (innerParams.toast) {
    return;
  }

  if (!callIfFunction(innerParams.allowEnterKey)) {
    return blurActiveElement();
  }

  if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
    return domCache.cancelButton.focus();
  }

  if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
    return domCache.confirmButton.focus();
  }

  setFocus(innerParams, -1, 1);
};

var blurActiveElement = function blurActiveElement() {
  if (document.activeElement && typeof document.activeElement.blur === 'function') {
    document.activeElement.blur();
  }
};

/**
 * Updates popup parameters.
 */

function update(params) {
  var popup = getPopup();

  if (!popup || hasClass(popup, swalClasses.hide)) {
    return warn("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
  }

  var validUpdatableParams = {}; // assign valid params from `params` to `defaults`

  Object.keys(params).forEach(function (param) {
    if (Swal.isUpdatableParameter(param)) {
      validUpdatableParams[param] = params[param];
    } else {
      warn("Invalid parameter to update: \"".concat(param, "\". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js"));
    }
  });
  var innerParams = privateProps.innerParams.get(this);

  var updatedParams = _extends({}, innerParams, validUpdatableParams);

  render(this, updatedParams);
  privateProps.innerParams.set(this, updatedParams);
  Object.defineProperties(this, {
    params: {
      value: _extends({}, this.params, params),
      writable: false,
      enumerable: true
    }
  });
}



var instanceMethods = Object.freeze({
	hideLoading: hideLoading,
	disableLoading: hideLoading,
	getInput: getInput$1,
	close: close,
	closePopup: close,
	closeModal: close,
	closeToast: close,
	enableButtons: enableButtons,
	disableButtons: disableButtons,
	enableConfirmButton: enableConfirmButton,
	disableConfirmButton: disableConfirmButton,
	enableInput: enableInput,
	disableInput: disableInput,
	showValidationMessage: showValidationMessage,
	resetValidationMessage: resetValidationMessage$1,
	getProgressSteps: getProgressSteps$1,
	setProgressSteps: setProgressSteps,
	showProgressSteps: showProgressSteps,
	hideProgressSteps: hideProgressSteps,
	_main: _main,
	update: update
});

var currentInstance; // SweetAlert constructor

function SweetAlert() {
  // Prevent run in Node env

  /* istanbul ignore if */
  if (typeof window === 'undefined') {
    return;
  } // Check for the existence of Promise

  /* istanbul ignore if */


  if (typeof Promise === 'undefined') {
    error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
  }

  currentInstance = this;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var outerParams = Object.freeze(this.constructor.argsToParams(args));
  Object.defineProperties(this, {
    params: {
      value: outerParams,
      writable: false,
      enumerable: true,
      configurable: true
    }
  });

  var promise = this._main(this.params);

  privateProps.promise.set(this, promise);
} // `catch` cannot be the name of a module export, so we define our thenable methods here instead


SweetAlert.prototype.then = function (onFulfilled) {
  var promise = privateProps.promise.get(this);
  return promise.then(onFulfilled);
};

SweetAlert.prototype["finally"] = function (onFinally) {
  var promise = privateProps.promise.get(this);
  return promise["finally"](onFinally);
}; // Assign instance methods from src/instanceMethods/*.js to prototype


_extends(SweetAlert.prototype, instanceMethods); // Assign static methods from src/staticMethods/*.js to constructor


_extends(SweetAlert, staticMethods); // Proxy to instance methods to constructor, for now, for backwards compatibility


Object.keys(instanceMethods).forEach(function (key) {
  SweetAlert[key] = function () {
    if (currentInstance) {
      var _currentInstance;

      return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
    }
  };
});
SweetAlert.DismissReason = DismissReason;
SweetAlert.version = '8.19.0';

var Swal = SweetAlert;
Swal["default"] = Swal;

return Swal;

})));
if (typeof this !== 'undefined' && this.Sweetalert2){  this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2}


/***/ }),

/***/ "40c3":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("6b4c");
var TAG = __webpack_require__("5168")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "4178":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("d864");
var invoke = __webpack_require__("3024");
var html = __webpack_require__("32fc");
var cel = __webpack_require__("1ec9");
var global = __webpack_require__("e53d");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("6b4c")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "43fc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__("63b6");
var newPromiseCapability = __webpack_require__("656e");
var perform = __webpack_require__("4439");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "4439":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "454f":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("46a7");
var $Object = __webpack_require__("584a").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "45f2":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("d9f6").f;
var has = __webpack_require__("07e3");
var TAG = __webpack_require__("5168")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "469f":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6c1c");
__webpack_require__("1654");
module.exports = __webpack_require__("7d7b");


/***/ }),

/***/ "46a7":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("63b6");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("8e60"), 'Object', { defineProperty: __webpack_require__("d9f6").f });


/***/ }),

/***/ "47ee":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("c3a1");
var gOPS = __webpack_require__("9aa9");
var pIE = __webpack_require__("355d");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "481b":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "4a59":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var getIterFn = __webpack_require__("27ee");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4c95":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var dP = __webpack_require__("d9f6");
var DESCRIPTORS = __webpack_require__("8e60");
var SPECIES = __webpack_require__("5168")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "4ee1":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("5168")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "504c":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var toIObject = __webpack_require__("6821");
var isEnum = __webpack_require__("52a7").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),

/***/ "50ed":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "5168":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("dbdb")('wks');
var uid = __webpack_require__("62a0");
var Symbol = __webpack_require__("e53d").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "53e2":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("07e3");
var toObject = __webpack_require__("241e");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "549b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("d864");
var $export = __webpack_require__("63b6");
var toObject = __webpack_require__("241e");
var call = __webpack_require__("b0dc");
var isArrayIter = __webpack_require__("3702");
var toLength = __webpack_require__("b447");
var createProperty = __webpack_require__("20fd");
var getIterFn = __webpack_require__("7cd6");

$export($export.S + $export.F * !__webpack_require__("4ee1")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "54a1":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6c1c");
__webpack_require__("1654");
module.exports = __webpack_require__("95d5");


/***/ }),

/***/ "551c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var global = __webpack_require__("7726");
var ctx = __webpack_require__("9b43");
var classof = __webpack_require__("23c6");
var $export = __webpack_require__("5ca1");
var isObject = __webpack_require__("d3f4");
var aFunction = __webpack_require__("d8e8");
var anInstance = __webpack_require__("f605");
var forOf = __webpack_require__("4a59");
var speciesConstructor = __webpack_require__("ebd6");
var task = __webpack_require__("1991").set;
var microtask = __webpack_require__("8079")();
var newPromiseCapabilityModule = __webpack_require__("a5b8");
var perform = __webpack_require__("9c80");
var userAgent = __webpack_require__("a25f");
var promiseResolve = __webpack_require__("bcaa");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("2b4c")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("dcbc")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("7f20")($Promise, PROMISE);
__webpack_require__("7a56")(PROMISE);
Wrapper = __webpack_require__("8378")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("5cc5")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5559":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("dbdb")('keys');
var uid = __webpack_require__("62a0");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "577a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EnyoSelect_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0129");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EnyoSelect_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EnyoSelect_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EnyoSelect_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "584a":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "5b4e":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("36c3");
var toLength = __webpack_require__("b447");
var toAbsoluteIndex = __webpack_require__("0fc9");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "5c95":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("35e8");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5cc5":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("2b4c")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "5d58":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("d8d6");

/***/ }),

/***/ "5d73":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("469f");

/***/ }),

/***/ "5d94":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5df3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("02f4")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("01f9")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "60bb":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__60bb__;

/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "62a0":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "63b6":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var ctx = __webpack_require__("d864");
var hide = __webpack_require__("35e8");
var has = __webpack_require__("07e3");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "656e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("79aa");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "6718":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var LIBRARY = __webpack_require__("b8e3");
var wksExt = __webpack_require__("ccb9");
var defineProperty = __webpack_require__("d9f6").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "67bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("f921");

/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "696e":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("c207");
__webpack_require__("1654");
__webpack_require__("6c1c");
__webpack_require__("24c5");
__webpack_require__("3c11");
__webpack_require__("43fc");
module.exports = __webpack_require__("584a").Promise;


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "69d3":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6718")('asyncIterator');


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6abf":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("e6f3");
var hiddenKeys = __webpack_require__("1691").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "6b4c":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "6c1c":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("c367");
var global = __webpack_require__("e53d");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var TO_STRING_TAG = __webpack_require__("5168")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "6c45":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6c45__;

/***/ }),

/***/ "71c1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var defined = __webpack_require__("25eb");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "765d":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6718")('observable');


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "774e":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("d2d5");

/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "794b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("8e60") && !__webpack_require__("294c")(function () {
  return Object.defineProperty(__webpack_require__("1ec9")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "795b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("696e");

/***/ }),

/***/ "796d":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__796d__;

/***/ }),

/***/ "79aa":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7cd6":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("40c3");
var ITERATOR = __webpack_require__("5168")('iterator');
var Iterators = __webpack_require__("481b");
module.exports = __webpack_require__("584a").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "7d7b":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var get = __webpack_require__("7cd6");
module.exports = __webpack_require__("584a").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "7de1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CrudComponent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5d94");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CrudComponent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CrudComponent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CrudComponent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7e90":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var anObject = __webpack_require__("e4ae");
var getKeys = __webpack_require__("c3a1");

module.exports = __webpack_require__("8e60") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8079":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var macrotask = __webpack_require__("1991").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("2d95")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "83d8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8436":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "85f2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("454f");

/***/ }),

/***/ "8615":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__("5ca1");
var $values = __webpack_require__("504c")(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8e60":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("294c")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "8e6e":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__("5ca1");
var ownKeys = __webpack_require__("990b");
var toIObject = __webpack_require__("6821");
var gOPD = __webpack_require__("11e9");
var createProperty = __webpack_require__("f1ae");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "8f60":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("a159");
var descriptor = __webpack_require__("aebd");
var setToStringTag = __webpack_require__("45f2");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("35e8")(IteratorPrototype, __webpack_require__("5168")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "9003":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("6b4c");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9138":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("35e8");


/***/ }),

/***/ "918e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "95d5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("40c3");
var ITERATOR = __webpack_require__("5168")('iterator');
var Iterators = __webpack_require__("481b");
module.exports = __webpack_require__("584a").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "96cf":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "990b":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("9093");
var gOPS = __webpack_require__("2621");
var anObject = __webpack_require__("cb7c");
var Reflect = __webpack_require__("7726").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "9aa9":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9c80":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a159":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("e4ae");
var dPs = __webpack_require__("7e90");
var enumBugKeys = __webpack_require__("1691");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("1ec9")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("32fc").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "a22a":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("d864");
var call = __webpack_require__("b0dc");
var isArrayIter = __webpack_require__("3702");
var anObject = __webpack_require__("e4ae");
var toLength = __webpack_require__("b447");
var getIterFn = __webpack_require__("7cd6");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "a25f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "a5b8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("d8e8");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "a745":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("f410");

/***/ }),

/***/ "a81f":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_a81f__;

/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "aba2":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var macrotask = __webpack_require__("4178").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("6b4c")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "ae2e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "aebd":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "afe2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AwesomeForm_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("83d8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AwesomeForm_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AwesomeForm_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AwesomeForm_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b0dc":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("e4ae");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "b447":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("3a38");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "b5ca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldJsonTextarea_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ae2e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldJsonTextarea_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldJsonTextarea_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldJsonTextarea_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b8e3":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "bc13":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "bcaa":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var newPromiseCapability = __webpack_require__("a5b8");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "bf0b":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("355d");
var createDesc = __webpack_require__("aebd");
var toIObject = __webpack_require__("36c3");
var toPrimitive = __webpack_require__("1bc3");
var has = __webpack_require__("07e3");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("8e60") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "c207":
/***/ (function(module, exports) {



/***/ }),

/***/ "c32d":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_c32d__;

/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c367":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("8436");
var step = __webpack_require__("50ed");
var Iterators = __webpack_require__("481b");
var toIObject = __webpack_require__("36c3");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("30f1")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "c3a1":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("e6f3");
var enumBugKeys = __webpack_require__("1691");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("54a1");

/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ccb9":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("5168");


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "cd78":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var isObject = __webpack_require__("f772");
var newPromiseCapability = __webpack_require__("656e");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "cebe":
/***/ (function(module, exports) {

if(typeof __WEBPACK_EXTERNAL_MODULE_cebe__ === 'undefined') {var e = new Error("Cannot find module 'axios'"); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = __WEBPACK_EXTERNAL_MODULE_cebe__;

/***/ }),

/***/ "d2d5":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1654");
__webpack_require__("549b");
module.exports = __webpack_require__("584a").Array.from;


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d608":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d864":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("79aa");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "d8d6":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1654");
__webpack_require__("6c1c");
module.exports = __webpack_require__("ccb9").f('iterator');


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d99a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AwesomeTable_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("918e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AwesomeTable_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AwesomeTable_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AwesomeTable_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d9f6":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var toPrimitive = __webpack_require__("1bc3");
var dP = Object.defineProperty;

exports.f = __webpack_require__("8e60") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "dac4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "dbdb":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("584a");
var global = __webpack_require__("e53d");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("b8e3") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "dcbc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("2aba");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "ddbd":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ddbd__;

/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e42f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableAndChartsCard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2154");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableAndChartsCard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableAndChartsCard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TableAndChartsCard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e4ae":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "e53d":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "e6f3":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("07e3");
var toIObject = __webpack_require__("36c3");
var arrayIndexOf = __webpack_require__("5b4e")(false);
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "eb44":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Base64Upload_vue_vue_type_style_index_0_id_23d9f57c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("26cd");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Base64Upload_vue_vue_type_style_index_0_id_23d9f57c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Base64Upload_vue_vue_type_style_index_0_id_23d9f57c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Base64Upload_vue_vue_type_style_index_0_id_23d9f57c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "ebfd":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("62a0")('meta');
var isObject = __webpack_require__("f772");
var has = __webpack_require__("07e3");
var setDesc = __webpack_require__("d9f6").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("294c")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "f1ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "f201":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("e4ae");
var aFunction = __webpack_require__("79aa");
var SPECIES = __webpack_require__("5168")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "f410":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1af6");
module.exports = __webpack_require__("584a").Array.isArray;


/***/ }),

/***/ "f605":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "f772":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "f921":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("014b");
__webpack_require__("c207");
__webpack_require__("69d3");
__webpack_require__("765d");
module.exports = __webpack_require__("584a").Symbol;


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "FieldEnyoSelect", function() { return /* reexport */ FieldEnyoSelect; });
__webpack_require__.d(__webpack_exports__, "FieldFileInput", function() { return /* reexport */ FieldFileInput; });
__webpack_require__.d(__webpack_exports__, "FieldJsonTextarea", function() { return /* reexport */ FieldJsonTextarea; });
__webpack_require__.d(__webpack_exports__, "CrudComponent", function() { return /* reexport */ CrudComponent; });
__webpack_require__.d(__webpack_exports__, "EnyoCrudComponent", function() { return /* reexport */ CrudComponent; });
__webpack_require__.d(__webpack_exports__, "TableAndChartsCard", function() { return /* reexport */ TableAndChartsCard; });
__webpack_require__.d(__webpack_exports__, "EnyoSelect", function() { return /* reexport */ EnyoSelect; });
__webpack_require__.d(__webpack_exports__, "UploadButton", function() { return /* reexport */ UploadButton; });
__webpack_require__.d(__webpack_exports__, "EnyoCard", function() { return /* reexport */ EnyoCard; });
__webpack_require__.d(__webpack_exports__, "EnyoCrudStatsSection", function() { return /* reexport */ EnyoCrudStatsSection; });
__webpack_require__.d(__webpack_exports__, "AwesomeTable", function() { return /* reexport */ AwesomeTable; });
__webpack_require__.d(__webpack_exports__, "AjaxTable", function() { return /* reexport */ AwesomeTable; });
__webpack_require__.d(__webpack_exports__, "AwesomeForm", function() { return /* reexport */ AwesomeForm; });
__webpack_require__.d(__webpack_exports__, "LiveEdit", function() { return /* reexport */ LiveEdit; });
__webpack_require__.d(__webpack_exports__, "apiErrorsMixin", function() { return /* reexport */ apiErrorsMixin; });
__webpack_require__.d(__webpack_exports__, "rolesMixin", function() { return /* reexport */ rolesMixin; });
__webpack_require__.d(__webpack_exports__, "VueEnyoComponents", function() { return /* reexport */ VueEnyoComponents; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/fields/FieldEnyoSelect.vue?vue&type=template&id=63840a0a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('enyo-select',{attrs:{"id":_vm.fieldOptions.id,"options":_vm.internalOptions,"value":_vm.internalValue,"multiple":_vm.fieldOptions.multiple,"track-by":_vm._trackBy || null,"label":_vm.fieldOptions.label || null,"max":_vm.schema.max || _vm.fieldOptions.max || null,"searchable":_vm.schema.searchable || _vm.fieldOptions.searchable || true,"internal-search":_vm.schema.internalSearch || _vm.fieldOptions.internalSearch || !_vm.dataUrl,"disabled":_vm.disabled,"url":_vm.dataUrl},on:{"search-change":_vm.apiRequestDebounced,"input":_vm.updateSelected},model:{value:(_vm.value),callback:function ($$v) {_vm.value=$$v},expression:"value"}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/crud/fields/FieldEnyoSelect.vue?vue&type=template&id=63840a0a&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/promise.js
var promise = __webpack_require__("795b");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    promise_default.a.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new promise_default.a(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: external "vue-form-generator"
var external_vue_form_generator_ = __webpack_require__("a81f");
var external_vue_form_generator_default = /*#__PURE__*/__webpack_require__.n(external_vue_form_generator_);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./src/mixins/selectMixin.js





/* eslint-disable */
/* harmony default export */ var selectMixin = ({
  props: {
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    label: String,
    trackBy: [String, Number],
    vModelValue: [String, Number, Array, Object],
    noResult: String,
    url: String,
    multiple: [String, Boolean],
    searchable: {
      type: [String, Boolean, Number],
      default: false
    }
  },
  model: {
    prop: 'vModelValue',
    event: 'input'
  },
  data: function data() {
    return {
      internalValue: '',
      isLoading: false,
      apiOptions: false
    };
  },
  watch: {
    url: function url() {
      this.setIncomingValue(this.vModelValue);
    },
    vModelValue: function vModelValue(newValue, oldValue) {
      console.log('', "INCOMING VALUE REQUESTED IN SELCT MIXIN", newValue, oldValue);

      if (newValue !== oldValue) {
        this.setIncomingValue(newValue, oldValue);
      }
    },
    value: function value(newValue, oldValue) {
      console.log('', "INCOMING VALUE REQUESTED IN SELCT MIXIN", this.this.vModelValue, 'new val', newValue, 'oldVal', oldValue);

      if (newValue !== oldValue) {
        this.setIncomingValue(newValue, oldValue);
      }
    }
  },
  computed: {
    internalOptions: function internalOptions() {
      return this.apiOptions || this.options;
    },
    dataUrl: function dataUrl() {
      return this.url;
    },
    filteredProps: function filteredProps() {
      var props = Object.assign({}, this.$props);
      delete props.vModelValue;
      delete props.input;
      delete props.value;
      return props;
    }
  },
  methods: {
    // Sets the value from the the the v-model attribute
    setIncomingValue: function setIncomingValue(value, oldValue) {
      var _this = this;

      if (value == oldValue) {
        console.log('setIncomingValue', value, oldValue);
        return;
      }

      if (Array.isArray(value)) {
        this.internalValue = this.internalOptions && this.internalOptions.filter(function (option) {
          var searchKey = typeof option === 'string' ? option : option[_this.trackBy];
          return value.indexOf(searchKey) > -1;
        });
        return;
      }

      this.internalValue = this.internalOptions && this.internalOptions.find(function (option) {
        var searchKey = typeof option === 'string' ? option : option[_this.trackBy];
        return searchKey == value;
      });

      if (!this.internalValue && this.url) {
        this.loadRemoteEntities(value);
      }
    },
    // Sends up the value selected by the multiselect component
    updateSelected: function updateSelected(value
    /* , id */
    ) {
      var _this2 = this;

      console.log('value', value);
      this.internalValue = value;

      if (!value || typeof value === 'string' || typeof value === 'number') {
        this.$emit('input', value);
      } else if (Array.isArray(value)) {
        var valueArray = value.map(function (item) {
          return item[_this2.trackBy];
        });
        this.$emit('input', valueArray);
      } else {
        this.$emit('input', value[this.trackBy]);
      }
    },
    loadRemoteEntities: function loadRemoteEntities() {
      var _this3 = this;

      var searchString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      /* eslint-disable-next-line */
      console.log('LOADING remote entities', searchString);

      if (this.dataUrl) {
        this.isLoading = true;
        var promise = this.$http.get(this.dataUrl, {
          params: {
            listOfValues: true,
            search: searchString
          }
        });
        promise.then(function (res) {
          _this3.apiOptions = res.data.body;
          _this3.isLoading = false;
          /* eslint-disable-next-line */
        }).catch(function (err) {
          console.error(err);
          _this3.isLoading = false;
        });
        return promise;
      }

      return Promise.resolve();
    }
  },
  created: function created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components.multiselect) {
      /* eslint-disable-next-line */
      console.error("'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!");
    }
  },
  mounted: function mounted() {
    console.log('', "FIRST INCOMING CALL HERE", 'value', this.vModelValue, this.value);
    this.setIncomingValue(this.vModelValue);
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/fields/FieldEnyoSelect.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable */


/* harmony default export */ var FieldEnyoSelectvue_type_script_lang_js_ = ({
  mixins: [selectMixin, external_vue_form_generator_default.a.abstractField],
  props: [],
  // 'schema', 'disabled', 'value' are in the abstract field
  data: function data() {
    return {
      myModel: ''
    };
  },
  computed: {
    fieldOptions: function fieldOptions() {
      return this.schema.fieldOptions || {};
    },
    // we need to override the mixin definition
    internalOptions: function internalOptions() {
      return this.apiOptions || this.schema.fieldOptions.values || this.schema.fieldOptions.options || this.schema.values;
    },
    customLabel: function customLabel() {
      if (typeof this.schema.fieldOptions !== 'undefined' && typeof this.schema.fieldOptions.customLabel !== 'undefined' && typeof this.schema.fieldOptions.customLabel === 'function') {
        return this.schema.fieldOptions.customLabel;
      } // this will let the multiselect library use the default behavior if customLabel is not specified


      return undefined;
    },
    dataUrl: function dataUrl() {
      // eslint-disable-next-line
      return this.url || this.fieldOptions.url;
    },
    _trackBy: function _trackBy() {
      return this.$props.trackBy || this.fieldOptions.trackBy || this.schema.foreignKey;
    }
  },
  watch: {
    vModelValue: function vModelValue(newValue, oldValue) {
      console.log('', 'INCOMING vModelValue REQUESTED IN FIELD SELECT', newValue, oldValue);

      if (newValue != oldValue) {
        this.setIncomingValue(newValue, oldValue);
      } else {
        console.warn('[WARN] ITS THE SAME INCOMING VALUE', newValue, oldValue);
      }
    },
    value: function value(newValue, oldValue) {
      console.log('', 'INCOMING VALUE REQUESTED IN FIELD SELECT', newValue, oldValue);

      if (newValue != oldValue) {
        this.setIncomingValue(newValue, oldValue);
      } else {
        console.warn('[WARN] ITS THE SAME INCOMING VALUE', newValue, oldValue);
      }
    }
  },
  created: function created() {
    var _this = this;

    this.apiRequestDebounced = _.debounce(function (value) {
      console.log('', 'DEBOUNCED', _this);
      return _this.loadRemoteEntities(value);
    }, 2000);
  },
  methods: {
    addTag: function addTag(newTag, id) {
      var onNewTag = this.fieldOptions.onNewTag;

      if (typeof onNewTag === 'function') {
        onNewTag(newTag, id, this.options, this.value);
      }
    },
    // Sets the value from the the the v-model attribute
    setIncomingValue: function () {
      var _setIncomingValue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value, oldValue, loop) {
        var _this2 = this;

        var ok;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(value === oldValue)) {
                  _context.next = 5;
                  break;
                }

                console.warn('[WARN] ', 'SAME VALUE', value);
                return _context.abrupt("return");

              case 5:
                console.warn('[WARN] ', 'NEW VALUE => setIncomingValue', oldValue, loop);

              case 6:
                console.log('', 'INCOMING VALUE REQUESTED IN setIncomingValue SELECT', value, oldValue);

                if (!(this.dataUrl && (!this.internalOptions || this.internalOptions.length < 1) && !loop)) {
                  _context.next = 11;
                  break;
                }

                console.log('', "list is empty i'm going to search more options");
                _context.next = 11;
                return this.apiRequestDebounced(value);

              case 11:
                if (!Array.isArray(value)) {
                  _context.next = 14;
                  break;
                }

                this.internalValue = this.internalOptions && this.internalOptions.filter(function (option) {
                  var searchKey = typeof option === 'string' ? option : option[_this2._trackBy];
                  return value.indexOf(searchKey) > -1;
                });
                return _context.abrupt("return");

              case 14:
                this.internalValue = this.internalOptions && this.internalOptions.find(function (option) {
                  var searchKey = typeof option === 'string' ? option : option[_this2._trackBy];
                  return searchKey == value;
                });
                console.log('incoming value ', value, this.dataUrl, this.internalValue);

                if (!(!this.internalValue && this.dataUrl && !loop)) {
                  _context.next = 22;
                  break;
                }

                console.log('[fieldES]', 'remote load', value);
                _context.next = 20;
                return this.apiRequestDebounced(value);

              case 20:
                ok = _context.sent;

                if (ok) {
                  console.log('', 'take 2', value, this.internalOptions.length);
                  this.setIncomingValue(value, null, true);
                }

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setIncomingValue(_x, _x2, _x3) {
        return _setIncomingValue.apply(this, arguments);
      }

      return setIncomingValue;
    }(),
    updateSelected: function updateSelected(value) {
      var _this3 = this;

      this.internalValue = value;

      if (!value || typeof value === 'string' || typeof value === 'number') {
        this.$emit('input', value);
        this.value = value;
      } else if (Array.isArray(value)) {
        var valueArray = value.map(function (item) {
          return _this3._trackBy && item[_this3._trackBy] ? item[_this3._trackBy] : item;
        });
        this.$emit('input', valueArray);
        this.value = valueArray;
      } else {
        this.$emit('input', value[this._trackBy]);
        this.value = value[this._trackBy];
      }
    },
    onSearchChange: function onSearchChange(searchQuery, id) {
      var onSearch = this.fieldOptions.onSearch;
      console.log('onSearch', searchQuery);

      if (typeof onSearch === 'function') {
        onSearch(searchQuery, id, this.options);
      } else {
        this.apiRequestDebounced(searchQuery);
      }
    },
    onSelect: function onSelect()
    /* selectedOption, id */
    {// console.log("onSelect", selectedOption, id);
    },
    onRemove: function onRemove()
    /* removedOption, id */
    {// console.log("onRemove", removedOption, id);
    },
    onOpen: function onOpen()
    /* id */
    {// console.log("onOpen", id);
    },
    onClose: function onClose()
    /* value, id */
    {// console.log("onClose", value, id);
    }
  }
});
// CONCATENATED MODULE: ./src/components/crud/fields/FieldEnyoSelect.vue?vue&type=script&lang=js&
 /* harmony default export */ var fields_FieldEnyoSelectvue_type_script_lang_js_ = (FieldEnyoSelectvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/crud/fields/FieldEnyoSelect.vue





/* normalize component */

var component = normalizeComponent(
  fields_FieldEnyoSelectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FieldEnyoSelect = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/fields/FieldFileInput.vue?vue&type=template&id=81bd6164&
var FieldFileInputvue_type_template_id_81bd6164_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group field-file-input"},[_c('base64-upload',{key:_vm.refresh,attrs:{"disabled":_vm.schema.disabled,"readonly":_vm.schema.readonly,"type":_vm.type,"placeholder":_vm.placeholder,"inputClass":_vm.inputClass,"image-src":_vm.value},on:{"change":_vm.onChangeImage}})],1)}
var FieldFileInputvue_type_template_id_81bd6164_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/crud/fields/FieldFileInput.vue?vue&type=template&id=81bd6164&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form/Base64Upload.vue?vue&type=template&id=23d9f57c&scoped=true&
var Base64Uploadvue_type_template_id_23d9f57c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"base64-upload"},[(_vm.type == "image")?_c('img',{style:(_vm.imageStyle),attrs:{"src":_vm.src}}):_vm._e(),(_vm.type != "image")?_c('p',{class:_vm.inputClass},[_vm._v("\n    "+_vm._s(_vm.name || _vm.placeholder)+"\n  ")]):_vm._e(),_c('input',{attrs:{"type":"file","disabled":_vm.disabled || _vm.readonly,"accept":_vm.type == 'image' ? 'image/*' : '*'},on:{"change":_vm.onChange}})])}
var Base64Uploadvue_type_template_id_23d9f57c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/form/Base64Upload.vue?vue&type=template&id=23d9f57c&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__("a745");
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js

function _arrayWithHoles(arr) {
  if (is_array_default()(arr)) return arr;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js
var get_iterator = __webpack_require__("5d73");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js
var is_iterable = __webpack_require__("c8bb");
var is_iterable_default = /*#__PURE__*/__webpack_require__.n(is_iterable);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/symbol.js
var symbol = __webpack_require__("67bb");
var symbol_default = /*#__PURE__*/__webpack_require__.n(symbol);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js



function _iterableToArrayLimit(arr, i) {
  if (typeof symbol_default.a === "undefined" || !is_iterable_default()(Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = get_iterator_default()(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/from.js
var from = __webpack_require__("774e");
var from_default = /*#__PURE__*/__webpack_require__.n(from);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/unsupportedIterableToArray.js


function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return from_default()(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form/Base64Upload.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Base64Uploadvue_type_script_lang_js_ = ({
  props: {
    imageSrc: String,
    inputClass: String,
    disabled: String,
    readonly: String,
    imageStyle: Object,
    type: {
      type: String,
      default: 'image'
    },
    placeholder: {
      type: String,
      default: 'Choose a file'
    },
    accept: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      src: this.imageSrc,
      name: ''
    };
  },
  methods: {
    onChange: function onChange(event) {
      var _this = this;

      if (event.target.files && event.target.files[0]) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.addEventListener('load', function (e) {
          _this.src = e.target.result;

          var _this$src$split = _this.src.split(','),
              _this$src$split2 = _slicedToArray(_this$src$split, 2),
              base64 = _this$src$split2[1];

          _this.name = file.name;

          _this.$emit('change', {
            size: file.size,
            type: file.type,
            name: file.name,
            base64: base64
          });
        });
        reader.readAsDataURL(file);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/form/Base64Upload.vue?vue&type=script&lang=js&
 /* harmony default export */ var form_Base64Uploadvue_type_script_lang_js_ = (Base64Uploadvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/form/Base64Upload.vue?vue&type=style&index=0&id=23d9f57c&scoped=true&lang=css&
var Base64Uploadvue_type_style_index_0_id_23d9f57c_scoped_true_lang_css_ = __webpack_require__("eb44");

// CONCATENATED MODULE: ./src/components/form/Base64Upload.vue






/* normalize component */

var Base64Upload_component = normalizeComponent(
  form_Base64Uploadvue_type_script_lang_js_,
  Base64Uploadvue_type_template_id_23d9f57c_scoped_true_render,
  Base64Uploadvue_type_template_id_23d9f57c_scoped_true_staticRenderFns,
  false,
  null,
  "23d9f57c",
  null
  
)

/* harmony default export */ var Base64Upload = (Base64Upload_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/fields/FieldFileInput.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
 // import { defaults } from "lodash";
// import moment from "moment";
// You need a specific loader for CSS files


/* harmony default export */ var FieldFileInputvue_type_script_lang_js_ = ({
  components: {
    Base64Upload: Base64Upload
  },
  mixins: [external_vue_form_generator_default.a.abstractField],
  data: function data() {
    return {
      refresh: new Date(),
      type: this.schema && this.schema.fieldOptions && this.schema.fieldOptions.inputType,
      placeholder: this.schema && this.schema.fieldOptions && this.schema.fieldOptions.placeholder,
      inputClass: this.schema && this.schema.fieldOptions && this.schema.fieldOptions.inputClass
    };
  },
  computed: {},
  watch: {
    value: function value(change, old) {
      if (change !== old) {
        this.refresh = Date.now();
      }
    }
  },
  mounted: function mounted() {
    this.oldValue = this.value;
  },
  beforeDestroy: function beforeDestroy() {},
  methods: {
    onChangeImage: function onChangeImage(file) {
      // console.log('Field File input', Object.keys(file));
      this.value = file.base64;
    }
  }
});
// CONCATENATED MODULE: ./src/components/crud/fields/FieldFileInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var fields_FieldFileInputvue_type_script_lang_js_ = (FieldFileInputvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/crud/fields/FieldFileInput.vue?vue&type=style&index=0&lang=scss&
var FieldFileInputvue_type_style_index_0_lang_scss_ = __webpack_require__("1c82");

// CONCATENATED MODULE: ./src/components/crud/fields/FieldFileInput.vue






/* normalize component */

var FieldFileInput_component = normalizeComponent(
  fields_FieldFileInputvue_type_script_lang_js_,
  FieldFileInputvue_type_template_id_81bd6164_render,
  FieldFileInputvue_type_template_id_81bd6164_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FieldFileInput = (FieldFileInput_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/fields/FieldJsonTextarea.vue?vue&type=template&id=0ab770e7&
var FieldJsonTextareavue_type_template_id_0ab770e7_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.innerValue),expression:"innerValue"}],staticClass:"form-control",domProps:{"value":(_vm.innerValue)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.innerValue=$event.target.value},_vm.saveJson]}}),(_vm.warning)?_c('div',{staticClass:"text-danger"},[_c('i',{staticClass:"fa fa-exclamation-circle"}),_vm._v("\n    "+_vm._s(_vm.$t(_vm.warning))+"\n  ")]):_vm._e()])}
var FieldJsonTextareavue_type_template_id_0ab770e7_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/crud/fields/FieldJsonTextarea.vue?vue&type=template&id=0ab770e7&

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__("60bb");
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/fields/FieldJsonTextarea.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
 // import moment from 'moment';

 // You need a specific loader for CSS files

/* harmony default export */ var FieldJsonTextareavue_type_script_lang_js_ = ({
  mixins: [external_vue_form_generator_default.a.abstractField],
  data: function data() {
    return {
      innerValue: "",
      warning: ""
    };
  },
  computed: {},
  watch: {
    // eslint-disable-next-line
    value: function value(change, old) {
      this.innerValue = JSON.stringify(this.value, null, 2);
    }
  },
  created: function created() {
    var that = this;
    this.saveJson = external_lodash_default.a.debounce(function () {
      that.warning = null;

      try {
        if (that.innerValue) {
          that.value = JSON.parse(that.innerValue);
        }

        that.value = that.innerValue;
      } catch (e) {
        that.warning = "common.messages.invalid_json";
      }
    }, 300);
  },
  mounted: function mounted() {},
  beforeDestroy: function beforeDestroy() {},
  methods: {}
});
// CONCATENATED MODULE: ./src/components/crud/fields/FieldJsonTextarea.vue?vue&type=script&lang=js&
 /* harmony default export */ var fields_FieldJsonTextareavue_type_script_lang_js_ = (FieldJsonTextareavue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/crud/fields/FieldJsonTextarea.vue?vue&type=style&index=0&lang=scss&
var FieldJsonTextareavue_type_style_index_0_lang_scss_ = __webpack_require__("b5ca");

// CONCATENATED MODULE: ./src/components/crud/fields/FieldJsonTextarea.vue






/* normalize component */

var FieldJsonTextarea_component = normalizeComponent(
  fields_FieldJsonTextareavue_type_script_lang_js_,
  FieldJsonTextareavue_type_template_id_0ab770e7_render,
  FieldJsonTextareavue_type_template_id_0ab770e7_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FieldJsonTextarea = (FieldJsonTextarea_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/CrudComponent.vue?vue&type=template&id=2618851d&
var CrudComponentvue_type_template_id_2618851d_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content"},[_c('div',{staticClass:"container-fluid"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12"},[(_vm.displayMode === 'view')?_c('AwesomeForm',_vm._b({attrs:{"mode":_vm.displayMode,"displayMode":this.innerOptions.detailPageMode,"item":_vm.selectedItem,"needs-refresh":_vm.awesomeEditNeedsRefresh,"standalone":false},on:{"create":_vm.goToCreatePage,"view":_vm.goToViewPage,"edit":_vm.goToEditPage,"delete":_vm.goToDeletePage,"cancel":_vm.onViewDisplayCancelled,"customAction":_vm.onCustomAction,"itemCreated":_vm.onItemCreated,"itemEdited":_vm.onItemEdited,"itemDeleted":_vm.onItemDeleted,"itemViewed":_vm.onItemViewed,"itemValidated":_vm.onItemValidated,"itemValidationFailed":_vm.onItemValidationFailed}},'AwesomeForm',_vm.$props,false)):_vm._e(),(_vm.displayMode === 'edit' || _vm.displayMode === 'create')?_c('AwesomeForm',_vm._b({attrs:{"mode":_vm.displayMode,"displayMode":this.innerOptions.detailPageMode,"item":_vm.selectedItem,"needs-refresh":_vm.awesomeEditNeedsRefresh,"standalone":false},on:{"create":_vm.goToCreatePage,"view":_vm.goToViewPage,"edit":_vm.goToEditPage,"delete":_vm.goToDeletePage,"cancel":_vm.onEditDisplayCancelled,"customAction":_vm.onCustomAction,"itemCreated":_vm.onItemCreated,"itemEdited":_vm.onItemEdited,"itemDeleted":_vm.onItemDeleted,"itemViewed":_vm.onItemViewed,"itemValidated":_vm.onItemValidated,"itemValidationFailed":_vm.onItemValidationFailed}},'AwesomeForm',_vm.$props,false)):_vm._e()],1),_c('div',{directives:[{name:"show",rawName:"v-show",value:(
          _vm.displayMode === 'table' || _vm.innerOptions.detailPageMode !== 'page'
        ),expression:"\n          displayMode === 'table' || innerOptions.detailPageMode !== 'page'\n        "}],staticClass:"col-12"},[(_vm.innerOptions.stats)?_c('div',{staticClass:"row"},[_c('EnyoCrudStatsSection',{attrs:{"url":_vm._url + '/stats',"entity":_vm.identity,"stats-needs-refresh":_vm.statsNeedsRefresh},on:{"update:statsNeedsRefresh":function($event){_vm.statsNeedsRefresh=$event},"update:stats-needs-refresh":function($event){_vm.statsNeedsRefresh=$event}}})],1):_vm._e(),_c('div',{staticClass:"text-right"},[_vm._t("top-right-buttons",[(_vm.options && _vm.options.customTopRightActions)?_vm._l((_vm.options.customTopRightActions),function(action,index){return _c('button',{key:index,staticClass:"btn btn-link btn-main-style",class:action.class,attrs:{"id":action.name,"data-title":action.title || action.label,"tooltip":action.title || action.label,"data-tooltip":action.title || action.label},on:{"click":function($event){return _vm.customAction({
                    action: action,
                    location: 'topright',
                    id: action.name,
                  })}}},[(action.icon)?_c('i',{class:action.icon}):_vm._e(),_c('span',{domProps:{"innerHTML":_vm._s(action.label ? _vm.$t(action.label) : '')}})])}):_vm._e(),(_vm._actions.create)?_c('button',{staticClass:"btn btn-primary btn-main-style mb-1",on:{"click":function($event){return _vm.goToCreatePage()}}},[_c('i',{staticClass:"fa fa-plus"}),_vm._v("\n              "+_vm._s(_vm.$t('EnyoCrudComponent.labels.createNew'))+" "+_vm._s(_vm._name)+"\n            ")]):_vm._e()]),_c('div',{staticStyle:{"display":"inline-block"}})],2),_c('AwesomeTable',{attrs:{"columns":_vm.innerOptions.columns,"columns-displayed":_vm.innerOptions.columnsDisplayed,"entity":_vm.identity,"mode":_vm.innerOptions.dataPaginationMode || _vm.innerOptions.mode,"url":_vm._url,"api-query-params":_vm.innerOptions.queryParams,"api-query-headers":_vm.innerOptions.queryParams,"apiRequestConfig":_vm.apiRequestConfig,"apiResponseConfig":_vm.apiResponseConfig,"needs-refresh":_vm.tableNeedsRefresh,"nested-crud-needs-refresh":_vm.nestedCrudNeedsRefresh,"options":_vm.innerOptions,"actions":_vm._actions,"auto-refresh":_vm.innerOptions.autoRefresh,"auto-refresh-interval":_vm.innerOptions.autoRefreshInterval,"export-url":_vm.innerOptions.exportUrl,"title":_vm._title ||
              _vm.$t('EnyoCrudComponent.labels.manageTitle') + ' ' + _vm._titlePlural,"name":"ajax-table"},on:{"update:needsRefresh":function($event){_vm.tableNeedsRefresh=$event},"update:needs-refresh":function($event){_vm.tableNeedsRefresh=$event},"update:nestedCrudNeedsRefresh":function($event){_vm.nestedCrudNeedsRefresh=$event},"update:nested-crud-needs-refresh":function($event){_vm.nestedCrudNeedsRefresh=$event},"create":_vm.goToCreatePage,"view":_vm.goToViewPage,"edit":_vm.goToEditPage,"delete":_vm.goToDeletePage,"customAction":_vm.onCustomAction,"crud-list-updated":_vm.onListUpdated,"refresh":_vm.onTableRefresh}},[_c('template',{slot:"table-top-more-actions"},[(_vm._actions.import)?_c('upload-button',{attrs:{"name":"import","options":{
                upload: true,
                targetUrl: _vm.innerOptions.uploadUrl || _vm.innerOptions.importUrl,
                method: 'POST',
                headers: {},
                base64: false,
                label: _vm.$t('EnyoCrudComponent.buttons.import'),
                class: 'btn btn-main-style btn-success  btn-block',
              }},on:{"uploaded":_vm.importResponse}}):_vm._e(),(_vm._actions.import)?_c('button',{staticClass:"btn btn-info btn-link btn-alt-style btn-block",on:{"click":_vm.exportTemplateCallBack}},[_c('i',{staticClass:"fa fa-file-excel"}),_vm._v("\n              "+_vm._s(_vm.$t('EnyoCrudComponent.buttons.excel-template'))+"\n            ")]):_vm._e()],1)],2)],1)])])])}
var CrudComponentvue_type_template_id_2618851d_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/crud/CrudComponent.vue?vue&type=template&id=2618851d&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js
var es7_object_get_own_property_descriptors = __webpack_require__("8e6e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("85f2");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  if (key in obj) {
    define_property_default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.promise.finally.js
var es7_promise_finally = __webpack_require__("097d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.values.js
var es7_object_values = __webpack_require__("8615");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// CONCATENATED MODULE: ./src/mixins/apiErrorsMixin.js
/* harmony default export */ var apiErrorsMixin = ({
  methods: {
    apiErrorCallback: function apiErrorCallback(err) {
      this.$notifications.clear();

      if (err && !err.response) {
        // network error
        // console.log(err);
        this.$notify({
          title: this.$t('common.messages.network_error'),
          type: 'warning'
        });
        return;
      }

      var message;

      if (this.$t("common.messages.".concat(this.parseErrorResponse(err.response || err.data || err)))) {
        message = this.$t("common.messages.".concat(this.parseErrorResponse(err.response)));
      } else {
        message = this.parseErrorResponse(err.response || err.data || err);
      }

      this.$notify({
        title: message,
        type: 'warning'
      });
    },
    parseErrorResponse: function parseErrorResponse(err) {
      if (!err) {
        return '';
      }

      if (err.data) {
        if (err.data.message) {
          return err.data.message;
        }

        if (err.data.errors) {
          if (err.data.errors[0] && err.data.errors[0].message) {
            return err.data.errors[0].message;
          }

          return JSON.stringify(err.data.errors);
        }

        return err.data instanceof String ? err.data : JSON.stringify(err.data);
      }

      return "Error status: ".concat(err.status);
    }
  }
});
// CONCATENATED MODULE: ./src/mixins/apiConfigMixin.js




/**
 * Mixin for components that talks to apis
 */

/* harmony default export */ var apiConfigMixin = ({
  props: {
    primaryKey: {
      type: String,
      default: "id"
    },
    url: {
      type: String,
      default: ""
    },
    apiRequestConfig: {
      type: Object,
      note: "This object define the configuration for talking to the api : filters, sort, pagination, etc",
      default: function _default() {
        return {
          dataPath: "",
          perPageField: "perPage",
          pageField: "page",
          filtersField: "filters",
          sortField: "sort",
          searchField: "search"
        };
      }
    },
    apiResponseConfig: {
      type: Object,
      note: "This object define the configuration for processing data coming from the api : count, data path",
      default: function _default() {
        return {
          dataPath: "data.body",
          totalCountPath: "data.totalCount"
        };
      }
    },
    apiQueryParams: {
      type: Object,
      default: function _default() {
        return {};
      },
      note: "A params object containing parameters that will be passed as query params to the api request.\n It's up to the server to treat these requests. Example of uses incluse passing a `filter` object, or an options object. In one of our projects we pass the args options.searchMode = `exact|startWith|wildcard|regex` to determine how the filtering options will ve treated in the back."
    },
    apiRequestHeaders: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    entity: {
      type: String,
      default: "",
      note: "Unique name of the currently displayed list. This serve to retrieve and display titles from the vue-i8n translations"
    },
    refresh: {
      type: Function,
      default: undefined
    },
    delete: {
      type: Function,
      default: undefined
    },
    create: {
      type: Function,
      default: undefined
    },
    exportUrl: {
      type: String,
      default: undefined
    },
    needsRefresh: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    // @todo delete in future version
    params: function params() {
      // eslint-disable-next-line
      console.info("BC this.params is deprecated, use this.apiQueryParams instead");
      return this.apiQueryParams;
    },
    opts: function opts() {
      return external_lodash_default.a.merge(this.defaultOptions, this.options);
    },
    _translatedServerParams: function _translatedServerParams() {
      var _this = this;

      var translatedParams = {};
      Object.keys(this.serverParams).forEach(function (field) {
        var newKey = _this.apiRequestConfig[field + "Field"] || field;
        translatedParams[newKey] = _this.serverParams[field];
      });
      return translatedParams;
    }
  },
  created: function created() {
    if (!this.$http) {
      try {
        var axios = __webpack_require__("cebe");

        this.$http = axios;
      } catch (err) {// console.warn(err.message);
      }
    }
  }
});
// EXTERNAL MODULE: ./src/translations/en.json
var en = __webpack_require__("26d5");

// CONCATENATED MODULE: ./src/mixins/i18nMixin.js



/* harmony default export */ var i18nMixin = ({
  props: {
    translations: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    _translations: function _translations() {
      return Object(external_lodash_["merge"])(this.translations, en); // return en;
    }
  },
  created: function created() {
    var _this = this;

    if (!this.$t) {
      this.$t = function (str) {
        var val = Object(external_lodash_["get"])(_this._translations, str) || str;

        if (false) {}

        return val;
      };

      this.$te = function (str) {
        return !!Object(external_lodash_["get"])(_this._translations, str);
      };
    }
  }
});
// CONCATENATED MODULE: ./src/mixins/defaultProps.js
var defaultActions = {
  noActions: false,
  search: true,
  filter: true,
  create: true,
  edit: true,
  view: true,
  delete: true,
  export: false,
  import: false,
  dateFilter: true,
  refresh: true
};
// EXTERNAL MODULE: ./node_modules/sweetalert2/dist/sweetalert2.js
var sweetalert2 = __webpack_require__("3dd1");
var sweetalert2_default = /*#__PURE__*/__webpack_require__.n(sweetalert2);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/table/AwesomeTable.vue?vue&type=template&id=0682e63d&
var AwesomeTablevue_type_template_id_0682e63d_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card ajax-table-card"},[_c('div',{staticClass:"card-header",class:'ajax-table-header ' +
        (_vm.opts.headerStyle ? 'colored-header bg-' + _vm.opts.headerStyle : '')},[_c('h3',{staticClass:"card-title ajax-table-header text-primary text-left"},[_vm._t("table-title",[_vm._v("\n        "+_vm._s(_vm._tableTitle)+"\n      ")]),_c('div',{staticClass:"btn-group btn-group-sm float-right"},[_vm._t("table-top-actions"),(_vm.canHideColumns)?_c('div',{staticClass:"dropdown"},[_c('button',{staticClass:"btn btn-secondary btn-simple dropdown-toggle",attrs:{"id":"dropdownMenuButton","type":"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[_vm._v("\n            Columns\n          ")]),_c('div',{staticClass:"dropdown-menu",staticStyle:{"max-height":"100vh","overflow":"auto"},attrs:{"aria-labelledby":"dropdownMenuButton"}},_vm._l((_vm.formattedColumns),function(col,index){return _c('button',{key:index,staticClass:"dropdown-item",class:{
                'text-light bg-primary': _vm.columnsState[col.field],
                'bg-info': col.field === 'ACTIONS',
              },attrs:{"type":"button","href":"#","disabled":col.field === 'ACTIONS'},on:{"click":function($event){return _vm.toggleColumn(col.field)}}},[_vm._v("\n              "+_vm._s(col.label)+"\n            ")])}),0)]):_vm._e(),(_vm.isRefreshing)?_c('div',{staticStyle:{"text-align":"center"}},[_c('i',{staticClass:"fa fa-circle-o-notch fa-spin fa-2x fa-fw",staticStyle:{"color":"orange","margin-left":"10px"}})]):_vm._e(),(_vm._actions.filter)?_c('button',{staticClass:"btn btn-link btn-alt-style",class:{ 'btn-primary': _vm.filterable, 'btn-default': !_vm.filterable },attrs:{"type":"button"},on:{"click":function($event){return _vm.toggleFilter()}}},[_c('i',{staticClass:"fa fa-filter"}),_vm._v("\n          "+_vm._s(_vm.$t('AwesomeTable.buttons.filters'))+"\n        ")]):_vm._e(),_c('div',{staticClass:"dropdown"},[(_vm._actions && _vm._actions.refresh)?_c('button',{staticClass:"btn btn-link btn-alt-style",on:{"click":function($event){return _vm.getItems()}}},[_c('i',{class:'fa fa-refresh' + (_vm.isRefreshing ? ' fa-spin' : '')}),_vm._v("\n            "+_vm._s(_vm.$t('AwesomeTable.buttons.refresh'))+"\n          ")]):_vm._e(),(_vm._actions && (_vm._actions.export || _vm._actions.import))?_c('button',{staticClass:"btn btn-secondary btn-main-style dropdown-toggle",attrs:{"id":"dropdownMenuButton","type":"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[_c('i',{staticClass:"fa fa-plus"}),_vm._v("\n            "+_vm._s(_vm.$t('AwesomeTable.more'))+"\n          ")]):_vm._e(),_c('div',{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},[_vm._t("table-top-more-actions"),(_vm._actions && _vm._actions.export)?_c('button',{staticClass:"btn btn-success btn-main-style btn-block",on:{"click":_vm.exportCallBack}},[_c('i',{staticClass:"fa fa-file-excel"}),_vm._v("\n              "+_vm._s(_vm.$t('AwesomeTable.buttons.excel'))+"\n            ")]):_vm._e(),_c('button',{staticClass:"btn btn-default btn-main-style btn-block",on:{"click":_vm.exportCurrentArrayToExcel}},[_c('i',{staticClass:"fa fa-file-excel"}),_vm._v("\n              "+_vm._s(_vm.$t('AwesomeTable.buttons.excel-currentpage'))+"\n            ")])],2)])],2)],2),_c('p',{staticClass:"card-category"},[_vm._t("table-subtitle")],2)]),_c('div',{staticClass:"card-body ajax-table-card-body"},[_c('div',{staticClass:"table-responsive"},[_c('vue-good-table',{attrs:{"mode":_vm.mode,"total-rows":_vm.totalCount,"style-class":"vgt-table table striped","columns":_vm.displayedColumns,"fixed-header":_vm.opts && _vm.opts.fixedHeader,"max-height":_vm.opts.maxHeight,"rows":_vm.data || [],"filter-options":{
          enabled: _vm._actions.filter,
        },"search-options":{
          enabled: _vm._actions.search,
          placeholder: this.$t('AwesomeTable.searchInput'),
        },"pagination-options":{
          enabled: _vm.opts && _vm.opts.pagination,
          nextLabel: this.$t('AwesomeTable.next'),
          prevLabel: this.$t('AwesomeTable.prev'),
          rowsPerPageLabel: this.$t('AwesomeTable.rows_per_page'),
          ofLabel: this.$t('AwesomeTable.of'),
          pageLabel: this.$t('AwesomeTable.page'),
          allLabel: this.$t('AwesomeTable.all'),
          perPage: _vm.perPage,
        }},on:{"on-page-change":_vm.onPageChange,"on-sort-change":_vm.onSortChange,"on-column-filter":_vm.onColumnFilter,"on-per-page-change":_vm.onPerPageChange,"on-search":_vm.onSearch},scopedSlots:_vm._u([{key:"table-row",fn:function(props){return [(props.column.field === 'ACTIONS')?_c('span',{staticClass:"text-right"},[_vm._t("table-row-actions",[(_vm.opts && _vm.opts.customInlineActions)?[_vm._l((_vm.opts.customInlineActions),function(action,index){return [(
                      !action.canDisplay ||
                        action.canDisplay({ item: props.row }, this)
                    )?_c('button',{key:index,staticClass:"btn btn-xs btn-alt-style",class:action.class,attrs:{"id":action.name + '-' + props.index,"data-title":action.title || action.label,"data-tooltip":action.title || action.label},on:{"click":function($event){return _vm.$emit('customAction', {
                        action: action,
                        item: props.row,
                        location: 'inline',
                        props: props,
                        id: action.name + '-' + props.index,
                      })}}},[(action.icon)?_c('i',{class:action.icon}):_vm._e(),_c('span',{domProps:{"innerHTML":_vm._s(action.label ? _vm.$t(action.label) : '')}})]):_vm._e()]})]:_vm._e()],{"item":props.row}),(_vm._actions.view)?_c('button',{staticClass:"btn btn-xs btn-alt-style btn-icon",on:{"click":function($event){return _vm.$emit('view', props.row)}}},[_c('i',{staticClass:"fa fa-eye text-info"})]):_vm._e(),(_vm._actions.edit)?_c('button',{staticClass:"btn btn-xs btn-alt-style btn-icon",on:{"click":function($event){return _vm.$emit('edit', props.row)}}},[_c('i',{staticClass:"fa fa-pencil fa fa-pencil"})]):_vm._e(),(_vm._actions.delete)?_c('button',{staticClass:"btn btn-xs btn-alt-style btn-icon",on:{"click":function($event){return _vm.$emit('delete', props.row)}}},[_c('i',{staticClass:"fa fa-trash text-danger"})]):_vm._e()],2):(props.column.type === 'image')?_c('span',{staticClass:"pointer",on:{"click":function($event){return _vm.clickOnLine(props.row)}}},[_c('img',{staticClass:"ajax-table-img",attrs:{"src":props.formattedRow[props.column.field],"alt":"image"}})]):(props.column.type === 'boolean')?_c('div',{staticClass:"text-avoid-overflow",attrs:{"data-value":props.formattedRow[props.column.field]}},[_c('i',{staticClass:"fa",class:{
                'fa-check text-success':
                  props.formattedRow[props.column.field],
                'fa-times text-danger':
                  !props.formattedRow[props.column.field] &&
                  props.formattedRow[props.column.field] !== undefined,
              }})]):(props.column.type === 'url')?_c('div',{staticClass:"text-avoid-overflow"},[_c('a',{staticClass:"ajax-table-href",attrs:{"href":props.formattedRow[props.column.field],"target":"_blank"}},[_vm._v(_vm._s(props.formattedRow[props.column.field]))])]):(props.column.type === 'html')?_c('div',{staticClass:"pointer",domProps:{"innerHTML":_vm._s(props.formattedRow[props.column.field])},on:{"click":function($event){return _vm.clickOnLine(props.row)}}}):(props.column.type === 'relation')?_c('div',{staticClass:"text-avoid-overflow"},[_c('router-link',{staticClass:"ajax-table-href",attrs:{"to":'/app' +
                  props.column.relation +
                  '/' +
                  props.formattedRow[props.column.field]}},[_c('span',{staticClass:"badge badge-info"},[_vm._v("\n                "+_vm._s(props.column.listName
                    ? _vm.getLovValue(
                        props.formattedRow[props.column.field],
                        props.column.listName
                      )
                    : props.formattedRow[props.column.field])+"\n              ")])])],1):(
              props.column.type === 'list-of-value' ||
                props.column.type === 'lov'
            )?_c('span',{staticClass:"pointer",on:{"click":function($event){return _vm.clickOnLine(props.row)}}},[_vm._v(_vm._s(_vm.getLovValue(
                props.formattedRow[props.column.field],
                props.column.listName
              )))]):(props.column.type === 'list-of-data')?_c('span',{staticClass:"pointer",on:{"click":function($event){return _vm.clickOnLine(props.row)}}},[_vm._v(_vm._s(_vm.getDataValue(
                props.formattedRow[props.column.field],
                props.column.listName
              )))]):(props.column.type === 'object')?_c('div',{staticClass:"pointer text-avoid-overflow",on:{"click":function($event){return _vm.clickOnLine(props.row)}}},[_vm._v("\n            |\n            "),_vm._l((props.formattedRow[props.column.field]),function(value,key){return [_c('div',{key:key},[_c('label',[_vm._v(_vm._s(key)+":")]),_c('label',{staticClass:"text-primary"},[_vm._v(_vm._s(value))]),_vm._v(" |\n              ")])]})],2):(props.column.type === 'checkbox')?_c('div',{staticClass:"pointer text-avoid-overflow",on:{"click":function($event){return _vm.clickOnLine(props.row)}}},[(props.formattedRow[props.column.field] === true)?_c('input',{staticClass:"ajax-table-checkbox",attrs:{"type":"checkbox","checked":"","disabled":""}}):_c('input',{staticClass:"ajax-table-checkbox",attrs:{"type":"checkbox","disabled":""}})]):_c('div',{staticClass:"pointer text-avoid-overflow",class:props.column.class +
                ' ajax-table-col-' +
                props.column.field +
                ' ajax-table-col-value-' +
                props.formattedRow[props.column.field],style:(props.column.style),on:{"click":function($event){return _vm.clickOnLine(props.row)}}},[_vm._v("\n            "+_vm._s(props.formattedRow[props.column.field])+"\n          ")])]}}],null,true)},[_c('div',{attrs:{"slot":"table-actions"},slot:"table-actions"},[(_vm.opts && _vm.opts.customTableTopActions)?[_vm._l((_vm.opts.customTableTopActions),function(action,index){return [(
                  !action.canDisplay ||
                    action.canDisplay({ item: _vm.props.row }, this)
                )?_c('button',{key:index,staticClass:"btn btn-xs btn-main-style",class:action.class,attrs:{"data-title":action.title || action.label,"tooltip":action.title || action.label,"data-tooltip":action.title || action.label},on:{"click":function($event){return _vm.$emit('customAction', { action: action, location: 'tabletop' })}}},[(action.icon)?_c('i',{class:action.icon}):_vm._e(),_c('span',{domProps:{"innerHTML":_vm._s(action.label ? _vm.$t(action.label) : '')}})]):_vm._e()]})]:_vm._e(),(_vm._actions.filter && _vm._actions.dateFilter && _vm.filterable)?_c('date-range-picker',{staticClass:"form-group vgt-date-range",attrs:{"placeholder":_vm.$t('AwesomeTable.daterange.start'),"start-date":_vm.defaultStartDate,"end-date":_vm.defaultEndDate,"locale-data":_vm.datePicker.locale,"opens":'left'},on:{"update":_vm.onDateFilter}}):_vm._e()],2),_c('div',{attrs:{"slot":"emptystate"},slot:"emptystate"},[_vm._v("\n          "+_vm._s(_vm.$t('AwesomeTable.empty'))+"\n        ")])])],1)])])}
var AwesomeTablevue_type_template_id_0682e63d_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/table/AwesomeTable.vue?vue&type=template&id=0682e63d&

// EXTERNAL MODULE: external "vue2-daterange-picker"
var external_vue2_daterange_picker_ = __webpack_require__("33a0");
var external_vue2_daterange_picker_default = /*#__PURE__*/__webpack_require__.n(external_vue2_daterange_picker_);

// EXTERNAL MODULE: external "vue-good-table"
var external_vue_good_table_ = __webpack_require__("ddbd");

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__("c32d");
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// EXTERNAL MODULE: external "qs"
var external_qs_ = __webpack_require__("796d");
var external_qs_default = /*#__PURE__*/__webpack_require__.n(external_qs_);

// CONCATENATED MODULE: ./src/mixins/apiListMixin.js










/**
 * Mixin for components that render lists from an arg or an api
 */




/* harmony default export */ var apiListMixin = ({
  mixins: [apiConfigMixin],
  props: {
    rows: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    primaryKey: {
      type: String,
      default: "id"
    },
    url: {
      type: String,
      default: ""
    },
    apiRequestConfig: {
      type: Object,
      note: "This object define the configuration for talking to the api : filters, sort, pagination, etc",
      default: function _default() {
        return {
          dataPath: "",
          perPageField: "perPage",
          pageField: "page",
          filtersField: "filters",
          sortField: "sort",
          searchField: "search"
        };
      }
    },
    apiResponseConfig: {
      type: Object,
      note: "This object define the configuration for processing data coming from the api : count, data path",
      default: function _default() {
        return {
          dataPath: "data.body",
          totalCountPath: "data.totalCount"
        };
      }
    },
    apiQueryParams: {
      type: Object,
      default: function _default() {
        return {};
      },
      note: "A params object containing parameters that will be passed as query params to the api request.\n It's up to the server to treat these requests. Example of uses incluse passing a `filter` object, or an options object. In one of our projects we pass the args options.searchMode = `exact|startWith|wildcard|regex` to determine how the filtering options will ve treated in the back."
    },
    apiQueryHeaders: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    entity: {
      type: String,
      default: "",
      note: "Unique name of the currently displayed list. This serve to retrieve and display titles from the vue-i8n translations"
    },
    title: {
      type: String,
      default: ""
    },
    refresh: {
      type: Function,
      default: undefined
    },
    delete: {
      type: Function,
      default: undefined
    },
    create: {
      type: Function,
      default: undefined
    },
    exportUrl: {
      type: String,
      default: undefined
    },
    needsRefresh: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: [String, Number],
      default: 20
    },
    limit: {
      type: [String, Number],
      default: 1000,
      note: "Limit serves in case of local pagination to limit the number of results from the api, in order to avoid memory overflows"
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    mode: {
      default: "local",
      type: String
    }
  },
  data: function data() {
    return {
      totalCount: 0,
      isRefreshing: false,
      serverParams: {
        // a map of column filters example: {name: 'john', age: '20'}
        filters: {},
        range: {},
        sort: {},
        page: 1,
        // what page I want to show
        perPage: this.mode === "remote" ? this.perPage : this.limit // how many items I'm showing per page

      },
      data: []
    };
  },
  computed: {
    // @todo delete in future version
    params: function params() {
      // eslint-disable-next-line
      console.info("BC this.params is deprecated, use this.apiQueryParams instead");
      return this.apiQueryParams;
    },
    opts: function opts() {
      return external_lodash_default.a.merge(this.defaultOptions, this.options);
    },
    _translatedServerParams: function _translatedServerParams() {
      var _this = this;

      var translatedParams = {};
      Object.keys(this.serverParams).forEach(function (field) {
        var newKey = _this.apiRequestConfig[field + "Field"] || field;
        translatedParams[newKey] = _this.serverParams[field];
      });
      return translatedParams;
    }
  },
  watch: {
    needsRefresh: "refreshLocalData",
    apiQueryParams: function apiQueryParams() {
      this.serverParams = external_lodash_default.a.merge({}, this.serverParams, this.apiQueryParams);
      this.getItems();
    },
    entity: "entityChanged",
    // store: changed => {},
    rows: "refreshLocalData"
  },
  created: function created() {
    if (!this.$http) {
      try {
        var axios = __webpack_require__("cebe");

        this.$http = axios;
      } catch (err) {// console.warn(err.message);
      }
    }
  },
  beforeMount: function beforeMount() {
    var userLang = window.navigator ? navigator.language || navigator.userLanguage : "en";
    external_moment_default.a.locale(userLang);
  },
  mounted: function mounted() {
    this.refreshLocalData();
  },
  beforeDestroy: function beforeDestroy() {},
  methods: {
    startCase: external_lodash_default.a.startCase,
    // eslint-disable-next-line
    refreshLocalData: function () {
      var _refreshLocalData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(changed) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.url) {
                  _context.next = 7;
                  break;
                }

                this.data = [];
                this.serverParams = external_lodash_default.a.merge({}, this.serverParams, this.apiQueryParams);
                _context.next = 5;
                return this.getItems();

              case 5:
                _context.next = 10;
                break;

              case 7:
                this.data = this.rows;
                this.totalCount = this.rows ? this.rows.length : 0;
                this.$forceUpdate();

              case 10:
                this.localRefreshCompleted();

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function refreshLocalData(_x) {
        return _refreshLocalData.apply(this, arguments);
      }

      return refreshLocalData;
    }(),
    entityChanged: function entityChanged() {
      this.data = this.url ? [] : this.rows;
      this.serverParams = {};
      this.getItems();
    },
    localRefreshCompleted: function localRefreshCompleted() {
      this.$emit("update:needsRefresh", false);
      this.$emit("afterRefresh", {
        data: this.data
      });
    },

    /** GET ENTITY ITEMS */
    getItems: function getItems() {
      var _this2 = this;

      this.$emit("refresh"); // if i got a refresh function

      if (this.refresh) {
        this.refresh();
        return;
      }

      if (!this.url) {
        return;
      }

      this.isRefreshing = true;
      return this.$http.get("".concat(this.url, "?").concat(external_qs_default.a.stringify(this._translatedServerParams, {})), {}).then(function (res) {
        _this2.data = _this2.apiResponseConfig && _this2.apiResponseConfig.dataPath && _this2.apiResponseConfig.dataPath != false ? external_lodash_default.a.get(res, _this2.apiResponseConfig.dataPath) : res.data;
        _this2.totalCount = _this2.apiResponseConfig && _this2.apiResponseConfig.totalCountPath && _this2.apiResponseConfig.totalCountPath != false ? external_lodash_default.a.get(res, _this2.apiResponseConfig.totalCountPath) : res.data.totalCount;

        _this2.$emit("crud-list-updated", _this2.data);

        _this2.$emit("dataChanged", _this2.data);
      }).catch(function (err) {
        // eslint-disable-next-line
        console.warn(err);
      }).finally(function () {
        _this2.isRefreshing = false;
      });
    },
    onClick: function onClick(item) {
      // @todo stop emitting the view event. itemClicked is enough
      this.opts && this.opts.actions && this.opts.actions.view && this.$emit("view", item);
      this.$emit("itemClicked", item);
    },
    updateParams: function updateParams(newProps) {
      this.serverParams = Object.assign({}, this.apiQueryParams, this.serverParams, newProps);
    },
    // sort functions for unkown types
    // eslint-disable-next-line
    sortFn: function sortFn(x, y, col, rowX, rowY) {
      return x < y ? -1 : x > y ? 1 : 0;
    },
    onPageChange: function onPageChange(params) {
      if (this.mode !== "remote") {
        return;
      }

      this.updateParams({
        page: params.currentPage
      });
      this.getItems();
    },
    onPerPageChange: function onPerPageChange(params) {
      if (this.mode !== "remote") {
        return;
      }

      this.updateParams({
        perPage: params.currentPerPage
      });
      this.getItems();
    },
    onSearch: function onSearch(params) {
      if (this.mode !== "remote") {
        return;
      }

      var search = params.searchTerm;
      this.updateParams({
        search: search,
        page: 1
      });
      this.getItems();
    },
    exportCurrentArrayToExcel: function exportCurrentArrayToExcel() {
      var CsvString = ""; // eslint-disable-next-line

      var head = this.data[0];
      Object.keys(head).forEach(function (ColItem) {
        CsvString += "".concat(ColItem, ",");
      });
      CsvString += "\r\n";
      this.data.forEach(function (RowItem) {
        // eslint-disable-next-line
        Object.values(RowItem).forEach(function (ColItem) {
          CsvString += "".concat(ColItem, ",");
        });
        CsvString += "\r\n";
      });
      CsvString = "data:application/csv,".concat(encodeURIComponent(CsvString));
      var x = document.createElement("A");
      x.setAttribute("href", CsvString);
      x.setAttribute("download", "somedata.csv");
      document.body.appendChild(x);
      x.click();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/table/AwesomeTable.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var AwesomeTablevue_type_script_lang_js_ = ({
  name: 'AwesomeTable',
  token: "\n  <AwesomeTable  :title=\"title\" :columns=\"tableColumns\" :rows=\"dataSource\" :needsRefresh=\"needsRefresh\" :options=\"tableOptions\">\n  <template slot=\"table-actions\"></template>\n  <template slot=\"table-top-actions\"></template>\n  <template slot=\"table-top-more-actions\"></template>\n  <template slot=\"table-subtitle\"></template>\n  <template slot=\"table-row-actions\"></template>\n\n  <!-- END OF ARRAY -->\n  </AwesomeTable>\n  ",
  components: {
    DateRangePicker: external_vue2_daterange_picker_default.a,
    VueGoodTable: external_vue_good_table_["VueGoodTable"]
  },
  mixins: [i18nMixin, apiErrorsMixin, apiListMixin],
  props: {
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    columnsDisplayed: {
      type: Number,
      default: 8
    },
    rows: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    url: {
      type: String,
      default: ''
    },
    entity: {
      type: String,
      default: '',
      note: 'Unique name of the currently displayed list. This serve to retrieve and display titles from the vue-i8n translations'
    },
    title: {
      type: String,
      default: ''
    },
    translations: {
      type: Object,
      default: function _default() {
        return {
          'AwesomeTable.buttons.filters': 'Filter',
          'AwesomeTable.buttons.refresh': 'Refresh',
          'AwesomeTable.buttons.excel-currentpage': 'Export current page',
          'AwesomeTable.searchInput': 'AwesomeTable.searchInput',
          'AwesomeTable.next': 'Next',
          'AwesomeTable.prev': 'Previous',
          'AwesomeTable.rows_per_page': 'Rows per page',
          'AwesomeTable.of': 'of',
          'AwesomeTable.page': 'page',
          'AwesomeTable.all': 'all',
          'AwesomeTable.empty': 'empty'
        };
      }
    },
    autoRefresh: {
      type: Boolean,
      default: false
    },
    autoRefreshInterval: {
      type: Number,
      default: 1
    },
    refresh: {
      type: Function,
      default: undefined
    },
    delete: {
      type: Function,
      default: undefined
    },
    create: {
      type: Function,
      default: undefined
    },
    exportUrl: {
      type: String,
      default: undefined
    },
    needsRefresh: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: [String, Number],
      default: 20
    },
    limit: {
      type: [String, Number],
      default: 1000
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    defaultOptions: {
      type: Object,
      default: function _default() {
        return {
          fixedHeader: false,
          maxHeight: '',
          pagination: true,
          customInlineActions: [],
          // {key, label, action: function(item, context{}}
          filterInitiallyOn: false,
          saveSearchDatas: false
        };
      }
    },
    actions: {
      type: Object,
      default: function _default() {
        return defaultActions;
      },
      note: 'actions active in this instance'
    },
    mode: {
      default: 'local',
      type: String
    }
  },
  data: function data() {
    return {
      totalCount: 0,
      filterable: this.options.filterInitiallyOn,
      isRefreshing: false,
      columnsState: {},
      defaultStartDate: external_moment_default()().subtract(7, 'days').format('YYYY-MM-DD'),
      defaultEndDate: external_moment_default()().format('YYYY-MM-DD'),
      serverParams: {
        // a map of column filters example: {name: 'john', age: '20'}
        filters: {},
        range: {},
        sort: {},
        page: 0,
        // what page I want to show
        perPage: this.mode === 'remote' ? this.perPage : this.limit // how many items I'm showing per page

      },
      data: [],
      refreshHandle: null,
      numberOfRefreshCalls: 0,
      datePicker: {
        locale: {
          direction: 'ltr',
          // direction of text
          format: 'DD-MM-YYYY',
          // fomart of the dates displayed
          separator: ' - ',
          // separator between the two ranges
          applyLabel: 'Appliquer',
          cancelLabel: 'Annuler',
          weekLabel: 'W',
          customRangeLabel: 'Custom Range',
          daysOfWeek: external_moment_default.a.weekdaysMin(),
          // array of days - see moment documenations for details
          monthNames: external_moment_default.a.monthsShort(),
          // array of month names - see moment documenations for details
          firstDay: 1 // ISO first day of week - see moment documenations for details

        }
      }
    };
  },
  computed: {
    opts: function opts() {
      return external_lodash_default.a.merge(this.defaultOptions, this.options);
    },
    _tableTitle: function _tableTitle() {
      return this.title || (this.$te && this.$te('app.labels.' + this.entity) ? this.$t('app.labels.' + this.entity) : external_lodash_default.a.startCase(this.entity));
    },
    _actions: function _actions() {
      return external_lodash_default.a.merge({}, defaultActions, this.actions || this.innerOptions && this._actions // old location kept for BC
      );
    },
    formattedColumns: function formattedColumns() {
      var _this = this;

      if (!this.columns) {
        // eslint-disable-next-line
        console.error('AwesomeTable MISSING COLUMNS');
        return [];
      }

      var newcolumns = this.columns.map(function (col) {
        var newCol = {};

        if (external_lodash_default.a.isString(col)) {
          newCol.field = col;
          newCol.label = external_lodash_default.a.startCase(col);
          newCol.filterOptions = {
            enabled: _this.filterable
          };
          newCol.sortable = true;
          return newCol;
        }

        if (!col.label) {
          col.label = external_lodash_default.a.startCase(col.field);
        }

        if (col.type && col.type === 'datetime') {
          col.formatFn = function (value) {
            if (!value) {
              return value;
            }

            return external_moment_default()(value).format('lll');
          };
        }

        if (col.type && col.type === 'date') {
          col.formatFn = function (value) {
            if (!value) {
              return value;
            }

            return external_moment_default()(value).format('DD-MM-YYYY');
          };
        }

        if (col.type && col.type === 'object') {
          // eslint-disable-next-line
          col.sortFn = function (x, y, col, rowX, rowY) {
            // x - row1 value for column
            // y - row2 value for column
            // col - column being sorted
            // rowX - row object for row1
            // rowY - row object for row2
            var x1 = JSON.stringify(x);
            var y1 = JSON.stringify(y);
            return x1 < y1 ? -1 : x1 > y1 ? 1 : 0;
          };
        }

        if (col.type && col.type === 'relation') {
          // eslint-disable-next-line
          col.sortFn = function (x, y, col, rowX, rowY) {
            // x - row1 value for column
            // y - row2 value for column
            // col - column being sorted
            // rowX - row object for row1
            // rowY - row object for row2
            // const x1 = x.toString();
            // const y1 = y.toString();
            return x < y ? -1 : x > y ? 1 : 0;
          };
        }

        if (col.type && col.type === 'checkbox') {
          col.sortable = false;
        }

        var filterDropdownItems = col.filterOptions && col.filterOptions.filterDropdownItems;

        if (col.type && (col.type === 'list-of-value' || col.type === 'lov')) {
          filterDropdownItems = _this.$store.state.listOfValues[col.listName];

          if (filterDropdownItems) {
            filterDropdownItems = filterDropdownItems.map(function (e) {
              return {
                value: e.code,
                text: e.label || e.code || e
              };
            });
          }
        }

        if (col.type && col.type === 'list-of-data') {
          filterDropdownItems = _this.$store.state.data[col.listName];
          filterDropdownItems = filterDropdownItems.map(function (e) {
            return {
              value: e.code,
              text: e.label || e.code || e
            };
          });
        }

        if (col.enum) {
          filterDropdownItems = col.enum;
          filterDropdownItems = filterDropdownItems.map(function (e) {
            return {
              value: e,
              text: external_lodash_default.a.startCase(e)
            };
          });
        }

        col.filterOptions = {
          enabled: col.filterable !== undefined ? col.filterable && _this.filterable : _this.filterable,
          filterDropdownItems: filterDropdownItems
        };
        return col;
      });
      var isInitialLoad = Object.keys(this.columnsState).length < 1;

      if (isInitialLoad && newcolumns.length > this.columnsDisplayed) {
        newcolumns.forEach(function (col, idx) {
          _this.$set(_this.columnsState, col.field, idx < _this.columnsDisplayed);
        });
      }

      if (!newcolumns.find(function (col) {
        return col.field === 'ACTIONS';
      }) && !this._actions.noActions) {
        newcolumns.push({
          field: 'ACTIONS',
          label: 'Actions',
          filterOptions: {
            enabled: false
          }
        }); // eslint-disable-next-line

        this.columnsState.ACTIONS = true;
      }

      return newcolumns;
    },
    canHideColumns: function canHideColumns() {
      return this.formattedColumns.length > this.columnsDisplayed;
    },
    displayedColumns: function displayedColumns() {
      var _this2 = this;

      this.columnsState;

      if (this.canHideColumns) {
        var cols = this.formattedColumns.filter(function (col) {
          return _this2.columnsState[col.field];
        });

        if (!this.columnsState.ACTIONS) {
          var actions = this.formattedColumns.find(function (col) {
            return col.field === 'ACTIONS';
          });

          if (actions) {
            cols.push(actions);
          }
        }

        return cols;
      }

      return this.formattedColumns;
    }
  },
  watch: {
    // needsRefresh: "refreshLocalData",
    params: function params() {
      this.serverParams = external_lodash_default.a.merge({}, this.serverParams, this.params);
      this.getItems();
    },
    entity: 'entityChanged',
    // store: changed => {},
    rows: 'refreshLocalData'
  },
  created: function created() {
    var _this3 = this;

    if (!this.$t) {
      this.$t = function (str) {
        /*
        if (!window.trans) {
          window.trans = {}
        }
        window.trans[str]= str;
        */
        return _this3.translations[str] || str;
      };

      this.$te = function (str) {
        return !!_this3.translations[str];
      };
    }
  },
  beforeMount: function beforeMount() {
    var userLang = window.navigator ? navigator.language || navigator.userLanguage : 'en';
    external_moment_default.a.locale(userLang);
  },
  mounted: function mounted() {
    var _this4 = this;

    this.filterable = this.options && this.options.filterInitiallyOn;

    if (this.refresh || this.store) {
      return;
    }

    this.refreshLocalData();

    if (this.autoRefresh) {
      this.numberOfRefreshCalls = 0;
      this.refreshHandle = setInterval(function () {
        if (_this4.numberOfRefreshCalls > 300) {
          _this4.$notify({
            title: 'too much calls, aborting tracking',
            type: 'warning'
          });

          clearInterval(_this4.refreshHandle);
          _this4.refreshHandle = null;
          return;
        }

        if (!document.hasFocus()) {
          return;
        }

        _this4.numberOfRefreshCalls += 1;

        _this4.getItems();
      }, this.autoRefreshInterval * 60000);
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.refreshHandle);
  },
  methods: {
    startCase: external_lodash_default.a.startCase,
    toggleFilter: function toggleFilter() {
      var _this5 = this;

      this.filterable = !this.filterable;

      if (!this.filterable) {
        this.serverParams.range = {};
        this.serverParams.filters = {};
        this.getItems();
      }

      this.columns = this.columns.map(function (col) {
        if (col.filterOptions) {
          col.filterOptions.enabled = _this5.filterable;
        }

        return col;
      });
    },
    // editItem(item) {},
    clickOnLine: function clickOnLine(item) {
      this._actions.view && this.$emit('view', item);
    },
    getLovValue: function getLovValue(item, listName) {
      var _this6 = this;

      if (!item || !this.$store.state.listOfValues[listName]) {
        return item;
      }

      var value = this.$store.state.listOfValues[listName].find(function (elm) {
        return elm[_this6.primaryKey] === item || elm.code === item;
      });

      if (!value) {
        return item;
      }

      return value.label || value.code || value;
    },
    getDataValue: function getDataValue(item, listName) {
      var _this7 = this;

      if (!item || !this.$store.state.data[listName]) {
        return item;
      }

      var value = this.$store.state.data[listName].find(function (elm) {
        return elm[_this7.primaryKey] === item || elm.code === item;
      });

      if (!value) {
        return item;
      }

      return value.label || value.title || value.name || value.code || value;
    },
    toggleColumn: function toggleColumn(colName) {
      this.$set(this.columnsState, colName, !this.columnsState[colName]);
    },
    onColumnFilter: function onColumnFilter(params) {
      if (this.mode !== 'remote') {
        return;
      }

      this.updateParams({
        filters: external_lodash_default.a.cloneDeep(params.columnFilters),
        page: 0
      });
      this.getItems();
    },
    onSortChange: function onSortChange(params) {
      var fieldIndex = params[0].columnIndex; // eslint-disable-next-line

      if (this.mode !== 'remote' || !this.columns || !this.columns[fieldIndex].field) {
        return;
      }

      var sort = {};
      sort[this.columns[fieldIndex].field] = params[0].sortType || params[0].type;
      this.updateParams({
        sort: sort
      });
      this.getItems();
    },
    onDateFilter: function onDateFilter(value) {
      // console.log("new value", value);
      if (!value) {
        return;
      }

      this.serverParams.range.startDate = value.startDate.toISOString().slice(0, 10);
      this.serverParams.range.endDate = value.endDate.toISOString().slice(0, 10);
      this.getItems();
    },
    hasValue: function hasValue(item, column) {
      return item[column.toLowerCase()] !== 'undefined';
    },
    itemValue: function itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    exportCallBack: function exportCallBack() {
      var _this8 = this;

      if (!this.exportUrl) {
        this.$notify({
          title: '[WARN] missing export url',
          type: 'warning'
        });
        return;
      }

      this.$http.get(this.exportUrl, {}).then(function (res) {
        if (res.data.url) {
          var link = document.createElement('a');
          link.download = "".concat(_this8.entity || '', "_export");
          link.href = res.data.url;
          link.click();
          link.remove();
        }
      }).catch(this.apiErrorCallback);
    }
  }
});
// CONCATENATED MODULE: ./src/components/table/AwesomeTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var table_AwesomeTablevue_type_script_lang_js_ = (AwesomeTablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/table/AwesomeTable.vue?vue&type=style&index=0&lang=scss&
var AwesomeTablevue_type_style_index_0_lang_scss_ = __webpack_require__("d99a");

// CONCATENATED MODULE: ./src/components/table/AwesomeTable.vue






/* normalize component */

var AwesomeTable_component = normalizeComponent(
  table_AwesomeTablevue_type_script_lang_js_,
  AwesomeTablevue_type_template_id_0682e63d_render,
  AwesomeTablevue_type_template_id_0682e63d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AwesomeTable = (AwesomeTable_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/misc/EnyoCrudStatsSection.vue?vue&type=template&id=fbbff8c4&
var EnyoCrudStatsSectionvue_type_template_id_fbbff8c4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-12"},[_c('div',{staticClass:"row"},[_vm._l((_vm.stats),function(stat,index){return [_c('div',{key:stat.label,staticClass:"filter-box col-md-3 cl-xs-6"},[_c('div',{staticClass:"card card-statistics",class:_vm.getColor(index)},[_c('div',{staticClass:"box text-center"},[_c('h3',{staticClass:"font-light text-white mt-1"},[_vm._v("\n              "+_vm._s(stat.value)+"\n            ")]),_c('h6',{staticClass:"text-white"},[_vm._v("\n              "+_vm._s(_vm.$t(stat.label))+"\n            ")])])])])]})],2)])}
var EnyoCrudStatsSectionvue_type_template_id_fbbff8c4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/misc/EnyoCrudStatsSection.vue?vue&type=template&id=fbbff8c4&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/misc/EnyoCrudStatsSection.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var EnyoCrudStatsSectionvue_type_script_lang_js_ = ({
  name: "EnyoCrudStatsSection",
  components: {},
  props: {
    url: {
      type: String,
      default: ""
    },
    entity: {
      type: String,
      default: ""
    },
    statsNeedsRefresh: {
      type: Boolean,
      default: false
    },
    store: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      colors: ["card-black", "card-purple", "card-teal", "card-blue", "card-success", "card-warning", "card-info", "card-primary", "card-danger"],
      stats: []
    };
  },
  watch: {
    statsNeedsRefresh: "getStats",
    url: "getStats",
    entity: "getStats"
  },
  created: function created() {},
  mounted: function mounted() {
    this.getStats();
  },
  beforeDestroy: function beforeDestroy() {},
  methods: {
    getStats: external_lodash_default.a.debounce(function () {
      var _this = this;

      this.$http.get(this.url, {}).then(function (res) {
        if (res && res.data && res.data.body) {
          if (!Array.isArray(res.data.body)) {
            _this.stats = Object.keys(res.data.body).forEach(function (label) {
              return {
                label: label,
                value: res.data.body[label]
              };
            });
          } else {
            _this.stats = res.data.body;
          }
        }
      }).catch(function (err) {
        // eslint-disable-next-line
        console.error(err);
      });
      this.refreshCompleted();
    }, 100, undefined),
    refreshCompleted: function refreshCompleted() {
      this.$emit("update:statsNeedsRefresh", false);
    },
    getColor: function getColor(index) {
      var colorLength = this.colors.length;

      if (this.stats[index] && this.stats[index].class) {
        return this.stats[index].class;
      }

      return this.colors[index >= colorLength ? index % colorLength : index];
    }
  }
});
// CONCATENATED MODULE: ./src/components/misc/EnyoCrudStatsSection.vue?vue&type=script&lang=js&
 /* harmony default export */ var misc_EnyoCrudStatsSectionvue_type_script_lang_js_ = (EnyoCrudStatsSectionvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/misc/EnyoCrudStatsSection.vue





/* normalize component */

var EnyoCrudStatsSection_component = normalizeComponent(
  misc_EnyoCrudStatsSectionvue_type_script_lang_js_,
  EnyoCrudStatsSectionvue_type_template_id_fbbff8c4_render,
  EnyoCrudStatsSectionvue_type_template_id_fbbff8c4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EnyoCrudStatsSection = (EnyoCrudStatsSection_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/AwesomeForm.vue?vue&type=template&id=0c6068f2&
var AwesomeFormvue_type_template_id_0c6068f2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content"},[_c('div',{staticClass:"container-fluid"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12",class:_vm.displayMode === 'page' ? 'p-0' : ''},[_c('div',{staticClass:"text-left"},[_c('div',{staticClass:"AwesomeForm",class:{
              'modal slide':
                _vm.displayMode === 'slide' ||
                _vm.displayMode === 'sidebar' ||
                _vm.displayMode === 'sidebar-left' ||
                _vm.displayMode === 'sidebar-right',
              'modal fade':
                _vm.displayMode === 'fade' ||
                _vm.displayMode === 'modal' ||
                _vm.displayMode === 'fullscreen',
              'page  fade': _vm.displayMode === 'page',
              show: this.show,
            },attrs:{"id":_vm.identity + 'FormModal',"tabindex":"-1","role":"dialog"}},[_c('div',{class:{
                'modal-dialog': _vm.displayMode !== 'page',
                'modal-full-height':
                  _vm.displayMode === 'slide' ||
                  _vm.displayMode === 'sidebar' ||
                  _vm.displayMode === 'sidebar-right' ||
                  _vm.displayMode === 'sidebar-left',
                'modal-full': _vm.displayMode === 'fullscreen',

                'modal-lg': _vm.displayMode === 'modal' || _vm.displayMode === 'fade',
              },attrs:{"role":"document"}},[(_vm.mode === 'create')?_c('div',{staticClass:"modal-content"},[_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.createItem()}}},[_c('div',{staticClass:"modal-header bg-primary text-white"},[_c('h3',{staticClass:"modal-title mt-0",attrs:{"title":_vm.$t('EnyoCrudComponent.labels.add_a') + ' '.title}},[_vm._v("\n                      "+_vm._s(_vm.$t('EnyoCrudComponent.labels.add_a'))+" "+_vm._s(_vm.title)+"\n                    ")]),(!_vm.standalone)?_c('button',{staticClass:"close",attrs:{"type":"button","aria-label":"Close"},on:{"click":function($event){return _vm.cancel()}}},[_c('span',{staticClass:"text-white",attrs:{"aria-hidden":"true"}},[_vm._v("×")])]):_vm._e()]),_c('div',{staticClass:"modal-body"},[_vm._t("create-form",[(_vm.formSchema && _vm.formSchema.fields)?[_c('VueFormGenerator',{ref:"form",attrs:{"schema":_vm.formSchema,"model":_vm.selectedItem,"options":_vm.formOptions,"tag":"div"},on:{"update:schema":function($event){_vm.formSchema=$event}}})]:_vm._e()],{"selectedItem":_vm.selectedItem})],2),_c('div',{staticClass:"modal-footer"},[_vm._t("add-modal-footer",[_c('button',{staticClass:"btn btn-default btn-main-style mr-auto",attrs:{"type":"button"},on:{"click":function($event){return _vm.closeModal()}}},[_vm._v("\n                        "+_vm._s(_vm.$t('EnyoCrudComponent.buttons.cancel'))+"\n                      ")]),_c('button',{staticClass:"btn btn-primary ml-auto",attrs:{"type":"submit"}},[_vm._v("\n                        "+_vm._s(_vm.$t('EnyoCrudComponent.buttons.save'))+"\n                      ")])])],2)])]):_vm._e(),(_vm.mode === 'edit' || _vm.mode === 'view')?_c('div',{staticClass:"modal-content"},[_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.editItem()}}},[_c('div',{staticClass:"modal-header bg-primary text-white"},[(_vm.mode === 'edit')?_c('h3',{staticClass:"modal-title mt-0"},[_vm._v("\n                      "+_vm._s(_vm.$t('EnyoCrudComponent.buttons.edit'))+"\n                    ")]):_vm._e(),(_vm.mode === 'view')?_c('h3',{staticClass:"modal-title mt-0"},[_vm._v("\n                      "+_vm._s(_vm.$t('EnyoCrudComponent.buttons.view'))+"\n                    ")]):_vm._e(),(!_vm.standalone)?_c('button',{staticClass:"close",attrs:{"type":"button","aria-label":"Close"},on:{"click":function($event){return _vm.cancel()}}},[_c('span',{staticClass:"text-white",attrs:{"aria-hidden":"true"}},[_vm._v("×")])]):_vm._e()]),_c('div',{staticClass:"modal-body",class:{ 'view-mode': _vm.mode === 'view' }},[(
                        _vm.nestedSchemas &&
                          _vm.nestedSchemas.length &&
                          _vm.mode === 'view'
                      )?_c('ul',{staticClass:"nav nav-tabs mt-5 mb-4"},[_c('li',{staticClass:"nav-item"},[_c('a',{staticClass:"nav-link active",attrs:{"data-toggle":"tab"},on:{"click":function($event){_vm.activeNestedTab = 'general'}}},[_vm._v(_vm._s(_vm.$te('app.labels.' + _vm.identity)
                              ? _vm.$te('app.labels.' + _vm.identity)
                              : _vm._.startCase(_vm.identity)))])]),_vm._l((_vm.nestedSchemas),function(ns){return _c('li',{key:ns.$id,staticClass:"nav-item"},[_c('a',{staticClass:"nav-link",attrs:{"data-toggle":"tab"},on:{"click":function($event){_vm.activeNestedTab = ns.identity}}},[(ns.icon)?_c('i',{class:ns.icon}):_vm._e(),_vm._v("\n                          "+_vm._s(_vm.$t(ns.title || ns.name || ns.identity))+"\n                        ")])])})],2):_vm._e(),_vm._t("edit-form",[_c('div',{staticClass:"tab-content"},[(_vm._model && _vm._model.layout)?_c('div',{staticClass:"row"},[_vm._l((_vm._model.layout.columns),function(column,index){return [_c("Column",_vm._b({key:index,tag:"div"},'div',column,false),[(column.tabs)?[_c('Tabs',{class:column.childStyleClasses,attrs:{"tabs":column.tabs},scopedSlots:_vm._u([{key:"content",fn:function(ref){
                              var tab = ref.tab;
                              var activeTabIndex = ref.activeTabIndex;
return [(tab.rows)?[_vm._l((tab.rows),function(row,index3){return [_c('Row',_vm._b({key:index3},'Row',row,false),[(row.groups)?[_vm._l((row.groups),function(group,index4){return [_c('Group',_vm._b({key:index4},'Group',group,false),[_c('VueFormGenerator',{attrs:{"schema":_vm.getShemaForFields(
                                                      group.fields
                                                    ),"model":_vm.selectedItem,"options":_vm.formOptions,"tag":"div"}})],1)]})]:_vm._e()],2)]})]:_vm._e()]}}],null,true)})]:_vm._e()],2)]})],2):_vm._e(),(_vm.formSchema && _vm.formSchema.fields)?[_c('div',{staticClass:"tab-pane nested-tab fade",class:{
                              'active show': _vm.activeNestedTab === 'general',
                            }},[_c('VueFormGenerator',{attrs:{"schema":_vm.formSchema,"model":_vm.selectedItem,"options":_vm.formOptions,"tag":"div"},on:{"update:schema":function($event){_vm.formSchema=$event}}})],1)]:_vm._e(),(
                            _vm.nestedSchemas &&
                              _vm.nestedSchemas.length &&
                              _vm.mode === 'view' &&
                              _vm.selectedItem
                          )?_vm._l((_vm.nestedSchemas),function(ns){return _c('div',{key:ns.$id,staticClass:"tab-pane nested-tab fade",class:{
                              'active show': _vm.activeNestedTab === ns.identity,
                            }},[_c('crud-component',_vm._b({attrs:{"parent":_vm.selectedItem,"crud-needs-refresh":_vm.nestedCrudNeedsRefresh},on:{"update:crudNeedsRefresh":function($event){_vm.nestedCrudNeedsRefresh=$event},"update:crud-needs-refresh":function($event){_vm.nestedCrudNeedsRefresh=$event}}},'crud-component',ns,false),[_c('div',{attrs:{"slot":"crud-title"},slot:"crud-title"})])],1)}):_vm._e()],2)],{"selectedItem":_vm.selectedItem})],2),_c('div',{staticClass:"modal-footer"},[_vm._t("edit-modal-footer",[(!_vm.standalone)?_c('button',{staticClass:"btn btn-default btn-main-style mr-auto",attrs:{"type":"button"},on:{"click":function($event){return _vm.closeModal()}}},[_vm._v("\n                        "+_vm._s(_vm.$t('EnyoCrudComponent.buttons.cancel'))+"\n                      ")]):_vm._e(),(_vm.mode === 'edit')?_c('button',{staticClass:"btn btn-primary ml-auto",attrs:{"type":"submit"}},[_vm._v("\n                        "+_vm._s(_vm.$t('EnyoCrudComponent.buttons.save'))+"\n                      ")]):_vm._e(),(
                          _vm.mode === 'view' &&
                            _vm._actions.edit &&
                            !_vm.innerOptions.noActions
                        )?_c('button',{staticClass:"btn btn-info btn-main-style ml-auto",attrs:{"type":"button"},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.$emit('edit', _vm.selectedItem)}}},[_c('i',{staticClass:"fa fa-pencil"}),_vm._v("\n                        "+_vm._s(_vm.$t('EnyoCrudComponent.buttons.edit'))+"\n                      ")]):_vm._e(),(_vm.mode === 'view' && !_vm.standalone)?_c('button',{staticClass:"btn btn-primary ml-2",attrs:{"type":"button"},on:{"click":function($event){return _vm.closeModal()}}},[_vm._v("\n                        "+_vm._s(_vm.$t('EnyoCrudComponent.buttons.close'))+"\n                      ")]):_vm._e()])],2)])]):_vm._e()])])]),(_vm.displayMode !== 'page' && _vm.displayMode !== 'fullscreen')?_c('div',{staticClass:"modal-backdrop show",class:_vm.displayMode,attrs:{"id":_vm.identity + 'Backdrop'}}):_vm._e()])])])])}
var AwesomeFormvue_type_template_id_0c6068f2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/crud/AwesomeForm.vue?vue&type=template&id=0c6068f2&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/layout/Column.vue?vue&type=template&id=30eb36c6&
var Columnvue_type_template_id_30eb36c6_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:'col-' + _vm.cols + ' ' + _vm.styleClasses,style:(_vm.style)},[_vm._t("default")],2)}
var Columnvue_type_template_id_30eb36c6_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/crud/layout/Column.vue?vue&type=template&id=30eb36c6&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/layout/Column.vue?vue&type=script&lang=js&

//
//
//
//
//
//
/* harmony default export */ var Columnvue_type_script_lang_js_ = ({
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    cols: {
      type: Number,
      default: 12
    },
    styleClasses: {
      type: String,
      default: undefined
    },
    style: {
      type: Function,
      default: undefined
    }
  },
  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./src/components/crud/layout/Column.vue?vue&type=script&lang=js&
 /* harmony default export */ var layout_Columnvue_type_script_lang_js_ = (Columnvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/crud/layout/Column.vue





/* normalize component */

var Column_component = normalizeComponent(
  layout_Columnvue_type_script_lang_js_,
  Columnvue_type_template_id_30eb36c6_render,
  Columnvue_type_template_id_30eb36c6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Column = (Column_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/layout/Tabs.vue?vue&type=template&id=862f50cc&
var Tabsvue_type_template_id_862f50cc_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.computedCols + ' ' + _vm.styleClasses,style:(_vm.style)},[_vm._t("header",[_c('ul',{staticClass:"nav",class:'nav-' + _vm.navType + _vm.tabsDirection},_vm._l((_vm.tabs),function(tab,index){return _c('li',{key:index,staticClass:"nav-item"},[(tab.visible !== false && tab.visible !== 0)?_c('a',{staticClass:"nav-link show",class:{
            active: _vm.activeTabIndex === index,
            disabled: tab.disabled,
          },attrs:{"id":'awesome-tab-' + _vm.fieldId + index,"data-target":'awesome-panel-' + _vm.fieldId + index},on:{"click":function($event){$event.preventDefault();return _vm.changeTab(index)}}},[_vm._v(_vm._s(_vm.$t(tab.legend)))]):_vm._e()])}),0)]),_vm._t("default",[_c('div',{staticClass:"tab-content"},_vm._l((_vm.tabs),function(tab,index){return _c('div',{key:index,staticClass:"tab-pane fade",class:{
          'show active': _vm.activeTabIndex === index,
          disabled: tab.disabled,
        },attrs:{"role":"tabpanel","aria-labelledby":"home-tab","id":'awesome-panel-' + _vm.fieldId + index}},[_vm._t("content",null,{"activeTabIndex":_vm.activeTabIndex,"tab":tab})],2)}),0)])],2)}
var Tabsvue_type_template_id_862f50cc_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/crud/layout/Tabs.vue?vue&type=template&id=862f50cc&

// CONCATENATED MODULE: ./src/mixins/layoutMixin.js

/* harmony default export */ var layoutMixin = ({
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    cols: {
      type: Number,
      default: 12
    },
    styleClasses: {
      type: String,
      default: ''
    },
    style: {
      type: Function,
      default: ''
    },
    legend: {
      type: Function,
      default: ''
    }
  },
  computed: {
    computedCols: function computedCols() {
      return this.cols ? 'col-' + this.cols + ' ' : '';
    }
  },
  methods: {}
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/layout/Tabs.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Tabsvue_type_script_lang_js_ = ({
  mixins: [i18nMixin, layoutMixin],
  props: {
    // activeTabIndex: {type: Number, default: 0}
    tabs: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    navType: {
      type: String,
      default: 'tabs'
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    tabsDirection: function tabsDirection() {
      return this.direction === 'vertical' ? ' flex-column ' : '';
    }
  },
  data: function data() {
    return {
      activeTabIndex: 0,
      fieldId: Object(external_lodash_["uniqueId"])(this.id + '_')
    };
  },
  methods: {
    changeTab: function changeTab(id) {
      this.activeTabIndex = id;
    }
  }
});
// CONCATENATED MODULE: ./src/components/crud/layout/Tabs.vue?vue&type=script&lang=js&
 /* harmony default export */ var layout_Tabsvue_type_script_lang_js_ = (Tabsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/crud/layout/Tabs.vue





/* normalize component */

var Tabs_component = normalizeComponent(
  layout_Tabsvue_type_script_lang_js_,
  Tabsvue_type_template_id_862f50cc_render,
  Tabsvue_type_template_id_862f50cc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Tabs = (Tabs_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/layout/Row.vue?vue&type=template&id=76620474&
var Rowvue_type_template_id_76620474_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row",class:_vm.computedCols + ' ' + _vm.styleClasses,style:(_vm.style)},[_vm._t("default")],2)}
var Rowvue_type_template_id_76620474_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/crud/layout/Row.vue?vue&type=template&id=76620474&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/layout/Row.vue?vue&type=script&lang=js&
//
//
//
//
//
//



/* harmony default export */ var Rowvue_type_script_lang_js_ = ({
  mixins: [i18nMixin, layoutMixin],
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {},
  data: function data() {
    return {
      fieldId: Object(external_lodash_["uniqueId"])(this.id + '_')
    };
  },
  methods: {}
});
// CONCATENATED MODULE: ./src/components/crud/layout/Row.vue?vue&type=script&lang=js&
 /* harmony default export */ var layout_Rowvue_type_script_lang_js_ = (Rowvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/crud/layout/Row.vue





/* normalize component */

var Row_component = normalizeComponent(
  layout_Rowvue_type_script_lang_js_,
  Rowvue_type_template_id_76620474_render,
  Rowvue_type_template_id_76620474_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Row = (Row_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/layout/Group.vue?vue&type=template&id=794772e4&
var Groupvue_type_template_id_794772e4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"awesome-layout-group",class:_vm.computedCols + ' ' + _vm.wrapperClasses,style:(_vm.style)},[(_vm.theme === 'card')?_c('div',{class:_vm.styleClasses + ' ' + (_vm.theme === 'card' ? ' card card-primary' : ''),style:(_vm.style)},[_c('div',{staticClass:"card-header"},[_vm._v("\n      "+_vm._s(_vm.$t(_vm.legend))+"\n    ")]),_c('div',{staticClass:"card-body"},[_vm._t("default")],2)]):_c('div',{class:_vm.styleClasses,style:(_vm.style),attrs:{"title":_vm.legend}},[_vm._t("default")],2)])}
var Groupvue_type_template_id_794772e4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/crud/layout/Group.vue?vue&type=template&id=794772e4&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/layout/Group.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Groupvue_type_script_lang_js_ = ({
  mixins: [i18nMixin, layoutMixin],
  props: {
    id: {
      type: String,
      default: ''
    },
    wrapperClasses: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'card'
    }
  },
  computed: {},
  data: function data() {
    return {
      fieldId: Object(external_lodash_["uniqueId"])(this.id + '_')
    };
  },
  methods: {}
});
// CONCATENATED MODULE: ./src/components/crud/layout/Group.vue?vue&type=script&lang=js&
 /* harmony default export */ var layout_Groupvue_type_script_lang_js_ = (Groupvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/crud/layout/Group.vue





/* normalize component */

var Group_component = normalizeComponent(
  layout_Groupvue_type_script_lang_js_,
  Groupvue_type_template_id_794772e4_render,
  Groupvue_type_template_id_794772e4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Group = (Group_component.exports);
// EXTERNAL MODULE: ./node_modules/vue-good-table/dist/vue-good-table.css
var vue_good_table = __webpack_require__("dac4");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/AwesomeForm.vue?vue&type=script&lang=js&












function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











var defaultOptions = {
  mode: 'local',
  url: null,
  columns: null,
  createPath: null,
  viewPath: null,
  editPath: null,
  queryParams: {},
  stats: false,
  autoRefresh: false,
  // or integer in seconds
  modalMode: 'slide',
  // fade | slide | full / renamed to prop displayMode  Deprecated BC BREAK
  columnsDisplayed: 8,
  customInlineActions: [],
  customTopActions: [],
  customTabletopActions: [],
  responseField: 'body'
};
/* harmony default export */ var AwesomeFormvue_type_script_lang_js_ = ({
  // name: 'AwesomeForm',
  introduction: 'A component to quickly create a table UI with edit capabilities',
  components: {
    Column: Column,
    Tabs: Tabs,
    Row: Row,
    Group: Group
  },
  mixins: [i18nMixin, apiErrorsMixin, apiConfigMixin],
  props: {
    item: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: undefined
    },
    pageTitle: {
      type: String,
      required: false,
      default: undefined
    },
    identity: {
      type: String,
      required: true
    },
    modelName: {
      type: String,
      required: false
    },
    standalone: {
      type: Boolean,
      required: false,
      default: true
    },
    primaryKey: {
      type: String,
      default: 'id',
      note: 'The field to use as a primary key (id / _id)'
    },
    model: {
      type: Object,
      required: false,
      default: undefined,
      note: 'The object that will be used for managing the component. it contains the schema along with some other options. If no provided i can be reconstructed if we have the schema prop.'
    },
    schema: {
      type: Object,
      required: false,
      default: undefined,
      note: 'The json schema that represent the object to display. this is used to create. Must be provided if no model definition is available'
    },
    crudNeedsRefresh: {
      type: Boolean,
      default: false,
      note: 'Define whether the content of the table list should be refreshed'
    },
    nestedSchemas: {
      type: Array,
      required: false,
      default: function _default() {
        return [];
      },
      note: 'An array describing the data that is linked to the nested model. Serves for displaying a detailed object'
    },
    parent: {
      type: Object,
      required: false,
      note: 'The object containing the parent in case of a nested schema.' + "You don't actually to pass this, it's done automatically by the parent component itself"
    },
    nestedDisplayMode: {
      type: String,
      required: false,
      default: 'list',
      note: "In case of a nested schema, this parameter determines whether the component should be rendered as a list or a form"
    },
    translations: {
      type: Object,
      required: false,
      default: function _default() {
        return {
          'EnyoCrudComponent.labels.manageTitle': 'EnyoCrudComponent.labels.manageTitle',
          'EnyoCrudComponent.buttons.view': 'EnyoCrudComponent.buttons.view',
          'EnyoCrudComponent.buttons.cancel': 'EnyoCrudComponent.buttons.cancel',
          'EnyoCrudComponent.buttons.close': 'EnyoCrudComponent.buttons.close'
        };
      },
      note: 'Translation labels to use when vue-i18n is not present'
    },
    mode: {
      type: String,
      required: true,
      validator: function validator(value) {
        // Only accepts values that contain the string 'cookie-dough'.
        return ['create', 'edit', 'view'].indexOf(value) !== -1;
      }
    },
    displayMode: {
      type: String,
      required: true,
      default: 'sidebar',
      validator: function validator(value) {
        // Only accepts values that contain the string 'cookie-dough'.
        return ['modal', 'sidebar', 'page', 'fullscreen', 'sidebar-left', 'sidebar-right', 'fade', // deprecated
        'slide' // deprecated
        ].indexOf(value) !== -1;
      }
    },
    options: {
      type: Object,
      default: function _default() {
        return defaultOptions;
      }
    },
    actions: {
      type: Object,
      default: function _default() {
        return defaultActions;
      },
      note: 'actions active in this instance'
    }
  },
  data: function data() {
    return {
      $modal: null,
      parentPath: '',
      selectedItem: {},
      isRefreshing: false,
      nestedCrudNeedsRefresh: false,
      show: false,
      showBackDrop: false,
      innerOptions: {},
      innerSchema: {},
      _model: {},
      innerNestedSchemas: [],
      activeNestedTab: 'general',
      formOptions: {
        validayeAsync: true,
        validateAfterLoad: false,
        validateAfterChanged: true
      }
    };
  },
  computed: {
    _title: function _title() {
      // @deprecated
      if (this._model && this._model.pageTitle) {
        return this.$te(this._model.pageTitle) ? this.$t(this._model.pageTitle) : this._model.pageTitle;
      }

      if (this.title) {
        return this.$te(this.title) ? this.$t(this.title) : this.title;
      }

      if (this._model && this._model.singularName) {
        return this.$te(this._model.singularName) ? this.$t(this._model.singularName) : external_lodash_default.a.startCase(this._model.singularName);
      }

      if (this.identity) {
        return this.$te("app.labels.".concat(this.identity)) ? this.$t("app.labels.".concat(this.identity)) : external_lodash_default.a.startCase(this.identity);
      }

      return '';
    },
    _titlePlural: function _titlePlural() {
      if (this._model && this._model.namePlural) {
        return this.$te(this._model.namePlural) ? this.$t(this._model.namePlural) : external_lodash_default.a.startCase(this._model.namePlural);
      }

      if (this.title) {
        return this.$te(this.title + 's') ? this.$t(this.title + 's') : this.title + 's';
      }

      if (this.identity) {
        return this.$te("app.labels.".concat(this.identity, "s")) ? this.$t("app.labels.".concat(this.identity, "s")) : external_lodash_default.a.startCase(this.identity + 's');
      }

      return '';
    },
    _name: function _name() {
      if (this._model && this._model.name) {
        return this.$te(this._model.name) ? this.$t(this._model.name) : external_lodash_default.a.startCase(this._model.name);
      }

      if (this.identity) {
        return this.$te("app.labels.".concat(this.identity)) ? this.$t("app.labels.".concat(this.identity)) : external_lodash_default.a.startCase(this.identity);
      }

      return '';
    },
    _namePlural: function _namePlural() {
      if (this._model && this._model.namePlural) {
        return this.$te(this._model.namePlural) ? this.$t(this._model.namePlural) : external_lodash_default.a.startCase(this._model.namePlural);
      }

      if (this.identity) {
        return this.$te("app.labels.".concat(this.identity)) ? this.$t("app.labels.".concat(this.identity)) : external_lodash_default.a.startCase(this.identity);
      }

      return '';
    },
    formSchema: function formSchema() {
      if (!this.innerSchema) {
        return [];
      }

      var parsedFormSchema = this.parseSchema(this.innerSchema);
      parsedFormSchema.styleClasses = 'row';
      return parsedFormSchema;
    },
    _actions: function _actions() {
      return external_lodash_default.a.merge({}, defaultActions, this.actions || this.innerOptions && this.innerOptions.actions // old location kept for BC
      );
    },
    _url: function _url() {
      var url = this.url || this.options && this.options.url || this._model && this._model.url || "/".concat(this.identity);

      if (typeof url === 'function') {
        return url({
          parent: this.parent,
          context: this,
          currentItem: this.selectedItem
        });
      }

      return url;
    },
    _formSchemaGrouped: function _formSchemaGrouped() {
      return {
        groups: [_objectSpread(_objectSpread({}, this.formSchema), {}, {
          legend: 'home'
        })]
      };
    }
  },
  watch: {
    // call again the method if the route changes
    name: 'loadModel',
    identity: 'loadModel',
    model: 'loadModel',
    options: 'mergeOptions',
    crudNeedsRefresh: 'refreshComponent',
    item: 'loadModel'
  },
  created: function created() {
    if (!this.$http) {
      try {
        var axios = __webpack_require__("cebe");

        this.$http = axios;
      } catch (err) {// console.warn(err.message);
      }
    }

    this.loadModel();
  },
  mounted: function mounted() {
    // allow old property names to still work
    if (this.modelName) {
      this.identity = this.modelName;
    }

    this.loadModel();

    if (this.$route) {
      var matched = this.$route.matched[this.$route.matched.length - 1];

      if (this.$route.params.id) {
        if (this.$route.params.id === 'create' || this.$route.params.id === 'new') {
          delete this.$route.params.id;

          if (this.$route.query.item) {
            this.selectedItem = external_lodash_default.a.merge(this.selectedItem, this.$route.query.item);
          }

          this.$emit('create', this.selectedItem, {
            reset: false
          });
          return;
        }

        this.parentPath = matched.path.replace('/edit', '').replace('/:id', '');
      } else {
        this.parentPath = matched.path;
      }
    }

    var action = "".concat(this.mode, "Function");

    if (this[action]) {
      this[action](this.item);
    } else {
      throw new Error('no_action_available_for_mode_' + this.mode);
    }
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    // eslint-disable-next-line
    next(function (vm) {
      vm.closeModal(); //    vm.loadModel();
    });
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    next(function (vm) {
      vm.closeModal();
    });
  },
  methods: {
    $alert: sweetalert2_default.a,
    refreshComponent: function refreshComponent() {
      var _this = this;

      // eslint-disable-next-line
      console.log('refresh component watcher');

      if (this.identity) {
        this.loadModel();
      }

      this.tableNeedsRefresh = true;
      this.statsNeedsRefresh = true;
      this.nestedCrudNeedsRefresh = true;
      setTimeout(function () {
        _this.$emit('update:crudNeedsRefresh', false);
      }, 100);
    },
    onTableRefresh: function onTableRefresh() {
      this.statsNeedsRefresh = true;
    },
    mergeOptions: function mergeOptions() {
      var _this2 = this;

      if (this.options.deletePermitted && this._actions.delete) {
        if (this.$store && this.$store.state && !this.options.deletePermitted.some(function (v) {
          return _this2.$store.state.user.roles.indexOf(v.toUpperCase()) >= 0;
        })) {
          this._actions.delete = false;
        }
      }

      this.innerOptions = external_lodash_default.a.merge({}, defaultOptions, this.innerOptions, this.options);

      if (this.$route && this.$route.query && this.$route.query.filters) {
        this.innerOptions.queryParams = external_lodash_default.a.merge(this.innerOptions.queryParams || this.$route.query.filters);
      }
    },
    callbackFunctionForBAse64: function callbackFunctionForBAse64(e) {
      // eslint-disable-next-line
      console.log('Base 64 done', e);
    },
    importResponse: function importResponse(e) {
      var _this3 = this;

      // swal({title: this.$t('AwesomeDefault.messages.successfullyImported',{title: this.name}), type: 'success'})
      this.$notifications.clear();

      if ((!e.improperData || e.improperData.length === 0) && (!e.properData || e.properData.length === 0)) {
        sweetalert2_default.a.fire({
          title: this.$t('AwesomeDefault.messages.no_data_imported', {
            title: this._title
          }),
          type: 'warning'
        });
        return;
      }

      if (e.properData.length > 0) {
        this.$notify({
          title: this.$t('AwesomeDefault.messages.successfullyImported', {
            title: this._title
          }),
          type: 'success'
        });
      }

      if (e.improperData.length > 0) {
        var message = '';
        e.improperData.forEach(function (element) {
          message += " - ".concat(Object.values(element).join(' | '), ", ");
        });
        message = message.substring(0, message.length - 2);
        setTimeout(function () {
          _this3.$notify({
            title: "".concat(e.improperData.length, " ").concat(_this3.$t('AwesomeDefault.messages.not_imported', {
              title: _this3._title
            })),
            message: message,
            type: 'warning',
            timeout: 30000
          });
        }, 0);
      }

      this.tableNeedsRefresh = true;
      this.statsNeedsRefresh = true;
      this.nestedCrudNeedsRefresh = true;
      this.$forceUpdate();
    },
    exportTemplateCallBack: function exportTemplateCallBack() {
      var _this4 = this;

      if (!this.innerOptions.importUrl) {
        this.$notify({
          title: '[WARN] missing export url',
          type: 'warning'
        });
        return;
      }

      this.$http.get(this.innerOptions.importUrl + '-template', {}).then(function (res) {
        if (res.data.url) {
          var link = document.createElement('a');
          link.download = "".concat(_this4.entity, "_export");
          link.href = res.data.url;
          link.click();
          link.remove();
        }
      }).catch(this.apiErrorCallback);
    },
    loadModel: function loadModel() {
      var _this5 = this;

      if (!this.options) {
        this.options = {};
      }

      this.mergeOptions();

      if (this.$store && this.$store.state && !this.model) {
        // @delete ?
        this._model = this.$store.state.data.models.find(function (model) {
          return model.identity === _this5.identity;
        });
      } else {
        this._model = this.model;
      }

      if (!this._model && !this.schema) {
        // console.warn("CRUD COMPONENT ERROR", `model ${this.name} not found`);
        return;
      }

      this.innerSchema = this.schema || this._model.schema;
      setTimeout(function () {
        _this5.openModal();
      }, 100); // now a computed property...
      // this.innerOptions.url =
      //   this.url ||
      //   (this.options && this.options.url) ||
      //   (this._model && this._model.url) ||
      //   `/${this.identity}`;
      // if (typeof this.innerOptions.url === 'function') {
      //   this.innerOptions.url = this.innerOptions.url(this.parent, this);
      // }

      if (!this.innerOptions.exportUrl) {
        this.innerOptions.exportUrl = "".concat(this._url, "/export");
      }

      if (!this.innerOptions.importUrl) {
        this.innerOptions.importUrl = "".concat(this._url, "/import");
      } // if the crud is nested and should display as a form then remote load the data


      if (this.parent && this.nestedDisplayMode === 'object') {
        this.nestedViewFunction();
      }

      this.selectedItem = this.item;

      if (!this._url) {
        return;
      } // todo call only if


      if (this.item && this.item[this.primaryKey]) {
        this.$http.get("".concat(this._url, "/").concat(this.item[this.primaryKey])).then(function (res) {
          var data = _this5.apiResponseConfig.dataPath && _this5.apiResponseConfig.dataPath != false ? external_lodash_default.a.get(res.data, _this5.apiResponseConfig.dataPath) : res.data;
          _this5.selectedItem = data;
        }).catch(this.apiErrorCallback).finally(function () {
          _this5.isRefreshing = false;
          _this5.needsRefresh = false;
        });
      }
    },
    parseSchema: function parseSchema(schema) {
      var _this6 = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (!schema.properties) {
        return [];
      }

      if (prefix && schema.$schema) {
        // console.warn("possible recursive parseSchema call", schema);
        return;
      }

      var fields = [];
      var size = Object.keys(schema.properties).length;
      Object.keys(schema.properties).forEach(function (key) {
        if ([_this6.primaryKey].indexOf(key) === -1) {
          var prop = schema.properties[key];

          if (prop.field && prop.field.hidden) {
            return;
          }

          if (prop.type === 'object' && !(prop.field && prop.field.type)) {
            var subSchema = _this6.parseSchema(prop, "".concat(prefix).concat(key, "."));

            subSchema.legend = prop.title || external_lodash_default.a.startCase(key);
            subSchema.type = 'group';
            subSchema.styleClasses = "subgroup  ".concat(prop.field && prop.field.styleClasses || 'card');
            fields.push(subSchema);
          } else {
            if (prop.field && prop.relation && prop.field.fieldOptions) {
              prop.field.fieldOptions.url = prop.relation;
              prop.field.fieldOptions.trackBy = prop.foreignKey;
              prop.field.fieldOptions.searchable = true;
            }

            var field = {
              type: prop.field && prop.field.type || _this6.getFormtype(prop),
              label: prop.title || prop.description || external_lodash_default.a.startCase(key),
              placeholder: prop.description || prop.title || external_lodash_default.a.startCase(key),
              fieldOptions: prop.field && prop.field.fieldOptions || {
                placeholder: prop.description || prop.title || external_lodash_default.a.startCase(key),
                url: prop.relation,
                trackBy: prop.foreignKey || 'id',
                label: 'label',
                // key label for enyo select
                name: 'label',
                // key label for native select
                step: prop.field && prop.field.step,
                readonly: _this6.mode === 'view' || prop.field && prop.field.readonly,
                disabled: _this6.mode === 'view' || prop.field && prop.field.readonly
              },
              values: prop.field && prop.field.fieldOptions && (prop.field.fieldOptions.values || _this6.getSelectEnumFromStore(prop.field.fieldOptions.enum)) || prop.enum || prop.items && prop.items.enum || [],
              required: prop.field && prop.field.required,
              hint: prop.description,
              model: prefix + key,
              validator: prop.field && prop.field.validator,
              min: prop.min,
              max: prop.max,
              multi: prop.type === 'array',
              readonly: _this6.mode === 'view' || prop.field && prop.field.readonly,
              disabled: _this6.mode === 'view' || prop.field && prop.field.readonly,
              styleClasses: prop.field && prop.field.styleClasses || (size < 8 || _this6._model && _this6._model.layout ? 'col-12' : 'col-6'),
              relation: prop.relation,
              foreignKey: prop.foreignKey,
              group: prop.field ? prop.field.group : undefined
            };

            if (!field.fieldOptions.inputType) {
              field.fieldOptions.inputType = prop.field && prop.field.inputType || _this6.getFormInputType(prop) || 'text';
            }

            if (prop.type === 'boolean' && (field.type === 'select' || field.type === 'enyoSelect') && (!field.values || !field.values.length)) {
              field.values = [{
                id: true,
                label: 'Yes'
              }, {
                id: false,
                label: 'No'
              }, {
                id: '',
                label: '-'
              }];
            }

            if (field.type === 'dateTime') {
              field.fieldOptions.icons = {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-arrow-up',
                down: 'fa fa-arrow-down'
              };
            }

            if (field.type === 'enyoSelect' && !field.fieldOptions.options) {
              field.options = field.values;
            }

            fields.push(field);
          }
        }
      }); // let groups = this.parseSchemaGroups(schema);
      // groups = this.distributeFieldsInGroups(groups, fields);

      return {
        fields: fields
      };
    },
    parseSchemaGroups: function parseSchemaGroups(schema) {
      var _this7 = this;

      var groups = [];

      if (!schema.formGroups) {
        return {};
      }

      schema.formGroups.forEach(function (group) {
        if (!groups[group.id]) {
          groups.push(_objectSpread(_objectSpread({
            fields: []
          }, group), {}, {
            legend: _this7.$t(group.title),
            type: 'group'
          }));
        }
      });

      if (groups.length < 1) {
        groups = [{
          legend: '',
          fields: schema.fields
        }];
      }

      return groups;
    },
    distributeFieldsInGroups: function distributeFieldsInGroups(groups, fields) {
      fields.forEach(function (f) {
        if (f.group) {
          var keys = f.group.split('.');
          var targetGroup = {
            groups: groups
          };
          keys.forEach(function (key) {
            targetGroup = external_lodash_default.a.find(targetGroup.groups, {
              id: key
            });
          });

          if (targetGroup) {
            if (!targetGroup.fields) {
              targetGroup.fields = [];
            }

            targetGroup.fields.push(f);
          }
        }
      });
      return groups;
    },
    getShemaForFields: function getShemaForFields(fields) {
      var fieldsDefinition = this.formSchema.fields.filter(function (f) {
        return fields.indexOf(f.model) > -1;
      });
      return _objectSpread(_objectSpread({}, this.formSchema), {}, {
        fields: fieldsDefinition
      });
    },
    getFormtype: function getFormtype(property) {
      var type = property.type;

      if (Array.isArray(type)) {
        var possibleTypes = ['string', 'number', 'boolean'];

        for (var i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      if (property.enum) {
        return 'select';
      }

      switch (type) {
        case 'string':
          return 'input';

        case 'number':
          return 'input';

        case 'boolean':
          return 'select';
        // put enyoSelect after debugging all the issues...enyoSelect

        default:
          return 'input';
      }
    },
    getSelectEnumFromStore: function getSelectEnumFromStore(val) {
      var options = external_lodash_default.a.isString(val) && val.indexOf('$store') === 0 ? external_lodash_default.a.get(this.$store.state, val.replace('$store.', '')) : val;
      return options;
    },
    getFormInputType: function getFormInputType(property) {
      var type = property.type;

      if (Array.isArray(type)) {
        var possibleTypes = ['string', 'number', 'boolean'];

        for (var i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      switch (type) {
        case 'string':
          switch (property.format) {
            case 'email':
              return 'email';

            case 'date-time':
              return 'datetime';

            default:
              return 'text';
          }

        case 'number':
          return 'number';

        case 'boolean':
        case 'array':
        case 'object':
          return 'string';

        default:
          // console.error("type not known ", type, property);
          return type;
      }
    },
    getColumnType: function getColumnType(property) {
      if (property.column && property.column.type) {
        return property.column.type;
      }

      if (property.columnType) {
        return property.columnType;
      }

      var type = property.type;

      if (Array.isArray(type)) {
        var possibleTypes = ['string', 'number', 'boolean'];

        for (var i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      switch (type) {
        case 'string':
          switch (property.format) {
            case 'date-time':
              return 'text';

            default:
              return 'text';
          }

        case 'number':
          return 'number';

        case 'boolean':
          return 'boolean';

        case 'array':
        case 'object':
          return 'object';

        default:
          return 'text';
      }
    },
    openModal: function openModal() {
      // eslint-disable-next-line
      console.log('openModal was called', this.mode);

      switch (this.displayMode) {
        case 'modal':
        case 'fade':
          document.body.classList.add('modal-open');
          break;

        case 'slide':
        case 'sidebar':
        case 'sidebar-right':
        case 'sidebar-left':
        case 'fullscreen':
          document.body.classList.add('modal-open');
          break;
      }

      this.show = true;
      this.showBackdrop = true; // eslint-disable-next-line

      console.log('openModal was called', this.show);
      /*
      if (this.displayMode !== 'page' && this.$modal.modal) {
        this.$modal.modal('show');
      } else if (this.displayMode == 'slide') {
        this.$modal.addClass('show');
      } else {
        this.$modal.addClass('show');
      }
      */
    },
    closeModal: function closeModal() {
      var _this8 = this;

      this.$emit('closeRequested', null, {
        context: this.mode
      });

      if (this.standalone) {
        return;
      } //eslint-disable-next-line


      console.log('close modal called');

      if (this.parentPath) {
        window.history.replaceState({}, null, "".concat(this.parentPath));
      }

      setTimeout(function () {
        _this8.show = false;
        _this8.showBackdrop = false;
      }, 100);
      document.body.classList.remove('modal-open');
    },
    cancel: function cancel() {
      //eslint-disable-next-line
      console.log('cancel modal called');
      this.closeModal();
      this.$emit('cancel', null, {
        context: this.mode
      });
    },
    goToEditPage: function goToEditPage(item) {
      if (!this.innerOptions.editPath) {
        window.history.replaceState({}, null, "".concat(this.parentPath, "/").concat(item[this.primaryKey], "/edit"));
        this.editFunction(item);
        return;
      }

      this.$router.push(this.innerOptions.editPath.replace(':id', item[this.primaryKey]));
    },
    goToViewPage: function goToViewPage(item) {
      if (!this.innerOptions.viewPath) {
        window.history.replaceState({}, null, "".concat(this.parentPath, "/").concat(item[this.primaryKey]));
        this.viewFunction(item);
        return;
      }

      this.$router.push(this.innerOptions.viewPath.replace(':id', item[this.primaryKey]));
    },
    createItem: function createItem() {
      var _this9 = this;

      if (!this._url) {
        // eslint-disable-next-line
        console.warn('CRUDCOMPONENT ERROR:: No url for submitting');
        return false;
      }

      if (this.$refs.form) {
        var errors = this.$refs.form.validate();

        if (errors.length > 0) {
          // eslint-disable-next-line
          console.error('CRUDCOMPONENT ERROR:: validation errors', error);
          return;
        }
      } else {
        // eslint-disable-next-line
        console.warn('Unable to find the reference to the schema form on ', this.$route.path);
      }

      return this.$http.post(this._url, this.selectedItem).then(function (res) {
        _this9.$emit(_this9.identity + '-item-created', res.data);

        sweetalert2_default.a.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          title: _this9.$t('AwesomeDefault.messages.successfullyCreated', {
            title: _this9.type
          }),
          type: 'success'
        });
        _this9.tableNeedsRefresh = true;
        _this9.statsNeedsRefresh = true;
        _this9.nestedCrudNeedsRefresh = true;

        _this9.$forceUpdate();

        _this9.closeModal();

        _this9.$emit('itemCreated', _this9.selectedItem, {
          context: _this9.mode
        });
      }).catch(this.apiErrorCallback).finally(function () {
        _this9.isRefreshing = false;
      }); // return false;
    },
    editItem: function editItem() {
      var _this10 = this;

      if (!this._url) {
        // eslint-disable-next-line
        console.warn('CRUDCOMPONENT ERROR:: No url for submitting');
        return false;
      }

      if (!this.selectedItem[this.primaryKey]) {
        // eslint-disable-next-line
        console.warn('CRUDCOMPONENT ERROR:: No primary key on this them', this.selectedItem, this.primaryKey);
        return false;
      }

      if (this.$refs.form) {
        var errors = this.$refs.form.validate();

        if (errors.length > 0) {
          // eslint-disable-next-line
          console.error('CRUDCOMPONENT ERROR:: validation errors', errors);
          return;
        }
      }

      this.$http.put("".concat(this._url, "/").concat(this.selectedItem[this.primaryKey]), this.selectedItem).then(function (res) {
        _this10.$emit(_this10.identity + '-item-updated', res.data);

        sweetalert2_default.a.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          title: _this10.$t('AwesomeDefault.messages.successfullyModified', {
            title: _this10.type
          }),
          type: 'success'
        });
        _this10.tableNeedsRefresh = true;
        _this10.nestedCrudNeedsRefresh = true;

        _this10.$forceUpdate();

        _this10.$emit('itemEdited', _this10.selectedItem, {
          context: _this10.mode
        });

        _this10.closeModal();
      }).catch(this.apiErrorCallback).finally(function () {
        _this10.isRefreshing = false;
      });
      return false;
    },
    createFunction: function createFunction(item) {
      this.$emit('create', item);
    },
    editFunction: function editFunction(item) {
      this.$emit('edit', item);
    },
    viewFunction: function viewFunction(item) {
      this.$emit('view', item);
    },
    deleteFunction: function deleteFunction(item) {
      this.$emit('delete', item);
    },
    nestedViewFunction: function nestedViewFunction() {
      var _this11 = this;

      this.mode = 'view';
      this.$http.get("".concat(this._url)).then(function (res) {
        _this11.selectedItem = _this11.apiResponseConfig.dataPath && _this11.apiResponseConfig.dataPath != false ? external_lodash_default.a.get(res.data, _this11.apiResponseConfig.dataPath) : res.data;
        _this11.nestedCrudNeedsRefresh = true;
      }).catch(this.apiErrorCallback).finally(function () {
        _this11.isRefreshing = false;
      });
    },
    customAction: function customAction(body) {
      var action = body.action;
      this.$emit(this.identity + '-custom-action', action);
      return action && action.action && action.action(body, this);
    },
    listUpdated: function listUpdated(datas) {
      this.$emit('list-updated', datas);
      this.$emit(this.identity + '-list-updated', datas);
    },
    renderLayout: function renderLayout(layout) {},
    renderSidebar: function renderSidebar() {},
    renderTabs: function renderTabs() {},
    renderColumns: function renderColumns(columns) {
      return columns;
    },
    renderGroup: function renderGroup() {},
    renderForm: function renderForm() {
      var definition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        component: 'VueFormGenerator',
        props: {}
      };
    }
  }
});
// CONCATENATED MODULE: ./src/components/crud/AwesomeForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var crud_AwesomeFormvue_type_script_lang_js_ = (AwesomeFormvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/crud/AwesomeForm.vue?vue&type=style&index=0&lang=scss&
var AwesomeFormvue_type_style_index_0_lang_scss_ = __webpack_require__("afe2");

// CONCATENATED MODULE: ./src/components/crud/AwesomeForm.vue






/* normalize component */

var AwesomeForm_component = normalizeComponent(
  crud_AwesomeFormvue_type_script_lang_js_,
  AwesomeFormvue_type_template_id_0c6068f2_render,
  AwesomeFormvue_type_template_id_0c6068f2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AwesomeForm = (AwesomeForm_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crud/CrudComponent.vue?vue&type=script&lang=js&












function CrudComponentvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function CrudComponentvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { CrudComponentvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { CrudComponentvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










var CrudComponentvue_type_script_lang_js_defaultOptions = {
  mode: 'local',
  // Deprecated use dataPaginationMode
  dataPaginationMode: 'local',
  url: null,
  columns: null,
  createPath: null,
  viewPath: null,
  editPath: null,
  queryParams: {},
  stats: false,
  autoRefresh: false,
  // or integer in seconds
  initialDisplayMode: 'table',
  modalMode: 'slide',
  // fade | slide | full
  detailPageMode: 'sidebar',
  // fade | slide | full
  columnsDisplayed: 8,
  customInlineActions: [],
  customTopActions: [],
  customTabletopActions: []
};
/* harmony default export */ var CrudComponentvue_type_script_lang_js_ = ({
  name: 'CrudComponent',
  introduction: 'A component to quickly create a table UI with edit capabilities',
  description: "This component magically create lists and edit data based on a json schema.\n\n  ### Usage.\n\n  There are 3 ways of using the Crud Component.\n  The component works best when connected directly to the router. The config can the be passed as props. See the token section for an example of how to set-up a route based crud component.\n\n  If you want to further personalize your page, it's possible to create your own component, use the crud component in the body, and then use slots to create the desired features.\n\n  The 3rd way of reusing the Crud component if simply by extending the component and redesigning the template part completely. One use case would be to remove the json schema form and create your own form.\n  Whatever the reason for you to modify the component, we suggest that you copy the html code as source for your edits.\n\n  ### Actions\n\n  The crud compoenent allows to define which actions are enabled on a component. There are many default actions that can be configured\n  - create\n  - edit\n  - noActions (globally disable all actions)\n  - search\n  - filter\n  - create\n  - view\n  - delete\n  - export\n  - import\n  - dateFilter\n  - refresh\n  )\n\n  ### custom actions\n\n  In addition to the default actions on a crud component it's also possible to create custom actions.\n  ",
  token: "\n  // example of route for crud component\n  {\n   name: 'contact',\n   path: 'contact',\n   component: CrudComponent,\n   beforeEnter: authGuard,\n   props: {\n     identity: 'contact',\n     options: {\n       url: '/contact',\n       stats: true,\n       actions: {\n         view: true,\n         delete: true,\n       }\n     }\n   },\n   children: [{\n     name: 'contact-view',\n     path: ':id',\n     component: CrudComponent,\n     props: {\n       identity: 'contact',\n       options: {\n         actions: {\n           view: true,\n           delete: true,\n         }\n       }\n     }\n   }, {\n     name: 'contact-edit',\n     path: ':id/edit',\n     component: CrudComponent,\n     props: {\n       identity: 'contact',\n       options: {\n         actions: {\n           edit: true,\n           view: true,\n           delete: true,\n         }\n       }\n     }\n   }]\n }\n ,\n ",
  components: {
    AwesomeTable: AwesomeTable,
    EnyoCrudStatsSection: EnyoCrudStatsSection,
    AwesomeForm: AwesomeForm
  },
  mixins: [i18nMixin, apiErrorsMixin, apiConfigMixin],
  props: {
    title: {
      type: String,
      required: false,
      default: undefined
    },
    pageTitle: {
      type: String,
      required: false,
      default: undefined
    },
    identity: {
      type: String,
      required: true
    },
    modelName: {
      type: String,
      required: false
    },
    primaryKey: {
      type: String,
      default: 'id',
      note: 'The field to use as a primary key (id / _id)'
    },
    model: {
      type: Object,
      required: false,
      default: undefined,
      note: 'The object that will be used for managing the component. it contains the schema along with some other options. If no provided i can be reconstructed if we have the schema prop.'
    },
    schema: {
      type: Object,
      required: false,
      default: undefined,
      note: 'The json schema that represent the object to display. this is used to create. Must be provided if no model definition is available'
    },
    crudNeedsRefresh: {
      type: Boolean,
      default: false,
      note: 'Define whether the content of the table list should be refreshed'
    },
    nestedSchemas: {
      type: Array,
      required: false,
      default: function _default() {
        return [];
      },
      note: 'An array describing the data that is linked to the nested model. Serves for displaying a detailed object'
    },
    parent: {
      type: Object,
      required: false,
      note: 'The object containing the parent in case of a nested schema.' + "You don't actually to pass this, it's done automatically by the parent component itself"
    },
    nestedDisplayMode: {
      type: String,
      required: false,
      default: 'list',
      note: "In case of a nested schema, this parameter determines whether the component should be rendered as a list or a form"
    },
    translations: {
      type: Object,
      required: false,
      default: function _default() {
        return {
          'EnyoCrudComponent.labels.manageTitle': 'EnyoCrudComponent.labels.manageTitle',
          'EnyoCrudComponent.buttons.view': 'EnyoCrudComponent.buttons.view',
          'EnyoCrudComponent.buttons.cancel': 'EnyoCrudComponent.buttons.cancel',
          'EnyoCrudComponent.buttons.close': 'EnyoCrudComponent.buttons.close'
        };
      },
      note: 'Translation labels to use when vue-i18n is not present'
    },
    options: {
      type: Object,
      default: function _default() {
        return CrudComponentvue_type_script_lang_js_defaultOptions;
      }
    },
    actions: {
      type: Object,
      default: function _default() {
        return defaultActions;
      },
      note: 'actions active in this instance'
    }
  },
  data: function data() {
    return {
      parentPath: '',
      selectedItem: {},
      previousDisplayMode: '',
      displayMode: 'table',
      isRefreshing: false,
      tableNeedsRefresh: false,
      awesomeEditNeedsRefresh: false,
      statsNeedsRefresh: false,
      nestedCrudNeedsRefresh: false,
      innerOptions: {},
      innerSchema: {},
      _model: {},
      innerNestedSchemas: [],
      activeNestedTab: 'general',
      formOptions: {
        validateAsync: true,
        validateAfterLoad: false,
        validateAfterChanged: true,
        fieldIdPrefix: 'AwesomeCrud'
      }
    };
  },
  computed: {
    _title: function _title() {
      // @deprecated
      if (this._model && this._model.pageTitle) {
        return this.$te(this._model.pageTitle) ? this.$t(this._model.pageTitle) : this._model.pageTitle;
      }

      if (this.title) {
        return this.$te(this.title) ? this.$t(this.title) : this.title;
      }

      if (this._model && this._model.singularName) {
        return this.$te(this._model.singularName) ? this.$t(this._model.singularName) : external_lodash_default.a.startCase(this._model.singularName);
      }

      if (this.identity) {
        return this.$te("app.labels.".concat(this.identity)) ? this.$t("app.labels.".concat(this.identity)) : external_lodash_default.a.startCase(this.identity);
      }

      return '';
    },
    _titlePlural: function _titlePlural() {
      if (this._model && this._model.namePlural) {
        return this.$te(this._model.namePlural) ? this.$t(this._model.namePlural) : external_lodash_default.a.startCase(this._model.namePlural);
      }

      if (this.title) {
        return this.$te(this.title + 's') ? this.$t(this.title + 's') : this.title + 's';
      }

      if (this.identity) {
        return this.$te("app.labels.".concat(this.identity, "s")) ? this.$t("app.labels.".concat(this.identity, "s")) : external_lodash_default.a.startCase(this.identity + 's');
      }

      return '';
    },
    _name: function _name() {
      if (this._model && this._model.name) {
        return this.$te(this._model.name) ? this.$t(this._model.name) : external_lodash_default.a.startCase(this._model.name);
      }

      if (this.identity) {
        return this.$te("app.labels.".concat(this.identity)) ? this.$t("app.labels.".concat(this.identity)) : external_lodash_default.a.startCase(this.identity);
      }

      return '';
    },
    _namePlural: function _namePlural() {
      if (this._model && this._model.namePlural) {
        return this.$te(this._model.namePlural) ? this.$t(this._model.namePlural) : external_lodash_default.a.startCase(this._model.namePlural);
      }

      if (this.identity) {
        return this.$te("app.labels.".concat(this.identity)) ? this.$t("app.labels.".concat(this.identity)) : external_lodash_default.a.startCase(this.identity);
      }

      return '';
    },
    formSchema: function formSchema() {
      if (!this.innerSchema) {
        return [];
      }

      var parsedFormSchema = this.parseSchema(this.innerSchema);
      return parsedFormSchema;
    },
    _actions: function _actions() {
      return external_lodash_default.a.merge({}, defaultActions, this.actions || this.innerOptions && this.innerOptions.actions // old location kept for BC
      );
    },
    _url: function _url() {
      var url = this.url || this.options && this.options.url || this._model && this._model.url || "/".concat(this.identity);

      if (typeof url === 'function') {
        return url({
          parent: this.parent,
          context: this,
          currentItem: this.currentItem
        });
      }

      return url;
    }
  },
  watch: {
    // call again the method if the route changes
    name: 'loadModel',
    identity: 'loadModel',
    model: 'loadModel',
    options: 'mergeOptions',
    crudNeedsRefresh: 'refreshComponent'
  },
  created: function created() {
    if (!this.$http) {
      try {
        var axios = __webpack_require__("cebe");

        this.$http = axios;
      } catch (err) {// console.warn(err.message);
      }
    }

    this.loadModel();
  },
  mounted: function mounted() {
    // allow old property names to still work
    if (this.modelName) {
      this.identity = this.modelName;
    }

    this.loadModel();

    if (!this.$route) {
      // stop if we don't have a router to bind ourselves to
      return;
    } // this.displayMode = this.innerOptions.initialDisplayMode;


    var matched = this.$route.matched[this.$route.matched.length - 1];

    if (this.$route.params.id) {
      if (this.$route.params.id === 'create' || this.$route.params.id === 'new') {
        delete this.$route.params.id;

        if (this.$route.query.item) {
          this.selectedItem = external_lodash_default.a.merge(this.selectedItem, this.$route.query.item);
        }

        this.goToCreatePage({
          reset: false
        });
        return;
      }

      this.parentPath = matched.path.replace('/edit', '').replace('/:id', '');
    } else {
      this.parentPath = matched.path;
    }
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    // eslint-disable-next-line
    next(function (vm) {
      vm.closeModal(); //    vm.loadModel();
    });
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    next(function (vm) {
      vm.closeModal();
    });
  },
  methods: {
    $alert: sweetalert2_default.a,
    refreshComponent: function refreshComponent() {
      var _this = this;

      // console.log("refresh component watcher");
      if (this.identity) {
        this.loadModel();
      }

      this.tableNeedsRefresh = true;
      this.statsNeedsRefresh = true;
      this.awesomeEditNeedsRefresh = true;
      this.nestedCrudNeedsRefresh = true;
      setTimeout(function () {
        _this.$emit('update:crudNeedsRefresh', false);
      }, 100);
    },
    onTableRefresh: function onTableRefresh() {
      this.statsNeedsRefresh = true;
    },
    mergeOptions: function mergeOptions() {
      var _this2 = this;

      if (this.options.deletePermitted && this._actions.delete) {
        if (this.$store && this.$store.state && !this.options.deletePermitted.some(function (v) {
          return _this2.$store.state.user.roles.indexOf(v.toUpperCase()) >= 0;
        })) {
          this._actions.delete = false;
        }
      }

      this.innerOptions = external_lodash_default.a.merge({}, CrudComponentvue_type_script_lang_js_defaultOptions, this.innerOptions, this.options);

      if (this.$route && this.$route.query && this.$route.query.filters) {
        this.innerOptions.queryParams = external_lodash_default.a.merge(this.innerOptions.queryParams || this.$route.query.filters);
      }
    },
    callbackFunctionForBAse64: function callbackFunctionForBAse64(e) {
      // eslint-disable-next-line
      console.log('Base 64 done', e);
    },
    importResponse: function importResponse(e) {
      var _this3 = this;

      // swal({title: this.$t('common.messages.successfullyImported',{title: this.name}), type: 'success'})
      this.$notifications.clear();

      if ((!e.improperData || e.improperData.length === 0) && (!e.properData || e.properData.length === 0)) {
        sweetalert2_default.a.fire({
          title: this.$t('common.messages.no_data_imported', {
            title: this._title
          }),
          type: 'warning'
        });
        return;
      }

      if (e.properData.length > 0) {
        this.$notify({
          title: this.$t('common.messages.successfullyImported', {
            title: this._title
          }),
          type: 'success'
        });
      }

      if (e.improperData.length > 0) {
        var message = '';
        e.improperData.forEach(function (element) {
          message += " - ".concat(Object.values(element).join(' | '), ", ");
        });
        message = message.substring(0, message.length - 2);
        setTimeout(function () {
          _this3.$notify({
            title: "".concat(e.improperData.length, " ").concat(_this3.$t('common.messages.not_imported', {
              title: _this3._title
            })),
            message: message,
            type: 'warning',
            timeout: 30000
          });
        }, 0);
      }

      this.tableNeedsRefresh = true;
      this.statsNeedsRefresh = true;
      this.nestedCrudNeedsRefresh = true;
      this.$forceUpdate();
    },
    exportTemplateCallBack: function exportTemplateCallBack() {
      var _this4 = this;

      if (!this.innerOptions.importUrl) {
        this.$notify({
          title: '[WARN] missing export url',
          type: 'warning'
        });
        return;
      }

      this.$http.get(this.innerOptions.importUrl + '-template', {}).then(function (res) {
        if (res.data.url) {
          var link = document.createElement('a');
          link.download = "".concat(_this4.entity, "_export");
          link.href = res.data.url;
          link.click();
          link.remove();
        }
      }).catch(this.apiErrorCallback);
    },
    loadModel: function loadModel() {
      var _this5 = this;

      if (!this.options) {
        this.options = {};
      }

      this.mergeOptions();

      if (this.$store && this.$store.state && !this.model) {
        // @delete ?
        this._model = this.$store.state.data.models.find(function (model) {
          return model.identity === _this5.identity;
        });
      } else {
        this._model = this.model;
      }

      if (!this._model && !this.schema) {
        // console.warn("CRUD COMPONENT ERROR", `model ${this.name} not found`);
        return;
      }

      this.innerSchema = this.schema || this._model.schema;
      this.innerOptions.columns = this.parseColumns(this.innerSchema.properties); // now a computed property...
      // this.innerOptions.url =
      //   this.url ||
      //   (this.options && this.options.url) ||
      //   (this._model && this._model.url) ||
      //   `/${this.identity}`;
      // if (typeof this.innerOptions.url === 'function') {
      //   this.innerOptions.url = this.innerOptions.url(this.parent, this);
      // }

      if (!this.innerOptions.exportUrl) {
        this.innerOptions.exportUrl = "".concat(this._url, "/export");
      }

      if (!this.innerOptions.importUrl) {
        this.innerOptions.importUrl = "".concat(this._url, "/import");
      } // if the crud is nested and should display as a form then load the data from remote


      if (this.parent && this.nestedDisplayMode === 'object') {
        this.nestedViewFunction();
      }

      if (!this._url) {
        return;
      }

      if (this.$route && this.$route.params && this.$route.params.id) {
        this.$http.get("".concat(this._url, "/").concat(this.$route.params.id)).then(function (res) {
          var matched = _this5.$route.matched[_this5.$route.matched.length - 1];
          var data = _this5.apiResponseConfig.dataPath && _this5.apiResponseConfig.dataPath != false ? external_lodash_default.a.get(res.data, _this5.apiResponseConfig.dataPath) : res.data;

          if (matched.path.indexOf('/edit') !== -1) {
            _this5.setDisplayMode('edit', data);
          } else {
            _this5.setDisplayMode('view', data);
          }

          _this5.$forceUpdate();
        }).catch(this.apiErrorCallback).finally(function () {
          _this5.isRefreshing = false;
        });
      }
    },
    parseSchema: function parseSchema(schema) {
      var _this6 = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (!schema.properties) {
        return [];
      }

      if (prefix && schema.$schema) {
        // console.warn("possible recursive parseSchema call", schema);
        return;
      }

      var fields = [];
      var size = Object.keys(schema.properties).length;
      Object.keys(schema.properties).forEach(function (key) {
        if ([_this6.primaryKey].indexOf(key) === -1) {
          var prop = schema.properties[key];

          if (prop.field && prop.field.hidden) {
            return;
          }

          if (prop.type === 'object' && !(prop.field && prop.field.type)) {
            var subSchema = _this6.parseSchema(prop, "".concat(prefix).concat(key, "."));

            subSchema.legend = prop.title || external_lodash_default.a.startCase(key);
            subSchema.type = 'group';
            subSchema.styleClasses = "subgroup  ".concat(prop.field && prop.field.styleClasses || 'card');
            fields.push(subSchema);
          } else {
            if (prop.field && prop.relation && prop.field.fieldOptions) {
              prop.field.fieldOptions.url = prop.relation;
              prop.field.fieldOptions.trackBy = prop.foreignKey;
              prop.field.fieldOptions.searchable = true;
            }

            var field = {
              type: prop.field && prop.field.type || _this6.getFormtype(prop),
              label: prop.title || prop.description || external_lodash_default.a.startCase(key),
              placeholder: prop.description || prop.title || external_lodash_default.a.startCase(key),
              fieldOptions: prop.field && prop.field.fieldOptions || {
                placeholder: prop.description || prop.title || external_lodash_default.a.startCase(key),
                url: prop.relation,
                trackBy: prop.foreignKey || 'id',
                label: 'label',
                // key label for enyo select
                name: 'label',
                // key label for native select
                step: prop.field && prop.field.step,
                readonly: _this6.displayMode === 'view' || prop.field && prop.field.readonly,
                disabled: _this6.displayMode === 'view' || prop.field && prop.field.readonly
              },
              values: prop.field && prop.field.fieldOptions && (prop.field.fieldOptions.values || _this6.getSelectEnumFromStore(prop.field.fieldOptions.enum)) || prop.enum || prop.items && prop.items.enum || [],
              required: prop.field && prop.field.required,
              hint: prop.description,
              model: prefix + key,
              validator: prop.field && prop.field.validator,
              min: prop.min,
              max: prop.max,
              multi: prop.type === 'array',
              readonly: _this6.displayMode === 'view' || prop.field && prop.field.readonly,
              disabled: _this6.displayMode === 'view' || prop.field && prop.field.readonly,
              styleClasses: prop.field && prop.field.styleClasses || (size < 8 ? 'col-12' : 'col-6'),
              relation: prop.relation,
              foreignKey: prop.foreignKey,
              group: prop.field ? prop.field.group : undefined
            };

            if (!field.fieldOptions.inputType) {
              field.fieldOptions.inputType = prop.field && prop.field.inputType || _this6.getFormInputType(prop) || 'text';
            }

            if (prop.type === 'boolean' && (field.type === 'select' || field.type === 'enyoSelect') && (!field.values || !field.values.length)) {
              field.values = [{
                id: true,
                label: 'Yes'
              }, {
                id: false,
                label: 'No'
              }, {
                id: '',
                label: '-'
              }];
            }

            if (field.type === 'dateTime') {
              field.fieldOptions.icons = {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-arrow-up',
                down: 'fa fa-arrow-down'
              };
            }

            if (field.type === 'enyoSelect' && !field.fieldOptions.options) {
              field.options = field.values;
            }

            fields.push(field);
          }
        }
      }); // let groups = this.parseSchemaGroups(schema);
      // groups = this.distributeFieldsInGroups(groups, fields);

      return {
        fields: fields
      };
    },
    parseSchemaGroups: function parseSchemaGroups(schema) {
      var _this7 = this;

      var groups = [];

      if (!schema.formGroups) {
        return {};
      }

      schema.formGroups.forEach(function (group) {
        if (!groups[group.id]) {
          groups.push(CrudComponentvue_type_script_lang_js_objectSpread(CrudComponentvue_type_script_lang_js_objectSpread({
            fields: []
          }, group), {}, {
            legend: _this7.$t(group.title),
            type: 'group'
          }));
        }
      });

      if (groups.length < 1) {
        groups = [{
          legend: '',
          fields: schema.fields
        }];
      }

      return groups;
    },
    distributeFieldsInGroups: function distributeFieldsInGroups(groups, fields) {
      fields.forEach(function (f) {
        if (f.group) {
          var keys = f.group.split('.');
          var targetGroup = {
            groups: groups
          };
          keys.forEach(function (key) {
            targetGroup = external_lodash_default.a.find(targetGroup.groups, {
              id: key
            });
          });

          if (targetGroup) {
            if (!targetGroup.fields) {
              targetGroup.fields = [];
            }

            targetGroup.fields.push(f);
          }
        }
      });
      return groups;
    },
    getFormtype: function getFormtype(property) {
      var type = property.type;

      if (Array.isArray(type)) {
        var possibleTypes = ['string', 'number', 'boolean'];

        for (var i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      if (property.enum) {
        return 'select';
      }

      switch (type) {
        case 'string':
          return 'input';

        case 'integer':
        case 'number':
          return 'input';

        case 'boolean':
          return 'select';
        // put enyoSelect after debugging all the issues...enyoSelect

        default:
          return 'input';
      }
    },
    getSelectEnumFromStore: function getSelectEnumFromStore(val) {
      var options = external_lodash_default.a.isString(val) && val.indexOf('$store') === 0 ? external_lodash_default.a.get(this.$store.state, val.replace('$store.', '')) : val;
      return options;
    },
    getFormInputType: function getFormInputType(property) {
      var type = property.type;

      if (Array.isArray(type)) {
        var possibleTypes = ['string', 'number', 'boolean'];

        for (var i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      switch (type) {
        case 'string':
          switch (property.format) {
            case 'email':
              return 'email';

            case 'date-time':
              return 'datetime';

            default:
              return 'text';
          }

        case 'number':
          return 'number';

        case 'boolean':
        case 'array':
        case 'object':
          return 'string';

        default:
          // console.error("type not known ", type, property);
          return type;
      }
    },
    getColumnType: function getColumnType(property) {
      if (property.column && property.column.type) {
        return property.column.type;
      }

      if (property.columnType) {
        return property.columnType;
      }

      var type = property.type;

      if (Array.isArray(type)) {
        var possibleTypes = ['string', 'number', 'boolean'];

        for (var i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      switch (type) {
        case 'string':
          switch (property.format) {
            case 'date-time':
              return 'text';

            default:
              return 'text';
          }

        case 'number':
          return 'number';

        case 'boolean':
          return 'boolean';

        case 'array':
        case 'object':
          return 'object';

        default:
          return 'text';
      }
    },

    /** @param mode: string */
    setDisplayMode: function setDisplayMode(mode, item) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        refresh: true
      };
      this.previousDisplayMode = this.displayMode || 'table';

      if (item) {
        this.selectedItem = item;
      }

      this.displayMode = mode;

      if (mode === 'table') {
        this.tableNeedsRefresh = options.refresh;
      } else {
        this.awesomeEditNeedsRefresh = options.refresh;
      }
    },
    goToCreatePage: function goToCreatePage() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        reset: true
      };

      if (this.innerOptions.createPath) {
        return this.$router.push(this.innerOptions.createPath);
      }

      if (options.reset) {
        this.selectedItem = {};
      }

      this.setDisplayMode('create', null);
      window.history.replaceState({}, null, "".concat(this.parentPath, "/new"));
      return;
    },
    goToDeletePage: function goToDeletePage(item) {
      if (this.innerOptions.createPath) {
        return this.$router.push(this.innerOptions.deletePath.replace(':id', item[this.primaryKey]));
      }

      this.deleteFunction(item);
      return;
    },
    goToEditPage: function goToEditPage(item) {
      if (this.innerOptions.editPath) {
        return this.$router.push(this.innerOptions.editPath.replace(':id', item[this.primaryKey]));
      }

      window.history.replaceState({}, null, "".concat(this.parentPath, "/").concat(item[this.primaryKey], "/edit"));
      this.setDisplayMode('edit', item);
    },
    goToViewPage: function goToViewPage(item) {
      if (this.innerOptions.viewPath) {
        return this.$router.push(this.innerOptions.viewPath.replace(':id', item[this.primaryKey]));
      }

      window.history.replaceState({}, null, "".concat(this.parentPath, "/").concat(item[this.primaryKey]));
      this.setDisplayMode('view', item);
    },
    nestedViewFunction: function nestedViewFunction() {
      var _this8 = this;

      this.displayMode = 'view';
      this.$http.get("".concat(this._url)).then(function (res) {
        _this8.selectedItem = _this8.apiResponseConfig.dataPath && _this8.apiResponseConfig.dataPath != false ? external_lodash_default.a.get(res.data, _this8.apiResponseConfig.dataPath) : res.data;
        _this8.nestedCrudNeedsRefresh = true;
      }).catch(this.apiErrorCallback).finally(function () {
        _this8.isRefreshing = false;
      });
    },
    deleteFunction: function deleteFunction(item) {
      var _this9 = this;

      sweetalert2_default.a.fire({
        title: this.$t('AwesomeDefault.messages.are_you_sure'),
        text: this.$t('AwesomeDefault.messages.wont_be_able_recover'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary)',
        cancelButtonColor: '#eee',
        confirmButtonText: this.$t('EnyoCrudComponent.buttons.yes_delete_it'),
        cancelButtonText: this.$t('EnyoCrudComponent.buttons.cancel'),
        reverseButtons: true
      }).then(function (result) {
        if (result.value) {
          _this9.$http.delete("".concat(_this9._url, "/").concat(item[_this9.primaryKey])).then(function () {
            _this9.tableNeedsRefresh = true;
            _this9.statsNeedsRefresh = true;
            _this9.nestedCrudNeedsRefresh = true;

            _this9.$forceUpdate();
          }).catch(function (err) {
            // eslint-disable-next-line
            console.error(err);
          }).finally(function () {
            _this9.isRefreshing = false;
          });
        }
      });
    },
    onCustomAction: function onCustomAction(body) {
      var action = body.action;
      this.$emit(this.identity + '-custom-action', action);
      return action && action.action && action.action(body, this);
    },

    /**
     * @param item object
     * @param options = {context = create | edit }
     */
    onEditDisplayCancelled: function onEditDisplayCancelled(item, _ref) {
      var context = _ref.context;
      this.setDisplayMode(this.previousDisplayMode && this.previousDisplayMode !== context ? this.previousDisplayMode : 'table', item, {
        refresh: false
      });
    },
    onViewDisplayCancelled: function onViewDisplayCancelled(item) {
      // eslint-disable-next-line
      console.log('@cancel event treated', this.previousDisplayMode);
      this.setDisplayMode(this.previousDisplayMode && this.previousDisplayMode !== 'view' ? this.previousDisplayMode : 'table', item, {
        refresh: false
      });
    },
    onItemCreated: function onItemCreated(item) {
      this.setDisplayMode('table', item); // eslint-disable-next-line

      console.log('EVENT', 'onItemCreated', item);
    },
    onItemEdited: function onItemEdited() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // eslint-disable-next-line
      console.log('EVENT', 'onItemEdited', args);
    },
    onItemDeleted: function onItemDeleted() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      // eslint-disable-next-line
      console.log('EVENT', 'onItemDeleted', args);
    },
    onItemViewed: function onItemViewed() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      // eslint-disable-next-line
      console.warn('EVENT', 'onItemViewed', args);
    },
    onItemValidated: function onItemValidated() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      // eslint-disable-next-line
      console.warn('EVENT', 'onItemValidated', args);
    },
    onItemValidationFailed: function onItemValidationFailed() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      // eslint-disable-next-line
      console.warn('EVENT', 'onItemValidationFailed', args);
    },
    onListUpdated: function onListUpdated(datas) {
      this.$emit('list-updated', datas);
      this.$emit(this.identity + '-list-updated', datas);
    },
    // transform the schema into a format accepted by the ajaxtable
    parseColumns: function parseColumns(properties) {
      var _this10 = this;

      var newcolumns = [];
      Object.keys(properties).forEach(function (key) {
        var newCol = {};
        var prop = properties[key];

        if (!prop.hidden && !(prop.column && prop.column.hidden)) {
          newCol.field = key;
          newCol.type = _this10.getColumnType(prop);
          newCol.label = external_lodash_default.a.startCase(prop.column && prop.column.title || prop.title || key);
          newCol.filterOptions = {
            enabled: false
          };
          newCol.enum = prop.column && prop.column.enum || prop.enum;
          newCol.sortable = prop.column && prop.column.sortable !== undefined ? prop.column.sortable : true;
          newCol = CrudComponentvue_type_script_lang_js_objectSpread(CrudComponentvue_type_script_lang_js_objectSpread({}, newCol), prop.column);

          if (prop.relation) {
            newCol.relation = prop.relation;
          }

          newcolumns.push(newCol);
        }
      });

      if (!newcolumns.find(function (col) {
        return col.field === 'ACTIONS';
      })) {
        newcolumns.push({
          field: 'ACTIONS',
          label: 'Actions',
          filterable: false,
          enabled: false
        });
      }

      return newcolumns;
    }
  }
});
// CONCATENATED MODULE: ./src/components/crud/CrudComponent.vue?vue&type=script&lang=js&
 /* harmony default export */ var crud_CrudComponentvue_type_script_lang_js_ = (CrudComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/crud/CrudComponent.vue?vue&type=style&index=0&lang=scss&
var CrudComponentvue_type_style_index_0_lang_scss_ = __webpack_require__("7de1");

// CONCATENATED MODULE: ./src/components/crud/CrudComponent.vue






/* normalize component */

var CrudComponent_component = normalizeComponent(
  crud_CrudComponentvue_type_script_lang_js_,
  CrudComponentvue_type_template_id_2618851d_render,
  CrudComponentvue_type_template_id_2618851d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CrudComponent = (CrudComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/card/TableAndChartsCard.vue?vue&type=template&id=35a7ae80&
var TableAndChartsCardvue_type_template_id_35a7ae80_render = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-table-and-chart",class:( _obj = { 'card-stats-fullscreen': _vm.fullscreen }, _obj[_vm.className] = _vm.className, _obj )},[(_vm.currentState === 'table')?_c('AwesomeTable',{attrs:{"title":_vm.title,"columns":_vm.tableColumns,"rows":_vm.dataSource,"table-needs-refresh":_vm.needsRefresh || _vm.internalRefreshRequested,"perPage":_vm.tableOptions ? _vm.tableOptions.perPage : '',"options":_vm.tableOptions}},[_c('template',{slot:"table-top-actions"},[_c('button',{staticClass:"btn btn-simple btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.setTab('bar')}}},[_vm._v("\n        Barres\n      ")]),_c('button',{staticClass:"btn btn-simple btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.setTab('line')}}},[_vm._v("\n        Graphe\n      ")]),_c('button',{staticClass:"btn btn-simple btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.setTab('pie')}}},[_vm._v("\n        Camembert\n      ")]),_c('button',{staticClass:"btn btn-simple btn-primary card-stats-fullscreen-button pr-0",attrs:{"type":"button"},on:{"click":function($event){return _vm.toggleFullscreen()}}},[(_vm.fullscreen)?_c('i',{staticClass:"fa fa-times"}):_vm._e(),(!_vm.fullscreen)?_c('i',{staticClass:"fa fa-search-plus"}):_vm._e()])])],2):_vm._e(),(_vm.currentState === 'bar')?_c('enyo-chart-card',{attrs:{"chart-type":"Bar","chart-data":{
      labels: _vm.selectProp(_vm.dataSource, _vm.chartColKey),
      series: [_vm.selectProp(_vm.dataSource, _vm.chartRowKey)],
    },"header-classes":'ajax-table-header ' +
        (_vm.chartOptions.headerStyle
          ? 'colored-header bg-' + _vm.chartOptions.headerStyle
          : '')}},[_c('template',{slot:"header"},[_c('h4',{staticClass:"mt-0 mb-0"},[_vm._v("\n        "+_vm._s(_vm.title)+"\n        "),_c('div',{staticClass:"btn-group btn-group-sm float-right"},[_c('button',{staticClass:"btn btn-simple btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.setTab('table')}}},[_vm._v("\n            Liste\n          ")]),_c('button',{staticClass:"btn btn-simple btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.setTab('line')}}},[_vm._v("\n            Graphe\n          ")]),_c('button',{staticClass:"btn btn-simple btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.setTab('pie')}}},[_vm._v("\n            Camembert\n          ")]),_c('button',{staticClass:"btn btn-simple btn-primary card-stats-fullscreen-button pr-0",attrs:{"type":"button"},on:{"click":function($event){return _vm.toggleFullscreen()}}},[(_vm.fullscreen)?_c('i',{staticClass:"fa fa-times"}):_vm._e(),(!_vm.fullscreen)?_c('i',{staticClass:"fa fa-search-plus"}):_vm._e()])])])])],2):_vm._e(),(_vm.currentState === 'line')?_c('enyo-chart-card',{attrs:{"chart-type":"Line","chart-data":{
      labels: _vm.selectProp(_vm.dataSource, _vm.chartColKey),
      series: [_vm.selectProp(_vm.dataSource, _vm.chartRowKey)],
    },"header-classes":'ajax-table-header ' +
        (_vm.chartOptions.headerStyle
          ? 'colored-header bg-' + _vm.chartOptions.headerStyle
          : '')}},[_c('template',{slot:"header"},[_c('h4',{staticClass:"mt-0 mb-0"},[_vm._v("\n        "+_vm._s(_vm.title)+"\n        "),_c('div',{staticClass:"btn-group btn-group-sm float-right"},[_c('button',{staticClass:"btn btn-simple btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.setTab('table')}}},[_vm._v("\n            Liste\n          ")]),_c('button',{staticClass:"btn btn-simple btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.setTab('bar')}}},[_vm._v("\n            Barres\n          ")]),_c('button',{staticClass:"btn btn-simple btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.setTab('pie')}}},[_vm._v("\n            Camembert\n          ")]),_c('button',{staticClass:"btn btn-simple btn-primary card-stats-fullscreen-button pr-0",attrs:{"type":"button"},on:{"click":function($event){return _vm.toggleFullscreen()}}},[(_vm.fullscreen)?_c('i',{staticClass:"fa fa-times"}):_vm._e(),(!_vm.fullscreen)?_c('i',{staticClass:"fa fa-search-plus"}):_vm._e()])])])])],2):_vm._e(),(_vm.currentState === 'pie')?_c('enyo-chart-card',{attrs:{"chart-type":"Pie","chart-data":{
      labels: _vm.selectProp(_vm.dataSource, _vm.chartColKey),
      series: [_vm.selectProp(_vm.dataSource, _vm.chartRowKey)],
    },"responsive-options":_vm.pieResponsiveOptions,"header-classes":'ajax-table-header ' +
        (_vm.chartOptions.headerStyle
          ? 'colored-header bg-' + _vm.chartOptions.headerStyle
          : '')}},[_c('template',{slot:"header"},[_c('h4',{staticClass:"mt-0 mb-0"},[_vm._v("\n        "+_vm._s(_vm.title)+"\n        "),_c('div',{staticClass:"btn-group btn-group-sm float-right"},[_c('button',{staticClass:"btn btn-simple btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.setTab('table')}}},[_vm._v("\n            Liste\n          ")]),_c('button',{staticClass:"btn btn-simple btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.setTab('bar')}}},[_vm._v("\n            Barres\n          ")]),_c('button',{staticClass:"btn btn-simple btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.setTab('line')}}},[_vm._v("\n            Graphe\n          ")]),_c('button',{staticClass:"btn btn-simple btn-primary card-stats-fullscreen-button pr-0",attrs:{"type":"button"},on:{"click":function($event){return _vm.toggleFullscreen()}}},[(_vm.fullscreen)?_c('i',{staticClass:"fa fa-times"}):_vm._e(),(!_vm.fullscreen)?_c('i',{staticClass:"fa fa-search-plus"}):_vm._e()])])])])],2):_vm._e()],1)}
var TableAndChartsCardvue_type_template_id_35a7ae80_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/card/TableAndChartsCard.vue?vue&type=template&id=35a7ae80&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/card/EnyoChartCard.vue?vue&type=template&id=2f4e20ac&
var EnyoChartCardvue_type_template_id_2f4e20ac_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card",class:_vm.chartClasses},[(_vm.$slots.header)?_c('div',{staticClass:"card-header",class:_vm.headerClasses},[_vm._t("header")],2):_vm._e(),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"ct-chart",attrs:{"id":_vm.chartId}})]),(_vm.$slots.footer)?_c('div',{staticClass:"card-footer"},[_vm._t("footer")],2):_vm._e()])}
var EnyoChartCardvue_type_template_id_2f4e20ac_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/card/EnyoChartCard.vue?vue&type=template&id=2f4e20ac&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/card/EnyoChartCard.vue?vue&type=script&lang=js&









function EnyoChartCardvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function EnyoChartCardvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { EnyoChartCardvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { EnyoChartCardvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var EnyoChartCardvue_type_script_lang_js_ = ({
  name: "EnyoChartCard",
  components: {},
  props: {
    classes: String,
    headerClasses: String,
    chartType: {
      type: String,
      default: "Line" // Line | Pie | Bar

    },
    chartOptions: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    chartData: {
      type: Object,
      default: function _default() {
        return {
          labels: [],
          series: []
        };
      }
    },
    responsiveOptions: [Object, Array],
    graphNeedsRefresh: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      chartId: "no-id",
      $Chartist: null,
      chart: null,
      animationsClasses: ""
    };
  },
  computed: {
    chartClasses: function chartClasses() {
      return "".concat(this.class || "", " ").concat(this.animationsClasses, " ");
    }
  },
  watch: {
    graphNeedsRefresh: "initChart",
    chartData: "initChart",
    chartOptions: "initChart"
  },
  mounted: function () {
    var _mounted = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this = this;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.updateChartId(); // we need dynamic import because of SSR

              _context.next = 3;
              return __webpack_require__.e(/* import() */ 1).then(__webpack_require__.t.bind(null, "ba48", 7));

            case 3:
              this.$Chartist = _context.sent;
              setTimeout(function () {
                _this.initChart();
              }, 100);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _mounted.apply(this, arguments);
    }

    return mounted;
  }(),
  methods: {
    /** *
     * Initializes the chart by merging the chart options sent via props and the default chart options
     */
    initChart: function initChart() {
      var chartIdQuery = "#".concat(this.chartId);
      var chartData = {};
      var barChartOptions = {};
      var lineChartOptions = {};

      if (!this.$Chartist) {
        return;
      }

      switch (this.chartType) {
        case "Pie":
          chartData = {
            series: this.chartData.series[0],
            labels: this.chartData.labels
          };
          barChartOptions = EnyoChartCardvue_type_script_lang_js_objectSpread(EnyoChartCardvue_type_script_lang_js_objectSpread({}, this.chartOptions), {}, {
            labelInterpolationFnc: function labelInterpolationFnc(value, index) {
              return "".concat(value, " (").concat(Math.round(chartData.series[index] / chartData.series.reduce(function (a, b) {
                return a + b;
              }) * 100), "%)");
            }
          });
          this.chart = this.$Chartist[this.chartType](chartIdQuery, chartData, barChartOptions, this.responsiveOptions);
          break;

        case "Line":
          lineChartOptions = EnyoChartCardvue_type_script_lang_js_objectSpread(EnyoChartCardvue_type_script_lang_js_objectSpread({}, this.chartOptions), {}, {
            plugins: [this.$Chartist.plugins.ctPointLabels({
              textAnchor: "middle"
            })]
          });
          this.chart = this.$Chartist[this.chartType](chartIdQuery, this.chartData, lineChartOptions, this.responsiveOptions);
          break;

        case "Bar":
          this.chart = this.$Chartist[this.chartType](chartIdQuery, this.chartData, this.chartOptions, this.responsiveOptions);
          break;
      }

      this.$emit("initialized", this.chart);
      this.$emit("update:graphNeedsRefresh", false);

      if (window.matchMedia) {
        var mediaQueryList = window.matchMedia("print"); // console.log("media type", mediaQueryList);

        if (mediaQueryList.matches) {
          return;
        }
      }

      if (this.chartType === "Line") {
        this.animateLineChart();
      }

      if (this.chartType === "Bar") {
        this.animateBarChart();
      }

      if (this.chartType === "Pie") {
        this.animatePieChart();
      }
    },

    /** *
     * Assigns a random id to the chart
     */
    updateChartId: function updateChartId() {
      var currentTime = new Date().getTime().toString();
      var randomInt = this.getRandomInt(0, currentTime);
      this.chartId = "div_".concat(randomInt);
    },
    getRandomInt: function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    animateLineChart: function animateLineChart() {
      var _this2 = this;

      var seq = 0;
      var durations = 500;
      var delays = 80;
      this.chart.on("draw", function (data) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: _this2.$Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === "point") {
          seq++;
          data.element.animate({
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      });
      seq = 0;
    },
    animateBarChart: function animateBarChart() {
      var seq = 0;
      var durations = 500;
      var delays = 80;
      this.chart.on("draw", function (data) {
        if (data.type === "bar") {
          seq++;
          data.element.animate({
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      });
    },
    animatePieChart: function animatePieChart() {
      // console.log("ANIMATING pie chart");
      var seq = 0;
      var durations = 150;
      var delays = 80; // this.animationsClasses = 'fade';

      this.chart.on("draw", function (data) {
        if (data.type === "slice") {
          seq++;
          data.element.animate({
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/card/EnyoChartCard.vue?vue&type=script&lang=js&
 /* harmony default export */ var card_EnyoChartCardvue_type_script_lang_js_ = (EnyoChartCardvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/card/EnyoChartCard.vue





/* normalize component */

var EnyoChartCard_component = normalizeComponent(
  card_EnyoChartCardvue_type_script_lang_js_,
  EnyoChartCardvue_type_template_id_2f4e20ac_render,
  EnyoChartCardvue_type_template_id_2f4e20ac_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EnyoChartCard = (EnyoChartCard_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/card/TableAndChartsCard.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var TableAndChartsCardvue_type_script_lang_js_ = ({
  name: 'TableAndChartsCard',
  introduction: 'A component that display graphs to go along an ajaxTable list',
  token: "\n  <table-and-charts-card\n  :title=\"'Visites par ' + $t('common.labels.' + activeTab)\"\n  :table-columns=\"[{field: activeTab, type:'date'}, {field:'value', label:'#'}]\"\n  :data-source=\"performanceStats.user_visit[activeTab].list\"\n  :needs-refresh.sync=\"tableNeedsRefresh\"\n  :table-options=\"{headerStyle: 'primary', actions:{noActions: true, filter: false, refresh: false} }\"\n  :chart-options=\"{headerStyle: 'primary' }\"\n  :chart-col-key=\"activeTab\"\n\n  ></table-and-charts-card>",
  description: '',
  components: {
    EnyoChartCard: EnyoChartCard,
    AwesomeTable: AwesomeTable
  },
  props: {
    tableColumns: {
      type: Array,
      required: true
    },
    title: String,
    initialState: {
      type: String,
      default: 'table'
    },
    chartOptions: {
      type: Object,
      default: function _default() {
        return {
          headerStyle: 'primary'
        };
      }
    },
    tableOptions: {
      type: Object,
      default: function _default() {
        return {
          headerStyle: 'primary',
          actions: {
            noActions: true,
            filter: false
          }
        };
      }
    },
    chartRowKey: {
      type: String,
      default: function _default() {
        return 'value';
      }
    },
    chartColKey: {
      type: String,
      default: function _default() {
        return 'date';
      }
    },
    dataSource: {
      type: Array,
      required: true
    },
    className: String,
    needsRefresh: Boolean
  },
  data: function data() {
    return {
      currentState: this.initialState,
      // table | bar | line | pie
      internalRefreshRequested: false,
      fullscreen: false,
      pieResponsiveOptions: [['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode'
      }], ['screen and (min-width: 1024px)', {
        labelOffset: 80,
        chartPadding: 20
      }]]
    };
  },
  methods: {
    selectProp: function selectProp(objArray, prop) {
      return objArray.map(function (o) {
        return external_lodash_default.a.get(o, prop);
      });
    },
    setTab: function setTab(tab) {
      this.currentState = tab;
    },
    toggleFullscreen: function toggleFullscreen() {
      var _this = this;

      this.fullscreen = !this.fullscreen;
      this.internalRefreshRequested = true;
      setTimeout(function () {
        _this.internalRefreshRequested = false;
      }, 200);
    }
  }
});
// CONCATENATED MODULE: ./src/components/card/TableAndChartsCard.vue?vue&type=script&lang=js&
 /* harmony default export */ var card_TableAndChartsCardvue_type_script_lang_js_ = (TableAndChartsCardvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/card/TableAndChartsCard.vue?vue&type=style&index=0&lang=scss&
var TableAndChartsCardvue_type_style_index_0_lang_scss_ = __webpack_require__("e42f");

// CONCATENATED MODULE: ./src/components/card/TableAndChartsCard.vue






/* normalize component */

var TableAndChartsCard_component = normalizeComponent(
  card_TableAndChartsCardvue_type_script_lang_js_,
  TableAndChartsCardvue_type_template_id_35a7ae80_render,
  TableAndChartsCardvue_type_template_id_35a7ae80_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TableAndChartsCard = (TableAndChartsCard_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form/EnyoSelect.vue?vue&type=template&id=746f005a&
var EnyoSelectvue_type_template_id_746f005a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('multiselect',_vm._b({attrs:{"value":_vm.internalValue || _vm.value,"searchable":_vm.searchable,"internal-search":_vm.internalSearch,"loading":_vm.isLoading,"options":_vm.internalOptions,"label":_vm.label},on:{"input":_vm.updateSelected,"search-change":_vm.loadRemoteEntities}},'multiselect',_vm.filteredProps,false),[_c('span',{attrs:{"slot":"noResult"},slot:"noResult"},[_vm._v("\n      "+_vm._s(_vm.noResult)+"\n    ")])])],1)}
var EnyoSelectvue_type_template_id_746f005a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/form/EnyoSelect.vue?vue&type=template&id=746f005a&

// EXTERNAL MODULE: external "vue-multiselect"
var external_vue_multiselect_ = __webpack_require__("6c45");
var external_vue_multiselect_default = /*#__PURE__*/__webpack_require__.n(external_vue_multiselect_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form/EnyoSelect.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var EnyoSelectvue_type_script_lang_js_ = ({
  name: 'enyo-select',
  props: {
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    label: String,
    trackBy: [String, Number],
    vModelValue: [String, Number, Array, Object],
    noResult: String,
    url: String,
    multiple: [String, Boolean],
    internalSearch: [Boolean],
    searchable: {
      type: [String, Boolean, Number],
      default: false
    }
  },
  model: {
    prop: 'vModelValue',
    event: 'input'
  },
  mixins: [external_vue_multiselect_default.a, selectMixin],
  data: function data() {
    return {
      isLoading: false,
      apiOptions: false
    };
  },
  watch: {},
  computed: {
    filteredProps: function filteredProps() {
      var props = Object.assign({}, this.$props);
      delete props.vModelValue;
      delete props.input;
      delete props.value;
      return props;
    }
  },
  methods: {},
  created: function created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components.multiselect) {
      /* eslint-disable-next-line */
      console.error("'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!");
    }
  }
});
// CONCATENATED MODULE: ./src/components/form/EnyoSelect.vue?vue&type=script&lang=js&
 /* harmony default export */ var form_EnyoSelectvue_type_script_lang_js_ = (EnyoSelectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/form/EnyoSelect.vue?vue&type=style&index=0&lang=scss&
var EnyoSelectvue_type_style_index_0_lang_scss_ = __webpack_require__("577a");

// CONCATENATED MODULE: ./src/components/form/EnyoSelect.vue






/* normalize component */

var EnyoSelect_component = normalizeComponent(
  form_EnyoSelectvue_type_script_lang_js_,
  EnyoSelectvue_type_template_id_746f005a_render,
  EnyoSelectvue_type_template_id_746f005a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EnyoSelect = (EnyoSelect_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form/UploadButton.vue?vue&type=template&id=4cd791ee&
var UploadButtonvue_type_template_id_4cd791ee_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"clearfix"},[_c('button',{class:_vm.options.class || 'btn btn-info',attrs:{"type":"button"},on:{"click":_vm.buttonClick}},[_c('i',{staticClass:"fa fa-file-excel"}),_vm._v(" "+_vm._s(_vm.options.label || 'Upload')+"\n  ")]),_c('input',{ref:"inputButton",staticStyle:{"display":"none"},attrs:{"type":"file","name":"file","visbility":"hidden"},on:{"change":_vm.filesChange}})])}
var UploadButtonvue_type_template_id_4cd791ee_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/form/UploadButton.vue?vue&type=template&id=4cd791ee&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.iterator.js
var es6_string_iterator = __webpack_require__("5df3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.from.js
var es6_array_from = __webpack_require__("1c4c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form/UploadButton.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import apiErrors from '@/mixins/api-errors';
/* harmony default export */ var UploadButtonvue_type_script_lang_js_ = ({
  name: "UploadButton",
  inheritAttrs: false,
  props: {
    name: String,
    options: Object
  },
  computed: {},
  mounted: function mounted() {
    this.reset();
  },
  methods: {
    reset: function reset() {
      var elem = this.$refs.inputButton;

      if (elem) {
        elem.value = "";
      }
    },
    // eslint-disable-next-line
    buttonClick: function buttonClick($event) {
      var elem = this.$refs.inputButton;

      if (elem) {
        elem.click();
      }
    },
    filesChange: function filesChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        return;
      }

      var file = files[0];

      if (this.options.maxSize) {
        var size = file.size && file.size / Math.pow(1000, 2);

        if (size > this.options.maxSize) {
          this.$notify({
            message: "Upload ".concat(size, " size exceeding"),
            type: "warning"
          });
          return;
        }
      }

      if (this.options.upload) {
        this.uploadFiles(e);
      }

      if (this.options.base64) {
        this.base64(e, file);
      }
    },
    uploadFiles: function uploadFiles(e) {
      var _this = this;

      var formData = new FormData();
      var fieldName = e.target.name;
      var fileList = e.target.files;
      Array.from(Array(fileList.length).keys()).map(function (x) {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

      if (!this.options.targetUrl) {
        this.$notify({
          message: "Upload Url is Required",
          type: "warning"
        });
        return;
      }

      if (!this.options.method) {
        this.$notify({
          message: "Upload Method is Required",
          type: "warning"
        });
        return;
      }

      this.$http[this.options.method.toLowerCase()](this.options.targetUrl, formData).then(function (res) {
        _this.$emit("uploaded", res.data);

        setTimeout(function () {
          _this.reset();
        }, 300);
      }).catch(this.apiErrorCallback);
    },
    base64: function base64(e, file) {
      var _this2 = this;

      var reader = new FileReader();

      reader.onload = function (e) {
        var dataURI = e.target.result;

        if (dataURI) {
          _this2.$emit("base64", dataURI);
        }
      };

      reader.readAsDataURL(file);
    }
  }
});
// CONCATENATED MODULE: ./src/components/form/UploadButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var form_UploadButtonvue_type_script_lang_js_ = (UploadButtonvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/form/UploadButton.vue





/* normalize component */

var UploadButton_component = normalizeComponent(
  form_UploadButtonvue_type_script_lang_js_,
  UploadButtonvue_type_template_id_4cd791ee_render,
  UploadButtonvue_type_template_id_4cd791ee_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var UploadButton = (UploadButton_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form/LiveEdit.vue?vue&type=template&id=08e19925&scoped=true&
var LiveEditvue_type_template_id_08e19925_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.isEditable)?[(_vm.type === 'text' )?[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.modelvalue),expression:"modelvalue"}],class:'live-edit ' + _vm.editClass,attrs:{"type":"text","placeholder":_vm.placeholder},domProps:{"value":(_vm.modelvalue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.modelvalue=$event.target.value}}})]:_vm._e(),(_vm.type === 'number' )?[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.modelvalue),expression:"modelvalue"}],class:'live-edit ' + _vm.editClass,attrs:{"type":"number","placeholder":_vm.placeholder},domProps:{"value":(_vm.modelvalue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.modelvalue=$event.target.value}}})]:_vm._e(),(_vm.type === 'checkbox' )?[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.modelvalue),expression:"modelvalue"}],class:'live-edit ' + _vm.editClass,attrs:{"type":"checkbox","placeholder":_vm.placeholder},domProps:{"value":true,"checked":Array.isArray(_vm.modelvalue)?_vm._i(_vm.modelvalue,true)>-1:(_vm.modelvalue)},on:{"change":function($event){var $$a=_vm.modelvalue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=true,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.modelvalue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.modelvalue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.modelvalue=$$c}}}})]:_vm._e(),(_vm.type === 'date' )?[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.modelvalue),expression:"modelvalue"}],class:'live-edit ' + _vm.editClass,attrs:{"type":"date","placeholder":_vm.placeholder},domProps:{"value":(_vm.modelvalue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.modelvalue=$event.target.value}}})]:_vm._e(),(_vm.type === 'select' )?[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.modelvalue),expression:"modelvalue"}],class:'live-edit ' + _vm.editClass,attrs:{"placeholder":_vm.placeholder,"multiple":_vm.selectOptions.multiple},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.modelvalue=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((_vm._selectValues),function(option,index){return _c('option',{key:index,domProps:{"value":option.value}},[_vm._v("\n          "+_vm._s(option.label)+"\n        ")])}),0)]:_vm._e(),(_vm.type === 'textarea' )?[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.modelvalue),expression:"modelvalue"}],class:'live-edit ' + _vm.editClass,attrs:{"type":"text","placeholder":_vm.placeholder},domProps:{"value":(_vm.modelvalue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.modelvalue=$event.target.value}}})]:_vm._e(),_c('button',{staticClass:"btn-edit",attrs:{"title":"Save"},on:{"click":function($event){return _vm.saveEdit()}}},[_c('img',{attrs:{"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAA2ElEQVQokX3RMUpEQRAE0DcfkUWWRQzFQA/hBgZewUA8iRgabmSgVzARTDXZVIy8gJEYiYGRGGywfH4bbCvjX7VgmKanq7qoKSEUpcEaGj/RhpjVjZW893GMITrM8m1elEvchGhrwjbucIYnHGCMUdbDolyFaPsWuhTZxAZecYJd7Ol5/sAFpjjEDh5DvOE+XXxbgnec9kTaDKT76teEdUwyrRq3tUhNGOWZoM3eFo7w8BuhsYjzpSI0ObO04dkivgGueyKruekcSvXTA3+jwzxEV0L8M7eMTwFuNUa403LOAAAAAElFTkSuQmCC"}})]),_c('button',{staticClass:"btn-edit",attrs:{"title":"Clear / reset"},on:{"click":function($event){return _vm.clearEdit()}}},[_c('img',{attrs:{"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAA60lEQVQokY3RPUpDQRQF4O89HhaP+CoJIYWluIBgYSFWggg2WroCNyFWQayyBAtXIGgpYp1S0rqFGLVRMzZ3zJTOFAP3nsP5GUmCBh3WktVFix7qPKsCvIsTPOM+SZ+VaoAzrOMGr0lawhCPSJgFqI9rzPGBS/SSpME33rHENi5wiOOw84ZF7GX/IzzgJ5S+4l2E0uAvV4SrsYdpADPpFv2yiDpUNnCELavTYAcHlaot5jqMI2C2MS3szXCaK4dNvMRyjquwV2aaoMuEFudBGkeldRRxhyfsoylDt6HUFb/cBHmYwUlSZZn/nl8EkGJCLlPUYQAAAABJRU5ErkJggg=="}})])]:[_c('span',{domProps:{"innerHTML":_vm._s(_vm.modelvalue || _vm.placeholder)}}),_c('button',{staticClass:"btn-edit",attrs:{"title":"Edit"},on:{"click":function($event){_vm.isEditable = true}}},[_c('img',{attrs:{"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAA0ElEQVQokX3SoU4DURCF4e82G0I2TdMgKgh9A0QVD1BBeIkaLLpVGCSSJ0BUIUlwhARVh0KAQZAUDIZUIJmaS1N2u51xkzPn/jNzUwhNkaQSRYjFqhgNiQ6uMEVvVW8Qt3GKZwRu0A2h2ICxhzGOcJdf2keJ76pziUs84AvvmOCwhpSdLrL4I6O8YPDPNIt3cY6nNfEbhtX5Whn9BH3M0cMnRniszvjX0MUBrvGKsxCzEL+142SkY9zjFkO0mu6TQkhSgZ1s8FNzXV/7tq+xKZYdlHQTgFOznwAAAABJRU5ErkJggg=="}})])]],2)}
var LiveEditvue_type_template_id_08e19925_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/form/LiveEdit.vue?vue&type=template&id=08e19925&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js
var iterator = __webpack_require__("5d58");
var iterator_default = /*#__PURE__*/__webpack_require__.n(iterator);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js


function typeof_typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof symbol_default.a === "function" && typeof iterator_default.a === "symbol") {
    typeof_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    typeof_typeof = function _typeof(obj) {
      return obj && typeof symbol_default.a === "function" && obj.constructor === symbol_default.a && obj !== symbol_default.a.prototype ? "symbol" : typeof obj;
    };
  }

  return typeof_typeof(obj);
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form/LiveEdit.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var LiveEditvue_type_script_lang_js_ = ({
  name: 'LiveEdit',
  props: {
    value: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    editClass: {
      type: String,
      default: ''
    },
    selectValues: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    selectOptions: {
      type: Object,
      default: function _default() {
        return {
          value: 'value',
          label: 'label',
          multiple: false
        };
      }
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: function data() {
    return {
      isEditable: false,
      originalValue: this.value,
      modelvalue: this.value
    };
  },
  computed: {
    _selectValues: function _selectValues() {
      var _this = this;

      if (this.selectValues) {
        return this.selectValues.map(function (val) {
          if (typeof_typeof(val) === 'object') {
            return {
              value: val[_this.selectOptions.value],
              label: val[_this.selectOptions.label]
            };
          } else {
            return {
              value: val,
              label: val
            };
          }
        });
      }

      return [];
    }
  },
  watch: {
    modelvalue: function modelvalue(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    saveEdit: function saveEdit() {
      this.isEditable = false;
      this.$emit('input', this.modelvalue);
      this.$emit('change', this.modelvalue);
    },
    clearEdit: function clearEdit() {
      this.isEditable = false;
      this.modelvalue = this.originalValue;
      this.$emit('change', this.modelvalue);
    }
  }
});
// CONCATENATED MODULE: ./src/components/form/LiveEdit.vue?vue&type=script&lang=js&
 /* harmony default export */ var form_LiveEditvue_type_script_lang_js_ = (LiveEditvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/form/LiveEdit.vue?vue&type=style&index=0&id=08e19925&scoped=true&lang=css&
var LiveEditvue_type_style_index_0_id_08e19925_scoped_true_lang_css_ = __webpack_require__("241a");

// CONCATENATED MODULE: ./src/components/form/LiveEdit.vue






/* normalize component */

var LiveEdit_component = normalizeComponent(
  form_LiveEditvue_type_script_lang_js_,
  LiveEditvue_type_template_id_08e19925_scoped_true_render,
  LiveEditvue_type_template_id_08e19925_scoped_true_staticRenderFns,
  false,
  null,
  "08e19925",
  null
  
)

/* harmony default export */ var LiveEdit = (LiveEdit_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a18e140-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/card/EnyoCard.vue?vue&type=template&id=c6e8c778&
var EnyoCardvue_type_template_id_c6e8c778_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:'card ' + _vm.className},[(_vm.$slots.image)?_c('div',{staticClass:"card-image"},[_vm._t("image")],2):_vm._e(),(_vm.$slots.header)?_c('div',{staticClass:"card-header",class:_vm.headerClass},[_vm._t("header")],2):_vm._e(),_c('div',{staticClass:"card-body",class:_vm.bodyClass},[_vm._t("default")],2),(_vm.$slots.footer)?_c('div',{staticClass:"card-footer",class:_vm.footerClass},[_c('hr'),_vm._t("footer")],2):_vm._e()])}
var EnyoCardvue_type_template_id_c6e8c778_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/card/EnyoCard.vue?vue&type=template&id=c6e8c778&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/card/EnyoCard.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var EnyoCardvue_type_script_lang_js_ = ({
  name: "EnyoCard",
  props: {
    className: String,
    headerClass: String,
    bodyClass: String,
    footerClass: String
  }
});
// CONCATENATED MODULE: ./src/components/card/EnyoCard.vue?vue&type=script&lang=js&
 /* harmony default export */ var card_EnyoCardvue_type_script_lang_js_ = (EnyoCardvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/card/EnyoCard.vue





/* normalize component */

var EnyoCard_component = normalizeComponent(
  card_EnyoCardvue_type_script_lang_js_,
  EnyoCardvue_type_template_id_c6e8c778_render,
  EnyoCardvue_type_template_id_c6e8c778_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EnyoCard = (EnyoCard_component.exports);
// CONCATENATED MODULE: ./src/mixins/rolesMixin.js
/* harmony default export */ var rolesMixin = ({
  methods: {
    userIs: function userIs(role) {
      var $store = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      $store = this.$store || $store;
      return $store && $store.state && $store.state.user && $store.state.user.roles && $store.state.user.roles.indexOf(role) > -1;
    },
    userHasRole: function userHasRole(role) {
      var $store = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      $store = this.$store || $store;
      return $store && $store.state && $store.state.userExtendedRoles && $store.state.userExtendedRoles.indexOf(role) > -1;
    }
  }
});
// CONCATENATED MODULE: ./src/index.js














var VueEnyoComponents = {
  FieldEnyoSelect: FieldEnyoSelect,
  FieldFileInput: FieldFileInput,
  FieldJsonTextarea: FieldJsonTextarea,
  CrudComponent: CrudComponent,
  EnyoCrudComponent: CrudComponent,
  TableAndChartsCard: TableAndChartsCard,
  EnyoSelect: EnyoSelect,
  UploadButton: UploadButton,
  EnyoCard: EnyoCard,
  EnyoCrudStatsSection: EnyoCrudStatsSection,
  AwesomeTable: AwesomeTable,
  AwesomeForm: AwesomeForm,
  AjaxTable: AwesomeTable,
  LiveEdit: LiveEdit,
  apiErrorsMixin: apiErrorsMixin,
  rolesMixin: rolesMixin
};

/* harmony default export */ var src = (VueEnyoComponents);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ });
});