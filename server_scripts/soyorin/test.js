$EventBus.static.EVENT_BUS.addListener('init', callback => {
  console.log('初始化测试 无优先级传递');
})

$EventBus.static.EVENT_BUS.addListener('init', callback => {
  console.log('初始化测试 低优先级传递');
}, -10)

$EventBus.static.EVENT_BUS.addListener('init', callback => {
  console.log('初始化测试 高优先级传递');
}, 10)