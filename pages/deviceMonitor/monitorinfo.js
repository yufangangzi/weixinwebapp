const monitorData = (data, channelnum) => {
  let sensorList = {};
  let deviceNoList = [];
  let reportTime = '';
  let list = Object.keys(data);
  list.forEach(key => {
    let obj = {
      deviceNo: key,
      reportTime: '',
      channelnums: channelnum,
      sensor1h: {
        title: '传感器 1-1H',
        titleShow: '1-1H',
        speedTitle: '1-1H',
        accelTitle: '1-1H',
        createTime: '',
        speed: '',
        accel: '',
        speedseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        },
        accelseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        }
      },
      sensor2v: {
        title: '传感器 2-1V',
        titleShow: '2-1V',
        speedTitle: '2-1V',
        accelTitle: '2-1V',
        createTime: '',
        speed: '',
        accel: '',
        speedseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        },
        accelseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        }
      },
      sensor3h: {
        title: '传感器 3-2H',
        titleShow: '3-2H',
        speedTitle: '3-2H',
        accelTitle: '3-2H',
        createTime: '',
        speed: '',
        accel: '',
        speedseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        },
        accelseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        }
      },
      sensor4v: {
        title: '传感器 4-2V',
        titleShow: '4-2V',
        speedTitle: '4-2V',
        accelTitle: '4-2V',
        createTime: '',
        speed: '',
        accel: '',
        speedseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        },
        accelseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        }
      },
      sensor5h: {
        title: '传感器 5-3H',
        titleShow: '5-3H',
        speedTitle: '5-3H',
        accelTitle: '5-3H',
        createTime: '',
        speed: '',
        accel: '',
        speedseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        },
        accelseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        }
      },
      sensor6v: {
        title: '传感器 6-3V',
        titleShow: '6-3V',
        speedTitle: '6-3V',
        accelTitle: '6-3V',
        createTime: '',
        speed: '',
        accel: '',
        speedseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        },
        accelseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        }
      },
      sensor7h: {
        title: '传感器 7-4H',
        titleShow: '7-4H',
        speedTitle: '7-4H',
        accelTitle: '7-4H',
        createTime: '',
        speed: '',
        accel: '',
        speedseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        },
        accelseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        }
      },
      sensor8v: {
        title: '传感器 8-4V',
        titleShow: '8-4V',
        speedTitle: '8-4V',
        accelTitle: '8-4V',
        createTime: '',
        attribute: '',
        speed: '',
        accel: '',
        speedseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        },
        accelseries: {
          xAxis: ['0-0.3X', '0.3-0.5X', '0.5X', '1X', '2X', '3X', '3-5X', '5-10X'],
          yAxis: []
        }
      }
    };
    const deviceinfo = data[key];
    if (!Array.isArray(deviceinfo)) {
      return;
    }
    // obj.channelnums = deviceinfo.length / 2;
    let status = data.status[key];
    deviceinfo.forEach(item => {
      const index = item.channel.indexOf('-');
      const channelNum = item.channel.slice(index + 1);
      // 不取峰峰值，改为取validValue 181203ylj
      item.peakToPeakValue = Number(item.validValue).toFixed(2) || 0;
      if (channelNum === '1H' && item.attribute === 'speed') {
        obj.sensor1h.speed = item.peakToPeakValue;
        obj.sensor1h.title = '传感器' + item.channel;
        obj.sensor1h.titleShow = item.channel;
        obj.sensor1h.speedTitle = item.channel;
        obj.sensor1h.accelTitle = item.channel;
        obj.sensor1h.speedseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor1h.speedseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor1h.speedseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor1h.speedseries.yAxis.push(item.oneDegree);
        obj.sensor1h.speedseries.yAxis.push(item.twoDegree);
        obj.sensor1h.speedseries.yAxis.push(item.threeDegree);
        obj.sensor1h.speedseries.yAxis.push(item.fiveDegree);
        obj.sensor1h.speedseries.yAxis.push(item.tenDegree);
        obj.sensor1h.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '1H' && item.attribute === 'acceleration') {
        obj.sensor1h.accel = item.peakToPeakValue;
        obj.sensor1h.title = '传感器' + item.channel;
        obj.sensor1h.titleShow = item.channel;
        obj.sensor1h.speedTitle = item.channel;
        obj.sensor1h.accelTitle = item.channel;
        obj.sensor1h.accelseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor1h.accelseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor1h.accelseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor1h.accelseries.yAxis.push(item.oneDegree);
        obj.sensor1h.accelseries.yAxis.push(item.twoDegree);
        obj.sensor1h.accelseries.yAxis.push(item.threeDegree);
        obj.sensor1h.accelseries.yAxis.push(item.fiveDegree);
        obj.sensor1h.accelseries.yAxis.push(item.tenDegree);
        obj.sensor1h.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '1V' && item.attribute === 'speed') {
        obj.sensor2v.speed = item.peakToPeakValue;
        obj.sensor2v.title = '传感器' + item.channel;
        obj.sensor2v.titleShow = item.channel;
        obj.sensor2v.speedTitle = item.channel;
        obj.sensor2v.accelTitle = item.channel;
        obj.sensor2v.speedseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor2v.speedseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor2v.speedseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor2v.speedseries.yAxis.push(item.oneDegree);
        obj.sensor2v.speedseries.yAxis.push(item.twoDegree);
        obj.sensor2v.speedseries.yAxis.push(item.threeDegree);
        obj.sensor2v.speedseries.yAxis.push(item.fiveDegree);
        obj.sensor2v.speedseries.yAxis.push(item.tenDegree);
        obj.sensor2v.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '1V' && item.attribute === 'acceleration') {
        obj.sensor2v.accel = item.peakToPeakValue;
        obj.sensor2v.title = '传感器' + item.channel;
        obj.sensor2v.titleShow = item.channel;
        obj.sensor2v.speedTitle = item.channel;
        obj.sensor2v.accelTitle = item.channel;
        obj.sensor2v.accelseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor2v.accelseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor2v.accelseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor2v.accelseries.yAxis.push(item.oneDegree);
        obj.sensor2v.accelseries.yAxis.push(item.twoDegree);
        obj.sensor2v.accelseries.yAxis.push(item.threeDegree);
        obj.sensor2v.accelseries.yAxis.push(item.fiveDegree);
        obj.sensor2v.accelseries.yAxis.push(item.tenDegree);
        obj.sensor2v.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '2H' && item.attribute === 'speed') {
        obj.sensor3h.speed = item.peakToPeakValue;
        obj.sensor3h.title = '传感器' + item.channel;
        obj.sensor3h.titleShow = item.channel;
        obj.sensor3h.speedTitle = item.channel;
        obj.sensor3h.accelTitle = item.channel;
        obj.sensor3h.speedseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor3h.speedseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor3h.speedseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor3h.speedseries.yAxis.push(item.oneDegree);
        obj.sensor3h.speedseries.yAxis.push(item.twoDegree);
        obj.sensor3h.speedseries.yAxis.push(item.threeDegree);
        obj.sensor3h.speedseries.yAxis.push(item.fiveDegree);
        obj.sensor3h.speedseries.yAxis.push(item.tenDegree);
        obj.sensor3h.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '2H' && item.attribute === 'acceleration') {
        obj.sensor3h.accel = item.peakToPeakValue;
        obj.sensor3h.title = '传感器' + item.channel;
        obj.sensor3h.titleShow = item.channel;
        obj.sensor3h.speedTitle = item.channel;
        obj.sensor3h.accelTitle = item.channel;
        obj.sensor3h.accelseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor3h.accelseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor3h.accelseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor3h.accelseries.yAxis.push(item.oneDegree);
        obj.sensor3h.accelseries.yAxis.push(item.twoDegree);
        obj.sensor3h.accelseries.yAxis.push(item.threeDegree);
        obj.sensor3h.accelseries.yAxis.push(item.fiveDegree);
        obj.sensor3h.accelseries.yAxis.push(item.tenDegree);
        obj.sensor3h.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '2V' && item.attribute === 'speed') {
        obj.sensor4v.speed = item.peakToPeakValue;
        obj.sensor4v.title = '传感器' + item.channel;
        obj.sensor4v.titleShow = item.channel;
        obj.sensor4v.speedTitle = item.channel;
        obj.sensor4v.accelTitle = item.channel;
        obj.sensor4v.speedseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor4v.speedseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor4v.speedseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor4v.speedseries.yAxis.push(item.oneDegree);
        obj.sensor4v.speedseries.yAxis.push(item.twoDegree);
        obj.sensor4v.speedseries.yAxis.push(item.threeDegree);
        obj.sensor4v.speedseries.yAxis.push(item.fiveDegree);
        obj.sensor4v.speedseries.yAxis.push(item.tenDegree);
        obj.sensor4v.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '2V' && item.attribute === 'acceleration') {
        obj.sensor4v.accel = item.peakToPeakValue;
        obj.sensor4v.title = '传感器' + item.channel;
        obj.sensor4v.titleShow = item.channel;
        obj.sensor4v.speedTitle = item.channel;
        obj.sensor4v.accelTitle = item.channel;
        obj.sensor4v.accelseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor4v.accelseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor4v.accelseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor4v.accelseries.yAxis.push(item.oneDegree);
        obj.sensor4v.accelseries.yAxis.push(item.twoDegree);
        obj.sensor4v.accelseries.yAxis.push(item.threeDegree);
        obj.sensor4v.accelseries.yAxis.push(item.fiveDegree);
        obj.sensor4v.accelseries.yAxis.push(item.tenDegree);
        obj.sensor4v.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '3H' && item.attribute === 'speed') {
        obj.sensor5h.speed = item.peakToPeakValue;
        obj.sensor5h.title = '传感器' + item.channel;
        obj.sensor5h.titleShow = item.channel;
        obj.sensor5h.speedTitle = item.channel;
        obj.sensor5h.accelTitle = item.channel;
        obj.sensor5h.speedseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor5h.speedseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor5h.speedseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor5h.speedseries.yAxis.push(item.oneDegree);
        obj.sensor5h.speedseries.yAxis.push(item.twoDegree);
        obj.sensor5h.speedseries.yAxis.push(item.threeDegree);
        obj.sensor5h.speedseries.yAxis.push(item.fiveDegree);
        obj.sensor5h.speedseries.yAxis.push(item.tenDegree);
        obj.sensor5h.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '3H' && item.attribute === 'acceleration') {
        obj.sensor5h.accel = item.peakToPeakValue;
        obj.sensor5h.title = '传感器' + item.channel;
        obj.sensor5h.titleShow = item.channel;
        obj.sensor5h.speedTitle = item.channel;
        obj.sensor5h.accelTitle = item.channel;
        obj.sensor5h.accelseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor5h.accelseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor5h.accelseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor5h.accelseries.yAxis.push(item.oneDegree);
        obj.sensor5h.accelseries.yAxis.push(item.twoDegree);
        obj.sensor5h.accelseries.yAxis.push(item.threeDegree);
        obj.sensor5h.accelseries.yAxis.push(item.fiveDegree);
        obj.sensor5h.accelseries.yAxis.push(item.tenDegree);
        obj.sensor5h.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '3V' && item.attribute === 'speed') {
        obj.sensor6v.speed = item.peakToPeakValue;
        obj.sensor6v.title = '传感器' + item.channel;
        obj.sensor6v.titleShow = item.channel;
        obj.sensor6v.speedTitle = item.channel;
        obj.sensor6v.accelTitle = item.channel;
        obj.sensor6v.speedseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor6v.speedseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor6v.speedseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor6v.speedseries.yAxis.push(item.oneDegree);
        obj.sensor6v.speedseries.yAxis.push(item.twoDegree);
        obj.sensor6v.speedseries.yAxis.push(item.threeDegree);
        obj.sensor6v.speedseries.yAxis.push(item.fiveDegree);
        obj.sensor6v.speedseries.yAxis.push(item.tenDegree);
        obj.sensor6v.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '3V' && item.attribute === 'acceleration') {
        obj.sensor6v.accel = item.peakToPeakValue;
        obj.sensor6v.title = '传感器' + item.channel;
        obj.sensor6v.titleShow = item.channel;
        obj.sensor6v.speedTitle = item.channel;
        obj.sensor6v.accelTitle = item.channel;
        obj.sensor6v.accelseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor6v.accelseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor6v.accelseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor6v.accelseries.yAxis.push(item.oneDegree);
        obj.sensor6v.accelseries.yAxis.push(item.twoDegree);
        obj.sensor6v.accelseries.yAxis.push(item.threeDegree);
        obj.sensor6v.accelseries.yAxis.push(item.fiveDegree);
        obj.sensor6v.accelseries.yAxis.push(item.tenDegree);
        obj.sensor6v.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '4H' && item.attribute === 'speed') {
        obj.sensor7h.speed = item.peakToPeakValue;
        obj.sensor7h.title = '传感器' + item.channel;
        obj.sensor7h.titleShow = item.channel;
        obj.sensor7h.speedTitle = item.channel;
        obj.sensor7h.accelTitle = item.channel;
        obj.sensor7h.speedseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor7h.speedseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor7h.speedseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor7h.speedseries.yAxis.push(item.oneDegree);
        obj.sensor7h.speedseries.yAxis.push(item.twoDegree);
        obj.sensor7h.speedseries.yAxis.push(item.threeDegree);
        obj.sensor7h.speedseries.yAxis.push(item.fiveDegree);
        obj.sensor7h.speedseries.yAxis.push(item.tenDegree);
        obj.sensor7h.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '4H' && item.attribute === 'acceleration') {
        obj.sensor7h.accel = item.peakToPeakValue;
        obj.sensor7h.title = '传感器' + item.channel;
        obj.sensor7h.titleShow = item.channel;
        obj.sensor7h.speedTitle = item.channel;
        obj.sensor7h.accelTitle = item.channel;
        obj.sensor7h.accelseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor7h.accelseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor7h.accelseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor7h.accelseries.yAxis.push(item.oneDegree);
        obj.sensor7h.accelseries.yAxis.push(item.twoDegree);
        obj.sensor7h.accelseries.yAxis.push(item.threeDegree);
        obj.sensor7h.accelseries.yAxis.push(item.fiveDegree);
        obj.sensor7h.accelseries.yAxis.push(item.tenDegree);
        obj.sensor7h.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '4V' && item.attribute === 'speed') {
        obj.sensor8v.speed = item.peakToPeakValue;
        obj.sensor8v.title = '传感器' + item.channel;
        obj.sensor8v.titleShow = item.channel;
        obj.sensor8v.speedTitle = item.channel;
        obj.sensor8v.accelTitle = item.channel;
        obj.sensor8v.speedseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor8v.speedseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor8v.speedseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor8v.speedseries.yAxis.push(item.oneDegree);
        obj.sensor8v.speedseries.yAxis.push(item.twoDegree);
        obj.sensor8v.speedseries.yAxis.push(item.threeDegree);
        obj.sensor8v.speedseries.yAxis.push(item.fiveDegree);
        obj.sensor8v.speedseries.yAxis.push(item.tenDegree);
        obj.sensor8v.createTime = item.dateTime || new Date().getTime();
      }
      if (channelNum === '4V' && item.attribute === 'acceleration') {
        obj.sensor8v.accel = item.peakToPeakValue;
        obj.sensor8v.title = '传感器' + item.channel;
        obj.sensor8v.titleShow = item.channel;
        obj.sensor8v.speedTitle = item.channel;
        obj.sensor8v.accelTitle = item.channel;
        obj.sensor8v.accelseries.yAxis.push(item.zeroPointTwoDegree);
        obj.sensor8v.accelseries.yAxis.push(item.zeroPointThreeDegree);
        obj.sensor8v.accelseries.yAxis.push(item.zeroPointFiveDegree);
        obj.sensor8v.accelseries.yAxis.push(item.oneDegree);
        obj.sensor8v.accelseries.yAxis.push(item.twoDegree);
        obj.sensor8v.accelseries.yAxis.push(item.threeDegree);
        obj.sensor8v.accelseries.yAxis.push(item.fiveDegree);
        obj.sensor8v.accelseries.yAxis.push(item.tenDegree);
        obj.sensor8v.createTime = item.dateTime || new Date().getTime();
      }
      obj.status = status;
      obj.reportTime = item.dateTime;
    });
    sensorList[key] = obj;
    deviceNoList.push(key);
    reportTime = deviceinfo[0].dateTime;
  });

  return {
    sensorList,
    deviceNoList,
    reportTime
  };
};
module.exports = { monitorData };
