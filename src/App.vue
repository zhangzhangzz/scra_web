<!--
 * @Author: your name
 * @Date: 2021-05-27 10:28:56
 * @LastEditTime: 2021-12-03 09:45:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\App.vue
-->
<template>
  <div id="app" >
    <router-view />
    <div class="bgAA" :style="{zIndex:delay?'9999':'-1'}">
      <div style="overflow: hidden;position: relative;height:200px">
        <message-box  @toIndex="getIndex" :data="data" :total="total" :class="index===6?'me_picBack_show':'me_picBack_hide'"/>
      </div>
    </div>
    
    <!-- <button style="position: absolute;bottom: 0;right: 40px;z-index: 99999999;" @click="hick">dddd</button> -->
  </div>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
import messageBox from '@/components/custom/messageBox/messageBox.vue'
export default {
  components: {
    messageBox
  },
  name: 'App',
  data(){
    return {
      data:{},
      index:0,
      delay:false,
      total:0
    }
  },
  mounted(){
    console.log('app')
		this.isIe();
	},
  
  
  watch: {
    $route: {
      handler: function(route) {
        console.log(route.path)
        if(route.path!='/login'){
          let url = process.env.VUE_APP_BASE_API;
          let that = this;
          const query = route.query
          let params = {};
          axios.get(url+"/pro/inMailController/getNewMail", { params, headers: { token: getToken()}},
            ).then((res) => {
              if(res.data.code == 200){
                console.log(res.data.data)
        //           if(res.data.data.items.length!==0){
                    // that.index = 6;
                    // that.data = res.data.data;
                    // that.data.index = that.page;
                    that.data = [{
                    content: "dsfasfdsfds多少个的非官方的股份的 dsf",
                    createBy: "admin",
                    createTime: "2021-12-02 12:59:41",
                    messageId: 12,
                    readId: 0,
                    status: 0,
                    title: "1胜多负少的范德萨范德萨范德萨22",
                    type: 1
                  },{
                    content: "2 dsf",
                    createBy: "admin",
                    createTime: "2021-12-02 12:59:41",
                    messageId: 12,
                    readId: 0,
                    status: 0,
                    title: "1胜多负少的范德萨范德萨范德萨22",
                    type: 1
                  }];
                    
                  // that.data.total = res.data.data.total;
                  that.total = 2;
                  // }else{
                  //   that.index = 0;
                  // }
              }     
          });
        } 
        
      },
      immediate: true
    }
  },
  methods: {
    isIe(){
      if (!!window.ActiveXObject || "ActiveXObject" in window){
        var r=confirm("请使用谷歌浏览器访问"); 
        if (r==true){
            window.location.href="https://www.google.cn/chrome/"
        }else{
          return
        }
      }else{  
        return 
      }
        
    },

    getIndex(val) {
      this.index = val
      console.log(this.index)
    },

    hick(){
      console.log('点了')
      console.log(this.index)
      if(this.index==6){
        console.log('那')
        this.index = 0;
        setTimeout(() => {
        //代码
        this.delay = false;
        }, 600);
      }else{
        

      console.log(this.data)
      this.delay = true;
      this.index = 6;
      }
    }
  }
}
</script>
<style lang=scss>
  .el-dialog__wrapper{
    display: flex;
  }

  .el-dialog{
    margin: auto!important;
  }

  .el-dialog__header{
    padding: 10px 20px;
    background-color: #e8e8e8;
    border-bottom: 1px solid #eee;
  }

 

  .el-dialog__headerbtn{
    top: 14.5px;
  }
  /* form表单字体大小 */
  .el-form-item__label{
    font-size: 13px;
  }
  /* form表单验证文字排布 */
  .el-form-item__error{
     position: relative;
   }
   /* container布局的main */
   .el-main{
     padding:0;
   }
   .el-header{
     padding:0;
   }
   .CMenu_3{
     .el-tree-node__content{
       height: 20px;
       border-bottom: 1px solid white;
     }
   }

   .bgAA{
     bottom:0;
     width:calc(300px + 0.7rem);
     right:0;
     position: fixed;
   }

   .me_picBack_show{
        position: absolute;
        width: 300px;
        background-color: #fff;
        box-shadow:2px 2px 15px 5px #888;
        z-index: 9;
        bottom: 0.5rem;
        transition: 0.5s all;
        transform: translateY(0%);
        right: 0.5rem;
    }

    .me_picBack_hide{
        position: absolute;
        background-color: #fff;
        box-shadow:2px 2px 15px 5px #888;
        z-index: 9;
        width: 300px;
        bottom: 0.5rem;
        transition: 0.5s all;
        transform: translateY(0%);
        right: -800px;
    }


</style>
