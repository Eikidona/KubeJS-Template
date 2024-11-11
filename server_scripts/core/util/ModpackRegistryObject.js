// priority: 9999
/**
 * @class
 * @classdesc
 * @template T
 * @param {ResourceLocation} pKey 
 * @param {T} pValue 
 */
function ModpackRegistryObject(pKey, pValue) {
  this.key = pKey;
  this.value = pValue;
}
ModpackRegistryObject.prototype = {
  /**
   * 获取注册名
   * @returns 
   */
  getKey: function () {
    return this.key;
  },
  /**
   * 获取持有值
   * @returns 
   */
  get: function () {
    return this.value;
  },
  isEmpty: function () {

  }
}
ModpackRegistryObject.static = {
  EMPTY: new ModpackRegistryObject(Modpack.static.createLocation('empty'), '')
}