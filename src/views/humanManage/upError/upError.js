/*
 * @Author: your name
 * @Date: 2021-08-12 14:08:46
 * @LastEditTime: 2021-11-24 13:21:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\upError\upError.js
 */
/*
 * @Author: your name
 * @Date: 2021-07-01 16:31:11
 * @LastEditTime: 2021-08-12 14:02:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\PerState\PerState.js
 */
import {getPersUploadFailSearchData,persUploadFail,persDelete} from '@/api/api.js'
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
export default {
  components:{
    globalProject
  },
  data() {
    return {
      filterMethod(query, item) {
        return item.userName.indexOf(query) > -1;
      },
      tableData: [],
      loading:false,
      page:1,
      total:0,
      pageSize:10,
      persName:'',
      dialogFormVisible:false,
      data1: [],
      value1: [],
      right:'',
      left:'',
      appId:'',
      options:'',
      globalProjectId:'',
      delArr:[]
    }
  },
  mounted(){
		this.showList1();
	},
  methods: {
    makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

    queryProId(id){
      this.globalProjectId = id;
    },

    //批量操作
    handleSelectionChange(val){
      let that = this;
      let array = [];
      val.forEach(function(item,index,arr){
          array.push(item.persId)
        })
      this.delArr = array;
    },

    handleCurrentChange(val) {
      this.page = val;
      this.showList()
    },

    handleSizeChange(val) {
			this.pageSize = val;
      this.page = 1;
			this.showList();
		},
    

    //穿梭框变化事件
    handleChange(value, direction, movedKeys) {
      this.right = value;
    },

    //列表查询
    delPerson(id){
      let that = this;
      that.loading = true;
      let params = {
        persIds:id
      };
      persDelete(params).then(res => {
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
          that.loading = false;
        }
      })
      .catch(() => {that.loading = false;})
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

    //列表查询
    showList1(){
      let that = this;
      getPersUploadFailSearchData().then(res => {
          if(res.code == 200){
            that.options = res.data
            that.showList()
          }else{
            this.$message.error(res.message);
          }
        })
        .catch(() => {})
    },

    //删除
    countDel() {
      if(this.delArr.length==0){
        this.$message({
          message: '请选择要删除的人员',
          type: 'warning'
        });
        return
      }else{
        this.$confirm(`确定删除选中人员?`, '删除人员', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delPerson(this.delArr);
        }).catch(() => {
          
        })
        
      }
    },

    dels1(row) {
      let that = this;
      this.$confirm(`确定删除'${row.persName}'人员吗?`, '删除人员', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.delPerson([row.persId]);
      }).catch(() => {
        
      })
    },

    assUser(){
      let arr = [];
      let newArr = this.data1
      if(newArr.length>0 && this.right.length>0){
        newArr.forEach((item, index) => {
          var flag = false;
          this.right.forEach((item1, index1) => {
            if (item.userName === item1) {
              flag = true;
            }
          })
          if(!flag){
            arr.push(item.userName)
          }
        })
      }else{
        this.data1.forEach((item, index) => {
          arr.push(item.userName)
        })
      }
      
      let that = this;
          let params = {
        roleId:that.roleid,
        left:arr,
        right:that.right
      };
      bindRoleUser(params).then(res => {
            if(res.code == 200){
          this.$alert(res.message, '提示', {
            confirmButtonText: '确定',
            showClose:false,
            closeOnClickModal:false,
            closeOnPressEscape:false,
            closeOnHashChange:false,
            callback: action => {
              that.dialogFormVisible2 = false ;
            }
          });
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {this.loading = false})
    },


  }
}
