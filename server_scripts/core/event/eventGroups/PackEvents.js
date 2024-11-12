/**
 * @description 对于外部来说这是直接使用的 
 */
const PackEvents = {
  /**
   * 新建注册表事件 接受一个newRegistry对象的回调
   * @param {(event: (NewRegistryEvent)) => void} eventConsumer 
   * @returns 
   */
  newRegistry: function (eventConsumer) {
    // 将回调添加到对应事件监听
    packEventBus.static.EVENT_BUS.addListener('newRegistry', eventConsumer);
  }
}