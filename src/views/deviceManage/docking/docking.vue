<!--
 * @Author: your name
 * @Date: 2021-06-04 15:14:46
 * @LastEditTime: 2021-10-14 13:36:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\deviceManage\docking\docking.vue
-->

<template>
    <div class="docking" style="height:100%;overflow-y: auto;">
        <div class="all" style="min-height:calc(100% - 47px)">
            <el-row class="sys_top">
                <el-col :span="24" class="row">
                    <div class="thirdBtn" @click="$router.back()" style="margin-left:auto">返回</div>
                    <div class="firBtn" @click="addButtDevice" style="margin-left:10px;margin-right:0">添加对接</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="sys_bottom">
                    <el-table
                        ref="multipleTable"
                        v-loading="loading"
                        :data="tableData"
                        border 
                        class="customer-no-border-table"
                        :header-cell-style="{background:'#4B5365',color:'#fff'}"
                        style="width: 100%">
                        <el-table-column
                        type="index"
                        align="center"
                        :index="makeIndex"
                        label="序号">
                        </el-table-column>
                        <el-table-column
                        prop="sbbh"
                        align="center"
                        label="设备编号">
                            <template slot-scope="scope">
                                {{$route.query.deviceId}}
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="appName"
                        align="center"
                        label="对接名称">
                        </el-table-column>
                        <el-table-column
                        prop="dockingType"
                        align="center"
                        label="对接类型">
                            <template slot-scope="scope">
                                {{scope.row.dockingType==0?'直连':'中转'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="appSn"
                        align="center"
                        label="SN">
                        </el-table-column>
                        <el-table-column
                        prop="appKey"
                        align="center"
                        label="KEY">
                        </el-table-column>
                        <el-table-column
                        prop="creatTime"
                        align="center"
                        label="添加时间">
                        </el-table-column>
                        <el-table-column
                        prop="status"
                        align="center"
                        label="状态">
                            <template slot-scope="scope">
                                <span :style="{color:scope.row.status==1?'rgb(252,103,71)':'rgb(128,204,93)'}">{{scope.row.status==1?'停用':'正常'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200" align="center">
                            <template slot-scope="scope">
                                <el-button @click="editForm(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button @click="dialogVisible=true" type="text" size="small">禁用</el-button>
                                <el-button @click="handleOut(scope.row)" type="text" size="small" style="color:red">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    
                </el-col>
            </el-row>
        </div>
        
        <el-dialog
            class="groupEdit"
            v-loading="loading1"
            element-loading-text="正在同步设备"
            :title="type?'添加对接':'编辑对接'"
            :visible.sync="dialogVisible"
            :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="对接平台" prop="appName">
                    <div class="fw">
                    <el-select v-model="ruleForm.appName" @change="selectChange">
                        <el-option :label="a.appName" :value="[a.appId,a.appType]" v-for="(a,index) in appList" :key="index"></el-option>
                    </el-select>
                    </div>
                </el-form-item>
                <div v-if="fromPage==0">
                    <el-form-item label="建委IP" prop="ip" v-if="appType==0">
                        <div class="fw">
                        <el-input v-model="ruleForm.ip"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="建委PORT" prop="port" v-if="appType==0">
                        <div class="fw">
                        <el-input v-model="ruleForm.port"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="建委SN" prop="appSn" v-if="appType==0">
                        <div class="fw">
                        <el-input v-model="ruleForm.appSn"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="建委KEY" prop="appKey" v-if="appType==0">
                        <div class="fw">
                        <el-input v-model="ruleForm.appKey"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="设备SN" prop="appSn" v-if="appType==1 || appType==2">
                        <div class="fw">
                        <el-input v-model="ruleForm.appSn"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="appKey" prop="appKey" v-if="appType==1 || appType==2">
                        <div class="fw">
                        <el-input v-model="ruleForm.appKey"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="对接方式" prop="dockingType" v-if="appType==1">
                        <div class="fw">
                        <el-select v-model="ruleForm.dockingType">
                            <el-option label="直连" value=0></el-option>
                            <el-option label="中转" value=1></el-option>
                        </el-select>
                        </div>
                    </el-form-item>
                </div>
                <div v-if="fromPage==1">
                    <el-form-item label="设备SN" prop="appSn">
                        <div class="fw">
                        <el-input v-model="ruleForm.appSn"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="appKey" prop="appKey">
                        <div class="fw">
                        <el-input v-model="ruleForm.appKey"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="对接方式" prop="dockingType">
                        <div class="fw">
                        <el-select v-model="ruleForm.dockingType">
                            <el-option label="直连" value=0></el-option>
                            <el-option label="中转" value=1></el-option>
                        </el-select>
                        </div>
                    </el-form-item>
                </div>
                
                

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="addButt" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {ycDeviceButtList,ycDeviceButtAdd,ycDeviceButtEdit,deleteDeviceButt} from '@/api/api.js'
    export default {
        data() {
            return {
                tableData: [],
                active:0,
                value:'设备状态',
                value1:'深圳的范德萨发',
                dialogVisible:false,
                appType:'',
                pageSize:10,
                page:1,
                total:0,
                loading1:false,
                loading:false,
                appList:[],
                ruleForm: {
                    appId:'',
                    appSn:'',
                    deviceId: '',
                    appKey:'',
                    ip:'',
                    port:''
                },
                rules: {
                    appId: [
                        { required: true, message: '请选择对接平台', trigger: 'blur' }
                    ],
                    appSn: [
                        { required: true, message: '请输入建委Sn', trigger: 'blur' }
                    ],
                    // appKey: [
                    //     { required: true, message: '请输入建委Key', trigger: 'blur' }
                    // ],
                    ip: [
                        { required: true, message: '请输入建委IP', trigger: 'blur' }
                    ],
                    port: [
                        { required: true, message: '请输入建委端口', trigger: 'blur' }
                    ]

                },
                type:1 ,
                fromPage:'',                //1实名制  0扬尘          
            }
        },
        mounted() {
            this.showList();
            // this.appList = JSON.parse(this.$route.query.appList)
            this.ruleForm.deviceId = this.$route.query.deviceId,
            this.fromPage = this.$route.query.type
            
        },
        methods: {
            handleClose(){
                this.dialogVisible = false;
            },

            makeIndex(index) {
                return (this.page - 1) * this.pageSize + index + 1
            },

            selectChange(e){
                this.appId = e[0];
                this.appType = e[1];
                console.log(e)
            },

            //添加对接弹框
            addButtDevice(){
                this.type = 1;
                this.ruleForm.appId = '';
                this.ruleForm.appSn = '';
                this.ruleForm.appKey = '';
                this.dialogVisible = true;
            },

            //添加对接
            addButt(){
                let that = this;
                this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let params = that.ruleForm;
                    that.ruleForm.appId = that.appId;
                    let param = {};
                    param.deviceId = that.ruleForm.deviceId
                    param.appId = that.ruleForm.appId
                    param.appSn = that.ruleForm.appSn
                    param.appKey = that.ruleForm.appKey
                    if(that.fromPage==0){
                        if(that.appType==0){
                            //非建委
                            param.ip = that.ruleForm.ip
                            param.port = that.ruleForm.port
                        }else{
                            param.dockingType = that.ruleForm.dockingType
                        }
                    }else{
                        param.dockingType = that.ruleForm.dockingType
                    }
                    
                    // delete obj.appName;
                    that.loading1 = true;
                    if(that.type){
                        ycDeviceButtAdd(param).then(res => {
                            that.loading1 = false;
                            if(res.code == 200){
                                this.$alert(res.message, '提示', {
                                    confirmButtonText: '确定',
                                    showClose:false,
                                    closeOnClickModal:false,
                                    closeOnPressEscape:false,
                                    closeOnHashChange:false,
                                    callback: action => {
                                        that.showList();
                                        that.dialogVisible = false;
                                        that.resetForm('ruleForm');
                                    }
                                });
                            }else{
                              this.$message.error(res.message);
                                this.loading1 = false;
                            }
                          })
                          .catch(() => {this.loading1 = false;})
                    }else{
                        ycDeviceButtEdit(param).then(res => {
                        that.loading1 = false;
                        if(res.code == 200){
                            this.$alert(res.message, '提示', {
                                confirmButtonText: '确定',
                                showClose:false,
                                closeOnClickModal:false,
                                closeOnPressEscape:false,
                                closeOnHashChange:false,
                                callback: action => {
                                    that.showList();
                                    that.dialogVisible = false;
                                    that.resetForm('ruleForm');
                                }
                            });
                        }else{
                          this.$message.error(res.message);
                            this.loading1 = false;
                        }
                      })
                      .catch(() => {that.dialogVisible = false;this.loading1 = false;})
                    }
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
                
            },

            handleOut(row){
                this.$confirm('确定删除将该设备吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param = {
                        appId:row.appId,
                        deviceId:row.deviceId
                    };
                    deleteDeviceButt(param).then(res => {
                        if(res.code == 200){
                            this.$alert(res.message, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.showList();
                                }
                            });
                        }else{
                          this.$message.error(res.message);
                        }
                      })
                      .catch(() => {})
                    
                }).catch(() => {     
                });
            },

            //展示角色
            showList(){
              let that = this;
                that.loading = true;
              let params = {
                    pageNumber:that.page,
                    limit:that.pageSize,
                    deviceId:that.$route.query.deviceId
                };
                ycDeviceButtList(params).then(res => {
                    that.loading = false;
                    if(res.code == 200){
                        that.tableData = res.data.pageResult.items;
                        that.total = res.data.pageResult.total;
                        this.appList = res.data.appList
                        console.log(that.tableData)
                    }else{
                      this.$message.error(res.message);
                        this.loading = false;
                    }
                  })
                  .catch(() => {this.loading = false;})
            },

            resetForm(formName) {
                this.dialogVisible = false;
                this.$refs[formName].resetFields();
            },

            editForm(row){
                let obj = {};
                obj.deviceId = row.deviceId;
                obj.appId = row.appId;
                obj.appSn = row.appSn;
                obj.appKey = row.appKey;
                this.ruleForm = obj;
                this.type = 0;
                this.dialogVisible=true;
            }
        }
    }

</script>
<style lang="scss">
    .docking{
        background-color: #f5f6f7;
        .fw{
            // width: 300px;
        }
        .el-form-item{
            margin-bottom: 15px;
        }
        .demo-ruleForm{
            margin-top: 20px;
        }
        .formWapper{
            padding: 15px;
            background-color: #fff;
            margin-bottom: 15px;
            text-align: right;
            .actived{
                border-top: 1px solid #009688;
                color: #009688;
            }

            .default{
                border-top: 1px solid transparent;
                color: #333;
            }

            .mr{
                text-align: center;
                height: 36px;
                line-height: 36px;
                cursor: pointer;
            }

        }

        .sureBtn{
            background-color:#009688;
            border: 1px solid transparent;
            color: #fff;
        }

        .btn1{
            cursor: pointer;
            color:#108cff;
        }

        .btn2{
            color: #ff5722;
            cursor: pointer;
        }

        .czBtn{
            margin-right: 10px;
        }
        

        .groupEdit{

            .el-dialog__body{
                padding:10px 20px 0;
            }


            .el-select{
                width: 100%;
            }


            .inputWapper{
                border-top:1px solid #DCDFE6;
                border-bottom:1px solid #DCDFE6;
                color: #333;
                padding: 20px 0 0;

                
                .el-input__suffix,.el-input__suffix-inner{
                    height: 36px!important;
                    line-height: 36px!important;
                }

                .warn{
                    color: #ff3915;
                    font-size: 28px;
                    margin: auto 2px auto 0;
                    line-height: 65px;
                }

                .el-select{
                    margin: auto;
                }

                .el-form-item--medium .el-form-item__label{
                    width: auto!important;
                }

                .el-form-item--medium .el-form-item__content{
                    margin-left: 110px!important;
                }

                
                .el-input__inner{
                    color: #333;
                }
            }
            
        }

    }
</style>