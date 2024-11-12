/**
 * @class
 * @classdesc
 * @description - 保存在映射内的一定是基本类型string 为了支持新构造出的ResourceLocation也能获取注册表项
 * @template T
 */
function PackRegistry() {
  /**@type {Map<string, T>} */
  this.byKey = new Map();
  /**@type {Map<T, string>} */
  this.byValue = new Map();
}
PackRegistry.prototype = {
  /**
   * 注册 用于外部(相对)的方法 使用ResourceLocation
   * @param {ResourceLocation} key - 键
   * @param {T} value - 值
   */
  register: function (key, value) {
    // 字符串转换
    let locationString = String(key);
    this.byKey.set(locationString, value);
    this.byValue.set(value, locationString)
  },
  /**
   * 获取值 值可能不存在 所以使用Optional
   * @param {ResourceLocation} resourceLocation 
   * @returns {Internal.Optional<T>}
   */
  get: function (resourceLocation) {
    return $Optional.ofNullable(this.byKey.get(String(resourceLocation)));
  },
  /**
   * 获取键 键可能不存在 所以使用Optional
   * @param {T} value 
   * @returns {Internal.Optional<ResourceLocation>} 
   */
  getKey: function (value) {
    return $Optional.ofNullable(Modpack.static.createLocation(this.byValue.get(value)));
  }
}
PackRegistry.static = {
  /**@type {Map<string, T>} 根注册表 注册表的注册表*/
  REGISTRY: new PackRegistry(),
  /**
   * 新注册表 该方法不直接使用 
   * @param {ResourceLocation} registryName - 注册表名称 这里使用ResourceLocation是为了更外层的引用封装
   * @param {ResourceLocation} defaultKey - 注册表默认键
   * @param {T} defaultValue - 注册表默认值
   */
  newRegistry: function (registryName, defaultKey, defaultValue) {
    let newRegistry = new PackRegistry().register(defaultKey, defaultValue);
    PackRegistry.static.REGISTRY.register(registryName, newRegistry);
    return newRegistry;
  }
}

/**
 * @class
 * @classdesc 注册表构造器 
 */
function PackRegistryBuilder() {
  /**@type {ResourceLocation} */
  this.registryName = new ResourceLocation('modpack:empty');
  /**@type {ResourceLocation} */
  this.defaultKey = new ResourceLocation('modpack:empty');
  /**@type {() => T} */
  this.defaultValue = () => 'empty';
}

PackRegistryBuilder.prototype = {
  /**
   * 设置注册表名称
   * @param {ResourceLocation} registryName 注册表资源位置
   * @returns {PackRegistryBuilder}
   */
  setName: function (registryName) {
    this.registryName = registryName;
    return this;
  },
  /**
   * 设置默认键
   * @param {ResourceLocation} defaultKey 默认键
   * @returns {PackRegistryBuilder}
   */
  setDefaultKey: function (defaultKey) {
    this.defaultKey = defaultKey;
    return this;
  },
  /**
   * 设置默认值 Supplier<T> 防止优先级带来的undefined
   * @param {() => T} defaultValue 
   * @returns {PackRegistryBuilder}
   */
  setDefaultValue: function (defaultValue) {
    this.defaultValue = defaultValue;
    return this;
  },
  /**
   * 创建
   */
  build: function () {
    let { registryName, defaultKey, defaultValue } = this;
    if (String(registryName) == 'modpack:empty') console.error('注册表未提供id 创建失败');
    if (String(defaultKey) == 'modpack:empty') console.warn(`注册表${String(registryName)}未提供默认Key`);
    if (defaultValue() == 'empty') console.warn(`注册表${String(registryName)}未提供默认Value`);
    PackRegistry.static.newRegistry(registryName, defaultKey, defaultValue());
  }
}
PackRegistryBuilder.static = {

}