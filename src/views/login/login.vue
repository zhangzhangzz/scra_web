<!--
 * @Author: your name
 * @Date: 2021-07-01 16:31:12
 * @LastEditTime: 2021-07-08 10:45:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\login\login.vue
-->
<template>
  <div class="All">
    <div class="bg">
      <p class="bg_1">智慧工地云平台</p>
      <ul class="bg_2">
        <li>
          <img src="../../assets/images/login/number.png">
          <input type="text" placeholder="请输入用户名"></input>
        </li>
        <li>
          <img src="../../assets/images/login/Password_n.png">
          <input type="password" placeholder="请输入用户名"></input>
        </li>
      </ul>
      <div class="bg_3">
        <input type="checkbox" checked @click="agree()">
        <span>我已阅读并同意《客户协议》《风险披露协议》《客法律声明》</span>
      </div>
      <p class="bg_4">登录</p>
      <p class="bg_5">忘记密码？</p>
    </div>
  </div>
</template>

<script src="./login.js"></script>

<style lang="scss" scoped>
  @import "./login.scss";
</style>
