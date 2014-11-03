(function umd(require){
  if ('object' == typeof exports) {
    module.exports = require('1');
  } else if ('function' == typeof define && define.amd) {
    define(function(){ return require('1'); });
  } else {
    this['mog'] = require('1');
  }
})((function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
exports.Mog = require('./mog');

}, {"./mog":2}],
2: [function(require, module, exports) {
var Merror = require('maizuo-fe/merror');

var ISDEBUG = (function () {
  try {
    if (window.localStorage) {
      return JSON.parse(localStorage.getItem('debug:setting')).enabled;
    }
  } catch (e) {
    return false;
  }
})();

var HOST = 'm.maizuo.com';
var URL = '/mog';

var Mog = function () {
  if (!(this instanceof Mog)) {
    return new Mog();
  }
  this._data = {};
  this._environment = ISDEBUG ? 'development' : 'production';
  return this;
};

Mog.prototype.err = function (err) {
  this._data.errName = err.name || '';
  this._data.errMessage = err.message || '';
  this._data.errType = err.code || -1;
  this._data.errStack = err.stack || '';
  return this;
};

Mog.prototype.push = function (interfaceName) {
  this._data.interfaceName = interfaceName;
  this.inject();
  return this;
};

Mog.prototype.url = function () {
  var params  = '&t=' + this.type + '&d=' +
    encodeURIComponent(JSON.stringify(this._data)) +
    '&e=' + encodeURIComponent(this._environment);
  return window.location.protocol + '//' + HOST + URL + '?ts=' + Number(new Date()) + params;
};

Mog.prototype.inject = function () {
  var img = document.createElement('img');
  img.style.visibility = 'hidden';
  img.src = this.url();
  doc.getElementsByTagName('body')[0].appendChild(img);
  img.parentNode.removeChild(img);
};

var exports = (function () {
  var expose = ['push', 'err'];
  var api = {};
  var i, len;
  for (i = 0, len = expose.length; i < len; i++) {
    (function (i) {
      var method = expose[i];
      api[method] = function () {
        var mog = new Mog();
        mog[method].apply(mog, arguments);
      };
    })(i);
  }

  return api;
})();

module.exports = Mog;

}, {}]}, {}, {"1":""})
);