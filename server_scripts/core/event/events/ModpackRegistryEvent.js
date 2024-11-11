/**
 * @class
 * @classdesc 用于创建注册表的事件
 */
function ModpackRegistryEvent() {

}
ModpackRegistryEvent.prototype = {
  // /**
  //  * 创建注册表
  //  * @param {string} pRegistryName 
  //  * @param {string} defaultKey
  //  * @param {() => T} defaultValueSupplier 
  //  * @returns {}
  //  */
  // create: function (pRegistryName, defaultKey, defaultValueSupplier) {
  //   ModpackRegistry.static.createRegistry(pRegistryName, defaultKey, defaultValueSupplier)
  // }
  /**
   * 
   * @param {(registryBuilder: (ModpackRegistryBuilder)) => void} pRegistryConsumer 
   * @returns {}
   */
  create: function (pRegistryConsumer) {
    ServerEvents.lowPriorityData(e => {
      let registryBuilder = new ModpackRegistryBuilder();
      pRegistryConsumer(registryBuilder);
      ModpackRegistry.static.createRegistry()
    })
  }
}