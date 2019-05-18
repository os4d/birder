/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 134);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var require;//! moment.js
;

(function (global, factory) {
   true ? module.exports = factory() : undefined;
})(this, function () {
  'use strict';

  var hookCallback;

  function hooks() {
    return hookCallback.apply(null, arguments);
  } // This is done to register the method called with moment()
  // without creating circular dependencies.


  function setHookCallback(callback) {
    hookCallback = callback;
  }

  function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
  }

  function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
  }

  function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
      return Object.getOwnPropertyNames(obj).length === 0;
    } else {
      var k;

      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          return false;
        }
      }

      return true;
    }
  }

  function isUndefined(input) {
    return input === void 0;
  }

  function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
  }

  function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
  }

  function map(arr, fn) {
    var res = [],
        i;

    for (i = 0; i < arr.length; ++i) {
      res.push(fn(arr[i], i));
    }

    return res;
  }

  function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }

  function extend(a, b) {
    for (var i in b) {
      if (hasOwnProp(b, i)) {
        a[i] = b[i];
      }
    }

    if (hasOwnProp(b, 'toString')) {
      a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
      a.valueOf = b.valueOf;
    }

    return a;
  }

  function createUTC(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
  }

  function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
      empty: false,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: false,
      invalidMonth: null,
      invalidFormat: false,
      userInvalidated: false,
      iso: false,
      parsedDateParts: [],
      meridiem: null,
      rfc2822: false,
      weekdayMismatch: false
    };
  }

  function getParsingFlags(m) {
    if (m._pf == null) {
      m._pf = defaultParsingFlags();
    }

    return m._pf;
  }

  var some;

  if (Array.prototype.some) {
    some = Array.prototype.some;
  } else {
    some = function (fun) {
      var t = Object(this);
      var len = t.length >>> 0;

      for (var i = 0; i < len; i++) {
        if (i in t && fun.call(this, t[i], i, t)) {
          return true;
        }
      }

      return false;
    };
  }

  function isValid(m) {
    if (m._isValid == null) {
      var flags = getParsingFlags(m);
      var parsedParts = some.call(flags.parsedDateParts, function (i) {
        return i != null;
      });
      var isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);

      if (m._strict) {
        isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
      }

      if (Object.isFrozen == null || !Object.isFrozen(m)) {
        m._isValid = isNowValid;
      } else {
        return isNowValid;
      }
    }

    return m._isValid;
  }

  function createInvalid(flags) {
    var m = createUTC(NaN);

    if (flags != null) {
      extend(getParsingFlags(m), flags);
    } else {
      getParsingFlags(m).userInvalidated = true;
    }

    return m;
  } // Plugins that add properties should also add the key here (null value),
  // so we can properly clone ourselves.


  var momentProperties = hooks.momentProperties = [];

  function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
      to._isAMomentObject = from._isAMomentObject;
    }

    if (!isUndefined(from._i)) {
      to._i = from._i;
    }

    if (!isUndefined(from._f)) {
      to._f = from._f;
    }

    if (!isUndefined(from._l)) {
      to._l = from._l;
    }

    if (!isUndefined(from._strict)) {
      to._strict = from._strict;
    }

    if (!isUndefined(from._tzm)) {
      to._tzm = from._tzm;
    }

    if (!isUndefined(from._isUTC)) {
      to._isUTC = from._isUTC;
    }

    if (!isUndefined(from._offset)) {
      to._offset = from._offset;
    }

    if (!isUndefined(from._pf)) {
      to._pf = getParsingFlags(from);
    }

    if (!isUndefined(from._locale)) {
      to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
      for (i = 0; i < momentProperties.length; i++) {
        prop = momentProperties[i];
        val = from[prop];

        if (!isUndefined(val)) {
          to[prop] = val;
        }
      }
    }

    return to;
  }

  var updateInProgress = false; // Moment prototype object

  function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);

    if (!this.isValid()) {
      this._d = new Date(NaN);
    } // Prevent infinite loop in case updateOffset creates new moment
    // objects.


    if (updateInProgress === false) {
      updateInProgress = true;
      hooks.updateOffset(this);
      updateInProgress = false;
    }
  }

  function isMoment(obj) {
    return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
  }

  function absFloor(number) {
    if (number < 0) {
      // -0 -> 0
      return Math.ceil(number) || 0;
    } else {
      return Math.floor(number);
    }
  }

  function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      value = absFloor(coercedNumber);
    }

    return value;
  } // compare two arrays, return the number of differences


  function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;

    for (i = 0; i < len; i++) {
      if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
        diffs++;
      }
    }

    return diffs + lengthDiff;
  }

  function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
      console.warn('Deprecation warning: ' + msg);
    }
  }

  function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function () {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(null, msg);
      }

      if (firstTime) {
        var args = [];
        var arg;

        for (var i = 0; i < arguments.length; i++) {
          arg = '';

          if (typeof arguments[i] === 'object') {
            arg += '\n[' + i + '] ';

            for (var key in arguments[0]) {
              arg += key + ': ' + arguments[0][key] + ', ';
            }

            arg = arg.slice(0, -2); // Remove trailing comma and space
          } else {
            arg = arguments[i];
          }

          args.push(arg);
        }

        warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
        firstTime = false;
      }

      return fn.apply(this, arguments);
    }, fn);
  }

  var deprecations = {};

  function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(name, msg);
    }

    if (!deprecations[name]) {
      warn(msg);
      deprecations[name] = true;
    }
  }

  hooks.suppressDeprecationWarnings = false;
  hooks.deprecationHandler = null;

  function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
  }

  function set(config) {
    var prop, i;

    for (i in config) {
      prop = config[i];

      if (isFunction(prop)) {
        this[i] = prop;
      } else {
        this['_' + i] = prop;
      }
    }

    this._config = config; // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.

    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
  }

  function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig),
        prop;

    for (prop in childConfig) {
      if (hasOwnProp(childConfig, prop)) {
        if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
          res[prop] = {};
          extend(res[prop], parentConfig[prop]);
          extend(res[prop], childConfig[prop]);
        } else if (childConfig[prop] != null) {
          res[prop] = childConfig[prop];
        } else {
          delete res[prop];
        }
      }
    }

    for (prop in parentConfig) {
      if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
        // make sure changes to properties don't modify parent config
        res[prop] = extend({}, res[prop]);
      }
    }

    return res;
  }

  function Locale(config) {
    if (config != null) {
      this.set(config);
    }
  }

  var keys;

  if (Object.keys) {
    keys = Object.keys;
  } else {
    keys = function (obj) {
      var i,
          res = [];

      for (i in obj) {
        if (hasOwnProp(obj, i)) {
          res.push(i);
        }
      }

      return res;
    };
  }

  var defaultCalendar = {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L'
  };

  function calendar(key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
  }

  var defaultLongDateFormat = {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A'
  };

  function longDateFormat(key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
      return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
      return val.slice(1);
    });
    return this._longDateFormat[key];
  }

  var defaultInvalidDate = 'Invalid date';

  function invalidDate() {
    return this._invalidDate;
  }

  var defaultOrdinal = '%d';
  var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

  function ordinal(number) {
    return this._ordinal.replace('%d', number);
  }

  var defaultRelativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  };

  function relativeTime(number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
  }

  function pastFuture(diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  }

  var aliases = {};

  function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
  }

  function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
  }

  function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
      if (hasOwnProp(inputObject, prop)) {
        normalizedProp = normalizeUnits(prop);

        if (normalizedProp) {
          normalizedInput[normalizedProp] = inputObject[prop];
        }
      }
    }

    return normalizedInput;
  }

  var priorities = {};

  function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
  }

  function getPrioritizedUnits(unitsObj) {
    var units = [];

    for (var u in unitsObj) {
      units.push({
        unit: u,
        priority: priorities[u]
      });
    }

    units.sort(function (a, b) {
      return a.priority - b.priority;
    });
    return units;
  }

  function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
  }

  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
  var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
  var formatFunctions = {};
  var formatTokenFunctions = {}; // token:    'M'
  // padded:   ['MM', 2]
  // ordinal:  'Mo'
  // callback: function () { this.month() + 1 }

  function addFormatToken(token, padded, ordinal, callback) {
    var func = callback;

    if (typeof callback === 'string') {
      func = function () {
        return this[callback]();
      };
    }

    if (token) {
      formatTokenFunctions[token] = func;
    }

    if (padded) {
      formatTokenFunctions[padded[0]] = function () {
        return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
      };
    }

    if (ordinal) {
      formatTokenFunctions[ordinal] = function () {
        return this.localeData().ordinal(func.apply(this, arguments), token);
      };
    }
  }

  function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|\]$/g, '');
    }

    return input.replace(/\\/g, '');
  }

  function makeFormatFunction(format) {
    var array = format.match(formattingTokens),
        i,
        length;

    for (i = 0, length = array.length; i < length; i++) {
      if (formatTokenFunctions[array[i]]) {
        array[i] = formatTokenFunctions[array[i]];
      } else {
        array[i] = removeFormattingTokens(array[i]);
      }
    }

    return function (mom) {
      var output = '',
          i;

      for (i = 0; i < length; i++) {
        output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
      }

      return output;
    };
  } // format date using native date object


  function formatMoment(m, format) {
    if (!m.isValid()) {
      return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
    return formatFunctions[format](m);
  }

  function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
      return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;

    while (i >= 0 && localFormattingTokens.test(format)) {
      format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
      localFormattingTokens.lastIndex = 0;
      i -= 1;
    }

    return format;
  }

  var match1 = /\d/; //       0 - 9

  var match2 = /\d\d/; //      00 - 99

  var match3 = /\d{3}/; //     000 - 999

  var match4 = /\d{4}/; //    0000 - 9999

  var match6 = /[+-]?\d{6}/; // -999999 - 999999

  var match1to2 = /\d\d?/; //       0 - 99

  var match3to4 = /\d\d\d\d?/; //     999 - 9999

  var match5to6 = /\d\d\d\d\d\d?/; //   99999 - 999999

  var match1to3 = /\d{1,3}/; //       0 - 999

  var match1to4 = /\d{1,4}/; //       0 - 9999

  var match1to6 = /[+-]?\d{1,6}/; // -999999 - 999999

  var matchUnsigned = /\d+/; //       0 - inf

  var matchSigned = /[+-]?\d+/; //    -inf - inf

  var matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z

  var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

  var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
  // any word (or two) characters or numbers including two/three word month in arabic.
  // includes scottish gaelic two word and hyphenated months

  var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
  var regexes = {};

  function addRegexToken(token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
      return isStrict && strictRegex ? strictRegex : regex;
    };
  }

  function getParseRegexForToken(token, config) {
    if (!hasOwnProp(regexes, token)) {
      return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
  } // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript


  function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
      return p1 || p2 || p3 || p4;
    }));
  }

  function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  var tokens = {};

  function addParseToken(token, callback) {
    var i,
        func = callback;

    if (typeof token === 'string') {
      token = [token];
    }

    if (isNumber(callback)) {
      func = function (input, array) {
        array[callback] = toInt(input);
      };
    }

    for (i = 0; i < token.length; i++) {
      tokens[token[i]] = func;
    }
  }

  function addWeekParseToken(token, callback) {
    addParseToken(token, function (input, array, config, token) {
      config._w = config._w || {};
      callback(input, config._w, config, token);
    });
  }

  function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
      tokens[token](input, config._a, config, token);
    }
  }

  var YEAR = 0;
  var MONTH = 1;
  var DATE = 2;
  var HOUR = 3;
  var MINUTE = 4;
  var SECOND = 5;
  var MILLISECOND = 6;
  var WEEK = 7;
  var WEEKDAY = 8; // FORMATTING

  addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
  });
  addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
  });
  addFormatToken(0, ['YYYY', 4], 0, 'year');
  addFormatToken(0, ['YYYYY', 5], 0, 'year');
  addFormatToken(0, ['YYYYYY', 6, true], 0, 'year'); // ALIASES

  addUnitAlias('year', 'y'); // PRIORITIES

  addUnitPriority('year', 1); // PARSING

  addRegexToken('Y', matchSigned);
  addRegexToken('YY', match1to2, match2);
  addRegexToken('YYYY', match1to4, match4);
  addRegexToken('YYYYY', match1to6, match6);
  addRegexToken('YYYYYY', match1to6, match6);
  addParseToken(['YYYYY', 'YYYYYY'], YEAR);
  addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
  });
  addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
  });
  addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
  }); // HELPERS

  function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
  }

  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  } // HOOKS


  hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
  }; // MOMENTS


  var getSetYear = makeGetSet('FullYear', true);

  function getIsLeapYear() {
    return isLeapYear(this.year());
  }

  function makeGetSet(unit, keepTime) {
    return function (value) {
      if (value != null) {
        set$1(this, unit, value);
        hooks.updateOffset(this, keepTime);
        return this;
      } else {
        return get(this, unit);
      }
    };
  }

  function get(mom, unit) {
    return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
  }

  function set$1(mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
      if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
      } else {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
      }
    }
  } // MOMENTS


  function stringGet(units) {
    units = normalizeUnits(units);

    if (isFunction(this[units])) {
      return this[units]();
    }

    return this;
  }

  function stringSet(units, value) {
    if (typeof units === 'object') {
      units = normalizeObjectUnits(units);
      var prioritized = getPrioritizedUnits(units);

      for (var i = 0; i < prioritized.length; i++) {
        this[prioritized[i].unit](units[prioritized[i].unit]);
      }
    } else {
      units = normalizeUnits(units);

      if (isFunction(this[units])) {
        return this[units](value);
      }
    }

    return this;
  }

  function mod(n, x) {
    return (n % x + x) % x;
  }

  var indexOf;

  if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function (o) {
      // I know
      var i;

      for (i = 0; i < this.length; ++i) {
        if (this[i] === o) {
          return i;
        }
      }

      return -1;
    };
  }

  function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
      return NaN;
    }

    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
  } // FORMATTING


  addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
  });
  addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
  });
  addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
  }); // ALIASES

  addUnitAlias('month', 'M'); // PRIORITY

  addUnitPriority('month', 8); // PARSING

  addRegexToken('M', match1to2);
  addRegexToken('MM', match1to2, match2);
  addRegexToken('MMM', function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
  });
  addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
  });
  addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
  });
  addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict); // if we didn't find a month name, mark the date as invalid.


    if (month != null) {
      array[MONTH] = month;
    } else {
      getParsingFlags(config).invalidMonth = input;
    }
  }); // LOCALES

  var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
  var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');

  function localeMonths(m, format) {
    if (!m) {
      return isArray(this._months) ? this._months : this._months['standalone'];
    }

    return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
  }

  var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');

  function localeMonthsShort(m, format) {
    if (!m) {
      return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
    }

    return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
  }

  function handleStrictParse(monthName, format, strict) {
    var i,
        ii,
        mom,
        llc = monthName.toLocaleLowerCase();

    if (!this._monthsParse) {
      // this is not used
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];

      for (i = 0; i < 12; ++i) {
        mom = createUTC([2000, i]);
        this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
        this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
      }
    }

    if (strict) {
      if (format === 'MMM') {
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'MMM') {
        ii = indexOf.call(this._shortMonthsParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }

  function localeMonthsParse(monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
      return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
    } // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse


    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, i]);

      if (strict && !this._longMonthsParse[i]) {
        this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
        this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
      }

      if (!strict && !this._monthsParse[i]) {
        regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
        this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
      } // test the regex


      if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
        return i;
      } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
        return i;
      } else if (!strict && this._monthsParse[i].test(monthName)) {
        return i;
      }
    }
  } // MOMENTS


  function setMonth(mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
      // No op
      return mom;
    }

    if (typeof value === 'string') {
      if (/^\d+$/.test(value)) {
        value = toInt(value);
      } else {
        value = mom.localeData().monthsParse(value); // TODO: Another silent failure?

        if (!isNumber(value)) {
          return mom;
        }
      }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));

    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);

    return mom;
  }

  function getSetMonth(value) {
    if (value != null) {
      setMonth(this, value);
      hooks.updateOffset(this, true);
      return this;
    } else {
      return get(this, 'Month');
    }
  }

  function getDaysInMonth() {
    return daysInMonth(this.year(), this.month());
  }

  var defaultMonthsShortRegex = matchWord;

  function monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        computeMonthsParse.call(this);
      }

      if (isStrict) {
        return this._monthsShortStrictRegex;
      } else {
        return this._monthsShortRegex;
      }
    } else {
      if (!hasOwnProp(this, '_monthsShortRegex')) {
        this._monthsShortRegex = defaultMonthsShortRegex;
      }

      return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
    }
  }

  var defaultMonthsRegex = matchWord;

  function monthsRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        computeMonthsParse.call(this);
      }

      if (isStrict) {
        return this._monthsStrictRegex;
      } else {
        return this._monthsRegex;
      }
    } else {
      if (!hasOwnProp(this, '_monthsRegex')) {
        this._monthsRegex = defaultMonthsRegex;
      }

      return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
    }
  }

  function computeMonthsParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }

    var shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom;

    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, i]);
      shortPieces.push(this.monthsShort(mom, ''));
      longPieces.push(this.months(mom, ''));
      mixedPieces.push(this.months(mom, ''));
      mixedPieces.push(this.monthsShort(mom, ''));
    } // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.


    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);

    for (i = 0; i < 12; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
    }

    for (i = 0; i < 24; i++) {
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
  }

  function createDate(y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date; // the date constructor remaps years 0-99 to 1900-1999

    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      date = new Date(y + 400, m, d, h, M, s, ms);

      if (isFinite(date.getFullYear())) {
        date.setFullYear(y);
      }
    } else {
      date = new Date(y, m, d, h, M, s, ms);
    }

    return date;
  }

  function createUTCDate(y) {
    var date; // the Date.UTC function remaps years 0-99 to 1900-1999

    if (y < 100 && y >= 0) {
      var args = Array.prototype.slice.call(arguments); // preserve leap years using a full 400 year cycle, then reset

      args[0] = y + 400;
      date = new Date(Date.UTC.apply(null, args));

      if (isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
      }
    } else {
      date = new Date(Date.UTC.apply(null, arguments));
    }

    return date;
  } // start-of-first-week - start-of-year


  function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
    fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
    return -fwdlw + fwd - 1;
  } // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday


  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear,
        resDayOfYear;

    if (dayOfYear <= 0) {
      resYear = year - 1;
      resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
      resYear = year + 1;
      resDayOfYear = dayOfYear - daysInYear(year);
    } else {
      resYear = year;
      resDayOfYear = dayOfYear;
    }

    return {
      year: resYear,
      dayOfYear: resDayOfYear
    };
  }

  function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek,
        resYear;

    if (week < 1) {
      resYear = mom.year() - 1;
      resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
      resWeek = week - weeksInYear(mom.year(), dow, doy);
      resYear = mom.year() + 1;
    } else {
      resYear = mom.year();
      resWeek = week;
    }

    return {
      week: resWeek,
      year: resYear
    };
  }

  function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
  } // FORMATTING


  addFormatToken('w', ['ww', 2], 'wo', 'week');
  addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek'); // ALIASES

  addUnitAlias('week', 'w');
  addUnitAlias('isoWeek', 'W'); // PRIORITIES

  addUnitPriority('week', 5);
  addUnitPriority('isoWeek', 5); // PARSING

  addRegexToken('w', match1to2);
  addRegexToken('ww', match1to2, match2);
  addRegexToken('W', match1to2);
  addRegexToken('WW', match1to2, match2);
  addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
  }); // HELPERS
  // LOCALES

  function localeWeek(mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
  }

  var defaultLocaleWeek = {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6 // The week that contains Jan 6th is the first week of the year.

  };

  function localeFirstDayOfWeek() {
    return this._week.dow;
  }

  function localeFirstDayOfYear() {
    return this._week.doy;
  } // MOMENTS


  function getSetWeek(input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
  }

  function getSetISOWeek(input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
  } // FORMATTING


  addFormatToken('d', 0, 'do', 'day');
  addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
  });
  addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
  });
  addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
  });
  addFormatToken('e', 0, 0, 'weekday');
  addFormatToken('E', 0, 0, 'isoWeekday'); // ALIASES

  addUnitAlias('day', 'd');
  addUnitAlias('weekday', 'e');
  addUnitAlias('isoWeekday', 'E'); // PRIORITY

  addUnitPriority('day', 11);
  addUnitPriority('weekday', 11);
  addUnitPriority('isoWeekday', 11); // PARSING

  addRegexToken('d', match1to2);
  addRegexToken('e', match1to2);
  addRegexToken('E', match1to2);
  addRegexToken('dd', function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
  });
  addRegexToken('ddd', function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
  });
  addRegexToken('dddd', function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
  });
  addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict); // if we didn't get a weekday name, mark the date as invalid


    if (weekday != null) {
      week.d = weekday;
    } else {
      getParsingFlags(config).invalidWeekday = input;
    }
  });
  addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
  }); // HELPERS

  function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
      return input;
    }

    if (!isNaN(input)) {
      return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);

    if (typeof input === 'number') {
      return input;
    }

    return null;
  }

  function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
      return locale.weekdaysParse(input) % 7 || 7;
    }

    return isNaN(input) ? null : input;
  } // LOCALES


  function shiftWeekdays(ws, n) {
    return ws.slice(n, 7).concat(ws.slice(0, n));
  }

  var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');

  function localeWeekdays(m, format) {
    var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format) ? 'format' : 'standalone'];
    return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
  }

  var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');

  function localeWeekdaysShort(m) {
    return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
  }

  var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');

  function localeWeekdaysMin(m) {
    return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
  }

  function handleStrictParse$1(weekdayName, format, strict) {
    var i,
        ii,
        mom,
        llc = weekdayName.toLocaleLowerCase();

    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._minWeekdaysParse = [];

      for (i = 0; i < 7; ++i) {
        mom = createUTC([2000, 1]).day(i);
        this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
        this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
        this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
      }
    }

    if (strict) {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }

  function localeWeekdaysParse(weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
      return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._minWeekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, 1]).day(i);

      if (strict && !this._fullWeekdaysParse[i]) {
        this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
        this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
        this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
      }

      if (!this._weekdaysParse[i]) {
        regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
        this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
      } // test the regex


      if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
        return i;
      }
    }
  } // MOMENTS


  function getSetDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();

    if (input != null) {
      input = parseWeekday(input, this.localeData());
      return this.add(input - day, 'd');
    } else {
      return day;
    }
  }

  function getSetLocaleDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
  }

  function getSetISODayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    } // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.


    if (input != null) {
      var weekday = parseIsoWeekday(input, this.localeData());
      return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
      return this.day() || 7;
    }
  }

  var defaultWeekdaysRegex = matchWord;

  function weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysStrictRegex;
      } else {
        return this._weekdaysRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        this._weekdaysRegex = defaultWeekdaysRegex;
      }

      return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
  }

  var defaultWeekdaysShortRegex = matchWord;

  function weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysShortStrictRegex;
      } else {
        return this._weekdaysShortRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysShortRegex')) {
        this._weekdaysShortRegex = defaultWeekdaysShortRegex;
      }

      return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
  }

  var defaultWeekdaysMinRegex = matchWord;

  function weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysMinStrictRegex;
      } else {
        return this._weekdaysMinRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysMinRegex')) {
        this._weekdaysMinRegex = defaultWeekdaysMinRegex;
      }

      return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
  }

  function computeWeekdaysParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }

    var minPieces = [],
        shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom,
        minp,
        shortp,
        longp;

    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, 1]).day(i);
      minp = this.weekdaysMin(mom, '');
      shortp = this.weekdaysShort(mom, '');
      longp = this.weekdays(mom, '');
      minPieces.push(minp);
      shortPieces.push(shortp);
      longPieces.push(longp);
      mixedPieces.push(minp);
      mixedPieces.push(shortp);
      mixedPieces.push(longp);
    } // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.


    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);

    for (i = 0; i < 7; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
  } // FORMATTING


  function hFormat() {
    return this.hours() % 12 || 12;
  }

  function kFormat() {
    return this.hours() || 24;
  }

  addFormatToken('H', ['HH', 2], 0, 'hour');
  addFormatToken('h', ['hh', 2], 0, hFormat);
  addFormatToken('k', ['kk', 2], 0, kFormat);
  addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
  });
  addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });
  addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
  });
  addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });

  function meridiem(token, lowercase) {
    addFormatToken(token, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
  }

  meridiem('a', true);
  meridiem('A', false); // ALIASES

  addUnitAlias('hour', 'h'); // PRIORITY

  addUnitPriority('hour', 13); // PARSING

  function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse;
  }

  addRegexToken('a', matchMeridiem);
  addRegexToken('A', matchMeridiem);
  addRegexToken('H', match1to2);
  addRegexToken('h', match1to2);
  addRegexToken('k', match1to2);
  addRegexToken('HH', match1to2, match2);
  addRegexToken('hh', match1to2, match2);
  addRegexToken('kk', match1to2, match2);
  addRegexToken('hmm', match3to4);
  addRegexToken('hmmss', match5to6);
  addRegexToken('Hmm', match3to4);
  addRegexToken('Hmmss', match5to6);
  addParseToken(['H', 'HH'], HOUR);
  addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
  });
  addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
  });
  addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
  });
  addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
  }); // LOCALES

  function localeIsPM(input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return (input + '').toLowerCase().charAt(0) === 'p';
  }

  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;

  function localeMeridiem(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? 'pm' : 'PM';
    } else {
      return isLower ? 'am' : 'AM';
    }
  } // MOMENTS
  // Setting the hour should keep the time, because the user explicitly
  // specified which hour they want. So trying to maintain the same hour (in
  // a new timezone) makes sense. Adding/subtracting hours does not follow
  // this rule.


  var getSetHour = makeGetSet('Hours', true);
  var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,
    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,
    week: defaultLocaleWeek,
    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,
    meridiemParse: defaultLocaleMeridiemParse
  }; // internal storage for locale config files

  var locales = {};
  var localeFamilies = {};
  var globalLocale;

  function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
  } // pick the locale from the array
  // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
  // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root


  function chooseLocale(names) {
    var i = 0,
        j,
        next,
        locale,
        split;

    while (i < names.length) {
      split = normalizeLocale(names[i]).split('-');
      j = split.length;
      next = normalizeLocale(names[i + 1]);
      next = next ? next.split('-') : null;

      while (j > 0) {
        locale = loadLocale(split.slice(0, j).join('-'));

        if (locale) {
          return locale;
        }

        if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
          //the next array item is better than a shallower substring of this one
          break;
        }

        j--;
      }

      i++;
    }

    return globalLocale;
  }

  function loadLocale(name) {
    var oldLocale = null; // TODO: Find a better way to register and load all the locales in Node

    if (!locales[name] && typeof module !== 'undefined' && module && module.exports) {
      try {
        oldLocale = globalLocale._abbr;
        var aliasedRequire = require;
        __webpack_require__(140)("./" + name);
        getSetGlobalLocale(oldLocale);
      } catch (e) {}
    }

    return locales[name];
  } // This function will load locale and then set the global locale.  If
  // no arguments are passed in, it will simply return the current global
  // locale key.


  function getSetGlobalLocale(key, values) {
    var data;

    if (key) {
      if (isUndefined(values)) {
        data = getLocale(key);
      } else {
        data = defineLocale(key, values);
      }

      if (data) {
        // moment.duration._locale = moment._locale = data;
        globalLocale = data;
      } else {
        if (typeof console !== 'undefined' && console.warn) {
          //warn user if arguments are passed but the locale could not be set
          console.warn('Locale ' + key + ' not found. Did you forget to load it?');
        }
      }
    }

    return globalLocale._abbr;
  }

  function defineLocale(name, config) {
    if (config !== null) {
      var locale,
          parentConfig = baseConfig;
      config.abbr = name;

      if (locales[name] != null) {
        deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
        parentConfig = locales[name]._config;
      } else if (config.parentLocale != null) {
        if (locales[config.parentLocale] != null) {
          parentConfig = locales[config.parentLocale]._config;
        } else {
          locale = loadLocale(config.parentLocale);

          if (locale != null) {
            parentConfig = locale._config;
          } else {
            if (!localeFamilies[config.parentLocale]) {
              localeFamilies[config.parentLocale] = [];
            }

            localeFamilies[config.parentLocale].push({
              name: name,
              config: config
            });
            return null;
          }
        }
      }

      locales[name] = new Locale(mergeConfigs(parentConfig, config));

      if (localeFamilies[name]) {
        localeFamilies[name].forEach(function (x) {
          defineLocale(x.name, x.config);
        });
      } // backwards compat for now: also set the locale
      // make sure we set the locale AFTER all child locales have been
      // created, so we won't end up with the child locale set.


      getSetGlobalLocale(name);
      return locales[name];
    } else {
      // useful for testing
      delete locales[name];
      return null;
    }
  }

  function updateLocale(name, config) {
    if (config != null) {
      var locale,
          tmpLocale,
          parentConfig = baseConfig; // MERGE

      tmpLocale = loadLocale(name);

      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }

      config = mergeConfigs(parentConfig, config);
      locale = new Locale(config);
      locale.parentLocale = locales[name];
      locales[name] = locale; // backwards compat for now: also set the locale

      getSetGlobalLocale(name);
    } else {
      // pass null for config to unupdate, useful for tests
      if (locales[name] != null) {
        if (locales[name].parentLocale != null) {
          locales[name] = locales[name].parentLocale;
        } else if (locales[name] != null) {
          delete locales[name];
        }
      }
    }

    return locales[name];
  } // returns locale data


  function getLocale(key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
      key = key._locale._abbr;
    }

    if (!key) {
      return globalLocale;
    }

    if (!isArray(key)) {
      //short-circuit everything else
      locale = loadLocale(key);

      if (locale) {
        return locale;
      }

      key = [key];
    }

    return chooseLocale(key);
  }

  function listLocales() {
    return keys(locales);
  }

  function checkOverflow(m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
      overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;

      if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
        overflow = DATE;
      }

      if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
        overflow = WEEK;
      }

      if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
        overflow = WEEKDAY;
      }

      getParsingFlags(m).overflow = overflow;
    }

    return m;
  } // Pick the first defined of two or three arguments.


  function defaults(a, b, c) {
    if (a != null) {
      return a;
    }

    if (b != null) {
      return b;
    }

    return c;
  }

  function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());

    if (config._useUTC) {
      return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }

    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
  } // convert an array to a date.
  // the array should mirror the parameters below
  // note: all values past the year are optional and will default to the lowest possible value.
  // [year, month, day , hour, minute, second, millisecond]


  function configFromArray(config) {
    var i,
        date,
        input = [],
        currentDate,
        expectedWeekday,
        yearToUse;

    if (config._d) {
      return;
    }

    currentDate = currentDateArray(config); //compute day of the year from weeks and weekdays

    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
      dayOfYearFromWeekInfo(config);
    } //if the day of the year is set, figure out what it is


    if (config._dayOfYear != null) {
      yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

      if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
        getParsingFlags(config)._overflowDayOfYear = true;
      }

      date = createUTCDate(yearToUse, 0, config._dayOfYear);
      config._a[MONTH] = date.getUTCMonth();
      config._a[DATE] = date.getUTCDate();
    } // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything


    for (i = 0; i < 3 && config._a[i] == null; ++i) {
      config._a[i] = input[i] = currentDate[i];
    } // Zero out whatever was not defaulted, including time


    for (; i < 7; i++) {
      config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
    } // Check for 24:00:00.000


    if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
      config._nextDay = true;
      config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay(); // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.

    if (config._tzm != null) {
      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
      config._a[HOUR] = 24;
    } // check for mismatching day of week


    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
      getParsingFlags(config).weekdayMismatch = true;
    }
  }

  function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
    w = config._w;

    if (w.GG != null || w.W != null || w.E != null) {
      dow = 1;
      doy = 4; // TODO: We need to take the current isoWeekYear, but that depends on
      // how we interpret now (local, utc, fixed offset). So create
      // a now version of current config (take local/utc/offset flags, and
      // create now).

      weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
      week = defaults(w.W, 1);
      weekday = defaults(w.E, 1);

      if (weekday < 1 || weekday > 7) {
        weekdayOverflow = true;
      }
    } else {
      dow = config._locale._week.dow;
      doy = config._locale._week.doy;
      var curWeek = weekOfYear(createLocal(), dow, doy);
      weekYear = defaults(w.gg, config._a[YEAR], curWeek.year); // Default to current week.

      week = defaults(w.w, curWeek.week);

      if (w.d != null) {
        // weekday -- low day numbers are considered next week
        weekday = w.d;

        if (weekday < 0 || weekday > 6) {
          weekdayOverflow = true;
        }
      } else if (w.e != null) {
        // local weekday -- counting starts from beginning of week
        weekday = w.e + dow;

        if (w.e < 0 || w.e > 6) {
          weekdayOverflow = true;
        }
      } else {
        // default to beginning of week
        weekday = dow;
      }
    }

    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
      getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
      getParsingFlags(config)._overflowWeekday = true;
    } else {
      temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
      config._a[YEAR] = temp.year;
      config._dayOfYear = temp.dayOfYear;
    }
  } // iso 8601 regex
  // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)


  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
  var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
  var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
  var isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/], // YYYYMM is NOT allowed by the standard
  ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/]]; // iso time formats and regexes

  var isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]];
  var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i; // date from iso format

  function configFromISO(config) {
    var i,
        l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime,
        dateFormat,
        timeFormat,
        tzFormat;

    if (match) {
      getParsingFlags(config).iso = true;

      for (i = 0, l = isoDates.length; i < l; i++) {
        if (isoDates[i][1].exec(match[1])) {
          dateFormat = isoDates[i][0];
          allowTime = isoDates[i][2] !== false;
          break;
        }
      }

      if (dateFormat == null) {
        config._isValid = false;
        return;
      }

      if (match[3]) {
        for (i = 0, l = isoTimes.length; i < l; i++) {
          if (isoTimes[i][1].exec(match[3])) {
            // match[2] should be 'T' or space
            timeFormat = (match[2] || ' ') + isoTimes[i][0];
            break;
          }
        }

        if (timeFormat == null) {
          config._isValid = false;
          return;
        }
      }

      if (!allowTime && timeFormat != null) {
        config._isValid = false;
        return;
      }

      if (match[4]) {
        if (tzRegex.exec(match[4])) {
          tzFormat = 'Z';
        } else {
          config._isValid = false;
          return;
        }
      }

      config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
      configFromStringAndFormat(config);
    } else {
      config._isValid = false;
    }
  } // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3


  var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

  function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];

    if (secondStr) {
      result.push(parseInt(secondStr, 10));
    }

    return result;
  }

  function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);

    if (year <= 49) {
      return 2000 + year;
    } else if (year <= 999) {
      return 1900 + year;
    }

    return year;
  }

  function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
      // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
      var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
          weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();

      if (weekdayProvided !== weekdayActual) {
        getParsingFlags(config).weekdayMismatch = true;
        config._isValid = false;
        return false;
      }
    }

    return true;
  }

  var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
  };

  function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
      return obsOffsets[obsOffset];
    } else if (militaryOffset) {
      // the only allowed military tz is Z
      return 0;
    } else {
      var hm = parseInt(numOffset, 10);
      var m = hm % 100,
          h = (hm - m) / 100;
      return h * 60 + m;
    }
  } // date and time from ref 2822 format


  function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));

    if (match) {
      var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);

      if (!checkWeekday(match[1], parsedArray, config)) {
        return;
      }

      config._a = parsedArray;
      config._tzm = calculateOffset(match[8], match[9], match[10]);
      config._d = createUTCDate.apply(null, config._a);

      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

      getParsingFlags(config).rfc2822 = true;
    } else {
      config._isValid = false;
    }
  } // date from iso format or fallback


  function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
      config._d = new Date(+matched[1]);
      return;
    }

    configFromISO(config);

    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    }

    configFromRFC2822(config);

    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    } // Final attempt, use Input Fallback


    hooks.createFromInputFallback(config);
  }

  hooks.createFromInputFallback = deprecate('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged and will be removed in an upcoming major release. Please refer to ' + 'http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
    config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
  }); // constant that refers to the ISO standard

  hooks.ISO_8601 = function () {}; // constant that refers to the RFC 2822 form


  hooks.RFC_2822 = function () {}; // date from string and format string


  function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
      configFromISO(config);
      return;
    }

    if (config._f === hooks.RFC_2822) {
      configFromRFC2822(config);
      return;
    }

    config._a = [];
    getParsingFlags(config).empty = true; // This array is used to make a Date, either with `new Date` or `Date.UTC`

    var string = '' + config._i,
        i,
        parsedInput,
        tokens,
        token,
        skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;
    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];
      parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0]; // console.log('token', token, 'parsedInput', parsedInput,
      //         'regex', getParseRegexForToken(token, config));

      if (parsedInput) {
        skipped = string.substr(0, string.indexOf(parsedInput));

        if (skipped.length > 0) {
          getParsingFlags(config).unusedInput.push(skipped);
        }

        string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
        totalParsedInputLength += parsedInput.length;
      } // don't parse if it's not a known token


      if (formatTokenFunctions[token]) {
        if (parsedInput) {
          getParsingFlags(config).empty = false;
        } else {
          getParsingFlags(config).unusedTokens.push(token);
        }

        addTimeToArrayFromToken(token, parsedInput, config);
      } else if (config._strict && !parsedInput) {
        getParsingFlags(config).unusedTokens.push(token);
      }
    } // add remaining unparsed input length to the string


    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;

    if (string.length > 0) {
      getParsingFlags(config).unusedInput.push(string);
    } // clear _12h flag if hour is <= 12


    if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
      getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem; // handle meridiem

    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
    configFromArray(config);
    checkOverflow(config);
  }

  function meridiemFixWrap(locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
      // nothing to do
      return hour;
    }

    if (locale.meridiemHour != null) {
      return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
      // Fallback
      isPm = locale.isPM(meridiem);

      if (isPm && hour < 12) {
        hour += 12;
      }

      if (!isPm && hour === 12) {
        hour = 0;
      }

      return hour;
    } else {
      // this is not supposed to happen
      return hour;
    }
  } // date from string and array of format strings


  function configFromStringAndArray(config) {
    var tempConfig, bestMoment, scoreToBeat, i, currentScore;

    if (config._f.length === 0) {
      getParsingFlags(config).invalidFormat = true;
      config._d = new Date(NaN);
      return;
    }

    for (i = 0; i < config._f.length; i++) {
      currentScore = 0;
      tempConfig = copyConfig({}, config);

      if (config._useUTC != null) {
        tempConfig._useUTC = config._useUTC;
      }

      tempConfig._f = config._f[i];
      configFromStringAndFormat(tempConfig);

      if (!isValid(tempConfig)) {
        continue;
      } // if there is any input that was not parsed add a penalty for that format


      currentScore += getParsingFlags(tempConfig).charsLeftOver; //or tokens

      currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
      getParsingFlags(tempConfig).score = currentScore;

      if (scoreToBeat == null || currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }

    extend(config, bestMoment || tempConfig);
  }

  function configFromObject(config) {
    if (config._d) {
      return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
      return obj && parseInt(obj, 10);
    });
    configFromArray(config);
  }

  function createFromConfig(config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));

    if (res._nextDay) {
      // Adding is smart enough around DST
      res.add(1, 'd');
      res._nextDay = undefined;
    }

    return res;
  }

  function prepareConfig(config) {
    var input = config._i,
        format = config._f;
    config._locale = config._locale || getLocale(config._l);

    if (input === null || format === undefined && input === '') {
      return createInvalid({
        nullInput: true
      });
    }

    if (typeof input === 'string') {
      config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
      return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
      config._d = input;
    } else if (isArray(format)) {
      configFromStringAndArray(config);
    } else if (format) {
      configFromStringAndFormat(config);
    } else {
      configFromInput(config);
    }

    if (!isValid(config)) {
      config._d = null;
    }

    return config;
  }

  function configFromInput(config) {
    var input = config._i;

    if (isUndefined(input)) {
      config._d = new Date(hooks.now());
    } else if (isDate(input)) {
      config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
      configFromString(config);
    } else if (isArray(input)) {
      config._a = map(input.slice(0), function (obj) {
        return parseInt(obj, 10);
      });
      configFromArray(config);
    } else if (isObject(input)) {
      configFromObject(config);
    } else if (isNumber(input)) {
      // from milliseconds
      config._d = new Date(input);
    } else {
      hooks.createFromInputFallback(config);
    }
  }

  function createLocalOrUTC(input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
      strict = locale;
      locale = undefined;
    }

    if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
      input = undefined;
    } // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423


    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;
    return createFromConfig(c);
  }

  function createLocal(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
  }

  var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
    var other = createLocal.apply(null, arguments);

    if (this.isValid() && other.isValid()) {
      return other < this ? this : other;
    } else {
      return createInvalid();
    }
  });
  var prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
    var other = createLocal.apply(null, arguments);

    if (this.isValid() && other.isValid()) {
      return other > this ? this : other;
    } else {
      return createInvalid();
    }
  }); // Pick a moment m from moments so that m[fn](other) is true for all
  // other. This relies on the function fn to be transitive.
  //
  // moments should either be an array of moment objects or an array, whose
  // first element is an array of moment objects.

  function pickBy(fn, moments) {
    var res, i;

    if (moments.length === 1 && isArray(moments[0])) {
      moments = moments[0];
    }

    if (!moments.length) {
      return createLocal();
    }

    res = moments[0];

    for (i = 1; i < moments.length; ++i) {
      if (!moments[i].isValid() || moments[i][fn](res)) {
        res = moments[i];
      }
    }

    return res;
  } // TODO: Use [].sort instead?


  function min() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isBefore', args);
  }

  function max() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isAfter', args);
  }

  var now = function () {
    return Date.now ? Date.now() : +new Date();
  };

  var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

  function isDurationValid(m) {
    for (var key in m) {
      if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
        return false;
      }
    }

    var unitHasDecimal = false;

    for (var i = 0; i < ordering.length; ++i) {
      if (m[ordering[i]]) {
        if (unitHasDecimal) {
          return false; // only allow non-integers for smallest unit
        }

        if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
          unitHasDecimal = true;
        }
      }
    }

    return true;
  }

  function isValid$1() {
    return this._isValid;
  }

  function createInvalid$1() {
    return createDuration(NaN);
  }

  function Duration(duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;
    this._isValid = isDurationValid(normalizedInput); // representation for dateAddRemove

    this._milliseconds = +milliseconds + seconds * 1e3 + // 1000
    minutes * 6e4 + // 1000 * 60
    hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately

    this._days = +days + weeks * 7; // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.

    this._months = +months + quarters * 3 + years * 12;
    this._data = {};
    this._locale = getLocale();

    this._bubble();
  }

  function isDuration(obj) {
    return obj instanceof Duration;
  }

  function absRound(number) {
    if (number < 0) {
      return Math.round(-1 * number) * -1;
    } else {
      return Math.round(number);
    }
  } // FORMATTING


  function offset(token, separator) {
    addFormatToken(token, 0, 0, function () {
      var offset = this.utcOffset();
      var sign = '+';

      if (offset < 0) {
        offset = -offset;
        sign = '-';
      }

      return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
    });
  }

  offset('Z', ':');
  offset('ZZ', ''); // PARSING

  addRegexToken('Z', matchShortOffset);
  addRegexToken('ZZ', matchShortOffset);
  addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
  }); // HELPERS
  // timezone chunker
  // '+10:00' > ['10',  '00']
  // '-1530'  > ['-15', '30']

  var chunkOffset = /([\+\-]|\d\d)/gi;

  function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
      return null;
    }

    var chunk = matches[matches.length - 1] || [];
    var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);
    return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
  } // Return a moment from input, that is local/utc/zone equivalent to model.


  function cloneWithOffset(input, model) {
    var res, diff;

    if (model._isUTC) {
      res = model.clone();
      diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf(); // Use low-level api, because this fn is low-level api.

      res._d.setTime(res._d.valueOf() + diff);

      hooks.updateOffset(res, false);
      return res;
    } else {
      return createLocal(input).local();
    }
  }

  function getDateOffset(m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
  } // HOOKS
  // This function will be called whenever a moment is mutated.
  // It is intended to keep the offset in sync with the timezone.


  hooks.updateOffset = function () {}; // MOMENTS
  // keepLocalTime = true means only change the timezone, without
  // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
  // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
  // +0200, so we adjust the time as needed, to be valid.
  //
  // Keeping the time actually adds/subtracts (one hour)
  // from the actual represented time. That is why we call updateOffset
  // a second time. In case it wants us to change the offset again
  // _changeInProgress == true case, then we have to adjust, because
  // there is no such time in the given timezone.


  function getSetOffset(input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;

    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    if (input != null) {
      if (typeof input === 'string') {
        input = offsetFromString(matchShortOffset, input);

        if (input === null) {
          return this;
        }
      } else if (Math.abs(input) < 16 && !keepMinutes) {
        input = input * 60;
      }

      if (!this._isUTC && keepLocalTime) {
        localAdjust = getDateOffset(this);
      }

      this._offset = input;
      this._isUTC = true;

      if (localAdjust != null) {
        this.add(localAdjust, 'm');
      }

      if (offset !== input) {
        if (!keepLocalTime || this._changeInProgress) {
          addSubtract(this, createDuration(input - offset, 'm'), 1, false);
        } else if (!this._changeInProgress) {
          this._changeInProgress = true;
          hooks.updateOffset(this, true);
          this._changeInProgress = null;
        }
      }

      return this;
    } else {
      return this._isUTC ? offset : getDateOffset(this);
    }
  }

  function getSetZone(input, keepLocalTime) {
    if (input != null) {
      if (typeof input !== 'string') {
        input = -input;
      }

      this.utcOffset(input, keepLocalTime);
      return this;
    } else {
      return -this.utcOffset();
    }
  }

  function setOffsetToUTC(keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
  }

  function setOffsetToLocal(keepLocalTime) {
    if (this._isUTC) {
      this.utcOffset(0, keepLocalTime);
      this._isUTC = false;

      if (keepLocalTime) {
        this.subtract(getDateOffset(this), 'm');
      }
    }

    return this;
  }

  function setOffsetToParsedOffset() {
    if (this._tzm != null) {
      this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
      var tZone = offsetFromString(matchOffset, this._i);

      if (tZone != null) {
        this.utcOffset(tZone);
      } else {
        this.utcOffset(0, true);
      }
    }

    return this;
  }

  function hasAlignedHourOffset(input) {
    if (!this.isValid()) {
      return false;
    }

    input = input ? createLocal(input).utcOffset() : 0;
    return (this.utcOffset() - input) % 60 === 0;
  }

  function isDaylightSavingTime() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }

  function isDaylightSavingTimeShifted() {
    if (!isUndefined(this._isDSTShifted)) {
      return this._isDSTShifted;
    }

    var c = {};
    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
      var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
      this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
    } else {
      this._isDSTShifted = false;
    }

    return this._isDSTShifted;
  }

  function isLocal() {
    return this.isValid() ? !this._isUTC : false;
  }

  function isUtcOffset() {
    return this.isValid() ? this._isUTC : false;
  }

  function isUtc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
  } // ASP.NET json date format regex


  var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/; // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
  // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
  // and further modified to allow for strings containing both week and day

  var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

  function createDuration(input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
    match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
      duration = {
        ms: input._milliseconds,
        d: input._days,
        M: input._months
      };
    } else if (isNumber(input)) {
      duration = {};

      if (key) {
        duration[key] = input;
      } else {
        duration.milliseconds = input;
      }
    } else if (!!(match = aspNetRegex.exec(input))) {
      sign = match[1] === '-' ? -1 : 1;
      duration = {
        y: 0,
        d: toInt(match[DATE]) * sign,
        h: toInt(match[HOUR]) * sign,
        m: toInt(match[MINUTE]) * sign,
        s: toInt(match[SECOND]) * sign,
        ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match

      };
    } else if (!!(match = isoRegex.exec(input))) {
      sign = match[1] === '-' ? -1 : 1;
      duration = {
        y: parseIso(match[2], sign),
        M: parseIso(match[3], sign),
        w: parseIso(match[4], sign),
        d: parseIso(match[5], sign),
        h: parseIso(match[6], sign),
        m: parseIso(match[7], sign),
        s: parseIso(match[8], sign)
      };
    } else if (duration == null) {
      // checks for null or undefined
      duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
      diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
      duration = {};
      duration.ms = diffRes.milliseconds;
      duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
      ret._locale = input._locale;
    }

    return ret;
  }

  createDuration.fn = Duration.prototype;
  createDuration.invalid = createInvalid$1;

  function parseIso(inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.')); // apply sign while we're at it

    return (isNaN(res) ? 0 : res) * sign;
  }

  function positiveMomentsDifference(base, other) {
    var res = {};
    res.months = other.month() - base.month() + (other.year() - base.year()) * 12;

    if (base.clone().add(res.months, 'M').isAfter(other)) {
      --res.months;
    }

    res.milliseconds = +other - +base.clone().add(res.months, 'M');
    return res;
  }

  function momentsDifference(base, other) {
    var res;

    if (!(base.isValid() && other.isValid())) {
      return {
        milliseconds: 0,
        months: 0
      };
    }

    other = cloneWithOffset(other, base);

    if (base.isBefore(other)) {
      res = positiveMomentsDifference(base, other);
    } else {
      res = positiveMomentsDifference(other, base);
      res.milliseconds = -res.milliseconds;
      res.months = -res.months;
    }

    return res;
  } // TODO: remove 'name' arg after deprecation is removed


  function createAdder(direction, name) {
    return function (val, period) {
      var dur, tmp; //invert the arguments, but complain about it

      if (period !== null && !isNaN(+period)) {
        deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
        tmp = val;
        val = period;
        period = tmp;
      }

      val = typeof val === 'string' ? +val : val;
      dur = createDuration(val, period);
      addSubtract(this, dur, direction);
      return this;
    };
  }

  function addSubtract(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
      // No op
      return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
      setMonth(mom, get(mom, 'Month') + months * isAdding);
    }

    if (days) {
      set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }

    if (milliseconds) {
      mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }

    if (updateOffset) {
      hooks.updateOffset(mom, days || months);
    }
  }

  var add = createAdder(1, 'add');
  var subtract = createAdder(-1, 'subtract');

  function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
  }

  function calendar$1(time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';
    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
  }

  function clone() {
    return new Moment(this);
  }

  function isAfter(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() > localInput.valueOf();
    } else {
      return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
  }

  function isBefore(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() < localInput.valueOf();
    } else {
      return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
  }

  function isBetween(from, to, units, inclusivity) {
    var localFrom = isMoment(from) ? from : createLocal(from),
        localTo = isMoment(to) ? to : createLocal(to);

    if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
      return false;
    }

    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
  }

  function isSame(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() === localInput.valueOf();
    } else {
      inputMs = localInput.valueOf();
      return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
  }

  function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
  }

  function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
  }

  function diff(input, units, asFloat) {
    var that, zoneDelta, output;

    if (!this.isValid()) {
      return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
      return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
    units = normalizeUnits(units);

    switch (units) {
      case 'year':
        output = monthDiff(this, that) / 12;
        break;

      case 'month':
        output = monthDiff(this, that);
        break;

      case 'quarter':
        output = monthDiff(this, that) / 3;
        break;

      case 'second':
        output = (this - that) / 1e3;
        break;
      // 1000

      case 'minute':
        output = (this - that) / 6e4;
        break;
      // 1000 * 60

      case 'hour':
        output = (this - that) / 36e5;
        break;
      // 1000 * 60 * 60

      case 'day':
        output = (this - that - zoneDelta) / 864e5;
        break;
      // 1000 * 60 * 60 * 24, negate dst

      case 'week':
        output = (this - that - zoneDelta) / 6048e5;
        break;
      // 1000 * 60 * 60 * 24 * 7, negate dst

      default:
        output = this - that;
    }

    return asFloat ? output : absFloor(output);
  }

  function monthDiff(a, b) {
    // difference in months
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
    anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2,
        adjust;

    if (b - anchor < 0) {
      anchor2 = a.clone().add(wholeMonthDiff - 1, 'months'); // linear across the month

      adjust = (b - anchor) / (anchor - anchor2);
    } else {
      anchor2 = a.clone().add(wholeMonthDiff + 1, 'months'); // linear across the month

      adjust = (b - anchor) / (anchor2 - anchor);
    } //check for negative zero, return zero if negative zero


    return -(wholeMonthDiff + adjust) || 0;
  }

  hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

  function toString() {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }

  function toISOString(keepOffset) {
    if (!this.isValid()) {
      return null;
    }

    var utc = keepOffset !== true;
    var m = utc ? this.clone().utc() : this;

    if (m.year() < 0 || m.year() > 9999) {
      return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    if (isFunction(Date.prototype.toISOString)) {
      // native implementation is ~50x faster, use it when we can
      if (utc) {
        return this.toDate().toISOString();
      } else {
        return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
      }
    }

    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
  }
  /**
   * Return a human readable representation of a moment that can
   * also be evaluated to get a new moment which is the same
   *
   * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
   */


  function inspect() {
    if (!this.isValid()) {
      return 'moment.invalid(/* ' + this._i + ' */)';
    }

    var func = 'moment';
    var zone = '';

    if (!this.isLocal()) {
      func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
      zone = 'Z';
    }

    var prefix = '[' + func + '("]';
    var year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';
    return this.format(prefix + year + datetime + suffix);
  }

  function format(inputString) {
    if (!inputString) {
      inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }

    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
  }

  function from(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        to: this,
        from: time
      }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }

  function fromNow(withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
  }

  function to(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        from: this,
        to: time
      }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }

  function toNow(withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
  } // If passed a locale key, it will set the locale for this
  // instance.  Otherwise, it will return the locale configuration
  // variables for this instance.


  function locale(key) {
    var newLocaleData;

    if (key === undefined) {
      return this._locale._abbr;
    } else {
      newLocaleData = getLocale(key);

      if (newLocaleData != null) {
        this._locale = newLocaleData;
      }

      return this;
    }
  }

  var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
    if (key === undefined) {
      return this.localeData();
    } else {
      return this.locale(key);
    }
  });

  function localeData() {
    return this._locale;
  }

  var MS_PER_SECOND = 1000;
  var MS_PER_MINUTE = 60 * MS_PER_SECOND;
  var MS_PER_HOUR = 60 * MS_PER_MINUTE;
  var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR; // actual modulo - handles negative numbers (for dates before 1970):

  function mod$1(dividend, divisor) {
    return (dividend % divisor + divisor) % divisor;
  }

  function localStartOfDate(y, m, d) {
    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      return new Date(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return new Date(y, m, d).valueOf();
    }
  }

  function utcStartOfDate(y, m, d) {
    // Date.UTC remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return Date.UTC(y, m, d);
    }
  }

  function startOf(units) {
    var time;
    units = normalizeUnits(units);

    if (units === undefined || units === 'millisecond' || !this.isValid()) {
      return this;
    }

    var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
      case 'year':
        time = startOfDate(this.year(), 0, 1);
        break;

      case 'quarter':
        time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
        break;

      case 'month':
        time = startOfDate(this.year(), this.month(), 1);
        break;

      case 'week':
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
        break;

      case 'isoWeek':
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;

      case 'day':
      case 'date':
        time = startOfDate(this.year(), this.month(), this.date());
        break;

      case 'hour':
        time = this._d.valueOf();
        time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
        break;

      case 'minute':
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_MINUTE);
        break;

      case 'second':
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_SECOND);
        break;
    }

    this._d.setTime(time);

    hooks.updateOffset(this, true);
    return this;
  }

  function endOf(units) {
    var time;
    units = normalizeUnits(units);

    if (units === undefined || units === 'millisecond' || !this.isValid()) {
      return this;
    }

    var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
      case 'year':
        time = startOfDate(this.year() + 1, 0, 1) - 1;
        break;

      case 'quarter':
        time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
        break;

      case 'month':
        time = startOfDate(this.year(), this.month() + 1, 1) - 1;
        break;

      case 'week':
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;

      case 'isoWeek':
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;

      case 'day':
      case 'date':
        time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
        break;

      case 'hour':
        time = this._d.valueOf();
        time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
        break;

      case 'minute':
        time = this._d.valueOf();
        time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
        break;

      case 'second':
        time = this._d.valueOf();
        time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
        break;
    }

    this._d.setTime(time);

    hooks.updateOffset(this, true);
    return this;
  }

  function valueOf() {
    return this._d.valueOf() - (this._offset || 0) * 60000;
  }

  function unix() {
    return Math.floor(this.valueOf() / 1000);
  }

  function toDate() {
    return new Date(this.valueOf());
  }

  function toArray() {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
  }

  function toObject() {
    var m = this;
    return {
      years: m.year(),
      months: m.month(),
      date: m.date(),
      hours: m.hours(),
      minutes: m.minutes(),
      seconds: m.seconds(),
      milliseconds: m.milliseconds()
    };
  }

  function toJSON() {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
  }

  function isValid$2() {
    return isValid(this);
  }

  function parsingFlags() {
    return extend({}, getParsingFlags(this));
  }

  function invalidAt() {
    return getParsingFlags(this).overflow;
  }

  function creationData() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict
    };
  } // FORMATTING


  addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
  });
  addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
  });

  function addWeekYearFormatToken(token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
  }

  addWeekYearFormatToken('gggg', 'weekYear');
  addWeekYearFormatToken('ggggg', 'weekYear');
  addWeekYearFormatToken('GGGG', 'isoWeekYear');
  addWeekYearFormatToken('GGGGG', 'isoWeekYear'); // ALIASES

  addUnitAlias('weekYear', 'gg');
  addUnitAlias('isoWeekYear', 'GG'); // PRIORITY

  addUnitPriority('weekYear', 1);
  addUnitPriority('isoWeekYear', 1); // PARSING

  addRegexToken('G', matchSigned);
  addRegexToken('g', matchSigned);
  addRegexToken('GG', match1to2, match2);
  addRegexToken('gg', match1to2, match2);
  addRegexToken('GGGG', match1to4, match4);
  addRegexToken('gggg', match1to4, match4);
  addRegexToken('GGGGG', match1to6, match6);
  addRegexToken('ggggg', match1to6, match6);
  addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
  });
  addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
  }); // MOMENTS

  function getSetWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }

  function getSetISOWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
  }

  function getISOWeeksInYear() {
    return weeksInYear(this.year(), 1, 4);
  }

  function getWeeksInYear() {
    var weekInfo = this.localeData()._week;

    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
  }

  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;

    if (input == null) {
      return weekOfYear(this, dow, doy).year;
    } else {
      weeksTarget = weeksInYear(input, dow, doy);

      if (week > weeksTarget) {
        week = weeksTarget;
      }

      return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
  }

  function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
  } // FORMATTING


  addFormatToken('Q', 0, 'Qo', 'quarter'); // ALIASES

  addUnitAlias('quarter', 'Q'); // PRIORITY

  addUnitPriority('quarter', 7); // PARSING

  addRegexToken('Q', match1);
  addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
  }); // MOMENTS

  function getSetQuarter(input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
  } // FORMATTING


  addFormatToken('D', ['DD', 2], 'Do', 'date'); // ALIASES

  addUnitAlias('date', 'D'); // PRIORITY

  addUnitPriority('date', 9); // PARSING

  addRegexToken('D', match1to2);
  addRegexToken('DD', match1to2, match2);
  addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
  });
  addParseToken(['D', 'DD'], DATE);
  addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
  }); // MOMENTS

  var getSetDayOfMonth = makeGetSet('Date', true); // FORMATTING

  addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear'); // ALIASES

  addUnitAlias('dayOfYear', 'DDD'); // PRIORITY

  addUnitPriority('dayOfYear', 4); // PARSING

  addRegexToken('DDD', match1to3);
  addRegexToken('DDDD', match3);
  addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
  }); // HELPERS
  // MOMENTS

  function getSetDayOfYear(input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
  } // FORMATTING


  addFormatToken('m', ['mm', 2], 0, 'minute'); // ALIASES

  addUnitAlias('minute', 'm'); // PRIORITY

  addUnitPriority('minute', 14); // PARSING

  addRegexToken('m', match1to2);
  addRegexToken('mm', match1to2, match2);
  addParseToken(['m', 'mm'], MINUTE); // MOMENTS

  var getSetMinute = makeGetSet('Minutes', false); // FORMATTING

  addFormatToken('s', ['ss', 2], 0, 'second'); // ALIASES

  addUnitAlias('second', 's'); // PRIORITY

  addUnitPriority('second', 15); // PARSING

  addRegexToken('s', match1to2);
  addRegexToken('ss', match1to2, match2);
  addParseToken(['s', 'ss'], SECOND); // MOMENTS

  var getSetSecond = makeGetSet('Seconds', false); // FORMATTING

  addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
  });
  addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
  });
  addFormatToken(0, ['SSS', 3], 0, 'millisecond');
  addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
  });
  addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
  });
  addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
  });
  addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
  });
  addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
  });
  addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
  }); // ALIASES

  addUnitAlias('millisecond', 'ms'); // PRIORITY

  addUnitPriority('millisecond', 16); // PARSING

  addRegexToken('S', match1to3, match1);
  addRegexToken('SS', match1to3, match2);
  addRegexToken('SSS', match1to3, match3);
  var token;

  for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
  }

  function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
  }

  for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
  } // MOMENTS


  var getSetMillisecond = makeGetSet('Milliseconds', false); // FORMATTING

  addFormatToken('z', 0, 0, 'zoneAbbr');
  addFormatToken('zz', 0, 0, 'zoneName'); // MOMENTS

  function getZoneAbbr() {
    return this._isUTC ? 'UTC' : '';
  }

  function getZoneName() {
    return this._isUTC ? 'Coordinated Universal Time' : '';
  }

  var proto = Moment.prototype;
  proto.add = add;
  proto.calendar = calendar$1;
  proto.clone = clone;
  proto.diff = diff;
  proto.endOf = endOf;
  proto.format = format;
  proto.from = from;
  proto.fromNow = fromNow;
  proto.to = to;
  proto.toNow = toNow;
  proto.get = stringGet;
  proto.invalidAt = invalidAt;
  proto.isAfter = isAfter;
  proto.isBefore = isBefore;
  proto.isBetween = isBetween;
  proto.isSame = isSame;
  proto.isSameOrAfter = isSameOrAfter;
  proto.isSameOrBefore = isSameOrBefore;
  proto.isValid = isValid$2;
  proto.lang = lang;
  proto.locale = locale;
  proto.localeData = localeData;
  proto.max = prototypeMax;
  proto.min = prototypeMin;
  proto.parsingFlags = parsingFlags;
  proto.set = stringSet;
  proto.startOf = startOf;
  proto.subtract = subtract;
  proto.toArray = toArray;
  proto.toObject = toObject;
  proto.toDate = toDate;
  proto.toISOString = toISOString;
  proto.inspect = inspect;
  proto.toJSON = toJSON;
  proto.toString = toString;
  proto.unix = unix;
  proto.valueOf = valueOf;
  proto.creationData = creationData;
  proto.year = getSetYear;
  proto.isLeapYear = getIsLeapYear;
  proto.weekYear = getSetWeekYear;
  proto.isoWeekYear = getSetISOWeekYear;
  proto.quarter = proto.quarters = getSetQuarter;
  proto.month = getSetMonth;
  proto.daysInMonth = getDaysInMonth;
  proto.week = proto.weeks = getSetWeek;
  proto.isoWeek = proto.isoWeeks = getSetISOWeek;
  proto.weeksInYear = getWeeksInYear;
  proto.isoWeeksInYear = getISOWeeksInYear;
  proto.date = getSetDayOfMonth;
  proto.day = proto.days = getSetDayOfWeek;
  proto.weekday = getSetLocaleDayOfWeek;
  proto.isoWeekday = getSetISODayOfWeek;
  proto.dayOfYear = getSetDayOfYear;
  proto.hour = proto.hours = getSetHour;
  proto.minute = proto.minutes = getSetMinute;
  proto.second = proto.seconds = getSetSecond;
  proto.millisecond = proto.milliseconds = getSetMillisecond;
  proto.utcOffset = getSetOffset;
  proto.utc = setOffsetToUTC;
  proto.local = setOffsetToLocal;
  proto.parseZone = setOffsetToParsedOffset;
  proto.hasAlignedHourOffset = hasAlignedHourOffset;
  proto.isDST = isDaylightSavingTime;
  proto.isLocal = isLocal;
  proto.isUtcOffset = isUtcOffset;
  proto.isUtc = isUtc;
  proto.isUTC = isUtc;
  proto.zoneAbbr = getZoneAbbr;
  proto.zoneName = getZoneName;
  proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
  proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
  proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
  proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
  proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

  function createUnix(input) {
    return createLocal(input * 1000);
  }

  function createInZone() {
    return createLocal.apply(null, arguments).parseZone();
  }

  function preParsePostFormat(string) {
    return string;
  }

  var proto$1 = Locale.prototype;
  proto$1.calendar = calendar;
  proto$1.longDateFormat = longDateFormat;
  proto$1.invalidDate = invalidDate;
  proto$1.ordinal = ordinal;
  proto$1.preparse = preParsePostFormat;
  proto$1.postformat = preParsePostFormat;
  proto$1.relativeTime = relativeTime;
  proto$1.pastFuture = pastFuture;
  proto$1.set = set;
  proto$1.months = localeMonths;
  proto$1.monthsShort = localeMonthsShort;
  proto$1.monthsParse = localeMonthsParse;
  proto$1.monthsRegex = monthsRegex;
  proto$1.monthsShortRegex = monthsShortRegex;
  proto$1.week = localeWeek;
  proto$1.firstDayOfYear = localeFirstDayOfYear;
  proto$1.firstDayOfWeek = localeFirstDayOfWeek;
  proto$1.weekdays = localeWeekdays;
  proto$1.weekdaysMin = localeWeekdaysMin;
  proto$1.weekdaysShort = localeWeekdaysShort;
  proto$1.weekdaysParse = localeWeekdaysParse;
  proto$1.weekdaysRegex = weekdaysRegex;
  proto$1.weekdaysShortRegex = weekdaysShortRegex;
  proto$1.weekdaysMinRegex = weekdaysMinRegex;
  proto$1.isPM = localeIsPM;
  proto$1.meridiem = localeMeridiem;

  function get$1(format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
  }

  function listMonthsImpl(format, index, field) {
    if (isNumber(format)) {
      index = format;
      format = undefined;
    }

    format = format || '';

    if (index != null) {
      return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];

    for (i = 0; i < 12; i++) {
      out[i] = get$1(format, i, field, 'month');
    }

    return out;
  } // ()
  // (5)
  // (fmt, 5)
  // (fmt)
  // (true)
  // (true, 5)
  // (true, fmt, 5)
  // (true, fmt)


  function listWeekdaysImpl(localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
      if (isNumber(format)) {
        index = format;
        format = undefined;
      }

      format = format || '';
    } else {
      format = localeSorted;
      index = format;
      localeSorted = false;

      if (isNumber(format)) {
        index = format;
        format = undefined;
      }

      format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
      return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];

    for (i = 0; i < 7; i++) {
      out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }

    return out;
  }

  function listMonths(format, index) {
    return listMonthsImpl(format, index, 'months');
  }

  function listMonthsShort(format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
  }

  function listWeekdays(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
  }

  function listWeekdaysShort(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
  }

  function listWeekdaysMin(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
  }

  getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function (number) {
      var b = number % 10,
          output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    }
  }); // Side effect imports

  hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
  hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);
  var mathAbs = Math.abs;

  function abs() {
    var data = this._data;
    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);
    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.months = mathAbs(data.months);
    data.years = mathAbs(data.years);
    return this;
  }

  function addSubtract$1(duration, input, value, direction) {
    var other = createDuration(input, value);
    duration._milliseconds += direction * other._milliseconds;
    duration._days += direction * other._days;
    duration._months += direction * other._months;
    return duration._bubble();
  } // supports only 2.0-style add(1, 's') or add(duration)


  function add$1(input, value) {
    return addSubtract$1(this, input, value, 1);
  } // supports only 2.0-style subtract(1, 's') or subtract(duration)


  function subtract$1(input, value) {
    return addSubtract$1(this, input, value, -1);
  }

  function absCeil(number) {
    if (number < 0) {
      return Math.floor(number);
    } else {
      return Math.ceil(number);
    }
  }

  function bubble() {
    var milliseconds = this._milliseconds;
    var days = this._days;
    var months = this._months;
    var data = this._data;
    var seconds, minutes, hours, years, monthsFromDays; // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166

    if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
      milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
      days = 0;
      months = 0;
    } // The following code bubbles up values, see the tests for
    // examples of what that means.


    data.milliseconds = milliseconds % 1000;
    seconds = absFloor(milliseconds / 1000);
    data.seconds = seconds % 60;
    minutes = absFloor(seconds / 60);
    data.minutes = minutes % 60;
    hours = absFloor(minutes / 60);
    data.hours = hours % 24;
    days += absFloor(hours / 24); // convert days to months

    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays)); // 12 months -> 1 year

    years = absFloor(months / 12);
    months %= 12;
    data.days = days;
    data.months = months;
    data.years = years;
    return this;
  }

  function daysToMonths(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
  }

  function monthsToDays(months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
  }

  function as(units) {
    if (!this.isValid()) {
      return NaN;
    }

    var days;
    var months;
    var milliseconds = this._milliseconds;
    units = normalizeUnits(units);

    if (units === 'month' || units === 'quarter' || units === 'year') {
      days = this._days + milliseconds / 864e5;
      months = this._months + daysToMonths(days);

      switch (units) {
        case 'month':
          return months;

        case 'quarter':
          return months / 3;

        case 'year':
          return months / 12;
      }
    } else {
      // handle milliseconds separately because of floating point math errors (issue #1867)
      days = this._days + Math.round(monthsToDays(this._months));

      switch (units) {
        case 'week':
          return days / 7 + milliseconds / 6048e5;

        case 'day':
          return days + milliseconds / 864e5;

        case 'hour':
          return days * 24 + milliseconds / 36e5;

        case 'minute':
          return days * 1440 + milliseconds / 6e4;

        case 'second':
          return days * 86400 + milliseconds / 1000;
        // Math.floor prevents floating point math errors here

        case 'millisecond':
          return Math.floor(days * 864e5) + milliseconds;

        default:
          throw new Error('Unknown unit ' + units);
      }
    }
  } // TODO: Use this.as('ms')?


  function valueOf$1() {
    if (!this.isValid()) {
      return NaN;
    }

    return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
  }

  function makeAs(alias) {
    return function () {
      return this.as(alias);
    };
  }

  var asMilliseconds = makeAs('ms');
  var asSeconds = makeAs('s');
  var asMinutes = makeAs('m');
  var asHours = makeAs('h');
  var asDays = makeAs('d');
  var asWeeks = makeAs('w');
  var asMonths = makeAs('M');
  var asQuarters = makeAs('Q');
  var asYears = makeAs('y');

  function clone$1() {
    return createDuration(this);
  }

  function get$2(units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
  }

  function makeGetter(name) {
    return function () {
      return this.isValid() ? this._data[name] : NaN;
    };
  }

  var milliseconds = makeGetter('milliseconds');
  var seconds = makeGetter('seconds');
  var minutes = makeGetter('minutes');
  var hours = makeGetter('hours');
  var days = makeGetter('days');
  var months = makeGetter('months');
  var years = makeGetter('years');

  function weeks() {
    return absFloor(this.days() / 7);
  }

  var round = Math.round;
  var thresholds = {
    ss: 44,
    // a few seconds to seconds
    s: 45,
    // seconds to minute
    m: 45,
    // minutes to hour
    h: 22,
    // hours to day
    d: 26,
    // days to month
    M: 11 // months to year

  }; // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize

  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  }

  function relativeTime$1(posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds = round(duration.as('s'));
    var minutes = round(duration.as('m'));
    var hours = round(duration.as('h'));
    var days = round(duration.as('d'));
    var months = round(duration.as('M'));
    var years = round(duration.as('y'));
    var a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days] || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];
    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
  } // This function allows you to set the rounding function for relative time strings


  function getSetRelativeTimeRounding(roundingFunction) {
    if (roundingFunction === undefined) {
      return round;
    }

    if (typeof roundingFunction === 'function') {
      round = roundingFunction;
      return true;
    }

    return false;
  } // This function allows you to set a threshold for relative time strings


  function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === undefined) {
      return false;
    }

    if (limit === undefined) {
      return thresholds[threshold];
    }

    thresholds[threshold] = limit;

    if (threshold === 's') {
      thresholds.ss = limit - 1;
    }

    return true;
  }

  function humanize(withSuffix) {
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
      output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
  }

  var abs$1 = Math.abs;

  function sign(x) {
    return (x > 0) - (x < 0) || +x;
  }

  function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days = abs$1(this._days);
    var months = abs$1(this._months);
    var minutes, hours, years; // 3600 seconds -> 60 minutes -> 1 hour

    minutes = absFloor(seconds / 60);
    hours = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60; // 12 months -> 1 year

    years = absFloor(months / 12);
    months %= 12; // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js

    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
      // this is the same as C#'s (Noda) and python (isodate)...
      // but not other JS (goog.date)
      return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';
    return totalSign + 'P' + (Y ? ymSign + Y + 'Y' : '') + (M ? ymSign + M + 'M' : '') + (D ? daysSign + D + 'D' : '') + (h || m || s ? 'T' : '') + (h ? hmsSign + h + 'H' : '') + (m ? hmsSign + m + 'M' : '') + (s ? hmsSign + s + 'S' : '');
  }

  var proto$2 = Duration.prototype;
  proto$2.isValid = isValid$1;
  proto$2.abs = abs;
  proto$2.add = add$1;
  proto$2.subtract = subtract$1;
  proto$2.as = as;
  proto$2.asMilliseconds = asMilliseconds;
  proto$2.asSeconds = asSeconds;
  proto$2.asMinutes = asMinutes;
  proto$2.asHours = asHours;
  proto$2.asDays = asDays;
  proto$2.asWeeks = asWeeks;
  proto$2.asMonths = asMonths;
  proto$2.asQuarters = asQuarters;
  proto$2.asYears = asYears;
  proto$2.valueOf = valueOf$1;
  proto$2._bubble = bubble;
  proto$2.clone = clone$1;
  proto$2.get = get$2;
  proto$2.milliseconds = milliseconds;
  proto$2.seconds = seconds;
  proto$2.minutes = minutes;
  proto$2.hours = hours;
  proto$2.days = days;
  proto$2.weeks = weeks;
  proto$2.months = months;
  proto$2.years = years;
  proto$2.humanize = humanize;
  proto$2.toISOString = toISOString$1;
  proto$2.toString = toISOString$1;
  proto$2.toJSON = toISOString$1;
  proto$2.locale = locale;
  proto$2.localeData = localeData;
  proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
  proto$2.lang = lang; // Side effect imports
  // FORMATTING

  addFormatToken('X', 0, 0, 'unix');
  addFormatToken('x', 0, 0, 'valueOf'); // PARSING

  addRegexToken('x', matchSigned);
  addRegexToken('X', matchTimestamp);
  addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
  });
  addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
  }); // Side effect imports

  hooks.version = '2.24.0';
  setHookCallback(createLocal);
  hooks.fn = proto;
  hooks.min = min;
  hooks.max = max;
  hooks.now = now;
  hooks.utc = createUTC;
  hooks.unix = createUnix;
  hooks.months = listMonths;
  hooks.isDate = isDate;
  hooks.locale = getSetGlobalLocale;
  hooks.invalid = createInvalid;
  hooks.duration = createDuration;
  hooks.isMoment = isMoment;
  hooks.weekdays = listWeekdays;
  hooks.parseZone = createInZone;
  hooks.localeData = getLocale;
  hooks.isDuration = isDuration;
  hooks.monthsShort = listMonthsShort;
  hooks.weekdaysMin = listWeekdaysMin;
  hooks.defineLocale = defineLocale;
  hooks.updateLocale = updateLocale;
  hooks.locales = listLocales;
  hooks.weekdaysShort = listWeekdaysShort;
  hooks.normalizeUnits = normalizeUnits;
  hooks.relativeTimeRounding = getSetRelativeTimeRounding;
  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  hooks.calendarFormat = getCalendarFormat;
  hooks.prototype = proto; // currently HTML5 input type only supports 24-hour formats

  hooks.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
    // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
    // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
    // <input type="datetime-local" step="0.001" />
    DATE: 'YYYY-MM-DD',
    // <input type="date" />
    TIME: 'HH:mm',
    // <input type="time" />
    TIME_SECONDS: 'HH:mm:ss',
    // <input type="time" step="1" />
    TIME_MS: 'HH:mm:ss.SSS',
    // <input type="time" step="0.001" />
    WEEK: 'GGGG-[W]WW',
    // <input type="week" />
    MONTH: 'YYYY-MM' // <input type="month" />

  };
  return hooks;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(139)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;!function () {
  var d3 = {
    version: "3.5.17"
  };

  var d3_arraySlice = [].slice,
      d3_array = function (list) {
    return d3_arraySlice.call(list);
  };

  var d3_document = this.document;

  function d3_documentElement(node) {
    return node && (node.ownerDocument || node.document || node).documentElement;
  }

  function d3_window(node) {
    return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
  }

  if (d3_document) {
    try {
      d3_array(d3_document.documentElement.childNodes)[0].nodeType;
    } catch (e) {
      d3_array = function (list) {
        var i = list.length,
            array = new Array(i);

        while (i--) array[i] = list[i];

        return array;
      };
    }
  }

  if (!Date.now) Date.now = function () {
    return +new Date();
  };

  if (d3_document) {
    try {
      d3_document.createElement("DIV").style.setProperty("opacity", 0, "");
    } catch (error) {
      var d3_element_prototype = this.Element.prototype,
          d3_element_setAttribute = d3_element_prototype.setAttribute,
          d3_element_setAttributeNS = d3_element_prototype.setAttributeNS,
          d3_style_prototype = this.CSSStyleDeclaration.prototype,
          d3_style_setProperty = d3_style_prototype.setProperty;

      d3_element_prototype.setAttribute = function (name, value) {
        d3_element_setAttribute.call(this, name, value + "");
      };

      d3_element_prototype.setAttributeNS = function (space, local, value) {
        d3_element_setAttributeNS.call(this, space, local, value + "");
      };

      d3_style_prototype.setProperty = function (name, value, priority) {
        d3_style_setProperty.call(this, name, value + "", priority);
      };
    }
  }

  d3.ascending = d3_ascending;

  function d3_ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  d3.descending = function (a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
  };

  d3.min = function (array, f) {
    var i = -1,
        n = array.length,
        a,
        b;

    if (arguments.length === 1) {
      while (++i < n) if ((b = array[i]) != null && b >= b) {
        a = b;
        break;
      }

      while (++i < n) if ((b = array[i]) != null && a > b) a = b;
    } else {
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
        a = b;
        break;
      }

      while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
    }

    return a;
  };

  d3.max = function (array, f) {
    var i = -1,
        n = array.length,
        a,
        b;

    if (arguments.length === 1) {
      while (++i < n) if ((b = array[i]) != null && b >= b) {
        a = b;
        break;
      }

      while (++i < n) if ((b = array[i]) != null && b > a) a = b;
    } else {
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
        a = b;
        break;
      }

      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
    }

    return a;
  };

  d3.extent = function (array, f) {
    var i = -1,
        n = array.length,
        a,
        b,
        c;

    if (arguments.length === 1) {
      while (++i < n) if ((b = array[i]) != null && b >= b) {
        a = c = b;
        break;
      }

      while (++i < n) if ((b = array[i]) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    } else {
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
        a = c = b;
        break;
      }

      while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    }

    return [a, c];
  };

  function d3_number(x) {
    return x === null ? NaN : +x;
  }

  function d3_numeric(x) {
    return !isNaN(x);
  }

  d3.sum = function (array, f) {
    var s = 0,
        n = array.length,
        a,
        i = -1;

    if (arguments.length === 1) {
      while (++i < n) if (d3_numeric(a = +array[i])) s += a;
    } else {
      while (++i < n) if (d3_numeric(a = +f.call(array, array[i], i))) s += a;
    }

    return s;
  };

  d3.mean = function (array, f) {
    var s = 0,
        n = array.length,
        a,
        i = -1,
        j = n;

    if (arguments.length === 1) {
      while (++i < n) if (d3_numeric(a = d3_number(array[i]))) s += a;else --j;
    } else {
      while (++i < n) if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) s += a;else --j;
    }

    if (j) return s / j;
  };

  d3.quantile = function (values, p) {
    var H = (values.length - 1) * p + 1,
        h = Math.floor(H),
        v = +values[h - 1],
        e = H - h;
    return e ? v + e * (values[h] - v) : v;
  };

  d3.median = function (array, f) {
    var numbers = [],
        n = array.length,
        a,
        i = -1;

    if (arguments.length === 1) {
      while (++i < n) if (d3_numeric(a = d3_number(array[i]))) numbers.push(a);
    } else {
      while (++i < n) if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) numbers.push(a);
    }

    if (numbers.length) return d3.quantile(numbers.sort(d3_ascending), .5);
  };

  d3.variance = function (array, f) {
    var n = array.length,
        m = 0,
        a,
        d,
        s = 0,
        i = -1,
        j = 0;

    if (arguments.length === 1) {
      while (++i < n) {
        if (d3_numeric(a = d3_number(array[i]))) {
          d = a - m;
          m += d / ++j;
          s += d * (a - m);
        }
      }
    } else {
      while (++i < n) {
        if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) {
          d = a - m;
          m += d / ++j;
          s += d * (a - m);
        }
      }
    }

    if (j > 1) return s / (j - 1);
  };

  d3.deviation = function () {
    var v = d3.variance.apply(this, arguments);
    return v ? Math.sqrt(v) : v;
  };

  function d3_bisector(compare) {
    return {
      left: function (a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;

        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
        }

        return lo;
      },
      right: function (a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;

        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
        }

        return lo;
      }
    };
  }

  var d3_bisect = d3_bisector(d3_ascending);
  d3.bisectLeft = d3_bisect.left;
  d3.bisect = d3.bisectRight = d3_bisect.right;

  d3.bisector = function (f) {
    return d3_bisector(f.length === 1 ? function (d, x) {
      return d3_ascending(f(d), x);
    } : f);
  };

  d3.shuffle = function (array, i0, i1) {
    if ((m = arguments.length) < 3) {
      i1 = array.length;
      if (m < 2) i0 = 0;
    }

    var m = i1 - i0,
        t,
        i;

    while (m) {
      i = Math.random() * m-- | 0;
      t = array[m + i0], array[m + i0] = array[i + i0], array[i + i0] = t;
    }

    return array;
  };

  d3.permute = function (array, indexes) {
    var i = indexes.length,
        permutes = new Array(i);

    while (i--) permutes[i] = array[indexes[i]];

    return permutes;
  };

  d3.pairs = function (array) {
    var i = 0,
        n = array.length - 1,
        p0,
        p1 = array[0],
        pairs = new Array(n < 0 ? 0 : n);

    while (i < n) pairs[i] = [p0 = p1, p1 = array[++i]];

    return pairs;
  };

  d3.transpose = function (matrix) {
    if (!(n = matrix.length)) return [];

    for (var i = -1, m = d3.min(matrix, d3_transposeLength), transpose = new Array(m); ++i < m;) {
      for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
        row[j] = matrix[j][i];
      }
    }

    return transpose;
  };

  function d3_transposeLength(d) {
    return d.length;
  }

  d3.zip = function () {
    return d3.transpose(arguments);
  };

  d3.keys = function (map) {
    var keys = [];

    for (var key in map) keys.push(key);

    return keys;
  };

  d3.values = function (map) {
    var values = [];

    for (var key in map) values.push(map[key]);

    return values;
  };

  d3.entries = function (map) {
    var entries = [];

    for (var key in map) entries.push({
      key: key,
      value: map[key]
    });

    return entries;
  };

  d3.merge = function (arrays) {
    var n = arrays.length,
        m,
        i = -1,
        j = 0,
        merged,
        array;

    while (++i < n) j += arrays[i].length;

    merged = new Array(j);

    while (--n >= 0) {
      array = arrays[n];
      m = array.length;

      while (--m >= 0) {
        merged[--j] = array[m];
      }
    }

    return merged;
  };

  var abs = Math.abs;

  d3.range = function (start, stop, step) {
    if (arguments.length < 3) {
      step = 1;

      if (arguments.length < 2) {
        stop = start;
        start = 0;
      }
    }

    if ((stop - start) / step === Infinity) throw new Error("infinite range");
    var range = [],
        k = d3_range_integerScale(abs(step)),
        i = -1,
        j;
    start *= k, stop *= k, step *= k;
    if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k);else while ((j = start + step * ++i) < stop) range.push(j / k);
    return range;
  };

  function d3_range_integerScale(x) {
    var k = 1;

    while (x * k % 1) k *= 10;

    return k;
  }

  function d3_class(ctor, properties) {
    for (var key in properties) {
      Object.defineProperty(ctor.prototype, key, {
        value: properties[key],
        enumerable: false
      });
    }
  }

  d3.map = function (object, f) {
    var map = new d3_Map();

    if (object instanceof d3_Map) {
      object.forEach(function (key, value) {
        map.set(key, value);
      });
    } else if (Array.isArray(object)) {
      var i = -1,
          n = object.length,
          o;
      if (arguments.length === 1) while (++i < n) map.set(i, object[i]);else while (++i < n) map.set(f.call(object, o = object[i], i), o);
    } else {
      for (var key in object) map.set(key, object[key]);
    }

    return map;
  };

  function d3_Map() {
    this._ = Object.create(null);
  }

  var d3_map_proto = "__proto__",
      d3_map_zero = "\x00";
  d3_class(d3_Map, {
    has: d3_map_has,
    get: function (key) {
      return this._[d3_map_escape(key)];
    },
    set: function (key, value) {
      return this._[d3_map_escape(key)] = value;
    },
    remove: d3_map_remove,
    keys: d3_map_keys,
    values: function () {
      var values = [];

      for (var key in this._) values.push(this._[key]);

      return values;
    },
    entries: function () {
      var entries = [];

      for (var key in this._) entries.push({
        key: d3_map_unescape(key),
        value: this._[key]
      });

      return entries;
    },
    size: d3_map_size,
    empty: d3_map_empty,
    forEach: function (f) {
      for (var key in this._) f.call(this, d3_map_unescape(key), this._[key]);
    }
  });

  function d3_map_escape(key) {
    return (key += "") === d3_map_proto || key[0] === d3_map_zero ? d3_map_zero + key : key;
  }

  function d3_map_unescape(key) {
    return (key += "")[0] === d3_map_zero ? key.slice(1) : key;
  }

  function d3_map_has(key) {
    return d3_map_escape(key) in this._;
  }

  function d3_map_remove(key) {
    return (key = d3_map_escape(key)) in this._ && delete this._[key];
  }

  function d3_map_keys() {
    var keys = [];

    for (var key in this._) keys.push(d3_map_unescape(key));

    return keys;
  }

  function d3_map_size() {
    var size = 0;

    for (var key in this._) ++size;

    return size;
  }

  function d3_map_empty() {
    for (var key in this._) return false;

    return true;
  }

  d3.nest = function () {
    var nest = {},
        keys = [],
        sortKeys = [],
        sortValues,
        rollup;

    function map(mapType, array, depth) {
      if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
      var i = -1,
          n = array.length,
          key = keys[depth++],
          keyValue,
          object,
          setter,
          valuesByKey = new d3_Map(),
          values;

      while (++i < n) {
        if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
          values.push(object);
        } else {
          valuesByKey.set(keyValue, [object]);
        }
      }

      if (mapType) {
        object = mapType();

        setter = function (keyValue, values) {
          object.set(keyValue, map(mapType, values, depth));
        };
      } else {
        object = {};

        setter = function (keyValue, values) {
          object[keyValue] = map(mapType, values, depth);
        };
      }

      valuesByKey.forEach(setter);
      return object;
    }

    function entries(map, depth) {
      if (depth >= keys.length) return map;
      var array = [],
          sortKey = sortKeys[depth++];
      map.forEach(function (key, keyMap) {
        array.push({
          key: key,
          values: entries(keyMap, depth)
        });
      });
      return sortKey ? array.sort(function (a, b) {
        return sortKey(a.key, b.key);
      }) : array;
    }

    nest.map = function (array, mapType) {
      return map(mapType, array, 0);
    };

    nest.entries = function (array) {
      return entries(map(d3.map, array, 0), 0);
    };

    nest.key = function (d) {
      keys.push(d);
      return nest;
    };

    nest.sortKeys = function (order) {
      sortKeys[keys.length - 1] = order;
      return nest;
    };

    nest.sortValues = function (order) {
      sortValues = order;
      return nest;
    };

    nest.rollup = function (f) {
      rollup = f;
      return nest;
    };

    return nest;
  };

  d3.set = function (array) {
    var set = new d3_Set();
    if (array) for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
    return set;
  };

  function d3_Set() {
    this._ = Object.create(null);
  }

  d3_class(d3_Set, {
    has: d3_map_has,
    add: function (key) {
      this._[d3_map_escape(key += "")] = true;
      return key;
    },
    remove: d3_map_remove,
    values: d3_map_keys,
    size: d3_map_size,
    empty: d3_map_empty,
    forEach: function (f) {
      for (var key in this._) f.call(this, d3_map_unescape(key));
    }
  });
  d3.behavior = {};

  function d3_identity(d) {
    return d;
  }

  d3.rebind = function (target, source) {
    var i = 1,
        n = arguments.length,
        method;

    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);

    return target;
  };

  function d3_rebind(target, source, method) {
    return function () {
      var value = method.apply(source, arguments);
      return value === source ? target : value;
    };
  }

  function d3_vendorSymbol(object, name) {
    if (name in object) return name;
    name = name.charAt(0).toUpperCase() + name.slice(1);

    for (var i = 0, n = d3_vendorPrefixes.length; i < n; ++i) {
      var prefixName = d3_vendorPrefixes[i] + name;
      if (prefixName in object) return prefixName;
    }
  }

  var d3_vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"];

  function d3_noop() {}

  d3.dispatch = function () {
    var dispatch = new d3_dispatch(),
        i = -1,
        n = arguments.length;

    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);

    return dispatch;
  };

  function d3_dispatch() {}

  d3_dispatch.prototype.on = function (type, listener) {
    var i = type.indexOf("."),
        name = "";

    if (i >= 0) {
      name = type.slice(i + 1);
      type = type.slice(0, i);
    }

    if (type) return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);

    if (arguments.length === 2) {
      if (listener == null) for (type in this) {
        if (this.hasOwnProperty(type)) this[type].on(name, null);
      }
      return this;
    }
  };

  function d3_dispatch_event(dispatch) {
    var listeners = [],
        listenerByName = new d3_Map();

    function event() {
      var z = listeners,
          i = -1,
          n = z.length,
          l;

      while (++i < n) if (l = z[i].on) l.apply(this, arguments);

      return dispatch;
    }

    event.on = function (name, listener) {
      var l = listenerByName.get(name),
          i;
      if (arguments.length < 2) return l && l.on;

      if (l) {
        l.on = null;
        listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
        listenerByName.remove(name);
      }

      if (listener) listeners.push(listenerByName.set(name, {
        on: listener
      }));
      return dispatch;
    };

    return event;
  }

  d3.event = null;

  function d3_eventPreventDefault() {
    d3.event.preventDefault();
  }

  function d3_eventSource() {
    var e = d3.event,
        s;

    while (s = e.sourceEvent) e = s;

    return e;
  }

  function d3_eventDispatch(target) {
    var dispatch = new d3_dispatch(),
        i = 0,
        n = arguments.length;

    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);

    dispatch.of = function (thiz, argumentz) {
      return function (e1) {
        try {
          var e0 = e1.sourceEvent = d3.event;
          e1.target = target;
          d3.event = e1;
          dispatch[e1.type].apply(thiz, argumentz);
        } finally {
          d3.event = e0;
        }
      };
    };

    return dispatch;
  }

  d3.requote = function (s) {
    return s.replace(d3_requote_re, "\\$&");
  };

  var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
  var d3_subclass = {}.__proto__ ? function (object, prototype) {
    object.__proto__ = prototype;
  } : function (object, prototype) {
    for (var property in prototype) object[property] = prototype[property];
  };

  function d3_selection(groups) {
    d3_subclass(groups, d3_selectionPrototype);
    return groups;
  }

  var d3_select = function (s, n) {
    return n.querySelector(s);
  },
      d3_selectAll = function (s, n) {
    return n.querySelectorAll(s);
  },
      d3_selectMatches = function (n, s) {
    var d3_selectMatcher = n.matches || n[d3_vendorSymbol(n, "matchesSelector")];

    d3_selectMatches = function (n, s) {
      return d3_selectMatcher.call(n, s);
    };

    return d3_selectMatches(n, s);
  };

  if (typeof Sizzle === "function") {
    d3_select = function (s, n) {
      return Sizzle(s, n)[0] || null;
    };

    d3_selectAll = Sizzle;
    d3_selectMatches = Sizzle.matchesSelector;
  }

  d3.selection = function () {
    return d3.select(d3_document.documentElement);
  };

  var d3_selectionPrototype = d3.selection.prototype = [];

  d3_selectionPrototype.select = function (selector) {
    var subgroups = [],
        subgroup,
        subnode,
        group,
        node;
    selector = d3_selection_selector(selector);

    for (var j = -1, m = this.length; ++j < m;) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;

      for (var i = -1, n = group.length; ++i < n;) {
        if (node = group[i]) {
          subgroup.push(subnode = selector.call(node, node.__data__, i, j));
          if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }

    return d3_selection(subgroups);
  };

  function d3_selection_selector(selector) {
    return typeof selector === "function" ? selector : function () {
      return d3_select(selector, this);
    };
  }

  d3_selectionPrototype.selectAll = function (selector) {
    var subgroups = [],
        subgroup,
        node;
    selector = d3_selection_selectorAll(selector);

    for (var j = -1, m = this.length; ++j < m;) {
      for (var group = this[j], i = -1, n = group.length; ++i < n;) {
        if (node = group[i]) {
          subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j)));
          subgroup.parentNode = node;
        }
      }
    }

    return d3_selection(subgroups);
  };

  function d3_selection_selectorAll(selector) {
    return typeof selector === "function" ? selector : function () {
      return d3_selectAll(selector, this);
    };
  }

  var d3_nsXhtml = "http://www.w3.org/1999/xhtml";
  var d3_nsPrefix = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: d3_nsXhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  d3.ns = {
    prefix: d3_nsPrefix,
    qualify: function (name) {
      var i = name.indexOf(":"),
          prefix = name;
      if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
      return d3_nsPrefix.hasOwnProperty(prefix) ? {
        space: d3_nsPrefix[prefix],
        local: name
      } : name;
    }
  };

  d3_selectionPrototype.attr = function (name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node();
        name = d3.ns.qualify(name);
        return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
      }

      for (value in name) this.each(d3_selection_attr(value, name[value]));

      return this;
    }

    return this.each(d3_selection_attr(name, value));
  };

  function d3_selection_attr(name, value) {
    name = d3.ns.qualify(name);

    function attrNull() {
      this.removeAttribute(name);
    }

    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }

    function attrConstant() {
      this.setAttribute(name, value);
    }

    function attrConstantNS() {
      this.setAttributeNS(name.space, name.local, value);
    }

    function attrFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttribute(name);else this.setAttribute(name, x);
    }

    function attrFunctionNS() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttributeNS(name.space, name.local);else this.setAttributeNS(name.space, name.local, x);
    }

    return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
  }

  function d3_collapse(s) {
    return s.trim().replace(/\s+/g, " ");
  }

  d3_selectionPrototype.classed = function (name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node(),
            n = (name = d3_selection_classes(name)).length,
            i = -1;

        if (value = node.classList) {
          while (++i < n) if (!value.contains(name[i])) return false;
        } else {
          value = node.getAttribute("class");

          while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
        }

        return true;
      }

      for (value in name) this.each(d3_selection_classed(value, name[value]));

      return this;
    }

    return this.each(d3_selection_classed(name, value));
  };

  function d3_selection_classedRe(name) {
    return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
  }

  function d3_selection_classes(name) {
    return (name + "").trim().split(/^|\s+/);
  }

  function d3_selection_classed(name, value) {
    name = d3_selection_classes(name).map(d3_selection_classedName);
    var n = name.length;

    function classedConstant() {
      var i = -1;

      while (++i < n) name[i](this, value);
    }

    function classedFunction() {
      var i = -1,
          x = value.apply(this, arguments);

      while (++i < n) name[i](this, x);
    }

    return typeof value === "function" ? classedFunction : classedConstant;
  }

  function d3_selection_classedName(name) {
    var re = d3_selection_classedRe(name);
    return function (node, value) {
      if (c = node.classList) return value ? c.add(name) : c.remove(name);
      var c = node.getAttribute("class") || "";

      if (value) {
        re.lastIndex = 0;
        if (!re.test(c)) node.setAttribute("class", d3_collapse(c + " " + name));
      } else {
        node.setAttribute("class", d3_collapse(c.replace(re, " ")));
      }
    };
  }

  d3_selectionPrototype.style = function (name, value, priority) {
    var n = arguments.length;

    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";

        for (priority in name) this.each(d3_selection_style(priority, name[priority], value));

        return this;
      }

      if (n < 2) {
        var node = this.node();
        return d3_window(node).getComputedStyle(node, null).getPropertyValue(name);
      }

      priority = "";
    }

    return this.each(d3_selection_style(name, value, priority));
  };

  function d3_selection_style(name, value, priority) {
    function styleNull() {
      this.style.removeProperty(name);
    }

    function styleConstant() {
      this.style.setProperty(name, value, priority);
    }

    function styleFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.style.removeProperty(name);else this.style.setProperty(name, x, priority);
    }

    return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
  }

  d3_selectionPrototype.property = function (name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") return this.node()[name];

      for (value in name) this.each(d3_selection_property(value, name[value]));

      return this;
    }

    return this.each(d3_selection_property(name, value));
  };

  function d3_selection_property(name, value) {
    function propertyNull() {
      delete this[name];
    }

    function propertyConstant() {
      this[name] = value;
    }

    function propertyFunction() {
      var x = value.apply(this, arguments);
      if (x == null) delete this[name];else this[name] = x;
    }

    return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant;
  }

  d3_selectionPrototype.text = function (value) {
    return arguments.length ? this.each(typeof value === "function" ? function () {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    } : value == null ? function () {
      this.textContent = "";
    } : function () {
      this.textContent = value;
    }) : this.node().textContent;
  };

  d3_selectionPrototype.html = function (value) {
    return arguments.length ? this.each(typeof value === "function" ? function () {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    } : value == null ? function () {
      this.innerHTML = "";
    } : function () {
      this.innerHTML = value;
    }) : this.node().innerHTML;
  };

  d3_selectionPrototype.append = function (name) {
    name = d3_selection_creator(name);
    return this.select(function () {
      return this.appendChild(name.apply(this, arguments));
    });
  };

  function d3_selection_creator(name) {
    function create() {
      var document = this.ownerDocument,
          namespace = this.namespaceURI;
      return namespace === d3_nsXhtml && document.documentElement.namespaceURI === d3_nsXhtml ? document.createElement(name) : document.createElementNS(namespace, name);
    }

    function createNS() {
      return this.ownerDocument.createElementNS(name.space, name.local);
    }

    return typeof name === "function" ? name : (name = d3.ns.qualify(name)).local ? createNS : create;
  }

  d3_selectionPrototype.insert = function (name, before) {
    name = d3_selection_creator(name);
    before = d3_selection_selector(before);
    return this.select(function () {
      return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null);
    });
  };

  d3_selectionPrototype.remove = function () {
    return this.each(d3_selectionRemove);
  };

  function d3_selectionRemove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  d3_selectionPrototype.data = function (value, key) {
    var i = -1,
        n = this.length,
        group,
        node;

    if (!arguments.length) {
      value = new Array(n = (group = this[0]).length);

      while (++i < n) {
        if (node = group[i]) {
          value[i] = node.__data__;
        }
      }

      return value;
    }

    function bind(group, groupData) {
      var i,
          n = group.length,
          m = groupData.length,
          n0 = Math.min(n, m),
          updateNodes = new Array(m),
          enterNodes = new Array(m),
          exitNodes = new Array(n),
          node,
          nodeData;

      if (key) {
        var nodeByKeyValue = new d3_Map(),
            keyValues = new Array(n),
            keyValue;

        for (i = -1; ++i < n;) {
          if (node = group[i]) {
            if (nodeByKeyValue.has(keyValue = key.call(node, node.__data__, i))) {
              exitNodes[i] = node;
            } else {
              nodeByKeyValue.set(keyValue, node);
            }

            keyValues[i] = keyValue;
          }
        }

        for (i = -1; ++i < m;) {
          if (!(node = nodeByKeyValue.get(keyValue = key.call(groupData, nodeData = groupData[i], i)))) {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          } else if (node !== true) {
            updateNodes[i] = node;
            node.__data__ = nodeData;
          }

          nodeByKeyValue.set(keyValue, true);
        }

        for (i = -1; ++i < n;) {
          if (i in keyValues && nodeByKeyValue.get(keyValues[i]) !== true) {
            exitNodes[i] = group[i];
          }
        }
      } else {
        for (i = -1; ++i < n0;) {
          node = group[i];
          nodeData = groupData[i];

          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
          } else {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          }
        }

        for (; i < m; ++i) {
          enterNodes[i] = d3_selection_dataNode(groupData[i]);
        }

        for (; i < n; ++i) {
          exitNodes[i] = group[i];
        }
      }

      enterNodes.update = updateNodes;
      enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;
      enter.push(enterNodes);
      update.push(updateNodes);
      exit.push(exitNodes);
    }

    var enter = d3_selection_enter([]),
        update = d3_selection([]),
        exit = d3_selection([]);

    if (typeof value === "function") {
      while (++i < n) {
        bind(group = this[i], value.call(group, group.parentNode.__data__, i));
      }
    } else {
      while (++i < n) {
        bind(group = this[i], value);
      }
    }

    update.enter = function () {
      return enter;
    };

    update.exit = function () {
      return exit;
    };

    return update;
  };

  function d3_selection_dataNode(data) {
    return {
      __data__: data
    };
  }

  d3_selectionPrototype.datum = function (value) {
    return arguments.length ? this.property("__data__", value) : this.property("__data__");
  };

  d3_selectionPrototype.filter = function (filter) {
    var subgroups = [],
        subgroup,
        group,
        node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);

    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;

      for (var i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
          subgroup.push(node);
        }
      }
    }

    return d3_selection(subgroups);
  };

  function d3_selection_filter(selector) {
    return function () {
      return d3_selectMatches(this, selector);
    };
  }

  d3_selectionPrototype.order = function () {
    for (var j = -1, m = this.length; ++j < m;) {
      for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  };

  d3_selectionPrototype.sort = function (comparator) {
    comparator = d3_selection_sortComparator.apply(this, arguments);

    for (var j = -1, m = this.length; ++j < m;) this[j].sort(comparator);

    return this.order();
  };

  function d3_selection_sortComparator(comparator) {
    if (!arguments.length) comparator = d3_ascending;
    return function (a, b) {
      return a && b ? comparator(a.__data__, b.__data__) : !a - !b;
    };
  }

  d3_selectionPrototype.each = function (callback) {
    return d3_selection_each(this, function (node, i, j) {
      callback.call(node, node.__data__, i, j);
    });
  };

  function d3_selection_each(groups, callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
        if (node = group[i]) callback(node, i, j);
      }
    }

    return groups;
  }

  d3_selectionPrototype.call = function (callback) {
    var args = d3_array(arguments);
    callback.apply(args[0] = this, args);
    return this;
  };

  d3_selectionPrototype.empty = function () {
    return !this.node();
  };

  d3_selectionPrototype.node = function () {
    for (var j = 0, m = this.length; j < m; j++) {
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  };

  d3_selectionPrototype.size = function () {
    var n = 0;
    d3_selection_each(this, function () {
      ++n;
    });
    return n;
  };

  function d3_selection_enter(selection) {
    d3_subclass(selection, d3_selection_enterPrototype);
    return selection;
  }

  var d3_selection_enterPrototype = [];
  d3.selection.enter = d3_selection_enter;
  d3.selection.enter.prototype = d3_selection_enterPrototype;
  d3_selection_enterPrototype.append = d3_selectionPrototype.append;
  d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
  d3_selection_enterPrototype.node = d3_selectionPrototype.node;
  d3_selection_enterPrototype.call = d3_selectionPrototype.call;
  d3_selection_enterPrototype.size = d3_selectionPrototype.size;

  d3_selection_enterPrototype.select = function (selector) {
    var subgroups = [],
        subgroup,
        subnode,
        upgroup,
        group,
        node;

    for (var j = -1, m = this.length; ++j < m;) {
      upgroup = (group = this[j]).update;
      subgroups.push(subgroup = []);
      subgroup.parentNode = group.parentNode;

      for (var i = -1, n = group.length; ++i < n;) {
        if (node = group[i]) {
          subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
          subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }

    return d3_selection(subgroups);
  };

  d3_selection_enterPrototype.insert = function (name, before) {
    if (arguments.length < 2) before = d3_selection_enterInsertBefore(this);
    return d3_selectionPrototype.insert.call(this, name, before);
  };

  function d3_selection_enterInsertBefore(enter) {
    var i0, j0;
    return function (d, i, j) {
      var group = enter[j].update,
          n = group.length,
          node;
      if (j != j0) j0 = j, i0 = 0;
      if (i >= i0) i0 = i + 1;

      while (!(node = group[i0]) && ++i0 < n);

      return node;
    };
  }

  d3.select = function (node) {
    var group;

    if (typeof node === "string") {
      group = [d3_select(node, d3_document)];
      group.parentNode = d3_document.documentElement;
    } else {
      group = [node];
      group.parentNode = d3_documentElement(node);
    }

    return d3_selection([group]);
  };

  d3.selectAll = function (nodes) {
    var group;

    if (typeof nodes === "string") {
      group = d3_array(d3_selectAll(nodes, d3_document));
      group.parentNode = d3_document.documentElement;
    } else {
      group = d3_array(nodes);
      group.parentNode = null;
    }

    return d3_selection([group]);
  };

  d3_selectionPrototype.on = function (type, listener, capture) {
    var n = arguments.length;

    if (n < 3) {
      if (typeof type !== "string") {
        if (n < 2) listener = false;

        for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));

        return this;
      }

      if (n < 2) return (n = this.node()["__on" + type]) && n._;
      capture = false;
    }

    return this.each(d3_selection_on(type, listener, capture));
  };

  function d3_selection_on(type, listener, capture) {
    var name = "__on" + type,
        i = type.indexOf("."),
        wrap = d3_selection_onListener;
    if (i > 0) type = type.slice(0, i);
    var filter = d3_selection_onFilters.get(type);
    if (filter) type = filter, wrap = d3_selection_onFilter;

    function onRemove() {
      var l = this[name];

      if (l) {
        this.removeEventListener(type, l, l.$);
        delete this[name];
      }
    }

    function onAdd() {
      var l = wrap(listener, d3_array(arguments));
      onRemove.call(this);
      this.addEventListener(type, this[name] = l, l.$ = capture);
      l._ = listener;
    }

    function removeAll() {
      var re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$"),
          match;

      for (var name in this) {
        if (match = name.match(re)) {
          var l = this[name];
          this.removeEventListener(match[1], l, l.$);
          delete this[name];
        }
      }
    }

    return i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll;
  }

  var d3_selection_onFilters = d3.map({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  });

  if (d3_document) {
    d3_selection_onFilters.forEach(function (k) {
      if ("on" + k in d3_document) d3_selection_onFilters.remove(k);
    });
  }

  function d3_selection_onListener(listener, argumentz) {
    return function (e) {
      var o = d3.event;
      d3.event = e;
      argumentz[0] = this.__data__;

      try {
        listener.apply(this, argumentz);
      } finally {
        d3.event = o;
      }
    };
  }

  function d3_selection_onFilter(listener, argumentz) {
    var l = d3_selection_onListener(listener, argumentz);
    return function (e) {
      var target = this,
          related = e.relatedTarget;

      if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
        l.call(target, e);
      }
    };
  }

  var d3_event_dragSelect,
      d3_event_dragId = 0;

  function d3_event_dragSuppress(node) {
    var name = ".dragsuppress-" + ++d3_event_dragId,
        click = "click" + name,
        w = d3.select(d3_window(node)).on("touchmove" + name, d3_eventPreventDefault).on("dragstart" + name, d3_eventPreventDefault).on("selectstart" + name, d3_eventPreventDefault);

    if (d3_event_dragSelect == null) {
      d3_event_dragSelect = "onselectstart" in node ? false : d3_vendorSymbol(node.style, "userSelect");
    }

    if (d3_event_dragSelect) {
      var style = d3_documentElement(node).style,
          select = style[d3_event_dragSelect];
      style[d3_event_dragSelect] = "none";
    }

    return function (suppressClick) {
      w.on(name, null);
      if (d3_event_dragSelect) style[d3_event_dragSelect] = select;

      if (suppressClick) {
        var off = function () {
          w.on(click, null);
        };

        w.on(click, function () {
          d3_eventPreventDefault();
          off();
        }, true);
        setTimeout(off, 0);
      }
    };
  }

  d3.mouse = function (container) {
    return d3_mousePoint(container, d3_eventSource());
  };

  var d3_mouse_bug44083 = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;

  function d3_mousePoint(container, e) {
    if (e.changedTouches) e = e.changedTouches[0];
    var svg = container.ownerSVGElement || container;

    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();

      if (d3_mouse_bug44083 < 0) {
        var window = d3_window(container);

        if (window.scrollX || window.scrollY) {
          svg = d3.select("body").append("svg").style({
            position: "absolute",
            top: 0,
            left: 0,
            margin: 0,
            padding: 0,
            border: "none"
          }, "important");
          var ctm = svg[0][0].getScreenCTM();
          d3_mouse_bug44083 = !(ctm.f || ctm.e);
          svg.remove();
        }
      }

      if (d3_mouse_bug44083) point.x = e.pageX, point.y = e.pageY;else point.x = e.clientX, point.y = e.clientY;
      point = point.matrixTransform(container.getScreenCTM().inverse());
      return [point.x, point.y];
    }

    var rect = container.getBoundingClientRect();
    return [e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop];
  }

  d3.touch = function (container, touches, identifier) {
    if (arguments.length < 3) identifier = touches, touches = d3_eventSource().changedTouches;
    if (touches) for (var i = 0, n = touches.length, touch; i < n; ++i) {
      if ((touch = touches[i]).identifier === identifier) {
        return d3_mousePoint(container, touch);
      }
    }
  };

  d3.behavior.drag = function () {
    var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"),
        origin = null,
        mousedown = dragstart(d3_noop, d3.mouse, d3_window, "mousemove", "mouseup"),
        touchstart = dragstart(d3_behavior_dragTouchId, d3.touch, d3_identity, "touchmove", "touchend");

    function drag() {
      this.on("mousedown.drag", mousedown).on("touchstart.drag", touchstart);
    }

    function dragstart(id, position, subject, move, end) {
      return function () {
        var that = this,
            target = d3.event.target.correspondingElement || d3.event.target,
            parent = that.parentNode,
            dispatch = event.of(that, arguments),
            dragged = 0,
            dragId = id(),
            dragName = ".drag" + (dragId == null ? "" : "-" + dragId),
            dragOffset,
            dragSubject = d3.select(subject(target)).on(move + dragName, moved).on(end + dragName, ended),
            dragRestore = d3_event_dragSuppress(target),
            position0 = position(parent, dragId);

        if (origin) {
          dragOffset = origin.apply(that, arguments);
          dragOffset = [dragOffset.x - position0[0], dragOffset.y - position0[1]];
        } else {
          dragOffset = [0, 0];
        }

        dispatch({
          type: "dragstart"
        });

        function moved() {
          var position1 = position(parent, dragId),
              dx,
              dy;
          if (!position1) return;
          dx = position1[0] - position0[0];
          dy = position1[1] - position0[1];
          dragged |= dx | dy;
          position0 = position1;
          dispatch({
            type: "drag",
            x: position1[0] + dragOffset[0],
            y: position1[1] + dragOffset[1],
            dx: dx,
            dy: dy
          });
        }

        function ended() {
          if (!position(parent, dragId)) return;
          dragSubject.on(move + dragName, null).on(end + dragName, null);
          dragRestore(dragged);
          dispatch({
            type: "dragend"
          });
        }
      };
    }

    drag.origin = function (x) {
      if (!arguments.length) return origin;
      origin = x;
      return drag;
    };

    return d3.rebind(drag, event, "on");
  };

  function d3_behavior_dragTouchId() {
    return d3.event.changedTouches[0].identifier;
  }

  d3.touches = function (container, touches) {
    if (arguments.length < 2) touches = d3_eventSource().touches;
    return touches ? d3_array(touches).map(function (touch) {
      var point = d3_mousePoint(container, touch);
      point.identifier = touch.identifier;
      return point;
    }) : [];
  };

  var ε = 1e-6,
      ε2 = ε * ε,
      π = Math.PI,
      τ = 2 * π,
      τε = τ - ε,
      halfπ = π / 2,
      d3_radians = π / 180,
      d3_degrees = 180 / π;

  function d3_sgn(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  }

  function d3_cross2d(a, b, c) {
    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  }

  function d3_acos(x) {
    return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
  }

  function d3_asin(x) {
    return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x);
  }

  function d3_sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }

  function d3_cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }

  function d3_tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }

  function d3_haversin(x) {
    return (x = Math.sin(x / 2)) * x;
  }

  var ρ = Math.SQRT2,
      ρ2 = 2,
      ρ4 = 4;

  d3.interpolateZoom = function (p0, p1) {
    var ux0 = p0[0],
        uy0 = p0[1],
        w0 = p0[2],
        ux1 = p1[0],
        uy1 = p1[1],
        w1 = p1[2],
        dx = ux1 - ux0,
        dy = uy1 - uy0,
        d2 = dx * dx + dy * dy,
        i,
        S;

    if (d2 < ε2) {
      S = Math.log(w1 / w0) / ρ;

      i = function (t) {
        return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(ρ * t * S)];
      };
    } else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + ρ4 * d2) / (2 * w0 * ρ2 * d1),
          b1 = (w1 * w1 - w0 * w0 - ρ4 * d2) / (2 * w1 * ρ2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / ρ;

      i = function (t) {
        var s = t * S,
            coshr0 = d3_cosh(r0),
            u = w0 / (ρ2 * d1) * (coshr0 * d3_tanh(ρ * s + r0) - d3_sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / d3_cosh(ρ * s + r0)];
      };
    }

    i.duration = S * 1e3;
    return i;
  };

  d3.behavior.zoom = function () {
    var view = {
      x: 0,
      y: 0,
      k: 1
    },
        translate0,
        center0,
        center,
        size = [960, 500],
        scaleExtent = d3_behavior_zoomInfinity,
        duration = 250,
        zooming = 0,
        mousedown = "mousedown.zoom",
        mousemove = "mousemove.zoom",
        mouseup = "mouseup.zoom",
        mousewheelTimer,
        touchstart = "touchstart.zoom",
        touchtime,
        event = d3_eventDispatch(zoom, "zoomstart", "zoom", "zoomend"),
        x0,
        x1,
        y0,
        y1;

    if (!d3_behavior_zoomWheel) {
      d3_behavior_zoomWheel = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function () {
        return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1);
      }, "wheel") : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function () {
        return d3.event.wheelDelta;
      }, "mousewheel") : (d3_behavior_zoomDelta = function () {
        return -d3.event.detail;
      }, "MozMousePixelScroll");
    }

    function zoom(g) {
      g.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + ".zoom", mousewheeled).on("dblclick.zoom", dblclicked).on(touchstart, touchstarted);
    }

    zoom.event = function (g) {
      g.each(function () {
        var dispatch = event.of(this, arguments),
            view1 = view;

        if (d3_transitionInheritId) {
          d3.select(this).transition().each("start.zoom", function () {
            view = this.__chart__ || {
              x: 0,
              y: 0,
              k: 1
            };
            zoomstarted(dispatch);
          }).tween("zoom:zoom", function () {
            var dx = size[0],
                dy = size[1],
                cx = center0 ? center0[0] : dx / 2,
                cy = center0 ? center0[1] : dy / 2,
                i = d3.interpolateZoom([(cx - view.x) / view.k, (cy - view.y) / view.k, dx / view.k], [(cx - view1.x) / view1.k, (cy - view1.y) / view1.k, dx / view1.k]);
            return function (t) {
              var l = i(t),
                  k = dx / l[2];
              this.__chart__ = view = {
                x: cx - l[0] * k,
                y: cy - l[1] * k,
                k: k
              };
              zoomed(dispatch);
            };
          }).each("interrupt.zoom", function () {
            zoomended(dispatch);
          }).each("end.zoom", function () {
            zoomended(dispatch);
          });
        } else {
          this.__chart__ = view;
          zoomstarted(dispatch);
          zoomed(dispatch);
          zoomended(dispatch);
        }
      });
    };

    zoom.translate = function (_) {
      if (!arguments.length) return [view.x, view.y];
      view = {
        x: +_[0],
        y: +_[1],
        k: view.k
      };
      rescale();
      return zoom;
    };

    zoom.scale = function (_) {
      if (!arguments.length) return view.k;
      view = {
        x: view.x,
        y: view.y,
        k: null
      };
      scaleTo(+_);
      rescale();
      return zoom;
    };

    zoom.scaleExtent = function (_) {
      if (!arguments.length) return scaleExtent;
      scaleExtent = _ == null ? d3_behavior_zoomInfinity : [+_[0], +_[1]];
      return zoom;
    };

    zoom.center = function (_) {
      if (!arguments.length) return center;
      center = _ && [+_[0], +_[1]];
      return zoom;
    };

    zoom.size = function (_) {
      if (!arguments.length) return size;
      size = _ && [+_[0], +_[1]];
      return zoom;
    };

    zoom.duration = function (_) {
      if (!arguments.length) return duration;
      duration = +_;
      return zoom;
    };

    zoom.x = function (z) {
      if (!arguments.length) return x1;
      x1 = z;
      x0 = z.copy();
      view = {
        x: 0,
        y: 0,
        k: 1
      };
      return zoom;
    };

    zoom.y = function (z) {
      if (!arguments.length) return y1;
      y1 = z;
      y0 = z.copy();
      view = {
        x: 0,
        y: 0,
        k: 1
      };
      return zoom;
    };

    function location(p) {
      return [(p[0] - view.x) / view.k, (p[1] - view.y) / view.k];
    }

    function point(l) {
      return [l[0] * view.k + view.x, l[1] * view.k + view.y];
    }

    function scaleTo(s) {
      view.k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
    }

    function translateTo(p, l) {
      l = point(l);
      view.x += p[0] - l[0];
      view.y += p[1] - l[1];
    }

    function zoomTo(that, p, l, k) {
      that.__chart__ = {
        x: view.x,
        y: view.y,
        k: view.k
      };
      scaleTo(Math.pow(2, k));
      translateTo(center0 = p, l);
      that = d3.select(that);
      if (duration > 0) that = that.transition().duration(duration);
      that.call(zoom.event);
    }

    function rescale() {
      if (x1) x1.domain(x0.range().map(function (x) {
        return (x - view.x) / view.k;
      }).map(x0.invert));
      if (y1) y1.domain(y0.range().map(function (y) {
        return (y - view.y) / view.k;
      }).map(y0.invert));
    }

    function zoomstarted(dispatch) {
      if (!zooming++) dispatch({
        type: "zoomstart"
      });
    }

    function zoomed(dispatch) {
      rescale();
      dispatch({
        type: "zoom",
        scale: view.k,
        translate: [view.x, view.y]
      });
    }

    function zoomended(dispatch) {
      if (! --zooming) dispatch({
        type: "zoomend"
      }), center0 = null;
    }

    function mousedowned() {
      var that = this,
          dispatch = event.of(that, arguments),
          dragged = 0,
          subject = d3.select(d3_window(that)).on(mousemove, moved).on(mouseup, ended),
          location0 = location(d3.mouse(that)),
          dragRestore = d3_event_dragSuppress(that);
      d3_selection_interrupt.call(that);
      zoomstarted(dispatch);

      function moved() {
        dragged = 1;
        translateTo(d3.mouse(that), location0);
        zoomed(dispatch);
      }

      function ended() {
        subject.on(mousemove, null).on(mouseup, null);
        dragRestore(dragged);
        zoomended(dispatch);
      }
    }

    function touchstarted() {
      var that = this,
          dispatch = event.of(that, arguments),
          locations0 = {},
          distance0 = 0,
          scale0,
          zoomName = ".zoom-" + d3.event.changedTouches[0].identifier,
          touchmove = "touchmove" + zoomName,
          touchend = "touchend" + zoomName,
          targets = [],
          subject = d3.select(that),
          dragRestore = d3_event_dragSuppress(that);
      started();
      zoomstarted(dispatch);
      subject.on(mousedown, null).on(touchstart, started);

      function relocate() {
        var touches = d3.touches(that);
        scale0 = view.k;
        touches.forEach(function (t) {
          if (t.identifier in locations0) locations0[t.identifier] = location(t);
        });
        return touches;
      }

      function started() {
        var target = d3.event.target;
        d3.select(target).on(touchmove, moved).on(touchend, ended);
        targets.push(target);
        var changed = d3.event.changedTouches;

        for (var i = 0, n = changed.length; i < n; ++i) {
          locations0[changed[i].identifier] = null;
        }

        var touches = relocate(),
            now = Date.now();

        if (touches.length === 1) {
          if (now - touchtime < 500) {
            var p = touches[0];
            zoomTo(that, p, locations0[p.identifier], Math.floor(Math.log(view.k) / Math.LN2) + 1);
            d3_eventPreventDefault();
          }

          touchtime = now;
        } else if (touches.length > 1) {
          var p = touches[0],
              q = touches[1],
              dx = p[0] - q[0],
              dy = p[1] - q[1];
          distance0 = dx * dx + dy * dy;
        }
      }

      function moved() {
        var touches = d3.touches(that),
            p0,
            l0,
            p1,
            l1;
        d3_selection_interrupt.call(that);

        for (var i = 0, n = touches.length; i < n; ++i, l1 = null) {
          p1 = touches[i];

          if (l1 = locations0[p1.identifier]) {
            if (l0) break;
            p0 = p1, l0 = l1;
          }
        }

        if (l1) {
          var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1,
              scale1 = distance0 && Math.sqrt(distance1 / distance0);
          p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
          l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
          scaleTo(scale1 * scale0);
        }

        touchtime = null;
        translateTo(p0, l0);
        zoomed(dispatch);
      }

      function ended() {
        if (d3.event.touches.length) {
          var changed = d3.event.changedTouches;

          for (var i = 0, n = changed.length; i < n; ++i) {
            delete locations0[changed[i].identifier];
          }

          for (var identifier in locations0) {
            return void relocate();
          }
        }

        d3.selectAll(targets).on(zoomName, null);
        subject.on(mousedown, mousedowned).on(touchstart, touchstarted);
        dragRestore();
        zoomended(dispatch);
      }
    }

    function mousewheeled() {
      var dispatch = event.of(this, arguments);
      if (mousewheelTimer) clearTimeout(mousewheelTimer);else d3_selection_interrupt.call(this), translate0 = location(center0 = center || d3.mouse(this)), zoomstarted(dispatch);
      mousewheelTimer = setTimeout(function () {
        mousewheelTimer = null;
        zoomended(dispatch);
      }, 50);
      d3_eventPreventDefault();
      scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * view.k);
      translateTo(center0, translate0);
      zoomed(dispatch);
    }

    function dblclicked() {
      var p = d3.mouse(this),
          k = Math.log(view.k) / Math.LN2;
      zoomTo(this, p, location(p), d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1);
    }

    return d3.rebind(zoom, event, "on");
  };

  var d3_behavior_zoomInfinity = [0, Infinity],
      d3_behavior_zoomDelta,
      d3_behavior_zoomWheel;
  d3.color = d3_color;

  function d3_color() {}

  d3_color.prototype.toString = function () {
    return this.rgb() + "";
  };

  d3.hsl = d3_hsl;

  function d3_hsl(h, s, l) {
    return this instanceof d3_hsl ? void (this.h = +h, this.s = +s, this.l = +l) : arguments.length < 2 ? h instanceof d3_hsl ? new d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : new d3_hsl(h, s, l);
  }

  var d3_hslPrototype = d3_hsl.prototype = new d3_color();

  d3_hslPrototype.brighter = function (k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return new d3_hsl(this.h, this.s, this.l / k);
  };

  d3_hslPrototype.darker = function (k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return new d3_hsl(this.h, this.s, k * this.l);
  };

  d3_hslPrototype.rgb = function () {
    return d3_hsl_rgb(this.h, this.s, this.l);
  };

  function d3_hsl_rgb(h, s, l) {
    var m1, m2;
    h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
    s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
    l = l < 0 ? 0 : l > 1 ? 1 : l;
    m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;

    function v(h) {
      if (h > 360) h -= 360;else if (h < 0) h += 360;
      if (h < 60) return m1 + (m2 - m1) * h / 60;
      if (h < 180) return m2;
      if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
      return m1;
    }

    function vv(h) {
      return Math.round(v(h) * 255);
    }

    return new d3_rgb(vv(h + 120), vv(h), vv(h - 120));
  }

  d3.hcl = d3_hcl;

  function d3_hcl(h, c, l) {
    return this instanceof d3_hcl ? void (this.h = +h, this.c = +c, this.l = +l) : arguments.length < 2 ? h instanceof d3_hcl ? new d3_hcl(h.h, h.c, h.l) : h instanceof d3_lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : new d3_hcl(h, c, l);
  }

  var d3_hclPrototype = d3_hcl.prototype = new d3_color();

  d3_hclPrototype.brighter = function (k) {
    return new d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
  };

  d3_hclPrototype.darker = function (k) {
    return new d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
  };

  d3_hclPrototype.rgb = function () {
    return d3_hcl_lab(this.h, this.c, this.l).rgb();
  };

  function d3_hcl_lab(h, c, l) {
    if (isNaN(h)) h = 0;
    if (isNaN(c)) c = 0;
    return new d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
  }

  d3.lab = d3_lab;

  function d3_lab(l, a, b) {
    return this instanceof d3_lab ? void (this.l = +l, this.a = +a, this.b = +b) : arguments.length < 2 ? l instanceof d3_lab ? new d3_lab(l.l, l.a, l.b) : l instanceof d3_hcl ? d3_hcl_lab(l.h, l.c, l.l) : d3_rgb_lab((l = d3_rgb(l)).r, l.g, l.b) : new d3_lab(l, a, b);
  }

  var d3_lab_K = 18;
  var d3_lab_X = .95047,
      d3_lab_Y = 1,
      d3_lab_Z = 1.08883;
  var d3_labPrototype = d3_lab.prototype = new d3_color();

  d3_labPrototype.brighter = function (k) {
    return new d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };

  d3_labPrototype.darker = function (k) {
    return new d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };

  d3_labPrototype.rgb = function () {
    return d3_lab_rgb(this.l, this.a, this.b);
  };

  function d3_lab_rgb(l, a, b) {
    var y = (l + 16) / 116,
        x = y + a / 500,
        z = y - b / 200;
    x = d3_lab_xyz(x) * d3_lab_X;
    y = d3_lab_xyz(y) * d3_lab_Y;
    z = d3_lab_xyz(z) * d3_lab_Z;
    return new d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z));
  }

  function d3_lab_hcl(l, a, b) {
    return l > 0 ? new d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l) : new d3_hcl(NaN, NaN, l);
  }

  function d3_lab_xyz(x) {
    return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
  }

  function d3_xyz_lab(x) {
    return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
  }

  function d3_xyz_rgb(r) {
    return Math.round(255 * (r <= .00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055));
  }

  d3.rgb = d3_rgb;

  function d3_rgb(r, g, b) {
    return this instanceof d3_rgb ? void (this.r = ~~r, this.g = ~~g, this.b = ~~b) : arguments.length < 2 ? r instanceof d3_rgb ? new d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : new d3_rgb(r, g, b);
  }

  function d3_rgbNumber(value) {
    return new d3_rgb(value >> 16, value >> 8 & 255, value & 255);
  }

  function d3_rgbString(value) {
    return d3_rgbNumber(value) + "";
  }

  var d3_rgbPrototype = d3_rgb.prototype = new d3_color();

  d3_rgbPrototype.brighter = function (k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    var r = this.r,
        g = this.g,
        b = this.b,
        i = 30;
    if (!r && !g && !b) return new d3_rgb(i, i, i);
    if (r && r < i) r = i;
    if (g && g < i) g = i;
    if (b && b < i) b = i;
    return new d3_rgb(Math.min(255, r / k), Math.min(255, g / k), Math.min(255, b / k));
  };

  d3_rgbPrototype.darker = function (k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return new d3_rgb(k * this.r, k * this.g, k * this.b);
  };

  d3_rgbPrototype.hsl = function () {
    return d3_rgb_hsl(this.r, this.g, this.b);
  };

  d3_rgbPrototype.toString = function () {
    return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
  };

  function d3_rgb_hex(v) {
    return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
  }

  function d3_rgb_parse(format, rgb, hsl) {
    var r = 0,
        g = 0,
        b = 0,
        m1,
        m2,
        color;
    m1 = /([a-z]+)\((.*)\)/.exec(format = format.toLowerCase());

    if (m1) {
      m2 = m1[2].split(",");

      switch (m1[1]) {
        case "hsl":
          {
            return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
          }

        case "rgb":
          {
            return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
          }
      }
    }

    if (color = d3_rgb_names.get(format)) {
      return rgb(color.r, color.g, color.b);
    }

    if (format != null && format.charAt(0) === "#" && !isNaN(color = parseInt(format.slice(1), 16))) {
      if (format.length === 4) {
        r = (color & 3840) >> 4;
        r = r >> 4 | r;
        g = color & 240;
        g = g >> 4 | g;
        b = color & 15;
        b = b << 4 | b;
      } else if (format.length === 7) {
        r = (color & 16711680) >> 16;
        g = (color & 65280) >> 8;
        b = color & 255;
      }
    }

    return rgb(r, g, b);
  }

  function d3_rgb_hsl(r, g, b) {
    var min = Math.min(r /= 255, g /= 255, b /= 255),
        max = Math.max(r, g, b),
        d = max - min,
        h,
        s,
        l = (max + min) / 2;

    if (d) {
      s = l < .5 ? d / (max + min) : d / (2 - max - min);
      if (r == max) h = (g - b) / d + (g < b ? 6 : 0);else if (g == max) h = (b - r) / d + 2;else h = (r - g) / d + 4;
      h *= 60;
    } else {
      h = NaN;
      s = l > 0 && l < 1 ? 0 : h;
    }

    return new d3_hsl(h, s, l);
  }

  function d3_rgb_lab(r, g, b) {
    r = d3_rgb_xyz(r);
    g = d3_rgb_xyz(g);
    b = d3_rgb_xyz(b);
    var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X),
        y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y),
        z = d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z);
    return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
  }

  function d3_rgb_xyz(r) {
    return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
  }

  function d3_rgb_parseNumber(c) {
    var f = parseFloat(c);
    return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
  }

  var d3_rgb_names = d3.map({
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  });
  d3_rgb_names.forEach(function (key, value) {
    d3_rgb_names.set(key, d3_rgbNumber(value));
  });

  function d3_functor(v) {
    return typeof v === "function" ? v : function () {
      return v;
    };
  }

  d3.functor = d3_functor;
  d3.xhr = d3_xhrType(d3_identity);

  function d3_xhrType(response) {
    return function (url, mimeType, callback) {
      if (arguments.length === 2 && typeof mimeType === "function") callback = mimeType, mimeType = null;
      return d3_xhr(url, mimeType, response, callback);
    };
  }

  function d3_xhr(url, mimeType, response, callback) {
    var xhr = {},
        dispatch = d3.dispatch("beforesend", "progress", "load", "error"),
        headers = {},
        request = new XMLHttpRequest(),
        responseType = null;
    if (this.XDomainRequest && !("withCredentials" in request) && /^(http(s)?:)?\/\//.test(url)) request = new XDomainRequest();
    "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function () {
      request.readyState > 3 && respond();
    };

    function respond() {
      var status = request.status,
          result;

      if (!status && d3_xhrHasResponse(request) || status >= 200 && status < 300 || status === 304) {
        try {
          result = response.call(xhr, request);
        } catch (e) {
          dispatch.error.call(xhr, e);
          return;
        }

        dispatch.load.call(xhr, result);
      } else {
        dispatch.error.call(xhr, request);
      }
    }

    request.onprogress = function (event) {
      var o = d3.event;
      d3.event = event;

      try {
        dispatch.progress.call(xhr, request);
      } finally {
        d3.event = o;
      }
    };

    xhr.header = function (name, value) {
      name = (name + "").toLowerCase();
      if (arguments.length < 2) return headers[name];
      if (value == null) delete headers[name];else headers[name] = value + "";
      return xhr;
    };

    xhr.mimeType = function (value) {
      if (!arguments.length) return mimeType;
      mimeType = value == null ? null : value + "";
      return xhr;
    };

    xhr.responseType = function (value) {
      if (!arguments.length) return responseType;
      responseType = value;
      return xhr;
    };

    xhr.response = function (value) {
      response = value;
      return xhr;
    };

    ["get", "post"].forEach(function (method) {
      xhr[method] = function () {
        return xhr.send.apply(xhr, [method].concat(d3_array(arguments)));
      };
    });

    xhr.send = function (method, data, callback) {
      if (arguments.length === 2 && typeof data === "function") callback = data, data = null;
      request.open(method, url, true);
      if (mimeType != null && !("accept" in headers)) headers["accept"] = mimeType + ",*/*";
      if (request.setRequestHeader) for (var name in headers) request.setRequestHeader(name, headers[name]);
      if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
      if (responseType != null) request.responseType = responseType;
      if (callback != null) xhr.on("error", callback).on("load", function (request) {
        callback(null, request);
      });
      dispatch.beforesend.call(xhr, request);
      request.send(data == null ? null : data);
      return xhr;
    };

    xhr.abort = function () {
      request.abort();
      return xhr;
    };

    d3.rebind(xhr, dispatch, "on");
    return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
  }

  function d3_xhr_fixCallback(callback) {
    return callback.length === 1 ? function (error, request) {
      callback(error == null ? request : null);
    } : callback;
  }

  function d3_xhrHasResponse(request) {
    var type = request.responseType;
    return type && type !== "text" ? request.response : request.responseText;
  }

  d3.dsv = function (delimiter, mimeType) {
    var reFormat = new RegExp('["' + delimiter + "\n]"),
        delimiterCode = delimiter.charCodeAt(0);

    function dsv(url, row, callback) {
      if (arguments.length < 3) callback = row, row = null;
      var xhr = d3_xhr(url, mimeType, row == null ? response : typedResponse(row), callback);

      xhr.row = function (_) {
        return arguments.length ? xhr.response((row = _) == null ? response : typedResponse(_)) : row;
      };

      return xhr;
    }

    function response(request) {
      return dsv.parse(request.responseText);
    }

    function typedResponse(f) {
      return function (request) {
        return dsv.parse(request.responseText, f);
      };
    }

    dsv.parse = function (text, f) {
      var o;
      return dsv.parseRows(text, function (row, i) {
        if (o) return o(row, i - 1);
        var a = new Function("d", "return {" + row.map(function (name, i) {
          return JSON.stringify(name) + ": d[" + i + "]";
        }).join(",") + "}");
        o = f ? function (row, i) {
          return f(a(row), i);
        } : a;
      });
    };

    dsv.parseRows = function (text, f) {
      var EOL = {},
          EOF = {},
          rows = [],
          N = text.length,
          I = 0,
          n = 0,
          t,
          eol;

      function token() {
        if (I >= N) return EOF;
        if (eol) return eol = false, EOL;
        var j = I;

        if (text.charCodeAt(j) === 34) {
          var i = j;

          while (i++ < N) {
            if (text.charCodeAt(i) === 34) {
              if (text.charCodeAt(i + 1) !== 34) break;
              ++i;
            }
          }

          I = i + 2;
          var c = text.charCodeAt(i + 1);

          if (c === 13) {
            eol = true;
            if (text.charCodeAt(i + 2) === 10) ++I;
          } else if (c === 10) {
            eol = true;
          }

          return text.slice(j + 1, i).replace(/""/g, '"');
        }

        while (I < N) {
          var c = text.charCodeAt(I++),
              k = 1;
          if (c === 10) eol = true;else if (c === 13) {
            eol = true;
            if (text.charCodeAt(I) === 10) ++I, ++k;
          } else if (c !== delimiterCode) continue;
          return text.slice(j, I - k);
        }

        return text.slice(j);
      }

      while ((t = token()) !== EOF) {
        var a = [];

        while (t !== EOL && t !== EOF) {
          a.push(t);
          t = token();
        }

        if (f && (a = f(a, n++)) == null) continue;
        rows.push(a);
      }

      return rows;
    };

    dsv.format = function (rows) {
      if (Array.isArray(rows[0])) return dsv.formatRows(rows);
      var fieldSet = new d3_Set(),
          fields = [];
      rows.forEach(function (row) {
        for (var field in row) {
          if (!fieldSet.has(field)) {
            fields.push(fieldSet.add(field));
          }
        }
      });
      return [fields.map(formatValue).join(delimiter)].concat(rows.map(function (row) {
        return fields.map(function (field) {
          return formatValue(row[field]);
        }).join(delimiter);
      })).join("\n");
    };

    dsv.formatRows = function (rows) {
      return rows.map(formatRow).join("\n");
    };

    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }

    function formatValue(text) {
      return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
    }

    return dsv;
  };

  d3.csv = d3.dsv(",", "text/csv");
  d3.tsv = d3.dsv("	", "text/tab-separated-values");

  var d3_timer_queueHead,
      d3_timer_queueTail,
      d3_timer_interval,
      d3_timer_timeout,
      d3_timer_frame = this[d3_vendorSymbol(this, "requestAnimationFrame")] || function (callback) {
    setTimeout(callback, 17);
  };

  d3.timer = function () {
    d3_timer.apply(this, arguments);
  };

  function d3_timer(callback, delay, then) {
    var n = arguments.length;
    if (n < 2) delay = 0;
    if (n < 3) then = Date.now();
    var time = then + delay,
        timer = {
      c: callback,
      t: time,
      n: null
    };
    if (d3_timer_queueTail) d3_timer_queueTail.n = timer;else d3_timer_queueHead = timer;
    d3_timer_queueTail = timer;

    if (!d3_timer_interval) {
      d3_timer_timeout = clearTimeout(d3_timer_timeout);
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }

    return timer;
  }

  function d3_timer_step() {
    var now = d3_timer_mark(),
        delay = d3_timer_sweep() - now;

    if (delay > 24) {
      if (isFinite(delay)) {
        clearTimeout(d3_timer_timeout);
        d3_timer_timeout = setTimeout(d3_timer_step, delay);
      }

      d3_timer_interval = 0;
    } else {
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
  }

  d3.timer.flush = function () {
    d3_timer_mark();
    d3_timer_sweep();
  };

  function d3_timer_mark() {
    var now = Date.now(),
        timer = d3_timer_queueHead;

    while (timer) {
      if (now >= timer.t && timer.c(now - timer.t)) timer.c = null;
      timer = timer.n;
    }

    return now;
  }

  function d3_timer_sweep() {
    var t0,
        t1 = d3_timer_queueHead,
        time = Infinity;

    while (t1) {
      if (t1.c) {
        if (t1.t < time) time = t1.t;
        t1 = (t0 = t1).n;
      } else {
        t1 = t0 ? t0.n = t1.n : d3_timer_queueHead = t1.n;
      }
    }

    d3_timer_queueTail = t0;
    return time;
  }

  function d3_format_precision(x, p) {
    return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1);
  }

  d3.round = function (x, n) {
    return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
  };

  var d3_formatPrefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(d3_formatPrefix);

  d3.formatPrefix = function (value, precision) {
    var i = 0;

    if (value = +value) {
      if (value < 0) value *= -1;
      if (precision) value = d3.round(value, d3_format_precision(value, precision));
      i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
      i = Math.max(-24, Math.min(24, Math.floor((i - 1) / 3) * 3));
    }

    return d3_formatPrefixes[8 + i / 3];
  };

  function d3_formatPrefix(d, i) {
    var k = Math.pow(10, abs(8 - i) * 3);
    return {
      scale: i > 8 ? function (d) {
        return d / k;
      } : function (d) {
        return d * k;
      },
      symbol: d
    };
  }

  function d3_locale_numberFormat(locale) {
    var locale_decimal = locale.decimal,
        locale_thousands = locale.thousands,
        locale_grouping = locale.grouping,
        locale_currency = locale.currency,
        formatGroup = locale_grouping && locale_thousands ? function (value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = locale_grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = locale_grouping[j = (j + 1) % locale_grouping.length];
      }

      return t.reverse().join(locale_thousands);
    } : d3_identity;
    return function (specifier) {
      var match = d3_format_re.exec(specifier),
          fill = match[1] || " ",
          align = match[2] || ">",
          sign = match[3] || "-",
          symbol = match[4] || "",
          zfill = match[5],
          width = +match[6],
          comma = match[7],
          precision = match[8],
          type = match[9],
          scale = 1,
          prefix = "",
          suffix = "",
          integer = false,
          exponent = true;
      if (precision) precision = +precision.substring(1);

      if (zfill || fill === "0" && align === "=") {
        zfill = fill = "0";
        align = "=";
      }

      switch (type) {
        case "n":
          comma = true;
          type = "g";
          break;

        case "%":
          scale = 100;
          suffix = "%";
          type = "f";
          break;

        case "p":
          scale = 100;
          suffix = "%";
          type = "r";
          break;

        case "b":
        case "o":
        case "x":
        case "X":
          if (symbol === "#") prefix = "0" + type.toLowerCase();

        case "c":
          exponent = false;

        case "d":
          integer = true;
          precision = 0;
          break;

        case "s":
          scale = -1;
          type = "r";
          break;
      }

      if (symbol === "$") prefix = locale_currency[0], suffix = locale_currency[1];
      if (type == "r" && !precision) type = "g";

      if (precision != null) {
        if (type == "g") precision = Math.max(1, Math.min(21, precision));else if (type == "e" || type == "f") precision = Math.max(0, Math.min(20, precision));
      }

      type = d3_format_types.get(type) || d3_format_typeDefault;
      var zcomma = zfill && comma;
      return function (value) {
        var fullSuffix = suffix;
        if (integer && value % 1) return "";
        var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign === "-" ? "" : sign;

        if (scale < 0) {
          var unit = d3.formatPrefix(value, precision);
          value = unit.scale(value);
          fullSuffix = unit.symbol + suffix;
        } else {
          value *= scale;
        }

        value = type(value, precision);
        var i = value.lastIndexOf("."),
            before,
            after;

        if (i < 0) {
          var j = exponent ? value.lastIndexOf("e") : -1;
          if (j < 0) before = value, after = "";else before = value.substring(0, j), after = value.substring(j);
        } else {
          before = value.substring(0, i);
          after = locale_decimal + value.substring(i + 1);
        }

        if (!zfill && comma) before = formatGroup(before, Infinity);
        var length = prefix.length + before.length + after.length + (zcomma ? 0 : negative.length),
            padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
        if (zcomma) before = formatGroup(padding + before, padding.length ? width - after.length : Infinity);
        negative += prefix;
        value = before + after;
        return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + fullSuffix;
      };
    };
  }

  var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i;
  var d3_format_types = d3.map({
    b: function (x) {
      return x.toString(2);
    },
    c: function (x) {
      return String.fromCharCode(x);
    },
    o: function (x) {
      return x.toString(8);
    },
    x: function (x) {
      return x.toString(16);
    },
    X: function (x) {
      return x.toString(16).toUpperCase();
    },
    g: function (x, p) {
      return x.toPrecision(p);
    },
    e: function (x, p) {
      return x.toExponential(p);
    },
    f: function (x, p) {
      return x.toFixed(p);
    },
    r: function (x, p) {
      return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))));
    }
  });

  function d3_format_typeDefault(x) {
    return x + "";
  }

  var d3_time = d3.time = {},
      d3_date = Date;

  function d3_date_utc() {
    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
  }

  d3_date_utc.prototype = {
    getDate: function () {
      return this._.getUTCDate();
    },
    getDay: function () {
      return this._.getUTCDay();
    },
    getFullYear: function () {
      return this._.getUTCFullYear();
    },
    getHours: function () {
      return this._.getUTCHours();
    },
    getMilliseconds: function () {
      return this._.getUTCMilliseconds();
    },
    getMinutes: function () {
      return this._.getUTCMinutes();
    },
    getMonth: function () {
      return this._.getUTCMonth();
    },
    getSeconds: function () {
      return this._.getUTCSeconds();
    },
    getTime: function () {
      return this._.getTime();
    },
    getTimezoneOffset: function () {
      return 0;
    },
    valueOf: function () {
      return this._.valueOf();
    },
    setDate: function () {
      d3_time_prototype.setUTCDate.apply(this._, arguments);
    },
    setDay: function () {
      d3_time_prototype.setUTCDay.apply(this._, arguments);
    },
    setFullYear: function () {
      d3_time_prototype.setUTCFullYear.apply(this._, arguments);
    },
    setHours: function () {
      d3_time_prototype.setUTCHours.apply(this._, arguments);
    },
    setMilliseconds: function () {
      d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
    },
    setMinutes: function () {
      d3_time_prototype.setUTCMinutes.apply(this._, arguments);
    },
    setMonth: function () {
      d3_time_prototype.setUTCMonth.apply(this._, arguments);
    },
    setSeconds: function () {
      d3_time_prototype.setUTCSeconds.apply(this._, arguments);
    },
    setTime: function () {
      d3_time_prototype.setTime.apply(this._, arguments);
    }
  };
  var d3_time_prototype = Date.prototype;

  function d3_time_interval(local, step, number) {
    function round(date) {
      var d0 = local(date),
          d1 = offset(d0, 1);
      return date - d0 < d1 - date ? d0 : d1;
    }

    function ceil(date) {
      step(date = local(new d3_date(date - 1)), 1);
      return date;
    }

    function offset(date, k) {
      step(date = new d3_date(+date), k);
      return date;
    }

    function range(t0, t1, dt) {
      var time = ceil(t0),
          times = [];

      if (dt > 1) {
        while (time < t1) {
          if (!(number(time) % dt)) times.push(new Date(+time));
          step(time, 1);
        }
      } else {
        while (time < t1) times.push(new Date(+time)), step(time, 1);
      }

      return times;
    }

    function range_utc(t0, t1, dt) {
      try {
        d3_date = d3_date_utc;
        var utc = new d3_date_utc();
        utc._ = t0;
        return range(utc, t1, dt);
      } finally {
        d3_date = Date;
      }
    }

    local.floor = local;
    local.round = round;
    local.ceil = ceil;
    local.offset = offset;
    local.range = range;
    var utc = local.utc = d3_time_interval_utc(local);
    utc.floor = utc;
    utc.round = d3_time_interval_utc(round);
    utc.ceil = d3_time_interval_utc(ceil);
    utc.offset = d3_time_interval_utc(offset);
    utc.range = range_utc;
    return local;
  }

  function d3_time_interval_utc(method) {
    return function (date, k) {
      try {
        d3_date = d3_date_utc;
        var utc = new d3_date_utc();
        utc._ = date;
        return method(utc, k)._;
      } finally {
        d3_date = Date;
      }
    };
  }

  d3_time.year = d3_time_interval(function (date) {
    date = d3_time.day(date);
    date.setMonth(0, 1);
    return date;
  }, function (date, offset) {
    date.setFullYear(date.getFullYear() + offset);
  }, function (date) {
    return date.getFullYear();
  });
  d3_time.years = d3_time.year.range;
  d3_time.years.utc = d3_time.year.utc.range;
  d3_time.day = d3_time_interval(function (date) {
    var day = new d3_date(2e3, 0);
    day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    return day;
  }, function (date, offset) {
    date.setDate(date.getDate() + offset);
  }, function (date) {
    return date.getDate() - 1;
  });
  d3_time.days = d3_time.day.range;
  d3_time.days.utc = d3_time.day.utc.range;

  d3_time.dayOfYear = function (date) {
    var year = d3_time.year(date);
    return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
  };

  ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function (day, i) {
    i = 7 - i;
    var interval = d3_time[day] = d3_time_interval(function (date) {
      (date = d3_time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
      return date;
    }, function (date, offset) {
      date.setDate(date.getDate() + Math.floor(offset) * 7);
    }, function (date) {
      var day = d3_time.year(date).getDay();
      return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
    });
    d3_time[day + "s"] = interval.range;
    d3_time[day + "s"].utc = interval.utc.range;

    d3_time[day + "OfYear"] = function (date) {
      var day = d3_time.year(date).getDay();
      return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7);
    };
  });
  d3_time.week = d3_time.sunday;
  d3_time.weeks = d3_time.sunday.range;
  d3_time.weeks.utc = d3_time.sunday.utc.range;
  d3_time.weekOfYear = d3_time.sundayOfYear;

  function d3_locale_timeFormat(locale) {
    var locale_dateTime = locale.dateTime,
        locale_date = locale.date,
        locale_time = locale.time,
        locale_periods = locale.periods,
        locale_days = locale.days,
        locale_shortDays = locale.shortDays,
        locale_months = locale.months,
        locale_shortMonths = locale.shortMonths;

    function d3_time_format(template) {
      var n = template.length;

      function format(date) {
        var string = [],
            i = -1,
            j = 0,
            c,
            p,
            f;

        while (++i < n) {
          if (template.charCodeAt(i) === 37) {
            string.push(template.slice(j, i));
            if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
            if (f = d3_time_formats[c]) c = f(date, p == null ? c === "e" ? " " : "0" : p);
            string.push(c);
            j = i + 1;
          }
        }

        string.push(template.slice(j, i));
        return string.join("");
      }

      format.parse = function (string) {
        var d = {
          y: 1900,
          m: 0,
          d: 1,
          H: 0,
          M: 0,
          S: 0,
          L: 0,
          Z: null
        },
            i = d3_time_parse(d, template, string, 0);
        if (i != string.length) return null;
        if ("p" in d) d.H = d.H % 12 + d.p * 12;
        var localZ = d.Z != null && d3_date !== d3_date_utc,
            date = new (localZ ? d3_date_utc : d3_date)();
        if ("j" in d) date.setFullYear(d.y, 0, d.j);else if ("W" in d || "U" in d) {
          if (!("w" in d)) d.w = "W" in d ? 1 : 0;
          date.setFullYear(d.y, 0, 1);
          date.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + d.W * 7 - (date.getDay() + 5) % 7 : d.w + d.U * 7 - (date.getDay() + 6) % 7);
        } else date.setFullYear(d.y, d.m, d.d);
        date.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L);
        return localZ ? date._ : date;
      };

      format.toString = function () {
        return template;
      };

      return format;
    }

    function d3_time_parse(date, template, string, j) {
      var c,
          p,
          t,
          i = 0,
          n = template.length,
          m = string.length;

      while (i < n) {
        if (j >= m) return -1;
        c = template.charCodeAt(i++);

        if (c === 37) {
          t = template.charAt(i++);
          p = d3_time_parsers[t in d3_time_formatPads ? template.charAt(i++) : t];
          if (!p || (j = p(date, string, j)) < 0) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }

      return j;
    }

    d3_time_format.utc = function (template) {
      var local = d3_time_format(template);

      function format(date) {
        try {
          d3_date = d3_date_utc;
          var utc = new d3_date();
          utc._ = date;
          return local(utc);
        } finally {
          d3_date = Date;
        }
      }

      format.parse = function (string) {
        try {
          d3_date = d3_date_utc;
          var date = local.parse(string);
          return date && date._;
        } finally {
          d3_date = Date;
        }
      };

      format.toString = local.toString;
      return format;
    };

    d3_time_format.multi = d3_time_format.utc.multi = d3_time_formatMulti;
    var d3_time_periodLookup = d3.map(),
        d3_time_dayRe = d3_time_formatRe(locale_days),
        d3_time_dayLookup = d3_time_formatLookup(locale_days),
        d3_time_dayAbbrevRe = d3_time_formatRe(locale_shortDays),
        d3_time_dayAbbrevLookup = d3_time_formatLookup(locale_shortDays),
        d3_time_monthRe = d3_time_formatRe(locale_months),
        d3_time_monthLookup = d3_time_formatLookup(locale_months),
        d3_time_monthAbbrevRe = d3_time_formatRe(locale_shortMonths),
        d3_time_monthAbbrevLookup = d3_time_formatLookup(locale_shortMonths);
    locale_periods.forEach(function (p, i) {
      d3_time_periodLookup.set(p.toLowerCase(), i);
    });
    var d3_time_formats = {
      a: function (d) {
        return locale_shortDays[d.getDay()];
      },
      A: function (d) {
        return locale_days[d.getDay()];
      },
      b: function (d) {
        return locale_shortMonths[d.getMonth()];
      },
      B: function (d) {
        return locale_months[d.getMonth()];
      },
      c: d3_time_format(locale_dateTime),
      d: function (d, p) {
        return d3_time_formatPad(d.getDate(), p, 2);
      },
      e: function (d, p) {
        return d3_time_formatPad(d.getDate(), p, 2);
      },
      H: function (d, p) {
        return d3_time_formatPad(d.getHours(), p, 2);
      },
      I: function (d, p) {
        return d3_time_formatPad(d.getHours() % 12 || 12, p, 2);
      },
      j: function (d, p) {
        return d3_time_formatPad(1 + d3_time.dayOfYear(d), p, 3);
      },
      L: function (d, p) {
        return d3_time_formatPad(d.getMilliseconds(), p, 3);
      },
      m: function (d, p) {
        return d3_time_formatPad(d.getMonth() + 1, p, 2);
      },
      M: function (d, p) {
        return d3_time_formatPad(d.getMinutes(), p, 2);
      },
      p: function (d) {
        return locale_periods[+(d.getHours() >= 12)];
      },
      S: function (d, p) {
        return d3_time_formatPad(d.getSeconds(), p, 2);
      },
      U: function (d, p) {
        return d3_time_formatPad(d3_time.sundayOfYear(d), p, 2);
      },
      w: function (d) {
        return d.getDay();
      },
      W: function (d, p) {
        return d3_time_formatPad(d3_time.mondayOfYear(d), p, 2);
      },
      x: d3_time_format(locale_date),
      X: d3_time_format(locale_time),
      y: function (d, p) {
        return d3_time_formatPad(d.getFullYear() % 100, p, 2);
      },
      Y: function (d, p) {
        return d3_time_formatPad(d.getFullYear() % 1e4, p, 4);
      },
      Z: d3_time_zone,
      "%": function () {
        return "%";
      }
    };
    var d3_time_parsers = {
      a: d3_time_parseWeekdayAbbrev,
      A: d3_time_parseWeekday,
      b: d3_time_parseMonthAbbrev,
      B: d3_time_parseMonth,
      c: d3_time_parseLocaleFull,
      d: d3_time_parseDay,
      e: d3_time_parseDay,
      H: d3_time_parseHour24,
      I: d3_time_parseHour24,
      j: d3_time_parseDayOfYear,
      L: d3_time_parseMilliseconds,
      m: d3_time_parseMonthNumber,
      M: d3_time_parseMinutes,
      p: d3_time_parseAmPm,
      S: d3_time_parseSeconds,
      U: d3_time_parseWeekNumberSunday,
      w: d3_time_parseWeekdayNumber,
      W: d3_time_parseWeekNumberMonday,
      x: d3_time_parseLocaleDate,
      X: d3_time_parseLocaleTime,
      y: d3_time_parseYear,
      Y: d3_time_parseFullYear,
      Z: d3_time_parseZone,
      "%": d3_time_parseLiteralPercent
    };

    function d3_time_parseWeekdayAbbrev(date, string, i) {
      d3_time_dayAbbrevRe.lastIndex = 0;
      var n = d3_time_dayAbbrevRe.exec(string.slice(i));
      return n ? (date.w = d3_time_dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function d3_time_parseWeekday(date, string, i) {
      d3_time_dayRe.lastIndex = 0;
      var n = d3_time_dayRe.exec(string.slice(i));
      return n ? (date.w = d3_time_dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function d3_time_parseMonthAbbrev(date, string, i) {
      d3_time_monthAbbrevRe.lastIndex = 0;
      var n = d3_time_monthAbbrevRe.exec(string.slice(i));
      return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function d3_time_parseMonth(date, string, i) {
      d3_time_monthRe.lastIndex = 0;
      var n = d3_time_monthRe.exec(string.slice(i));
      return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function d3_time_parseLocaleFull(date, string, i) {
      return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
    }

    function d3_time_parseLocaleDate(date, string, i) {
      return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
    }

    function d3_time_parseLocaleTime(date, string, i) {
      return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
    }

    function d3_time_parseAmPm(date, string, i) {
      var n = d3_time_periodLookup.get(string.slice(i, i += 2).toLowerCase());
      return n == null ? -1 : (date.p = n, i);
    }

    return d3_time_format;
  }

  var d3_time_formatPads = {
    "-": "",
    _: " ",
    "0": "0"
  },
      d3_time_numberRe = /^\s*\d+/,
      d3_time_percentRe = /^%/;

  function d3_time_formatPad(value, fill, width) {
    var sign = value < 0 ? "-" : "",
        string = (sign ? -value : value) + "",
        length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }

  function d3_time_formatRe(names) {
    return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i");
  }

  function d3_time_formatLookup(names) {
    var map = new d3_Map(),
        i = -1,
        n = names.length;

    while (++i < n) map.set(names[i].toLowerCase(), i);

    return map;
  }

  function d3_time_parseWeekdayNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 1));
    return n ? (date.w = +n[0], i + n[0].length) : -1;
  }

  function d3_time_parseWeekNumberSunday(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i));
    return n ? (date.U = +n[0], i + n[0].length) : -1;
  }

  function d3_time_parseWeekNumberMonday(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i));
    return n ? (date.W = +n[0], i + n[0].length) : -1;
  }

  function d3_time_parseFullYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 4));
    return n ? (date.y = +n[0], i + n[0].length) : -1;
  }

  function d3_time_parseYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.y = d3_time_expandYear(+n[0]), i + n[0].length) : -1;
  }

  function d3_time_parseZone(date, string, i) {
    return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5)) ? (date.Z = -string, i + 5) : -1;
  }

  function d3_time_expandYear(d) {
    return d + (d > 68 ? 1900 : 2e3);
  }

  function d3_time_parseMonthNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.m = n[0] - 1, i + n[0].length) : -1;
  }

  function d3_time_parseDay(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.d = +n[0], i + n[0].length) : -1;
  }

  function d3_time_parseDayOfYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 3));
    return n ? (date.j = +n[0], i + n[0].length) : -1;
  }

  function d3_time_parseHour24(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.H = +n[0], i + n[0].length) : -1;
  }

  function d3_time_parseMinutes(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.M = +n[0], i + n[0].length) : -1;
  }

  function d3_time_parseSeconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.S = +n[0], i + n[0].length) : -1;
  }

  function d3_time_parseMilliseconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 3));
    return n ? (date.L = +n[0], i + n[0].length) : -1;
  }

  function d3_time_zone(d) {
    var z = d.getTimezoneOffset(),
        zs = z > 0 ? "-" : "+",
        zh = abs(z) / 60 | 0,
        zm = abs(z) % 60;
    return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2);
  }

  function d3_time_parseLiteralPercent(date, string, i) {
    d3_time_percentRe.lastIndex = 0;
    var n = d3_time_percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }

  function d3_time_formatMulti(formats) {
    var n = formats.length,
        i = -1;

    while (++i < n) formats[i][0] = this(formats[i][0]);

    return function (date) {
      var i = 0,
          f = formats[i];

      while (!f[1](date)) f = formats[++i];

      return f[0](date);
    };
  }

  d3.locale = function (locale) {
    return {
      numberFormat: d3_locale_numberFormat(locale),
      timeFormat: d3_locale_timeFormat(locale)
    };
  };

  var d3_locale_enUS = d3.locale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""],
    dateTime: "%a %b %e %X %Y",
    date: "%m/%d/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });
  d3.format = d3_locale_enUS.numberFormat;
  d3.geo = {};

  function d3_adder() {}

  d3_adder.prototype = {
    s: 0,
    t: 0,
    add: function (y) {
      d3_adderSum(y, this.t, d3_adderTemp);
      d3_adderSum(d3_adderTemp.s, this.s, this);
      if (this.s) this.t += d3_adderTemp.t;else this.s = d3_adderTemp.t;
    },
    reset: function () {
      this.s = this.t = 0;
    },
    valueOf: function () {
      return this.s;
    }
  };
  var d3_adderTemp = new d3_adder();

  function d3_adderSum(a, b, o) {
    var x = o.s = a + b,
        bv = x - a,
        av = x - bv;
    o.t = a - av + (b - bv);
  }

  d3.geo.stream = function (object, listener) {
    if (object && d3_geo_streamObjectType.hasOwnProperty(object.type)) {
      d3_geo_streamObjectType[object.type](object, listener);
    } else {
      d3_geo_streamGeometry(object, listener);
    }
  };

  function d3_geo_streamGeometry(geometry, listener) {
    if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
      d3_geo_streamGeometryType[geometry.type](geometry, listener);
    }
  }

  var d3_geo_streamObjectType = {
    Feature: function (feature, listener) {
      d3_geo_streamGeometry(feature.geometry, listener);
    },
    FeatureCollection: function (object, listener) {
      var features = object.features,
          i = -1,
          n = features.length;

      while (++i < n) d3_geo_streamGeometry(features[i].geometry, listener);
    }
  };
  var d3_geo_streamGeometryType = {
    Sphere: function (object, listener) {
      listener.sphere();
    },
    Point: function (object, listener) {
      object = object.coordinates;
      listener.point(object[0], object[1], object[2]);
    },
    MultiPoint: function (object, listener) {
      var coordinates = object.coordinates,
          i = -1,
          n = coordinates.length;

      while (++i < n) object = coordinates[i], listener.point(object[0], object[1], object[2]);
    },
    LineString: function (object, listener) {
      d3_geo_streamLine(object.coordinates, listener, 0);
    },
    MultiLineString: function (object, listener) {
      var coordinates = object.coordinates,
          i = -1,
          n = coordinates.length;

      while (++i < n) d3_geo_streamLine(coordinates[i], listener, 0);
    },
    Polygon: function (object, listener) {
      d3_geo_streamPolygon(object.coordinates, listener);
    },
    MultiPolygon: function (object, listener) {
      var coordinates = object.coordinates,
          i = -1,
          n = coordinates.length;

      while (++i < n) d3_geo_streamPolygon(coordinates[i], listener);
    },
    GeometryCollection: function (object, listener) {
      var geometries = object.geometries,
          i = -1,
          n = geometries.length;

      while (++i < n) d3_geo_streamGeometry(geometries[i], listener);
    }
  };

  function d3_geo_streamLine(coordinates, listener, closed) {
    var i = -1,
        n = coordinates.length - closed,
        coordinate;
    listener.lineStart();

    while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1], coordinate[2]);

    listener.lineEnd();
  }

  function d3_geo_streamPolygon(coordinates, listener) {
    var i = -1,
        n = coordinates.length;
    listener.polygonStart();

    while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);

    listener.polygonEnd();
  }

  d3.geo.area = function (object) {
    d3_geo_areaSum = 0;
    d3.geo.stream(object, d3_geo_area);
    return d3_geo_areaSum;
  };

  var d3_geo_areaSum,
      d3_geo_areaRingSum = new d3_adder();
  var d3_geo_area = {
    sphere: function () {
      d3_geo_areaSum += 4 * π;
    },
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function () {
      d3_geo_areaRingSum.reset();
      d3_geo_area.lineStart = d3_geo_areaRingStart;
    },
    polygonEnd: function () {
      var area = 2 * d3_geo_areaRingSum;
      d3_geo_areaSum += area < 0 ? 4 * π + area : area;
      d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
    }
  };

  function d3_geo_areaRingStart() {
    var λ00, φ00, λ0, cosφ0, sinφ0;

    d3_geo_area.point = function (λ, φ) {
      d3_geo_area.point = nextPoint;
      λ0 = (λ00 = λ) * d3_radians, cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4), sinφ0 = Math.sin(φ);
    };

    function nextPoint(λ, φ) {
      λ *= d3_radians;
      φ = φ * d3_radians / 2 + π / 4;
      var dλ = λ - λ0,
          sdλ = dλ >= 0 ? 1 : -1,
          adλ = sdλ * dλ,
          cosφ = Math.cos(φ),
          sinφ = Math.sin(φ),
          k = sinφ0 * sinφ,
          u = cosφ0 * cosφ + k * Math.cos(adλ),
          v = k * sdλ * Math.sin(adλ);
      d3_geo_areaRingSum.add(Math.atan2(v, u));
      λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ;
    }

    d3_geo_area.lineEnd = function () {
      nextPoint(λ00, φ00);
    };
  }

  function d3_geo_cartesian(spherical) {
    var λ = spherical[0],
        φ = spherical[1],
        cosφ = Math.cos(φ);
    return [cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ)];
  }

  function d3_geo_cartesianDot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  function d3_geo_cartesianCross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }

  function d3_geo_cartesianAdd(a, b) {
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2];
  }

  function d3_geo_cartesianScale(vector, k) {
    return [vector[0] * k, vector[1] * k, vector[2] * k];
  }

  function d3_geo_cartesianNormalize(d) {
    var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
    d[0] /= l;
    d[1] /= l;
    d[2] /= l;
  }

  function d3_geo_spherical(cartesian) {
    return [Math.atan2(cartesian[1], cartesian[0]), d3_asin(cartesian[2])];
  }

  function d3_geo_sphericalEqual(a, b) {
    return abs(a[0] - b[0]) < ε && abs(a[1] - b[1]) < ε;
  }

  d3.geo.bounds = function () {
    var λ0, φ0, λ1, φ1, λ_, λ__, φ__, p0, dλSum, ranges, range;
    var bound = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function () {
        bound.point = ringPoint;
        bound.lineStart = ringStart;
        bound.lineEnd = ringEnd;
        dλSum = 0;
        d3_geo_area.polygonStart();
      },
      polygonEnd: function () {
        d3_geo_area.polygonEnd();
        bound.point = point;
        bound.lineStart = lineStart;
        bound.lineEnd = lineEnd;
        if (d3_geo_areaRingSum < 0) λ0 = -(λ1 = 180), φ0 = -(φ1 = 90);else if (dλSum > ε) φ1 = 90;else if (dλSum < -ε) φ0 = -90;
        range[0] = λ0, range[1] = λ1;
      }
    };

    function point(λ, φ) {
      ranges.push(range = [λ0 = λ, λ1 = λ]);
      if (φ < φ0) φ0 = φ;
      if (φ > φ1) φ1 = φ;
    }

    function linePoint(λ, φ) {
      var p = d3_geo_cartesian([λ * d3_radians, φ * d3_radians]);

      if (p0) {
        var normal = d3_geo_cartesianCross(p0, p),
            equatorial = [normal[1], -normal[0], 0],
            inflection = d3_geo_cartesianCross(equatorial, normal);
        d3_geo_cartesianNormalize(inflection);
        inflection = d3_geo_spherical(inflection);
        var dλ = λ - λ_,
            s = dλ > 0 ? 1 : -1,
            λi = inflection[0] * d3_degrees * s,
            antimeridian = abs(dλ) > 180;

        if (antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
          var φi = inflection[1] * d3_degrees;
          if (φi > φ1) φ1 = φi;
        } else if (λi = (λi + 360) % 360 - 180, antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
          var φi = -inflection[1] * d3_degrees;
          if (φi < φ0) φ0 = φi;
        } else {
          if (φ < φ0) φ0 = φ;
          if (φ > φ1) φ1 = φ;
        }

        if (antimeridian) {
          if (λ < λ_) {
            if (angle(λ0, λ) > angle(λ0, λ1)) λ1 = λ;
          } else {
            if (angle(λ, λ1) > angle(λ0, λ1)) λ0 = λ;
          }
        } else {
          if (λ1 >= λ0) {
            if (λ < λ0) λ0 = λ;
            if (λ > λ1) λ1 = λ;
          } else {
            if (λ > λ_) {
              if (angle(λ0, λ) > angle(λ0, λ1)) λ1 = λ;
            } else {
              if (angle(λ, λ1) > angle(λ0, λ1)) λ0 = λ;
            }
          }
        }
      } else {
        point(λ, φ);
      }

      p0 = p, λ_ = λ;
    }

    function lineStart() {
      bound.point = linePoint;
    }

    function lineEnd() {
      range[0] = λ0, range[1] = λ1;
      bound.point = point;
      p0 = null;
    }

    function ringPoint(λ, φ) {
      if (p0) {
        var dλ = λ - λ_;
        dλSum += abs(dλ) > 180 ? dλ + (dλ > 0 ? 360 : -360) : dλ;
      } else λ__ = λ, φ__ = φ;

      d3_geo_area.point(λ, φ);
      linePoint(λ, φ);
    }

    function ringStart() {
      d3_geo_area.lineStart();
    }

    function ringEnd() {
      ringPoint(λ__, φ__);
      d3_geo_area.lineEnd();
      if (abs(dλSum) > ε) λ0 = -(λ1 = 180);
      range[0] = λ0, range[1] = λ1;
      p0 = null;
    }

    function angle(λ0, λ1) {
      return (λ1 -= λ0) < 0 ? λ1 + 360 : λ1;
    }

    function compareRanges(a, b) {
      return a[0] - b[0];
    }

    function withinRange(x, range) {
      return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
    }

    return function (feature) {
      φ1 = λ1 = -(λ0 = φ0 = Infinity);
      ranges = [];
      d3.geo.stream(feature, bound);
      var n = ranges.length;

      if (n) {
        ranges.sort(compareRanges);

        for (var i = 1, a = ranges[0], b, merged = [a]; i < n; ++i) {
          b = ranges[i];

          if (withinRange(b[0], a) || withinRange(b[1], a)) {
            if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
            if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
          } else {
            merged.push(a = b);
          }
        }

        var best = -Infinity,
            dλ;

        for (var n = merged.length - 1, i = 0, a = merged[n], b; i <= n; a = b, ++i) {
          b = merged[i];
          if ((dλ = angle(a[1], b[0])) > best) best = dλ, λ0 = b[0], λ1 = a[1];
        }
      }

      ranges = range = null;
      return λ0 === Infinity || φ0 === Infinity ? [[NaN, NaN], [NaN, NaN]] : [[λ0, φ0], [λ1, φ1]];
    };
  }();

  d3.geo.centroid = function (object) {
    d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
    d3.geo.stream(object, d3_geo_centroid);
    var x = d3_geo_centroidX2,
        y = d3_geo_centroidY2,
        z = d3_geo_centroidZ2,
        m = x * x + y * y + z * z;

    if (m < ε2) {
      x = d3_geo_centroidX1, y = d3_geo_centroidY1, z = d3_geo_centroidZ1;
      if (d3_geo_centroidW1 < ε) x = d3_geo_centroidX0, y = d3_geo_centroidY0, z = d3_geo_centroidZ0;
      m = x * x + y * y + z * z;
      if (m < ε2) return [NaN, NaN];
    }

    return [Math.atan2(y, x) * d3_degrees, d3_asin(z / Math.sqrt(m)) * d3_degrees];
  };

  var d3_geo_centroidW0, d3_geo_centroidW1, d3_geo_centroidX0, d3_geo_centroidY0, d3_geo_centroidZ0, d3_geo_centroidX1, d3_geo_centroidY1, d3_geo_centroidZ1, d3_geo_centroidX2, d3_geo_centroidY2, d3_geo_centroidZ2;
  var d3_geo_centroid = {
    sphere: d3_noop,
    point: d3_geo_centroidPoint,
    lineStart: d3_geo_centroidLineStart,
    lineEnd: d3_geo_centroidLineEnd,
    polygonStart: function () {
      d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
    },
    polygonEnd: function () {
      d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
    }
  };

  function d3_geo_centroidPoint(λ, φ) {
    λ *= d3_radians;
    var cosφ = Math.cos(φ *= d3_radians);
    d3_geo_centroidPointXYZ(cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ));
  }

  function d3_geo_centroidPointXYZ(x, y, z) {
    ++d3_geo_centroidW0;
    d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0;
    d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0;
    d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0;
  }

  function d3_geo_centroidLineStart() {
    var x0, y0, z0;

    d3_geo_centroid.point = function (λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians);
      x0 = cosφ * Math.cos(λ);
      y0 = cosφ * Math.sin(λ);
      z0 = Math.sin(φ);
      d3_geo_centroid.point = nextPoint;
      d3_geo_centroidPointXYZ(x0, y0, z0);
    };

    function nextPoint(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians),
          x = cosφ * Math.cos(λ),
          y = cosφ * Math.sin(λ),
          z = Math.sin(φ),
          w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
      d3_geo_centroidW1 += w;
      d3_geo_centroidX1 += w * (x0 + (x0 = x));
      d3_geo_centroidY1 += w * (y0 + (y0 = y));
      d3_geo_centroidZ1 += w * (z0 + (z0 = z));
      d3_geo_centroidPointXYZ(x0, y0, z0);
    }
  }

  function d3_geo_centroidLineEnd() {
    d3_geo_centroid.point = d3_geo_centroidPoint;
  }

  function d3_geo_centroidRingStart() {
    var λ00, φ00, x0, y0, z0;

    d3_geo_centroid.point = function (λ, φ) {
      λ00 = λ, φ00 = φ;
      d3_geo_centroid.point = nextPoint;
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians);
      x0 = cosφ * Math.cos(λ);
      y0 = cosφ * Math.sin(λ);
      z0 = Math.sin(φ);
      d3_geo_centroidPointXYZ(x0, y0, z0);
    };

    d3_geo_centroid.lineEnd = function () {
      nextPoint(λ00, φ00);
      d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
      d3_geo_centroid.point = d3_geo_centroidPoint;
    };

    function nextPoint(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians),
          x = cosφ * Math.cos(λ),
          y = cosφ * Math.sin(λ),
          z = Math.sin(φ),
          cx = y0 * z - z0 * y,
          cy = z0 * x - x0 * z,
          cz = x0 * y - y0 * x,
          m = Math.sqrt(cx * cx + cy * cy + cz * cz),
          u = x0 * x + y0 * y + z0 * z,
          v = m && -d3_acos(u) / m,
          w = Math.atan2(m, u);
      d3_geo_centroidX2 += v * cx;
      d3_geo_centroidY2 += v * cy;
      d3_geo_centroidZ2 += v * cz;
      d3_geo_centroidW1 += w;
      d3_geo_centroidX1 += w * (x0 + (x0 = x));
      d3_geo_centroidY1 += w * (y0 + (y0 = y));
      d3_geo_centroidZ1 += w * (z0 + (z0 = z));
      d3_geo_centroidPointXYZ(x0, y0, z0);
    }
  }

  function d3_geo_compose(a, b) {
    function compose(x, y) {
      return x = a(x, y), b(x[0], x[1]);
    }

    if (a.invert && b.invert) compose.invert = function (x, y) {
      return x = b.invert(x, y), x && a.invert(x[0], x[1]);
    };
    return compose;
  }

  function d3_true() {
    return true;
  }

  function d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener) {
    var subject = [],
        clip = [];
    segments.forEach(function (segment) {
      if ((n = segment.length - 1) <= 0) return;
      var n,
          p0 = segment[0],
          p1 = segment[n];

      if (d3_geo_sphericalEqual(p0, p1)) {
        listener.lineStart();

        for (var i = 0; i < n; ++i) listener.point((p0 = segment[i])[0], p0[1]);

        listener.lineEnd();
        return;
      }

      var a = new d3_geo_clipPolygonIntersection(p0, segment, null, true),
          b = new d3_geo_clipPolygonIntersection(p0, null, a, false);
      a.o = b;
      subject.push(a);
      clip.push(b);
      a = new d3_geo_clipPolygonIntersection(p1, segment, null, false);
      b = new d3_geo_clipPolygonIntersection(p1, null, a, true);
      a.o = b;
      subject.push(a);
      clip.push(b);
    });
    clip.sort(compare);
    d3_geo_clipPolygonLinkCircular(subject);
    d3_geo_clipPolygonLinkCircular(clip);
    if (!subject.length) return;

    for (var i = 0, entry = clipStartInside, n = clip.length; i < n; ++i) {
      clip[i].e = entry = !entry;
    }

    var start = subject[0],
        points,
        point;

    while (1) {
      var current = start,
          isSubject = true;

      while (current.v) if ((current = current.n) === start) return;

      points = current.z;
      listener.lineStart();

      do {
        current.v = current.o.v = true;

        if (current.e) {
          if (isSubject) {
            for (var i = 0, n = points.length; i < n; ++i) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.x, current.n.x, 1, listener);
          }

          current = current.n;
        } else {
          if (isSubject) {
            points = current.p.z;

            for (var i = points.length - 1; i >= 0; --i) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.x, current.p.x, -1, listener);
          }

          current = current.p;
        }

        current = current.o;
        points = current.z;
        isSubject = !isSubject;
      } while (!current.v);

      listener.lineEnd();
    }
  }

  function d3_geo_clipPolygonLinkCircular(array) {
    if (!(n = array.length)) return;
    var n,
        i = 0,
        a = array[0],
        b;

    while (++i < n) {
      a.n = b = array[i];
      b.p = a;
      a = b;
    }

    a.n = b = array[0];
    b.p = a;
  }

  function d3_geo_clipPolygonIntersection(point, points, other, entry) {
    this.x = point;
    this.z = points;
    this.o = other;
    this.e = entry;
    this.v = false;
    this.n = this.p = null;
  }

  function d3_geo_clip(pointVisible, clipLine, interpolate, clipStart) {
    return function (rotate, listener) {
      var line = clipLine(listener),
          rotatedClipStart = rotate.invert(clipStart[0], clipStart[1]);
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function () {
          clip.point = pointRing;
          clip.lineStart = ringStart;
          clip.lineEnd = ringEnd;
          segments = [];
          polygon = [];
        },
        polygonEnd: function () {
          clip.point = point;
          clip.lineStart = lineStart;
          clip.lineEnd = lineEnd;
          segments = d3.merge(segments);
          var clipStartInside = d3_geo_pointInPolygon(rotatedClipStart, polygon);

          if (segments.length) {
            if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
            d3_geo_clipPolygon(segments, d3_geo_clipSort, clipStartInside, interpolate, listener);
          } else if (clipStartInside) {
            if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
            listener.lineStart();
            interpolate(null, null, 1, listener);
            listener.lineEnd();
          }

          if (polygonStarted) listener.polygonEnd(), polygonStarted = false;
          segments = polygon = null;
        },
        sphere: function () {
          listener.polygonStart();
          listener.lineStart();
          interpolate(null, null, 1, listener);
          listener.lineEnd();
          listener.polygonEnd();
        }
      };

      function point(λ, φ) {
        var point = rotate(λ, φ);
        if (pointVisible(λ = point[0], φ = point[1])) listener.point(λ, φ);
      }

      function pointLine(λ, φ) {
        var point = rotate(λ, φ);
        line.point(point[0], point[1]);
      }

      function lineStart() {
        clip.point = pointLine;
        line.lineStart();
      }

      function lineEnd() {
        clip.point = point;
        line.lineEnd();
      }

      var segments;
      var buffer = d3_geo_clipBufferListener(),
          ringListener = clipLine(buffer),
          polygonStarted = false,
          polygon,
          ring;

      function pointRing(λ, φ) {
        ring.push([λ, φ]);
        var point = rotate(λ, φ);
        ringListener.point(point[0], point[1]);
      }

      function ringStart() {
        ringListener.lineStart();
        ring = [];
      }

      function ringEnd() {
        pointRing(ring[0][0], ring[0][1]);
        ringListener.lineEnd();
        var clean = ringListener.clean(),
            ringSegments = buffer.buffer(),
            segment,
            n = ringSegments.length;
        ring.pop();
        polygon.push(ring);
        ring = null;
        if (!n) return;

        if (clean & 1) {
          segment = ringSegments[0];
          var n = segment.length - 1,
              i = -1,
              point;

          if (n > 0) {
            if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
            listener.lineStart();

            while (++i < n) listener.point((point = segment[i])[0], point[1]);

            listener.lineEnd();
          }

          return;
        }

        if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
        segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
      }

      return clip;
    };
  }

  function d3_geo_clipSegmentLength1(segment) {
    return segment.length > 1;
  }

  function d3_geo_clipBufferListener() {
    var lines = [],
        line;
    return {
      lineStart: function () {
        lines.push(line = []);
      },
      point: function (λ, φ) {
        line.push([λ, φ]);
      },
      lineEnd: d3_noop,
      buffer: function () {
        var buffer = lines;
        lines = [];
        line = null;
        return buffer;
      },
      rejoin: function () {
        if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
      }
    };
  }

  function d3_geo_clipSort(a, b) {
    return ((a = a.x)[0] < 0 ? a[1] - halfπ - ε : halfπ - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfπ - ε : halfπ - b[1]);
  }

  var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate, [-π, -π / 2]);

  function d3_geo_clipAntimeridianLine(listener) {
    var λ0 = NaN,
        φ0 = NaN,
        sλ0 = NaN,
        clean;
    return {
      lineStart: function () {
        listener.lineStart();
        clean = 1;
      },
      point: function (λ1, φ1) {
        var sλ1 = λ1 > 0 ? π : -π,
            dλ = abs(λ1 - λ0);

        if (abs(dλ - π) < ε) {
          listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? halfπ : -halfπ);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          listener.point(λ1, φ0);
          clean = 0;
        } else if (sλ0 !== sλ1 && dλ >= π) {
          if (abs(λ0 - sλ0) < ε) λ0 -= sλ0 * ε;
          if (abs(λ1 - sλ1) < ε) λ1 -= sλ1 * ε;
          φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          clean = 0;
        }

        listener.point(λ0 = λ1, φ0 = φ1);
        sλ0 = sλ1;
      },
      lineEnd: function () {
        listener.lineEnd();
        λ0 = φ0 = NaN;
      },
      clean: function () {
        return 2 - clean;
      }
    };
  }

  function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
    var cosφ0,
        cosφ1,
        sinλ0_λ1 = Math.sin(λ0 - λ1);
    return abs(sinλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (cosφ0 * cosφ1 * sinλ0_λ1)) : (φ0 + φ1) / 2;
  }

  function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
    var φ;

    if (from == null) {
      φ = direction * halfπ;
      listener.point(-π, φ);
      listener.point(0, φ);
      listener.point(π, φ);
      listener.point(π, 0);
      listener.point(π, -φ);
      listener.point(0, -φ);
      listener.point(-π, -φ);
      listener.point(-π, 0);
      listener.point(-π, φ);
    } else if (abs(from[0] - to[0]) > ε) {
      var s = from[0] < to[0] ? π : -π;
      φ = direction * s / 2;
      listener.point(-s, φ);
      listener.point(0, φ);
      listener.point(s, φ);
    } else {
      listener.point(to[0], to[1]);
    }
  }

  function d3_geo_pointInPolygon(point, polygon) {
    var meridian = point[0],
        parallel = point[1],
        meridianNormal = [Math.sin(meridian), -Math.cos(meridian), 0],
        polarAngle = 0,
        winding = 0;
    d3_geo_areaRingSum.reset();

    for (var i = 0, n = polygon.length; i < n; ++i) {
      var ring = polygon[i],
          m = ring.length;
      if (!m) continue;
      var point0 = ring[0],
          λ0 = point0[0],
          φ0 = point0[1] / 2 + π / 4,
          sinφ0 = Math.sin(φ0),
          cosφ0 = Math.cos(φ0),
          j = 1;

      while (true) {
        if (j === m) j = 0;
        point = ring[j];
        var λ = point[0],
            φ = point[1] / 2 + π / 4,
            sinφ = Math.sin(φ),
            cosφ = Math.cos(φ),
            dλ = λ - λ0,
            sdλ = dλ >= 0 ? 1 : -1,
            adλ = sdλ * dλ,
            antimeridian = adλ > π,
            k = sinφ0 * sinφ;
        d3_geo_areaRingSum.add(Math.atan2(k * sdλ * Math.sin(adλ), cosφ0 * cosφ + k * Math.cos(adλ)));
        polarAngle += antimeridian ? dλ + sdλ * τ : dλ;

        if (antimeridian ^ λ0 >= meridian ^ λ >= meridian) {
          var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
          d3_geo_cartesianNormalize(arc);
          var intersection = d3_geo_cartesianCross(meridianNormal, arc);
          d3_geo_cartesianNormalize(intersection);
          var φarc = (antimeridian ^ dλ >= 0 ? -1 : 1) * d3_asin(intersection[2]);

          if (parallel > φarc || parallel === φarc && (arc[0] || arc[1])) {
            winding += antimeridian ^ dλ >= 0 ? 1 : -1;
          }
        }

        if (!j++) break;
        λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ, point0 = point;
      }
    }

    return (polarAngle < -ε || polarAngle < ε && d3_geo_areaRingSum < -ε) ^ winding & 1;
  }

  function d3_geo_clipCircle(radius) {
    var cr = Math.cos(radius),
        smallRadius = cr > 0,
        notHemisphere = abs(cr) > ε,
        interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);
    return d3_geo_clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-π, radius - π]);

    function visible(λ, φ) {
      return Math.cos(λ) * Math.cos(φ) > cr;
    }

    function clipLine(listener) {
      var point0, c0, v0, v00, clean;
      return {
        lineStart: function () {
          v00 = v0 = false;
          clean = 1;
        },
        point: function (λ, φ) {
          var point1 = [λ, φ],
              point2,
              v = visible(λ, φ),
              c = smallRadius ? v ? 0 : code(λ, φ) : v ? code(λ + (λ < 0 ? π : -π), φ) : 0;
          if (!point0 && (v00 = v0 = v)) listener.lineStart();

          if (v !== v0) {
            point2 = intersect(point0, point1);

            if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
              point1[0] += ε;
              point1[1] += ε;
              v = visible(point1[0], point1[1]);
            }
          }

          if (v !== v0) {
            clean = 0;

            if (v) {
              listener.lineStart();
              point2 = intersect(point1, point0);
              listener.point(point2[0], point2[1]);
            } else {
              point2 = intersect(point0, point1);
              listener.point(point2[0], point2[1]);
              listener.lineEnd();
            }

            point0 = point2;
          } else if (notHemisphere && point0 && smallRadius ^ v) {
            var t;

            if (!(c & c0) && (t = intersect(point1, point0, true))) {
              clean = 0;

              if (smallRadius) {
                listener.lineStart();
                listener.point(t[0][0], t[0][1]);
                listener.point(t[1][0], t[1][1]);
                listener.lineEnd();
              } else {
                listener.point(t[1][0], t[1][1]);
                listener.lineEnd();
                listener.lineStart();
                listener.point(t[0][0], t[0][1]);
              }
            }
          }

          if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) {
            listener.point(point1[0], point1[1]);
          }

          point0 = point1, v0 = v, c0 = c;
        },
        lineEnd: function () {
          if (v0) listener.lineEnd();
          point0 = null;
        },
        clean: function () {
          return clean | (v00 && v0) << 1;
        }
      };
    }

    function intersect(a, b, two) {
      var pa = d3_geo_cartesian(a),
          pb = d3_geo_cartesian(b);
      var n1 = [1, 0, 0],
          n2 = d3_geo_cartesianCross(pa, pb),
          n2n2 = d3_geo_cartesianDot(n2, n2),
          n1n2 = n2[0],
          determinant = n2n2 - n1n2 * n1n2;
      if (!determinant) return !two && a;
      var c1 = cr * n2n2 / determinant,
          c2 = -cr * n1n2 / determinant,
          n1xn2 = d3_geo_cartesianCross(n1, n2),
          A = d3_geo_cartesianScale(n1, c1),
          B = d3_geo_cartesianScale(n2, c2);
      d3_geo_cartesianAdd(A, B);
      var u = n1xn2,
          w = d3_geo_cartesianDot(A, u),
          uu = d3_geo_cartesianDot(u, u),
          t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
      if (t2 < 0) return;
      var t = Math.sqrt(t2),
          q = d3_geo_cartesianScale(u, (-w - t) / uu);
      d3_geo_cartesianAdd(q, A);
      q = d3_geo_spherical(q);
      if (!two) return q;
      var λ0 = a[0],
          λ1 = b[0],
          φ0 = a[1],
          φ1 = b[1],
          z;
      if (λ1 < λ0) z = λ0, λ0 = λ1, λ1 = z;
      var δλ = λ1 - λ0,
          polar = abs(δλ - π) < ε,
          meridian = polar || δλ < ε;
      if (!polar && φ1 < φ0) z = φ0, φ0 = φ1, φ1 = z;

      if (meridian ? polar ? φ0 + φ1 > 0 ^ q[1] < (abs(q[0] - λ0) < ε ? φ0 : φ1) : φ0 <= q[1] && q[1] <= φ1 : δλ > π ^ (λ0 <= q[0] && q[0] <= λ1)) {
        var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
        d3_geo_cartesianAdd(q1, A);
        return [q, d3_geo_spherical(q1)];
      }
    }

    function code(λ, φ) {
      var r = smallRadius ? radius : π - radius,
          code = 0;
      if (λ < -r) code |= 1;else if (λ > r) code |= 2;
      if (φ < -r) code |= 4;else if (φ > r) code |= 8;
      return code;
    }
  }

  function d3_geom_clipLine(x0, y0, x1, y1) {
    return function (line) {
      var a = line.a,
          b = line.b,
          ax = a.x,
          ay = a.y,
          bx = b.x,
          by = b.y,
          t0 = 0,
          t1 = 1,
          dx = bx - ax,
          dy = by - ay,
          r;
      r = x0 - ax;
      if (!dx && r > 0) return;
      r /= dx;

      if (dx < 0) {
        if (r < t0) return;
        if (r < t1) t1 = r;
      } else if (dx > 0) {
        if (r > t1) return;
        if (r > t0) t0 = r;
      }

      r = x1 - ax;
      if (!dx && r < 0) return;
      r /= dx;

      if (dx < 0) {
        if (r > t1) return;
        if (r > t0) t0 = r;
      } else if (dx > 0) {
        if (r < t0) return;
        if (r < t1) t1 = r;
      }

      r = y0 - ay;
      if (!dy && r > 0) return;
      r /= dy;

      if (dy < 0) {
        if (r < t0) return;
        if (r < t1) t1 = r;
      } else if (dy > 0) {
        if (r > t1) return;
        if (r > t0) t0 = r;
      }

      r = y1 - ay;
      if (!dy && r < 0) return;
      r /= dy;

      if (dy < 0) {
        if (r > t1) return;
        if (r > t0) t0 = r;
      } else if (dy > 0) {
        if (r < t0) return;
        if (r < t1) t1 = r;
      }

      if (t0 > 0) line.a = {
        x: ax + t0 * dx,
        y: ay + t0 * dy
      };
      if (t1 < 1) line.b = {
        x: ax + t1 * dx,
        y: ay + t1 * dy
      };
      return line;
    };
  }

  var d3_geo_clipExtentMAX = 1e9;

  d3.geo.clipExtent = function () {
    var x0,
        y0,
        x1,
        y1,
        stream,
        clip,
        clipExtent = {
      stream: function (output) {
        if (stream) stream.valid = false;
        stream = clip(output);
        stream.valid = true;
        return stream;
      },
      extent: function (_) {
        if (!arguments.length) return [[x0, y0], [x1, y1]];
        clip = d3_geo_clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]);
        if (stream) stream.valid = false, stream = null;
        return clipExtent;
      }
    };
    return clipExtent.extent([[0, 0], [960, 500]]);
  };

  function d3_geo_clipExtent(x0, y0, x1, y1) {
    return function (listener) {
      var listener_ = listener,
          bufferListener = d3_geo_clipBufferListener(),
          clipLine = d3_geom_clipLine(x0, y0, x1, y1),
          segments,
          polygon,
          ring;
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function () {
          listener = bufferListener;
          segments = [];
          polygon = [];
          clean = true;
        },
        polygonEnd: function () {
          listener = listener_;
          segments = d3.merge(segments);
          var clipStartInside = insidePolygon([x0, y1]),
              inside = clean && clipStartInside,
              visible = segments.length;

          if (inside || visible) {
            listener.polygonStart();

            if (inside) {
              listener.lineStart();
              interpolate(null, null, 1, listener);
              listener.lineEnd();
            }

            if (visible) {
              d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener);
            }

            listener.polygonEnd();
          }

          segments = polygon = ring = null;
        }
      };

      function insidePolygon(p) {
        var wn = 0,
            n = polygon.length,
            y = p[1];

        for (var i = 0; i < n; ++i) {
          for (var j = 1, v = polygon[i], m = v.length, a = v[0], b; j < m; ++j) {
            b = v[j];

            if (a[1] <= y) {
              if (b[1] > y && d3_cross2d(a, b, p) > 0) ++wn;
            } else {
              if (b[1] <= y && d3_cross2d(a, b, p) < 0) --wn;
            }

            a = b;
          }
        }

        return wn !== 0;
      }

      function interpolate(from, to, direction, listener) {
        var a = 0,
            a1 = 0;

        if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0) {
          do {
            listener.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
          } while ((a = (a + direction + 4) % 4) !== a1);
        } else {
          listener.point(to[0], to[1]);
        }
      }

      function pointVisible(x, y) {
        return x0 <= x && x <= x1 && y0 <= y && y <= y1;
      }

      function point(x, y) {
        if (pointVisible(x, y)) listener.point(x, y);
      }

      var x__, y__, v__, x_, y_, v_, first, clean;

      function lineStart() {
        clip.point = linePoint;
        if (polygon) polygon.push(ring = []);
        first = true;
        v_ = false;
        x_ = y_ = NaN;
      }

      function lineEnd() {
        if (segments) {
          linePoint(x__, y__);
          if (v__ && v_) bufferListener.rejoin();
          segments.push(bufferListener.buffer());
        }

        clip.point = point;
        if (v_) listener.lineEnd();
      }

      function linePoint(x, y) {
        x = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, x));
        y = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, y));
        var v = pointVisible(x, y);
        if (polygon) ring.push([x, y]);

        if (first) {
          x__ = x, y__ = y, v__ = v;
          first = false;

          if (v) {
            listener.lineStart();
            listener.point(x, y);
          }
        } else {
          if (v && v_) listener.point(x, y);else {
            var l = {
              a: {
                x: x_,
                y: y_
              },
              b: {
                x: x,
                y: y
              }
            };

            if (clipLine(l)) {
              if (!v_) {
                listener.lineStart();
                listener.point(l.a.x, l.a.y);
              }

              listener.point(l.b.x, l.b.y);
              if (!v) listener.lineEnd();
              clean = false;
            } else if (v) {
              listener.lineStart();
              listener.point(x, y);
              clean = false;
            }
          }
        }

        x_ = x, y_ = y, v_ = v;
      }

      return clip;
    };

    function corner(p, direction) {
      return abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
    }

    function compare(a, b) {
      return comparePoints(a.x, b.x);
    }

    function comparePoints(a, b) {
      var ca = corner(a, 1),
          cb = corner(b, 1);
      return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
    }
  }

  function d3_geo_conic(projectAt) {
    var φ0 = 0,
        φ1 = π / 3,
        m = d3_geo_projectionMutator(projectAt),
        p = m(φ0, φ1);

    p.parallels = function (_) {
      if (!arguments.length) return [φ0 / π * 180, φ1 / π * 180];
      return m(φ0 = _[0] * π / 180, φ1 = _[1] * π / 180);
    };

    return p;
  }

  function d3_geo_conicEqualArea(φ0, φ1) {
    var sinφ0 = Math.sin(φ0),
        n = (sinφ0 + Math.sin(φ1)) / 2,
        C = 1 + sinφ0 * (2 * n - sinφ0),
        ρ0 = Math.sqrt(C) / n;

    function forward(λ, φ) {
      var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
      return [ρ * Math.sin(λ *= n), ρ0 - ρ * Math.cos(λ)];
    }

    forward.invert = function (x, y) {
      var ρ0_y = ρ0 - y;
      return [Math.atan2(x, ρ0_y) / n, d3_asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n))];
    };

    return forward;
  }

  (d3.geo.conicEqualArea = function () {
    return d3_geo_conic(d3_geo_conicEqualArea);
  }).raw = d3_geo_conicEqualArea;

  d3.geo.albers = function () {
    return d3.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070);
  };

  d3.geo.albersUsa = function () {
    var lower48 = d3.geo.albers();
    var alaska = d3.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]);
    var hawaii = d3.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]);
    var point,
        pointStream = {
      point: function (x, y) {
        point = [x, y];
      }
    },
        lower48Point,
        alaskaPoint,
        hawaiiPoint;

    function albersUsa(coordinates) {
      var x = coordinates[0],
          y = coordinates[1];
      point = null;
      (lower48Point(x, y), point) || (alaskaPoint(x, y), point) || hawaiiPoint(x, y);
      return point;
    }

    albersUsa.invert = function (coordinates) {
      var k = lower48.scale(),
          t = lower48.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k;
      return (y >= .12 && y < .234 && x >= -.425 && x < -.214 ? alaska : y >= .166 && y < .234 && x >= -.214 && x < -.115 ? hawaii : lower48).invert(coordinates);
    };

    albersUsa.stream = function (stream) {
      var lower48Stream = lower48.stream(stream),
          alaskaStream = alaska.stream(stream),
          hawaiiStream = hawaii.stream(stream);
      return {
        point: function (x, y) {
          lower48Stream.point(x, y);
          alaskaStream.point(x, y);
          hawaiiStream.point(x, y);
        },
        sphere: function () {
          lower48Stream.sphere();
          alaskaStream.sphere();
          hawaiiStream.sphere();
        },
        lineStart: function () {
          lower48Stream.lineStart();
          alaskaStream.lineStart();
          hawaiiStream.lineStart();
        },
        lineEnd: function () {
          lower48Stream.lineEnd();
          alaskaStream.lineEnd();
          hawaiiStream.lineEnd();
        },
        polygonStart: function () {
          lower48Stream.polygonStart();
          alaskaStream.polygonStart();
          hawaiiStream.polygonStart();
        },
        polygonEnd: function () {
          lower48Stream.polygonEnd();
          alaskaStream.polygonEnd();
          hawaiiStream.polygonEnd();
        }
      };
    };

    albersUsa.precision = function (_) {
      if (!arguments.length) return lower48.precision();
      lower48.precision(_);
      alaska.precision(_);
      hawaii.precision(_);
      return albersUsa;
    };

    albersUsa.scale = function (_) {
      if (!arguments.length) return lower48.scale();
      lower48.scale(_);
      alaska.scale(_ * .35);
      hawaii.scale(_);
      return albersUsa.translate(lower48.translate());
    };

    albersUsa.translate = function (_) {
      if (!arguments.length) return lower48.translate();
      var k = lower48.scale(),
          x = +_[0],
          y = +_[1];
      lower48Point = lower48.translate(_).clipExtent([[x - .455 * k, y - .238 * k], [x + .455 * k, y + .238 * k]]).stream(pointStream).point;
      alaskaPoint = alaska.translate([x - .307 * k, y + .201 * k]).clipExtent([[x - .425 * k + ε, y + .12 * k + ε], [x - .214 * k - ε, y + .234 * k - ε]]).stream(pointStream).point;
      hawaiiPoint = hawaii.translate([x - .205 * k, y + .212 * k]).clipExtent([[x - .214 * k + ε, y + .166 * k + ε], [x - .115 * k - ε, y + .234 * k - ε]]).stream(pointStream).point;
      return albersUsa;
    };

    return albersUsa.scale(1070);
  };

  var d3_geo_pathAreaSum,
      d3_geo_pathAreaPolygon,
      d3_geo_pathArea = {
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function () {
      d3_geo_pathAreaPolygon = 0;
      d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
    },
    polygonEnd: function () {
      d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
      d3_geo_pathAreaSum += abs(d3_geo_pathAreaPolygon / 2);
    }
  };

  function d3_geo_pathAreaRingStart() {
    var x00, y00, x0, y0;

    d3_geo_pathArea.point = function (x, y) {
      d3_geo_pathArea.point = nextPoint;
      x00 = x0 = x, y00 = y0 = y;
    };

    function nextPoint(x, y) {
      d3_geo_pathAreaPolygon += y0 * x - x0 * y;
      x0 = x, y0 = y;
    }

    d3_geo_pathArea.lineEnd = function () {
      nextPoint(x00, y00);
    };
  }

  var d3_geo_pathBoundsX0, d3_geo_pathBoundsY0, d3_geo_pathBoundsX1, d3_geo_pathBoundsY1;
  var d3_geo_pathBounds = {
    point: d3_geo_pathBoundsPoint,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: d3_noop,
    polygonEnd: d3_noop
  };

  function d3_geo_pathBoundsPoint(x, y) {
    if (x < d3_geo_pathBoundsX0) d3_geo_pathBoundsX0 = x;
    if (x > d3_geo_pathBoundsX1) d3_geo_pathBoundsX1 = x;
    if (y < d3_geo_pathBoundsY0) d3_geo_pathBoundsY0 = y;
    if (y > d3_geo_pathBoundsY1) d3_geo_pathBoundsY1 = y;
  }

  function d3_geo_pathBuffer() {
    var pointCircle = d3_geo_pathBufferCircle(4.5),
        buffer = [];
    var stream = {
      point: point,
      lineStart: function () {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function () {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function () {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function (_) {
        pointCircle = d3_geo_pathBufferCircle(_);
        return stream;
      },
      result: function () {
        if (buffer.length) {
          var result = buffer.join("");
          buffer = [];
          return result;
        }
      }
    };

    function point(x, y) {
      buffer.push("M", x, ",", y, pointCircle);
    }

    function pointLineStart(x, y) {
      buffer.push("M", x, ",", y);
      stream.point = pointLine;
    }

    function pointLine(x, y) {
      buffer.push("L", x, ",", y);
    }

    function lineEnd() {
      stream.point = point;
    }

    function lineEndPolygon() {
      buffer.push("Z");
    }

    return stream;
  }

  function d3_geo_pathBufferCircle(radius) {
    return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
  }

  var d3_geo_pathCentroid = {
    point: d3_geo_pathCentroidPoint,
    lineStart: d3_geo_pathCentroidLineStart,
    lineEnd: d3_geo_pathCentroidLineEnd,
    polygonStart: function () {
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
    },
    polygonEnd: function () {
      d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
      d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
    }
  };

  function d3_geo_pathCentroidPoint(x, y) {
    d3_geo_centroidX0 += x;
    d3_geo_centroidY0 += y;
    ++d3_geo_centroidZ0;
  }

  function d3_geo_pathCentroidLineStart() {
    var x0, y0;

    d3_geo_pathCentroid.point = function (x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    };

    function nextPoint(x, y) {
      var dx = x - x0,
          dy = y - y0,
          z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX1 += z * (x0 + x) / 2;
      d3_geo_centroidY1 += z * (y0 + y) / 2;
      d3_geo_centroidZ1 += z;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    }
  }

  function d3_geo_pathCentroidLineEnd() {
    d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
  }

  function d3_geo_pathCentroidRingStart() {
    var x00, y00, x0, y0;

    d3_geo_pathCentroid.point = function (x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y);
    };

    function nextPoint(x, y) {
      var dx = x - x0,
          dy = y - y0,
          z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX1 += z * (x0 + x) / 2;
      d3_geo_centroidY1 += z * (y0 + y) / 2;
      d3_geo_centroidZ1 += z;
      z = y0 * x - x0 * y;
      d3_geo_centroidX2 += z * (x0 + x);
      d3_geo_centroidY2 += z * (y0 + y);
      d3_geo_centroidZ2 += z * 3;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    }

    d3_geo_pathCentroid.lineEnd = function () {
      nextPoint(x00, y00);
    };
  }

  function d3_geo_pathContext(context) {
    var pointRadius = 4.5;
    var stream = {
      point: point,
      lineStart: function () {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function () {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function () {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function (_) {
        pointRadius = _;
        return stream;
      },
      result: d3_noop
    };

    function point(x, y) {
      context.moveTo(x + pointRadius, y);
      context.arc(x, y, pointRadius, 0, τ);
    }

    function pointLineStart(x, y) {
      context.moveTo(x, y);
      stream.point = pointLine;
    }

    function pointLine(x, y) {
      context.lineTo(x, y);
    }

    function lineEnd() {
      stream.point = point;
    }

    function lineEndPolygon() {
      context.closePath();
    }

    return stream;
  }

  function d3_geo_resample(project) {
    var δ2 = .5,
        cosMinDistance = Math.cos(30 * d3_radians),
        maxDepth = 16;

    function resample(stream) {
      return (maxDepth ? resampleRecursive : resampleNone)(stream);
    }

    function resampleNone(stream) {
      return d3_geo_transformPoint(stream, function (x, y) {
        x = project(x, y);
        stream.point(x[0], x[1]);
      });
    }

    function resampleRecursive(stream) {
      var λ00, φ00, x00, y00, a00, b00, c00, λ0, x0, y0, a0, b0, c0;
      var resample = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function () {
          stream.polygonStart();
          resample.lineStart = ringStart;
        },
        polygonEnd: function () {
          stream.polygonEnd();
          resample.lineStart = lineStart;
        }
      };

      function point(x, y) {
        x = project(x, y);
        stream.point(x[0], x[1]);
      }

      function lineStart() {
        x0 = NaN;
        resample.point = linePoint;
        stream.lineStart();
      }

      function linePoint(λ, φ) {
        var c = d3_geo_cartesian([λ, φ]),
            p = project(λ, φ);
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
        stream.point(x0, y0);
      }

      function lineEnd() {
        resample.point = point;
        stream.lineEnd();
      }

      function ringStart() {
        lineStart();
        resample.point = ringPoint;
        resample.lineEnd = ringEnd;
      }

      function ringPoint(λ, φ) {
        linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
        resample.point = linePoint;
      }

      function ringEnd() {
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream);
        resample.lineEnd = lineEnd;
        lineEnd();
      }

      return resample;
    }

    function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
      var dx = x1 - x0,
          dy = y1 - y0,
          d2 = dx * dx + dy * dy;

      if (d2 > 4 * δ2 && depth--) {
        var a = a0 + a1,
            b = b0 + b1,
            c = c0 + c1,
            m = Math.sqrt(a * a + b * b + c * c),
            φ2 = Math.asin(c /= m),
            λ2 = abs(abs(c) - 1) < ε || abs(λ0 - λ1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a),
            p = project(λ2, φ2),
            x2 = p[0],
            y2 = p[1],
            dx2 = x2 - x0,
            dy2 = y2 - y0,
            dz = dy * dx2 - dx * dy2;

        if (dz * dz / d2 > δ2 || abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
          resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream);
          stream.point(x2, y2);
          resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream);
        }
      }
    }

    resample.precision = function (_) {
      if (!arguments.length) return Math.sqrt(δ2);
      maxDepth = (δ2 = _ * _) > 0 && 16;
      return resample;
    };

    return resample;
  }

  d3.geo.path = function () {
    var pointRadius = 4.5,
        projection,
        context,
        projectStream,
        contextStream,
        cacheStream;

    function path(object) {
      if (object) {
        if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
        if (!cacheStream || !cacheStream.valid) cacheStream = projectStream(contextStream);
        d3.geo.stream(object, cacheStream);
      }

      return contextStream.result();
    }

    path.area = function (object) {
      d3_geo_pathAreaSum = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathArea));
      return d3_geo_pathAreaSum;
    };

    path.centroid = function (object) {
      d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
      return d3_geo_centroidZ2 ? [d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2] : d3_geo_centroidZ1 ? [d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1] : d3_geo_centroidZ0 ? [d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0] : [NaN, NaN];
    };

    path.bounds = function (object) {
      d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = Infinity);
      d3.geo.stream(object, projectStream(d3_geo_pathBounds));
      return [[d3_geo_pathBoundsX0, d3_geo_pathBoundsY0], [d3_geo_pathBoundsX1, d3_geo_pathBoundsY1]];
    };

    path.projection = function (_) {
      if (!arguments.length) return projection;
      projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
      return reset();
    };

    path.context = function (_) {
      if (!arguments.length) return context;
      contextStream = (context = _) == null ? new d3_geo_pathBuffer() : new d3_geo_pathContext(_);
      if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
      return reset();
    };

    path.pointRadius = function (_) {
      if (!arguments.length) return pointRadius;
      pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
      return path;
    };

    function reset() {
      cacheStream = null;
      return path;
    }

    return path.projection(d3.geo.albersUsa()).context(null);
  };

  function d3_geo_pathProjectStream(project) {
    var resample = d3_geo_resample(function (x, y) {
      return project([x * d3_degrees, y * d3_degrees]);
    });
    return function (stream) {
      return d3_geo_projectionRadians(resample(stream));
    };
  }

  d3.geo.transform = function (methods) {
    return {
      stream: function (stream) {
        var transform = new d3_geo_transform(stream);

        for (var k in methods) transform[k] = methods[k];

        return transform;
      }
    };
  };

  function d3_geo_transform(stream) {
    this.stream = stream;
  }

  d3_geo_transform.prototype = {
    point: function (x, y) {
      this.stream.point(x, y);
    },
    sphere: function () {
      this.stream.sphere();
    },
    lineStart: function () {
      this.stream.lineStart();
    },
    lineEnd: function () {
      this.stream.lineEnd();
    },
    polygonStart: function () {
      this.stream.polygonStart();
    },
    polygonEnd: function () {
      this.stream.polygonEnd();
    }
  };

  function d3_geo_transformPoint(stream, point) {
    return {
      point: point,
      sphere: function () {
        stream.sphere();
      },
      lineStart: function () {
        stream.lineStart();
      },
      lineEnd: function () {
        stream.lineEnd();
      },
      polygonStart: function () {
        stream.polygonStart();
      },
      polygonEnd: function () {
        stream.polygonEnd();
      }
    };
  }

  d3.geo.projection = d3_geo_projection;
  d3.geo.projectionMutator = d3_geo_projectionMutator;

  function d3_geo_projection(project) {
    return d3_geo_projectionMutator(function () {
      return project;
    })();
  }

  function d3_geo_projectionMutator(projectAt) {
    var project,
        rotate,
        projectRotate,
        projectResample = d3_geo_resample(function (x, y) {
      x = project(x, y);
      return [x[0] * k + δx, δy - x[1] * k];
    }),
        k = 150,
        x = 480,
        y = 250,
        λ = 0,
        φ = 0,
        δλ = 0,
        δφ = 0,
        δγ = 0,
        δx,
        δy,
        preclip = d3_geo_clipAntimeridian,
        postclip = d3_identity,
        clipAngle = null,
        clipExtent = null,
        stream;

    function projection(point) {
      point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
      return [point[0] * k + δx, δy - point[1] * k];
    }

    function invert(point) {
      point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k);
      return point && [point[0] * d3_degrees, point[1] * d3_degrees];
    }

    projection.stream = function (output) {
      if (stream) stream.valid = false;
      stream = d3_geo_projectionRadians(preclip(rotate, projectResample(postclip(output))));
      stream.valid = true;
      return stream;
    };

    projection.clipAngle = function (_) {
      if (!arguments.length) return clipAngle;
      preclip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians);
      return invalidate();
    };

    projection.clipExtent = function (_) {
      if (!arguments.length) return clipExtent;
      clipExtent = _;
      postclip = _ ? d3_geo_clipExtent(_[0][0], _[0][1], _[1][0], _[1][1]) : d3_identity;
      return invalidate();
    };

    projection.scale = function (_) {
      if (!arguments.length) return k;
      k = +_;
      return reset();
    };

    projection.translate = function (_) {
      if (!arguments.length) return [x, y];
      x = +_[0];
      y = +_[1];
      return reset();
    };

    projection.center = function (_) {
      if (!arguments.length) return [λ * d3_degrees, φ * d3_degrees];
      λ = _[0] % 360 * d3_radians;
      φ = _[1] % 360 * d3_radians;
      return reset();
    };

    projection.rotate = function (_) {
      if (!arguments.length) return [δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees];
      δλ = _[0] % 360 * d3_radians;
      δφ = _[1] % 360 * d3_radians;
      δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
      return reset();
    };

    d3.rebind(projection, projectResample, "precision");

    function reset() {
      projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
      var center = project(λ, φ);
      δx = x - center[0] * k;
      δy = y + center[1] * k;
      return invalidate();
    }

    function invalidate() {
      if (stream) stream.valid = false, stream = null;
      return projection;
    }

    return function () {
      project = projectAt.apply(this, arguments);
      projection.invert = project.invert && invert;
      return reset();
    };
  }

  function d3_geo_projectionRadians(stream) {
    return d3_geo_transformPoint(stream, function (x, y) {
      stream.point(x * d3_radians, y * d3_radians);
    });
  }

  function d3_geo_equirectangular(λ, φ) {
    return [λ, φ];
  }

  (d3.geo.equirectangular = function () {
    return d3_geo_projection(d3_geo_equirectangular);
  }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;

  d3.geo.rotation = function (rotate) {
    rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0);

    function forward(coordinates) {
      coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
    }

    forward.invert = function (coordinates) {
      coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
    };

    return forward;
  };

  function d3_geo_identityRotation(λ, φ) {
    return [λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ];
  }

  d3_geo_identityRotation.invert = d3_geo_equirectangular;

  function d3_geo_rotation(δλ, δφ, δγ) {
    return δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_identityRotation;
  }

  function d3_geo_forwardRotationλ(δλ) {
    return function (λ, φ) {
      return λ += δλ, [λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ];
    };
  }

  function d3_geo_rotationλ(δλ) {
    var rotation = d3_geo_forwardRotationλ(δλ);
    rotation.invert = d3_geo_forwardRotationλ(-δλ);
    return rotation;
  }

  function d3_geo_rotationφγ(δφ, δγ) {
    var cosδφ = Math.cos(δφ),
        sinδφ = Math.sin(δφ),
        cosδγ = Math.cos(δγ),
        sinδγ = Math.sin(δγ);

    function rotation(λ, φ) {
      var cosφ = Math.cos(φ),
          x = Math.cos(λ) * cosφ,
          y = Math.sin(λ) * cosφ,
          z = Math.sin(φ),
          k = z * cosδφ + x * sinδφ;
      return [Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), d3_asin(k * cosδγ + y * sinδγ)];
    }

    rotation.invert = function (λ, φ) {
      var cosφ = Math.cos(φ),
          x = Math.cos(λ) * cosφ,
          y = Math.sin(λ) * cosφ,
          z = Math.sin(φ),
          k = z * cosδγ - y * sinδγ;
      return [Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ), d3_asin(k * cosδφ - x * sinδφ)];
    };

    return rotation;
  }

  d3.geo.circle = function () {
    var origin = [0, 0],
        angle,
        precision = 6,
        interpolate;

    function circle() {
      var center = typeof origin === "function" ? origin.apply(this, arguments) : origin,
          rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert,
          ring = [];
      interpolate(null, null, 1, {
        point: function (x, y) {
          ring.push(x = rotate(x, y));
          x[0] *= d3_degrees, x[1] *= d3_degrees;
        }
      });
      return {
        type: "Polygon",
        coordinates: [ring]
      };
    }

    circle.origin = function (x) {
      if (!arguments.length) return origin;
      origin = x;
      return circle;
    };

    circle.angle = function (x) {
      if (!arguments.length) return angle;
      interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
      return circle;
    };

    circle.precision = function (_) {
      if (!arguments.length) return precision;
      interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
      return circle;
    };

    return circle.angle(90);
  };

  function d3_geo_circleInterpolate(radius, precision) {
    var cr = Math.cos(radius),
        sr = Math.sin(radius);
    return function (from, to, direction, listener) {
      var step = direction * precision;

      if (from != null) {
        from = d3_geo_circleAngle(cr, from);
        to = d3_geo_circleAngle(cr, to);
        if (direction > 0 ? from < to : from > to) from += direction * τ;
      } else {
        from = radius + direction * τ;
        to = radius - .5 * step;
      }

      for (var point, t = from; direction > 0 ? t > to : t < to; t -= step) {
        listener.point((point = d3_geo_spherical([cr, -sr * Math.cos(t), -sr * Math.sin(t)]))[0], point[1]);
      }
    };
  }

  function d3_geo_circleAngle(cr, point) {
    var a = d3_geo_cartesian(point);
    a[0] -= cr;
    d3_geo_cartesianNormalize(a);
    var angle = d3_acos(-a[1]);
    return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
  }

  d3.geo.distance = function (a, b) {
    var Δλ = (b[0] - a[0]) * d3_radians,
        φ0 = a[1] * d3_radians,
        φ1 = b[1] * d3_radians,
        sinΔλ = Math.sin(Δλ),
        cosΔλ = Math.cos(Δλ),
        sinφ0 = Math.sin(φ0),
        cosφ0 = Math.cos(φ0),
        sinφ1 = Math.sin(φ1),
        cosφ1 = Math.cos(φ1),
        t;
    return Math.atan2(Math.sqrt((t = cosφ1 * sinΔλ) * t + (t = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * t), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ);
  };

  d3.geo.graticule = function () {
    var x1,
        x0,
        X1,
        X0,
        y1,
        y0,
        Y1,
        Y0,
        dx = 10,
        dy = dx,
        DX = 90,
        DY = 360,
        x,
        y,
        X,
        Y,
        precision = 2.5;

    function graticule() {
      return {
        type: "MultiLineString",
        coordinates: lines()
      };
    }

    function lines() {
      return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function (x) {
        return abs(x % DX) > ε;
      }).map(x)).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function (y) {
        return abs(y % DY) > ε;
      }).map(y));
    }

    graticule.lines = function () {
      return lines().map(function (coordinates) {
        return {
          type: "LineString",
          coordinates: coordinates
        };
      });
    };

    graticule.outline = function () {
      return {
        type: "Polygon",
        coordinates: [X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1))]
      };
    };

    graticule.extent = function (_) {
      if (!arguments.length) return graticule.minorExtent();
      return graticule.majorExtent(_).minorExtent(_);
    };

    graticule.majorExtent = function (_) {
      if (!arguments.length) return [[X0, Y0], [X1, Y1]];
      X0 = +_[0][0], X1 = +_[1][0];
      Y0 = +_[0][1], Y1 = +_[1][1];
      if (X0 > X1) _ = X0, X0 = X1, X1 = _;
      if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
      return graticule.precision(precision);
    };

    graticule.minorExtent = function (_) {
      if (!arguments.length) return [[x0, y0], [x1, y1]];
      x0 = +_[0][0], x1 = +_[1][0];
      y0 = +_[0][1], y1 = +_[1][1];
      if (x0 > x1) _ = x0, x0 = x1, x1 = _;
      if (y0 > y1) _ = y0, y0 = y1, y1 = _;
      return graticule.precision(precision);
    };

    graticule.step = function (_) {
      if (!arguments.length) return graticule.minorStep();
      return graticule.majorStep(_).minorStep(_);
    };

    graticule.majorStep = function (_) {
      if (!arguments.length) return [DX, DY];
      DX = +_[0], DY = +_[1];
      return graticule;
    };

    graticule.minorStep = function (_) {
      if (!arguments.length) return [dx, dy];
      dx = +_[0], dy = +_[1];
      return graticule;
    };

    graticule.precision = function (_) {
      if (!arguments.length) return precision;
      precision = +_;
      x = d3_geo_graticuleX(y0, y1, 90);
      y = d3_geo_graticuleY(x0, x1, precision);
      X = d3_geo_graticuleX(Y0, Y1, 90);
      Y = d3_geo_graticuleY(X0, X1, precision);
      return graticule;
    };

    return graticule.majorExtent([[-180, -90 + ε], [180, 90 - ε]]).minorExtent([[-180, -80 - ε], [180, 80 + ε]]);
  };

  function d3_geo_graticuleX(y0, y1, dy) {
    var y = d3.range(y0, y1 - ε, dy).concat(y1);
    return function (x) {
      return y.map(function (y) {
        return [x, y];
      });
    };
  }

  function d3_geo_graticuleY(x0, x1, dx) {
    var x = d3.range(x0, x1 - ε, dx).concat(x1);
    return function (y) {
      return x.map(function (x) {
        return [x, y];
      });
    };
  }

  function d3_source(d) {
    return d.source;
  }

  function d3_target(d) {
    return d.target;
  }

  d3.geo.greatArc = function () {
    var source = d3_source,
        source_,
        target = d3_target,
        target_;

    function greatArc() {
      return {
        type: "LineString",
        coordinates: [source_ || source.apply(this, arguments), target_ || target.apply(this, arguments)]
      };
    }

    greatArc.distance = function () {
      return d3.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments));
    };

    greatArc.source = function (_) {
      if (!arguments.length) return source;
      source = _, source_ = typeof _ === "function" ? null : _;
      return greatArc;
    };

    greatArc.target = function (_) {
      if (!arguments.length) return target;
      target = _, target_ = typeof _ === "function" ? null : _;
      return greatArc;
    };

    greatArc.precision = function () {
      return arguments.length ? greatArc : 0;
    };

    return greatArc;
  };

  d3.geo.interpolate = function (source, target) {
    return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians);
  };

  function d3_geo_interpolate(x0, y0, x1, y1) {
    var cy0 = Math.cos(y0),
        sy0 = Math.sin(y0),
        cy1 = Math.cos(y1),
        sy1 = Math.sin(y1),
        kx0 = cy0 * Math.cos(x0),
        ky0 = cy0 * Math.sin(x0),
        kx1 = cy1 * Math.cos(x1),
        ky1 = cy1 * Math.sin(x1),
        d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0))),
        k = 1 / Math.sin(d);
    var interpolate = d ? function (t) {
      var B = Math.sin(t *= d) * k,
          A = Math.sin(d - t) * k,
          x = A * kx0 + B * kx1,
          y = A * ky0 + B * ky1,
          z = A * sy0 + B * sy1;
      return [Math.atan2(y, x) * d3_degrees, Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees];
    } : function () {
      return [x0 * d3_degrees, y0 * d3_degrees];
    };
    interpolate.distance = d;
    return interpolate;
  }

  d3.geo.length = function (object) {
    d3_geo_lengthSum = 0;
    d3.geo.stream(object, d3_geo_length);
    return d3_geo_lengthSum;
  };

  var d3_geo_lengthSum;
  var d3_geo_length = {
    sphere: d3_noop,
    point: d3_noop,
    lineStart: d3_geo_lengthLineStart,
    lineEnd: d3_noop,
    polygonStart: d3_noop,
    polygonEnd: d3_noop
  };

  function d3_geo_lengthLineStart() {
    var λ0, sinφ0, cosφ0;

    d3_geo_length.point = function (λ, φ) {
      λ0 = λ * d3_radians, sinφ0 = Math.sin(φ *= d3_radians), cosφ0 = Math.cos(φ);
      d3_geo_length.point = nextPoint;
    };

    d3_geo_length.lineEnd = function () {
      d3_geo_length.point = d3_geo_length.lineEnd = d3_noop;
    };

    function nextPoint(λ, φ) {
      var sinφ = Math.sin(φ *= d3_radians),
          cosφ = Math.cos(φ),
          t = abs((λ *= d3_radians) - λ0),
          cosΔλ = Math.cos(t);
      d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosφ * Math.sin(t)) * t + (t = cosφ0 * sinφ - sinφ0 * cosφ * cosΔλ) * t), sinφ0 * sinφ + cosφ0 * cosφ * cosΔλ);
      λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ;
    }
  }

  function d3_geo_azimuthal(scale, angle) {
    function azimuthal(λ, φ) {
      var cosλ = Math.cos(λ),
          cosφ = Math.cos(φ),
          k = scale(cosλ * cosφ);
      return [k * cosφ * Math.sin(λ), k * Math.sin(φ)];
    }

    azimuthal.invert = function (x, y) {
      var ρ = Math.sqrt(x * x + y * y),
          c = angle(ρ),
          sinc = Math.sin(c),
          cosc = Math.cos(c);
      return [Math.atan2(x * sinc, ρ * cosc), Math.asin(ρ && y * sinc / ρ)];
    };

    return azimuthal;
  }

  var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function (cosλcosφ) {
    return Math.sqrt(2 / (1 + cosλcosφ));
  }, function (ρ) {
    return 2 * Math.asin(ρ / 2);
  });
  (d3.geo.azimuthalEqualArea = function () {
    return d3_geo_projection(d3_geo_azimuthalEqualArea);
  }).raw = d3_geo_azimuthalEqualArea;
  var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function (cosλcosφ) {
    var c = Math.acos(cosλcosφ);
    return c && c / Math.sin(c);
  }, d3_identity);
  (d3.geo.azimuthalEquidistant = function () {
    return d3_geo_projection(d3_geo_azimuthalEquidistant);
  }).raw = d3_geo_azimuthalEquidistant;

  function d3_geo_conicConformal(φ0, φ1) {
    var cosφ0 = Math.cos(φ0),
        t = function (φ) {
      return Math.tan(π / 4 + φ / 2);
    },
        n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)),
        F = cosφ0 * Math.pow(t(φ0), n) / n;

    if (!n) return d3_geo_mercator;

    function forward(λ, φ) {
      if (F > 0) {
        if (φ < -halfπ + ε) φ = -halfπ + ε;
      } else {
        if (φ > halfπ - ε) φ = halfπ - ε;
      }

      var ρ = F / Math.pow(t(φ), n);
      return [ρ * Math.sin(n * λ), F - ρ * Math.cos(n * λ)];
    }

    forward.invert = function (x, y) {
      var ρ0_y = F - y,
          ρ = d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
      return [Math.atan2(x, ρ0_y) / n, 2 * Math.atan(Math.pow(F / ρ, 1 / n)) - halfπ];
    };

    return forward;
  }

  (d3.geo.conicConformal = function () {
    return d3_geo_conic(d3_geo_conicConformal);
  }).raw = d3_geo_conicConformal;

  function d3_geo_conicEquidistant(φ0, φ1) {
    var cosφ0 = Math.cos(φ0),
        n = φ0 === φ1 ? Math.sin(φ0) : (cosφ0 - Math.cos(φ1)) / (φ1 - φ0),
        G = cosφ0 / n + φ0;
    if (abs(n) < ε) return d3_geo_equirectangular;

    function forward(λ, φ) {
      var ρ = G - φ;
      return [ρ * Math.sin(n * λ), G - ρ * Math.cos(n * λ)];
    }

    forward.invert = function (x, y) {
      var ρ0_y = G - y;
      return [Math.atan2(x, ρ0_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y)];
    };

    return forward;
  }

  (d3.geo.conicEquidistant = function () {
    return d3_geo_conic(d3_geo_conicEquidistant);
  }).raw = d3_geo_conicEquidistant;
  var d3_geo_gnomonic = d3_geo_azimuthal(function (cosλcosφ) {
    return 1 / cosλcosφ;
  }, Math.atan);
  (d3.geo.gnomonic = function () {
    return d3_geo_projection(d3_geo_gnomonic);
  }).raw = d3_geo_gnomonic;

  function d3_geo_mercator(λ, φ) {
    return [λ, Math.log(Math.tan(π / 4 + φ / 2))];
  }

  d3_geo_mercator.invert = function (x, y) {
    return [x, 2 * Math.atan(Math.exp(y)) - halfπ];
  };

  function d3_geo_mercatorProjection(project) {
    var m = d3_geo_projection(project),
        scale = m.scale,
        translate = m.translate,
        clipExtent = m.clipExtent,
        clipAuto;

    m.scale = function () {
      var v = scale.apply(m, arguments);
      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
    };

    m.translate = function () {
      var v = translate.apply(m, arguments);
      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
    };

    m.clipExtent = function (_) {
      var v = clipExtent.apply(m, arguments);

      if (v === m) {
        if (clipAuto = _ == null) {
          var k = π * scale(),
              t = translate();
          clipExtent([[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]]);
        }
      } else if (clipAuto) {
        v = null;
      }

      return v;
    };

    return m.clipExtent(null);
  }

  (d3.geo.mercator = function () {
    return d3_geo_mercatorProjection(d3_geo_mercator);
  }).raw = d3_geo_mercator;
  var d3_geo_orthographic = d3_geo_azimuthal(function () {
    return 1;
  }, Math.asin);
  (d3.geo.orthographic = function () {
    return d3_geo_projection(d3_geo_orthographic);
  }).raw = d3_geo_orthographic;
  var d3_geo_stereographic = d3_geo_azimuthal(function (cosλcosφ) {
    return 1 / (1 + cosλcosφ);
  }, function (ρ) {
    return 2 * Math.atan(ρ);
  });
  (d3.geo.stereographic = function () {
    return d3_geo_projection(d3_geo_stereographic);
  }).raw = d3_geo_stereographic;

  function d3_geo_transverseMercator(λ, φ) {
    return [Math.log(Math.tan(π / 4 + φ / 2)), -λ];
  }

  d3_geo_transverseMercator.invert = function (x, y) {
    return [-y, 2 * Math.atan(Math.exp(x)) - halfπ];
  };

  (d3.geo.transverseMercator = function () {
    var projection = d3_geo_mercatorProjection(d3_geo_transverseMercator),
        center = projection.center,
        rotate = projection.rotate;

    projection.center = function (_) {
      return _ ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
    };

    projection.rotate = function (_) {
      return _ ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
    };

    return rotate([0, 0, 90]);
  }).raw = d3_geo_transverseMercator;
  d3.geom = {};

  function d3_geom_pointX(d) {
    return d[0];
  }

  function d3_geom_pointY(d) {
    return d[1];
  }

  d3.geom.hull = function (vertices) {
    var x = d3_geom_pointX,
        y = d3_geom_pointY;
    if (arguments.length) return hull(vertices);

    function hull(data) {
      if (data.length < 3) return [];
      var fx = d3_functor(x),
          fy = d3_functor(y),
          i,
          n = data.length,
          points = [],
          flippedPoints = [];

      for (i = 0; i < n; i++) {
        points.push([+fx.call(this, data[i], i), +fy.call(this, data[i], i), i]);
      }

      points.sort(d3_geom_hullOrder);

      for (i = 0; i < n; i++) flippedPoints.push([points[i][0], -points[i][1]]);

      var upper = d3_geom_hullUpper(points),
          lower = d3_geom_hullUpper(flippedPoints);
      var skipLeft = lower[0] === upper[0],
          skipRight = lower[lower.length - 1] === upper[upper.length - 1],
          polygon = [];

      for (i = upper.length - 1; i >= 0; --i) polygon.push(data[points[upper[i]][2]]);

      for (i = +skipLeft; i < lower.length - skipRight; ++i) polygon.push(data[points[lower[i]][2]]);

      return polygon;
    }

    hull.x = function (_) {
      return arguments.length ? (x = _, hull) : x;
    };

    hull.y = function (_) {
      return arguments.length ? (y = _, hull) : y;
    };

    return hull;
  };

  function d3_geom_hullUpper(points) {
    var n = points.length,
        hull = [0, 1],
        hs = 2;

    for (var i = 2; i < n; i++) {
      while (hs > 1 && d3_cross2d(points[hull[hs - 2]], points[hull[hs - 1]], points[i]) <= 0) --hs;

      hull[hs++] = i;
    }

    return hull.slice(0, hs);
  }

  function d3_geom_hullOrder(a, b) {
    return a[0] - b[0] || a[1] - b[1];
  }

  d3.geom.polygon = function (coordinates) {
    d3_subclass(coordinates, d3_geom_polygonPrototype);
    return coordinates;
  };

  var d3_geom_polygonPrototype = d3.geom.polygon.prototype = [];

  d3_geom_polygonPrototype.area = function () {
    var i = -1,
        n = this.length,
        a,
        b = this[n - 1],
        area = 0;

    while (++i < n) {
      a = b;
      b = this[i];
      area += a[1] * b[0] - a[0] * b[1];
    }

    return area * .5;
  };

  d3_geom_polygonPrototype.centroid = function (k) {
    var i = -1,
        n = this.length,
        x = 0,
        y = 0,
        a,
        b = this[n - 1],
        c;
    if (!arguments.length) k = -1 / (6 * this.area());

    while (++i < n) {
      a = b;
      b = this[i];
      c = a[0] * b[1] - b[0] * a[1];
      x += (a[0] + b[0]) * c;
      y += (a[1] + b[1]) * c;
    }

    return [x * k, y * k];
  };

  d3_geom_polygonPrototype.clip = function (subject) {
    var input,
        closed = d3_geom_polygonClosed(subject),
        i = -1,
        n = this.length - d3_geom_polygonClosed(this),
        j,
        m,
        a = this[n - 1],
        b,
        c,
        d;

    while (++i < n) {
      input = subject.slice();
      subject.length = 0;
      b = this[i];
      c = input[(m = input.length - closed) - 1];
      j = -1;

      while (++j < m) {
        d = input[j];

        if (d3_geom_polygonInside(d, a, b)) {
          if (!d3_geom_polygonInside(c, a, b)) {
            subject.push(d3_geom_polygonIntersect(c, d, a, b));
          }

          subject.push(d);
        } else if (d3_geom_polygonInside(c, a, b)) {
          subject.push(d3_geom_polygonIntersect(c, d, a, b));
        }

        c = d;
      }

      if (closed) subject.push(subject[0]);
      a = b;
    }

    return subject;
  };

  function d3_geom_polygonInside(p, a, b) {
    return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
  }

  function d3_geom_polygonIntersect(c, d, a, b) {
    var x1 = c[0],
        x3 = a[0],
        x21 = d[0] - x1,
        x43 = b[0] - x3,
        y1 = c[1],
        y3 = a[1],
        y21 = d[1] - y1,
        y43 = b[1] - y3,
        ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
    return [x1 + ua * x21, y1 + ua * y21];
  }

  function d3_geom_polygonClosed(coordinates) {
    var a = coordinates[0],
        b = coordinates[coordinates.length - 1];
    return !(a[0] - b[0] || a[1] - b[1]);
  }

  var d3_geom_voronoiEdges,
      d3_geom_voronoiCells,
      d3_geom_voronoiBeaches,
      d3_geom_voronoiBeachPool = [],
      d3_geom_voronoiFirstCircle,
      d3_geom_voronoiCircles,
      d3_geom_voronoiCirclePool = [];

  function d3_geom_voronoiBeach() {
    d3_geom_voronoiRedBlackNode(this);
    this.edge = this.site = this.circle = null;
  }

  function d3_geom_voronoiCreateBeach(site) {
    var beach = d3_geom_voronoiBeachPool.pop() || new d3_geom_voronoiBeach();
    beach.site = site;
    return beach;
  }

  function d3_geom_voronoiDetachBeach(beach) {
    d3_geom_voronoiDetachCircle(beach);
    d3_geom_voronoiBeaches.remove(beach);
    d3_geom_voronoiBeachPool.push(beach);
    d3_geom_voronoiRedBlackNode(beach);
  }

  function d3_geom_voronoiRemoveBeach(beach) {
    var circle = beach.circle,
        x = circle.x,
        y = circle.cy,
        vertex = {
      x: x,
      y: y
    },
        previous = beach.P,
        next = beach.N,
        disappearing = [beach];
    d3_geom_voronoiDetachBeach(beach);
    var lArc = previous;

    while (lArc.circle && abs(x - lArc.circle.x) < ε && abs(y - lArc.circle.cy) < ε) {
      previous = lArc.P;
      disappearing.unshift(lArc);
      d3_geom_voronoiDetachBeach(lArc);
      lArc = previous;
    }

    disappearing.unshift(lArc);
    d3_geom_voronoiDetachCircle(lArc);
    var rArc = next;

    while (rArc.circle && abs(x - rArc.circle.x) < ε && abs(y - rArc.circle.cy) < ε) {
      next = rArc.N;
      disappearing.push(rArc);
      d3_geom_voronoiDetachBeach(rArc);
      rArc = next;
    }

    disappearing.push(rArc);
    d3_geom_voronoiDetachCircle(rArc);
    var nArcs = disappearing.length,
        iArc;

    for (iArc = 1; iArc < nArcs; ++iArc) {
      rArc = disappearing[iArc];
      lArc = disappearing[iArc - 1];
      d3_geom_voronoiSetEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
    }

    lArc = disappearing[0];
    rArc = disappearing[nArcs - 1];
    rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, null, vertex);
    d3_geom_voronoiAttachCircle(lArc);
    d3_geom_voronoiAttachCircle(rArc);
  }

  function d3_geom_voronoiAddBeach(site) {
    var x = site.x,
        directrix = site.y,
        lArc,
        rArc,
        dxl,
        dxr,
        node = d3_geom_voronoiBeaches._;

    while (node) {
      dxl = d3_geom_voronoiLeftBreakPoint(node, directrix) - x;
      if (dxl > ε) node = node.L;else {
        dxr = x - d3_geom_voronoiRightBreakPoint(node, directrix);

        if (dxr > ε) {
          if (!node.R) {
            lArc = node;
            break;
          }

          node = node.R;
        } else {
          if (dxl > -ε) {
            lArc = node.P;
            rArc = node;
          } else if (dxr > -ε) {
            lArc = node;
            rArc = node.N;
          } else {
            lArc = rArc = node;
          }

          break;
        }
      }
    }

    var newArc = d3_geom_voronoiCreateBeach(site);
    d3_geom_voronoiBeaches.insert(lArc, newArc);
    if (!lArc && !rArc) return;

    if (lArc === rArc) {
      d3_geom_voronoiDetachCircle(lArc);
      rArc = d3_geom_voronoiCreateBeach(lArc.site);
      d3_geom_voronoiBeaches.insert(newArc, rArc);
      newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
      d3_geom_voronoiAttachCircle(lArc);
      d3_geom_voronoiAttachCircle(rArc);
      return;
    }

    if (!rArc) {
      newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
      return;
    }

    d3_geom_voronoiDetachCircle(lArc);
    d3_geom_voronoiDetachCircle(rArc);
    var lSite = lArc.site,
        ax = lSite.x,
        ay = lSite.y,
        bx = site.x - ax,
        by = site.y - ay,
        rSite = rArc.site,
        cx = rSite.x - ax,
        cy = rSite.y - ay,
        d = 2 * (bx * cy - by * cx),
        hb = bx * bx + by * by,
        hc = cx * cx + cy * cy,
        vertex = {
      x: (cy * hb - by * hc) / d + ax,
      y: (bx * hc - cx * hb) / d + ay
    };
    d3_geom_voronoiSetEdgeEnd(rArc.edge, lSite, rSite, vertex);
    newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null, vertex);
    rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null, vertex);
    d3_geom_voronoiAttachCircle(lArc);
    d3_geom_voronoiAttachCircle(rArc);
  }

  function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
    var site = arc.site,
        rfocx = site.x,
        rfocy = site.y,
        pby2 = rfocy - directrix;
    if (!pby2) return rfocx;
    var lArc = arc.P;
    if (!lArc) return -Infinity;
    site = lArc.site;
    var lfocx = site.x,
        lfocy = site.y,
        plby2 = lfocy - directrix;
    if (!plby2) return lfocx;
    var hl = lfocx - rfocx,
        aby2 = 1 / pby2 - 1 / plby2,
        b = hl / plby2;
    if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
    return (rfocx + lfocx) / 2;
  }

  function d3_geom_voronoiRightBreakPoint(arc, directrix) {
    var rArc = arc.N;
    if (rArc) return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
    var site = arc.site;
    return site.y === directrix ? site.x : Infinity;
  }

  function d3_geom_voronoiCell(site) {
    this.site = site;
    this.edges = [];
  }

  d3_geom_voronoiCell.prototype.prepare = function () {
    var halfEdges = this.edges,
        iHalfEdge = halfEdges.length,
        edge;

    while (iHalfEdge--) {
      edge = halfEdges[iHalfEdge].edge;
      if (!edge.b || !edge.a) halfEdges.splice(iHalfEdge, 1);
    }

    halfEdges.sort(d3_geom_voronoiHalfEdgeOrder);
    return halfEdges.length;
  };

  function d3_geom_voronoiCloseCells(extent) {
    var x0 = extent[0][0],
        x1 = extent[1][0],
        y0 = extent[0][1],
        y1 = extent[1][1],
        x2,
        y2,
        x3,
        y3,
        cells = d3_geom_voronoiCells,
        iCell = cells.length,
        cell,
        iHalfEdge,
        halfEdges,
        nHalfEdges,
        start,
        end;

    while (iCell--) {
      cell = cells[iCell];
      if (!cell || !cell.prepare()) continue;
      halfEdges = cell.edges;
      nHalfEdges = halfEdges.length;
      iHalfEdge = 0;

      while (iHalfEdge < nHalfEdges) {
        end = halfEdges[iHalfEdge].end(), x3 = end.x, y3 = end.y;
        start = halfEdges[++iHalfEdge % nHalfEdges].start(), x2 = start.x, y2 = start.y;

        if (abs(x3 - x2) > ε || abs(y3 - y2) > ε) {
          halfEdges.splice(iHalfEdge, 0, new d3_geom_voronoiHalfEdge(d3_geom_voronoiCreateBorderEdge(cell.site, end, abs(x3 - x0) < ε && y1 - y3 > ε ? {
            x: x0,
            y: abs(x2 - x0) < ε ? y2 : y1
          } : abs(y3 - y1) < ε && x1 - x3 > ε ? {
            x: abs(y2 - y1) < ε ? x2 : x1,
            y: y1
          } : abs(x3 - x1) < ε && y3 - y0 > ε ? {
            x: x1,
            y: abs(x2 - x1) < ε ? y2 : y0
          } : abs(y3 - y0) < ε && x3 - x0 > ε ? {
            x: abs(y2 - y0) < ε ? x2 : x0,
            y: y0
          } : null), cell.site, null));
          ++nHalfEdges;
        }
      }
    }
  }

  function d3_geom_voronoiHalfEdgeOrder(a, b) {
    return b.angle - a.angle;
  }

  function d3_geom_voronoiCircle() {
    d3_geom_voronoiRedBlackNode(this);
    this.x = this.y = this.arc = this.site = this.cy = null;
  }

  function d3_geom_voronoiAttachCircle(arc) {
    var lArc = arc.P,
        rArc = arc.N;
    if (!lArc || !rArc) return;
    var lSite = lArc.site,
        cSite = arc.site,
        rSite = rArc.site;
    if (lSite === rSite) return;
    var bx = cSite.x,
        by = cSite.y,
        ax = lSite.x - bx,
        ay = lSite.y - by,
        cx = rSite.x - bx,
        cy = rSite.y - by;
    var d = 2 * (ax * cy - ay * cx);
    if (d >= -ε2) return;
    var ha = ax * ax + ay * ay,
        hc = cx * cx + cy * cy,
        x = (cy * ha - ay * hc) / d,
        y = (ax * hc - cx * ha) / d,
        cy = y + by;
    var circle = d3_geom_voronoiCirclePool.pop() || new d3_geom_voronoiCircle();
    circle.arc = arc;
    circle.site = cSite;
    circle.x = x + bx;
    circle.y = cy + Math.sqrt(x * x + y * y);
    circle.cy = cy;
    arc.circle = circle;
    var before = null,
        node = d3_geom_voronoiCircles._;

    while (node) {
      if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
        if (node.L) node = node.L;else {
          before = node.P;
          break;
        }
      } else {
        if (node.R) node = node.R;else {
          before = node;
          break;
        }
      }
    }

    d3_geom_voronoiCircles.insert(before, circle);
    if (!before) d3_geom_voronoiFirstCircle = circle;
  }

  function d3_geom_voronoiDetachCircle(arc) {
    var circle = arc.circle;

    if (circle) {
      if (!circle.P) d3_geom_voronoiFirstCircle = circle.N;
      d3_geom_voronoiCircles.remove(circle);
      d3_geom_voronoiCirclePool.push(circle);
      d3_geom_voronoiRedBlackNode(circle);
      arc.circle = null;
    }
  }

  function d3_geom_voronoiClipEdges(extent) {
    var edges = d3_geom_voronoiEdges,
        clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]),
        i = edges.length,
        e;

    while (i--) {
      e = edges[i];

      if (!d3_geom_voronoiConnectEdge(e, extent) || !clip(e) || abs(e.a.x - e.b.x) < ε && abs(e.a.y - e.b.y) < ε) {
        e.a = e.b = null;
        edges.splice(i, 1);
      }
    }
  }

  function d3_geom_voronoiConnectEdge(edge, extent) {
    var vb = edge.b;
    if (vb) return true;
    var va = edge.a,
        x0 = extent[0][0],
        x1 = extent[1][0],
        y0 = extent[0][1],
        y1 = extent[1][1],
        lSite = edge.l,
        rSite = edge.r,
        lx = lSite.x,
        ly = lSite.y,
        rx = rSite.x,
        ry = rSite.y,
        fx = (lx + rx) / 2,
        fy = (ly + ry) / 2,
        fm,
        fb;

    if (ry === ly) {
      if (fx < x0 || fx >= x1) return;

      if (lx > rx) {
        if (!va) va = {
          x: fx,
          y: y0
        };else if (va.y >= y1) return;
        vb = {
          x: fx,
          y: y1
        };
      } else {
        if (!va) va = {
          x: fx,
          y: y1
        };else if (va.y < y0) return;
        vb = {
          x: fx,
          y: y0
        };
      }
    } else {
      fm = (lx - rx) / (ry - ly);
      fb = fy - fm * fx;

      if (fm < -1 || fm > 1) {
        if (lx > rx) {
          if (!va) va = {
            x: (y0 - fb) / fm,
            y: y0
          };else if (va.y >= y1) return;
          vb = {
            x: (y1 - fb) / fm,
            y: y1
          };
        } else {
          if (!va) va = {
            x: (y1 - fb) / fm,
            y: y1
          };else if (va.y < y0) return;
          vb = {
            x: (y0 - fb) / fm,
            y: y0
          };
        }
      } else {
        if (ly < ry) {
          if (!va) va = {
            x: x0,
            y: fm * x0 + fb
          };else if (va.x >= x1) return;
          vb = {
            x: x1,
            y: fm * x1 + fb
          };
        } else {
          if (!va) va = {
            x: x1,
            y: fm * x1 + fb
          };else if (va.x < x0) return;
          vb = {
            x: x0,
            y: fm * x0 + fb
          };
        }
      }
    }

    edge.a = va;
    edge.b = vb;
    return true;
  }

  function d3_geom_voronoiEdge(lSite, rSite) {
    this.l = lSite;
    this.r = rSite;
    this.a = this.b = null;
  }

  function d3_geom_voronoiCreateEdge(lSite, rSite, va, vb) {
    var edge = new d3_geom_voronoiEdge(lSite, rSite);
    d3_geom_voronoiEdges.push(edge);
    if (va) d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, va);
    if (vb) d3_geom_voronoiSetEdgeEnd(edge, rSite, lSite, vb);
    d3_geom_voronoiCells[lSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, lSite, rSite));
    d3_geom_voronoiCells[rSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, rSite, lSite));
    return edge;
  }

  function d3_geom_voronoiCreateBorderEdge(lSite, va, vb) {
    var edge = new d3_geom_voronoiEdge(lSite, null);
    edge.a = va;
    edge.b = vb;
    d3_geom_voronoiEdges.push(edge);
    return edge;
  }

  function d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
    if (!edge.a && !edge.b) {
      edge.a = vertex;
      edge.l = lSite;
      edge.r = rSite;
    } else if (edge.l === rSite) {
      edge.b = vertex;
    } else {
      edge.a = vertex;
    }
  }

  function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
    var va = edge.a,
        vb = edge.b;
    this.edge = edge;
    this.site = lSite;
    this.angle = rSite ? Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x) : edge.l === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y) : Math.atan2(va.x - vb.x, vb.y - va.y);
  }

  d3_geom_voronoiHalfEdge.prototype = {
    start: function () {
      return this.edge.l === this.site ? this.edge.a : this.edge.b;
    },
    end: function () {
      return this.edge.l === this.site ? this.edge.b : this.edge.a;
    }
  };

  function d3_geom_voronoiRedBlackTree() {
    this._ = null;
  }

  function d3_geom_voronoiRedBlackNode(node) {
    node.U = node.C = node.L = node.R = node.P = node.N = null;
  }

  d3_geom_voronoiRedBlackTree.prototype = {
    insert: function (after, node) {
      var parent, grandpa, uncle;

      if (after) {
        node.P = after;
        node.N = after.N;
        if (after.N) after.N.P = node;
        after.N = node;

        if (after.R) {
          after = after.R;

          while (after.L) after = after.L;

          after.L = node;
        } else {
          after.R = node;
        }

        parent = after;
      } else if (this._) {
        after = d3_geom_voronoiRedBlackFirst(this._);
        node.P = null;
        node.N = after;
        after.P = after.L = node;
        parent = after;
      } else {
        node.P = node.N = null;
        this._ = node;
        parent = null;
      }

      node.L = node.R = null;
      node.U = parent;
      node.C = true;
      after = node;

      while (parent && parent.C) {
        grandpa = parent.U;

        if (parent === grandpa.L) {
          uncle = grandpa.R;

          if (uncle && uncle.C) {
            parent.C = uncle.C = false;
            grandpa.C = true;
            after = grandpa;
          } else {
            if (after === parent.R) {
              d3_geom_voronoiRedBlackRotateLeft(this, parent);
              after = parent;
              parent = after.U;
            }

            parent.C = false;
            grandpa.C = true;
            d3_geom_voronoiRedBlackRotateRight(this, grandpa);
          }
        } else {
          uncle = grandpa.L;

          if (uncle && uncle.C) {
            parent.C = uncle.C = false;
            grandpa.C = true;
            after = grandpa;
          } else {
            if (after === parent.L) {
              d3_geom_voronoiRedBlackRotateRight(this, parent);
              after = parent;
              parent = after.U;
            }

            parent.C = false;
            grandpa.C = true;
            d3_geom_voronoiRedBlackRotateLeft(this, grandpa);
          }
        }

        parent = after.U;
      }

      this._.C = false;
    },
    remove: function (node) {
      if (node.N) node.N.P = node.P;
      if (node.P) node.P.N = node.N;
      node.N = node.P = null;
      var parent = node.U,
          sibling,
          left = node.L,
          right = node.R,
          next,
          red;
      if (!left) next = right;else if (!right) next = left;else next = d3_geom_voronoiRedBlackFirst(right);

      if (parent) {
        if (parent.L === node) parent.L = next;else parent.R = next;
      } else {
        this._ = next;
      }

      if (left && right) {
        red = next.C;
        next.C = node.C;
        next.L = left;
        left.U = next;

        if (next !== right) {
          parent = next.U;
          next.U = node.U;
          node = next.R;
          parent.L = node;
          next.R = right;
          right.U = next;
        } else {
          next.U = parent;
          parent = next;
          node = next.R;
        }
      } else {
        red = node.C;
        node = next;
      }

      if (node) node.U = parent;
      if (red) return;

      if (node && node.C) {
        node.C = false;
        return;
      }

      do {
        if (node === this._) break;

        if (node === parent.L) {
          sibling = parent.R;

          if (sibling.C) {
            sibling.C = false;
            parent.C = true;
            d3_geom_voronoiRedBlackRotateLeft(this, parent);
            sibling = parent.R;
          }

          if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
            if (!sibling.R || !sibling.R.C) {
              sibling.L.C = false;
              sibling.C = true;
              d3_geom_voronoiRedBlackRotateRight(this, sibling);
              sibling = parent.R;
            }

            sibling.C = parent.C;
            parent.C = sibling.R.C = false;
            d3_geom_voronoiRedBlackRotateLeft(this, parent);
            node = this._;
            break;
          }
        } else {
          sibling = parent.L;

          if (sibling.C) {
            sibling.C = false;
            parent.C = true;
            d3_geom_voronoiRedBlackRotateRight(this, parent);
            sibling = parent.L;
          }

          if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
            if (!sibling.L || !sibling.L.C) {
              sibling.R.C = false;
              sibling.C = true;
              d3_geom_voronoiRedBlackRotateLeft(this, sibling);
              sibling = parent.L;
            }

            sibling.C = parent.C;
            parent.C = sibling.L.C = false;
            d3_geom_voronoiRedBlackRotateRight(this, parent);
            node = this._;
            break;
          }
        }

        sibling.C = true;
        node = parent;
        parent = parent.U;
      } while (!node.C);

      if (node) node.C = false;
    }
  };

  function d3_geom_voronoiRedBlackRotateLeft(tree, node) {
    var p = node,
        q = node.R,
        parent = p.U;

    if (parent) {
      if (parent.L === p) parent.L = q;else parent.R = q;
    } else {
      tree._ = q;
    }

    q.U = parent;
    p.U = q;
    p.R = q.L;
    if (p.R) p.R.U = p;
    q.L = p;
  }

  function d3_geom_voronoiRedBlackRotateRight(tree, node) {
    var p = node,
        q = node.L,
        parent = p.U;

    if (parent) {
      if (parent.L === p) parent.L = q;else parent.R = q;
    } else {
      tree._ = q;
    }

    q.U = parent;
    p.U = q;
    p.L = q.R;
    if (p.L) p.L.U = p;
    q.R = p;
  }

  function d3_geom_voronoiRedBlackFirst(node) {
    while (node.L) node = node.L;

    return node;
  }

  function d3_geom_voronoi(sites, bbox) {
    var site = sites.sort(d3_geom_voronoiVertexOrder).pop(),
        x0,
        y0,
        circle;
    d3_geom_voronoiEdges = [];
    d3_geom_voronoiCells = new Array(sites.length);
    d3_geom_voronoiBeaches = new d3_geom_voronoiRedBlackTree();
    d3_geom_voronoiCircles = new d3_geom_voronoiRedBlackTree();

    while (true) {
      circle = d3_geom_voronoiFirstCircle;

      if (site && (!circle || site.y < circle.y || site.y === circle.y && site.x < circle.x)) {
        if (site.x !== x0 || site.y !== y0) {
          d3_geom_voronoiCells[site.i] = new d3_geom_voronoiCell(site);
          d3_geom_voronoiAddBeach(site);
          x0 = site.x, y0 = site.y;
        }

        site = sites.pop();
      } else if (circle) {
        d3_geom_voronoiRemoveBeach(circle.arc);
      } else {
        break;
      }
    }

    if (bbox) d3_geom_voronoiClipEdges(bbox), d3_geom_voronoiCloseCells(bbox);
    var diagram = {
      cells: d3_geom_voronoiCells,
      edges: d3_geom_voronoiEdges
    };
    d3_geom_voronoiBeaches = d3_geom_voronoiCircles = d3_geom_voronoiEdges = d3_geom_voronoiCells = null;
    return diagram;
  }

  function d3_geom_voronoiVertexOrder(a, b) {
    return b.y - a.y || b.x - a.x;
  }

  d3.geom.voronoi = function (points) {
    var x = d3_geom_pointX,
        y = d3_geom_pointY,
        fx = x,
        fy = y,
        clipExtent = d3_geom_voronoiClipExtent;
    if (points) return voronoi(points);

    function voronoi(data) {
      var polygons = new Array(data.length),
          x0 = clipExtent[0][0],
          y0 = clipExtent[0][1],
          x1 = clipExtent[1][0],
          y1 = clipExtent[1][1];
      d3_geom_voronoi(sites(data), clipExtent).cells.forEach(function (cell, i) {
        var edges = cell.edges,
            site = cell.site,
            polygon = polygons[i] = edges.length ? edges.map(function (e) {
          var s = e.start();
          return [s.x, s.y];
        }) : site.x >= x0 && site.x <= x1 && site.y >= y0 && site.y <= y1 ? [[x0, y1], [x1, y1], [x1, y0], [x0, y0]] : [];
        polygon.point = data[i];
      });
      return polygons;
    }

    function sites(data) {
      return data.map(function (d, i) {
        return {
          x: Math.round(fx(d, i) / ε) * ε,
          y: Math.round(fy(d, i) / ε) * ε,
          i: i
        };
      });
    }

    voronoi.links = function (data) {
      return d3_geom_voronoi(sites(data)).edges.filter(function (edge) {
        return edge.l && edge.r;
      }).map(function (edge) {
        return {
          source: data[edge.l.i],
          target: data[edge.r.i]
        };
      });
    };

    voronoi.triangles = function (data) {
      var triangles = [];
      d3_geom_voronoi(sites(data)).cells.forEach(function (cell, i) {
        var site = cell.site,
            edges = cell.edges.sort(d3_geom_voronoiHalfEdgeOrder),
            j = -1,
            m = edges.length,
            e0,
            s0,
            e1 = edges[m - 1].edge,
            s1 = e1.l === site ? e1.r : e1.l;

        while (++j < m) {
          e0 = e1;
          s0 = s1;
          e1 = edges[j].edge;
          s1 = e1.l === site ? e1.r : e1.l;

          if (i < s0.i && i < s1.i && d3_geom_voronoiTriangleArea(site, s0, s1) < 0) {
            triangles.push([data[i], data[s0.i], data[s1.i]]);
          }
        }
      });
      return triangles;
    };

    voronoi.x = function (_) {
      return arguments.length ? (fx = d3_functor(x = _), voronoi) : x;
    };

    voronoi.y = function (_) {
      return arguments.length ? (fy = d3_functor(y = _), voronoi) : y;
    };

    voronoi.clipExtent = function (_) {
      if (!arguments.length) return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent;
      clipExtent = _ == null ? d3_geom_voronoiClipExtent : _;
      return voronoi;
    };

    voronoi.size = function (_) {
      if (!arguments.length) return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent && clipExtent[1];
      return voronoi.clipExtent(_ && [[0, 0], _]);
    };

    return voronoi;
  };

  var d3_geom_voronoiClipExtent = [[-1e6, -1e6], [1e6, 1e6]];

  function d3_geom_voronoiTriangleArea(a, b, c) {
    return (a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y);
  }

  d3.geom.delaunay = function (vertices) {
    return d3.geom.voronoi().triangles(vertices);
  };

  d3.geom.quadtree = function (points, x1, y1, x2, y2) {
    var x = d3_geom_pointX,
        y = d3_geom_pointY,
        compat;

    if (compat = arguments.length) {
      x = d3_geom_quadtreeCompatX;
      y = d3_geom_quadtreeCompatY;

      if (compat === 3) {
        y2 = y1;
        x2 = x1;
        y1 = x1 = 0;
      }

      return quadtree(points);
    }

    function quadtree(data) {
      var d,
          fx = d3_functor(x),
          fy = d3_functor(y),
          xs,
          ys,
          i,
          n,
          x1_,
          y1_,
          x2_,
          y2_;

      if (x1 != null) {
        x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2;
      } else {
        x2_ = y2_ = -(x1_ = y1_ = Infinity);
        xs = [], ys = [];
        n = data.length;
        if (compat) for (i = 0; i < n; ++i) {
          d = data[i];
          if (d.x < x1_) x1_ = d.x;
          if (d.y < y1_) y1_ = d.y;
          if (d.x > x2_) x2_ = d.x;
          if (d.y > y2_) y2_ = d.y;
          xs.push(d.x);
          ys.push(d.y);
        } else for (i = 0; i < n; ++i) {
          var x_ = +fx(d = data[i], i),
              y_ = +fy(d, i);
          if (x_ < x1_) x1_ = x_;
          if (y_ < y1_) y1_ = y_;
          if (x_ > x2_) x2_ = x_;
          if (y_ > y2_) y2_ = y_;
          xs.push(x_);
          ys.push(y_);
        }
      }

      var dx = x2_ - x1_,
          dy = y2_ - y1_;
      if (dx > dy) y2_ = y1_ + dx;else x2_ = x1_ + dy;

      function insert(n, d, x, y, x1, y1, x2, y2) {
        if (isNaN(x) || isNaN(y)) return;

        if (n.leaf) {
          var nx = n.x,
              ny = n.y;

          if (nx != null) {
            if (abs(nx - x) + abs(ny - y) < .01) {
              insertChild(n, d, x, y, x1, y1, x2, y2);
            } else {
              var nPoint = n.point;
              n.x = n.y = n.point = null;
              insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
              insertChild(n, d, x, y, x1, y1, x2, y2);
            }
          } else {
            n.x = x, n.y = y, n.point = d;
          }
        } else {
          insertChild(n, d, x, y, x1, y1, x2, y2);
        }
      }

      function insertChild(n, d, x, y, x1, y1, x2, y2) {
        var xm = (x1 + x2) * .5,
            ym = (y1 + y2) * .5,
            right = x >= xm,
            below = y >= ym,
            i = below << 1 | right;
        n.leaf = false;
        n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());
        if (right) x1 = xm;else x2 = xm;
        if (below) y1 = ym;else y2 = ym;
        insert(n, d, x, y, x1, y1, x2, y2);
      }

      var root = d3_geom_quadtreeNode();

      root.add = function (d) {
        insert(root, d, +fx(d, ++i), +fy(d, i), x1_, y1_, x2_, y2_);
      };

      root.visit = function (f) {
        d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_);
      };

      root.find = function (point) {
        return d3_geom_quadtreeFind(root, point[0], point[1], x1_, y1_, x2_, y2_);
      };

      i = -1;

      if (x1 == null) {
        while (++i < n) {
          insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
        }

        --i;
      } else data.forEach(root.add);

      xs = ys = data = d = null;
      return root;
    }

    quadtree.x = function (_) {
      return arguments.length ? (x = _, quadtree) : x;
    };

    quadtree.y = function (_) {
      return arguments.length ? (y = _, quadtree) : y;
    };

    quadtree.extent = function (_) {
      if (!arguments.length) return x1 == null ? null : [[x1, y1], [x2, y2]];
      if (_ == null) x1 = y1 = x2 = y2 = null;else x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], y2 = +_[1][1];
      return quadtree;
    };

    quadtree.size = function (_) {
      if (!arguments.length) return x1 == null ? null : [x2 - x1, y2 - y1];
      if (_ == null) x1 = y1 = x2 = y2 = null;else x1 = y1 = 0, x2 = +_[0], y2 = +_[1];
      return quadtree;
    };

    return quadtree;
  };

  function d3_geom_quadtreeCompatX(d) {
    return d.x;
  }

  function d3_geom_quadtreeCompatY(d) {
    return d.y;
  }

  function d3_geom_quadtreeNode() {
    return {
      leaf: true,
      nodes: [],
      point: null,
      x: null,
      y: null
    };
  }

  function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
    if (!f(node, x1, y1, x2, y2)) {
      var sx = (x1 + x2) * .5,
          sy = (y1 + y2) * .5,
          children = node.nodes;
      if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
      if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
      if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
      if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
    }
  }

  function d3_geom_quadtreeFind(root, x, y, x0, y0, x3, y3) {
    var minDistance2 = Infinity,
        closestPoint;

    (function find(node, x1, y1, x2, y2) {
      if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) return;

      if (point = node.point) {
        var point,
            dx = x - node.x,
            dy = y - node.y,
            distance2 = dx * dx + dy * dy;

        if (distance2 < minDistance2) {
          var distance = Math.sqrt(minDistance2 = distance2);
          x0 = x - distance, y0 = y - distance;
          x3 = x + distance, y3 = y + distance;
          closestPoint = point;
        }
      }

      var children = node.nodes,
          xm = (x1 + x2) * .5,
          ym = (y1 + y2) * .5,
          right = x >= xm,
          below = y >= ym;

      for (var i = below << 1 | right, j = i + 4; i < j; ++i) {
        if (node = children[i & 3]) switch (i & 3) {
          case 0:
            find(node, x1, y1, xm, ym);
            break;

          case 1:
            find(node, xm, y1, x2, ym);
            break;

          case 2:
            find(node, x1, ym, xm, y2);
            break;

          case 3:
            find(node, xm, ym, x2, y2);
            break;
        }
      }
    })(root, x0, y0, x3, y3);

    return closestPoint;
  }

  d3.interpolateRgb = d3_interpolateRgb;

  function d3_interpolateRgb(a, b) {
    a = d3.rgb(a);
    b = d3.rgb(b);
    var ar = a.r,
        ag = a.g,
        ab = a.b,
        br = b.r - ar,
        bg = b.g - ag,
        bb = b.b - ab;
    return function (t) {
      return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
    };
  }

  d3.interpolateObject = d3_interpolateObject;

  function d3_interpolateObject(a, b) {
    var i = {},
        c = {},
        k;

    for (k in a) {
      if (k in b) {
        i[k] = d3_interpolate(a[k], b[k]);
      } else {
        c[k] = a[k];
      }
    }

    for (k in b) {
      if (!(k in a)) {
        c[k] = b[k];
      }
    }

    return function (t) {
      for (k in i) c[k] = i[k](t);

      return c;
    };
  }

  d3.interpolateNumber = d3_interpolateNumber;

  function d3_interpolateNumber(a, b) {
    a = +a, b = +b;
    return function (t) {
      return a * (1 - t) + b * t;
    };
  }

  d3.interpolateString = d3_interpolateString;

  function d3_interpolateString(a, b) {
    var bi = d3_interpolate_numberA.lastIndex = d3_interpolate_numberB.lastIndex = 0,
        am,
        bm,
        bs,
        i = -1,
        s = [],
        q = [];
    a = a + "", b = b + "";

    while ((am = d3_interpolate_numberA.exec(a)) && (bm = d3_interpolate_numberB.exec(b))) {
      if ((bs = bm.index) > bi) {
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs;else s[++i] = bs;
      }

      if ((am = am[0]) === (bm = bm[0])) {
        if (s[i]) s[i] += bm;else s[++i] = bm;
      } else {
        s[++i] = null;
        q.push({
          i: i,
          x: d3_interpolateNumber(am, bm)
        });
      }

      bi = d3_interpolate_numberB.lastIndex;
    }

    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs;else s[++i] = bs;
    }

    return s.length < 2 ? q[0] ? (b = q[0].x, function (t) {
      return b(t) + "";
    }) : function () {
      return b;
    } : (b = q.length, function (t) {
      for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);

      return s.join("");
    });
  }

  var d3_interpolate_numberA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      d3_interpolate_numberB = new RegExp(d3_interpolate_numberA.source, "g");
  d3.interpolate = d3_interpolate;

  function d3_interpolate(a, b) {
    var i = d3.interpolators.length,
        f;

    while (--i >= 0 && !(f = d3.interpolators[i](a, b)));

    return f;
  }

  d3.interpolators = [function (a, b) {
    var t = typeof b;
    return (t === "string" ? d3_rgb_names.has(b.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_color ? d3_interpolateRgb : Array.isArray(b) ? d3_interpolateArray : t === "object" && isNaN(b) ? d3_interpolateObject : d3_interpolateNumber)(a, b);
  }];
  d3.interpolateArray = d3_interpolateArray;

  function d3_interpolateArray(a, b) {
    var x = [],
        c = [],
        na = a.length,
        nb = b.length,
        n0 = Math.min(a.length, b.length),
        i;

    for (i = 0; i < n0; ++i) x.push(d3_interpolate(a[i], b[i]));

    for (; i < na; ++i) c[i] = a[i];

    for (; i < nb; ++i) c[i] = b[i];

    return function (t) {
      for (i = 0; i < n0; ++i) c[i] = x[i](t);

      return c;
    };
  }

  var d3_ease_default = function () {
    return d3_identity;
  };

  var d3_ease = d3.map({
    linear: d3_ease_default,
    poly: d3_ease_poly,
    quad: function () {
      return d3_ease_quad;
    },
    cubic: function () {
      return d3_ease_cubic;
    },
    sin: function () {
      return d3_ease_sin;
    },
    exp: function () {
      return d3_ease_exp;
    },
    circle: function () {
      return d3_ease_circle;
    },
    elastic: d3_ease_elastic,
    back: d3_ease_back,
    bounce: function () {
      return d3_ease_bounce;
    }
  });
  var d3_ease_mode = d3.map({
    "in": d3_identity,
    out: d3_ease_reverse,
    "in-out": d3_ease_reflect,
    "out-in": function (f) {
      return d3_ease_reflect(d3_ease_reverse(f));
    }
  });

  d3.ease = function (name) {
    var i = name.indexOf("-"),
        t = i >= 0 ? name.slice(0, i) : name,
        m = i >= 0 ? name.slice(i + 1) : "in";
    t = d3_ease.get(t) || d3_ease_default;
    m = d3_ease_mode.get(m) || d3_identity;
    return d3_ease_clamp(m(t.apply(null, d3_arraySlice.call(arguments, 1))));
  };

  function d3_ease_clamp(f) {
    return function (t) {
      return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
    };
  }

  function d3_ease_reverse(f) {
    return function (t) {
      return 1 - f(1 - t);
    };
  }

  function d3_ease_reflect(f) {
    return function (t) {
      return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t));
    };
  }

  function d3_ease_quad(t) {
    return t * t;
  }

  function d3_ease_cubic(t) {
    return t * t * t;
  }

  function d3_ease_cubicInOut(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    var t2 = t * t,
        t3 = t2 * t;
    return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75);
  }

  function d3_ease_poly(e) {
    return function (t) {
      return Math.pow(t, e);
    };
  }

  function d3_ease_sin(t) {
    return 1 - Math.cos(t * halfπ);
  }

  function d3_ease_exp(t) {
    return Math.pow(2, 10 * (t - 1));
  }

  function d3_ease_circle(t) {
    return 1 - Math.sqrt(1 - t * t);
  }

  function d3_ease_elastic(a, p) {
    var s;
    if (arguments.length < 2) p = .45;
    if (arguments.length) s = p / τ * Math.asin(1 / a);else a = 1, s = p / 4;
    return function (t) {
      return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * τ / p);
    };
  }

  function d3_ease_back(s) {
    if (!s) s = 1.70158;
    return function (t) {
      return t * t * ((s + 1) * t - s);
    };
  }

  function d3_ease_bounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
  }

  d3.interpolateHcl = d3_interpolateHcl;

  function d3_interpolateHcl(a, b) {
    a = d3.hcl(a);
    b = d3.hcl(b);
    var ah = a.h,
        ac = a.c,
        al = a.l,
        bh = b.h - ah,
        bc = b.c - ac,
        bl = b.l - al;
    if (isNaN(bc)) bc = 0, ac = isNaN(ac) ? b.c : ac;
    if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah;else if (bh > 180) bh -= 360;else if (bh < -180) bh += 360;
    return function (t) {
      return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
    };
  }

  d3.interpolateHsl = d3_interpolateHsl;

  function d3_interpolateHsl(a, b) {
    a = d3.hsl(a);
    b = d3.hsl(b);
    var ah = a.h,
        as = a.s,
        al = a.l,
        bh = b.h - ah,
        bs = b.s - as,
        bl = b.l - al;
    if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
    if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah;else if (bh > 180) bh -= 360;else if (bh < -180) bh += 360;
    return function (t) {
      return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + "";
    };
  }

  d3.interpolateLab = d3_interpolateLab;

  function d3_interpolateLab(a, b) {
    a = d3.lab(a);
    b = d3.lab(b);
    var al = a.l,
        aa = a.a,
        ab = a.b,
        bl = b.l - al,
        ba = b.a - aa,
        bb = b.b - ab;
    return function (t) {
      return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
    };
  }

  d3.interpolateRound = d3_interpolateRound;

  function d3_interpolateRound(a, b) {
    b -= a;
    return function (t) {
      return Math.round(a + b * t);
    };
  }

  d3.transform = function (string) {
    var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
    return (d3.transform = function (string) {
      if (string != null) {
        g.setAttribute("transform", string);
        var t = g.transform.baseVal.consolidate();
      }

      return new d3_transform(t ? t.matrix : d3_transformIdentity);
    })(string);
  };

  function d3_transform(m) {
    var r0 = [m.a, m.b],
        r1 = [m.c, m.d],
        kx = d3_transformNormalize(r0),
        kz = d3_transformDot(r0, r1),
        ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;

    if (r0[0] * r1[1] < r1[0] * r0[1]) {
      r0[0] *= -1;
      r0[1] *= -1;
      kx *= -1;
      kz *= -1;
    }

    this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
    this.translate = [m.e, m.f];
    this.scale = [kx, ky];
    this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
  }

  d3_transform.prototype.toString = function () {
    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
  };

  function d3_transformDot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }

  function d3_transformNormalize(a) {
    var k = Math.sqrt(d3_transformDot(a, a));

    if (k) {
      a[0] /= k;
      a[1] /= k;
    }

    return k;
  }

  function d3_transformCombine(a, b, k) {
    a[0] += k * b[0];
    a[1] += k * b[1];
    return a;
  }

  var d3_transformIdentity = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
  d3.interpolateTransform = d3_interpolateTransform;

  function d3_interpolateTransformPop(s) {
    return s.length ? s.pop() + "," : "";
  }

  function d3_interpolateTranslate(ta, tb, s, q) {
    if (ta[0] !== tb[0] || ta[1] !== tb[1]) {
      var i = s.push("translate(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: d3_interpolateNumber(ta[0], tb[0])
      }, {
        i: i - 2,
        x: d3_interpolateNumber(ta[1], tb[1])
      });
    } else if (tb[0] || tb[1]) {
      s.push("translate(" + tb + ")");
    }
  }

  function d3_interpolateRotate(ra, rb, s, q) {
    if (ra !== rb) {
      if (ra - rb > 180) rb += 360;else if (rb - ra > 180) ra += 360;
      q.push({
        i: s.push(d3_interpolateTransformPop(s) + "rotate(", null, ")") - 2,
        x: d3_interpolateNumber(ra, rb)
      });
    } else if (rb) {
      s.push(d3_interpolateTransformPop(s) + "rotate(" + rb + ")");
    }
  }

  function d3_interpolateSkew(wa, wb, s, q) {
    if (wa !== wb) {
      q.push({
        i: s.push(d3_interpolateTransformPop(s) + "skewX(", null, ")") - 2,
        x: d3_interpolateNumber(wa, wb)
      });
    } else if (wb) {
      s.push(d3_interpolateTransformPop(s) + "skewX(" + wb + ")");
    }
  }

  function d3_interpolateScale(ka, kb, s, q) {
    if (ka[0] !== kb[0] || ka[1] !== kb[1]) {
      var i = s.push(d3_interpolateTransformPop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: d3_interpolateNumber(ka[0], kb[0])
      }, {
        i: i - 2,
        x: d3_interpolateNumber(ka[1], kb[1])
      });
    } else if (kb[0] !== 1 || kb[1] !== 1) {
      s.push(d3_interpolateTransformPop(s) + "scale(" + kb + ")");
    }
  }

  function d3_interpolateTransform(a, b) {
    var s = [],
        q = [];
    a = d3.transform(a), b = d3.transform(b);
    d3_interpolateTranslate(a.translate, b.translate, s, q);
    d3_interpolateRotate(a.rotate, b.rotate, s, q);
    d3_interpolateSkew(a.skew, b.skew, s, q);
    d3_interpolateScale(a.scale, b.scale, s, q);
    a = b = null;
    return function (t) {
      var i = -1,
          n = q.length,
          o;

      while (++i < n) s[(o = q[i]).i] = o.x(t);

      return s.join("");
    };
  }

  function d3_uninterpolateNumber(a, b) {
    b = (b -= a = +a) || 1 / b;
    return function (x) {
      return (x - a) / b;
    };
  }

  function d3_uninterpolateClamp(a, b) {
    b = (b -= a = +a) || 1 / b;
    return function (x) {
      return Math.max(0, Math.min(1, (x - a) / b));
    };
  }

  d3.layout = {};

  d3.layout.bundle = function () {
    return function (links) {
      var paths = [],
          i = -1,
          n = links.length;

      while (++i < n) paths.push(d3_layout_bundlePath(links[i]));

      return paths;
    };
  };

  function d3_layout_bundlePath(link) {
    var start = link.source,
        end = link.target,
        lca = d3_layout_bundleLeastCommonAncestor(start, end),
        points = [start];

    while (start !== lca) {
      start = start.parent;
      points.push(start);
    }

    var k = points.length;

    while (end !== lca) {
      points.splice(k, 0, end);
      end = end.parent;
    }

    return points;
  }

  function d3_layout_bundleAncestors(node) {
    var ancestors = [],
        parent = node.parent;

    while (parent != null) {
      ancestors.push(node);
      node = parent;
      parent = parent.parent;
    }

    ancestors.push(node);
    return ancestors;
  }

  function d3_layout_bundleLeastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = d3_layout_bundleAncestors(a),
        bNodes = d3_layout_bundleAncestors(b),
        aNode = aNodes.pop(),
        bNode = bNodes.pop(),
        sharedNode = null;

    while (aNode === bNode) {
      sharedNode = aNode;
      aNode = aNodes.pop();
      bNode = bNodes.pop();
    }

    return sharedNode;
  }

  d3.layout.chord = function () {
    var chord = {},
        chords,
        groups,
        matrix,
        n,
        padding = 0,
        sortGroups,
        sortSubgroups,
        sortChords;

    function relayout() {
      var subgroups = {},
          groupSums = [],
          groupIndex = d3.range(n),
          subgroupIndex = [],
          k,
          x,
          x0,
          i,
          j;
      chords = [];
      groups = [];
      k = 0, i = -1;

      while (++i < n) {
        x = 0, j = -1;

        while (++j < n) {
          x += matrix[i][j];
        }

        groupSums.push(x);
        subgroupIndex.push(d3.range(n));
        k += x;
      }

      if (sortGroups) {
        groupIndex.sort(function (a, b) {
          return sortGroups(groupSums[a], groupSums[b]);
        });
      }

      if (sortSubgroups) {
        subgroupIndex.forEach(function (d, i) {
          d.sort(function (a, b) {
            return sortSubgroups(matrix[i][a], matrix[i][b]);
          });
        });
      }

      k = (τ - padding * n) / k;
      x = 0, i = -1;

      while (++i < n) {
        x0 = x, j = -1;

        while (++j < n) {
          var di = groupIndex[i],
              dj = subgroupIndex[di][j],
              v = matrix[di][dj],
              a0 = x,
              a1 = x += v * k;
          subgroups[di + "-" + dj] = {
            index: di,
            subindex: dj,
            startAngle: a0,
            endAngle: a1,
            value: v
          };
        }

        groups[di] = {
          index: di,
          startAngle: x0,
          endAngle: x,
          value: groupSums[di]
        };
        x += padding;
      }

      i = -1;

      while (++i < n) {
        j = i - 1;

        while (++j < n) {
          var source = subgroups[i + "-" + j],
              target = subgroups[j + "-" + i];

          if (source.value || target.value) {
            chords.push(source.value < target.value ? {
              source: target,
              target: source
            } : {
              source: source,
              target: target
            });
          }
        }
      }

      if (sortChords) resort();
    }

    function resort() {
      chords.sort(function (a, b) {
        return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
      });
    }

    chord.matrix = function (x) {
      if (!arguments.length) return matrix;
      n = (matrix = x) && matrix.length;
      chords = groups = null;
      return chord;
    };

    chord.padding = function (x) {
      if (!arguments.length) return padding;
      padding = x;
      chords = groups = null;
      return chord;
    };

    chord.sortGroups = function (x) {
      if (!arguments.length) return sortGroups;
      sortGroups = x;
      chords = groups = null;
      return chord;
    };

    chord.sortSubgroups = function (x) {
      if (!arguments.length) return sortSubgroups;
      sortSubgroups = x;
      chords = null;
      return chord;
    };

    chord.sortChords = function (x) {
      if (!arguments.length) return sortChords;
      sortChords = x;
      if (chords) resort();
      return chord;
    };

    chord.chords = function () {
      if (!chords) relayout();
      return chords;
    };

    chord.groups = function () {
      if (!groups) relayout();
      return groups;
    };

    return chord;
  };

  d3.layout.force = function () {
    var force = {},
        event = d3.dispatch("start", "tick", "end"),
        timer,
        size = [1, 1],
        drag,
        alpha,
        friction = .9,
        linkDistance = d3_layout_forceLinkDistance,
        linkStrength = d3_layout_forceLinkStrength,
        charge = -30,
        chargeDistance2 = d3_layout_forceChargeDistance2,
        gravity = .1,
        theta2 = .64,
        nodes = [],
        links = [],
        distances,
        strengths,
        charges;

    function repulse(node) {
      return function (quad, x1, _, x2) {
        if (quad.point !== node) {
          var dx = quad.cx - node.x,
              dy = quad.cy - node.y,
              dw = x2 - x1,
              dn = dx * dx + dy * dy;

          if (dw * dw / theta2 < dn) {
            if (dn < chargeDistance2) {
              var k = quad.charge / dn;
              node.px -= dx * k;
              node.py -= dy * k;
            }

            return true;
          }

          if (quad.point && dn && dn < chargeDistance2) {
            var k = quad.pointCharge / dn;
            node.px -= dx * k;
            node.py -= dy * k;
          }
        }

        return !quad.charge;
      };
    }

    force.tick = function () {
      if ((alpha *= .99) < .005) {
        timer = null;
        event.end({
          type: "end",
          alpha: alpha = 0
        });
        return true;
      }

      var n = nodes.length,
          m = links.length,
          q,
          i,
          o,
          s,
          t,
          l,
          k,
          x,
          y;

      for (i = 0; i < m; ++i) {
        o = links[i];
        s = o.source;
        t = o.target;
        x = t.x - s.x;
        y = t.y - s.y;

        if (l = x * x + y * y) {
          l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
          x *= l;
          y *= l;
          t.x -= x * (k = s.weight + t.weight ? s.weight / (s.weight + t.weight) : .5);
          t.y -= y * k;
          s.x += x * (k = 1 - k);
          s.y += y * k;
        }
      }

      if (k = alpha * gravity) {
        x = size[0] / 2;
        y = size[1] / 2;
        i = -1;
        if (k) while (++i < n) {
          o = nodes[i];
          o.x += (x - o.x) * k;
          o.y += (y - o.y) * k;
        }
      }

      if (charge) {
        d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
        i = -1;

        while (++i < n) {
          if (!(o = nodes[i]).fixed) {
            q.visit(repulse(o));
          }
        }
      }

      i = -1;

      while (++i < n) {
        o = nodes[i];

        if (o.fixed) {
          o.x = o.px;
          o.y = o.py;
        } else {
          o.x -= (o.px - (o.px = o.x)) * friction;
          o.y -= (o.py - (o.py = o.y)) * friction;
        }
      }

      event.tick({
        type: "tick",
        alpha: alpha
      });
    };

    force.nodes = function (x) {
      if (!arguments.length) return nodes;
      nodes = x;
      return force;
    };

    force.links = function (x) {
      if (!arguments.length) return links;
      links = x;
      return force;
    };

    force.size = function (x) {
      if (!arguments.length) return size;
      size = x;
      return force;
    };

    force.linkDistance = function (x) {
      if (!arguments.length) return linkDistance;
      linkDistance = typeof x === "function" ? x : +x;
      return force;
    };

    force.distance = force.linkDistance;

    force.linkStrength = function (x) {
      if (!arguments.length) return linkStrength;
      linkStrength = typeof x === "function" ? x : +x;
      return force;
    };

    force.friction = function (x) {
      if (!arguments.length) return friction;
      friction = +x;
      return force;
    };

    force.charge = function (x) {
      if (!arguments.length) return charge;
      charge = typeof x === "function" ? x : +x;
      return force;
    };

    force.chargeDistance = function (x) {
      if (!arguments.length) return Math.sqrt(chargeDistance2);
      chargeDistance2 = x * x;
      return force;
    };

    force.gravity = function (x) {
      if (!arguments.length) return gravity;
      gravity = +x;
      return force;
    };

    force.theta = function (x) {
      if (!arguments.length) return Math.sqrt(theta2);
      theta2 = x * x;
      return force;
    };

    force.alpha = function (x) {
      if (!arguments.length) return alpha;
      x = +x;

      if (alpha) {
        if (x > 0) {
          alpha = x;
        } else {
          timer.c = null, timer.t = NaN, timer = null;
          event.end({
            type: "end",
            alpha: alpha = 0
          });
        }
      } else if (x > 0) {
        event.start({
          type: "start",
          alpha: alpha = x
        });
        timer = d3_timer(force.tick);
      }

      return force;
    };

    force.start = function () {
      var i,
          n = nodes.length,
          m = links.length,
          w = size[0],
          h = size[1],
          neighbors,
          o;

      for (i = 0; i < n; ++i) {
        (o = nodes[i]).index = i;
        o.weight = 0;
      }

      for (i = 0; i < m; ++i) {
        o = links[i];
        if (typeof o.source == "number") o.source = nodes[o.source];
        if (typeof o.target == "number") o.target = nodes[o.target];
        ++o.source.weight;
        ++o.target.weight;
      }

      for (i = 0; i < n; ++i) {
        o = nodes[i];
        if (isNaN(o.x)) o.x = position("x", w);
        if (isNaN(o.y)) o.y = position("y", h);
        if (isNaN(o.px)) o.px = o.x;
        if (isNaN(o.py)) o.py = o.y;
      }

      distances = [];
      if (typeof linkDistance === "function") for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i);else for (i = 0; i < m; ++i) distances[i] = linkDistance;
      strengths = [];
      if (typeof linkStrength === "function") for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i);else for (i = 0; i < m; ++i) strengths[i] = linkStrength;
      charges = [];
      if (typeof charge === "function") for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i);else for (i = 0; i < n; ++i) charges[i] = charge;

      function position(dimension, size) {
        if (!neighbors) {
          neighbors = new Array(n);

          for (j = 0; j < n; ++j) {
            neighbors[j] = [];
          }

          for (j = 0; j < m; ++j) {
            var o = links[j];
            neighbors[o.source.index].push(o.target);
            neighbors[o.target.index].push(o.source);
          }
        }

        var candidates = neighbors[i],
            j = -1,
            l = candidates.length,
            x;

        while (++j < l) if (!isNaN(x = candidates[j][dimension])) return x;

        return Math.random() * size;
      }

      return force.resume();
    };

    force.resume = function () {
      return force.alpha(.1);
    };

    force.stop = function () {
      return force.alpha(0);
    };

    force.drag = function () {
      if (!drag) drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
      if (!arguments.length) return drag;
      this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
    };

    function dragmove(d) {
      d.px = d3.event.x, d.py = d3.event.y;
      force.resume();
    }

    return d3.rebind(force, event, "on");
  };

  function d3_layout_forceDragstart(d) {
    d.fixed |= 2;
  }

  function d3_layout_forceDragend(d) {
    d.fixed &= ~6;
  }

  function d3_layout_forceMouseover(d) {
    d.fixed |= 4;
    d.px = d.x, d.py = d.y;
  }

  function d3_layout_forceMouseout(d) {
    d.fixed &= ~4;
  }

  function d3_layout_forceAccumulate(quad, alpha, charges) {
    var cx = 0,
        cy = 0;
    quad.charge = 0;

    if (!quad.leaf) {
      var nodes = quad.nodes,
          n = nodes.length,
          i = -1,
          c;

      while (++i < n) {
        c = nodes[i];
        if (c == null) continue;
        d3_layout_forceAccumulate(c, alpha, charges);
        quad.charge += c.charge;
        cx += c.charge * c.cx;
        cy += c.charge * c.cy;
      }
    }

    if (quad.point) {
      if (!quad.leaf) {
        quad.point.x += Math.random() - .5;
        quad.point.y += Math.random() - .5;
      }

      var k = alpha * charges[quad.point.index];
      quad.charge += quad.pointCharge = k;
      cx += k * quad.point.x;
      cy += k * quad.point.y;
    }

    quad.cx = cx / quad.charge;
    quad.cy = cy / quad.charge;
  }

  var d3_layout_forceLinkDistance = 20,
      d3_layout_forceLinkStrength = 1,
      d3_layout_forceChargeDistance2 = Infinity;

  d3.layout.hierarchy = function () {
    var sort = d3_layout_hierarchySort,
        children = d3_layout_hierarchyChildren,
        value = d3_layout_hierarchyValue;

    function hierarchy(root) {
      var stack = [root],
          nodes = [],
          node;
      root.depth = 0;

      while ((node = stack.pop()) != null) {
        nodes.push(node);

        if ((childs = children.call(hierarchy, node, node.depth)) && (n = childs.length)) {
          var n, childs, child;

          while (--n >= 0) {
            stack.push(child = childs[n]);
            child.parent = node;
            child.depth = node.depth + 1;
          }

          if (value) node.value = 0;
          node.children = childs;
        } else {
          if (value) node.value = +value.call(hierarchy, node, node.depth) || 0;
          delete node.children;
        }
      }

      d3_layout_hierarchyVisitAfter(root, function (node) {
        var childs, parent;
        if (sort && (childs = node.children)) childs.sort(sort);
        if (value && (parent = node.parent)) parent.value += node.value;
      });
      return nodes;
    }

    hierarchy.sort = function (x) {
      if (!arguments.length) return sort;
      sort = x;
      return hierarchy;
    };

    hierarchy.children = function (x) {
      if (!arguments.length) return children;
      children = x;
      return hierarchy;
    };

    hierarchy.value = function (x) {
      if (!arguments.length) return value;
      value = x;
      return hierarchy;
    };

    hierarchy.revalue = function (root) {
      if (value) {
        d3_layout_hierarchyVisitBefore(root, function (node) {
          if (node.children) node.value = 0;
        });
        d3_layout_hierarchyVisitAfter(root, function (node) {
          var parent;
          if (!node.children) node.value = +value.call(hierarchy, node, node.depth) || 0;
          if (parent = node.parent) parent.value += node.value;
        });
      }

      return root;
    };

    return hierarchy;
  };

  function d3_layout_hierarchyRebind(object, hierarchy) {
    d3.rebind(object, hierarchy, "sort", "children", "value");
    object.nodes = object;
    object.links = d3_layout_hierarchyLinks;
    return object;
  }

  function d3_layout_hierarchyVisitBefore(node, callback) {
    var nodes = [node];

    while ((node = nodes.pop()) != null) {
      callback(node);

      if ((children = node.children) && (n = children.length)) {
        var n, children;

        while (--n >= 0) nodes.push(children[n]);
      }
    }
  }

  function d3_layout_hierarchyVisitAfter(node, callback) {
    var nodes = [node],
        nodes2 = [];

    while ((node = nodes.pop()) != null) {
      nodes2.push(node);

      if ((children = node.children) && (n = children.length)) {
        var i = -1,
            n,
            children;

        while (++i < n) nodes.push(children[i]);
      }
    }

    while ((node = nodes2.pop()) != null) {
      callback(node);
    }
  }

  function d3_layout_hierarchyChildren(d) {
    return d.children;
  }

  function d3_layout_hierarchyValue(d) {
    return d.value;
  }

  function d3_layout_hierarchySort(a, b) {
    return b.value - a.value;
  }

  function d3_layout_hierarchyLinks(nodes) {
    return d3.merge(nodes.map(function (parent) {
      return (parent.children || []).map(function (child) {
        return {
          source: parent,
          target: child
        };
      });
    }));
  }

  d3.layout.partition = function () {
    var hierarchy = d3.layout.hierarchy(),
        size = [1, 1];

    function position(node, x, dx, dy) {
      var children = node.children;
      node.x = x;
      node.y = node.depth * dy;
      node.dx = dx;
      node.dy = dy;

      if (children && (n = children.length)) {
        var i = -1,
            n,
            c,
            d;
        dx = node.value ? dx / node.value : 0;

        while (++i < n) {
          position(c = children[i], x, d = c.value * dx, dy);
          x += d;
        }
      }
    }

    function depth(node) {
      var children = node.children,
          d = 0;

      if (children && (n = children.length)) {
        var i = -1,
            n;

        while (++i < n) d = Math.max(d, depth(children[i]));
      }

      return 1 + d;
    }

    function partition(d, i) {
      var nodes = hierarchy.call(this, d, i);
      position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
      return nodes;
    }

    partition.size = function (x) {
      if (!arguments.length) return size;
      size = x;
      return partition;
    };

    return d3_layout_hierarchyRebind(partition, hierarchy);
  };

  d3.layout.pie = function () {
    var value = Number,
        sort = d3_layout_pieSortByValue,
        startAngle = 0,
        endAngle = τ,
        padAngle = 0;

    function pie(data) {
      var n = data.length,
          values = data.map(function (d, i) {
        return +value.call(pie, d, i);
      }),
          a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle),
          da = (typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - a,
          p = Math.min(Math.abs(da) / n, +(typeof padAngle === "function" ? padAngle.apply(this, arguments) : padAngle)),
          pa = p * (da < 0 ? -1 : 1),
          sum = d3.sum(values),
          k = sum ? (da - n * pa) / sum : 0,
          index = d3.range(n),
          arcs = [],
          v;
      if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function (i, j) {
        return values[j] - values[i];
      } : function (i, j) {
        return sort(data[i], data[j]);
      });
      index.forEach(function (i) {
        arcs[i] = {
          data: data[i],
          value: v = values[i],
          startAngle: a,
          endAngle: a += v * k + pa,
          padAngle: p
        };
      });
      return arcs;
    }

    pie.value = function (_) {
      if (!arguments.length) return value;
      value = _;
      return pie;
    };

    pie.sort = function (_) {
      if (!arguments.length) return sort;
      sort = _;
      return pie;
    };

    pie.startAngle = function (_) {
      if (!arguments.length) return startAngle;
      startAngle = _;
      return pie;
    };

    pie.endAngle = function (_) {
      if (!arguments.length) return endAngle;
      endAngle = _;
      return pie;
    };

    pie.padAngle = function (_) {
      if (!arguments.length) return padAngle;
      padAngle = _;
      return pie;
    };

    return pie;
  };

  var d3_layout_pieSortByValue = {};

  d3.layout.stack = function () {
    var values = d3_identity,
        order = d3_layout_stackOrderDefault,
        offset = d3_layout_stackOffsetZero,
        out = d3_layout_stackOut,
        x = d3_layout_stackX,
        y = d3_layout_stackY;

    function stack(data, index) {
      if (!(n = data.length)) return data;
      var series = data.map(function (d, i) {
        return values.call(stack, d, i);
      });
      var points = series.map(function (d) {
        return d.map(function (v, i) {
          return [x.call(stack, v, i), y.call(stack, v, i)];
        });
      });
      var orders = order.call(stack, points, index);
      series = d3.permute(series, orders);
      points = d3.permute(points, orders);
      var offsets = offset.call(stack, points, index);
      var m = series[0].length,
          n,
          i,
          j,
          o;

      for (j = 0; j < m; ++j) {
        out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);

        for (i = 1; i < n; ++i) {
          out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
        }
      }

      return data;
    }

    stack.values = function (x) {
      if (!arguments.length) return values;
      values = x;
      return stack;
    };

    stack.order = function (x) {
      if (!arguments.length) return order;
      order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
      return stack;
    };

    stack.offset = function (x) {
      if (!arguments.length) return offset;
      offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
      return stack;
    };

    stack.x = function (z) {
      if (!arguments.length) return x;
      x = z;
      return stack;
    };

    stack.y = function (z) {
      if (!arguments.length) return y;
      y = z;
      return stack;
    };

    stack.out = function (z) {
      if (!arguments.length) return out;
      out = z;
      return stack;
    };

    return stack;
  };

  function d3_layout_stackX(d) {
    return d.x;
  }

  function d3_layout_stackY(d) {
    return d.y;
  }

  function d3_layout_stackOut(d, y0, y) {
    d.y0 = y0;
    d.y = y;
  }

  var d3_layout_stackOrders = d3.map({
    "inside-out": function (data) {
      var n = data.length,
          i,
          j,
          max = data.map(d3_layout_stackMaxIndex),
          sums = data.map(d3_layout_stackReduceSum),
          index = d3.range(n).sort(function (a, b) {
        return max[a] - max[b];
      }),
          top = 0,
          bottom = 0,
          tops = [],
          bottoms = [];

      for (i = 0; i < n; ++i) {
        j = index[i];

        if (top < bottom) {
          top += sums[j];
          tops.push(j);
        } else {
          bottom += sums[j];
          bottoms.push(j);
        }
      }

      return bottoms.reverse().concat(tops);
    },
    reverse: function (data) {
      return d3.range(data.length).reverse();
    },
    "default": d3_layout_stackOrderDefault
  });
  var d3_layout_stackOffsets = d3.map({
    silhouette: function (data) {
      var n = data.length,
          m = data[0].length,
          sums = [],
          max = 0,
          i,
          j,
          o,
          y0 = [];

      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];

        if (o > max) max = o;
        sums.push(o);
      }

      for (j = 0; j < m; ++j) {
        y0[j] = (max - sums[j]) / 2;
      }

      return y0;
    },
    wiggle: function (data) {
      var n = data.length,
          x = data[0],
          m = x.length,
          i,
          j,
          k,
          s1,
          s2,
          s3,
          dx,
          o,
          o0,
          y0 = [];
      y0[0] = o = o0 = 0;

      for (j = 1; j < m; ++j) {
        for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];

        for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
          for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
            s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
          }

          s2 += s3 * data[i][j][1];
        }

        y0[j] = o -= s1 ? s2 / s1 * dx : 0;
        if (o < o0) o0 = o;
      }

      for (j = 0; j < m; ++j) y0[j] -= o0;

      return y0;
    },
    expand: function (data) {
      var n = data.length,
          m = data[0].length,
          k = 1 / n,
          i,
          j,
          o,
          y0 = [];

      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];

        if (o) for (i = 0; i < n; i++) data[i][j][1] /= o;else for (i = 0; i < n; i++) data[i][j][1] = k;
      }

      for (j = 0; j < m; ++j) y0[j] = 0;

      return y0;
    },
    zero: d3_layout_stackOffsetZero
  });

  function d3_layout_stackOrderDefault(data) {
    return d3.range(data.length);
  }

  function d3_layout_stackOffsetZero(data) {
    var j = -1,
        m = data[0].length,
        y0 = [];

    while (++j < m) y0[j] = 0;

    return y0;
  }

  function d3_layout_stackMaxIndex(array) {
    var i = 1,
        j = 0,
        v = array[0][1],
        k,
        n = array.length;

    for (; i < n; ++i) {
      if ((k = array[i][1]) > v) {
        j = i;
        v = k;
      }
    }

    return j;
  }

  function d3_layout_stackReduceSum(d) {
    return d.reduce(d3_layout_stackSum, 0);
  }

  function d3_layout_stackSum(p, d) {
    return p + d[1];
  }

  d3.layout.histogram = function () {
    var frequency = true,
        valuer = Number,
        ranger = d3_layout_histogramRange,
        binner = d3_layout_histogramBinSturges;

    function histogram(data, i) {
      var bins = [],
          values = data.map(valuer, this),
          range = ranger.call(this, values, i),
          thresholds = binner.call(this, range, values, i),
          bin,
          i = -1,
          n = values.length,
          m = thresholds.length - 1,
          k = frequency ? 1 : 1 / n,
          x;

      while (++i < m) {
        bin = bins[i] = [];
        bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
        bin.y = 0;
      }

      if (m > 0) {
        i = -1;

        while (++i < n) {
          x = values[i];

          if (x >= range[0] && x <= range[1]) {
            bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
            bin.y += k;
            bin.push(data[i]);
          }
        }
      }

      return bins;
    }

    histogram.value = function (x) {
      if (!arguments.length) return valuer;
      valuer = x;
      return histogram;
    };

    histogram.range = function (x) {
      if (!arguments.length) return ranger;
      ranger = d3_functor(x);
      return histogram;
    };

    histogram.bins = function (x) {
      if (!arguments.length) return binner;
      binner = typeof x === "number" ? function (range) {
        return d3_layout_histogramBinFixed(range, x);
      } : d3_functor(x);
      return histogram;
    };

    histogram.frequency = function (x) {
      if (!arguments.length) return frequency;
      frequency = !!x;
      return histogram;
    };

    return histogram;
  };

  function d3_layout_histogramBinSturges(range, values) {
    return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
  }

  function d3_layout_histogramBinFixed(range, n) {
    var x = -1,
        b = +range[0],
        m = (range[1] - b) / n,
        f = [];

    while (++x <= n) f[x] = m * x + b;

    return f;
  }

  function d3_layout_histogramRange(values) {
    return [d3.min(values), d3.max(values)];
  }

  d3.layout.pack = function () {
    var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort),
        padding = 0,
        size = [1, 1],
        radius;

    function pack(d, i) {
      var nodes = hierarchy.call(this, d, i),
          root = nodes[0],
          w = size[0],
          h = size[1],
          r = radius == null ? Math.sqrt : typeof radius === "function" ? radius : function () {
        return radius;
      };
      root.x = root.y = 0;
      d3_layout_hierarchyVisitAfter(root, function (d) {
        d.r = +r(d.value);
      });
      d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);

      if (padding) {
        var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
        d3_layout_hierarchyVisitAfter(root, function (d) {
          d.r += dr;
        });
        d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
        d3_layout_hierarchyVisitAfter(root, function (d) {
          d.r -= dr;
        });
      }

      d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h));
      return nodes;
    }

    pack.size = function (_) {
      if (!arguments.length) return size;
      size = _;
      return pack;
    };

    pack.radius = function (_) {
      if (!arguments.length) return radius;
      radius = _ == null || typeof _ === "function" ? _ : +_;
      return pack;
    };

    pack.padding = function (_) {
      if (!arguments.length) return padding;
      padding = +_;
      return pack;
    };

    return d3_layout_hierarchyRebind(pack, hierarchy);
  };

  function d3_layout_packSort(a, b) {
    return a.value - b.value;
  }

  function d3_layout_packInsert(a, b) {
    var c = a._pack_next;
    a._pack_next = b;
    b._pack_prev = a;
    b._pack_next = c;
    c._pack_prev = b;
  }

  function d3_layout_packSplice(a, b) {
    a._pack_next = b;
    b._pack_prev = a;
  }

  function d3_layout_packIntersects(a, b) {
    var dx = b.x - a.x,
        dy = b.y - a.y,
        dr = a.r + b.r;
    return .999 * dr * dr > dx * dx + dy * dy;
  }

  function d3_layout_packSiblings(node) {
    if (!(nodes = node.children) || !(n = nodes.length)) return;
    var nodes,
        xMin = Infinity,
        xMax = -Infinity,
        yMin = Infinity,
        yMax = -Infinity,
        a,
        b,
        c,
        i,
        j,
        k,
        n;

    function bound(node) {
      xMin = Math.min(node.x - node.r, xMin);
      xMax = Math.max(node.x + node.r, xMax);
      yMin = Math.min(node.y - node.r, yMin);
      yMax = Math.max(node.y + node.r, yMax);
    }

    nodes.forEach(d3_layout_packLink);
    a = nodes[0];
    a.x = -a.r;
    a.y = 0;
    bound(a);

    if (n > 1) {
      b = nodes[1];
      b.x = b.r;
      b.y = 0;
      bound(b);

      if (n > 2) {
        c = nodes[2];
        d3_layout_packPlace(a, b, c);
        bound(c);
        d3_layout_packInsert(a, c);
        a._pack_prev = c;
        d3_layout_packInsert(c, b);
        b = a._pack_next;

        for (i = 3; i < n; i++) {
          d3_layout_packPlace(a, b, c = nodes[i]);
          var isect = 0,
              s1 = 1,
              s2 = 1;

          for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
            if (d3_layout_packIntersects(j, c)) {
              isect = 1;
              break;
            }
          }

          if (isect == 1) {
            for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
              if (d3_layout_packIntersects(k, c)) {
                break;
              }
            }
          }

          if (isect) {
            if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j);else d3_layout_packSplice(a = k, b);
            i--;
          } else {
            d3_layout_packInsert(a, c);
            b = c;
            bound(c);
          }
        }
      }
    }

    var cx = (xMin + xMax) / 2,
        cy = (yMin + yMax) / 2,
        cr = 0;

    for (i = 0; i < n; i++) {
      c = nodes[i];
      c.x -= cx;
      c.y -= cy;
      cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
    }

    node.r = cr;
    nodes.forEach(d3_layout_packUnlink);
  }

  function d3_layout_packLink(node) {
    node._pack_next = node._pack_prev = node;
  }

  function d3_layout_packUnlink(node) {
    delete node._pack_next;
    delete node._pack_prev;
  }

  function d3_layout_packTransform(node, x, y, k) {
    var children = node.children;
    node.x = x += k * node.x;
    node.y = y += k * node.y;
    node.r *= k;

    if (children) {
      var i = -1,
          n = children.length;

      while (++i < n) d3_layout_packTransform(children[i], x, y, k);
    }
  }

  function d3_layout_packPlace(a, b, c) {
    var db = a.r + c.r,
        dx = b.x - a.x,
        dy = b.y - a.y;

    if (db && (dx || dy)) {
      var da = b.r + c.r,
          dc = dx * dx + dy * dy;
      da *= da;
      db *= db;
      var x = .5 + (db - da) / (2 * dc),
          y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
      c.x = a.x + x * dx + y * dy;
      c.y = a.y + x * dy - y * dx;
    } else {
      c.x = a.x + db;
      c.y = a.y;
    }
  }

  d3.layout.tree = function () {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null),
        separation = d3_layout_treeSeparation,
        size = [1, 1],
        nodeSize = null;

    function tree(d, i) {
      var nodes = hierarchy.call(this, d, i),
          root0 = nodes[0],
          root1 = wrapTree(root0);
      d3_layout_hierarchyVisitAfter(root1, firstWalk), root1.parent.m = -root1.z;
      d3_layout_hierarchyVisitBefore(root1, secondWalk);
      if (nodeSize) d3_layout_hierarchyVisitBefore(root0, sizeNode);else {
        var left = root0,
            right = root0,
            bottom = root0;
        d3_layout_hierarchyVisitBefore(root0, function (node) {
          if (node.x < left.x) left = node;
          if (node.x > right.x) right = node;
          if (node.depth > bottom.depth) bottom = node;
        });
        var tx = separation(left, right) / 2 - left.x,
            kx = size[0] / (right.x + separation(right, left) / 2 + tx),
            ky = size[1] / (bottom.depth || 1);
        d3_layout_hierarchyVisitBefore(root0, function (node) {
          node.x = (node.x + tx) * kx;
          node.y = node.depth * ky;
        });
      }
      return nodes;
    }

    function wrapTree(root0) {
      var root1 = {
        A: null,
        children: [root0]
      },
          queue = [root1],
          node1;

      while ((node1 = queue.pop()) != null) {
        for (var children = node1.children, child, i = 0, n = children.length; i < n; ++i) {
          queue.push((children[i] = child = {
            _: children[i],
            parent: node1,
            children: (child = children[i].children) && child.slice() || [],
            A: null,
            a: null,
            z: 0,
            m: 0,
            c: 0,
            s: 0,
            t: null,
            i: i
          }).a = child);
        }
      }

      return root1.children[0];
    }

    function firstWalk(v) {
      var children = v.children,
          siblings = v.parent.children,
          w = v.i ? siblings[v.i - 1] : null;

      if (children.length) {
        d3_layout_treeShift(v);
        var midpoint = (children[0].z + children[children.length - 1].z) / 2;

        if (w) {
          v.z = w.z + separation(v._, w._);
          v.m = v.z - midpoint;
        } else {
          v.z = midpoint;
        }
      } else if (w) {
        v.z = w.z + separation(v._, w._);
      }

      v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
    }

    function secondWalk(v) {
      v._.x = v.z + v.parent.m;
      v.m += v.parent.m;
    }

    function apportion(v, w, ancestor) {
      if (w) {
        var vip = v,
            vop = v,
            vim = w,
            vom = vip.parent.children[0],
            sip = vip.m,
            sop = vop.m,
            sim = vim.m,
            som = vom.m,
            shift;

        while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
          vom = d3_layout_treeLeft(vom);
          vop = d3_layout_treeRight(vop);
          vop.a = v;
          shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);

          if (shift > 0) {
            d3_layout_treeMove(d3_layout_treeAncestor(vim, v, ancestor), v, shift);
            sip += shift;
            sop += shift;
          }

          sim += vim.m;
          sip += vip.m;
          som += vom.m;
          sop += vop.m;
        }

        if (vim && !d3_layout_treeRight(vop)) {
          vop.t = vim;
          vop.m += sim - sop;
        }

        if (vip && !d3_layout_treeLeft(vom)) {
          vom.t = vip;
          vom.m += sip - som;
          ancestor = v;
        }
      }

      return ancestor;
    }

    function sizeNode(node) {
      node.x *= size[0];
      node.y = node.depth * size[1];
    }

    tree.separation = function (x) {
      if (!arguments.length) return separation;
      separation = x;
      return tree;
    };

    tree.size = function (x) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = x) == null ? sizeNode : null;
      return tree;
    };

    tree.nodeSize = function (x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) == null ? null : sizeNode;
      return tree;
    };

    return d3_layout_hierarchyRebind(tree, hierarchy);
  };

  function d3_layout_treeSeparation(a, b) {
    return a.parent == b.parent ? 1 : 2;
  }

  function d3_layout_treeLeft(v) {
    var children = v.children;
    return children.length ? children[0] : v.t;
  }

  function d3_layout_treeRight(v) {
    var children = v.children,
        n;
    return (n = children.length) ? children[n - 1] : v.t;
  }

  function d3_layout_treeMove(wm, wp, shift) {
    var change = shift / (wp.i - wm.i);
    wp.c -= change;
    wp.s += shift;
    wm.c += change;
    wp.z += shift;
    wp.m += shift;
  }

  function d3_layout_treeShift(v) {
    var shift = 0,
        change = 0,
        children = v.children,
        i = children.length,
        w;

    while (--i >= 0) {
      w = children[i];
      w.z += shift;
      w.m += shift;
      shift += w.s + (change += w.c);
    }
  }

  function d3_layout_treeAncestor(vim, v, ancestor) {
    return vim.a.parent === v.parent ? vim.a : ancestor;
  }

  d3.layout.cluster = function () {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null),
        separation = d3_layout_treeSeparation,
        size = [1, 1],
        nodeSize = false;

    function cluster(d, i) {
      var nodes = hierarchy.call(this, d, i),
          root = nodes[0],
          previousNode,
          x = 0;
      d3_layout_hierarchyVisitAfter(root, function (node) {
        var children = node.children;

        if (children && children.length) {
          node.x = d3_layout_clusterX(children);
          node.y = d3_layout_clusterY(children);
        } else {
          node.x = previousNode ? x += separation(node, previousNode) : 0;
          node.y = 0;
          previousNode = node;
        }
      });
      var left = d3_layout_clusterLeft(root),
          right = d3_layout_clusterRight(root),
          x0 = left.x - separation(left, right) / 2,
          x1 = right.x + separation(right, left) / 2;
      d3_layout_hierarchyVisitAfter(root, nodeSize ? function (node) {
        node.x = (node.x - root.x) * size[0];
        node.y = (root.y - node.y) * size[1];
      } : function (node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
      });
      return nodes;
    }

    cluster.separation = function (x) {
      if (!arguments.length) return separation;
      separation = x;
      return cluster;
    };

    cluster.size = function (x) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = x) == null;
      return cluster;
    };

    cluster.nodeSize = function (x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) != null;
      return cluster;
    };

    return d3_layout_hierarchyRebind(cluster, hierarchy);
  };

  function d3_layout_clusterY(children) {
    return 1 + d3.max(children, function (child) {
      return child.y;
    });
  }

  function d3_layout_clusterX(children) {
    return children.reduce(function (x, child) {
      return x + child.x;
    }, 0) / children.length;
  }

  function d3_layout_clusterLeft(node) {
    var children = node.children;
    return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
  }

  function d3_layout_clusterRight(node) {
    var children = node.children,
        n;
    return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
  }

  d3.layout.treemap = function () {
    var hierarchy = d3.layout.hierarchy(),
        round = Math.round,
        size = [1, 1],
        padding = null,
        pad = d3_layout_treemapPadNull,
        sticky = false,
        stickies,
        mode = "squarify",
        ratio = .5 * (1 + Math.sqrt(5));

    function scale(children, k) {
      var i = -1,
          n = children.length,
          child,
          area;

      while (++i < n) {
        area = (child = children[i]).value * (k < 0 ? 0 : k);
        child.area = isNaN(area) || area <= 0 ? 0 : area;
      }
    }

    function squarify(node) {
      var children = node.children;

      if (children && children.length) {
        var rect = pad(node),
            row = [],
            remaining = children.slice(),
            child,
            best = Infinity,
            score,
            u = mode === "slice" ? rect.dx : mode === "dice" ? rect.dy : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy),
            n;
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;

        while ((n = remaining.length) > 0) {
          row.push(child = remaining[n - 1]);
          row.area += child.area;

          if (mode !== "squarify" || (score = worst(row, u)) <= best) {
            remaining.pop();
            best = score;
          } else {
            row.area -= row.pop().area;
            position(row, u, rect, false);
            u = Math.min(rect.dx, rect.dy);
            row.length = row.area = 0;
            best = Infinity;
          }
        }

        if (row.length) {
          position(row, u, rect, true);
          row.length = row.area = 0;
        }

        children.forEach(squarify);
      }
    }

    function stickify(node) {
      var children = node.children;

      if (children && children.length) {
        var rect = pad(node),
            remaining = children.slice(),
            child,
            row = [];
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;

        while (child = remaining.pop()) {
          row.push(child);
          row.area += child.area;

          if (child.z != null) {
            position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
            row.length = row.area = 0;
          }
        }

        children.forEach(stickify);
      }
    }

    function worst(row, u) {
      var s = row.area,
          r,
          rmax = 0,
          rmin = Infinity,
          i = -1,
          n = row.length;

      while (++i < n) {
        if (!(r = row[i].area)) continue;
        if (r < rmin) rmin = r;
        if (r > rmax) rmax = r;
      }

      s *= s;
      u *= u;
      return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
    }

    function position(row, u, rect, flush) {
      var i = -1,
          n = row.length,
          x = rect.x,
          y = rect.y,
          v = u ? round(row.area / u) : 0,
          o;

      if (u == rect.dx) {
        if (flush || v > rect.dy) v = rect.dy;

        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dy = v;
          x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
        }

        o.z = true;
        o.dx += rect.x + rect.dx - x;
        rect.y += v;
        rect.dy -= v;
      } else {
        if (flush || v > rect.dx) v = rect.dx;

        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dx = v;
          y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
        }

        o.z = false;
        o.dy += rect.y + rect.dy - y;
        rect.x += v;
        rect.dx -= v;
      }
    }

    function treemap(d) {
      var nodes = stickies || hierarchy(d),
          root = nodes[0];
      root.x = root.y = 0;
      if (root.value) root.dx = size[0], root.dy = size[1];else root.dx = root.dy = 0;
      if (stickies) hierarchy.revalue(root);
      scale([root], root.dx * root.dy / root.value);
      (stickies ? stickify : squarify)(root);
      if (sticky) stickies = nodes;
      return nodes;
    }

    treemap.size = function (x) {
      if (!arguments.length) return size;
      size = x;
      return treemap;
    };

    treemap.padding = function (x) {
      if (!arguments.length) return padding;

      function padFunction(node) {
        var p = x.call(treemap, node, node.depth);
        return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [p, p, p, p] : p);
      }

      function padConstant(node) {
        return d3_layout_treemapPad(node, x);
      }

      var type;
      pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [x, x, x, x], padConstant) : padConstant;
      return treemap;
    };

    treemap.round = function (x) {
      if (!arguments.length) return round != Number;
      round = x ? Math.round : Number;
      return treemap;
    };

    treemap.sticky = function (x) {
      if (!arguments.length) return sticky;
      sticky = x;
      stickies = null;
      return treemap;
    };

    treemap.ratio = function (x) {
      if (!arguments.length) return ratio;
      ratio = x;
      return treemap;
    };

    treemap.mode = function (x) {
      if (!arguments.length) return mode;
      mode = x + "";
      return treemap;
    };

    return d3_layout_hierarchyRebind(treemap, hierarchy);
  };

  function d3_layout_treemapPadNull(node) {
    return {
      x: node.x,
      y: node.y,
      dx: node.dx,
      dy: node.dy
    };
  }

  function d3_layout_treemapPad(node, padding) {
    var x = node.x + padding[3],
        y = node.y + padding[0],
        dx = node.dx - padding[1] - padding[3],
        dy = node.dy - padding[0] - padding[2];

    if (dx < 0) {
      x += dx / 2;
      dx = 0;
    }

    if (dy < 0) {
      y += dy / 2;
      dy = 0;
    }

    return {
      x: x,
      y: y,
      dx: dx,
      dy: dy
    };
  }

  d3.random = {
    normal: function (µ, σ) {
      var n = arguments.length;
      if (n < 2) σ = 1;
      if (n < 1) µ = 0;
      return function () {
        var x, y, r;

        do {
          x = Math.random() * 2 - 1;
          y = Math.random() * 2 - 1;
          r = x * x + y * y;
        } while (!r || r > 1);

        return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
      };
    },
    logNormal: function () {
      var random = d3.random.normal.apply(d3, arguments);
      return function () {
        return Math.exp(random());
      };
    },
    bates: function (m) {
      var random = d3.random.irwinHall(m);
      return function () {
        return random() / m;
      };
    },
    irwinHall: function (m) {
      return function () {
        for (var s = 0, j = 0; j < m; j++) s += Math.random();

        return s;
      };
    }
  };
  d3.scale = {};

  function d3_scaleExtent(domain) {
    var start = domain[0],
        stop = domain[domain.length - 1];
    return start < stop ? [start, stop] : [stop, start];
  }

  function d3_scaleRange(scale) {
    return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
  }

  function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
    var u = uninterpolate(domain[0], domain[1]),
        i = interpolate(range[0], range[1]);
    return function (x) {
      return i(u(x));
    };
  }

  function d3_scale_nice(domain, nice) {
    var i0 = 0,
        i1 = domain.length - 1,
        x0 = domain[i0],
        x1 = domain[i1],
        dx;

    if (x1 < x0) {
      dx = i0, i0 = i1, i1 = dx;
      dx = x0, x0 = x1, x1 = dx;
    }

    domain[i0] = nice.floor(x0);
    domain[i1] = nice.ceil(x1);
    return domain;
  }

  function d3_scale_niceStep(step) {
    return step ? {
      floor: function (x) {
        return Math.floor(x / step) * step;
      },
      ceil: function (x) {
        return Math.ceil(x / step) * step;
      }
    } : d3_scale_niceIdentity;
  }

  var d3_scale_niceIdentity = {
    floor: d3_identity,
    ceil: d3_identity
  };

  function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
    var u = [],
        i = [],
        j = 0,
        k = Math.min(domain.length, range.length) - 1;

    if (domain[k] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++j <= k) {
      u.push(uninterpolate(domain[j - 1], domain[j]));
      i.push(interpolate(range[j - 1], range[j]));
    }

    return function (x) {
      var j = d3.bisect(domain, x, 1, k) - 1;
      return i[j](u[j](x));
    };
  }

  d3.scale.linear = function () {
    return d3_scale_linear([0, 1], [0, 1], d3_interpolate, false);
  };

  function d3_scale_linear(domain, range, interpolate, clamp) {
    var output, input;

    function rescale() {
      var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear,
          uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
      output = linear(domain, range, uninterpolate, interpolate);
      input = linear(range, domain, uninterpolate, d3_interpolate);
      return scale;
    }

    function scale(x) {
      return output(x);
    }

    scale.invert = function (y) {
      return input(y);
    };

    scale.domain = function (x) {
      if (!arguments.length) return domain;
      domain = x.map(Number);
      return rescale();
    };

    scale.range = function (x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };

    scale.rangeRound = function (x) {
      return scale.range(x).interpolate(d3_interpolateRound);
    };

    scale.clamp = function (x) {
      if (!arguments.length) return clamp;
      clamp = x;
      return rescale();
    };

    scale.interpolate = function (x) {
      if (!arguments.length) return interpolate;
      interpolate = x;
      return rescale();
    };

    scale.ticks = function (m) {
      return d3_scale_linearTicks(domain, m);
    };

    scale.tickFormat = function (m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };

    scale.nice = function (m) {
      d3_scale_linearNice(domain, m);
      return rescale();
    };

    scale.copy = function () {
      return d3_scale_linear(domain, range, interpolate, clamp);
    };

    return rescale();
  }

  function d3_scale_linearRebind(scale, linear) {
    return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
  }

  function d3_scale_linearNice(domain, m) {
    d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
    d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
    return domain;
  }

  function d3_scale_linearTickRange(domain, m) {
    if (m == null) m = 10;
    var extent = d3_scaleExtent(domain),
        span = extent[1] - extent[0],
        step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
        err = m / span * step;
    if (err <= .15) step *= 10;else if (err <= .35) step *= 5;else if (err <= .75) step *= 2;
    extent[0] = Math.ceil(extent[0] / step) * step;
    extent[1] = Math.floor(extent[1] / step) * step + step * .5;
    extent[2] = step;
    return extent;
  }

  function d3_scale_linearTicks(domain, m) {
    return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
  }

  function d3_scale_linearTickFormat(domain, m, format) {
    var range = d3_scale_linearTickRange(domain, m);

    if (format) {
      var match = d3_format_re.exec(format);
      match.shift();

      if (match[8] === "s") {
        var prefix = d3.formatPrefix(Math.max(abs(range[0]), abs(range[1])));
        if (!match[7]) match[7] = "." + d3_scale_linearPrecision(prefix.scale(range[2]));
        match[8] = "f";
        format = d3.format(match.join(""));
        return function (d) {
          return format(prefix.scale(d)) + prefix.symbol;
        };
      }

      if (!match[7]) match[7] = "." + d3_scale_linearFormatPrecision(match[8], range);
      format = match.join("");
    } else {
      format = ",." + d3_scale_linearPrecision(range[2]) + "f";
    }

    return d3.format(format);
  }

  var d3_scale_linearFormatSignificant = {
    s: 1,
    g: 1,
    p: 1,
    r: 1,
    e: 1
  };

  function d3_scale_linearPrecision(value) {
    return -Math.floor(Math.log(value) / Math.LN10 + .01);
  }

  function d3_scale_linearFormatPrecision(type, range) {
    var p = d3_scale_linearPrecision(range[2]);
    return type in d3_scale_linearFormatSignificant ? Math.abs(p - d3_scale_linearPrecision(Math.max(abs(range[0]), abs(range[1])))) + +(type !== "e") : p - (type === "%") * 2;
  }

  d3.scale.log = function () {
    return d3_scale_log(d3.scale.linear().domain([0, 1]), 10, true, [1, 10]);
  };

  function d3_scale_log(linear, base, positive, domain) {
    function log(x) {
      return (positive ? Math.log(x < 0 ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base);
    }

    function pow(x) {
      return positive ? Math.pow(base, x) : -Math.pow(base, -x);
    }

    function scale(x) {
      return linear(log(x));
    }

    scale.invert = function (x) {
      return pow(linear.invert(x));
    };

    scale.domain = function (x) {
      if (!arguments.length) return domain;
      positive = x[0] >= 0;
      linear.domain((domain = x.map(Number)).map(log));
      return scale;
    };

    scale.base = function (_) {
      if (!arguments.length) return base;
      base = +_;
      linear.domain(domain.map(log));
      return scale;
    };

    scale.nice = function () {
      var niced = d3_scale_nice(domain.map(log), positive ? Math : d3_scale_logNiceNegative);
      linear.domain(niced);
      domain = niced.map(pow);
      return scale;
    };

    scale.ticks = function () {
      var extent = d3_scaleExtent(domain),
          ticks = [],
          u = extent[0],
          v = extent[1],
          i = Math.floor(log(u)),
          j = Math.ceil(log(v)),
          n = base % 1 ? 2 : base;

      if (isFinite(j - i)) {
        if (positive) {
          for (; i < j; i++) for (var k = 1; k < n; k++) ticks.push(pow(i) * k);

          ticks.push(pow(i));
        } else {
          ticks.push(pow(i));

          for (; i++ < j;) for (var k = n - 1; k > 0; k--) ticks.push(pow(i) * k);
        }

        for (i = 0; ticks[i] < u; i++) {}

        for (j = ticks.length; ticks[j - 1] > v; j--) {}

        ticks = ticks.slice(i, j);
      }

      return ticks;
    };

    scale.tickFormat = function (n, format) {
      if (!arguments.length) return d3_scale_logFormat;
      if (arguments.length < 2) format = d3_scale_logFormat;else if (typeof format !== "function") format = d3.format(format);
      var k = Math.max(1, base * n / scale.ticks().length);
      return function (d) {
        var i = d / pow(Math.round(log(d)));
        if (i * base < base - .5) i *= base;
        return i <= k ? format(d) : "";
      };
    };

    scale.copy = function () {
      return d3_scale_log(linear.copy(), base, positive, domain);
    };

    return d3_scale_linearRebind(scale, linear);
  }

  var d3_scale_logFormat = d3.format(".0e"),
      d3_scale_logNiceNegative = {
    floor: function (x) {
      return -Math.ceil(-x);
    },
    ceil: function (x) {
      return -Math.floor(-x);
    }
  };

  d3.scale.pow = function () {
    return d3_scale_pow(d3.scale.linear(), 1, [0, 1]);
  };

  function d3_scale_pow(linear, exponent, domain) {
    var powp = d3_scale_powPow(exponent),
        powb = d3_scale_powPow(1 / exponent);

    function scale(x) {
      return linear(powp(x));
    }

    scale.invert = function (x) {
      return powb(linear.invert(x));
    };

    scale.domain = function (x) {
      if (!arguments.length) return domain;
      linear.domain((domain = x.map(Number)).map(powp));
      return scale;
    };

    scale.ticks = function (m) {
      return d3_scale_linearTicks(domain, m);
    };

    scale.tickFormat = function (m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };

    scale.nice = function (m) {
      return scale.domain(d3_scale_linearNice(domain, m));
    };

    scale.exponent = function (x) {
      if (!arguments.length) return exponent;
      powp = d3_scale_powPow(exponent = x);
      powb = d3_scale_powPow(1 / exponent);
      linear.domain(domain.map(powp));
      return scale;
    };

    scale.copy = function () {
      return d3_scale_pow(linear.copy(), exponent, domain);
    };

    return d3_scale_linearRebind(scale, linear);
  }

  function d3_scale_powPow(e) {
    return function (x) {
      return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
    };
  }

  d3.scale.sqrt = function () {
    return d3.scale.pow().exponent(.5);
  };

  d3.scale.ordinal = function () {
    return d3_scale_ordinal([], {
      t: "range",
      a: [[]]
    });
  };

  function d3_scale_ordinal(domain, ranger) {
    var index, range, rangeBand;

    function scale(x) {
      return range[((index.get(x) || (ranger.t === "range" ? index.set(x, domain.push(x)) : NaN)) - 1) % range.length];
    }

    function steps(start, step) {
      return d3.range(domain.length).map(function (i) {
        return start + step * i;
      });
    }

    scale.domain = function (x) {
      if (!arguments.length) return domain;
      domain = [];
      index = new d3_Map();
      var i = -1,
          n = x.length,
          xi;

      while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));

      return scale[ranger.t].apply(scale, ranger.a);
    };

    scale.range = function (x) {
      if (!arguments.length) return range;
      range = x;
      rangeBand = 0;
      ranger = {
        t: "range",
        a: arguments
      };
      return scale;
    };

    scale.rangePoints = function (x, padding) {
      if (arguments.length < 2) padding = 0;
      var start = x[0],
          stop = x[1],
          step = domain.length < 2 ? (start = (start + stop) / 2, 0) : (stop - start) / (domain.length - 1 + padding);
      range = steps(start + step * padding / 2, step);
      rangeBand = 0;
      ranger = {
        t: "rangePoints",
        a: arguments
      };
      return scale;
    };

    scale.rangeRoundPoints = function (x, padding) {
      if (arguments.length < 2) padding = 0;
      var start = x[0],
          stop = x[1],
          step = domain.length < 2 ? (start = stop = Math.round((start + stop) / 2), 0) : (stop - start) / (domain.length - 1 + padding) | 0;
      range = steps(start + Math.round(step * padding / 2 + (stop - start - (domain.length - 1 + padding) * step) / 2), step);
      rangeBand = 0;
      ranger = {
        t: "rangeRoundPoints",
        a: arguments
      };
      return scale;
    };

    scale.rangeBands = function (x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0],
          start = x[reverse - 0],
          stop = x[1 - reverse],
          step = (stop - start) / (domain.length - padding + 2 * outerPadding);
      range = steps(start + step * outerPadding, step);
      if (reverse) range.reverse();
      rangeBand = step * (1 - padding);
      ranger = {
        t: "rangeBands",
        a: arguments
      };
      return scale;
    };

    scale.rangeRoundBands = function (x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0],
          start = x[reverse - 0],
          stop = x[1 - reverse],
          step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding));
      range = steps(start + Math.round((stop - start - (domain.length - padding) * step) / 2), step);
      if (reverse) range.reverse();
      rangeBand = Math.round(step * (1 - padding));
      ranger = {
        t: "rangeRoundBands",
        a: arguments
      };
      return scale;
    };

    scale.rangeBand = function () {
      return rangeBand;
    };

    scale.rangeExtent = function () {
      return d3_scaleExtent(ranger.a[0]);
    };

    scale.copy = function () {
      return d3_scale_ordinal(domain, ranger);
    };

    return scale.domain(domain);
  }

  d3.scale.category10 = function () {
    return d3.scale.ordinal().range(d3_category10);
  };

  d3.scale.category20 = function () {
    return d3.scale.ordinal().range(d3_category20);
  };

  d3.scale.category20b = function () {
    return d3.scale.ordinal().range(d3_category20b);
  };

  d3.scale.category20c = function () {
    return d3.scale.ordinal().range(d3_category20c);
  };

  var d3_category10 = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(d3_rgbString);
  var d3_category20 = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(d3_rgbString);
  var d3_category20b = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(d3_rgbString);
  var d3_category20c = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(d3_rgbString);

  d3.scale.quantile = function () {
    return d3_scale_quantile([], []);
  };

  function d3_scale_quantile(domain, range) {
    var thresholds;

    function rescale() {
      var k = 0,
          q = range.length;
      thresholds = [];

      while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);

      return scale;
    }

    function scale(x) {
      if (!isNaN(x = +x)) return range[d3.bisect(thresholds, x)];
    }

    scale.domain = function (x) {
      if (!arguments.length) return domain;
      domain = x.map(d3_number).filter(d3_numeric).sort(d3_ascending);
      return rescale();
    };

    scale.range = function (x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };

    scale.quantiles = function () {
      return thresholds;
    };

    scale.invertExtent = function (y) {
      y = range.indexOf(y);
      return y < 0 ? [NaN, NaN] : [y > 0 ? thresholds[y - 1] : domain[0], y < thresholds.length ? thresholds[y] : domain[domain.length - 1]];
    };

    scale.copy = function () {
      return d3_scale_quantile(domain, range);
    };

    return rescale();
  }

  d3.scale.quantize = function () {
    return d3_scale_quantize(0, 1, [0, 1]);
  };

  function d3_scale_quantize(x0, x1, range) {
    var kx, i;

    function scale(x) {
      return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
    }

    function rescale() {
      kx = range.length / (x1 - x0);
      i = range.length - 1;
      return scale;
    }

    scale.domain = function (x) {
      if (!arguments.length) return [x0, x1];
      x0 = +x[0];
      x1 = +x[x.length - 1];
      return rescale();
    };

    scale.range = function (x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };

    scale.invertExtent = function (y) {
      y = range.indexOf(y);
      y = y < 0 ? NaN : y / kx + x0;
      return [y, y + 1 / kx];
    };

    scale.copy = function () {
      return d3_scale_quantize(x0, x1, range);
    };

    return rescale();
  }

  d3.scale.threshold = function () {
    return d3_scale_threshold([.5], [0, 1]);
  };

  function d3_scale_threshold(domain, range) {
    function scale(x) {
      if (x <= x) return range[d3.bisect(domain, x)];
    }

    scale.domain = function (_) {
      if (!arguments.length) return domain;
      domain = _;
      return scale;
    };

    scale.range = function (_) {
      if (!arguments.length) return range;
      range = _;
      return scale;
    };

    scale.invertExtent = function (y) {
      y = range.indexOf(y);
      return [domain[y - 1], domain[y]];
    };

    scale.copy = function () {
      return d3_scale_threshold(domain, range);
    };

    return scale;
  }

  d3.scale.identity = function () {
    return d3_scale_identity([0, 1]);
  };

  function d3_scale_identity(domain) {
    function identity(x) {
      return +x;
    }

    identity.invert = identity;

    identity.domain = identity.range = function (x) {
      if (!arguments.length) return domain;
      domain = x.map(identity);
      return identity;
    };

    identity.ticks = function (m) {
      return d3_scale_linearTicks(domain, m);
    };

    identity.tickFormat = function (m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };

    identity.copy = function () {
      return d3_scale_identity(domain);
    };

    return identity;
  }

  d3.svg = {};

  function d3_zero() {
    return 0;
  }

  d3.svg.arc = function () {
    var innerRadius = d3_svg_arcInnerRadius,
        outerRadius = d3_svg_arcOuterRadius,
        cornerRadius = d3_zero,
        padRadius = d3_svg_arcAuto,
        startAngle = d3_svg_arcStartAngle,
        endAngle = d3_svg_arcEndAngle,
        padAngle = d3_svg_arcPadAngle;

    function arc() {
      var r0 = Math.max(0, +innerRadius.apply(this, arguments)),
          r1 = Math.max(0, +outerRadius.apply(this, arguments)),
          a0 = startAngle.apply(this, arguments) - halfπ,
          a1 = endAngle.apply(this, arguments) - halfπ,
          da = Math.abs(a1 - a0),
          cw = a0 > a1 ? 0 : 1;
      if (r1 < r0) rc = r1, r1 = r0, r0 = rc;
      if (da >= τε) return circleSegment(r1, cw) + (r0 ? circleSegment(r0, 1 - cw) : "") + "Z";
      var rc,
          cr,
          rp,
          ap,
          p0 = 0,
          p1 = 0,
          x0,
          y0,
          x1,
          y1,
          x2,
          y2,
          x3,
          y3,
          path = [];

      if (ap = (+padAngle.apply(this, arguments) || 0) / 2) {
        rp = padRadius === d3_svg_arcAuto ? Math.sqrt(r0 * r0 + r1 * r1) : +padRadius.apply(this, arguments);
        if (!cw) p1 *= -1;
        if (r1) p1 = d3_asin(rp / r1 * Math.sin(ap));
        if (r0) p0 = d3_asin(rp / r0 * Math.sin(ap));
      }

      if (r1) {
        x0 = r1 * Math.cos(a0 + p1);
        y0 = r1 * Math.sin(a0 + p1);
        x1 = r1 * Math.cos(a1 - p1);
        y1 = r1 * Math.sin(a1 - p1);
        var l1 = Math.abs(a1 - a0 - 2 * p1) <= π ? 0 : 1;

        if (p1 && d3_svg_arcSweep(x0, y0, x1, y1) === cw ^ l1) {
          var h1 = (a0 + a1) / 2;
          x0 = r1 * Math.cos(h1);
          y0 = r1 * Math.sin(h1);
          x1 = y1 = null;
        }
      } else {
        x0 = y0 = 0;
      }

      if (r0) {
        x2 = r0 * Math.cos(a1 - p0);
        y2 = r0 * Math.sin(a1 - p0);
        x3 = r0 * Math.cos(a0 + p0);
        y3 = r0 * Math.sin(a0 + p0);
        var l0 = Math.abs(a0 - a1 + 2 * p0) <= π ? 0 : 1;

        if (p0 && d3_svg_arcSweep(x2, y2, x3, y3) === 1 - cw ^ l0) {
          var h0 = (a0 + a1) / 2;
          x2 = r0 * Math.cos(h0);
          y2 = r0 * Math.sin(h0);
          x3 = y3 = null;
        }
      } else {
        x2 = y2 = 0;
      }

      if (da > ε && (rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments))) > .001) {
        cr = r0 < r1 ^ cw ? 0 : 1;
        var rc1 = rc,
            rc0 = rc;

        if (da < π) {
          var oc = x3 == null ? [x2, y2] : x1 == null ? [x0, y0] : d3_geom_polygonIntersect([x0, y0], [x3, y3], [x1, y1], [x2, y2]),
              ax = x0 - oc[0],
              ay = y0 - oc[1],
              bx = x1 - oc[0],
              by = y1 - oc[1],
              kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
              lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
          rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
        }

        if (x1 != null) {
          var t30 = d3_svg_arcCornerTangents(x3 == null ? [x2, y2] : [x3, y3], [x0, y0], r1, rc1, cw),
              t12 = d3_svg_arcCornerTangents([x1, y1], [x2, y2], r1, rc1, cw);

          if (rc === rc1) {
            path.push("M", t30[0], "A", rc1, ",", rc1, " 0 0,", cr, " ", t30[1], "A", r1, ",", r1, " 0 ", 1 - cw ^ d3_svg_arcSweep(t30[1][0], t30[1][1], t12[1][0], t12[1][1]), ",", cw, " ", t12[1], "A", rc1, ",", rc1, " 0 0,", cr, " ", t12[0]);
          } else {
            path.push("M", t30[0], "A", rc1, ",", rc1, " 0 1,", cr, " ", t12[0]);
          }
        } else {
          path.push("M", x0, ",", y0);
        }

        if (x3 != null) {
          var t03 = d3_svg_arcCornerTangents([x0, y0], [x3, y3], r0, -rc0, cw),
              t21 = d3_svg_arcCornerTangents([x2, y2], x1 == null ? [x0, y0] : [x1, y1], r0, -rc0, cw);

          if (rc === rc0) {
            path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t21[1], "A", r0, ",", r0, " 0 ", cw ^ d3_svg_arcSweep(t21[1][0], t21[1][1], t03[1][0], t03[1][1]), ",", 1 - cw, " ", t03[1], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
          } else {
            path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
          }
        } else {
          path.push("L", x2, ",", y2);
        }
      } else {
        path.push("M", x0, ",", y0);
        if (x1 != null) path.push("A", r1, ",", r1, " 0 ", l1, ",", cw, " ", x1, ",", y1);
        path.push("L", x2, ",", y2);
        if (x3 != null) path.push("A", r0, ",", r0, " 0 ", l0, ",", 1 - cw, " ", x3, ",", y3);
      }

      path.push("Z");
      return path.join("");
    }

    function circleSegment(r1, cw) {
      return "M0," + r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + -r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + r1;
    }

    arc.innerRadius = function (v) {
      if (!arguments.length) return innerRadius;
      innerRadius = d3_functor(v);
      return arc;
    };

    arc.outerRadius = function (v) {
      if (!arguments.length) return outerRadius;
      outerRadius = d3_functor(v);
      return arc;
    };

    arc.cornerRadius = function (v) {
      if (!arguments.length) return cornerRadius;
      cornerRadius = d3_functor(v);
      return arc;
    };

    arc.padRadius = function (v) {
      if (!arguments.length) return padRadius;
      padRadius = v == d3_svg_arcAuto ? d3_svg_arcAuto : d3_functor(v);
      return arc;
    };

    arc.startAngle = function (v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return arc;
    };

    arc.endAngle = function (v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return arc;
    };

    arc.padAngle = function (v) {
      if (!arguments.length) return padAngle;
      padAngle = d3_functor(v);
      return arc;
    };

    arc.centroid = function () {
      var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
          a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - halfπ;
      return [Math.cos(a) * r, Math.sin(a) * r];
    };

    return arc;
  };

  var d3_svg_arcAuto = "auto";

  function d3_svg_arcInnerRadius(d) {
    return d.innerRadius;
  }

  function d3_svg_arcOuterRadius(d) {
    return d.outerRadius;
  }

  function d3_svg_arcStartAngle(d) {
    return d.startAngle;
  }

  function d3_svg_arcEndAngle(d) {
    return d.endAngle;
  }

  function d3_svg_arcPadAngle(d) {
    return d && d.padAngle;
  }

  function d3_svg_arcSweep(x0, y0, x1, y1) {
    return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1;
  }

  function d3_svg_arcCornerTangents(p0, p1, r1, rc, cw) {
    var x01 = p0[0] - p1[0],
        y01 = p0[1] - p1[1],
        lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01),
        ox = lo * y01,
        oy = -lo * x01,
        x1 = p0[0] + ox,
        y1 = p0[1] + oy,
        x2 = p1[0] + ox,
        y2 = p1[1] + oy,
        x3 = (x1 + x2) / 2,
        y3 = (y1 + y2) / 2,
        dx = x2 - x1,
        dy = y2 - y1,
        d2 = dx * dx + dy * dy,
        r = r1 - rc,
        D = x1 * y2 - x2 * y1,
        d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)),
        cx0 = (D * dy - dx * d) / d2,
        cy0 = (-D * dx - dy * d) / d2,
        cx1 = (D * dy + dx * d) / d2,
        cy1 = (-D * dx + dy * d) / d2,
        dx0 = cx0 - x3,
        dy0 = cy0 - y3,
        dx1 = cx1 - x3,
        dy1 = cy1 - y3;
    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
    return [[cx0 - ox, cy0 - oy], [cx0 * r1 / r, cy0 * r1 / r]];
  }

  function d3_svg_line(projection) {
    var x = d3_geom_pointX,
        y = d3_geom_pointY,
        defined = d3_true,
        interpolate = d3_svg_lineLinear,
        interpolateKey = interpolate.key,
        tension = .7;

    function line(data) {
      var segments = [],
          points = [],
          i = -1,
          n = data.length,
          d,
          fx = d3_functor(x),
          fy = d3_functor(y);

      function segment() {
        segments.push("M", interpolate(projection(points), tension));
      }

      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points.push([+fx.call(this, d, i), +fy.call(this, d, i)]);
        } else if (points.length) {
          segment();
          points = [];
        }
      }

      if (points.length) segment();
      return segments.length ? segments.join("") : null;
    }

    line.x = function (_) {
      if (!arguments.length) return x;
      x = _;
      return line;
    };

    line.y = function (_) {
      if (!arguments.length) return y;
      y = _;
      return line;
    };

    line.defined = function (_) {
      if (!arguments.length) return defined;
      defined = _;
      return line;
    };

    line.interpolate = function (_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _;else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      return line;
    };

    line.tension = function (_) {
      if (!arguments.length) return tension;
      tension = _;
      return line;
    };

    return line;
  }

  d3.svg.line = function () {
    return d3_svg_line(d3_identity);
  };

  var d3_svg_lineInterpolators = d3.map({
    linear: d3_svg_lineLinear,
    "linear-closed": d3_svg_lineLinearClosed,
    step: d3_svg_lineStep,
    "step-before": d3_svg_lineStepBefore,
    "step-after": d3_svg_lineStepAfter,
    basis: d3_svg_lineBasis,
    "basis-open": d3_svg_lineBasisOpen,
    "basis-closed": d3_svg_lineBasisClosed,
    bundle: d3_svg_lineBundle,
    cardinal: d3_svg_lineCardinal,
    "cardinal-open": d3_svg_lineCardinalOpen,
    "cardinal-closed": d3_svg_lineCardinalClosed,
    monotone: d3_svg_lineMonotone
  });
  d3_svg_lineInterpolators.forEach(function (key, value) {
    value.key = key;
    value.closed = /-closed$/.test(key);
  });

  function d3_svg_lineLinear(points) {
    return points.length > 1 ? points.join("L") : points + "Z";
  }

  function d3_svg_lineLinearClosed(points) {
    return points.join("L") + "Z";
  }

  function d3_svg_lineStep(points) {
    var i = 0,
        n = points.length,
        p = points[0],
        path = [p[0], ",", p[1]];

    while (++i < n) path.push("H", (p[0] + (p = points[i])[0]) / 2, "V", p[1]);

    if (n > 1) path.push("H", p[0]);
    return path.join("");
  }

  function d3_svg_lineStepBefore(points) {
    var i = 0,
        n = points.length,
        p = points[0],
        path = [p[0], ",", p[1]];

    while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);

    return path.join("");
  }

  function d3_svg_lineStepAfter(points) {
    var i = 0,
        n = points.length,
        p = points[0],
        path = [p[0], ",", p[1]];

    while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);

    return path.join("");
  }

  function d3_svg_lineCardinalOpen(points, tension) {
    return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, -1), d3_svg_lineCardinalTangents(points, tension));
  }

  function d3_svg_lineCardinalClosed(points, tension) {
    return points.length < 3 ? d3_svg_lineLinearClosed(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), points), d3_svg_lineCardinalTangents([points[points.length - 2]].concat(points, [points[1]]), tension));
  }

  function d3_svg_lineCardinal(points, tension) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
  }

  function d3_svg_lineHermite(points, tangents) {
    if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
      return d3_svg_lineLinear(points);
    }

    var quad = points.length != tangents.length,
        path = "",
        p0 = points[0],
        p = points[1],
        t0 = tangents[0],
        t = t0,
        pi = 1;

    if (quad) {
      path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
      p0 = points[1];
      pi = 2;
    }

    if (tangents.length > 1) {
      t = tangents[1];
      p = points[pi];
      pi++;
      path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];

      for (var i = 2; i < tangents.length; i++, pi++) {
        p = points[pi];
        t = tangents[i];
        path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      }
    }

    if (quad) {
      var lp = points[pi];
      path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
    }

    return path;
  }

  function d3_svg_lineCardinalTangents(points, tension) {
    var tangents = [],
        a = (1 - tension) / 2,
        p0,
        p1 = points[0],
        p2 = points[1],
        i = 1,
        n = points.length;

    while (++i < n) {
      p0 = p1;
      p1 = p2;
      p2 = points[i];
      tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
    }

    return tangents;
  }

  function d3_svg_lineBasis(points) {
    if (points.length < 3) return d3_svg_lineLinear(points);
    var i = 1,
        n = points.length,
        pi = points[0],
        x0 = pi[0],
        y0 = pi[1],
        px = [x0, x0, x0, (pi = points[1])[0]],
        py = [y0, y0, y0, pi[1]],
        path = [x0, ",", y0, "L", d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)];
    points.push(points[n - 1]);

    while (++i <= n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }

    points.pop();
    path.push("L", pi);
    return path.join("");
  }

  function d3_svg_lineBasisOpen(points) {
    if (points.length < 4) return d3_svg_lineLinear(points);
    var path = [],
        i = -1,
        n = points.length,
        pi,
        px = [0],
        py = [0];

    while (++i < 3) {
      pi = points[i];
      px.push(pi[0]);
      py.push(pi[1]);
    }

    path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
    --i;

    while (++i < n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }

    return path.join("");
  }

  function d3_svg_lineBasisClosed(points) {
    var path,
        i = -1,
        n = points.length,
        m = n + 4,
        pi,
        px = [],
        py = [];

    while (++i < 4) {
      pi = points[i % n];
      px.push(pi[0]);
      py.push(pi[1]);
    }

    path = [d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)];
    --i;

    while (++i < m) {
      pi = points[i % n];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }

    return path.join("");
  }

  function d3_svg_lineBundle(points, tension) {
    var n = points.length - 1;

    if (n) {
      var x0 = points[0][0],
          y0 = points[0][1],
          dx = points[n][0] - x0,
          dy = points[n][1] - y0,
          i = -1,
          p,
          t;

      while (++i <= n) {
        p = points[i];
        t = i / n;
        p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
        p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
      }
    }

    return d3_svg_lineBasis(points);
  }

  function d3_svg_lineDot4(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }

  var d3_svg_lineBasisBezier1 = [0, 2 / 3, 1 / 3, 0],
      d3_svg_lineBasisBezier2 = [0, 1 / 3, 2 / 3, 0],
      d3_svg_lineBasisBezier3 = [0, 1 / 6, 2 / 3, 1 / 6];

  function d3_svg_lineBasisBezier(path, x, y) {
    path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
  }

  function d3_svg_lineSlope(p0, p1) {
    return (p1[1] - p0[1]) / (p1[0] - p0[0]);
  }

  function d3_svg_lineFiniteDifferences(points) {
    var i = 0,
        j = points.length - 1,
        m = [],
        p0 = points[0],
        p1 = points[1],
        d = m[0] = d3_svg_lineSlope(p0, p1);

    while (++i < j) {
      m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
    }

    m[i] = d;
    return m;
  }

  function d3_svg_lineMonotoneTangents(points) {
    var tangents = [],
        d,
        a,
        b,
        s,
        m = d3_svg_lineFiniteDifferences(points),
        i = -1,
        j = points.length - 1;

    while (++i < j) {
      d = d3_svg_lineSlope(points[i], points[i + 1]);

      if (abs(d) < ε) {
        m[i] = m[i + 1] = 0;
      } else {
        a = m[i] / d;
        b = m[i + 1] / d;
        s = a * a + b * b;

        if (s > 9) {
          s = d * 3 / Math.sqrt(s);
          m[i] = s * a;
          m[i + 1] = s * b;
        }
      }
    }

    i = -1;

    while (++i <= j) {
      s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
      tangents.push([s || 0, m[i] * s || 0]);
    }

    return tangents;
  }

  function d3_svg_lineMonotone(points) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
  }

  d3.svg.line.radial = function () {
    var line = d3_svg_line(d3_svg_lineRadial);
    line.radius = line.x, delete line.x;
    line.angle = line.y, delete line.y;
    return line;
  };

  function d3_svg_lineRadial(points) {
    var point,
        i = -1,
        n = points.length,
        r,
        a;

    while (++i < n) {
      point = points[i];
      r = point[0];
      a = point[1] - halfπ;
      point[0] = r * Math.cos(a);
      point[1] = r * Math.sin(a);
    }

    return points;
  }

  function d3_svg_area(projection) {
    var x0 = d3_geom_pointX,
        x1 = d3_geom_pointX,
        y0 = 0,
        y1 = d3_geom_pointY,
        defined = d3_true,
        interpolate = d3_svg_lineLinear,
        interpolateKey = interpolate.key,
        interpolateReverse = interpolate,
        L = "L",
        tension = .7;

    function area(data) {
      var segments = [],
          points0 = [],
          points1 = [],
          i = -1,
          n = data.length,
          d,
          fx0 = d3_functor(x0),
          fy0 = d3_functor(y0),
          fx1 = x0 === x1 ? function () {
        return x;
      } : d3_functor(x1),
          fy1 = y0 === y1 ? function () {
        return y;
      } : d3_functor(y1),
          x,
          y;

      function segment() {
        segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z");
      }

      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points0.push([x = +fx0.call(this, d, i), y = +fy0.call(this, d, i)]);
          points1.push([+fx1.call(this, d, i), +fy1.call(this, d, i)]);
        } else if (points0.length) {
          segment();
          points0 = [];
          points1 = [];
        }
      }

      if (points0.length) segment();
      return segments.length ? segments.join("") : null;
    }

    area.x = function (_) {
      if (!arguments.length) return x1;
      x0 = x1 = _;
      return area;
    };

    area.x0 = function (_) {
      if (!arguments.length) return x0;
      x0 = _;
      return area;
    };

    area.x1 = function (_) {
      if (!arguments.length) return x1;
      x1 = _;
      return area;
    };

    area.y = function (_) {
      if (!arguments.length) return y1;
      y0 = y1 = _;
      return area;
    };

    area.y0 = function (_) {
      if (!arguments.length) return y0;
      y0 = _;
      return area;
    };

    area.y1 = function (_) {
      if (!arguments.length) return y1;
      y1 = _;
      return area;
    };

    area.defined = function (_) {
      if (!arguments.length) return defined;
      defined = _;
      return area;
    };

    area.interpolate = function (_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _;else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      interpolateReverse = interpolate.reverse || interpolate;
      L = interpolate.closed ? "M" : "L";
      return area;
    };

    area.tension = function (_) {
      if (!arguments.length) return tension;
      tension = _;
      return area;
    };

    return area;
  }

  d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
  d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;

  d3.svg.area = function () {
    return d3_svg_area(d3_identity);
  };

  d3.svg.area.radial = function () {
    var area = d3_svg_area(d3_svg_lineRadial);
    area.radius = area.x, delete area.x;
    area.innerRadius = area.x0, delete area.x0;
    area.outerRadius = area.x1, delete area.x1;
    area.angle = area.y, delete area.y;
    area.startAngle = area.y0, delete area.y0;
    area.endAngle = area.y1, delete area.y1;
    return area;
  };

  d3.svg.chord = function () {
    var source = d3_source,
        target = d3_target,
        radius = d3_svg_chordRadius,
        startAngle = d3_svg_arcStartAngle,
        endAngle = d3_svg_arcEndAngle;

    function chord(d, i) {
      var s = subgroup(this, source, d, i),
          t = subgroup(this, target, d, i);
      return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z";
    }

    function subgroup(self, f, d, i) {
      var subgroup = f.call(self, d, i),
          r = radius.call(self, subgroup, i),
          a0 = startAngle.call(self, subgroup, i) - halfπ,
          a1 = endAngle.call(self, subgroup, i) - halfπ;
      return {
        r: r,
        a0: a0,
        a1: a1,
        p0: [r * Math.cos(a0), r * Math.sin(a0)],
        p1: [r * Math.cos(a1), r * Math.sin(a1)]
      };
    }

    function equals(a, b) {
      return a.a0 == b.a0 && a.a1 == b.a1;
    }

    function arc(r, p, a) {
      return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p;
    }

    function curve(r0, p0, r1, p1) {
      return "Q 0,0 " + p1;
    }

    chord.radius = function (v) {
      if (!arguments.length) return radius;
      radius = d3_functor(v);
      return chord;
    };

    chord.source = function (v) {
      if (!arguments.length) return source;
      source = d3_functor(v);
      return chord;
    };

    chord.target = function (v) {
      if (!arguments.length) return target;
      target = d3_functor(v);
      return chord;
    };

    chord.startAngle = function (v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return chord;
    };

    chord.endAngle = function (v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return chord;
    };

    return chord;
  };

  function d3_svg_chordRadius(d) {
    return d.radius;
  }

  d3.svg.diagonal = function () {
    var source = d3_source,
        target = d3_target,
        projection = d3_svg_diagonalProjection;

    function diagonal(d, i) {
      var p0 = source.call(this, d, i),
          p3 = target.call(this, d, i),
          m = (p0.y + p3.y) / 2,
          p = [p0, {
        x: p0.x,
        y: m
      }, {
        x: p3.x,
        y: m
      }, p3];
      p = p.map(projection);
      return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
    }

    diagonal.source = function (x) {
      if (!arguments.length) return source;
      source = d3_functor(x);
      return diagonal;
    };

    diagonal.target = function (x) {
      if (!arguments.length) return target;
      target = d3_functor(x);
      return diagonal;
    };

    diagonal.projection = function (x) {
      if (!arguments.length) return projection;
      projection = x;
      return diagonal;
    };

    return diagonal;
  };

  function d3_svg_diagonalProjection(d) {
    return [d.x, d.y];
  }

  d3.svg.diagonal.radial = function () {
    var diagonal = d3.svg.diagonal(),
        projection = d3_svg_diagonalProjection,
        projection_ = diagonal.projection;

    diagonal.projection = function (x) {
      return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
    };

    return diagonal;
  };

  function d3_svg_diagonalRadialProjection(projection) {
    return function () {
      var d = projection.apply(this, arguments),
          r = d[0],
          a = d[1] - halfπ;
      return [r * Math.cos(a), r * Math.sin(a)];
    };
  }

  d3.svg.symbol = function () {
    var type = d3_svg_symbolType,
        size = d3_svg_symbolSize;

    function symbol(d, i) {
      return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
    }

    symbol.type = function (x) {
      if (!arguments.length) return type;
      type = d3_functor(x);
      return symbol;
    };

    symbol.size = function (x) {
      if (!arguments.length) return size;
      size = d3_functor(x);
      return symbol;
    };

    return symbol;
  };

  function d3_svg_symbolSize() {
    return 64;
  }

  function d3_svg_symbolType() {
    return "circle";
  }

  function d3_svg_symbolCircle(size) {
    var r = Math.sqrt(size / π);
    return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
  }

  var d3_svg_symbols = d3.map({
    circle: d3_svg_symbolCircle,
    cross: function (size) {
      var r = Math.sqrt(size / 5) / 2;
      return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
    },
    diamond: function (size) {
      var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)),
          rx = ry * d3_svg_symbolTan30;
      return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z";
    },
    square: function (size) {
      var r = Math.sqrt(size) / 2;
      return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
    },
    "triangle-down": function (size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
          ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
    },
    "triangle-up": function (size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
          ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
    }
  });
  d3.svg.symbolTypes = d3_svg_symbols.keys();
  var d3_svg_symbolSqrt3 = Math.sqrt(3),
      d3_svg_symbolTan30 = Math.tan(30 * d3_radians);

  d3_selectionPrototype.transition = function (name) {
    var id = d3_transitionInheritId || ++d3_transitionId,
        ns = d3_transitionNamespace(name),
        subgroups = [],
        subgroup,
        node,
        transition = d3_transitionInherit || {
      time: Date.now(),
      ease: d3_ease_cubicInOut,
      delay: 0,
      duration: 250
    };

    for (var j = -1, m = this.length; ++j < m;) {
      subgroups.push(subgroup = []);

      for (var group = this[j], i = -1, n = group.length; ++i < n;) {
        if (node = group[i]) d3_transitionNode(node, i, ns, id, transition);
        subgroup.push(node);
      }
    }

    return d3_transition(subgroups, ns, id);
  };

  d3_selectionPrototype.interrupt = function (name) {
    return this.each(name == null ? d3_selection_interrupt : d3_selection_interruptNS(d3_transitionNamespace(name)));
  };

  var d3_selection_interrupt = d3_selection_interruptNS(d3_transitionNamespace());

  function d3_selection_interruptNS(ns) {
    return function () {
      var lock, activeId, active;

      if ((lock = this[ns]) && (active = lock[activeId = lock.active])) {
        active.timer.c = null;
        active.timer.t = NaN;
        if (--lock.count) delete lock[activeId];else delete this[ns];
        lock.active += .5;
        active.event && active.event.interrupt.call(this, this.__data__, active.index);
      }
    };
  }

  function d3_transition(groups, ns, id) {
    d3_subclass(groups, d3_transitionPrototype);
    groups.namespace = ns;
    groups.id = id;
    return groups;
  }

  var d3_transitionPrototype = [],
      d3_transitionId = 0,
      d3_transitionInheritId,
      d3_transitionInherit;
  d3_transitionPrototype.call = d3_selectionPrototype.call;
  d3_transitionPrototype.empty = d3_selectionPrototype.empty;
  d3_transitionPrototype.node = d3_selectionPrototype.node;
  d3_transitionPrototype.size = d3_selectionPrototype.size;

  d3.transition = function (selection, name) {
    return selection && selection.transition ? d3_transitionInheritId ? selection.transition(name) : selection : d3.selection().transition(selection);
  };

  d3.transition.prototype = d3_transitionPrototype;

  d3_transitionPrototype.select = function (selector) {
    var id = this.id,
        ns = this.namespace,
        subgroups = [],
        subgroup,
        subnode,
        node;
    selector = d3_selection_selector(selector);

    for (var j = -1, m = this.length; ++j < m;) {
      subgroups.push(subgroup = []);

      for (var group = this[j], i = -1, n = group.length; ++i < n;) {
        if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          d3_transitionNode(subnode, i, ns, id, node[ns][id]);
          subgroup.push(subnode);
        } else {
          subgroup.push(null);
        }
      }
    }

    return d3_transition(subgroups, ns, id);
  };

  d3_transitionPrototype.selectAll = function (selector) {
    var id = this.id,
        ns = this.namespace,
        subgroups = [],
        subgroup,
        subnodes,
        node,
        subnode,
        transition;
    selector = d3_selection_selectorAll(selector);

    for (var j = -1, m = this.length; ++j < m;) {
      for (var group = this[j], i = -1, n = group.length; ++i < n;) {
        if (node = group[i]) {
          transition = node[ns][id];
          subnodes = selector.call(node, node.__data__, i, j);
          subgroups.push(subgroup = []);

          for (var k = -1, o = subnodes.length; ++k < o;) {
            if (subnode = subnodes[k]) d3_transitionNode(subnode, k, ns, id, transition);
            subgroup.push(subnode);
          }
        }
      }
    }

    return d3_transition(subgroups, ns, id);
  };

  d3_transitionPrototype.filter = function (filter) {
    var subgroups = [],
        subgroup,
        group,
        node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);

    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);

      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
          subgroup.push(node);
        }
      }
    }

    return d3_transition(subgroups, this.namespace, this.id);
  };

  d3_transitionPrototype.tween = function (name, tween) {
    var id = this.id,
        ns = this.namespace;
    if (arguments.length < 2) return this.node()[ns][id].tween.get(name);
    return d3_selection_each(this, tween == null ? function (node) {
      node[ns][id].tween.remove(name);
    } : function (node) {
      node[ns][id].tween.set(name, tween);
    });
  };

  function d3_transition_tween(groups, name, value, tween) {
    var id = groups.id,
        ns = groups.namespace;
    return d3_selection_each(groups, typeof value === "function" ? function (node, i, j) {
      node[ns][id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
    } : (value = tween(value), function (node) {
      node[ns][id].tween.set(name, value);
    }));
  }

  d3_transitionPrototype.attr = function (nameNS, value) {
    if (arguments.length < 2) {
      for (value in nameNS) this.attr(value, nameNS[value]);

      return this;
    }

    var interpolate = nameNS == "transform" ? d3_interpolateTransform : d3_interpolate,
        name = d3.ns.qualify(nameNS);

    function attrNull() {
      this.removeAttribute(name);
    }

    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }

    function attrTween(b) {
      return b == null ? attrNull : (b += "", function () {
        var a = this.getAttribute(name),
            i;
        return a !== b && (i = interpolate(a, b), function (t) {
          this.setAttribute(name, i(t));
        });
      });
    }

    function attrTweenNS(b) {
      return b == null ? attrNullNS : (b += "", function () {
        var a = this.getAttributeNS(name.space, name.local),
            i;
        return a !== b && (i = interpolate(a, b), function (t) {
          this.setAttributeNS(name.space, name.local, i(t));
        });
      });
    }

    return d3_transition_tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween);
  };

  d3_transitionPrototype.attrTween = function (nameNS, tween) {
    var name = d3.ns.qualify(nameNS);

    function attrTween(d, i) {
      var f = tween.call(this, d, i, this.getAttribute(name));
      return f && function (t) {
        this.setAttribute(name, f(t));
      };
    }

    function attrTweenNS(d, i) {
      var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
      return f && function (t) {
        this.setAttributeNS(name.space, name.local, f(t));
      };
    }

    return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
  };

  d3_transitionPrototype.style = function (name, value, priority) {
    var n = arguments.length;

    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";

        for (priority in name) this.style(priority, name[priority], value);

        return this;
      }

      priority = "";
    }

    function styleNull() {
      this.style.removeProperty(name);
    }

    function styleString(b) {
      return b == null ? styleNull : (b += "", function () {
        var a = d3_window(this).getComputedStyle(this, null).getPropertyValue(name),
            i;
        return a !== b && (i = d3_interpolate(a, b), function (t) {
          this.style.setProperty(name, i(t), priority);
        });
      });
    }

    return d3_transition_tween(this, "style." + name, value, styleString);
  };

  d3_transitionPrototype.styleTween = function (name, tween, priority) {
    if (arguments.length < 3) priority = "";

    function styleTween(d, i) {
      var f = tween.call(this, d, i, d3_window(this).getComputedStyle(this, null).getPropertyValue(name));
      return f && function (t) {
        this.style.setProperty(name, f(t), priority);
      };
    }

    return this.tween("style." + name, styleTween);
  };

  d3_transitionPrototype.text = function (value) {
    return d3_transition_tween(this, "text", value, d3_transition_text);
  };

  function d3_transition_text(b) {
    if (b == null) b = "";
    return function () {
      this.textContent = b;
    };
  }

  d3_transitionPrototype.remove = function () {
    var ns = this.namespace;
    return this.each("end.transition", function () {
      var p;
      if (this[ns].count < 2 && (p = this.parentNode)) p.removeChild(this);
    });
  };

  d3_transitionPrototype.ease = function (value) {
    var id = this.id,
        ns = this.namespace;
    if (arguments.length < 1) return this.node()[ns][id].ease;
    if (typeof value !== "function") value = d3.ease.apply(d3, arguments);
    return d3_selection_each(this, function (node) {
      node[ns][id].ease = value;
    });
  };

  d3_transitionPrototype.delay = function (value) {
    var id = this.id,
        ns = this.namespace;
    if (arguments.length < 1) return this.node()[ns][id].delay;
    return d3_selection_each(this, typeof value === "function" ? function (node, i, j) {
      node[ns][id].delay = +value.call(node, node.__data__, i, j);
    } : (value = +value, function (node) {
      node[ns][id].delay = value;
    }));
  };

  d3_transitionPrototype.duration = function (value) {
    var id = this.id,
        ns = this.namespace;
    if (arguments.length < 1) return this.node()[ns][id].duration;
    return d3_selection_each(this, typeof value === "function" ? function (node, i, j) {
      node[ns][id].duration = Math.max(1, value.call(node, node.__data__, i, j));
    } : (value = Math.max(1, value), function (node) {
      node[ns][id].duration = value;
    }));
  };

  d3_transitionPrototype.each = function (type, listener) {
    var id = this.id,
        ns = this.namespace;

    if (arguments.length < 2) {
      var inherit = d3_transitionInherit,
          inheritId = d3_transitionInheritId;

      try {
        d3_transitionInheritId = id;
        d3_selection_each(this, function (node, i, j) {
          d3_transitionInherit = node[ns][id];
          type.call(node, node.__data__, i, j);
        });
      } finally {
        d3_transitionInherit = inherit;
        d3_transitionInheritId = inheritId;
      }
    } else {
      d3_selection_each(this, function (node) {
        var transition = node[ns][id];
        (transition.event || (transition.event = d3.dispatch("start", "end", "interrupt"))).on(type, listener);
      });
    }

    return this;
  };

  d3_transitionPrototype.transition = function () {
    var id0 = this.id,
        id1 = ++d3_transitionId,
        ns = this.namespace,
        subgroups = [],
        subgroup,
        group,
        node,
        transition;

    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);

      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          transition = node[ns][id0];
          d3_transitionNode(node, i, ns, id1, {
            time: transition.time,
            ease: transition.ease,
            delay: transition.delay + transition.duration,
            duration: transition.duration
          });
        }

        subgroup.push(node);
      }
    }

    return d3_transition(subgroups, ns, id1);
  };

  function d3_transitionNamespace(name) {
    return name == null ? "__transition__" : "__transition_" + name + "__";
  }

  function d3_transitionNode(node, i, ns, id, inherit) {
    var lock = node[ns] || (node[ns] = {
      active: 0,
      count: 0
    }),
        transition = lock[id],
        time,
        timer,
        duration,
        ease,
        tweens;

    function schedule(elapsed) {
      var delay = transition.delay;
      timer.t = delay + time;
      if (delay <= elapsed) return start(elapsed - delay);
      timer.c = start;
    }

    function start(elapsed) {
      var activeId = lock.active,
          active = lock[activeId];

      if (active) {
        active.timer.c = null;
        active.timer.t = NaN;
        --lock.count;
        delete lock[activeId];
        active.event && active.event.interrupt.call(node, node.__data__, active.index);
      }

      for (var cancelId in lock) {
        if (+cancelId < id) {
          var cancel = lock[cancelId];
          cancel.timer.c = null;
          cancel.timer.t = NaN;
          --lock.count;
          delete lock[cancelId];
        }
      }

      timer.c = tick;
      d3_timer(function () {
        if (timer.c && tick(elapsed || 1)) {
          timer.c = null;
          timer.t = NaN;
        }

        return 1;
      }, 0, time);
      lock.active = id;
      transition.event && transition.event.start.call(node, node.__data__, i);
      tweens = [];
      transition.tween.forEach(function (key, value) {
        if (value = value.call(node, node.__data__, i)) {
          tweens.push(value);
        }
      });
      ease = transition.ease;
      duration = transition.duration;
    }

    function tick(elapsed) {
      var t = elapsed / duration,
          e = ease(t),
          n = tweens.length;

      while (n > 0) {
        tweens[--n].call(node, e);
      }

      if (t >= 1) {
        transition.event && transition.event.end.call(node, node.__data__, i);
        if (--lock.count) delete lock[id];else delete node[ns];
        return 1;
      }
    }

    if (!transition) {
      time = inherit.time;
      timer = d3_timer(schedule, 0, time);
      transition = lock[id] = {
        tween: new d3_Map(),
        time: time,
        timer: timer,
        delay: inherit.delay,
        duration: inherit.duration,
        ease: inherit.ease,
        index: i
      };
      inherit = null;
      ++lock.count;
    }
  }

  d3.svg.axis = function () {
    var scale = d3.scale.linear(),
        orient = d3_svg_axisDefaultOrient,
        innerTickSize = 6,
        outerTickSize = 6,
        tickPadding = 3,
        tickArguments_ = [10],
        tickValues = null,
        tickFormat_;

    function axis(g) {
      g.each(function () {
        var g = d3.select(this);
        var scale0 = this.__chart__ || scale,
            scale1 = this.__chart__ = scale.copy();
        var ticks = tickValues == null ? scale1.ticks ? scale1.ticks.apply(scale1, tickArguments_) : scale1.domain() : tickValues,
            tickFormat = tickFormat_ == null ? scale1.tickFormat ? scale1.tickFormat.apply(scale1, tickArguments_) : d3_identity : tickFormat_,
            tick = g.selectAll(".tick").data(ticks, scale1),
            tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", ε),
            tickExit = d3.transition(tick.exit()).style("opacity", ε).remove(),
            tickUpdate = d3.transition(tick.order()).style("opacity", 1),
            tickSpacing = Math.max(innerTickSize, 0) + tickPadding,
            tickTransform;
        var range = d3_scaleRange(scale1),
            path = g.selectAll(".domain").data([0]),
            pathUpdate = (path.enter().append("path").attr("class", "domain"), d3.transition(path));
        tickEnter.append("line");
        tickEnter.append("text");
        var lineEnter = tickEnter.select("line"),
            lineUpdate = tickUpdate.select("line"),
            text = tick.select("text").text(tickFormat),
            textEnter = tickEnter.select("text"),
            textUpdate = tickUpdate.select("text"),
            sign = orient === "top" || orient === "left" ? -1 : 1,
            x1,
            x2,
            y1,
            y2;

        if (orient === "bottom" || orient === "top") {
          tickTransform = d3_svg_axisX, x1 = "x", y1 = "y", x2 = "x2", y2 = "y2";
          text.attr("dy", sign < 0 ? "0em" : ".71em").style("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize);
        } else {
          tickTransform = d3_svg_axisY, x1 = "y", y1 = "x", x2 = "y2", y2 = "x2";
          text.attr("dy", ".32em").style("text-anchor", sign < 0 ? "end" : "start");
          pathUpdate.attr("d", "M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize);
        }

        lineEnter.attr(y2, sign * innerTickSize);
        textEnter.attr(y1, sign * tickSpacing);
        lineUpdate.attr(x2, 0).attr(y2, sign * innerTickSize);
        textUpdate.attr(x1, 0).attr(y1, sign * tickSpacing);

        if (scale1.rangeBand) {
          var x = scale1,
              dx = x.rangeBand() / 2;

          scale0 = scale1 = function (d) {
            return x(d) + dx;
          };
        } else if (scale0.rangeBand) {
          scale0 = scale1;
        } else {
          tickExit.call(tickTransform, scale1, scale0);
        }

        tickEnter.call(tickTransform, scale0, scale1);
        tickUpdate.call(tickTransform, scale1, scale1);
      });
    }

    axis.scale = function (x) {
      if (!arguments.length) return scale;
      scale = x;
      return axis;
    };

    axis.orient = function (x) {
      if (!arguments.length) return orient;
      orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
      return axis;
    };

    axis.ticks = function () {
      if (!arguments.length) return tickArguments_;
      tickArguments_ = d3_array(arguments);
      return axis;
    };

    axis.tickValues = function (x) {
      if (!arguments.length) return tickValues;
      tickValues = x;
      return axis;
    };

    axis.tickFormat = function (x) {
      if (!arguments.length) return tickFormat_;
      tickFormat_ = x;
      return axis;
    };

    axis.tickSize = function (x) {
      var n = arguments.length;
      if (!n) return innerTickSize;
      innerTickSize = +x;
      outerTickSize = +arguments[n - 1];
      return axis;
    };

    axis.innerTickSize = function (x) {
      if (!arguments.length) return innerTickSize;
      innerTickSize = +x;
      return axis;
    };

    axis.outerTickSize = function (x) {
      if (!arguments.length) return outerTickSize;
      outerTickSize = +x;
      return axis;
    };

    axis.tickPadding = function (x) {
      if (!arguments.length) return tickPadding;
      tickPadding = +x;
      return axis;
    };

    axis.tickSubdivide = function () {
      return arguments.length && axis;
    };

    return axis;
  };

  var d3_svg_axisDefaultOrient = "bottom",
      d3_svg_axisOrients = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  };

  function d3_svg_axisX(selection, x0, x1) {
    selection.attr("transform", function (d) {
      var v0 = x0(d);
      return "translate(" + (isFinite(v0) ? v0 : x1(d)) + ",0)";
    });
  }

  function d3_svg_axisY(selection, y0, y1) {
    selection.attr("transform", function (d) {
      var v0 = y0(d);
      return "translate(0," + (isFinite(v0) ? v0 : y1(d)) + ")";
    });
  }

  d3.svg.brush = function () {
    var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"),
        x = null,
        y = null,
        xExtent = [0, 0],
        yExtent = [0, 0],
        xExtentDomain,
        yExtentDomain,
        xClamp = true,
        yClamp = true,
        resizes = d3_svg_brushResizes[0];

    function brush(g) {
      g.each(function () {
        var g = d3.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
        var background = g.selectAll(".background").data([0]);
        background.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
        g.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
        var resize = g.selectAll(".resize").data(resizes, d3_identity);
        resize.exit().remove();
        resize.enter().append("g").attr("class", function (d) {
          return "resize " + d;
        }).style("cursor", function (d) {
          return d3_svg_brushCursor[d];
        }).append("rect").attr("x", function (d) {
          return /[ew]$/.test(d) ? -3 : null;
        }).attr("y", function (d) {
          return /^[ns]/.test(d) ? -3 : null;
        }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
        resize.style("display", brush.empty() ? "none" : null);
        var gUpdate = d3.transition(g),
            backgroundUpdate = d3.transition(background),
            range;

        if (x) {
          range = d3_scaleRange(x);
          backgroundUpdate.attr("x", range[0]).attr("width", range[1] - range[0]);
          redrawX(gUpdate);
        }

        if (y) {
          range = d3_scaleRange(y);
          backgroundUpdate.attr("y", range[0]).attr("height", range[1] - range[0]);
          redrawY(gUpdate);
        }

        redraw(gUpdate);
      });
    }

    brush.event = function (g) {
      g.each(function () {
        var event_ = event.of(this, arguments),
            extent1 = {
          x: xExtent,
          y: yExtent,
          i: xExtentDomain,
          j: yExtentDomain
        },
            extent0 = this.__chart__ || extent1;
        this.__chart__ = extent1;

        if (d3_transitionInheritId) {
          d3.select(this).transition().each("start.brush", function () {
            xExtentDomain = extent0.i;
            yExtentDomain = extent0.j;
            xExtent = extent0.x;
            yExtent = extent0.y;
            event_({
              type: "brushstart"
            });
          }).tween("brush:brush", function () {
            var xi = d3_interpolateArray(xExtent, extent1.x),
                yi = d3_interpolateArray(yExtent, extent1.y);
            xExtentDomain = yExtentDomain = null;
            return function (t) {
              xExtent = extent1.x = xi(t);
              yExtent = extent1.y = yi(t);
              event_({
                type: "brush",
                mode: "resize"
              });
            };
          }).each("end.brush", function () {
            xExtentDomain = extent1.i;
            yExtentDomain = extent1.j;
            event_({
              type: "brush",
              mode: "resize"
            });
            event_({
              type: "brushend"
            });
          });
        } else {
          event_({
            type: "brushstart"
          });
          event_({
            type: "brush",
            mode: "resize"
          });
          event_({
            type: "brushend"
          });
        }
      });
    };

    function redraw(g) {
      g.selectAll(".resize").attr("transform", function (d) {
        return "translate(" + xExtent[+/e$/.test(d)] + "," + yExtent[+/^s/.test(d)] + ")";
      });
    }

    function redrawX(g) {
      g.select(".extent").attr("x", xExtent[0]);
      g.selectAll(".extent,.n>rect,.s>rect").attr("width", xExtent[1] - xExtent[0]);
    }

    function redrawY(g) {
      g.select(".extent").attr("y", yExtent[0]);
      g.selectAll(".extent,.e>rect,.w>rect").attr("height", yExtent[1] - yExtent[0]);
    }

    function brushstart() {
      var target = this,
          eventTarget = d3.select(d3.event.target),
          event_ = event.of(target, arguments),
          g = d3.select(target),
          resizing = eventTarget.datum(),
          resizingX = !/^(n|s)$/.test(resizing) && x,
          resizingY = !/^(e|w)$/.test(resizing) && y,
          dragging = eventTarget.classed("extent"),
          dragRestore = d3_event_dragSuppress(target),
          center,
          origin = d3.mouse(target),
          offset;
      var w = d3.select(d3_window(target)).on("keydown.brush", keydown).on("keyup.brush", keyup);

      if (d3.event.changedTouches) {
        w.on("touchmove.brush", brushmove).on("touchend.brush", brushend);
      } else {
        w.on("mousemove.brush", brushmove).on("mouseup.brush", brushend);
      }

      g.interrupt().selectAll("*").interrupt();

      if (dragging) {
        origin[0] = xExtent[0] - origin[0];
        origin[1] = yExtent[0] - origin[1];
      } else if (resizing) {
        var ex = +/w$/.test(resizing),
            ey = +/^n/.test(resizing);
        offset = [xExtent[1 - ex] - origin[0], yExtent[1 - ey] - origin[1]];
        origin[0] = xExtent[ex];
        origin[1] = yExtent[ey];
      } else if (d3.event.altKey) center = origin.slice();

      g.style("pointer-events", "none").selectAll(".resize").style("display", null);
      d3.select("body").style("cursor", eventTarget.style("cursor"));
      event_({
        type: "brushstart"
      });
      brushmove();

      function keydown() {
        if (d3.event.keyCode == 32) {
          if (!dragging) {
            center = null;
            origin[0] -= xExtent[1];
            origin[1] -= yExtent[1];
            dragging = 2;
          }

          d3_eventPreventDefault();
        }
      }

      function keyup() {
        if (d3.event.keyCode == 32 && dragging == 2) {
          origin[0] += xExtent[1];
          origin[1] += yExtent[1];
          dragging = 0;
          d3_eventPreventDefault();
        }
      }

      function brushmove() {
        var point = d3.mouse(target),
            moved = false;

        if (offset) {
          point[0] += offset[0];
          point[1] += offset[1];
        }

        if (!dragging) {
          if (d3.event.altKey) {
            if (!center) center = [(xExtent[0] + xExtent[1]) / 2, (yExtent[0] + yExtent[1]) / 2];
            origin[0] = xExtent[+(point[0] < center[0])];
            origin[1] = yExtent[+(point[1] < center[1])];
          } else center = null;
        }

        if (resizingX && move1(point, x, 0)) {
          redrawX(g);
          moved = true;
        }

        if (resizingY && move1(point, y, 1)) {
          redrawY(g);
          moved = true;
        }

        if (moved) {
          redraw(g);
          event_({
            type: "brush",
            mode: dragging ? "move" : "resize"
          });
        }
      }

      function move1(point, scale, i) {
        var range = d3_scaleRange(scale),
            r0 = range[0],
            r1 = range[1],
            position = origin[i],
            extent = i ? yExtent : xExtent,
            size = extent[1] - extent[0],
            min,
            max;

        if (dragging) {
          r0 -= position;
          r1 -= size + position;
        }

        min = (i ? yClamp : xClamp) ? Math.max(r0, Math.min(r1, point[i])) : point[i];

        if (dragging) {
          max = (min += position) + size;
        } else {
          if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));

          if (position < min) {
            max = min;
            min = position;
          } else {
            max = position;
          }
        }

        if (extent[0] != min || extent[1] != max) {
          if (i) yExtentDomain = null;else xExtentDomain = null;
          extent[0] = min;
          extent[1] = max;
          return true;
        }
      }

      function brushend() {
        brushmove();
        g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
        d3.select("body").style("cursor", null);
        w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
        dragRestore();
        event_({
          type: "brushend"
        });
      }
    }

    brush.x = function (z) {
      if (!arguments.length) return x;
      x = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };

    brush.y = function (z) {
      if (!arguments.length) return y;
      y = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };

    brush.clamp = function (z) {
      if (!arguments.length) return x && y ? [xClamp, yClamp] : x ? xClamp : y ? yClamp : null;
      if (x && y) xClamp = !!z[0], yClamp = !!z[1];else if (x) xClamp = !!z;else if (y) yClamp = !!z;
      return brush;
    };

    brush.extent = function (z) {
      var x0, x1, y0, y1, t;

      if (!arguments.length) {
        if (x) {
          if (xExtentDomain) {
            x0 = xExtentDomain[0], x1 = xExtentDomain[1];
          } else {
            x0 = xExtent[0], x1 = xExtent[1];
            if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
            if (x1 < x0) t = x0, x0 = x1, x1 = t;
          }
        }

        if (y) {
          if (yExtentDomain) {
            y0 = yExtentDomain[0], y1 = yExtentDomain[1];
          } else {
            y0 = yExtent[0], y1 = yExtent[1];
            if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
            if (y1 < y0) t = y0, y0 = y1, y1 = t;
          }
        }

        return x && y ? [[x0, y0], [x1, y1]] : x ? [x0, x1] : y && [y0, y1];
      }

      if (x) {
        x0 = z[0], x1 = z[1];
        if (y) x0 = x0[0], x1 = x1[0];
        xExtentDomain = [x0, x1];
        if (x.invert) x0 = x(x0), x1 = x(x1);
        if (x1 < x0) t = x0, x0 = x1, x1 = t;
        if (x0 != xExtent[0] || x1 != xExtent[1]) xExtent = [x0, x1];
      }

      if (y) {
        y0 = z[0], y1 = z[1];
        if (x) y0 = y0[1], y1 = y1[1];
        yExtentDomain = [y0, y1];
        if (y.invert) y0 = y(y0), y1 = y(y1);
        if (y1 < y0) t = y0, y0 = y1, y1 = t;
        if (y0 != yExtent[0] || y1 != yExtent[1]) yExtent = [y0, y1];
      }

      return brush;
    };

    brush.clear = function () {
      if (!brush.empty()) {
        xExtent = [0, 0], yExtent = [0, 0];
        xExtentDomain = yExtentDomain = null;
      }

      return brush;
    };

    brush.empty = function () {
      return !!x && xExtent[0] == xExtent[1] || !!y && yExtent[0] == yExtent[1];
    };

    return d3.rebind(brush, event, "on");
  };

  var d3_svg_brushCursor = {
    n: "ns-resize",
    e: "ew-resize",
    s: "ns-resize",
    w: "ew-resize",
    nw: "nwse-resize",
    ne: "nesw-resize",
    se: "nwse-resize",
    sw: "nesw-resize"
  };
  var d3_svg_brushResizes = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []];
  var d3_time_format = d3_time.format = d3_locale_enUS.timeFormat;
  var d3_time_formatUtc = d3_time_format.utc;
  var d3_time_formatIso = d3_time_formatUtc("%Y-%m-%dT%H:%M:%S.%LZ");
  d3_time_format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? d3_time_formatIsoNative : d3_time_formatIso;

  function d3_time_formatIsoNative(date) {
    return date.toISOString();
  }

  d3_time_formatIsoNative.parse = function (string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  };

  d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
  d3_time.second = d3_time_interval(function (date) {
    return new d3_date(Math.floor(date / 1e3) * 1e3);
  }, function (date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 1e3);
  }, function (date) {
    return date.getSeconds();
  });
  d3_time.seconds = d3_time.second.range;
  d3_time.seconds.utc = d3_time.second.utc.range;
  d3_time.minute = d3_time_interval(function (date) {
    return new d3_date(Math.floor(date / 6e4) * 6e4);
  }, function (date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 6e4);
  }, function (date) {
    return date.getMinutes();
  });
  d3_time.minutes = d3_time.minute.range;
  d3_time.minutes.utc = d3_time.minute.utc.range;
  d3_time.hour = d3_time_interval(function (date) {
    var timezone = date.getTimezoneOffset() / 60;
    return new d3_date((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
  }, function (date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 36e5);
  }, function (date) {
    return date.getHours();
  });
  d3_time.hours = d3_time.hour.range;
  d3_time.hours.utc = d3_time.hour.utc.range;
  d3_time.month = d3_time_interval(function (date) {
    date = d3_time.day(date);
    date.setDate(1);
    return date;
  }, function (date, offset) {
    date.setMonth(date.getMonth() + offset);
  }, function (date) {
    return date.getMonth();
  });
  d3_time.months = d3_time.month.range;
  d3_time.months.utc = d3_time.month.utc.range;

  function d3_time_scale(linear, methods, format) {
    function scale(x) {
      return linear(x);
    }

    scale.invert = function (x) {
      return d3_time_scaleDate(linear.invert(x));
    };

    scale.domain = function (x) {
      if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
      linear.domain(x);
      return scale;
    };

    function tickMethod(extent, count) {
      var span = extent[1] - extent[0],
          target = span / count,
          i = d3.bisect(d3_time_scaleSteps, target);
      return i == d3_time_scaleSteps.length ? [methods.year, d3_scale_linearTickRange(extent.map(function (d) {
        return d / 31536e6;
      }), count)[2]] : !i ? [d3_time_scaleMilliseconds, d3_scale_linearTickRange(extent, count)[2]] : methods[target / d3_time_scaleSteps[i - 1] < d3_time_scaleSteps[i] / target ? i - 1 : i];
    }

    scale.nice = function (interval, skip) {
      var domain = scale.domain(),
          extent = d3_scaleExtent(domain),
          method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" && tickMethod(extent, interval);
      if (method) interval = method[0], skip = method[1];

      function skipped(date) {
        return !isNaN(date) && !interval.range(date, d3_time_scaleDate(+date + 1), skip).length;
      }

      return scale.domain(d3_scale_nice(domain, skip > 1 ? {
        floor: function (date) {
          while (skipped(date = interval.floor(date))) date = d3_time_scaleDate(date - 1);

          return date;
        },
        ceil: function (date) {
          while (skipped(date = interval.ceil(date))) date = d3_time_scaleDate(+date + 1);

          return date;
        }
      } : interval));
    };

    scale.ticks = function (interval, skip) {
      var extent = d3_scaleExtent(scale.domain()),
          method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" ? tickMethod(extent, interval) : !interval.range && [{
        range: interval
      }, skip];
      if (method) interval = method[0], skip = method[1];
      return interval.range(extent[0], d3_time_scaleDate(+extent[1] + 1), skip < 1 ? 1 : skip);
    };

    scale.tickFormat = function () {
      return format;
    };

    scale.copy = function () {
      return d3_time_scale(linear.copy(), methods, format);
    };

    return d3_scale_linearRebind(scale, linear);
  }

  function d3_time_scaleDate(t) {
    return new Date(t);
  }

  var d3_time_scaleSteps = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6];
  var d3_time_scaleLocalMethods = [[d3_time.second, 1], [d3_time.second, 5], [d3_time.second, 15], [d3_time.second, 30], [d3_time.minute, 1], [d3_time.minute, 5], [d3_time.minute, 15], [d3_time.minute, 30], [d3_time.hour, 1], [d3_time.hour, 3], [d3_time.hour, 6], [d3_time.hour, 12], [d3_time.day, 1], [d3_time.day, 2], [d3_time.week, 1], [d3_time.month, 1], [d3_time.month, 3], [d3_time.year, 1]];
  var d3_time_scaleLocalFormat = d3_time_format.multi([[".%L", function (d) {
    return d.getMilliseconds();
  }], [":%S", function (d) {
    return d.getSeconds();
  }], ["%I:%M", function (d) {
    return d.getMinutes();
  }], ["%I %p", function (d) {
    return d.getHours();
  }], ["%a %d", function (d) {
    return d.getDay() && d.getDate() != 1;
  }], ["%b %d", function (d) {
    return d.getDate() != 1;
  }], ["%B", function (d) {
    return d.getMonth();
  }], ["%Y", d3_true]]);
  var d3_time_scaleMilliseconds = {
    range: function (start, stop, step) {
      return d3.range(Math.ceil(start / step) * step, +stop, step).map(d3_time_scaleDate);
    },
    floor: d3_identity,
    ceil: d3_identity
  };
  d3_time_scaleLocalMethods.year = d3_time.year;

  d3_time.scale = function () {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
  };

  var d3_time_scaleUtcMethods = d3_time_scaleLocalMethods.map(function (m) {
    return [m[0].utc, m[1]];
  });
  var d3_time_scaleUtcFormat = d3_time_formatUtc.multi([[".%L", function (d) {
    return d.getUTCMilliseconds();
  }], [":%S", function (d) {
    return d.getUTCSeconds();
  }], ["%I:%M", function (d) {
    return d.getUTCMinutes();
  }], ["%I %p", function (d) {
    return d.getUTCHours();
  }], ["%a %d", function (d) {
    return d.getUTCDay() && d.getUTCDate() != 1;
  }], ["%b %d", function (d) {
    return d.getUTCDate() != 1;
  }], ["%B", function (d) {
    return d.getUTCMonth();
  }], ["%Y", d3_true]]);
  d3_time_scaleUtcMethods.year = d3_time.year.utc;

  d3_time.scale.utc = function () {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleUtcMethods, d3_time_scaleUtcFormat);
  };

  d3.text = d3_xhrType(function (request) {
    return request.responseText;
  });

  d3.json = function (url, callback) {
    return d3_xhr(url, "application/json", d3_json, callback);
  };

  function d3_json(request) {
    return JSON.parse(request.responseText);
  }

  d3.html = function (url, callback) {
    return d3_xhr(url, "text/html", d3_html, callback);
  };

  function d3_html(request) {
    var range = d3_document.createRange();
    range.selectNode(d3_document.body);
    return range.createContextualFragment(request.responseText);
  }

  d3.xml = d3_xhrType(function (request) {
    return request.responseXML;
  });
  if (true) this.d3 = d3, !(__WEBPACK_AMD_DEFINE_FACTORY__ = (d3),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var af = moment.defineLocale('af', {
    months: 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
    monthsShort: 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
    weekdays: 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
    weekdaysShort: 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
    weekdaysMin: 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
    meridiemParse: /vm|nm/i,
    isPM: function (input) {
      return /^nm$/i.test(input);
    },
    meridiem: function (hours, minutes, isLower) {
      if (hours < 12) {
        return isLower ? 'vm' : 'VM';
      } else {
        return isLower ? 'nm' : 'NM';
      }
    },
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Vandag om] LT',
      nextDay: '[Môre om] LT',
      nextWeek: 'dddd [om] LT',
      lastDay: '[Gister om] LT',
      lastWeek: '[Laas] dddd [om] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'oor %s',
      past: '%s gelede',
      s: '\'n paar sekondes',
      ss: '%d sekondes',
      m: '\'n minuut',
      mm: '%d minute',
      h: '\'n uur',
      hh: '%d ure',
      d: '\'n dag',
      dd: '%d dae',
      M: '\'n maand',
      MM: '%d maande',
      y: '\'n jaar',
      yy: '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal: function (number) {
      return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
    },
    week: {
      dow: 1,
      // Maandag is die eerste dag van die week.
      doy: 4 // Die week wat die 4de Januarie bevat is die eerste week van die jaar.

    }
  });
  return af;
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    '0': '٠'
  },
      numberMap = {
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    '٠': '0'
  },
      pluralForm = function (n) {
    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
  },
      plurals = {
    s: ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
    m: ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
    h: ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
    d: ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
    M: ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
    y: ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
  },
      pluralize = function (u) {
    return function (number, withoutSuffix, string, isFuture) {
      var f = pluralForm(number),
          str = plurals[u][pluralForm(number)];

      if (f === 2) {
        str = str[withoutSuffix ? 0 : 1];
      }

      return str.replace(/%d/i, number);
    };
  },
      months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  var ar = moment.defineLocale('ar', {
    months: months,
    monthsShort: months,
    weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'D/\u200FM/\u200FYYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ص|م/,
    isPM: function (input) {
      return 'م' === input;
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return 'ص';
      } else {
        return 'م';
      }
    },
    calendar: {
      sameDay: '[اليوم عند الساعة] LT',
      nextDay: '[غدًا عند الساعة] LT',
      nextWeek: 'dddd [عند الساعة] LT',
      lastDay: '[أمس عند الساعة] LT',
      lastWeek: 'dddd [عند الساعة] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'بعد %s',
      past: 'منذ %s',
      s: pluralize('s'),
      ss: pluralize('s'),
      m: pluralize('m'),
      mm: pluralize('m'),
      h: pluralize('h'),
      hh: pluralize('h'),
      d: pluralize('d'),
      dd: pluralize('d'),
      M: pluralize('M'),
      MM: pluralize('M'),
      y: pluralize('y'),
      yy: pluralize('y')
    },
    preparse: function (string) {
      return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
        return numberMap[match];
      }).replace(/،/g, ',');
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      }).replace(/,/g, '،');
    },
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12 // The week that contains Jan 12th is the first week of the year.

    }
  });
  return ar;
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var arDz = moment.defineLocale('ar-dz', {
    months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort: 'احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin: 'أح_إث_ثلا_أر_خم_جم_سب'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[اليوم على الساعة] LT',
      nextDay: '[غدا على الساعة] LT',
      nextWeek: 'dddd [على الساعة] LT',
      lastDay: '[أمس على الساعة] LT',
      lastWeek: 'dddd [على الساعة] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'في %s',
      past: 'منذ %s',
      s: 'ثوان',
      ss: '%d ثانية',
      m: 'دقيقة',
      mm: '%d دقائق',
      h: 'ساعة',
      hh: '%d ساعات',
      d: 'يوم',
      dd: '%d أيام',
      M: 'شهر',
      MM: '%d أشهر',
      y: 'سنة',
      yy: '%d سنوات'
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return arDz;
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var arKw = moment.defineLocale('ar-kw', {
    months: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
    monthsShort: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
    weekdays: 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort: 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[اليوم على الساعة] LT',
      nextDay: '[غدا على الساعة] LT',
      nextWeek: 'dddd [على الساعة] LT',
      lastDay: '[أمس على الساعة] LT',
      lastWeek: 'dddd [على الساعة] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'في %s',
      past: 'منذ %s',
      s: 'ثوان',
      ss: '%d ثانية',
      m: 'دقيقة',
      mm: '%d دقائق',
      h: 'ساعة',
      hh: '%d ساعات',
      d: 'يوم',
      dd: '%d أيام',
      M: 'شهر',
      MM: '%d أشهر',
      y: 'سنة',
      yy: '%d سنوات'
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 12 // The week that contains Jan 12th is the first week of the year.

    }
  });
  return arKw;
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '0': '0'
  },
      pluralForm = function (n) {
    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
  },
      plurals = {
    s: ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
    m: ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
    h: ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
    d: ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
    M: ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
    y: ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
  },
      pluralize = function (u) {
    return function (number, withoutSuffix, string, isFuture) {
      var f = pluralForm(number),
          str = plurals[u][pluralForm(number)];

      if (f === 2) {
        str = str[withoutSuffix ? 0 : 1];
      }

      return str.replace(/%d/i, number);
    };
  },
      months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  var arLy = moment.defineLocale('ar-ly', {
    months: months,
    monthsShort: months,
    weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'D/\u200FM/\u200FYYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ص|م/,
    isPM: function (input) {
      return 'م' === input;
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return 'ص';
      } else {
        return 'م';
      }
    },
    calendar: {
      sameDay: '[اليوم عند الساعة] LT',
      nextDay: '[غدًا عند الساعة] LT',
      nextWeek: 'dddd [عند الساعة] LT',
      lastDay: '[أمس عند الساعة] LT',
      lastWeek: 'dddd [عند الساعة] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'بعد %s',
      past: 'منذ %s',
      s: pluralize('s'),
      ss: pluralize('s'),
      m: pluralize('m'),
      mm: pluralize('m'),
      h: pluralize('h'),
      hh: pluralize('h'),
      d: pluralize('d'),
      dd: pluralize('d'),
      M: pluralize('M'),
      MM: pluralize('M'),
      y: pluralize('y'),
      yy: pluralize('y')
    },
    preparse: function (string) {
      return string.replace(/،/g, ',');
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      }).replace(/,/g, '،');
    },
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12 // The week that contains Jan 12th is the first week of the year.

    }
  });
  return arLy;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var arMa = moment.defineLocale('ar-ma', {
    months: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
    monthsShort: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
    weekdays: 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort: 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[اليوم على الساعة] LT',
      nextDay: '[غدا على الساعة] LT',
      nextWeek: 'dddd [على الساعة] LT',
      lastDay: '[أمس على الساعة] LT',
      lastWeek: 'dddd [على الساعة] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'في %s',
      past: 'منذ %s',
      s: 'ثوان',
      ss: '%d ثانية',
      m: 'دقيقة',
      mm: '%d دقائق',
      h: 'ساعة',
      hh: '%d ساعات',
      d: 'يوم',
      dd: '%d أيام',
      M: 'شهر',
      MM: '%d أشهر',
      y: 'سنة',
      yy: '%d سنوات'
    },
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12 // The week that contains Jan 12th is the first week of the year.

    }
  });
  return arMa;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    '0': '٠'
  },
      numberMap = {
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    '٠': '0'
  };
  var arSa = moment.defineLocale('ar-sa', {
    months: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    monthsShort: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ص|م/,
    isPM: function (input) {
      return 'م' === input;
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return 'ص';
      } else {
        return 'م';
      }
    },
    calendar: {
      sameDay: '[اليوم على الساعة] LT',
      nextDay: '[غدا على الساعة] LT',
      nextWeek: 'dddd [على الساعة] LT',
      lastDay: '[أمس على الساعة] LT',
      lastWeek: 'dddd [على الساعة] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'في %s',
      past: 'منذ %s',
      s: 'ثوان',
      ss: '%d ثانية',
      m: 'دقيقة',
      mm: '%d دقائق',
      h: 'ساعة',
      hh: '%d ساعات',
      d: 'يوم',
      dd: '%d أيام',
      M: 'شهر',
      MM: '%d أشهر',
      y: 'سنة',
      yy: '%d سنوات'
    },
    preparse: function (string) {
      return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
        return numberMap[match];
      }).replace(/،/g, ',');
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      }).replace(/,/g, '،');
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6 // The week that contains Jan 6th is the first week of the year.

    }
  });
  return arSa;
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var arTn = moment.defineLocale('ar-tn', {
    months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[اليوم على الساعة] LT',
      nextDay: '[غدا على الساعة] LT',
      nextWeek: 'dddd [على الساعة] LT',
      lastDay: '[أمس على الساعة] LT',
      lastWeek: 'dddd [على الساعة] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'في %s',
      past: 'منذ %s',
      s: 'ثوان',
      ss: '%d ثانية',
      m: 'دقيقة',
      mm: '%d دقائق',
      h: 'ساعة',
      hh: '%d ساعات',
      d: 'يوم',
      dd: '%d أيام',
      M: 'شهر',
      MM: '%d أشهر',
      y: 'سنة',
      yy: '%d سنوات'
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return arTn;
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var suffixes = {
    1: '-inci',
    5: '-inci',
    8: '-inci',
    70: '-inci',
    80: '-inci',
    2: '-nci',
    7: '-nci',
    20: '-nci',
    50: '-nci',
    3: '-üncü',
    4: '-üncü',
    100: '-üncü',
    6: '-ncı',
    9: '-uncu',
    10: '-uncu',
    30: '-uncu',
    60: '-ıncı',
    90: '-ıncı'
  };
  var az = moment.defineLocale('az', {
    months: 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
    monthsShort: 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
    weekdays: 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
    weekdaysShort: 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
    weekdaysMin: 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[bugün saat] LT',
      nextDay: '[sabah saat] LT',
      nextWeek: '[gələn həftə] dddd [saat] LT',
      lastDay: '[dünən] LT',
      lastWeek: '[keçən həftə] dddd [saat] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s sonra',
      past: '%s əvvəl',
      s: 'birneçə saniyə',
      ss: '%d saniyə',
      m: 'bir dəqiqə',
      mm: '%d dəqiqə',
      h: 'bir saat',
      hh: '%d saat',
      d: 'bir gün',
      dd: '%d gün',
      M: 'bir ay',
      MM: '%d ay',
      y: 'bir il',
      yy: '%d il'
    },
    meridiemParse: /gecə|səhər|gündüz|axşam/,
    isPM: function (input) {
      return /^(gündüz|axşam)$/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'gecə';
      } else if (hour < 12) {
        return 'səhər';
      } else if (hour < 17) {
        return 'gündüz';
      } else {
        return 'axşam';
      }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
    ordinal: function (number) {
      if (number === 0) {
        // special case for zero
        return number + '-ıncı';
      }

      var a = number % 10,
          b = number % 100 - a,
          c = number >= 100 ? 100 : null;
      return number + (suffixes[a] || suffixes[b] || suffixes[c]);
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return az;
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
  }

  function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
      'ss': withoutSuffix ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
      'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
      'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
      'dd': 'дзень_дні_дзён',
      'MM': 'месяц_месяцы_месяцаў',
      'yy': 'год_гады_гадоў'
    };

    if (key === 'm') {
      return withoutSuffix ? 'хвіліна' : 'хвіліну';
    } else if (key === 'h') {
      return withoutSuffix ? 'гадзіна' : 'гадзіну';
    } else {
      return number + ' ' + plural(format[key], +number);
    }
  }

  var be = moment.defineLocale('be', {
    months: {
      format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
      standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
    },
    monthsShort: 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
    weekdays: {
      format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
      standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
      isFormat: /\[ ?[Ууў] ?(?:мінулую|наступную)? ?\] ?dddd/
    },
    weekdaysShort: 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
    weekdaysMin: 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY г.',
      LLL: 'D MMMM YYYY г., HH:mm',
      LLLL: 'dddd, D MMMM YYYY г., HH:mm'
    },
    calendar: {
      sameDay: '[Сёння ў] LT',
      nextDay: '[Заўтра ў] LT',
      lastDay: '[Учора ў] LT',
      nextWeek: function () {
        return '[У] dddd [ў] LT';
      },
      lastWeek: function () {
        switch (this.day()) {
          case 0:
          case 3:
          case 5:
          case 6:
            return '[У мінулую] dddd [ў] LT';

          case 1:
          case 2:
          case 4:
            return '[У мінулы] dddd [ў] LT';
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'праз %s',
      past: '%s таму',
      s: 'некалькі секунд',
      m: relativeTimeWithPlural,
      mm: relativeTimeWithPlural,
      h: relativeTimeWithPlural,
      hh: relativeTimeWithPlural,
      d: 'дзень',
      dd: relativeTimeWithPlural,
      M: 'месяц',
      MM: relativeTimeWithPlural,
      y: 'год',
      yy: relativeTimeWithPlural
    },
    meridiemParse: /ночы|раніцы|дня|вечара/,
    isPM: function (input) {
      return /^(дня|вечара)$/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'ночы';
      } else if (hour < 12) {
        return 'раніцы';
      } else if (hour < 17) {
        return 'дня';
      } else {
        return 'вечара';
      }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/,
    ordinal: function (number, period) {
      switch (period) {
        case 'M':
        case 'd':
        case 'DDD':
        case 'w':
        case 'W':
          return (number % 10 === 2 || number % 10 === 3) && number % 100 !== 12 && number % 100 !== 13 ? number + '-і' : number + '-ы';

        case 'D':
          return number + '-га';

        default:
          return number;
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return be;
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var bg = moment.defineLocale('bg', {
    months: 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
    monthsShort: 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
    weekdays: 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
    weekdaysShort: 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
    weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'D.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY H:mm',
      LLLL: 'dddd, D MMMM YYYY H:mm'
    },
    calendar: {
      sameDay: '[Днес в] LT',
      nextDay: '[Утре в] LT',
      nextWeek: 'dddd [в] LT',
      lastDay: '[Вчера в] LT',
      lastWeek: function () {
        switch (this.day()) {
          case 0:
          case 3:
          case 6:
            return '[В изминалата] dddd [в] LT';

          case 1:
          case 2:
          case 4:
          case 5:
            return '[В изминалия] dddd [в] LT';
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'след %s',
      past: 'преди %s',
      s: 'няколко секунди',
      ss: '%d секунди',
      m: 'минута',
      mm: '%d минути',
      h: 'час',
      hh: '%d часа',
      d: 'ден',
      dd: '%d дни',
      M: 'месец',
      MM: '%d месеца',
      y: 'година',
      yy: '%d години'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
    ordinal: function (number) {
      var lastDigit = number % 10,
          last2Digits = number % 100;

      if (number === 0) {
        return number + '-ев';
      } else if (last2Digits === 0) {
        return number + '-ен';
      } else if (last2Digits > 10 && last2Digits < 20) {
        return number + '-ти';
      } else if (lastDigit === 1) {
        return number + '-ви';
      } else if (lastDigit === 2) {
        return number + '-ри';
      } else if (lastDigit === 7 || lastDigit === 8) {
        return number + '-ми';
      } else {
        return number + '-ти';
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return bg;
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var bm = moment.defineLocale('bm', {
    months: 'Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo'.split('_'),
    monthsShort: 'Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des'.split('_'),
    weekdays: 'Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri'.split('_'),
    weekdaysShort: 'Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib'.split('_'),
    weekdaysMin: 'Ka_Nt_Ta_Ar_Al_Ju_Si'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'MMMM [tile] D [san] YYYY',
      LLL: 'MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
      LLLL: 'dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm'
    },
    calendar: {
      sameDay: '[Bi lɛrɛ] LT',
      nextDay: '[Sini lɛrɛ] LT',
      nextWeek: 'dddd [don lɛrɛ] LT',
      lastDay: '[Kunu lɛrɛ] LT',
      lastWeek: 'dddd [tɛmɛnen lɛrɛ] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s kɔnɔ',
      past: 'a bɛ %s bɔ',
      s: 'sanga dama dama',
      ss: 'sekondi %d',
      m: 'miniti kelen',
      mm: 'miniti %d',
      h: 'lɛrɛ kelen',
      hh: 'lɛrɛ %d',
      d: 'tile kelen',
      dd: 'tile %d',
      M: 'kalo kelen',
      MM: 'kalo %d',
      y: 'san kelen',
      yy: 'san %d'
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return bm;
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    '0': '০'
  },
      numberMap = {
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9',
    '০': '0'
  };
  var bn = moment.defineLocale('bn', {
    months: 'জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
    monthsShort: 'জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে'.split('_'),
    weekdays: 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
    weekdaysShort: 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
    weekdaysMin: 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
    longDateFormat: {
      LT: 'A h:mm সময়',
      LTS: 'A h:mm:ss সময়',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY, A h:mm সময়',
      LLLL: 'dddd, D MMMM YYYY, A h:mm সময়'
    },
    calendar: {
      sameDay: '[আজ] LT',
      nextDay: '[আগামীকাল] LT',
      nextWeek: 'dddd, LT',
      lastDay: '[গতকাল] LT',
      lastWeek: '[গত] dddd, LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s পরে',
      past: '%s আগে',
      s: 'কয়েক সেকেন্ড',
      ss: '%d সেকেন্ড',
      m: 'এক মিনিট',
      mm: '%d মিনিট',
      h: 'এক ঘন্টা',
      hh: '%d ঘন্টা',
      d: 'এক দিন',
      dd: '%d দিন',
      M: 'এক মাস',
      MM: '%d মাস',
      y: 'এক বছর',
      yy: '%d বছর'
    },
    preparse: function (string) {
      return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
        return numberMap[match];
      });
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      });
    },
    meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'রাত' && hour >= 4 || meridiem === 'দুপুর' && hour < 5 || meridiem === 'বিকাল') {
        return hour + 12;
      } else {
        return hour;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'রাত';
      } else if (hour < 10) {
        return 'সকাল';
      } else if (hour < 17) {
        return 'দুপুর';
      } else if (hour < 20) {
        return 'বিকাল';
      } else {
        return 'রাত';
      }
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6 // The week that contains Jan 6th is the first week of the year.

    }
  });
  return bn;
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '༡',
    '2': '༢',
    '3': '༣',
    '4': '༤',
    '5': '༥',
    '6': '༦',
    '7': '༧',
    '8': '༨',
    '9': '༩',
    '0': '༠'
  },
      numberMap = {
    '༡': '1',
    '༢': '2',
    '༣': '3',
    '༤': '4',
    '༥': '5',
    '༦': '6',
    '༧': '7',
    '༨': '8',
    '༩': '9',
    '༠': '0'
  };
  var bo = moment.defineLocale('bo', {
    months: 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
    monthsShort: 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
    weekdays: 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
    weekdaysShort: 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
    weekdaysMin: 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
    longDateFormat: {
      LT: 'A h:mm',
      LTS: 'A h:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY, A h:mm',
      LLLL: 'dddd, D MMMM YYYY, A h:mm'
    },
    calendar: {
      sameDay: '[དི་རིང] LT',
      nextDay: '[སང་ཉིན] LT',
      nextWeek: '[བདུན་ཕྲག་རྗེས་མ], LT',
      lastDay: '[ཁ་སང] LT',
      lastWeek: '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s ལ་',
      past: '%s སྔན་ལ',
      s: 'ལམ་སང',
      ss: '%d སྐར་ཆ།',
      m: 'སྐར་མ་གཅིག',
      mm: '%d སྐར་མ',
      h: 'ཆུ་ཚོད་གཅིག',
      hh: '%d ཆུ་ཚོད',
      d: 'ཉིན་གཅིག',
      dd: '%d ཉིན་',
      M: 'ཟླ་བ་གཅིག',
      MM: '%d ཟླ་བ',
      y: 'ལོ་གཅིག',
      yy: '%d ལོ'
    },
    preparse: function (string) {
      return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
        return numberMap[match];
      });
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      });
    },
    meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'མཚན་མོ' && hour >= 4 || meridiem === 'ཉིན་གུང' && hour < 5 || meridiem === 'དགོང་དག') {
        return hour + 12;
      } else {
        return hour;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'མཚན་མོ';
      } else if (hour < 10) {
        return 'ཞོགས་ཀས';
      } else if (hour < 17) {
        return 'ཉིན་གུང';
      } else if (hour < 20) {
        return 'དགོང་དག';
      } else {
        return 'མཚན་མོ';
      }
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6 // The week that contains Jan 6th is the first week of the year.

    }
  });
  return bo;
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function relativeTimeWithMutation(number, withoutSuffix, key) {
    var format = {
      'mm': 'munutenn',
      'MM': 'miz',
      'dd': 'devezh'
    };
    return number + ' ' + mutation(format[key], number);
  }

  function specialMutationForYears(number) {
    switch (lastNumber(number)) {
      case 1:
      case 3:
      case 4:
      case 5:
      case 9:
        return number + ' bloaz';

      default:
        return number + ' vloaz';
    }
  }

  function lastNumber(number) {
    if (number > 9) {
      return lastNumber(number % 10);
    }

    return number;
  }

  function mutation(text, number) {
    if (number === 2) {
      return softMutation(text);
    }

    return text;
  }

  function softMutation(text) {
    var mutationTable = {
      'm': 'v',
      'b': 'v',
      'd': 'z'
    };

    if (mutationTable[text.charAt(0)] === undefined) {
      return text;
    }

    return mutationTable[text.charAt(0)] + text.substring(1);
  }

  var br = moment.defineLocale('br', {
    months: 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
    monthsShort: 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
    weekdays: 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
    weekdaysShort: 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
    weekdaysMin: 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'h[e]mm A',
      LTS: 'h[e]mm:ss A',
      L: 'DD/MM/YYYY',
      LL: 'D [a viz] MMMM YYYY',
      LLL: 'D [a viz] MMMM YYYY h[e]mm A',
      LLLL: 'dddd, D [a viz] MMMM YYYY h[e]mm A'
    },
    calendar: {
      sameDay: '[Hiziv da] LT',
      nextDay: '[Warc\'hoazh da] LT',
      nextWeek: 'dddd [da] LT',
      lastDay: '[Dec\'h da] LT',
      lastWeek: 'dddd [paset da] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'a-benn %s',
      past: '%s \'zo',
      s: 'un nebeud segondennoù',
      ss: '%d eilenn',
      m: 'ur vunutenn',
      mm: relativeTimeWithMutation,
      h: 'un eur',
      hh: '%d eur',
      d: 'un devezh',
      dd: relativeTimeWithMutation,
      M: 'ur miz',
      MM: relativeTimeWithMutation,
      y: 'ur bloaz',
      yy: specialMutationForYears
    },
    dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/,
    ordinal: function (number) {
      var output = number === 1 ? 'añ' : 'vet';
      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return br;
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function translate(number, withoutSuffix, key) {
    var result = number + ' ';

    switch (key) {
      case 'ss':
        if (number === 1) {
          result += 'sekunda';
        } else if (number === 2 || number === 3 || number === 4) {
          result += 'sekunde';
        } else {
          result += 'sekundi';
        }

        return result;

      case 'm':
        return withoutSuffix ? 'jedna minuta' : 'jedne minute';

      case 'mm':
        if (number === 1) {
          result += 'minuta';
        } else if (number === 2 || number === 3 || number === 4) {
          result += 'minute';
        } else {
          result += 'minuta';
        }

        return result;

      case 'h':
        return withoutSuffix ? 'jedan sat' : 'jednog sata';

      case 'hh':
        if (number === 1) {
          result += 'sat';
        } else if (number === 2 || number === 3 || number === 4) {
          result += 'sata';
        } else {
          result += 'sati';
        }

        return result;

      case 'dd':
        if (number === 1) {
          result += 'dan';
        } else {
          result += 'dana';
        }

        return result;

      case 'MM':
        if (number === 1) {
          result += 'mjesec';
        } else if (number === 2 || number === 3 || number === 4) {
          result += 'mjeseca';
        } else {
          result += 'mjeseci';
        }

        return result;

      case 'yy':
        if (number === 1) {
          result += 'godina';
        } else if (number === 2 || number === 3 || number === 4) {
          result += 'godine';
        } else {
          result += 'godina';
        }

        return result;
    }
  }

  var bs = moment.defineLocale('bs', {
    months: 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
    monthsShort: 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
    weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY H:mm',
      LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
      sameDay: '[danas u] LT',
      nextDay: '[sutra u] LT',
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return '[u] [nedjelju] [u] LT';

          case 3:
            return '[u] [srijedu] [u] LT';

          case 6:
            return '[u] [subotu] [u] LT';

          case 1:
          case 2:
          case 4:
          case 5:
            return '[u] dddd [u] LT';
        }
      },
      lastDay: '[jučer u] LT',
      lastWeek: function () {
        switch (this.day()) {
          case 0:
          case 3:
            return '[prošlu] dddd [u] LT';

          case 6:
            return '[prošle] [subote] [u] LT';

          case 1:
          case 2:
          case 4:
          case 5:
            return '[prošli] dddd [u] LT';
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'za %s',
      past: 'prije %s',
      s: 'par sekundi',
      ss: translate,
      m: translate,
      mm: translate,
      h: translate,
      hh: translate,
      d: 'dan',
      dd: translate,
      M: 'mjesec',
      MM: translate,
      y: 'godinu',
      yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return bs;
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var ca = moment.defineLocale('ca', {
    months: {
      standalone: 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
      format: 'de gener_de febrer_de març_d\'abril_de maig_de juny_de juliol_d\'agost_de setembre_d\'octubre_de novembre_de desembre'.split('_'),
      isFormat: /D[oD]?(\s)+MMMM/
    },
    monthsShort: 'gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.'.split('_'),
    monthsParseExact: true,
    weekdays: 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
    weekdaysShort: 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
    weekdaysMin: 'dg_dl_dt_dc_dj_dv_ds'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM [de] YYYY',
      ll: 'D MMM YYYY',
      LLL: 'D MMMM [de] YYYY [a les] H:mm',
      lll: 'D MMM YYYY, H:mm',
      LLLL: 'dddd D MMMM [de] YYYY [a les] H:mm',
      llll: 'ddd D MMM YYYY, H:mm'
    },
    calendar: {
      sameDay: function () {
        return '[avui a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
      },
      nextDay: function () {
        return '[demà a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
      },
      nextWeek: function () {
        return 'dddd [a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
      },
      lastDay: function () {
        return '[ahir a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
      },
      lastWeek: function () {
        return '[el] dddd [passat a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'd\'aquí %s',
      past: 'fa %s',
      s: 'uns segons',
      ss: '%d segons',
      m: 'un minut',
      mm: '%d minuts',
      h: 'una hora',
      hh: '%d hores',
      d: 'un dia',
      dd: '%d dies',
      M: 'un mes',
      MM: '%d mesos',
      y: 'un any',
      yy: '%d anys'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
    ordinal: function (number, period) {
      var output = number === 1 ? 'r' : number === 2 ? 'n' : number === 3 ? 'r' : number === 4 ? 't' : 'è';

      if (period === 'w' || period === 'W') {
        output = 'a';
      }

      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return ca;
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_'),
      monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
  var monthsParse = [/^led/i, /^úno/i, /^bře/i, /^dub/i, /^kvě/i, /^(čvn|červen$|června)/i, /^(čvc|červenec|července)/i, /^srp/i, /^zář/i, /^říj/i, /^lis/i, /^pro/i]; // NOTE: 'červen' is substring of 'červenec'; therefore 'červenec' must precede 'červen' in the regex to be fully matched.
  // Otherwise parser matches '1. červenec' as '1. červen' + 'ec'.

  var monthsRegex = /^(leden|únor|březen|duben|květen|červenec|července|červen|června|srpen|září|říjen|listopad|prosinec|led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i;

  function plural(n) {
    return n > 1 && n < 5 && ~~(n / 10) !== 1;
  }

  function translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';

    switch (key) {
      case 's':
        // a few seconds / in a few seconds / a few seconds ago
        return withoutSuffix || isFuture ? 'pár sekund' : 'pár sekundami';

      case 'ss':
        // 9 seconds / in 9 seconds / 9 seconds ago
        if (withoutSuffix || isFuture) {
          return result + (plural(number) ? 'sekundy' : 'sekund');
        } else {
          return result + 'sekundami';
        }

        break;

      case 'm':
        // a minute / in a minute / a minute ago
        return withoutSuffix ? 'minuta' : isFuture ? 'minutu' : 'minutou';

      case 'mm':
        // 9 minutes / in 9 minutes / 9 minutes ago
        if (withoutSuffix || isFuture) {
          return result + (plural(number) ? 'minuty' : 'minut');
        } else {
          return result + 'minutami';
        }

        break;

      case 'h':
        // an hour / in an hour / an hour ago
        return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou';

      case 'hh':
        // 9 hours / in 9 hours / 9 hours ago
        if (withoutSuffix || isFuture) {
          return result + (plural(number) ? 'hodiny' : 'hodin');
        } else {
          return result + 'hodinami';
        }

        break;

      case 'd':
        // a day / in a day / a day ago
        return withoutSuffix || isFuture ? 'den' : 'dnem';

      case 'dd':
        // 9 days / in 9 days / 9 days ago
        if (withoutSuffix || isFuture) {
          return result + (plural(number) ? 'dny' : 'dní');
        } else {
          return result + 'dny';
        }

        break;

      case 'M':
        // a month / in a month / a month ago
        return withoutSuffix || isFuture ? 'měsíc' : 'měsícem';

      case 'MM':
        // 9 months / in 9 months / 9 months ago
        if (withoutSuffix || isFuture) {
          return result + (plural(number) ? 'měsíce' : 'měsíců');
        } else {
          return result + 'měsíci';
        }

        break;

      case 'y':
        // a year / in a year / a year ago
        return withoutSuffix || isFuture ? 'rok' : 'rokem';

      case 'yy':
        // 9 years / in 9 years / 9 years ago
        if (withoutSuffix || isFuture) {
          return result + (plural(number) ? 'roky' : 'let');
        } else {
          return result + 'lety';
        }

        break;
    }
  }

  var cs = moment.defineLocale('cs', {
    months: months,
    monthsShort: monthsShort,
    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    // NOTE: 'červen' is substring of 'červenec'; therefore 'červenec' must precede 'červen' in the regex to be fully matched.
    // Otherwise parser matches '1. červenec' as '1. červen' + 'ec'.
    monthsStrictRegex: /^(leden|ledna|února|únor|březen|března|duben|dubna|květen|května|červenec|července|červen|června|srpen|srpna|září|říjen|října|listopadu|listopad|prosinec|prosince)/i,
    monthsShortStrictRegex: /^(led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i,
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays: 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
    weekdaysShort: 'ne_po_út_st_čt_pá_so'.split('_'),
    weekdaysMin: 'ne_po_út_st_čt_pá_so'.split('_'),
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY H:mm',
      LLLL: 'dddd D. MMMM YYYY H:mm',
      l: 'D. M. YYYY'
    },
    calendar: {
      sameDay: '[dnes v] LT',
      nextDay: '[zítra v] LT',
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return '[v neděli v] LT';

          case 1:
          case 2:
            return '[v] dddd [v] LT';

          case 3:
            return '[ve středu v] LT';

          case 4:
            return '[ve čtvrtek v] LT';

          case 5:
            return '[v pátek v] LT';

          case 6:
            return '[v sobotu v] LT';
        }
      },
      lastDay: '[včera v] LT',
      lastWeek: function () {
        switch (this.day()) {
          case 0:
            return '[minulou neděli v] LT';

          case 1:
          case 2:
            return '[minulé] dddd [v] LT';

          case 3:
            return '[minulou středu v] LT';

          case 4:
          case 5:
            return '[minulý] dddd [v] LT';

          case 6:
            return '[minulou sobotu v] LT';
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'za %s',
      past: 'před %s',
      s: translate,
      ss: translate,
      m: translate,
      mm: translate,
      h: translate,
      hh: translate,
      d: translate,
      dd: translate,
      M: translate,
      MM: translate,
      y: translate,
      yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return cs;
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var cv = moment.defineLocale('cv', {
    months: 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
    monthsShort: 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
    weekdays: 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
    weekdaysShort: 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
    weekdaysMin: 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD-MM-YYYY',
      LL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
      LLL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
      LLLL: 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
    },
    calendar: {
      sameDay: '[Паян] LT [сехетре]',
      nextDay: '[Ыран] LT [сехетре]',
      lastDay: '[Ӗнер] LT [сехетре]',
      nextWeek: '[Ҫитес] dddd LT [сехетре]',
      lastWeek: '[Иртнӗ] dddd LT [сехетре]',
      sameElse: 'L'
    },
    relativeTime: {
      future: function (output) {
        var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
        return output + affix;
      },
      past: '%s каялла',
      s: 'пӗр-ик ҫеккунт',
      ss: '%d ҫеккунт',
      m: 'пӗр минут',
      mm: '%d минут',
      h: 'пӗр сехет',
      hh: '%d сехет',
      d: 'пӗр кун',
      dd: '%d кун',
      M: 'пӗр уйӑх',
      MM: '%d уйӑх',
      y: 'пӗр ҫул',
      yy: '%d ҫул'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-мӗш/,
    ordinal: '%d-мӗш',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return cv;
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var cy = moment.defineLocale('cy', {
    months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
    monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
    weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
    weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
    weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
    weekdaysParseExact: true,
    // time formats are the same as en-gb
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Heddiw am] LT',
      nextDay: '[Yfory am] LT',
      nextWeek: 'dddd [am] LT',
      lastDay: '[Ddoe am] LT',
      lastWeek: 'dddd [diwethaf am] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'mewn %s',
      past: '%s yn ôl',
      s: 'ychydig eiliadau',
      ss: '%d eiliad',
      m: 'munud',
      mm: '%d munud',
      h: 'awr',
      hh: '%d awr',
      d: 'diwrnod',
      dd: '%d diwrnod',
      M: 'mis',
      MM: '%d mis',
      y: 'blwyddyn',
      yy: '%d flynedd'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
    // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
    ordinal: function (number) {
      var b = number,
          output = '',
          lookup = ['', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
      'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
      ];

      if (b > 20) {
        if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
          output = 'fed'; // not 30ain, 70ain or 90ain
        } else {
          output = 'ain';
        }
      } else if (b > 0) {
        output = lookup[b];
      }

      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return cy;
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var da = moment.defineLocale('da', {
    months: 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
    monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
    weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
    weekdaysShort: 'søn_man_tir_ons_tor_fre_lør'.split('_'),
    weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY HH:mm',
      LLLL: 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
    },
    calendar: {
      sameDay: '[i dag kl.] LT',
      nextDay: '[i morgen kl.] LT',
      nextWeek: 'på dddd [kl.] LT',
      lastDay: '[i går kl.] LT',
      lastWeek: '[i] dddd[s kl.] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'om %s',
      past: '%s siden',
      s: 'få sekunder',
      ss: '%d sekunder',
      m: 'et minut',
      mm: '%d minutter',
      h: 'en time',
      hh: '%d timer',
      d: 'en dag',
      dd: '%d dage',
      M: 'en måned',
      MM: '%d måneder',
      y: 'et år',
      yy: '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return da;
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
      'm': ['eine Minute', 'einer Minute'],
      'h': ['eine Stunde', 'einer Stunde'],
      'd': ['ein Tag', 'einem Tag'],
      'dd': [number + ' Tage', number + ' Tagen'],
      'M': ['ein Monat', 'einem Monat'],
      'MM': [number + ' Monate', number + ' Monaten'],
      'y': ['ein Jahr', 'einem Jahr'],
      'yy': [number + ' Jahre', number + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
  }

  var de = moment.defineLocale('de', {
    months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort: 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
    monthsParseExact: true,
    weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY HH:mm',
      LLLL: 'dddd, D. MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[heute um] LT [Uhr]',
      sameElse: 'L',
      nextDay: '[morgen um] LT [Uhr]',
      nextWeek: 'dddd [um] LT [Uhr]',
      lastDay: '[gestern um] LT [Uhr]',
      lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime: {
      future: 'in %s',
      past: 'vor %s',
      s: 'ein paar Sekunden',
      ss: '%d Sekunden',
      m: processRelativeTime,
      mm: '%d Minuten',
      h: processRelativeTime,
      hh: '%d Stunden',
      d: processRelativeTime,
      dd: processRelativeTime,
      M: processRelativeTime,
      MM: processRelativeTime,
      y: processRelativeTime,
      yy: processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return de;
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
      'm': ['eine Minute', 'einer Minute'],
      'h': ['eine Stunde', 'einer Stunde'],
      'd': ['ein Tag', 'einem Tag'],
      'dd': [number + ' Tage', number + ' Tagen'],
      'M': ['ein Monat', 'einem Monat'],
      'MM': [number + ' Monate', number + ' Monaten'],
      'y': ['ein Jahr', 'einem Jahr'],
      'yy': [number + ' Jahre', number + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
  }

  var deAt = moment.defineLocale('de-at', {
    months: 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort: 'Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
    monthsParseExact: true,
    weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY HH:mm',
      LLLL: 'dddd, D. MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[heute um] LT [Uhr]',
      sameElse: 'L',
      nextDay: '[morgen um] LT [Uhr]',
      nextWeek: 'dddd [um] LT [Uhr]',
      lastDay: '[gestern um] LT [Uhr]',
      lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime: {
      future: 'in %s',
      past: 'vor %s',
      s: 'ein paar Sekunden',
      ss: '%d Sekunden',
      m: processRelativeTime,
      mm: '%d Minuten',
      h: processRelativeTime,
      hh: '%d Stunden',
      d: processRelativeTime,
      dd: processRelativeTime,
      M: processRelativeTime,
      MM: processRelativeTime,
      y: processRelativeTime,
      yy: processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return deAt;
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
      'm': ['eine Minute', 'einer Minute'],
      'h': ['eine Stunde', 'einer Stunde'],
      'd': ['ein Tag', 'einem Tag'],
      'dd': [number + ' Tage', number + ' Tagen'],
      'M': ['ein Monat', 'einem Monat'],
      'MM': [number + ' Monate', number + ' Monaten'],
      'y': ['ein Jahr', 'einem Jahr'],
      'yy': [number + ' Jahre', number + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
  }

  var deCh = moment.defineLocale('de-ch', {
    months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort: 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
    monthsParseExact: true,
    weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY HH:mm',
      LLLL: 'dddd, D. MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[heute um] LT [Uhr]',
      sameElse: 'L',
      nextDay: '[morgen um] LT [Uhr]',
      nextWeek: 'dddd [um] LT [Uhr]',
      lastDay: '[gestern um] LT [Uhr]',
      lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime: {
      future: 'in %s',
      past: 'vor %s',
      s: 'ein paar Sekunden',
      ss: '%d Sekunden',
      m: processRelativeTime,
      mm: '%d Minuten',
      h: processRelativeTime,
      hh: '%d Stunden',
      d: processRelativeTime,
      dd: processRelativeTime,
      M: processRelativeTime,
      MM: processRelativeTime,
      y: processRelativeTime,
      yy: processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return deCh;
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var months = ['ޖެނުއަރީ', 'ފެބްރުއަރީ', 'މާރިޗު', 'އޭޕްރީލު', 'މޭ', 'ޖޫން', 'ޖުލައި', 'އޯގަސްޓު', 'ސެޕްޓެމްބަރު', 'އޮކްޓޯބަރު', 'ނޮވެމްބަރު', 'ޑިސެމްބަރު'],
      weekdays = ['އާދިއްތަ', 'ހޯމަ', 'އަންގާރަ', 'ބުދަ', 'ބުރާސްފަތި', 'ހުކުރު', 'ހޮނިހިރު'];
  var dv = moment.defineLocale('dv', {
    months: months,
    monthsShort: months,
    weekdays: weekdays,
    weekdaysShort: weekdays,
    weekdaysMin: 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'D/M/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /މކ|މފ/,
    isPM: function (input) {
      return 'މފ' === input;
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return 'މކ';
      } else {
        return 'މފ';
      }
    },
    calendar: {
      sameDay: '[މިއަދު] LT',
      nextDay: '[މާދަމާ] LT',
      nextWeek: 'dddd LT',
      lastDay: '[އިއްޔެ] LT',
      lastWeek: '[ފާއިތުވި] dddd LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'ތެރޭގައި %s',
      past: 'ކުރިން %s',
      s: 'ސިކުންތުކޮޅެއް',
      ss: 'd% ސިކުންތު',
      m: 'މިނިޓެއް',
      mm: 'މިނިޓު %d',
      h: 'ގަޑިއިރެއް',
      hh: 'ގަޑިއިރު %d',
      d: 'ދުވަހެއް',
      dd: 'ދުވަސް %d',
      M: 'މަހެއް',
      MM: 'މަސް %d',
      y: 'އަހަރެއް',
      yy: 'އަހަރު %d'
    },
    preparse: function (string) {
      return string.replace(/،/g, ',');
    },
    postformat: function (string) {
      return string.replace(/,/g, '،');
    },
    week: {
      dow: 7,
      // Sunday is the first day of the week.
      doy: 12 // The week that contains Jan 12th is the first week of the year.

    }
  });
  return dv;
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
  }

  var el = moment.defineLocale('el', {
    monthsNominativeEl: 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
    monthsGenitiveEl: 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
    months: function (momentToFormat, format) {
      if (!momentToFormat) {
        return this._monthsNominativeEl;
      } else if (typeof format === 'string' && /D/.test(format.substring(0, format.indexOf('MMMM')))) {
        // if there is a day number before 'MMMM'
        return this._monthsGenitiveEl[momentToFormat.month()];
      } else {
        return this._monthsNominativeEl[momentToFormat.month()];
      }
    },
    monthsShort: 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
    weekdays: 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
    weekdaysShort: 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
    weekdaysMin: 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
    meridiem: function (hours, minutes, isLower) {
      if (hours > 11) {
        return isLower ? 'μμ' : 'ΜΜ';
      } else {
        return isLower ? 'πμ' : 'ΠΜ';
      }
    },
    isPM: function (input) {
      return (input + '').toLowerCase()[0] === 'μ';
    },
    meridiemParse: /[ΠΜ]\.?Μ?\.?/i,
    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY h:mm A',
      LLLL: 'dddd, D MMMM YYYY h:mm A'
    },
    calendarEl: {
      sameDay: '[Σήμερα {}] LT',
      nextDay: '[Αύριο {}] LT',
      nextWeek: 'dddd [{}] LT',
      lastDay: '[Χθες {}] LT',
      lastWeek: function () {
        switch (this.day()) {
          case 6:
            return '[το προηγούμενο] dddd [{}] LT';

          default:
            return '[την προηγούμενη] dddd [{}] LT';
        }
      },
      sameElse: 'L'
    },
    calendar: function (key, mom) {
      var output = this._calendarEl[key],
          hours = mom && mom.hours();

      if (isFunction(output)) {
        output = output.apply(mom);
      }

      return output.replace('{}', hours % 12 === 1 ? 'στη' : 'στις');
    },
    relativeTime: {
      future: 'σε %s',
      past: '%s πριν',
      s: 'λίγα δευτερόλεπτα',
      ss: '%d δευτερόλεπτα',
      m: 'ένα λεπτό',
      mm: '%d λεπτά',
      h: 'μία ώρα',
      hh: '%d ώρες',
      d: 'μία μέρα',
      dd: '%d μέρες',
      M: 'ένας μήνας',
      MM: '%d μήνες',
      y: 'ένας χρόνος',
      yy: '%d χρόνια'
    },
    dayOfMonthOrdinalParse: /\d{1,2}η/,
    ordinal: '%dη',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4st is the first week of the year.

    }
  });
  return el;
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var enSG = moment.defineLocale('en-SG', {
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function (number) {
      var b = number % 10,
          output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return enSG;
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var enAu = moment.defineLocale('en-au', {
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY h:mm A',
      LLLL: 'dddd, D MMMM YYYY h:mm A'
    },
    calendar: {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function (number) {
      var b = number % 10,
          output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return enAu;
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var enCa = moment.defineLocale('en-ca', {
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'YYYY-MM-DD',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY h:mm A',
      LLLL: 'dddd, MMMM D, YYYY h:mm A'
    },
    calendar: {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function (number) {
      var b = number % 10,
          output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    }
  });
  return enCa;
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var enGb = moment.defineLocale('en-gb', {
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function (number) {
      var b = number % 10,
          output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return enGb;
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var enIe = moment.defineLocale('en-ie', {
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function (number) {
      var b = number % 10,
          output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return enIe;
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var enIl = moment.defineLocale('en-il', {
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function (number) {
      var b = number % 10,
          output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    }
  });
  return enIl;
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var enNz = moment.defineLocale('en-nz', {
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY h:mm A',
      LLLL: 'dddd, D MMMM YYYY h:mm A'
    },
    calendar: {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function (number) {
      var b = number % 10,
          output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return enNz;
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var eo = moment.defineLocale('eo', {
    months: 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
    monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
    weekdays: 'dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato'.split('_'),
    weekdaysShort: 'dim_lun_mard_merk_ĵaŭ_ven_sab'.split('_'),
    weekdaysMin: 'di_lu_ma_me_ĵa_ve_sa'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY-MM-DD',
      LL: 'D[-a de] MMMM, YYYY',
      LLL: 'D[-a de] MMMM, YYYY HH:mm',
      LLLL: 'dddd, [la] D[-a de] MMMM, YYYY HH:mm'
    },
    meridiemParse: /[ap]\.t\.m/i,
    isPM: function (input) {
      return input.charAt(0).toLowerCase() === 'p';
    },
    meridiem: function (hours, minutes, isLower) {
      if (hours > 11) {
        return isLower ? 'p.t.m.' : 'P.T.M.';
      } else {
        return isLower ? 'a.t.m.' : 'A.T.M.';
      }
    },
    calendar: {
      sameDay: '[Hodiaŭ je] LT',
      nextDay: '[Morgaŭ je] LT',
      nextWeek: 'dddd [je] LT',
      lastDay: '[Hieraŭ je] LT',
      lastWeek: '[pasinta] dddd [je] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'post %s',
      past: 'antaŭ %s',
      s: 'sekundoj',
      ss: '%d sekundoj',
      m: 'minuto',
      mm: '%d minutoj',
      h: 'horo',
      hh: '%d horoj',
      d: 'tago',
      //ne 'diurno', ĉar estas uzita por proksimumo
      dd: '%d tagoj',
      M: 'monato',
      MM: '%d monatoj',
      y: 'jaro',
      yy: '%d jaroj'
    },
    dayOfMonthOrdinalParse: /\d{1,2}a/,
    ordinal: '%da',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return eo;
});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
      monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');
  var monthsParse = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
  var monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
  var es = moment.defineLocale('es', {
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort: function (m, format) {
      if (!m) {
        return monthsShortDot;
      } else if (/-MMM-/.test(format)) {
        return monthsShort[m.month()];
      } else {
        return monthsShortDot[m.month()];
      }
    },
    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
    monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D [de] MMMM [de] YYYY',
      LLL: 'D [de] MMMM [de] YYYY H:mm',
      LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
    },
    calendar: {
      sameDay: function () {
        return '[hoy a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      nextDay: function () {
        return '[mañana a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      nextWeek: function () {
        return 'dddd [a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      lastDay: function () {
        return '[ayer a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      lastWeek: function () {
        return '[el] dddd [pasado a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'en %s',
      past: 'hace %s',
      s: 'unos segundos',
      ss: '%d segundos',
      m: 'un minuto',
      mm: '%d minutos',
      h: 'una hora',
      hh: '%d horas',
      d: 'un día',
      dd: '%d días',
      M: 'un mes',
      MM: '%d meses',
      y: 'un año',
      yy: '%d años'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return es;
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
      monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');
  var monthsParse = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
  var monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
  var esDo = moment.defineLocale('es-do', {
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort: function (m, format) {
      if (!m) {
        return monthsShortDot;
      } else if (/-MMM-/.test(format)) {
        return monthsShort[m.month()];
      } else {
        return monthsShortDot[m.month()];
      }
    },
    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
    monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'DD/MM/YYYY',
      LL: 'D [de] MMMM [de] YYYY',
      LLL: 'D [de] MMMM [de] YYYY h:mm A',
      LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A'
    },
    calendar: {
      sameDay: function () {
        return '[hoy a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      nextDay: function () {
        return '[mañana a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      nextWeek: function () {
        return 'dddd [a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      lastDay: function () {
        return '[ayer a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      lastWeek: function () {
        return '[el] dddd [pasado a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'en %s',
      past: 'hace %s',
      s: 'unos segundos',
      ss: '%d segundos',
      m: 'un minuto',
      mm: '%d minutos',
      h: 'una hora',
      hh: '%d horas',
      d: 'un día',
      dd: '%d días',
      M: 'un mes',
      MM: '%d meses',
      y: 'un año',
      yy: '%d años'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return esDo;
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
      monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');
  var monthsParse = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
  var monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
  var esUs = moment.defineLocale('es-us', {
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort: function (m, format) {
      if (!m) {
        return monthsShortDot;
      } else if (/-MMM-/.test(format)) {
        return monthsShort[m.month()];
      } else {
        return monthsShortDot[m.month()];
      }
    },
    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
    monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'MM/DD/YYYY',
      LL: 'D [de] MMMM [de] YYYY',
      LLL: 'D [de] MMMM [de] YYYY h:mm A',
      LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A'
    },
    calendar: {
      sameDay: function () {
        return '[hoy a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      nextDay: function () {
        return '[mañana a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      nextWeek: function () {
        return 'dddd [a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      lastDay: function () {
        return '[ayer a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      lastWeek: function () {
        return '[el] dddd [pasado a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'en %s',
      past: 'hace %s',
      s: 'unos segundos',
      ss: '%d segundos',
      m: 'un minuto',
      mm: '%d minutos',
      h: 'una hora',
      hh: '%d horas',
      d: 'un día',
      dd: '%d días',
      M: 'un mes',
      MM: '%d meses',
      y: 'un año',
      yy: '%d años'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6 // The week that contains Jan 6th is the first week of the year.

    }
  });
  return esUs;
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
      's': ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
      'ss': [number + 'sekundi', number + 'sekundit'],
      'm': ['ühe minuti', 'üks minut'],
      'mm': [number + ' minuti', number + ' minutit'],
      'h': ['ühe tunni', 'tund aega', 'üks tund'],
      'hh': [number + ' tunni', number + ' tundi'],
      'd': ['ühe päeva', 'üks päev'],
      'M': ['kuu aja', 'kuu aega', 'üks kuu'],
      'MM': [number + ' kuu', number + ' kuud'],
      'y': ['ühe aasta', 'aasta', 'üks aasta'],
      'yy': [number + ' aasta', number + ' aastat']
    };

    if (withoutSuffix) {
      return format[key][2] ? format[key][2] : format[key][1];
    }

    return isFuture ? format[key][0] : format[key][1];
  }

  var et = moment.defineLocale('et', {
    months: 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
    monthsShort: 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
    weekdays: 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
    weekdaysShort: 'P_E_T_K_N_R_L'.split('_'),
    weekdaysMin: 'P_E_T_K_N_R_L'.split('_'),
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY H:mm',
      LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
      sameDay: '[Täna,] LT',
      nextDay: '[Homme,] LT',
      nextWeek: '[Järgmine] dddd LT',
      lastDay: '[Eile,] LT',
      lastWeek: '[Eelmine] dddd LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s pärast',
      past: '%s tagasi',
      s: processRelativeTime,
      ss: processRelativeTime,
      m: processRelativeTime,
      mm: processRelativeTime,
      h: processRelativeTime,
      hh: processRelativeTime,
      d: processRelativeTime,
      dd: '%d päeva',
      M: processRelativeTime,
      MM: processRelativeTime,
      y: processRelativeTime,
      yy: processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return et;
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var eu = moment.defineLocale('eu', {
    months: 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
    monthsShort: 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
    monthsParseExact: true,
    weekdays: 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
    weekdaysShort: 'ig._al._ar._az._og._ol._lr.'.split('_'),
    weekdaysMin: 'ig_al_ar_az_og_ol_lr'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY-MM-DD',
      LL: 'YYYY[ko] MMMM[ren] D[a]',
      LLL: 'YYYY[ko] MMMM[ren] D[a] HH:mm',
      LLLL: 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
      l: 'YYYY-M-D',
      ll: 'YYYY[ko] MMM D[a]',
      lll: 'YYYY[ko] MMM D[a] HH:mm',
      llll: 'ddd, YYYY[ko] MMM D[a] HH:mm'
    },
    calendar: {
      sameDay: '[gaur] LT[etan]',
      nextDay: '[bihar] LT[etan]',
      nextWeek: 'dddd LT[etan]',
      lastDay: '[atzo] LT[etan]',
      lastWeek: '[aurreko] dddd LT[etan]',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s barru',
      past: 'duela %s',
      s: 'segundo batzuk',
      ss: '%d segundo',
      m: 'minutu bat',
      mm: '%d minutu',
      h: 'ordu bat',
      hh: '%d ordu',
      d: 'egun bat',
      dd: '%d egun',
      M: 'hilabete bat',
      MM: '%d hilabete',
      y: 'urte bat',
      yy: '%d urte'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return eu;
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
    '0': '۰'
  },
      numberMap = {
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
    '۰': '0'
  };
  var fa = moment.defineLocale('fa', {
    months: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
    monthsShort: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
    weekdays: 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
    weekdaysShort: 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
    weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    meridiemParse: /قبل از ظهر|بعد از ظهر/,
    isPM: function (input) {
      return /بعد از ظهر/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return 'قبل از ظهر';
      } else {
        return 'بعد از ظهر';
      }
    },
    calendar: {
      sameDay: '[امروز ساعت] LT',
      nextDay: '[فردا ساعت] LT',
      nextWeek: 'dddd [ساعت] LT',
      lastDay: '[دیروز ساعت] LT',
      lastWeek: 'dddd [پیش] [ساعت] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'در %s',
      past: '%s پیش',
      s: 'چند ثانیه',
      ss: 'ثانیه d%',
      m: 'یک دقیقه',
      mm: '%d دقیقه',
      h: 'یک ساعت',
      hh: '%d ساعت',
      d: 'یک روز',
      dd: '%d روز',
      M: 'یک ماه',
      MM: '%d ماه',
      y: 'یک سال',
      yy: '%d سال'
    },
    preparse: function (string) {
      return string.replace(/[۰-۹]/g, function (match) {
        return numberMap[match];
      }).replace(/،/g, ',');
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      }).replace(/,/g, '،');
    },
    dayOfMonthOrdinalParse: /\d{1,2}م/,
    ordinal: '%dم',
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12 // The week that contains Jan 12th is the first week of the year.

    }
  });
  return fa;
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' '),
      numbersFuture = ['nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden', numbersPast[7], numbersPast[8], numbersPast[9]];

  function translate(number, withoutSuffix, key, isFuture) {
    var result = '';

    switch (key) {
      case 's':
        return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';

      case 'ss':
        return isFuture ? 'sekunnin' : 'sekuntia';

      case 'm':
        return isFuture ? 'minuutin' : 'minuutti';

      case 'mm':
        result = isFuture ? 'minuutin' : 'minuuttia';
        break;

      case 'h':
        return isFuture ? 'tunnin' : 'tunti';

      case 'hh':
        result = isFuture ? 'tunnin' : 'tuntia';
        break;

      case 'd':
        return isFuture ? 'päivän' : 'päivä';

      case 'dd':
        result = isFuture ? 'päivän' : 'päivää';
        break;

      case 'M':
        return isFuture ? 'kuukauden' : 'kuukausi';

      case 'MM':
        result = isFuture ? 'kuukauden' : 'kuukautta';
        break;

      case 'y':
        return isFuture ? 'vuoden' : 'vuosi';

      case 'yy':
        result = isFuture ? 'vuoden' : 'vuotta';
        break;
    }

    result = verbalNumber(number, isFuture) + ' ' + result;
    return result;
  }

  function verbalNumber(number, isFuture) {
    return number < 10 ? isFuture ? numbersFuture[number] : numbersPast[number] : number;
  }

  var fi = moment.defineLocale('fi', {
    months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
    monthsShort: 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
    weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
    weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
    weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_'),
    longDateFormat: {
      LT: 'HH.mm',
      LTS: 'HH.mm.ss',
      L: 'DD.MM.YYYY',
      LL: 'Do MMMM[ta] YYYY',
      LLL: 'Do MMMM[ta] YYYY, [klo] HH.mm',
      LLLL: 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
      l: 'D.M.YYYY',
      ll: 'Do MMM YYYY',
      lll: 'Do MMM YYYY, [klo] HH.mm',
      llll: 'ddd, Do MMM YYYY, [klo] HH.mm'
    },
    calendar: {
      sameDay: '[tänään] [klo] LT',
      nextDay: '[huomenna] [klo] LT',
      nextWeek: 'dddd [klo] LT',
      lastDay: '[eilen] [klo] LT',
      lastWeek: '[viime] dddd[na] [klo] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s päästä',
      past: '%s sitten',
      s: translate,
      ss: translate,
      m: translate,
      mm: translate,
      h: translate,
      hh: translate,
      d: translate,
      dd: translate,
      M: translate,
      MM: translate,
      y: translate,
      yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return fi;
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var fo = moment.defineLocale('fo', {
    months: 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
    weekdays: 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
    weekdaysShort: 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
    weekdaysMin: 'su_má_tý_mi_hó_fr_le'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D. MMMM, YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Í dag kl.] LT',
      nextDay: '[Í morgin kl.] LT',
      nextWeek: 'dddd [kl.] LT',
      lastDay: '[Í gjár kl.] LT',
      lastWeek: '[síðstu] dddd [kl] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'um %s',
      past: '%s síðani',
      s: 'fá sekund',
      ss: '%d sekundir',
      m: 'ein minuttur',
      mm: '%d minuttir',
      h: 'ein tími',
      hh: '%d tímar',
      d: 'ein dagur',
      dd: '%d dagar',
      M: 'ein mánaður',
      MM: '%d mánaðir',
      y: 'eitt ár',
      yy: '%d ár'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return fo;
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var fr = moment.defineLocale('fr', {
    months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact: true,
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Aujourd’hui à] LT',
      nextDay: '[Demain à] LT',
      nextWeek: 'dddd [à] LT',
      lastDay: '[Hier à] LT',
      lastWeek: 'dddd [dernier à] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'dans %s',
      past: 'il y a %s',
      s: 'quelques secondes',
      ss: '%d secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures',
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: 'un an',
      yy: '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
    ordinal: function (number, period) {
      switch (period) {
        // TODO: Return 'e' when day of month > 1. Move this case inside
        // block for masculine words below.
        // See https://github.com/moment/moment/issues/3375
        case 'D':
          return number + (number === 1 ? 'er' : '');
        // Words with masculine grammatical gender: mois, trimestre, jour

        default:
        case 'M':
        case 'Q':
        case 'DDD':
        case 'd':
          return number + (number === 1 ? 'er' : 'e');
        // Words with feminine grammatical gender: semaine

        case 'w':
        case 'W':
          return number + (number === 1 ? 're' : 'e');
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return fr;
});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var frCa = moment.defineLocale('fr-ca', {
    months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact: true,
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY-MM-DD',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Aujourd’hui à] LT',
      nextDay: '[Demain à] LT',
      nextWeek: 'dddd [à] LT',
      lastDay: '[Hier à] LT',
      lastWeek: 'dddd [dernier à] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'dans %s',
      past: 'il y a %s',
      s: 'quelques secondes',
      ss: '%d secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures',
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: 'un an',
      yy: '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal: function (number, period) {
      switch (period) {
        // Words with masculine grammatical gender: mois, trimestre, jour
        default:
        case 'M':
        case 'Q':
        case 'D':
        case 'DDD':
        case 'd':
          return number + (number === 1 ? 'er' : 'e');
        // Words with feminine grammatical gender: semaine

        case 'w':
        case 'W':
          return number + (number === 1 ? 're' : 'e');
      }
    }
  });
  return frCa;
});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var frCh = moment.defineLocale('fr-ch', {
    months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact: true,
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Aujourd’hui à] LT',
      nextDay: '[Demain à] LT',
      nextWeek: 'dddd [à] LT',
      lastDay: '[Hier à] LT',
      lastWeek: 'dddd [dernier à] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'dans %s',
      past: 'il y a %s',
      s: 'quelques secondes',
      ss: '%d secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures',
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: 'un an',
      yy: '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal: function (number, period) {
      switch (period) {
        // Words with masculine grammatical gender: mois, trimestre, jour
        default:
        case 'M':
        case 'Q':
        case 'D':
        case 'DDD':
        case 'd':
          return number + (number === 1 ? 'er' : 'e');
        // Words with feminine grammatical gender: semaine

        case 'w':
        case 'W':
          return number + (number === 1 ? 're' : 'e');
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return frCh;
});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_'),
      monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');
  var fy = moment.defineLocale('fy', {
    months: 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
    monthsShort: function (m, format) {
      if (!m) {
        return monthsShortWithDots;
      } else if (/-MMM-/.test(format)) {
        return monthsShortWithoutDots[m.month()];
      } else {
        return monthsShortWithDots[m.month()];
      }
    },
    monthsParseExact: true,
    weekdays: 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
    weekdaysShort: 'si._mo._ti._wo._to._fr._so.'.split('_'),
    weekdaysMin: 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD-MM-YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[hjoed om] LT',
      nextDay: '[moarn om] LT',
      nextWeek: 'dddd [om] LT',
      lastDay: '[juster om] LT',
      lastWeek: '[ôfrûne] dddd [om] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'oer %s',
      past: '%s lyn',
      s: 'in pear sekonden',
      ss: '%d sekonden',
      m: 'ien minút',
      mm: '%d minuten',
      h: 'ien oere',
      hh: '%d oeren',
      d: 'ien dei',
      dd: '%d dagen',
      M: 'ien moanne',
      MM: '%d moannen',
      y: 'ien jier',
      yy: '%d jierren'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal: function (number) {
      return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de');
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return fy;
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var months = ['Eanáir', 'Feabhra', 'Márta', 'Aibreán', 'Bealtaine', 'Méitheamh', 'Iúil', 'Lúnasa', 'Meán Fómhair', 'Deaireadh Fómhair', 'Samhain', 'Nollaig'];
  var monthsShort = ['Eaná', 'Feab', 'Márt', 'Aibr', 'Beal', 'Méit', 'Iúil', 'Lúna', 'Meán', 'Deai', 'Samh', 'Noll'];
  var weekdays = ['Dé Domhnaigh', 'Dé Luain', 'Dé Máirt', 'Dé Céadaoin', 'Déardaoin', 'Dé hAoine', 'Dé Satharn'];
  var weekdaysShort = ['Dom', 'Lua', 'Mái', 'Céa', 'Déa', 'hAo', 'Sat'];
  var weekdaysMin = ['Do', 'Lu', 'Má', 'Ce', 'Dé', 'hA', 'Sa'];
  var ga = moment.defineLocale('ga', {
    months: months,
    monthsShort: monthsShort,
    monthsParseExact: true,
    weekdays: weekdays,
    weekdaysShort: weekdaysShort,
    weekdaysMin: weekdaysMin,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Inniu ag] LT',
      nextDay: '[Amárach ag] LT',
      nextWeek: 'dddd [ag] LT',
      lastDay: '[Inné aig] LT',
      lastWeek: 'dddd [seo caite] [ag] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'i %s',
      past: '%s ó shin',
      s: 'cúpla soicind',
      ss: '%d soicind',
      m: 'nóiméad',
      mm: '%d nóiméad',
      h: 'uair an chloig',
      hh: '%d uair an chloig',
      d: 'lá',
      dd: '%d lá',
      M: 'mí',
      MM: '%d mí',
      y: 'bliain',
      yy: '%d bliain'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
    ordinal: function (number) {
      var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return ga;
});

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var months = ['Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'];
  var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];
  var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];
  var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];
  var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];
  var gd = moment.defineLocale('gd', {
    months: months,
    monthsShort: monthsShort,
    monthsParseExact: true,
    weekdays: weekdays,
    weekdaysShort: weekdaysShort,
    weekdaysMin: weekdaysMin,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[An-diugh aig] LT',
      nextDay: '[A-màireach aig] LT',
      nextWeek: 'dddd [aig] LT',
      lastDay: '[An-dè aig] LT',
      lastWeek: 'dddd [seo chaidh] [aig] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'ann an %s',
      past: 'bho chionn %s',
      s: 'beagan diogan',
      ss: '%d diogan',
      m: 'mionaid',
      mm: '%d mionaidean',
      h: 'uair',
      hh: '%d uairean',
      d: 'latha',
      dd: '%d latha',
      M: 'mìos',
      MM: '%d mìosan',
      y: 'bliadhna',
      yy: '%d bliadhna'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
    ordinal: function (number) {
      var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return gd;
});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var gl = moment.defineLocale('gl', {
    months: 'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
    monthsShort: 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays: 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
    weekdaysMin: 'do_lu_ma_mé_xo_ve_sá'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D [de] MMMM [de] YYYY',
      LLL: 'D [de] MMMM [de] YYYY H:mm',
      LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
    },
    calendar: {
      sameDay: function () {
        return '[hoxe ' + (this.hours() !== 1 ? 'ás' : 'á') + '] LT';
      },
      nextDay: function () {
        return '[mañá ' + (this.hours() !== 1 ? 'ás' : 'á') + '] LT';
      },
      nextWeek: function () {
        return 'dddd [' + (this.hours() !== 1 ? 'ás' : 'a') + '] LT';
      },
      lastDay: function () {
        return '[onte ' + (this.hours() !== 1 ? 'á' : 'a') + '] LT';
      },
      lastWeek: function () {
        return '[o] dddd [pasado ' + (this.hours() !== 1 ? 'ás' : 'a') + '] LT';
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: function (str) {
        if (str.indexOf('un') === 0) {
          return 'n' + str;
        }

        return 'en ' + str;
      },
      past: 'hai %s',
      s: 'uns segundos',
      ss: '%d segundos',
      m: 'un minuto',
      mm: '%d minutos',
      h: 'unha hora',
      hh: '%d horas',
      d: 'un día',
      dd: '%d días',
      M: 'un mes',
      MM: '%d meses',
      y: 'un ano',
      yy: '%d anos'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return gl;
});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
      's': ['thodde secondanim', 'thodde second'],
      'ss': [number + ' secondanim', number + ' second'],
      'm': ['eka mintan', 'ek minute'],
      'mm': [number + ' mintanim', number + ' mintam'],
      'h': ['eka voran', 'ek vor'],
      'hh': [number + ' voranim', number + ' voram'],
      'd': ['eka disan', 'ek dis'],
      'dd': [number + ' disanim', number + ' dis'],
      'M': ['eka mhoinean', 'ek mhoino'],
      'MM': [number + ' mhoineanim', number + ' mhoine'],
      'y': ['eka vorsan', 'ek voros'],
      'yy': [number + ' vorsanim', number + ' vorsam']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
  }

  var gomLatn = moment.defineLocale('gom-latn', {
    months: 'Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr'.split('_'),
    monthsShort: 'Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.'.split('_'),
    monthsParseExact: true,
    weekdays: 'Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son\'var'.split('_'),
    weekdaysShort: 'Ait._Som._Mon._Bud._Bre._Suk._Son.'.split('_'),
    weekdaysMin: 'Ai_Sm_Mo_Bu_Br_Su_Sn'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'A h:mm [vazta]',
      LTS: 'A h:mm:ss [vazta]',
      L: 'DD-MM-YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY A h:mm [vazta]',
      LLLL: 'dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]',
      llll: 'ddd, D MMM YYYY, A h:mm [vazta]'
    },
    calendar: {
      sameDay: '[Aiz] LT',
      nextDay: '[Faleam] LT',
      nextWeek: '[Ieta to] dddd[,] LT',
      lastDay: '[Kal] LT',
      lastWeek: '[Fatlo] dddd[,] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s',
      past: '%s adim',
      s: processRelativeTime,
      ss: processRelativeTime,
      m: processRelativeTime,
      mm: processRelativeTime,
      h: processRelativeTime,
      hh: processRelativeTime,
      d: processRelativeTime,
      dd: processRelativeTime,
      M: processRelativeTime,
      MM: processRelativeTime,
      y: processRelativeTime,
      yy: processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er)/,
    ordinal: function (number, period) {
      switch (period) {
        // the ordinal 'er' only applies to day of the month
        case 'D':
          return number + 'er';

        default:
        case 'M':
        case 'Q':
        case 'DDD':
        case 'd':
        case 'w':
        case 'W':
          return number;
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    },
    meridiemParse: /rati|sokalli|donparam|sanje/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'rati') {
        return hour < 4 ? hour : hour + 12;
      } else if (meridiem === 'sokalli') {
        return hour;
      } else if (meridiem === 'donparam') {
        return hour > 12 ? hour : hour + 12;
      } else if (meridiem === 'sanje') {
        return hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'rati';
      } else if (hour < 12) {
        return 'sokalli';
      } else if (hour < 16) {
        return 'donparam';
      } else if (hour < 20) {
        return 'sanje';
      } else {
        return 'rati';
      }
    }
  });
  return gomLatn;
});

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '૧',
    '2': '૨',
    '3': '૩',
    '4': '૪',
    '5': '૫',
    '6': '૬',
    '7': '૭',
    '8': '૮',
    '9': '૯',
    '0': '૦'
  },
      numberMap = {
    '૧': '1',
    '૨': '2',
    '૩': '3',
    '૪': '4',
    '૫': '5',
    '૬': '6',
    '૭': '7',
    '૮': '8',
    '૯': '9',
    '૦': '0'
  };
  var gu = moment.defineLocale('gu', {
    months: 'જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર'.split('_'),
    monthsShort: 'જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.'.split('_'),
    monthsParseExact: true,
    weekdays: 'રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર'.split('_'),
    weekdaysShort: 'રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ'.split('_'),
    weekdaysMin: 'ર_સો_મં_બુ_ગુ_શુ_શ'.split('_'),
    longDateFormat: {
      LT: 'A h:mm વાગ્યે',
      LTS: 'A h:mm:ss વાગ્યે',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY, A h:mm વાગ્યે',
      LLLL: 'dddd, D MMMM YYYY, A h:mm વાગ્યે'
    },
    calendar: {
      sameDay: '[આજ] LT',
      nextDay: '[કાલે] LT',
      nextWeek: 'dddd, LT',
      lastDay: '[ગઇકાલે] LT',
      lastWeek: '[પાછલા] dddd, LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s મા',
      past: '%s પેહલા',
      s: 'અમુક પળો',
      ss: '%d સેકંડ',
      m: 'એક મિનિટ',
      mm: '%d મિનિટ',
      h: 'એક કલાક',
      hh: '%d કલાક',
      d: 'એક દિવસ',
      dd: '%d દિવસ',
      M: 'એક મહિનો',
      MM: '%d મહિનો',
      y: 'એક વર્ષ',
      yy: '%d વર્ષ'
    },
    preparse: function (string) {
      return string.replace(/[૧૨૩૪૫૬૭૮૯૦]/g, function (match) {
        return numberMap[match];
      });
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      });
    },
    // Gujarati notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Gujarati.
    meridiemParse: /રાત|બપોર|સવાર|સાંજ/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'રાત') {
        return hour < 4 ? hour : hour + 12;
      } else if (meridiem === 'સવાર') {
        return hour;
      } else if (meridiem === 'બપોર') {
        return hour >= 10 ? hour : hour + 12;
      } else if (meridiem === 'સાંજ') {
        return hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'રાત';
      } else if (hour < 10) {
        return 'સવાર';
      } else if (hour < 17) {
        return 'બપોર';
      } else if (hour < 20) {
        return 'સાંજ';
      } else {
        return 'રાત';
      }
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6 // The week that contains Jan 6th is the first week of the year.

    }
  });
  return gu;
});

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var he = moment.defineLocale('he', {
    months: 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
    monthsShort: 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
    weekdays: 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
    weekdaysShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
    weekdaysMin: 'א_ב_ג_ד_ה_ו_ש'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D [ב]MMMM YYYY',
      LLL: 'D [ב]MMMM YYYY HH:mm',
      LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
      l: 'D/M/YYYY',
      ll: 'D MMM YYYY',
      lll: 'D MMM YYYY HH:mm',
      llll: 'ddd, D MMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[היום ב־]LT',
      nextDay: '[מחר ב־]LT',
      nextWeek: 'dddd [בשעה] LT',
      lastDay: '[אתמול ב־]LT',
      lastWeek: '[ביום] dddd [האחרון בשעה] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'בעוד %s',
      past: 'לפני %s',
      s: 'מספר שניות',
      ss: '%d שניות',
      m: 'דקה',
      mm: '%d דקות',
      h: 'שעה',
      hh: function (number) {
        if (number === 2) {
          return 'שעתיים';
        }

        return number + ' שעות';
      },
      d: 'יום',
      dd: function (number) {
        if (number === 2) {
          return 'יומיים';
        }

        return number + ' ימים';
      },
      M: 'חודש',
      MM: function (number) {
        if (number === 2) {
          return 'חודשיים';
        }

        return number + ' חודשים';
      },
      y: 'שנה',
      yy: function (number) {
        if (number === 2) {
          return 'שנתיים';
        } else if (number % 10 === 0 && number !== 10) {
          return number + ' שנה';
        }

        return number + ' שנים';
      }
    },
    meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
    isPM: function (input) {
      return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 5) {
        return 'לפנות בוקר';
      } else if (hour < 10) {
        return 'בבוקר';
      } else if (hour < 12) {
        return isLower ? 'לפנה"צ' : 'לפני הצהריים';
      } else if (hour < 18) {
        return isLower ? 'אחה"צ' : 'אחרי הצהריים';
      } else {
        return 'בערב';
      }
    }
  });
  return he;
});

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
    '0': '०'
  },
      numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
  };
  var hi = moment.defineLocale('hi', {
    months: 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
    monthsShort: 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
    monthsParseExact: true,
    weekdays: 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
    weekdaysShort: 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
    weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
    longDateFormat: {
      LT: 'A h:mm बजे',
      LTS: 'A h:mm:ss बजे',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY, A h:mm बजे',
      LLLL: 'dddd, D MMMM YYYY, A h:mm बजे'
    },
    calendar: {
      sameDay: '[आज] LT',
      nextDay: '[कल] LT',
      nextWeek: 'dddd, LT',
      lastDay: '[कल] LT',
      lastWeek: '[पिछले] dddd, LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s में',
      past: '%s पहले',
      s: 'कुछ ही क्षण',
      ss: '%d सेकंड',
      m: 'एक मिनट',
      mm: '%d मिनट',
      h: 'एक घंटा',
      hh: '%d घंटे',
      d: 'एक दिन',
      dd: '%d दिन',
      M: 'एक महीने',
      MM: '%d महीने',
      y: 'एक वर्ष',
      yy: '%d वर्ष'
    },
    preparse: function (string) {
      return string.replace(/[१२३४५६७८९०]/g, function (match) {
        return numberMap[match];
      });
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      });
    },
    // Hindi notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
    meridiemParse: /रात|सुबह|दोपहर|शाम/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'रात') {
        return hour < 4 ? hour : hour + 12;
      } else if (meridiem === 'सुबह') {
        return hour;
      } else if (meridiem === 'दोपहर') {
        return hour >= 10 ? hour : hour + 12;
      } else if (meridiem === 'शाम') {
        return hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'रात';
      } else if (hour < 10) {
        return 'सुबह';
      } else if (hour < 17) {
        return 'दोपहर';
      } else if (hour < 20) {
        return 'शाम';
      } else {
        return 'रात';
      }
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6 // The week that contains Jan 6th is the first week of the year.

    }
  });
  return hi;
});

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function translate(number, withoutSuffix, key) {
    var result = number + ' ';

    switch (key) {
      case 'ss':
        if (number === 1) {
          result += 'sekunda';
        } else if (number === 2 || number === 3 || number === 4) {
          result += 'sekunde';
        } else {
          result += 'sekundi';
        }

        return result;

      case 'm':
        return withoutSuffix ? 'jedna minuta' : 'jedne minute';

      case 'mm':
        if (number === 1) {
          result += 'minuta';
        } else if (number === 2 || number === 3 || number === 4) {
          result += 'minute';
        } else {
          result += 'minuta';
        }

        return result;

      case 'h':
        return withoutSuffix ? 'jedan sat' : 'jednog sata';

      case 'hh':
        if (number === 1) {
          result += 'sat';
        } else if (number === 2 || number === 3 || number === 4) {
          result += 'sata';
        } else {
          result += 'sati';
        }

        return result;

      case 'dd':
        if (number === 1) {
          result += 'dan';
        } else {
          result += 'dana';
        }

        return result;

      case 'MM':
        if (number === 1) {
          result += 'mjesec';
        } else if (number === 2 || number === 3 || number === 4) {
          result += 'mjeseca';
        } else {
          result += 'mjeseci';
        }

        return result;

      case 'yy':
        if (number === 1) {
          result += 'godina';
        } else if (number === 2 || number === 3 || number === 4) {
          result += 'godine';
        } else {
          result += 'godina';
        }

        return result;
    }
  }

  var hr = moment.defineLocale('hr', {
    months: {
      format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
      standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
    },
    monthsShort: 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
    monthsParseExact: true,
    weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
    weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY H:mm',
      LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
      sameDay: '[danas u] LT',
      nextDay: '[sutra u] LT',
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return '[u] [nedjelju] [u] LT';

          case 3:
            return '[u] [srijedu] [u] LT';

          case 6:
            return '[u] [subotu] [u] LT';

          case 1:
          case 2:
          case 4:
          case 5:
            return '[u] dddd [u] LT';
        }
      },
      lastDay: '[jučer u] LT',
      lastWeek: function () {
        switch (this.day()) {
          case 0:
          case 3:
            return '[prošlu] dddd [u] LT';

          case 6:
            return '[prošle] [subote] [u] LT';

          case 1:
          case 2:
          case 4:
          case 5:
            return '[prošli] dddd [u] LT';
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'za %s',
      past: 'prije %s',
      s: 'par sekundi',
      ss: translate,
      m: translate,
      mm: translate,
      h: translate,
      hh: translate,
      d: 'dan',
      dd: translate,
      M: 'mjesec',
      MM: translate,
      y: 'godinu',
      yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return hr;
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');

  function translate(number, withoutSuffix, key, isFuture) {
    var num = number;

    switch (key) {
      case 's':
        return isFuture || withoutSuffix ? 'néhány másodperc' : 'néhány másodperce';

      case 'ss':
        return num + (isFuture || withoutSuffix) ? ' másodperc' : ' másodperce';

      case 'm':
        return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');

      case 'mm':
        return num + (isFuture || withoutSuffix ? ' perc' : ' perce');

      case 'h':
        return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');

      case 'hh':
        return num + (isFuture || withoutSuffix ? ' óra' : ' órája');

      case 'd':
        return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');

      case 'dd':
        return num + (isFuture || withoutSuffix ? ' nap' : ' napja');

      case 'M':
        return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');

      case 'MM':
        return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');

      case 'y':
        return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');

      case 'yy':
        return num + (isFuture || withoutSuffix ? ' év' : ' éve');
    }

    return '';
  }

  function week(isFuture) {
    return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
  }

  var hu = moment.defineLocale('hu', {
    months: 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
    monthsShort: 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
    weekdays: 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
    weekdaysShort: 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
    weekdaysMin: 'v_h_k_sze_cs_p_szo'.split('_'),
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'YYYY.MM.DD.',
      LL: 'YYYY. MMMM D.',
      LLL: 'YYYY. MMMM D. H:mm',
      LLLL: 'YYYY. MMMM D., dddd H:mm'
    },
    meridiemParse: /de|du/i,
    isPM: function (input) {
      return input.charAt(1).toLowerCase() === 'u';
    },
    meridiem: function (hours, minutes, isLower) {
      if (hours < 12) {
        return isLower === true ? 'de' : 'DE';
      } else {
        return isLower === true ? 'du' : 'DU';
      }
    },
    calendar: {
      sameDay: '[ma] LT[-kor]',
      nextDay: '[holnap] LT[-kor]',
      nextWeek: function () {
        return week.call(this, true);
      },
      lastDay: '[tegnap] LT[-kor]',
      lastWeek: function () {
        return week.call(this, false);
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s múlva',
      past: '%s',
      s: translate,
      ss: translate,
      m: translate,
      mm: translate,
      h: translate,
      hh: translate,
      d: translate,
      dd: translate,
      M: translate,
      MM: translate,
      y: translate,
      yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return hu;
});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var hyAm = moment.defineLocale('hy-am', {
    months: {
      format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
      standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
    },
    monthsShort: 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
    weekdays: 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
    weekdaysShort: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
    weekdaysMin: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY թ.',
      LLL: 'D MMMM YYYY թ., HH:mm',
      LLLL: 'dddd, D MMMM YYYY թ., HH:mm'
    },
    calendar: {
      sameDay: '[այսօր] LT',
      nextDay: '[վաղը] LT',
      lastDay: '[երեկ] LT',
      nextWeek: function () {
        return 'dddd [օրը ժամը] LT';
      },
      lastWeek: function () {
        return '[անցած] dddd [օրը ժամը] LT';
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s հետո',
      past: '%s առաջ',
      s: 'մի քանի վայրկյան',
      ss: '%d վայրկյան',
      m: 'րոպե',
      mm: '%d րոպե',
      h: 'ժամ',
      hh: '%d ժամ',
      d: 'օր',
      dd: '%d օր',
      M: 'ամիս',
      MM: '%d ամիս',
      y: 'տարի',
      yy: '%d տարի'
    },
    meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
    isPM: function (input) {
      return /^(ցերեկվա|երեկոյան)$/.test(input);
    },
    meridiem: function (hour) {
      if (hour < 4) {
        return 'գիշերվա';
      } else if (hour < 12) {
        return 'առավոտվա';
      } else if (hour < 17) {
        return 'ցերեկվա';
      } else {
        return 'երեկոյան';
      }
    },
    dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
    ordinal: function (number, period) {
      switch (period) {
        case 'DDD':
        case 'w':
        case 'W':
        case 'DDDo':
          if (number === 1) {
            return number + '-ին';
          }

          return number + '-րդ';

        default:
          return number;
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return hyAm;
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var id = moment.defineLocale('id', {
    months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des'.split('_'),
    weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
    weekdaysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
    weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat: {
      LT: 'HH.mm',
      LTS: 'HH.mm.ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY [pukul] HH.mm',
      LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|siang|sore|malam/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'pagi') {
        return hour;
      } else if (meridiem === 'siang') {
        return hour >= 11 ? hour : hour + 12;
      } else if (meridiem === 'sore' || meridiem === 'malam') {
        return hour + 12;
      }
    },
    meridiem: function (hours, minutes, isLower) {
      if (hours < 11) {
        return 'pagi';
      } else if (hours < 15) {
        return 'siang';
      } else if (hours < 19) {
        return 'sore';
      } else {
        return 'malam';
      }
    },
    calendar: {
      sameDay: '[Hari ini pukul] LT',
      nextDay: '[Besok pukul] LT',
      nextWeek: 'dddd [pukul] LT',
      lastDay: '[Kemarin pukul] LT',
      lastWeek: 'dddd [lalu pukul] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'dalam %s',
      past: '%s yang lalu',
      s: 'beberapa detik',
      ss: '%d detik',
      m: 'semenit',
      mm: '%d menit',
      h: 'sejam',
      hh: '%d jam',
      d: 'sehari',
      dd: '%d hari',
      M: 'sebulan',
      MM: '%d bulan',
      y: 'setahun',
      yy: '%d tahun'
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return id;
});

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function plural(n) {
    if (n % 100 === 11) {
      return true;
    } else if (n % 10 === 1) {
      return false;
    }

    return true;
  }

  function translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';

    switch (key) {
      case 's':
        return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';

      case 'ss':
        if (plural(number)) {
          return result + (withoutSuffix || isFuture ? 'sekúndur' : 'sekúndum');
        }

        return result + 'sekúnda';

      case 'm':
        return withoutSuffix ? 'mínúta' : 'mínútu';

      case 'mm':
        if (plural(number)) {
          return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
        } else if (withoutSuffix) {
          return result + 'mínúta';
        }

        return result + 'mínútu';

      case 'hh':
        if (plural(number)) {
          return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
        }

        return result + 'klukkustund';

      case 'd':
        if (withoutSuffix) {
          return 'dagur';
        }

        return isFuture ? 'dag' : 'degi';

      case 'dd':
        if (plural(number)) {
          if (withoutSuffix) {
            return result + 'dagar';
          }

          return result + (isFuture ? 'daga' : 'dögum');
        } else if (withoutSuffix) {
          return result + 'dagur';
        }

        return result + (isFuture ? 'dag' : 'degi');

      case 'M':
        if (withoutSuffix) {
          return 'mánuður';
        }

        return isFuture ? 'mánuð' : 'mánuði';

      case 'MM':
        if (plural(number)) {
          if (withoutSuffix) {
            return result + 'mánuðir';
          }

          return result + (isFuture ? 'mánuði' : 'mánuðum');
        } else if (withoutSuffix) {
          return result + 'mánuður';
        }

        return result + (isFuture ? 'mánuð' : 'mánuði');

      case 'y':
        return withoutSuffix || isFuture ? 'ár' : 'ári';

      case 'yy':
        if (plural(number)) {
          return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
        }

        return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
    }
  }

  var is = moment.defineLocale('is', {
    months: 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
    monthsShort: 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
    weekdays: 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
    weekdaysShort: 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
    weekdaysMin: 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY [kl.] H:mm',
      LLLL: 'dddd, D. MMMM YYYY [kl.] H:mm'
    },
    calendar: {
      sameDay: '[í dag kl.] LT',
      nextDay: '[á morgun kl.] LT',
      nextWeek: 'dddd [kl.] LT',
      lastDay: '[í gær kl.] LT',
      lastWeek: '[síðasta] dddd [kl.] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'eftir %s',
      past: 'fyrir %s síðan',
      s: translate,
      ss: translate,
      m: translate,
      mm: translate,
      h: 'klukkustund',
      hh: translate,
      d: translate,
      dd: translate,
      M: translate,
      MM: translate,
      y: translate,
      yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return is;
});

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var it = moment.defineLocale('it', {
    months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
    monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
    weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
    weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
    weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Oggi alle] LT',
      nextDay: '[Domani alle] LT',
      nextWeek: 'dddd [alle] LT',
      lastDay: '[Ieri alle] LT',
      lastWeek: function () {
        switch (this.day()) {
          case 0:
            return '[la scorsa] dddd [alle] LT';

          default:
            return '[lo scorso] dddd [alle] LT';
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: function (s) {
        return (/^[0-9].+$/.test(s) ? 'tra' : 'in') + ' ' + s;
      },
      past: '%s fa',
      s: 'alcuni secondi',
      ss: '%d secondi',
      m: 'un minuto',
      mm: '%d minuti',
      h: 'un\'ora',
      hh: '%d ore',
      d: 'un giorno',
      dd: '%d giorni',
      M: 'un mese',
      MM: '%d mesi',
      y: 'un anno',
      yy: '%d anni'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return it;
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var itCh = moment.defineLocale('it-ch', {
    months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
    monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
    weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
    weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
    weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Oggi alle] LT',
      nextDay: '[Domani alle] LT',
      nextWeek: 'dddd [alle] LT',
      lastDay: '[Ieri alle] LT',
      lastWeek: function () {
        switch (this.day()) {
          case 0:
            return '[la scorsa] dddd [alle] LT';

          default:
            return '[lo scorso] dddd [alle] LT';
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: function (s) {
        return (/^[0-9].+$/.test(s) ? 'tra' : 'in') + ' ' + s;
      },
      past: '%s fa',
      s: 'alcuni secondi',
      ss: '%d secondi',
      m: 'un minuto',
      mm: '%d minuti',
      h: 'un\'ora',
      hh: '%d ore',
      d: 'un giorno',
      dd: '%d giorni',
      M: 'un mese',
      MM: '%d mesi',
      y: 'un anno',
      yy: '%d anni'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return itCh;
});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var ja = moment.defineLocale('ja', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
    weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
    weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY年M月D日',
      LLL: 'YYYY年M月D日 HH:mm',
      LLLL: 'YYYY年M月D日 dddd HH:mm',
      l: 'YYYY/MM/DD',
      ll: 'YYYY年M月D日',
      lll: 'YYYY年M月D日 HH:mm',
      llll: 'YYYY年M月D日(ddd) HH:mm'
    },
    meridiemParse: /午前|午後/i,
    isPM: function (input) {
      return input === '午後';
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return '午前';
      } else {
        return '午後';
      }
    },
    calendar: {
      sameDay: '[今日] LT',
      nextDay: '[明日] LT',
      nextWeek: function (now) {
        if (now.week() < this.week()) {
          return '[来週]dddd LT';
        } else {
          return 'dddd LT';
        }
      },
      lastDay: '[昨日] LT',
      lastWeek: function (now) {
        if (this.week() < now.week()) {
          return '[先週]dddd LT';
        } else {
          return 'dddd LT';
        }
      },
      sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}日/,
    ordinal: function (number, period) {
      switch (period) {
        case 'd':
        case 'D':
        case 'DDD':
          return number + '日';

        default:
          return number;
      }
    },
    relativeTime: {
      future: '%s後',
      past: '%s前',
      s: '数秒',
      ss: '%d秒',
      m: '1分',
      mm: '%d分',
      h: '1時間',
      hh: '%d時間',
      d: '1日',
      dd: '%d日',
      M: '1ヶ月',
      MM: '%dヶ月',
      y: '1年',
      yy: '%d年'
    }
  });
  return ja;
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var jv = moment.defineLocale('jv', {
    months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
    weekdays: 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
    weekdaysShort: 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
    weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
    longDateFormat: {
      LT: 'HH.mm',
      LTS: 'HH.mm.ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY [pukul] HH.mm',
      LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /enjing|siyang|sonten|ndalu/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'enjing') {
        return hour;
      } else if (meridiem === 'siyang') {
        return hour >= 11 ? hour : hour + 12;
      } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
        return hour + 12;
      }
    },
    meridiem: function (hours, minutes, isLower) {
      if (hours < 11) {
        return 'enjing';
      } else if (hours < 15) {
        return 'siyang';
      } else if (hours < 19) {
        return 'sonten';
      } else {
        return 'ndalu';
      }
    },
    calendar: {
      sameDay: '[Dinten puniko pukul] LT',
      nextDay: '[Mbenjang pukul] LT',
      nextWeek: 'dddd [pukul] LT',
      lastDay: '[Kala wingi pukul] LT',
      lastWeek: 'dddd [kepengker pukul] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'wonten ing %s',
      past: '%s ingkang kepengker',
      s: 'sawetawis detik',
      ss: '%d detik',
      m: 'setunggal menit',
      mm: '%d menit',
      h: 'setunggal jam',
      hh: '%d jam',
      d: 'sedinten',
      dd: '%d dinten',
      M: 'sewulan',
      MM: '%d wulan',
      y: 'setaun',
      yy: '%d taun'
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return jv;
});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var ka = moment.defineLocale('ka', {
    months: {
      standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
      format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
    },
    monthsShort: 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
    weekdays: {
      standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
      format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
      isFormat: /(წინა|შემდეგ)/
    },
    weekdaysShort: 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
    weekdaysMin: 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY h:mm A',
      LLLL: 'dddd, D MMMM YYYY h:mm A'
    },
    calendar: {
      sameDay: '[დღეს] LT[-ზე]',
      nextDay: '[ხვალ] LT[-ზე]',
      lastDay: '[გუშინ] LT[-ზე]',
      nextWeek: '[შემდეგ] dddd LT[-ზე]',
      lastWeek: '[წინა] dddd LT-ზე',
      sameElse: 'L'
    },
    relativeTime: {
      future: function (s) {
        return /(წამი|წუთი|საათი|წელი)/.test(s) ? s.replace(/ი$/, 'ში') : s + 'ში';
      },
      past: function (s) {
        if (/(წამი|წუთი|საათი|დღე|თვე)/.test(s)) {
          return s.replace(/(ი|ე)$/, 'ის წინ');
        }

        if (/წელი/.test(s)) {
          return s.replace(/წელი$/, 'წლის წინ');
        }
      },
      s: 'რამდენიმე წამი',
      ss: '%d წამი',
      m: 'წუთი',
      mm: '%d წუთი',
      h: 'საათი',
      hh: '%d საათი',
      d: 'დღე',
      dd: '%d დღე',
      M: 'თვე',
      MM: '%d თვე',
      y: 'წელი',
      yy: '%d წელი'
    },
    dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
    ordinal: function (number) {
      if (number === 0) {
        return number;
      }

      if (number === 1) {
        return number + '-ლი';
      }

      if (number < 20 || number <= 100 && number % 20 === 0 || number % 100 === 0) {
        return 'მე-' + number;
      }

      return number + '-ე';
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
  return ka;
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var suffixes = {
    0: '-ші',
    1: '-ші',
    2: '-ші',
    3: '-ші',
    4: '-ші',
    5: '-ші',
    6: '-шы',
    7: '-ші',
    8: '-ші',
    9: '-шы',
    10: '-шы',
    20: '-шы',
    30: '-шы',
    40: '-шы',
    50: '-ші',
    60: '-шы',
    70: '-ші',
    80: '-ші',
    90: '-шы',
    100: '-ші'
  };
  var kk = moment.defineLocale('kk', {
    months: 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
    monthsShort: 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
    weekdays: 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
    weekdaysShort: 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
    weekdaysMin: 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Бүгін сағат] LT',
      nextDay: '[Ертең сағат] LT',
      nextWeek: 'dddd [сағат] LT',
      lastDay: '[Кеше сағат] LT',
      lastWeek: '[Өткен аптаның] dddd [сағат] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s ішінде',
      past: '%s бұрын',
      s: 'бірнеше секунд',
      ss: '%d секунд',
      m: 'бір минут',
      mm: '%d минут',
      h: 'бір сағат',
      hh: '%d сағат',
      d: 'бір күн',
      dd: '%d күн',
      M: 'бір ай',
      MM: '%d ай',
      y: 'бір жыл',
      yy: '%d жыл'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
    ordinal: function (number) {
      var a = number % 10,
          b = number >= 100 ? 100 : null;
      return number + (suffixes[number] || suffixes[a] || suffixes[b]);
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return kk;
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '១',
    '2': '២',
    '3': '៣',
    '4': '៤',
    '5': '៥',
    '6': '៦',
    '7': '៧',
    '8': '៨',
    '9': '៩',
    '0': '០'
  },
      numberMap = {
    '១': '1',
    '២': '2',
    '៣': '3',
    '៤': '4',
    '៥': '5',
    '៦': '6',
    '៧': '7',
    '៨': '8',
    '៩': '9',
    '០': '0'
  };
  var km = moment.defineLocale('km', {
    months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
    monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
    weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
    weekdaysShort: 'អា_ច_អ_ព_ព្រ_សុ_ស'.split('_'),
    weekdaysMin: 'អា_ច_អ_ព_ព្រ_សុ_ស'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    meridiemParse: /ព្រឹក|ល្ងាច/,
    isPM: function (input) {
      return input === 'ល្ងាច';
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return 'ព្រឹក';
      } else {
        return 'ល្ងាច';
      }
    },
    calendar: {
      sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
      nextDay: '[ស្អែក ម៉ោង] LT',
      nextWeek: 'dddd [ម៉ោង] LT',
      lastDay: '[ម្សិលមិញ ម៉ោង] LT',
      lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%sទៀត',
      past: '%sមុន',
      s: 'ប៉ុន្មានវិនាទី',
      ss: '%d វិនាទី',
      m: 'មួយនាទី',
      mm: '%d នាទី',
      h: 'មួយម៉ោង',
      hh: '%d ម៉ោង',
      d: 'មួយថ្ងៃ',
      dd: '%d ថ្ងៃ',
      M: 'មួយខែ',
      MM: '%d ខែ',
      y: 'មួយឆ្នាំ',
      yy: '%d ឆ្នាំ'
    },
    dayOfMonthOrdinalParse: /ទី\d{1,2}/,
    ordinal: 'ទី%d',
    preparse: function (string) {
      return string.replace(/[១២៣៤៥៦៧៨៩០]/g, function (match) {
        return numberMap[match];
      });
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      });
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return km;
});

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '೧',
    '2': '೨',
    '3': '೩',
    '4': '೪',
    '5': '೫',
    '6': '೬',
    '7': '೭',
    '8': '೮',
    '9': '೯',
    '0': '೦'
  },
      numberMap = {
    '೧': '1',
    '೨': '2',
    '೩': '3',
    '೪': '4',
    '೫': '5',
    '೬': '6',
    '೭': '7',
    '೮': '8',
    '೯': '9',
    '೦': '0'
  };
  var kn = moment.defineLocale('kn', {
    months: 'ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್'.split('_'),
    monthsShort: 'ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ'.split('_'),
    monthsParseExact: true,
    weekdays: 'ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ'.split('_'),
    weekdaysShort: 'ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ'.split('_'),
    weekdaysMin: 'ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ'.split('_'),
    longDateFormat: {
      LT: 'A h:mm',
      LTS: 'A h:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY, A h:mm',
      LLLL: 'dddd, D MMMM YYYY, A h:mm'
    },
    calendar: {
      sameDay: '[ಇಂದು] LT',
      nextDay: '[ನಾಳೆ] LT',
      nextWeek: 'dddd, LT',
      lastDay: '[ನಿನ್ನೆ] LT',
      lastWeek: '[ಕೊನೆಯ] dddd, LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s ನಂತರ',
      past: '%s ಹಿಂದೆ',
      s: 'ಕೆಲವು ಕ್ಷಣಗಳು',
      ss: '%d ಸೆಕೆಂಡುಗಳು',
      m: 'ಒಂದು ನಿಮಿಷ',
      mm: '%d ನಿಮಿಷ',
      h: 'ಒಂದು ಗಂಟೆ',
      hh: '%d ಗಂಟೆ',
      d: 'ಒಂದು ದಿನ',
      dd: '%d ದಿನ',
      M: 'ಒಂದು ತಿಂಗಳು',
      MM: '%d ತಿಂಗಳು',
      y: 'ಒಂದು ವರ್ಷ',
      yy: '%d ವರ್ಷ'
    },
    preparse: function (string) {
      return string.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, function (match) {
        return numberMap[match];
      });
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      });
    },
    meridiemParse: /ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'ರಾತ್ರಿ') {
        return hour < 4 ? hour : hour + 12;
      } else if (meridiem === 'ಬೆಳಿಗ್ಗೆ') {
        return hour;
      } else if (meridiem === 'ಮಧ್ಯಾಹ್ನ') {
        return hour >= 10 ? hour : hour + 12;
      } else if (meridiem === 'ಸಂಜೆ') {
        return hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'ರಾತ್ರಿ';
      } else if (hour < 10) {
        return 'ಬೆಳಿಗ್ಗೆ';
      } else if (hour < 17) {
        return 'ಮಧ್ಯಾಹ್ನ';
      } else if (hour < 20) {
        return 'ಸಂಜೆ';
      } else {
        return 'ರಾತ್ರಿ';
      }
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/,
    ordinal: function (number) {
      return number + 'ನೇ';
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6 // The week that contains Jan 6th is the first week of the year.

    }
  });
  return kn;
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var ko = moment.defineLocale('ko', {
    months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
    monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
    weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
    weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
    weekdaysMin: '일_월_화_수_목_금_토'.split('_'),
    longDateFormat: {
      LT: 'A h:mm',
      LTS: 'A h:mm:ss',
      L: 'YYYY.MM.DD.',
      LL: 'YYYY년 MMMM D일',
      LLL: 'YYYY년 MMMM D일 A h:mm',
      LLLL: 'YYYY년 MMMM D일 dddd A h:mm',
      l: 'YYYY.MM.DD.',
      ll: 'YYYY년 MMMM D일',
      lll: 'YYYY년 MMMM D일 A h:mm',
      llll: 'YYYY년 MMMM D일 dddd A h:mm'
    },
    calendar: {
      sameDay: '오늘 LT',
      nextDay: '내일 LT',
      nextWeek: 'dddd LT',
      lastDay: '어제 LT',
      lastWeek: '지난주 dddd LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s 후',
      past: '%s 전',
      s: '몇 초',
      ss: '%d초',
      m: '1분',
      mm: '%d분',
      h: '한 시간',
      hh: '%d시간',
      d: '하루',
      dd: '%d일',
      M: '한 달',
      MM: '%d달',
      y: '일 년',
      yy: '%d년'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(일|월|주)/,
    ordinal: function (number, period) {
      switch (period) {
        case 'd':
        case 'D':
        case 'DDD':
          return number + '일';

        case 'M':
          return number + '월';

        case 'w':
        case 'W':
          return number + '주';

        default:
          return number;
      }
    },
    meridiemParse: /오전|오후/,
    isPM: function (token) {
      return token === '오후';
    },
    meridiem: function (hour, minute, isUpper) {
      return hour < 12 ? '오전' : '오후';
    }
  });
  return ko;
});

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    '0': '٠'
  },
      numberMap = {
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    '٠': '0'
  },
      months = ['کانونی دووەم', 'شوبات', 'ئازار', 'نیسان', 'ئایار', 'حوزەیران', 'تەمموز', 'ئاب', 'ئەیلوول', 'تشرینی یەكەم', 'تشرینی دووەم', 'كانونی یەکەم'];
  var ku = moment.defineLocale('ku', {
    months: months,
    monthsShort: months,
    weekdays: 'یه‌كشه‌ممه‌_دووشه‌ممه‌_سێشه‌ممه‌_چوارشه‌ممه‌_پێنجشه‌ممه‌_هه‌ینی_شه‌ممه‌'.split('_'),
    weekdaysShort: 'یه‌كشه‌م_دووشه‌م_سێشه‌م_چوارشه‌م_پێنجشه‌م_هه‌ینی_شه‌ممه‌'.split('_'),
    weekdaysMin: 'ی_د_س_چ_پ_ه_ش'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    meridiemParse: /ئێواره‌|به‌یانی/,
    isPM: function (input) {
      return /ئێواره‌/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return 'به‌یانی';
      } else {
        return 'ئێواره‌';
      }
    },
    calendar: {
      sameDay: '[ئه‌مرۆ كاتژمێر] LT',
      nextDay: '[به‌یانی كاتژمێر] LT',
      nextWeek: 'dddd [كاتژمێر] LT',
      lastDay: '[دوێنێ كاتژمێر] LT',
      lastWeek: 'dddd [كاتژمێر] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'له‌ %s',
      past: '%s',
      s: 'چه‌ند چركه‌یه‌ك',
      ss: 'چركه‌ %d',
      m: 'یه‌ك خوله‌ك',
      mm: '%d خوله‌ك',
      h: 'یه‌ك كاتژمێر',
      hh: '%d كاتژمێر',
      d: 'یه‌ك ڕۆژ',
      dd: '%d ڕۆژ',
      M: 'یه‌ك مانگ',
      MM: '%d مانگ',
      y: 'یه‌ك ساڵ',
      yy: '%d ساڵ'
    },
    preparse: function (string) {
      return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
        return numberMap[match];
      }).replace(/،/g, ',');
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      }).replace(/,/g, '،');
    },
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12 // The week that contains Jan 12th is the first week of the year.

    }
  });
  return ku;
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var suffixes = {
    0: '-чү',
    1: '-чи',
    2: '-чи',
    3: '-чү',
    4: '-чү',
    5: '-чи',
    6: '-чы',
    7: '-чи',
    8: '-чи',
    9: '-чу',
    10: '-чу',
    20: '-чы',
    30: '-чу',
    40: '-чы',
    50: '-чү',
    60: '-чы',
    70: '-чи',
    80: '-чи',
    90: '-чу',
    100: '-чү'
  };
  var ky = moment.defineLocale('ky', {
    months: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
    monthsShort: 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
    weekdays: 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
    weekdaysShort: 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
    weekdaysMin: 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Бүгүн саат] LT',
      nextDay: '[Эртең саат] LT',
      nextWeek: 'dddd [саат] LT',
      lastDay: '[Кечээ саат] LT',
      lastWeek: '[Өткөн аптанын] dddd [күнү] [саат] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s ичинде',
      past: '%s мурун',
      s: 'бирнече секунд',
      ss: '%d секунд',
      m: 'бир мүнөт',
      mm: '%d мүнөт',
      h: 'бир саат',
      hh: '%d саат',
      d: 'бир күн',
      dd: '%d күн',
      M: 'бир ай',
      MM: '%d ай',
      y: 'бир жыл',
      yy: '%d жыл'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
    ordinal: function (number) {
      var a = number % 10,
          b = number >= 100 ? 100 : null;
      return number + (suffixes[number] || suffixes[a] || suffixes[b]);
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return ky;
});

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
      'm': ['eng Minutt', 'enger Minutt'],
      'h': ['eng Stonn', 'enger Stonn'],
      'd': ['een Dag', 'engem Dag'],
      'M': ['ee Mount', 'engem Mount'],
      'y': ['ee Joer', 'engem Joer']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
  }

  function processFutureTime(string) {
    var number = string.substr(0, string.indexOf(' '));

    if (eifelerRegelAppliesToNumber(number)) {
      return 'a ' + string;
    }

    return 'an ' + string;
  }

  function processPastTime(string) {
    var number = string.substr(0, string.indexOf(' '));

    if (eifelerRegelAppliesToNumber(number)) {
      return 'viru ' + string;
    }

    return 'virun ' + string;
  }
  /**
   * Returns true if the word before the given number loses the '-n' ending.
   * e.g. 'an 10 Deeg' but 'a 5 Deeg'
   *
   * @param number {integer}
   * @returns {boolean}
   */


  function eifelerRegelAppliesToNumber(number) {
    number = parseInt(number, 10);

    if (isNaN(number)) {
      return false;
    }

    if (number < 0) {
      // Negative Number --> always true
      return true;
    } else if (number < 10) {
      // Only 1 digit
      if (4 <= number && number <= 7) {
        return true;
      }

      return false;
    } else if (number < 100) {
      // 2 digits
      var lastDigit = number % 10,
          firstDigit = number / 10;

      if (lastDigit === 0) {
        return eifelerRegelAppliesToNumber(firstDigit);
      }

      return eifelerRegelAppliesToNumber(lastDigit);
    } else if (number < 10000) {
      // 3 or 4 digits --> recursively check first digit
      while (number >= 10) {
        number = number / 10;
      }

      return eifelerRegelAppliesToNumber(number);
    } else {
      // Anything larger than 4 digits: recursively check first n-3 digits
      number = number / 1000;
      return eifelerRegelAppliesToNumber(number);
    }
  }

  var lb = moment.defineLocale('lb', {
    months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
    monthsParseExact: true,
    weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
    weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm [Auer]',
      LTS: 'H:mm:ss [Auer]',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY H:mm [Auer]',
      LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
    },
    calendar: {
      sameDay: '[Haut um] LT',
      sameElse: 'L',
      nextDay: '[Muer um] LT',
      nextWeek: 'dddd [um] LT',
      lastDay: '[Gëschter um] LT',
      lastWeek: function () {
        // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
        switch (this.day()) {
          case 2:
          case 4:
            return '[Leschten] dddd [um] LT';

          default:
            return '[Leschte] dddd [um] LT';
        }
      }
    },
    relativeTime: {
      future: processFutureTime,
      past: processPastTime,
      s: 'e puer Sekonnen',
      ss: '%d Sekonnen',
      m: processRelativeTime,
      mm: '%d Minutten',
      h: processRelativeTime,
      hh: '%d Stonnen',
      d: processRelativeTime,
      dd: '%d Deeg',
      M: processRelativeTime,
      MM: '%d Méint',
      y: processRelativeTime,
      yy: '%d Joer'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return lb;
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var lo = moment.defineLocale('lo', {
    months: 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
    monthsShort: 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
    weekdays: 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
    weekdaysShort: 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
    weekdaysMin: 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'ວັນdddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
    isPM: function (input) {
      return input === 'ຕອນແລງ';
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return 'ຕອນເຊົ້າ';
      } else {
        return 'ຕອນແລງ';
      }
    },
    calendar: {
      sameDay: '[ມື້ນີ້ເວລາ] LT',
      nextDay: '[ມື້ອື່ນເວລາ] LT',
      nextWeek: '[ວັນ]dddd[ໜ້າເວລາ] LT',
      lastDay: '[ມື້ວານນີ້ເວລາ] LT',
      lastWeek: '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'ອີກ %s',
      past: '%sຜ່ານມາ',
      s: 'ບໍ່ເທົ່າໃດວິນາທີ',
      ss: '%d ວິນາທີ',
      m: '1 ນາທີ',
      mm: '%d ນາທີ',
      h: '1 ຊົ່ວໂມງ',
      hh: '%d ຊົ່ວໂມງ',
      d: '1 ມື້',
      dd: '%d ມື້',
      M: '1 ເດືອນ',
      MM: '%d ເດືອນ',
      y: '1 ປີ',
      yy: '%d ປີ'
    },
    dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/,
    ordinal: function (number) {
      return 'ທີ່' + number;
    }
  });
  return lo;
});

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var units = {
    'ss': 'sekundė_sekundžių_sekundes',
    'm': 'minutė_minutės_minutę',
    'mm': 'minutės_minučių_minutes',
    'h': 'valanda_valandos_valandą',
    'hh': 'valandos_valandų_valandas',
    'd': 'diena_dienos_dieną',
    'dd': 'dienos_dienų_dienas',
    'M': 'mėnuo_mėnesio_mėnesį',
    'MM': 'mėnesiai_mėnesių_mėnesius',
    'y': 'metai_metų_metus',
    'yy': 'metai_metų_metus'
  };

  function translateSeconds(number, withoutSuffix, key, isFuture) {
    if (withoutSuffix) {
      return 'kelios sekundės';
    } else {
      return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
    }
  }

  function translateSingular(number, withoutSuffix, key, isFuture) {
    return withoutSuffix ? forms(key)[0] : isFuture ? forms(key)[1] : forms(key)[2];
  }

  function special(number) {
    return number % 10 === 0 || number > 10 && number < 20;
  }

  function forms(key) {
    return units[key].split('_');
  }

  function translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';

    if (number === 1) {
      return result + translateSingular(number, withoutSuffix, key[0], isFuture);
    } else if (withoutSuffix) {
      return result + (special(number) ? forms(key)[1] : forms(key)[0]);
    } else {
      if (isFuture) {
        return result + forms(key)[1];
      } else {
        return result + (special(number) ? forms(key)[1] : forms(key)[2]);
      }
    }
  }

  var lt = moment.defineLocale('lt', {
    months: {
      format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
      standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'),
      isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
    },
    monthsShort: 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
    weekdays: {
      format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
      standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
      isFormat: /dddd HH:mm/
    },
    weekdaysShort: 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
    weekdaysMin: 'S_P_A_T_K_Pn_Š'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY-MM-DD',
      LL: 'YYYY [m.] MMMM D [d.]',
      LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
      LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
      l: 'YYYY-MM-DD',
      ll: 'YYYY [m.] MMMM D [d.]',
      lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
      llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
    },
    calendar: {
      sameDay: '[Šiandien] LT',
      nextDay: '[Rytoj] LT',
      nextWeek: 'dddd LT',
      lastDay: '[Vakar] LT',
      lastWeek: '[Praėjusį] dddd LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'po %s',
      past: 'prieš %s',
      s: translateSeconds,
      ss: translate,
      m: translateSingular,
      mm: translate,
      h: translateSingular,
      hh: translate,
      d: translateSingular,
      dd: translate,
      M: translateSingular,
      MM: translate,
      y: translateSingular,
      yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}-oji/,
    ordinal: function (number) {
      return number + '-oji';
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return lt;
});

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var units = {
    'ss': 'sekundes_sekundēm_sekunde_sekundes'.split('_'),
    'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
    'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
    'h': 'stundas_stundām_stunda_stundas'.split('_'),
    'hh': 'stundas_stundām_stunda_stundas'.split('_'),
    'd': 'dienas_dienām_diena_dienas'.split('_'),
    'dd': 'dienas_dienām_diena_dienas'.split('_'),
    'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
    'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
    'y': 'gada_gadiem_gads_gadi'.split('_'),
    'yy': 'gada_gadiem_gads_gadi'.split('_')
  };
  /**
   * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
   */

  function format(forms, number, withoutSuffix) {
    if (withoutSuffix) {
      // E.g. "21 minūte", "3 minūtes".
      return number % 10 === 1 && number % 100 !== 11 ? forms[2] : forms[3];
    } else {
      // E.g. "21 minūtes" as in "pēc 21 minūtes".
      // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
      return number % 10 === 1 && number % 100 !== 11 ? forms[0] : forms[1];
    }
  }

  function relativeTimeWithPlural(number, withoutSuffix, key) {
    return number + ' ' + format(units[key], number, withoutSuffix);
  }

  function relativeTimeWithSingular(number, withoutSuffix, key) {
    return format(units[key], number, withoutSuffix);
  }

  function relativeSeconds(number, withoutSuffix) {
    return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
  }

  var lv = moment.defineLocale('lv', {
    months: 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
    monthsShort: 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
    weekdays: 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
    weekdaysShort: 'Sv_P_O_T_C_Pk_S'.split('_'),
    weekdaysMin: 'Sv_P_O_T_C_Pk_S'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY.',
      LL: 'YYYY. [gada] D. MMMM',
      LLL: 'YYYY. [gada] D. MMMM, HH:mm',
      LLLL: 'YYYY. [gada] D. MMMM, dddd, HH:mm'
    },
    calendar: {
      sameDay: '[Šodien pulksten] LT',
      nextDay: '[Rīt pulksten] LT',
      nextWeek: 'dddd [pulksten] LT',
      lastDay: '[Vakar pulksten] LT',
      lastWeek: '[Pagājušā] dddd [pulksten] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'pēc %s',
      past: 'pirms %s',
      s: relativeSeconds,
      ss: relativeTimeWithPlural,
      m: relativeTimeWithSingular,
      mm: relativeTimeWithPlural,
      h: relativeTimeWithSingular,
      hh: relativeTimeWithPlural,
      d: relativeTimeWithSingular,
      dd: relativeTimeWithPlural,
      M: relativeTimeWithSingular,
      MM: relativeTimeWithPlural,
      y: relativeTimeWithSingular,
      yy: relativeTimeWithPlural
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return lv;
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var translator = {
    words: {
      //Different grammatical cases
      ss: ['sekund', 'sekunda', 'sekundi'],
      m: ['jedan minut', 'jednog minuta'],
      mm: ['minut', 'minuta', 'minuta'],
      h: ['jedan sat', 'jednog sata'],
      hh: ['sat', 'sata', 'sati'],
      dd: ['dan', 'dana', 'dana'],
      MM: ['mjesec', 'mjeseca', 'mjeseci'],
      yy: ['godina', 'godine', 'godina']
    },
    correctGrammaticalCase: function (number, wordKey) {
      return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
    },
    translate: function (number, withoutSuffix, key) {
      var wordKey = translator.words[key];

      if (key.length === 1) {
        return withoutSuffix ? wordKey[0] : wordKey[1];
      } else {
        return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
      }
    }
  };
  var me = moment.defineLocale('me', {
    months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
    monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
    weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY H:mm',
      LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
      sameDay: '[danas u] LT',
      nextDay: '[sjutra u] LT',
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return '[u] [nedjelju] [u] LT';

          case 3:
            return '[u] [srijedu] [u] LT';

          case 6:
            return '[u] [subotu] [u] LT';

          case 1:
          case 2:
          case 4:
          case 5:
            return '[u] dddd [u] LT';
        }
      },
      lastDay: '[juče u] LT',
      lastWeek: function () {
        var lastWeekDays = ['[prošle] [nedjelje] [u] LT', '[prošlog] [ponedjeljka] [u] LT', '[prošlog] [utorka] [u] LT', '[prošle] [srijede] [u] LT', '[prošlog] [četvrtka] [u] LT', '[prošlog] [petka] [u] LT', '[prošle] [subote] [u] LT'];
        return lastWeekDays[this.day()];
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'za %s',
      past: 'prije %s',
      s: 'nekoliko sekundi',
      ss: translator.translate,
      m: translator.translate,
      mm: translator.translate,
      h: translator.translate,
      hh: translator.translate,
      d: 'dan',
      dd: translator.translate,
      M: 'mjesec',
      MM: translator.translate,
      y: 'godinu',
      yy: translator.translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return me;
});

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var mi = moment.defineLocale('mi', {
    months: 'Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea'.split('_'),
    monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split('_'),
    monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
    monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
    monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
    monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
    weekdays: 'Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei'.split('_'),
    weekdaysShort: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
    weekdaysMin: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY [i] HH:mm',
      LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
    },
    calendar: {
      sameDay: '[i teie mahana, i] LT',
      nextDay: '[apopo i] LT',
      nextWeek: 'dddd [i] LT',
      lastDay: '[inanahi i] LT',
      lastWeek: 'dddd [whakamutunga i] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'i roto i %s',
      past: '%s i mua',
      s: 'te hēkona ruarua',
      ss: '%d hēkona',
      m: 'he meneti',
      mm: '%d meneti',
      h: 'te haora',
      hh: '%d haora',
      d: 'he ra',
      dd: '%d ra',
      M: 'he marama',
      MM: '%d marama',
      y: 'he tau',
      yy: '%d tau'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return mi;
});

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var mk = moment.defineLocale('mk', {
    months: 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
    monthsShort: 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
    weekdays: 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
    weekdaysShort: 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
    weekdaysMin: 'нe_пo_вт_ср_че_пе_сa'.split('_'),
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'D.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY H:mm',
      LLLL: 'dddd, D MMMM YYYY H:mm'
    },
    calendar: {
      sameDay: '[Денес во] LT',
      nextDay: '[Утре во] LT',
      nextWeek: '[Во] dddd [во] LT',
      lastDay: '[Вчера во] LT',
      lastWeek: function () {
        switch (this.day()) {
          case 0:
          case 3:
          case 6:
            return '[Изминатата] dddd [во] LT';

          case 1:
          case 2:
          case 4:
          case 5:
            return '[Изминатиот] dddd [во] LT';
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'после %s',
      past: 'пред %s',
      s: 'неколку секунди',
      ss: '%d секунди',
      m: 'минута',
      mm: '%d минути',
      h: 'час',
      hh: '%d часа',
      d: 'ден',
      dd: '%d дена',
      M: 'месец',
      MM: '%d месеци',
      y: 'година',
      yy: '%d години'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
    ordinal: function (number) {
      var lastDigit = number % 10,
          last2Digits = number % 100;

      if (number === 0) {
        return number + '-ев';
      } else if (last2Digits === 0) {
        return number + '-ен';
      } else if (last2Digits > 10 && last2Digits < 20) {
        return number + '-ти';
      } else if (lastDigit === 1) {
        return number + '-ви';
      } else if (lastDigit === 2) {
        return number + '-ри';
      } else if (lastDigit === 7 || lastDigit === 8) {
        return number + '-ми';
      } else {
        return number + '-ти';
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return mk;
});

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var ml = moment.defineLocale('ml', {
    months: 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
    monthsShort: 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
    monthsParseExact: true,
    weekdays: 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
    weekdaysShort: 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
    weekdaysMin: 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
    longDateFormat: {
      LT: 'A h:mm -നു',
      LTS: 'A h:mm:ss -നു',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY, A h:mm -നു',
      LLLL: 'dddd, D MMMM YYYY, A h:mm -നു'
    },
    calendar: {
      sameDay: '[ഇന്ന്] LT',
      nextDay: '[നാളെ] LT',
      nextWeek: 'dddd, LT',
      lastDay: '[ഇന്നലെ] LT',
      lastWeek: '[കഴിഞ്ഞ] dddd, LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s കഴിഞ്ഞ്',
      past: '%s മുൻപ്',
      s: 'അൽപ നിമിഷങ്ങൾ',
      ss: '%d സെക്കൻഡ്',
      m: 'ഒരു മിനിറ്റ്',
      mm: '%d മിനിറ്റ്',
      h: 'ഒരു മണിക്കൂർ',
      hh: '%d മണിക്കൂർ',
      d: 'ഒരു ദിവസം',
      dd: '%d ദിവസം',
      M: 'ഒരു മാസം',
      MM: '%d മാസം',
      y: 'ഒരു വർഷം',
      yy: '%d വർഷം'
    },
    meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'രാത്രി' && hour >= 4 || meridiem === 'ഉച്ച കഴിഞ്ഞ്' || meridiem === 'വൈകുന്നേരം') {
        return hour + 12;
      } else {
        return hour;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'രാത്രി';
      } else if (hour < 12) {
        return 'രാവിലെ';
      } else if (hour < 17) {
        return 'ഉച്ച കഴിഞ്ഞ്';
      } else if (hour < 20) {
        return 'വൈകുന്നേരം';
      } else {
        return 'രാത്രി';
      }
    }
  });
  return ml;
});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function translate(number, withoutSuffix, key, isFuture) {
    switch (key) {
      case 's':
        return withoutSuffix ? 'хэдхэн секунд' : 'хэдхэн секундын';

      case 'ss':
        return number + (withoutSuffix ? ' секунд' : ' секундын');

      case 'm':
      case 'mm':
        return number + (withoutSuffix ? ' минут' : ' минутын');

      case 'h':
      case 'hh':
        return number + (withoutSuffix ? ' цаг' : ' цагийн');

      case 'd':
      case 'dd':
        return number + (withoutSuffix ? ' өдөр' : ' өдрийн');

      case 'M':
      case 'MM':
        return number + (withoutSuffix ? ' сар' : ' сарын');

      case 'y':
      case 'yy':
        return number + (withoutSuffix ? ' жил' : ' жилийн');

      default:
        return number;
    }
  }

  var mn = moment.defineLocale('mn', {
    months: 'Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар'.split('_'),
    monthsShort: '1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар'.split('_'),
    monthsParseExact: true,
    weekdays: 'Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба'.split('_'),
    weekdaysShort: 'Ням_Дав_Мяг_Лха_Пүр_Баа_Бям'.split('_'),
    weekdaysMin: 'Ня_Да_Мя_Лх_Пү_Ба_Бя'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY-MM-DD',
      LL: 'YYYY оны MMMMын D',
      LLL: 'YYYY оны MMMMын D HH:mm',
      LLLL: 'dddd, YYYY оны MMMMын D HH:mm'
    },
    meridiemParse: /ҮӨ|ҮХ/i,
    isPM: function (input) {
      return input === 'ҮХ';
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return 'ҮӨ';
      } else {
        return 'ҮХ';
      }
    },
    calendar: {
      sameDay: '[Өнөөдөр] LT',
      nextDay: '[Маргааш] LT',
      nextWeek: '[Ирэх] dddd LT',
      lastDay: '[Өчигдөр] LT',
      lastWeek: '[Өнгөрсөн] dddd LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s дараа',
      past: '%s өмнө',
      s: translate,
      ss: translate,
      m: translate,
      mm: translate,
      h: translate,
      hh: translate,
      d: translate,
      dd: translate,
      M: translate,
      MM: translate,
      y: translate,
      yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2} өдөр/,
    ordinal: function (number, period) {
      switch (period) {
        case 'd':
        case 'D':
        case 'DDD':
          return number + ' өдөр';

        default:
          return number;
      }
    }
  });
  return mn;
});

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
    '0': '०'
  },
      numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
  };

  function relativeTimeMr(number, withoutSuffix, string, isFuture) {
    var output = '';

    if (withoutSuffix) {
      switch (string) {
        case 's':
          output = 'काही सेकंद';
          break;

        case 'ss':
          output = '%d सेकंद';
          break;

        case 'm':
          output = 'एक मिनिट';
          break;

        case 'mm':
          output = '%d मिनिटे';
          break;

        case 'h':
          output = 'एक तास';
          break;

        case 'hh':
          output = '%d तास';
          break;

        case 'd':
          output = 'एक दिवस';
          break;

        case 'dd':
          output = '%d दिवस';
          break;

        case 'M':
          output = 'एक महिना';
          break;

        case 'MM':
          output = '%d महिने';
          break;

        case 'y':
          output = 'एक वर्ष';
          break;

        case 'yy':
          output = '%d वर्षे';
          break;
      }
    } else {
      switch (string) {
        case 's':
          output = 'काही सेकंदां';
          break;

        case 'ss':
          output = '%d सेकंदां';
          break;

        case 'm':
          output = 'एका मिनिटा';
          break;

        case 'mm':
          output = '%d मिनिटां';
          break;

        case 'h':
          output = 'एका तासा';
          break;

        case 'hh':
          output = '%d तासां';
          break;

        case 'd':
          output = 'एका दिवसा';
          break;

        case 'dd':
          output = '%d दिवसां';
          break;

        case 'M':
          output = 'एका महिन्या';
          break;

        case 'MM':
          output = '%d महिन्यां';
          break;

        case 'y':
          output = 'एका वर्षा';
          break;

        case 'yy':
          output = '%d वर्षां';
          break;
      }
    }

    return output.replace(/%d/i, number);
  }

  var mr = moment.defineLocale('mr', {
    months: 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
    monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
    monthsParseExact: true,
    weekdays: 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
    weekdaysShort: 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
    weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
    longDateFormat: {
      LT: 'A h:mm वाजता',
      LTS: 'A h:mm:ss वाजता',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY, A h:mm वाजता',
      LLLL: 'dddd, D MMMM YYYY, A h:mm वाजता'
    },
    calendar: {
      sameDay: '[आज] LT',
      nextDay: '[उद्या] LT',
      nextWeek: 'dddd, LT',
      lastDay: '[काल] LT',
      lastWeek: '[मागील] dddd, LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%sमध्ये',
      past: '%sपूर्वी',
      s: relativeTimeMr,
      ss: relativeTimeMr,
      m: relativeTimeMr,
      mm: relativeTimeMr,
      h: relativeTimeMr,
      hh: relativeTimeMr,
      d: relativeTimeMr,
      dd: relativeTimeMr,
      M: relativeTimeMr,
      MM: relativeTimeMr,
      y: relativeTimeMr,
      yy: relativeTimeMr
    },
    preparse: function (string) {
      return string.replace(/[१२३४५६७८९०]/g, function (match) {
        return numberMap[match];
      });
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      });
    },
    meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'रात्री') {
        return hour < 4 ? hour : hour + 12;
      } else if (meridiem === 'सकाळी') {
        return hour;
      } else if (meridiem === 'दुपारी') {
        return hour >= 10 ? hour : hour + 12;
      } else if (meridiem === 'सायंकाळी') {
        return hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'रात्री';
      } else if (hour < 10) {
        return 'सकाळी';
      } else if (hour < 17) {
        return 'दुपारी';
      } else if (hour < 20) {
        return 'सायंकाळी';
      } else {
        return 'रात्री';
      }
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6 // The week that contains Jan 6th is the first week of the year.

    }
  });
  return mr;
});

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var ms = moment.defineLocale('ms', {
    months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
    monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
    weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
    weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
    weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat: {
      LT: 'HH.mm',
      LTS: 'HH.mm.ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY [pukul] HH.mm',
      LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|tengahari|petang|malam/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'pagi') {
        return hour;
      } else if (meridiem === 'tengahari') {
        return hour >= 11 ? hour : hour + 12;
      } else if (meridiem === 'petang' || meridiem === 'malam') {
        return hour + 12;
      }
    },
    meridiem: function (hours, minutes, isLower) {
      if (hours < 11) {
        return 'pagi';
      } else if (hours < 15) {
        return 'tengahari';
      } else if (hours < 19) {
        return 'petang';
      } else {
        return 'malam';
      }
    },
    calendar: {
      sameDay: '[Hari ini pukul] LT',
      nextDay: '[Esok pukul] LT',
      nextWeek: 'dddd [pukul] LT',
      lastDay: '[Kelmarin pukul] LT',
      lastWeek: 'dddd [lepas pukul] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'dalam %s',
      past: '%s yang lepas',
      s: 'beberapa saat',
      ss: '%d saat',
      m: 'seminit',
      mm: '%d minit',
      h: 'sejam',
      hh: '%d jam',
      d: 'sehari',
      dd: '%d hari',
      M: 'sebulan',
      MM: '%d bulan',
      y: 'setahun',
      yy: '%d tahun'
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return ms;
});

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var msMy = moment.defineLocale('ms-my', {
    months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
    monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
    weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
    weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
    weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat: {
      LT: 'HH.mm',
      LTS: 'HH.mm.ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY [pukul] HH.mm',
      LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|tengahari|petang|malam/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'pagi') {
        return hour;
      } else if (meridiem === 'tengahari') {
        return hour >= 11 ? hour : hour + 12;
      } else if (meridiem === 'petang' || meridiem === 'malam') {
        return hour + 12;
      }
    },
    meridiem: function (hours, minutes, isLower) {
      if (hours < 11) {
        return 'pagi';
      } else if (hours < 15) {
        return 'tengahari';
      } else if (hours < 19) {
        return 'petang';
      } else {
        return 'malam';
      }
    },
    calendar: {
      sameDay: '[Hari ini pukul] LT',
      nextDay: '[Esok pukul] LT',
      nextWeek: 'dddd [pukul] LT',
      lastDay: '[Kelmarin pukul] LT',
      lastWeek: 'dddd [lepas pukul] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'dalam %s',
      past: '%s yang lepas',
      s: 'beberapa saat',
      ss: '%d saat',
      m: 'seminit',
      mm: '%d minit',
      h: 'sejam',
      hh: '%d jam',
      d: 'sehari',
      dd: '%d hari',
      M: 'sebulan',
      MM: '%d bulan',
      y: 'setahun',
      yy: '%d tahun'
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return msMy;
});

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var mt = moment.defineLocale('mt', {
    months: 'Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru'.split('_'),
    monthsShort: 'Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ'.split('_'),
    weekdays: 'Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt'.split('_'),
    weekdaysShort: 'Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib'.split('_'),
    weekdaysMin: 'Ħa_Tn_Tl_Er_Ħa_Ġi_Si'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Illum fil-]LT',
      nextDay: '[Għada fil-]LT',
      nextWeek: 'dddd [fil-]LT',
      lastDay: '[Il-bieraħ fil-]LT',
      lastWeek: 'dddd [li għadda] [fil-]LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'f’ %s',
      past: '%s ilu',
      s: 'ftit sekondi',
      ss: '%d sekondi',
      m: 'minuta',
      mm: '%d minuti',
      h: 'siegħa',
      hh: '%d siegħat',
      d: 'ġurnata',
      dd: '%d ġranet',
      M: 'xahar',
      MM: '%d xhur',
      y: 'sena',
      yy: '%d sni'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return mt;
});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '၁',
    '2': '၂',
    '3': '၃',
    '4': '၄',
    '5': '၅',
    '6': '၆',
    '7': '၇',
    '8': '၈',
    '9': '၉',
    '0': '၀'
  },
      numberMap = {
    '၁': '1',
    '၂': '2',
    '၃': '3',
    '၄': '4',
    '၅': '5',
    '၆': '6',
    '၇': '7',
    '၈': '8',
    '၉': '9',
    '၀': '0'
  };
  var my = moment.defineLocale('my', {
    months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
    monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
    weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
    weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
    weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[ယနေ.] LT [မှာ]',
      nextDay: '[မနက်ဖြန်] LT [မှာ]',
      nextWeek: 'dddd LT [မှာ]',
      lastDay: '[မနေ.က] LT [မှာ]',
      lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'လာမည့် %s မှာ',
      past: 'လွန်ခဲ့သော %s က',
      s: 'စက္ကန်.အနည်းငယ်',
      ss: '%d စက္ကန့်',
      m: 'တစ်မိနစ်',
      mm: '%d မိနစ်',
      h: 'တစ်နာရီ',
      hh: '%d နာရီ',
      d: 'တစ်ရက်',
      dd: '%d ရက်',
      M: 'တစ်လ',
      MM: '%d လ',
      y: 'တစ်နှစ်',
      yy: '%d နှစ်'
    },
    preparse: function (string) {
      return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
        return numberMap[match];
      });
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      });
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return my;
});

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var nb = moment.defineLocale('nb', {
    months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort: 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
    monthsParseExact: true,
    weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
    weekdaysShort: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
    weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY [kl.] HH:mm',
      LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
    },
    calendar: {
      sameDay: '[i dag kl.] LT',
      nextDay: '[i morgen kl.] LT',
      nextWeek: 'dddd [kl.] LT',
      lastDay: '[i går kl.] LT',
      lastWeek: '[forrige] dddd [kl.] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'om %s',
      past: '%s siden',
      s: 'noen sekunder',
      ss: '%d sekunder',
      m: 'ett minutt',
      mm: '%d minutter',
      h: 'en time',
      hh: '%d timer',
      d: 'en dag',
      dd: '%d dager',
      M: 'en måned',
      MM: '%d måneder',
      y: 'ett år',
      yy: '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return nb;
});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
    '0': '०'
  },
      numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
  };
  var ne = moment.defineLocale('ne', {
    months: 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
    monthsShort: 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
    monthsParseExact: true,
    weekdays: 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
    weekdaysShort: 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
    weekdaysMin: 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'Aको h:mm बजे',
      LTS: 'Aको h:mm:ss बजे',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY, Aको h:mm बजे',
      LLLL: 'dddd, D MMMM YYYY, Aको h:mm बजे'
    },
    preparse: function (string) {
      return string.replace(/[१२३४५६७८९०]/g, function (match) {
        return numberMap[match];
      });
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      });
    },
    meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'राति') {
        return hour < 4 ? hour : hour + 12;
      } else if (meridiem === 'बिहान') {
        return hour;
      } else if (meridiem === 'दिउँसो') {
        return hour >= 10 ? hour : hour + 12;
      } else if (meridiem === 'साँझ') {
        return hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 3) {
        return 'राति';
      } else if (hour < 12) {
        return 'बिहान';
      } else if (hour < 16) {
        return 'दिउँसो';
      } else if (hour < 20) {
        return 'साँझ';
      } else {
        return 'राति';
      }
    },
    calendar: {
      sameDay: '[आज] LT',
      nextDay: '[भोलि] LT',
      nextWeek: '[आउँदो] dddd[,] LT',
      lastDay: '[हिजो] LT',
      lastWeek: '[गएको] dddd[,] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%sमा',
      past: '%s अगाडि',
      s: 'केही क्षण',
      ss: '%d सेकेण्ड',
      m: 'एक मिनेट',
      mm: '%d मिनेट',
      h: 'एक घण्टा',
      hh: '%d घण्टा',
      d: 'एक दिन',
      dd: '%d दिन',
      M: 'एक महिना',
      MM: '%d महिना',
      y: 'एक बर्ष',
      yy: '%d बर्ष'
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6 // The week that contains Jan 6th is the first week of the year.

    }
  });
  return ne;
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
      monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');
  var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
  var monthsRegex = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
  var nl = moment.defineLocale('nl', {
    months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
    monthsShort: function (m, format) {
      if (!m) {
        return monthsShortWithDots;
      } else if (/-MMM-/.test(format)) {
        return monthsShortWithoutDots[m.month()];
      } else {
        return monthsShortWithDots[m.month()];
      }
    },
    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
    weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
    weekdaysMin: 'zo_ma_di_wo_do_vr_za'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD-MM-YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[vandaag om] LT',
      nextDay: '[morgen om] LT',
      nextWeek: 'dddd [om] LT',
      lastDay: '[gisteren om] LT',
      lastWeek: '[afgelopen] dddd [om] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'over %s',
      past: '%s geleden',
      s: 'een paar seconden',
      ss: '%d seconden',
      m: 'één minuut',
      mm: '%d minuten',
      h: 'één uur',
      hh: '%d uur',
      d: 'één dag',
      dd: '%d dagen',
      M: 'één maand',
      MM: '%d maanden',
      y: 'één jaar',
      yy: '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal: function (number) {
      return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de');
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return nl;
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
      monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');
  var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
  var monthsRegex = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
  var nlBe = moment.defineLocale('nl-be', {
    months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
    monthsShort: function (m, format) {
      if (!m) {
        return monthsShortWithDots;
      } else if (/-MMM-/.test(format)) {
        return monthsShortWithoutDots[m.month()];
      } else {
        return monthsShortWithDots[m.month()];
      }
    },
    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
    weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
    weekdaysMin: 'zo_ma_di_wo_do_vr_za'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[vandaag om] LT',
      nextDay: '[morgen om] LT',
      nextWeek: 'dddd [om] LT',
      lastDay: '[gisteren om] LT',
      lastWeek: '[afgelopen] dddd [om] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'over %s',
      past: '%s geleden',
      s: 'een paar seconden',
      ss: '%d seconden',
      m: 'één minuut',
      mm: '%d minuten',
      h: 'één uur',
      hh: '%d uur',
      d: 'één dag',
      dd: '%d dagen',
      M: 'één maand',
      MM: '%d maanden',
      y: 'één jaar',
      yy: '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal: function (number) {
      return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de');
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return nlBe;
});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var nn = moment.defineLocale('nn', {
    months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
    weekdays: 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
    weekdaysShort: 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
    weekdaysMin: 'su_må_ty_on_to_fr_lø'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY [kl.] H:mm',
      LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
    },
    calendar: {
      sameDay: '[I dag klokka] LT',
      nextDay: '[I morgon klokka] LT',
      nextWeek: 'dddd [klokka] LT',
      lastDay: '[I går klokka] LT',
      lastWeek: '[Føregåande] dddd [klokka] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'om %s',
      past: '%s sidan',
      s: 'nokre sekund',
      ss: '%d sekund',
      m: 'eit minutt',
      mm: '%d minutt',
      h: 'ein time',
      hh: '%d timar',
      d: 'ein dag',
      dd: '%d dagar',
      M: 'ein månad',
      MM: '%d månader',
      y: 'eit år',
      yy: '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return nn;
});

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '੧',
    '2': '੨',
    '3': '੩',
    '4': '੪',
    '5': '੫',
    '6': '੬',
    '7': '੭',
    '8': '੮',
    '9': '੯',
    '0': '੦'
  },
      numberMap = {
    '੧': '1',
    '੨': '2',
    '੩': '3',
    '੪': '4',
    '੫': '5',
    '੬': '6',
    '੭': '7',
    '੮': '8',
    '੯': '9',
    '੦': '0'
  };
  var paIn = moment.defineLocale('pa-in', {
    // There are months name as per Nanakshahi Calendar but they are not used as rigidly in modern Punjabi.
    months: 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
    monthsShort: 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
    weekdays: 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
    weekdaysShort: 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
    weekdaysMin: 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
    longDateFormat: {
      LT: 'A h:mm ਵਜੇ',
      LTS: 'A h:mm:ss ਵਜੇ',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY, A h:mm ਵਜੇ',
      LLLL: 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
    },
    calendar: {
      sameDay: '[ਅਜ] LT',
      nextDay: '[ਕਲ] LT',
      nextWeek: '[ਅਗਲਾ] dddd, LT',
      lastDay: '[ਕਲ] LT',
      lastWeek: '[ਪਿਛਲੇ] dddd, LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s ਵਿੱਚ',
      past: '%s ਪਿਛਲੇ',
      s: 'ਕੁਝ ਸਕਿੰਟ',
      ss: '%d ਸਕਿੰਟ',
      m: 'ਇਕ ਮਿੰਟ',
      mm: '%d ਮਿੰਟ',
      h: 'ਇੱਕ ਘੰਟਾ',
      hh: '%d ਘੰਟੇ',
      d: 'ਇੱਕ ਦਿਨ',
      dd: '%d ਦਿਨ',
      M: 'ਇੱਕ ਮਹੀਨਾ',
      MM: '%d ਮਹੀਨੇ',
      y: 'ਇੱਕ ਸਾਲ',
      yy: '%d ਸਾਲ'
    },
    preparse: function (string) {
      return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
        return numberMap[match];
      });
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      });
    },
    // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
    meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'ਰਾਤ') {
        return hour < 4 ? hour : hour + 12;
      } else if (meridiem === 'ਸਵੇਰ') {
        return hour;
      } else if (meridiem === 'ਦੁਪਹਿਰ') {
        return hour >= 10 ? hour : hour + 12;
      } else if (meridiem === 'ਸ਼ਾਮ') {
        return hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'ਰਾਤ';
      } else if (hour < 10) {
        return 'ਸਵੇਰ';
      } else if (hour < 17) {
        return 'ਦੁਪਹਿਰ';
      } else if (hour < 20) {
        return 'ਸ਼ਾਮ';
      } else {
        return 'ਰਾਤ';
      }
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6 // The week that contains Jan 6th is the first week of the year.

    }
  });
  return paIn;
});

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_'),
      monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');

  function plural(n) {
    return n % 10 < 5 && n % 10 > 1 && ~~(n / 10) % 10 !== 1;
  }

  function translate(number, withoutSuffix, key) {
    var result = number + ' ';

    switch (key) {
      case 'ss':
        return result + (plural(number) ? 'sekundy' : 'sekund');

      case 'm':
        return withoutSuffix ? 'minuta' : 'minutę';

      case 'mm':
        return result + (plural(number) ? 'minuty' : 'minut');

      case 'h':
        return withoutSuffix ? 'godzina' : 'godzinę';

      case 'hh':
        return result + (plural(number) ? 'godziny' : 'godzin');

      case 'MM':
        return result + (plural(number) ? 'miesiące' : 'miesięcy');

      case 'yy':
        return result + (plural(number) ? 'lata' : 'lat');
    }
  }

  var pl = moment.defineLocale('pl', {
    months: function (momentToFormat, format) {
      if (!momentToFormat) {
        return monthsNominative;
      } else if (format === '') {
        // Hack: if format empty we know this is used to generate
        // RegExp by moment. Give then back both valid forms of months
        // in RegExp ready format.
        return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
      } else if (/D MMMM/.test(format)) {
        return monthsSubjective[momentToFormat.month()];
      } else {
        return monthsNominative[momentToFormat.month()];
      }
    },
    monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
    weekdays: 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
    weekdaysShort: 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
    weekdaysMin: 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Dziś o] LT',
      nextDay: '[Jutro o] LT',
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return '[W niedzielę o] LT';

          case 2:
            return '[We wtorek o] LT';

          case 3:
            return '[W środę o] LT';

          case 6:
            return '[W sobotę o] LT';

          default:
            return '[W] dddd [o] LT';
        }
      },
      lastDay: '[Wczoraj o] LT',
      lastWeek: function () {
        switch (this.day()) {
          case 0:
            return '[W zeszłą niedzielę o] LT';

          case 3:
            return '[W zeszłą środę o] LT';

          case 6:
            return '[W zeszłą sobotę o] LT';

          default:
            return '[W zeszły] dddd [o] LT';
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'za %s',
      past: '%s temu',
      s: 'kilka sekund',
      ss: translate,
      m: translate,
      mm: translate,
      h: translate,
      hh: translate,
      d: '1 dzień',
      dd: '%d dni',
      M: 'miesiąc',
      MM: translate,
      y: 'rok',
      yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return pl;
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var pt = moment.defineLocale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
    weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D [de] MMMM [de] YYYY',
      LLL: 'D [de] MMMM [de] YYYY HH:mm',
      LLLL: 'dddd, D [de] MMMM [de] YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Hoje às] LT',
      nextDay: '[Amanhã às] LT',
      nextWeek: 'dddd [às] LT',
      lastDay: '[Ontem às] LT',
      lastWeek: function () {
        return this.day() === 0 || this.day() === 6 ? '[Último] dddd [às] LT' : // Saturday + Sunday
        '[Última] dddd [às] LT'; // Monday - Friday
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'em %s',
      past: 'há %s',
      s: 'segundos',
      ss: '%d segundos',
      m: 'um minuto',
      mm: '%d minutos',
      h: 'uma hora',
      hh: '%d horas',
      d: 'um dia',
      dd: '%d dias',
      M: 'um mês',
      MM: '%d meses',
      y: 'um ano',
      yy: '%d anos'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return pt;
});

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var ptBr = moment.defineLocale('pt-br', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
    weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D [de] MMMM [de] YYYY',
      LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
      LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
    },
    calendar: {
      sameDay: '[Hoje às] LT',
      nextDay: '[Amanhã às] LT',
      nextWeek: 'dddd [às] LT',
      lastDay: '[Ontem às] LT',
      lastWeek: function () {
        return this.day() === 0 || this.day() === 6 ? '[Último] dddd [às] LT' : // Saturday + Sunday
        '[Última] dddd [às] LT'; // Monday - Friday
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'em %s',
      past: 'há %s',
      s: 'poucos segundos',
      ss: '%d segundos',
      m: 'um minuto',
      mm: '%d minutos',
      h: 'uma hora',
      hh: '%d horas',
      d: 'um dia',
      dd: '%d dias',
      M: 'um mês',
      MM: '%d meses',
      y: 'um ano',
      yy: '%d anos'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº'
  });
  return ptBr;
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
      'ss': 'secunde',
      'mm': 'minute',
      'hh': 'ore',
      'dd': 'zile',
      'MM': 'luni',
      'yy': 'ani'
    },
        separator = ' ';

    if (number % 100 >= 20 || number >= 100 && number % 100 === 0) {
      separator = ' de ';
    }

    return number + separator + format[key];
  }

  var ro = moment.defineLocale('ro', {
    months: 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
    monthsShort: 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays: 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
    weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
    weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY H:mm',
      LLLL: 'dddd, D MMMM YYYY H:mm'
    },
    calendar: {
      sameDay: '[azi la] LT',
      nextDay: '[mâine la] LT',
      nextWeek: 'dddd [la] LT',
      lastDay: '[ieri la] LT',
      lastWeek: '[fosta] dddd [la] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'peste %s',
      past: '%s în urmă',
      s: 'câteva secunde',
      ss: relativeTimeWithPlural,
      m: 'un minut',
      mm: relativeTimeWithPlural,
      h: 'o oră',
      hh: relativeTimeWithPlural,
      d: 'o zi',
      dd: relativeTimeWithPlural,
      M: 'o lună',
      MM: relativeTimeWithPlural,
      y: 'un an',
      yy: relativeTimeWithPlural
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return ro;
});

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
  }

  function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
      'ss': withoutSuffix ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
      'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
      'hh': 'час_часа_часов',
      'dd': 'день_дня_дней',
      'MM': 'месяц_месяца_месяцев',
      'yy': 'год_года_лет'
    };

    if (key === 'm') {
      return withoutSuffix ? 'минута' : 'минуту';
    } else {
      return number + ' ' + plural(format[key], +number);
    }
  }

  var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i]; // http://new.gramota.ru/spravka/rules/139-prop : § 103
  // Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
  // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753

  var ru = moment.defineLocale('ru', {
    months: {
      format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
      standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
    },
    monthsShort: {
      // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
      format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
      standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
    },
    weekdays: {
      standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
      format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
      isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
    },
    weekdaysShort: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    weekdaysMin: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
    monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
    // копия предыдущего
    monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
    // полные названия с падежами
    monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
    // Выражение, которое соотвествует только сокращённым формам
    monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY г.',
      LLL: 'D MMMM YYYY г., H:mm',
      LLLL: 'dddd, D MMMM YYYY г., H:mm'
    },
    calendar: {
      sameDay: '[Сегодня, в] LT',
      nextDay: '[Завтра, в] LT',
      lastDay: '[Вчера, в] LT',
      nextWeek: function (now) {
        if (now.week() !== this.week()) {
          switch (this.day()) {
            case 0:
              return '[В следующее] dddd, [в] LT';

            case 1:
            case 2:
            case 4:
              return '[В следующий] dddd, [в] LT';

            case 3:
            case 5:
            case 6:
              return '[В следующую] dddd, [в] LT';
          }
        } else {
          if (this.day() === 2) {
            return '[Во] dddd, [в] LT';
          } else {
            return '[В] dddd, [в] LT';
          }
        }
      },
      lastWeek: function (now) {
        if (now.week() !== this.week()) {
          switch (this.day()) {
            case 0:
              return '[В прошлое] dddd, [в] LT';

            case 1:
            case 2:
            case 4:
              return '[В прошлый] dddd, [в] LT';

            case 3:
            case 5:
            case 6:
              return '[В прошлую] dddd, [в] LT';
          }
        } else {
          if (this.day() === 2) {
            return '[Во] dddd, [в] LT';
          } else {
            return '[В] dddd, [в] LT';
          }
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'через %s',
      past: '%s назад',
      s: 'несколько секунд',
      ss: relativeTimeWithPlural,
      m: relativeTimeWithPlural,
      mm: relativeTimeWithPlural,
      h: 'час',
      hh: relativeTimeWithPlural,
      d: 'день',
      dd: relativeTimeWithPlural,
      M: 'месяц',
      MM: relativeTimeWithPlural,
      y: 'год',
      yy: relativeTimeWithPlural
    },
    meridiemParse: /ночи|утра|дня|вечера/i,
    isPM: function (input) {
      return /^(дня|вечера)$/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'ночи';
      } else if (hour < 12) {
        return 'утра';
      } else if (hour < 17) {
        return 'дня';
      } else {
        return 'вечера';
      }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
    ordinal: function (number, period) {
      switch (period) {
        case 'M':
        case 'd':
        case 'DDD':
          return number + '-й';

        case 'D':
          return number + '-го';

        case 'w':
        case 'W':
          return number + '-я';

        default:
          return number;
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return ru;
});

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var months = ['جنوري', 'فيبروري', 'مارچ', 'اپريل', 'مئي', 'جون', 'جولاءِ', 'آگسٽ', 'سيپٽمبر', 'آڪٽوبر', 'نومبر', 'ڊسمبر'];
  var days = ['آچر', 'سومر', 'اڱارو', 'اربع', 'خميس', 'جمع', 'ڇنڇر'];
  var sd = moment.defineLocale('sd', {
    months: months,
    monthsShort: months,
    weekdays: days,
    weekdaysShort: days,
    weekdaysMin: days,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd، D MMMM YYYY HH:mm'
    },
    meridiemParse: /صبح|شام/,
    isPM: function (input) {
      return 'شام' === input;
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return 'صبح';
      }

      return 'شام';
    },
    calendar: {
      sameDay: '[اڄ] LT',
      nextDay: '[سڀاڻي] LT',
      nextWeek: 'dddd [اڳين هفتي تي] LT',
      lastDay: '[ڪالهه] LT',
      lastWeek: '[گزريل هفتي] dddd [تي] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s پوء',
      past: '%s اڳ',
      s: 'چند سيڪنڊ',
      ss: '%d سيڪنڊ',
      m: 'هڪ منٽ',
      mm: '%d منٽ',
      h: 'هڪ ڪلاڪ',
      hh: '%d ڪلاڪ',
      d: 'هڪ ڏينهن',
      dd: '%d ڏينهن',
      M: 'هڪ مهينو',
      MM: '%d مهينا',
      y: 'هڪ سال',
      yy: '%d سال'
    },
    preparse: function (string) {
      return string.replace(/،/g, ',');
    },
    postformat: function (string) {
      return string.replace(/,/g, '،');
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return sd;
});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var se = moment.defineLocale('se', {
    months: 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
    monthsShort: 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
    weekdays: 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
    weekdaysShort: 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
    weekdaysMin: 's_v_m_g_d_b_L'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'MMMM D. [b.] YYYY',
      LLL: 'MMMM D. [b.] YYYY [ti.] HH:mm',
      LLLL: 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
    },
    calendar: {
      sameDay: '[otne ti] LT',
      nextDay: '[ihttin ti] LT',
      nextWeek: 'dddd [ti] LT',
      lastDay: '[ikte ti] LT',
      lastWeek: '[ovddit] dddd [ti] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s geažes',
      past: 'maŋit %s',
      s: 'moadde sekunddat',
      ss: '%d sekunddat',
      m: 'okta minuhta',
      mm: '%d minuhtat',
      h: 'okta diimmu',
      hh: '%d diimmut',
      d: 'okta beaivi',
      dd: '%d beaivvit',
      M: 'okta mánnu',
      MM: '%d mánut',
      y: 'okta jahki',
      yy: '%d jagit'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return se;
});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';
  /*jshint -W100*/

  var si = moment.defineLocale('si', {
    months: 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
    monthsShort: 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
    weekdays: 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
    weekdaysShort: 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
    weekdaysMin: 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'a h:mm',
      LTS: 'a h:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY MMMM D',
      LLL: 'YYYY MMMM D, a h:mm',
      LLLL: 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
    },
    calendar: {
      sameDay: '[අද] LT[ට]',
      nextDay: '[හෙට] LT[ට]',
      nextWeek: 'dddd LT[ට]',
      lastDay: '[ඊයේ] LT[ට]',
      lastWeek: '[පසුගිය] dddd LT[ට]',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%sකින්',
      past: '%sකට පෙර',
      s: 'තත්පර කිහිපය',
      ss: 'තත්පර %d',
      m: 'මිනිත්තුව',
      mm: 'මිනිත්තු %d',
      h: 'පැය',
      hh: 'පැය %d',
      d: 'දිනය',
      dd: 'දින %d',
      M: 'මාසය',
      MM: 'මාස %d',
      y: 'වසර',
      yy: 'වසර %d'
    },
    dayOfMonthOrdinalParse: /\d{1,2} වැනි/,
    ordinal: function (number) {
      return number + ' වැනි';
    },
    meridiemParse: /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
    isPM: function (input) {
      return input === 'ප.ව.' || input === 'පස් වරු';
    },
    meridiem: function (hours, minutes, isLower) {
      if (hours > 11) {
        return isLower ? 'ප.ව.' : 'පස් වරු';
      } else {
        return isLower ? 'පෙ.ව.' : 'පෙර වරු';
      }
    }
  });
  return si;
});

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_'),
      monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');

  function plural(n) {
    return n > 1 && n < 5;
  }

  function translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';

    switch (key) {
      case 's':
        // a few seconds / in a few seconds / a few seconds ago
        return withoutSuffix || isFuture ? 'pár sekúnd' : 'pár sekundami';

      case 'ss':
        // 9 seconds / in 9 seconds / 9 seconds ago
        if (withoutSuffix || isFuture) {
          return result + (plural(number) ? 'sekundy' : 'sekúnd');
        } else {
          return result + 'sekundami';
        }

        break;

      case 'm':
        // a minute / in a minute / a minute ago
        return withoutSuffix ? 'minúta' : isFuture ? 'minútu' : 'minútou';

      case 'mm':
        // 9 minutes / in 9 minutes / 9 minutes ago
        if (withoutSuffix || isFuture) {
          return result + (plural(number) ? 'minúty' : 'minút');
        } else {
          return result + 'minútami';
        }

        break;

      case 'h':
        // an hour / in an hour / an hour ago
        return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou';

      case 'hh':
        // 9 hours / in 9 hours / 9 hours ago
        if (withoutSuffix || isFuture) {
          return result + (plural(number) ? 'hodiny' : 'hodín');
        } else {
          return result + 'hodinami';
        }

        break;

      case 'd':
        // a day / in a day / a day ago
        return withoutSuffix || isFuture ? 'deň' : 'dňom';

      case 'dd':
        // 9 days / in 9 days / 9 days ago
        if (withoutSuffix || isFuture) {
          return result + (plural(number) ? 'dni' : 'dní');
        } else {
          return result + 'dňami';
        }

        break;

      case 'M':
        // a month / in a month / a month ago
        return withoutSuffix || isFuture ? 'mesiac' : 'mesiacom';

      case 'MM':
        // 9 months / in 9 months / 9 months ago
        if (withoutSuffix || isFuture) {
          return result + (plural(number) ? 'mesiace' : 'mesiacov');
        } else {
          return result + 'mesiacmi';
        }

        break;

      case 'y':
        // a year / in a year / a year ago
        return withoutSuffix || isFuture ? 'rok' : 'rokom';

      case 'yy':
        // 9 years / in 9 years / 9 years ago
        if (withoutSuffix || isFuture) {
          return result + (plural(number) ? 'roky' : 'rokov');
        } else {
          return result + 'rokmi';
        }

        break;
    }
  }

  var sk = moment.defineLocale('sk', {
    months: months,
    monthsShort: monthsShort,
    weekdays: 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
    weekdaysShort: 'ne_po_ut_st_št_pi_so'.split('_'),
    weekdaysMin: 'ne_po_ut_st_št_pi_so'.split('_'),
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY H:mm',
      LLLL: 'dddd D. MMMM YYYY H:mm'
    },
    calendar: {
      sameDay: '[dnes o] LT',
      nextDay: '[zajtra o] LT',
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return '[v nedeľu o] LT';

          case 1:
          case 2:
            return '[v] dddd [o] LT';

          case 3:
            return '[v stredu o] LT';

          case 4:
            return '[vo štvrtok o] LT';

          case 5:
            return '[v piatok o] LT';

          case 6:
            return '[v sobotu o] LT';
        }
      },
      lastDay: '[včera o] LT',
      lastWeek: function () {
        switch (this.day()) {
          case 0:
            return '[minulú nedeľu o] LT';

          case 1:
          case 2:
            return '[minulý] dddd [o] LT';

          case 3:
            return '[minulú stredu o] LT';

          case 4:
          case 5:
            return '[minulý] dddd [o] LT';

          case 6:
            return '[minulú sobotu o] LT';
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'za %s',
      past: 'pred %s',
      s: translate,
      ss: translate,
      m: translate,
      mm: translate,
      h: translate,
      hh: translate,
      d: translate,
      dd: translate,
      M: translate,
      MM: translate,
      y: translate,
      yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return sk;
});

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';

    switch (key) {
      case 's':
        return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';

      case 'ss':
        if (number === 1) {
          result += withoutSuffix ? 'sekundo' : 'sekundi';
        } else if (number === 2) {
          result += withoutSuffix || isFuture ? 'sekundi' : 'sekundah';
        } else if (number < 5) {
          result += withoutSuffix || isFuture ? 'sekunde' : 'sekundah';
        } else {
          result += 'sekund';
        }

        return result;

      case 'm':
        return withoutSuffix ? 'ena minuta' : 'eno minuto';

      case 'mm':
        if (number === 1) {
          result += withoutSuffix ? 'minuta' : 'minuto';
        } else if (number === 2) {
          result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
        } else if (number < 5) {
          result += withoutSuffix || isFuture ? 'minute' : 'minutami';
        } else {
          result += withoutSuffix || isFuture ? 'minut' : 'minutami';
        }

        return result;

      case 'h':
        return withoutSuffix ? 'ena ura' : 'eno uro';

      case 'hh':
        if (number === 1) {
          result += withoutSuffix ? 'ura' : 'uro';
        } else if (number === 2) {
          result += withoutSuffix || isFuture ? 'uri' : 'urama';
        } else if (number < 5) {
          result += withoutSuffix || isFuture ? 'ure' : 'urami';
        } else {
          result += withoutSuffix || isFuture ? 'ur' : 'urami';
        }

        return result;

      case 'd':
        return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';

      case 'dd':
        if (number === 1) {
          result += withoutSuffix || isFuture ? 'dan' : 'dnem';
        } else if (number === 2) {
          result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
        } else {
          result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
        }

        return result;

      case 'M':
        return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';

      case 'MM':
        if (number === 1) {
          result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
        } else if (number === 2) {
          result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
        } else if (number < 5) {
          result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
        } else {
          result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
        }

        return result;

      case 'y':
        return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';

      case 'yy':
        if (number === 1) {
          result += withoutSuffix || isFuture ? 'leto' : 'letom';
        } else if (number === 2) {
          result += withoutSuffix || isFuture ? 'leti' : 'letoma';
        } else if (number < 5) {
          result += withoutSuffix || isFuture ? 'leta' : 'leti';
        } else {
          result += withoutSuffix || isFuture ? 'let' : 'leti';
        }

        return result;
    }
  }

  var sl = moment.defineLocale('sl', {
    months: 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
    monthsShort: 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays: 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
    weekdaysShort: 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
    weekdaysMin: 'ne_po_to_sr_če_pe_so'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY H:mm',
      LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
      sameDay: '[danes ob] LT',
      nextDay: '[jutri ob] LT',
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return '[v] [nedeljo] [ob] LT';

          case 3:
            return '[v] [sredo] [ob] LT';

          case 6:
            return '[v] [soboto] [ob] LT';

          case 1:
          case 2:
          case 4:
          case 5:
            return '[v] dddd [ob] LT';
        }
      },
      lastDay: '[včeraj ob] LT',
      lastWeek: function () {
        switch (this.day()) {
          case 0:
            return '[prejšnjo] [nedeljo] [ob] LT';

          case 3:
            return '[prejšnjo] [sredo] [ob] LT';

          case 6:
            return '[prejšnjo] [soboto] [ob] LT';

          case 1:
          case 2:
          case 4:
          case 5:
            return '[prejšnji] dddd [ob] LT';
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'čez %s',
      past: 'pred %s',
      s: processRelativeTime,
      ss: processRelativeTime,
      m: processRelativeTime,
      mm: processRelativeTime,
      h: processRelativeTime,
      hh: processRelativeTime,
      d: processRelativeTime,
      dd: processRelativeTime,
      M: processRelativeTime,
      MM: processRelativeTime,
      y: processRelativeTime,
      yy: processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return sl;
});

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var sq = moment.defineLocale('sq', {
    months: 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
    monthsShort: 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
    weekdays: 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
    weekdaysShort: 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
    weekdaysMin: 'D_H_Ma_Më_E_P_Sh'.split('_'),
    weekdaysParseExact: true,
    meridiemParse: /PD|MD/,
    isPM: function (input) {
      return input.charAt(0) === 'M';
    },
    meridiem: function (hours, minutes, isLower) {
      return hours < 12 ? 'PD' : 'MD';
    },
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Sot në] LT',
      nextDay: '[Nesër në] LT',
      nextWeek: 'dddd [në] LT',
      lastDay: '[Dje në] LT',
      lastWeek: 'dddd [e kaluar në] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'në %s',
      past: '%s më parë',
      s: 'disa sekonda',
      ss: '%d sekonda',
      m: 'një minutë',
      mm: '%d minuta',
      h: 'një orë',
      hh: '%d orë',
      d: 'një ditë',
      dd: '%d ditë',
      M: 'një muaj',
      MM: '%d muaj',
      y: 'një vit',
      yy: '%d vite'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return sq;
});

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var translator = {
    words: {
      //Different grammatical cases
      ss: ['sekunda', 'sekunde', 'sekundi'],
      m: ['jedan minut', 'jedne minute'],
      mm: ['minut', 'minute', 'minuta'],
      h: ['jedan sat', 'jednog sata'],
      hh: ['sat', 'sata', 'sati'],
      dd: ['dan', 'dana', 'dana'],
      MM: ['mesec', 'meseca', 'meseci'],
      yy: ['godina', 'godine', 'godina']
    },
    correctGrammaticalCase: function (number, wordKey) {
      return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
    },
    translate: function (number, withoutSuffix, key) {
      var wordKey = translator.words[key];

      if (key.length === 1) {
        return withoutSuffix ? wordKey[0] : wordKey[1];
      } else {
        return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
      }
    }
  };
  var sr = moment.defineLocale('sr', {
    months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
    monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
    weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY H:mm',
      LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
      sameDay: '[danas u] LT',
      nextDay: '[sutra u] LT',
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return '[u] [nedelju] [u] LT';

          case 3:
            return '[u] [sredu] [u] LT';

          case 6:
            return '[u] [subotu] [u] LT';

          case 1:
          case 2:
          case 4:
          case 5:
            return '[u] dddd [u] LT';
        }
      },
      lastDay: '[juče u] LT',
      lastWeek: function () {
        var lastWeekDays = ['[prošle] [nedelje] [u] LT', '[prošlog] [ponedeljka] [u] LT', '[prošlog] [utorka] [u] LT', '[prošle] [srede] [u] LT', '[prošlog] [četvrtka] [u] LT', '[prošlog] [petka] [u] LT', '[prošle] [subote] [u] LT'];
        return lastWeekDays[this.day()];
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'za %s',
      past: 'pre %s',
      s: 'nekoliko sekundi',
      ss: translator.translate,
      m: translator.translate,
      mm: translator.translate,
      h: translator.translate,
      hh: translator.translate,
      d: 'dan',
      dd: translator.translate,
      M: 'mesec',
      MM: translator.translate,
      y: 'godinu',
      yy: translator.translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return sr;
});

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var translator = {
    words: {
      //Different grammatical cases
      ss: ['секунда', 'секунде', 'секунди'],
      m: ['један минут', 'једне минуте'],
      mm: ['минут', 'минуте', 'минута'],
      h: ['један сат', 'једног сата'],
      hh: ['сат', 'сата', 'сати'],
      dd: ['дан', 'дана', 'дана'],
      MM: ['месец', 'месеца', 'месеци'],
      yy: ['година', 'године', 'година']
    },
    correctGrammaticalCase: function (number, wordKey) {
      return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
    },
    translate: function (number, withoutSuffix, key) {
      var wordKey = translator.words[key];

      if (key.length === 1) {
        return withoutSuffix ? wordKey[0] : wordKey[1];
      } else {
        return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
      }
    }
  };
  var srCyrl = moment.defineLocale('sr-cyrl', {
    months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
    monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
    monthsParseExact: true,
    weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
    weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
    weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY H:mm',
      LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
      sameDay: '[данас у] LT',
      nextDay: '[сутра у] LT',
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return '[у] [недељу] [у] LT';

          case 3:
            return '[у] [среду] [у] LT';

          case 6:
            return '[у] [суботу] [у] LT';

          case 1:
          case 2:
          case 4:
          case 5:
            return '[у] dddd [у] LT';
        }
      },
      lastDay: '[јуче у] LT',
      lastWeek: function () {
        var lastWeekDays = ['[прошле] [недеље] [у] LT', '[прошлог] [понедељка] [у] LT', '[прошлог] [уторка] [у] LT', '[прошле] [среде] [у] LT', '[прошлог] [четвртка] [у] LT', '[прошлог] [петка] [у] LT', '[прошле] [суботе] [у] LT'];
        return lastWeekDays[this.day()];
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'за %s',
      past: 'пре %s',
      s: 'неколико секунди',
      ss: translator.translate,
      m: translator.translate,
      mm: translator.translate,
      h: translator.translate,
      hh: translator.translate,
      d: 'дан',
      dd: translator.translate,
      M: 'месец',
      MM: translator.translate,
      y: 'годину',
      yy: translator.translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return srCyrl;
});

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var ss = moment.defineLocale('ss', {
    months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
    monthsShort: 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
    weekdays: 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
    weekdaysShort: 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
    weekdaysMin: 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY h:mm A',
      LLLL: 'dddd, D MMMM YYYY h:mm A'
    },
    calendar: {
      sameDay: '[Namuhla nga] LT',
      nextDay: '[Kusasa nga] LT',
      nextWeek: 'dddd [nga] LT',
      lastDay: '[Itolo nga] LT',
      lastWeek: 'dddd [leliphelile] [nga] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'nga %s',
      past: 'wenteka nga %s',
      s: 'emizuzwana lomcane',
      ss: '%d mzuzwana',
      m: 'umzuzu',
      mm: '%d emizuzu',
      h: 'lihora',
      hh: '%d emahora',
      d: 'lilanga',
      dd: '%d emalanga',
      M: 'inyanga',
      MM: '%d tinyanga',
      y: 'umnyaka',
      yy: '%d iminyaka'
    },
    meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
    meridiem: function (hours, minutes, isLower) {
      if (hours < 11) {
        return 'ekuseni';
      } else if (hours < 15) {
        return 'emini';
      } else if (hours < 19) {
        return 'entsambama';
      } else {
        return 'ebusuku';
      }
    },
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'ekuseni') {
        return hour;
      } else if (meridiem === 'emini') {
        return hour >= 11 ? hour : hour + 12;
      } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
        if (hour === 0) {
          return 0;
        }

        return hour + 12;
      }
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal: '%d',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return ss;
});

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var sv = moment.defineLocale('sv', {
    months: 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
    monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
    weekdays: 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
    weekdaysShort: 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
    weekdaysMin: 'sö_må_ti_on_to_fr_lö'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY-MM-DD',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY [kl.] HH:mm',
      LLLL: 'dddd D MMMM YYYY [kl.] HH:mm',
      lll: 'D MMM YYYY HH:mm',
      llll: 'ddd D MMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Idag] LT',
      nextDay: '[Imorgon] LT',
      lastDay: '[Igår] LT',
      nextWeek: '[På] dddd LT',
      lastWeek: '[I] dddd[s] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'om %s',
      past: 'för %s sedan',
      s: 'några sekunder',
      ss: '%d sekunder',
      m: 'en minut',
      mm: '%d minuter',
      h: 'en timme',
      hh: '%d timmar',
      d: 'en dag',
      dd: '%d dagar',
      M: 'en månad',
      MM: '%d månader',
      y: 'ett år',
      yy: '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
    ordinal: function (number) {
      var b = number % 10,
          output = ~~(number % 100 / 10) === 1 ? 'e' : b === 1 ? 'a' : b === 2 ? 'a' : b === 3 ? 'e' : 'e';
      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return sv;
});

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var sw = moment.defineLocale('sw', {
    months: 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
    monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
    weekdays: 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
    weekdaysShort: 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
    weekdaysMin: 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[leo saa] LT',
      nextDay: '[kesho saa] LT',
      nextWeek: '[wiki ijayo] dddd [saat] LT',
      lastDay: '[jana] LT',
      lastWeek: '[wiki iliyopita] dddd [saat] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s baadaye',
      past: 'tokea %s',
      s: 'hivi punde',
      ss: 'sekunde %d',
      m: 'dakika moja',
      mm: 'dakika %d',
      h: 'saa limoja',
      hh: 'masaa %d',
      d: 'siku moja',
      dd: 'masiku %d',
      M: 'mwezi mmoja',
      MM: 'miezi %d',
      y: 'mwaka mmoja',
      yy: 'miaka %d'
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return sw;
});

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var symbolMap = {
    '1': '௧',
    '2': '௨',
    '3': '௩',
    '4': '௪',
    '5': '௫',
    '6': '௬',
    '7': '௭',
    '8': '௮',
    '9': '௯',
    '0': '௦'
  },
      numberMap = {
    '௧': '1',
    '௨': '2',
    '௩': '3',
    '௪': '4',
    '௫': '5',
    '௬': '6',
    '௭': '7',
    '௮': '8',
    '௯': '9',
    '௦': '0'
  };
  var ta = moment.defineLocale('ta', {
    months: 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
    monthsShort: 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
    weekdays: 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
    weekdaysShort: 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
    weekdaysMin: 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY, HH:mm',
      LLLL: 'dddd, D MMMM YYYY, HH:mm'
    },
    calendar: {
      sameDay: '[இன்று] LT',
      nextDay: '[நாளை] LT',
      nextWeek: 'dddd, LT',
      lastDay: '[நேற்று] LT',
      lastWeek: '[கடந்த வாரம்] dddd, LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s இல்',
      past: '%s முன்',
      s: 'ஒரு சில விநாடிகள்',
      ss: '%d விநாடிகள்',
      m: 'ஒரு நிமிடம்',
      mm: '%d நிமிடங்கள்',
      h: 'ஒரு மணி நேரம்',
      hh: '%d மணி நேரம்',
      d: 'ஒரு நாள்',
      dd: '%d நாட்கள்',
      M: 'ஒரு மாதம்',
      MM: '%d மாதங்கள்',
      y: 'ஒரு வருடம்',
      yy: '%d ஆண்டுகள்'
    },
    dayOfMonthOrdinalParse: /\d{1,2}வது/,
    ordinal: function (number) {
      return number + 'வது';
    },
    preparse: function (string) {
      return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
        return numberMap[match];
      });
    },
    postformat: function (string) {
      return string.replace(/\d/g, function (match) {
        return symbolMap[match];
      });
    },
    // refer http://ta.wikipedia.org/s/1er1
    meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
    meridiem: function (hour, minute, isLower) {
      if (hour < 2) {
        return ' யாமம்';
      } else if (hour < 6) {
        return ' வைகறை'; // வைகறை
      } else if (hour < 10) {
        return ' காலை'; // காலை
      } else if (hour < 14) {
        return ' நண்பகல்'; // நண்பகல்
      } else if (hour < 18) {
        return ' எற்பாடு'; // எற்பாடு
      } else if (hour < 22) {
        return ' மாலை'; // மாலை
      } else {
        return ' யாமம்';
      }
    },
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'யாமம்') {
        return hour < 2 ? hour : hour + 12;
      } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
        return hour;
      } else if (meridiem === 'நண்பகல்') {
        return hour >= 10 ? hour : hour + 12;
      } else {
        return hour + 12;
      }
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6 // The week that contains Jan 6th is the first week of the year.

    }
  });
  return ta;
});

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var te = moment.defineLocale('te', {
    months: 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జులై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
    monthsShort: 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జులై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
    monthsParseExact: true,
    weekdays: 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
    weekdaysShort: 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
    weekdaysMin: 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
    longDateFormat: {
      LT: 'A h:mm',
      LTS: 'A h:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY, A h:mm',
      LLLL: 'dddd, D MMMM YYYY, A h:mm'
    },
    calendar: {
      sameDay: '[నేడు] LT',
      nextDay: '[రేపు] LT',
      nextWeek: 'dddd, LT',
      lastDay: '[నిన్న] LT',
      lastWeek: '[గత] dddd, LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s లో',
      past: '%s క్రితం',
      s: 'కొన్ని క్షణాలు',
      ss: '%d సెకన్లు',
      m: 'ఒక నిమిషం',
      mm: '%d నిమిషాలు',
      h: 'ఒక గంట',
      hh: '%d గంటలు',
      d: 'ఒక రోజు',
      dd: '%d రోజులు',
      M: 'ఒక నెల',
      MM: '%d నెలలు',
      y: 'ఒక సంవత్సరం',
      yy: '%d సంవత్సరాలు'
    },
    dayOfMonthOrdinalParse: /\d{1,2}వ/,
    ordinal: '%dవ',
    meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'రాత్రి') {
        return hour < 4 ? hour : hour + 12;
      } else if (meridiem === 'ఉదయం') {
        return hour;
      } else if (meridiem === 'మధ్యాహ్నం') {
        return hour >= 10 ? hour : hour + 12;
      } else if (meridiem === 'సాయంత్రం') {
        return hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'రాత్రి';
      } else if (hour < 10) {
        return 'ఉదయం';
      } else if (hour < 17) {
        return 'మధ్యాహ్నం';
      } else if (hour < 20) {
        return 'సాయంత్రం';
      } else {
        return 'రాత్రి';
      }
    },
    week: {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6 // The week that contains Jan 6th is the first week of the year.

    }
  });
  return te;
});

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var tet = moment.defineLocale('tet', {
    months: 'Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdays: 'Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu'.split('_'),
    weekdaysShort: 'Dom_Seg_Ters_Kua_Kint_Sest_Sab'.split('_'),
    weekdaysMin: 'Do_Seg_Te_Ku_Ki_Ses_Sa'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Ohin iha] LT',
      nextDay: '[Aban iha] LT',
      nextWeek: 'dddd [iha] LT',
      lastDay: '[Horiseik iha] LT',
      lastWeek: 'dddd [semana kotuk] [iha] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'iha %s',
      past: '%s liuba',
      s: 'minutu balun',
      ss: 'minutu %d',
      m: 'minutu ida',
      mm: 'minutu %d',
      h: 'oras ida',
      hh: 'oras %d',
      d: 'loron ida',
      dd: 'loron %d',
      M: 'fulan ida',
      MM: 'fulan %d',
      y: 'tinan ida',
      yy: 'tinan %d'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function (number) {
      var b = number % 10,
          output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return tet;
});

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var suffixes = {
    0: '-ум',
    1: '-ум',
    2: '-юм',
    3: '-юм',
    4: '-ум',
    5: '-ум',
    6: '-ум',
    7: '-ум',
    8: '-ум',
    9: '-ум',
    10: '-ум',
    12: '-ум',
    13: '-ум',
    20: '-ум',
    30: '-юм',
    40: '-ум',
    50: '-ум',
    60: '-ум',
    70: '-ум',
    80: '-ум',
    90: '-ум',
    100: '-ум'
  };
  var tg = moment.defineLocale('tg', {
    months: 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
    monthsShort: 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
    weekdays: 'якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе'.split('_'),
    weekdaysShort: 'яшб_дшб_сшб_чшб_пшб_ҷум_шнб'.split('_'),
    weekdaysMin: 'яш_дш_сш_чш_пш_ҷм_шб'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Имрӯз соати] LT',
      nextDay: '[Пагоҳ соати] LT',
      lastDay: '[Дирӯз соати] LT',
      nextWeek: 'dddd[и] [ҳафтаи оянда соати] LT',
      lastWeek: 'dddd[и] [ҳафтаи гузашта соати] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'баъди %s',
      past: '%s пеш',
      s: 'якчанд сония',
      m: 'як дақиқа',
      mm: '%d дақиқа',
      h: 'як соат',
      hh: '%d соат',
      d: 'як рӯз',
      dd: '%d рӯз',
      M: 'як моҳ',
      MM: '%d моҳ',
      y: 'як сол',
      yy: '%d сол'
    },
    meridiemParse: /шаб|субҳ|рӯз|бегоҳ/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'шаб') {
        return hour < 4 ? hour : hour + 12;
      } else if (meridiem === 'субҳ') {
        return hour;
      } else if (meridiem === 'рӯз') {
        return hour >= 11 ? hour : hour + 12;
      } else if (meridiem === 'бегоҳ') {
        return hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'шаб';
      } else if (hour < 11) {
        return 'субҳ';
      } else if (hour < 16) {
        return 'рӯз';
      } else if (hour < 19) {
        return 'бегоҳ';
      } else {
        return 'шаб';
      }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ум|юм)/,
    ordinal: function (number) {
      var a = number % 10,
          b = number >= 100 ? 100 : null;
      return number + (suffixes[number] || suffixes[a] || suffixes[b]);
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 1th is the first week of the year.

    }
  });
  return tg;
});

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var th = moment.defineLocale('th', {
    months: 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
    monthsShort: 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
    monthsParseExact: true,
    weekdays: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
    weekdaysShort: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'),
    // yes, three characters difference
    weekdaysMin: 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'H:mm',
      LTS: 'H:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY เวลา H:mm',
      LLLL: 'วันddddที่ D MMMM YYYY เวลา H:mm'
    },
    meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
    isPM: function (input) {
      return input === 'หลังเที่ยง';
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return 'ก่อนเที่ยง';
      } else {
        return 'หลังเที่ยง';
      }
    },
    calendar: {
      sameDay: '[วันนี้ เวลา] LT',
      nextDay: '[พรุ่งนี้ เวลา] LT',
      nextWeek: 'dddd[หน้า เวลา] LT',
      lastDay: '[เมื่อวานนี้ เวลา] LT',
      lastWeek: '[วัน]dddd[ที่แล้ว เวลา] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'อีก %s',
      past: '%sที่แล้ว',
      s: 'ไม่กี่วินาที',
      ss: '%d วินาที',
      m: '1 นาที',
      mm: '%d นาที',
      h: '1 ชั่วโมง',
      hh: '%d ชั่วโมง',
      d: '1 วัน',
      dd: '%d วัน',
      M: '1 เดือน',
      MM: '%d เดือน',
      y: '1 ปี',
      yy: '%d ปี'
    }
  });
  return th;
});

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var tlPh = moment.defineLocale('tl-ph', {
    months: 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
    monthsShort: 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
    weekdays: 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
    weekdaysShort: 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
    weekdaysMin: 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'MM/D/YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY HH:mm',
      LLLL: 'dddd, MMMM DD, YYYY HH:mm'
    },
    calendar: {
      sameDay: 'LT [ngayong araw]',
      nextDay: '[Bukas ng] LT',
      nextWeek: 'LT [sa susunod na] dddd',
      lastDay: 'LT [kahapon]',
      lastWeek: 'LT [noong nakaraang] dddd',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'sa loob ng %s',
      past: '%s ang nakalipas',
      s: 'ilang segundo',
      ss: '%d segundo',
      m: 'isang minuto',
      mm: '%d minuto',
      h: 'isang oras',
      hh: '%d oras',
      d: 'isang araw',
      dd: '%d araw',
      M: 'isang buwan',
      MM: '%d buwan',
      y: 'isang taon',
      yy: '%d taon'
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal: function (number) {
      return number;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return tlPh;
});

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

  function translateFuture(output) {
    var time = output;
    time = output.indexOf('jaj') !== -1 ? time.slice(0, -3) + 'leS' : output.indexOf('jar') !== -1 ? time.slice(0, -3) + 'waQ' : output.indexOf('DIS') !== -1 ? time.slice(0, -3) + 'nem' : time + ' pIq';
    return time;
  }

  function translatePast(output) {
    var time = output;
    time = output.indexOf('jaj') !== -1 ? time.slice(0, -3) + 'Hu’' : output.indexOf('jar') !== -1 ? time.slice(0, -3) + 'wen' : output.indexOf('DIS') !== -1 ? time.slice(0, -3) + 'ben' : time + ' ret';
    return time;
  }

  function translate(number, withoutSuffix, string, isFuture) {
    var numberNoun = numberAsNoun(number);

    switch (string) {
      case 'ss':
        return numberNoun + ' lup';

      case 'mm':
        return numberNoun + ' tup';

      case 'hh':
        return numberNoun + ' rep';

      case 'dd':
        return numberNoun + ' jaj';

      case 'MM':
        return numberNoun + ' jar';

      case 'yy':
        return numberNoun + ' DIS';
    }
  }

  function numberAsNoun(number) {
    var hundred = Math.floor(number % 1000 / 100),
        ten = Math.floor(number % 100 / 10),
        one = number % 10,
        word = '';

    if (hundred > 0) {
      word += numbersNouns[hundred] + 'vatlh';
    }

    if (ten > 0) {
      word += (word !== '' ? ' ' : '') + numbersNouns[ten] + 'maH';
    }

    if (one > 0) {
      word += (word !== '' ? ' ' : '') + numbersNouns[one];
    }

    return word === '' ? 'pagh' : word;
  }

  var tlh = moment.defineLocale('tlh', {
    months: 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
    monthsShort: 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
    monthsParseExact: true,
    weekdays: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
    weekdaysShort: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
    weekdaysMin: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[DaHjaj] LT',
      nextDay: '[wa’leS] LT',
      nextWeek: 'LLL',
      lastDay: '[wa’Hu’] LT',
      lastWeek: 'LLL',
      sameElse: 'L'
    },
    relativeTime: {
      future: translateFuture,
      past: translatePast,
      s: 'puS lup',
      ss: translate,
      m: 'wa’ tup',
      mm: translate,
      h: 'wa’ rep',
      hh: translate,
      d: 'wa’ jaj',
      dd: translate,
      M: 'wa’ jar',
      MM: translate,
      y: 'wa’ DIS',
      yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return tlh;
});

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var suffixes = {
    1: '\'inci',
    5: '\'inci',
    8: '\'inci',
    70: '\'inci',
    80: '\'inci',
    2: '\'nci',
    7: '\'nci',
    20: '\'nci',
    50: '\'nci',
    3: '\'üncü',
    4: '\'üncü',
    100: '\'üncü',
    6: '\'ncı',
    9: '\'uncu',
    10: '\'uncu',
    30: '\'uncu',
    60: '\'ıncı',
    90: '\'ıncı'
  };
  var tr = moment.defineLocale('tr', {
    months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
    monthsShort: 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
    weekdays: 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
    weekdaysShort: 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
    weekdaysMin: 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[bugün saat] LT',
      nextDay: '[yarın saat] LT',
      nextWeek: '[gelecek] dddd [saat] LT',
      lastDay: '[dün] LT',
      lastWeek: '[geçen] dddd [saat] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s sonra',
      past: '%s önce',
      s: 'birkaç saniye',
      ss: '%d saniye',
      m: 'bir dakika',
      mm: '%d dakika',
      h: 'bir saat',
      hh: '%d saat',
      d: 'bir gün',
      dd: '%d gün',
      M: 'bir ay',
      MM: '%d ay',
      y: 'bir yıl',
      yy: '%d yıl'
    },
    ordinal: function (number, period) {
      switch (period) {
        case 'd':
        case 'D':
        case 'Do':
        case 'DD':
          return number;

        default:
          if (number === 0) {
            // special case for zero
            return number + '\'ıncı';
          }

          var a = number % 10,
              b = number % 100 - a,
              c = number >= 100 ? 100 : null;
          return number + (suffixes[a] || suffixes[b] || suffixes[c]);
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return tr;
});

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict'; // After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
  // This is currently too difficult (maybe even impossible) to add.

  var tzl = moment.defineLocale('tzl', {
    months: 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
    weekdays: 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
    weekdaysShort: 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
    weekdaysMin: 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
    longDateFormat: {
      LT: 'HH.mm',
      LTS: 'HH.mm.ss',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM [dallas] YYYY',
      LLL: 'D. MMMM [dallas] YYYY HH.mm',
      LLLL: 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
    },
    meridiemParse: /d\'o|d\'a/i,
    isPM: function (input) {
      return 'd\'o' === input.toLowerCase();
    },
    meridiem: function (hours, minutes, isLower) {
      if (hours > 11) {
        return isLower ? 'd\'o' : 'D\'O';
      } else {
        return isLower ? 'd\'a' : 'D\'A';
      }
    },
    calendar: {
      sameDay: '[oxhi à] LT',
      nextDay: '[demà à] LT',
      nextWeek: 'dddd [à] LT',
      lastDay: '[ieiri à] LT',
      lastWeek: '[sür el] dddd [lasteu à] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'osprei %s',
      past: 'ja%s',
      s: processRelativeTime,
      ss: processRelativeTime,
      m: processRelativeTime,
      mm: processRelativeTime,
      h: processRelativeTime,
      hh: processRelativeTime,
      d: processRelativeTime,
      dd: processRelativeTime,
      M: processRelativeTime,
      MM: processRelativeTime,
      y: processRelativeTime,
      yy: processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });

  function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
      's': ['viensas secunds', '\'iensas secunds'],
      'ss': [number + ' secunds', '' + number + ' secunds'],
      'm': ['\'n míut', '\'iens míut'],
      'mm': [number + ' míuts', '' + number + ' míuts'],
      'h': ['\'n þora', '\'iensa þora'],
      'hh': [number + ' þoras', '' + number + ' þoras'],
      'd': ['\'n ziua', '\'iensa ziua'],
      'dd': [number + ' ziuas', '' + number + ' ziuas'],
      'M': ['\'n mes', '\'iens mes'],
      'MM': [number + ' mesen', '' + number + ' mesen'],
      'y': ['\'n ar', '\'iens ar'],
      'yy': [number + ' ars', '' + number + ' ars']
    };
    return isFuture ? format[key][0] : withoutSuffix ? format[key][0] : format[key][1];
  }

  return tzl;
});

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var tzm = moment.defineLocale('tzm', {
    months: 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
    monthsShort: 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
    weekdays: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
    weekdaysShort: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
    weekdaysMin: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
      nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
      nextWeek: 'dddd [ⴴ] LT',
      lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
      lastWeek: 'dddd [ⴴ] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
      past: 'ⵢⴰⵏ %s',
      s: 'ⵉⵎⵉⴽ',
      ss: '%d ⵉⵎⵉⴽ',
      m: 'ⵎⵉⵏⵓⴺ',
      mm: '%d ⵎⵉⵏⵓⴺ',
      h: 'ⵙⴰⵄⴰ',
      hh: '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
      d: 'ⴰⵙⵙ',
      dd: '%d oⵙⵙⴰⵏ',
      M: 'ⴰⵢoⵓⵔ',
      MM: '%d ⵉⵢⵢⵉⵔⵏ',
      y: 'ⴰⵙⴳⴰⵙ',
      yy: '%d ⵉⵙⴳⴰⵙⵏ'
    },
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12 // The week that contains Jan 12th is the first week of the year.

    }
  });
  return tzm;
});

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var tzmLatn = moment.defineLocale('tzm-latn', {
    months: 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
    monthsShort: 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
    weekdays: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
    weekdaysShort: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
    weekdaysMin: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[asdkh g] LT',
      nextDay: '[aska g] LT',
      nextWeek: 'dddd [g] LT',
      lastDay: '[assant g] LT',
      lastWeek: 'dddd [g] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'dadkh s yan %s',
      past: 'yan %s',
      s: 'imik',
      ss: '%d imik',
      m: 'minuḍ',
      mm: '%d minuḍ',
      h: 'saɛa',
      hh: '%d tassaɛin',
      d: 'ass',
      dd: '%d ossan',
      M: 'ayowr',
      MM: '%d iyyirn',
      y: 'asgas',
      yy: '%d isgasn'
    },
    week: {
      dow: 6,
      // Saturday is the first day of the week.
      doy: 12 // The week that contains Jan 12th is the first week of the year.

    }
  });
  return tzmLatn;
});

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js language configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var ugCn = moment.defineLocale('ug-cn', {
    months: 'يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر'.split('_'),
    monthsShort: 'يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر'.split('_'),
    weekdays: 'يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە'.split('_'),
    weekdaysShort: 'يە_دۈ_سە_چا_پە_جۈ_شە'.split('_'),
    weekdaysMin: 'يە_دۈ_سە_چا_پە_جۈ_شە'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY-MM-DD',
      LL: 'YYYY-يىلىM-ئاينىڭD-كۈنى',
      LLL: 'YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm',
      LLLL: 'dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm'
    },
    meridiemParse: /يېرىم كېچە|سەھەر|چۈشتىن بۇرۇن|چۈش|چۈشتىن كېيىن|كەچ/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === 'يېرىم كېچە' || meridiem === 'سەھەر' || meridiem === 'چۈشتىن بۇرۇن') {
        return hour;
      } else if (meridiem === 'چۈشتىن كېيىن' || meridiem === 'كەچ') {
        return hour + 12;
      } else {
        return hour >= 11 ? hour : hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      var hm = hour * 100 + minute;

      if (hm < 600) {
        return 'يېرىم كېچە';
      } else if (hm < 900) {
        return 'سەھەر';
      } else if (hm < 1130) {
        return 'چۈشتىن بۇرۇن';
      } else if (hm < 1230) {
        return 'چۈش';
      } else if (hm < 1800) {
        return 'چۈشتىن كېيىن';
      } else {
        return 'كەچ';
      }
    },
    calendar: {
      sameDay: '[بۈگۈن سائەت] LT',
      nextDay: '[ئەتە سائەت] LT',
      nextWeek: '[كېلەركى] dddd [سائەت] LT',
      lastDay: '[تۆنۈگۈن] LT',
      lastWeek: '[ئالدىنقى] dddd [سائەت] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s كېيىن',
      past: '%s بۇرۇن',
      s: 'نەچچە سېكونت',
      ss: '%d سېكونت',
      m: 'بىر مىنۇت',
      mm: '%d مىنۇت',
      h: 'بىر سائەت',
      hh: '%d سائەت',
      d: 'بىر كۈن',
      dd: '%d كۈن',
      M: 'بىر ئاي',
      MM: '%d ئاي',
      y: 'بىر يىل',
      yy: '%d يىل'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(-كۈنى|-ئاي|-ھەپتە)/,
    ordinal: function (number, period) {
      switch (period) {
        case 'd':
        case 'D':
        case 'DDD':
          return number + '-كۈنى';

        case 'w':
        case 'W':
          return number + '-ھەپتە';

        default:
          return number;
      }
    },
    preparse: function (string) {
      return string.replace(/،/g, ',');
    },
    postformat: function (string) {
      return string.replace(/,/g, '،');
    },
    week: {
      // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 1st is the first week of the year.

    }
  });
  return ugCn;
});

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
  }

  function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
      'ss': withoutSuffix ? 'секунда_секунди_секунд' : 'секунду_секунди_секунд',
      'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
      'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
      'dd': 'день_дні_днів',
      'MM': 'місяць_місяці_місяців',
      'yy': 'рік_роки_років'
    };

    if (key === 'm') {
      return withoutSuffix ? 'хвилина' : 'хвилину';
    } else if (key === 'h') {
      return withoutSuffix ? 'година' : 'годину';
    } else {
      return number + ' ' + plural(format[key], +number);
    }
  }

  function weekdaysCaseReplace(m, format) {
    var weekdays = {
      'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
      'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
      'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
    };

    if (m === true) {
      return weekdays['nominative'].slice(1, 7).concat(weekdays['nominative'].slice(0, 1));
    }

    if (!m) {
      return weekdays['nominative'];
    }

    var nounCase = /(\[[ВвУу]\]) ?dddd/.test(format) ? 'accusative' : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(format) ? 'genitive' : 'nominative';
    return weekdays[nounCase][m.day()];
  }

  function processHoursFunction(str) {
    return function () {
      return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
    };
  }

  var uk = moment.defineLocale('uk', {
    months: {
      'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
      'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
    },
    monthsShort: 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
    weekdays: weekdaysCaseReplace,
    weekdaysShort: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
    weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY р.',
      LLL: 'D MMMM YYYY р., HH:mm',
      LLLL: 'dddd, D MMMM YYYY р., HH:mm'
    },
    calendar: {
      sameDay: processHoursFunction('[Сьогодні '),
      nextDay: processHoursFunction('[Завтра '),
      lastDay: processHoursFunction('[Вчора '),
      nextWeek: processHoursFunction('[У] dddd ['),
      lastWeek: function () {
        switch (this.day()) {
          case 0:
          case 3:
          case 5:
          case 6:
            return processHoursFunction('[Минулої] dddd [').call(this);

          case 1:
          case 2:
          case 4:
            return processHoursFunction('[Минулого] dddd [').call(this);
        }
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: 'за %s',
      past: '%s тому',
      s: 'декілька секунд',
      ss: relativeTimeWithPlural,
      m: relativeTimeWithPlural,
      mm: relativeTimeWithPlural,
      h: 'годину',
      hh: relativeTimeWithPlural,
      d: 'день',
      dd: relativeTimeWithPlural,
      M: 'місяць',
      MM: relativeTimeWithPlural,
      y: 'рік',
      yy: relativeTimeWithPlural
    },
    // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
    meridiemParse: /ночі|ранку|дня|вечора/,
    isPM: function (input) {
      return /^(дня|вечора)$/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'ночі';
      } else if (hour < 12) {
        return 'ранку';
      } else if (hour < 17) {
        return 'дня';
      } else {
        return 'вечора';
      }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
    ordinal: function (number, period) {
      switch (period) {
        case 'M':
        case 'd':
        case 'DDD':
        case 'w':
        case 'W':
          return number + '-й';

        case 'D':
          return number + '-го';

        default:
          return number;
      }
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return uk;
});

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var months = ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'];
  var days = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];
  var ur = moment.defineLocale('ur', {
    months: months,
    monthsShort: months,
    weekdays: days,
    weekdaysShort: days,
    weekdaysMin: days,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd، D MMMM YYYY HH:mm'
    },
    meridiemParse: /صبح|شام/,
    isPM: function (input) {
      return 'شام' === input;
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 12) {
        return 'صبح';
      }

      return 'شام';
    },
    calendar: {
      sameDay: '[آج بوقت] LT',
      nextDay: '[کل بوقت] LT',
      nextWeek: 'dddd [بوقت] LT',
      lastDay: '[گذشتہ روز بوقت] LT',
      lastWeek: '[گذشتہ] dddd [بوقت] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s بعد',
      past: '%s قبل',
      s: 'چند سیکنڈ',
      ss: '%d سیکنڈ',
      m: 'ایک منٹ',
      mm: '%d منٹ',
      h: 'ایک گھنٹہ',
      hh: '%d گھنٹے',
      d: 'ایک دن',
      dd: '%d دن',
      M: 'ایک ماہ',
      MM: '%d ماہ',
      y: 'ایک سال',
      yy: '%d سال'
    },
    preparse: function (string) {
      return string.replace(/،/g, ',');
    },
    postformat: function (string) {
      return string.replace(/,/g, '،');
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return ur;
});

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var uz = moment.defineLocale('uz', {
    months: 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
    monthsShort: 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
    weekdays: 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
    weekdaysShort: 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
    weekdaysMin: 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'D MMMM YYYY, dddd HH:mm'
    },
    calendar: {
      sameDay: '[Бугун соат] LT [да]',
      nextDay: '[Эртага] LT [да]',
      nextWeek: 'dddd [куни соат] LT [да]',
      lastDay: '[Кеча соат] LT [да]',
      lastWeek: '[Утган] dddd [куни соат] LT [да]',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'Якин %s ичида',
      past: 'Бир неча %s олдин',
      s: 'фурсат',
      ss: '%d фурсат',
      m: 'бир дакика',
      mm: '%d дакика',
      h: 'бир соат',
      hh: '%d соат',
      d: 'бир кун',
      dd: '%d кун',
      M: 'бир ой',
      MM: '%d ой',
      y: 'бир йил',
      yy: '%d йил'
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return uz;
});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var uzLatn = moment.defineLocale('uz-latn', {
    months: 'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr'.split('_'),
    monthsShort: 'Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split('_'),
    weekdays: 'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split('_'),
    weekdaysShort: 'Yak_Dush_Sesh_Chor_Pay_Jum_Shan'.split('_'),
    weekdaysMin: 'Ya_Du_Se_Cho_Pa_Ju_Sha'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'D MMMM YYYY, dddd HH:mm'
    },
    calendar: {
      sameDay: '[Bugun soat] LT [da]',
      nextDay: '[Ertaga] LT [da]',
      nextWeek: 'dddd [kuni soat] LT [da]',
      lastDay: '[Kecha soat] LT [da]',
      lastWeek: '[O\'tgan] dddd [kuni soat] LT [da]',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'Yaqin %s ichida',
      past: 'Bir necha %s oldin',
      s: 'soniya',
      ss: '%d soniya',
      m: 'bir daqiqa',
      mm: '%d daqiqa',
      h: 'bir soat',
      hh: '%d soat',
      d: 'bir kun',
      dd: '%d kun',
      M: 'bir oy',
      MM: '%d oy',
      y: 'bir yil',
      yy: '%d yil'
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 7 // The week that contains Jan 7th is the first week of the year.

    }
  });
  return uzLatn;
});

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var vi = moment.defineLocale('vi', {
    months: 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
    monthsShort: 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
    monthsParseExact: true,
    weekdays: 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
    weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    weekdaysParseExact: true,
    meridiemParse: /sa|ch/i,
    isPM: function (input) {
      return /^ch$/i.test(input);
    },
    meridiem: function (hours, minutes, isLower) {
      if (hours < 12) {
        return isLower ? 'sa' : 'SA';
      } else {
        return isLower ? 'ch' : 'CH';
      }
    },
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM [năm] YYYY',
      LLL: 'D MMMM [năm] YYYY HH:mm',
      LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
      l: 'DD/M/YYYY',
      ll: 'D MMM YYYY',
      lll: 'D MMM YYYY HH:mm',
      llll: 'ddd, D MMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Hôm nay lúc] LT',
      nextDay: '[Ngày mai lúc] LT',
      nextWeek: 'dddd [tuần tới lúc] LT',
      lastDay: '[Hôm qua lúc] LT',
      lastWeek: 'dddd [tuần rồi lúc] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s tới',
      past: '%s trước',
      s: 'vài giây',
      ss: '%d giây',
      m: 'một phút',
      mm: '%d phút',
      h: 'một giờ',
      hh: '%d giờ',
      d: 'một ngày',
      dd: '%d ngày',
      M: 'một tháng',
      MM: '%d tháng',
      y: 'một năm',
      yy: '%d năm'
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal: function (number) {
      return number;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return vi;
});

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var xPseudo = moment.defineLocale('x-pseudo', {
    months: 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
    monthsShort: 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
    monthsParseExact: true,
    weekdays: 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
    weekdaysShort: 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
    weekdaysMin: 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[T~ódá~ý át] LT',
      nextDay: '[T~ómó~rró~w át] LT',
      nextWeek: 'dddd [át] LT',
      lastDay: '[Ý~ést~érdá~ý át] LT',
      lastWeek: '[L~ást] dddd [át] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'í~ñ %s',
      past: '%s á~gó',
      s: 'á ~féw ~sécó~ñds',
      ss: '%d s~écóñ~ds',
      m: 'á ~míñ~úté',
      mm: '%d m~íñú~tés',
      h: 'á~ñ hó~úr',
      hh: '%d h~óúrs',
      d: 'á ~dáý',
      dd: '%d d~áýs',
      M: 'á ~móñ~th',
      MM: '%d m~óñt~hs',
      y: 'á ~ýéár',
      yy: '%d ý~éárs'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function (number) {
      var b = number % 10,
          output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    },
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return xPseudo;
});

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var yo = moment.defineLocale('yo', {
    months: 'Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀'.split('_'),
    monthsShort: 'Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀'.split('_'),
    weekdays: 'Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta'.split('_'),
    weekdaysShort: 'Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá'.split('_'),
    weekdaysMin: 'Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb'.split('_'),
    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY h:mm A',
      LLLL: 'dddd, D MMMM YYYY h:mm A'
    },
    calendar: {
      sameDay: '[Ònì ni] LT',
      nextDay: '[Ọ̀la ni] LT',
      nextWeek: 'dddd [Ọsẹ̀ tón\'bọ] [ni] LT',
      lastDay: '[Àna ni] LT',
      lastWeek: 'dddd [Ọsẹ̀ tólọ́] [ni] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'ní %s',
      past: '%s kọjá',
      s: 'ìsẹjú aayá die',
      ss: 'aayá %d',
      m: 'ìsẹjú kan',
      mm: 'ìsẹjú %d',
      h: 'wákati kan',
      hh: 'wákati %d',
      d: 'ọjọ́ kan',
      dd: 'ọjọ́ %d',
      M: 'osù kan',
      MM: 'osù %d',
      y: 'ọdún kan',
      yy: 'ọdún %d'
    },
    dayOfMonthOrdinalParse: /ọjọ́\s\d{1,2}/,
    ordinal: 'ọjọ́ %d',
    week: {
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return yo;
});

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var zhCn = moment.defineLocale('zh-cn', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY年M月D日',
      LLL: 'YYYY年M月D日Ah点mm分',
      LLLL: 'YYYY年M月D日ddddAh点mm分',
      l: 'YYYY/M/D',
      ll: 'YYYY年M月D日',
      lll: 'YYYY年M月D日 HH:mm',
      llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
        return hour;
      } else if (meridiem === '下午' || meridiem === '晚上') {
        return hour + 12;
      } else {
        // '中午'
        return hour >= 11 ? hour : hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      var hm = hour * 100 + minute;

      if (hm < 600) {
        return '凌晨';
      } else if (hm < 900) {
        return '早上';
      } else if (hm < 1130) {
        return '上午';
      } else if (hm < 1230) {
        return '中午';
      } else if (hm < 1800) {
        return '下午';
      } else {
        return '晚上';
      }
    },
    calendar: {
      sameDay: '[今天]LT',
      nextDay: '[明天]LT',
      nextWeek: '[下]ddddLT',
      lastDay: '[昨天]LT',
      lastWeek: '[上]ddddLT',
      sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal: function (number, period) {
      switch (period) {
        case 'd':
        case 'D':
        case 'DDD':
          return number + '日';

        case 'M':
          return number + '月';

        case 'w':
        case 'W':
          return number + '周';

        default:
          return number;
      }
    },
    relativeTime: {
      future: '%s内',
      past: '%s前',
      s: '几秒',
      ss: '%d 秒',
      m: '1 分钟',
      mm: '%d 分钟',
      h: '1 小时',
      hh: '%d 小时',
      d: '1 天',
      dd: '%d 天',
      M: '1 个月',
      MM: '%d 个月',
      y: '1 年',
      yy: '%d 年'
    },
    week: {
      // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
      dow: 1,
      // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.

    }
  });
  return zhCn;
});

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var zhHk = moment.defineLocale('zh-hk', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY年M月D日',
      LLL: 'YYYY年M月D日 HH:mm',
      LLLL: 'YYYY年M月D日dddd HH:mm',
      l: 'YYYY/M/D',
      ll: 'YYYY年M月D日',
      lll: 'YYYY年M月D日 HH:mm',
      llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
        return hour;
      } else if (meridiem === '中午') {
        return hour >= 11 ? hour : hour + 12;
      } else if (meridiem === '下午' || meridiem === '晚上') {
        return hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      var hm = hour * 100 + minute;

      if (hm < 600) {
        return '凌晨';
      } else if (hm < 900) {
        return '早上';
      } else if (hm < 1130) {
        return '上午';
      } else if (hm < 1230) {
        return '中午';
      } else if (hm < 1800) {
        return '下午';
      } else {
        return '晚上';
      }
    },
    calendar: {
      sameDay: '[今天]LT',
      nextDay: '[明天]LT',
      nextWeek: '[下]ddddLT',
      lastDay: '[昨天]LT',
      lastWeek: '[上]ddddLT',
      sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
    ordinal: function (number, period) {
      switch (period) {
        case 'd':
        case 'D':
        case 'DDD':
          return number + '日';

        case 'M':
          return number + '月';

        case 'w':
        case 'W':
          return number + '週';

        default:
          return number;
      }
    },
    relativeTime: {
      future: '%s內',
      past: '%s前',
      s: '幾秒',
      ss: '%d 秒',
      m: '1 分鐘',
      mm: '%d 分鐘',
      h: '1 小時',
      hh: '%d 小時',
      d: '1 天',
      dd: '%d 天',
      M: '1 個月',
      MM: '%d 個月',
      y: '1 年',
      yy: '%d 年'
    }
  });
  return zhHk;
});

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
;

(function (global, factory) {
   true ? factory(__webpack_require__(0)) : undefined;
})(this, function (moment) {
  'use strict';

  var zhTw = moment.defineLocale('zh-tw', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY年M月D日',
      LLL: 'YYYY年M月D日 HH:mm',
      LLLL: 'YYYY年M月D日dddd HH:mm',
      l: 'YYYY/M/D',
      ll: 'YYYY年M月D日',
      lll: 'YYYY年M月D日 HH:mm',
      llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
        return hour;
      } else if (meridiem === '中午') {
        return hour >= 11 ? hour : hour + 12;
      } else if (meridiem === '下午' || meridiem === '晚上') {
        return hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      var hm = hour * 100 + minute;

      if (hm < 600) {
        return '凌晨';
      } else if (hm < 900) {
        return '早上';
      } else if (hm < 1130) {
        return '上午';
      } else if (hm < 1230) {
        return '中午';
      } else if (hm < 1800) {
        return '下午';
      } else {
        return '晚上';
      }
    },
    calendar: {
      sameDay: '[今天] LT',
      nextDay: '[明天] LT',
      nextWeek: '[下]dddd LT',
      lastDay: '[昨天] LT',
      lastWeek: '[上]dddd LT',
      sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
    ordinal: function (number, period) {
      switch (period) {
        case 'd':
        case 'D':
        case 'DDD':
          return number + '日';

        case 'M':
          return number + '月';

        case 'w':
        case 'W':
          return number + '週';

        default:
          return number;
      }
    },
    relativeTime: {
      future: '%s內',
      past: '%s前',
      s: '幾秒',
      ss: '%d 秒',
      m: '1 分鐘',
      mm: '%d 分鐘',
      h: '1 小時',
      hh: '%d 小時',
      d: '1 天',
      dd: '%d 天',
      M: '1 個月',
      MM: '%d 個月',
      y: '1 年',
      yy: '%d 年'
    }
  });
  return zhTw;
});

/***/ }),
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cal_heatmap_cal_heatmap_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(135);
/* harmony import */ var cal_heatmap_cal_heatmap_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cal_heatmap_cal_heatmap_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_charts_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(136);
/* harmony import */ var _css_charts_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_charts_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap_toggle_css_bootstrap_toggle_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(137);
/* harmony import */ var bootstrap_toggle_css_bootstrap_toggle_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_toggle_css_bootstrap_toggle_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_toggle_js_bootstrap_toggle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(138);
/* harmony import */ var bootstrap_toggle_js_bootstrap_toggle_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_toggle_js_bootstrap_toggle_js__WEBPACK_IMPORTED_MODULE_3__);
/**
 * chart.js
 */
// import "d3/d3.js";




window.d3 = __webpack_require__(1);
window.moment = __webpack_require__(0);
var today = moment();
var lastHour = today.clone().startOf('hour');
var yesterday = today.clone().subtract(1, 'days');
var lastMonth = today.clone().subtract(1, 'months');
var thisWeek = today.clone().startOf('week');
var thisYear = today.clone().startOf('year');
var granularityConfig = {
  'h': {
    cellSize: 32,
    colLimit: 2,
    displayErrors: function () {
      return '!';
    },
    domain: 'hour',
    range: 1,
    start: lastHour.toDate(),
    subDomain: 'x_min',
    verticalOrientation: true,
    domainLabelFormat: "%H:%M",
    subDomainDateFormat: "%H:%M"
  },
  'd': {
    cellSize: 43,
    colLimit: 1,
    domain: 'day',
    domainGutter: 10,
    range: 1,
    start: today.toDate(),
    subDomain: 'x_hour',
    domainLabelFormat: "%a, %d %B",
    subDomainDateFormat: "%H:%M"
  },
  'w': {
    cellSize: 30,
    colLimit: 6,
    domain: 'day',
    domainGutter: 15,
    range: 7,
    start: thisWeek.toDate(),
    subDomain: 'x_hour',
    domainLabelFormat: "%a, %d %B",
    subDomainDateFormat: "%H:%M"
  },
  'm': {
    cellSize: 20,
    domain: 'day',
    subDomain: 'hour',
    start: today.clone().startOf('month').toDate(),
    verticalOrientation: true,
    range: 31,
    rowLimit: 1,
    label: {
      position: "left",
      offset: {
        x: 20,
        y: 12
      },
      width: 110
    },
    legendHorizontalPosition: "right",
    domainLabelFormat: "%a, %d %B",
    subDomainDateFormat: "%H:%M",
    noData: ''
  },
  'y': {
    cellSize: 15,
    domain: 'month',
    legendHorizontalPosition: "right",
    maxDate: thisYear.toDate(),
    minDate: thisYear.toDate(),
    start: thisYear.toDate(),
    subDomain: 'day',
    success: '',
    noData: '',
    displayErrors: function (value) {
      return '';
    }
  }
};

var noop = function () {};

var commonConfig = {
  cellSize: 12,
  cellPadding: 2,
  cellRadius: 2,
  maxDate: today.toDate(),
  itemName: ['error', 'errors'],
  noData: 'n/a',
  success: 'ok',
  displayErrors: function (value) {
    return value;
  },
  subDomainTextFormat: function (date, value) {
    if (value === undefined) {
      return;
    }

    if (value === null) {
      return this.noData;
    }

    if (value === 0) {
      return this.success;
    }

    return this.displayErrors(value);
  },
  label: {
    position: "top"
  },
  afterLoadData: function (data) {
    var stats = {};

    for (var d in data.values) {
      if (d) {
        stats[data.values[d].date] = data.values[d].value;
      }
    }

    return stats;
  },
  tooltip: true,
  displayLegend: false,
  legend: [0, 1, 5, 10, 20]
};

var getChart = function (name, granularity, urlPrefix) {
  var cal = new CalHeatMap();
  var localCfg = $.extend({}, calCfg, {
    itemSelector: "#chart-" + name,
    itemNamespace: name,
    data: urlPrefix + "/data/" + name + "/" + granularity,
    nextSelector: "#next" + name,
    previousSelector: "#previous" + name
  });
  cal._data = localCfg.data;
  cal.graphDim.height = 0;
  cal.init(localCfg);
  return cal;
};

var initChartPage = function () {
  $.extend($.scrollTo.defaults, {
    axis: 'y',
    duration: 0
  });
  $(".menu-item").click(function (e) {
    e.preventDefault();
    var linkId = $(this).attr('href');
    $.scrollTo($(linkId).offset().top - 65);
    return false;
  });
};

window.chartConfig = {
  granularity: granularityConfig,
  common: commonConfig,
  getChart: getChart,
  initChartPage: initChartPage
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 138 */
/***/ (function(module, exports) {

/*! ========================================================================
 * Bootstrap Toggle: bootstrap-toggle.js v2.2.0
 * http://www.bootstraptoggle.com
 * ========================================================================
 * Copyright 2014 Min Hur, The New York Times Company
 * Licensed under MIT
 * ======================================================================== */
+function ($) {
  'use strict'; // TOGGLE PUBLIC CLASS DEFINITION
  // ==============================

  var Toggle = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, this.defaults(), options);
    this.render();
  };

  Toggle.VERSION = '2.2.0';
  Toggle.DEFAULTS = {
    on: 'On',
    off: 'Off',
    onstyle: 'primary',
    offstyle: 'default',
    size: 'normal',
    style: '',
    width: null,
    height: null
  };

  Toggle.prototype.defaults = function () {
    return {
      on: this.$element.attr('data-on') || Toggle.DEFAULTS.on,
      off: this.$element.attr('data-off') || Toggle.DEFAULTS.off,
      onstyle: this.$element.attr('data-onstyle') || Toggle.DEFAULTS.onstyle,
      offstyle: this.$element.attr('data-offstyle') || Toggle.DEFAULTS.offstyle,
      size: this.$element.attr('data-size') || Toggle.DEFAULTS.size,
      style: this.$element.attr('data-style') || Toggle.DEFAULTS.style,
      width: this.$element.attr('data-width') || Toggle.DEFAULTS.width,
      height: this.$element.attr('data-height') || Toggle.DEFAULTS.height
    };
  };

  Toggle.prototype.render = function () {
    this._onstyle = 'btn-' + this.options.onstyle;
    this._offstyle = 'btn-' + this.options.offstyle;
    var size = this.options.size === 'large' ? 'btn-lg' : this.options.size === 'small' ? 'btn-sm' : this.options.size === 'mini' ? 'btn-xs' : '';
    var $toggleOn = $('<label class="btn">').html(this.options.on).addClass(this._onstyle + ' ' + size);
    var $toggleOff = $('<label class="btn">').html(this.options.off).addClass(this._offstyle + ' ' + size + ' active');
    var $toggleHandle = $('<span class="toggle-handle btn btn-default">').addClass(size);
    var $toggleGroup = $('<div class="toggle-group">').append($toggleOn, $toggleOff, $toggleHandle);
    var $toggle = $('<div class="toggle btn" data-toggle="toggle">').addClass(this.$element.prop('checked') ? this._onstyle : this._offstyle + ' off').addClass(size).addClass(this.options.style);
    this.$element.wrap($toggle);
    $.extend(this, {
      $toggle: this.$element.parent(),
      $toggleOn: $toggleOn,
      $toggleOff: $toggleOff,
      $toggleGroup: $toggleGroup
    });
    this.$toggle.append($toggleGroup);
    var width = this.options.width || Math.max($toggleOn.outerWidth(), $toggleOff.outerWidth()) + $toggleHandle.outerWidth() / 2;
    var height = this.options.height || Math.max($toggleOn.outerHeight(), $toggleOff.outerHeight());
    $toggleOn.addClass('toggle-on');
    $toggleOff.addClass('toggle-off');
    this.$toggle.css({
      width: width,
      height: height
    });

    if (this.options.height) {
      $toggleOn.css('line-height', $toggleOn.height() + 'px');
      $toggleOff.css('line-height', $toggleOff.height() + 'px');
    }

    this.update(true);
    this.trigger(true);
  };

  Toggle.prototype.toggle = function () {
    if (this.$element.prop('checked')) this.off();else this.on();
  };

  Toggle.prototype.on = function (silent) {
    if (this.$element.prop('disabled')) return false;
    this.$toggle.removeClass(this._offstyle + ' off').addClass(this._onstyle);
    this.$element.prop('checked', true);
    if (!silent) this.trigger();
  };

  Toggle.prototype.off = function (silent) {
    if (this.$element.prop('disabled')) return false;
    this.$toggle.removeClass(this._onstyle).addClass(this._offstyle + ' off');
    this.$element.prop('checked', false);
    if (!silent) this.trigger();
  };

  Toggle.prototype.enable = function () {
    this.$toggle.removeAttr('disabled');
    this.$element.prop('disabled', false);
  };

  Toggle.prototype.disable = function () {
    this.$toggle.attr('disabled', 'disabled');
    this.$element.prop('disabled', true);
  };

  Toggle.prototype.update = function (silent) {
    if (this.$element.prop('disabled')) this.disable();else this.enable();
    if (this.$element.prop('checked')) this.on(silent);else this.off(silent);
  };

  Toggle.prototype.trigger = function (silent) {
    this.$element.off('change.bs.toggle');
    if (!silent) this.$element.change();
    this.$element.on('change.bs.toggle', $.proxy(function () {
      this.update();
    }, this));
  };

  Toggle.prototype.destroy = function () {
    this.$element.off('change.bs.toggle');
    this.$toggleGroup.remove();
    this.$element.removeData('bs.toggle');
    this.$element.unwrap();
  }; // TOGGLE PLUGIN DEFINITION
  // ========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.toggle');
      var options = typeof option == 'object' && option;
      if (!data) $this.data('bs.toggle', data = new Toggle(this, options));
      if (typeof option == 'string' && data[option]) data[option]();
    });
  }

  var old = $.fn.bootstrapToggle;
  $.fn.bootstrapToggle = Plugin;
  $.fn.bootstrapToggle.Constructor = Toggle; // TOGGLE NO CONFLICT
  // ==================

  $.fn.toggle.noConflict = function () {
    $.fn.bootstrapToggle = old;
    return this;
  }; // TOGGLE DATA-API
  // ===============


  $(function () {
    $('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle();
  });
  $(document).on('click.bs.toggle', 'div[data-toggle^=toggle]', function (e) {
    var $checkbox = $(this).find('input[type=checkbox]');
    $checkbox.bootstrapToggle('toggle');
    e.preventDefault();
  });
}(jQuery);

/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function () {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function () {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 2,
	"./af.js": 2,
	"./ar": 3,
	"./ar-dz": 4,
	"./ar-dz.js": 4,
	"./ar-kw": 5,
	"./ar-kw.js": 5,
	"./ar-ly": 6,
	"./ar-ly.js": 6,
	"./ar-ma": 7,
	"./ar-ma.js": 7,
	"./ar-sa": 8,
	"./ar-sa.js": 8,
	"./ar-tn": 9,
	"./ar-tn.js": 9,
	"./ar.js": 3,
	"./az": 10,
	"./az.js": 10,
	"./be": 11,
	"./be.js": 11,
	"./bg": 12,
	"./bg.js": 12,
	"./bm": 13,
	"./bm.js": 13,
	"./bn": 14,
	"./bn.js": 14,
	"./bo": 15,
	"./bo.js": 15,
	"./br": 16,
	"./br.js": 16,
	"./bs": 17,
	"./bs.js": 17,
	"./ca": 18,
	"./ca.js": 18,
	"./cs": 19,
	"./cs.js": 19,
	"./cv": 20,
	"./cv.js": 20,
	"./cy": 21,
	"./cy.js": 21,
	"./da": 22,
	"./da.js": 22,
	"./de": 23,
	"./de-at": 24,
	"./de-at.js": 24,
	"./de-ch": 25,
	"./de-ch.js": 25,
	"./de.js": 23,
	"./dv": 26,
	"./dv.js": 26,
	"./el": 27,
	"./el.js": 27,
	"./en-SG": 28,
	"./en-SG.js": 28,
	"./en-au": 29,
	"./en-au.js": 29,
	"./en-ca": 30,
	"./en-ca.js": 30,
	"./en-gb": 31,
	"./en-gb.js": 31,
	"./en-ie": 32,
	"./en-ie.js": 32,
	"./en-il": 33,
	"./en-il.js": 33,
	"./en-nz": 34,
	"./en-nz.js": 34,
	"./eo": 35,
	"./eo.js": 35,
	"./es": 36,
	"./es-do": 37,
	"./es-do.js": 37,
	"./es-us": 38,
	"./es-us.js": 38,
	"./es.js": 36,
	"./et": 39,
	"./et.js": 39,
	"./eu": 40,
	"./eu.js": 40,
	"./fa": 41,
	"./fa.js": 41,
	"./fi": 42,
	"./fi.js": 42,
	"./fo": 43,
	"./fo.js": 43,
	"./fr": 44,
	"./fr-ca": 45,
	"./fr-ca.js": 45,
	"./fr-ch": 46,
	"./fr-ch.js": 46,
	"./fr.js": 44,
	"./fy": 47,
	"./fy.js": 47,
	"./ga": 48,
	"./ga.js": 48,
	"./gd": 49,
	"./gd.js": 49,
	"./gl": 50,
	"./gl.js": 50,
	"./gom-latn": 51,
	"./gom-latn.js": 51,
	"./gu": 52,
	"./gu.js": 52,
	"./he": 53,
	"./he.js": 53,
	"./hi": 54,
	"./hi.js": 54,
	"./hr": 55,
	"./hr.js": 55,
	"./hu": 56,
	"./hu.js": 56,
	"./hy-am": 57,
	"./hy-am.js": 57,
	"./id": 58,
	"./id.js": 58,
	"./is": 59,
	"./is.js": 59,
	"./it": 60,
	"./it-ch": 61,
	"./it-ch.js": 61,
	"./it.js": 60,
	"./ja": 62,
	"./ja.js": 62,
	"./jv": 63,
	"./jv.js": 63,
	"./ka": 64,
	"./ka.js": 64,
	"./kk": 65,
	"./kk.js": 65,
	"./km": 66,
	"./km.js": 66,
	"./kn": 67,
	"./kn.js": 67,
	"./ko": 68,
	"./ko.js": 68,
	"./ku": 69,
	"./ku.js": 69,
	"./ky": 70,
	"./ky.js": 70,
	"./lb": 71,
	"./lb.js": 71,
	"./lo": 72,
	"./lo.js": 72,
	"./lt": 73,
	"./lt.js": 73,
	"./lv": 74,
	"./lv.js": 74,
	"./me": 75,
	"./me.js": 75,
	"./mi": 76,
	"./mi.js": 76,
	"./mk": 77,
	"./mk.js": 77,
	"./ml": 78,
	"./ml.js": 78,
	"./mn": 79,
	"./mn.js": 79,
	"./mr": 80,
	"./mr.js": 80,
	"./ms": 81,
	"./ms-my": 82,
	"./ms-my.js": 82,
	"./ms.js": 81,
	"./mt": 83,
	"./mt.js": 83,
	"./my": 84,
	"./my.js": 84,
	"./nb": 85,
	"./nb.js": 85,
	"./ne": 86,
	"./ne.js": 86,
	"./nl": 87,
	"./nl-be": 88,
	"./nl-be.js": 88,
	"./nl.js": 87,
	"./nn": 89,
	"./nn.js": 89,
	"./pa-in": 90,
	"./pa-in.js": 90,
	"./pl": 91,
	"./pl.js": 91,
	"./pt": 92,
	"./pt-br": 93,
	"./pt-br.js": 93,
	"./pt.js": 92,
	"./ro": 94,
	"./ro.js": 94,
	"./ru": 95,
	"./ru.js": 95,
	"./sd": 96,
	"./sd.js": 96,
	"./se": 97,
	"./se.js": 97,
	"./si": 98,
	"./si.js": 98,
	"./sk": 99,
	"./sk.js": 99,
	"./sl": 100,
	"./sl.js": 100,
	"./sq": 101,
	"./sq.js": 101,
	"./sr": 102,
	"./sr-cyrl": 103,
	"./sr-cyrl.js": 103,
	"./sr.js": 102,
	"./ss": 104,
	"./ss.js": 104,
	"./sv": 105,
	"./sv.js": 105,
	"./sw": 106,
	"./sw.js": 106,
	"./ta": 107,
	"./ta.js": 107,
	"./te": 108,
	"./te.js": 108,
	"./tet": 109,
	"./tet.js": 109,
	"./tg": 110,
	"./tg.js": 110,
	"./th": 111,
	"./th.js": 111,
	"./tl-ph": 112,
	"./tl-ph.js": 112,
	"./tlh": 113,
	"./tlh.js": 113,
	"./tr": 114,
	"./tr.js": 114,
	"./tzl": 115,
	"./tzl.js": 115,
	"./tzm": 116,
	"./tzm-latn": 117,
	"./tzm-latn.js": 117,
	"./tzm.js": 116,
	"./ug-cn": 118,
	"./ug-cn.js": 118,
	"./uk": 119,
	"./uk.js": 119,
	"./ur": 120,
	"./ur.js": 120,
	"./uz": 121,
	"./uz-latn": 122,
	"./uz-latn.js": 122,
	"./uz.js": 121,
	"./vi": 123,
	"./vi.js": 123,
	"./x-pseudo": 124,
	"./x-pseudo.js": 124,
	"./yo": 125,
	"./yo.js": 125,
	"./zh-cn": 126,
	"./zh-cn.js": 126,
	"./zh-hk": 127,
	"./zh-hk.js": 127,
	"./zh-tw": 128,
	"./zh-tw.js": 128
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 140;

/***/ })
/******/ ]);