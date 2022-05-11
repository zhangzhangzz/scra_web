/*
 * @Author: your name
 * @Date: 2021-08-17 15:43:04
 * @LastEditTime: 2021-08-26 20:46:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\personError\personError.js
 */
import {persUploadFail } from '@/api/api.js'
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
export default {
  components:{
    globalProject
  },
  data() {
    return {
      tableData:[],
      loading:true,
      activeName: 'first',
      globalProjectId:'',
      user:JSON.parse(localStorage.getItem('user')),
    }
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },

    queryProId(id){
      this.globalProjectId = id;
    },

    //列表查询
    showList(){
      let that = this;
      that.loading = true;
      let params = {
        pageNumber:that.page,
        limit:that.pageSize,
        persName:that.persName,
        appId: that.appId,
      };
      persUploadFail(params).then(res => {
          if(res.code == 200){
            that.loading = false;
            that.tableData = res.data.items
            that.total = res.data.total;
          }else{
            this.$message.error(res.message);
            that.loading = false;
          }
        })
        .catch(() => {that.loading = false;})
    },

    
  },
  mounted() {
    
  }
}
