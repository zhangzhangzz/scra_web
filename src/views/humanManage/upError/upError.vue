<!--
 * @Author: your name
 * @Date: 2021-08-12 14:08:42
 * @LastEditTime: 2021-09-07 17:40:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\upError\upError.vue
-->
<template>
  <div style="height:100%;overflow-y: auto;" class="upError">
    <div class="all" style="min-height:calc(100% - 47px)">
      <ul class="sys_top">
        <globalProject  @queryProId="queryProId"/>
        <li class="sys_top_1 row">
          <span class="spanM" style="line-height:36px">姓名</span>
          <div style="width:199px">
            <el-input v-model="persName" placeholder="请输入姓名"></el-input>
          </div>
        </li>
        <li class="sys_top_1 row">
          <span class="spanM" style="line-height:36px">上传平台</span>
          <div style="width:199px">
            <el-select v-model="appId" clearable  placeholder="上传平台">
              <el-option
                v-for="item in options.appList"
                :key="item.appId"
                :label="item.appName"
                :value="item.appId">
              </el-option>
            </el-select>
          </div>
        </li>
        <div class="thirdBtn" style="margin-left:auto" @click="showList">查询</div>
        <div class="secBtn" style="margin-left:10px" @click="countDel">删除</div>
      </ul>
      
      <div class="sys_bottom">
        <el-table
          ref="multipleTable"
          :data="tableData"
          v-loading="loading"
          border max-height="calc(100% - 110px)"
          class="customer-no-border-table"
          :header-cell-style="{background:'#4B5365',color:'#fff'}"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            min-width="45"
            header-align="center"
            align="center"
          />
          <el-table-column
            :index="makeIndex"
            label="序号"
            type="index"
            align="center"
            width="50"
          />
          <el-table-column
            prop="persName"
            label="姓名"
            align="center"
            width="80"
          />
          <el-table-column
            prop="portrait"
            label="人员头像"
            align="center"
            width="110"
          >
            <template slot-scope="scope">
              <img :src="scope.row.portrait" alt="" style="width: 40px;height: 40px;">
            </template>
          </el-table-column>
          
          <el-table-column
            prop="showIdno"
            label="身份证号码"
            align="center"
            width="160"
          />
          <el-table-column
            prop="age"
            label="年龄"
            align="center"
            width="50"
          />
          <el-table-column
            prop="projectName"
            label="项目名称"
            align="center"
          />
          <el-table-column
            prop="teamName"
            label="班组"
            align="center"
          />
          <el-table-column
            prop="workName"
            label="工种"
            align="center"
          />
          <el-table-column
            prop="appName"
            label="上传平台"
            align="center"
            width="110"
          />
          <el-table-column
            prop="errorMessage"
            label="人员上传失败描述"
            align="center"
          />
          
          <el-table-column
            prop="d10"
            label="操作"
            align="center"
            width="100"
          >
          <template slot-scope="scope">
              <el-button @click="dels1(scope.row)" type="text" size="small" style="color:red">删除</el-button>
          </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    

    <el-pagination 
      class="pageLine"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :page-size="10"
      @size-change="handleSizeChange"
      :total="total">
    </el-pagination>
    
    <el-dialog title="授权" :visible.sync="dialogFormVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="35%" >
      <el-transfer v-model="value1" :data="data1" :titles="['未授权', '已授权']" filterable :filter-method="filterMethod" filter-placeholder="请输入设备名称" @change="handleChange"></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="assUser">确 定</el-button>
      </div>
    </el-dialog>
    

    
  </div>
</template>

<script src="./upError.js"></script>

<style lang="scss" scoped>
  @import "./upError.scss"
</style>
