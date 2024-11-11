/**
 * @deprecated 这个不需要了
 * @class
 * @classdesc 事件
 * @template T
 * @param {T} pContent 
 */
function ModpackEvent(pContent) {
  this.cancellable;
  this.cancelled;
  this.result;
  this.content = pContent;
}