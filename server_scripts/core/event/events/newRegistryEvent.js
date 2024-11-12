/**
 * @class
 * @classdesc 新建注册表事件 一切注册表的创建都应该在该事件内完成
 * @description 由于拟事件系统的存在 事件内部不必再考虑初始化问题 加载顺序已由拟事件系统接管
 */
function NewRegistryEvent() {
  this.registryBuilder = new PackRegistryBuilder();
}
NewRegistryEvent.prototype = {
  /**
   * 创建一个注册表构造器
   * @returns {PackRegistryBuilder}
   */
  create: function () {
    return this.registryBuilder;
  }
}