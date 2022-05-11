<!--
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-06-18 15:34:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\RoleAdd\RoleAdd.vue
-->
<template>
  <div class="update">
    <ul class="update_1">
      <p class="update_1_1">
        <span>{{data!=''?'修改角色':'新增角色'}}</span>
        <span class="close" @click="setIndex(0)">X</span>
      </p>
      <li class="update_1_2">
        <span class="bgName">角色名称:</span>
        <el-input v-model="roleName" placeholder="" class="input-with-select" />
      </li>
      <!-- <li class="update_1_2">
        <span class="bgName">字符权限:</span>
        <el-input v-model="input3" placeholder="damin" class="input-with-select" />
      </li> -->
      <li class="update_1_2">
        <span class="bgName">禁用状态:</span>
        <el-switch
          v-model="roleStates"
          :active-value=1
          :inactive-value=0
        />
      </li>
      <li class="update_1_2">
        <span class="bgName">备注:</span>
        <el-input v-model="remark" placeholder="" class="input-with-select" />
      </li>
      <!-- <li class="update_1_2">
        <span class="bgName">菜单权限:</span>
        <div style="width: 400px;height: 50px;border:1px solid #ccc" />
      </li> -->
      <div class="bg_4">
        <el-button type="primary" size="small" @click="saveRole">保存</el-button>
        <el-button size="small" @click="setIndex(0)">关闭</el-button>
      </div>
    </ul>
  </div>
</template>

<script src="./RoleAdd.js"></script>

<style lang="scss" scoped>
  @import "./RoleAdd.scss"
</style>
