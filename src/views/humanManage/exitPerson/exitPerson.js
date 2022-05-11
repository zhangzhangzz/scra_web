/*
 * @Author: your name
 * @Date: 2021-08-17 09:36:57
 * @LastEditTime: 2021-11-24 13:18:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\exitPerson\exitPerson.js
 */
let params = "";
let frompage1 = "";
import {getTeamWorkMoreData,perListByForbidden,getPersCancelForbiddenData,persCancelForbidden,persDelete,batchAdmission} from '@/api/api.js'
export default {
  data() {
    return {
      loading:false,
      loading1:false,
      options:'',
      options2:'',
      tableData: [],
      page:1,
      total:0,
      pageSize:10,
      globalProjectId:'',
      dialogVisible:false,
      row:'',
      teamId:'',
      workId:'',
      persName:'',
      ruleForm:{
        persId:'',
        teamId:'',
        workId:''
      },
      rules: {
        teamId: [
            { required: true, message: '请选择班组', trigger: 'blur' }
        ],
        workId: [
            { required: true, message: '请选择工种', trigger: 'blur' }
        ],
      }  ,
      globalProjectId:'',
      team:[],
      user:JSON.parse(localStorage.getItem('user')),
      delArr:[],
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
    }
		this.showList();
    this.showList1();
	},
  destroyed() {
    if(this.user.userType!=1){
      localStorage.removeItem("allProjectId");
    }
  },
  methods: {
    makeIndex(index) {
        return (this.page - 1) * this.pageSize + index + 1
    },

    //查看详情
    lookDetail(row){
      let that = this;
      that.$router.push({path: '/humanManage/perDetail',query: {id:row.persId,projectId:row.projectId,pageNumber:that.page,limit:that.pageSize}})
    },

    //搜索条件枚举
    showList1(){
          let that = this;
          getTeamWorkMoreData().then(res => {
            if(res.code == 200){
            that.options2 = res.data
            that.showList();
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {})
        },
    
    handleSelectionChange(val){
      let that = this;
      let array = [];
      val.forEach(function(item,index,arr){
          array.push(item.persId)
        })
      this.delArr = array;
    },

    joinArea(row){
      this.row = row;
      this.ruleForm.persId = row.persId;
      this.queryTj();
      this.dialogVisible = true;
    },

    //删除人员
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

    comePerson(id){
        let that = this;
        that.loading = true;
        batchAdmission(id).then(res => {
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

    //批量入场
    countDel1() {
      if(this.delArr.length==0){
        this.$message({
          message: '请选择要入场的人员',
          type: 'warning'
        });
        return
      }else{
        this.$confirm(`确定入场选中人员?`, '入场人员', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.comePerson(this.delArr);
        }).catch(() => {
          
        })
        
      }
    },

    handleSizeChange(val) {
			this.pageSize = val;
      this.page = 1;
			this.showList(1);
		},

    handleCurrentChange(val) {
      this.page = val;
      this.showList(1)
    },

     //项目选择事件
    proChange(e){
      let obj = {
        id:this.options.projectData[e].projectId,
        value:this.options.projectData[e].projectName
      }
      localStorage.setItem('allProjectId', JSON.stringify(obj));
      if(e===''){
        this.team = '';
        this.ruleForm.teamId = '';
      }else{
        this.team = this.options.projectData[e].team;
      }
    },

    resetForm(formName) {
      this.dialogVisible = false;
      this.globalProjectId = '';
      if(this.user.userType!=1){
        localStorage.removeItem("allProjectId");
      }
      this.$refs[formName].resetFields();
    },

    //入场
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let that = this;
          let params = that.ruleForm;
          this.loading1 = true;
          persCancelForbidden(params).then(res => {
            if(res.code == 200){
              this.loading1 = false;
              this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                showClose:false,
                closeOnClickModal:false,
                closeOnPressEscape:false,
                closeOnHashChange:false,
                callback: action => {
                  that.resetForm('ruleForm');
                  that.showList();
                }
              });
            }else{
              this.$message.error(res.message);
              this.loading1 = false;
            }
          })
          .catch(() => {this.loading1 = false;}) 
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    //列表查询
    showList(tag){
      let that = this;
      that.loading = true;
      console.log(that.page)
      let params = {
        pageNumber:that.page,
        limit:that.pageSize,
        exist:1,
        persName:that.persName,
        workId: that.workId==''?'':parseInt(that.workId),
        teamId:that.teamId==''?'':parseInt(that.teamId),
      };
      that.paginationShow = false;
      perListByForbidden(params).then(res => {
          if(res.code == 200){
            that.loading = false;
            that.tableData = res.data.items
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

  queryShow(){
    this.page = 1;
    this.showList(1);
  },

    queryTj(){
      let that = this;
      let params = {
      };
      getPersCancelForbiddenData(params).then(res => {
          if(res.code == 200){
            that.options = res.data;
            if(that.user.userType==1){
              that.team = res.data.projectData[0].team
              let obj = {
                id : res.data.projectData[0].projectId,
                value : res.data.projectData[0].projectName
              }
              localStorage.setItem('allProjectId', JSON.stringify(obj));
            }
          }else{
            this.$message.error(res.message);
          }
        })
        .catch(() => {})
      },

  }
}
