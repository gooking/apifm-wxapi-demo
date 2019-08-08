const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  goRegist() {
    wx.navigateTo({
      url: '/pages/auth/index'
    })
  },
  cmsArticles() { // 读取所有的文章列表
    WXAPI.cmsArticles().then(res => {
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
  cmsArticleDetail() { // 读取文章详情
    const newsId = 14152 // 文章ID
    WXAPI.cmsArticleDetail(newsId).then(res => {
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
  cmsArticlePreNext() { // 读取上一篇/下一篇文章
    const newsId = 13312 // 当前文章ID
    WXAPI.cmsArticlePreNext(newsId).then(res => {
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
  cmsArticleUseless() { // 给文章点赞 / 点踩 / 觉得有用 / 觉得没用
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.cmsArticleUseless({
      token: loginToken.token,  // 登录用户token，登录用户才能赞/踩
      id: 13312,  // 文章ID
      isUseful: 'true' // true 为赞 ; false 为踩
    }).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '态度发布成功',
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
  cmsArticleUsefulLogs() { // 读取所有赞/踩的记录
    WXAPI.cmsArticleUsefulLogs({
      id: 13312,  // 文章ID
    }).then(res => {
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
  cmsArticleCreate() { // 发表文章 / 投稿
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.cmsArticleCreate({
      token: loginToken.token,  // 登录用户token，登录用户才能赞/踩
      title: '测试文章标题',
      categoryId: 3189,  // 文章分类ID
      content: '测试文章内容'
    }).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '发布成功',
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
  cmsArticleDelete() { // 删除自己发布的文章
    const newsId = 15023 // 自己发布的文章ID
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.cmsArticleDelete(loginToken.token, newsId).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '删除成功',
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