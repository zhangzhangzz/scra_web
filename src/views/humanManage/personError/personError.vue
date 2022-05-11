<!--
 * @Author: your name
 * @Date: 2021-08-17 10:51:22
 * @LastEditTime: 2021-08-26 20:45:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\personError\personError.vue
-->
<template>
  <div style="height:100%">
    <div style="height:100%;overflow-y: auto;">
      <ul class="sys_top">
        <globalProject  @queryProId="queryProId" v-if="user.userType!=1"/>
        <li class="sys_top_1 row">
          <span class="spanM" style="line-height:36px">姓名</span>
          <div class="width:199px"><el-input v-model="menuName" placeholder="请输入姓名" suffix-icon="el-icon-search"></el-input></div>
        </li>
        
        <div class="thirdBtn"  @click="showF"  style="margin:0 0 0 auto">批量上传</div>
      </ul>

      <div class="sys_bottom">
        <div class="custom-tree-container">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="同步建委异常" name="first">
                 <el-table
                    :data="tableData"
                    row-key="menuId"
                    border
                    class="customer-no-border-table"
                    :header-cell-style="{background:'#4B5365',color:'#fff'}"
                    v-loading="loading"
                    :expand-row-keys="expands"
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
                      <el-button @click="delMenu(scope.row.menuId,scope.row.auth)" type="text" size="small"  v-if="buttonList.includes('MenuDelBtn')" >删除</el-button>
                    </template>
                    </el-table-column>
                  </el-table>
            </el-tab-pane>
            <el-tab-pane label="上传建委考勤异常" name="second">
                <el-table
                  :data="tableData"
                  row-key="menuId"
                  border
                  class="customer-no-border-table"
                  :header-cell-style="{background:'#4B5365',color:'#fff'}"
                  v-loading="loading"
                  :expand-row-keys="expands"
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
                    <el-button @click="delMenu(scope.row.menuId,scope.row.auth)" type="text" size="small" style="color:red"  v-if="buttonList.includes('MenuDelBtn')" >删除</el-button>
                  </template>
                  </el-table-column>
                </el-table>
            </el-tab-pane>
          </el-tabs>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./personError.js"></script>


<style lang="scss" scoped>
  @import "./personError.scss"
</style>