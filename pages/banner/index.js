const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({

  data: {

  },
  onLoad: function (options) {
    WXAPI.banners().then(res => {
      if (res.code == 0) {
        this.setData({
          banners: res.data
        })
      }
    })
  }
})