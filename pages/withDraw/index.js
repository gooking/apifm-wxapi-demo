const WXAPI = require('apifm-wxapi')

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
  withDrawLogs() {
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.withDrawLogs({
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
  withDrawApply() {
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.withDrawApply(loginToken.token, 100).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '申请成功',
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
  withDrawDetail() {
    const withDrawId = 1941 // 记录中的记录ID
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.withDrawDetail(loginToken.token, withDrawId).then(res => {
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