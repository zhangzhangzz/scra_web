/*
 * @Author: your name
 * @Date: 2021-06-18 09:31:10
 * @LastEditTime: 2021-11-30 09:56:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\projectManage\ProjectList\ProjectList.js
 */
import ProMap from "../ProMap/ProMap.vue"
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
import {projectList,projectDel,addProjectList,uploadTvHomepagePictures,deleteTvHomepagePictures,smsSwitch,projectRegionData} from '@/api/api.js'
export default {
  data() {
    return {
      userName:'',          //项目账号
      projectName:'',       //项目名称
      buttonList:[],
      checkList:[],
      item_options: [],
      userId:'',
      item: '',
      index:0,
      options: [1, 2, 3, 4, 5],
      option: '',
      pages: [12, 23, 24, 45],
      ruleForm: {
        name: ''
      },
      rules1: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      dialogVisible1:false,
      dialogVisible2:false,
      dialogProAdd: false,
      tableData: [],
      value: true,
      value2: false,
      input: '',
      currentPage4: 1,
      dialogVisible: false,
      ruleForm1: {
        sqzh: '',
        sqmy: '',
        sbxh: '',
        tbbh: ''
      },
      dialogImageUrl: '',
      pageSize:10,
      dialogVisible: false,
      ruleForm: {
        jzmj: '',
        xmmc: '',
        sgdw:'',
        xmzj: '',
        jldw:'',
        kgrq:'',
        jgrq:'',
        jsdw:'',
        xmfl:'',
        kcdw:'',
        xmqy:'',
        jd:'',
        WD:'',
        ajbah:'',
        lxfs:'',
        xfrl:'',
        scjw:'',
    },
    options: [],
        loading :true,
    rules: {
        xmmc: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        xmfl: [
            { required: true, message: '请选择项目分类', trigger: 'blur' }
        ],
        jd: [
            { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        wd: [
            { required: true, message: '请输入纬度', trigger: 'blur' }
        ],
        lxfs: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        scjw: [
            { required: true, message: '请选择是否自动上传成都建委', trigger: 'blur' }
        ],
        xfrl: [
            { required: true, message: '请选择是否自动下发人脸', trigger: 'blur' }
        ]
    }  ,
    page:1,
    total:0,
    pageName:'projectList',
    globalProjectId:'',
    user:JSON.parse(localStorage.getItem('user')),
    fileList:[],
    dialogImageUrl :[],
    disabled: false,
    projectId:''
    }
  },
  components:{
    ProMap,
    globalProject
  },
  methods: {
    duijie() {
      this.$router.push('/Set/dock')
    },

    makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

    queryProId(id){
      this.globalProjectId = id;
      this.projectName = id.value;
    },

    handleSizeChange(val) {
			this.pageSize = val;
			this.showList(this.type);
		},

    //特殊数据戳
    formatDate(now) { 
      if(now==null || now =='') return
      now = new Date(now);
      var year=now.getFullYear();  //取得4位数的年份
      var month=(now.getMonth()+1) < 10 ? '0'+ (now.getMonth()+1):now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date=now.getDate()< 10 ? '0'+now.getDate():now.getDate();      //返回日期月份中的天数（1到31）
      var hour=now.getHours() < 10 ?'0'+now.getHours():now.getHours();     //返回日期中的小时数（0到23）
      var minute=now.getMinutes()< 10 ?'0'+now.getMinutes():now.getMinutes(); //返回日期中的分钟数（0到59）
      var second=now.getSeconds()< 10 ?'0'+now.getSeconds():now.getSeconds(); //返回日期中的秒数（0到59）
      let time = year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second
      let arr = time.split(" ");
      return arr[0];
  },

    goCreate(){
      if(this.userId ==''){
        this.$message.error('请选择项目');
        return;
      }
      this.$router.push({
        path: '/projectManage/projectEdit',
        query: {
          id:this.userId,
          options:JSON.stringify(this.options)
        }
      })
    },

    changeUserID(e){
      this.userId = e;
    },

    handleCurrentChange(val) {
      this.page = val;
      this.showList()
    },
    handleClose_item() {
      this.dialogVisible = false
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleClose1() {
      this.dialogProAdd = false
    },
    getIndex(index){
      this.index=index
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

    //关闭图片
    closePic(){
      this.dialogVisible1=false;
      this.fileList = [];
      this.projectId = '';
    },

    //展示角色
    showType(){
        let that = this;
        let params = {
        };
        addProjectList(params).then(res => {
            if(res.code == 200){
                that.checkList = res.data.projectTypeList;
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {})
    },

showArea(){
          let that = this;
          let params = {
          };
          projectRegionData(params).then(res => {
              if(res.code == 200){
                  
              }else{
                this.$message.error(res.message);
              }
            })
            .catch(() => {})
      },

    queryItemType(value){
      let type = '';
      this.checkList.forEach(function(item,index,arr){
        if(value == item.dicKey){
          type = item.dicValue
          return
        }
      })
      return type
    },

    //展示角色
    showList(){
      console.log(localStorage.getItem('allProjectId'))
      let that = this;
      let params = {
        pageNumber:that.page,
        limit:that.pageSize,
        globalProjectId:that.globalProjectId==''?'':that.globalProjectId.id,
        userName:that.userName,
        projectName:that.projectName
      };
      this.loading = true;
      projectList(params).then(res => {
        this.loading = false;
        if(res.code == 200){
          that.tableData = res.data.pageResult.items;
          that.item_options = res.data.userList;
          that.loading = false;
        that.checkList = res.data.projectTypeList;
          that.total = res.data.pageResult.total;
          that.options = res.data.projectTypeList;
        }else{
          this.$message.error(res.message);
          this.loading = false;
        }
      })
      .catch(() => {this.loading = false;})
    },

    //查看图片
    review(row){
      if(row.projectHomePictureToTv!=''){
        this.fileList = [{url:'http://yun.cdscra.com'+row.projectHomePictureToTv}];
      }
      this.projectId = row.projectId;
      this.dialogVisible1 = true;
    },

    handlePreview(file,fileList) {
      this.fileList = fileList;
      console.log(fileList )
    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      
    },

    handleRemove(file) {
      let that = this;
      this.$confirm(`确定删除该照片?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        deleteTvHomepagePictures({projectId:that.projectId}).then(res => {
          if (res.code == 200) {
              this.$alert(res.message, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                     that.fileList = [];
                      that.dialogVisible1 = false;
                      that.showList();
                  }
              });
          }else{
            this.$message.error(res.message);
            this.loading = false;
          }
      })
      .catch(() => {})
      }).catch(() => {
        
      }    )
  },

  handlePictureCardPreview(file) {
    this.dialogImageUrl = [file.url];
    this.dialogVisible = true;
  },

  changeSwitch(e,row){
    let text = e?'启用':'禁止';
    this.$confirm('是否'+text+'短信预警?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    }).then(() => {
      let that = this;
      let params = {
        projectId:row.projectId,
        version:row.version
      }
      smsSwitch(params).then(res => {
        if (res.code == 200) {
          this.$message.success(text+'成功')
        } else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        const status = e?0:1
        row.smsReminderSwitch = status
        console.log(err)
      })
    }).catch(() => {
      const status = e?0:1
      row.smsReminderSwitch = status
    })
    
  },

  /**
     * @Description: 请求方法示例
     * @Author: liyongli
     * @param {*} params01 参数1用途
     * @param {*} params02 参数2用途
     */
   onEvaluation1(){
    let that = this;
    if(that.fileList.length===0){
      this.$message.error('请上传图片');
        return 
    }
    
    var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
    formData.append('projectId',that.projectId);
    if(that.fileList.length>0){
        console.log(that.fileList[0].raw)
        formData.append('image',that.fileList[0].raw)
    }
    uploadTvHomepagePictures(formData).then(res => {
        if (res.code == 200) {
            this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    that.dialogVisible1 = false;
                    that.showList();
                }
            });
        }else{
          this.$message.error(res.message);
          this.loading = false;
        }
    })
    .catch(() => {})
  },
  },
  mounted() {
    this.showList();
    // this.showType();
    this.buttonList =  this.$store.getters.button
    this.showArea();
  }
}
