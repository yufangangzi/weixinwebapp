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
    title2: '',
    value2: '',
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
    ],

    fileList: [{
      uid: 0,
      status: 'uploading',
      url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
    },
    {
      uid: 1,
      status: 'done',
      url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
    },
    {
      uid: 2,
      status: 'error',
      url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
    }
    ],
  },
  onImgChange(e) {
    console.log('onChange', e)
    const { file } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0,
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      this.setData({
        imageUrl: file.url,
      })
    }
  },
  onImgSuccess(e) {
    console.log('onSuccess', e)
  },
  onImgFail(e) {
    console.log('onFail', e)
  },
  onImgComplete(e) {
    console.log('onComplete', e)
    wx.hideLoading()
  },
  onImgProgress(e) {
    console.log('onProgress', e)
    this.setData({
      progress: e.detail.file.progress,
    })
  },
  onImgPreview(e) {
    console.log('onPreview', e)
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  onImgRemove(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            fileList: fileList.filter((n) => n.uid !== file.uid),
          })
        }
      },
    })
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

  onClick2() {
    $wuxSelect('#wux-select2').open({
      value: this.data.value1,
      // multiple: true,
      toolbar: {
        title: '请选择指派人员',
        confirmText: '确定',
      },
      options: [{
        title: '张三',
        value: '1',
        // color: 'positive',
      },
      {
        title: '李四',
        value: '2',
        // color: 'positive',
      },
      {
        title: '王五',
        value: '3',
        // color: 'positive',
      },
      {
        title: '赵六',
        value: '4',
        // color: 'positive',
      },
      {
        title: '刘名',
        value: '5',
        // color: 'positive',
      },
      {
        title: '朱八',
        value: '6',
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