<template>
  <div class="update">
    <ul class="update_1">
      <p class="update_1_1">
        <span>修改角色</span>
        <span class="close" @click="setIndex(0)">X</span>
      </p>
      <li class="update_1_2">
        <span class="bgName">角色名称:</span>
        <el-input v-model="input3" placeholder="超级管理员" class="input-with-select" />
      </li>
      <li class="update_1_2">
        <span class="bgName">字符权限:</span>
        <el-input v-model="input3" placeholder="damin" class="input-with-select" />
      </li>
      <li class="update_1_2">
        <span class="bgName">状态:</span>
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
        </el-input>
      </li>
      <li class="update_1_2">
        <span class="bgName">备注:</span>
        <el-input v-model="input3" placeholder="超级管理员" class="input-with-select" />
      </li>
      <li class="update_1_2">
        <span class="bgName">菜单权限:</span>
        <div style="width: 400px;height: 50px;border:1px solid #ccc" />
        </el-input>
      </li>
      <div class="bg_4">
        <span class="bg_4_1">保存</span>
        <span class="bg_4_2" @click="setIndex(0)">关闭</span>
      </div>
    </ul>
  </div>
</template>

<script src="./RoleModify.js"></script>

<style lang="scss" scoped>
  @import "./RoleModify.scss"
</style>
