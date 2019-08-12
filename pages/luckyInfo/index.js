const WXAPI = require('apifm-wxapi')

const luckyInfoId = 165 // 后台抽奖设置里面的项目ID

Page({
  data: {
    
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  goRegist(){
    wx.navigateTo({
      url: '/pages/auth/index'
    })
  },
  luckyInfo(){
    WXAPI.luckyInfo(luckyInfoId).then(res => {
      console.log(res)
      if (res.code == 700) {
        wx.showToast({
          title: '抽奖项目ID错误',
          icon: 'none'
        })
      } else if (res.code == 0) {
        wx.showToast({
          title: '读取成功',
          icon: 'success'
        })
      }
    })
  },
  luckyInfoJoinMy(){
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.luckyInfoJoinMy(luckyInfoId, loginToken.token).then(res => {
      console.log(res)
      if (res.code == 700) {
        wx.showToast({
          title: '你还未参与',
          icon: 'none'
        })
      } else if (res.code == 0) {
        wx.showToast({
          title: '读取成功',
          icon: 'success'
        })
      }
    })
  },
  luckyInfoJoin(){
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.luckyInfoJoin(luckyInfoId, loginToken.token).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '参与成功',
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
  luckyInfoJoinLogs(){
    WXAPI.luckyInfoJoinLogs({
      lid: luckyInfoId
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
  }
})