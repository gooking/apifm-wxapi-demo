const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  cmsTags() { // 读取所有的标签列表
    WXAPI.cmsTags().then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '读取成功',
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  }
})