// priority: 2
/**
 * @class
 * @param {Array<String>} pEnemies 
 * @param {Array<String>} pAllies 
 */
function FactionalRelation(pEnemies, pAllies) {
  this.enemies;
  this.allies;
  if (pEnemies instanceof Array) {
    this.enemies = new Set(pEnemies);
  } else {
    this.enemies = new Set();
  }
  if (pAllies instanceof Array) {
    this.allies = new Set(pAllies);
  } else {
    this.allies = new Set();
  }
}
FactionalRelation.prototype = {
  /**
   * 是否为敌人
   * @param {Internal.Mob} pEntity 
   */
  isEnemy: function (pEntity) {
    /**@type {boolean} */
    let result = false;
    if (pEntity instanceof $Mob) {
      /**@type {string} */
      let key = FactionManager.static.INSTANCE.getEntityFactionKey(pEntity);
      if (this.enemies.has(key)) {
        result = true;
      }
    }
    return result;
  },
  /**
   * 是否为同盟
   * @param {Internal.Mob} pEntity 
   */
  isAllies: function (pEntity) {
    /**@type {boolean} */
    let result = false;
    if (pEntity instanceof $Mob) {
      /**@type {string} */
      let key = FactionManager.static.INSTANCE.getEntityFactionKey(pEntity);
      if (this.allies.has(key)) {
        result = true;
      }
    }
    return result;
  }
}
FactionalRelation.static = {
  EMPTY: new FactionalRelation()
}

/**
 * @template T
 * @template R
 * @typedef {(T) => R} Supplier
 */