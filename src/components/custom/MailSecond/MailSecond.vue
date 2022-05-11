<template>
  <div class="bgA">
    <div class="bgA_1">
      <p class="bgA_1_1">
        <span>绑定邮箱：</span>
        <span @click="ModifyPass(0)">X</span>
      </p>
      <div class="bgA_1_2">
        <p class="bgA_1_2_1">请输入需要绑定的邮箱：</p>
        <input type="text" placeholder="请输入邮箱" class="bgA_1_2_3">
        <div class="bgA_1_2_4">
          <input type="text" placeholder="请输入6位数的验证码">
          <p>发送验证码</p>
        </div>
        <p class="bgA_1_2_5">确定</p>
      </div>
    </div>
  </div>
</template>

<script src="./MailSecond.js"></script>

<style lang="scss" scoped>
  @import './MailSecond.scss'
</style>
