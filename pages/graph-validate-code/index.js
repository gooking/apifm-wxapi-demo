const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({
  data: {
    key: Math.random(),
    picurl: undefined,
    code: undefined
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
  codeChange(e){
    this.setData({
      code: e.detail.value
    })
  },
  check() {
    if (!this.data.code){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return
    }
    WXAPI.graphValidateCodeCheck(this.data.key, this.data.code).then(res => {
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
        this.changePic()
      }
    })
  }
})