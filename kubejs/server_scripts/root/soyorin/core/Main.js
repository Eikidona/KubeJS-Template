// priority: 1000

/**
 * @class
 * @classdesc 主
 */
function $Main() {
  
}
$Main.prototype = {

}
$Main.static = {
  INSTANCE: new $Main(),
  init: function () {
    ServerEvents.lowPriorityData(event => {
      // 初始化事件 发布事件都应在此事件中
      $EventBus.static.EVENT_BUS.post('init', new $InitEvent());

    })
  }
}
// 初始化
$Main.static.init();