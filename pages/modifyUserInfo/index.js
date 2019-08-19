const WXAPI = require('apifm-wxapi')

Page({
  data: {
    userInfo: undefined
  },
  onLoad: function (options) {

  },
  onShow: function () {
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      this.goRegist()
      return
    }
    WXAPI.userDetail(loginToken.token).then(res => {
      console.log(res)
      if(res.code == 0){
        this.setData({
          userInfo: res.data
        })
      }
    })
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
    const province = e.detail.value.province;
    const city = e.detail.value.city;
    const nick = e.detail.value.nick;

    const extJsonStr = {}
    extJsonStr['学校'] = e.detail.value.school
    extJsonStr['年龄'] = e.detail.value.age
    extJsonStr['微信号'] = e.detail.value.wx

    WXAPI.modifyUserInfo({
      token: loginToken.token,
      province,
      city,
      nick,
      extJsonStr: JSON.stringify(extJsonStr)
    }).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '修改成功',
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