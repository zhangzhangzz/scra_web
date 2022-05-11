<!--
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-11-08 12:15:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\dashboard\admin\index.vue
-->
<template>
  <div class="dashboard-editor-container" v-loading="loading" >
    <globalProject  @queryProId="queryProId" @showList="showList" v-if="user.userType!=1" style="position: absolute;z-index: 999;top: -48px;left: calc(50% - 75px);" /> 
    <div style="overflow-y: auto;height:100%">
        <panel-group @handleSetLineChartData="handleSetLineChartData" style="margin:0" :width="p_width" :width1="p_width1" :num="p_num" :num1="p_num1" :data="data"/>

        <el-row style="margin:0 0 15px 0;" >
          <el-col :span="12" class="linewapper" v-loading="loading1">
            <line-chart :chart-data="lineChartData" :x_data="x_data" ref="child" />
            <div class="lineLeftWapper row">
              <div class="row">
                <div class="line line1"></div>
                <div class="columns textWapper">
                  <span class="fir">{{todayShouldAttend}}</span>
                  <span class="sec">今日应考勤人数</span>
                </div>
              </div>
              <div class="row" style="margin-left:20px">
                <div class="line line2"></div>
                <div class="columns textWapper">
                  <span class="fir">{{todayAttend}}</span>
                  <span class="sec">实际考勤人数</span>
                </div>
              </div>
            </div>
            <div class="selectWapper">
              <div class="row">
                <div style="width:120px">
                  <el-select v-model="value" placeholder="请选择班组" clearable @change="teamSelect" @clear="clearTeam">
                  <el-option
                    v-for="item in teamNameListOfAttendPersInFifteenDays"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
                </div>
                <div style="width:120px;margin-left:20px">
                  <el-select v-model="value1" placeholder="请选择工种" clearable @change="workSelect" @clear="clearWork">
                  <el-option
                    v-for="item in workNameListOfAttendPersInFifteenDays"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12" class="b-e">
            <el-col :span="16" class="chart-wrapper" v-loading="loading9" style="width:66.7%%;height:400px">
              <bar-chart :type="deviceData9.deviceType" :onlineNumber="deviceData9.onlineNumber" :offlineNumber="deviceData9.offlineNumber" :max="deviceData9.max" v-if="loading9Tag"/>
            </el-col>
            <el-col :span="8" v-loading="loading9" style="width:33.3%%%;height:400px">
              <envirment-chart :total="deviceData9.total" v-if="loading9Tag" />
            </el-col>
          </el-col>
          
        </el-row>

        <el-row class="thirdWapper row">
            <div class="chart-wrapper" v-loading="loading10">
              <group-type-chart :data="groupNum10" v-if="groupNum10Tag"/>
            </div>
            <div class="chart-wrapper" style="margin-left: 15px;" v-loading="loading11">
              <work-type-chart :data="workNum11" v-if="workNum11Tag"/>
            </div>
            <div class="chart-wrapper" style="margin: 0 15px;position: relative;" v-loading="loading12">
              <work-old-sex-chart :data="sexData13"  :age="ageData12" v-if="ageData12Tag"/>
            </div>
        </el-row>

        <el-row>
          <el-col  class="chart-wrapper" style="width:calc(66.7% - 15px);margin-right:15px;margin-bottom:30px;border-radius:5px;overflow:hiddden" v-loading="loading14">
            <fifth-day-chart :data="fifthData14" v-if="fifthData14Tag"/>
          </el-col>
          <el-col :span="8" class="chart-wrapper" style="width:calc(33.5% - 15px);margin-bottom:30px;border-radius:5px;overflow:hiddden" v-loading="loading15">
            <people-type-chart :dataList1="provinceData15" v-if="provinceData15Tag"/>
          </el-col>
        </el-row>
    </div>
    
  </div>
</template>

<script src="./index.js">

</script>

<style lang="scss" scoped>
  @import "./index.scss"
</style>
