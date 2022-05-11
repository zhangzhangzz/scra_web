<template>
  <div class="CjournalAdmin">
    <ul >
      <el-row class="row">
        <el-col :span="18" class="sys_top" style="padding-right:0">
          <li class="sys_top_2">
            <span class="spanM">项目名称</span>
            <el-input v-model="input" placeholder="请输入项目名称" class="inputWidth"></el-input>
          </li>

          <li class="sys_top_2">
            <span class="spanM">姓名</span>
            <el-input v-model="input" placeholder="请输入姓名" class="inputWidth"></el-input>
          </li>

          <li class="sys_top_1">
            <span class="spanM">状态类型</span>
            <el-select v-model="option"  clearable size="small">
              <el-option v-for="(item,i) of options" :key="i" :label="item" :value="item" />
            </el-select>
          </li>
          <li class="sys_top_1">
            <span class="spanM">登录时间</span>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </li>
        </el-col>
        <el-col :span="6" class="row sys_top" style="padding-left:0">
          <div class="thirdBtn"  @click="" style="margin-left:auto" >查询</div>
          <div class="thirdBtn"  @click="" style="margin-right:0" >批量删除</div>
          <div class="thirdBtn"  @click="" >清空日志</div>
          <div class="secBtn"  @click="" style="margin-left:20px" >导出</div>
        </el-col>
      </el-row>
      
      
      
    </ul>

    <div class="sys_bottom">
        <el-table
          ref="multipleTable"
          :data="tableData"
          class="customer-no-border-table"
          border
          :header-cell-style="{background:'#4B5365',color:'#fff'}"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="d"
            label="序号"
            align="center"
            min-width="40"
          />
          <el-table-column
            prop="type"
            label="项目名称"
            align="center"
            min-width="120"
          />
          <el-table-column
            prop="type"
            label="姓名"
            align="center"
            min-width="120"
          />
          <el-table-column
            prop="ip"
            label="身份证号码"
            align="center"
            min-width="120"
          />
          
          <el-table-column
            label="状态类别"
            align="center"
            min-width="120"
          >
            <span class="suss">成功</span>
          </el-table-column>

          <el-table-column
            prop="time"
            label="时间"
            align="center"
            min-width="130"
          />
          
          <el-table-column
            prop="name"
            label="详情"
            align="center"
            min-width="120"
          />
          <el-table-column
            prop="type"
            label="操作"
            align="center"
            min-width="120"
          >
            <template slot-scope="scope">
              <el-button  @click="delRole(scope.row.roleId)" type="text" size="small"  style="color:red">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script src="./DeviceLog.js"></script>

<style lang="scss">
  @import "./DeviceLog.scss"
</style>
