/**
 * @class
 * @classdesc 事件基类 尽管一些参数类型标明需要$Event及其子类 但不会真的进行Instanceof判断
 */
function $Event() {
  this.canceled = false;

}
$Event.prototype = {

}