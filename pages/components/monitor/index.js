// pages/components/monitor/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    deviceData: {
      type: Object,
      observer: function (newVal, oldVal, changedPath) {
        return newVal
      }
    },
    deviceinfos: {
      type: Object,
      observer: function (newVal, oldVal, changedPath) {
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
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

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
  }
})
