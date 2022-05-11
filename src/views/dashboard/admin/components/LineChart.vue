<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      x_data :[],
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
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
      this.setOptions(this.chartData)
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
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: '近15天考勤统计',
          left: 10,
          top:20,
          textStyle: {
            color: '#333'
          }
        },
        xAxis: {
          data:this. x_data,
          boundaryGap: false,
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
          }
        },
        grid: {
          left: 15,
          right: 20,
          bottom: 20,
          top: 120,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10],
          formatter: function(a){
            let str = a[0].axisValueLabel.split('/');
              return (`${new Date().getFullYear()}-${str[0]}-${str[1]}<br/><div class="row"><div style="width:8px;height:8px;background:#ff740f;border-radius:50%;margin:auto 5px auto 0 "></div>出勤人数：${a[0].value}</div><div class="row"><div style="width:8px;height:8px;background:#2dbd0e;border-radius:50%;margin:auto 5px auto 0 "></div>出勤率：${a[1].value}</div>`);
          },
        },
        yAxis: {
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
        },
        legend: {
          data: ['出勤人数', '出勤率'],
          right:'20',
          top:'70'
        },
        series: [
          {
            name: '出勤人数',
            itemStyle: {
              normal: {
                color: '#ff740f',
                lineStyle: {
                  color: '#ff740f',
                  width: 2
                },
                areaStyle: {
                  color:  new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                          offset: 0, color: 'rgba(254,126,33,0.2)' // 0% 处的颜色
                        },{
                            offset: 1, color: '#fff' // 100% 处的颜色
                        }])
                  
                  // 'rgba(254,126,33,0.2)'
                }
              }
            },
            smooth: true,
            type: 'line',
            data: expectedData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: '出勤率',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#2dbd0e',
                lineStyle: {
                  color: '#2dbd0e',
                  width: 2
                },
                areaStyle: {
                  // color: '#f3f8ff'
                  color:  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(63,195,36,0.2)'
                }, {
                    offset: 1,
                    color: '#fff'
                }])          
                  // 'rgba(63,195,36,0.2)'
                }
              }
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }],
          backgroundColor: '#fff'
      })
    }
  }
}
</script>
