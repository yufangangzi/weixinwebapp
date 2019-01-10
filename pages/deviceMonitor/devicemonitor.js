// pages/deviceMonitor/index.js
const app = getApp();
const util = require('../../utils/util.js');
const handel = require('./monitorinfo.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceParamsObj: {},
    loadMoreFlag: {},
    switchIndex: 0,
    tabIndex: 0,

    deviceData: {},
    rotateSpeed: '',
    channelnum: 4,
    deviceNo: '2111-P230A'
  },
  getlistNewByGroup(deviceNo) {
    let _this = this;
    const obj = {
      deviceNo: '2111-P230A/B/C'
    }
    return util.listNewByGroup(obj)
  },
  getByCodes(code) {
    let _this = this;
    const obj = {
      code: '2111-P230A'
    }
    return util.getByCode(obj)
  },
  initData() {
    let _this = this;
    Promise.all([this.getByCodes(), this.getlistNewByGroup()]).then(([res1, res2]) => {
      if (res1.code === 0) {
        const structure = res1.result.structure;
        let structureNum = 4;
        if (structure === '双支撑式离心泵') {
          structureNum = 4;
        } else if (structure === '悬臂式离心泵') {
          structureNum = 2;
        } else if (structure === '离心式压缩机') {
          structureNum = 8;
        }
        _this.setData({
          rotateSpeed: res1.result.rotateSpeed,
          channelnum: structureNum
        })
        //保存数据供下个页面使用
        wx.setStorageSync('rotateSpeed', res1.result.rotateSpeed)
        if (res2.code === 1102 && res2.result) {
          _this.setData({
            deviceData: handel.monitorData(res2.result, structureNum)
          });
        }
      }
    })
  },
  distributeMessage(data) {
    if (typeof (data) === 'string') {
      try {
        const val = JSON.parse(data);
        if (val.code === 1102) {
          // 实时监控
          this.setData({
            deviceData: handel.monitorData(val.result, this.structureNum)
          });
          console.log(val);
        }
      } catch (e) {
        //console.log(e);
      }
    }
  },
  /**
   * 切换设备编号 
   */
  switchTab(e){
    const deviceCode = e.currentTarget.dataset.code;
    console.log(deviceCode);
    const index = e.currentTarget.dataset.index;
    this.setData({
      tabIndex: index
    })
    //加载数据
    if(this.data.switchIndex==1){
      //历史数据页面在此
      this.setData({
        deviceParamsObj: {
          deviceNo: this.data.deviceNo || '2411-K103A'
        }
      })

    }else{
      //实时监测页面

    }

  },
  /**
   * 切换历史数据跟实时监测按钮
   */
  fatherRecvFn: function (event) {
    // debugger
    console.log('父组件接受到的消息：', event.detail);
    // debugger;
    const msg = event.detail && event.detail.msg;
    if (msg.indexOf('历史记录') > -1) {
      this.setData({
        switchIndex: 1
      })

      this.setData({
        deviceParamsObj: {
          deviceNo: this.data.deviceNo || '2411-K103A'
        }
      })
    } else if (msg.indexOf('实时监测') > -1) {
      this.setData({
        switchIndex: 0
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.onSocketMessage(function (res) {
      let data = res.data
      if (data) {
        _this.distributeMessage(data)
      }
    })


    // this.setData({
    //   deviceParamsObj: {
    //     deviceNo: '2411-K103A'
    //   }
    // })
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
    this.initData()
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
    //加载更多
    if(this.data.switchIndex==1){
      this.setData({
        loadMoreFlag: {
          flag: true
        }
      })
    }
  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})