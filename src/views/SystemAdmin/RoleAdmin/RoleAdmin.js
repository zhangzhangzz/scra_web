/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-08-26 21:27:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\SystemAdmin\RoleAdmin\RoleAdmin.js
 */
import RoleAdd from '../../../components/custom/RoleAdd/RoleAdd.vue'
import RoleModify from '../../../components/custom/RoleModify/RoleModify.vue'
import AssignUser from '../../../components/custom/AssignUser/AssignUser.vue'
import RoleMenu from './roleMenu/roleMenu.vue'
import {roleList,roleDel,roleSetStatus,roleAdd,roleUpdate,roleUserList,bindRoleUser} from '@/api/api.js'
export default {
  data() {
    return {
      filterMethod(query, item) {
        return item.userName.indexOf(query) > -1;
      },
      buttonList:[],
      index: 0,
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      option: '',
      tableData: [],
      tableData1: [],
      value: '1',
      loading :false,
      loading1 :false,
      data:'',
      roleid:'',
      roleName:'',
      roleNameFirst:'',
      menuData:'',
      page:1,
      total:0,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: '80px',
      pageSize:10,
      form: {
        roleName: '',
        remark:'',
        roleStatus:0
      },
      update:'',
      data1: [],
      value1: [],
      right:'',
      left:''
    }
  },
  components: {
    RoleAdd,
    RoleModify,
    AssignUser,
    RoleMenu
  },
  methods: {
    //角色新增修改弹窗
    editRole(type,row){
      if(type){
        this.update = '新增'
      }else{
        this.update = '修改'
        this.form = row;
      }
      this.dialogFormVisible = true;

    },

		makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

    handleSizeChange(val) {
			this.pageSize = val;
			this.showList(this.type);
		},
    

    //搜索框事件
    inputChange(e){
      this.roleNameFirst = e;
      this.showList();
    },

    //穿梭框变化事件
    handleChange(value, direction, movedKeys) {
      this.right = value;
    },

    getIndex(index) {
      this.data = '';
      this.index = index
    },

    getIndex2(index) {
      this.data = '';
      this.index = index;
      this.showList();
    },

    fpjs(id){
      this.index = 3;
      this.roleid = id;
      this.tableData1 = JSON.stringify(this.tableData)
    },

    //分配菜单
    fpMenu(id,name){
      this.index = 4;
      this.roleid = id;
      this.roleName = name;
    },

    handleCurrentChange(val) {
      this.page = val;
      this.showList()
    },

    //展示角色
    showList(){
      let that = this;
      let params = {
        pageNumber:that.page,
        limit:10,
        roleName:this.roleNameFirst
      };
      that.loading = true;
      roleList(params).then(res => {
          that.loading = false;
        if(res.code == 200){
          that.tableData = res.data.items;
          that.total = res.data.total;
        }else{
          this.$message.error(res.message);
          that.loading = false;
        }
      })
      .catch(() => {that.loading = false;})
    },

      assUser(){
        let arr = [];
        let newArr = this.data1
        if(newArr.length>0 && this.right.length>0){
          newArr.forEach((item, index) => {
            var flag = false;
            this.right.forEach((item1, index1) => {
              if (item.userName === item1) {
                flag = true;
              }
            })
            if(!flag){
              arr.push(item.userName)
            }
          })
        }else{
          this.data1.forEach((item, index) => {
            arr.push(item.userName)
          })
        }
        
        let that = this;
        let params = {
          roleId:that.roleid,
          left:arr,
          right:that.right
        };
        bindRoleUser(params).then(res => {
          if(res.code == 200){
            this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              showClose:false,
              closeOnClickModal:false,
              closeOnPressEscape:false,
              closeOnHashChange:false,
              callback: action => {
                that.dialogFormVisible2 = false ;
              }
            });
          }else{
            this.$message.error(res.message);
            this.loading = false
          }
        })
        .catch(() => {this.loading = false})
      },

      //分配用户
      showUser(id){
        let that = this;
        this.roleid = id;
        let params = {
          roleId:id
        };
        roleUserList(params).then(res => {
          if(res.code == 200){
            let arr = [];
            let arr1 = [];
            let arr2 = res.data.left.concat(res.data.right)
            if(arr2.length>0){
              arr2.forEach((item, index) => {
                arr.push({
                  label:item.userName,
                  key:item.userName,
                  userName:item.userName
                })
              })
            }
            that.data1 = arr;
            if(res.data.right.length>0){
              res.data.right.forEach((item, index) => {
                arr1.push(item.userName)
              })
            }
            that.value1 = arr1;
            that.dialogFormVisible2 = true;
          }else{
            this.$message.error(res.message);
          }
        })
        .catch(() => {this.loading = false})
      },


    //删除角色  
    delRole(id){
      this.$confirm('确认删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this;
        
        roleDel([id]).then(res => {
            if(res.code == 200){
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
            }
          })
          .catch(() => {})
      }).catch(() => {
        return        
      });  
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

    //修改状态
    changeRole(e,row){
      this.updateRole(row,e);
    },

    updateRole(form,e){
      let params = {
        roleId:form.roleId,
        version:form.version
      };
      if(e==undefined){
        params.roleName = form.roleName;
        params.remark = form.remark;
      }else{
        params.roleStatus = e;
      }
      roleUpdate(params).then(res => {
        this.loading1 = false;
        if(res.code == 200){
          this.$alert('修改成功', '提示', {
            confirmButtonText: '确定',
            showClose:false,
            closeOnClickModal:false,
            closeOnPressEscape:false,
            closeOnHashChange:false,
            callback: action => {
              this.dialogFormVisible = false;
              this.showList();
            }
          });
        }else{
          this.$message.error(res.message);
          this.loading1 = false;
        }
      })
      .catch(() => {this.loading1 = false;})
    },

    addRole(){
      
      if(this.form.roleName==''){
        this.$message.error('请输入角色名称');
        return
      }
      this.loading1 = true
      let params = this.form;
      if(this.update == '新增'){
        roleAdd(params).then(res => {
          this.loading1 = false;
          if(res.code == 200){
            this.$alert('添加成功', '提示', {
              confirmButtonText: '确定',
              showClose:false,
              closeOnClickModal:false,
              closeOnPressEscape:false,
              closeOnHashChange:false,
              callback: action => {
                this.dialogFormVisible = false;
                this.showList();
              }
            });
          }else{
            this.$message.error(res.message);
            this.loading1 = false;
          }
        })
        .catch(() => {this.loading1 = false;})
      }else{
        this.updateRole(this.form);
      }
    }
  },
  mounted() {
    this.showList();
    this.buttonList =  this.$store.getters.button
  }
}
