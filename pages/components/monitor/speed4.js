// pages/components/monitor/speed4.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    deviceData: {
      type: Object,
      observer: function (newVal, oldVal, changedPath) {
        wx.setStorageSync('deviceNo', newVal.deviceNo);
        return newVal
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    deviceImg: app.globalData.imgUrl + 'device1225.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
