/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-06-15 16:41:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\UserAdd\UserAdd.js
 */
import {userAdd,userUpdate} from '@/api/api.js'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      var pattern = new RegExp("^1[3456789][0-9]{9}$", 'i');
      if (!pattern.test(value) && value!='') {
        callback(new Error('请输入正确的手机号'));
      }else {
        callback();
      }
    };
    return {
      ruleForm: {
        userName: '',
        pwd: '',
        phone: '',
        status: false,
        email: '',
        type: '',
        remark:''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择项目类型', trigger: 'blur' }
        ]
      },
      yh_option:[{
        value: '1',
        label: ' 超级管理员'
      }, {
        value: '2',
        label: '政务版'
      }, {
        value: '3',
        label: '集团'
      }, {
        value: '4',
        label: '代理商'
      }, {
        value: '5',
        label: '项目'
      },{
        value: '6',
        label: '运维人员'
      }]
    }
  },
  methods: {
    exit() {
      this.$router.push('/Admin/user')
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let that = this;
          this.ruleForm.status = this.ruleForm.status?'1':'0'
          let params = this.ruleForm;
          if(this.$route.query.data==undefined){
            userAdd(params).then(res => {
              if(res.code == 200){
                this.$alert('添加成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    that.resetForm('ruleForm');
                    that.exit();
                  }
                });
                
              }else{
                this.$message.error(res.message);
              }
            })
            .catch(() => {})
          }else{
            userUpdate(params).then(res => {
              if(res.code == 200){
                  this.$alert('修改成功', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      that.resetForm('ruleForm');
                    }
                  });
              }else{
                this.$message.error(res.message);
              }
            })
            .catch(() => {})
          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted(){
    let data = this.$route.query.data;
    if(data!=undefined){
      this.ruleForm.userName = data.userName;
      this.ruleForm.phone = data.phone;
      this.ruleForm.email = data.email;
      this.ruleForm.status = data.userStatus;
      this.ruleForm.type = data.userType;
    }
  }
}
