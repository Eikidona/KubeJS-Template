/**
 * @description 对于外部来说这是直接使用的 加载优先级较核心模块低 为了使核心模块充分加载 传递的参数基本都是基本类型 无法为必要类型是则是Supplier<T>以延后初始化
 */
const MyEvents = {
  /**
   * 新建注册表事件
   * @param {(event: (newRegistryEvent)) => void} eventConsumer 
   * @returns 
   */
  newRegistry: function (eventConsumer) {
    CustomEventBus.static.EVENT_BUS.addListener('newRegistry', eventConsumer);
  }
}