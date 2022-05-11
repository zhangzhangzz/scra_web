
<!--
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-10 21:39:37
 * @LastEditTime: 2021-11-23 14:33:11
-->

<template>
    <div class="machine" style="height:100%;overflow-y: auto;" ref="projectSpeed">
        <!-- <globalProject data="pageName" @showList="showList"/> -->
        <div class="all" style="min-height:calc(100% - 47px)">
            <ul class="sys_top">
                <globalProject  @queryProId="queryProId" v-if="user.userType!=1" ref="globalProject"/>
                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">设备名称</span>
                    <div class="width:199px"><el-input v-model="deviceName" placeholder="请输入设备名称" suffix-icon="el-icon-search"></el-input></div>
                    
                </li>
                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">设备状态</span>
                    <div style="width:199px">
                        <el-select v-model="onlineStatus" placeholder="请选择" clearable >
                            <el-option label="在线" :value=0></el-option>
                            <el-option label="离线" :value=1></el-option>
                        </el-select>
                    </div>
                </li>
                <div class="thirdBtn" @click="showList(1)" style="margin-left:auto">查询</div>
                <div class="firBtn" style="margin: 0 0 0 10px " @click="addDevice" v-if="user.userType!==1">添加设备</div>
                <!-- <div class="thirdBtn"  @click="">批量删除</div> -->
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
                            prop="deviceName"
                            align="center"
                            label="设备名称">
                            </el-table-column>
                            <el-table-column
                            prop="deviceType"
                            align="center"
                            width="120"
                            label="设备类型">
                                <template slot-scope="scope">
                                    {{queryDeviceType(scope.row.deviceType,1)}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="deviceId"
                            align="center"
                            width="200"
                            label="设备编号">
                            </el-table-column>
                            <el-table-column
                            prop="softwareVersion"
                            align="center"
                            width="120"
                            label="版本号">
                            </el-table-column>
                            <el-table-column
                            prop="inOut"
                            align="center"
                            width="80"
                            label="进出方向">
                                <template slot-scope="scope">
                                     {{scope.row.inoutFlag==null?'':(scope.row.inoutFlag==1?'进门':'出门')}}
                                </template>
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
                            prop="installSite"
                            align="center"
                            width="80"
                            label="安装位置">
                                <template slot-scope="scope">
                                    {{queryDeviceType(scope.row.installSite,0)}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="buttApps"
                            align="center"
                            width="150"
                            label="已对接平台">
                                <template slot-scope="scope">
                                   <span v-for="(a,index) in scope.row.buttApps" :key="index">{{a.appName+(scope.row.buttApps.length==index+1?'':',')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="createTime"
                            align="center"
                            width="180"
                            label="添加时间">
                                <template slot-scope="scope">
                                    {{formatDate(new Date(scope.row.createTime))}}
                                </template>
                            </el-table-column>
                            
                            <el-table-column label="操作" :width="user.userType!==1?180:80" align="center" fixed="right">
                                <template slot-scope="scope" >
                                    <el-button @click="jumpPz(scope)" type="text" size="small" v-if="user.userType!==1">对接</el-button>
                                    <el-button @click="updateName(scope.row)" type="text" size="small" v-if="user.userType==6">修改</el-button>
                                    <el-button  type="text" size="small" @click="setDevice(scope.row)" v-if="scope.row.deviceType!=2 && user.userType!==1" >配置</el-button>
                                    <el-button  type="text" size="small" @click="getAttendance(scope.row)" v-if="scope.row.pullAttendAuth===1">回调</el-button>
                                    <el-button @click="handleOut(scope.row)" type="text" size="small"  style="color:red" v-if="user.userType!==1">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    
                </el-row>
            </div>
        </div>
        
        <el-pagination 
            v-if="paginationShow"
            class="pageLine"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            :total="total">
        </el-pagination>
        <el-dialog
            class="groupEdit"
            title="添加设备"
            style="text-align:center"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="25%"
            :show-close="false">
            <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
                <el-form-item label="项目名称" prop="projectId"> 
                    <div class="fw">
                        <el-select v-model="ruleForm1.projectId" :disabled="user.userType==1?true:false"  placeholder="请选择">
                            <el-option v-for="(item,i) of deviceData" :key="i" :label="item.projectName" :value="item.projectId" />
                        </el-select>
                    </div>
                </el-form-item>
                <!-- <el-form-item label="设备类型" prop="deviceType">
                    <div class="fw">
                    <el-select v-model="ruleForm1.deviceType" placeholder="请选择">
                        <el-option v-for="(item,i) of deviceType" :key="i" :label="item.typeName" :value="item.typeId" />
                    </el-select>
                    </div>
                </el-form-item> -->
                <el-form-item label="设备名称" prop="deviceName">
                    <div class="fw">
                    <el-input v-model="ruleForm1.deviceName"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="设备编号" prop="deviceId">
                    <div class="fw">
                    <el-input v-model="ruleForm1.deviceId"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="设备平台" prop="appId">
                    <div class="fw">
                    <el-select v-model="ruleForm1.appId" placeholder="请选择">
                        <el-option v-for="(item,i) of appList" :key="i" :label="item.appName" :value="item.appId" />
                    </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="进出方向" prop="inoutFlag">
                    <div class="fw">
                    <el-select v-model="ruleForm1.inoutFlag" placeholder="请选择">
                        <el-option  label="进门" :value="1" />
                        <el-option  label="出门" :value="0" />
                    </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="安装位置" prop="installSite" placeholder="请选择">
                    <div class="fw">
                    <el-select v-model="ruleForm1.installSite">
                        <el-option v-for="item of install"  :label="item.dicValue" :value="item.dicKey" :key="item.dicKey"/>
                    </el-select>
                    </div>
                </el-form-item> 

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle1" >取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm1')" v-loading="loading1">确 定</el-button>
            </span>
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
                <el-button @click="cancle" >取 消</el-button>
                <el-button type="primary" @click="addConfig"  v-loading="loading1">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            class="groupEdit"
            title="修改设备"
            style="text-align:center"
            :visible.sync="dialogVisible2"
            :close-on-click-modal="false"
            width="25%"
            :show-close="false">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
                <el-form-item label="设备名称" prop="deviceName">
                    <div class="fw">
                    <el-input v-model="ruleForm2.deviceName"></el-input>
                    </div>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle2" >取 消</el-button>
                <el-button type="primary" @click="submitForm2('ruleForm2')" v-loading="loading2">确 定</el-button>
            </span>
        </el-dialog>
        
        
    </div>
</template>
<script>
let params = "";
let frompage1 = "";
import globalProject from '../../components/custom/globalProject/globalProject.vue'
import {cjDeviceList,addDevice,deleteDevice,setDevice,fuzzyQuery,pullAttendByDevice,updateDeviceName } from '@/api/api.js'
import { param } from '@/utils';
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
            previousRouterName:'',
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
            type:0,
            radio:'',
            deviceType:[],
            deviceData:'',
            pageSize:10,
            deviceName:'',
            deviceId:'',
            onlineStatus:'',
            appList:[],
            globalProjectId:'',
            user:JSON.parse(localStorage.getItem('user')),
            install:[],
            loading1:false,
            loading2:false,
            project:'',
            paginationShow:true,
            ruleForm2: {
                deviceId:'',
                deviceName:''
            },
            rules2: {
                deviceName: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ]
            },
            dialogVisible2:false
        }
    },
    beforeRouteEnter(to, from, next) {
        frompage1 = from.path;
        if(JSON.stringify(from.query)!=='{}' && from.path === "/deviceManage/docking"){
            params = from.query;
        }else{
            params = ''
            console.log('other')
        }
        next();
    },
    destroyed() {
        if(this.user.userType!=1){
            localStorage.removeItem("allProjectId");
        }
        this.page = 1;
        this.pageSize = 1;
        this.globalProjectId = '';
        this.deviceName = '';
        this.onlineStatus = '';
        this.type = 0;
    },
    mounted() {
        console.log(params)
        if(params!=''){
            this.page = params.pageNumber;
            this.pageSize = params.limit;
            if(params.globalProjectId!=''){
                this.globalProjectId = {
                    id : params.globalProjectId
                }
                let obj = {
                    value : params.projectName,
                    id : params.globalProjectId
                }
                localStorage.setItem('allProjectId', JSON.stringify(obj));
                console.log(localStorage.getItem('allProjectId'))
                this.$refs.globalProject.deviceActive();
            }else{
                this.globalProjectId = params.globalProjectId
            }
            this.deviceName = params.deviceName;
            this.onlineStatus = params.onlineStatus===''?null:params.onlineStatus;
            this.type = params.type;
            
        }
        this.showList();
    },
    methods: {
        jumpPz(scope){
            if(this.type === 1){
                this.$router.push({path: 'docking',query: {deviceId:scope.row.deviceId,type:1,pageNumber:this.page,limit:this.pageSize,globalProjectId:this.globalProjectId===''?'':this.globalProjectId.id,deviceName:this.deviceName,onlineStatus:this.onlineStatus===''?null:this.onlineStatus,hick:this.type,projectName:this.globalProjectId.value}})
            }else{
                this.$router.push({path: 'docking',query: {deviceId:scope.row.deviceId,type:1,pageNumber:this.page,limit:this.pageSize,globalProjectId:'',deviceName:'',onlineStatus:null,hick:this.type,projectName:this.globalProjectId.value}})
            }
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

        makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

        queryProId(id){
            this.globalProjectId = id;
            console.log(id)
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

        cancle2(){
            this.dialogVisible2 = false;
            this.resetForm('ruleForm2');
            this.loading2 = false;
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

        submitForm2(formName){
            let that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = that.ruleForm2;
                that.loading2 = true;
                updateDeviceName(params).then(res => {
                    if(res.code == 200){
                        this.$alert('修改成功', '提示', {
                            confirmButtonText: '确定',
                            showClose:false,
                            closeOnClickModal:false,
                            closeOnPressEscape:false,
                            closeOnHashChange:false,
                            callback: action => {
                                that.showList();
                                that.cancle2();
                            }
                        });
                    }else{
                      this.$message.error(res.message);
                      this.cancle2();
                    }
                  })
                  .catch(() => {this.cancle2();})
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
        showList(type){
          let that = this;
          if(type!=undefined){
              that.type = type
              that.page = 1;
          }
        //   if(that.type !== 1){
        //       that.globalProjectId = '';
        //       that.deviceName = '';
        //       that.onlineStatus = '';
        //   }
        console.log(that.globalProjectId)
          that.paginationShow = false;
          let params = {
                pageNumber:that.page,
                limit:that.pageSize,
                globalProjectId:that.globalProjectId===''?'':that.globalProjectId.id,
                deviceName:that.deviceName,
                onlineStatus:that.onlineStatus===''?null:that.onlineStatus
            };
            that.loading = true;
            cjDeviceList(params).then(res => {
                if(res.code == 200){
                    that.tableData = res.data.pageResult.items;
                    that.deviceType = res.data.deviceTypeList;
                    that.appList = res.data.appList;
                    that.loading = false;
                    that.install = res.data.deviceInstallSiteList
                    that.total = res.data.pageResult.total;
                    this.$nextTick(() => {
                        that.$refs.projectSpeed.scrollTo(0, 0);
                    });
                }else{
                  this.$message.error(res.message);
                    that.loading = false;
                }
                that.paginationShow = true;
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
        },

        updateName(row){
            this.dialogVisible2 = true;
            this.ruleForm2.deviceId = row.deviceId;
            this.ruleForm2.deviceName = row.deviceName;
        }

    }
}

</script>
<style lang="scss" scoped>
    .machine{
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
           
            

            .el-dialog__body{
                padding:10px 20px;
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

         ::v-deep .el-dialog__header{
                text-align: left;
        }

    }
</style>