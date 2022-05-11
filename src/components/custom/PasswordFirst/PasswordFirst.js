/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:56
 * @LastEditTime: 2021-12-23 09:41:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\PasswordFirst\PasswordFirst.js
 */
import {editPassword} from '@/api/api.js'
export default {
  data() {
    return {
      name:'',
      pwd1:'',
      pwd2:'',
      pwd3:''
    }
  },
  props:["data"],
  methods: {
    ModifyPass(index) {
      if(this.pwd1==''){
        this.$message.error('请输入原始密码');
        return
      }else if(this.pwd2 ==''){
        this.$message.error('请输入新密码');
        return
      }else if(this.pwd3 ==''){
        this.$message.error('请确认密码');
        return
      }else if(this.pwd2 !== this.pwd3){
        this.$message.error('两次密码输入不一致');
        return
      }
      let that = this;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let params = {
        password:this.pwd1,
        newPassword:this.pwd3
      };
      editPassword(params).then(res => {
        if(res.code == 200){
          this.$alert('密码修改成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              loading.close();
              that.$emit('toIndex', 0)
            }
          });
        }else{
          loading.close();
          this.$message.error(res.message);
        }
      })
      .catch(() => {
        loading.close();
      })
    }
  },
  mounted() {
    this.name = this.data.userName
    console.log(this.data)
  }
}
