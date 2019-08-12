const WXAPI = require('apifm-wxapi')

Page({
  data: {

  },
  onLoad: function (options) {

  },
  uniqueId(){
    WXAPI.uniqueId().then(res => {
      if (res.code == 0) {
        wx.showModal({
          title: '成功',
          content: 'ID:' + res.data,
          showCancel: false
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  goQueryBarcode(){
    wx.navigateTo({
      url: '/pages/barcode/index'
    })
  },
  goShortUrl(){
    wx.navigateTo({
      url: '/pages/short-url/index'
    })
  }
})