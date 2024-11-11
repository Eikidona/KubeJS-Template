/**
 * @class
 */
function FactionManager() {
  /**@type {Map<String, Faction>} */
  this.byLocation = new Map();
  /**@type {Map<Faction, String>} */
  this.byFaction = new Map();
  /**@type {Map<Special.EntityType, Faction>} */
  this.byEntity = new Map();
}
/**实例 */
FactionManager.prototype = {
  /**
   * 注册一个Faction到FactionManager
   * @param {String} pId 
   * @param {Faction} pFaction 
   * @returns {ModpackRegistryObject<Faction>}
   */
  register: function (pId, pFaction) {
    let location = Modpack.static.createLocation(pId).toString();
    if (!(this.byLocation.has(location))) {
      this.byLocation.set(location, pFaction);
      this.byFaction.set(pFaction, location);
      pFaction.getEntities().forEach((pEntityType) => {
        if (!(this.byEntity.has(pEntityType))) {
          this.byEntity.set(pEntityType, pFaction)
        } else {
          console.warn(`${pEntityType}已经存在于阵营${this.getKey(this.byEntity.get(pEntityType))} 不再加入阵营${location}中`);
        }
      })
    }
    return new ModpackRegistryObject(location, pFaction);
  },
  /**
   * 根据Faction对象返回Faction Key
   * @param {Faction} pFaction 
   */
  getKey: function (pFaction) {
    return this.byFaction.get(pFaction);
  },
  /**
   * 根据id获取Faction对象
   * @param {String} pId 
   */
  getFaction: function (pId) {
    let location = Modpack.static.createLocation(pId).toString();
    return this.byLocation.get(location);
  },
  /**
   * 获取实体所在阵营 如果实体不存在于任何阵营则为EMPTY Faction
   * @param {Internal.Mob} pEntity 
   * @returns {Faction}
   */
  getEntityFaction: function (pEntity) {
    if (!(pEntity instanceof $Mob)) throw new Error('实体类型必须为Mob及其子类');
    /**@type {string} */
    let entityType = String(pEntity.type)
    /**@type {Faction} */
    let faction = this.byEntity.get(entityType);

    // if (typeof pEntity !== 'string') {
    //   entityType = pEntity.type;
    // }

    // if (faction == undefined) {
    //   faction = FactionManager.static.DEFAULT_VALUE
    // }
    return faction == undefined ? FactionManager.static.DEFAULT_VALUE : faction;
  },
  /**
   * 获取实体所在阵营Key 如果实体不存在于任何阵营则为EMPTY Faction key
   * @param {Internal.Mob} pEntity 
   * @returns {String}
   */
  getEntityFactionKey: function (pEntity) {
    if (!(pEntity instanceof $Mob)) throw new Error('实体类型必须为Mob及其子类');
    /**@type {string} */
    let entityType = String(pEntity.type)
    // if (typeof pEntity !== 'string') {
    //   entityType = pEntity.type;
    // }
    /**@type {Faction} */
    let faction = this.byEntity.get(entityType);
    // /**@type {String} */
    // let key;
    // if (faction == undefined) {
    //   key = FactionManager.static.DEFAULT_KEY
    // }
    return faction == undefined ? FactionManager.static.DEFAULT_KEY : this.byFaction.get(faction);
  },
  /**
   * 判断两个实体是不是敌人
   * @param {Internal.Mob} pSourceEntity 
   * @param {Internal.Mob} pTargetEntity 
   */
  isEnemy: function (pSourceEntity, pTargetEntity) {
    /**@type {boolean} */
    let result;
    if (!(pSourceEntity instanceof $Mob) || !(pTargetEntity instanceof $Mob)) {
      result = false;
    } else {
      // let sourceFaction = FactionManager.static.INSTANCE.getEntityFaction(pSourceEntity);
      // let targetFaction = FactionManager.static.INSTANCE.getEntityFaction(pTargetEntity);
      /**@type {Faction} */
      let sourceFaction = this.byEntity.get(String(pSourceEntity.type));
      /**@type {Faction} */
      let targetFaction = this.byEntity.get(String(pTargetEntity.type));

      if ((sourceFaction == undefined) || (targetFaction == undefined)) {
        result = false;
      } else {
        result = sourceFaction.isEnemy(pTargetEntity)
      }
    }

    return result;
  },
  /**
   * 判断两个实体是不是同盟
   * @param {Internal.Mob} pSourceEntity 
   * @param {Internal.Mob} pTargetEntity 
   */
  isAllies: function (pSourceEntity, pTargetEntity) {
    // let result;
    // let sourceFaction = FactionManager.static.INSTANCE.getEntityFaction(pSourceEntity);
    // let targetFaction = FactionManager.static.INSTANCE.getEntityFaction(pTargetEntity);
    // if (sourceFaction.isEmpty() || targetFaction.isEmpty()) {
    //   result = false;
    // } else {
    //   result = sourceFaction.isAllies(pTargetEntity.type);
    // }
    // return result;
    /**@type {boolean} */
    let result;
    if (!(pSourceEntity instanceof $Mob) || !(pTargetEntity instanceof $Mob)) {
      result = false;
    } else {
      // let sourceFaction = FactionManager.static.INSTANCE.getEntityFaction(pSourceEntity);
      // let targetFaction = FactionManager.static.INSTANCE.getEntityFaction(pTargetEntity);
      /**@type {Faction} */
      let sourceFaction = this.byEntity.get(String(pSourceEntity.type));
      /**@type {Faction} */
      let targetFaction = this.byEntity.get(String(pTargetEntity.type));

      if ((sourceFaction == undefined) || (targetFaction == undefined)) {
        result = false;
      } else {
        result = sourceFaction.isAllies(pTargetEntity)
      }
    }

    return result;
  },
  /**
   * 向实体添加数据
   * @param {Internal.Mob} pEntity 
   * @returns {string} 添加的数据 string
   */
  addEntityData: function (pEntity) {
    /**@type {string} */
    let factionKey;

    // 处理将要附加的数据
    factionKey = this.byEntity.get(String(pEntity.type));
    if (!(Boolean(factionKey))) {
      factionKey = FactionManager.static.DEFAULT_KEY;
    }

    // 为实体添加数据
    pEntity.getPersistentData().put('Faction', $StringTag.valueOf(factionKey));


    return factionKey;
  },
  /**
   * 从实体数据获取阵营
   * @param {Internal.Mob} pEntity 
   * @returns {Faction} 
   */
  getFactionForEntityData: function (pEntity) {
    /**@type {Faction} */
    let faction;

    let data = pEntity.getPersistentData().getString('Faction');
    if (!(Boolean(data))) {
      faction = FactionManager.static.DEFAULT_VALUE
    } else {
      faction = this.byEntity.get(String(pEntity.type))
    }

    return faction;
  }
}
/**静态 */
FactionManager.static = {
  /**@type {FactionManager} 单例模式 管理器唯一实例*/
  INSTANCE: new FactionManager(),
  /**@type {string} 默认Key 用于查询为空时 */
  DEFAULT_KEY: Modpack.static.createLocation('empty').toString(),
  /**@type {Faction} 默认Faction 用于查询为空时 */
  DEFAULT_VALUE: Faction.static.EMPTY
}
