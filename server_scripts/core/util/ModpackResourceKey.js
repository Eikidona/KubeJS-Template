/**
 * @class
 * @classdesc
 * @template T
 * @param {ResourceLocation} pRegistryName 
 * @param {ResourceLocation} pLocation 
 */
function ModpackResourceKey(pRegistryName, pLocation) {
  this.registryName = pRegistryName;
  this.resourcelocation = pLocation;
}
ModpackResourceKey.prototype = {
  registry: function() {
    return this.registryName;
  },
  location: function() {
    return this.resourcelocation;
  }
}