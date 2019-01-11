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
      }
    }, err => {
    });
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