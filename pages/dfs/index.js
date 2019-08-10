const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Page({
  data: {
    piclists: undefined // 服务器上的文件列表
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.uploadFileList()
  },
  goRegist() {
    wx.navigateTo({
      url: '/pages/auth/index'
    })
  },
  urlChange(e){
    this.data.url = e.detail.value
  },
  uploadFileList(){
    wx.showLoading({
      title: '加载中',
    })
    WXAPI.uploadFileList().then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.code == 0){
        this.setData({
          piclists: res.data
        })
      }
    })
  },
  chooseImage: function (e) {
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    const _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count: 1, // 最多选择几张图片
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        WXAPI.uploadFile(loginToken.token, res.tempFilePaths[0]).then(_res => {
          console.log(_res)
          _this.uploadFileList()
        })
      }
    })
  },
  uploadFileFromUrl(){
    if (!this.data.url) {
      wx.showToast({
        title: '地址不能空',
        icon: 'none'
      })
      return
    }
    WXAPI.uploadFileFromUrl(this.data.url, '.png').then(res => {
      console.log(res)
      this.setData({
        url: null
      })
      this.uploadFileList()
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
})