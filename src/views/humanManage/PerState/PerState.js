/*
 * @Author: your name
 * @Date: 2021-07-01 16:31:11
 * @LastEditTime: 2021-12-27 15:20:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\PerState\PerState.js
 */
import {personStatus,editAuthorization,getPersonDevice,batchEditAuthorization,persDelete,projectTeam} from '@/api/api.js'
import { getToken,getProjectId } from '@/utils/auth'
export default {
  data() {
    return {
      filterMethod(query, item) {
        return item.deviceName.indexOf(query) > -1;
      },
      tableData: [],
      loading:false,
      loading1:false,
      page:1,
      total:0,
      pageSize:10,
      persName:'',
      dialogFormVisible:false,
      dialogFormVisible1:false,
      dialogFormVisible2:false,
      data1: [],
      value1: [],
      projectName:'',
      img1:require('../../../assets/images/permanage/device.png'),
      img2:require('../../../assets/images/permanage/device_n.png'),
      left:'',
      right:'',
      persId:'',
      tag:1,
      delArr:[],
      user:JSON.parse(localStorage.getItem('user')),
      editName:'',
      showIndex:'',
      item:'',
      teamName:''
    }
  },
  mounted(){
		this.showList();
    this.queryProjectTeam();
	},
  methods: {
    makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

    //鼠标经过事件
    mouseEnter(index){
      this.showIndex = index;
    },

    //鼠标离开事件
    mouseLeave(){
      this.showIndex = '';
    },

    tableRowClassName ({row, rowIndex}) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },

    //批量操作
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

    //班组查询
    queryProjectTeam(){
      let that = this;
      let params = {
      };
      projectTeam(params).then(res => {
        if(res.code == 200){
          that.item = res.data;
        }else{
          this.$message.error(res.message);
          that.loading = false;
        }
      })
      .catch(() => {that.loading = false;})
    },

    cancle(){
      this.dialogFormVisible = false;
      this.dialogFormVisible1 = false;
      this.dialogFormVisible2 = false;
      this.editName = '';
      this.right = '';
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

    //批量操作
    handleSelectionChange(val){
      let that = this;
      let array = [];
      val.forEach(function(item,index,arr){
          array.push(item.persId)
        })
      this.delArr = array;
    },

    //穿梭框变化事件
    handleChange(value, direction, movedKeys) {
      console.log(value)
      this.right = value;
    },

    //授权
    giveAuthorize(row,tag){
      this.data1 = row.left;
      this.persId = row.persId;
      this.tag = 1;
      if(tag){
        this.value1 = row.right;
        this.dialogFormVisible = true;
      }else{
        this.value1 = row.xq;
        this.dialogFormVisible1 = true;
      }
    },

    //列表查询
    showList(){
      let that = this;
      that.loading = true;
      let params = {
        pageNumber:that.page,
        limit:that.pageSize,
        projectName:that.projectName,
        persName:that.persName,
        teamName:that.teamName
      };
      personStatus(params).then(res => {
          if(res.code == 200){
            that.loading = false;
            res.data.items.forEach((item, index) => {
              let arr = [];
              let arr1 = [];
              let arr2 = [];
              item.voDeviceAuthorizationStatusList.forEach((item1, index1) => {
                arr1.push({
                  label:item1.deviceName,
                  key:item1.deviceId,
                  deviceName:item1.deviceName,
                  deviceId:item1.deviceId
                })
                if(item1.authorizationStatus===1){
                  arr.push(item1.deviceId)
                }else{
                  arr2.push(item1.deviceId)
                }
              })
              item.left = arr1;
              item.right = arr;
              item.xq = arr2;
            })
            that.tableData = res.data.items
            that.total = res.data.total;
          }else{
            this.$message.error(res.message);
            that.loading = false;
          }
        })
        .catch(() => {that.loading = false;})
    },

    batchSq(tag){
      this.tag = 0;
      this.editName = tag?'批量授权':'批量销权'
      this.allDevice(tag);
    },

    //全部设备
    allDevice(tag){
      let that = this;
      getPersonDevice().then(res => {
          if(res.code == 200){
            let arr = [];
            let arr1 = [];
            let arr2 = [];
            res.data.forEach((item, index) => {
              arr1.push({
                label:item.deviceName,
                key:item.deviceId,
                deviceName:item.deviceName,
                deviceId:item.deviceId
              })
              
            })
            that.data1 = arr1;
            that.value1 = [];
            that.right = [];
            that.dialogFormVisible2= true;
            
          }else{
            this.$message.error(res.message);
          }
        })
        .catch(() => {})
    },

    handleCurrentChange(val) {
      this.page = val;
      this.showList()
    },

    handleSizeChange(val) {
			this.pageSize = val;
      this.page = 1;
			this.showList();
		},

    assUser(tag){
      let arr = [];
      let newArr = this.data1
      let voDeviceAuthorizationStatusList = [];
      if(this.tag){
        if(this.right.length>0){
          newArr.forEach((item, index) => {
            var flag = false;
            this.right.forEach((item1, index1) => {
              if (item.deviceId === item1) {
                flag = true;
              }
            })
            let obj = {};
            if(flag){
              if(tag){
                obj.deviceId = item.deviceId;
                obj.authorizationStatus = 1;
              }else{
                obj.deviceId = item.deviceId;
                obj.authorizationStatus = 0;
              }
              voDeviceAuthorizationStatusList.push(obj)
            }
            
          })
        }
      }else{
        if(this.right.length>0){
          newArr.forEach((item, index) => {
            var flag = false;
            this.right.forEach((item1, index1) => {
              if (item.deviceId === item1) {
                flag = true;
              }
            })
            let obj = {};
            if(flag){
              obj.deviceId = item.deviceId;
              obj.authorizationStatus = this.editName=='批量授权'?1:0;
              voDeviceAuthorizationStatusList.push(obj)
            }
            
          })
        }
      }
      let that = this;
//       that.loading1 = true;
      if(this.tag){
        let params = {
          persId:that.persId,
          voDeviceAuthorizationStatusList:voDeviceAuthorizationStatusList
        };
        editAuthorization(params).then(res => {
          if(res.code == 200){
            this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              showClose:false,
              closeOnClickModal:false,
              closeOnPressEscape:false,
              closeOnHashChange:false,
              callback: action => {
                if(tag){
                  that.dialogFormVisible = false ;
                }else{
                  that.dialogFormVisible1 = false ;
                }
                that.loading1 = false;
                that.showList();
              }
            });
              }else{
                this.$message.error(res.message);
                that.loading1 = false;
              }
            })
          .catch(() => {that.loading1 = false;})
      }else{
        batchEditAuthorization(voDeviceAuthorizationStatusList).then(res => {
          if(res.code == 200){
            this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              showClose:false,
              closeOnClickModal:false,
              closeOnPressEscape:false,
              closeOnHashChange:false,
              callback: action => {
                that.dialogFormVisible2 = false ;
                that.loading1 = false;
                that.showList();
              }
            });
              }else{
                this.$message.error(res.message);
                that.loading1 = false;
              }
            })
          .catch(() => {that.loading1 = false;})
      }
      
    },

    //导出数据
    exportData(tag){
			let that = this;
      
      let url = process.env.VUE_APP_BASE_API;
      let url1 = '';
			that.loading = true;
	     	let params = {
          persName:that.persName,
          projectName:that.projectName,
          teamName:that.teamName
			};
			this.loading = true;
			if(tag){
        url1 = '/pro/per/export_current_device_authorization_status';
        params.pageNumber = that.page;
        params.limit = that.pageSize;
			}else{
        url1 = '/pro/per/export_all_device_authorization_status';
      }
      this.axios.get(url+url1, { params, headers: { token: getToken(), projectId: getProjectId() },timeout: 1800000,responseType:'blob' },
		).then((res) => {
		that.loading = false;
		const aLink = document.createElement("a");
		let blob =new Blob([res.data], {type:"application/vnd.ms-excel"})
		aLink.href = URL.createObjectURL(blob)
    let name = tag?'当前页':'全部';
		aLink.setAttribute('download',`人员状态导出${name}数据` +'.csv')// 设置下载文件名称
		aLink.click();
		window.URL.revokeObjectURL(aLink.href);
		});
		},


  }
}
