<!--
 * @Author: your name
 * @Date: 2021-07-22 11:38:21
 * @LastEditTime: 2021-10-27 16:50:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\applicationManage\projectManage\projectManage.vue
-->
<template>
  <div style="height:100%;overflow-y:auto" class="projectManage">
      <el-row>
          <el-col :span="12" style="margin:0.5rem 0 0.5rem 0.5rem" v-if="ruleForm!=''">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <!-- <el-form-item label="扬尘预警设置" prop="delivery">
                    <el-switch v-model="ruleForm.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="预警手机" prop="name">
                    <div class="row">
                        <el-input v-model="ruleForm.name"></el-input>
                        <span class="warn">(支持输入2个号码,用'逗号'区分)</span>
                    </div>
                </el-form-item>
                <el-form-item label="视频预警设置" prop="delivery">
                    <el-switch v-model="ruleForm.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="预警手机" prop="name">
                    <div class="row">
                        <el-input v-model="ruleForm.name"></el-input>
                        <span class="warn">(支持输入2个号码,用'逗号'区分)</span>
                    </div>
                </el-form-item>
                <el-form-item label="实名制预警设置" prop="delivery">
                    <el-switch v-model="ruleForm.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="预警手机" prop="name">
                    <div class="row">
                        <el-input v-model="ruleForm.name"></el-input>
                        <span class="warn">(支持输入2个号码,用'逗号'区分)</span>
                    </div>
                </el-form-item> -->
                <el-form-item label="超龄人员设置" prop="overage">
                    <el-switch v-model="ruleForm.overage"></el-switch>
                </el-form-item>
                <el-form-item label="超龄年龄设置" prop="overageValue">
                    <div class="row">
                        <el-input v-model="ruleForm.overageValue"></el-input>
                        <span class="warn">(支持输入50-80年龄段)</span>
                    </div>
                </el-form-item>
                <el-form-item label="人员自动退场" prop="automaticExit">
                    <el-switch v-model="ruleForm.automaticExit"></el-switch>
                </el-form-item>
                <el-form-item label="退场时间设置" prop="automaticExitValue">
                    <div class="row">
                        <el-input v-model="ruleForm.automaticExitValue"></el-input>
                        <span class="warn">(支持输入3-90天)</span>
                    </div>
                </el-form-item>

                <!-- <div class="mini-title">邮件提示：</div>
                <el-form-item label="当日采集人员" prop="delivery">
                    <div class="row email">
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                        <span class="warn">(当日新采集人员通过邮件发送)</span>
                    </div>
                </el-form-item>
                <el-form-item label="发送时间" prop="name">
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="当日考勤信息" prop="delivery">
                    <div class="row email">
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                        <span  class="warn">(当日考勤信息通过邮件发送)</span>
                    </div>
                </el-form-item>
                <el-form-item label="发送时间" prop="name">
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="超龄人员信息" prop="delivery">
                    <div class="row email">
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                        <span  class="warn">(超龄人员采集之后马上通过邮件发送)</span>
                    </div>
                </el-form-item>
                <el-form-item label="发送时间" prop="name">
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="少数名字人员信息" prop="delivery">
                    <div class="row email">
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                        <span class="warn">(少数名字人员信息采集之后马上通过邮件发送)</span>
                    </div>
                </el-form-item>
                <el-form-item label="发送时间" prop="name">
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item> -->

                
                <el-form-item style="margin-top:40px">
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                </el-form-item>
            </el-form>
          </el-col>
      </el-row>
  </div>
</template>

<script>
    import {getProjectFeatures,projectFeaturesUpdate} from '@/api/api.js'
    export default {
        data() {
            var age = (rule, value, callback) => {
                var num = parseInt(value);
                if (value !== '' && this.ruleForm.overage && ( num < 50 || num > 80 )) {
                    callback(new Error('请输入50-80年龄段'));
                }else {
                    callback();
                }
            };
            var exit = (rule, value, callback) => {
                var num = parseInt(value);
                if (value !== '' && this.ruleForm.automaticExit && ( num < 3 || num > 90 )) {
                    callback(new Error('请输入3-90天'));
                }else {
                    callback();
                }
            };
            return {
                data:'',
                user:JSON.parse(localStorage.getItem('user')),
                ruleForm:'',
                rules: {
                    overageValue: [
                        {required: true, validator : age, trigger: 'blur' }
                    ],
                    automaticExitValue: [
                        {required: true, validator : exit, trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            this.showList();
        },
        methods: {
            //展示角色
            showList(){
                let that = this;
                that.loading = true;
                JSON.parse(localStorage.getItem('userProject'))[0].projectId
                getProjectFeatures().then(res => {
                    if(res.code == 200){
                        that.ruleForm = res.data;
                    }else{
                      this.$message.error(res.message);
                        that.loading = false;
                    }
                  })
                  .catch(() => {that.loading = false;})
            },

            submitForm(formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    that.ruleForm.overageValue = that.ruleForm.overageValue*1;
                    that.ruleForm.automaticExitValue = that.ruleForm.automaticExitValue*1;
                    projectFeaturesUpdate(that.ruleForm).then(res => {
                        if(res.code == 200){
                            this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            showClose:false,
                            closeOnClickModal:false,
                            closeOnPressEscape:false,
                            closeOnHashChange:false,
                            callback: action => {
                                that.showList();
                            }
                            });
                          
                        }else{
                          this.$message.error(res.message);
                        }
                      })
                      .catch(() => {})
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        }
    }
</script>
<style lang="scss">
    .projectManage{
        .warn{
            width: 6rem;
            line-height: 36px;
            margin-left: 10px;
            color: #8d9199;
        }

        .mini-title{
            color: #606266;
            line-height: 40px;
            padding: 0 12px 0 0;
            font-size: 13px;
            font-weight: 700;
            width: 120px;
            text-align: right;
        }

        .email{
            .el-switch__core{
                margin-top: 15px!important;
            }
        }
        
    }
</style>