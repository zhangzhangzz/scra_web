<!--
 * @Description:
 * @Author: zhangjing
 * @Date: 2021-05-07 23:56:38
 * @LastEditTime: 2021-05-29 20:33:51
-->
<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      x_data :[],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.getFifthDay();
      this.chart.setOption({
        title: {
          text: '近15天通行统计',
          left: '5',
          top:'20',
          textStyle: {
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(a,index){
            let str = a[0].axisValueLabel.split('/');
              return (`${new Date().getFullYear()}-${str[0]}-${str[1]}<br/><div class="row"><div style="width:8px;height:8px;background:#2dbd0e;border-radius:50%;margin:auto 5px auto 0 "></div>进场${a[0].value}</div><div class="row"><div style="width:8px;height:8px;background:#ffbc0f;border-radius:50%;margin:auto 5px auto 0 "></div>离场${-a[1].value}</div>`);
          },
        },
        grid: {
          left: '5',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['进场', '离场'],
          right:'0',
          top:'20'
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: "#5e6266" ,//刻度线标签颜色
              formatter:function (value, index) { if(value<0){ return -value; }else{return value;}}
            },
            axisLine: {
              show: true,
              lineStyle: {
                  color: "#ddd"
              }
            },
          }
        ],
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#5e6266", //刻度线标签颜色
            },
            axisLine: {
              show: true,
              lineStyle: {
                  color: "#ddd"
              }
            },
            data: this.x_data
          }
        ],
        series: [
          {
            name: '进场',
            type: 'bar',
            stack: '总量',
            barWidth: 10,
            label: {
              show: false
            },
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              color: '#2dbd0e',
              barBorderRadius: [50, 50, 0, 0]
            },
            data: [320, 302, 341, 374, 390, 450, 420, 320, 302, 341, 374, 390, 450, 420, 220]
          },
          {
            barWidth: 10,
            name: '离场',
            type: 'bar',
            stack: '总量',
            label: {
              show: false,
              position: 'left'
            },
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              color: '#ffbc0f',
              barBorderRadius: [0, 0, 50, 50]
            },
            data: [-120, -132, -101, -134, -190, -230, -210, -120, -132, -101, -134, -190, -230, -210, -230]
          }
        ]
      })
    },
    //获取前15天
    getFifthDay(){
      var start = new Date();
      let arr = [`${start.getMonth() + 1}/${start.getDate()}`];
      for(let v=1;v<15;v++) {
        start.setDate(start.getDate() - 1);
        let date = `${start.getMonth() + 1}/${start.getDate()}`;
        arr.unshift(date)
      }
      this.x_data = arr;
    },
  }
}
</script>
