/**
 * @class
 * @classdesc
 * @description - 保存在映射内的一定是基本类型string 为了支持新构造出的ResourceLocation也能获取注册表项
 * @template T
 */
function CustomRegistry() {
  /**@type {Map<string, T>} */
  this.byKey = new Map();
  /**@type {Map<T, string>} */
  this.byValue = new Map();
}
CustomRegistry.prototype = {
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
CustomRegistry.static = {
  /**@type {Map<string, T>} 根注册表 注册表的注册表*/
  REGISTRY: new CustomRegistry(),
  /**
   * 新注册表 该方法不直接使用 
   * @param {ResourceLocation} registryName - 注册表名称 这里使用ResourceLocation是为了更外层的引用封装
   * @param {ResourceLocation} defaultKey - 注册表默认键
   * @param {T} defaultValue - 注册表默认值
   */
  newRegistry: function (registryName, defaultKey, defaultValue) {
    let newRegistry = new CustomRegistry().register(defaultKey, defaultValue);
    CustomRegistry.static.REGISTRY.register(registryName, newRegistry);
    return newRegistry;
  }
}

/**
 * @class
 * @classdesc 注册表构造器 
 */
function CustomRegistryBuilder() {
  /**@type {ResourceLocation} */
  this.registryName;
  /**@type {ResourceLocation} */
  this.defaultKey;
  /**@type {() => T} */
  this.defaultValue;
}

CustomRegistryBuilder.prototype = {
  /**
   * 设置注册表名称
   * @param {ResourceLocation} registryName 注册表资源位置
   * @returns {CustomRegistryBuilder}
   */
  setName: function (registryName) {
    this.registryName = registryName;
    return this;
  },
  /**
   * 设置默认键
   * @param {ResourceLocation} defaultKey 默认键
   * @returns {CustomRegistryBuilder}
   */
  setDefaultKey: function (defaultKey) {
    this.defaultKey = defaultKey;
    return this;
  },
  /**
   * 设置默认值 Supplier<T> 防止优先级带来的undefined
   * @param {() => T} defaultValue 
   * @returns {CustomRegistryBuilder}
   */
  setDefaultValue: function (defaultValue) {
    this.defaultValue = defaultValue;
    return this;
  },
  /**
   * 检查、构建并注册注册表
   * @returns {}
   */
  build: function () {
    
  }
}