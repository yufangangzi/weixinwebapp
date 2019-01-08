const util = require('../../utils/util.js');
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
    wx.connectSocket({
      url: util.wss + wx.getStorageSync('token')
    })

    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')

      // wx.sendSocketMessage({
      //   data: 'Hello,World:' + Math.round(Math.random() * 0xFFFFFF).toString(),
      // })
    })

    wx.onSocketMessage(function (res) {
      console.log(res)
    })

    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭！')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(util)
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