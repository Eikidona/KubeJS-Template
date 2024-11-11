ModpackEvents.createRegistry(event => {
  event.create(registry => registry.setDefaultKey(() => 'empty').setRegistryName('test').setDefaultValue())
})