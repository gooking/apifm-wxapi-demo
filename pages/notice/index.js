const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({
  data: {

  },
  onLoad: function (options) {
    // 读取最新的一条公告
    WXAPI.noticeLastOne().then(res => {
      console.log('最新的一条公告：', res)
    })
    // 读取公告列表
    WXAPI.noticeList().then(res => {
      console.log('公告列表数据：', res)
    })
  }
})