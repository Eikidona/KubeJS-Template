// priority: 1000

/**
 * @class
 * @classdesc
 * @template T
 */
function $Registry() {
  /**@type {Map<string, T>} */
  this.byKey = new Map();
  /**@type {Map<T, string>} */
  this.byValue = new Map();
}
$Registry.prototype = {
  /**
   * 获取注册项
   * @param {ResourceLocation} key 
   * @returns {Internal.Optional<T>}
   */
  get: function (key) {
    return Optional.ofNullable(this.byKey.get(String(key)));
  },
  /**
   * 获取注册键
   * @param {T} value 
   * @returns {Internal.Optional<ResourceLocation>}
   */
  getKey: function (value) {
    return Optional.ofNullable(this.byValue.get(value));
  },
  /**
   * 注册
   * @param {ResourceLocation} key 
   * @param {T} value 
   */
  register: function (key, value) {
    this.byKey.set(String(key), value);
    this.byValue.set(value, String(key));
    $Registry.static.getKey(this).get()
    ResourceKey.create
  }
}
$Registry.static = {
  ROOT_REGISTRY_KEY: new ResourceLocation('modpack', 'root'),
  ROOT_REGISTRY: new $Registry(),
  init: function () {
    $EventBus.static.EVENT_BUS.post('newRegistry', new $NewRegistryEvent())
  },
  /**
   * 获取注册表的键
   * @param {$Registry<T>} registry 
   * @returns {Internal.Optional<ResourceLocation>}
   */
  getKey: function (registry) {
    return this.ROOT_REGISTRY.getKey(registry);
  },
  /**
   * 获取注册表
   * @param {ResourceLocation} registryName 
   * @returns {Internal.Optional<$Registry<T>>} 
   */
  get: function (registryName) {
    return this.ROOT_REGISTRY.get(registryName);
  },
  /**
   * 登记注册表
   * @param {ResourceLocation} registryName 
   * @param {$Registry<T>} registry 
   * @returns {$ResourceKey<$Registry>} 
   */
  register: function (registryName, registry) {
    this.ROOT_REGISTRY.register(registryName, registry);
    return new $ResourceKey(this.ROOT_REGISTRY_KEY, registryName);
  }
}

/**
 * @class
 * @classdesc 注册表构建器
 */
function $RegistryBuilder() {
  /**@type {string} */
  this.registryName;
  /**@type {string} */
  this.defaultKey;
  /**@type {() => T} */
  this.defaultValue;
}
$RegistryBuilder.prototype = {
  /**
   * 设置注册表名称
   * @param {string} registryName 
   * @returns {$RegistryBuilder} 
   */
  setRegistryName: function (registryName) {
    this.registryName = registryName;
    return this;
  },
  /**
   * 设置注册表默认注册对象的键
   * @param {string} defaultKey 
   * @returns {$RegistryBuilder} 
   */
  setDefaultKey: function (defaultKey) {
    this.defaultKey = defaultKey;
    return this;
  },
  /**
   * 设置注册表默认注册对象的键
   * @param {() => T} defaultValue 
   * @returns {$RegistryBuilder} 
   */
  setDefaultValue: function (defaultValue) {
    this.defaultValue = defaultValue;
    return this;
  }
}
$RegistryBuilder.static = {

}
