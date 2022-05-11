/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:56
 * @LastEditTime: 2021-07-09 16:10:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\AssignUser\AssignUser.js
 */
import {assigningList,setUser} from '@/api/api.js'
export default {
  data() {
    return {
      dialogTableVisible:false,
      options:[],
      option:'',
      SHOO:1,
      activeName: 'first',
      input3: '',
      tableData: [],
      tableData1: [],
      loading :true,
      userId:[],
      gridData:[],
      chek:'',
      type:1,
      page:1,
      total:0,
      pageSize:10
    }
  },
  props:["id","data"],
  methods: {
    BGY(index){
      console.log(index)
      this.SHOO=index
    },
    setIndex(index) {
      this.$emit('getIndex', index)
    },

    handleSelectionChange(val){
      let that = this;
      that.userId = [];
      val.forEach(function(item,index,arr){
        that.userId.push(item.userId)
      })
    },

    sqUser(tag,id){
      this.dialogTableVisible = true;
      this.userId = id;
      this.type = tag;
    },

    groupSq(tag){
      if(this.userId.length==0){
        this.$message.error(`请选择${tag?'授权':'更改授权'}用户`);
        return;
      }
      this.type = tag;
      this.dialogTableVisible = true;
    },

    sure(){
      console.log(this.userId)
      console.log(this.type)
      console.log(this.chek)
      this.sq(this.userId);
    },

    cancle(){
      this.chek = '';
      this.userId = [];
      this.type = '';
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable1.clearSelection()
      this.$refs.tb.clearSelection()
      this.dialogTableVisible = false;
    },

    formatDate(now) { 
      var year=now.getFullYear();  //取得4位数的年份
      var month=(now.getMonth()+1) < 10 ? '0'+ (now.getMonth()+1):now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date=now.getDate()< 10 ? '0'+now.getDate():now.getDate();      //返回日期月份中的天数（1到31）
      var hour=now.getHours() < 10 ?'0'+now.getHours():now.getHours();     //返回日期中的小时数（0到23）
      var minute=now.getMinutes()< 10 ?'0'+now.getMinutes():now.getMinutes(); //返回日期中的分钟数（0到59）
      var second=now.getSeconds()< 10 ?'0'+now.getSeconds():now.getSeconds(); //返回日期中的秒数（0到59）
      return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    },

    handleCurrentChange(val) {
      this.page = val;
      this.showList(this.type)
    },

    sq(userid){
      let that = this;
      let params = {
        roleId:this.chek,
        userIds:userid
      };
      that.loading =true;
      setUser(params).then(res => {
        that.loading =false;
        if(res.code == 200){
          this.$alert(`${that.type?'授权':'更改授权'}成功`, '提示', {
            confirmButtonText: '确定',
            showClose:false,
            closeOnClickModal:false,
            closeOnPressEscape:false,
            closeOnHashChange:false,
            callback: action => {
              that.showList(that.type);
            }
          });
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {that.loading =false;})
    },

    handleClick(tab, event) {
      this.page = 1;
      this.total = 0;
      if(tab.name=='first'){
        this.type = 1;
        this.showList(1)
      }else{
        this.type = 0;
        this.showList(0)
      }
    },

    handleSizeChange(val) {
			this.pageSize = val;
			this.showList(this.type);
		},

    showList(type){
      let that = this;
      let params = {
        roleId : that.id,
        type:type+'',
        page:this.page+'',
        num:this.pageSize+''
      };
      assigningList(params).then(res => {
          that.loading = false;
        if(res.code == 200){
          if(type){
            that.tableData = res.data.data;
          }else{
            that.tableData1 = res.data.data;
          }
          
          that.total = res.data.total;
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {that.loading =false;})
    },

    handleSelectionChange1(val){
      if(val.length > 1){
        this.$refs.tb.clearSelection()
        this.$refs.tb.toggleRowSelection(val.pop())
      }else{
        if(val.length>0){
          this.chek = val[0].roleId;
        }
        
      }  
    },
    
    onSelectAll () {
      this.$refs.tb.clearSelection()
    },
  },
  mounted() {
    this.showList(1);
    this.gridData = JSON.parse(this.data)
  }
}
