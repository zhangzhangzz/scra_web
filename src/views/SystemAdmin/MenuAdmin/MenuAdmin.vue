<!--
 * @Author: your name
 * @Date: 2021-07-01 16:31:12
 * @LastEditTime: 2021-09-28 13:16:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\SystemAdmin\MenuAdmin\MenuAdmin.vue
-->
<template>
  <div style="height:100%">
    <div style="height:100%;overflow-y: auto;">
      <ul class="sys_top">
        <li class="sys_top_1 row">
          <span class="spanM" style="line-height:36px">菜单名称</span>
          <div class="width:199px"><el-input v-model="menuName" placeholder="请输入菜单名称" suffix-icon="el-icon-search"></el-input></div>
        </li>
        <li class="sys_top_1 row">
          <span class="spanM" style="line-height:36px">禁用状态</span>
          <div style="width:199px">
          <el-select v-model="menuStatus" placeholder="请选择状态" clearable >
            <el-option v-for="(item,i) of options" :key="i" :label="item.label" :value="item.value" />
          </el-select>
          </div>
        </li>
        <div class="thirdBtn"  @click="showF"  style="margin:0 0 0 auto">搜索</div>
        <div class="firBtn"  @click="getDialog(1)" style="margin:0 0 0 20px" v-if="buttonList.includes('MenuAddBtn')">新增</div>
      </ul>

      <div class="sys_bottom">
        <div class="custom-tree-container">
          <el-table
            :data="tableData"
            row-key="menuId"
            :expand-row-keys="expands"
            border
            class="customer-no-border-table"
            :header-cell-style="{background:'#4B5365',color:'#fff'}"
            v-loading="loading"
            style="width: 100%;margin-bottom: 20px;"
          >
            <el-table-column
              prop="menuName"
              label="菜单名称"
              align="center"
              sortable
              width="180"
              min-width="120"
            />
            <el-table-column
              align="center"
              prop="path"
              label="请求地址"
              min-width="160"
            />
            <el-table-column
              align="center"
              prop="menuType"
              label="类型"
              min-width="120"
            >
              <template slot-scope="scope">
                <div>{{scope.row.menuType==0?'目录':(scope.row.menuType==1?'菜单':'按钮')}}</div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="status"
              label="禁用"
              min-width="120"
            >
              <template slot-scope="scope">
                <div>{{scope.row.menuStatus==1?'是':'否'}}</div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="perm"
              label="权限标识"
              min-width="180"
            />
            <el-table-column
              align="center"
              prop="address"
              label="操作"
              width="160"
            >
            <template slot-scope="scope">
              <el-button @click="getDialogOne(scope.row,2)" v-if="buttonList.includes('MenuEditBtn')" type="text" size="small" >编辑</el-button>
              <el-button @click="delMenu(scope.row.menuId,scope.row.auth)" type="text" size="small"  v-if="buttonList.includes('MenuDelBtn')"  style="color:red">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    
    <menu-add :key="time" @getIndex="getIndex" v-if="Inde==1" />
    <menu-update :key="timeOne" :DataUpdate="DataUpdate" @getIndex="getIndex" v-if="Inde==2" />
  </div>
</template>

<script src="./MenuAdmin.js"></script>


<style lang="scss" scoped>
  @import "./MenuAdmin.scss"
</style>
