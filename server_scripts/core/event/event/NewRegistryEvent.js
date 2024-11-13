/**
 * @class
 * @classdesc 新注册表事件 这个事件用于创建注册表
 * @param {$RegistryBuilder[]} registryBuilders 
 */
function $NewRegistryEvent(registryBuilders) {
  /**@type {$RegistryBuilder[]} 构造队列 */
  this.registryBuilders = registryBuilders;
}
$NewRegistryEvent.prototype = {
  /**
   * 创建注册表构建器 并推入构造队列
   * @returns {$RegistryBuilder}
   */
  create: function () {
    let builder = new $RegistryBuilder();
    this.registryBuilders.push(builder);
    return builder;
  }

}
$NewRegistryEvent.static = {

}