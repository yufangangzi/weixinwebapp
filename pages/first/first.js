// first/first.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.wxlogin({}, res => {
      console.log(res)
      if (res.result && res.result.openId) {
        app.globalData.openId = res.result.openId;
      }
      if (res.code === 0) {
        app.globalData.islogined = true;
        app.globalData.userInfo = res.result.user;
        app.globalData.token = res.result.token;
        wx.setStorageSync('token', res.result.token);
        app.globalData.islogined = true;

        // util.openPage("../../pages/alarmProcessing/detail");
        let url = "../../pages/monitor/index";
        wx.redirectTo({
          url: url
        });
      } else if (res.code == 50001) {
        console.log(res.msg);
        app.globalData.islogined = false;
        // util.openPage("../../pages/login/login");
        let url = "../../pages/login/login";
        wx.redirectTo({
          url: url
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})