const WXAPI = require('apifm-wxapi')

Page({
  data: {
    addressList: undefined
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
    WXAPI.queryAddress(loginToken.token).then(res => {
      console.log(res)
      if(res.code == 0){
        this.setData({
          addressList: res.data
        })
      }
    })
  },
  goRegist() {
    wx.navigateTo({
      url: '/pages/auth/index'
    })
  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/shipping-address/add'
    })
  },
  addressDetail(e){
    const id = e.currentTarget.dataset.id
    const loginToken = wx.getStorageSync('loginToken')
    WXAPI.addressDetail(loginToken.token, id).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '查看控制台',
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
  deleteAddress(e){
    const id = e.currentTarget.dataset.id
    const loginToken = wx.getStorageSync('loginToken')
    WXAPI.deleteAddress(loginToken.token, id).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
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
  defaultAddress(){
    const loginToken = wx.getStorageSync('loginToken')
    WXAPI.defaultAddress(loginToken.token).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '查看控制台',
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
  updateAddress(e){
    const id = e.currentTarget.dataset.id
    wx.showToast({
      title: '交给你啦~',
      icon: 'none'
    })
  },
})