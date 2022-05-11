<!--
 * @Description:
 * @Author: zhangjing
 * @Date: 2021-05-07 17:39:47
 * @LastEditTime: 2021-05-28 15:16:22
-->

<template>
  <div style="height:height" class="row">
    <div id="myChart_1" :style="{height:height,width:width}" />
    <el-col :style="{height:height,width:width}" class="columns">
      <!-- <div class="columns" style="width:100px;margin:20px 0 10px auto;">
        <el-select v-model="value" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div> -->
      
      <el-col style="padding:0;margin:auto 0;height:100%" class="cardWapper">
        <el-card shadow="hover" class="el_card_wapper" body-style="padding:20px 10px">
          <el-row>
            <el-col :span="12">班组</el-col>
            <el-col :span="12" style="text-align:right">人数</el-col>
          </el-row>
        </el-card>
        <ul class="infinite-list columns" style="overflow-y:auto;padding:0 0 10px 0;margin-top:10px;height:calc(100% - 74px)">
          <el-row class="row work_wapper">
            <el-col :span="24" class="row">
              <div class="row">
                <div class="circle" style="backgroundColor:#ff750f" />
                <span>测试</span>
              </div>
              <span class="man_num">2人</span>
            </el-col>
          </el-row>
          <el-row class="row work_wapper">
            <el-col :span="24" class="row">
              <div class="row">
                <div class="circle" style="backgroundColor:#0f8bff" />
                <span>螺纹机</span>
              </div>
              <span class="man_num">2人</span>
            </el-col>
          </el-row>
          <el-row class="row work_wapper">
            <el-col :span="24" class="row">
              <div class="row">
                <div class="circle" style="backgroundColor:#ff350e" />
                <span>班组1</span>
              </div>
              <span class="man_num">2人</span>
            </el-col>
          </el-row>
          <el-row class="row work_wapper">
            <el-col :span="24" class="row">
              <div class="row">
                <div class="circle" style="backgroundColor:#2ebd0d" />
                <span>班组2</span>
              </div>
              <span class="man_num">2人</span>
            </el-col>
          </el-row>
          <el-row class="row work_wapper">
            <el-col :span="24" class="row">
              <div class="row">
                <div class="circle" style="backgroundColor:#ffbc0f" />
                <span>班组3</span>
              </div>
              <span class="man_num">2人</span>
            </el-col>
          </el-row>
        </ul>
      </el-col>

    </el-col>
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
      options: [{
        value: '选项1',
        label: '项目'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '选项1'
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
      this.chart = echarts.init(document.getElementById('myChart_1'))

      this.chart.setOption({
        color: ['#ff811e', '#1e96ff', '#ff441e', '#3dc41d', '#ffc31e'],
        title: {
          text: '班组分布',
          left: 'left',
          top:20,
        },
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //     orient: 'vertical',
        //     left: '0'
        // },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
            center:['center','60%'],
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
              { value: 1048, name: '测试' },
              { value: 735, name: '螺纹机' },
              { value: 580, name: '班组1' },
              { value: 484, name: '班组2' },
              { value: 300, name: '班组3' }
            ]
          }
        ]
      })
    }
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
            margin:auto 4px auto auto;
        }
        .man_num{
            margin: auto 0 auto auto;
        }
    }
}
    

</style>
