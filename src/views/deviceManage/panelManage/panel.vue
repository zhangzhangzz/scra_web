
<!--
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-10 21:39:37
 * @LastEditTime: 2021-10-11 17:48:06
-->

<template>
    <div class="panelManage" style="height:100%;overflow-y: auto;">
        <div class="all" style="min-height:calc(100% - 47px)">
            <ul class="sys_top">
                <globalProject  @queryProId="queryProId" v-if="user.userType!=1"/>
                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">设备名称</span>
                    <div class="width:199px"><el-input v-model="deviceName" placeholder="请输入设备名称" suffix-icon="el-icon-search"></el-input></div>
                    
                </li>
                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">设备编号</span>
                    <div class="width:199px"><el-input v-model="deviceId1" placeholder="设备编号" suffix-icon="el-icon-search"></el-input></div>
                    
                </li>
                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">设备状态</span>
                    <div style="width:199px">
                        <el-select v-model="onlineStatus" placeholder="请选择" clearable>
                            <el-option label="在线" :value=1></el-option>
                            <el-option label="离线" :value=0></el-option>
                            <el-option label="未安装" :value=2></el-option>
                        </el-select>
                    </div>
                </li>
                <div class="thirdBtn" @click="showList" style="margin-left:auto">查询</div>
            </ul>    
                <!-- <el-button type="primary"  class="sureBtn" style="margin-left:10px" v-if="active==0" @click="dialogVisible=true">添加设备</el-button>
                    <el-button  plain="true" style="margin-left:10px" v-if="active==1">导出数据</el-button> -->
            <div class="sys_bottom">
                <el-row>
                    <el-col :span="24" >
                        <el-table
                            ref="multipleTable"
                            v-loading="loading"
                            :data="tableData"
                            border
                            class="customer-no-border-table"
                            :header-cell-style="{background:'#4B5365',color:'#fff'}"
                            @selection-change="handleSelectionChange"
                            style="width: 100%">
                            <el-table-column
                                type="selection"
                                header-align="center"
                            align="center"
                                width="55">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            type="index"
                            label="序号"
                            :index="makeIndex"
                            width="60">
                            </el-table-column>
                            <el-table-column
                            prop="projectName"
                            align="center"
                            label="项目名称">
                            </el-table-column>
                            <el-table-column
                            prop="deviceId"
                            align="center"
                            width="200"
                            label="设备编号">
                            </el-table-column>
                            <el-table-column
                            prop="mainBoardStatus"
                            align="center"
                            width="80"
                            label="设备状态">
                                <template slot-scope="scope">
                                    {{scope.row.mainBoardStatus==0?'离线':(scope.row.mainBoardStatus===1?'在线':'未安装')}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="createTime"
                            align="center"
                            width="180"
                            label="离线时间">
                            </el-table-column>
                            
                            <el-table-column label="操作" width="150" align="center" fixed="right">
                                <template slot-scope="scope" >
                                    <el-button @click="$router.push({path: 'setPing',query: {id:scope.row.deviceId}})" type="text" size="small">配置</el-button>
                                    <!-- <el-button @click="handleOut(scope.row)" type="text" size="small"  style="color:red">删除</el-button> -->
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
            :page-size="pageSize"
            @size-change="handleSizeChange"
            :total="total">
        </el-pagination>

        
        
    </div>
</template>
<script>
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
import {panelList,addDevice,deleteDevice,setDevice,fuzzyQuery,pullAttendByDevice} from '@/api/api.js'
export default {
    components:{
        globalProject
    },
    data() {
        return {
            loading:false,
            multipleSelection:[],
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
            ruleForm1: {
                deviceId:'',
                deviceName:'',
                projectId:'',
                deviceType:'3',
                appId:'',
                installSite:'',
                inoutFlag:''
            },
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

            rules1: {
                projectId: [
                    { required: true, message: '请选择项目', trigger: 'blur' }
                ],
                deviceName: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                deviceId: [
                    { required: true, message: '请输入设备编号', trigger: 'blur' }
                ],
                // deviceType: [
                //     { required: true, message: '请选择设备类型', trigger: 'blur' }
                // ],
                appId: [
                    { required: true, message: '请选择设备平台', trigger: 'blur' }
                ],
                installSite: [
                    { required: true, message: '请选择安装位置', trigger: 'blur' }
                ],
                inoutFlag: [
                    { required: true, message: '请选择进出门标识', trigger: 'blur' }
                ],
            } ,
            
            setDeviceData:'',
            page:1,
            total:0,
            radio:'',
            deviceType:[],
            deviceData:'',
            pageSize:10,
            deviceName:'',
            deviceId:'',
            deviceId1:'',
            onlineStatus:'',
            appList:[],
            globalProjectId:'',
            globalProjectId1:'',
            user:JSON.parse(localStorage.getItem('user')),
            install:[],
            loading1:false,
            project:''
        }
    },
     mounted() {
        this.showList();
    },
    methods: {
        makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

        queryDeviceType(type,tag){
            if(type==null)
            return
            let name 
            if(tag){
                this.deviceType.forEach(function(item,index,arr){
                    if(item.dicKey == type){
                        name = item.dicValue
                        return
                    }
                })
            }else{
                this.install.forEach(function(item,index,arr){
                    if(item.dicKey == type){
                        name = item.dicValue
                        return
                    }
                })
            }
            return name
        },

        queryProId(id){
            this.globalProjectId = id;
        },

        queryProId1(id){
            this.globalProjectId1 = id;
        },

        cancle(){
            this.dialogVisible1 = false;
            this.resetForm('ruleForm');
            this.loading1 = false;
        },

        cancle1(){
            this.dialogVisible = false;
            this.resetForm('ruleForm1');
            this.loading1 = false;
        },

        //添加设备弹出框
        addDevice(){
            this.ruleForm1 = {
                projectId:'',
                deviceType:3,
                deviceName:'',
                deviceId:'',
                appId:'',
                installSite:'',
                inoutFlag:''
            };
            this.dialogVisible = true;
            this.queryResult();

        },

        queryAppType(type){
            if(type==null)
            return
            let name 
            this.appList.forEach(function(item,index,arr){
                if(item.appId == type){
                    name = item.appName
                    return
                }
            })
            return name
        },

        handleSizeChange(val) {
			this.pageSize = val;
			this.showList(this.type);
		},

        formatDate(now) { 
            var year=now.getFullYear();  //取得4位数的年份
            var month=(now.getMonth()+1) < 10 ? '0'+ (now.getMonth()+1):now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
            var date=now.getDate()< 10 ? '0'+now.getDate():now.getDate();      //返回日期月份中的天数（1到31）
            var hour=now.getHours() < 10 ?'0'+now.getHours():now.getHours();     //返回日期中的小时数（0到23）
            var minute=now.getMinutes()< 10 ?'0'+now.getMinutes():now.getMinutes(); //返回日期中的分钟数（0到59）
            var second=now.getSeconds()< 10 ?'0'+now.getSeconds():now.getSeconds(); //返回日期中的秒数（0到59）
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
        },

        submitForm(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = that.ruleForm1;
                that.loading1 = true;
                addDevice(params).then(res => {
                    if(res.code == 200){
                        this.$alert('添加成功', '提示', {
                            confirmButtonText: '确定',
                            showClose:false,
                            closeOnClickModal:false,
                            closeOnPressEscape:false,
                            closeOnHashChange:false,
                            callback: action => {
                                that.showList();
                                that.cancle1();
                            }
                        });
                    }else{
                      this.$message.error(res.message);
                      this.cancle1();
                    }
                  })
                  .catch(() => {this.cancle1();})
            } else {
                console.log('error submit!!');
                return false;
            }
            });
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
            this.setDeviceData = row;
            this.ruleForm.deviceId = row.deviceId;
            this.dialogVisible1 = true
        },

        handleOut(row){
            this.$confirm('确定删除将该设备吗?', '提示', {
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
          let params = {
                pageNumber:that.page,
                limit:that.pageSize,
                globalProjectId:that.globalProjectId==''?'':that.globalProjectId.id,
                deviceName:that.deviceName,
                deviceId:that.deviceId1,
                onlineStatus:that.onlineStatus===''?'':that.onlineStatus
            };
            that.loading = true;
            panelList(params).then(res => {
                if(res.code == 200){
                    that.tableData = res.data.pageResult.items;
                    that.deviceType = res.data.deviceTypeList;
                    that.appList = res.data.appList;
                    that.loading = false;
                    that.install = res.data.deviceInstallSiteList
                    that.total = res.data.pageResult.total;
                }else{
                  this.$message.error(res.message);
                that.loading = false;
                }
              })
              .catch(() => {that.loading = false;})
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
                  .catch(() => {this.cancle();})
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
                // that.ruleForm.projectId = that.options[0].value
                that.deviceData = JSON.parse(localStorage.getItem('userProject'))
                that.ruleForm1.projectId = that.deviceData[0].projectId
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

        //拉取考勤
        getAttendance(row){
            let that = this;
            let params = {
                deviceId:row.deviceId
            };
            pullAttendByDevice(params).then(res => {
                if(res.code == 200){
                    this.$alert(res.message, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        that.showList();
                        }
                    });
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {})
        }

    }
}

</script>
<style lang="scss" scoped>
    .panelManage{
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

        }
        

        .groupEdit{
            .el-dialog__header{
            }

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