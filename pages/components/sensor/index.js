// pages/components/sensor/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sensorData: {
      type: Object,
      observer: function (newVal, oldVal, changedPath) {
        console.log('sensor', newVal);
        return newVal
      }
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

    openMap(e){
      // debugger;
      const obj = e.currentTarget.dataset.obj;
      const channel = obj.speedTitle;
      const kpiFlag = '0';
      const parameterTime = obj.createTime;
      const deviceNo = '';
      const statisDimen = 'second';
      const timeSpan = 360;
      const pageSize = 0;
      
      wx.navigateTo({
        url: '../../pages/deviceMonitor/detail?channel=' + channel + '&kpiFlag=' + kpiFlag + '&parameterTime=' + parameterTime + '&statisDimen=' + statisDimen + '&timeSpan=' + timeSpan+'&pageSize='+pageSize,
      })
    },
    openMap2(e) {
      // debugger;
      const obj = e.currentTarget.dataset.obj;
      const channel = obj.speedTitle;
      const kpiFlag = '1';
      const parameterTime = obj.createTime;
      const deviceNo = '';
      const statisDimen = 'second';
      const timeSpan = 360;
      const pageSize = 0;

      wx.navigateTo({
        url: '../../pages/deviceMonitor/detail?channel=' + channel + '&kpiFlag=' + kpiFlag + '&parameterTime=' + parameterTime + '&statisDimen=' + statisDimen + '&timeSpan=' + timeSpan + '&pageSize=' + pageSize,
      })
    },


  }
})
