const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({
  data: {
    inputvalue: undefined,
    jsonList: undefined,
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.jsonList()
  },
  goRegist() {
    wx.navigateTo({
      url: '/pages/auth/index'
    })
  },
  inputChange(e) {
    this.data.inputvalue = e.detail.value
  },
  jsonList(){
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      this.goRegist()
      return
    }
    WXAPI.jsonList({
      token: loginToken.token,
      type: 'apifm-wxapi-test'
    }).then(res => {
      console.log(res)
      if (res.code == 0) {
        this.setData({
          jsonList: res.data
        })
      } else {
        this.setData({
          jsonList: null
        })
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  jsonSet() {
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      this.goRegist()
      return
    }
    if (!this.data.inputvalue) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
      return
    }
    WXAPI.jsonSet({
      type: 'apifm-wxapi-test',
      token: loginToken.token,
      content: '{"msg": "' + this.data.inputvalue +'"}'
    }).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
        this.setData({
          inputvalue: null
        })
        this.jsonList()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  jsonDelete(e){
    const loginToken = wx.getStorageSync('loginToken')
    const id = e.currentTarget.dataset.id
    WXAPI.jsonDelete(loginToken.token, id).then(res => {
      console.log(res)
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      })
      this.jsonList()
    })
  }
})