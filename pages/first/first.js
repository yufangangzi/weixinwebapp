// first/first.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadSrc: '../../../images/load.gif',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // debugger;
    util.wxlogin({}, res => {
      console.log(res)
      if (res.result && res.result.openId) {
        app.globalData.openId = res.result.openId;
      }
      // debugger
      if (res.code === 0) {
        if(res.result && res.result.user && res.result.user.status==1){
          wx.showModal({
            title: '提示',
            content: '该账户已禁用，请联系管理员',
            showCancel: false,
            success(rest) {
              if (rest.confirm) {
                console.log('用户点击确定')
              } else if (rest.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          return;
        }
        app.globalData.islogined = true;
        app.globalData.userInfo = res.result.user;
        app.globalData.token = res.result.token;
        wx.setStorageSync('token', res.result.token);
        wx.setStorageSync('quanzhouunitVOList', res.result.unitVOList);
        app.globalData.islogined = true;
        app.initSocket()
        // util.openPage("../../pages/alarmProcessing/detail");
        let url = "../../pages/deviceMonitor/index";
        wx.switchTab({
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