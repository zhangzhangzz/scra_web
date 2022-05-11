<!--
 * @Description:
 * @Author: zhangjing
 * @Date: 2021-05-07 23:05:05
 * @LastEditTime: 2021-10-14 11:00:34
-->
<template>
  <div style="height:height" class="row">
    <div id="china_map" :style="{height:height,width:width}" />
    <el-col :style="{height:height,width:width}">
      <!-- <div class="columns" style="width:100px;margin:25px 5px 0 auto;">
        <el-select v-model="value" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div> -->
      <el-col style="padding:0 10px;height:calc(100% - 61px)" class="cardWapper">
        <el-card shadow="hover" class="el_card_wapper" body-style="padding:20px 10px">
          <el-row>
            <el-col :span="12">省份</el-col>
            <el-col :span="12" style="text-align:right">人数</el-col>
          </el-row>
        </el-card>
        <ul class="infinite-list columns" style="overflow-y:auto;padding:0 0 10px 0;margin-top:10px;height:calc(100% - 74px)">
          <el-row class="row work_wapper" v-for="(d,index) in dataList1" :key="index">
            <el-col :span="24" class="row">
              <div class="row" style="width:calc(100% - 35px)">
                <div class="circle" :style="{backgroundColor:index>=color.length?color[(index%color.length)]:color[index]}" />
                <span>{{d.name}}</span>
                <div class="row" style="width: calc(100% - 70px);margin:auto">
                  <el-progress :percentage="d.value" :show-text="false" :color="d.color" />
                </div>
                
              </div>
              <span class="man_num">{{d.value}}人</span>
            </el-col>
          </el-row>
        </ul>
      </el-col>

    </el-col>
  </div>

</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
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
    dataList1:''
  },
  data() {
    return {
      chart: null,
      color:['#ff750f','#0f8bff','#ff350e','#2ebd0d','#ffbc0f'],
      options1: [{
        value: '选项1',
        label: '班组'
      }, {
        value: '选项2',
        label: '工种'
      }],
      value: '选项1',
      options: {
        title: {
          text: '籍贯分布',
          left: 'left',
          top:20,
        },
        tooltip: {
          
          show:false,
          triggerOn: 'mousemove', // mousemove、click
          padding: 8,
          borderWidth: 1,
          borderColor: '#409eff',
          backgroundColor: 'rgba(255,255,255,0.7)',
          textStyle: {
            color: '#000000',
            fontSize: 13
          },
        },
        visualMap: {
          show: false,
          left: 26,
          bottom: 40,
          showLabel: false,
          pieces: [
            {
              gte: 100,
              label: '>= 1000',
              color: '#1f307b'
            },
            {
              gte: 500,
              lt: 999,
              label: '500 - 999',
              color: '#3c57ce'
            },
            {
              gte: 100,
              lt: 499,
              label: '100 - 499',
              color: '#6f83db'
            },
            {
              gte: 10,
              lt: 99,
              label: '10 - 99',
              color: '#9face7'
            },
            {
              lt: 10,
              label: '<10',
              color: '#bcc5ee'
            }
          ]
        },
        geo: {
          map: 'china',
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1.4,
          top: 'center',
          label: {
            normal: {
              show: false,
              fontSize: '14',
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            normal: {
              // shadowBlur: 50,
              // shadowColor: 'rgba(0, 0, 0, 0.2)',
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#f2d5ad',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: '突发事件',
            type: 'map',
            geoIndex: 0,
            data: []
          }
        ]
      },
      dataList: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchartMap()
    })
  },
  created() {
    this.setEchartOption()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    // 初始化中国地图
    initEchartMap() {
      const mapDiv = document.getElementById('china_map')
      const myChart = echarts.init(mapDiv)
      myChart.setOption(this.options)
      if(myChart._$handlers.click) {
        myChart._$handlers.click.length = 0;
      };
    //点击事件
    let that = this;
      // myChart.on('click', function(params) {
      //   if(params.componentType=="series"){
      //         that.dataList1.forEach(function(item,index,arr){
      //           that.dataList1[index].value = Math.round(Math.random()*100);
      //         })
      //     }
      //   })
    },
    // 修改echart配制
    setEchartOption() {
      this.options.series[0]['data'] = this.dataList1
    },
    
  }
}
</script>
<style lang="scss">
    .cardWapper{
      .el-card{
        border: none;
        border-bottom: 1px solid #e6ebf5;
        .el-card__body{
          padding: 10px;
        }
      }
      .work_wapper{
            width: 100%;
            margin: 10px 0;
            padding: 0 10px;
            .circle{
                width: 10px;
                height: 10px;
                border-radius: 50%;
                margin:auto 4px auto 0;
            }
            .man_num{
              width: 35px;
              text-align: right;
                margin: auto 0 auto auto;
            }
            .el-progress{
              width: 100%;
              margin: auto;
            }
        }
    }

    #china_map_box {
        height: 100%;
        position: relative;
    }
    #china_map_box #china_map{
        height: 100%;
    }
     #china_map_box .china_map_logo{
        position: absolute;
        top: 0;
        left: 0;
        width:45px;
     }
     #china_map .tooltip_style{
          line-height:1.7;
          overflow: hidden;
      }
      #china_map .tooltip_left{
          float: left;
      }
      #china_map .tooltip_right{
          float: right;
      }
      
      .work_wapper > .row > .row:last-of-type > .el-col{
        text-align: right;
      }
</style>
