<!--
 * @Author: your name
 * @Date: 2021-05-27 10:28:56
 * @LastEditTime: 2021-06-15 17:10:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\PhoneFist\PhoneFist.vue
-->
<template>
  <div class="bgA" style="z-index:0">
    <div class="bgA_1">
      <p class="bgA_1_1">
        <span>已绑定手机号：</span>
        <span @click="$emit('toIndex', 0)">X</span>
      </p>
      <div class="bgA_1_2">
        <p class="bgA_1_2_1">您的账号可能存在安全风险,为了确保您本人操作，请先进行安全验证。</p>
        <p class="bgA_1_2_2">验证方式：</p>
        <div class="bgA_1_2_3" style="padding-left:0;border:none"><el-input v-model="input" placeholder="请输入手机号" /></div>
        <div class="bgA_1_2_4">
          <input type="text" placeholder="请输入6位数的验证码">
          <p>发送验证码</p>
        </div>
        <p class="bgA_1_2_5" @click="ModifyPass">确定</p>
      </div>
    </div>
  </div>
</template>

<script src="./PhoneFist.js"></script>

<style lang="scss" scoped>
  @import './PhoneFist.scss'
</style>
