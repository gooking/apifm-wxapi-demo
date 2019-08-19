const WXAPI = require('apifm-wxapi')

Page({
  data: {
    queuingTypes: undefined
  },
  onLoad: function (options) {
    WXAPI.queuingTypes().then(res => {
      if (res.code == 0) {
        this.setData({
          queuingTypes: res.data
        })
      }
    })
  },
  goRegist() {
    wx.navigateTo({
      url: '/pages/auth/index'
    })
  },
  queuingGet(e){
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      this.goRegist()
      return
    }
    const typeId = e.currentTarget.dataset.id
    WXAPI.queuingGet(loginToken.token, typeId).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '取号成功',
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
  queuingMy(){
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      this.goRegist()
      return
    }
    WXAPI.queuingMy(loginToken.token).then(res => {
      console.log(res)
      wx.showToast({
        title: '请看控制台输出',
        icon: 'success'
      })
    })
  }
})