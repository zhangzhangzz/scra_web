<!--
 * @Author: your name
 * @Date: 2021-06-17 14:08:41
 * @LastEditTime: 2021-09-16 15:18:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\SystemAdmin\RoleAdmin\roleMenu\roleMenu.vue
-->
<template>
    <div class="roleMenu">
        <el-dialog
        class="roleMenu1"
            title="分配菜单"
            :visible.sync="dialogVisible"
            v-loading="loading"
            :before-close="setIndex"
            :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
            width="30%">
            <el-tree
                ref="tree"
                node-key="menuId"
                :data="data" :props="defaultProps"
                show-checkbox
                :default-checked-keys="checkList"
                :default-expanded-keys="checkList"
                @check-change="handleCheckChange">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setIndex(0)">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {menuRoleList,addMenuRole} from '@/api/api.js'
    export default {
    data() {
        return {
            data: [],
            checkList:[],
            checkList1:[],
            defaultProps: {
                children: 'children',
                label: 'menuName'
            },
            count: 1,
            dialogVisible:true,
            loading:true
        }
    },
    props:["id","name"],
    methods: {
        handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
            
            // this.checkList1.push()
        },
        
        setIndex(index) {
            this.$emit('getIndex', index)
        },

        sure(){
            let that = this;
            let arr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
            this.$confirm(`确认分配所选菜单给"${that.name}"?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.fpRole(arr);
            }).catch(() => {
                return        
            });
        },

        fpRole(arr){
            let that = this;
            that.loading =true;
            let params = {
                roleId:that.id,
                menuIds:arr
            };
            addMenuRole(params).then(res => {
                that.loading = false;
                if(res.code == 200){
                    this.$alert('分配成功', '提示', {
                        confirmButtonText: '确定',
                        showClose:false,
                        closeOnClickModal:false,
                        closeOnPressEscape:false,
                        closeOnHashChange:false,
                        callback: action => {
                            that.setIndex(0);
                        }
                    });
                  
                }else{
                  this.$message.error(res.message);
                    that.loading = false;
                }
              })
          .catch(() => {that.loading = false;})
        },

        //展示角色
        showList(){
          let that = this;
          let params = {
                roleId:this.id
            };
            menuRoleList(params).then(res => {
                that.loading = false;
                if(res.code == 200){
                    let array = [];
                    that.data= res.data;
                    res.data.forEach(function(item,index,arr){
                        if(item.own == 1 && item.children.length==0){
                            array.push(item.menuId)
                        }
                        if(item.children!=null){
                            item.children.forEach(function(item1,index1,arr1){
                                if(item1.own == 1 && item1.children.length==0){
                                    array.push(item1.menuId)
                                }
                                if(item1.children!=null){
                                    item1.children.forEach(function(item2,index2,arr2){
                                        if(item2.own == 1 && item2.children.length==0){
                                            array.push(item2.menuId)
                                        }
                                        console.log(item2.name)
                                        if(item2.children!=null){
                                            item2.children.forEach(function(item3,index3,arr3){
                                                if(item3.own == 1){
                                                    array.push(item3.menuId)
                                                }
                                            })
                                        }
                                        
                                    })
                                }
                            })
                        }
                        
                    })
                    console.log(array)
                    that.checkList = array;
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {that.loading = false;})
            },
        },
        mounted(){
            this.showList();
        }
    }

</script>


<style lang="scss" scoped>
//   @import "./MenuAdmin.scss"
    .roleMenu{
        .el-tree{
            width: 100%;
        }

        
    }

    .roleMenu1 ::v-deep .el-dialog{
        height: 70vh!important;
        overflow-y: hidden;
    }

    .roleMenu1 ::v-deep .el-dialog__body{
        height: calc(100% - 111px);
        overflow-y: auto;
    }


    .roleMenu1 ::v-deep .el-dialog__footer{
        background-color: #f5f6f7;
        padding-top: 15px;
    }

    
</style>