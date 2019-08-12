const WXAPI = require('apifm-wxapi')

Page({
  data: {

  },
  onLoad: function (options) {
    // 读取单个系统参数
    WXAPI.queryConfigBatch('test1,test').then(res => {
      console.log('读取到的参数：', res)
    })
  }
})