<!--
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-06-18 14:58:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\UserAdd\UserAdd.vue
-->
<template>
  <div class="bg userAdd">
    <p class="bg_1">基本信息</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="24" class="wapper">
        <el-col :span="8">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="24" class="wapper">
        
        <el-col :span="8">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
           <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      
      <el-row :gutter="24" class="wapper">
        
        <el-col :span="8">
          <el-form-item label="用户类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择用户类型" style="width:100%">
              <el-option v-for="item  of yh_option" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
           <el-form-item label="是否禁用" prop="status">
              <el-switch v-model="ruleForm.status" ></el-switch>
            </el-form-item>
        </el-col>
      </el-row>
  
      
      <p class="bg_1">其他信息</p>
      <el-row :gutter="24" class="wapper">
        <el-col :span="16">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24" class="wapper">
        <el-col :span="16" style="text-align: center;">
          <el-button type="primary" @click="submitForm('ruleForm')">{{this.$route.query.data==undefined?'新增':'修改'}}</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-col>
      </el-row> 
      <!-- <div class="bg_4">
        <span class="bg_4_1">保存</span>
        <span class="bg_4_2" @click="exit()">关闭</span>
      </div> -->
    </el-form>
  </div>
</template>

<script src="./UserAdd.js"></script>

<style scoped lang="scss">
  @import './UserAdd.scss';
</style>
