const WXAPI = require('apifm-wxapi')

Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  cmsCategories() { // 读取所有的分类数据
    WXAPI.cmsCategories().then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '读取成功',
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  cmsCategoryDetail() { // 读取某个分类的详情数据
    const cmsCategoryId = 3189 // 记录中的记录ID
    WXAPI.cmsCategoryDetail(cmsCategoryId).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '读取成功',
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
})