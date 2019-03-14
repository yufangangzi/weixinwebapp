// pages/caselib/caselib.js
import { $stopWuxRefresher } from '../../dist/wux/dist/index'
const app = getApp();
const util = require('../../utils/util.js');
const imgUrl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '', //搜索的内容
    inParams: {
      deviceType: "", //设备
      faultType: "", //故障
      keywords: "",
      order: "desc",
      pageNum: 1,
      pageSize: 20,
      sort: ""
    },
    items: [{
      type: 'filter',
      label: '筛选',
      value: 'filter',
      children: [
        {
          type: 'radio',
          label: '排序',
          value: 'alarmItem1',
          children: [{
            label: '按时间发布',
            value: 'updateTime',
          },
          {
            label: '按阅读数量',
            value: 'readNums',
          },],
        },
        {
          type: 'radio',
          label: '设备',
          value: 'alarmItem2',
          children: [
          { label: '全部', value: '', },
            { label: '泵机', value: '泵机',},
            { label: '风机', value: '风机',},
            { label: '压缩机', value: '压缩机',},
            { label: '往复压缩机', value: '往复压缩机', },
            { label: '燃气轮机', value: '燃气轮机', },
            { label: '其他', value: '其他', },
          ],
        },
        {
          type: 'radio',
          label: '故障',
          value: 'devUnit',
          children: [
            { label: '全部', value: '', },
            { label: '不平衡', value: '不平衡', },
            { label: '不对中', value: '不对中', },
            { label: '磨碰故障', value: '磨碰故障', },
            { label: '轴承故障', value: '轴承故障', },
            { label: '传感器故障', value: '传感器故障', },
            { label: '监测系统故障', value: '监测系统故障', },
            { label: '轴弯曲', value: '轴弯曲', },
            { label: '振动超限', value: '振动超限', },
            { label: '松动故障', value: '松动故障', },
            { label: '其他', value: '其他', },
          ]


        }, // 装置单元
       
      ],
      groups: ['004'],
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageList();
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

  onChange(e) {
    const { checkedItems, items } = e.detail
    const params = {
      sort: "",
      deviceType: "", //设备
      faultType: "", //故障
    }
    let isCheck = false;
    let isReset = false;

    console.log(checkedItems, items)

    checkedItems.forEach((n) => {
      if (n.checked) {

        if (n.value === 'filter') {
          this.setData({ 'inputValue': '' })  // 切换标签清空搜索框

          n.children.filter((n) => n.selected).forEach((n) => {

            if (n.value === 'alarmItem1') {
              params.sort = n.children.find(v => { return v.checked }).value || ''
              isCheck = true;
            } else if (n.value === 'alarmItem2') {
              params.deviceType = n.children.find(v => { return v.checked }).value || ''
              isCheck = true;
            } else if (n.value === 'devUnit') {
              params.faultType = n.children.find(v => { return v.checked }).value || ''
              isCheck = true;
            }
          })
          if (!isCheck) {  //
            if (n.value === 'filter') {
              n.checked = false

              this.setData({
                'items[4].checked': false
              })
            }
            isReset = true;
          }

        } else if (n.value === 'search') {
        } else if (n.value === 'alls') {
          params.processStatus = ''

        } else if (n.value === 'state0') {
          // 未处理
          params.processStatus = '0'
          this.setData({ 'inputValue': '' })
        } else if (n.value === 'state1') {
          // 处理中
          params.processStatus = '1'
          this.setData({ 'inputValue': '' })
        } else if (n.value === 'state2') {
          // 已处理
          params.processStatus = '2'
          this.setData({ 'inputValue': '' })
          //  debugger
        } else { }
      }
    })

    if (isReset && !isCheck) {
      params.processStatus = '';
    }

    const data = Object.assign(this.data.inParams, params)
    this.setData({
      inParams: data
    })
     debugger
    this.getPageList(this.data.inParams);

  },

  /**
   *  获取页面列表数据
   */
  getPageList(params = {}) {
    // var res = { "code": 0, "msg": "OK", "result": { "total": 25, "size": 4, "pageSize": 10, "list": [{ "summary": "煤引风机是轧线加热炉燃烧系统设备，风机振动增大造成故障停机，会影响整个加热炉系统，从而造成事故停产。某产线加热炉煤引风机在更换完负荷端轴承后煤引风机是轧线加热炉燃烧系统设备，风机振动增大造成故障停机，会影响整个加热炉系统，从而造成事故停产。某产线加热炉煤引风机在更换完负荷端轴承后煤引风机是轧线加热炉燃烧系统设备，风机振动增大造成故障停机，会影响整个加热炉系统，从而造成事故停产。某产线加热炉煤引风机在更换完负荷端轴承后，", "readNums": 2, "createTime": "2019-03-08 13:41:30", "updateTime": "2019-03-08 13:46:06", "id": "XXfVW2kBGWl1Y7IQLwEn", "tag": "轴承型号", "title": "离心风机的轴承故障实例分析" }, { "summary": "离心输油泵作为一种典型的旋转设备，其工作的可靠性主要取决于转子的转动正常与否。因此，离心输油泵的大多数故障都与转子有关，不论哪一种振动故障都会在离心输油泵最敏感的部位，即转子上体现出来。离心输油泵除了转子本身具有较高的故障率外，与转子密切协作的轴承、机械密封等也是离心输油泵的故障高发部位。为更为深入全面地了解输油泵各种可能的故障形式及其故障原因，本文通过查阅", "readNums": 1, "createTime": "2019-02-28 10:49:34", "updateTime": "2019-02-28 11:16:44", "id": "zV7nUWkBf5wZQnWsvNN1", "tag": "离心泵,转子故障,轴承故障,密封故障", "title": "离心输油泵常见故障形式及其机理分析" }, { "summary": "诊断分析：外输4号泵启动后，振动较停机前有明显增大，主要能量变化为1X、2X、3X频，且主要能量集中在2X、3X频，如图1和图2所示。<!--\n /* Font Definitions */\n @font-face\n\t{font-family:宋体;\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;\n\tmso-font-alt:SimSun;\n\t", "readNums": 6, "createTime": "2019-02-28 10:15:01", "updateTime": "2019-02-28 10:41:31", "id": "TXfnUWkBGWl1Y7IQvAHD", "tag": "不对中故障", "title": "泵不对中故障分析" }], "pageNum": 1 } }
    util.listCaselib(params, res => {
      if (res.code === 0) {
        wx.hideLoading();
        var that = this;

        // debugger
        this.setData({
         relist: res.result.list.map((n) => {
              n.tag = Array.isArray(n.tag) ? n.tag.join(' ') : n.tag;
              n.summary = Array.isArray(n.summary) ? n.summary.join(' ') : n.summary;
            if(n.tag){
              n.tag = n.tag.replace(/,/g, " ")
            }
            return Object.assign({}, n, {
              title: n.title,
              tags: n.tag,
              summary: n.summary.substring(0, 50),
              readNums: n.readNums,
              total: res.result.total,
              pageNum: that.data.pageNum + 1
            })
          })
        })
      }
    }, err => {
    });
  },
  // 跳转到详情页
  go2page: function (e) {

    var index = parseInt(e.currentTarget.dataset.index);
    var bean = e.currentTarget.dataset.bean;
    console.log(index)
    
    var id = bean[index].id;
    wx.navigateTo({
      url: "../../pages/caselib/detail?id=" + id,
    })
  },
  //重置清空字段
  onReset(e) {
    this.setData({
      inParams: {
        deviceType: "", //设备
        faultType: "", //故障
        keywords: "",
        order: "desc",
        pageNum: 1,
        pageSize: 20,
        sort: ""
      },
    })
  },
  //搜索框文本内容显示
  inputBind: function (event) {
    this.setData({
      inputValue: event.detail.value
    })
    this.setData({
      'inParams.keywords': this.data.inputValue
    })

  },
  pageSearch: function (event) {
    this.getPageList(this.data.inParams);
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onTabItemTap(item) {
    // debugger;
    wx.setTabBarStyle({
      // color: '#FF0000',
      selectedColor: '#5878E4',
      // backgroundColor: '#0000FF',
      // borderStyle: 'white'
    })
  }
  
})
