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
    paramDevice:Object,
    outFlag: {
      type: Object,
      observer: function (newVal, oldVal) {
        // console.log('newVal:', newVal, ';oldVal:', oldVal);

        if (oldVal && newVal) {
          debugger
          let mapIndex = 'sybx';
          if(newVal.index==1){
            mapIndex = 'sybx';
          }else if(newVal.index==2){
            mapIndex = 'fft';
          }
          const timereg = /-/g
          const obj = {
            token: wx.getStorageSync('token') || '3bda1ffe-e30e-4da9-969b-4e8468da475b',
            pagemap: mapIndex,
            timeSpan: this.data.value3,
            channel: this.data.value1,
            dataType: this.data.value2 == '-1' ? 'acceleration' : 'speed',
            statisStartTime: new Date(this.data.timeShow.replace(timereg, '/')).getTime(),
            valueshow: this.data.valueShow
          }
          console.log(this.properties.outInfo)
          const paramsobj = Object.assign({}, this.properties.outInfo, obj);


          console.log(paramsobj)
          const params = Object.keys(paramsobj).map(function (key) {
            // body...
            return encodeURIComponent(key) + "=" + encodeURIComponent(paramsobj[key]);
          }).join("&");
          console.log(params)
          wx.navigateTo({
            url: `../../pages/daping/index?${params}`,
          })
          
        }


      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    buttonClicked: false,
    currentSelect: '1',
    outMsgObj: {},
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
    mapIndexFlag: false,//fft sybx则不显示
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

    this.lineChart1= this.selectComponent('#mychart-dom-line-father1');
    //初始显示line图
    // this.lineChart1.init();
    // console.log('444', this.lineChart1);

    this.lineChart2 = this.selectComponent('#mychart-dom-line-father2');
    // //初始显示line图
    // this.lineChart2.init();
    // console.log('555', this.lineChart2);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      if (this.data.mapShowIndex === 0){
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
                vibrateHighHighQuote: res.result.vibrateHighHighQuote,
                pagemap: 'zdqs'
              }
            });

            
          }
          // debugger
        });

      }

      if (this.data.mapShowIndex === 1) {
        let obj = {};
        // debugger;
        obj = Object.assign({}, this.properties.outInfo);
        delete obj.kpiFlag;
        delete obj.faultId;
        delete obj.pageSize;
        delete obj.parameterTime;
        delete obj.timeSpan;
        delete obj.statisDimen;
        obj.statisStartTime = (this.data.timeShow && new Date(this.data.timeShow).getTime()) || this.data.value3;
        obj.channel = this.data.value1;
        obj.dataType = this.data.value2 == '-1' ? 'acceleration' : 'speed';
        // this.newLists.timeSpan
        this.deviceNo = obj.deviceNo;
        // debugger
        util.domainWaveformFigure(obj, res => {
          // trendChart(obj).then(res => {
          if (res.code === 0) {
            // debugger
            const obj = JSON.parse(res.result[0]);
            

            this.setData({
              lineParamsObj: {
                x0data: Array.from({ length: obj.domainWaveformFigure.length }, (v, k) => k),
                s0data: obj.domainWaveformFigure,
                x0name: '',
                title: this.name,
                rotateSpeed: obj.device.rotateSpeed,
                pagemap: 'sybx'
              }
            });


          }
          // debugger
        });

      }

      if (this.data.mapShowIndex === 2) {
        let obj = {};
        // debugger;
        obj = Object.assign({}, this.properties.outInfo);
        delete obj.kpiFlag;
        delete obj.faultId;
        delete obj.pageSize;
        delete obj.parameterTime;
        delete obj.timeSpan;
        delete obj.statisDimen;
        obj.statisStartTime = (this.data.timeShow && new Date(this.data.timeShow).getTime()) || this.data.value3;
        obj.channel = this.data.value1;
        obj.dataType = this.data.value2 == '-1' ? 'acceleration' : 'speed';
        // this.newLists.timeSpan
        this.deviceNo = obj.deviceNo;
        // debugger
        util.fftFigure(obj, res => {
          // trendChart(obj).then(res => {
          if (res.code === 0) {
            // debugger


            this.setData({
              lineParamsObj: {
                x0data: res.result.rp_fft_f_arr,
                s0data: res.result.rp_fft_date_arr,
                x0name: '频率(Hz)',
                title: this.name,
                rotateSpeed: res.result.device.rotateSpeed,
                pagemap: 'fft'
              }
            });


          }
          // debugger
        });

      }


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
            
          }
          setTimeout(() => {
            this.init();
          }, 50);
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
      const timereg = /-/g
      const obj = {
        token: wx.getStorageSync('token') || '3bda1ffe-e30e-4da9-969b-4e8468da475b',
        pagemap : this.data.mapIndex,
        timeSpan: this.data.value3,
        channel: this.data.value1,
        dataType: this.data.value2 == '-1' ? 'acceleration' : 'speed',
        statisStartTime: new Date(this.data.timeShow.replace(timereg, '/')).getTime(),
        valueshow: this.data.valueShow
      }
      console.log(this.properties.outInfo)
      const paramsobj = Object.assign({}, this.properties.outInfo,obj);
      
      
      console.log(paramsobj)
      const params = Object.keys(paramsobj).map(function (key) {
        // body...
        return encodeURIComponent(key) + "=" + encodeURIComponent(paramsobj[key]);
      }).join("&");
      console.log(params)
      wx.navigateTo({
        url: `../../pages/daping/index?${params}`,
      })
    },
    mapChange(data) {
      // debugger
      let mapIndexFlag = true;
      let mapShowIndex = 0;
      if (data.target.id =='zdqs'){
        mapIndexFlag = false;
        mapShowIndex = 0;
      }else if(data.target.id=='sybx'){
        mapShowIndex = 1;
      }else if(data.target.id=='fft'){
        mapShowIndex = 2;
      }
      this.setData({
        mapIndex: data.target.id,
        mapIndexFlag: mapIndexFlag,
        mapShowIndex: mapShowIndex
      })

      // debugger;
      if(mapShowIndex==0){
        setTimeout(() => {
          // this.lineChart.dispose();
          this.lineChart.init();
          this.init();
        }, 100);
      }else if(mapShowIndex==1){
        setTimeout(() => {
          // this.lineChart1.dispose();
          this.lineChart1.init();
          this.init();
        }, 100);
      } else if (mapShowIndex == 2) {
        setTimeout(() => {
          // this.lineChart2.dispose();
          this.lineChart2.init();
          this.init();
        }, 100);
      }
    },
    scrollToMap() {
      this.buttonClicked();
      wx.pageScrollTo({
        scrollTop: 180,
        duration: 300,
        // complete: () => {
        //   debugger;
        //   this.openSelect1();
        // }
      })
    },
    scrollToMap1(){
      this.buttonClicked();
      wx.pageScrollTo({
        scrollTop: 180,
        duration: 300,
        // complete: () => {
        //   debugger;
        //   this.openSelect1();
        // }
      })
    },
    scrollToMap2() {
      this.buttonClicked();
      wx.pageScrollTo({
        scrollTop: 180,
        duration: 300,
        // success: () => {
        //   this.openSelect2();
        // }
      })
    },
    scrollToMap3() {
      this.buttonClicked();
      wx.pageScrollTo({
        scrollTop: 180,
        duration: 300,
        // success: () => {
        //   this.openSelect3();
        // }
      })
    },
    openSelect1Before() {
      // debugger;
      this.buttonClicked();
      this.setData({
        outMsgObj: {
          isOpened: true,
          mapShowIndex: this.data.mapShowIndex
        },
        currentSelect: 1
      })
      // return;
    },
    openSelect1() {
      // this.scrollToMap();
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
          }, 30);

          this.resetMap();
        },
        onCancel: () => {
          this.resetMap();
        }
      })
    },
    openSelect2Before() {
      this.buttonClicked();
      // debugger;
      this.setData({
        outMsgObj: {
          isOpened: true,
          mapShowIndex: this.data.mapShowIndex
        },
        currentSelect: 2
      })
      // return;
    },
    openSelect2() {
      // this.scrollToMap();
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
          }, 30);

          this.resetMap();
        },
        onCancel: () => {
          this.resetMap();
        }
      })
    },
    openSelect3Before() {
      this.buttonClicked();
      // debugger;
      this.setData({
        outMsgObj: {
          isOpened: true,
          mapShowIndex: this.data.mapShowIndex
        },
        currentSelect: 3
      })
      return;
    },
    openSelect3() {
      // this.scrollToMap();
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
          }, 30);
        
          this.resetMap();
        },
        onCancel: () => {
          this.resetMap();
        }
      })
    },

    resetMap: function(){
      // 恢复图表状态
      // debugger;
      this.setData({
        outMsgObj: {
          isOpened: false,
          mapShowIndex: !this.data.mapShowIndex
        }
      })
      return;
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

    fatherSaveFn: function (event){
      // debugger
      const currentSelect = this.data.currentSelect;
      if(currentSelect==2){
        this.openSelect2();
      }else if(currentSelect==3){
        this.openSelect3();
      }else{
        this.openSelect1()
      }
    },

    buttonClicked: function(){
      this.setData({
        buttonClicked: true
      })
      setTimeout(() => {
        this.setData({
          buttonClicked: false
        })
      }, 500);
    }

  }
})
