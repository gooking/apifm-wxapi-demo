const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({
  data: {

  },
  onLoad: function (options) {
    // 获取分布式系统唯一ID
    WXAPI.uniqueId().then(res => {
      console.log('分布式系统唯一ID：', res.data)
    })
  }
})