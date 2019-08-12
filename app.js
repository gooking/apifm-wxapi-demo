const WXAPI = require('apifm-wxapi')

App({
  onLaunch: function () {
    WXAPI.init('gooking') // 配置专属域名
  },
  globalData: {

  }
})