// priority: 3000

/**
 * @class
 * @classdesc 事件监听器
 * @param {(event: $Event) => void} onEvent 
 */
function $EventListener(onEvent, priority) {
  if (Boolean(priority)) {
    this.priority = priority;
  } else {
    this.priority = 0;
  }
  if (Boolean(onEvent)) {
    this.onEvent = onEvent;
  } else {
    this.onEvent = () => { console.warn('空事件监听器') };
  }

}
$EventListener.prototype = {
  /**
   * 事件时执行
   * @param {$Event} event 
   */
  onEvent: function (event) {
    
    this.onEvent(event);
  }
}