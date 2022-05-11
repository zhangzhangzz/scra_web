/*
 * @Author: your name
 * @Date: 2021-07-22 11:02:35
 * @LastEditTime: 2021-10-28 13:02:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\applicationManage\countryControl\countryControl.js
 */
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
import {attendDetail,attendUpload} from '@/api/api.js'
// import { parseFloat } from 'core-js/core/number'
export default {
  data() {
    return {
      startAttendTimeStr:'',
      endAttendTimeStr:'',
      page:1,
      total:0,
      pageSize:10,
      loading:false,
      tableData:[],
      date:'',
      inOut:'',
      globalProjectId:'',
      delArr:[]
    }
  },
  components:{
    globalProject
  },
  methods: {

    makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

    queryProId(id){
      this.globalProjectId = id;
    },

    

    handleCurrentChange(val) {
      this.page = val;
      this.showList()
    },

    handleSizeChange(val) {
			this.pageSize = val;
			this.showList();
		},

    query(){
      this.page =1;
      this.showList();
    },

    handleSelectionChange(val) {
      let that = this;
      let array = [];
      val.forEach(function(item,index,arr){
          array.push(item.attendId)
        })
      this.delArr = array;
    },

    editDataSure(row){
      this.$confirm(`确定上传'${row.attendName}'人员吗?`, '上传人员', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upPerson([row.attendId]);
      }).catch(() => {
        
      })
    },

    countDel2() {
      if(this.delArr.length==0){
        this.$message.error('请选择要上传的人员');
        return
      }else{
        this.$confirm(`确定上传选中人员?`, '上传人员', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.upPerson(this.delArr);
        }).catch(() => {
          
        })
      }
    },

    //列表查询
    upPerson(id){
      let that = this;
      that.loading = true;
      attendUpload(id).then(res => {
        if(res.code == 200){
          this.$alert(res.message, '提示', {
            confirmButtonText: '确定',
            showClose:false,
            closeOnClickModal:false,
            closeOnPressEscape:false,
            closeOnHashChange:false,
            callback: action => {
              that.loading = false;
              that.showList();
            }
          });
        }else{
          this.$message.error(res.message);
          this.loading = false;
        }
      })
      .catch(() => {this.loading = false;})
    },

    //循环考勤状态
    queryStatus(data){
      if(data==null) return
      let str = '';
      data.forEach(function(item,index,arr){
        if(index < data.length-1){
          str += `<span class="${item.syncStatus===1?'okColor':'failColor'}">${item.appName}</span>,` 
          }else{
          str += `<span class="${item.syncStatus===1?'okColor':'failColor'}">${item.appName}</span>`
          }
      })
      return str
    },

    //展示角色
    showList(){
      let that = this;
      let params = {
        persId:that.$route.query.id,
        pageNumber:that.page,
        limit:that.pageSize,
        inOut:that.inOut,
        startAttendTimeStr:that.date!=''&& that.date!==null ? that.date[0]:'',
        endAttendTimeStr:that.date!=''&& that.date!==null ? that.date[1]:''
      };
      this.loading = true;
      attendDetail(params).then(res => {
        this.loading = false;
        if(res.code == 200){
          that.tableData = res.data.items;
          that.loading = false;
          that.total = res.data.total;
        }else{
          this.$message.error(res.message);
          this.loading = false;
        }
      })
      .catch(() => {this.loading = false;})
    },

  },
  mounted() {
    this.showList();
  }
}
