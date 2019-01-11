// pages/components/monitor/index.js
const units = require('../../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    deviceData: {
      type: Object,
      observer: function (newVal, oldVal, changedPath) {
        console.log(newVal)
        if (newVal.sensorList){
          this.infosInit(newVal)
        }
        return newVal
      }
    },
    deviceinfos: {
      type: Object,
      observer: function (newVal, oldVal, changedPath) {
        this.formateTime()
        return newVal
      }
    },
    rotateSpeed: {
      type: String,
    },
    channelnum: {
      type: Number
    },
    deviceNo: {
      type: String,
      observer: function (newVal, oldVal, changedPath) {
        this.infosInit2()
        return newVal
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    setupTime: '',
    devices: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    fatherRecvFn: function (event) {
      // debugger
      console.log('父组件接受到的消息：', event.detail);
      this.triggerEvent('myevent', { msg: '切换到历史记录' });
      
    },
    formateTime () {
      const _this = this;
      this.setData({
        setupTime: units.timeformat(new Date(Number(_this.data.deviceinfos.setupTime)))
      })
    },
    infosInit2 () {
      if (this.properties.deviceData && this.properties.deviceData.sensorList  && this.data.deviceNo) {
        const info = this.properties.deviceData.sensorList[this.data.deviceNo]
        if (info) {
          this.setData({
            devices: info
          })
        }
      }
      
    },
    infosInit (data) {
      const info = data.sensorList[this.data.deviceNo]
      if (info) {
        this.setData({
          devices: info
        })
      }
      
      console.log(this.data.devices)
    }
  },
})
