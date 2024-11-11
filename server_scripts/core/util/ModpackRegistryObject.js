// priority: 9999
/**
 * @class
 * @classdesc
 * @template T
 * @param {String} pKey 
 * @param {T} pValue 
 */
function ModpackRegistryObject(pKey, pValue) {
  this.key = pKey;
  this.value = pValue;
}
ModpackRegistryObject.prototype = {
  getKey: function () {
    return this.key;
  },
  getValue: function () {
    return this.value;
  }
}