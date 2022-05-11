/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:56
 * @LastEditTime: 2021-06-18 11:41:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\PhoneFist\PhoneFist.js
 */
import {userUpdatePhone} from '@/api/api.js'
export default {
  data() {
    return {
      input:''
    }
  },
  props:["data"],
  methods: {
    ModifyPass(index) {
      var reg =  new RegExp("^1[3456789][0-9]{9}$", 'i');
      if(this.input==''){
        this.$message.error('请输入手机号');
        return
      }else if(!reg.test(this.input)){
        this.$message.error('手机号格式不正确');
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
        id: this.data.userId,
        phone:this.input,
        version:this.data.version
      };
      userUpdatePhone(params).then(res => {
        if(res.code == 200){
          this.$alert('手机号修改成功', '提示', {
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
      .catch(() => {loading.close();})
    }
  },
  mounted() {
    this.input = this.data.phone
  }
}
