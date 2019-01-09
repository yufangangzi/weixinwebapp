// pages/deviceMonitor/index.js
import { $stopWuxRefresher } from '../../dist/wux/dist/index'
const app = getApp();
const util = require('../../utils/util.js');
const imgUrl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 单元编号选择 start
    items: [
      {
        type: 'filter',
        label: '选项',
        value: 'filter',
        children: [
          {
            type: 'radio',
            label: '装置单元',
            value: 'devUnit',
            children: []
          }, // 装置单元
          {
            type: 'radio',
            label: '设备编号',
            value: 'devCode',
            children: [],
          }, // 设备编号
        ],
        // groups: ['001', '002', '003', '004'],
      },
    ],
    // 单元编号选择 end
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFiterList();  //选项
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

  },

  // 获取筛选接口数据
  getFiterList(params = {}) {
    util.listMenu(params, res => {
      if (res.code === 0) {
        wx.hideLoading();
        wx.setStorageSync('selFlag', 0);
        var ka = this.data.items[0].children[0].children;
        var k1 = [];
        for (let index = 0; index < res.result.length; index += 1) {
          const item = res.result[index].menuDeviceList;
          for (let j = 0; j < item.length; j++) {
            const codeArrs = item[j]
            k1.push(codeArrs);
          }
        }
        // debugger
        wx.setStorageSync('filterArr', k1); // 存取k1的值 重置用
        console.log("codeArr--" + this.data.codeArr);
        this.setData({
          relist: res.result.map((n) => Object.assign({}, n, {
            type: 'ghost',
            name: n.unitName,
            id: n.id.toString(),
          })),
          'items[0].children[0].children': res.result.map((n) => Object.assign({}, n, {
            label: n.unitName,
            value: n.id.toString(),
          })),
          // 设备编号取值
          'items[0].children[1].children': k1.map((n) => Object.assign({}, n, {
            label: n,
            value: n,
          })),
        })
      }
    }, err => {
    });
  },
})