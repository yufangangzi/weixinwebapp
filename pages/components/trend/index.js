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
      // backgroundColor: '#234495',
      // color: ['#10EDFF'],
      title: {
        show: false,
        text: '',
        textStyle: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'normal'
        },
        x: 'center',
        y: 480,
        textAlign: 'center'
      },
      calculable: true,
      dataZoom: {
        show: false,
        realtime: true,
        start: 20,
        end: 80,
        height: 8,
        bottom: 10,
        // y: 300 //下面滚轮的位置

      },
      grid: {
        top: 20,
        bottom: 30,
      },
      xAxis: [
        {
          type: 'category',
          name: '',
          nameTextStyle: {
            color: '#fff'
          },
          position: 'bottom',
          boundaryGap: false,
          data: [],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#979797',
              width: 1
            }
          },
          axisTick: {
            inside: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: '#979797',
              align: 'center'
            },
            formatter: function (e) {
              return Number(e).toFixed(2);
            }
          },
          splitLine: {// 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x轴的竖线
            show: false,
            lineStyle: {
              color: 'rgba(255,255,255,0.15)',
              type: 'solid'
            }
          }
        }
      ],
      yAxis: {
        type: 'value',
        name: '速度(mm/s)',
        nameTextStyle: {
          color: '#fff'
        },
        axisLine: {
          lineStyle: {
            color: '#979797',
            width: 1
          }
        },
        axisTick: {
          inside: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 12,
            color: '#D6D7E4',
            align: 'right'
          },
          formatter: function (e) {
            return e;
          }
        },
        splitLine: {// 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x轴的竖线
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.15)',
            type: 'solid'
          }
        }
      },
      series: [{
        name: '',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
        // showSymbol: true,
        // symbol: 'none',
        // symbolSize: 8,
        // itemStyle: {
        //   normal: {
        //     color: '#fff',
        //     lineStyle: {
        //       color: '#10EDFF'
        //     }
        //   }
        // }
      }],
      tooltip: {
        trigger: 'axis',
        showDelay: 0,
        hideDelay: 50,
        transitionDuration: 0,
        formatter: function (params, ticket, callback) {
          var res = '';
          for (var i = 0, l = params.length; i < l; i++) {
            // let dw = 'mm/s';
            // if (params[i].seriesName === '加速度') {
            //   dw = 'm/s2';
            // }
            if (params[i].seriesName === 'fft') {
              res += Number(params[i].name).toFixed(2) + 'Hz , ' + Number(params[i].value).toFixed(2) + 'mm/s';
            } else {
              res += Number(params[i].value).toFixed(2);
            }
          }
          setTimeout(function () {
            // 仅为了模拟异步回调
            callback(ticket, res);
          });
          return res;
        },
        // axisPointer: {
        //   type: 'line',
        //   lineStyle: {
        //     color: '#FFF81F',
        //     width: 1,
        //     type: 'solid'
        //   }
        // },
        // backgroundColor: 'rgba(255,248,31,0.2)',
        // textStyle: {
        //   color: '#FFF81F'
        // },
        padding: 10
      }
    }
  },

  ready: function(){
    // 获取组件
    _this = this;
    this.ecComponent = this.selectComponent('#mychart-dom-fft');
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
        // this.setOption();


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


    setOption: function(data) {
      console.log(data);
      let option = this.data.option;
      option.xAxis[0].data = data.x0data;
      option.series[0].data = data.s0data;
      option.xAxis[0].name = data.x0name;
      option.title.name = data.title;
      // rotateSpeed
      

      // this.chart.clear(); // 清楚累加数据
      this.chart.setOption(option);
      // this.setData({
      //   isLoaded: true,
      //   isDisposed: false
      // });

      // debugger
      // let dw2 = 'mm/s';
      // if (data.unit === '加速度') {
      //   dw2 = 'm/s2';
      // }
      // // '时间：' + 
      // _this.triggerEvent('myevent', { time: data.time[0], value: data.unit + '：' + (data.value[0]).toFixed(2) + dw2 });
    }
  }
})
