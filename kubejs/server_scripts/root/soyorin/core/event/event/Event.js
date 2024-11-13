/**
 * @class
 * @classdesc 事件基类 尽管一些参数类型标明需要$Event及其子类 但不会真的进行Instanceof判断(过时消息)
 * @description 最新消息 已经转向支持继承的方向修改 它可能需要一个较高的优先级以在继承发生时已经初始化
 */
function $Event() {
  /**
   * @type {boolean} 可取消的 
   */
  this.cancelable = false;
  /**
   * @type {boolean} 已取消
   */
  this.canceled = false;
}

/**
 * 尝试取消事件 如果事件是Cancelable的 就会取消成功
 * @returns {boolean} 已经取消?
 */
$Event.prototype.cancel = function () {
  if (this.cancelable) {
    this.canceled = true;
  }
}