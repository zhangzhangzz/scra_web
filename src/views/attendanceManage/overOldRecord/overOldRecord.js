/*
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-20 20:57:43
 * @LastEditTime: 2021-12-22 16:02:08
 */
import {attendList,attendListMj,teamList,teamEdit,teamDel,teamMonitorLsit,setTeamMonitor} from '@/api/api.js'
import Clickoutside from 'element-ui/src/utils/clickoutside'
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
import { getToken,getProjectId } from '@/utils/auth'
export default {
    directives: { Clickoutside },
    components:{
        globalProject
    },
    data() {
        return {
            tableData: [],
            tabList: [{
                id: 1,
                name: '木工班组',
                num: 4
            }, {
                id: 2,
                name: '水泥班组',
                num: 16
            }, {
                id: 3,
                name: '搬砖班组',
                num: 32
            }, {
                id: 4,
                name: '托运班组',
                num: 56
            }, {
                id: 5,
                name: '钢筋班组',
                num: 23
            }, {
                id: 5,
                name: '退场人员',
                num: 210
            }],
            ruleForm: {
                teamName: ''
            },
            rules: {
                teamName: [
                  { required: true, message: '请输入班组名称', trigger: 'blur' }
                ]
            },
            currentPage4: 1,
            t_actived:0,
            activeName2: 'first',
            edit_tag: '', // 班组编辑弹框
            activeName: 'first', // el-aside班组工种的选择
            t_actived: 0, // 班组工种背景样式控制
            editDialog_index: '', // 班组工种后面...的控制值
            dialogVisible4: false,
            type:0,
            dialogVisible: false,
            dialogFormVisible: false,
            pageSize:10,
            page:1,
            total:0,
            pageSize1:20,
            page1:1,
            total1:0,
            pageSize2:10,
            page2:1,
            total2:0,
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
            loading:false,
            loading1:false,
            loading2:false,
            gropuList:[],                   //班组里的人
            teamId:'',                      //班组id
            persName:'',                    //班组搜索人名
            perIndex:'',                     //班长人员选择index
            persId:'',                      //选中人id
            globalProjectId:'',
            user:JSON.parse(localStorage.getItem('user')),
        }
    },
    methods: {
        makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

        queryProId(id){
            this.globalProjectId = id;
        },

        handleSelectionChange(val) {
            // this.multipleSelection = val;
        },

        close(e) {
            this.editDialog_index = '';
        },

        //选中班长
        choosePerson(id,index){
            this.persId = id;
            this.perIndex = index;
        },

        handleClickOutSide(e) {
            // 当外部被点击时调用
            console.log(e);
            console.log(111)
          },

        cancle(){
        this.dialogVisible4 = false;
        this.dialogVisible = false;
        this.persId = '';
        this.perIndex = '';
        this.$refs.ruleForm.resetFields();
        },
        
        //班组人名搜索        
        selectPerson(e){
            this.pageNumber2 = 1;
            this.queryGroupList(this.teamId);
            console.log(this.persName)
        },

        //设置班长
        setMonitor(){
            let that = this;
            if(that.persId == ''){
                this.$message({
                    message: '请选择需要设置班长人员',
                    type: 'warning'
                });
                return
            }
            if(that.teamId == ''){
                this.$message({
                    message: '设置班长的班组id为空',
                    type: 'warning'
                });
                return
            }
            let params = {
                persId: that.persId,
                teamId : that.teamId
            };
            this.loading2 = true;
            setTeamMonitor(params).then(res => {
            if(res.code == 200){
                this.loading2 = false;
                this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                showClose:false,
                closeOnClickModal:false,
                closeOnPressEscape:false,
                closeOnHashChange:false,
                callback: action => {
                    that.dialogVisible = false;
                }
                });
            }else{
                that.loading2 = false;
              this.$message.error(res.message);
            }
          })
          .catch(() => {this.loading2 = false;})
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

        handleCurrentChange1(val) {
            this.page1 = val;
            this.getTeamList()
        },

        handleSizeChange1(val) {
            this.pageSize1 = val;
            this.getTeamList(this.teamId);
        },
        
        handleCurrentChange2(val) {
            this.page2 = val;
            this.queryGroupList(this.teamId);
        },

        handleSizeChange2(val) {
            this.pageSize2 = val;
            this.queryGroupList(this.teamId);
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
            attendStatus:that.attendStatus,
            startAttendTimeStr:that.date!=''&& that.date!==null ? that.date[0]:'',
            endAttendTimeStr:that.date!=''&& that.date!==null ? that.date[1]:'',
            persType:5,
            projectName : that.globalProjectId.value
        };
        this.loading = true;
        attendList(params).then(res => {
            if(res.code == 200){
                that.tableData = res.data.items;
                that.total = res.data.total;
                that.loading = false;
            }else{
              this.$message.error(res.message);
              this.loading = false;
            }
          })
          .catch(() => {})
        },

        //获取班组列表
        getTeamList(){
            let that = this;
            let params = {
                pageNumber:that.page1,
                limit:that.pageSize1
            };
            this.loading1 = true;
            teamList(params).then(res => {
                if(res.code == 200){
                  that.tabList= res.data.items;
                  that.loading1 = false;
                that.total1 = res.data.total;
                }else{
                  this.loading1 = false;
                  this.$message.error(res.message);
                }
              })
              .catch(() => {this.loading1 = false;})
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



        handleSelectionChange(val) {
            // this.multipleSelection = val;
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

        exportData(tag){
			let that = this;
			that.loading = true;
	     	let params = {
                attendName:that.attendName,
                attendStatus:that.attendStatus,
                startAttendTimeStr:that.date!=''&& that.date!==null ? that.date[0]:'',
                endAttendTimeStr:that.date!=''&& that.date!==null ? that.date[1]:'',
                persType:5,
                projectName : that.globalProjectId.value
			};
			this.loading = true;
      
  let url = process.env.VUE_APP_BASE_API;
			if(tag){
        params.pageNumber = that.page;
        params.limit = that.pageSize;
  this.axios.get(url+"/pro/attend/export_current_list", { params, headers: { token: getToken(), projectId: getProjectId() },timeout: 1800000,responseType:'blob' },
  ).then((res) => {
    that.loading = false;
    const aLink = document.createElement("a");
    let blob =new Blob([res.data], {type:"application/vnd.ms-excel"})
    aLink.href = URL.createObjectURL(blob)
    aLink.setAttribute('download','超龄人员录导出当前页数据' +'.csv')// 设置下载文件名称
    aLink.click();
    window.URL.revokeObjectURL(aLink.href);
  });
			}else{
  this.axios.get(url+"/pro/attend/export_all_list", { params, headers: { token: getToken(), projectId: getProjectId() },timeout: 1800000,responseType:'blob' },
                ).then((res) => {
                that.loading = false;
                const aLink = document.createElement("a");
                let blob =new Blob([res.data], {type:"application/vnd.ms-excel"})
                aLink.href = URL.createObjectURL(blob)
                aLink.setAttribute('download','超龄人员导出全部数据' +'.csv')// 设置下载文件名称
                aLink.click();
                window.URL.revokeObjectURL(aLink.href);
                });
			}
		},


    //查询班组里人员接口
    queryGroupList(id){
        let that = this;
         let params = {
            pageNumber:that.page2,
            limit:that.pageSize2,
            teamId:id,
            persName:that.persName
        };
        this.loading2 = true;
        teamMonitorLsit(params).then(res => {
            if(res.code == 200){
              that.gropuList= res.data.items;
              that.loading2 = false;
                that.total2 = res.data.total;
                that.dialogVisible = true;
                console.log(that.gropuList)
            }else{
                this.loading2 = false;
              this.$message.error(res.message);
            }
          })
          .catch(() => {this.loading2 = false;})
    },

        
        handleClose4() {
            this.dialogVisible4 = false
        },

        hick_group(index, name) { // 点击班组工种样式的变化
            this.t_actived = index
            this.editDialog_index = '';
        },

        editGroup(index) { // 班组工种后面...的操作
            this.editDialog_index = index
        },

        handleClick(tab, event) { // 班组工种选择
            console.log(tab, event)
        },
        editTag(index,t) { // 编辑班组  删除班组
            this.edit_tag = index
            this.editDialog_index = ''
            if (index == 1) {
              this.ruleForm.teamName = t.teamName
              this.ruleForm.teamId = t.teamId;
              this.dialogVisible4 = true
            } else if(index==0){
              this.$confirm(`确定删除'${t.teamName}'吗?`, '删除班组', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.delMonitor(t.teamId);
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                })
              })
            }else{
                this.teamId = t.teamId;
                this.queryGroupList(this.teamId);
            }
          },

        //编辑班组
        editMonitor(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let that = this;
                    let params = that.ruleForm
                    that.loading1 = true;
                    teamEdit(params).then(res => {
                        that.loading1 = false;
                        if(res.code == 200){
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            showClose:false,
                            closeOnClickModal:false,
                            closeOnPressEscape:false,
                            closeOnHashChange:false,
                            callback: action => {
                            that.getTeamList();
                            }
                        });         
                        }else{
                          this.$message.error(res.message);
                            this.loading1 = false;
                        }
                      })
                      .catch(() => {this.loading1 = false;})
                    this.dialogVisible4 = false;
                } else {
                  console.log('error submit!!');
                  return false;
                }
            });
        },


        delMonitor(id){
        let that = this;
          let params = {
            teamId:id
        }
        that.loading1 = true;
        teamDel(params).then(res => {
            that.loading1 = false;
            if(res.code == 200){
            this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                showClose:false,
                closeOnClickModal:false,
                closeOnPressEscape:false,
                closeOnHashChange:false,
                callback: action => {
                that.getTeamList();
                }
            });         
            }else{
              this.$message.error(res.message);
              this.loading1 = false;
            }
          })
          .catch(() => {this.loading1 = false;})
        },
    },

    mounted() {
        this.queryTj();
        this.showList();
        this.getTeamList();
        // this.buttonList =  this.$store.getters.button
    }
}