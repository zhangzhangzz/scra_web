<!--
 * @Description:
 * @Author: zhangjing
 * @Date: 2021-05-07 22:36:46
 * @LastEditTime: 2021-05-28 20:28:44
-->
<template>
  <div style="height:height" class="row">
    <div id="myChart2" :style="{height:height,width:'70%'}" />
    <div id="sexZZEchart" :style="{height:height,width:'30%'}" />
  </div>

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
      default: '50%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
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
    //   this.chart = echarts.init(this.$el, 'macarons')
      this.chart = echarts.init(document.getElementById('myChart2'))
      this.chart1 = echarts.init(document.getElementById('sexZZEchart'))
      this.chart.setOption({
        color: ['#ff811e', '#1e96ff', '#ff441e', '#3dc41d', '#ffc31e'],
        title: {
          text: '年龄性别',
          left: 'left',
          top:20,
        },
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        // },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
            center:['center','60%'],
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
            ],
            label: {
                normal: {
                    // 各分区的提示内容
                    // params: 即下面传入的data数组,通过自定义函数，展示你想要的内容和格式
                    formatter: function(params){ 
                        return params.name+"\n\n"+params.value;
                    },  
                    textStyle: {            // 提示文字的样式
                        color: '#595959',
                        fontSize: 14
                    }
                }
            },
            itemStyle: {
                "normal": {
                "borderWidth": 3, // 间距的宽度
                "borderColor": '#fff', //背景色
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })

      this.chart1.setOption({
        title: {
          text: '性别比例',
          right: '30',
          bottom:0,
          textStyle:{
            fontSize:12,
            fontWeight :'normal'
          }
        },
        xAxis: {
          type: 'category',
          data: ['男', '女'],
          axisLabel:{
            show:false
          }
        },
        yAxis: {
          type: 'value',
          show:false
        },
        grid: {
          top: '100',
          bottom: '13%',
          right:'10',
          containLabel: true
		    },
        series: [{
          data: [120, 200],
          type: 'bar',
          barWidth:20,
          itemStyle: {
            normal: {
                label: {
                    show: true,		//开启显示
                    position: 'top',	//在上方显示
                    textStyle: {	    //数值样式
                        color: '#5e6266',
                        fontSize: 12,
                        fontWeight:'normal'
                    },
                    formatter: function(a,index){
                        return (`${a.name}${a.value}`);
                    },
                },  
              color: function(params) {
                // build a color map as your need.

                var colorList = [

                  '#0f8bff', '#ff350e'

                ]

                return colorList[params.dataIndex]
              }
            }
          }
        }]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .work_wapper{
        width: 100%;
        margin: 4px 0;
        .circle{
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin:auto 4px auto auto;
        }
        .man_num{
            margin: auto 0 auto auto;
        }
    }

</style>
