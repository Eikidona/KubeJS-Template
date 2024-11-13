// priority: 1000

/**
 * @class
 * @classdesc 需要以一种方式记录注册项 但使用已提供的ResourceKey可能会对游戏本身造成干涉 毕竟不是向minecraft注册事物
 * @template T
 * @param {ResourceLocation} registry 
 * @param {ResourceLocation} location 
 */
function $ResourceKey(registry, location) {
  /**@type {ResourceLocation} */
  this.registry = registry;
  /**@type {ResourceLocation} */
  this.location = location;
}
$ResourceKey.prototype = {
  /**
   * 获取该注册项的注册表的资源位置
   * @returns {ResourceLocation}
   */
  getRegistry: function () {
    return this.registry;
  },
  /**
   * 获取该注册项的资源位置
   * @returns {ResourceLocation}
   */
  getLocation: function () {
    return this.location;
  }
}