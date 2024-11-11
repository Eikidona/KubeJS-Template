/**
 * @class
 * @classdesc 注册表构造器 使用Supplier来延后实例化 以防止注册时value的类型还未加载导致的undefined
 * @template T
 */
function ModpackRegistryBuilder() {
  /**@type {string} */
  this.registryName;
  /**@type {string} */
  this.defaultKey;
  /**@type {() => T} */
  this.defaultValue;
}
ModpackRegistryBuilder.prototype = {
  /**
   * 设置注册表名称 无需手动调用
   * @param {string} pRegistryName 
   */
  setRegistryName: function (pRegistryName) {
    if (!Boolean(this.registryName)) {
      this.registryName = pRegistryName;
    }
    return this;
  },
  /**
  * 设置注册表默认键
  * @param {() => string} pDefaultKey
  */
  setDefaultKey: function (pDefaultKey) {
    if (!Boolean(this.defaultKey)) {
      this.defaultKey = pDefaultKey;
    }
    return this;
  },
  /**
  * 设置注册表默认值
  * @param {() => T} pDefaultValue
  */
  setDefaultValue: function (pDefaultValue) {
    if (!Boolean(this.defaultValue)) {
      this.defaultValue = pDefaultValue;
    }
    return this;
  }
}