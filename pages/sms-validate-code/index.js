const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({
  data: {
    key: Math.random(),
    picurl: undefined,
    mobile: undefined,
    piccode: undefined,
    code: undefined,
    smsCodeSend: false, // 短讯是否已发送
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.changePic()
  },
  changePic(){
    const _key = Math.random()
    this.setData({
      code: null,
      key: _key,
      picurl: WXAPI.graphValidateCodeUrl(_key)
    })
  },
  piccodeChange(e){
    this.setData({
      piccode: e.detail.value
    })
  },
  codeChange(e){
    this.setData({
      code: e.detail.value
    })
  },
  mobileChange(e){
    this.setData({
      mobile: e.detail.value
    })
  },
  get() {
    if (!this.data.mobile){
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
      return
    }
    if (!this.data.piccode){
      wx.showToast({
        title: '图形验证码不能为空',
        icon: 'none'
      })
      return
    }
    WXAPI.smsValidateCode(this.data.mobile, this.data.key, this.data.piccode).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '短信已发送',
          icon: 'success'
        })
        this.setData({
          smsCodeSend: true
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        this.changePic()
      }
    })
  },
  check() {
    if (!this.data.mobile){
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
      return
    }
    if (!this.data.code){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return
    }
    WXAPI.smsValidateCodeCheck(this.data.mobile, this.data.code).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '输入正确',
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