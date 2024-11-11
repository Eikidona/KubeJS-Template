/**
 * @deprecated 这个不需要了
 */
function ModpackEventBus() {
  /**@type {Map<string, () => ModpackEvent<T>} */
  this.events = new Map()
  /**@type {Map<string, (event: ModpackEvent<T>) => void} */
  this.listeners = new Map();
}
ModpackEventBus.prototype = {
  onEvent: function () {
    
  }
}
ModpackEventBus.static = {
  INSTANCE: new ModpackEventBus(),
  /**
   * 
   * @param {ModpackEventBus<T>} pModpackEvent 
   */
  post: function (pModpackEvent) {
    
  }
}
