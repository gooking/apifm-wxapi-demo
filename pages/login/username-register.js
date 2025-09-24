const WXAPI = require('apifm-wxapi')
Page({
  data: {

  },
  onLoad(options) {

  },
  onShow() {

  },
  async register_username() {
    if (!this.data.username) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return
    }
    if (!this.data.pwd) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }
    // https://www.yuque.com/apifm/nu0f75/zz7wxy
    wx.showLoading({
      title: '',
    })
    const res = await WXAPI.register_username({
      username: this.data.username,
      pwd: this.data.pwd,
      autoLogin: true,
    })
    wx.hideLoading()
    if (res.code == 0) {
      wx.setStorageSync('loginToken', res.data)
      wx.showModal({
        content: '注册成功，已帮你自动登录',
        showCancel: false,
        success: (res) => {
          wx.navigateBack()
        }
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
  },
})