// priority: 10000

/**
 * @class
 */
function Modpack() {
  
}

Modpack.static = {
  ID: 'modpack',
  /**
   * 新建资源位置
   * @param {String} pString 
   */
  createResourceLocation: function (pString) {
    /**@type {ResourceLocation} */
    let resourceLocation;
    if (pString.includes(':')) {
      resourceLocation = new ResourceLocation(pString);
    } else {
      resourceLocation = new ResourceLocation(Modpack.static.ID, pString);
    }
    return resourceLocation;
  }
}