/**
 * @class
 * @classdesc 用于创建注册表的事件
 */
function ModpackRegistryEvent() {

}
ModpackRegistryEvent.prototype = {
  /**
   * 创建注册表
   * @param {(registryBuilder: (ModpackRegistryBuilder)) => void} builderConsumer - 构造器执行
   */
  create: function (builderConsumer) {
    // ServerEvents.lowPriorityData(e => {
    //   let registryBuilder = new ModpackRegistryBuilder();
    //   builderConsumer(registryBuilder);
    //   ModpackRegistry.static.createRegistryFromBuilder(registryBuilder);
    // })
  }
}