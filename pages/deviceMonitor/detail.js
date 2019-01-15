// pages/alarmProcessing/detail.js
//获取应用实例
import { $wuxDialog, $wuxToast } from '../../dist/wux/dist/index'
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    deviceLists: [],
    channel: '',
    rotateSpeed: '',
    btnEnabled: false,
    mapFlag: {index: 0, r:0.3},
    detailId: '',
    deviceCode: '',
    reloadFlag: false,
    value6: '',
    value7: '',
    value9: '',
    repairPeopleList: [],
    suggestCheckList2: [],
    faultTime2: '',
    faultTime3: '',
    stepList: [],
    alertArr: {
      '0': '低报',
      '1': '高报',
      '2': '高高报'
    },
    DeviceFaultDetail: '',
    imgSrc: app.globalData.imgUrl + 'Bitmap1.jpg',
    gaobaoSrc: app.globalData.imgUrl + 'gaobao.png',
    gaogaobaoSrc: app.globalData.imgUrl + 'gaogaobao.png',
    imgArrowSrc: app.globalData.imgUrl + 'Chevron.png',
    imgGroup3Src: app.globalData.imgUrl + 'group5.png',
    imgGroup4Src: app.globalData.imgUrl + 'group4.png',
    imgJianyiSrc: app.globalData.imgUrl + 'jianyi.png',
    imgPhoneSrc: app.globalData.imgUrl + 'phone.png',
    isReport: false,
    isRepair: false,
    isRepairEnd: false,
    picturesList: [],
    lineParamsObj: {
      id: 1,
      name: '传参',
    },
    lineChart: null,
    wsdata: {},
  },

  
  

  
  // 打开时域波形大图
  open2SYBX() {
    if (!this.data.btnEnabled){
      return;
    }
    if (this.forbiddenRepeatClicked){
      return;
    }
    this.setData({
      mapFlag: {
        index: 1,
        r: Math.random()
      }
    })
    this.forbiddenRepeatClicked = true;
    setTimeout(()=>{
      this.forbiddenRepeatClicked = false;
    },300);
    
  },
  // 打开FFT大图
  open2FFT() {
    if (!this.data.btnEnabled) {
      return;
    }
    if (this.forbiddenRepeatClicked) {
      return;
    }
    this.setData({
      mapFlag: {
        index: 2,
        r: Math.random()
      }
    })
    this.forbiddenRepeatClicked = true;
    setTimeout(() => {
      this.forbiddenRepeatClicked = false;
    }, 300);
  },
  // 跳转到工单处理
  open3Page() {
    util.openPage("../../pages/alarmProcessing/handle2");
  },
  // 跳转到未处理
  open2Page() {
    util.openPage("../../pages/alarmProcessing/handle");
  },
  open2Histor() {
    util.openPage("../../pages/historAlarm/historAlarm?deviceCode=" + this.data.DeviceFaultDetail.deviceCode + '&deviceUnitId=' + this.data.DeviceFaultDetail.deviceUnitId);
  },

  open2Jianyi() {
    util.openPage("../../pages/alarmProcessing/diagnosticAdvice");
  },

  back2(){
    wx.navigateBack();
  },

  makephone(){
    wx.makePhoneCall({
      phoneNumber: '13400001234' //仅为示例，并非真实的电话号码
    })
  },

  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },

  fatherRecvFn: function(event){
    console.log('父组件接受到的消息：', event.detail);
  },

  btnRecFn: function(event){
    this.setData({
      btnEnabled: true
    })
  },

  getDetail() {
    const deviceId = this.data.detailId;
    const deviceCode = this.data.deviceCode;

    // debugger;
    util.deviceAlarmGet({
      'deviceAlarmId': deviceId
    }, res => {
      // debugger;
      if (res.code == 1) {
        // debugger
        $wuxToast().show({
          type: 'forbidden',
          duration: 1500,
          color: '#f66',
          text: '服务异常请稍后再试',
          success: () => console.log('服务异常稍后再试')
        })
        return;
      }
      if (res.code === 0) {
        ;
        res.result.alarmTime2 = util.timeformat(
          new Date(res.result.alarmTime)
        );

        res.result.alarmLevel = this.data.alertArr[res.result.alarmSeverity];

        //设置图谱特征
        if (res.result.faultOmenVOList && Array.isArray(res.result.faultOmenVOList)){
        let stepList = res.result.faultOmenVOList.map(item => {
          return item.description;
        });
        this.setData({
          stepList: stepList
        });
        }
        // debugger;

        //设置当前处理状态
        if (res.result.processStatus == 0) {
          this.setData({
            isReport: true,
            isRepair: false,
            isRepairEnd: false
          })
        }
        if (res.result.processStatus == 1) {
          this.setData({
            isReport: true,
            isRepair: true,
            isRepairEnd: false
          })
        }

        if (res.result.processStatus == 2) {
          this.setData({
            isReport: true,
            isRepair: true,
            isRepairEnd: true
          })

          this.setData({
            value6: res.result.processResult,
            value7: res.result.remark,
            value9: (res.result.accendantFault && res.result.accendantFault.join(',')) || ''
          })
        }

        let faultTime2 = util.timeformat(
          new Date(res.result.processTime)
        );
        let faultTime3 = util.timeformat(
          new Date(res.result.accendantTime)
        );
        // debugger;

        wx.setStorageSync('repairId', res.result.id);
        wx.setStorageSync('deviceCode', res.result.deviceCode);
        wx.setStorageSync('faultInfoVOList', res.result.faultInfoVOList);

        try {
          let stepList = res.result.faultOmenVOList.map(item => {
            return item.description;
          });
          wx.setStorageSync('stepList', stepList.join('\n'));
        } catch (e) {

        }


        this.setData({
          faultTime2: faultTime2,
          faultTime3: faultTime3,
          DeviceFaultDetail: res.result
        });

        //设置图片数组
        const img = res.result.picUrl;
        if (img) {
          const imgList = img.split(',').map(v => app.globalData.baseUrl + v);
          this.setData({
            picturesList: imgList
          });
        }

        this.devEchart();

        

      }
    }, err => {

    });
  },

  /**
   * 切换设备编号 
   */
  switchTab(e) {
    const deviceCode = e.currentTarget.dataset.code;
    console.log(deviceCode);
    const index = e.currentTarget.dataset.index;
    this.setData({
      tabIndex: index,
      deviceNo: deviceCode
    })
    debugger;
    this.setData({
      'lineParamsObj.deviceNo': deviceCode
    });
    

  },

  initPage(data, devNoSel) {
    const deviceNo = data;
    const deviceAry = deviceNo.split('/');
    const fir = deviceAry[0].slice(0, deviceAry[0].length - 1)
    const nameNo = deviceAry[0].slice(deviceAry[0].length - 1)
    const ary = []
    deviceAry.forEach((item, index) => {
      if (index === 0) {
        ary.push(`${fir}${nameNo}`)
      } else {
        ary.push(`${fir}${item}`)
      }
    })
    // debugger;
    const tabIndex = ary.indexOf(devNoSel);

    this.setData({
      tabIndex: tabIndex || 0,
      deviceNo: devNoSel || ary[0],
      deviceLists: ary
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    // debugger;
    const obj = Object.assign({}, options);
    obj.deviceNo = wx.getStorageSync('deviceNo');
    this.setData({
      channel: obj.channel,
      rotateSpeed: wx.getStorageSync('rotateSpeed') + 'RPM'
    })

    wx.setNavigationBarTitle({
      title: obj.deviceNo,
    })

    // debugger
    this.setData({
      lineParamsObj: obj
    });

    options.deviceNos = wx.getStorageSync('devicesNo');
    const deviceNos = options.deviceNos || '2111-P230A/B/C'
    this.initPage(deviceNos, obj.deviceNo);

    // this.setData({
    //   lineParamsObj: {
    //     faultId: this.data.DeviceFaultDetail.id,
    //     channel: channel, // 加速度,通道  属性
    //     kpiFlag: this.data.DeviceFaultDetail.kpiFlag || '0', // 0速度 1加速度
    //     deviceNo: this.data.DeviceFaultDetail.deviceCode, // 设备编号
    //     parameterTime: this.data.DeviceFaultDetail.alarmTime, // 报警时间
    //     statisDimen: 'second', // 固定
    //     timeSpan: 10, // 展示时长
    //     pageSize: 0
    //   }
    // })

    // debugger
    // const deviceId = options.id || '07574ed454084de1b83550eea5fb27d9';
    // const deviceCode = options.code;

    // this.setData({
    //   detailId: deviceId,
    //   deviceCode: deviceCode
    // });

    
    // this.getDetail();

    // 监听websocket消息 
    let _this = this;
    wx.onSocketMessage(function (res) {
      let data = res.data
      // debugger
      if (data) {
        _this.setData({
          'wsdata': {
            data: data
          }
        })
      }
    })
    
  },

  devEchart() {
    let channel = '';
    if (this.data.DeviceFaultDetail.channel && this.data.DeviceFaultDetail.channel != '/') {
      channel = this.data.DeviceFaultDetail.channel.split(',')[0];
    }
    // debugger
    this.setData({
      lineParamsObj: {
        faultId: this.data.DeviceFaultDetail.id,
        channel: channel, // 加速度,通道  属性
        kpiFlag: this.data.DeviceFaultDetail.kpiFlag || '0', // 0速度 1加速度
        deviceNo: this.data.DeviceFaultDetail.deviceCode, // 设备编号
        parameterTime: this.data.DeviceFaultDetail.alarmTime, // 报警时间
        statisDimen: 'second', // 固定
        timeSpan: 10, // 展示时长
        pageSize: 0 
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})