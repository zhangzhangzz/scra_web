let params = "";
let frompage1 = "";
import {getTeamWorkMoreData,perList,persDelete,persForbidden,persAuthorized,manualUploadPersToJW,perListExport} from '@/api/api.js'
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
import { getToken,getProjectId } from '@/utils/auth'
export default {
  components:{
    globalProject
  },
  data() {
    return {
      loading:false,
      month:'30',
      BGC:1,
      type:0,
      tableData5: [],
      img1: 'http://scra.cdscra.com:50021/cloud/scra/lw/1a885552ff3c4c0abb67e44dc8ecaa2d/20210516/Photo_513922198807287791.jpg',
      img2: 'http://scra.cdscra.com:50021/cloud/scra/lw/1a885552ff3c4c0abb67e44dc8ecaa2d/20210516/Photo_513922198807287791.jpg',
      img3: 'http://scra.cdscra.com:50021/cloud/scra/lw/247190fb35f640e89e0256b645c7a075/20210516/Photo_510922197206097135.jpg',
      img4: 'http://scra.cdscra.com:50021/cloud/scra/lw/1a885552ff3c4c0abb67e44dc8ecaa2d/20210516/Photo_51102319710817289X.jpg',
      img5:require('../../../assets/images/permanage/torgjw_n.png'),
      img6:require('../../../assets/images/permanage/upjw_n.png'),
      img7:require('../../../assets/images/permanage/torgjw.png'),
      img8:require('../../../assets/images/permanage/upjw.png'),
      dialogVisible5: false,
      dialogVisible4: false,
      dialogVisible3: false,
      dialogVisible2: false,
      dialogVisible: false, // 编辑班组的蒙层
      activeName2: 'first',
      edit_tag: '', // 班组编辑弹框
      activeName: 'first', // el-aside班组工种的选择
      t_actived: 0, // 班组工种背景样式控制
      editDialog_index: '', // 班组工种后面...的控制值
      ry_select:[{
        value: '选项1',
        label: '备案人员'
      }, {
        value: '选项2',
        label: '临时人员'
      }, {
        value: '选项3',
        label: '项目管理人员'
      }],
      rylx:'选项1',
      rules: {
        name: [
          { required: true, message: '请输入班组名称', trigger: 'blur' }
        ]
      },
      options: '',
      options3:'',
      tableData33:[],
      value: '',
      checkList: [],
      checkList1: [],
      plsq:false,
      rysq:false,
      ruleForm: {
        name: ''
      },
      tableData: [
      ],
      tabList: [],
      tabList2: [],
      status:'',                //同步状态
      online:'',                //在线状态
      teamId:'',                //班组
      workId:'',                //工种
      persName:'',              //人员姓名
      page:1,
      total:0,
      pageSize:10,
      deviceList:[],
      globalProjectId:'',
      delArr:[],
      sendFaceList:[],
      user:JSON.parse(localStorage.getItem('user')),
      perSonArr:[],
      paginationShow:true,
      storageData:''
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
  destroyed() {
    console.log('destroy')
    if(this.user.userType!=1){
      localStorage.removeItem("allProjectId");
    }
    this.page = 1;
    this.pageSize = 1;
    this.globalProjectId = '';
    this.persName = '';
    this.teamId = '';
    this.workId = '';
    this.online = '';
    this.status = '';
},
  mounted(){
    console.log(params)
    if(params!=''){
      this.page = params.pageNumber;
      this.pageSize = params.limit;
      if(params.globalProjectId!=''){
          this.globalProjectId = {
              id : params.globalProjectId
          }
          let obj = {
              value : params.projectName,
              id : params.globalProjectId
          }
          this.storageData = obj;
          localStorage.setItem('allProjectId', JSON.stringify(obj));
          console.log(localStorage.getItem('allProjectId'))
          this.$refs.globalProject.deviceActive();
      }else{
          this.globalProjectId = params.globalProjectId
      }
      this.persName = params.persName;
      this.teamId = params.teamId;
      this.workId = params.workId;
      this.online = params.online;
      this.status = params.status;
  }
  console.log(this.page)
		this.showList1();
	},
  methods: {
    makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

    queryProId(id){
      this.globalProjectId = id;
    },

    //查看详情
    lookDetail(row){
      let that = this;
      that.$router.push({path: '/humanManage/perDetail',query: {id:row.persId,projectId:row.projectId,pageNumber:that.page,limit:that.pageSize,globalProjectId:that.globalProjectId===''?'':that.globalProjectId.id,persName:that.persName,workId:that.workId,teamId:that.teamId,projectName:that.globalProjectId.value,status:that.status,online:that.online}})
    },

    //导出数据
    exportData(tag){
			let that = this;
      
      let url = process.env.VUE_APP_BASE_API;
			that.loading = true;
	     	let params = {
          persName:that.persName,
          workId: that.workId==''?'':parseInt(that.workId),
          teamId:that.teamId==''?'':parseInt(that.teamId),
          status:that.status==''?'':parseInt(that.status),
          persType:0
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
		aLink.setAttribute('download',`人员花名册导出${name}数据` +'.csv')// 设置下载文件名称
		aLink.click();
		window.URL.revokeObjectURL(aLink.href);
		});
//       perListExport(params).then(res => {
//         that.loading = false;
//         const aLink = document.createElement("a");
//         let blob =new Blob([res], {type:"application/vnd.ms-excel"})
//         aLink.href = URL.createObjectURL(blob)
//         let name = tag?'当前页':'全部';
//         aLink.setAttribute('download',`人员花名册导出${name}数据` +'.csv')// 设置下载文件名称
//         aLink.click()
//         this.$refs.loadElement.appendChild(aLink)
//         	})
//         	.catch(() => {})
		},
    
    handleSelectionChange(val) {
      let that = this;
      let array = [];
      val.forEach(function(item,index,arr){
          array.push(item.persId)
        })
      this.delArr = array;
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.page = 1;
      this.showList(1)
    },

    handleCurrentChange(val) {
      this.page = val;
      console.log('page')
      this.showList(1)
    },
    
    xx(row){
      this.rysq = true;
      let sz = [row.persId];
      this.perSonArr = sz;
      this.sendFaceList = row.allDevice;
      let array = [];
      row.issueDevice.forEach(function(item,index,arr){
        array.push(item.deviceId)
      })
      this.checkList1 = array
    },

    //批量操作
    batchOperate(){
      if(this.delArr.length==0){
        this.$message.error('请选择要授权的人员');
        return
      }
      this.plsq = true;
    },

    //批量授权
    giveSq(){
      if(this.checkList.length==0){
        this.$message.error('请选择要授权的设备');
        return
      }
      this.batchSq()
    },

    /**
     * 数组相减的方法
     * @param {Array} a
     * @param {Array} b
     */
    arrSubtraction(a, b) {
      if (Array.isArray(a) && Array.isArray(b)) {
        return a.filter((i) => !b.includes(i));
      }
      throw new new TypeError("arguments must be array")();
    },

    batchSq(){
      let that = this;
      let list = [];
      that.tableData[0].allDevice.forEach(function(item,index,arr){
        list.push(item.deviceId)
      })
      let unSq = that.arrSubtraction(list,that.checkList);
      let params = {
        persIds:that.delArr,
        authorizedDeviceIds:that.checkList,
        cancelAuthorizedDeviceIds:unSq
      };

      persAuthorized(params).then(res => {
        if(res.code == 200){
            this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              showClose:false,
              closeOnClickModal:false,
              closeOnPressEscape:false,
              closeOnHashChange:false,
              callback: action => {
                that.plsq = false;
                that.showList();
              }
            });
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {that.plsq = false;})
      
    },


    HU(index) {
      console.log(index)
      this.img1 = index
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

    //上传建委
    uploadJw(row){
      let that = this;
      this.$confirm(`是否将'${row.persName}'上传至建委?`, '上传建委', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.uploadJw1([row.persId]);
      }).catch(() => {
        
      })
    },

    //上传人员
    uploadJw1(id){
      let that = this;
      let params = {
        persIds:id
      }
      manualUploadPersToJW(params).then(res => {
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
        }
      })
      .catch(() => {})
    },


    dels2(row) {
      // console.log(d1)
      this.$confirm(`确定将'${row.persName}'人员退场吗?`, '退场人员', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exitPerson([row.persId]);
      }).catch(() => {
        
      })
    },
    countDel2() {
      if(this.delArr.length==0){
        this.$message.error('请选择要退场的人员');
        return
      }else{
        this.$confirm(`确定退场选中人员?`, '退场人员', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.exitPerson(this.delArr);
        }).catch(() => {
          
        })
      }
    },
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
    editTag(index, name,type) { // 编辑班组  删除班组
      this.edit_tag = index
      this.editDialog_index = ''
      var type1 = type==1?'工种':'班组'
      if (index == 1) {
        this.ruleForm.name = name
        this.dialogVisible4 = true
        this.type = type
      } else {
        this.$confirm(`确定删除该${type1}吗?`, '删除班组', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: res.message
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    editGroup(index) { // 班组工种后面...的操作
      this.editDialog_index = index
    },
    hick_group(index, name) { // 点击班组工种样式的变化
      this.t_actived = index
      console.log(name)
    },
    handleClick(tab) { // 班组工种选择
      console.log(tab.label)
      if(tab.label=="班组管理"){
        this.BGC=1
      }else{
        this.BGC=2
      }
    },

    //搜索条件枚举
    showList1(){
      let that = this;
      getTeamWorkMoreData().then(res => {
        if(res.code == 200){
        that.options = res.data
        that.showList();
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {})
    },

    queryShow(){
      this.page = 1;
      this.showList(1);
    },

    //列表查询
    showList(type){
      let that = this;
      that.loading = true;
      if(that.storageData!=''){
        localStorage.setItem('allProjectId', JSON.stringify(that.storageData));
        that.$refs.globalProject.deviceActive();
      }
      let params = {
        pageNumber:that.page,
        limit:that.pageSize,
        persName:that.persName,
        workId: parseInt(that.workId),
        teamId:parseInt(that.teamId),
        online:parseInt(that.online),
        status:parseInt(that.status)
      };
      that.paginationShow = false;
      perList(params).then(res => {
          if(res.code == 200){
            that.loading = false;
            that.tableData = res.data.items
            that.total = res.data.total;
            if(type){
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

    exitPerson(id){
      let that = this;
      that.loading = true;
      let params = {
        persIds:id
      };
      persForbidden(params).then(res => {
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

    sendFace(){
      let that = this;
      if(that.checkList1.length==0){
        this.$message.error('请选择授权设备');
        return
      }
      let params = {
        persIds:that.perSonArr,
        authorizedDeviceIds:that.checkList1
      };

      persAuthorized(params).then(res => {
        if(res.code == 200){
            this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              showClose:false,
              closeOnClickModal:false,
              closeOnPressEscape:false,
              closeOnHashChange:false,
              callback: action => {
                that.rysq = false;
                that.showList();
              }
            });
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {that.rysq = false;})
    },


  }
}
