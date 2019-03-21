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
    loadMoreFlag: {},
    switchIndex: 0,
    total: 0,//分页总数
    pageNum: 0,//分页记录数pageNum
    pageSize: 10,//分页大小
    hasmoreData: true,//更多数据
    hiddenloading: true,//加载中
    isResult: true,
    inParams: {
      deviceType: "", //设备
      faultType: "", //故障
      keywords: "",
      order: "desc",
      pageNum: 1,
      pageSize: 10,
      sort: ""
    },
    items: [{
      checked: false,
      type: 'filter',
      label: '筛选',
      value: 'filter',
      children: [
        {
          type: 'radio',
          label: '排序',
          value: 'alarmItem1',
          children: [{
            label: '按发布时间',
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
      groups: ['001'],
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
    //加载更多
    this.setData({
      hasmoreData: true,
      hiddenloading: false,
      'inParams.pageNum': this.data.inParams.pageNum + 1
    })
    this.getPageList2(this.data.inParams);
  },

  onChange(e) {
    const { checkedItems, items } = e.detail
    const params = {
      sort: "",
      deviceType: "", //设备
      faultType: "", //故障
      keywords: "",  // 重置之后返回不带查询条件
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
                'items[0].checked': false
              })
            }
            isReset = true;
          }

        } else if (n.value === 'search') {
        } else if (n.value === 'alls') {
          params.processStatus = ''

        }else { }
      }
    })

    if (isReset && !isCheck) {
      params.processStatus = '';
    }
    

    const data = Object.assign(this.data.inParams, params)
    this.setData({
      inParams: data
    })
    //  debugger
    this.getPageList(this.data.inParams);

  },

  /**
   *  获取页面列表数据
   */
  getPageList(params = {}) {
    this.setData({
      hasmoreData: true,
      hiddenloading: true,
      'inParams.pageNum': 1
    })
    this.topPosBack = true; //滑到底部后筛选返回遮挡顶部
    this.getPageList2(this.data.inParams);

  },
  getPageList2(params = {}) {
        wx.hideLoading();
        var that = this;
    if (that.data.isResult == false) {
      that.setData({ isResult: true })
    }
    util.listCaselib(params, res => {
      if (this.topPosBack) {
        setTimeout(() => {
          wx.pageScrollTo({
            scrollTop: 0
          });
          this.topPosBack = false;
        }, 50);
      }
      if (res.code === 0) {

        if (that.data.inParams.pageNum < 2) {
            this.setData({
            relist: res.result.list.map((n) => {
                  n.tag = Array.isArray(n.tag) ? n.tag.join(' ') : n.tag;
                  n.summary = Array.isArray(n.summary) ? n.summary.join(' ') : n.summary;
                if(n.tag){
                  n.tag = n.tag.replace(/,/g, " ")
                }
              n.title = this.convertHtmlToText(n.title);
              n.tag = this.convertHtmlToText(n.tag);
              n.summary = this.convertHtmlToText(n.summary);
                return Object.assign({}, n, {
                  title: n.title,
                  tags: n.tag.split(' '),
                  summary: n.summary.substring(0, 50),
                  readNums: n.readNums,
                  total: res.result.total,
                  pageNum: that.data.pageNum + 1
                })
              })
            })
        }else{
          let appendList = that.data.relist;
          appendList.push(...res.result.list.map((n) => {
            n.tag = Array.isArray(n.tag) ? n.tag.join(' ') : n.tag;
            n.summary = Array.isArray(n.summary) ? n.summary.join(' ') : n.summary;
            if (n.tag) {
              n.tag = n.tag.replace(/,/g, " ")
            }
            n.title = this.convertHtmlToText(n.title);
            n.tag = this.convertHtmlToText(n.tag);
            n.summary = this.convertHtmlToText(n.summary);
            return Object.assign({}, n, {
              title: n.title,
              tags: n.tag.split(' '),
              summary: n.summary.substring(0, 50),
              readNums: n.readNums,
              total: res.result.total,
              pageNum: that.data.pageNum + 1
            })
          }));
          that.setData({
            relist: appendList
          })
        }
        // debugger;
        if (that.data.inParams.pageNum < 2 && res.result.list.length == 0) {
          that.setData({ isResult: false })
          return;
        }
        
        if (that.data.inParams.pageNum >= Math.ceil((res.result.total) / (res.result.pageSize))) {
          that.setData({ hasmoreData: false, hiddenloading: true })
        }
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
    setTimeout(() => {
      this.getPageList(); // 阅读数返回增加
    }, 1000);
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
  convertHtmlToText: function convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '\r\n');
    returnText = returnText.replace(/<\/li>/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, '  *  ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    //-- remove BR tags and replace them with line break
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

    //-- remove P and A tags but preserve what's inside of them
    returnText = returnText.replace(/<p.*?>/gi, "\r\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g, '');

    //-- get rid of html-encoded characters:
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');

    return returnText;
  },
  onPulling() {
    console.log('onPulling')
  },
  onRefresh() {
    console.log('onRefresh')
    setTimeout(() => {
      this.getPageList(this.data.inParams);
      $stopWuxRefresher()
    }, 1500)
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


