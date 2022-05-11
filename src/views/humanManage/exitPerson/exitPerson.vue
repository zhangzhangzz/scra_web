<!--
 * @Author: your name
 * @Date: 2021-08-17 09:36:51
 * @LastEditTime: 2021-11-24 12:22:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\exitPerson\exitPerson.vue
-->
<template>
  <div style="height:100%;overflow-y: auto;" class="exitPerson" ref="bigbox">
    <div class="all" style="min-height:calc(100% - 47px)" >
        <ul class="sys_top">
            <li class="sys_top_1 row" s>
              <span class="spanM" style="line-height:36px">姓名</span>
              <div style="width:180px">
                <el-input v-model="persName" placeholder="请输入姓名"></el-input>
              </div>
            </li>
              
            <li class="sys_top_1 row"  v-if="user.userType==1 || user.userType==6">
              <span class="spanM" style="line-height:36px">班组</span>
              <div style="width:180px">
                <el-select v-model="teamId" clearable  placeholder="请选择班组">
                  <el-option
                    v-for="item in options2.team"
                    :key="item.teamId"
                    :label="item.teamName"
                    :value="item.teamId">
                  </el-option>
                </el-select>
              </div>
            </li>
              
            <li class="sys_top_1 row"  v-if="user.userType==1 || user.userType==6">
              <span class="spanM" style="line-height:36px">工种</span>
              <div style="width:180px">
                <el-select v-model="workId" clearable  placeholder="请选择工种">
                  <el-option
                    v-for="item in options2.work"
                    :key="item.workId"
                    :label="item.workName"
                    :value="item.workId">
                  </el-option>
                </el-select>
              </div>
            </li>
            
            <div class="thirdBtn" style="margin-left:auto" @click="queryShow">查询</div>
            <div class="thirdBtn"  @click="countDel1">批量入场</div>
            <div class="secBtn" style="margin-left:10px" @click="countDel">批量删除</div>
        </ul>
              
        <div class="sys_bottom" >
          <el-table
              ref="multipleTable"
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
              min-width="45"
              header-align="center"
              align="center"
              />
              <el-table-column
              :index="makeIndex"
              label="序号"
              type="index"
              align="center"
              width="50"
              />
              <el-table-column
              prop="persName"
              label="姓名"
              align="center"
              width="80"
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
              label="人员类型"
              prop="persType"
              align="center"
              width="80"
              />
              <el-table-column
              prop="showIdno"
              label="身份证号"
              align="center"
              width="160"
              />
              <el-table-column
              prop="age"
              label="年龄"
              align="center"
              width="50"
              />
              <el-table-column
              prop="nation"
              label="民族"
              align="center"
              width="50"
              >
                <template slot-scope="scope">
                  <span :style="{color:scope.row.nations.isEthnicHan!=1?'red':'#606266'}">{{scope.row.nations.nation}}</span>
                </template>
              </el-table-column>
              <el-table-column
              prop="projectName"
              label="项目名称"
              align="center"
              width="80"
              />
              <el-table-column
              prop="teamName"
              label="班组"
              align="center"
              />
              <el-table-column
              label="工种"
              prop="workName"
              align="center"
              />
              <el-table-column
              prop="card"
              label="IC卡号"
              align="center"
              width="120"
              />
              <el-table-column
              prop="existTime"
              label="退场时间"
              align="center"
              width="170"
              />
              <el-table-column
              prop="d10"
              label="操作"
              align="center"
              width="150"
              >
              <template slot-scope="scope">
                  <el-button  type="text" size="small" @click="lookDetail(scope.row)">详情</el-button>
                  <el-button @click="joinArea(scope.row)" type="text" size="small">入场</el-button>
                  <el-button @click="dels1(scope.row)" type="text" size="small" style="color:red">删除</el-button>
              </template>
              </el-table-column>
          </el-table>
        </div>
    </div>

    <el-pagination 
      v-if="paginationShow"
      class="pageLine"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      :total="total">
    </el-pagination>
    
    <el-dialog title="人员进场" :visible.sync="dialogVisible" width="25%" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="columns">
        <el-form-item label="项目名称" v-if="user.userType!==1">
          <div style="width:199px">
          <el-select v-model="globalProjectId" placeholder="请选择" clearable @change="proChange">
            <el-option
            v-for="(item,index) in options.projectData"
            :key="item.projectId"
            :label="item.projectName"
            :value="index">
            </el-option>
          </el-select>
          </div>
        </el-form-item>
        <el-form-item label="班组" prop="teamId">
          <div style="width:199px">
          <el-select v-model="ruleForm.teamId" placeholder="请选择" clearable>
            <el-option
            v-for="item in team"
            :key="item.teamId"
            :label="item.teamName"
            :value="item.teamId">
            </el-option>
        </el-select>
          </div>
        </el-form-item>
        <el-form-item label="工种" prop="workId">
          <div style="width:199px">
          <el-select v-model="ruleForm.workId" placeholder="请选择" clearable>
            <el-option
            v-for="item in options.work"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
        </el-select>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" class="sureBtn" @click="submitForm('ruleForm')" v-loading="loading1">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script src="./exitPerson.js"></script>
<style lang="scss" scoped>
  @import "./exitPerson.scss"
</style>
