/**
 * @class
 * @classdesc
 * @template T
 * @param {ResourceLocation} registryName 
 * @param {ResourceLocation} location 
 */
function ModpackResourceKey(registryName, location) {
  this.registryName = registryName;
  this.location = location;
}
ModpackResourceKey.prototype = {
  getRegistry: function() {
    return this.registryName;
  },
  getLocation: function() {
    return this.location;
  }
}