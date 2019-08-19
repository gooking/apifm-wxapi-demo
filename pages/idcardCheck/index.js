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
    const name = e.detail.value.name;
    const idCardNo = e.detail.value.idCardNo;
    if (!name || !idCardNo) {
      wx.showToast({
        title: '信息未填写',
        icon: 'none'
      })
      return
    }
    WXAPI.idcardCheck(loginToken.token, name, idCardNo).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '认证通过',
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