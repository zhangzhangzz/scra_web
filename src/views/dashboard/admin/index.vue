<!--
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-09-07 15:12:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\dashboard\admin\index.vue
-->
<template>
  <div class="dashboard-editor-container">
    <el-row>
      <div class="topSelect row">
        <div style="width:150px">
          <el-select v-model="value2" placeholder="请选择项目">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        
      </div>
    </el-row>
    <panel-group @handleSetLineChartData="handleSetLineChartData" style="margin:0" :width="p_width" :width1="p_width1" :num="p_num" :num1="p_num1"/>

    <el-row style="margin:0 0 15px 0;" >
      <el-col :span="12" class="linewapper">
        <line-chart :chart-data="lineChartData" />
        <div class="lineLeftWapper row">
          <div class="row">
            <div class="line line1"></div>
            <div class="columns textWapper">
              <span class="fir">124</span>
              <span class="sec">今日出勤人数</span>
            </div>
          </div>
          <div class="row" style="margin-left:20px">
            <div class="line line2"></div>
            <div class="columns textWapper">
              <span class="fir">80%</span>
              <span class="sec">出勤率</span>
            </div>
          </div>
        </div>
        <div class="selectWapper">
          <div class="row">
            <div style="width:110px">
              <el-select v-model="value" placeholder="请选择班组">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
            <div style="width:110px;margin-left:20px">
              <el-select v-model="value1" placeholder="请选择工种">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="b-e">
        <el-col :span="16" class="chart-wrapper">
          <bar-chart />
        </el-col>
        <el-col :span="8">
          <envirment-chart />
        </el-col>
      </el-col>
      
    </el-row>

    <el-row class="thirdWapper row">
        <div class="chart-wrapper">
          <group-type-chart />
        </div>
        <div class="chart-wrapper" style="margin-left: 15px;">
          <work-type-chart />
        </div>
        <div class="chart-wrapper" style="margin: 0 15px;position: relative;">
          <work-old-sex-chart />
        </div>
    </el-row>

    <el-row>
      <el-col  class="chart-wrapper" style="width:calc(66.7% - 15px);margin-right:15px;margin-bottom:30px;border-radius:5px;overflow:hiddden">
        <fifth-day-chart />
      </el-col>
      <el-col :span="8" class="chart-wrapper" style="width:calc(33.5% - 15px);margin-bottom:30px;border-radius:5px;overflow:hiddden">
        <people-type-chart />
      </el-col>
    </el-row>
  </div>
</template>

<script src="./index.js">

</script>

<style lang="scss" scoped>
  @import "./index.scss"
</style>
