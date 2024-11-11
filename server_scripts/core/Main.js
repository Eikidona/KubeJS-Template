/**
 * @typedef {'init' | 'registry' | 'register'} LoadPhaseEnum 加载状态枚举 用于进行一些操作时查看当前状态 阻止在注册阶段前从注册表获取值
 */


/**
 * @class
 * @classdesc 只是为了存储一些状态而存在
 */
function Main() {
  
}
Main.prototype = {

}
Main.static = {
  /**
   * @type {LoadPhaseEnum}
   */
  LoadPhase: 'init',
  /**
   * 按照既定顺序依次触发事件
   */
  Start: function () {
    ServerEvents.lowPriorityData(event => {
      // 更新加载阶段
      Main.static.LoadPhase = 'registry';
      // 触发事件总线 
      CustomEventBus.static.EVENT_BUS.post('newRegistry', new newRegistryEvent());
      // 更新加载阶段
      Main.static.LoadPhase = 'register';
      // 触发事件总线 
      CustomEventBus.static.EVENT_BUS.post('register', new RegisterEvent());
    })
  }
}
// 默默启动的主类
Main.static.Start();