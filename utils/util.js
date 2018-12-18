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

// header拦截 wx.getStorageSync('token')
const request = obj => {
  let param = Object.assign({
    'header': {
      'identity-authentic-request-header': 
      wx.getStorageSync('token') || '3bda1ffe-e30e-4da9-969b-4e8468da475b'
    },
  }, obj);
  // console.log(param);
  // debugger
  wx.request(param);
}

const baseUrl = 'http://10.144.132.20:8005/';

// 获取警报详情
const deviceAlarmGet = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'deviceAlarm/getDetail?' + Object.entries(data).map(v => v[0] + '=' + encodeURIComponent(v[1])).join('&'),
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
    url: baseUrl + 'fault/listAll',
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

// 获取维修人列表
const accendantList = (data, successcb, failcb) => {
  request({
    url: baseUrl + 'user/accendantList',
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
    url: baseUrl + 'deviceMonitor/listChannel',
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
    url: baseUrl + 'deviceMonitor/trendChart',
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

module.exports = {
  timeformat: timeformat,
  deviceAlarmGet: deviceAlarmGet,
  faultListAll: faultListAll,
  accendantList: accendantList,
  listChannel: listChannel,
  trendChart: trendChart,
  openPage: openPage,
  formatTime: formatTime
}
