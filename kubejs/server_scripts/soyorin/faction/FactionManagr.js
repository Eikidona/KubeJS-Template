/**
 * @class
 * @classdesc Faction模块
 * @param {$EventBus} eventBus 
 * @param {$ModuleContainer} moduleContainer 
 */
function $FactionManagr(eventBus, moduleContainer) {
  $FactionManagr.newRegistry(eventBus);
}

/**
 * prototype
 */

/**
 * Static
 */

/**
 * 新建注册表
 * @param {$EventBus} eventBus 
 */
$FactionManagr.newRegistry = function (eventBus) {
  /**
   * 
   * @param {$NewRegistryEvent} event 
   */
  let consumer = (event) => {
    event.getBuilder().setDefaultKey('faction:empty').setDefaultValue(() => $Faction.EMPTY).setRegistryName('modpack:faction');
  }
  eventBus.addListener($NewRegistryEvent, consumer);
}