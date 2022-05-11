/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-07-09 16:10:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\RoleAdd\RoleAdd.js
 */
import {roleAdd,roleUpdate} from '@/api/api.js'
export default {
  data() {
    return {
      roleStates:0,
      roleName:'',
      remark:''
    }
  },
  props:["data"],
  methods: {
    setIndex(index) {
      this.$emit('getIndex', index)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    saveRole(){
      let that = this;
      if(localStorage.getItem('user')==null){
        this.logout();
        return
      }
      if(that.roleName==''){
        this.$message.error('请输入角色名称');
        return
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      if(this.data==''){
        let params = {
          roleName:this.roleName,
          createBy:JSON.parse(localStorage.getItem('user')).id,
          roleStates:this.roleStates.toString(),
          remark:this.remark
        };
        roleAdd(params).then(res => {
          loading.close();
          if(res.code == 200){
            this.$alert('添加成功', '提示', {
              confirmButtonText: '确定',
              showClose:false,
              closeOnClickModal:false,
              closeOnPressEscape:false,
              closeOnHashChange:false,
              callback: action => {
                that.setIndex(0);
                that.refresh();
              }
            });
          }else{
            this.$message.error(res.message);
          }
        })
        .catch(() => {loading.close();})
      }else{
        let params = {
          roleId:this.data.roleId,
          roleName:this.roleName,
          updateBy:JSON.parse(localStorage.getItem('user')).id,
          roleStates:this.roleStates.toString(),
          remark:this.remark,
          version:this.data.version
        };
        roleUpdate(params).then(res => {
          loading.close();
          if(res.code == 200){
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              showClose:false,
              closeOnClickModal:false,
              closeOnPressEscape:false,
              closeOnHashChange:false,
              callback: action => {
                that.setIndex(0);
                that.refresh();
              }
            });
          }else{
            this.$message.error(res.message);
          }
        })
        .catch(() => {loading.close();})
      }
      
    }
  },
  mounted() {
    if(this.data!=''){
      this.roleName = this.data.roleName;
      this.roleStates = this.data.roleStates;
      this.remark = this.data.remark==null?'':this.data.remark;
    }
    
  }
}
