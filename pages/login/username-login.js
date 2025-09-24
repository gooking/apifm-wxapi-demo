const WXAPI = require('apifm-wxapi')
Page({
  data: {

  },
  onLoad(options) {

  },
  onShow() {

  },
  async login_username() {
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
    // https://www.yuque.com/apifm/nu0f75/cp5s6s
    wx.showLoading({
      title: '',
    })
    const res = await WXAPI.login_username({
      deviceId: 'apifm-wxapi-demo',
      deviceName: 'apifm-wxapi-demo',
      username: this.data.username,
      pwd: this.data.pwd
    })
    wx.hideLoading()
    if (res.code == 0) {
      wx.setStorageSync('loginToken', res.data)
      wx.showModal({
        content: '登陆成功',
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