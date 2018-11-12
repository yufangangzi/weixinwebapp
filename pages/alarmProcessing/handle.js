// pages/alarmProcessing/alarmProcessing.js
//获取应用实例
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
    isSelectNo: false,
    isSelectOther: false,
    title1: '',
    value1: '',
    value4: '1',
    value5: ['1'],
    sugggestArray: [
      {
        name: '不平衡',
        id: '1',
      },
      {
        name: '不对中',
        id: '2',
      },
      {
        name: '轴承磨损',
        id: '3',
      },
      {
        name: '其他',
        id: '4',
      }
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
    $wuxSelect('#wux-select1').open({
      value: this.data.value1,
      multiple: true,
      toolbar: {
        title: '请选择诊断建议',
        confirmText: '确定',
      },
      options: [{
        title: '画画',
        value: '1',
        // color: 'positive',
      },
      {
        title: '打球',
        value: '2',
        // color: 'positive',
      },
      {
        title: '唱歌',
        value: '3',
        // color: 'positive',
      },
      {
        title: '游泳',
        value: '4',
        // color: 'positive',
      },
      {
        title: '健身',
        value: '5',
        // color: 'positive',
      },
      {
        title: '睡觉',
        value: '6',
        // color: 'positive',
      },
      ],
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

  open2Page(){
    util.openPage("../../pages/alarmProcessingResult/index");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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