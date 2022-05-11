<!--
 * @Description:
 * @Author: zhangjing
 * @Date: 2021-05-07 22:36:46
 * @LastEditTime: 2021-09-07 19:19:18
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
    },
    data:'',
    age:''
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
        color: ['#ff811e', '#1e96ff', '#ff441e', '#3dc41d', '#ffc31e','#ffad1e'],
        title: {
          text: '年龄性别',
          left: 'left',
          top:20,
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '0', 
          left: 'center'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['30%', '50%'],
            center:['center','45%'],
            data: this.age,
            label: {
                // normal: {
                //     formatter: function(params){ 
                //         return params.name+"\n\n"+params.value;
                //     },  
                //     textStyle: {            // 提示文字的样式
                //         color: '#595959',
                //         fontSize: 14
                //     }
                // }
                show: false,
                position: 'center'
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
          data: [this.data.numberOfMan, this.data.numberOfWoman],
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
