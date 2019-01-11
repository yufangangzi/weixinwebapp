// pages/deviceMonitor/index.js

import { $stopWuxRefresher } from '../../dist/wux/dist/index'
import { $wuxSelect } from '../../dist/wux/dist/index'
const app = getApp();
const util = require('../../utils/util.js');
const handel = require('./monitorinfo.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warningMsg: '',
    value3: '',
    title3: '',
    codeArr: [], // 设备编号
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

    this.setData({
      deviceParamsObj: {
        deviceNo: '2411-K103A'
      }
    })

    this.getFiterList();  //选项
    app.initSocket()


    // 监听websocket消息 
    let _this = this;
    wx.onSocketMessage(function (res) {
      let data = res.data
      // debugger
      try{
        const val = JSON.parse(data);
        if (val.code === 1101 && val.result && val.result.alarmDevice) {
          this.handleAlarm(val.result.alarmDevice);
        }
      }catch(e){

      }
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
    //加载更多
    this.setData({
      loadMoreFlag: {
        flag: true
      }
    })
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
        
        // for (let index = 0; index < res.result.length; index += 1) {
        //   this.data.codeArr = res.result[index].menuDeviceList;
          
        // }
        

        this.setData({
          relist: res.result.map((n) => Object.assign({}, n, {
            lable: n.unitName,
            id: n.id.toString(),
          })),
          'codeArr': res.result,
         
        })


        this.getAlarmList();
      }
    }, err => {
    });
  },
  getAlarmList(params = {}) {
    util.alarmList2(params, res => {
      if (res.code === 1101 && res.result) {

        // debugger;
        this.handleAlarm(res.result);
      }
    }, err => {
    });
  },
  handleAlarm(res){
    // debugger;
    if (Array.isArray(res)) {
      let arr = res.filter(item => {
        return this.data.relist.find(it => {
          return it.unitName == item.deviceUnitName;
        })
      });
      if(Array.isArray(arr)){
        arr = arr.map(item => item.deviceUnitName);
        this.setData({
          warningMsg: '温馨提示：'+arr.join('、')+'单元内有设备报警，请尽快排查处理！'
        })
      }else{
        this.setData({
          warningMsg: ''
        })
      }
      // debugger;
    }
  },
 // sel start
  onClick3(e) {
    let index = e.currentTarget.id;
    let devName = e.detail.label;
    const codeOption = this.data.codeArr[index].menuDeviceList.map((n) => Object.assign({},  {
      title: n,
      value: n,
    }))
    // debugger
    $wuxSelect('#wux-select3').open({
      value: this.data.value3,
      // multiple: true, 
      max:1, //最多选择个数
      toolbar: {
        title: devName,
        confirmText: '跳转',
        cancelText: '取消',
      },
      options: codeOption,
      // [{
      //   title: '画画',
      //   value: '1',
      //   },      
      // ],
      onChange: (value, index, options) => {
        console.log('onChange', value, index, options)
        this.setData({
          value3: value,
          title3: options[index],
        })
      },
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        this.setData({
          value3: value,
          title3: options[index],          
        })
        // console.log("data--" + this.data.codeArr);
        // 跳转

        wx.navigateTo({
          url: "../../pages/deviceMonitor/devicemonitor?unit=" + devName + "&deviceNos=" + value ,
        })
        // debugger
      },
    })
  },
// sel end

})