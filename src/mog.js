var Debug = require('maizuo-fe/debug');
var Merror = require('maizuo-fe/merror');

var HOST = 'm.maizuo.com';
var URL = '/mog';

var Mog = function () {
  if (!(this instanceof Mog)) {
    return new Mog();
  }
  this._data = {};
  this._environment = Debug.isEnabled() ? 'development' : 'production';
  return this;
};

Mog.prototype.err = function (err) {
  if (!(err instanceof Error)) {
    return this.err(Merror(this, arguments));
  }
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
