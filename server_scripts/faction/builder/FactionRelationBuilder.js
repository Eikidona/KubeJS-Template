/**
 * @class
 * @classdesc 派系关系构建器
 */
function FactionalRelationBuilder() {
    /**@type {Set<ResourceLocation_>} */
    this.enemies = new Set();
    /**@type {Set<ResourceLocation_>} */
    this.allies = new Set();
}
FactionalRelationBuilder.prototype = {
  /**
   * 设置敌对派系
   * @param {ResourceLocation_[]} pFactionId 
   */
  setEnemies: function (pFactionId) {
    pFactionId.forEach(id => this.enemies.add(id));
    return this;
  },
    /**
   * 设置同盟派系
   * @param {ResourceLocation_[]} pFactionId 
   */
  setAllies: function (pFactionId) {
    pFactionId.forEach(id => this.allies.add(id));
    return this;
  }
}
FactionalRelationBuilder.static = {
  create: function () {
    return new FactionalRelationBuilder();
  }
}