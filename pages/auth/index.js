const WXAPI = require('apifm-wxapi')

Page({
  data: {

  },
  onLoad: function (options) {
    
  },
  register_simple(e) {
    if (!e.detail.userInfo) {
      // 你点了取消授权
      return;
    }
    wx.login({
      success: function (res) {
        const code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        // 下面开始调用注册接口
        WXAPI.register_simple({
          code: code
        }).then(function (res) {
          // 注册接口返回结果
          console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '无需重复注册',
              icon: 'none'
            })
          } else if (res.code == 0) {
            wx.showToast({
              title: '注册成功',
              icon: 'success'
            })
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
      }
    })
  },
  register_complex(e) {
    if (!e.detail.userInfo) {
      // 你点了取消授权
      return;
    }
    wx.login({
      success: function (res) {
        const code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            const iv = res.iv;
            const encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            WXAPI.register_complex({
              code: code,
              encryptedData: encryptedData,
              iv: iv
            }).then(function (res) {
              // 注册接口返回结果
              console.log(res)
              if (res.code == 10000) {
                wx.showToast({
                  title: '无需重复注册',
                  icon: 'none'
                })
              } else if (res.code == 0) {
                wx.showToast({
                  title: '注册成功',
                  icon: 'success'
                })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
            })
          }
        })
      }
    })
  },
  goLogin() {
    wx.login({
      success: function (res) {
        const code = res.code; // 微信登录接口返回的 code 参数，下面登录接口需要用到
        WXAPI.login_wx(code).then(function (res) {
          // 登录接口返回结果
          console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '请先注册',
              icon: 'none'
            })
          } else if (res.code == 0) {
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            })
            wx.setStorageSync('loginToken', res.data)
            wx.navigateBack()
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
      }
    })
  },
  loginout(){
    const loginToken = wx.getStorageSync('loginToken')
    if (loginToken) {
      WXAPI.loginout(loginToken.token).then(res => {
        if (res.code == 0) {
          wx.showToast({
            title: '退出成功',
            icon: 'success'
          })
          wx.clearStorage()
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '退出成功',
        icon: 'success'
      })
    }
  },
  idcardCheck(){
    wx.navigateTo({
      url: '/pages/idcardCheck/index'
    })
  },
  modifyUserInfo(){
    wx.navigateTo({
      url: '/pages/modifyUserInfo/index'
    })
  },
  shippingAddress(){
    wx.navigateTo({
      url: '/pages/shipping-address/list'
    })
  },
  openid(){
    const loginToken = wx.getStorageSync('loginToken')
    if (!loginToken) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    WXAPI.userWxinfo(loginToken.token).then(res => {
      console.log(res)
      wx.showToast({
        title: '查看控制台',
        icon: 'success'
      })
    })
  },
})