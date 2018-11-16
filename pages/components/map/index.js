// pages/components/line/index.js
import * as echarts from '../../../dist/ec-canvas/echarts';
const app = getApp();
const util = require('../../../utils/util.js');

const getCtx = (selector, ctx = getCurrentPages()[getCurrentPages().length - 1]) => {
  const componentCtx = ctx.selectComponent(selector)

  if (!componentCtx) {
    throw new Error('无法找到对应的组件，请按文档说明使用组件')
  }

  return componentCtx
}
const $wuxSelect = (selector = '#wux-select', ctx) => getCtx(selector, ctx);

Component({
  externalClasses: ['my-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    outInfo: {
      type: Object,
      // value: '',
      observer: function(newVal, oldVal){
        console.log('newVal:', newVal, ';oldVal:', oldVal);
        
          if (oldVal && newVal) {
            // debugger
            this.setData({
              lineParamsObj: newVal,
            });
          //   this.setData({
          //     'option.series[1].data': [118, 136, 165, 130, 178, 140, 133],
          //     'option.series[2].data': [12, 50, 51, 35, 70, 30, 20],
          //     'option.series[0].data': [10, 30, 31, 50, 40, 20, 10],
          //   }, () => {
          //     this.setOption();
          //   })
          }
        
        
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lineParamsObj: {},

    imgIconSrc: app.globalData.imgUrl + 'Path.png',
    imgIcon1Src: app.globalData.imgUrl + 'qushi@2x.png',
    imgIcon2Src: app.globalData.imgUrl + 'xinzhuang@2x.png',
    imgIcon3Src: app.globalData.imgUrl + 'lujin@2x.png',
    imgIcon1GraySrc: app.globalData.imgUrl + 'qushi@2x1.png',
    imgIcon2GraySrc: app.globalData.imgUrl + 'xinzhuang@2x1.png',
    imgIcon3GraySrc: app.globalData.imgUrl + 'lujin@2x1.png',
    imgIcon4Src: app.globalData.imgUrl + 'fangda.png',
    
    mapShowIndex: 0,

    value1: '1',
    title1: '1-1H',
    value2: '1',
    title2: '速度',
    value3: '5',
    title3: '6小时',

  },

  ready: function(){
    // // 获取组件
    // this.ecComponent = this.selectComponent('#mychart-dom-line');
    // console.log(this.properties.outInfo);

    this.lineChart = this.selectComponent('#mychart-dom-line-father');
    //初始显示line图
    this.lineChart.init();
    console.log('333', this.lineChart);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //打开大图所在链接
    openBigPage(){
      // wx.navigateTo({
      //   url: '../../pages/webPage/index',
      // })
      wx.navigateTo({
        url: '../../pages/daping/index',
      })
    },
    openSelect1() {
      $wuxSelect('#wux-select1').open({
        value: this.data.value1,
        // multiple: true,
        toolbar: {
          title: '请选择',
          confirmText: '确定',
        },
        options: [{
          title: '1-1H',
          value: '1',
          // color: 'positive',
        },
        {
          title: '2-1V',
          value: '2',
          // color: 'positive',
        },
        ],
        onChange: (value, index, options) => {
          console.log('onChange', value, index, options)
          this.setData({
            value1: value,
            title1: options[index].title,
          })
        },
        onConfirm: (value, index, options) => {
          console.log('onConfirm', value, index, options)
          this.setData({
            value1: value,
            title1: options[index].title,
          })
        },
      })
    },
    openSelect2() {
      $wuxSelect('#wux-select2').open({
        value: this.data.value2,
        // multiple: true,
        toolbar: {
          title: '请选择',
          confirmText: '确定',
        },
        options: [{
          title: '速度',
          value: '1',
          // color: 'positive',
        },
        {
          title: '加速度',
          value: '2',
          // color: 'positive',
        },
        ],
        onChange: (value, index, options) => {
          console.log('onChange', value, index, options)
          this.setData({
            value2: value,
            title2: options[index].title,
          })
        },
        onConfirm: (value, index, options) => {
          console.log('onConfirm', value, index, options)
          this.setData({
            value2: value,
            title2: options[index].title,
          })
        },
      })
    },
    openSelect3() {
      $wuxSelect('#wux-select3').open({
        value: this.data.value3,
        // multiple: true,
        toolbar: {
          title: '请选择',
          confirmText: '确定',
        },
        options: [{
          title: '5分钟',
          value: '1',
          // color: 'positive',
        },
        {
          title: '半小时',
          value: '2',
          // color: 'positive',
        },
        {
          title: '1小时',
          value: '3',
          // color: 'positive',
        },
        {
          title: '3小时',
          value: '4',
          // color: 'positive',
        },
        {
          title: '6小时',
          value: '5',
          // color: 'positive',
        },
        {
          title: '12小时',
          value: '6',
          // color: 'positive',
        },
        {
          title: '24小时',
          value: '7',
          // color: 'positive',
        },

        ],
        onChange: (value, index, options) => {
          console.log('onChange', value, index, options)
          this.setData({
            value3: value,
            title3: options[index].title,
          })
        },
        onConfirm: (value, index, options) => {
          console.log('onConfirm', value, index, options)
          this.setData({
            value3: value,
            title3: options[index].title,
          })
        },
      })
    },

    //给父组件传消息
    send2FatherFn: function(e){
      this.triggerEvent('myevent', {msg: '来自子组件的问候'});
    },

  }
})
