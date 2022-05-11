<!--
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-10 21:39:37
 * @LastEditTime: 2021-09-13 16:17:20
-->

<template>
    <div class="yzcManage" style="height:100%;">
        <!-- <globalProject data="pageName" @showList="showList"/> -->
        <div class="all" style="height:100%;background: #f3f4f8;">
            <ul class="sys_top columns" v-if="user.userType!==1" style="margin: 0 15px;">
                <globalProject  @queryProId="queryProId" v-if="user.userType!=1" style="margin:auto" @showList="showList" />
            </ul> 
            <div class="sys_bottom" style="padding:0;height: calc(100% - 60px);background: #f3f4f8;">
                <div class="columns" style="background: #f3f4f8;padding:15px 15px 0 15px;height:100%" v-loading="loading">
                    <el-col :span="24" class="row" >
                        <div class="row iconWapper">
                            <div class="row">
                                <img src="../../assets/images/yzc/enter.svg">
                                <div class="columns">
                                    <span class="minit">今日驶入</span>
                                    <span class="miniNum">{{tableData.driveInToday}}</span>
                                </div>
                            </div>
                            <div class="row">
                                <img src="../../assets/images/yzc/tc.svg">
                                <div class="columns">
                                    <span class="minit">历史驶入</span>
                                    <span  class="miniNum">{{tableData.driveInHistory}}</span>
                                </div>
                            </div>
                            <div class="row">
                                <img src="../../assets/images/yzc/bt.svg">
                                <div class="columns">
                                    <div class="row">
                                        <span class="minit" style="font-weight: bold;">白天记录</span>
                                        <span class="time">({{tableData.dayRecord}})</span>
                                    </div>
                                    <span class="miniNum">{{tableData.dayRecord}}</span>
                                </div>
                            </div>
                            <div class="row">
                                <img src="../../assets/images/yzc/ht.svg">
                                <div class="columns">
                                    <div class="row">
                                        <span class="minit" style="font-weight: bold;">夜间记录</span>
                                        <span class="time">({{tableData.dayRecord}})</span>
                                    </div>
                                    <span class="miniNum">{{tableData.nightRecord}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row iconRight">
                              <div class="columns">
                                  <span class="title">设备信息</span>
                                  <div class="row" style="margin:auto 0">
                                      <span style="line-height:20px">设备编号：</span>
                                      <span style="line-height:20px">{{tableData.deviceCode}}</span>
                                      <span :class="tableData.onlineStatus?'statusLine onLine':'statusLine outLine'" v-if="tableData!=''">{{tableData.onlineStatus?'在线':'离线'}}</span>
                                  </div>
                                  <div class="row">
                                      <span>预警联系人：</span>
                                      <span>{{tableData.reminderPhone}}</span>
                                      <div @click="editDevice" style="cursor: pointer;" v-if="tableData!=''">
                                          <i class="el-icon-edit" style="color:#4e91e9;margin: 0 5px 0 10px"/>
                                          <span style="color:#4e91e9;font-weight:bold">修改</span>
                                      </div>
                                  </div>
                              </div>
                        </div>
                        
                        
                    </el-col>

                    <div class="row" style="width:100%;height:calc(100% - 80px)">
                        <div class="columns b-lWapper" id="b-lWapper">
                            <div class="title" v-if="tableData.approachSlagTruckRecord">车辆进门</div>
                            <div class="columns" v-if="tableData.approachSlagTruckRecord">
                                <img :src="'http://yun.cdscra.com/'+tableData.approachSlagTruckRecord.photoAddress" alt="">
                                <div class="row textWapper" v-if="boxWidth>335" style="padding:0 5px">
                                    <span>车牌：{{tableData.approachSlagTruckRecord.numberPlate}}</span>
                                    <span style="margin:0 auto">类型：{{tableData.approachSlagTruckRecord.inOutFlag?'进':'出'}}场</span>
                                    <span >时间：{{tableData.approachSlagTruckRecord.recordTime}}</span>
                                </div>
                                <div class="columns textWapper" v-if="boxWidth<=335" style="border:none;padding:0 5px">
                                    <div class="row" style="width:100%">
                                        <span style="margin-right:auto">车牌：{{tableData.approachSlagTruckRecord.numberPlate}}</span>
                                        <span>{{tableData.approachSlagTruckRecord.recordTime}}</span>
                                    </div>
                                    <span  style="margin-right: auto;margin-top:5px">类型：{{tableData.approachSlagTruckRecord.inOutFlag?'进':'出'}}场</span>
                                </div>
                            </div>
                            
                            <div class="title" v-if="tableData.appearanceSlagTruckRecord">车辆出门</div>
                            <div class="columns" v-if="tableData.appearanceSlagTruckRecord">
                                <img :src="'http://yun.cdscra.com/'+tableData.appearanceSlagTruckRecord.photoAddress" alt="">
                                <div class="row textWapper" v-if="boxWidth>335" style="padding:0 5px">
                                    <span>车牌：{{tableData.appearanceSlagTruckRecord.numberPlate}}</span>
                                    <span  style="margin:0 auto;">类型：{{tableData.appearanceSlagTruckRecord.inOutFlag?'进':'出'}}场</span>
                                    <span >时间：{{tableData.appearanceSlagTruckRecord.recordTime}}</span>
                                </div>
                                <div class="columns textWapper" v-if="boxWidth<=335" style="border:none;padding:0 5px">
                                    <div class="row" style="width:100%">
                                        <span style="margin-right:auto">车牌：{{tableData.appearanceSlagTruckRecord.numberPlate}}</span>
                                        <span>{{tableData.appearanceSlagTruckRecord.recordTime}}</span>
                                    </div>
                                    <span  style="margin-right: auto;margin-top:5px">类型：{{tableData.appearanceSlagTruckRecord.inOutFlag?'进':'出'}}场</span>
                                </div>
                            </div>
                        </div>

                        <div class="columns b-RWapper" v-loading="loading1">
                            <div class="row" style="width:calc(100% - 20px);margin-right:20px">
                                <div class="row" style="width:30%">
                                    <div :class="type==2?'title actived':'title'" @click="chopseType(2)">今日记录</div>
                                    <div :class="type==1?'title actived':'title'" @click="chopseType(1)">历史记录</div>
                                </div>
                                
                                <div class="row" style="width:70%;margin:10px 0">
                                    <div style="width:150px;margin-right:20px">
                                        <el-date-picker type="date" :editable="false" placeholder="开始时间" v-model="startTimeStr" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                                    </div>
                                    <div style="width:150px;margin-right:20px">
                                        <el-date-picker type="date" :editable="false" placeholder="结束时间" v-model="endTimeStr" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                                    </div>
                                    <div style="width:100px">
                                        <el-select v-model="inOutFlag" placeholder="请选择" clearable >
                                            <el-option label="进场" :value=1></el-option>
                                            <el-option label="出场" :value=0></el-option>
                                        </el-select>
                                    </div>
                                    <div class="thirdBtn" style="margin: 0 0 0 auto "  @click="queryRecord" v-if="tableData!=''">查询</div>
                                </div>
                                
                            </div>
                            <div style="overflow: hidden;width:100%" v-if="list.length>0">
                                <div class="columns imgWapper" v-for="(l,index) in list" :key="index">
                                    <img :src="'http://yun.cdscra.com/'+l.photoAddress" alt="">
                                    <div class="columns">
                                        <span>车牌：{{l.numberPlate}}</span>
                                        <span>类型：{{l.inOutFlag?'进场':'出场'}}</span>
                                        <span>时间：{{l.recordTime}}</span>
                                    </div>
                                </div>
                            </div>

                            <div v-if="list.length==0" style="margin: auto;">
                                暂无数据
                            </div>

                            <el-pagination 
                                class="pageLine"
                                layout="total, prev, pager, next, jumper"
                                @current-change="handleCurrentChange"
                                :page-size="pageSize"
                                @size-change="handleSizeChange"
                                :total="total">
                            </el-pagination>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        <el-dialog
            class="groupEdit"
            title="设备信息"
            style="text-align:center"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="30%"
            :show-close="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="联系号码" prop="reminderPhone">
                    <div style="width:150px">
                        <el-input v-model="ruleForm.reminderPhone" type="textarea"
  :rows="2"></el-input>
                    </div>
                </el-form-item>
                <div class="warnText">多个号码用英文逗号隔开，最多可添加四个</div>
                <el-form-item label="短信通知" prop="smsReminderSwitch"> 
                    <div class="">
                        <el-radio-group v-model="ruleForm.smsReminderSwitch">
                            <el-radio :label="1">开启</el-radio>
                            <el-radio :label="0">关闭</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="微信通知" prop="wxReminderSwitch"> 
                    <div class="">
                        <el-radio-group v-model="ruleForm.wxReminderSwitch">
                            <el-radio :label="1">开启</el-radio>
                            <el-radio :label="0">关闭</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="通知间隔" prop="reminderInterval">
                    <div style="width:150px">
                        <el-input-number v-model="ruleForm.reminderInterval" :min="10" :max="60"></el-input-number>
                    </div>
                </el-form-item>
                <div class="warnText">范围10-60分钟，默认为30分钟</div>
                <el-form-item label="通知时间" prop="deviceName">
                    <div  style="margin-right:10px;width:210px">
                        <el-time-picker
                            is-range
                            v-model="ruleForm.reminderTime"
                            value-format="HH:mm"
                            format="HH:mm"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle" >取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" v-loading="loading1">确 定</el-button>
            </span>
        </el-dialog>

        
    </div>
</template>
<script>
import globalProject from '../../components/custom/globalProject/globalProject.vue'
import {truckMsgGet,fuzzyQuery,truckRecordGet,truckUpdate} from '@/api/api.js'
import { getToken,getProjectId } from '@/utils/auth'
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
    components:{
        globalProject
    },
    data() {
        var validatePass1 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入屏幕宽度'));
            }else if(value<0){
                callback(new Error('屏幕宽度应为大于0的整数'));
            }else if(value%32!==0){
                callback(new Error('屏幕高度应为32的倍数'));
            }else{
                callback();
            }
        };
        const isValidIp = (rule, value, callback) => {
            if(value!=''){
                if(value.indexOf('，')!=-1){
                    return callback(new Error('请输入英文逗号'));
                }
                var ipList = value.split(',');
                var pattern = new RegExp("^1[3456789][0-9]{9}$", 'i');
                for (var i in ipList) {
                    if(ipList[i]==''){
                        return callback(new Error('请删除多余符号'));
                    }else if (!pattern.test(ipList[i])) {
                        return callback(new Error('请输入正确的手机号')); 
                    }
                }
                callback()
            }
            
        }
        return {
            loading:false,
            loading1:false,
            multipleSelection:[],
            tableData: '',
            dialogVisible:false,
            showView:false,             //  显示设置
            dialogVisible1:false,
            ruleForm: {
                deviceCode:'',
                reminderPhone:'',
                smsReminderSwitch:'',
                wxReminderSwitch:'',
                reminderInterval:'',
                reminderTimeStart:'',
                reminderTimeEnd:'',
                reminderTime:''
            },

            rules: {
                reminderPhone: [
                    {  validator: isValidIp,  trigger: 'blur' }
                ],
                smsReminderSwitch: [
                    { required: true, message: '请选择短信通知是否开启', trigger: 'blur' }
                ],
                wxReminderSwitch:[
                    { required: true, message: '请选择微信通知是否开启', trigger: 'blur' }
                ],
                reminderInterval:[
                    { required: true, message: '请选择通知间隔值', trigger: 'blur'}
                ],
                reminderTime:[
                    { required: true, validator: validatePass1, trigger: 'blur'}
                ]
            } ,
            page:1,
            total:0,
            pageSize:8,
            globalProjectId:'',
            user:JSON.parse(localStorage.getItem('user')),
            list:[],
            type:2,
            startTimeStr:'',
            endTimeStr:'',
            inOutFlag:'',
            boxWidth:''

        }
    },
     mounted() {
        const that = this;
        
        const erd = elementResizeDetectorMaker()
        erd.listenTo(document.getElementById("b-lWapper"),(element)=>{
            that.$nextTick(()=>{
                that.boxWidth = element.offsetWidth
                console.log(element.offsetWidth+'px')
            })
        })
        this.showList();
    },
    destroyed() {
        if(this.user.userType!=1){
            localStorage.removeItem("allProjectId");
        }
        this.resetData();
    },
    methods: {
        editDevice(){
            this.dialogVisible = true;
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

        cancle(){
            this.dialogVisible = false;
            this.resetForm('ruleForm');
            this.loading1 = false;
        },

        chopseType(type){
            this.type = type;
            this.page = 1;
            this.total = 0;
            this.showList1();
        },

        //添加设备弹出框
        resetData(){
            this.list=[];
            this.type=2;
            this.startTimeStr='';
            this.endTimeStr='';
            this.inOutFlag='';
            this.tableData= '';
            this.page = 1;
            this.total = 0;
            this.showView=false;             //  显示设置
            this.dialogVisible1=false;
            this.ruleForm = {
                deviceCode:'',
                reminderPhone:'',
                smsReminderSwitch:'',
                wxReminderSwitch:'',
                reminderInterval:'',
                reminderTimeStart:'',
                reminderTimeEnd:'',
                reminderTime:''
            }
        },


        handleSizeChange(val) {
			this.pageSize = val;
			this.showList1();
		},

        submitForm(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(that.ruleForm.reminderTime!=null){
                    that.ruleForm.reminderTimeStart =that.ruleForm.reminderTime[0]+':00';
                    that.ruleForm.reminderTimeEnd =that.ruleForm.reminderTime[1]+':00';
                }
                that.loading = true;
                let params = that.ruleForm;
                delete params.reminderTime;
                truckUpdate(params).then(res => {
                    if(res.code == 200){
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            showClose:false,
                            closeOnClickModal:false,
                            closeOnPressEscape:false,
                            closeOnHashChange:false,
                            callback: action => {
                                that.dialogVisible = false;
                                that.showList();
                                that.resetData();
                            }
                        });
                    }else{
                      this.$message.error(res.message);
                    }
                  })
                  .catch(() => {this.loading = false;})
                
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
                // this.handleOut(command);
            }else{
                this.dialogVisible = true;
            }
            
        },

        setDevice(row){
            this.setDeviceData = row;
            this.ruleForm.deviceId = row.deviceId;
            this.ruleForm.deviceName = row.deviceName;
            this.ruleForm.weight = row.weight;
            this.ruleForm.height = row.height;
            this.ruleForm.deviceIp = row.deviceIp;
            this.ruleForm.devicePort = row.devicePort;
            this.dialogVisible = true
        },

        handleOut(row){
            this.$confirm('确定删除将该设备吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteDevice(row.deviceId).then(res => {
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
            let url = process.env.VUE_APP_BASE_API;
            this.axios.get(url+"/pro/slag_truck_record/get", { headers: { token: getToken(), projectId: getProjectId() },timeout: 60000 },
            ).then((res) => {
                if(res.data.code == 200){
                    that.tableData = res.data.data;
                    that.loading = false;
                    that.page = 1;
                    that.total = 0;
                    that.showList1();
                    that.ruleForm.deviceCode = res.data.data.deviceCode;
                    that.ruleForm.reminderPhone = res.data.data.reminderPhone;
                    that.ruleForm.smsReminderSwitch = res.data.data.smsReminderSwitch;
                    that.ruleForm.wxReminderSwitch = res.data.data.wxReminderSwitch;
                    that.ruleForm.reminderInterval = res.data.data.reminderInterval;
                    that.ruleForm.reminderTimeStart = res.data.data.reminderTimeStart;
                    that.ruleForm.reminderTimeEnd = res.data.data.reminderTimeEnd;
                    that.ruleForm.reminderTime = [res.data.data.reminderTimeStart,res.data.data.reminderTimeEnd]
                    console.log( that.ruleForm.reminderTime)
                }else{
                    that.$message.error(res.data.message);
                    that.loading = false;
                    that.resetData();
                }
                that.loading = false;
            });
        },

    //展示角色
    showList1(){
      let that = this;
        that.loading1 = true;
        let params = {
            pageNumber:that.page,
            limit:that.pageSize,   
            type:that.type,
            startTimeStr:that.startTimeStr,
            endTimeStr:that.endTimeStr,
            inOutFlag:that.inOutFlag
        };
        truckRecordGet(params).then(res => {
            if(res.code == 200){
                that.list = res.data.items;
                that.total = res.data.total;
                that.loading1 = false;
                
            }else{
              this.$message.error(res.message);
            that.loading1 = false;
            }
          })
          .catch(() => {that.loading1 = false;})
    },

        handleCurrentChange(val) {
            this.page = val;
            this.showList1()
        },

        queryRecord(){
            this.page = 1;
            this.total = 0;
            this.showList1();
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

    }
}
</script>

<style lang="scss" scoped>
    .yzcManage{
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

    

    ::v-deep .el-dialog__header{
        text-align: left;
    }


    .iconWapper{
        background-color: #fff;
        padding:20px 0;
        width: 70%;
        .row{
            flex: 1;
            border-right: 1px solid #ccc;
            justify-content: center;
            &:last-of-type{
                border: none;
            }

            img{
                width: 40px;
                height: 40px;
                margin: auto 10px auto 0;
            }

            .miniNum{
                font-size: 16px;
                font-weight: bold;
                margin-top: auto;
            }

            .minit{
                font-size: 12px;
            }
            
            .time{
                color: #888;
                font-size: 12px;
                font-weight: bold;
            }
        }


        
    }

    .iconRight{
        width: calc(30% - 10px);
        margin: 0 0 0 10px;
        background-color: #fff;
        padding: 10px 20px;
        
        .columns{
            justify-content: left;
            width: 100%;
            span{
            }

            .title{
                
                width: 100%;
                font-size: 14px;
                font-weight: bold;
            }

            .row{
                width: 100%;
            }
        }

        .outLine{
            background-color: #ccc;
            color: #888;
        }

        .onLine{
            background-color: #59CAA0;
            color: #fff;
        }

        .statusLine{
            font-size: 8px;
            margin-left: 4px;
            height: 20px;
            padding: 0 4px;
            line-height: 20px;
            border-radius: 3px;
        }
    }

    .b-lWapper{
        margin: 15px 0 0;
        padding: 0 10px 20px;
        background-color: #fff;
        width: 24%;
        .title{
            margin-right: auto;
            margin-bottom: 10px;
            font-size: 15px;
            font-weight: bold;
            height: 40px;
            line-height: 40px;
            border-bottom: 3px solid #0a6ce1;
        }
        

        .columns{
            width: 100%;
            border: 1px solid #eee;
            img{
                width: 100%;
                height: 25vh;
            }
        }

        

        .textWapper{
            width: 100%;
            margin: 10px 0  ;
            span{
                color: #888;
                &:nth-of-type(1){
                    font-weight: bold;
                    color: #000;
                }
            }
        }
    }

    .b-RWapper{
        margin: 15px 0 0 15px;
        padding: 0 0 10px 20px;
        background-color: #fff;
        width: 76%;

        .title{
            cursor: pointer;
            margin-right: 20px;
            font-size: 15px;
            font-weight: bold;
            height: 40px;
            line-height: 40px;
            
        }

        .actived{
            border-bottom: 3px solid #0a6ce1;
        }

        .imgWapper{
            border-radius: 0 0 5px 5px;
            border: 1px solid #eee;
            float: left;
            overflow: hidden;
            width: calc(25% - 20px);
            margin-bottom: 20px;
            margin-right: 20px;
            img{
                width: 100%;
                height: 16vh;
            }

            .columns{
                width:100%;
                padding: 10px;
                span{
                    color: #888;
                    width: 100%;
                    &:nth-of-type(1){
                        font-weight: bold;
                        color: #000;
                    }

                    &:nth-of-type(2){
                        margin:10px;
                    }
                }
            }
            
        }
    }

    .warnText{
        color: #888;
        line-height: 20px;
        margin-bottom: 10px;
        font-size: 12px;
        margin-left: 120px;
        text-align: left;
    }

    .fw{
        width: 120px;
    }

}
::v-deep .el-select{
    width: 100%!important;
}

::v-deep .el-date-editor{
    width: 100%!important;
}
</style>
