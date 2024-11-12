// priority: 10000
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
      /**
       * 新建注册表 事件结束后从事件内获取builder来构建注册表
       */
      // let newRegistryEvent = new NewRegistryEvent(); 
      packEventBus.static.EVENT_BUS.post('newRegistry', new NewRegistryEvent());
      // PackRegistryBuilder.static.build(newRegistryEvent.registryBuilder.get());
      
      // 更新加载阶段
      Main.static.LoadPhase = 'register';
      // 触发事件总线 
      packEventBus.static.EVENT_BUS.post('register', new RegisterEvent());
    })
  }
}
// 默默启动的主类
Main.static.Start();