const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({
  data: {
    barcode: undefined
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  barcodeChange(e){
    this.data.barcode = e.detail.value
  },
  queryBarcode() { // 查询条码
    if (!this.data.barcode){
      wx.showToast({
        title: '条码不能为空',
        icon: 'none'
      })
      return
    }
    WXAPI.queryBarcode(this.data.barcode).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '查询成功',
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