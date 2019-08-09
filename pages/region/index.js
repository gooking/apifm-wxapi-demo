const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({

  data: {
    provinces: undefined,// 省份数据数组
    pIndex: 0,//选择的省下标
    cities: undefined,// 城市数据数组
    cIndex: 0,//选择的市下标
    areas: undefined,// 区县数数组
    aIndex: 0,//选择的区下标
    streets: undefined,// 街道/镇数据数组
    sIndex: 0,// 选择的街道下标
    communities: undefined,//社区/村委会数据数组
    ccIndex: 0,// 选择的社区下标
  },
  onLoad: function (options) {
    WXAPI.province().then(res => {
      if (res.code == 0) {
        this.setData({
          provinces: res.data
        })
      }
    })
  },
  provinceChange(e){
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
  cityChange(e){
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
  areaChange(e){
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
  streetChange(e){
    const index = e.detail.value
    this.setData({
      sIndex: index
    })
    const pid = this.data.streets[index].id
    WXAPI.nextRegion(pid).then(res => {
      console.log(res)
      if (res.code == 0) {
        this.setData({
          communities: res.data
        })
      }
    })
  },
  communityChange(e){
    const index = e.detail.value
    this.setData({
      ccIndex: index
    })
    const pid = this.data.communities[index].id
    WXAPI.nextRegion(pid).then(res => {
      console.log(res)
      // 似乎没有下级了
    })
  },
})