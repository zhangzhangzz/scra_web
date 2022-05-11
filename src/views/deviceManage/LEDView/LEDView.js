/*
 * @Author: your name
 * @Date: 2021-09-22 15:06:12
 * @LastEditTime: 2021-09-28 14:02:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\LEDView\LEDView.js
 */
import {setLedSwitchOrContent,ledDeviceInfo} from '@/api/api.js'
export default {
    data() {
        return {
            loading:false,
            multipleSelection:[],
            tableData: [],
            data:'',
            dialogVisible:false,
            showView:false,             //  显示设置
            dialogVisible1:false,
            ruleForm: {
                deviceId:'',
                content:'',
                showTime:'',
                showSwitch:''
            },
            rules: {
                content: [
                    { required: true, message: '请输入屏幕展示文字', trigger: 'blur' }
                ],
                showTime: [
                    { required: true, message: '请选择显示时间', trigger: 'blur' }
                ],
            } ,
            time:[],
            user:JSON.parse(localStorage.getItem('user')),
            loading1:false
        }
    },
     mounted() {
        this.time = JSON.parse(this.$route.query.time);
        this.showList();
    },
    methods: {
        //展示角色
        showList(){
          let that = this;
          let params = {
                deviceId:this.$route.query.id
            };
            that.loading = true;
            ledDeviceInfo(params).then(res => {
                if(res.code == 200){
                    let arr = [];
                    arr.push(res.data)
                    that.tableData = arr;
                    this.ruleForm.deviceId = this.tableData[0].deviceId;
                    this.ruleForm.showTime = this.tableData[0].showTime;
                    this.ruleForm.showSwitch = this.tableData[0].showSwitch;
                    this.ruleForm.content = this.tableData[0].content;
                    that.loading = false;
                    console.log(res.data)
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {that.loading = false;})
        },

        cancle(){
            this.dialogVisible = false;
            this.resetForm('ruleForm');
            this.loading1 = false;
        },

        submitForm(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = that.ruleForm;
                that.loading1 = true;
                setLedSwitchOrContent(params).then(res => {
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
                        that.loading1 = false;
                    }
                  })
                  .catch(() => {this.loading1 = false;})
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        setDevice(row){
            this.setDeviceData = row;
            this.ruleForm.deviceId = row.deviceId;
            console.log(this.ruleForm)
            this.dialogVisible = true
        },

    }
}