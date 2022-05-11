<!--
 * @Author: your name
 * @Date: 2021-07-22 12:35:38
 * @LastEditTime: 2021-11-26 09:43:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\applicationManage\dataManage\dataManage.vue
-->
<template>
  <div style="height:100%;overflow-y: auto;">
    <!-- <globalProject data="dataManage" @showList="showList"/> -->
    <div class="all" style="min-height:calc(100% - 47px);">
        <ul class="sys_top">
          <li class="sys_top_1 row" v-if="user.userType!=1">
            <span class="spanM" style="line-height:36px">项目名称</span>
            <div class="width:199px"><el-input v-model="projectName" placeholder="请输入项目名称"></el-input></div>
            
          </li>
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">设备编号</span>
            <div class="width:199px"><el-input v-model="deviceId" placeholder="请输入设备编号"></el-input></div>
          </li>
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">设备区域</span>
            <div class="width:199px"><el-input v-model="regionName" placeholder="请输入设备区域"></el-input></div>
          </li>
          
          <div class="thirdBtn" @click="showList" style="margin-left:auto">查询</div>
        </ul>
        <div class="sys_bottom">
          <template>
            <el-table
              :data="tableData "
              v-loading="loading"
              border 
              class="customer-no-border-table"
              :header-cell-style="{background:'#4B5365',color:'#fff'}"
              style="width: 100%"
            >
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="60"
              />
              <el-table-column
                align="center"
                prop="projectName"
                label="项目名称"
                min-width="150"
              />
              <el-table-column
                align="center"
                prop="deviceId"
                label="设备编号"
                min-width="170"
              />
              <el-table-column
                align="center"
                prop="regionName"
                label="设备区域"
                min-width="170"
              />
              <el-table-column
                align="center"
                prop="chinaStandardNumber"
                label="国控编号"
                min-width="170"
              />
              <el-table-column
                align="center"
                prop="pm10Value"
                label="PM10"
                min-width="70"
              />
              <el-table-column
                align="center"
                prop="chinaStandardPm10Value"
                label="国控PM10"
                min-width="70"
              />
              <el-table-column
                align="center"
                prop="pm25Value"
                label="PM2.5"
                min-width="70"
              />
              <el-table-column
                align="center"
                prop="chinaStandardPm25Value"
                label="国控PM2.5"
                min-width="70"
              />
              <el-table-column
                  align="center"
                  prop="chinaStandardTemperature"
                  label="温度"
                  min-width="70"
              >
                <!-- <template slot-scope="scope">
                  {{scope.row.chinaStandardTemperature==null?'':scope.row.chinaStandardTemperature+'°C'}}
                </template> -->
              </el-table-column>
              <el-table-column
                align="center"
                prop="voice"
                label="噪音"
                min-width="70"
              />
              <el-table-column
                align="center"
                prop="chinaStandardVoice"
                label="标准噪音"
                min-width="70"
              />
              <el-table-column
                align="center"
                prop="monitoringTime"
                label="采集时间"
                min-width="180"
              />
               <el-table-column
                align="center"
                prop="pm10Highest"
                label="阀值"
                min-width="70"
              />
              <el-table-column
                align="center"
                label="操作"
                width="70"
              >
                <template slot-scope="scope">
                  <el-button @click="$router.push({path: '/applicationManage/dataSet',query: {id:scope.row.deviceId}})"  type="text" size="small">配置</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
    </div>
    
    <el-pagination 
        class="pageLine"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :page-size="10"
        
        :total="total">
      </el-pagination>

    <!-- 创建项目
    .0 -->
    <el-dialog
      title="修改"
      :visible.sync="dialogFormVisible"
      :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
      width="30%">
      <el-form :model="form">
        <el-form-item label="AQI" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off" placeholder="请输入AQI"></el-input>
        </el-form-item>
        <el-form-item label="PM10" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" placeholder="请输入PM10"></el-input>
        </el-form-item>
        <el-form-item label="PM2.5" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" placeholder="请输入PM2.5"></el-input>
        </el-form-item>
        <el-form-item label="温度" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" placeholder="请输入温度"></el-input>
        </el-form-item>
        <el-form-item label="噪音" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" placeholder="请输入噪音"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" v-loading="loading">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script src="./dataManage.js"></script>
<style lang="scss" scoped>
  @import "./dataManage.scss"
</style>