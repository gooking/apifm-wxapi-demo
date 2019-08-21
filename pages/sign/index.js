const WXAPI = require('apifm-wxapi')

Page({
  data: {
    scoreSignRules: undefined, // 签到赠送积分规则
    scoreSignLogs: undefined, // 签到记录
    todaySigned: true, // 今天是否已签到
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.scoreSignRules()
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      this.goRegist()
      return
    }
    this.scoreTodaySignedInfo()
    this.scoreSignLogs()
  },
  goRegist() {
    wx.navigateTo({
      url: '/pages/auth/index'
    })
  },
  scoreSignRules(){ // 读取签到赠送积分规则
    WXAPI.scoreSignRules().then(res => {
      if (res.code == 0) {
        this.setData({
          scoreSignRules: res.data
        })
      }
    })
  },
  scoreSignLogs(){ // 读取签到记录
    const loginToken = wx.getStorageSync('loginToken')
    WXAPI.scoreSignLogs({
      token: loginToken.token
    }).then(res => {
      if (res.code == 0) {
        this.setData({
          scoreSignLogs: res.data.result
        })
      }
    })
  },
  scoreTodaySignedInfo(){ // 判断今日是否已签到
    const loginToken = wx.getStorageSync('loginToken')
    WXAPI.scoreTodaySignedInfo(loginToken.token).then(res => {
      if (res.code == 700) {
        this.setData({
          todaySigned: false
        })
      }
    })
  },
  scoreSign(){ // 签到
    const loginToken = wx.getStorageSync('loginToken')
    WXAPI.scoreSign(loginToken.token).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: '签到成功',
          icon: 'success'
        })
        this.setData({
          todaySigned: true
        })
        this.onShow()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
})