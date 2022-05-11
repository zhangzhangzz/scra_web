<!--
 * @Author: your name
 * @Date: 2021-07-01 16:31:12
 * @LastEditTime: 2021-09-07 17:52:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\SystemAdmin\DjournalAdmin\DjournalAdmin.vue
-->
<template>
  <div>
    <ul class="sys_top">
      <li class="sys_top_2">
        <span class="spanM">用户名</span>
        <el-input v-model="input" placeholder="请输入用户名" class="inputWidth"></el-input>
      </li>
      <li class="sys_top_1">
        <span class="spanM" style="line-height:36px">登录状态</span>
        <div style="width:199px">
        <el-select v-model="option" placeholder="项目选择" clearable size="small">
          <el-option v-for="(item,i) of options" :key="i" :label="item" :value="item" />
        </el-select>
        </div>
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
      <div class="thirdBtn"  @click="" style="margin-left:auto" >查询</div>
      <div class="thirdBtn"  @click="" style="margin-right:0" >批量删除</div>
      <div class="thirdBtn"  @click="" >清空日志</div>
      <div class="secBtn"  @click="" style="margin-left:20px" >导出</div>

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
          prop="loginName"
          label="用户名"
          align="center"
          min-width="120"
        />
        <el-table-column
          prop="ip"
          label="登录地址"
          align="center"
          min-width="120"
        />
        <el-table-column
          prop="liu"
          label="浏览器"
          align="center"
          min-width="120"
        />
        <el-table-column
          prop="czxx"
          label="操作系统"
          align="center"
          min-width="120"
        />
        <el-table-column
          prop="czxx"
          label="状态"
          align="center"
          min-width="120"
        />
        <el-table-column
          prop="time"
          label="登录时间"
          align="center"
          min-width="130"
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

<script src="./DjournalAdmin.js"></script>

<style lang="scss" scoped>
  @import "./DjournalAdmin.scss"
</style>
