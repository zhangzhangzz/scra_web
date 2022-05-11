/*
 * @Author: your name
 * @Date: 2021-09-22 14:50:17
 * @LastEditTime: 2021-09-28 18:55:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\deviceManage\LEDManage\LEDManage.js
 */
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
import {ledDeviceList,addDevice,ledUpdateDevice,setDevice,fuzzyQuery,pullAttendByDevice} from '@/api/api.js'
import { param } from '@/utils';
export default {
    components:{
        globalProject
    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入屏幕高度'));
            }else if(value<0){
                callback(new Error('屏幕高度应为大于0的整数'));
            }else if(value%16!==0){
                callback(new Error('屏幕高度应为16的倍数'));
            }else{
                callback();
            }
        };
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
            tableData: [],
            dialogVisible:false,
            showView:false,             //  显示设置
            dialogVisible1:false,
            ruleForm: {
                deviceId:'',
                deviceName:'',
                weight:'',
                height:'',
                deviceIp:'',
                devicePort:'',
                projectId:''
            },

            rules: {
                deviceName: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                deviceId: [
                    { required: true, message: '请输入设备编号', trigger: 'blur' }
                ],
                deviceIp: [
                    { required: true, validator: isValidIp,  trigger: 'blur' }
                ],
                devicePort: [
                    { required: true, message: '请输入设备端口', trigger: 'blur' }
                ],
                projectId:[
                    { required: true, message: '请选择项目', trigger: 'blur' }
                ],
                height:[
                    { required: true, validator: validatePass, trigger: 'blur'}
                ],
                weight:[
                    { required: true, validator: validatePass1, trigger: 'blur'}
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
            project:''
        }
    },
     mounted() {
        this.showList();
    },
    methods: {
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

        //添加设备弹出框
        addDevice(){
            this.setDeviceData = '';
            this.ruleForm = {
                deviceId:'',
                deviceName:'',
                weight:'',
                height:'',
                deviceIp:'',
                devicePort:'',
                ruleForm:''
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

        submitForm(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                that.ruleForm.height = parseInt(that.ruleForm.height);
                that.ruleForm.weight = parseInt(that.ruleForm.weight);
                let params = that.ruleForm;
                if(that.setDeviceData ==''){
                    params.deviceType = 4;
                    that.loading1 = true;
                    addDevice(params).then(res => {
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
                        }
                      })
                      .catch(() => {this.loading1 = false;})
                }else{
                    delete params.projectId 
                    ledUpdateDevice(params).then(res => {
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
                        }
                      })
                      .catch(() => {this.loading1 = false;})
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
          let params = {
                pageNumber:that.page,
                limit:that.pageSize,
                globalProjectId:that.globalProjectId==''?'':that.globalProjectId.id,
                deviceName:that.deviceName,
                deviceId:that.deviceId,
                onlineStatus:that.onlineStatus==''?null:that.onlineStatus
            };
            that.loading = true;
            ledDeviceList(params).then(res => {
                if(res.code == 200){
                    that.tableData = res.data.pageResult.items;
                    that.deviceType = res.data.deviceTypeList;
                    that.appList = res.data.ledShowTime;
                    that.loading = false;
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