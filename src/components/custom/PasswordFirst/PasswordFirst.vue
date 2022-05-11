<!--
 * @Author: your name
 * @Date: 2021-05-27 10:28:56
 * @LastEditTime: 2021-12-23 09:36:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\PasswordFirst\PasswordFirst.vue
-->
<template>
  <div class="bgA" style="z-index:0">
    <div class="bgA_1">
      <p class="bgA_1_1">
        <span>重置密码：</span>
        <span @click="$emit('toIndex', 0)">X</span>
      </p>
      <ul class="bgA_1_2">
        <li class="bgA_1_2_1">
          <span style="width:110px;line-height:36px">原密码：</span>
          <el-input v-model="pwd1" type="password"></el-input>
        </li>
        <li class="bgA_1_2_1">
          <span style="width:110px;line-height:36px">新密码：</span>
          <el-input v-model="pwd2" type="password"></el-input>
        </li>
        <li class="bgA_1_2_1">
          <span style="width:110px;line-height:36px">确认密码：</span>
          <el-input v-model="pwd3" type="password"></el-input>
        </li>
        <p class="bgA_1_3">
          <span class="bgA_1_3_1" @click="ModifyPass">确定</span>
        </p>
      </ul>
    </div>
  </div>
</template>

<script src="./PasswordFirst.js"></script>

<style lang="scss" scoped>
  @import './PasswordFirst.scss'
</style>
