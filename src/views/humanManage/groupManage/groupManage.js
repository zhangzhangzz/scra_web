/*
 * @Author: your name
 * @Date: 2021-08-10 13:53:14
 * @LastEditTime: 2021-11-24 13:20:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\groupManage\groupManage.js
 */
let params = "";
let frompage1 = "";
import {transferTeam,addTeam,getTransferTeamData,teamList,teamEdit,teamDel,teamMonitorLsit,setTeamMonitor,getAddTeamData,cancelTeamLeader} from '@/api/api.js'
import Clickoutside from 'element-ui/src/utils/clickoutside'
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
import { getToken,getProjectId } from '@/utils/auth'
export default {
    components: {
        globalProject
      },
    directives: { Clickoutside },
    data() {
      return {
        tableData: [],
        queryData:'',
        loading:false,
        loading1:false,
        loading2:false,
        loading3:false,
        dialogVisible:false,
        dialogVisible1:false,
        dialogVisible2:false,
        t_actived:'',
        tabList:[],
        editDialog_index:'',
        gropuList:[],                   //班组里的人
        teamId:'',                      //班组id
        persName:'',                    //班组搜索人名
        perIndex:'',                     //班长人员选择index
        persId:'',                      //选中人id
        pageSize:10,
        page:1,
        total:0,
        pageSize1:20,
        page1:1,
        total1:0,
        pageSize2:10,
        page2:1,
        total2:0,
        ruleForm: {
            teamName: '',
            projectId:''
        },
        rules: {
            teamName: [
              { required: true, message: '请输入班组名称', trigger: 'blur' }
            ],
            projectId: [
                { required: true, message: '请选择项目', trigger: 'blur' }
              ],
        },
        ruleForm1: {
            teamId: '',
            persIds:'',
            teamName: '',
        },
        rules1: {
            persIds: [
              { required: true, message: '请选择班组', trigger: 'blur' }
            ]
        },
        dialogTableVisible:false,
        gridData:[],
        type:1,                         //1编辑  0 添加
        user:JSON.parse(localStorage.getItem('user')),
        projectId:'',
        deviceData:[],                  //项目列表
        deviceData1:[],                 //转移班组
        leader:'',
        asideHeight:0,
        paginationShow1:true,
        paginationShow2:true,
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
    mounted() {
        console.log(params)
        if(params!=''){
            this.page1 = params.pageNumber1;
            this.pageSize1 = params.limit1;
            this.page2 = params.pageNumber2;
            this.pageSize2 = params.limit2;
            this.editDialog_index = '';
            this.t_actived = params.index
            this.teamId = params.teamId;
            this.leader = params.leader;
            this.getTeamList();
            this.queryGroupList(this.teamId);
        }else{
            this.getTeamList();
        }
        // this.buttonList =  this.$store.getters.button
    },
    methods: {
        //查看详情
        lookDetail(row){
            let that = this;
            that.$router.push({path: '/humanManage/perDetail',query: {id:row.persId,projectId:row.projectId,pageNumber1:that.page1,
                limit1:that.pageSize1,pageNumber2:that.page2,limit2:that.pageSize2,teamId:that.teamId,index:that.t_actived,leader:that.leader}})
        },
        
        makeIndex(index) {
			return (this.page2 - 1) * this.pageSize2 + index + 1
		},

        close(e) {
            this.editDialog_index = '';
        },

        //选中班长
        choosePerson(id,index){
            this.persId = id;
            this.perIndex = index;
        },

        cancle(){
        this.dialogVisible1 = false;
        this.dialogVisible = false;
        this.dialogVisible2 = false;
        this.persId = '';
        this.perIndex = '';
        this.ruleForm1.teamId =  '';
        this.ruleForm1.persIds = '';
        this.ruleForm1.teamName =  '';
        this.ruleForm.teamName =  '';
        this.ruleForm.projectId = '';
        if(this.$refs.ruleForm!==undefined){
            this.$refs.ruleForm.resetFields();
        }
        if(this.$refs.ruleForm1!==undefined){
            this.$refs.ruleForm1.resetFields();
        }
        
        },
        
        //班组人名搜索        
        selectPerson(e){
            this.pageNumber2 = 1;
            this.queryGroupList(this.teamId);
            console.log(this.persName)
        },

        //设置班长
        setMonitor(row){
            this.$confirm(`确定将'${row.persName}设为班组长'吗?`, '设置班组长', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                let that = this;
                let params = {
                    persId: row.persId,
                    teamId : row.teamId
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
                        that.getTeamList();
                        that.queryGroupList(row.teamId);
                        that.leader = row.persId;
                    }
                    });
                }else{
                    that.loading2 = false;
                  this.$message.error(res.message);
                }
              })
              .catch(() => {this.loading2 = false;})
              }).catch(() => {
                
              })
        },

        cancleLeader1(row){
            this.$confirm(`确定取消'${row.persName}'的班组长吗吗?`, '取消班组长', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.cancleLeader(row);
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                })
              })
        },

        //取消班组长
        cancleLeader(row){
            let that = this;
            let params = {
                teamId : row.teamId
            };
            this.loading = true;
            cancelTeamLeader(params).then(res => {
            if(res.code == 200){
                this.loading = false;
                this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                showClose:false,
                closeOnClickModal:false,
                closeOnPressEscape:false,
                closeOnHashChange:false,
                callback: action => {
                    that.getTeamList();
                    that.queryGroupList(row.teamId);
                    that.leader = '';
                }
                });
            }else{
                that.loading = false;
              this.$message.error(res.message);
            }
          })
          .catch(() => {this.loading = false;})
            
        },

        transferGroup(){
            this.$refs.ruleForm1.validate((valid) => {
                if (valid) {
                    let that = this;
                    let params = {
                        persIds: [that.ruleForm1.persIds],
                        teamId : that.ruleForm1.teamId
                    };
                    this.loading2 = true;
                    transferTeam(params).then(res => {
                    if(res.code == 200){
                        this.loading2 = false;
                        this.$alert(res.message, '提示', {
                        confirmButtonText: '确定',
                        showClose:false,
                        closeOnClickModal:false,
                        closeOnPressEscape:false,
                        closeOnHashChange:false,
                        callback: action => {
                            that.cancle();
                            that.getTeamList();
                            console.log(that.teamId)
                            that.queryGroupList(that.teamId);
                        }
                        });
                    }else{
                        that.loading2 = false;
                      this.$message.error(res.message);
                    }
                  })
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
        
        handleCurrentChange1(val) {
            let that = this;
            this.page1 = val;
            this.t_actived = 0;
            this.getTeamList(1);
        },

        
        handleCurrentChange2(val) {
            this.page2 = val;
            this.queryGroupList(this.teamId);
        },

        handleSizeChange2(val) {
            this.pageSize2 = val;
            this.page2 = 1;
            this.asideHeight = 0;
            this.queryGroupList(this.teamId);
        },

        query(){
        this.page =1;
        this.getTeamList();
        },

        //获取班组列表
        getTeamList(tag){
            let that = this;
            let params = {
                pageNumber:that.page1,
                limit:that.pageSize1
            };
            this.loading1 = true;
            that.paginationShow1 = false;
            teamList(params).then(res => {
                if(res.code == 200){
                  that.tabList= res.data.items;
                  that.loading1 = false;
                    if(that.teamId === '' || tag){
                        that.page2 = 1;
                        that.teamId = res.data.items[0].teamId;
                        that.leader = res.data.items[0].teamLeaderPersId;
                        that.queryGroupList(res.data.items[0].teamId);
                        this.$nextTick(function () {
                            that.$refs.aside1.scrollTo(0, 0);
                        })
                    }
                that.total1 = res.data.total;
                }else{
                    that.loading1 = false;
                  this.$message.error(res.message);
                }
                that.paginationShow1 = true;
              })
              .catch(() => {that.loading1 = false;})
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
                    that.getTeamList();
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
            str += item.appName + ','
            }else{
            str += item.appName
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
                    that.getTeamList();
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


    //查询班组里人员接口
    queryGroupList(id){
        let that = this;
         let params = {
            pageNumber:that.page2,
            limit:that.pageSize2,
            teamId:id,
            persName:that.persName
        };
        this.loading = true;
        that.paginationShow2 = false;
        teamMonitorLsit(params).then(res => {
            if(res.code == 200){
              that.tableData= res.data.items;
              that.loading = false;
                that.total2 = res.data.total;
                this.$nextTick(function () {
                    let h = window.getComputedStyle(this.$refs.bbbox).height;
                    console.log(h)
                    that.asideHeight = (parseInt(h)+47) +'px';
                    console.log(that.asideHeight)
                    that.$refs.bbbox.scrollTo(0, 0);
                    that.$refs.bigBox.scrollTo(0, 0);
                })
            }else{
                that.loading = false;
              this.$message.error(res.message);
            }
            that.paginationShow2 = true;
          })
          .catch(() => {that.loading = false;})
    },

        
        handleClose4() {
            this.dialogVisible1 = false
        },

        hick_group(index, t) { // 点击班组工种样式的变化
            this.t_actived = index
            this.editDialog_index = '';
            this.teamId = t.teamId;
            this.page2 = 1;
            this.leader = t.teamLeaderPersId;
            this.queryGroupList(t.teamId)
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
            //编辑
            if (index == 1) {
              this.ruleForm.teamName = t.teamName
              this.ruleForm.teamId = t.teamId;
              this.dialogVisible1 = true
              this.type = 1;
            } else if(index==0){
            //删除
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
                this.ruleForm.teamName = ''
                this.ruleForm.teamId = '';
                this.type = 0;
                this.queryAddData();
            }
          },

        //编辑班组
        editMonitor(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let that = this;
                    that.loading1 = true;
                    if(that.type){
                        delete that.ruleForm.projectId
                        let params = that.ruleForm
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
                                that.loading1 = false;
                            }
                          })
                          .catch(() => {that.loading1 = false;})
                        this.dialogVisible1 = false;
                    }else{
                        let params = that.ruleForm
                        addTeam(params).then(res => {
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
                                that.loading1 = false;
                            }
                          })
                          .catch(() => {that.loading1 = false;})
                        this.dialogVisible1 = false;
                    }
                    
                } else {
                  return false;
                }
            });
        },

        //添加或移除组员列表
        queryAddGroupList(id){
            let that = this;
            let params = {
                teamId:id
            }
            that.loading3 = true;
            getTransferTeamData(params).then(res => {
                if(res.code == 200){
                that.loading3 = false;
                res.data.items = that.gridData;       
                }else{
                  that.loading3 = false;
                  this.$message.error(res.message);
                }
              })
              .catch(() => {that.loading3 = false;})
        },

        //获取添加需要的数据
        queryAddData(){
            let that = this;
            getAddTeamData().then(res => {
                if(res.code == 200){
                    that.deviceData = res.data
                    that.dialogVisible1 = true;
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {})
        },

        //转移班组
        transferGroup0(row){
            let that = this;
            that.ruleForm1.teamName = row.teamName;
            that.ruleForm1.persIds = row.persId;
            getTransferTeamData({projectId:row.projectId}).then(res => {
            if(res.code == 200){
                that.deviceData1 = res.data;
                that.dialogVisible2 = true;
            }else{
                this.$message.error(res.message);
            }
          })
          .catch(() => {})
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
            that.loading1 = false;
            }
          })
          .catch(() => {that.loading1 = false;})
        },

      //导出数据
    exportData(tag){
        let that = this;
  
  let url = process.env.VUE_APP_BASE_API;
  let url1 = '';
        that.loading = true;
     	let params = {
    teamId:that.teamId
        };
        this.loading = true;
        if(tag){
    url1 = '/pro/team/export_current_team_list';
    params.pageNumber = that.page;
    params.limit = that.pageSize;
        }else{
    url1 = '/pro/team/export_all_team_list';
  }
  this.axios.post(url+url1, params, {headers: { token: getToken(), projectId: getProjectId() },timeout: 1800000,responseType:'blob' },
    ).then((res) => {
    that.loading = false;
    const aLink = document.createElement("a");
    let blob =new Blob([res.data], {type:"application/vnd.ms-excel"})
    aLink.href = URL.createObjectURL(blob)
let name = tag?'当前页':'全部';
    aLink.setAttribute('download',`班组导出${name}数据` +'.csv')// 设置下载文件名称
    aLink.click();
    window.URL.revokeObjectURL(aLink.href);
    });
    },
    }
  }
  