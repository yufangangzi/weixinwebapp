var WxParse = require('../../dist/wxParse/wxParse.js');
import { $stopWuxRefresher } from '../../dist/wux/dist/index'
const app = getApp();
const util = require('../../utils/util.js');
const imgUrl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailId:'',
    item: '',
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const devId = options.id ;

    this.setData({
      detailId: devId,
    });
    this.getDetail();
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
  //详情接口
  getDetail() {
    const deviceId = this.data.detailId;

    // debugger;  knowledge/get
    wx.showLoading({
      title: '加载中',
    })
    util.getCaselib({
      'id': deviceId
      }, res => {
        setTimeout(()=>{
          wx.hideLoading();
        },20);
        if(res.code == 0){
          var content = res.result.content;
          var that = this;
          // debugger;
          WxParse.wxParse('content', 'html', content, that, 5);
          // debugger
          // res.result.content2 = content;
          this.setData({
            item: res.result,
            isShow: true,
          });
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration:1000
          })
        }
      })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})