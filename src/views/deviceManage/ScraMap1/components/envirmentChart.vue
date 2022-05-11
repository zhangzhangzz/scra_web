<!--
 * @Description:
 * @Author: zhangjing
 * @Date: 2021-05-07 17:02:16
 * @LastEditTime: 2021-07-01 16:04:55
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
      var e = 80;
      this.chart.setOption({
        title: {
          show: true,
          text: e + "%",
          x: "center",
          y: "center",// 通过x,y将标题(进度)定位在圆环中心
          textStyle: {
            fontSize: "25",
            color: "white",
            fontWeight: "400",
            fontFamily: "DINPro, DINPro-Regular",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{d}%",
          show: false,
        },
        legend: {
          orient: "vertical",
          x: "left",
          show: false,
        },
        series: {
          name: "",
          roundCap: true,
          type: "pie",
          backgroundStyle: {
              //反向颜色
              color: "#33373a",
          },
          radius: ["65%", "85%"],
          avoidLabelOverlap: true,
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
              position: "center",
            },
            emphasis: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              value: e,
              name: "",
              itemStyle: {
                color: "#6790D8",
              },
            },
            {
              value: 100 - e,
              name: "",
              itemStyle: {
                color: "#33373a",
              },
            },
          ]}

      })
    }
  }
}
</script>
