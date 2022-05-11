<!--
 * @Author: your name
 * @Date: 2021-07-22 12:36:30
 * @LastEditTime: 2021-08-16 11:06:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\applicationManage\ruleManage\ruleManage.vue
-->
<template>
  <div style="height:100%">
    <!-- <globalProject :data="pageName" /> -->
    <div class="all" style="height:calc(100% - 44px);overflow-y: auto;">
        <ul class="sys_top">
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">规则名称</span>
            <div class="width:199px"><el-input v-model="projectName" placeholder="请输入规则名称"></el-input></div>
          </li>
          
          <div class="thirdBtn" @click="" style="margin-left:auto">查询</div>
        </ul>
        <div class="sys_bottom">
          <template>
            <el-table
              :data="tableData"
              v-loading="loading"
              border max-height="calc(100% - 110px)"
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
                prop="projectName"
                label="规则名称"
                min-width="150"
              />
              <el-table-column
                align="center"
                prop="consOrg"
                label="规则说明"
                min-width="170"
              />
              <el-table-column
                align="center"
                prop="projectType"
                label="修改时间"
                min-width="170"
              />
              
              <el-table-column
                align="center"
                label="操作"
                width="270"
              >
                <template slot-scope="scope">
                  <el-button @click=""  type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
    </div>
    
    <el-pagination 
        class="pageLine"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :page-size="10"
        
        :total="total">
      </el-pagination>

    <!-- 创建项目
    .0 -->
    <el-dialog
      title="修改"
      :visible.sync="dialogFormVisible"
      :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
      width="30%">
      <el-form :model="form">
        <el-form-item label="AQI" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off" placeholder="请输入AQI"></el-input>
        </el-form-item>
        <el-form-item label="PM10" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" placeholder="请输入PM10"></el-input>
        </el-form-item>
        <el-form-item label="PM2.5" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" placeholder="请输入PM2.5"></el-input>
        </el-form-item>
        <el-form-item label="温度" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" placeholder="请输入温度"></el-input>
        </el-form-item>
        <el-form-item label="噪音" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" placeholder="请输入噪音"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" v-loading="loading">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
    import {} from '@/api/api.js'
    import globalProject from '../../../components/custom/globalProject/globalProject.vue'
    export default {
        components:{
            globalProject
        },
        data() {
            return {
                dialogFormVisible:false,
                form:{

                },
                tableData:[],
                page:1,
                total:0,
                pageName:'projectList',
                formLabelWidth: '80px',
                projectName:'',
                loading:false,
                
            }
        },
        mounted() {
            // this.showList();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },

            handleCurrentChange(val) {
                this.page = val;
                this.showList()
            },

            
            
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        }
    }
</script>
<style lang="scss" scoped>

</style>