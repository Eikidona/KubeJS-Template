// priority: 1
/**
 * @class
 * @param {Array<Special.EntityType>} pEntities 
 * @param {FactionalRelation} pFactionalRelation 
 */
function Faction(pEntities, pFactionalRelation) {
  /**@type {Set<Special.EntityType>} */
  this.entities = new Set(pEntities);
  /**@type {FactionalRelation} */
  this.factionalRelation = pFactionalRelation;
}
Faction.prototype = {
  isEmpty: function () {
    return this == Faction.static.EMPTY;
  },
  /**
   * 获取派系成员实体
   * @returns {Set<Special.EntityType>}
   */
  getEntities: function () {
    return this.entities;
  },
  /**
   * 实体是派系成员
   * @param {Internal.Mob} pEntity
   * @returns {boolean}
   */
  isValidMember: function (pEntity) {
    /**@type {boolean} */
    let result;
    if (pEntity instanceof $Mob) {
      /**@type {string} */
      let entityType = String(pEntity.type);
      result = this.entities.has(entityType);
    } else {
      result = false;
    }
    return result;
  },
  /**
   * 获取派系关系
   * @returns {FactionalRelation}
   */
  getFactionalRelation: function () {
    return this.factionalRelation;
  },
  /**
   * 检查实体是否为该阵营的敌人
   * @param {Internal.Mob} pEntity 
   */
  isEnemy: function (pEntity) {
    return this.factionalRelation.isEnemy(pEntity);
  },
  /**
   * 检查实体是否为该阵营的同盟
   * @param {Internal.Mob} pEntity 
   */
  isAllies: function (pEntity) {
    return this.factionalRelation.isAllies(pEntity);
  }
}
Faction.static = {
  /**@type {Faction} */
  EMPTY: new Faction([], FactionalRelation.static.EMPTY),
  TEST_EMPTY: new ModpackLazyInitialization(() => new Faction([], FactionalRelation.static.EMPTY))
}

