//app.js
const util = require('./utils/util.js');
App({
  onLaunch: function (options) {
    console.log(options);
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 判断是否已登录
    util.wxlogin({}, res => {
      if (res.result && res.result.openId) {
        this.globalData.openId = res.result.openId;
      }
      if (res.code === 0) {
        this.globalData.islogined = true;
        this.globalData.userInfo = res.result.user;
        this.globalData.token = res.result.token;
        wx.setStorageSync('token', res.result.token);
        this.globalData.islogined = true;

        // util.openPage("../../pages/alarmProcessing/detail");
        let url = "../../pages/alarmProcessing/detail";
        wx.redirectTo({
          url: url
        });
      } else if (res.code == 50001) {
        console.log(res.msg);
        this.globalData.islogined = false;
        // util.openPage("../../pages/login/login");
        let url = "../../pages/login/login";
        wx.redirectTo({
          url: url
        });
      }
    });

    // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res)
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function (options) {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: {
    islogined: true,
    openId: '',
    userInfo: null,
    token: '',
    imgUrl: 'https://tiot.sinochem-tech.com/static/qzweapp/',
    baseUrl: 'https://tiot.sinochem-tech.com/'
  }
})