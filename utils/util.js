const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const openPage = url => {
  console.log('open page:', url);
  wx.navigateTo({
    url: url
  });
}

const timeformat = function (date, fmt) {
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  const week = {
    0: '/u65e5',
    1: '/u4e00',
    2: '/u4e8c',
    3: '/u4e09',
    4: '/u56db',
    5: '/u4e94',
    6: '/u516d'
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + '']);
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};

const limitsUnitId = (unitId) => {
  let limit = false;
  const list = wx.getStorageSync('quanzhouunitVOList') || [];
  list.forEach(item => {
    if (item.id === unitId) {
      limit = true;
    }
  });
  return limit;
};

// header拦截 wx.getStorageSync('token')
const request = obj => {
  let param = Object.assign({
    'header': {
      'identity-authentic-request-header': wx.getStorageSync('token') || ''
    },
  }, obj);
  // console.log(param);
  // debugger
  // 拦截器
  const successcb = param.success;
  param.success = res => {
    // debugger;
    if (res && res.data && (res.data.code == 10103 || res.data.code == 10104)){
      //登录状态失效，需重新登录
      // wxlogin();
      wx.redirectTo({
        url: '../../../../first/first',
      })
      // return;
    }
    if(successcb){
      successcb(res);
    }
  }
  wx.request(param);
}

const baseUrl = 'https://tiot.sinochem-tech.com/wxdev/';
const baseWebView = 'https://tiot.sinochem-tech.com/static/qzweapp/bigcharts-dev.html';
const wss = 'wss://tiot.sinochem-tech.com/wssdev/socketServer/';

// WX登录,拿code换登录
const wxlogin = (data, successcb, failcb) => {
  console.log('执行登录逻辑')
  // return;
  wx.login({
    success(res) {
      console.log(res);
      request({
        url: baseUrl + 'wxapp/wexinLogin',
        data: {code: res.code},
        // header: {},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          if (successcb) {
            successcb(res.data || res);
          }
        },
        fail: function (res) {
          if (failcb) {
            failcb(res);
          }
        },
        complete: function (res) { },
      })
    },
    fail (err) {
      console.log(err)
      console.log(33)
    }
  })
  
}

// WX绑定用户
const wxbind = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'wxapp/wexinBindAccount',
    data: data,
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}

// 获取警报详情
const deviceAlarmGet = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'weChatDeviceMonitor/getDetail?' + Object.entries(data).map(v => v[0] + '=' + encodeURIComponent(v[1])).join('&'),
    data: {},
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      if (successcb){
        successcb(res.data || res);
      }
    },
    fail: function(res) {
      if(failcb){
        failcb(res);
      }
    },
    complete: function(res) {},
  })
}

// 获取故障列表
const faultListAll = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'wechatAlarm/listAllFault',
    data: {},
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}

// 警报列表
const alarmList = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'wechatAlarm/list',
    data: data,
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}
// 设备列表
const listMenu = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'wechatAlarm/listMenu',
    data: data,
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}
// 获取维修人列表
const accendantList = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'wechatAlarm/accendantList',
    data: data,
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}

// 获取channel列表 1-1H 1-2V
const listChannel = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'weChatDeviceMonitor/listChannel',
    data: data,
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}

// 获取图谱数据
const trendChart = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'weChatDeviceMonitor/trendChart',
    data: data,
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}

// 获取时域波形图谱数据
const domainWaveformFigure = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'weChatDeviceMonitor/domainWaveformFigure',
    data: data,
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}

// 获取fft图谱数据
const fftFigure = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'weChatDeviceMonitor/fftFigure',
    data: data,
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}

// 未处理处理
const allNotAccept = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'wechatAlarm/allNotAccept',
    data: data,
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}

// 未处理采纳
const dealDeviceAlarm = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'wechatAlarm/dealDeviceAlarm',
    data: data,
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}

// 已处理重新编辑
const modifyDeviceAlarmDealInfo = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'deviceAlarm/modifyDeviceAlarmDealInfo',
    data: data,
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}


// 获取设备监测历史数据
const listHistoryData2 = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'weChatDeviceMonitor/listHistoryData',
    data: data,
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}

// 获取频域特征图数据
const listNewByGroup2 = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'weChatDeviceMonitor/listNewByGroup?deviceNo=' + data.deviceNo,
    data: {},
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}

// 获取设备监测数据
const listNewByGroup = (data, successcb, failcb) => {
  return new Promise((resolve, reject) => {
    request({
      url: baseUrl + 'weChatDeviceMonitor/listNewByGroup?deviceNo=' + data.deviceNo,
      data: data,
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        resolve(res.data || res)
      },
      fail: function () {
        reject('请求数据失败')
      },
      complete: function (res) { },
    })
  })
}
// 获取设备信息
const getByCode = (data, successcb, failcb) => {
  return new Promise((resolve, reject) => {
    request({
      url: baseUrl + 'wechatDevice/getByCode?code=' + data.code,
      data: data,
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        resolve(res.data || res)
      },
      fail: function () {
        reject('请求数据失败')
      },
      complete: function (res) { },
    })
  })
}

// 获取报警数据
const alarmList2 = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'wechatAlarm/alarmList',
    data: {},
    // header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (successcb) {
        successcb(res.data || res);
      }
    },
    fail: function (res) {
      if (failcb) {
        failcb(res);
      }
    },
    complete: function (res) { },
  })
}

module.exports = {
  baseUrl: baseUrl,
  timeformat: timeformat,
  limitsUnitId: limitsUnitId,
  deviceAlarmGet: deviceAlarmGet,
  faultListAll: faultListAll,
  alarmList: alarmList,
  listMenu: listMenu,
  accendantList: accendantList,
  listChannel: listChannel,
  trendChart: trendChart,
  domainWaveformFigure: domainWaveformFigure,
  fftFigure: fftFigure,
  listHistoryData2: listHistoryData2,
  listNewByGroup2: listNewByGroup2,
  alarmList2: alarmList2,
  wxlogin: wxlogin,
  wxbind: wxbind,
  allNotAccept: allNotAccept,
  dealDeviceAlarm: dealDeviceAlarm,
  modifyDeviceAlarmDealInfo: modifyDeviceAlarmDealInfo,
  openPage: openPage,
  formatTime: formatTime,
  baseWebView: baseWebView,
  listNewByGroup,
  getByCode,
  wss: wss
}
