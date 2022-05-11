/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-09-28 13:01:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\SystemAdmin\UserAdmin\UserAdmin.js
 */
import PhoneFirst from '../../../components/custom/PhoneFist/PhoneFist.vue'
import PhoneSecond from '../../../components/custom/PhoneSecond/PhoneSecond.vue'
import PasswordFirst from '../../../components/custom/PasswordFirst/PasswordFirst.vue'
import MailFirst from '../../../components/custom/MailFirst/MailFirst.vue'
import MailSecond from '../../../components/custom/MailSecond/MailSecond.vue'
import AssignRoles from '../../../components/custom/AssignRoles/AssignRoles.vue'
import AssignItems from '../../../components/custom/AssignItems/AssignItems.vue'
import {userList,userDel,userUpdateStatus,getNewUserName,userTypeList,userAdd,userPwdReset,userUpdateMail,userSendEmailCode ,userAssPro,userAssProCommit,
      userSendPhoneCode,userUpdatePhone} from '@/api/api.js'

export default {
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${ i }`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };

    return {
      filterMethod(query, item) {
        return item.projectName.indexOf(query) > -1;
      },
      buttonList:[],
      index: 0,
      input1:'',        //项目或公司名称
      input2:'',        //项目或公司账号
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      option: '',
      tableData: [],
      value: '100',
      visible: false,
      page:1,
      total:0,
      pageSize:10,
      loading:true,
      loading1:false,
      rowData:'',
      userid:'',
      activeName: '1',
      dialogFormVisible: false,
      dialogFormVisible1:false,
      dialogFormVisible2:false,
      dialogFormVisible3:false,
      form: {
        userName: '',
        phone:'',
        email:'',
        userType:''
      },
      email:'',
      code:'',
      formLabelWidth: '80px',
      data: generateData(),
      value: [1, 4],
      user:JSON.parse(localStorage.getItem('user')),
      userType:[],
      addType:'',
      textSend:0,            //短信是否发送
      content: '发送验证码',  // 按钮里显示的内容
      totalTime: 60,       //记录具体倒计时时间
      totalTime1: 60,       //记录具体倒计时时间
      canClick: true,      //添加canClick
      canClick1: true,      //添加电话canClick
      userName:'',
      version:'',
      right:'',
      projectName:'',
      projectId:'',
      userNameFirst:'',
      phone:'',
      clock:'',
      clock1:''
    }
  },
  components: {
    PhoneFirst,
    PhoneSecond,
    PasswordFirst,
    MailFirst,
    MailSecond,
    AssignRoles,
    AssignItems
    // IoLi
  },
  methods: {
    bs() {
      console.log(this.option)
    },

    //添加用户动作
    addUser(){
      if(parseInt(this.activeName)==1){
        this.randomName();
      }else{
        this.form.userName = '';
      }
      this.dialogFormVisible = true;
    },

    //分配用户
    showProject(row){
      let that = this;
      that.userNameFirst = row.userName;
      that.projectId = row.projectId;
      that.projectName = row.projectName
      let params = {
        userName:row.userName
      };
      userAssPro(params).then(res => {
        if(res.code == 200){
          let arr = [];
          let arr1 = [];
          let arr2 = res.data.leftProProjectList.concat(res.data.rightProProjectList)
          if(arr2.length>0){
            arr2.forEach((item, index) => {
              arr.push({
                label:item.projectName,
                key:item.projectId,
                projectName:item.projectName
              })
            })
          }
          that.data = arr;
          if(res.data.rightProProjectList.length>0){
            res.data.rightProProjectList.forEach((item, index) => {
              arr1.push(item.projectId)
            })
          }
          that.value = arr1;
          that.dialogFormVisible3 = true;
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {this.loading = false})
    },

    //分配事件
    assUser(){
      let arr = [];
      let array = [];
      if(this.data.length>0 && this.right.length>0){
        this.data.forEach(item1 => {
          var flag = false;
          this.right.forEach(item2 => {
            if (item1.key === item2) {
              flag = true;
            }
          })
          if (!flag) {
            arr.push({
              projectId:item1.key,
              projectName:item1.projectName
            })
          }
        })
      }else{
        this.data.forEach((item, index) => {
          arr.push({
            projectId:item.key,
            projectName:item.projectName
          })
        })
      }
     if(this.right.length>0){
      this.right.forEach((item, index) => {
        this.data.forEach((item1, index1) => {
          if(item == item1.key){
            array.push({
              projectId:item1.key,
              projectName:item1.projectName
            })
          }
        })
      })
     }
      
      let that = this;
      let params = {
        userName:that.userNameFirst
      };
      params.leftProProjectList = arr;
      params.rightProProjectList = array
      userAssProCommit(params).then(res => {
        if(res.code == 200){
          this.$alert(res.message, '提示', {
            confirmButtonText: '确定',
            showClose:false,
            closeOnClickModal:false,
            closeOnPressEscape:false,
            closeOnHashChange:false,
            callback: action => {
              that.dialogFormVisible3 = false ;
            }
          });
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {this.loading = false})
    },

    //取消添加
    cancle(){
      this.loading1 = false;
      this.dialogFormVisible = false
    },

    //穿梭框变化事件
    handleChange(value, direction, movedKeys) {
      this.right = value;
    },

    //添加用户
    addUserForm(){
      if(this.form.userName == ''){
        this.$message.error('用户名获取失败，请刷新重试');
        return
      }else if(this.form.userType == ''){
        this.$message.error('用户类型获取失败，请刷新重试');
        return
      }
      let that = this;
      let params = this.form
      that.loading1 = true;
      userAdd(params).then(res => {
        that.loading1 = false;
        if(res.code == 200){
          this.$alert(res.message, '提示', {
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
          that.loading1 = false;
        }
      })
      .catch(() => {that.loading1 = false;})
    },

    // 获取新名字
    randomName(){
      let that = this;
      getNewUserName().then(res => {
        if(res.code == 200){
          that.form.userName = res.data
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {})
    },

    // 枚举用户类型
    getUserTypeList(){
      let that = this;
      userTypeList().then(res => {
        if(res.code == 200){
          that.userType = res.data
          that.activeName = res.data[0].dicKey+''
          that.showList();
          that.queryType(parseInt(that.activeName),1);
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {})
    },

    queryType(type,tag){
      let that = this;
      var item1 = null;
      try {
        that.userType.forEach(function(item,index,arr){
          if(type === item.dicKey && tag){
            that.addType = item.dicValue
            that.form.userType = item.dicKey
            throw Error();
            return 
          }else if(type === item.dicKey && !tag){
            item1 = item.dicValue
            throw Error();
          }
        })
      } catch (e) {
      }
      return item1;
    },

    editUser(data){
      this.$router.push({
        path: '/Set/UserAdd',
        query: {
          data: data
        }
      })
    },

    handleClick(tab, event) {
      this.activeName = tab.name;
      this.queryType(parseInt(this.activeName),1);
      this.showList();
    },

    makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

    handleSizeChange(val) {
			this.pageSize = val;
			this.showList(this.type);
		},

    delUser(id){
      this.$confirm('确认删除该用户?一旦删除将无法登陆', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose:false,
        closeOnClickModal:false,
        closeOnPressEscape:false,
        closeOnHashChange:false,
        type: 'warning'
      }).then(() => {
        let that = this;
        let params = {
          userName:id
        };
        userDel(params).then(res => {
          if(res.code == 200){
            this.$alert(res.message, '提示', {
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
          }
        })
        .catch(() => {})
      }).catch(() => {
        return        
      });  
    },
    showList(){
      let that = this;
      let params = {
        username:that.input2,
        userType:that.activeName,
        pageNumber:that.page,
        limit:that.pageSize
      };
      if(parseInt(that.activeName)==1){
         params.projectName = that.input1
      }else{
        params.company = that.input1
      }
      that.loading = true;
      userList(params).then(res => {
        that.loading = false;
        if(res.code == 200){
          that.tableData = res.data.items;
          that.total = res.data.total;
          that.loading = false;
        }else{
          this.$message.error(res.message);
          that.loading = false;
        }
      })
      .catch(() => {that.loading = false;})
    },

    handleCurrentChange(val) {
      this.page = val;
      this.showList()
    },

    //修改状态
    changeRole(e,row){
      let that = this;
      let params = {
        userName:row.userName,
        userStatus:e,
        version:row.version
      };
      userUpdateStatus(params).then(res => {
        if(res.code == 200){
          that.showList();
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {that.showList();})
    },

    resetPwd(row){
      this.$confirm(`确认重置"${row.userName}"用户的密码吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this;
        let params = {
          userName:row.userName,
          version:row.version
        };
        userPwdReset(params).then(res => {
          if(res.code == 200){
            this.$alert(res.message, '提示', {
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
          }
        })
        .catch(() => {})
      }).catch(() => {
        return        
      });  
    },

    bindEmail(row){
      this.dialogFormVisible2=true;
      this.userName = row.userName;
      this.version = row.version;
    },

    bindPhone(row){
      this.dialogFormVisible1=true;
      this.userName = row.userName;
      this.version = row.version;
    },

    //修发送邮箱验证码
    sendEmailCode(){
      let that = this;
      let params = {
        userName:that.userName,
        email: that.email
      };
      console.log(params )
      userSendEmailCode(params).then(res => {
        if(res.code == 200){
            this.$message(res.message);
            this.canClick = false
            this.content = this.totalTime + 's后重新发送'
             that.clock = window.setInterval(() => {
              that.totalTime--
              that.content = this.totalTime + 's后重新发送'
              if (that.totalTime < 0) {
              window.clearInterval(that.clock)
              that.content = '重新发送验证码'
              that.totalTime = 60
              that.canClick = true  //这里重新开启

              }
            },1000)
            that.clock1 = window.setInterval(() => {
              that.totalTime1--
              if (that.totalTime1 < 0) {
              window.clearInterval(that.clock1)
              that.totalTime1 = 60
              that.canClick = true  //这里重新开启
              }
            },1000)
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {})
    },

    //修发送手机验证码
    sendPhoneCode(){
      let that = this;
      let params = {
        userName:that.userName,
        phone: that.phone
      };
      userSendPhoneCode(params).then(res => {
        if(res.code == 200){
            this.$message(res.message);
            this.canClick1 = false
            this.content = this.totalTime + 's后重新发送'
            this.clock = window.setInterval(() => {
              that.totalTime--
              that.content = this.totalTime + 's后重新发送'
              if (that.totalTime < 0) {
              window.clearInterval(that.clock)
              that.content = '重新发送验证码'
              that.totalTime = 60
              that.canClick1 = true  //这里重新开启
              }
            },1000)

            that.clock1 = window.setInterval(() => {
              that.totalTime1--
              if (that.totalTime1 < 0) {
              window.clearInterval(that.clock1)
              that.totalTime1 = 60
              that.canClick1 = true  //这里重新开启
              }
            },1000)
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {})
    },

    /**
     * @Description: 倒计时
     * @Author: zhangjing
     */    
     timeClock(tag){
      if(!tag){
        if (!this.canClick){
          this.$message({
            message: '1分钟内请勿重复发送',
            type: 'warning'
          });
          return  //改动的是这两行代码
        }
        if(this.email == ''){
          this.$message({
            message: '请输入邮箱地址',
            type: 'warning'
          });
          return;
        }
        let that = this;
       
        this.sendEmailCode();
      }else{
        if (!this.canClick1){
          this.$message({
            message: '1分钟内请勿重复发送',
            type: 'warning'
          });
          return  //改动的是这两行代码
        }
        if(this.phone == ''){
          this.$message({
            message: '请输入手机号',
            type: 'warning'
          });
          return;
        }
        let that = this;
       
        this.sendPhoneCode();
      }
      
    },

    cancleBind(){
      let that = this;
      that.dialogFormVisible2 = false;
      that.dialogFormVisible1 = false;
      window.clearInterval(that.clock)
      that.content = '发送验证码'
      that.totalTime = 60
      that.email = '';
      that.phone = '';
      that.code = '';
    },

    //确定绑定邮箱
    bindEmailSure(){
      let that = this;
      let params = {
        'sysUser' :{
          userName:that.userName,
          email: that.email,
          version:that.version
        },
        'verificationCode': parseInt(that.code)
      };
      userUpdateMail(params).then(res => {
        if(res.code == 200){
          this.$alert('邮箱绑定成功', '提示', {
            confirmButtonText: '确定',
            showClose:false,
            closeOnClickModal:false,
            closeOnPressEscape:false,
            closeOnHashChange:false,
            callback: action => {
              that.dialogFormVisible2 = false;
              that.showList();
              that.cancleBind();
            }
          });
            
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {that.showList();})
    },

    //确定绑定手机
    bindPhoneSure(){
      let that = this;
      let params = {
        'sysUser' :{
          userName:that.userName,
          phone: that.phone,
          version:that.version
        },
        'verificationCode': parseInt(that.code)
      };
      userUpdatePhone(params).then(res => {
        if(res.code == 200){
          this.$alert('手机号绑定成功', '提示', {
            confirmButtonText: '确定',
            showClose:false,
            closeOnClickModal:false,
            closeOnPressEscape:false,
            closeOnHashChange:false,
            callback: action => {
              that.dialogFormVisible1 = false;
              that.showList();
              that.cancleBind();
            }
          });
            
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {that.showList();})
    }
  },
  mounted() {
    console.log(this.user)
    if(this.user.sysRole.roleId==30){
      this.getUserTypeList();
      console.log('?')
    }else{
      this.showList();
      console.log('!')
    }
    
    this.buttonList =  this.$store.getters.button
  }
}
