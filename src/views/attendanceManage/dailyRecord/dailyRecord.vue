<template>
  <div style="height:100%;overflow-y: auto;">
    <div class="all" style="min-height:calc(100% - 47px)">
        <ul class="sys_top">
          <!-- <globalProject  @queryProId="queryProId"/> -->
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">进出门</span>
            <div style="width:199px">
                <el-select v-model="inOut" clearable placeholder="请选择">
                    <el-option label="进门" :value=1></el-option>
                    <el-option label="出门" :value=0></el-option>
                </el-select>
            </div>
          </li>

          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">考勤时间</span>
            <div style="width:3.2rem;" class="date">
              <el-date-picker
                  style="width:100%"
                  v-model="date"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
              </el-date-picker>      
            </div>
           </li>
          <div class="thirdBtn" @click="$router.back()" style="margin-left:auto">返回</div>
          <div class="thirdBtn" @click="showList" style="margin-left:10px">查询</div>
          <div class="thirdBtn" @click="countDel2" style="margin-left:10px">批量上传</div>
          <div class="thirdBtn" @click="showList" style="margin-left:10px">导出</div>
        </ul>
        <div class="sys_bottom">
          <template>
            <el-table
              :data="tableData"
              v-loading="loading"
              border max-height="calc(100% - 110px)"
              class="customer-no-border-table"
              :header-cell-style="{background:'#4B5365',color:'#fff'}"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                    type="selection"
                    width="55"
                />
              <el-table-column
                align="center"
                type="index"
                label="序号"
                :index="makeIndex"
                width="60"
              />
              <el-table-column
                align="center"
                prop="projectName"
                label="项目名称"
                min-width="180"
              />
              <el-table-column
                align="center"
                prop="attendName"
                label="姓名"
                min-width="100"
              />
              <el-table-column
                align="center"
                prop="showIdno"
                label="身份证号"
                min-width="170"
              />
              <el-table-column
                align="center"
                prop="age"
                label="年龄"
                min-width="60"
              />
              <el-table-column
                align="center"
                prop="team"
                label="班组"
                min-width="100"
              />
              <el-table-column
                align="center"
                prop="attendWork"
                label="工种"
                min-width="100"
              />
              <el-table-column
                align="center"
                prop="inOut"
                label="进出门"
                min-width="80"
              >
                <template slot-scope="scope">
                <span :style="{color:scope.row.inOut?'rgb(128,204,93)':'rgb(252,103,71)'}">{{scope.row.inOut==1?'进门':'出门'}}</span>
                </template>
              </el-table-column>
            <el-table-column
                align="center"
                prop="deviceName"
                label="打卡设备"
                min-width="250"
            />
            <el-table-column
                align="center"
                prop="animalHeat"
                label="当前体温"
                min-width="80"
            >
                <template slot-scope="scope">
                {{scope.row.animalHeat}}°C
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="attendStatus"
                label="考勤状态"
                min-width="160"
            >
                 <template slot-scope="scope">
                    <p v-html="queryStatus(scope.row.proAttendStatusList)"></p>
                </template>
            
            </el-table-column>
              <el-table-column
                align="center"
                prop="attendTime"
                label="打卡时间"
                min-width="160"
              />
              <el-table-column
                align="center"
                label="操作"
                width="80"
              >
                <template slot-scope="scope">
                  <el-button @click="editDataSure(scope.row)"  type="text" size="small">上传</el-button>
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
        :page-size="pageSize"
        @size-change="handleSizeChange"
        :total="total">
      </el-pagination>

   

  </div>
</template>

<script src="./dailyRecord.js"></script>
<style lang="scss" >
  @import "./dailyRecord.scss"
</style>
