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
    return Boolean(key) ? key : Modpack.static.createResourceLocation(this.byKey.keys().next().value);
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
  /**@type {Map<string, Registry>} */
  REGISTRIES: new Map(),
  /**
   * 创建注册表
   * @param {string} pRegistryName - 注册表名称
   * @param {string} defaultKey - 注册表默认键
   * @param {T} defaultValue - 注册表默认值
   * @returns {ResourceLocation} - 注册表的ResourceLocation
   */
  createRegistry: function (pRegistryName, defaultKey, defaultValue) {
    // 向注册表注册默认值 这里调用注册表的register方法 不需要转换为String
    let registry = new ModpackRegistry().register(Modpack.static.createResourceLocation(defaultKey), defaultValue);
    // 注册表的ResourceLocation
    let registryName = Modpack.static.createResourceLocation(pRegistryName);
    // 这里直接对根注册表进行操作 需要转换为String
    ModpackRegistry.static.REGISTRIES.set(String(registryName), registry);
    return registryName;
  },
  /**
   * 从Builder创建注册表
   * @param {ModpackRegistryBuilder} pRegistryBuilder 
   */
  createRegistryFromBuilder: function (pRegistryBuilder) {
    let { registryName, defaultKey, defaultValue } = pRegistryBuilder;
    return ModpackRegistry.static.createRegistry(registryName(), defaultKey(), defaultValue())
  },
  /**
   * 获取注册项
   * @param {ModpackResourceKey<T>} pResourceKey 
   * @returns {ModpackRegistryObject<T>}
   */
  getRegistryObject: function (pResourceKey) {
    
  }
}
/**
 * ResourceKey包含了RegistryKey与ResourceLocation
 */