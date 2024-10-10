"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "node_modules/requires-port/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function required(port, protocol) {
      protocol = protocol.split(":")[0];
      port = +port;
      if (!port) return false;
      switch (protocol) {
        case "http":
        case "ws":
          return port !== 80;
        case "https":
        case "wss":
          return port !== 443;
        case "ftp":
          return port !== 21;
        case "gopher":
          return port !== 70;
        case "file":
          return false;
      }
      return port !== 0;
    };
  }
});

// node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "node_modules/querystringify/index.js"(exports2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var undef;
    function decode(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }
    function encode(input) {
      try {
        return encodeURIComponent(input);
      } catch (e) {
        return null;
      }
    }
    function querystring(query) {
      var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
      while (part = parser.exec(query)) {
        var key = decode(part[1]), value = decode(part[2]);
        if (key === null || value === null || key in result) continue;
        result[key] = value;
      }
      return result;
    }
    function querystringify(obj, prefix) {
      prefix = prefix || "";
      var pairs = [], value, key;
      if ("string" !== typeof prefix) prefix = "?";
      for (key in obj) {
        if (has.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = "";
          }
          key = encode(key);
          value = encode(value);
          if (key === null || value === null) continue;
          pairs.push(key + "=" + value);
        }
      }
      return pairs.length ? prefix + pairs.join("&") : "";
    }
    exports2.stringify = querystringify;
    exports2.parse = querystring;
  }
});

// node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "node_modules/url-parse/index.js"(exports2, module2) {
    "use strict";
    var required = require_requires_port();
    var qs = require_querystringify();
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    var whitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    function trimLeft(str) {
      return (str ? str : "").toString().replace(whitespace, "");
    }
    var rules = [
      ["#", "hash"],
      // Extract from the back.
      ["?", "query"],
      // Extract from the back.
      function sanitize(address, url) {
        return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
      },
      ["/", "pathname"],
      // Extract from the back.
      ["@", "auth", 1],
      // Extract from the front.
      [NaN, "host", void 0, 1, 1],
      // Set left over value.
      [/:(\d*)$/, "port", void 0, 1],
      // RegExp the back.
      [NaN, "hostname", void 0, 1, 1]
      // Set left over.
    ];
    var ignore = { hash: 1, query: 1 };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== "undefined") globalVar = window;
      else if (typeof global !== "undefined") globalVar = global;
      else if (typeof self !== "undefined") globalVar = self;
      else globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {}, type = typeof loc, key;
      if ("blob:" === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ("string" === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore) delete finaldestination[key];
      } else if ("object" === type) {
        for (key in loc) {
          if (key in ignore) continue;
          finaldestination[key] = loc[key];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    function isSpecial(scheme) {
      return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
    }
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      location = location || {};
      var match = protocolre.exec(address);
      var protocol = match[1] ? match[1].toLowerCase() : "";
      var forwardSlashes = !!match[2];
      var otherSlashes = !!match[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else {
          rest = match[4];
        }
      }
      if (protocol === "file:") {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest
      };
    }
    function resolve(relative, base) {
      if (relative === "") return base;
      var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = false, up = 0;
      while (i--) {
        if (path[i] === ".") {
          path.splice(i, 1);
        } else if (path[i] === "..") {
          path.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0) unshift = true;
          path.splice(i, 1);
          up--;
        }
      }
      if (unshift) path.unshift("");
      if (last === "." || last === "..") path.push("");
      return path.join("/");
    }
    function Url(address, location, parser) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }
      var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
      if ("object" !== type && "string" !== type) {
        parser = location;
        location = null;
      }
      if (parser && "function" !== typeof parser) parser = qs.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || "", location);
      relative = !extracted.protocol && !extracted.slashes;
      url.slashes = extracted.slashes || relative && location.slashes;
      url.protocol = extracted.protocol || location.protocol || "";
      address = extracted.rest;
      if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
        instructions[3] = [/(.*)/, "pathname"];
      }
      for (; i < instructions.length; i++) {
        instruction = instructions[i];
        if (typeof instruction === "function") {
          address = instruction(address, url);
          continue;
        }
        parse = instruction[0];
        key = instruction[1];
        if (parse !== parse) {
          url[key] = address;
        } else if ("string" === typeof parse) {
          index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
          if (~index) {
            if ("number" === typeof instruction[2]) {
              url[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if (index = parse.exec(address)) {
          url[key] = index[1];
          address = address.slice(0, index.index);
        }
        url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
        if (instruction[4]) url[key] = url[key].toLowerCase();
      }
      if (parser) url.query = parser(url.query);
      if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
        url.pathname = resolve(url.pathname, location.pathname);
      }
      if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
        url.pathname = "/" + url.pathname;
      }
      if (!required(url.port, url.protocol)) {
        url.host = url.hostname;
        url.port = "";
      }
      url.username = url.password = "";
      if (url.auth) {
        index = url.auth.indexOf(":");
        if (~index) {
          url.username = url.auth.slice(0, index);
          url.username = encodeURIComponent(decodeURIComponent(url.username));
          url.password = url.auth.slice(index + 1);
          url.password = encodeURIComponent(decodeURIComponent(url.password));
        } else {
          url.username = encodeURIComponent(decodeURIComponent(url.auth));
        }
        url.auth = url.password ? url.username + ":" + url.password : url.username;
      }
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
    }
    function set(part, value, fn) {
      var url = this;
      switch (part) {
        case "query":
          if ("string" === typeof value && value.length) {
            value = (fn || qs.parse)(value);
          }
          url[part] = value;
          break;
        case "port":
          url[part] = value;
          if (!required(value, url.protocol)) {
            url.host = url.hostname;
            url[part] = "";
          } else if (value) {
            url.host = url.hostname + ":" + value;
          }
          break;
        case "hostname":
          url[part] = value;
          if (url.port) value += ":" + url.port;
          url.host = value;
          break;
        case "host":
          url[part] = value;
          if (/:\d+$/.test(value)) {
            value = value.split(":");
            url.port = value.pop();
            url.hostname = value.join(":");
          } else {
            url.hostname = value;
            url.port = "";
          }
          break;
        case "protocol":
          url.protocol = value.toLowerCase();
          url.slashes = !fn;
          break;
        case "pathname":
        case "hash":
          if (value) {
            var char = part === "pathname" ? "/" : "#";
            url[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url[part] = value;
          }
          break;
        case "username":
        case "password":
          url[part] = encodeURIComponent(value);
          break;
        case "auth":
          var index = value.indexOf(":");
          if (~index) {
            url.username = value.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = value.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i = 0; i < rules.length; i++) {
        var ins = rules[i];
        if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
      }
      url.auth = url.password ? url.username + ":" + url.password : url.username;
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
      return url;
    }
    function toString(stringify) {
      if (!stringify || "function" !== typeof stringify) stringify = qs.stringify;
      var query, url = this, host = url.host, protocol = url.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ":") protocol += ":";
      var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
      if (url.username) {
        result += url.username;
        if (url.password) result += ":" + url.password;
        result += "@";
      } else if (url.password) {
        result += ":" + url.password;
        result += "@";
      } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
        result += "@";
      }
      if (host[host.length - 1] === ":") host += ":";
      result += host + url.pathname;
      query = "object" === typeof url.query ? stringify(url.query) : url.query;
      if (query) result += "?" !== query.charAt(0) ? "?" + query : query;
      if (url.hash) result += url.hash;
      return result;
    }
    Url.prototype = { set, toString };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module2.exports = Url;
  }
});

// src/intercept.ts
var intercept_exports = {};
__export(intercept_exports, {
  intercept: () => intercept
});
module.exports = __toCommonJS(intercept_exports);

// src/helpers/delay.js
function delay(callback, context) {
  setTimeout((timeoutContext) => callback.call(timeoutContext), 4, context);
}

// src/helpers/logger.js
function log(method, message) {
  if (typeof process !== "undefined" && process.env.NODE_ENV !== "test") {
    console[method].call(null, message);
  }
}

// src/helpers/array-helpers.js
function reject(array = [], callback) {
  const results = [];
  array.forEach((itemInArray) => {
    if (!callback(itemInArray)) {
      results.push(itemInArray);
    }
  });
  return results;
}
function filter(array = [], callback) {
  const results = [];
  array.forEach((itemInArray) => {
    if (callback(itemInArray)) {
      results.push(itemInArray);
    }
  });
  return results;
}

// src/event/target.js
var EventTarget = class {
  constructor() {
    this.listeners = {};
  }
  /*
   * Ties a listener function to an event type which can later be invoked via the
   * dispatchEvent method.
   *
   * @param {string} type - the type of event (ie: 'open', 'message', etc.)
   * @param {function} listener - callback function to invoke when an event is dispatched matching the type
   * @param {boolean} useCapture - N/A TODO: implement useCapture functionality
   */
  addEventListener(type, listener) {
    if (typeof listener === "function") {
      if (!Array.isArray(this.listeners[type])) {
        this.listeners[type] = [];
      }
      if (filter(this.listeners[type], (item) => item === listener).length === 0) {
        this.listeners[type].push(listener);
      }
    }
  }
  /*
   * Removes the listener so it will no longer be invoked via the dispatchEvent method.
   *
   * @param {string} type - the type of event (ie: 'open', 'message', etc.)
   * @param {function} listener - callback function to invoke when an event is dispatched matching the type
   * @param {boolean} useCapture - N/A TODO: implement useCapture functionality
   */
  removeEventListener(type, removingListener) {
    const arrayOfListeners = this.listeners[type];
    this.listeners[type] = reject(arrayOfListeners, (listener) => listener === removingListener);
  }
  /*
   * Invokes all listener functions that are listening to the given event.type property. Each
   * listener will be passed the event as the first argument.
   *
   * @param {object} event - event object which will be passed to all listeners of the event.type property
   */
  dispatchEvent(event, ...customArguments) {
    const eventName = event.type;
    const listeners = this.listeners[eventName];
    if (!Array.isArray(listeners)) {
      return false;
    }
    listeners.forEach((listener) => {
      if (customArguments.length > 0) {
        listener.apply(this, customArguments);
      } else {
        listener.call(this, event);
      }
    });
    return true;
  }
};
var target_default = EventTarget;

// src/network-bridge.js
function trimQueryPartFromURL(url) {
  const queryIndex = url.indexOf("?");
  return queryIndex >= 0 ? url.slice(0, queryIndex) : url;
}
var NetworkBridge = class {
  constructor() {
    this.urlMap = {};
  }
  /*
   * Attaches a websocket object to the urlMap hash so that it can find the server
   * it is connected to and the server in turn can find it.
   *
   * @param {object} websocket - websocket object to add to the urlMap hash
   * @param {string} url
   */
  attachWebSocket(websocket, url) {
    const serverURL = trimQueryPartFromURL(url);
    const connectionLookup = this.urlMap[serverURL];
    if (connectionLookup && connectionLookup.server && connectionLookup.websockets.indexOf(websocket) === -1) {
      connectionLookup.websockets.push(websocket);
      return connectionLookup.server;
    }
  }
  /*
   * Attaches a websocket to a room
   */
  addMembershipToRoom(websocket, room) {
    const connectionLookup = this.urlMap[trimQueryPartFromURL(websocket.url)];
    if (connectionLookup && connectionLookup.server && connectionLookup.websockets.indexOf(websocket) !== -1) {
      if (!connectionLookup.roomMemberships[room]) {
        connectionLookup.roomMemberships[room] = [];
      }
      connectionLookup.roomMemberships[room].push(websocket);
    }
  }
  /*
   * Attaches a server object to the urlMap hash so that it can find a websockets
   * which are connected to it and so that websockets can in turn can find it.
   *
   * @param {object} server - server object to add to the urlMap hash
   * @param {string} url
   */
  attachServer(server, url) {
    const serverUrl = trimQueryPartFromURL(url);
    const connectionLookup = this.urlMap[serverUrl];
    if (!connectionLookup) {
      this.urlMap[serverUrl] = {
        server,
        websockets: [],
        roomMemberships: {}
      };
      return server;
    }
  }
  /*
   * Finds the server which is 'running' on the given url.
   *
   * @param {string} url - the url to use to find which server is running on it
   */
  serverLookup(url) {
    const serverURL = trimQueryPartFromURL(url);
    const connectionLookup = this.urlMap[serverURL];
    if (connectionLookup) {
      return connectionLookup.server;
    }
  }
  /*
   * Finds all websockets which is 'listening' on the given url.
   *
   * @param {string} url - the url to use to find all websockets which are associated with it
   * @param {string} room - if a room is provided, will only return sockets in this room
   * @param {class} broadcaster - socket that is broadcasting and is to be excluded from the lookup
   */
  websocketsLookup(url, room, broadcaster) {
    const serverURL = trimQueryPartFromURL(url);
    let websockets;
    const connectionLookup = this.urlMap[serverURL];
    websockets = connectionLookup ? connectionLookup.websockets : [];
    if (room) {
      const members = connectionLookup.roomMemberships[room];
      websockets = members || [];
    }
    return broadcaster ? websockets.filter((websocket) => websocket !== broadcaster) : websockets;
  }
  /*
   * Removes the entry associated with the url.
   *
   * @param {string} url
   */
  removeServer(url) {
    delete this.urlMap[trimQueryPartFromURL(url)];
  }
  /*
   * Removes the individual websocket from the map of associated websockets.
   *
   * @param {object} websocket - websocket object to remove from the url map
   * @param {string} url
   */
  removeWebSocket(websocket, url) {
    const serverURL = trimQueryPartFromURL(url);
    const connectionLookup = this.urlMap[serverURL];
    if (connectionLookup) {
      connectionLookup.websockets = reject(connectionLookup.websockets, (socket) => socket === websocket);
    }
  }
  /*
   * Removes a websocket from a room
   */
  removeMembershipFromRoom(websocket, room) {
    const connectionLookup = this.urlMap[trimQueryPartFromURL(websocket.url)];
    const memberships = connectionLookup.roomMemberships[room];
    if (connectionLookup && memberships !== null) {
      connectionLookup.roomMemberships[room] = reject(memberships, (socket) => socket === websocket);
    }
  }
};
var network_bridge_default = new NetworkBridge();

// src/constants.js
var CLOSE_CODES = {
  CLOSE_NORMAL: 1e3,
  CLOSE_GOING_AWAY: 1001,
  CLOSE_PROTOCOL_ERROR: 1002,
  CLOSE_UNSUPPORTED: 1003,
  CLOSE_NO_STATUS: 1005,
  CLOSE_ABNORMAL: 1006,
  UNSUPPORTED_DATA: 1007,
  POLICY_VIOLATION: 1008,
  CLOSE_TOO_LARGE: 1009,
  MISSING_EXTENSION: 1010,
  INTERNAL_ERROR: 1011,
  SERVICE_RESTART: 1012,
  TRY_AGAIN_LATER: 1013,
  TLS_HANDSHAKE: 1015
};
var ERROR_PREFIX = {
  CONSTRUCTOR_ERROR: "Failed to construct 'WebSocket':",
  CLOSE_ERROR: "Failed to execute 'close' on 'WebSocket':",
  EVENT: {
    CONSTRUCT: "Failed to construct 'Event':",
    MESSAGE: "Failed to construct 'MessageEvent':",
    CLOSE: "Failed to construct 'CloseEvent':"
  }
};

// src/event/prototype.js
var EventPrototype = class {
  // Noops
  stopPropagation() {
  }
  stopImmediatePropagation() {
  }
  // if no arguments are passed then the type is set to "undefined" on
  // chrome and safari.
  initEvent(type = "undefined", bubbles = false, cancelable = false) {
    this.type = `${type}`;
    this.bubbles = Boolean(bubbles);
    this.cancelable = Boolean(cancelable);
  }
};

// src/event/event.js
var Event = class extends EventPrototype {
  constructor(type, eventInitConfig = {}) {
    super();
    if (!type) {
      throw new TypeError(`${ERROR_PREFIX.EVENT_ERROR} 1 argument required, but only 0 present.`);
    }
    if (typeof eventInitConfig !== "object") {
      throw new TypeError(`${ERROR_PREFIX.EVENT_ERROR} parameter 2 ('eventInitDict') is not an object.`);
    }
    const { bubbles, cancelable } = eventInitConfig;
    this.type = `${type}`;
    this.timeStamp = Date.now();
    this.target = null;
    this.srcElement = null;
    this.returnValue = true;
    this.isTrusted = false;
    this.eventPhase = 0;
    this.defaultPrevented = false;
    this.currentTarget = null;
    this.cancelable = cancelable ? Boolean(cancelable) : false;
    this.cancelBubble = false;
    this.bubbles = bubbles ? Boolean(bubbles) : false;
  }
};

// src/event/message.js
var MessageEvent2 = class extends EventPrototype {
  constructor(type, eventInitConfig = {}) {
    super();
    if (!type) {
      throw new TypeError(`${ERROR_PREFIX.EVENT.MESSAGE} 1 argument required, but only 0 present.`);
    }
    if (typeof eventInitConfig !== "object") {
      throw new TypeError(`${ERROR_PREFIX.EVENT.MESSAGE} parameter 2 ('eventInitDict') is not an object`);
    }
    const { bubbles, cancelable, data, origin, lastEventId, ports } = eventInitConfig;
    this.type = `${type}`;
    this.timeStamp = Date.now();
    this.target = null;
    this.srcElement = null;
    this.returnValue = true;
    this.isTrusted = false;
    this.eventPhase = 0;
    this.defaultPrevented = false;
    this.currentTarget = null;
    this.cancelable = cancelable ? Boolean(cancelable) : false;
    this.canncelBubble = false;
    this.bubbles = bubbles ? Boolean(bubbles) : false;
    this.origin = `${origin}`;
    this.ports = typeof ports === "undefined" ? null : ports;
    this.data = typeof data === "undefined" ? null : data;
    this.lastEventId = `${lastEventId || ""}`;
  }
};

// src/event/close.js
var CloseEvent = class extends EventPrototype {
  constructor(type, eventInitConfig = {}) {
    super();
    if (!type) {
      throw new TypeError(`${ERROR_PREFIX.EVENT.CLOSE} 1 argument required, but only 0 present.`);
    }
    if (typeof eventInitConfig !== "object") {
      throw new TypeError(`${ERROR_PREFIX.EVENT.CLOSE} parameter 2 ('eventInitDict') is not an object`);
    }
    const { bubbles, cancelable, code, reason, wasClean } = eventInitConfig;
    this.type = `${type}`;
    this.timeStamp = Date.now();
    this.target = null;
    this.srcElement = null;
    this.returnValue = true;
    this.isTrusted = false;
    this.eventPhase = 0;
    this.defaultPrevented = false;
    this.currentTarget = null;
    this.cancelable = cancelable ? Boolean(cancelable) : false;
    this.cancelBubble = false;
    this.bubbles = bubbles ? Boolean(bubbles) : false;
    this.code = typeof code === "number" ? parseInt(code, 10) : 0;
    this.reason = `${reason || ""}`;
    this.wasClean = wasClean ? Boolean(wasClean) : false;
  }
};

// src/event/factory.js
function createEvent(config) {
  const { type, target } = config;
  const eventObject = new Event(type);
  if (target) {
    eventObject.target = target;
    eventObject.srcElement = target;
    eventObject.currentTarget = target;
  }
  return eventObject;
}
function createMessageEvent(config) {
  const { type, origin, data, target } = config;
  const messageEvent = new MessageEvent2(type, {
    data,
    origin
  });
  if (target) {
    messageEvent.target = target;
    messageEvent.srcElement = target;
    messageEvent.currentTarget = target;
  }
  return messageEvent;
}
function createCloseEvent(config) {
  const { code, reason, type, target } = config;
  let { wasClean } = config;
  if (!wasClean) {
    wasClean = code === CLOSE_CODES.CLOSE_NORMAL || code === CLOSE_CODES.CLOSE_NO_STATUS;
  }
  const closeEvent = new CloseEvent(type, {
    code,
    reason,
    wasClean
  });
  if (target) {
    closeEvent.target = target;
    closeEvent.srcElement = target;
    closeEvent.currentTarget = target;
  }
  return closeEvent;
}

// src/algorithms/close.js
function closeWebSocketConnection(context, code, reason) {
  context.readyState = websocket_default.CLOSING;
  const server = network_bridge_default.serverLookup(context.url);
  const closeEvent = createCloseEvent({
    type: "close",
    target: context.target,
    code,
    reason
  });
  delay(() => {
    network_bridge_default.removeWebSocket(context, context.url);
    context.readyState = websocket_default.CLOSED;
    context.dispatchEvent(closeEvent);
    if (server) {
      server.dispatchEvent(closeEvent, server);
    }
  }, context);
}
function failWebSocketConnection(context, code, reason) {
  context.readyState = websocket_default.CLOSING;
  const server = network_bridge_default.serverLookup(context.url);
  const closeEvent = createCloseEvent({
    type: "close",
    target: context.target,
    code,
    reason,
    wasClean: false
  });
  const errorEvent = createEvent({
    type: "error",
    target: context.target
  });
  delay(() => {
    network_bridge_default.removeWebSocket(context, context.url);
    context.readyState = websocket_default.CLOSED;
    context.dispatchEvent(errorEvent);
    context.dispatchEvent(closeEvent);
    if (server) {
      server.dispatchEvent(closeEvent, server);
    }
  }, context);
}

// src/helpers/normalize-send.js
function normalizeSendData(data) {
  if (Object.prototype.toString.call(data) !== "[object Blob]" && !(data instanceof ArrayBuffer)) {
    data = String(data);
  }
  return data;
}

// src/helpers/proxy-factory.js
var proxies = /* @__PURE__ */ new WeakMap();
function proxyFactory(target) {
  if (proxies.has(target)) {
    return proxies.get(target);
  }
  const proxy = new Proxy(target, {
    get(obj, prop) {
      if (prop === "close") {
        return function close(options = {}) {
          const code = options.code || CLOSE_CODES.CLOSE_NORMAL;
          const reason = options.reason || "";
          closeWebSocketConnection(proxy, code, reason);
        };
      }
      if (prop === "send") {
        return function send(data) {
          data = normalizeSendData(data);
          target.dispatchEvent(
            createMessageEvent({
              type: "message",
              data,
              origin: this.url,
              target
            })
          );
        };
      }
      const toSocketName = (type) => type === "message" ? `server::${type}` : type;
      if (prop === "on") {
        return function onWrapper(type, cb) {
          target.addEventListener(toSocketName(type), cb);
        };
      }
      if (prop === "off") {
        return function offWrapper(type, cb) {
          target.removeEventListener(toSocketName(type), cb);
        };
      }
      if (prop === "target") {
        return target;
      }
      return obj[prop];
    }
  });
  proxies.set(target, proxy);
  return proxy;
}

// src/helpers/byte-length.js
function lengthInUtf8Bytes(str) {
  const m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

// src/helpers/url-verification.js
var import_url_parse = __toESM(require_url_parse());
function urlVerification(url) {
  const urlRecord = new import_url_parse.default(url);
  const { pathname, protocol, hash } = urlRecord;
  if (!url) {
    throw new TypeError(`${ERROR_PREFIX.CONSTRUCTOR_ERROR} 1 argument required, but only 0 present.`);
  }
  if (!pathname) {
    urlRecord.pathname = "/";
  }
  if (protocol === "") {
    throw new SyntaxError(`${ERROR_PREFIX.CONSTRUCTOR_ERROR} The URL '${urlRecord.toString()}' is invalid.`);
  }
  if (protocol !== "ws:" && protocol !== "wss:") {
    throw new SyntaxError(
      `${ERROR_PREFIX.CONSTRUCTOR_ERROR} The URL's scheme must be either 'ws' or 'wss'. '${protocol}' is not allowed.`
    );
  }
  if (hash !== "") {
    throw new SyntaxError(
      `${ERROR_PREFIX.CONSTRUCTOR_ERROR} The URL contains a fragment identifier ('${hash}'). Fragment identifiers are not allowed in WebSocket URLs.`
    );
  }
  return urlRecord.toString();
}

// src/helpers/protocol-verification.js
function protocolVerification(protocols = []) {
  if (!Array.isArray(protocols) && typeof protocols !== "string") {
    throw new SyntaxError(`${ERROR_PREFIX.CONSTRUCTOR_ERROR} The subprotocol '${protocols.toString()}' is invalid.`);
  }
  if (typeof protocols === "string") {
    protocols = [protocols];
  }
  const uniq = protocols.map((p) => ({ count: 1, protocol: p })).reduce((a, b) => {
    a[b.protocol] = (a[b.protocol] || 0) + b.count;
    return a;
  }, {});
  const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);
  if (duplicates.length > 0) {
    throw new SyntaxError(`${ERROR_PREFIX.CONSTRUCTOR_ERROR} The subprotocol '${duplicates[0]}' is duplicated.`);
  }
  return protocols;
}

// src/websocket.js
var WebSocket = class _WebSocket extends target_default {
  constructor(url, protocols) {
    super();
    this._onopen = null;
    this._onmessage = null;
    this._onerror = null;
    this._onclose = null;
    this.url = urlVerification(url);
    protocols = protocolVerification(protocols);
    this.protocol = protocols[0] || "";
    this.binaryType = "blob";
    this.readyState = _WebSocket.CONNECTING;
    const client = proxyFactory(this);
    const server = network_bridge_default.attachWebSocket(client, this.url);
    delay(function delayCallback() {
      if (this.readyState !== _WebSocket.CONNECTING) {
        return;
      }
      if (server) {
        if (server.options.verifyClient && typeof server.options.verifyClient === "function" && !server.options.verifyClient()) {
          this.readyState = _WebSocket.CLOSED;
          log(
            "error",
            `WebSocket connection to '${this.url}' failed: HTTP Authentication failed; no valid credentials available`
          );
          network_bridge_default.removeWebSocket(client, this.url);
          this.dispatchEvent(createEvent({ type: "error", target: this }));
          this.dispatchEvent(createCloseEvent({ type: "close", target: this, code: CLOSE_CODES.CLOSE_NORMAL }));
        } else {
          if (server.options.selectProtocol && typeof server.options.selectProtocol === "function") {
            const selectedProtocol = server.options.selectProtocol(protocols);
            const isFilled = selectedProtocol !== "";
            const isRequested = protocols.indexOf(selectedProtocol) !== -1;
            if (isFilled && !isRequested) {
              this.readyState = _WebSocket.CLOSED;
              log("error", `WebSocket connection to '${this.url}' failed: Invalid Sub-Protocol`);
              network_bridge_default.removeWebSocket(client, this.url);
              this.dispatchEvent(createEvent({ type: "error", target: this }));
              this.dispatchEvent(createCloseEvent({ type: "close", target: this, code: CLOSE_CODES.CLOSE_NORMAL }));
              return;
            }
            this.protocol = selectedProtocol;
          }
          this.readyState = _WebSocket.OPEN;
          this.dispatchEvent(createEvent({ type: "open", target: this }));
          server.dispatchEvent(createEvent({ type: "connection" }), client);
        }
      } else {
        this.readyState = _WebSocket.OPEN;
        this.dispatchEvent(createEvent({ type: "open", target: this }));
      }
    }, this);
  }
  get onopen() {
    return this._onopen;
  }
  get onmessage() {
    return this._onmessage;
  }
  get onclose() {
    return this._onclose;
  }
  get onerror() {
    return this._onerror;
  }
  set onopen(listener) {
    this.removeEventListener("open", this._onopen);
    this._onopen = listener;
    this.addEventListener("open", listener);
  }
  set onmessage(listener) {
    this.removeEventListener("message", this._onmessage);
    this._onmessage = listener;
    this.addEventListener("message", listener);
  }
  set onclose(listener) {
    this.removeEventListener("close", this._onclose);
    this._onclose = listener;
    this.addEventListener("close", listener);
  }
  set onerror(listener) {
    this.removeEventListener("error", this._onerror);
    this._onerror = listener;
    this.addEventListener("error", listener);
  }
  send(data) {
    if (this.readyState === _WebSocket.CONNECTING) {
      throw new Error("Failed to execute 'send' on 'WebSocket': Still in CONNECTING state");
    }
    const messageEvent = createMessageEvent({
      type: "server::message",
      origin: this.url,
      data: normalizeSendData(data)
    });
    const server = network_bridge_default.serverLookup(this.url);
    if (server) {
      delay(() => {
        this.dispatchEvent(messageEvent, data);
      }, server);
    }
  }
  close(code, reason) {
    if (code !== void 0) {
      if (typeof code !== "number" || code !== 1e3 && (code < 3e3 || code > 4999)) {
        throw new TypeError(
          `${ERROR_PREFIX.CLOSE_ERROR} The code must be either 1000, or between 3000 and 4999. ${code} is neither.`
        );
      }
    }
    if (reason !== void 0) {
      const length = lengthInUtf8Bytes(reason);
      if (length > 123) {
        throw new SyntaxError(`${ERROR_PREFIX.CLOSE_ERROR} The message must not be greater than 123 bytes.`);
      }
    }
    if (this.readyState === _WebSocket.CLOSING || this.readyState === _WebSocket.CLOSED) {
      return;
    }
    const client = proxyFactory(this);
    if (this.readyState === _WebSocket.CONNECTING) {
      failWebSocketConnection(client, code || CLOSE_CODES.CLOSE_ABNORMAL, reason);
    } else {
      closeWebSocketConnection(client, code || CLOSE_CODES.CLOSE_NO_STATUS, reason);
    }
  }
};
WebSocket.CONNECTING = 0;
WebSocket.prototype.CONNECTING = WebSocket.CONNECTING;
WebSocket.OPEN = 1;
WebSocket.prototype.OPEN = WebSocket.OPEN;
WebSocket.CLOSING = 2;
WebSocket.prototype.CLOSING = WebSocket.CLOSING;
WebSocket.CLOSED = 3;
WebSocket.prototype.CLOSED = WebSocket.CLOSED;
var websocket_default = WebSocket;

// src/intercept.ts
var NativeWebSocket = window.WebSocket;
var interceptedHosts = /* @__PURE__ */ new Map();
var messageReceiver = /* @__PURE__ */ new Map();
var WebsocketProxy = new Proxy(NativeWebSocket, {
  construct(target, args) {
    console.log("WebSocketProxy constructed with args:", args);
    console.log("intercepted hosts", interceptedHosts);
    const url = args[0];
    const host = new URL(url).host;
    const instance = interceptedHosts.has(host) ? new websocket_default(url) : new target(...args);
    messageReceiver.set(host, (message) => {
      const messageEvent = new MessageEvent("message", {
        data: message,
        origin: url
      });
      instance.dispatchEvent(messageEvent);
    });
    const proxy = new Proxy(instance, {
      get(obj, prop) {
        const value = obj[prop];
        if (typeof value === "function") {
          return function(...args2) {
            const listeners = interceptedHosts.get(host);
            if (listeners && prop === "send") {
              for (const listener of listeners) {
                listener(args2[0]);
                return;
              }
            }
            return value.apply(obj, args2);
          };
        }
        return value;
      },
      set(obj, prop, value) {
        obj[prop] = value;
        return true;
      }
    });
    return proxy;
  }
});
function intercept(host) {
  window.WebSocket = WebsocketProxy;
  interceptedHosts.set(host, /* @__PURE__ */ new Set());
  return {
    on: (messageType, listener) => {
      if (messageType === "message") {
        const listeners = interceptedHosts.get(host);
        listeners?.add(listener);
      }
    },
    send: (message) => {
      const receiver = messageReceiver.get(host);
      if (receiver) receiver(message);
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  intercept
});
//# sourceMappingURL=intercept.js.map