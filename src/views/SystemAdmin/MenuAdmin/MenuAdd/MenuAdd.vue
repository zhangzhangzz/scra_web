<!--
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-09-15 19:30:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\SystemAdmin\MenuAdmin\MenuAdd\MenuAdd.vue
-->
<template>
  <el-dialog
    title="添加菜单"
    :visible.sync="dialogVisible"
    v-loading="loading"
    width="700px"
    class="add-dialog"
    :before-close="setIndex"
    :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
    <ul class="Bul">
      <li class="Bul_1">
        <span class="BulSpan">上级菜单:</span>
        <el-input v-model="input1" placeholder="请输入内容" class="InputWidth" @focus="HDChange(1)" readonly></el-input>
      </li>
      <li class="Bul_1">
        <span class="BulSpan">菜单类型:</span>
        <p class="InputWidth">
          <!-- lable对应选择的值 -->
          <el-radio v-model="radio" label="1" v-if="MenuType==4">目录</el-radio>
          <el-radio v-model="radio" label="2" v-if="MenuType=='菜单'">菜单</el-radio>
          <el-radio v-model="radio" label="3" v-if="MenuType=='按钮'">按钮</el-radio>
        </p>
      </li>
      <li class="Bul_1" v-if="radio==1||radio==2||radio==3">
        <span class="BulSpan">{{radio==3?"按钮名称":"菜单名称"}}</span>
        <el-input v-model="name" placeholder="请输入名称" class="InputWidth"></el-input>
      </li>
      <li class="Bul_1" v-if="radio==1||radio==2">
        <span class="BulSpan">导航栏名称:</span>
        <el-input v-model="title" placeholder="请输入导航栏名称" class="InputWidth"></el-input>
      </li>
      <li class="Bul_1" v-if="radio==1||radio==2||radio==3">
        <span class="BulSpan">授权码:</span>
        <el-input v-model="auth" placeholder="请输入授权码" class="InputWidth"></el-input>
      </li>
      <li class="Bul_1" v-if="radio==1||radio==2">
        <span class="BulSpan">请求地址:</span>
        <el-input v-model="path" placeholder="请输入请求地址" class="InputWidth">
          <template slot="prepend" v-if="radio==1">/</template>
        </el-input>
      </li>
      
      <li class="Bul_1" v-if="radio==3">
        <span class="BulSpan">按钮标识:</span>
        <el-input v-model="button" placeholder="请输入按钮标识" class="InputWidth"></el-input>
      </li>
      <li class="Bul_1" v-if="radio==1||radio==2||radio==3">
        <span class="BulSpan">权限标识:</span>
        <el-input v-model="perm" placeholder="请输入权限标识" class="InputWidth"></el-input>
      </li>
      <li class="Bul_1" v-if="radio==1">
        <span class="BulSpan">菜单图标:</span>
        <!-- <el-input v-model="icon" placeholder="请输入菜单图标" class="InputWidth"></el-input> -->
        <el-upload
        :class="{hide1:fileList.length>0}"
          action="#"
          list-type="picture-card"
          :on-change="handlePreview"
          accept=".jpg,.jpeg,.png,.JPG,.JPEG,.svg"
          :file-list="fileList"
          :limit="1"
          :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
              <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                  <!-- <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                  >
                  <i class="el-icon-zoom-in"></i>
                  </span> -->
                  <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                  >
                  <i class="el-icon-delete"></i>
                  </span>
              </span>
              </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible1">
          <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
      </li>
      <li class="Bul_1" v-if="radio==1||radio==2">
        <span class="BulSpan">组件标识符:</span>
        <el-input v-model="component" placeholder="请输入组件标识符" class="InputWidth"></el-input>
      </li>
      <li class="Bul_1" v-if="radio==1">
        <span class="BulSpan">重定向路径:</span>
        <el-input v-model="redirect" placeholder="请输入重定向路径" class="InputWidth">
          <template slot="prepend">/</template>
        </el-input>
      </li>
      
      <li class="Bul_1" v-if="radio==1||radio==2">
        <span class="BulSpan">预留:</span>
        <p class="InputWidth">
          <!-- lable对应选择的值 -->
          <el-radio v-model="keepAlive" label="0">否</el-radio>
          <el-radio v-model="keepAlive" label="1">是</el-radio>
        </p>
      </li>
      
      <li class="Bul_1" v-if="radio==1||radio==2||radio==3">
        <span class="BulSpan">禁用:</span>
        <p class="InputWidth">
          <!-- lable对应选择的值 -->
          <el-radio v-model="status" label="0">否</el-radio>
          <el-radio v-model="status" label="1">是</el-radio>
        </p>
      </li>
      <li class="Bul_1" v-if="radio==1||radio==2">
        <span class="BulSpan">是否显示:</span>
        <p class="InputWidth">
          <!-- lable对应选择的值 -->
          <el-radio v-model="hidden" label="1">否</el-radio>
          <el-radio v-model="hidden" label="0">是</el-radio>
        </p>
      </li>
      <li class="Bul_1" v-if="radio==1||radio==2||radio==3">
        <span class="BulSpan">备注:</span>
        <el-input v-model="remark" placeholder="请输入内容" class="InputWidth"></el-input>
      </li>
    </ul>

   <!-- 菜单选择 -->
    <div class="CM hidden" v-if="HD==1">
      <ul class="CMenu">
        <p class="CMenu_1">
          <span>选择菜单</span>
          <span class="close" @click="HDChange(0)">X</span>
        </p>
        <p class="CMenu_2" @click="queding(100)">主目录</p>
        <ul class="CMenu_3">
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </ul>
        <p class="CMenu_4">
          <span class="OK" @click="queding(0)">确定</span>
          <span class="NOOK" @click="HDChange(0)">关闭</span>
        </p>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="setIndex">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./MenuAdd.js"></script>

<style lang="scss" scoped>
  @import "./MenuAdd.scss"
</style>
