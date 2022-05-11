<!--
 * @Author: your name
 * @Date: 2021-07-29 14:57:49
 * @LastEditTime: 2021-11-26 14:19:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\applicationManage\dataSet\dataSet.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-07-22 12:35:38
 * @LastEditTime: 2021-07-29 14:55:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\applicationManage\dataManage\dataManage.vue
-->
<template>
  <div style="height:100%;overflow-y: auto;">
    <div class="all" style="height:calc(100% - 47px);">
        <div class="sys_bottom">
          <template>
            <el-table
              :data="tableData "
              v-loading="loading"
              border 
              class="customer-no-border-table"
              :header-cell-style="{background:'#4B5365',color:'#fff'}"
              style="width: 100%"
            >
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="60"
              />
              <el-table-column
                align="center"
                prop="conType"
                label="数据类型"
                min-width="100"
              >
              <template slot-scope="scope">
                {{queryDeviceType(scope.row.conType)}}
            </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="chinaStandardNumber"
                label="国控编号"
                min-width="170"
              />
              <el-table-column
                align="center"
                prop="chinaStandardName"
                label="国控区域"
                min-width="170"
              />
              
              <el-table-column
                align="center"
                prop="triggerVal"
                label="超标系数"
                min-width="70"
              />
              <el-table-column
                  align="center"
                  prop="floatVal"
                  label="低标系数"
                  min-width="70"
              >
              </el-table-column>
              <el-table-column
                align="center"
                prop="ncv"
                label="显示国控值"
                min-width="70"
              />
              
             
              <el-table-column
                align="center"
                prop="enableControl"
                label="状态"
                min-width="70"
              >
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.enableControl"
                        @change="changeRole($event,scope.row)"
                        :active-value="1"
                        :inactive-value="0"
                        >
                    </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="time"
                label="采集时间"
                min-width="180"
              />
               <el-table-column
                align="center"
                prop="highest"
                label="阀值"
                min-width="70"
              />
              <el-table-column
                align="center"
                label="操作"
                width="70"
              >
                <template slot-scope="scope">
                  <el-button @click="edit(scope.row)"  type="text" size="small">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
    </div>
    
    <!-- <el-pagination 
        class="pageLine"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :page-size="10"
        
        :total="total">
      </el-pagination> -->

    <!-- 创建项目
    .0 -->
    <el-dialog
      :title="'修改'+name"
      :visible.sync="dialogFormVisible"
      :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
      width="30%">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="超标系数" :label-width="formLabelWidth" prop="chinaStandardNumber" >
          <div class="row">
            <div style="width:150px">
              <el-input v-model="form.chinaStandardNumber" autocomplete="off" placeholder="请输入国控编号"></el-input>
            </div>
            <span style="font-size:12px;color:#888;margin-left:15px">支持输入0-1的数值，如0.1对应10%</span>
          </div>
        </el-form-item>
        <el-form-item label="低标系数" :label-width="formLabelWidth" prop="chinaStandardNumber">
          <div class="row">
            <div style="width:150px">
              <el-input v-model="form.chinaStandardNumber" autocomplete="off" placeholder="请输入国控编号"></el-input>
            </div>
            <span style="font-size:12px;color:#888;margin-left:15px">支持输入0-1的数值，如0.1对应10%</span>
          </div>
        </el-form-item>
        <el-form-item label="上传阀值" :label-width="formLabelWidth" prop="highest">
          <div class="row">
            <div style="width:150px">
              <el-input type="number" v-model="form.highest" autocomplete="off" placeholder="请输入阀值"></el-input>
            </div>
            <span style="font-size:12px;color:#888;margin-left:15px">设置阀值之后，超过阀值断开建委发送</span>
          </div>
        </el-form-item>
        <el-form-item label="国控值" :label-width="formLabelWidth" prop="ncv">
          <div class="row">
            <div style="width:150px">
              <el-input type="number" v-model="form.ncv" autocomplete="off" placeholder="请输入国控值"></el-input>
            </div>
            <span style="font-size:12px;color:#888;margin-left:15px">请输入10以上的正整数</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editData" v-loading="loading1">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script src="./dataSet.js"></script>
<style lang="scss" scoped>
  @import "./dataSet.scss"
</style>