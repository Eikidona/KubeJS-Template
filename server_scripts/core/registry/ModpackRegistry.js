/**
 * @class
 * @classdesc 注册表类与根注册表
 * @template T
 */
function ModpackRegistry() {
  /**@type {Map<string, T>} */
  this.byKey = new Map();
  /**@type {Map<T, string>} */
  this.byValue = new Map();
}
ModpackRegistry.prototype = {
  /**
   * 从注册表获取Key 如果没有则返回默认 Key
   * @param {T} pValue 
   * @returns {ResourceLocation}
   */
  getKey: function (pValue) {
    let key = this.byValue.get(pValue);
    return Boolean(key) ? key : Modpack.static.createLocation(this.byKey.keys().next().value);
  },
  /**
   * 从注册表获取Value 如果没有则返回默认 Value
   * @param {ResourceLocation} pKey 
   * @returns {T}
   */
  getValue: function (pKey) {
    let value = this.byKey.get(String(pKey))
    return Boolean(value) ? value : this.byValue.values().next().value;
  },
  /**
   * 注册
   * @param {ResourceLocation} pKey 
   * @param {T} pValue 
   */
  register: function (pKey, pValue) {
    this.byKey.set(String(pKey), pValue);
    this.byKey.set(pValue, String(pKey));
  }
}
ModpackRegistry.static = {
  /**@type {Map<string, ModpackRegistry>} */
  REGISTRIES: new Map(),
  /**
   * 创建注册表
   * @param {string} pRegistryName - 注册表名称
   * @param {string} defaultKey - 注册表默认键
   * @param {T} defaultValue - 注册表默认值
   */
  createRegistry: function (pRegistryName, defaultKey, defaultValue) {
    // 向注册表注册默认值 这里调用注册表的register方法 不需要转换为String
    let registry = new ModpackRegistry().register(Modpack.static.createLocation(defaultKey), defaultValue);
    // 注册表的ResourceLocation
    let registryName = Modpack.static.createLocation(pRegistryName);
    // 这里直接对根注册表进行操作 需要转换为String
    ModpackRegistry.static.REGISTRIES.set(String(registryName), registry);
  },
  /**
   * 从Builder创建注册表
   * @param {ModpackRegistryBuilder} pRegistryBuilder 
   */
  createRegistryFromBuilder: function (pRegistryBuilder) {
    let { registryName, defaultKey, defaultValue } = pRegistryBuilder;
    ModpackRegistry.static.createRegistry(registryName, defaultKey, defaultValue());
  },
  /**
   * 获取注册项
   * @param {ModpackResourceKey<T>} resourceKey 
   * @returns {ModpackRegistryObject<T>}
   */
  getRegistryObject: function (resourceKey) {
    let registryName = String(resourceKey.getRegistry());
    let location = String(resourceKey.getLocation());
    let registry = ModpackRegistry.static.REGISTRIES.get(registryName);
    /**@type {ModpackRegistryObject} */
    let registryObject;
    if (Boolean(registry)) {
      let value = registry.getValue(location);
      registryObject = new ModpackRegistryObject(location, value);
    }
    return registryObject;
  },
  /**
   * 注册
   * @param {string} registryName 
   * @param {string} registryObjectName 
   * @param {() => T} registryValueSupplier 
   */
  register: function (registryName, registryObjectName, registryValueSupplier) {
    let registryObjectLocation = Modpack.static.createLocation(registryObjectName);
    let registryName = String(registryObjectLocation);
    let registry = ModpackRegistry.static.REGISTRIES.get(registryName);
    if (Boolean(registry)) {
      registry.register(registryObjectLocation, registryValueSupplier());
    } else {
      console.error(`未找到${registryName} 注册表`);
    }
  }
}
/**
 * ResourceKey包含了RegistryKey与ResourceLocation
 */