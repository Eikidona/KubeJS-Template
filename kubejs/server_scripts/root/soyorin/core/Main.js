// priority: 1000

/**
 * @class
 * @classdesc 主
 */
function $Main() {
  /**@type {Map<string, Object} */
  this.modules = new Map();
}
$Main.prototype = {

}
$Main.INSTANCE = new $Main();
// /**
//  * 初始化 准备修改这个流程
//  */
// $Main.init = function () {
//   ServerEvents.lowPriorityData(event => {
//     /**
//      * 此举意在解决优先级带来的问题
//      */
//     $EventBus.EVENT_BUS.post('init', new $InitEvent());

//   })
// }

/**
 * 模拟@Mod 注解 代理依赖此系统的模块初始化 并使依赖此系统的模块可拆卸
 */

/**
 * 接受构造函数本身
 * @param {function($EventBus, $ModuleContainer): void} constructor 
 */
$Main.addModule = function (constructor) {
  // 接受模块的主类 合适的时机实例化
  ServerEvents.lowPriorityData(event => {
    this.INSTANCE.modules.set(constructor.prototype, new constructor($EventBus.EVENT_BUS, new $ModuleContainer));
  })
}

// $Main.static = {
//   INSTANCE: new $Main(),
//   init: function () {
//     ServerEvents.lowPriorityData(event => {
//       // 初始化事件 发布事件都应在此事件中
//       $EventBus.EVENT_BUS.post('init', new $InitEvent());

//     })
//   }
// }
// // 初始化
// $Main.static.init();