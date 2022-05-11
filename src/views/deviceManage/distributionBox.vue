
<!--
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-10 21:39:37
 * @LastEditTime: 2021-11-25 14:30:35
-->

<template>
    <div class="distri" style="height:100%;overflow-y: auto;">
        <div class="all" style="min-height:calc(100% - 47px)">
            <ul class="sys_top">
                <globalProject  @queryProId="queryProId" v-if="user.userType!=1"/>
                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">设备名称</span>
                    <div class="width:199px"><el-input v-model="deviceName" placeholder="请输入设备名称" suffix-icon="el-icon-search"></el-input></div>
                    
                </li>
                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">设备状态</span>
                    <div style="width:199px">
                        <el-select v-model="onlineStatus" placeholder="请选择" clearable >
                            <el-option label="在线" :value=0>在线</el-option>
                            <el-option label="离线" :value=1>离线</el-option>
                        </el-select>
                    </div>
                </li>
                <div class="thirdBtn" @click="showList" style="margin-left:auto">查询</div>
                <div class="firBtn" @click="addDevice" style="margin-left:20px">添加设备</div>
            </ul>    
            <div class="sys_bottom" >
                <el-row>
                    <el-col :span="24" >
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
                            width="50"
                            :index="makeIndex"
                            header-align="center"
                            align="center"
                            label="序号">
                            </el-table-column>
                            <el-table-column
                            prop="projectName"
                            align="center"
                            label="项目名称">
                            </el-table-column>
                            <el-table-column
                            prop="deviceName"
                            align="center"
                            label="设备名称">
                            </el-table-column>
                            
                            <el-table-column
                            prop="deviceId"
                            align="center"
                            width="200"
                            label="设备编号">
                            </el-table-column>
                            <el-table-column
                            prop="deviceType"
                            align="center"
                            width="120"
                            label="设备类型" >
                                <template slot-scope="scope">
                                    扬尘
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="hardwareVersion"
                            align="center"
                            width="100"
                            label="版本号">
                            </el-table-column>
                            <el-table-column
                            prop="onlineStatus"
                            align="center"
                            width="80"
                            label="设备状态">
                                <template slot-scope="scope">
                                    {{scope.row.onlineStatus?'离线':'在线'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="buttApps"
                            align="center"
                            width="150"
                            label="对接平台" >
                                <template slot-scope="scope">
                                    <span v-for="(b,index) in scope.row.buttApps" :key="index">{{index+1==scope.row.buttApps.length?b.appName:b.appName+','}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="createTime"
                            align="center"
                            width="180"
                            label="添加时间" />
                            
                            <el-table-column label="操作" width="150" align="center" fixed="right" v-if="user.userType!==1">
                                <template slot-scope="scope">
                                    <el-button @click="$router.push({path: 'docking',query: {deviceId:scope.row.deviceId,type:0}})" type="text" size="small">对接</el-button>
                                    <el-button  type="text" size="small" @click="setDevice(scope.row)">配置</el-button>
                                    <el-button @click="handleOut(scope.row)" type="text" size="small" style="color:red">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </div>
        
        
         <el-pagination 
            class="pageLine"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-size="pageSize"
            :total="total">
        </el-pagination>
    <el-dialog title="添加设备" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%" >
      <el-form :model="ruleForm1" ref="ruleForm1" :rules="rules1">
        <el-form-item label="项目名称" prop="projectId" :label-width="formLabelWidth"> 
            <div class="fw">
                <el-select v-model="ruleForm1.projectId" :disabled="user.userType==1?true:false"  placeholder="请选择">
                    <el-option v-for="(item,i) of deviceData" :key="i" :label="item.projectName" :value="item.projectId" />
                </el-select>
            </div>
        </el-form-item>
        <el-form-item label="设备名称" prop="deviceName" :label-width="formLabelWidth">
          <el-input v-model="ruleForm1.deviceName" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="deviceId" :label-width="formLabelWidth">
          <el-input v-model="ruleForm1.deviceId" autocomplete="off" ></el-input>
        </el-form-item>
        <!-- <el-form-item label="设备类型" prop="deviceType" :label-width="formLabelWidth">
            <el-select v-model="ruleForm1.deviceType" placeholder="请选择">
                <el-option v-for="(item,i) of deviceType" :key="i" :label="item.typeName" :value="item.dicValue" />
            </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="addDeviceSure" v-loading="loading1">确 定</el-button>
      </div>
    </el-dialog>

        <el-dialog
            class="groupEdit"
            :title="setDeviceData.deviceName+'-设备配置'"
            style="text-align:center"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible1"
            width="30%"
            :show-close="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="识别距离" prop="comRecDistModeType"> 
                    <div class="fw">
                        <el-radio-group v-model="ruleForm.comRecDistModeType">
                            <el-radio :label="1">无限制</el-radio>
                            <el-radio :label="2">0.5米</el-radio>
                            <el-radio :label="3">1米</el-radio>
                            <el-radio :label="4">1.5米</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="通行方式" prop="comRecRank"> 
                    <div class="fw">
                        <el-radio-group v-model="ruleForm.comRecRank">
                            <el-radio :label="1">快速优先</el-radio>
                            <el-radio :label="2">安全优先</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="连续识别" prop="repeatRegEnable"> 
                    <div class="fw">
                        <el-radio-group v-model="ruleForm.repeatRegEnable">
                            <el-radio :label="2">开启</el-radio>
                            <el-radio :label="1">关闭</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="人像检测" prop="faceDetectionType"> 
                    <div class="fw">
                        <el-radio-group v-model="ruleForm.faceDetectionType">
                            <el-radio :label="1">多人识别</el-radio>
                            <el-radio :label="2">单人识别</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="人证合一" prop="idCardFaceEnable"> 
                    <div class="fw">
                        <el-radio-group v-model="ruleForm.idCardFaceEnable">
                            <el-radio :label="1">开启</el-radio>
                            <el-radio :label="2">关闭</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="设备类型" > 
                    <div class="fw">
                        <el-radio-group v-model="ruleForm.idCardFaceHardware">
                            <el-radio :label="1">IC读头</el-radio>
                            <el-radio :label="2">新中新</el-radio>
                            <el-radio :label="3">精伦</el-radio>
                            <el-radio :label="4">中控</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="设备接口" > 
                    <div class="fw">
                        <el-radio-group v-model="ruleForm.idCardFaceIntf">
                            <el-radio :label="1">USB</el-radio>
                            <el-radio :label="2">TTL</el-radio>
                            <el-radio :label="3">232</el-radio>
                            <el-radio :label="4">IC</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="考勤间隔时间(秒)" prop="comRecTimeWindow">
                    <div class="fw">
                    <el-input v-model="ruleForm.comRecTimeWindow" type="number"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="人像匹配率" prop="faceScore">
                    <div class="fw">
                    <el-input v-model="ruleForm.faceScore"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="人像阀值" prop="idCardFaceScore">
                    <div class="fw">
                    <el-input v-model="ruleForm.idCardFaceScore" type="number"></el-input>
                    </div>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle1" style="margin-right:0.3rem">取 消</el-button>
                <el-button type="primary" @click="addConfig"  v-loading="loading1"  >确 定</el-button>
            </span>
        </el-dialog>
        
        
    </div>
</template>
<script>
import globalProject from '../../components/custom/globalProject/globalProject.vue'
import {smzDeviceList,fuzzyQuery,addDevice,deleteDevice } from '@/api/api.js'
export default {
    components:{
        globalProject
    },
    data() {
        return {
            deviceId:'',        //设备编号
            deviceName:'',      //设备名称
            onlineStatus:'',     //设备状态
            loading:false,
            multipleSelection:[],
            user:JSON.parse(localStorage.getItem('user')),
            form:{
                name:'',
                device:'',
                status:''
            },
            tableData: [],
            input:'',
            value:'设备状态',
            value1:'深圳的范德萨发',
            dialogVisible:false,
            dialogVisible1:false,
            formLabelWidth: '80px',
            ruleForm1: {
                projectId:'',
                deviceType:1,
                deviceName:'',
                deviceId:''
            },
            ruleForm: {
                deviceId:'',
                comRecDistModeType:'',
                comRecTimeWindow:'',
                comRecRank:'',
                repeatRegEnable:'',
                faceScore:'',
                faceDetectionType:'',
                idCardFaceEnable:'',
                idCardFaceHardware:'',
                idCardFaceIntf:'',
                idCardFaceScore:'',
                inoutFlag:''
            },
            rules1: {
                projectId: [
                    { required: true, message: '请选择项目', trigger: 'blur' }
                ],
                deviceName: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                deviceId: [
                    { required: true, message: '请输入设备编号', trigger: 'blur' }
                ]
            } ,

            rules: {
                comRecDistModeType: [
                    { required: true, message: '请选择识别距离', trigger: 'blur' }
                ],
                comRecRank: [
                    { required: true, message: '请选择通行方式', trigger: 'blur' }
                ],
                repeatRegEnable: [
                    { required: true, message: '请选择是否连续识别', trigger: 'blur' }
                ],
                faceDetectionType: [
                    { required: true, message: '请选择人像检测类型', trigger: 'blur' }
                ],
                idCardFaceEnable: [
                    { required: true, message: '请选择人证合一类型', trigger: 'blur' }
                ],
                comRecTimeWindow:[
                    { required: true, message: '请输入考勤间隔时间', trigger: 'blur' }
                ],
                faceScore:[
                    { required: true, message: '请输入人像匹配率', trigger: 'blur' }
                ]
            } ,
            
            setDeviceData:'',
            page:1,
            total:0,
            pageSize:10,
            radio:'',
            deviceType:[],
            deviceData:'',
            loading1:false,
            activeName:'',
            options:[],
            appList:[],
            globalProjectId:''
        }
    },
     mounted() {
        this.showList();
    },
    methods: {
        queryDeviceType(type){
            let name 
            this.deviceType.forEach(function(item,index,arr){
                if(item.typeId == type){
                    name = item.typeName
                    return
                }
            })
            return name
        },

        queryProId(id){
            this.globalProjectId = id;
        },

        handleSizeChange(val) {
			this.pageSize = val;
			this.showList(this.type);
		},

        makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

        //取消添加
        cancle(){
            this.$refs.ruleForm1.resetFields();
            this.dialogVisible = false
            this.loading1 = false;
        },

        cancle1(){
            this.dialogVisible1 = false
            this.loading1 = false;
            this.$refs.ruleForm.resetFields();
        },


        addDeviceSure(){
            let that = this;
            this.$refs.ruleForm1.validate((valid) => {
            if (valid) {
                let params = that.ruleForm1;
                that.loading1 = true;
                addDevice(params).then(res => {
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
                                that.cancle();
                            }
                        });
                    }else{
                      this.$message.error(res.message);
                        that.cancle();
                    }
                  })
                  .catch(() => {})
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },

        //添加设备弹出框
        addDevice(){
            this.ruleForm = {
                projectId:'',
                deviceType:'',
                deviceName:'',
                deviceId:''
            };
            this.dialogVisible = true;
            this.queryResult();

        },

         resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        handleClose(){
            this.dialogVisible = false;
            this.resetForm('ruleForm')
        },

        handleClose1(){
            this.dialogVisible1 = false;
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        handleCommand(command) {
            if(command!=6){
                this.handleOut(command);
            }else{
                this.dialogVisible = true;
            }
            
        },

        setDevice(row){
            console.log(row)
            this.setDeviceData = row;
            this.ruleForm = row;
            this.dialogVisible1 = true
        },

        handleOut(row){
            this.$confirm(`确定删除"${row.deviceName}"设备吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteDevice({deviceId:row.deviceId}).then(res => {
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
                globalProjectId:that.globalProjectId==''?'':that.globalProjectId.id,
                deviceName:that.deviceName,
                deviceId:that.deviceId,
                onlineStatus:that.onlineStatus==''?null:that.onlineStatus
            };
            smzDeviceList(params).then(res => {
                that.loading = false;
                if(res.code == 200){
                    that.tableData = res.data.pageResult.items;
                    that.total = res.data.pageResult.total;
                    that.deviceType = res.data.deviceTypeList;
                    that.appList = res.data.appList;
                }else{
                  this.$message.error(res.message);
                    this.loading = false;
                }
              })
              .catch(() => {this.loading = false;})
        },

        handleCurrentChange(val) {
            this.page = val;
            this.showList()
        },

        //配置
        addConfig(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                let that = this;
                that.ruleForm.comRecTimeWindow = parseFloat(that.ruleForm.comRecTimeWindow);
                that.ruleForm.faceScore = parseFloat(that.ruleForm.faceScore);
                that.ruleForm.idCardFaceScore = that.ruleForm.idCardFaceScore == ''?'':parseFloat(that.ruleForm.idCardFaceScore);
                that.loading1 = true;
                let params =that.ruleForm;
                setDevice(params).then(res => {
                    if(res.code == 200){
                    this.$alert(res.message, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        that.cancle();
                        that.showList();
                        }
                    });
                      
                    }else{
                      this.$message.error(res.message);
                        this.cancle();
                    }
                  })
                  .catch(() => {})
                } else {
                console.log('error submit!!');
                return false;
                }
            });
            // this.dialogVisible1 = false;
            
        },

        queryResult(){
            let that = this;
            if(that.user.userType==1){
                that.ruleForm.projectId = that.options[0].value
            }else{
                fuzzyQuery(this.state).then(res => {
                if(res.code == 200){
                    that.deviceData = res.data
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {})
            }
        },

    }
}

</script>
<style lang="scss" scoped>
    .distri{
        background-color: #fff;
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
            padding: 0 5px;
            margin:auto 5px;
            border-right:1px solid #ccc;
            border-left:1px solid #ccc;
            }

        .kqWapper{
            .el-dialog__header{
            }
            
            .el-dialog__body{
                padding: 10px;
            }

            .bz{
                font-size: 10px;
                color: #ccc;
            }

            .tbState:first-of-type{
                margin-right: 30px;
            }

            .t_title{
                color: #ff5722;
                margin: 10px 0;
            }

            .tbState{
                text-align: center;
                padding: 0 0 10px;

                span:first-of-type{
                    font-size: 20px;
                    margin-bottom: 5px;
                }

                .success{
                    color: #2dbd0e;
                }

                .fail{
                    color: #ff5722;
                }
                
            }

            .el-dialog__footer{
                text-align: center;
            }
        }
        

        .groupEdit{
            .el-dialog__header{
            }

            .el-dialog__body{
                padding:10px 20px 0;
            }

            .el-dialog__footer{
                text-align: center;
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

         .el-radio-group{
            width: 100%;
            padding-left: 20px;
            text-align: left;
        }

        ::v-deep .el-select{
            width: 100%;
        }

    }
</style>