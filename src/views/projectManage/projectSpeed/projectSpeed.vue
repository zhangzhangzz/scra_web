<template>
  <div>
    <ul class="sys_top">
      <li class="sys_top_2">
        <span class="spanM">项目名称</span>
        <input type="text" placeholder="请输入">
      </li>
      <div class="button_search">
        <img src="../../../assets/images/button/search.png">
        <span>搜索</span>
      </div>
      <div class="button_reset">
        <img src="../../../assets/images/button/reset.png">
        <span>重置</span>
      </div>
    </ul>

    <div class="sys_bottom">
      <ul class="sys_bottom_1">
        <li class="sys_bottom_1_del" @click="handleOut1">
          <img src="../../../assets/images/button/del.png">
          <span>批量删除</span>
        </li>
      </ul>
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
            align="center"
            min-width="40"
          />
          <el-table-column
            prop="d1"
            label="日期"
            align="center"
            min-width="120"
          />
          <el-table-column
            prop="d2"
            label="内容"
            align="center"
            min-width="120"
          />
          <el-table-column
            prop="type"
            label="操作"
            align="center"
            min-width="120"
          >
            <ul class="table_button">
              <li class="table_button_del" @click="handleOut2">
                <img src="../../../assets/images/button/del.png">
                <span>删除</span>
              </li>
            </ul>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script src="./projectSpeed.js"></script>

<style lang="scss" scoped>
  @import "./projectSpeed.scss"
</style>
