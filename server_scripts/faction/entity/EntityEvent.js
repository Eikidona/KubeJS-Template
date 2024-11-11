EntityEvents.spawned(event => {
  /**@type {Internal.Mob} */
  let mob = event.entity;
  if (!(mob instanceof $Mob)) return;

  // mob.persistentData.putString('Faction', FactionManager.static.INSTANCE.getEntityFactionKey(mob));
  FactionManager.static.INSTANCE.addEntityData(mob);
  let isEnemyPredicate = (soureceEntity, targetEntity) => FactionManager.static.INSTANCE.isEnemy(soureceEntity, targetEntity);

  mob.targetSelector.addGoal(1000, new $NearestAttackableTargetGoal(mob, $Mob, true,
    (target) => isEnemyPredicate(mob, target)));
})

ItemEvents.entityInteracted(event => {
  /**@type {Internal.Mob} */
  let mob = event.target;
  let player = event.entity;

  if (!(mob instanceof $Mob) || event.hand != 'main_hand') return;
  /**@type {string} */
  let factionkey = FactionManager.static.INSTANCE.getEntityFactionKey(mob);
  player.tell(`阵营 ${factionkey}`);
  // let resourceKey = new $ResourceKey($BuiltInRegistries.ROOT_REGISTRY_NAME, new $ResourceLocation("entity_type"));
  let registryLocation = new ResourceLocation('entity_type');
  let tagLocation = new ResourceLocation('skeletons');
  let resourceKey = $ResourceKey.createRegistryKey(registryLocation);
  let tagKey = $TagKey.create(resourceKey, tagLocation)
  let registry = player.getServer().registryAccess().registry(resourceKey).get();

  let tag = registry.getTag(tagKey).get();

  let tags = tag.stream().map(s => s.unwrap().map(k => k.location().toString(), String))

  $ForgeRegistries.ENTITY_TYPES.tags().getTag(tagKey).forEach(
    /**@type {Internal.EntityType} */
    entity => {
      console.log($EntityType.getKey(entity).toString())
    })

  player.tell(`Registry ${Boolean(registry)} Tag ${tags} }`)

  // let key = FactionManager.static.INSTANCE.getEntityFactionKey(mob);
  // event.entity.tell(`生物 ${mob.type} 相等 ${mob.type == Array.from(Factions.static.UNDEAD.getValue().getEntities())[0]} 包含 ${Factions.static.UNDEAD.getValue().getEntities().has(mob.type)}`);
  // event.entity.tell(`阵营Key ${FactionManager.static.INSTANCE.getEntityFactionKey(mob)}`);
  // event.entity.tell(`阵营UNDEAD ${Factions.static.UNDEAD.getValue().getEntities().has(mob.type)}`);
  // event.entity.tell(`阵营UNDEAD ${Array.from(Factions.static.UNDEAD.getValue().getEntities())}`);

})


// PlayerEvents.chat(e => {
//   let string = String(new ResourceLocation('modpack:path'))
//   console.log(typeof string)
// })

// ServerEvents.highPriorityData(e => console.log('high事件'))
