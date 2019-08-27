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
  bindSave(e) {
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      this.goRegist()
      return
    }
    const number = e.detail.value.number;
    const pwd = e.detail.value.pwd;
    if (!number || !pwd) {
      wx.showToast({
        title: '信息未填写',
        icon: 'none'
      })
      return
    }
    WXAPI.exchangeCoupons(loginToken.token, number, pwd).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '兑换成功',
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