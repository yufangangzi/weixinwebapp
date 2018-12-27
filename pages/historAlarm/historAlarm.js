import { $stopWuxRefresher } from '../../dist/wux/dist/index'

const app = getApp();
const util = require('../../utils/util.js');
const imgUrl = app.globalData.imgUrl;
Page({
  data: {
    reloadFlag: false,
    itemsArr: [],
    unitArr: [], //装置单元数组
    codeArr: [], // 设备编号
    inputValue: '', //搜索的内容
    reposParams: {
      alarmSeverity: '',  //警报来源
      alarmType: '',    //报警程度
      deviceCode: '',
      deviceUnitId: '',
      pageNum: 1,
      pageSize: 30,
      processStatus: ""  //
    },
    
    filterParams: {  //单元
     
    },
    total: 0,//分页总数
　　pageNum: 0,//分页记录数pageNum
　　pageSize: 30,//分页大小
　　hasmoreData: true,//更多数据
　　hiddenloading: true,//加载中
    searchlog: imgUrl + "search.png",
    alertArr: {
      '0': '低报',
      '1': '高报',
      '2': '高高报'
    },
    proStateArr: {
      '0': '未处理',
      '1': '处理中',
      '2': '已处理'
    },
    items: [{
      checked: true,
      type: 'text',
      label: '全部',
      value: 'alls',
      children: [
      ],
      groups: ['001'],
    },
    {
      type: 'text',
      label: '未处理',
      value: 'state0',
      groups: ['002'],
    },
    {
      type: 'text',
      label: '处理中',
      value: 'state1',
      groups: ['003'],
    },
    {
      type: 'text',
      label: '已处理',
      value: 'state2',
      groups: ['004'],
    },

    {
      type: 'filter',
      label: '筛选',
      value: 'filter',
      children: [
        {
          type: 'radio',
          label: '警报来源',
          value: 'alarmItem1',
          children: [{
            label: '系统警报',
            value: '1',
          },
          {
            label: '人工上报',
            value: '2',
          },],
        },
        {
          type: 'radio',
          label: '报警程度',
          value: 'alarmItem2',
          children: [{
            label: '高报',
            value: '1',
          },
          {
            label: '高高报',
            value: '2',
          },
          ],
        },
        {
          type: 'radio',
          label: '装置单元',
          value: 'devUnit',
          children: []


        }, // 装置单元
        {
          type: 'radio',
          label: '设备编号',
          value: 'devCode',
          children: [],
        }, // 设备编号
      ],
      groups: ['001', '002', '003','004'],
    },
    
    ],
  },
  onLoad() {
    // 主要作用是从详情页修改状态返回后刷新列表
    this.setData({
      reloadFlag: true
    })
    this.getRepos(this.data.reposParams);
    this.getFiterList();
  },
  onReachBottom: function () {
　　　　console.log('加载更多')

　　　　this.setData({ hiddenloading: false })
    　　this.getRepos(this.data.reposParams);
  　　},
  onShow() {
    console.log('页面切入前台了')
    if (this.data.reloadFlag) {
      if (app.globalData.listReload) {
        this.getRepos(this.data.reposParams);
        app.globalData.listReload = false;
      }
    }
  },
  onPulling() {
    console.log('onPulling')
  },
  onRefresh() {
    console.log('onRefresh')
    setTimeout(() => {
      // this.setData({
      //   items: [{
      //     title: new Date,
      //     content: '星球地球++',
      //   }, ...this.data.items],
      // })

      $stopWuxRefresher()
    }, 2000)
  },
  onChange(e) {
    const { checkedItems, items } = e.detail
    const params = {
      alarmSeverity: '',  //警报来源
      alarmType: '',    //报警程度
      deviceCode: '',
      deviceUnitId: '',
    }
    let isCheck = false;
    // this.getFiterList(); //设备编号
    console.log(checkedItems, items)

    checkedItems.forEach((n) => {
      if (n.checked) {

         if (n.value === 'filter') {
           this.setData({ 'inputValue': '' })  // 切换标签清空搜索框

          n.children.filter((n) => n.selected).forEach((n) => {

            if (n.value === 'alarmItem1') {
              params.alarmType = n.children.find(v => { return v.checked }).value || ''
              isCheck = true;
            } else if (n.value === 'alarmItem2') {
              params.alarmSeverity = n.children.find(v => { return v.checked }).value || ''
              isCheck = true;
            } else if (n.value === 'devUnit') {
              params.deviceUnitId = n.children.find(v => { return v.checked }).value || ''
              isCheck = true;
            } else if (n.value === 'devCode') {
              params.deviceCode = n.children.find(v => { return v.checked }).value || ''
              isCheck = true;

            } 
          })
          if(!isCheck){  //
            if (n.value === 'filter') {
              n.checked = false

              this.setData({
                'items[4].checked': false
              })
            }
          }

        }else if (n.value === 'search') {
        } else if (n.value === 'alls') {
           params.processStatus = ''
           
        } else if (n.value === 'state0') {
          // 未处理
           params.processStatus = '0'
           this.setData({'inputValue': ''})
        } else if (n.value === 'state1') {
          // 处理中
           params.processStatus = '1'
           this.setData({ 'inputValue': '' })
        } else if (n.value === 'state2') {
          // 已处理
           params.processStatus = '2'
           this.setData({ 'inputValue': '' })
          //  debugger
        }
      }
    })
  
    const data = Object.assign(this.data.reposParams,params)
    this.setData({
      reposParams: data
    })
    // debugger
    this.getRepos(this.data.reposParams);
  
  },
  getRepos(params = {}) {
    // const language = params.language || 'javascript'
    // const query = params.query || 'react'
    // const q = `${query}+language:${language}`
    // const data = Object.assign({
    //   q,
    // }, params)

    wx.showLoading();
  
     var that = this;
//     if (that.data.hasmoreData == false) {
// 　　　　　　that.setData({ hiddenloading: true })
//           wx.hideLoading()
// 　　　　　　return;
// 　　　　}
//筛选模糊查询
    const serchData = Object.assign({}, params);
    if (serchData.deviceCode && serchData.deviceCode.indexOf('/') > -1) {
      this.setData({ 'reposParams.deviceCode': serchData.deviceCode.substring(0, serchData.deviceCode.indexOf('/') - 1)})
    }
    
    util.alarmList(params, res => {
      
      if (res.code === 0) {
        wx.hideLoading()

        that.setData({
          repos: res.result.list.map((n) => Object.assign({}, n, {
            date: "报警时间:" + util.timeformat(new Date(n.alarmTime)).substr(5, 14),
            alarmSeverity: that.data.alertArr[n.alarmSeverity],
            processStatus: that.data.proStateArr[n.processStatus],
            total: res.result.total,
            pageNum: that.data.pageNum + 1
          })),
        })
        if (that.data.total <= 0 || that.data.pageNum * that.data.pageSize >= that.data.total) {
　　　　　　　　that.setData({ hasmoreData: false, hiddenloading: true })
　　　　　　}
      }
    }, err => {

    });
    // wx.request({
    // url: app.globalData.imgUrl,
    // data,
    // success: (res) => {
    //   console.log(res)


    // },
    // })

  },
  // 获取筛选接口数据
  getFiterList(params = {}) {
    util.listMenu(params, res => {

      if (res.code === 0) {
        wx.hideLoading()
        var ka = this.data.items[4].children[2].children;
        
        var k1 = [];
        for (let index = 0; index < res.result.length; index += 1) {
          const item = res.result[index].menuDeviceList;
          for (let j = 0; j < item.length; j++) {
            const codeArrs = item[j]
            k1.push(codeArrs);
          }

        }
        // debugger
        console.log("codeArr--" + this.data.codeArr);
        this.setData({
          relist: res.result.map((n) => Object.assign({}, n, {
            type: 'ghost',
            name: n.unitName,
            id: n.id.toString()
          })),

          'items[4].children[2].children': res.result.map((n) => Object.assign({}, n, {
            label: n.unitName,
            value: n.id.toString(),
          })),
          // 设备编号取值
          'items[4].children[3].children': k1.map((n) => Object.assign({}, n, {
            label: n,
            value: n,
          })),
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

    // if (index) {
    // var id = this.data.repos[index].deviceId;
    // var code = this.data.repos[index].deviceCode;
    var id = bean[index].id;
    var code = bean[index].deviceCode;
    wx.navigateTo({
      url: "../../pages/alarmProcessing/detail?id=" + id + '&code=' + code,
    })
    // }
  },
  
  onOpen(e) {

    this.setData({
      pageStyle: 'height: 100%; overflow: hidden',
    })
  },
  onClose(e) {
    this.getRepos(this.data.reposParams);
    
    this.setData({
      pageStyle: '',
    })
  },
  //重置清空字段
  onReset(e){
    this.setData({
      reposParams: {
        alarmSeverity: '',  //警报来源
        alarmType: '',    //报警程度
        deviceCode: '',
        deviceUnitId: '',
        pageNum: 1,
        pageSize: 30,
        processStatus: ""  //
      },
    })

    
  },
  //搜索框文本内容显示
  inputBind: function (event) {
    this.setData({
      inputValue: event.detail.value
    })
    console.log('bindInput' + this.data.inputValue)
    this.setData({
      'reposParams.deviceCode': this.data.inputValue
    })
    
  },
  pageSearch: function (event) {
    // this.data.reposParams.deviceCode = this.data.inputValue
    
  
    this.getRepos(this.data.reposParams);
    debugger
  }
  
})

