
<!--
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-10 21:39:37
 * @LastEditTime: 2021-10-09 19:38:59
-->

<template>
    <div class="panelManage" style="height:100%;overflow-y: auto;">
        <!-- <globalProject data="pageName" @showList="showList"/> -->
        <div class="all" style="min-height:calc(100% - 47px)">
           <ul class="sys_top">
                <div class="thirdBtn" @click="$router.push('panelManage')" style="margin-left:auto">返回</div>
                <div class="firBtn" @click="addSetting(1)" style="margin-left:10px">添加配置</div>
            </ul>    
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
                            prop="address"
                            align="center"
                            label="设备IP">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            align="center"
                            label="设备名称">
                            </el-table-column>
                            <el-table-column
                            prop="type"
                            align="center"
                            width="120"
                            label="设备类型">
                                <template slot-scope="scope">
                                    {{queryAppType(scope.row.type,1)}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="deviceId"
                            align="center"
                            width="200"
                            label="设备编号">
                            </el-table-column>
                            <el-table-column
                            prop="pingOnlineStatus"
                            align="center"
                            width="80"
                            label="运行状态">
                                <template slot-scope="scope">
                                    {{scope.row.pingOnlineStatus==0?'离线':(scope.row.pingOnlineStatus==1?'在线':'未安装')}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="lastTime"
                            align="center"
                            width="180"
                            label="离线时间">
                            </el-table-column>
                            <el-table-column
                            prop="intervalTime"
                            align="center"
                            width="180"
                            label="间隔时间">
                                <template slot-scope="scope">
                                    {{queryAppType(scope.row.intervalTime,0)}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="status"
                            align="center"
                            width="180"
                            label="状态">
                                <template slot-scope="scope">
                                    <el-switch
                                        v-model="scope.row.status"
                                        :active-value="1"
                                        :inactive-value="0"
                                        @change="changeRole($event,scope.row)"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="200" align="center" fixed="right">
                                <template slot-scope="scope" >
                                    <el-button  type="text" size="small" @click="setDevice(scope.row)" >PING测试</el-button>
                                    <el-button  type="text" size="small" @click="addSetting(0,scope.row)" >编辑</el-button>
                                    <el-button @click="handleOut(scope.row)" type="text" size="small"  style="color:red">删除</el-button>
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
        <el-dialog
            class="groupEdit"
            :title="addType?'添加配置':'编辑配置'"
            style="text-align:center"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="25%"
            :show-close="false">
            <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
                <el-form-item label="设备IP" prop="address">
                    <div class="fw">
                    <el-input v-model="ruleForm1.address" :disabled="addType?false:true"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="设备名称" prop="name">
                    <div class="fw">
                    <el-input v-model="ruleForm1.name"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="设备类型" prop="type">
                    <div class="fw">
                    <el-select v-model="ruleForm1.type" placeholder="请选择" @change="typeSelect">
                        <el-option v-for="(item,i) of deviceType" :key="i" :label="item.dicValue" :value="item.dicKey" />
                    </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="间隔时间" prop="intervalTime">
                    <div class="fw">
                    <el-select v-model="ruleForm1.intervalTime" placeholder="请选择">
                        <el-option v-for="(item,i) of appList" :key="i" :label="item.dicValue" :value="item.dicKey" />
                    </el-select>
                    </div>
                </el-form-item>
                
                <el-form-item label="设备编号" prop="code" v-if="deviceYzc==6" key="code">
                    <div class="fw">
                    <el-input v-model="ruleForm1.code"></el-input>
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
            title="PING测试"
            style="text-align:center"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible1"
            width="30%"
            :show-close="false">
            <el-form   ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="PING包次数">
                    <div class="fw">
                        <el-input v-model="pingCount" type="number" @blur="checkNumber"></el-input>
                        <div style="width:100%;textAlign:left;color:#888;fontSize:12px">默认PING包次数为10，可自定义PING次数</div>
                    </div>
                </el-form-item>
                <el-form-item label="监测结果" >
                    <div style="border:1px solid #DCDFE6;border-radius: 4px;height:20vh;overflowY: auto;paddingBottom: 10px;" ref="main">
                        <div class="columns checkList" ref="content">
                            <div v-for="(t,index) in textArr" :key="index" style="fontSize:12px;textAlign:left;width:100%;padding:0 10px;lineHeight:15px">{{t}}</div>
                        </div>
                    </div>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle" >取 消</el-button>
                <el-button type="primary" @click="addDevice"  v-loading="loading1">确 定</el-button>
            </span>
        </el-dialog>
        
        
    </div>
</template>
<script>
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
import {mainBoardAddress,getDictionaries,addMainBoardAddress,updateMainBoardAddress,deleteMainBoardAddress,pingTest } from '@/api/api.js'
export default {
    components:{
        globalProject
    },
    data() {
        const isValidIp = (rule, value, callback) => { // 校验IP是否符合规则
            var regEx = /,/g
            var ipList = value.toString().replace(regEx, '.').split(',')
            var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
            for (var i in ipList) {
              if (!reg.test(ipList[i])) {
                return callback(new Error('请输入节点ip地址，多节点用.分隔'))
              } else {
                callback()
              }
            }
            return true
        }
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
            ruleForm1: {
                address:'',
                deviceId:'',
                name:'',
                intervalTime:'',
                type:'',
                code:''
            },

            rules1: {
                address: [
                    { required: true, validator: isValidIp,  trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                intervalTime: [
                    { required: true, message: '请选择间隔时间', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择设备类型', trigger: 'blur' }
                ],
                code:[
                    { required: true, message: '请输入设备编号', trigger: 'blur' }
                ]
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
            onlineStatus:'',
            appList:[],
            globalProjectId:'',
            user:JSON.parse(localStorage.getItem('user')),
            install:[],
            loading1:false,
            project:'',
            pingCount:10,
            path:'',
            textArr:[],
            addType:1,
            deviceYzc:''
        }
    },
     mounted() {
        this.ruleForm1.deviceId = this.$route.query.id;
        this.showList();
        this.queryPanelType();
    },
    beforeDestroy(){
        //关闭监听
        if(this.socket){
            this.socket.close();
        }
    },
    methods: {
        makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

        //检查PING次数输入事件
        checkNumber(){
            if(this.pingCount=='' || this.pingCount==0){
                this.pingCount = 10;
            }

            if (!(/(^[1-9]\d*$)/.test(this.pingCount))) { 
    　　　　　　this.pingCount = 10;
    　　　　}
        },

        queryProId(id){
            this.globalProjectId = id;
        },

        cancle(){
            this.dialogVisible1 = false;
            this.textArr = [];
            this.pingCount = 10;
            //关闭监听
            if(this.socket){
                this.socket.close();
            }
            this.resetForm('ruleForm');
            this.loading1 = false;
        },

        cancle1(){
            this.dialogVisible = false;
            this.resetForm('ruleForm1');
            this.deviceYzc = '';
            this.loading1 = false;
        },

        changeRole(e,row){
            let params = {
                address:row.address,
                deviceId:row.deviceId,
                name:row.name,
                intervalTime:row.intervalTime,
                type:row.type,
                status:e

            };
            updateMainBoardAddress(params).then(res => {
                this.loading1 = false;
                if(res.code == 200){
                  this.$alert('修改成功', '提示', {
                    confirmButtonText: '确定',
                    showClose:false,
                    closeOnClickModal:false,
                    closeOnPressEscape:false,
                    closeOnHashChange:false,
                    callback: action => {
                    this.dialogFormVisible = false;
                    this.showList();
                    }
                });
                }else{
                  this.$message.error(res.message);
                    this.loading1 = false;
                }
              })
              .catch(() => {this.loading1 = false;})
        },

        init: function () {
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                this.socket = new WebSocket(this.path)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
            }
        },
        open: function () {
            console.log("socket连接成功")
        },
        error: function () {
            console.log("连接错误")
        },
        getMessage: function (msg) {
            this.textArr.push(msg.data);
            this.$nextTick(() => {
                this.$refs.main.scrollTop = this.$refs.content.scrollHeight + 10;
            })
            // console.log(msg.data)
        },
        send: function () {
            this.socket.send(params)
        },
        close: function () {
            console.log("socket已经关闭")
        },

        //添加设备弹出框
        addDevice(){
            let params = {
                address:this.setDeviceData.address,
                deviceId:this.setDeviceData.deviceId,
                count: parseInt(this.pingCount)
            };
            pingTest(params).then(res => {
                if(res.code == 200){
                    this.textArr = [];
                    this.init();
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {})
        },

        queryAppType(type,tag){
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
                this.appList.forEach(function(item,index,arr){
                    if(item.dicKey == type){
                        name = item.dicValue
                        return
                    }
                })
            }
            
            return name
        },

        handleSizeChange(val) {
			this.pageSize = val;
			this.showList(this.type);
		},

        addSetting(type,row){
            this.addType = type;
            let obj = {};
            if(type){
                obj.address = '';
                obj.deviceId = this.$route.query.id;
                obj.name = '';
                obj.intervalTime = '';
                obj.type = '';
                obj.code = '';
                this.ruleForm1 = obj;
            }else{
                console.log(row)
                this.ruleForm1.address = row.address;
                this.ruleForm1.name = row.name;
                this.ruleForm1.intervalTime = row.intervalTime;
                this.ruleForm1.type = row.type;
                this.deviceYzc = row.type;
                if(row.type==6){
                    this.ruleForm1.code = row.code;
                }
            }
            this.dialogVisible=true;
        },

        queryPanelType(){
            getDictionaries({dicType:'showType'}).then(res => {
                if(res.code == 200){
                    this.deviceType = res.data;
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {})

            getDictionaries({dicType:'intervalTimeType'}).then(res => {
                if(res.code == 200){
                    this.appList = res.data;
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {})
        },

        submitForm(formName) {
            let that = this; 
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(that.ruleForm1.type!=6){ 
                    delete that.ruleForm1.code
                }
                let params = that.ruleForm1;
                that.loading1 = true;
                if(that.addType){
                    addMainBoardAddress(params).then(res => {
                        if(res.code == 200){
                            this.$alert(res.message, '提示', {
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
                }else{
                    updateMainBoardAddress(params).then(res => {
                        if(res.code == 200){
                            this.$alert(res.message, '提示', {
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
                }
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
            let url = process.env.VUE_APP_BASE_API.slice(4);
            this.path = 'ws'+url+'/websocket/'+this.user.userName;
            console.log(url)
            // this.path = 'ws://yun.leoli.wang:20001/websocket/'+this.user.userName;
            this.dialogVisible1 = true;
        },

        handleOut(row){
            this.$confirm('确定删除该配置吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    address : row.address,
                    deviceId : this.$route.query.id
                }
                deleteMainBoardAddress(params).then(res => {
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
                deviceId:that.$route.query.id
            };
            that.loading = true;
            mainBoardAddress(params).then(res => {
                if(res.code == 200){
                    that.tableData = res.data.items;
                    that.loading = false;
                    that.total = res.data.total;
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

        //拉取考勤
        getAttendance(row){
            let that = this;
            let params = {
                address:row.address,
                deviceId:that.$route.query.id,
                name:row.name,
                intervalTime:row.intervalTime,
                type:row.type
            };
            updateMainBoardAddress(params).then(res => {
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

        //类型选择事件
        typeSelect(e){
            this.deviceYzc = e;
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

        ::v-deep .el-dialog__header{
            text-align: left!important;
        }


    }
</style>