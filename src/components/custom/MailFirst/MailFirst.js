/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:56
 * @LastEditTime: 2021-06-18 11:42:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\MailFirst\MailFirst.js
 */
import {userUpdateMail} from '@/api/api.js'
export default {
  data() {
    return {
      input:''
    }
  },
  props:["email"],
  methods: {
    ModifyPass(index) {
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      if(this.input==''){
        this.$message.error('请输入邮箱');
        return
      }else if(!reg.test(this.input)){
        this.$message.error('邮箱格式不正确');
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
        id: this.email.userId,
        email:this.input,
        version:this.email.version
      };
      userUpdateMail(params).then(res => {
        if(res.code == 200){
          this.$alert('邮箱修改成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              loading.close();
              that.$emit('toIndex');
            }
          });
        }else{
          loading.close();
          this.$message.error(res.message);
        }
      })
      .catch(() => {loading.close();})
    }
  },
  mounted() {
    this.input = this.email.email
  }
}
