const WXAPI = require('apifm-wxapi')

Page({
  data: {

  },
  onLoad: function (options) {
    // 获取友情链接/合作伙伴
    WXAPI.friendlyPartnerList().then(res => {
      console.log('友情链接/合作伙伴：', res)
    })
  }
})