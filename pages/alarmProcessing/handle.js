// pages/alarmProcessing/alarmProcessing.js
//获取应用实例
import { $wuxDialog, $wuxToast } from '../../dist/wux/dist/index'
const app = getApp();
const util = require('../../utils/util.js');

const getCtx = (selector, ctx = getCurrentPages()[getCurrentPages().length - 1]) => {
  const componentCtx = ctx.selectComponent(selector)

  if (!componentCtx) {
    throw new Error('无法找到对应的组件，请按文档说明使用组件')
  }

  return componentCtx
}
const $wuxSelect = (selector = '#wux-select', ctx) => getCtx(selector, ctx);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggestCheckList2: [],
    repairPeopleList: [],
    isSelectNo: false,
    isSelectOther: false,
    title1: '',
    value1: [],
    title2: '',
    value2: '',
    value4: '',
    value5: [],
    sugggestArray: [
      // {
      //   name: '不平衡',
      //   id: '1',
      // },
      // {
      //   name: '不对中',
      //   id: '2',
      // },
      // {
      //   name: '轴承磨损',
      //   id: '3',
      // },
      // {
      //   name: '其他',
      //   id: '4',
      // }
    ]
  },

  onChange(field, e) {
    this.setData({
      [field]: e.detail.value
    })

    if(e.detail.value==2){
      this.setData({
        isSelectNo: true
      })
    }else{
      this.setData({
        isSelectNo: false
      })
    }

    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  onChange4(e) {
    this.onChange('value4', e)
  },

  onChange2(field, e) {
    const { value } = e.detail
    const data = this.data[field]
    const index = data.indexOf(value)
    const current = index === -1 ? [...data, value] : data.filter((n) => n !== value)

    this.setData({
      [field]: current,
    })
    // console.log(this.data.value5.find(v => v == 4))
    if (this.data.value5.find(v => v == 4)){
      this.setData({
        isSelectOther: true,
      })
    }else{
      this.setData({
        isSelectOther: false,
      })
    }

    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  onChange5(e) {
    this.onChange2('value5', e)
  },
  onClick1() {
    let options = this.data.suggestCheckList2;
    // debugger
    $wuxSelect('#wux-select1').open({
      value: this.data.value1,
      multiple: true,
      toolbar: {
        title: '请选择诊断建议',
        confirmText: '确定',
      },
      options: options,
      // options: [{
      //   title: '画画',
      //   value: '1',
      //   // color: 'positive',
      // },
      // {
      //   title: '打球',
      //   value: '2',
      //   // color: 'positive',
      // },
      // {
      //   title: '唱歌',
      //   value: '3',
      //   // color: 'positive',
      // },
      // {
      //   title: '游泳',
      //   value: '4',
      //   // color: 'positive',
      // },
      // {
      //   title: '健身',
      //   value: '5',
      //   // color: 'positive',
      // },
      // {
      //   title: '睡觉',
      //   value: '6',
      //   // color: 'positive',
      // },
      // ],
      onChange: (value, index, options) => {
        console.log('onChange', value, index, options)
        this.setData({
          value1: value,
          title1: index.map((n) => options[n].title),
        })
      },
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        this.setData({
          value1: value,
          title1: index.map((n) => options[n].title),
        })
      },
    })
  },

  onClick2() {
    let options = this.data.repairPeopleList;
    $wuxSelect('#wux-select2').open({
      value: this.data.value2,
      // multiple: true,
      toolbar: {
        title: '请选择指派人员',
        confirmText: '确定',
      },
      options: options,
      // options: [{
      //   title: '张三',
      //   value: '1',
      //   // color: 'positive',
      // },
      // {
      //   title: '李四',
      //   value: '2',
      //   // color: 'positive',
      // },
      // {
      //   title: '王五',
      //   value: '3',
      //   // color: 'positive',
      // },
      // {
      //   title: '赵六',
      //   value: '4',
      //   // color: 'positive',
      // },
      // {
      //   title: '刘名',
      //   value: '5',
      //   // color: 'positive',
      // },
      // {
      //   title: '朱八',
      //   value: '6',
      //   // color: 'positive',
      // },
      // ],
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

  open2Page(){
    // util.openPage("../../pages/alarmProcessingResult/index");
    debugger
    let flag_1 = true;
    let acceptIds = this.data.value5.filter(v => v!=4);//.map(v => v[0]);
    if (!(acceptIds && Array.isArray(acceptIds) && acceptIds.length > 0)) {
      flag_1 = false;
    }

    let flag_2 = true;
    let newFaultIds = this.data.value1;
    if (!(this.data.isSelectOther && newFaultIds && Array.isArray(newFaultIds) && newFaultIds.length > 0)) {
      flag_2 = false;
    }

    if (!(flag_1 || flag_2)) {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1000,
        color: '#f66',
        text: '请勾选诊断建议',
        success: () => console.log('请勾选诊断建议')
      })
      return;
    }
    if (!this.data.title2) {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1000,
        color: '#f66',
        text: '请选择维修人员',
        success: () => console.log('请选择维修人员')
      })
      return;
    }
    let param = {
      id: wx.getStorageSync('repairId'),
      newFaultIds: newFaultIds,
      acceptIds: acceptIds,
      processor: app.globalData.userInfo.realName,
      accendant: this.data.title2,
      processStatus: 0
    };
    // console.log(param);
    // return;
    //
    util.dealDeviceAlarm(param, res => {
      // debugger;
      // return;
      if (res.code === 0) {
        $wuxToast().show({
          type: 'text',
          duration: 1000,
          color: '#f66',
          text: '操作成功!',
          success: () => {
            app.globalData.listReload = true;
            let url = "../../pages/alarmProcessingResult/success";
            wx.redirectTo({
              url: url
            });
          }
        });
      }else if(res.code===4){
        wx.showModal({
          title: '提示',
          content: res.msg,
          success: (r) => {
            if(r.confirm){
              app.globalData.detailReload = true;
              app.globalData.listReload = true;
              wx.navigateBack();
            }

          }
        })
      }
    }, err => {

    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let suggestCheckList1 = wx.getStorageSync('suggestCheckList1')
    let suggestCheckList2 = wx.getStorageSync('suggestCheckList2')
    let repairPeopleList  = wx.getStorageSync('repairPeopleList')
    if(suggestCheckList1){
      suggestCheckList1 = JSON.parse(suggestCheckList1);
      suggestCheckList1 = suggestCheckList1.map(v => {return { name: v.faultName, id: v.id }});
      suggestCheckList1.push({
        name: '其他',
        id: '4',
      });
    // debugger;

      this.setData({
        sugggestArray: suggestCheckList1
      })
    }

    if (suggestCheckList2) {
      suggestCheckList2 = JSON.parse(suggestCheckList2);
      suggestCheckList2 = suggestCheckList2.map(v => { return { title: v.label, value: v.value } });
      // debugger;

      this.setData({
        suggestCheckList2: suggestCheckList2
      })
    }

    if (repairPeopleList) {
      repairPeopleList = JSON.parse(repairPeopleList);
      repairPeopleList = repairPeopleList.map(v => { return { title: v.label, value: v.value } });
      // debugger;

      this.setData({
        repairPeopleList: repairPeopleList
      })
    }

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