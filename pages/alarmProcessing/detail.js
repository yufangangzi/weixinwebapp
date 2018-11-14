// pages/alarmProcessing/detail.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: app.globalData.imgUrl + 'Bitmap1.jpg',
    imgArrowSrc: app.globalData.imgUrl + 'Chevron.png',
    imgGroup3Src: app.globalData.imgUrl + 'group5.png',
    imgGroup4Src: app.globalData.imgUrl + 'group4.png',
    imgJianyiSrc: app.globalData.imgUrl + 'jianyi.png',
    imgPhoneSrc: app.globalData.imgUrl + 'phone.png',
    isReport: false,
    isRepair: false,
    isRepairEnd: true,
    picturesList: [],
    lineParamsObj: {
      id: 1,
      name: '传参',
    },
    lineChart: null,
  },

  open2Page() {
    util.openPage("../../pages/alarmProcessing/handle");
  },

  open2Jianyi() {
    util.openPage("../../pages/alarmProcessing/diagnosticAdvice");
  },

  back2(){
    wx.navigateBack();
  },

  makephone(){
    wx.makePhoneCall({
      phoneNumber: '13400001234' //仅为示例，并非真实的电话号码
    })
  },

  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },

  fatherRecvFn: function(event){
    console.log('父组件接受到的消息：', event.detail);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const r = Math.random();
    if(r>0.5){
      this.setData({
        isReport: false,
        isRepair: true,
      })
    }else{
      this.setData({
        isReport: true,
        isRepair: false,
      })
    }

    //随机测试父传子
    setTimeout(()=>{
      this.setData({
        lineParamsObj: {
          id: parseInt(Math.random() * 10000) % 20,
          name: '被修改的值',
        }
      })
    },6000);


    //设置图片数组
    const img = this.data.imgGroup3Src;
    this.setData({
      picturesList: [img, img, img]
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