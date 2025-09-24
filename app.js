const WXAPI = require('apifm-wxapi')

App({
  onLaunch: function () {
    // https://www.yuque.com/apifm/nu0f75/es1xel
    WXAPI.init('gooking') // 配置专属域名
    // https://www.yuque.com/apifm/nu0f75/by94a0
    WXAPI.setMerchantId(2) // 配置商户ID
  },
  globalData: {

  }
})