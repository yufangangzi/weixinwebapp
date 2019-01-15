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
        if (newVal.lifeCycle === '磨合期') {
          newVal.lifeCycles = 'moheqi'
        } else if (newVal.lifeCycle === '保持期') {
          newVal.lifeCycles = 'bochiqi'
        }
        this.initlifeCycles(newVal)
        console.log(newVal)
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
    devices: {},
    lifeCycles: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initlifeCycles (data) {
      const _this = this;
      console.log(data)
      if (data.lifeCycles) {
        this.setData({
          lifeCycles: data.lifeCycles
        })
      }
    },
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
