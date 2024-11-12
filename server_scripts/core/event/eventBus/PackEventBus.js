/**
 * @class
 * @classdesc - 拟事件总线 保存了eventId: eventConsumer<Event>
 */
function packEventBus() {
  /**
   * @type {Map<string, Array<(T) => void>} 事件id与事件执行
   */
  this.listeners = new Map();
}
packEventBus.prototype = {
  /**
   * 发布事件 这里的事件名称应该与事件组的函数名相同 触发指定事件名上的所有Consumer<T> 一般不直接使用 等待封装
   * @param {string} eventName
   * @param {T} event 
   */
  post: function (eventName, event) {
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).forEach(eventConsumer => eventConsumer(event))
    }
  },
  /**
   * 为对应事件添加监听者 一般不直接使用 等待封装
   * @param {string} eventName 
   * @param {(T) => void} eventConsumer 
   */
  addListener: function (eventName, eventConsumer) {
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).push(eventConsumer);
    } else {
      this.listeners.set(eventName, []);
      this.listeners.get(eventName).push(eventConsumer);
    }
  }
}
packEventBus.static = {
  EVENT_BUS: new packEventBus
}