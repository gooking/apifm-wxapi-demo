const WXAPI = require('apifm-wxapi')

Page({

  data: {
    latitude: undefined,
    longitude: undefined
  },
  onLoad: function (options) {
    
  },
  onShow: function () {

  },
  queryAddress(){ // 读取当前定位坐标
    const _this = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        _this.setData(res)
        _this.mapQQAddress(res)
      }
    })
  },
  mapQQAddress(e){ // 坐标查地址
    const location = e.latitude + ',' + e.longitude
    WXAPI.mapQQAddress(location, 1).then(res => {
      console.log('地址查看：', res)
      if (res.code == 0) {
        wx.showModal({
          title: '成功',
          content: res.data.result.address,
          showCancel: false
        })
      }
    })
  },
  selAddress(){ // 选择一个地址，读取坐标后计算距离
    const _this = this
    if (!this.data.latitude || !this.data.longitude) {
      wx.showToast({
        title: '请先读取当前地址',
        icon: 'none'
      })
      return
    }
    wx.chooseLocation({
      success: (e) => {
        console.log(e)
        WXAPI.mapDistance(_this.data.latitude, _this.data.longitude, e.latitude, e.longitude).then(res => {
          console.log(res)
          if (res.code == 0) {
            wx.showModal({
              title: '成功',
              content: '距离:' + res.data + '公里',
              showCancel: false
            })
          }
        })
      }
    })
  }
})