/**
 * @class
 * @classdesc 注册表管理器
 * @param {$EventBus} eventBus 
 * @param {$ModuleContainer} moduleContainer 
 */
function $RegistryManager(eventBus, moduleContainer) {
  // eventBus.addListener() 初始化完全没有必要再使用initEvent
  // $RegistryManager.postNewRegistryEvent(eventBus);
}

/**
 * prototype
 */

/**
 * 
 * @param {$EventBus} eventBus 
 */
$RegistryManager.prototype.postEvent = function (eventBus) {
  $RegistryManager.postNewRegistryEvent(eventBus);
}

/**
 * Static
 */

/**
 * 根注册表
 * @type {$Registry<$Registry<T>>} 
 */
$RegistryManager.ROOT_REGISTRY = new $Registry();
$RegistryManager.ROOT_REGISTRY_NAME = new ResourceLocation('modpack', 'root');

/**
 * 发布新建注册表事件
 * @param {$EventBus} eventBus 
 */
$RegistryManager.postNewRegistryEvent = function (eventBus) {
  let newRegistry = new $NewRegistryEvent();
  eventBus.post(newRegistry);
  $NewRegistryEvent.build();
  // event.registryBuilders.forEach(builder => $RegistryBuilder.build(builder));
}

/**
 * 登记注册表 
 * @param {$ResourceKey<$Registry<T>>} registryKey
 * @param {$Registry<T>} registry 
 */
$RegistryManager.registerRegistry = function (registryKey, registry) {
  this.ROOT_REGISTRY.register(registryKey, registry);
}

/**
 * 获取注册表
 * @param {ResourceLocation} registryName
 * @returns {$Optional<$Registry<T>>} 
 */
$RegistryManager.getRegistry = function (registryName) {
  return $RegistryManager.ROOT_REGISTRY.get(registryName);
}

// 添加注册表模块 它会负责在恰当时机将其实例化
$Main.addModule($RegistryManager);
