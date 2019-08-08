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
  invoiceList() {
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.invoiceList({
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
  invoiceApply() {
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.invoiceApply({
      token: loginToken.token,
      comName: '公司抬头',
      tfn: '税号',
      amount: 100, // 开票金额
      consumption: '服务费',
      remark: '测试'
    }).then(res => {
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
  invoiceDetail() {
    const invoiceId = 22 // 记录中的记录ID
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.invoiceDetail(loginToken.token, invoiceId).then(res => {
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