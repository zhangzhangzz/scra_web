<template>
  <div class="bg">
    <p class="bg_1">基本信息</p>
    <ul class="bg_2">
      <li>
        <span class="bgName">用户名称:</span>
        <el-input v-model="input3" placeholder="scrat1161" class="input-with-select" disabled />
      </li>
      <li>
        <span class="bgName">项目账号:</span>
        <el-input v-model="input3" placeholder="scrat1161" class="input-with-select" disabled />
      </li>
    </ul>
    <p class="bg_1">其分配角色</p>
    <template>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
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
          width="200"
        />
        <el-table-column
          prop="loginName"
          label="角色名称"
          width="330"
        />
        <el-table-column
          prop="ip"
          label="权限字符"
          width="330"
        />
        <el-table-column
          prop="time"
          label="创建时间"
        />
      </el-table>
    </template>
    <div class="bg_4">
      <span class="bg_4_1">保存</span>
      <span class="bg_4_2" @click="ModifyPass(0)">关闭</span>
    </div>
  </div>
</template>

<script src="./AssignRoles.js"></script>

<style scoped lang="scss">
  @import './AssignRoles.scss';
</style>
