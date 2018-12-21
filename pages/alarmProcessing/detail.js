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
  },

  // 获取其他故障信息
  faultListAll() {
    // debugger
    util.faultListAll({}, res => {
      // debugger;
      // return;
      if (res.code === 0) {
        if (Array.isArray(res.result)) {
          let result = res.result.filter(v => {
            return !this.data.DeviceFaultDetail.faultInfoVOList.find(it => it.otherId == v.id);
          });
          // debugger;
          let suggestCheckList2 = result.map(item => {
            return {
              value: item.id,
              label: item.faultName
            };
          });

          this.setData({
            suggestCheckList2: suggestCheckList2
          })
          console.log(suggestCheckList2);

          wx.setStorageSync('suggestCheckList1', JSON.stringify(this.data.DeviceFaultDetail.faultInfoVOList));
          wx.setStorageSync('suggestCheckList2', JSON.stringify(suggestCheckList2));

        }
      }
    }, err => {

    });
  },
  // 获取指派维修人员信息
  accendantList() {
    util.accendantList({ id: 2 }, res => {
      // debugger;
      // return;
      if (res.code === 0) {
        if (Array.isArray(res.result)) {
          let repairPeopleList = res.result.map(item => {
            return {
              value: item.userName,
              label: item.realName
            };
          });

          this.setData({
            repairPeopleList: repairPeopleList
          })
          console.log(repairPeopleList);
          wx.setStorageSync('repairPeopleList', JSON.stringify(repairPeopleList));

          // this.currentPerson = this.DeviceFaultDetail.accendant;
          // this.handlePerson = this.DeviceFaultDetail.processor;
          
        }
      }
    }, err => {

    });
  },

  reject3() {
    const _this = this;
    // 确认不采纳
    $wuxDialog().confirm({
      resetOnClose: true,
      closable: true,
      title: '提示',
      content: '确认该设备未发生故障',
      onConfirm(e) {
        // debugger
        let param = {
          id: _this.data.DeviceFaultDetail.id,
          deviceCode: _this.data.DeviceFaultDetail.deviceCode,
          processor: app.globalData.userInfo.realName
        };
        // return;
        util.allNotAccept(param, res => {
          // debugger;
          // return;
          if (res.code === 0) {
            $wuxToast().show({
              type: 'text',
              duration: 1000,
              color: '#f66',
              text: '操作成功!',
              success: () => {
                let url = "../../pages/historAlarm/historAlarm";
                wx.redirectTo({
                  url: url
                });
              }
            });
          }
        }, err => {

        });
      },
      onCancel(e) {
        
      },
    });
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
    util.openPage("../../pages/historAlarm/historAlarm");
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    debugger
    const deviceId = options.id || '07574ed454084de1b83550eea5fb27d9';
    const deviceCode = options.code;

    // wx.login({
    //   success(res){
    //     console.log(res);
    //     debugger;
    //   }
    // })
    
    // debugger;
    util.deviceAlarmGet({ 
      'deviceAlarmId': deviceId
    }, res => {
      // debugger;
      if(res.code==1){
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
      if(res.code===0){
        ;
        res.result.alarmTime2 = util.timeformat(
          new Date(res.result.alarmTime)
        );
        
        res.result.alarmLevel = this.data.alertArr[res.result.alarmSeverity];

        //设置图谱特征
        let stepList = res.result.faultOmenVOList.map(item => {
          return item.description;
        });
        this.setData({
          stepList: stepList
        });
        // debugger;

        //设置当前处理状态
        if(res.result.processStatus==0){
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

        try{
          let stepList = res.result.faultOmenVOList.map(item => {
            return item.description;
          });
          wx.setStorageSync('stepList', stepList.join('\n'));
        }catch(e){

        }


        this.setData({
          faultTime2: faultTime2,
          faultTime3: faultTime3,
          DeviceFaultDetail: res.result
        });

        //设置图片数组
        const img = res.result.picUrl;
        if(img){
          const imgList = img.split(',').map(v => app.globalData.baseUrl + v);
          this.setData({
            picturesList: imgList
          });
        }

        this.devEchart();

        //获取故障列表
        this.faultListAll();

        this.accendantList();

      }
    }, err => {
      
    });


    // const r = Math.random();
    // if(r>0.5){
    //   this.setData({
    //     isReport: false,
    //     isRepair: true,
    //   })
    // }else{
    //   this.setData({
    //     isReport: true,
    //     isRepair: false,
    //   })
    // }

    //随机测试父传子
    // setTimeout(()=>{
    //   this.setData({
    //     lineParamsObj: {
    //       id: parseInt(Math.random() * 10000) % 20,
    //       name: '被修改的值',
    //     }
    //   })
    // },6000);


    //设置图片数组
    // const img = this.data.imgGroup3Src;
    // this.setData({
    //   picturesList: [img, img, img]
    // });


    
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
  onShow: function () {

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