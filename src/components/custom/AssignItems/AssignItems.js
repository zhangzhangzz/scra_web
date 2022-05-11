/*
 * @Author: your name
 * @Date: 2021-06-22 10:09:02
 * @LastEditTime: 2021-07-09 16:10:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\AssignItems\AssignItems.js
 */
import {assignItems,giveRoleAssign,removeRoleAssign} from '@/api/api.js'
export default {
  data() {
    return {
      loading:true,
      dialogVisible: true,   //dia的显示
      gridData:[],
      multipleSelection: [],
      activeName: 'second'
    }
  },
  props:["userid"],
  methods: {
    setIndex2(){      //dia X的关闭
        this.$emit('toIndex', 0)
    },

    handleClick2(tab, event){
        this.activeName = tab.name;
    },

    showList(){
      let that = this;
      let params = {
    userId:that.userid
        };
        assignItems(params).then(res => {
          that.loading = false;
        if(res.code == 200){
          that.gridData= res.data;
        }else{
          this.$message.error(res.message);
        }
      })
      .catch(() => {that.loading =false;})
    },

    roleType(type,id){
      let that = this;
      let params = {
            proids:id,
            userId:that.userid
        };
        if(type){
            giveRoleAssign(params).then(res => {
              that.loading = false;
            if(res.code == 200){
                this.$alert(`销权成功`, '提示', {
                    confirmButtonText: '确定',
                    showClose:false,
                    closeOnClickModal:false,
                    closeOnPressEscape:false,
                    closeOnHashChange:false,
                    callback: action => {
                      that.showList()
                    }
                });
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {that.loading =false;})
        }else{
            removeRoleAssign(params).then(res => {
              that.loading = false;
            if(res.code == 200){
                  this.$alert(`授权成功`, '提示', {
                        confirmButtonText: '确定',
                        showClose:false,
                        closeOnClickModal:false,
                        closeOnPressEscape:false,
                        closeOnHashChange:false,
                        callback: action => {
                          that.showList()
                        }
                    });
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {that.loading =false;})
        }
        
    },

    handleClick(row,type){
        this.roleType(type,[row.proid])
    },

    sq(type){
        if(this.multipleSelection.length==0){
            this.$message.error(`请选择要${type?'授权':'销权'}项目`);
            return
        }
        this.roleType(type,this.multipleSelection)
    },

    handleSelectionChange(val) {
        let that = this;
        let array = [];
        val.forEach(function(item,index,arr){
            array.push(item.proid)
        })
        this.multipleSelection = array;
    }
  },
  mounted(){
    this.showList()
  }
}
