// pages/daping/index.js
const util = require('../../utils/util.js');
console.log(util);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const params = Object.keys(options).map(function (key) {
      // body...
      return encodeURIComponent(key) + "=" + encodeURIComponent(options[key]);
    }).join("&");
    const sc = `${util.baseWebView}static/qzweapp/bigcharts.html?${params}&time=${new Date().getTime()}`;
    console.log(sc);
    this.setData({
      src: sc
      //src: `${util.baseWebView}static/qzweapp/bigcharts.html`
    })
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