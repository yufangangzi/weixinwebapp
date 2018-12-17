// pages/login/login.js
const app = getApp();
const imgUrl = app.globalData.imgUrl;
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logUrl: imgUrl+"log.png",
    loginimg1: imgUrl +"login1.png",
    loginimg2: imgUrl +"login2.png",
    loginbg: imgUrl +"loginbg.png",
  },
  // 登陆接口
  open2Page() {
      var that = this;
      var userName = 'admin';
      var password = 'admin';
      wx.request({
        //请求链接
        url: 'http://10.144.132.20:8005/wxapp/wexinLogin',
        //发送的数据
        data: {
          userName: userName,
          password: password
        },
        //成功回调
        success: function (res) {
          that.setData({
            user_name: res.data.data.nickname,
            user_image: res.data.data.imageurl
          })
        },
      })

     util.openPage("../../pages/alarmProcessing/detail");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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