const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  goRegist() {
    wx.navigateTo({
      url: '/pages/auth/index'
    })
  },
  userAmount() {
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.userAmount(loginToken.token).then(res => {
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
  },
  cashLogs() {
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.cashLogs({
      token: loginToken.token
    }).then(res => {
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
  },
})