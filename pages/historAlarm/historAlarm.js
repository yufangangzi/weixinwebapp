import { $stopWuxRefresher } from '../../dist/wux/dist/index'

const app = getApp();
const util = require('../../utils/util.js');
const imgUrl = app.globalData.imgUrl;
Page({
  data: {
    reloadFlag: false,
    itemsArr:[],
    unitArr:[], //装置单元数组
    codeArr: [], // 设备编号
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
        value: 'forks',
        groups: ['002'],
      },
      {
        type: 'text',
        label: '工单下发',
        value: 'forks',
        groups: ['003'],
      },
      {
        type: 'text',
        label: '已处理',
        value: 'forks',
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
        value: 'language',
        children: [{
          label: '系统警报',
          value: 'javascript',
        },
        {
          label: '人工上报',
          value: 'html',
        },],
      },
        {
          type: 'radio',
          label: '报警程度',
          value: 'language',
          children: [{
            label: '高报',
            value: 'javascript',
          },
          {
            label: '高高报',
            value: 'html',
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
          value: 'language',
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
    this.getRepos()
  },
  onShow() {
    console.log('页面切入前台了')
    if(this.data.reloadFlag){
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
            if (n.value === 'devUnit') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.devUnit = selected

            } else if (n.value === 'query') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.query = selected
            }
          })
        } else if (n.value === 'search') {
          params.sort = n.value

        }
      }
    })

    this.getRepos(params);
    this.getRelist(params);
  },
  getRepos(params = {}) {
    const language = params.language || 'javascript'
    const query = params.query || 'react'
    const q = `${query}+language:${language}`
    const data = Object.assign({
      q,
    }, params)

    wx.showLoading()
    // var res = { "code": 0, "msg": "OK", "result": { "pageNum": 1, "pageSize": 20, "size": 2, "orderBy": null, "startRow": 1, "endRow": 2, "total": 2, "pages": 1, "list": [{ "id": "1b665ef787384a4d84ba773cdc7fcbdd", "faultNume": null, "deviceId": "96397e0bebb1456b9a9b24a2c9f64114", "deviceCode": "2611-P104B", "deviceUnitId": "32fa79285a7c4a8d8abd812f313a1465", "deviceUnitName": null, "deviceUnitNumber": null, "alarmSeverity": 2, "alarmType": 1, "alarmTime": 1544784485000, "kpiFlag": 0, "channel": "6-1V", "accept": null, "processStatus": 0, "processor": null, "accendant": null, "accendantTime": null, "processTime": null, "reportStatus": null, "remark": null, "processResult": null, "picUrl": null, "faultPerformance": null, "createTime": 1545009554000, "updateTime": 1545009554000, "strAlarmSeverity": null, "faultOmenVOList": null, "faultInfoVOList": null, "accendantFault": null }, { "id": "1469e1943a684f5d971c47756907de9f", "faultNume": null, "deviceId": "3f72e4450a3c425badf915bb08aa3955", "deviceCode": "2111-P404B", "deviceUnitId": "5212beaf82794e74b6f6a3ffa0074497", "deviceUnitName": null, "deviceUnitNumber": null, "alarmSeverity": 2, "alarmType": 1, "alarmTime": 1544621834000, "kpiFlag": 0, "channel": "8-2V", "accept": null, "processStatus": 0, "processor": "", "accendant": "", "accendantTime": null, "processTime": null, "reportStatus": null, "remark": "", "processResult": "", "picUrl": "", "faultPerformance": "", "createTime": 1544670277000, "updateTime": 1544670277000, "strAlarmSeverity": null, "faultOmenVOList": null, "faultInfoVOList": null, "accendantFault": null }], "firstPage": 1, "prePage": 0, "nextPage": 0, "lastPage": 1, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [1] } }
    let param = {
      alarmSeverity: "",
      alarmType: "",
      pageNum: 1,
      pageSize: 20,
      processStatus: ""
    }
    // debugger
    util.alarmList(param, res => {
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
    // var res = { "code": 0, "msg": "OK", "result": [{ "id": "5212beaf82794e74b6f6a3ffa0074497", "unitName": "常减压", "menuDeviceList": ["2111-P230A/B/C", "2111-P460A/B", "2111-P430A/B", "2111-P452A/B", "2111-P330A/B", "2111-P403A/B", "2111-P303A/B", "2111-P402A/B", "2111-P404A/B", "2111-P311A/B", "2111-P453A/B", "2111-P302A/B", "2111-P301A/B", "2111-P312A/B"] }, { "id": "1ebc8f98169041019466e033e1749db6", "unitName": "催化裂化", "menuDeviceList": ["2411-K103A/B", "2411-P206A/B", "2411-P207A/B", "2411-P208A/B"] }, { "id": "32fa79285a7c4a8d8abd812f313a1465", "unitName": "延迟焦化", "menuDeviceList": ["2611-P101A/B", "2611-P105A/B", "2611-P104A/B", "2611-P102A/B", "2611-P206A/B", "2611-P106A/B"] }, { "id": "67082fec294b4c10974bfa3e2e6e43a4", "unitName": "蜡油加氢", "menuDeviceList": ["2314-P209A/B", "2314-P207A/B", "2314-P208A/B", "2314-P206A/B", "2314-P202A/B"] }, { "id": "38f3a7c75fce4a8ba060151d92d490a7", "unitName": "渣油加氢", "menuDeviceList": ["2315-P205A/B/C", "2315-P204A/B", "2315-P206A/B"] }, { "id": "971704cbe67c4002a9081920f2288f7e", "unitName": "柴油加氢", "menuDeviceList": ["2316-P204A/B", "2316-P203A/B/C"] }, { "id": "d318c6cd91ed4f7298b251bd13e50a54", "unitName": "煤油加氢", "menuDeviceList": ["2317-P202A/B", "2317-P203A/B"] }, { "id": "ebdaabb9fb8e4eeb8f352b4ffebb1f2b", "unitName": "连续重置", "menuDeviceList": ["2211-P403A/B", "2211-P404A/B"] }, { "id": "c5aaad41ec674b4abfb2a6989a16803e", "unitName": "汽油加氢", "menuDeviceList": ["2414-P231A/B"] }] }

    
    util.listMenu({}, res => {
      // 
      // return;
      if (res.code === 0) {
        debugger;
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
    this.setData({
      pageStyle: '',
    })
  },
})

// weui - media - box_appmsg