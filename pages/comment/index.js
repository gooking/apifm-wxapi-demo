const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({

  data: {

  },
  onLoad: function (options) {
    WXAPI.addComment({
      type: 0,
      content: '这是留言的内容，提交后可在后台看到'
    }).then(res => {
      console.log(res)
    })
  }
})