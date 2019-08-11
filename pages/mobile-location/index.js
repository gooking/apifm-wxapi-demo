const WXAPI = require('apifm-wxapi')

Page({
  data: {
    mobile: undefined,
    queryResult: undefined,
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  mobileChange(e){
    this.setData({
      mobile: e.detail.value,
      queryResult: null
    })
  },
  query() { // 查询
    if (!this.data.mobile){
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
      return
    }
    WXAPI.queryMobileLocation(this.data.mobile).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '查询成功',
          icon: 'success'
        })
        this.setData({
          queryResult: res.data
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