<!--
 * @Description:
 * @Author: zhangjing
 * @Date: 2021-05-07 17:02:16
 * @LastEditTime: 2021-08-26 23:11:50
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
      default: '400px'
    }
  },
  data() {
    return {
      chart: null
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

      this.chart.setOption({
        color: ['#ff811e', '#1e96ff', '#ff441e', '#3dc41d', '#ffc31e','#ffad1e'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '10%', 
          left: 'center'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '60%'],
            center:['center','40%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '15',
                fontWeight: 'bold'
              }
            },
            itemStyle: {
                "normal": {
                "borderWidth": 4, // 间距的宽度
                "borderColor": '#fff', //背景色
                }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '环境监测' },
              { value: 735, name: '视频监测' },
              { value: 580, name: '劳务实名制' },
              { value: 484, name: '运渣车监测' },
              { value: 300, name: '塔吊监测' },
              { value: 300, name: 'LED' }
            ]
          }
        ],
        backgroundColor: '#fff'
      })
    }
  }
}
</script>
