<!--
 * @Description:
 * @Author: zhangjing
 * @Date: 2021-05-07 17:02:16
 * @LastEditTime: 2021-09-07 19:18:44
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
    },
    type:'',
    total:''
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
            data: this.total
          }
        ],
        backgroundColor: '#fff'
      })
    }
  }
}
</script>
