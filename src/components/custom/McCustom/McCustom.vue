<!--
 * @Author: your name
 * @Date: 2021-07-01 16:31:11
 * @LastEditTime: 2021-07-09 13:20:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\McCustom\McCustom.vue
-->
<template>
  <div>
    <el-dialog
      title="提示"
      :show-close="false"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">

      <slot></slot>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./McCustom.js"></script>

<style lang="scss" scoped>
  @import "./McCustom.scss"
</style>
