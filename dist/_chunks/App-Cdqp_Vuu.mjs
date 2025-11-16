import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNotification, Page } from "@strapi/strapi/admin";
import { useParams, useSearchParams, Link as Link$1, Routes, Route } from "react-router-dom";
import { Modal, Flex, Field, Textarea, Button, Pagination as Pagination$1, PreviousLink, PageLink, Dots, NextLink, Typography, Box, Table, Thead, Tr, Th, Tbody, Td, Link, Badge, EmptyStateLayout, Loader, Main, Breadcrumbs, CrumbLink, Crumb, Card, CardBody, CardContent, CardTitle, Divider, Grid, SingleSelect, SingleSelectOption, Switch, DesignSystemProvider, darkTheme } from "@strapi/design-system";
import { Trash, Plus, Pencil, Cog, Duplicate } from "@strapi/icons";
import { useState, useImperativeHandle, forwardRef, useRef, useEffect, useMemo } from "react";
import { P as PLUGIN_ID } from "./index-BCw2dI3N.mjs";
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction$1 = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction$1(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction$1(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless, skipUndefined } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction$1(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction$1(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction$1(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction$1(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
function AxiosError$1(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  const msg = error && error.message ? error.message : "Error";
  const errCode = code == null && error ? error.code : code;
  AxiosError$1.call(axiosError, msg, errCode, config, request, response);
  if (error && axiosError.cause == null) {
    Object.defineProperty(axiosError, "cause", { value: error, configurable: true });
  }
  axiosError.name = error && error.name || "Error";
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data, this.parseReviver);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message, config, request) {
  AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if (utils$1.isFunction(data.getHeaders)) {
      const formHeaders = data.getHeaders();
      const allowedHeaders = ["content-type", "content-length"];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError(event) {
      const msg = event && event.message ? event.message : "Network Error";
      const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
      err.event = event || null;
      reject(err);
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const { isFunction } = utils$1;
const globalFetchAPI = (({ Request, Response }) => ({
  Request,
  Response
}))(utils$1.global);
const {
  ReadableStream: ReadableStream$1,
  TextEncoder
} = utils$1.global;
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const factory = (env) => {
  env = utils$1.merge.call({
    skipUndefined: true
  }, globalFetchAPI, env);
  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);
  if (!isFetchSupported) {
    return false;
  }
  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream$1);
  const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream$1(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  });
  const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && (() => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = (res, config) => {
        let method = res && res[type];
        if (method) {
          return method.call(res);
        }
        throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
      });
    });
  })();
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  return async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig(config);
    let _fetch = envFetch || fetch;
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
    let request = null;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      };
      request = isRequestSupported && new Request(url, resolvedOptions);
      let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError$1.from(err, err && err.code, config, request);
    }
  };
};
const seedCache = /* @__PURE__ */ new Map();
const getFetch = (config) => {
  let env = config ? config.env : {};
  const { fetch: fetch2, Request, Response } = env;
  const seeds = [
    Request,
    Response,
    fetch2
  ];
  let len = seeds.length, i = len, seed, target, map = seedCache;
  while (i--) {
    seed = seeds[i];
    target = map.get(seed);
    target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
    map = target;
  }
  return target;
};
getFetch();
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: {
    get: getFetch
  }
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2, config) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }
      if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION$1 = "1.12.2";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;
const createNamespace = async ({
  projectId,
  name,
  description
}) => {
  return axios.post(`/${PLUGIN_ID}/api/projects/${projectId}/namespaces`, { name, description }).then((res) => res.data);
};
const updateNamespace = async ({
  projectId,
  id,
  name,
  description
}) => {
  return axios.put(`/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${id}`, { name, description }).then((res) => res.data);
};
const deleteNamespace$1 = async (id) => {
  return axios.delete(`/${PLUGIN_ID}/api/projects/${id}/namespaces/${id}`).then((res) => res.data);
};
const useHook$7 = ({ projectId, ref, refetch }) => {
  const [currentNamespace, setCurrentNamespace] = useState(null);
  const [description, setDescription] = useState("");
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleDelete = async () => {
    if (currentNamespace) {
      setIsLoadingDelete(true);
      await deleteNamespace$1(currentNamespace.id);
      setIsLoadingDelete(false);
    }
    handleClose();
    refetch();
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleOpenChange = (open) => {
    setIsOpen(open);
  };
  const handleOpenModal = (data) => {
    setIsOpen(true);
    setCurrentNamespace(data || null);
    if (data) {
      setName(data.name);
      setDescription(data.description || "");
    } else {
      setName("");
      setDescription("");
    }
  };
  const handleSave = async () => {
    setIsLoadingSave(true);
    try {
      if (currentNamespace) {
        await updateNamespace({ id: currentNamespace.id, description, name, projectId });
      } else {
        await createNamespace({ projectId, name, description });
      }
      handleClose();
      refetch();
    } catch (error) {
      console.error("Error saving namespace:", error);
    }
    setIsLoadingSave(false);
  };
  useImperativeHandle(ref, () => ({
    open: handleOpenModal
  }));
  return {
    currentNamespace,
    description,
    handleClose,
    handleDelete,
    handleDescriptionChange,
    handleNameChange,
    handleOpenChange,
    handleSave,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    name
  };
};
const NamespaceCreateEditModal = forwardRef(({ projectId, refetch }, ref) => {
  const {
    currentNamespace,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    name,
    description,
    handleClose,
    handleDelete,
    handleDescriptionChange,
    handleNameChange,
    handleOpenChange,
    handleSave
  } = useHook$7({ projectId, ref, refetch });
  return /* @__PURE__ */ jsx(Modal.Root, { open: isOpen, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: "Create namespace" }) }),
    /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Flex, { flex: "1", direction: "column", gap: "2rem", children: [
      /* @__PURE__ */ jsxs(Field.Root, { flex: "1", required: true, width: "100%", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Name" }),
        /* @__PURE__ */ jsx(Field.Input, { value: name, onChange: handleNameChange })
      ] }),
      /* @__PURE__ */ jsxs(Field.Root, { flex: "1", width: "100%", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Description" }),
        /* @__PURE__ */ jsx(Textarea, { value: description, onChange: handleDescriptionChange })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      !!currentNamespace && /* @__PURE__ */ jsx(
        Button,
        {
          color: "white",
          gap: "0",
          loading: isLoadingDelete,
          variant: "secondary",
          onClick: handleDelete,
          startIcon: /* @__PURE__ */ jsx(Trash, { color: "white" })
        }
      ),
      /* @__PURE__ */ jsxs(Flex, { gap: "1rem", children: [
        /* @__PURE__ */ jsx(Button, { onClick: handleClose, variant: "tertiary", children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { loading: isLoadingSave, onClick: handleSave, children: "Save" })
      ] })
    ] })
  ] }) });
});
const getNamespaces$2 = async ({ page, projectId }) => {
  return axios(
    `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/missing-translations?page=${page}`
  ).then((res) => res.data);
};
const deleteNamespace = async ({
  namespaceId,
  projectId
}) => {
  try {
    const response = await axios.delete(
      `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const useHook$6 = () => {
  const { projectId } = useParams();
  const [params, setParams] = useSearchParams();
  const confirmDeleteModalRef = useRef(null);
  const namespaceCreatedEditModalRef = useRef(null);
  const [isPending, setIsPending] = useState(true);
  const [namespaces, setNamespaces] = useState(null);
  const [selectedDeleteNamespace, setSelectedDeleteNamespace] = useState(null);
  const handleEditNamespace = (namespace) => () => {
    namespaceCreatedEditModalRef.current?.open(namespace);
  };
  const handleToggleDeleteNamespace = (namespace) => async () => {
    if (namespace) {
      setSelectedDeleteNamespace(namespace);
      confirmDeleteModalRef.current?.open(namespace);
    } else {
      setSelectedDeleteNamespace(null);
    }
  };
  const handleDeleteConfirm = async () => {
    if (projectId && selectedDeleteNamespace?.id) {
      try {
        await deleteNamespace({
          namespaceId: Number(selectedDeleteNamespace.id),
          projectId: Number(projectId)
        });
        handleRefetch();
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  };
  const handleNamespaceCreate = () => {
    namespaceCreatedEditModalRef.current?.open();
  };
  const handlePagePress = (page) => {
    setParams({ page: String(page) });
    handleRefetch({ page });
  };
  const handleRefetch = async ({ page } = { page: Number(params.get("page")) || 1 }) => {
    if (projectId) {
      setIsPending(true);
      const data = await getNamespaces$2({ page, projectId });
      setNamespaces(data);
      setIsPending(false);
    }
  };
  useEffect(() => {
    if (projectId) {
      const page = Number(params.get("page")) || 1;
      handleRefetch({ page });
    }
  }, [projectId]);
  return {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditNamespace,
    handleNamespaceCreate,
    handlePagePress,
    handleRefetch,
    handleToggleDeleteNamespace,
    isPending,
    namespaces,
    namespaceCreatedEditModalRef,
    projectId,
    selectedDeleteNamespace
  };
};
const Pagination = ({
  pagination: paginationProp,
  onPagePress
}) => {
  const pagination = useMemo(() => {
    if (!paginationProp) {
      return null;
    }
    return {
      page: paginationProp.page || 1,
      pages: Array.from({ length: paginationProp.pageCount }).map((_, i) => i),
      split: paginationProp.pageCount > 5
    };
  }, [paginationProp]);
  const handlePagePress = (page) => () => {
    onPagePress(page);
  };
  if (!pagination || pagination.pages.length === 1) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  if (pagination.split)
    return /* @__PURE__ */ jsxs(Pagination$1, { activePage: pagination.page, pageCount: pagination.pages.length, children: [
      /* @__PURE__ */ jsx(
        PreviousLink,
        {
          disabled: pagination.page === 1,
          onClick: handlePagePress(pagination.page - 1),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsxs(
        PageLink,
        {
          number: pagination.page <= pagination.pages.length - 4 ? pagination.page : pagination.pages.length - 3,
          onClick: handlePagePress(
            pagination.page <= pagination.pages.length - 4 ? pagination.page : pagination.pages.length - 3
          ),
          children: [
            "Go to",
            " ",
            pagination.page <= pagination.pages.length - 4 ? pagination.page : pagination.pages.length - 3
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        PageLink,
        {
          number: pagination.page <= pagination.pages.length - 4 ? pagination.page + 1 : pagination.pages.length - 2,
          onClick: handlePagePress(
            pagination.page <= pagination.pages.length - 4 ? pagination.page + 1 : pagination.pages.length - 2
          ),
          children: [
            "Go to",
            " ",
            pagination.page <= pagination.pages.length - 4 ? pagination.page + 1 : pagination.pages.length - 2
          ]
        }
      ),
      pagination.page <= pagination.pages.length - 4 && /* @__PURE__ */ jsx(Dots, { children: `And ${pagination.pages.length - 4} other links` }),
      /* @__PURE__ */ jsxs(
        PageLink,
        {
          number: pagination.pages.length - 1,
          onClick: handlePagePress(pagination.pages.length - 1),
          children: [
            "Go to ",
            pagination.pages.length
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        PageLink,
        {
          number: pagination.pages.length,
          onClick: handlePagePress(pagination.pages.length),
          children: [
            "Go to ",
            pagination.pages.length
          ]
        }
      ),
      /* @__PURE__ */ jsx(NextLink, { onClick: handlePagePress(pagination.page + 1), children: "Next page" })
    ] });
  return /* @__PURE__ */ jsxs(Pagination$1, { activePage: pagination.page, pageCount: pagination.pages.length, children: [
    /* @__PURE__ */ jsx(
      PreviousLink,
      {
        tag: "div",
        disabled: pagination.page - 1 <= 0,
        onClick: handlePagePress(pagination.page - 1),
        children: "Previous"
      }
    ),
    pagination.pages.map((page) => /* @__PURE__ */ jsxs(PageLink, { tag: "a", number: page + 1, onClick: handlePagePress(page + 1), children: [
      "Go to ",
      page + 1
    ] }, page)),
    /* @__PURE__ */ jsx(
      NextLink,
      {
        tag: "div",
        disabled: pagination.page + 1 > pagination.pages.length,
        onClick: handlePagePress(pagination.page + 1),
        children: "Next page"
      }
    )
  ] });
};
const useHook$5 = ({ onCancel, onConfirm, ref }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    if (onCancel) {
      onCancel();
    }
  };
  const handleConfirm = async () => {
    setIsLoadingConfirm(true);
    const res = await onConfirm();
    setIsLoadingConfirm(false);
    if (res) {
      setIsOpen(false);
    }
  };
  useImperativeHandle(ref, () => ({
    open: handleOpen
  }));
  return {
    isOpen,
    isLoadingConfirm,
    handleOpen,
    handleClose,
    handleConfirm
  };
};
const ConfirmModal = forwardRef(
  ({ onCancel, onConfirm, text, title }, ref) => {
    const { handleClose, handleConfirm, isOpen, isLoadingConfirm } = useHook$5({
      onCancel,
      onConfirm,
      ref
    });
    return /* @__PURE__ */ jsx(Modal.Root, { open: isOpen, onOpenChange: handleClose, children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
      /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: title }) }),
      /* @__PURE__ */ jsx(Modal.Body, { style: { paddingLeft: "2rem", paddingRight: "1rem" }, children: /* @__PURE__ */ jsx(Typography, { children: text }) }),
      /* @__PURE__ */ jsx(Modal.Footer, { children: /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", alignItems: "center", width: "100%", children: [
        /* @__PURE__ */ jsx(Flex, { flex: "1" }),
        /* @__PURE__ */ jsxs(Flex, { gap: "1rem", children: [
          /* @__PURE__ */ jsx(Button, { onClick: handleClose, variant: "tertiary", children: "Cancel" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              color: "white",
              loading: isLoadingConfirm,
              onClick: handleConfirm,
              startIcon: /* @__PURE__ */ jsx(Trash, { color: "white" }),
              variant: "danger",
              style: { color: "white" },
              children: "Confirm"
            }
          )
        ] })
      ] }) })
    ] }) });
  }
);
const Namespaces = () => {
  const {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditNamespace,
    handleNamespaceCreate,
    handlePagePress,
    handleRefetch,
    handleToggleDeleteNamespace,
    isPending,
    namespaces,
    namespaceCreatedEditModalRef,
    projectId,
    selectedDeleteNamespace
  } = useHook$6();
  const renderLoader = () => {
    if (isPending && !namespaces?.items.length) {
      return /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Loader, {}) });
    }
    return /* @__PURE__ */ jsx(Fragment, {});
  };
  const renderEmptyState = () => {
    if (!isPending && !namespaces?.items.length) {
      return /* @__PURE__ */ jsx(Box, { background: "neutral100", children: /* @__PURE__ */ jsx(
        EmptyStateLayout,
        {
          content: "You don't have any namespaces yet.",
          action: /* @__PURE__ */ jsx(Button, { onClick: handleNamespaceCreate, startIcon: /* @__PURE__ */ jsx(Plus, {}), variant: "secondary", children: "Create your first namespace" })
        }
      ) });
    }
    return /* @__PURE__ */ jsx(Fragment, {});
  };
  const renderContent = () => {
    if (!isPending && !namespaces?.items.length) {
      return /* @__PURE__ */ jsx(Fragment, {});
    }
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      !!namespaces?.items?.length && /* @__PURE__ */ jsx(
        Button,
        {
          marginBottom: "1rem",
          onClick: handleNamespaceCreate,
          startIcon: /* @__PURE__ */ jsx(Plus, {}),
          variant: "secondary",
          children: "Add namespace"
        }
      ),
      /* @__PURE__ */ jsxs(Box, { paddingTop: "1rem", paddingBottom: "1rem", children: [
        /* @__PURE__ */ jsxs(Table, { colCount: 3, rowCount: namespaces?.items?.length || 0, children: [
          /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { style: { width: "280px" }, children: [
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Namespace" }) }),
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Description" }) }),
            /* @__PURE__ */ jsx(Th, { style: { width: "120px" }, children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Actions" }) })
          ] }) }),
          /* @__PURE__ */ jsx(Tbody, { children: namespaces?.items?.map((namespace) => /* @__PURE__ */ jsxs(Tr, { children: [
            /* @__PURE__ */ jsx(Td, { style: { width: "280px" }, children: /* @__PURE__ */ jsx(
              Link,
              {
                href: `/admin/plugins/${PLUGIN_ID}/projects/${projectId}/namespaces/${namespace.id}`,
                children: /* @__PURE__ */ jsxs(Flex, { gap: 2, paddingTop: "15px", children: [
                  /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", variant: "omega", style: { color: "white" }, children: namespace.name }),
                  !!namespace.missingTranslationsCount && /* @__PURE__ */ jsxs(Badge, { backgroundColor: "red", style: { padding: "2px 6px" }, children: [
                    /* @__PURE__ */ jsx(Typography, { textColor: "white", fontSize: "9px", children: "Missing" }),
                    /* @__PURE__ */ jsx(
                      Typography,
                      {
                        marginLeft: "4px",
                        fontWeight: "bold",
                        textColor: "white",
                        fontSize: "10px",
                        children: namespace.missingTranslationsCount
                      }
                    )
                  ] })
                ] })
              }
            ) }),
            /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "omega", children: namespace.description }) }),
            /* @__PURE__ */ jsx(Td, { style: { width: "120px" }, children: /* @__PURE__ */ jsxs(Flex, { gap: "0.5rem", justifyContent: "flex-end", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  gap: "0",
                  onClick: handleEditNamespace(namespace),
                  variant: "secondary",
                  startIcon: /* @__PURE__ */ jsx(Pencil, {})
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  gap: "0",
                  onClick: handleToggleDeleteNamespace(namespace),
                  startIcon: /* @__PURE__ */ jsx(Trash, { color: "white" }),
                  variant: "danger"
                }
              )
            ] }) })
          ] }, namespace.id)) })
        ] }),
        /* @__PURE__ */ jsx(Flex, { justifyContent: "space-between", paddingTop: "1rem", children: namespaces?.pagination && /* @__PURE__ */ jsx(Pagination, { pagination: namespaces?.pagination, onPagePress: handlePagePress }) })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    renderContent(),
    renderEmptyState(),
    renderLoader(),
    /* @__PURE__ */ jsx(
      NamespaceCreateEditModal,
      {
        ref: namespaceCreatedEditModalRef,
        projectId,
        refetch: handleRefetch
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmModal,
      {
        ref: confirmDeleteModalRef,
        onCancel: handleToggleDeleteNamespace(),
        onConfirm: handleDeleteConfirm,
        text: `Are you sure you want to delete "${selectedDeleteNamespace?.name}"? This action cannot be undone.`,
        title: "Delete namespace"
      }
    )
  ] });
};
const NamespacesPage = () => /* @__PURE__ */ jsxs(Main, { padding: "2rem", children: [
  /* @__PURE__ */ jsxs(Box, { paddingBottom: "1rem", children: [
    /* @__PURE__ */ jsx(Flex, { paddingBottom: "0.5rem", gap: "1rem", children: /* @__PURE__ */ jsx(Typography, { variant: "alpha", children: "Static translations" }) }),
    /* @__PURE__ */ jsxs(Breadcrumbs, { label: "Folder navigatation", children: [
      /* @__PURE__ */ jsx(CrumbLink, { href: `/admin/plugins/${PLUGIN_ID}`, children: "Projects" }),
      /* @__PURE__ */ jsx(Crumb, { isCurrent: true, children: "Namespaces" })
    ] })
  ] }),
  /* @__PURE__ */ jsx(Box, { padding: "1rem", children: /* @__PURE__ */ jsx(Namespaces, {}) })
] });
const getApiKey = async () => {
  return axios(`/${PLUGIN_ID}/api/settings/api-key`).then((res) => res.data);
};
const regenerateApiKey = async () => {
  const res = await axios.post(`/${PLUGIN_ID}/api/settings/api-key/regenerate`);
  return res.data;
};
const useHook$4 = () => {
  const { toggleNotification } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleFetchApiKey = async () => {
    setIsLoading(true);
    try {
      const data = await getApiKey();
      setApiKey(data.value);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegenerate = async () => {
    setIsLoading(true);
    try {
      const data = await regenerateApiKey();
      setApiKey(data.value);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCopy = async () => {
    if (apiKey) {
      try {
        await navigator.clipboard.writeText(apiKey);
        toggleNotification({ type: "success", message: "API key copied to clipboard!" });
      } catch {
        toggleNotification({ type: "warning", message: "Failed to copy API key." });
      }
    }
  };
  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      handleFetchApiKey();
    }
  };
  const handleClose = () => setIsOpen(false);
  return {
    apiKey,
    isOpen,
    isLoading,
    handleClose,
    handleCopy,
    handleOpenChange,
    handleFetchApiKey,
    handleRegenerate
  };
};
const SettingsModal = () => {
  const { apiKey, isOpen, isLoading, handleCopy, handleClose, handleOpenChange, handleRegenerate } = useHook$4();
  const renderRefreshIcon = () => /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("polyline", { points: "23 4 23 10 17 10" }),
        /* @__PURE__ */ jsx("polyline", { points: "1 20 1 14 7 14" }),
        /* @__PURE__ */ jsx("path", { d: "M3.51 9a9 9 0 0114.36-3.36L23 10" }),
        /* @__PURE__ */ jsx("path", { d: "M20.49 15a9 9 0 01-14.36 3.36L1 14" })
      ]
    }
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: () => handleOpenChange(true), startIcon: /* @__PURE__ */ jsx(Cog, {}), children: "Settings" }),
    /* @__PURE__ */ jsx(Modal.Root, { open: isOpen, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
      /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: "API Key" }) }),
      /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: "2rem", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "neutral600", children: "You can use this API key to authenticate external translation API calls." }),
        /* @__PURE__ */ jsxs(Field.Root, { paddingRight: "0", width: "100%", children: [
          /* @__PURE__ */ jsx(Field.Label, { children: "API Key" }),
          /* @__PURE__ */ jsxs(
            Flex,
            {
              alignItems: "center",
              background: "neutral100",
              borderRadius: "4px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "neutral200",
              gap: "1rem",
              padding: "0.5rem",
              paddingLeft: "1rem",
              children: [
                /* @__PURE__ */ jsx(Flex, { flex: "1", padding: "0.5rem 1rem", children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", fontSize: "sm", children: apiKey || "••••••••••••••••••••••••••••••••••••••••" }) }),
                /* @__PURE__ */ jsxs(Flex, { gap: "0.5rem", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "secondary",
                      onClick: handleCopy,
                      startIcon: /* @__PURE__ */ jsx(Duplicate, {}),
                      disabled: !apiKey,
                      children: "Copy"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "danger",
                      onClick: handleRegenerate,
                      startIcon: renderRefreshIcon(),
                      loading: isLoading,
                      children: "Regenerate"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Modal.Footer, { children: /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", gap: "1rem", children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: handleClose, children: "Close" }) }) })
    ] }) })
  ] });
};
const ProjectCard = ({
  onClipboardCopy,
  onEdit,
  onDelete,
  project
}) => /* @__PURE__ */ jsxs(Card, { height: "100%", width: "100%", children: [
  /* @__PURE__ */ jsx(CardBody, { minHeight: "100px", width: "320px", children: /* @__PURE__ */ jsxs(CardContent, { children: [
    /* @__PURE__ */ jsx(CardTitle, { variant: "beta", fontWeight: "bold", marginTop: "0.4rem", children: project.name }),
    /* @__PURE__ */ jsx(Divider, { background: "neutral200", marginTop: "0.5rem", marginBottom: "0.5rem", width: "100%" }),
    /* @__PURE__ */ jsxs(
      Flex,
      {
        gap: 1,
        onClick: onClipboardCopy(project),
        alignItems: "center",
        marginTop: "0.5rem",
        style: { opacity: 0.8, wordBreak: "break-all" },
        children: [
          /* @__PURE__ */ jsx(Duplicate, {}),
          /* @__PURE__ */ jsx(Typography, { fontSize: "1rem", children: project.documentId })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Box, { paddingTop: "1rem", paddingBottom: "1rem", style: { display: "flex", flex: 1 }, children: /* @__PURE__ */ jsx(Typography, { flex: "1", variant: "omega", style: { wordBreak: "break-word" }, children: project.description }) })
  ] }) }),
  /* @__PURE__ */ jsxs(Flex, { display: "flex", gap: "0.5rem", justifyContent: "flex-end", padding: "1rem", width: "100%", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        color: "white",
        gap: "0",
        variant: "secondary",
        onClick: onDelete(project),
        startIcon: /* @__PURE__ */ jsx(Trash, { color: "white" })
      }
    ),
    /* @__PURE__ */ jsx(Button, { gap: "0", onClick: onEdit(project), startIcon: /* @__PURE__ */ jsx(Pencil, { color: "white" }) })
  ] })
] });
const createProject = async ({ name, description }) => {
  return axios.post(`/${PLUGIN_ID}/api/projects`, { name, description }).then((res) => res.data);
};
const updateProject = async ({ id, name, description }) => {
  return axios.put(`/${PLUGIN_ID}/api/projects/${id}`, { name, description }).then((res) => res.data);
};
const deleteProject = async (id) => {
  return axios.delete(`/${PLUGIN_ID}/api/projects/${id}`).then((res) => res.data);
};
const useHook$3 = ({ ref, refetch }) => {
  const [currentProject, setCurrentProject] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleDelete = async () => {
    if (currentProject) {
      setIsLoadingDelete(true);
      await deleteProject(currentProject.id);
      setIsLoadingDelete(false);
    }
    handleClose();
    refetch();
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleOpenChange = (open) => {
    setIsOpen(open);
  };
  const handleOpenModal = (data) => {
    setIsOpen(true);
    setCurrentProject(data || null);
    if (data) {
      setName(data.name);
      setDescription(data.description || "");
    } else {
      setName("");
      setDescription("");
    }
  };
  const handleSave = async () => {
    setIsLoadingSave(true);
    if (currentProject) {
      await updateProject({ id: currentProject.id, name, description });
    } else {
      await createProject({ name, description });
    }
    handleClose();
    refetch();
    setIsLoadingSave(false);
  };
  useImperativeHandle(ref, () => ({
    open: handleOpenModal
  }));
  return {
    currentProject,
    description,
    handleClose,
    handleDelete,
    handleDescriptionChange,
    handleNameChange,
    handleOpenChange,
    handleSave,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    name
  };
};
const ProjectCreateEditModal = forwardRef(({ refetch }, ref) => {
  const {
    currentProject,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    name,
    description,
    handleClose,
    handleDelete,
    handleDescriptionChange,
    handleNameChange,
    handleOpenChange,
    handleSave
  } = useHook$3({ ref, refetch });
  return /* @__PURE__ */ jsx(Modal.Root, { open: isOpen, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
    /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: "Create project" }) }),
    /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Flex, { flex: "1", direction: "column", gap: "2rem", children: [
      /* @__PURE__ */ jsxs(Field.Root, { flex: "1", required: true, width: "100%", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Name" }),
        /* @__PURE__ */ jsx(Field.Input, { value: name, onChange: handleNameChange })
      ] }),
      /* @__PURE__ */ jsxs(Field.Root, { flex: "1", width: "100%", children: [
        /* @__PURE__ */ jsx(Field.Label, { children: "Description" }),
        /* @__PURE__ */ jsx(Textarea, { value: description, onChange: handleDescriptionChange })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      !!currentProject && /* @__PURE__ */ jsx(
        Button,
        {
          color: "white",
          gap: "0",
          loading: isLoadingDelete,
          variant: "secondary",
          onClick: handleDelete,
          startIcon: /* @__PURE__ */ jsx(Trash, { color: "white" })
        }
      ),
      /* @__PURE__ */ jsxs(Flex, { gap: "1rem", children: [
        /* @__PURE__ */ jsx(Button, { onClick: handleClose, variant: "tertiary", children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { loading: isLoadingSave, onClick: handleSave, children: "Save" })
      ] })
    ] })
  ] }) });
});
const getNamespaces$1 = async () => {
  return axios(`/${PLUGIN_ID}/api/projects`).then((res) => res.data);
};
const useHook$2 = () => {
  const { toggleNotification } = useNotification();
  const projectCreatedEditModalRef = useRef(null);
  const [isPending, setIsPending] = useState(true);
  const [projects, setProjects] = useState(
    null
  );
  const handleClipboardCopy = (project) => (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(project.documentId);
    toggleNotification({
      type: "success",
      message: "Copied to clipboard!"
    });
  };
  const handleEdit = (project) => (e) => {
    e.preventDefault();
    projectCreatedEditModalRef.current?.open(project);
  };
  const handleDelete = (project) => (e) => {
    e.preventDefault();
  };
  const handleProjectCreate = () => {
    projectCreatedEditModalRef.current?.open();
  };
  const handleRefetch = async () => {
    setIsPending(true);
    const data = await getNamespaces$1();
    setProjects(data);
    setIsPending(false);
  };
  useEffect(() => {
    handleRefetch();
  }, []);
  return {
    handleClipboardCopy,
    handleDelete,
    handleEdit,
    handleProjectCreate,
    handleRefetch,
    isPending,
    projectCreatedEditModalRef,
    projects
  };
};
const ProjectsList = () => {
  const {
    handleClipboardCopy,
    handleDelete,
    handleEdit,
    handleProjectCreate,
    handleRefetch,
    isPending,
    projectCreatedEditModalRef,
    projects
  } = useHook$2();
  const renderLoader = () => {
    if (isPending && !projects?.items.length) {
      return /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Loader, {}) });
    }
    return /* @__PURE__ */ jsx(Fragment, {});
  };
  const renderEmptyState = () => {
    if (!isPending && !projects?.items.length) {
      return /* @__PURE__ */ jsx(Box, { background: "neutral100", children: /* @__PURE__ */ jsx(
        EmptyStateLayout,
        {
          content: "You don't have any projects yet.",
          action: /* @__PURE__ */ jsx(Button, { onClick: handleProjectCreate, startIcon: /* @__PURE__ */ jsx(Plus, {}), variant: "secondary", children: "Create your first project" })
        }
      ) });
    }
    return /* @__PURE__ */ jsx(Fragment, {});
  };
  const renderContent = () => {
    if (!isPending && !projects?.items.length) {
      return /* @__PURE__ */ jsx(Fragment, {});
    }
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      !!projects?.items?.length && /* @__PURE__ */ jsx(
        Button,
        {
          marginBottom: "1rem",
          onClick: handleProjectCreate,
          startIcon: /* @__PURE__ */ jsx(Plus, {}),
          variant: "secondary",
          children: "Add project"
        }
      ),
      /* @__PURE__ */ jsx(Grid.Root, { gap: 2, children: projects?.items.map((project) => /* @__PURE__ */ jsx(
        Link$1,
        {
          to: `/plugins/${PLUGIN_ID}/projects/${project.id}`,
          style: { color: "white", textDecoration: "none" },
          children: /* @__PURE__ */ jsx(Grid.Item, { id: project.id, background: "primary100", height: "100%", children: /* @__PURE__ */ jsx(
            ProjectCard,
            {
              onClipboardCopy: handleClipboardCopy,
              onEdit: handleEdit,
              onDelete: handleDelete,
              project
            }
          ) })
        },
        project.id
      )) })
    ] });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    renderContent(),
    renderEmptyState(),
    renderLoader(),
    /* @__PURE__ */ jsx(ProjectCreateEditModal, { ref: projectCreatedEditModalRef, refetch: handleRefetch })
  ] });
};
const ProjectsPage = () => /* @__PURE__ */ jsxs(Main, { padding: "2rem", children: [
  /* @__PURE__ */ jsxs(Box, { paddingBottom: "1rem", children: [
    /* @__PURE__ */ jsxs(Flex, { paddingBottom: "0.5rem", gap: "1rem", children: [
      /* @__PURE__ */ jsx(Typography, { variant: "alpha", children: "Static translations" }),
      /* @__PURE__ */ jsx(SettingsModal, {})
    ] }),
    /* @__PURE__ */ jsx(Breadcrumbs, { label: "Folder navigatation", children: /* @__PURE__ */ jsx(Crumb, { isCurrent: true, children: "Projects" }) })
  ] }),
  /* @__PURE__ */ jsx(Box, { padding: "1rem", children: /* @__PURE__ */ jsx(ProjectsList, {}) })
] });
const getNamespaces = async (projectId) => {
  return axios(`/${PLUGIN_ID}/api/projects/${projectId}/namespaces/all`).then((res) => res.data);
};
const useNamespaces = ({ projectId }) => {
  const [namespaces, setNamespaces] = useState([]);
  const refetchNamespaces = async () => {
    if (!projectId) {
      return;
    }
    const data = await getNamespaces(projectId);
    setNamespaces(data);
  };
  useEffect(() => {
    refetchNamespaces();
  }, []);
  return { namespaces };
};
const getLocales = async () => {
  return axios.get(`/api/i18n/locales`).then((res) => res.data);
};
const useLocales = () => {
  const [locales, setLocales] = useState([]);
  const refetchLocales = async () => {
    const data = await getLocales();
    setLocales(data);
  };
  useEffect(() => {
    refetchLocales();
  }, []);
  return { locales };
};
const getTranslation = async ({
  namespaceId,
  page,
  projectId,
  showMissingOnly
}) => {
  return axios.get(
    `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations?page=${page}&showMissingOnly=${showMissingOnly}`
  ).then((res) => res.data);
};
const createTranslation = async ({
  projectId,
  namespaceId,
  key,
  translations
}) => {
  try {
    const response = await axios.post(
      `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations`,
      {
        key,
        translations
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating translation:", error);
    throw error;
  }
};
const updateTranslation = async ({
  projectId,
  namespaceId,
  id,
  key,
  translations
}) => {
  try {
    const response = await axios.put(
      `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations/${id}`,
      {
        key,
        translations
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating translation:", error);
    throw error;
  }
};
const deleteTranslation = async ({
  namespaceId,
  projectId,
  translationId
}) => {
  try {
    const response = await axios.delete(
      `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations/${translationId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const useHook$1 = ({ namespaceId, projectId, ref, refetch }) => {
  const [currentTranslation, setCurrentTranslation] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState("");
  const [selectedNamespaceId, setSelectedNamespaceId] = useState(namespaceId);
  const [translations, setTranslations] = useState({});
  const { locales } = useLocales();
  const { namespaces } = useNamespaces({ projectId });
  const handleClose = () => {
    setIsOpen(false);
    setCurrentTranslation(null);
    setKey("");
    setSelectedNamespaceId(namespaceId);
    setTranslations({});
  };
  const handleDelete = async () => {
    if (currentTranslation) {
      setIsLoadingDelete(true);
      await deleteTranslation({ namespaceId, projectId, translationId: currentTranslation.id });
      setIsLoadingDelete(false);
    }
    handleClose();
    refetch();
  };
  const handleTranslationsChange = (key2) => (e) => {
    setTranslations((prev) => ({ ...prev, [key2]: e.target.value }));
  };
  const handleKeyChange = (e) => {
    const newKey = e.target.value;
    setKey(newKey);
  };
  const handleNamespaceChange = (value) => {
    setSelectedNamespaceId(value);
  };
  const handleOpenChange = (open) => {
    setIsOpen(open);
  };
  const handleOpenModal = (data) => {
    setIsOpen(true);
    setCurrentTranslation(data || null);
    if (data) {
      setKey(data.key);
      setSelectedNamespaceId(namespaceId);
      const translationsData = {};
      locales.forEach((locale) => {
        const defaultValue = data[locale.code] || "";
        translationsData[locale.code] = defaultValue;
      });
      setTranslations(translationsData);
    } else {
      setKey("");
      setTranslations((prev) => {
        const updated = { ...prev };
        locales.forEach((locale) => {
          if (!(locale.code in updated)) {
            const defaultValue = currentTranslation ? currentTranslation[locale.code] || "" : "";
            updated[locale.code] = defaultValue;
          }
        });
        return updated;
      });
      setCurrentTranslation(null);
      setSelectedNamespaceId(namespaceId);
    }
  };
  const handleSave = async () => {
    setIsLoadingSave(true);
    try {
      const translationsData = {};
      locales.forEach((locale) => {
        const defaultValue = translations[locale.code] || "";
        translationsData[locale.code] = defaultValue;
      });
      if (currentTranslation) {
        await updateTranslation({
          id: currentTranslation.id,
          key,
          namespaceId: selectedNamespaceId,
          projectId,
          translations: translationsData
        });
      } else {
        await createTranslation({
          namespaceId: selectedNamespaceId,
          key,
          projectId,
          translations: translationsData
        });
      }
      handleClose();
      refetch();
    } catch (error) {
      console.error("Error saving namespace:", error);
    }
    setIsLoadingSave(false);
  };
  useEffect(() => {
    if (locales) {
      setTranslations((prev) => {
        const updated = { ...prev };
        locales.forEach((locale) => {
          if (!(locale.code in updated)) {
            const defaultValue = currentTranslation ? currentTranslation[locale.code] || "" : "";
            updated[locale.code] = defaultValue;
          }
        });
        return updated;
      });
    }
  }, [currentTranslation]);
  useImperativeHandle(ref, () => ({
    open: handleOpenModal
  }));
  return {
    currentTranslation,
    handleClose,
    handleDelete,
    handleKeyChange,
    handleNamespaceChange,
    handleTranslationsChange,
    handleOpenChange,
    handleSave,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    key,
    locales,
    namespaces,
    translations,
    selectedNamespaceId
  };
};
const TranslationCreateEditModal = forwardRef(
  ({ namespaceId, projectId, refetch }, ref) => {
    const {
      currentTranslation,
      handleClose,
      handleDelete,
      handleKeyChange,
      handleNamespaceChange,
      handleOpenChange,
      handleTranslationsChange,
      handleSave,
      isLoadingDelete,
      isLoadingSave,
      isOpen,
      key,
      locales,
      namespaces,
      selectedNamespaceId,
      translations
    } = useHook$1({ namespaceId, projectId, ref, refetch });
    return /* @__PURE__ */ jsx(Modal.Root, { open: isOpen, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
      /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: "Create namespace" }) }),
      /* @__PURE__ */ jsxs(Modal.Body, { children: [
        /* @__PURE__ */ jsxs(Flex, { flex: "1", direction: "column", gap: "2rem", children: [
          /* @__PURE__ */ jsxs(Field.Root, { flex: "1", required: true, width: "100%", children: [
            /* @__PURE__ */ jsx(Field.Label, { children: "Namespace" }),
            /* @__PURE__ */ jsx(
              SingleSelect,
              {
                required: true,
                onChange: handleNamespaceChange,
                placeholder: "Select namespace",
                value: selectedNamespaceId,
                children: namespaces.map((ns) => /* @__PURE__ */ jsx(SingleSelectOption, { value: ns.id, children: ns.name }, ns.id))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(Field.Root, { flex: "1", required: true, width: "100%", children: [
            /* @__PURE__ */ jsx(Field.Label, { children: "Key" }),
            /* @__PURE__ */ jsx(Field.Input, { onChange: handleKeyChange, value: key })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Divider, { marginTop: "2rem", marginBottom: "2rem" }),
        locales.map((locale) => /* @__PURE__ */ jsxs(Field.Root, { marginBottom: "1.5rem", required: locale.code === "en", children: [
          /* @__PURE__ */ jsx(Field.Label, { children: locale.name }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              onChange: handleTranslationsChange(locale.code),
              rows: 4,
              value: translations[locale.code] || ""
            }
          )
        ] }, locale.code))
      ] }),
      /* @__PURE__ */ jsxs(Modal.Footer, { children: [
        !!currentTranslation && /* @__PURE__ */ jsx(
          Button,
          {
            color: "white",
            gap: "0",
            loading: isLoadingDelete,
            variant: "secondary",
            onClick: handleDelete,
            startIcon: /* @__PURE__ */ jsx(Trash, { color: "white" })
          }
        ),
        /* @__PURE__ */ jsxs(Flex, { gap: "1rem", children: [
          /* @__PURE__ */ jsx(Button, { onClick: handleClose, variant: "tertiary", children: "Cancel" }),
          /* @__PURE__ */ jsx(Button, { loading: isLoadingSave, onClick: handleSave, children: "Save" })
        ] })
      ] })
    ] }) });
  }
);
const useHook = () => {
  const params = useParams();
  const namespaceId = Number(params.namespaceId);
  const projectId = Number(params.projectId);
  const [searchParams, setSearchParams] = useSearchParams();
  const confirmDeleteModalRef = useRef(null);
  const translationCreatedEditModalRef = useRef(
    null
  );
  const [selectedDeleteTranslation, setSelectedDeleteTranslation] = useState(
    null
  );
  const [isPending, setIsPending] = useState(true);
  const [translations, setTranslations] = useState(null);
  const [showMissingTranslationsOnly, setShowMissingTranslationsOnly] = useState(false);
  const handleEditTranslation = (translation) => () => {
    translationCreatedEditModalRef.current?.open(translation);
  };
  const handleToggleDeleteTranslation = (translation) => async () => {
    if (translation) {
      setSelectedDeleteTranslation(translation);
      confirmDeleteModalRef.current?.open(translation);
    } else {
      setSelectedDeleteTranslation(null);
    }
  };
  const handleDeleteConfirm = async () => {
    if (namespaceId && projectId && selectedDeleteTranslation?.id) {
      try {
        await deleteTranslation({
          namespaceId,
          projectId,
          translationId: selectedDeleteTranslation.id
        });
        handleRefetch({
          page: Number(searchParams.get("page")) || 1,
          showMissingOnly: showMissingTranslationsOnly
        });
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  };
  const handleTranslationCreate = () => {
    translationCreatedEditModalRef.current?.open();
  };
  const handlePagePress = (page) => {
    setSearchParams({ page: String(page) });
    handleRefetch({ page, showMissingOnly: showMissingTranslationsOnly });
  };
  const handleRefetch = async ({ page, showMissingOnly } = {
    page: 1,
    showMissingOnly: showMissingTranslationsOnly
  }) => {
    const currentPage = page || 1;
    if (projectId) {
      setIsPending(true);
      const data = await getTranslation({
        namespaceId: Number(namespaceId),
        page: currentPage,
        projectId: Number(projectId),
        showMissingOnly
      });
      setTranslations(data);
      setIsPending(false);
    }
  };
  const handleShowMissingTranslationsOnlyChange = (value) => {
    setShowMissingTranslationsOnly(value);
    handleRefetch({ page: 1, showMissingOnly: value });
  };
  useEffect(() => {
    if (projectId) {
      handleRefetch({ page: 1, showMissingOnly: showMissingTranslationsOnly });
    }
  }, [projectId]);
  return {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditTranslation,
    handlePagePress,
    handleRefetch,
    handleShowMissingTranslationsOnlyChange,
    handleToggleDeleteTranslation,
    handleTranslationCreate,
    isPending,
    namespaceId,
    translations,
    projectId,
    selectedDeleteTranslation,
    showMissingTranslationsOnly,
    translationCreatedEditModalRef
  };
};
const Translations = () => {
  const { locales } = useLocales();
  const {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditTranslation,
    handleTranslationCreate,
    handlePagePress,
    handleRefetch,
    handleShowMissingTranslationsOnlyChange,
    handleToggleDeleteTranslation,
    isPending,
    namespaceId,
    translations,
    projectId,
    selectedDeleteTranslation,
    showMissingTranslationsOnly,
    translationCreatedEditModalRef
  } = useHook();
  const renderLoader = () => {
    if (isPending && !translations?.items.length) {
      return /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Loader, {}) });
    }
    return /* @__PURE__ */ jsx(Fragment, {});
  };
  const renderEmptyState = () => {
    if (!isPending && !translations?.items.length) {
      return /* @__PURE__ */ jsx(Box, { background: "neutral100", children: /* @__PURE__ */ jsx(
        EmptyStateLayout,
        {
          content: "You don't have any translations yet.",
          action: /* @__PURE__ */ jsx(Button, { onClick: handleTranslationCreate, startIcon: /* @__PURE__ */ jsx(Plus, {}), variant: "secondary", children: "Create your first translation" })
        }
      ) });
    }
    return /* @__PURE__ */ jsx(Fragment, {});
  };
  const renderContent = () => {
    if (!isPending && !translations?.items.length) {
      return /* @__PURE__ */ jsx(Fragment, {});
    }
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      !!translations?.items?.length && /* @__PURE__ */ jsxs(Flex, { marginBottom: "1rem", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            marginRight: "1rem",
            onClick: handleTranslationCreate,
            startIcon: /* @__PURE__ */ jsx(Plus, {}),
            variant: "secondary",
            children: "Add translation"
          }
        ),
        /* @__PURE__ */ jsx(
          Switch,
          {
            checked: showMissingTranslationsOnly,
            name: "showMissingTranslationsOnly",
            onLabel: "Show missing translations only",
            offLabel: "Show missing translations only",
            onCheckedChange: handleShowMissingTranslationsOnlyChange,
            visibleLabels: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Box, { paddingTop: "1rem", paddingBottom: "1rem", children: [
        /* @__PURE__ */ jsxs(Table, { colCount: 3, rowCount: translations?.items?.length || 0, children: [
          /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { style: { width: "280px" }, children: [
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Key" }) }),
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Translations" }) }),
            /* @__PURE__ */ jsx(Th, { style: { width: "120px" }, children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Actions" }) })
          ] }) }),
          /* @__PURE__ */ jsx(Tbody, { children: translations?.items?.map((translation) => {
            const isMissing = Object.values(locales).some(
              (locale) => !translation[locale.code]
            );
            return /* @__PURE__ */ jsxs(Tr, { children: [
              /* @__PURE__ */ jsx(Td, { style: { width: "280px", verticalAlign: "top" }, children: /* @__PURE__ */ jsxs(Flex, { gap: 2, paddingTop: "15px", children: [
                /* @__PURE__ */ jsx(
                  Typography,
                  {
                    cursor: "pointer",
                    fontWeight: "bold",
                    onClick: handleEditTranslation(translation),
                    variant: "omega",
                    children: translation.key
                  }
                ),
                isMissing && /* @__PURE__ */ jsx(Badge, { backgroundColor: "red", style: { padding: "2px 6px" }, children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: "white", fontSize: "9px", children: "Missing" }) })
              ] }) }),
              /* @__PURE__ */ jsx(
                Td,
                {
                  style: {
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    whiteSpace: "normal",
                    wordBreak: "break-word"
                  },
                  children: locales.map((locale) => /* @__PURE__ */ jsxs(Flex, { marginRight: 1, padding: 1, alignItems: "flex-start", children: [
                    /* @__PURE__ */ jsx(Box, { display: "flex", children: /* @__PURE__ */ jsxs(
                      Typography,
                      {
                        lineHeight: "14px",
                        fontWeight: "bold",
                        variant: "omega",
                        style: { minWidth: "100px" },
                        children: [
                          locale.name,
                          ":",
                          " "
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsx(Typography, { lineHeight: "16px", variant: "omega", children: translation[locale.code] || "-" })
                  ] }, locale.code))
                }
              ),
              /* @__PURE__ */ jsx(Td, { style: { width: "120px" }, children: /* @__PURE__ */ jsxs(Flex, { gap: "0.5rem", justifyContent: "flex-end", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    gap: "0",
                    onClick: handleEditTranslation(translation),
                    variant: "secondary",
                    startIcon: /* @__PURE__ */ jsx(Pencil, {})
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    gap: "0",
                    onClick: handleToggleDeleteTranslation(translation),
                    startIcon: /* @__PURE__ */ jsx(Trash, { color: "white" }),
                    variant: "danger"
                  }
                )
              ] }) })
            ] }, translation.id);
          }) })
        ] }),
        /* @__PURE__ */ jsx(Flex, { justifyContent: "space-between", paddingTop: "1rem", children: translations?.pagination && /* @__PURE__ */ jsx(Pagination, { pagination: translations?.pagination, onPagePress: handlePagePress }) })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    renderContent(),
    renderEmptyState(),
    renderLoader(),
    /* @__PURE__ */ jsx(
      TranslationCreateEditModal,
      {
        ref: translationCreatedEditModalRef,
        namespaceId,
        projectId,
        refetch: handleRefetch
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmModal,
      {
        ref: confirmDeleteModalRef,
        onCancel: handleToggleDeleteTranslation(),
        onConfirm: handleDeleteConfirm,
        text: `Are you sure you want to delete "${selectedDeleteTranslation?.key}"? This action cannot be undone.`,
        title: "Delete translation"
      }
    )
  ] });
};
const getNamespace = async (id) => {
  return axios.get(`/${PLUGIN_ID}/api/projects/${id}/namespaces/${id}`).then((res) => res.data);
};
const TranslationsPage = () => {
  const params = useParams();
  const { namespaceId, projectId } = params;
  const [namespace, setNamespace] = useState(null);
  useEffect(() => {
    const fetchNamespace = async () => {
      if (namespaceId) {
        const data = await getNamespace(namespaceId);
        setNamespace(data);
      }
    };
    fetchNamespace();
  }, [namespaceId]);
  return /* @__PURE__ */ jsxs(Main, { padding: "2rem", children: [
    /* @__PURE__ */ jsxs(Box, { paddingBottom: "1rem", children: [
      /* @__PURE__ */ jsx(Flex, { paddingBottom: "0.5rem", gap: "1rem", children: /* @__PURE__ */ jsx(Typography, { variant: "alpha", children: "Static translations" }) }),
      /* @__PURE__ */ jsxs(Breadcrumbs, { label: "Folder navigatation", children: [
        /* @__PURE__ */ jsx(CrumbLink, { href: `/admin/plugins/${PLUGIN_ID}`, children: "Projects" }),
        /* @__PURE__ */ jsxs(CrumbLink, { href: `/admin/plugins/${PLUGIN_ID}/projects/${projectId}`, children: [
          "Namespaces ",
          namespace ? ` - ${namespace.name}` : ""
        ] }),
        /* @__PURE__ */ jsx(Crumb, { isCurrent: true, children: "Translations" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Box, { padding: "1rem", children: /* @__PURE__ */ jsx(Translations, {}) })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsx(DesignSystemProvider, { locale: "en-GB", theme: darkTheme, children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, path: "/", element: /* @__PURE__ */ jsx(ProjectsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { index: true, path: "/projects/:projectId", element: /* @__PURE__ */ jsx(NamespacesPage, {}) }),
    /* @__PURE__ */ jsx(
      Route,
      {
        index: true,
        path: "/projects/:projectId/namespaces/:namespaceId",
        element: /* @__PURE__ */ jsx(TranslationsPage, {})
      }
    ),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
  ] }) });
};
export {
  App as default
};
