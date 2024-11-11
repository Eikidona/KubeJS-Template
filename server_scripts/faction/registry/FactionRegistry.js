ModpackEvents.newRegistry(event => {
  event.create(registry => registry
    .setDefaultKey(() => 'empty')
    .setRegistryName('test')
    .setDefaultValue(() => "测试"))
})
ModpackEvents.register('test', () => "第二个测试");