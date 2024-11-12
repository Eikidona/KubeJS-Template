// priority: 2000

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
      listener.onEvent()
    });

  },
  /**
   * 添加事件监听器
   * @overload
   * @param {string} eventName
   * @param {$EventHandler} eventCallback 
   * @returns {void} 
   */
  /**
   * 添加事件监听器
   * @overload
   * @param {string} eventName
   * @param {$EventHandler} eventCallback 
   * @param {$Priority} priority 
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
  EVENT_BUS: new $EventBus()
}