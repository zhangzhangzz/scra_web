<!--
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-09-15 19:29:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\SystemAdmin\MenuAdmin\MenuUpdate\MenuUpdate.vue
-->
<template>
<div>
  <el-dialog
  class="up-dialog"
    title="修改菜单"
    :visible.sync="dialogVisible"
    width="700px"
    :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
    :before-close="setIndex">
    <ul class="Bul">
      <li class="Bul_1">
        <span class="BulSpan">上级菜单:</span>
        <el-input v-model="DataUpdate.menuType==0?'主目录':row.parentName" placeholder="请输入内容" class="InputWidth"  readonly></el-input>
      </li>
      <li class="Bul_1">
        <span class="BulSpan">菜单类型:</span>
        <p class="InputWidth">
          <!-- lable对应选择的值 -->
          <el-radio v-model="radio" label="1" v-if="radio=='1'">目录</el-radio>
          <el-radio v-model="radio" label="2" v-if="radio=='2'">菜单</el-radio>
          <el-radio v-model="radio" label="3" v-if="radio=='3'">按钮</el-radio>
        </p>
      </li>
      <li class="Bul_1">
        <span class="BulSpan">{{DataUpdate.menuType===2?"按钮名称":"菜单名称"}}</span>
        <el-input v-model="row.menuName" placeholder="请输入名称" class="InputWidth"></el-input>
      </li>
      <li class="Bul_1" v-if="DataUpdate.menuType!==2">
        <span class="BulSpan">导航栏名称:</span>
        <el-input v-model="row.title" placeholder="请输入导航栏名称" class="InputWidth"></el-input>
      </li>
      <li class="Bul_1">
        <span class="BulSpan">授权码:</span>
        <el-input v-model="row.auth" placeholder="请输入授权码" class="InputWidth"></el-input>
      </li>
      <li class="Bul_1" v-if="DataUpdate.menuType!==2">
        <span class="BulSpan">请求地址:</span>
        <el-input v-model="row.path" placeholder="请输入请求地址" class="InputWidth">
          <template slot="prepend" v-if="radio==1">/</template>
        </el-input>
      </li>
      
      <li class="Bul_1" v-if="DataUpdate.menuType===2">
        <span class="BulSpan">按钮标识:</span>
        <el-input v-model="row.permissions" placeholder="请输入按钮标识" class="InputWidth"></el-input>
      </li>
      <li class="Bul_1" >
        <span class="BulSpan">权限标识:</span>
        <el-input v-model="row.permissions" placeholder="请输入权限标识" class="InputWidth"></el-input>
      </li>
      <li class="Bul_1" v-if="DataUpdate.menuType===0">
        <span class="BulSpan">菜单图标:</span>
        <!-- <el-input v-model="row.icon" placeholder="请输入菜单图标" class="InputWidth"></el-input> -->
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
      <li class="Bul_1" v-if="DataUpdate.menuType!==2">
        <span class="BulSpan">组件标识符:</span>
        <el-input v-model="row.component" placeholder="请输入组件标识符" class="InputWidth"></el-input>
      </li>
      <li class="Bul_1" v-if="DataUpdate.menuType===0">
        <span class="BulSpan">重定向路径:</span>
        <el-input v-model="row.redirect" placeholder="请输入重定向路径" class="InputWidth">
          <template slot="prepend">/</template>
        </el-input>
      </li>
      
      <li class="Bul_1" v-if="DataUpdate.menuType!==2">
        <span class="BulSpan">预留:</span>
        <p class="InputWidth">
          <!-- lable对应选择的值 -->
          <el-radio v-model="row.keepAlive" label="0">否</el-radio>
          <el-radio v-model="row.keepAlive" label="1">是</el-radio>
        </p>
      </li>
      
      <li class="Bul_1">
        <span class="BulSpan">禁用:</span>
        <p class="InputWidth">
          <!-- lable对应选择的值 -->
          <el-radio v-model="row.menuStatus" label="0">否</el-radio>
          <el-radio v-model="row.menuStatus" label="1">是</el-radio>
        </p>
      </li>
      <li class="Bul_1" v-if="radio==1||radio==2">
        <span class="BulSpan">是否显示:</span>
        <p class="InputWidth">
          <!-- lable对应选择的值 -->
          <el-radio v-model="row.hidden" label="1">否</el-radio>
          <el-radio v-model="row.hidden" label="0">是</el-radio>
        </p>
      </li>
      <li class="Bul_1">
        <span class="BulSpan">备注:</span>
        <el-input v-model="row.remark" placeholder="请输入内容" class="InputWidth"></el-input>
      </li>
    </ul>

    <span slot="footer" class="dialog-footer">
        <el-button @click="setIndex(0)">取 消</el-button>
        <el-button type="primary" @click="UpdateDate()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./MenuUpdate.js"></script>

<style lang="scss" scoped>
  @import "./MenuUpdate.scss"
</style>
