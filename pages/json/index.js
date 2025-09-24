const WXAPI = require('apifm-wxapi')

Page({
  data: {
    autosize: {
      minHeight: 100
    },
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
    // https://www.yuque.com/apifm/nu0f75/nhvz4t
    WXAPI.jsonListV3({
      token: loginToken.token,
      type: 'apifm-wxapi-test'
    }).then(res => {
      console.log(res)
      if (res.code == 0) {
        this.setData({
          jsonList: res.data.result
        })
      } else {
        this.setData({
          jsonList: null
        })
      }
    })
  },
  async jsonSetV2() {
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      this.goRegist()
      return
    }
    if (!this.data.content) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
      return
    }
    // https://www.yuque.com/apifm/nu0f75/opaysd
    const content = {
      msg: this.data.content
    }
    wx.showLoading({
      title: '',
    })
    const res = await WXAPI.jsonSetV2({
      type: 'apifm-wxapi-test',
      token: loginToken.token,
      content: JSON.stringify(content)
    })
    wx.hideLoading()
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
  },
  async jsonDeleteV2(e){
    const loginToken = wx.getStorageSync('loginToken')
    const id = e.currentTarget.dataset.id
    // https://www.yuque.com/apifm/nu0f75/dnqebx
    wx.showLoading({
      title: '',
    })
    const res = await WXAPI.jsonDeleteV2({
      token: loginToken.token,
      id
    })
    wx.hideLoading()
    if (res.code == 0) {
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      })
      this.jsonList()
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
  }
})