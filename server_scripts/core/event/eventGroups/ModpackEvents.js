const ModpackEvents = {
  /**
   * 创建注册表事件
   * @param {string} registryName - 注册表名称
   * @param {(arg: (ModpackRegistryEvent)) => void} eventConsumer - 事件执行
   * @returns {ResourceLocation} - 注册表资源位置
   */
  newRegistry: function (registryName, eventConsumer) {
    let location = Modpack.static.createLocation(registryName);
    ServerEvents.lowPriorityData(e => {
      let event = new ModpackRegistryEvent();
      eventConsumer(event)
      let registryBuilder = new ModpackRegistryBuilder().setRegistryName(String(location));
      eventConsumer(registryBuilder);
      ModpackRegistry.static.createRegistryFromBuilder(registryBuilder);
    })
    return location;
  },
  /**
   * 注册事件
   * @param {string} registryName - 注册类型 注册表名
   * @param {() => T} valueSupplier - 值提供器
   */
  register: function (registryName, valueSupplier) {
    ServerEvents.highPriorityData(e => {
      ModpackRegistry.static.register()
    })
  }
}