const WXAPI = require('apifm-wxapi')

Page({
  data: {
    barcode: undefined,
    queryResult: undefined,
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  barcodeChange(e){
    this.setData({
      barcode: e.detail.value,
      queryResult: null
    })
  },
  scan(){ // 扫码识别
    const _this = this
    wx.scanCode({
      success(res) {
        console.log(res)
        _this.setData({
          barcode: res.result,
          queryResult: null
        })
        _this.queryBarcode()
      }
    })
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