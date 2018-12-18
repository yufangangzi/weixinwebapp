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
        // console.log('newVal:', newVal, ';oldVal:', oldVal);
        
          if (oldVal && newVal) {
            this.listChannel();
            // debugger
            // this.setData({
            //   lineParamsObj: newVal,
            // });
          //   this.setData({
          //     'option.series[1].data': [118, 136, 165, 130, 178, 140, 133],
          //     'option.series[2].data': [12, 50, 51, 35, 70, 30, 20],
          //     'option.series[0].data': [10, 30, 31, 50, 40, 20, 10],
          //   }, () => {
          //     this.setOption();
          //   })
          }
        
        
      }
    },
    paramDevice:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    lineParamsObj: {},
    options:[],
    timeShow:'',
    valueShow: '',

    imgIconSrc: app.globalData.imgUrl + 'Path.png',
    imgIcon1Src: app.globalData.imgUrl + 'qushi@2x.png',
    imgIcon2Src: app.globalData.imgUrl + 'xinzhuang@2x.png',
    imgIcon3Src: app.globalData.imgUrl + 'lujin@2x.png',
    imgIcon1GraySrc: app.globalData.imgUrl + 'qushi@2x1.png',
    imgIcon2GraySrc: app.globalData.imgUrl + 'xinzhuang@2x1.png',
    imgIcon3GraySrc: app.globalData.imgUrl + 'lujin@2x1.png',
    imgIcon4Src: app.globalData.imgUrl + 'fangda.png',
    
    mapShowIndex: 0,

    value1: '1-1H',
    title1: '1-1H',
    value2: '-2',
    title2: '速度',
    value3: '1440',
    title3: '24小时',
    mapIndex: 'zdqs' // zdqs 振动趋势图  fft fft图  sybx 时域波形图

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
    init() {
      let obj = {};
      // debugger;
      obj = Object.assign({}, this.properties.outInfo);
      delete obj.kpiFlag;
      obj.timeSpan = this.data.value3;
      obj.channel = this.data.value1;
      obj.dataType = this.data.value2 == '-1' ? 'acceleration' : 'speed';
      // this.newLists.timeSpan
      this.deviceId = obj.deviceNo;
      this.passageway = obj.channel;

      util.trendChart(obj, res => {
        // trendChart(obj).then(res => {
        if (res.code === 0) {
          // debugger
          this.setData({
            lineParamsObj: {
              time: res.result.time,
              value: res.result.value,
              unit: this.data.title2,
              vibrateHighQuote: res.result.vibrateHighQuote,
              vibrateHighHighQuote: res.result.vibrateHighHighQuote
            }
          });

          
        }
        // debugger
      });
    },
    listChannel() {
      // debugger
      let obj = {
        faultId: this.properties.outInfo.faultId,
        deviceNo: this.properties.outInfo.deviceNo
      };
      // debugger;
      util.listChannel(obj, res => {
        if (res.code === 0 && res.result && Array.isArray(res.result.channel)) {
          let accessMethodList = res.result.channel.map(item => {
            return {
              title: item,
              value: item
            };
          });
          this.setData({
            options: accessMethodList
          })
          let channel1 = res.result.channel[0];

          if (this.properties.outInfo.channel) {
            channel1 = this.properties.outInfo.channel;
            setTimeout(() => {
              this.init();
            }, 300);
          }
          this.setData({
            value1: channel1,
            title1: channel1
          })
          if (res.result.attribute && res.result.attribute == 'acceleration') {
            this.setData({
              title2: '加速度',
              value2: '-1'
            })
          }
          // debugger
        }
        // debugger
      });
    },
    //打开大图所在链接
    openBigPage(){
      // wx.navigateTo({
      //   url: '../../pages/webPage/index',
      // })
      const mapIndex = this.data.mapIndex;
      const obj = this.properties.outInfo;
      debugger
      wx.navigateTo({
        url: `../../pages/daping/index?pagemap=${mapIndex}&devicecode=${obj.deviceNo}&token=${wx.getStorageSync('token') || '3bda1ffe-e30e-4da9-969b-4e8468da475b'}`,
      })
    },
    mapChange(data) {
      debugger
      this.setData({
        mapIndex: data
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
        options: this.data.options,
        // options: [{
        //   title: '1-1H',
        //   value: '1',
        //   // color: 'positive',
        // },
        // {
        //   title: '2-1V',
        //   value: '2',
        //   // color: 'positive',
        // },
        // ],
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
          setTimeout(() => {
            this.init();
          }, 300);
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
          value: '-2',
          // color: 'positive',
        },
        {
          title: '加速度',
          value: '-1',
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
          setTimeout(() => {
            this.init();
          }, 300);
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
          value: '5',
          // color: 'positive',
        },
        {
          title: '半小时',
          value: '30',
          // color: 'positive',
        },
        {
          title: '1小时',
          value: '60',
          // color: 'positive',
        },
        {
          title: '3小时',
          value: '180',
          // color: 'positive',
        },
        {
          title: '6小时',
          value: '360',
          // color: 'positive',
        },
        {
          title: '12小时',
          value: '720',
          // color: 'positive',
        },
        {
          title: '24小时',
          value: '1440',
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
          setTimeout(() => {
            this.init();
          }, 300);
        },
      })
    },

    //给父组件传消息
    send2FatherFn: function(e){
      this.triggerEvent('myevent', {msg: '来自子组件的问候'});
    },

    fatherRecvFn: function (event) {
      // debugger
      console.log('父组件接受到的消息：', event.detail);
      if(event.detail.time && event.detail.value){
        this.setData({
          timeShow: event.detail.time,
          valueShow: event.detail.value
        });
      }
    },

  }
})
