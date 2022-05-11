<!--
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-08-26 12:48:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\projectManage\projectDrawing\projectDrawing.vue
-->
<template>
  <div>
    <ul class="sys_top">
      <li class="sys_top_2">
        <span class="spanM">项目名称</span>
        <input type="text" placeholder="请输入">
      </li>
      <div class="button_search">
        <img src="../../../assets/images/button/search.png">
        <span>搜索</span>
      </div>
      <div class="button_reset">
        <img src="../../../assets/images/button/reset.png">
        <span>重置</span>
      </div>
    </ul>

    <div class="sys_bottom">
      <ul class="sys_bottom_1">
        <li class="sys_bottom_1_add" @click="Jump(1)">
          <img src="../../../assets/images/button/add.png">
          <span>添加图纸</span>
        </li>
        <li class="sys_bottom_1_del" @click="handleOut1">
          <img src="../../../assets/images/button/del.png">
          <span>批量删除</span>
        </li>
      </ul>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="d"
            label="序号"
            align="center"
            min-width="40"
          />
          <el-table-column
            prop="d1"
            label="项目名称"
            align="center"
            min-width="120"
          />
          <el-table-column
            prop="d2"
            label="图片数量"
            align="center"
            min-width="120"
          />
          <el-table-column
            prop="d3"
            label="上传人员"
            align="center"
            min-width="120"
          />
          <el-table-column
            prop="d4"
            label="添加时间"
            align="center"
            min-width="120"
          />
          <el-table-column
            prop="type"
            label="操作"
            align="center"
            min-width="120"
          >
            <el-button  size="mini" @click="$router.push('/projectManage/ProjectDetail')">详情</el-button>
            <el-button type="danger" size="mini" @click="handleOut2" style="color:red">删除</el-button>
          </el-table-column>
        </el-table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">

      <!-- <div class="columns tree" v-for="(d,index) in data" :style="{height: d.open ? 'auto': '20px', maxHeight: d.open ? d.height: '20px', transition: 'max-height .5s ease-in'}"> -->
      
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./projectDrawing.js"></script>

<style lang="scss" scoped>
  @import "./projectDrawing.scss"
</style>
