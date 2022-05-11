/*
 * @Author: your name
 * @Date: 2021-07-01 16:31:11
 * @LastEditTime: 2021-11-24 13:21:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\PerPolice\PerPolice.js
 */
let params = "";
let frompage1 = "";
import {perListByTemp,persDelete,migrationButton,migrationTemporaryPer} from '@/api/api.js'
import { getToken,getProjectId } from '@/utils/auth'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      var pattern = new RegExp("^1[3456789][0-9]{9}$", 'i');
      if(value==''){
        callback(new Error('请输入手机号'));
      }else if (!pattern.test(value) && value!='') {
        callback(new Error('请输入正确的手机号'));
      }else {
        callback();
      }
    };
    var valiUrgencyPhone = (rule, value, callback) => {
      var pattern = new RegExp("^1[3456789][0-9]{9}$", 'i');
      if (!pattern.test(value) && value!='') {
        callback(new Error('请输入正确的手机号'));
      }else {
        callback();
      }
    };
    return {
      loading:false,
      loading1:false,
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
      dialogVisible:false,
      formLabelWidth: '100px',
      user:JSON.parse(localStorage.getItem('user')),
      ruleForm:{
        persId:'',
        phone:'',
        unitId:'',
        teamId:'',
        workId:'',
        persType:1,
        urgencyName:'',
        urgencyPhone:''
      },
      rules: {
        persType: [
          { required: true, message: '请选择人员类型', trigger: 'blur' }
        ],
        teamId: [
            { required: true, message: '请选择班组', trigger: 'blur' }
        ],
        workId: [
            { required: true, message: '请选择工种', trigger: 'blur' }
        ],
        
        unitId: [
          { required: true, message: '请选择所属单位', trigger: 'blur' }
        ],
        
        phone: [
          { required: true,validator: validatePass, trigger: 'blur' }
        ],
        urgencyPhone:[
          { validator: valiUrgencyPhone, trigger: 'blur' }
        ]
        
      }  ,
      selectData:'',
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
        persType:4,
        persName:that.persName
      };
      that.paginationShow = false;
      perListByTemp(params).then(res => {
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
        .catch(() => { that.loading = false;})
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

    //获取迁移数据
     getMigratePerson(id){
      let that = this;
      that.loading = true;
      let params = {
        persId: id
      };
      that.ruleForm.persId = id;
      migrationButton(params).then(res => {
          if(res.code == 200){
            that.loading = false;
            that.selectData = res.data;
            that.queryWork(res.data.unit);
            // that.dialogVisible = true;
          }else{
            this.$message.error(res.message);
            that.loading = false;
          }
        })
        .catch(() => { that.loading = false;})
    },

    queryWork(data){
      let that = this;
      try {
        data.forEach(function(item,index,arr){
          if(that.ruleForm.unitId!== ''){
            throw Error();
          }else{
            if(item.dicValue == "施工单位"){
              that.ruleForm.unitId = item.dicKey
              that.dialogVisible = true;
              throw Error();
            }
          }
        })
      } catch (e) {
      }
      
    },

    //迁移
    // migratePerson(id){
    //   this.getMigratePerson();
    // },

    //导出数据
    exportData(tag){
			let that = this;
      
      let url = process.env.VUE_APP_BASE_API;
			that.loading = true;
	     	let params = {
          persName:that.persName,
          persType:4
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
		aLink.setAttribute('download',`临时人员导出${name}数据` +'.csv')// 设置下载文件名称
		aLink.click();
		window.URL.revokeObjectURL(aLink.href);
		});
		},

    cancle(){
      this.dialogVisible = false;
      that.resetForm('ruleForm');
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //确定迁移
    addDeviceSure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let that = this;
          let params = this.ruleForm;
          migrationTemporaryPer(params).then(res => {
            if(res.code == 200){
              this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  that.cancle();
                  that.showList();
                }
              });
              
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {})
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    queryShow(){
      this.page = 1;
      this.showList(1);
    },
    
  }
}
