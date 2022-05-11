<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

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
      default: '400px'
    },
    type:'',
    onlineNumber:'',
    offlineNumber:'',
    max:0
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
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
      let that = this;
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        title: {
          text: '设备统计',
          left: 0,
          top:20,
          textStyle: {
            color: '#333'
          }
        },
        legend: {
          data: ['在线', '离线'],
          left:'0',
          top:'15%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '20',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: that.type,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            color: "#5e6266" //刻度线标签颜色
          },
          axisLine: {
            show: true,
            lineStyle: {
                color: "#ddd"
            }
          },
        }],
        yAxis: [{
          max: that.max,
          type: 'value',
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#5e6266" //刻度线标签颜色
          },
          axisLine: {
            show: true,
            lineStyle: {
                color: "#ddd"
            }
          },
          splitLine: {
            show: true,
            lineStyle:{
              color: ['#ccc'],
              width: 1,
              type: 'solid'
            }
          }
        }],
        series: [{
          name: '在线',
          type: 'bar',
          stack: 'vistors',
          barWidth: '10',
          itemStyle: {
            color: '#2dbd0e'
          },
          data: that.onlineNumber,
          animationDuration
        }, {
          name: '离线',
          type: 'bar',
          stack: 'vistors',
          barWidth: '10',
          itemStyle: {
            color: '#ffbc0f'
          },
          data: that.offlineNumber,
          animationDuration
        }]
      })
    }
  }
}
</script>
