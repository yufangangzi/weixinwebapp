// pages/components/line/index.js
import * as echarts from '../../../dist/ec-canvas/echarts';
const app = getApp();
let _this;

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
        // console.log('newVal:', newVal, ';oldVal:', oldVal);
          // debugger
          if (oldVal && newVal) {
            this.setOption(newVal);
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
    },
    outMsg: {
      type: Object,
      observer: function (newVal, oldVal) {
        // debugger

        // wx.showModal({ title: 'msg', content: JSON.stringify(newVal) })
        if (oldVal && newVal){
          console.log(newVal);
          // wx.showModal({ title: 'msg', content: JSON.stringify(newVal) })
          // wx.showModal({ title: 'msg', content: this.save })
          // wx.showModal({ title: 'msg', content: newVal.isOpened })
          if(newVal.isOpened){
            this.save();
          }else{}

          this.setData({
            mapShowIndex: !newVal.mapShowIndex
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canvasSrc: '',
    mapShowIndex: 0,
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    
    markLine1: {
      silent: true,
      itemStyle: {
        normal: {
          borderWidth: 1,
          lineStyle: {
            type: 'solid',
            // color: '00FFFF ',
            width: 1
          },
          label: {
            formatter: '高报',
            position: 'start',
            textStyle: {
              fontSize: 12,
              fontWeight: 'bolder',
              color: '#00FFFF'
            }
          }
        }

      },
      data: [
        {
          yAxis: 4.5
        }
      ]
    },
    markLine2: {
      silent: true,
      itemStyle: {
        normal: {
          borderWidth: 1,
          lineStyle: {
            type: 'solid',
            // color: '#00FF7F ',
            width: 1
          },
          label: {
            formatter: '高高报',
            position: 'end',
            textStyle: {
              fontSize: 12,
              fontWeight: 'bolder',
              color: '#00FF7F'
            }
          }
        }
      },
      data: [
        {
          yAxis: 7.1
        }
      ]
    },
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
        position: function (p) {   //其中p为当前鼠标的位置
          // debugger
          let x = p[0];
          let y = p[1];
          if(x>150){
            x = x - 100;
          }
          if(y>100){
            y = y - 50;
          }
          return [x, y];
        },
        showDelay: 0,
        hideDelay: 50,
        // show:false,
        transitionDuration: 0,
        formatter: function (params, ticket, callback) {
          // console.log(params)
          // debugger
          var res = params[0].name;
          for (var i = 0, l = params.length; i < l; i++) {
            let dw = 'mm/s';
            if (params[i].seriesName === '加速度') {
              dw = 'm/s2';
            }
            res += '\n' + params[i].seriesName + ' : ' + (params[i].value).toFixed(2) + dw;
          }
          // 传给父组件消息
          // debugger
          let dw2 = 'mm/s';
          if (params[0].seriesName === '加速度') {
            dw2 = 'm/s2';
          }
          // '时间：' + 
          _this.triggerEvent('myevent', { time: params[0].name, value: params[0].seriesName + '：' + (params[0].value).toFixed(2) + dw2  });

          setTimeout(function () {
            // 仅为了模拟异步回调
            callback(ticket, res);
          });
          return res;
          return '';
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
      // dataZoom: {
      //   show: false,
      //   realtime: true,
      //   start: 20,
      //   end: 80,
      //   height: 8,
      //   bottom: 10,
      //   // y: 300 //下面滚轮的位置

      // },
      grid: {
        top: 35,
        bottom: 35,
        left: 40,
        right: 50,
      },
      xAxis: [
        {
          // min: 'dataMin',
          // max: 'dataMax',
          // interval: 30000000000,
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLine: {
            lineStyle: {
              color: '#979797',
              width: 1
            }
          },
          axisLabel: {
            show: true,
            showMaxLabel: true,
            showMinLabel: true,
            textStyle: {
              fontSize: '12rpx',
              color: '#979797',
              align: 'center'
            },
            formatter: function (e) {
              return e.replace(' ', '\n');
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
          symbol: 'circle',
          symbolSize: 1,
          data: [],
          itemStyle: {
            normal: {
              borderWidth: 1,
              color: '#63C57A', //拆点颜色
              lineStyle: {
                color: '#63C57A', //折线颜色
              },
            }
          },
          // markLine: {
          //   silent: true,
          //   itemStyle: {
          //     normal: {
          //       borderWidth: 1,
          //       lineStyle: {
          //         color: '#00ffff',
          //         type: 'solid',
          //         width:1
          //       },
          //       // label: {
          //       //     formatter: '高报',
          //       //     textStyle: {
          //       //         fontSize: 16,
          //       //         fontWeight: 'bolder',
          //       //       color: '#00ffff'
          //       //     }
          //       // }
          //     }
          //   },
          //   data: [
          //     {
          //       yAxis: 4.5
          //     }
          //   ]
          // }
        },
        {
          name: '速度',
          type: 'line',
          data: [],
          // markLine: {
          //   silent: true,
          //   itemStyle: {
          //     normal: {
          //         borderWidth: 1,
          //         lineStyle: {
          //             type: 'solid',
          //             color: '#00FF7F ',
          //             width: 1
          //         },
          //         // label: {
          //         //     formatter: '高高报',
          //         //     textStyle: {
          //         //         fontSize: 16,
          //         //         fontWeight: 'bolder',
          //         //         color: '#00FF7F'
          //         //     }
          //         // }
          //     }

          //   },
          //   data: [
          //     {
          //         yAxis: 7.1
          //     }
          //   ]
          // }
        }
      ]
    }
  },

  ready: function(){
    // 获取组件
    _this = this;
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
        console.log(canvas,width,height)
        // debugger
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
        this.chart = chart;
        this.canvas = canvas;
        this.canvas_w = width;
        this.canvas_h = height;
        this.setOption(this.data.outInfo);


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

    save() {
      const _this = this;
      // 保存图片到临时的本地文件
      const ecComponent = this.selectComponent('#mychart-dom-line');
      // wx.showModal({ title: 'msg', content: ecComponent.canvasToTempFilePath })
      // debugger
      ecComponent.canvasToTempFilePath({
        success: res => {
          console.log(res.tempFilePath)
          // wx.showModal({ title: 'msg', content: JSON.stringify(res) })
          _this.setData({
            canvasSrc: res.tempFilePath
          })
          _this.triggerEvent('mysaveevent', 'reset');

          // _this.setData({
          //   mapShowIndex: 1
          // })
        },
        fail: res => {
          console.log(res)
          wx.showModal({ title: 'msg', content: JSON.stringify(res) })
        }
      });
    },


    //给父组件传消息
    send2FatherFn: function(e){
      this.triggerEvent('myevent', {msg: '来自子组件的问候'});
    },


    setOption: function(data) {
      if (data.pagemap !== 'zdqs') {
        return
      }
      if (data.value && data.value.length<1){
        return;
      }
      console.log(data);
      let option = Object.assign({}, this.data.option);
      option.series = JSON.parse(JSON.stringify(this.data.option.series));
      option.xAxis[0].data = data.time;
      if (data.unit === '速度') {
        option.yAxis[0].name = 'mm/s';
        // option.yAxis[0].nameLocation = 'start';
        // option.yAxis[0].nameTextStyle = {align: 'left', color: '#f00'};
      } else {
        option.yAxis[0].name = 'm/s2';
        // option.yAxis[0].nameLocation = 'start';
        // option.yAxis[0].nameTextStyle = { align: 'left', color: '#f00' };
      }
      option.series[0].data = data.value;
      option.series[0].name = data.unit;
      let markLine1 = this.data.markLine1;
      let markLine2 = this.data.markLine2;
      markLine1.data[0].yAxis = data.vibrateHighQuote || 4.5;
      markLine2.data[0].yAxis = data.vibrateHighHighQuote || 7.1;
      if (data.unit === '速度') {
        option.series[0].markLine = markLine1;
        option.series[1].markLine = markLine2
      } else {
        option.series[0].markLine = {};
        option.series[1].markLine = {};
        option.series[1] = null;
      }
      try {
        this.chart.clear(); // 清楚累加数据
      } catch (e) { }
      try {
        this.chart.setOption(option);
      } catch (e) { }
      // debugger
      // this.canvas.ctx._context.clearRect(0,0, this.canvas_w, this.canvas_h);
      
      // this.setData({
      //   isLoaded: true,
      //   isDisposed: false
      // });

      // debugger
      let dw2 = 'mm/s';
      if (data.unit === '加速度') {
        dw2 = 'm/s2';
      }
      // '时间：' + 
      // _this.triggerEvent('myevent', { time: data.time[0], value: data.unit + '：' + (data.value[0]).toFixed(2) + dw2 });
    }
  }
})
