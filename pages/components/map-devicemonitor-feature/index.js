import { monitorData } from './monitorInfo';
import { passTrans, speedOrAccel1 } from './sensor.js';
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
            this.init();
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
    outWsdata: {
      type: Object,
      // value: '',
      observer: function (newVal, oldVal) {
        // console.log('newVal:', newVal, ';oldVal:', oldVal);

        if (oldVal && newVal) {
          // debugger;
          this.distributeMessage(newVal.data);
        }
      }
    },
    paramDevice:Object,
    outFlag: {
      type: Object,
      observer: function (newVal, oldVal) {
        // console.log('newVal:', newVal, ';oldVal:', oldVal);

        if (oldVal && newVal) {
          // debugger
          if (this.forbiddenRepeatClicked) {
            return;
          }
          this.forbiddenRepeatClicked = true;
          setTimeout(() => {
            this.forbiddenRepeatClicked = false;
          }, 300);
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
    imgIcon4Src: '../../../images/' + 'fangda.png',
    
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

    this.lineChart = this.selectComponent('#mychart-dom-fe-father');
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
    getchannel(channel) {
      const index = channel.indexOf('-');
      const channelNum = channel.slice(index + 1);
      return channelNum;
    },
    init() {
      if (this.data.mapShowIndex === 0){
        let obj = {};
        // debugger;
        obj = Object.assign({}, this.properties.outInfo);
        obj.deviceNo = obj.deviceNo || '2111-P230A';
        this.passageway = obj.passageway || '2-1V';

        util.listNewByGroup2(obj, res => {
          // trendChart(obj).then(res => {
          if (res.code === 1102) {
            // debugger
            const showTitle = this.data.value2 == '-1' ? 'acceleration' : 'speed';
            const data = res.result;
            let newData = monitorData(data).sensorList;
            console.log(newData);
            let datainfo = newData.filter(item => {
              return item.deviceNo === obj.deviceNo;
            });
            console.log(datainfo);
            const key = passTrans[this.getchannel(this.passageway)];
            console.log(key);
            const passData = datainfo[0][key];
            const jfg = passData[speedOrAccel1[showTitle]].yAxis;
            const jfgDate = {
              jfg: jfg,
              attribute: showTitle
            };
            // debugger
            console.log(jfgDate);
            this.setData({
              lineParamsObj: {
                time: [],
                value: jfg,
                unit: this.properties.outInfo.kpiFlag == 1 ? '加速度' : '速度',
                pagemap: 'zdqs'
              }
            });

            
          }
          // debugger
        });

      }

      // 监听websocket消息 
      // let _this = this;
      // wx.onSocketMessage(function (res) {
      //   let data = res.data
      //   if (data) {
      //     _this.distributeMessage(data)
      //   }
      // })


    },
    distributeMessage (data) {
      if (typeof (data) === 'string') {
        try {
          const val = JSON.parse(data);
          if (val.code === 1102) {
              // this.wszdqst(val.result)
              this.pytInit(val.result)

            
          }
        } catch (e) {

        }
      }
    },
    
    pytInit (val) {
      this.deviceNo = wx.getStorageSync('deviceNo');
      this.channel = this.data.outInfo.channel;
      this.dataType = this.data.outInfo.kpiFlag == 1 ? 'acceleration' : 'speed';
      this.timeformat = util.timeformat;
      // debugger;
      const data = val[this.deviceNo];
      if(data){
        let datainfo = data.filter(item => {
          return item.channel === this.channel && item.attribute === this.dataType;
        });
        const newInfo = datainfo[0];
        let ary = [];
        ary.push(newInfo.zeroPointTwoDegree);
        ary.push(newInfo.zeroPointThreeDegree);
        ary.push(newInfo.zeroPointFiveDegree);
        ary.push(newInfo.oneDegree);
        ary.push(newInfo.twoDegree);
        ary.push(newInfo.threeDegree);
        ary.push(newInfo.fiveDegree);
        ary.push(newInfo.tenDegree);
        // this.pyChartsData.yAxis[0].name = this.dataType === 'speed' ? '速度(mm/s)' : '加速度(m/s2)';
        // this.pyChartsData.title.text = '频域特征图';
        // this.pyChartsData.series[0].data = ary;

        this.setData({
          'lineParamsObj.value': ary
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
        pagemap : 'pytz',
        selfPageName: 'pytzt',
        // timeSpan: this.data.value3,
        // channel: this.data.value1,
        // dataType: this.data.value2 == '-1' ? 'acceleration' : 'speed',
        // statisStartTime: new Date(this.data.timeShow.replace(timereg, '/')).getTime(),
        // valueshow: this.data.valueShow
      }
      const valueshow = {
        valueshow: this.properties.outInfo.kpiFlag === '0' ? '速度' : '加速度'
      }
      const paramsobj = Object.assign({}, this.properties.outInfo, obj, valueshow);
      const params = Object.keys(paramsobj).map(function (key) {
        // body...
        return encodeURIComponent(key) + "=" + encodeURIComponent(paramsobj[key]);
      }).join("&");
      console.log(params)
      wx.navigateTo({
        url: `../../pages/daping/index?${params}`,
      })
    },
    
    scrollToMap() {
      this.buttonClicked();
      wx.pageScrollTo({
        scrollTop: 180,
        duration: 0,
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
      this.scrollToMap();
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
      this.scrollToMap();
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

    btnRecFn: function (event) {
      this.triggerEvent('mybtnevent', { msg: '启用fft按钮' });
    },

    fatherRecvFn: function (event) {
      // debugger
      console.log('父组件接受到的消息：', event.detail);
      if(event.detail.time && event.detail.value){
        this.setData({
          timeShow: event.detail.time,
          valueShow: event.detail.value
        });

        this.triggerEvent('mybtnevent', { msg: '启用fft按钮' });
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
