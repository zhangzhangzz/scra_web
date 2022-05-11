<template>
  <div style="height:100%;overflow-y: auto;" class="onDailyRecord">
    <div class="all" style="min-height:calc(100% - 47px)">
        <ul class="sys_top">
          <globalProject  @queryProId="queryProId" v-if="user.userType!=1"/>
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">姓名</span>
            <div style="width:199px"><el-input v-model="persName" placeholder="请输入姓名"></el-input></div>
            
          </li>
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">上传平台</span>
            <div style="width:199px">
                <el-select v-model="appId" clearable placeholder="请选择">
                  <el-option :label="q.appName" :value='q.appId' v-for="(q,index) in queryData" :key="index"></el-option>
                </el-select>
            </div>
           </li> 
            <div class="thirdBtn" @click="showList" style="margin-left:auto">查询</div>
            <div class="thirdBtn" @click="countDel" style="margin-left:10px">批量上传</div>
        </ul>
        <div class="sys_bottom" @mouseleave="mouseLeave">
          <template>
            <el-table
              :data="tableData"
              v-loading="loading"
              border max-height="calc(100% - 110px)"
              class="customer-no-border-table"
              :row-class-name="tableRowClassName"
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
                prop="attendName"
                label="姓名"
                min-width="100"
              />
              <el-table-column
                    prop="portrait"
                    label="人员头像"
                    align="center"
                    width="110"
                >
                    <template slot-scope="scope">
                    <img :src="scope.row.portrait" alt="" style="width: 40px;height: 40px;">
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                prop="showIdno"
                label="上传平台"
                min-width="170"
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
                prop="projectName"
                label="项目名称"
                min-width="180"
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
              <!-- 2021-10-15 15:03更改 -->
              <el-table-column
                align="center"
                prop="errorMessage"
                label="考勤异常情况"
                width="200"
              >
                <template slot-scope="scope">
                  <div class="sl_Wapper" @mouseenter="mouseEnter(scope.row.index)" >
                    {{scope.row.errorMessage}}
                  </div>
                  <span class="xsBox" :style="{display:showIndex===scope.row.index?'block':'none'}">
                    {{scope.row.errorMessage}}
                  </span>
                </template>
              </el-table-column>
            
              <el-table-column
                align="center"
                prop="attendTime"
                label="考勤时间"
                min-width="160"
              />
              <el-table-column
                align="center"
                label="操作"
                width="80"
              >
                <template slot-scope="scope">
                  <el-button @click="uploadJw(scope.row)"  type="text" size="small">上传</el-button>
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

<script src="./onDailyRecord.js"></script>
<style lang="scss" scoped>
  @import "./onDailyRecord.scss"
</style>
