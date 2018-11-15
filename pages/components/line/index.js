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
            this.setData({
              'option.series[1].data': [118, 136, 165, 130, 178, 140, 133],
              'option.series[2].data': [12, 50, 51, 35, 70, 30, 20],
              'option.series[0].data': [10, 30, 31, 50, 40, 20, 10],
            }, () => {
              this.setOption();
            })
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
      //   text: '测试下面legend的红色区域不应被裁剪',
      //   left: 'center'
      // },
      color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
      // legend: {
      //   data: ['A', 'B', 'C'],
      //   top: 50,
      //   left: 'center',
      //   backgroundColor: 'red',
      //   z: 100
      // },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: [{
        name: 'A',
        type: 'line',
        smooth: true,
        data: [18, 36, 65, 30, 78, 40, 33]
      }, {
        name: 'B',
        type: 'line',
        smooth: true,
        data: [12, 50, 51, 35, 70, 30, 20]
      }, {
        name: 'C',
        type: 'line',
        smooth: true,
        data: [10, 30, 31, 50, 40, 20, 10]
      }]
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
