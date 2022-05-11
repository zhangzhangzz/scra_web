<template>
  <div class="bg">
    <p class="bg_1">基本信息</p>
    <ul class="bg_2">
      <li>
        <span class="bgName">项目名称:</span>
        <el-select v-model="option" placeholder="天宝路一号" clearable size="small" style="width:400px;height: 34px;" disabled>
          <el-option v-for="(item,i) of options" :key="i" :label="item" :value="item" />
        </el-select>
      </li>
      <li>
        <span class="bgName">项目账号:</span>
        <el-input v-model="input3" placeholder="scrat1161" class="input-with-select" disabled />
      </li>
      <li>
        <span class="bgName">用户名:</span>
        <el-input v-model="input3" placeholder="请输入内容" class="input-with-select" />
      </li>

      <li>
        <span class="bgName">密码:</span>
        <el-input v-model="input3" placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </li>

      <li>
        <span class="bgName">手机号:</span>
        <el-input v-model="input3" placeholder="请输入内容" class="input-with-select" disabled>
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </li>
      <li>
        <span class="bgName">邮箱:</span>
        <el-input v-model="input3" placeholder="请输入内容" class="input-with-select" disabled>
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </li>
      <li>
        <span class="bgName">用户性别:</span>
        <el-select v-model="option" placeholder="项目选择" clearable size="small" style="width:400px;height: 34px;">
          <el-option v-for="(item,i) of options" :key="i" :label="item" :value="item" />
        </el-select>
      </li>
      <li>
        <span class="bgName">是否启用:</span>
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </li>
    </ul>
    <p class="bg_1">其他信息</p>
    <ul class="bg_3">
      <li>
        <span class="bgNames">备注:</span>
        <el-input
          v-model="textarea2"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
        />
      </li>
    </ul>
    <div class="bg_4">
      <span class="bg_4_1">保存</span>
      <span class="bg_4_2" @click="exit()">关闭</span>
    </div>
  </div>
</template>

<script src="./UserModify.js"></script>

<style scoped lang="scss">
  @import './UserModify.scss';
</style>
