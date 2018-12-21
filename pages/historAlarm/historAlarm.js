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
    filterParams: {
      alarmSeverity: '',  //警报来源
      alarmType: '',    //报警程度
      deviceCode: '',
      deviceUnitId: '',
      pageNum: 1,
      pageSize: 20,
      processStatus: ""  //
    },
    searchlog: imgUrl + "searchlog.png",
    alertArr: {
      '0': '低报',
      '1': '高报',
      '2': '高高报'
    },
    proStateArr: {
      '0': '未处理',
      '1': '工单下发',
      '2': '已处理'
    },
    items: [{
      checked: true,
      type: 'text',
      label: '全部',
      value: 'updated',
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
      label: '工单下发',
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
      groups: ['001', '002', '003'],
    },
    {
      type: 'search',
      label: '搜索',
      value: 'search',
      groups: ['005'],
    },
    ],
  },
  onLoad() {
    // 主要作用是从详情页修改状态返回后刷新列表
    this.setData({
      reloadFlag: true
    })
    let params = {
      alarmSeverity: "",
      alarmType: "",
      pageNum: 1,
      pageSize: 20,
      processStatus: ""
    }
    this.getRepos(params);
    this.getRelist();
  },
  onShow() {
    console.log('页面切入前台了')
    if (this.data.reloadFlag) {
      this.getRepos();
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
    const params = {}
    this.getRelist(); //设备编号
    console.log(checkedItems, items)

    checkedItems.forEach((n) => {
      if (n.checked) {

        if (n.value === 'updated') {
          const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
          params.sort = n.value
          params.order = selected
        } else if (n.value === 'stars') {
          params.sort = n.value
          params.order = n.sort === 1 ? 'asc' : 'desc'
        } else if (n.value === 'forks') {
          params.sort = n.value
        } else if (n.value === 'filter') {


          n.children.filter((n) => n.selected).forEach((n) => {

            if (n.value === 'alarmItem1') {
              params.sort = n.value
              this.data.filterParams.alarmType = n.children.find(v => { return v.checked }).value

            } else if (n.value === 'alarmItem2') {
              params.sort = n.value
              this.data.filterParams.alarmSeverity = n.children.find(v => { return v.checked }).value

            } else if (n.value === 'devUnit') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.devUnit = selected

              this.data.filterParams.deviceUnitId = n.children.find(v => { return v.checked }).value
            } else if (n.value === 'devCode') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.devUnit = selected

              this.data.filterParams.deviceCode = n.children.find(v => { return v.checked }).value
              // this.getRelist(params);
            } else if (n.value === 'query') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.query = selected
            }
          })


        } else if (n.value === 'search') {
          params.sort = n.value
        } else if (n.value === 'state0') {
          // 未处理
          let params = {
            alarmSeverity: "",
            alarmType: "",
            pageNum: 1,
            pageSize: 20,
            processStatus: "0"
          }
          this.getRepos(params);
        } else if (n.value === 'state1') {
          // 工单下发
          let params = {
            alarmSeverity: "",
            alarmType: "",
            pageNum: 1,
            pageSize: 20,
            processStatus: "1"
          }
          this.getRepos(params);
        } else if (n.value === 'state2') {
          // 已处理
          let params = {
            alarmSeverity: "",
            alarmType: "",
            pageNum: 1,
            pageSize: 20,
            processStatus: "2"
          }
          this.getRepos(params);
        }
      }
    })

    // this.getRepos(params);
    // this.getRelist(params);
  },
  getRepos(params = {}) {
    const language = params.language || 'javascript'
    const query = params.query || 'react'
    const q = `${query}+language:${language}`
    const data = Object.assign({
      q,
    }, params)

    wx.showLoading()
    util.alarmList(params, res => {
      // debugger;
      // return;
      if (res.code === 0) {
        wx.hideLoading()

        this.setData({
          repos: res.result.list.map((n) => Object.assign({}, n, {
            date: "报警时间:" + util.timeformat(new Date(n.alarmTime)).substr(5, 14),
            alarmSeverity: this.data.alertArr[n.alarmSeverity],
            processStatus: this.data.proStateArr[n.processStatus],
          })),
        })
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
  getRelist(params = {}) {
    util.listMenu(params, res => {

      if (res.code === 0) {
        // debugger;
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
  //筛选确认
  onConfirm: function (e) {
    let alarmSeverity = "";
    let alarmType = "";
    let deviceCode = "";
    let deviceUnitId = "";

    let params = {
      alarmSeverity: alarmSeverity,  //警报来源
      alarmType: alarmType,    //报警程度
      deviceCode: deviceCode,
      deviceUnitId: deviceUnitId,
      pageNum: 1,
      pageSize: 20,
      processStatus: ""  //

    }
    // this.getRepos(params);
  },
  onOpen(e) {

    this.setData({
      pageStyle: 'height: 100%; overflow: hidden',
    })
  },
  onClose(e) {
    this.getRepos(this.data.filterParams);

    this.setData({
      pageStyle: '',
    })
  },
})

// weui - media - box_appmsg