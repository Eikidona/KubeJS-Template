// priority: 3000

/**
 * @class
 * @classdesc 事件监听器
 * @param {(event: $Event) => void} callback 
 */
function $EventListener(callback, priority) {
  if (Boolean(priority)) {
    this.priority = priority;
  } else {
    this.priority = 0;
  }
  this.onEvent = callback;
}
$EventListener.prototype = {
  /**
   * 触发事件
   * @param {$Event} event 
   */
  onEvent: function (event){
    this.onEvent(event);
  }
}