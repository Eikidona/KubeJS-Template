// priority: 2000

/**
 * @typedef {Object} $EventSubscriber 事件订阅者 
 * @property {function(): void} init 
 */

/**
 * @typedef {(event: $Event) => void} $EventHandler 事件回调
 */

/**
 * @typedef {number} $Priority - 优先级 默认为0
 */

/**
 * @class
 * @classdesc 拟事件总线 事件系统是一种不同模块间的通信手段...
 */
function $EventBus() {
  /**
   * @type {Map<string, $EventListener[]>} - 事件回调
  */
  this.listeners = new Map();
}
/**
 * 原型
 */
$EventBus.prototype = {
  /**
   * 发布事件
   * @param {string} eventName 
   * @param {$Event} event 
   */
  post: function (eventName, event) {
    if (!(this.listeners.has(eventName))) return;
    this.listeners.get(eventName).forEach(listener => {
      // 调用
      listener.onEvent(event)
    });

  },
  /**
   * 添加事件监听器
   * @overload
   * @param {string} eventName - 事件id
   * @param {(event: $Event) => void} eventCallback - 事件回调
   * @returns {void} 
   */
  /**
   * 添加事件监听器 
   * @overload
   * @param {string} eventName - 事件id
   * @param {(event: $Event) => void} eventCallback - 事件回调
   * @param {$Priority} priority - 优先级 可选的
   * @returns {void}
   */
  addListener: function (eventName, eventCallback, priority) {
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).push(new $EventListener(eventCallback, priority));
    } else {
      this.listeners.set(eventName, []);
      this.listeners.get(eventName).push(new $EventListener(eventCallback, priority));
    }
    // 优先级排序 同优先级则不变 触发时的顺序会体现添加顺序
    this.listeners.get(eventName).sort((a, b) => b.priority - a.priority);
  }
}
/**
 * 静态
 */
$EventBus.static = {
  EVENT_BUS: new $EventBus(),
  /**
   * 添加订阅者 尽可能早的将订阅添加到事件总线 以防止事件发布时还未订阅的情况发生 还在设想实验中
   * @param {$EventSubscriber} subscriber 
   */
  addSubscriber: function (subscriber) {
    // if (!Boolean(subscriber)) { // 添加的对象如果没有subscriber属性则退出并抛出错误
    //   console.error('无效的订阅!添加的Subscriber对象没有subscriber属性');
    // } else {
    //   for (const key in subscriber.subscriber) {
    //     if (Object.prototype.hasOwnProperty(key)) {
    //       let element = object[key];
    //       element

    //     }
    //   }
    // }
  },
  /**
   * 添加事件发布者 代替手动发布事件 将发布事件延后到init及其以后 防止过早的发布错过订阅 还在设想实验中
   * @param {$EventPublisher} publisher 
   */
  addEventPublisher: function (publisher) {
    
  }
}