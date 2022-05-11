/*
 * @Author: your name
 * @Date: 2021-07-01 16:31:11
 * @LastEditTime: 2021-11-24 13:20:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\PerPolice\PerPolice.js
 */
let params = "";
let frompage1 = "";
import {perListByRecord,persDelete} from '@/api/api.js'
import { getToken,getProjectId } from '@/utils/auth'
export default {
  data() {
    return {
      loading:false,
      img5:require('../../../assets/images/permanage/torgjw_n.png'),
      img6:require('../../../assets/images/permanage/upjw_n.png'),
      img7:require('../../../assets/images/permanage/torgjw.png'),
      img8:require('../../../assets/images/permanage/upjw.png'),
      tableData:[],
      page:1,
      total:0,
      pageSize:10,
      delArr:[],
      persName:'',
      paginationShow:true,
    }
  },
  beforeRouteEnter(to, from, next) {
    frompage1 = from.path;
    if(JSON.stringify(from.query)!=='{}' && from.path === "/humanManage/perDetail"){
        params = from.query;
    }else{
        params = ''
    }
    next();
  },
  mounted(){
    if(params!=''){
      this.page = params.pageNumber;
      this.pageSize = params.limit;
      this.persName = params.persName;
    }
		this.showList();
	},
  methods: {
    //查看详情
    lookDetail(row){
      let that = this;
      that.$router.push({path: '/humanManage/perDetail',query: {id:row.persId,projectId:row.projectId,pageNumber:that.page,limit:that.pageSize,persName:that.persName}})
    },

    queryShow(){
      this.page = 1;
      this.showList(1);
    },
    
    handleCurrentChange(val) {
      this.page = val;
      this.showList(1)
    },

    handleSizeChange(val) {
			this.pageSize = val;
      this.page = 1;
			this.showList(1);
		},
    
    //列表查询
    showList(tag){
      let that = this;
      that.loading = true;
      let params = {
        pageNumber:that.page,
        limit:that.pageSize,
        persType:3,
        persName:that.persName
      };
      that.paginationShow = false;
      perListByRecord(params).then(res => {
          if(res.code == 200){
            that.loading = false;
            that.tableData = res.data.items
            that.deviceList = res.data.allDevice;
            that.total = res.data.total;
            if(tag){
              that.$nextTick(function () {
                that.$refs.bigbox.scrollTo(0, 0);
              })
            }
          }else{
            this.$message.error(res.message);
            that.loading = false;
          }
          that.paginationShow = true;
        })
        .catch(() => {that.loading = false;})
    },

    //批量删除
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

    //批量操作
    handleSelectionChange(val){
      let that = this;
      let array = [];
      val.forEach(function(item,index,arr){
          array.push(item.persId)
        })
      this.delArr = array;
    },

    makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},


    //导出数据
    exportData(tag){
			let that = this;
      
      let url = process.env.VUE_APP_BASE_API;
			that.loading = true;
	     	let params = {
          persName:that.persName,
          persType:3
			};
			this.loading = true;
			if(tag){
        params.pageNumber = that.page;
        params.limit = that.pageSize;
			}
      this.axios.get(url+"/pro/per/perListExport", { params, headers: { token: getToken(), projectId: getProjectId() },timeout: 1800000,responseType:'blob' },
		).then((res) => {
		that.loading = false;
		const aLink = document.createElement("a");
		let blob =new Blob([res.data], {type:"application/vnd.ms-excel"})
		aLink.href = URL.createObjectURL(blob)
    let name = tag?'当前页':'全部';
		aLink.setAttribute('download',`备案人员导出${name}数据` +'.csv')// 设置下载文件名称
		aLink.click();
		window.URL.revokeObjectURL(aLink.href);
		});
		},
    
  }
}
