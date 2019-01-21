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
    relist: [],
    relist0: [],
    relist1: [],
    relist2: [],

    imgNSrc: '../../images/nicon.png',
    imgWSrc: '../../images/wicon.png',
    imgD1Src: '../../images/device.png',
    imgD1SrcList: ['../../images/device0.png', '../../images/device1.png', '../../images/device2.png', '../../images/device3.png', '../../images/device4.png', '../../images/device5.png', '../../images/device6.png', '../../images/device7.png', '../../images/device8.png'],
    warningList: [],
    warningUnitNameList: [],
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

    //获取系统信息 
    wx.getSystemInfo({
      success(res) {
        app.globalData.winHeight = res.windowHeight;
      }
    })

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
          _this.handleAlarm(val.result.alarmDevice);
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

  onTabItemTap(item) {
    // debugger;
    wx.setTabBarStyle({
      // color: '#FF0000',
      selectedColor: '#5878E4',
      // backgroundColor: '#0000FF',
      // borderStyle: 'white'
    })
  },
  // 获取筛选接口数据
  getFiterList(params = {}) {
    util.listMenu(params, res => {
      if (res.code === 0) {
        wx.hideLoading();
        
        // for (let index = 0; index < res.result.length; index += 1) {
        //   this.data.codeArr = res.result[index].menuDeviceList;
          
        // }
        
        const relist = res.result.map((n) => Object.assign({}, n, {
          lable: n.unitName,
          id: n.id.toString(),
          hasWarning: false,
        }));
        const relist0 = relist.slice(0, 3);
        const relist1 = relist.slice(3, 6);
        const relist2 = relist.slice(6, 9);
        this.setData({
          relist: relist,
          relist0: relist0,
          relist1: relist1,
          relist2: relist2,
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
        const arr1 = arr.map(item => item.deviceUnitName);
        const arr2 = arr.map(item => item.deviceCode);
        this.setData({
          warningMsg: '温馨提示：'+arr1.join('、')+'单元内有设备报警，请尽快排查处理！',
          warningList: arr2,
          warningUnitNameList: arr1,
        })
      }else{
        this.setData({
          warningMsg: '',
          warningList: [],//无故障
          warningUnitNameList: [],
        })
      }
      // debugger;

      let relist = this.data.relist;
      relist = relist.map(item =>{
        return Object.assign({}, item, {
          hasWarning: this.data.warningUnitNameList.find(o => o===item.lable) ? true : false
        })
      })
      // debugger;
      const relist0 = relist.slice(0, 3);
      const relist1 = relist.slice(3, 6);
      const relist2 = relist.slice(6, 9);
      this.setData({
        relist: relist,
        relist0: relist0,
        relist1: relist1,
        relist2: relist2,

      })
    }
  },
 // sel start
  onClick3(e) {
    let index = e.currentTarget.id;
    let devName = e.currentTarget.dataset.label;
    const warningList = this.data.warningList;
    // debugger
    const codeOption = this.data.codeArr[index].menuDeviceList.map((n) => Object.assign({},  {
      title: n,
      value: n,
      color: 'custom',
      extra: warningList.find(o => n.indexOf(o.substring(0, o.length-1))>-1) ? 'warnicon' : 'normalicon'
    }))

    // debugger
    $wuxSelect('#wux-select3').open({
      value: this.data.value3,
      // multiple: true, 
      maxHeight: '646rpx',
      max:1, //最多选择个数
      toolbar: {
        title: devName,
        confirmText: '跳转',
        cancelText: '关闭',
        imgCloseSrc: '../../../../images/pclose.png',
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
          title3: options[index] || options[0],
        })
      },
      onConfirm: (value, index, options) => {
        // debugger
        console.log('onConfirm', value, index, options)
        this.setData({
          value3: value,
          title3: options[index] || options[0],          
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