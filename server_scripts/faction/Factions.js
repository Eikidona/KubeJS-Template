/**
 * @class
 * @classdesc
 */
function Factions() { }

Factions.static = {
  UNDEAD: FactionManager.static.INSTANCE.register('undead', new Faction(['minecraft:zombie', 'minecraft:husk'], new FactionalRelation(['village'], [])))
}


// let tagKey = $TagKey.create($Registries.ENTITY_TYPE, new ResourceLocation('skeletons'));
/**@type {Internal.Entity} */
let entity;




