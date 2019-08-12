const WXAPI = require('apifm-wxapi')

const sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["所有优惠券", "我的优惠券"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    couponList: undefined
  },
  onLoad: function (options) {
    const _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          sliderLeft: (res.windowWidth / _this.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / _this.data.tabs.length * _this.data.activeIndex
        });
      }
    });
    this.coupons()
  },
  onShow: function () {

  },
  goRegist() {
    wx.navigateTo({
      url: '/pages/auth/index'
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id == 0) {
      this.coupons()
    } else {
      this.myCoupons()
    }
  },
  coupons(){
    WXAPI.coupons().then(res => {
      console.log(res)
      if (res.code == 0) {
        this.setData({
          couponList: res.data
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        this.setData({
          couponList: null
        })
      }
    })
  },
  myCoupons(){
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      this.goRegist()
      return
    }
    WXAPI.myCoupons({
      token: loginToken.token
    }).then(res => {
      console.log(res)
      if (res.code == 0) {
        this.setData({
          couponList: res.data
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        this.setData({
          couponList: null
        })
      }
    })
  },
  couponDetail(e){
    const id = e.currentTarget.dataset.id
    WXAPI.couponDetail(id).then(res => {
      console.log('优惠券详情数据:', res)
      wx.showModal({
        title: '提示',
        content: '读取成功，查看控制台',
        showCancel: false
      })
    })
  },
  fetchCoupons(e){
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      this.goRegist()
      return
    }
    const id = e.currentTarget.dataset.id
    WXAPI.fetchCoupons({
      id: id,
      token: loginToken.token
    }).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '领取成功',
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
  sendCoupons(e){
    console.log('该方法作为作业留给你来实现')
    // WXAPI.sendCoupons({  })
  }
})