<!--
 * @Author: your name
 * @Date: 2021-07-19 13:38:19
 * @LastEditTime: 2021-11-23 16:20:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\globalProject\globalProject.vue
-->
<template>
    <div>
        <div class="topSelect  row">
          <span style="line-height: 36px;margin-right: 8px;" v-if="$route.path!='/dashboard1' && $route.path!='/environment/ycMonitor' && $route.path!='/yzcCheck/yzcManage'">项目名称</span>
          <div :style="{width:data=='perManage'?'180px':'199px',height:'36px'}">
              <el-autocomplete
              v-if="!$route.path.includes('/Admin')"
              ref="autocomplete"
              v-model="state"
              clearable
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入项目名称"
              @select="handleSelect"
              @clear="clear"
              ></el-autocomplete>
          </div>
        </div>
    </div>
</template>
<script>
import {fuzzyQuery} from '@/api/api.js'
export default {
    data() {
    return {
      restaurants: [],
      state: '',
      searchValue:'',
      user:JSON.parse(localStorage.getItem('user')),
    }
  },
  props:["data"],
  methods: {
    querySearchAsync(queryString, cb) {
      let that = this;
      fuzzyQuery(this.searchValue).then(res => {
          if(res.code == 200){
            let array = [];
            res.data.forEach(function(item,index,arr){
                let obj = {};
                obj.value = item.projectName;
                obj.id = item.projectId;
                array.push(obj)
              })
            that.restaurants = array;
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
            this.$refs.autocomplete.activated = true;
            cb(results);
          }else{
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          if(this.$route.path != '/environment/ycMonitor' && this.user.userType!=1 && this.$route.path != '/yzcCheck/yzcManage'){
            localStorage.removeItem("allProjectId");
            console.log('1')
          }else{
            localStorage.setItem('allProjectId', JSON.stringify(this.restaurants[0]));
            this.state = this.restaurants[0].value;
            this.$emit('showList')
            console.log('2')
          }
      })
  
    },

    //设备实名制操作事件
    deviceActive(){
       if(this.$route.path == '/deviceManage/machine' && localStorage.getItem('allProjectId')!==null || this.$route.path == '/humanManage/perManage' && localStorage.getItem('allProjectId')!==null){
          this.state = JSON.parse(localStorage.getItem('allProjectId')).value;
       }
    },

    // 搜索
    searchHandle() {
      if(this.autocompleteFocusFlag) this.$refs.autocomplete.activated = true;
      this.queryResult()
    },

    //清除
    clear(){
      localStorage.removeItem("allProjectId");
      console.log('clear')
      this.$emit('queryProId','')
    },

    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      localStorage.setItem('allProjectId', JSON.stringify(item));
      this.$emit('queryProId',item)
      if(this.$route.path == '/environment/ycMonitor' || this.$route.path == '/dashboard1'  || this.$route.path == '/yzcCheck/yzcManage'){
        this.$emit('showList')
      }
    },
  },
  mounted() {
    this.querySearchAsync()
  }
}
</script>
<style scoped lang="scss">
    .topSelect{
        margin: 2px 20px 2px 0;
        justify-content: center;
        .el-input__inner{
        border: none;
        text-align: center!important;
        border: 1px solid #eee;
        }
        
    }
</style>