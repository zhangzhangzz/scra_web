<!--
 * @Author: your name
 * @Date: 2021-11-26 14:35:10
 * @LastEditTime: 2021-12-02 15:57:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \scra_web1 - 副本\src\components\custom\messageBox\messageBox.vue
-->
<template>
  <div class="bgA" style="z-index:0">
    
    <div class="columns">
        <div class="topLine row">
            <span>消息通知</span>
            <i class="el-icon-close" @click="meClose"></i>
        </div>
        <div class="row" style="width:100%">
          <i class="el-icon-message" style="font-size:40px;margin:auto 0 auto 10px;color:#666"></i>
          <div class="columns" style="width:250px;cursor: pointer;overflow: hidden;position: relative;height:90px">
            <div class="me_lineBox" v-if="data.length>0" :style="{right:`${(page-1)*250}px`}">
              <div class="" style="width:250px" v-for="(d,index) in data" :key="index" @click="goPage(d)">
                <div class="title">
                    {{d.title}}
                </div>
                <div class="content">
                    {{d.content}}
                </div>
              </div>
            </div>
            
            <div class="row" style="margin:auto 10px 10px auto;">
              <i class="el-icon-caret-left" :style="{color:page==1?'#ccc':'#666'}" @click="jump(0)"></i>
              <div style="font-size:14px;margin:0 10px">{{page}}/{{total}}</div>
              <i class="el-icon-caret-right" :style="{color:page==total?'#ccc':'#666'}" @click="jump(1)"></i>
            </div>
          </div>
        </div>
        
    </div>
  </div>
</template>

<script>
import {userUpdatePwd} from '@/api/api.js'
export default {
  data() {
    return {
      page:1,
    }
  },
  props:["data","total"],
  mounted(){
    console.log(this.data)
  },
  methods: {
    goPage(d){
      this.$router.push({path: `/Admin/stationLetter`});
      this.meClose();
    },

    jump(type){
      if(!type && this.page===1) return;
      if(type && this.page === this.total) return;
      if(type && this.page<this.total ){
        this.page = this.page+1;
      }else if(!type && this.page <= this.total){
        this.page = this.page-1;
      }
    },

    meClose(){
      this.page = 1;
      this.$emit('toIndex', 0)
    },

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
        id: this.data.userId,
        pwd:this.pwd1,
        npwd:this.pwd3,
        version:this.data.version
      };
      userUpdatePwd(params).then(res => {
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

</script>

<style lang="css" scoped>
    .bgA{
        z-index: 10000!important;
        font-size: 16px;
    }

    

    .topLine{
      width: 100%;
      padding: 10px;
      background-color: rgb(238,238,238);
    }

    .topLine span{
      margin: auto auto auto 0;
      color: #000;
      font-size: 14px;
    }

    .topLine i{
      margin: auto 0 auto auto;
      color: #000;
    }

    .title{
      width: 100%;
      text-align: center;
      font-size: 16px;
      padding: 10px 10px 0;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }

    .content{
      width: 100%;
      padding: 10px;
      font-size: 14px;
      color: #333;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }

    .me_lineBox{
      width: 100%;
      white-space: nowrap;
      position: absolute;
      transition: 0.5s all;
      transform: translateY(0%);
    }

    .me_lineBox > .el-icon-caret-left{
      margin-left: auto;
    }

    .me_lineBox > div{
      display:inline-block;
    }

</style>
