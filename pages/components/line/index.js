// pages/components/line/index.js
import * as echarts from '../../../dist/ec-canvas/echarts';
const app = getApp();

Component({
  externalClasses: ['my-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    outInfo: {
      type: Object,
      // value: '',
      observer: function(newVal, oldVal){
        console.log('newVal:', newVal, ';oldVal:', oldVal);
        
          if (oldVal && newVal) {
            // debugger
            // this.setData({
            //   'option.series[1].data': [118, 136, 165, 130, 178, 140, 133],
            //   'option.series[2].data': [12, 50, 51, 35, 70, 30, 20],
            //   'option.series[0].data': [10, 30, 31, 50, 40, 20, 10],
            // }, () => {
            //   this.setOption();
            // })
          }
        
        
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    
    option: {
      // title: {
      //   text: '振动趋势图',
      //   textStyle: {
      //     color: '#fff',
      //     fontSize: 16,
      //     fontWeight: 'normal'
      //   },
      //   x: 'center',
      //   y: 'bottom',
      //   textAlign: 'left',
      //   textBaseline: 'center'
      // },
      // backgroundColor: '#234495',
      // color: ['#10EDFF'],
      tooltip: {
        trigger: 'axis',
        showDelay: 0,
        hideDelay: 50,
        transitionDuration: 0,
        formatter: function (params, ticket, callback) {
          // console.log(params)
          var res = params[0].name;
          for (var i = 0, l = params.length; i < l; i++) {
            let dw = 'mm/s';
            if (params[i].seriesName === '加速度') {
              dw = 'm/s2';
            }
            res += '\n' + params[i].seriesName + ' : ' + params[i].value + dw;
          }
          // setTimeout(function () {
          //   // 仅为了模拟异步回调
          //   callback(ticket, res);
          // });
          return res;
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#979797',
            width: 1,
            type: 'solid'
          },
        },
        // backgroundColor: 'rgba(255,248,31,0.2)',
        textStyle: {
          color: '#ffffff'
        },
        padding: 10
      },
      calculable: true,
      dataZoom: {
        show: true,
        realtime: true,
        start: 20,
        end: 80,
        height: 8,
        y: 445
      },
      // grid: {
      //   x: 73,
      //   x2: 84,
      //   y2: 103
      // },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ["21:26:03", "21:29:59", "21:33:19", "21:37:18", "21:41:16", "21:44:36", "21:48:38", "21:52:40", "21:56:39", "22:00:38", "22:04:41", "22:08:48", "22:12:43", "22:16:38", "22:19:45", "22:23:54", "22:27:54", "22:31:54", "22:35:54", "22:39:54", "22:43:41", "22:47:26", "22:51:19", "22:55:12", "22:59:10", "23:03:05", "23:07:11", "23:11:15", "23:15:12", "23:19:17", "23:23:32", "23:27:25", "23:31:21", "23:35:03", "23:38:56", "23:42:50", "23:46:47", "23:50:52", "23:54:44", "23:58:44", "00:02:41", "00:06:36", "00:10:34", "00:14:46", "00:18:39", "00:22:48", "00:26:52", "00:30:56", "00:34:44", "00:38:44", "00:40:56", "00:44:54", "00:47:51", "00:54:37", "00:58:38", "01:02:46", "01:06:40", "01:10:35", "01:13:39", "01:17:52", "01:21:44", "01:25:46", "01:29:45", "01:33:39", "01:37:01", "01:40:58", "01:45:05", "01:48:57", "01:52:54", "01:56:58", "02:00:58", "02:04:19", "02:08:12", "02:11:09", "02:15:16", "02:19:13", "02:22:08", "02:26:00", "02:30:00", "02:34:00", "02:37:58", "02:41:24", "02:45:27", "02:49:22", "02:53:17", "02:57:21", "03:01:20", "03:05:18", "03:08:37", "03:12:39", "03:16:38", "03:20:27", "03:23:56", "03:27:57", "03:31:01", "03:34:09", "03:38:04", "03:42:02", "03:46:02", "03:50:04", "03:53:59", "03:57:03", "04:00:56", "04:04:56", "04:08:00", "04:12:04", "04:15:13", "04:19:07", "04:23:04", "04:27:06", "04:31:04", "04:34:53", "04:38:48", "04:42:46", "04:46:39", "04:50:34", "04:54:40", "04:58:39", "05:01:36", "05:05:43", "05:09:44", "05:13:40", "05:16:35", "05:20:12", "05:23:15", "05:27:11", "05:31:07", "05:35:06", "05:39:06", "05:42:58", "05:46:58", "05:50:59", "05:55:07", "05:59:07", "06:02:23", "06:06:22", "06:10:29", "06:14:23", "06:18:25", "06:22:22", "06:26:19", "06:29:39", "06:33:31", "06:37:37", "06:41:39", "06:45:32", "06:49:29", "06:53:29", "06:57:28", "07:01:38", "07:05:28", "07:08:51", "07:12:53", "07:16:53", "07:20:17", "07:24:13", "07:28:14", "07:32:04", "07:36:00", "07:40:00", "07:44:00", "07:47:59", "07:50:56", "07:54:55", "07:58:58", "08:02:57", "08:06:54", "08:10:49", "08:14:40", "08:18:42", "08:22:37", "08:26:35", "08:30:27", "08:34:22", "08:38:15", "08:42:09", "08:45:10", "08:49:05", "08:52:58", "08:57:08", "09:00:52", "09:04:47", "09:07:49", "09:11:42", "09:14:47", "09:18:46", "09:22:08"],
          axisLine: {
            lineStyle: {
              color: '#979797',
              width: 1
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: '12rpx',
              color: '#979797',
              align: 'center'
            },
            formatter: function (e) {
              return e;
            }
          },
          axisTick: {
            inside: true // 刻度朝里
          },
          splitLine: {// 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x轴的竖线
            show: false,
            lineStyle: {
              color: '#ff0000',
              type: 'solid'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show:false,
            lineStyle: {
              color: '#979797',
              width: 1
            }
          },
          axisTick: {
            show: false,
            inside: true // 刻度朝里
          },
          splitLine: {// 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x轴的竖线
            show: true,
            lineStyle: {
              color: '#C2C2C2',
              type: 'dot'
            }
          }

        }
      ],
      series: [
        {
          name: '加速度',
          type: 'line',
          data: [2.50, 3.10, 3.80, 2.60, 2.50, 2.70, 2.90, 2.40, 2.80, 2.10, 2.30, 2.30, 2.30, 3.40, 2.70, 2.70, 2.10, 2.60, 3.30, 2.60, 2.30, 2.40, 2.40, 2.50, 2.40, 2.40, 2.80, 2.90, 2.50, 3.10, 3.20, 3.20, 2.90, 3.60, 2.80, 2.90, 2.80, 4.20, 3.10, 2.20, 2.20, 2.60, 2.30, 2.20, 2.50, 1.80, 2.30, 3.00, 2.70, 2.70, 1.20, 3.50, 3.10, 2.60, 4.60, 5.50, 4.50, 5.50, 5.20, 4.60, 3.30, 6.50, 3.00, 2.70, 2.90, 4.50, 2.60, 3.40, 3.00, 2.70, 3.20, 3.30, 3.00, 2.40, 2.90, 3.20, 3.30, 3.20, 3.00, 3.30, 2.60, 3.00, 3.30, 3.00, 3.70, 4.50, 4.80, 4.20, 4.30, 4.10, 5.50, 4.50, 4.70, 3.20, 5.30, 4.90, 5.30, 4.00, 4.90, 4.30, 4.90, 3.00, 5.00, 5.00, 3.20, 3.40, 3.60, 4.20, 2.80, 2.30, 0.70, 2.50, 2.70, 2.10, 2.40, 2.00, 2.60, 2.50, 2.20, 2.30, 2.70, 2.70, 2.00, 2.60, 2.60, 2.80, 2.30, 2.40, 2.60, 2.20, 3.20, 2.50, 2.10, 2.10, 2.50, 2.60, 2.30, 2.00, 2.60, 3.00, 2.60, 2.70, 2.00, 2.40, 3.30, 3.70, 3.20, 3.60, 2.60, 2.70, 2.70, 2.50, 2.90, 2.60, 3.00, 3.30, 3.10, 3.40, 3.80, 2.60, 2.20, 2.30, 2.60, 2.40, 1.90, 3.10, 2.60, 2.60, 2.30, 2.60, 3.90, 3.40, 3.10, 3.00, 2.70, 3.80, 3.10, 3.20, 2.80, 2.60, 2.40, 2.90, 2.20, 2.70, 3.30, 2.20, 2.60],
          itemStyle: {
            normal: {
              borderWidth: 1,
              color: '#63C57A', //拆点颜色
              lineStyle: {
                color: '#63C57A', //折线颜色
              },
            }
          },
          markLine: {
            silent: true,
            itemStyle: {
              normal: {
                borderWidth: 1,
                lineStyle: {
                  color: '#FF8080',
                  type: 'solid',
                },
                // label: {
                //     formatter: '高报',
                //     textStyle: {
                //         fontSize: 16,
                //         fontWeight: 'bolder',
                //       color: '#63C57A'
                //     }
                // }
              }
            },
            data: [
              {
                yAxis: 4.5
              }
            ]
          }
        },
        {
          name: '速度',
          type: 'line',
          data: [],
          markLine: {
            silent: true,
            itemStyle: {
              normal: {
                  borderWidth: 1,
                  lineStyle: {
                      type: 'solid',
                      color: '#00FF7F ',
                      width: 1
                  },
                  // label: {
                  //     formatter: '高高报',
                  //     textStyle: {
                  //         fontSize: 16,
                  //         fontWeight: 'bolder',
                  //         color: '#00FF7F'
                  //     }
                  // }
              }

            },
            data: [
              {
                  yAxis: 7.1
              }
            ]
          }
        }
      ]
    }
  },

  ready: function(){
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-line');
    console.log(this.properties.outInfo);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击按钮后初始化图表
    init: function () {
      this.ecComponent.init((canvas, width, height) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        // width = 300;
        // height = 300;
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
        this.chart = chart;
        this.setOption();


        this.setData({
          isLoaded: true,
          isDisposed: false
        });

        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    },

    dispose: function () {
      if (this.chart) {
        this.chart.dispose();
      }

      this.setData({
        isDisposed: true
      });
    },


    //给父组件传消息
    send2FatherFn: function(e){
      this.triggerEvent('myevent', {msg: '来自子组件的问候'});
    },


    setOption: function() {
      this.chart.setOption(this.data.option);
    }
  }
})
