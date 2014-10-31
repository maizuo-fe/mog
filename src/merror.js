var Merror = function (message, code, description) {
  if (!(this instanceof Merror)) {
    return new Merror(message, code, description);
  }
  this.name = 'MaizuoError';
  this.message = message || '';
  this.description = description || '';
  this.code = code || -1;
  this.stack = '';
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Merror);
  }
  return this;
};
Merror.prototype = Error.prototype;

module.exports = Merror;
