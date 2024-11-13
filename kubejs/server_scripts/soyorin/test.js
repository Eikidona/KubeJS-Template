$EventBus.static.EVENT_BUS.addListener('init', callback => {
  console.log('测试 无优先级传递');
})

$EventBus.static.EVENT_BUS.addListener('init', callback => {
  console.log('测试 低优先级传递');
}, -10)

$EventBus.static.EVENT_BUS.addListener('init', callback => {
  console.log('测试 高优先级传递');
}, 10)

$EventBus.static.EVENT_BUS.addListener(
  'newRegistry',
  /**
   * @param {$NewRegistryEvent} newRegistryEvent 
   */
  (newRegistryEvent) => {
    newRegistryEvent.create().setRegistryName('modpack:empty').setDefaultKey('modpack:empty').setDefaultValue(() => 'testString');
  }
)
// 新建了注册表
$ModpackEvents.newRegistry(event => {
  event.create().setRegistryName('modpack:test').setDefaultKey('modpack:default').setDefaultValue(() => 666);
})

PlayerEvents.chat(event => {
  let registry = $Registry.static.getRegistry(new ResourceLocation('modpack:test')); 
  registry.ifPresentOrElse(
    r => {
      event.player.tell(`注册表有效`);
      event.player.tell(`类型判断 ${r instanceof $Registry} ${r.get(new ResourceLocation('modpack:default')).get()}`);
    },
    () => {
      event.player.tell(`注册表无效`)
    }
  )
  // let value = registry.get().get(new ResourceLocation('modpack:empty')).get();
  
})
