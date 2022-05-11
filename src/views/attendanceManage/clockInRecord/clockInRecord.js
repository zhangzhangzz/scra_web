/*
 * @Author: your name
 * @Date: 2021-07-22 11:02:35
 * @LastEditTime: 2021-12-22 16:00:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\applicationManage\countryControl\countryControl.js
 */
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
import {attendList,attendListMj,exportCurrentList,exportCurrentAllList,attendUpload} from '@/api/api.js'
import { getToken,getProjectId } from '@/utils/auth'
// import { parseFloat } from 'core-js/core/number'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入aqi值'));
      } else if(!(/(^[1-9]\d*$)/.test(value))){
        callback(new Error('aqi值应为正整数'));
      }else{
        callback();
      }
    };
    return {
      dialogVisible: false,
      tableData: [],
      dialogFormVisible: false,
      pageSize:10,
      form: {
        aqi: '',
        pm10: '',
        pm2: '',
        fahrenheit: '',
        noise:''
      },
      formLabelWidth: '80px',
        loading :true,
        rules: {
            aqi: [
                { required: true, validator: validatePass, trigger: 'blur' }
            ],
            pm10: [
                { required: true, message: '请输入pm10值', trigger: 'blur' }
            ],
            pm2: [
                { required: true, message: '请输入pm2.5值', trigger: 'blur' }
            ],
            fahrenheit: [
                { required: true, message: '请输入温度值', trigger: 'blur' }
            ],
            noise: [
                { required: true, message: '请输入噪音值', trigger: 'blur' }
            ]
        }  ,
        page:1,
        total:0,
        dataValue:'',
        id:'',
        name:'',
        attendName:'',
        team:'',
        attendWork:'',
        attendStatus:'',
        startAttendTimeStr:'',
        endAttendTimeStr:'',
        persType:'',
        date:'',
        queryData:'',
        globalProjectId:'',
        delArr:[],
        user:JSON.parse(localStorage.getItem('user')),
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
      console.log(id)
      this.globalProjectId = id;
    },

    changeInput(e,tag) {
      var regu = "^[0-9]+\.?[0-9]*$";
      var re = new RegExp(regu);
      if (!re.test(e)) {
        // input 框绑定的内容为空
        if(tag==1){
          this.form.pm10 = '';
        }else if(tag==2){
          this.form.pm2 = '';
        }else if(tag==3){
          this.form.fahrenheit = '';
        }else if(tag==4){
          this.form.noise = '';
        }
      }
    },

    handleSelectionChange(val) {
      let that = this;
      let array = [];
      val.forEach(function(item,index,arr){
          array.push(item.attendId)
          })
      this.delArr = array;
    },

    countDel() {
      if(this.delArr.length==0){
        this.$message.error('请选择要上传的人员');
        return
      }else{
        this.$confirm(`确定上传选中人员?`, '上传人员', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.uploadJw1(this.delArr);
        }).catch(() => {
          
        })
      }
  },

    cancle(){
      this.dialogFormVisible = false;
      this.$refs.ruleForm.resetFields();
    },
    
    handleOut(id) {
      this.$confirm('确认删除该项目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this;
        let params = {
          proid:id
        };
        this.loading = true;
        projectDel([id]).then(res => {
          if(res.code == 200){
            this.loading = false;
            this.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              showClose:false,
              closeOnClickModal:false,
              closeOnPressEscape:false,
              closeOnHashChange:false,
              callback: action => {
                that.showList();
              }
            });
          }else{
            this.$message.error(res.message);
            this.loading = false;
          }
        })
        .catch(() => {this.loading = false;})
      }).catch(() => {
        return        
      });  
      
    },

    uploadJw1(id){
      let that = this;
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

    editData(){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let that = this;
          this.form.aqi = parseInt(this.form.aqi);
          this.form.pm10 = parseFloat(this.form.pm10);
          this.form.pm2 = parseFloat(this.form.pm2);
          this.form.noise = parseFloat(this.form.noise);
          this.form.fahrenheit = parseFloat(this.form.fahrenheit);
          PCSDataEdit(this.form).then(res => {
            this.loading = false;
            if(res.code == 200){
              this.$alert('修改成功', '提示', {
                confirmButtonText: '确定',
                showClose:false,
                closeOnClickModal:false,
                closeOnPressEscape:false,
                closeOnHashChange:false,
                callback: action => {
                  that.dialogFormVisible = false;
                  that.showList();
                }
              });
            }else{
              this.$message.error(res.message);
              this.loading = false;
            }
          })
          .catch(() => {this.loading = false;})
        } else {
          return false;
        }
      });
      
    },

    editDataSure(row){
      this.form.aqi = row.aqi;
      this.form.pm10 = row.pm10;
      this.form.pm2 = row.pm2;
      this.form.noise = row.noise;
      this.form.fahrenheit = row.fahrenheit;
      this.form.number = row.number;
      this.dialogFormVisible = true;
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

    //展示角色
    showList(){
      let that = this;
      let params = {
        pageNumber:that.page,
        limit:that.pageSize,
        attendName:that.attendName,
        team:that.team,
        attendWork: that.attendWork,
        attendStatus:that.attendStatus,
        startAttendTimeStr:that.date!=''&& that.date!==null ? that.date[0]:'',
        endAttendTimeStr:that.date!=''&& that.date!==null ? that.date[1]:'',
        // projectName : that.globalProjectId.value
      };
      this.loading = true;
      attendList(params).then(res => {
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

    queryTj(){
      let that = this;
      attendListMj().then(res => {
        this.loading = false;
        if(res.code == 200){
          that.queryData= res.data;
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {})
    },

    exportData(tag){
			let that = this;
			that.loading = true;
	     	let params = {
        attendName:that.attendName,
        team:that.team,
        attendWork: that.attendWork,
        attendStatus:that.attendStatus,
        startAttendTimeStr:that.date!=''&& that.date!==null ? that.date[0]:'',
        endAttendTimeStr:that.date!=''&& that.date!==null ? that.date[1]:'',
        projectName : that.globalProjectId.value
			};
			this.loading = true;
      
  let url = process.env.VUE_APP_BASE_API;
			if(tag){
        params.pageNumber = that.page;
        params.limit = that.pageSize;
	// 			exportCurrentList(params).then(res => {
  //         that.loading = false;
	// 				const aLink = document.createElement("a");
	// 				let blob =new Blob([res], {type:"application/vnd.ms-excel"})
	// 				aLink.href = URL.createObjectURL(blob)
	// 				aLink.setAttribute('download','考勤记录导出当前页数据' +'.csv')// 设置下载文件名称
	// 				aLink.click()
	// 				this.$refs.loadElement.appendChild(aLink)
	// 	      	})
	// 	      	.catch(() => {})
  this.axios.get(url+"/pro/attend/export_current_list", { params, headers: { token: getToken(), projectId: getProjectId() },timeout: 1800000,responseType:'blob' },
  ).then((res) => {
    that.loading = false;
    const aLink = document.createElement("a");
    let blob =new Blob([res.data], {type:"application/vnd.ms-excel"})
    aLink.href = URL.createObjectURL(blob)
    aLink.setAttribute('download','考勤记录导出当前页数据' +'.csv')// 设置下载文件名称
    aLink.click();
    window.URL.revokeObjectURL(aLink.href);
  });
			}else{
	// 			exportCurrentAllList(params).then(res => {
  //         that.loading = false;
	// 				const aLink = document.createElement("a");
	// 				let blob =new Blob([res], {type:"application/vnd.ms-excel"})
	// 				aLink.href = URL.createObjectURL(blob)
	// 				aLink.setAttribute('download','考勤记录导出全部数据' +'.csv')// 设置下载文件名称
	// 				aLink.click()
	// 				this.$refs.loadElement.appendChild(aLink)
	// 	      	})
	// 	      	.catch(() => {})
  this.axios.get(url+"/pro/attend/export_all_list", { params, headers: { token: getToken(), projectId: getProjectId() },timeout: 1800000,responseType:'blob' },
                ).then((res) => {
                that.loading = false;
                const aLink = document.createElement("a");
                let blob =new Blob([res.data], {type:"application/vnd.ms-excel"})
                aLink.href = URL.createObjectURL(blob)
                aLink.setAttribute('download','考勤记录导出全部数据' +'.csv')// 设置下载文件名称
                aLink.click();
                window.URL.revokeObjectURL(aLink.href);
                });
			}
		},
  },
  mounted() {
    this.queryTj();
    this.showList();
    // this.buttonList =  this.$store.getters.button
  }
}
