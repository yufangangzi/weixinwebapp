
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
const $wuxCalendar = (selector = '#wux-calendar', ctx) => getCtx(selector, ctx);
// const $stopWuxRefresher = (selector = '#wux-refresher', ctx) => getCtx(selector, ctx).finishPullToRefresh()

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
            // this.listChannel();
            // debugger
            this.init();
          }
        
        
      }
    },
    outMore: {
      type: Object,
      // value: '',
      observer: function (newVal, oldVal) {
        // console.log('newVal:', newVal, ';oldVal:', oldVal);

        if (oldVal && newVal) {
          // this.listChannel();
          // debugger
          this.loadMore();
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
    trendSrc: '../../../images/trend.png',
    
    mapShowIndex: 0,

    value1: [],
    value2: 'speed',
    title2: '速度(mm/s)',
    value3: '1440',
    title3: '24小时',
    startTime: [''],
    endTime: [''],
    startRow: '',
    initChannel: [],
    tablelist: [],

    hasmoreData: true,//更多数据
    hiddenloading: true,//加载中
    isResult: true,
    pullEnd:{},

    mapIndexFlag: false,//fft sybx则不显示
    mapIndex: 'zdqs' // zdqs 振动趋势图  fft fft图  sybx 时域波形图
  },

  ready: function(){
    // this.init();
    // debugger
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      //设置默认时间
      const endTime = new Date();
      const start = new Date().getTime() - 90 * 24 * 60 * 60 * 1000;
      const startTime = new Date(start);
      this.setData({
        'startTime[0]': util.timeformat(startTime, 'yyyy-MM-dd'),
        'endTime[0]': util.timeformat(endTime, 'yyyy-MM-dd')
      })

      this.getHis();


    },
    getHis() {
      this.setData({
        startRow: ''
      })
      this.getHisAction();
    },
    getHisAction() {
      let obj = {};
      // debugger;
      obj = Object.assign({}, this.properties.outInfo);
      obj.statisStartTime = new Date(this.data.startTime[0]).getTime();
      obj.statisEndTime = new Date(this.data.endTime).getTime();
      obj.dataType = this.data.value2;
      obj.startRow = this.data.startRow;
      obj.deviceNo = obj.deviceNo || "2411-K103A";
      obj.pageSize = 20;
      // { "pageSize": 20, "deviceNo": "2411-K103A", "statisStartTime": 1539820800000, "statisEndTime": 1546925854719, "startRow": "0_2111-P230A_9223372035307853848", "dataType": "speed" }

      if(!obj.startRow){
        this.setData({
          hasmoreData: true,
          hiddenloading: true
        })
      }
      wx.showLoading();
      util.listHistoryData2(obj, res => {
        wx.hideLoading()
        if (res.code === 0) {
          // debugger

          res.result.forEach(item => {
            item.reportTime = util.timeformat(new Date(Number(item.dateTime)));
            item.select = false;
          });
          if (res.result.length > 0) {
            let reg = /^\d+-\d+/;
            let initChannel = [];
            let arr = [];
            for (let key in res.result[0]) {
              if (reg.test(key) && initChannel.indexOf(key) < 0) {
                arr.push(key);
              }
            }
            console.log(arr);
            arr.sort(function (a, b) {
              const aa = a.indexOf('-');
              const bb = b.indexOf('-');
              return a.slice(0, aa) - b.slice(0, bb);
            });
            console.log(arr);
            arr.forEach(key => {
              if (reg.test(key) && initChannel.indexOf(key) < 0) {
                // const obj = {
                //   title: key,
                //   key: key,
                //   align: 'center',
                //   render: (h, params) => {
                //     return h('div', {
                //       style: {
                //         cursor: 'pointer'
                //       },
                //       on: {
                //         click: (e) => {
                //           e.stopPropagation();
                //           e.preventDefault();
                //           this.passagewayClick(this.listkey.deviceNo, key, params.row.dateTime, this.listkey.dataType, params.row[key]);
                //         }
                //       }
                //     }, Number(params.row[key]).toFixed(2));
                //   }
                // };
                initChannel.push(key);
                // this.tabletitle.push(obj);
                console.log(key);
              } else {
                console.log(key + '0000');
              }
            });

            this.setData({
              initChannel: initChannel
            })
          }

          let tablelist = this.data.tablelist;
          if(this.data.startRow){
            tablelist.push(...res.result.slice(0, 20));
          }else{
            tablelist = res.result.slice(0, 20);
          }
          // debugger
          this.setData({
            tablelist: tablelist
          });
          if(this.data.startRow){
            this.setData({ hasmoreData: false, hiddenloading: true })
          }
          if (res.result.length > 0) {
            let currentPage = res.result[res.result.length - 1].rowKey;
            // let isEndPage = true;
            // if (res.result.length > 20) {
            //   isEndPage = false;
            // }
            // let rowKeys = this.data.rowKeys;
            // if (rowKeys.indexOf(currentPage) < 0 && res.result.length > 20) {
            //   rowKeys.push(currentPage);
            // }
            this.setData({
              startRow: currentPage
            })
            // debugger
          } else {
            //没有更多数据

          }





        } else {

        }
        // debugger
      }, err =>{
        wx.hideLoading()
      });
    },
    onPageScroll(obj){
      console.log(obj);
    },
    // 加载更多
    onReachBottom() {
      debugger
      console.log('加载更多')

      this.setData({
        hasmoreData: true,
        hiddenloading: false
      })

      this.getHisAction();
    },
    // 加载更多
    loadMore() {
      // debugger
      console.log('加载更多')

      this.setData({
        hasmoreData: true,
        hiddenloading: false
      })

      this.getHisAction();
    },
    onPulling() {
      console.log('onPulling')
    },
    onRefresh() {
      console.log('onRefresh')
      setTimeout(() => {
        this.getHis();
        // $stopWuxRefresher()
        this.setData({
          pullEnd: {
            hiddenLoading: this.data.hiddenloading
          }
        })
      }, 1500)
    },

    chooseItem(e){
      const info = e.currentTarget.dataset.info;
      const channel = e.currentTarget.dataset.channel;
      
      const timereg = /-/g
      const obj = {
        selfPageName: 'zdqst',
        frompage: 'history',
        token: wx.getStorageSync('token') || '3bda1ffe-e30e-4da9-969b-4e8468da475b',
        pagemap: 'zdqs',
        timeSpan: 129600,
        channel: channel,
        dataType: this.data.value2,
        statisStartTime: info.dateTime,
        parameterTime: info.dateTime,
        statisDimen: 'second',
        pageSize:0,
        // valueshow: this.data.title2
      }
      const valueshow = {
        kpiFlag: this.data.value2 === 'speed' ? '0' : '1',
        valueshow: this.data.value2 === 'speed' ? '速度' : '加速度'
      }
      const paramsobj = Object.assign({}, obj, this.data.outInfo, valueshow);
      // debugger;
      const params = Object.keys(paramsobj).map(function (key) {
        // body...
        return encodeURIComponent(key) + "=" + encodeURIComponent(paramsobj[key]);
      }).join("&");
      console.log(params)
      wx.navigateTo({
        url: `../../pages/daping/index?${params}`,
      })
      
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
          title: '速度(mm/s)',
          value: 'speed',
          // color: 'positive',
        },
        {
          title: '加速度(m/s2)',
          value: 'accel',
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
            this.getHis();
          }, 30);

          
        },
        onCancel: () => {
          
        }
      })
    },
    openCalendar1() {
      const maxDate = new Date(this.data.endTime[0]).getTime();
      $wuxCalendar().open({
        value: this.data.startTime,
        maxDate,
        onChange: (values, displayValues) => {
          console.log('onChange', values, displayValues)
          this.setData({
            startTime: displayValues,
          })
          if (values[0] != displayValues[0]) {
            setTimeout(() => {
              this.getHis();
            }, 30);
          }

        },
      })
    },
    openCalendar2() {
      const minDate = new Date(this.data.startTime[0]).getTime();
      $wuxCalendar().open({
        value: this.data.endTime,
        minDate,
        onChange: (values, displayValues) => {
          console.log('onChange', values, displayValues)
          this.setData({
            endTime: displayValues,
          })
          if (values[0] != displayValues[0]) {
            setTimeout(() => {
              this.getHis();
            }, 30);
          }
        },
      })
    },
    
    
    switchRT() {
      //切换到历史记录
      console.log('切换到实时监测')
      this.triggerEvent('myevent', { msg: '切换到实时监测' });
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

    buttonClicked: function () {
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
