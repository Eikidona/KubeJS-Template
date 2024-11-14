// priority: 1000

/**
 * @class
 * @classdesc 注册表
 * @template T
 */
function $Registry() {
  /**@type {Map<string, T>} */
  this.byKey = new Map();
  /**@type {Map<T, string>} */
  this.byValue = new Map();
}

/**
 * 原型 
 */

/**
 * 获取注册项
 * @param {ResourceLocation} key 
 * @returns {$Optional<T>}
 */
$Registry.prototype.get = function (key) {
  return $Optional.ofNullable(this.byKey.get(String(key)));
}
/**
 * 获取注册键
 * @param {T} value 
 * @returns {$Optional<ResourceLocation>}
 */
$Registry.prototype.getKey = function (value) {
  return $Optional.ofNullable(this.byValue.get(value));
}
/**
 * 注册
 * @param {ResourceLocation} key 
 * @param {T} value 
 */
$Registry.prototype.register = function (key, value) {
  this.byKey.set(String(key), value);
  this.byValue.set(value, String(key));
  $Registry.getRegistryKey(this).get()
  ResourceKey.create
}
// $Registry.prototype = {
//   /**
//    * 获取注册项
//    * @param {ResourceLocation} key
//    * @returns {$Optional<T>}
//    */
//   get: function (key) {
//     return $Optional.ofNullable(this.byKey.get(String(key)));
//   },
//   /**
//    * 获取注册键
//    * @param {T} value
//    * @returns {$Optional<ResourceLocation>}
//    */
//   getKey: function (value) {
//     return $Optional.ofNullable(this.byValue.get(value));
//   },
//   /**
//    * 注册
//    * @param {ResourceLocation} key
//    * @param {T} value
//    */
//   register: function (key, value) {
//     this.byKey.set(String(key), value);
//     this.byValue.set(value, String(key));
//     $Registry.static.getRegistryKey(this).get()
//     ResourceKey.create
//   }
// }

/**
 * 静态
 */
$Registry.ROOT_REGISTRY_KEY = new ResourceLocation('modpack', 'root')
$Registry.ROOT_REGISTRY = new $Registry();

// $Registry.init = function () {
//   $EventBus.EVENT_BUS.post('newRegistry', new $NewRegistryEvent())
// }

/**
 * 获取注册表的键
 * @param {$Registry<T>} registry 
 * @returns {$Optional<ResourceLocation>}
 */
$Registry.getRegistryKey = function (registry) {
  return this.ROOT_REGISTRY.getKey(registry);
}
/**
 * 获取注册表
 * @param {ResourceLocation} registryName 
 * @returns {$Optional<$Registry<T>>} 
 */
$Registry.getRegistry = function (registryName) {
  return this.ROOT_REGISTRY.get(registryName);
}
/**
 * 注册
 * @param {$Registry<T>} registry 
 * @param {$ResourceKey<T>} key 
 * @param {T} value 
 */
$Registry.register = function (registry, key, value) {
  registry.register(key.getLocation(), value);
}
/**
 * 登记注册表
 * @param {ResourceLocation} registryName 
 * @param {$Registry<T>} registry 
 * @returns {$ResourceKey<$Registry>} 
 */
$Registry.registerRegistry = function (registryName, registry) {
  this.ROOT_REGISTRY.register(registryName, registry);
  return new $ResourceKey(this.ROOT_REGISTRY_KEY, registryName);
}
/**
 * 创建注册表 
 * @param {ResourceLocation} defaultKey 
 * @param {T} defaultValue 
 * @param {$Registry<T>} 
 */
$Registry.createRegistry = function (defaultKey, defaultValue) {
  let registry = new $Registry();
  registry.register(defaultKey, defaultValue);
  return registry;
}
/**
 * 构建注册表
 * @param {$RegistryBuilder} builder 
 */
$Registry.buildRegistry = function (builder) {
  let { registryName, defaultKey, defaultValue } = builder;
  try {
    if (!ResourceLocation.isValidResourceLocation(defaultKey)) throw new Error(`defaultKey不合法 它应该是符合ResourceLocation规范的string 输入值: ${defaultKey}`);
    if (!ResourceLocation.isValidResourceLocation(registryName)) throw new Error(`defaultKey不合法 它应该是符合ResourceLocation规范的string 输入值: ${registryName}`);
    let registry = this.createRegistry(new ResourceLocation(defaultKey), defaultValue());
    this.registerRegistry(new ResourceLocation(registryName), registry);
  } catch (error) {
    console.error(error);
  }
}
// $Registry.static = {
//   ROOT_REGISTRY_KEY: new ResourceLocation('modpack', 'root'),
//   ROOT_REGISTRY: new $Registry(),
//   init: function () {
//     $EventBus.EVENT_BUS.post('newRegistry', new $NewRegistryEvent())
//   },
//   /**
//    * 获取注册表的键
//    * @param {$Registry<T>} registry 
//    * @returns {$Optional<ResourceLocation>}
//    */
//   getRegistryKey: function (registry) {
//     return this.ROOT_REGISTRY.getKey(registry);
//   },
//   /**
//    * 获取注册表
//    * @param {ResourceLocation} registryName 
//    * @returns {$Optional<$Registry<T>>} 
//    */
//   getRegistry: function (registryName) {
//     return this.ROOT_REGISTRY.get(registryName);
//   },
//   /**
//    * 登记注册表
//    * @param {ResourceLocation} registryName 
//    * @param {$Registry<T>} registry 
//    * @returns {$ResourceKey<$Registry>} 
//    */
//   registerRegistry: function (registryName, registry) {
//     this.ROOT_REGISTRY.register(registryName, registry);
//     return new $ResourceKey(this.ROOT_REGISTRY_KEY, registryName);
//   },
//   /**
//    * 创建注册表 
//    * @param {ResourceLocation} defaultKey 
//    * @param {T} defaultValue 
//    * @param {$Registry<T>} 
//    */
//   createRegistry: function (defaultKey, defaultValue) {
//     let registry = new $Registry();
//     registry.register(defaultKey, defaultValue);
//     return registry;
//   },
//   /**
//    * 构建注册表
//    * @param {$RegistryBuilder} builder 
//    */
//   buildRegistry: function (builder) {
//     let { registryName, defaultKey, defaultValue } = builder;
//     try {
//       if (!ResourceLocation.isValidResourceLocation(defaultKey)) throw new Error(`defaultKey不合法 它应该是符合ResourceLocation规范的string 输入值: ${defaultKey}`);
//       if (!ResourceLocation.isValidResourceLocation(registryName)) throw new Error(`defaultKey不合法 它应该是符合ResourceLocation规范的string 输入值: ${registryName}`);
//       let registry = this.createRegistry(new ResourceLocation(defaultKey), defaultValue());
//       this.registerRegistry(new ResourceLocation(registryName), registry);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

/**
 * @class
 * @classdesc 注册表构建器 用于在事件中使用
 */
function $RegistryBuilder() {
  /**@type {string} */
  this.registryName;
  /**@type {string} */
  this.defaultKey;
  /**@type {() => T} */
  this.defaultValue;
}

/**
 * 原型
 */

/**
 * 设置注册表名称
 * @param {string} registryName 
 * @returns {$RegistryBuilder} 
 */
$RegistryBuilder.prototype.setRegistryName = function (registryName) {
  this.registryName = registryName;
  return this;
}
/**
 * 设置注册表默认注册对象的键
 * @param {string} defaultKey 
 * @returns {$RegistryBuilder} 
 */
$RegistryBuilder.prototype.setDefaultKey = function (defaultKey) {
  this.defaultKey = defaultKey;
  return this;
}
/**
 * 设置注册表默认注册对象的键
 * @param {() => T} defaultValue 
 * @returns {$RegistryBuilder} 
 */
$RegistryBuilder.prototype.setDefaultValue = function (defaultValue) {
  this.defaultValue = defaultValue;
  return this;
}
/**
 * 
 * @param {$RegistryBuilder} builder 
 */
$RegistryBuilder.build = function (builder) {
  $Registry.buildRegistry(builder);
}  
  
// $RegistryBuilder.prototype = {
//   /**
//    * 设置注册表名称
//    * @param {string} registryName
//    * @returns {$RegistryBuilder}
//    */
//   setRegistryName: function (registryName) {
//     this.registryName = registryName;
//     return this;
//   },
//   /**
//    * 设置注册表默认注册对象的键
//    * @param {string} defaultKey
//    * @returns {$RegistryBuilder}
//    */
//   setDefaultKey: function (defaultKey) {
//     this.defaultKey = defaultKey;
//     return this;
//   },
//   /**
//    * 设置注册表默认注册对象的键
//    * @param {() => T} defaultValue
//    * @returns {$RegistryBuilder}
//    */
//   setDefaultValue: function (defaultValue) {
//     this.defaultValue = defaultValue;
//     return this;
//   }
// }

/**
 * 静态
 */

// /**
//  * @type {$RegistryBuilder[]} 构造队列
//  */
// $RegistryBuilder.BUILDERS = [];
// // 初始化
// $RegistryBuilder.init = function () {
//   // 初始化事件期间抛出新建注册表事件
//   $EventBus.EVENT_BUS.post('newRegistry', new $NewRegistryEvent(this.BUILDERS));
//   // 构建注册表 清空队列
//   this.BUILDERS.forEach((builder) => {
//     $Registry.buildRegistry(builder);
//   })
//   // 清空队列
//   this.BUILDERS = [];
// }


// $RegistryBuilder.static = {
//   /**@type {$RegistryBuilder[]} 构造队列 */
//   BUILDERS: [],
//   init: function () {
//     // 初始化期间抛出新建注册表事件
//     $EventBus.EVENT_BUS.post('newRegistry', new $NewRegistryEvent(this.BUILDERS));
//     // 构建注册表 清空队列
//     this.BUILDERS.forEach((builder) => {
//       $Registry.buildRegistry(builder);
//     })
//     // 清空队列
//     this.BUILDERS = [];
//   }
// }


// 初始化事件中调用init
// $EventBus.EVENT_BUS.addListener('init', event => {
//   $RegistryBuilder.init()
// })

/**
 * 需要注册表访问器以便于访问在事件中注册的注册表
 */

/**
 * 需要延迟构造器延迟注册器以更便于外部直接使用
 */
