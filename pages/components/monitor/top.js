// pages/components/monitor/top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rotateSpeed: {
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
    switchHis (){
      //切换到历史记录
      console.log('切换到历史记录')
      this.triggerEvent('myevent', { msg: '切换到历史记录' });
    }
  }
})
