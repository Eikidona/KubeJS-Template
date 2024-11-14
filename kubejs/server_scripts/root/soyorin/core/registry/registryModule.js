/**
 * @class
 * @classdesc 注册表模块
 * @param {$EventBus} eventBus 
 * @param {$ModuleContainer} moduleContainer 
 */
function $RegistryModule(eventBus, moduleContainer) {
  // eventBus.addListener() 初始化完全没有必要再使用initEvent
  $RegistryModule.init(eventBus);
}
/**
 * 初始化
 * @param {$EventBus} eventBus 
 */
$RegistryModule.init = function (eventBus) {
  /**@type {$RegistryBuilder[]} */
  let builders = [];
  eventBus.post(new $NewRegistryEvent(builders));
  builders.forEach(builder => $RegistryBuilder.build(builder));
}

// 添加注册表模块 它会负责在恰当时机将其实例化
$Main.addModule($RegistryModule);