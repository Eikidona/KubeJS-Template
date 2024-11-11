/**
 * @class
 */
function FactionBuilder() {
  /**@type {Set<Special.EntityType|Special.EntityTypeTag>} */
  this.entities = new Set();
  this.factionalRelation;
}
FactionBuilder.prototype = {
  /**
   * 设置派系实体
   * @param {Array<Special.EntityType|Special.EntityTypeTag>} pEntities 
   */
  setEntities: function (pEntities) {
    this.entities = pEntities;
    return this;
  },
  /**
   * 设置派系的关系
   * @param {FactionalRelationBuilder} pFactionalRelation 
   */
  setFactionalRelation: function (pFactionalRelation) {
    this.factionalRelation = pFactionalRelation;
    return this;
  }
}
FactionBuilder.static = {
  create: function () {
    return new FactionBuilder();
  }
}