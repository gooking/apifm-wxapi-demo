const WXAPI = require('apifm-wxapi')

Page({
  data: {
    url: undefined,
    queryResult: undefined,
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  urlChange(e){
    this.setData({
      url: e.detail.value,
      queryResult: null
    })
  },
  shortUrl() {
    if (!this.data.url){
      wx.showToast({
        title: '条码不能为空',
        icon: 'none'
      })
      return
    }
    WXAPI.shortUrl(this.data.url).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '转换成功',
          icon: 'success'
        })
        this.setData({
          queryResult: res.data
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  copyUrl(){
    wx.setClipboardData({
      data: this.data.queryResult,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success'
            })
          }
        })
      }
    })
  }
})