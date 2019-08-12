const WXAPI = require('apifm-wxapi')

Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  getContent(e) { // 读取单页信息
    const key = e.currentTarget.dataset.key
    WXAPI.cmsPage(key).then(res => {
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