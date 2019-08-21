const WXAPI = require('apifm-wxapi')

Page({

  data: {
    provinces: undefined,// 省份数据数组
    pIndex: 0,//选择的省下标
    cities: undefined,// 城市数据数组
    cIndex: 0,//选择的市下标
    areas: undefined,// 区县数数组
    aIndex: 0,//选择的区下标

    btnName: '添加收货地址',
  },
  onLoad: function (options) {
    WXAPI.province().then(res => {
      if (res.code == 0) {
        this.setData({
          provinces: res.data,
        })
      }
    })
  },
  provinceChange(e) {
    const index = e.detail.value
    this.setData({
      pIndex: index
    })
    const pid = this.data.provinces[index].id
    WXAPI.nextRegion(pid).then(res => {
      console.log(res)
      if (res.code == 0) {
        this.setData({
          cities: res.data
        })
      }
    })
  },
  cityChange(e) {
    const index = e.detail.value
    this.setData({
      cIndex: index
    })
    const pid = this.data.cities[index].id
    WXAPI.nextRegion(pid).then(res => {
      console.log(res)
      if (res.code == 0) {
        this.setData({
          areas: res.data
        })
      }
    })
  },
  areaChange(e) {
    const index = e.detail.value
    this.setData({
      aIndex: index
    })
    const pid = this.data.areas[index].id
    WXAPI.nextRegion(pid).then(res => {
      console.log(res)
      if (res.code == 0) {
        this.setData({
          streets: res.data
        })
      }
    })
  },
  goRegist() {
    wx.navigateTo({
      url: '/pages/auth/index'
    })
  },
  bindSave(e) {
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      this.goRegist()
      return
    }
    if (!this.data.cities) {
      wx.showToast({
        title: '请选择城市',
        icon: 'none'
      })
      return
    }
    WXAPI.addAddress({
      token: loginToken.token,
      provinceId: this.data.provinces[this.data.pIndex].id,
      cityId: this.data.cities[this.data.cIndex].id,
      districtId: this.data.areas ? this.data.areas[this.data.aIndex].id : '',
      linkMan: e.detail.value.linkMan,
      address: e.detail.value.address,
      mobile: e.detail.value.mobile,
      code: e.detail.value.code,
    }).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
        wx.navigateBack()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
})