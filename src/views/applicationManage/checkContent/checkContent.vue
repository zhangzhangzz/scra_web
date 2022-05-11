<!--
 * @Author: your name
 * @Date: 2021-11-29 15:04:34
 * @LastEditTime: 2021-11-30 12:52:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \scra_web1 - 副本\src\views\applicationManage\checkContent\checkContent.vue
-->

<template>
    <div class="checkContent" style="height:100%;overflow-y: auto;">
        <div class="all" style="min-height:calc(100% - 47px);">
            <ul class="sys_top" v-if="user.userType!==1" >
                <div class="firBtn" style="margin: 0 0 0 auto " @click="addDevice" >添加公告</div>
            </ul>    
            <div class="sys_bottom" >
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    border max-height="calc(100% - 110px)"
                    class="customer-no-border-table"
                    :header-cell-style="{background:'#4B5365',color:'#fff'}"
                    style="width: 100%"
                    >
                    <el-table-column
                        align="center"
                        type="index"
                        label="序号"
                        :index="makeIndex"
                        width="50"
                    />
                    <el-table-column
                        align="center"
                        prop="projectName"
                        label="所属项目"
                        
                    />
                    <el-table-column
                        align="center"
                        prop="consOrg"
                        label="内容分类"
                    >
                        <template slot-scope="scope">
                            {{queryItemType(scope.row.type)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="customerName"
                        label="详情"
                        width="320"
                    >
                        <template slot-scope="scope">
                            <div class="columns" style="width:150px;height:100px;cursor: pointer;margin: auto;" @click="reviewPic(scope.row.photoPath)">
                                <img :src="'http://yun.cdscra.com'+scope.row.photoPath" style="width:100%;height:auto;margin:auto;">
                            </div>  
                        </template>
                    </el-table-column>
                   
                    <el-table-column
                        align="center"
                        label="操作"
                        width="180"
                        >
                        <template slot-scope="scope">
                            <el-button  type="text" size="small" @click="allow(scope.row)">通过</el-button>
                            <el-button  type="text" size="small" @click="abandon(scope.row)">驳回</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
               
            </div>
        </div>
        
        
         <el-pagination 
            class="pageLine"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-size="pageSize"
            :total="total">
        </el-pagination>

        <el-dialog title="添加公告" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%" >
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="公告内容" prop="content" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                autosize
                maxlength="100"
                placeholder="请输入内容"
                v-model="form.content">
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancle">取 消</el-button>
            <el-button type="primary" @click="addDeviceSure" v-loading="loading">确 定</el-button>
        </div>
        </el-dialog>

    <el-dialog :visible.sync="dialogVisible2" width="700px" class="imgDialog">
        <div class="row">
            <img style="width:auto;height:400px;margin:auto" :src="dialogImageUrl" alt="">
        </div>
    </el-dialog>

       
        
    </div>
</template>
<script>
import {checkList,checkResultSubmit,getDictionaries } from '@/api/api.js'
export default {
    data() {
        return {
            loading:false,
            dialogVisible:false,
            dialogVisible2:false,
            formLabelWidth:'80px',
            dialogImageUrl:'',
            activeNames: [],
            tableData:[],
            user:JSON.parse(localStorage.getItem('user')),
            form:{
                title:'',
                content:''
            },
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ]
            } ,
            page:1,
            total:0,
            pageSize:10,
            contentType:[],
            statusType:[]
        }
    },
     mounted() {
        this.queryPanelType();
        this.showList();
    },
    methods: {
        makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},
        
        hick(index){
            let that = this;
            if(that.letterData[index].status===0){
                let index = that.letterData[index].messageId;
                let params = {
                    messageId : index
                };
                that.loading = true;
                readMessage(params).then(res => {
                    that.loading = false;
                    if(res.code == 200){
                        that.showList();
                    }else{
                      this.$message.error(res.message);
                    }
                  })
                  .catch(() => {})
            }
        },
        
        handleSizeChange(val) {
			this.pageSize = val;
			this.showList(this.type);
		},

        //图片预览
        reviewPic(pic){
            this.dialogImageUrl = 'http://yun.cdscra.com'+pic;
            this.dialogVisible2 = true;
        },

        handleCurrentChange(val) {
            this.page = val;
            this.showList()
        },

        handleChange(val) {
            console.log(val)
        },

        //取消添加
        cancle(){
            this.$refs.form.resetFields();
            this.dialogVisible = false
            this.loading = false;
        },

        cancle1(){
            this.dialogVisible1 = false
            this.loading = false;
            this.$refs.ruleForm.resetFields();
        },

        queryItemType(value){
            let type = '';
            this.contentType.forEach(function(item,index,arr){
                if(value == item.dicKey){
                type = item.dicValue
                return
                }
            })
            return type
        },


        addDeviceSure(){
            let that = this;
            this.$refs.form.validate((valid) => {
            if (valid) {
                let params = that.form;
                that.loading = true;
                sendAnnouncement(params).then(res => {
                    that.loading = false;
                    if(res.code == 200){
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            showClose:false,
                            closeOnClickModal:false,
                            closeOnPressEscape:false,
                            closeOnHashChange:false,
                            callback: action => {
                                that.showList();
                                that.cancle();
                            }
                        });
                    }else{
                      this.$message.error(res.message);
                        that.cancle();
                    }
                  })
                  .catch(() => {})
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },

        //添加设备弹出框
        addDevice(){
            this.dialogVisible = true;

        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        setDevice(row){
            console.log(row)
            this.setDeviceData = row;
            this.ruleForm = row;
            this.dialogVisible1 = true
        },

        handleOut(row){
            this.$confirm(`确定删除"${row.deviceName}"设备吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteDevice({deviceId:row.deviceId}).then(res => {
                    if(res.code == 200){
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.showList();
                            }
                        });
                    }else{
                      this.$message.error(res.message);
                    }
                  })
                  .catch(() => {})
                
            }).catch(() => {     
            });
        },

        //展示角色
        showList(){
          let that = this;
            that.loading = true;
          let params = {
                pageNumber:that.page,
                limit:that.pageSize
            };
            checkList(params).then(res => {
                that.loading = false;
                if(res.code == 200){
                    that.tableData = res.data.items;
                    that.total = res.data.total;
                }else{
                  this.$message.error(res.message);
                    this.loading = false;
                }
              })
              .catch(() => {this.loading = false;})
        },

        queryPanelType(){
            getDictionaries({dicType:'sysProjectPhotoType'}).then(res => {
                if(res.code == 200){
                    this.contentType = res.data;
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {})

            getDictionaries({dicType:'televisionAuditStatus'}).then(res => {
                if(res.code == 200){
                    this.statusType = res.data;
                }else{
                  this.$message.error(res.message);
                }
              })
              .catch(() => {})

        
        },

        //配置
        addConfig(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                let that = this;
                that.ruleForm.comRecTimeWindow = parseFloat(that.ruleForm.comRecTimeWindow);
                that.ruleForm.faceScore = parseFloat(that.ruleForm.faceScore);
                that.ruleForm.idCardFaceScore = that.ruleForm.idCardFaceScore == ''?'':parseFloat(that.ruleForm.idCardFaceScore);
                that.loading = true;
                let params =that.ruleForm;
                setDevice(params).then(res => {
                    if(res.code == 200){
                    this.$alert(res.message, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        that.cancle();
                        that.showList();
                        }
                    });
                      
                    }else{
                      this.$message.error(res.message);
                        this.cancle();
                    }
                  })
                  .catch(() => {})
                } else {
                console.log('error submit!!');
                return false;
                }
            });
            // this.dialogVisible1 = false;
            
        },

        //通过
        allow(row){

        },

        //拒绝
        abandon(row){

        }


    }
}

</script>
<style lang="scss" scoped>
    .checkContent{
        background-color: #fff;
        .el-form-item{
            margin-bottom: 15px;
        }

        .circle{
            width: 10px;
            height: 10px;
            margin: auto 5px auto 10px;
            border-radius: 50%;
        }

        .hadRead{
            background-color: #80cc5d;
        }

        .noRead{
            background-color: #d5d5d5;
        }

        .demo-ruleForm{
            margin-top: 20px;
        }
        .formWapper{
            padding: 15px;
            background-color: #fff;
            margin-bottom: 15px;
            text-align: right;
            .actived{
                border-top: 1px solid #009688;
                color: #009688;
            }

            .default{
                border-top: 1px solid transparent;
                color: #333;
            }

            .mr{
                text-align: center;
                height: 36px;
                line-height: 36px;
                cursor: pointer;
            }

        }

        .listWapper{
            margin: 20px 0 30px 0;
            padding: 20px;
            background-color: #fff;
        }

        .sureBtn{
            background-color:#009688;
            border: 1px solid transparent;
            color: #fff;
        }

        .btn1{
            cursor: pointer;
            color:#108cff;
        }

        .btn2{
            color: #ff5722;
            cursor: pointer;
        }

        .czBtn{
            padding: 0 5px;
            margin:auto 5px;
            border-right:1px solid #ccc;
            border-left:1px solid #ccc;
            }

        .kqWapper{
            .el-dialog__header{
            }
            
            .el-dialog__body{
                padding: 10px;
            }

            .bz{
                font-size: 10px;
                color: #ccc;
            }

            .tbState:first-of-type{
                margin-right: 30px;
            }

            .t_title{
                color: #ff5722;
                margin: 10px 0;
            }

            .tbState{
                text-align: center;
                padding: 0 0 10px;

                span:first-of-type{
                    font-size: 20px;
                    margin-bottom: 5px;
                }

                .success{
                    color: #2dbd0e;
                }

                .fail{
                    color: #ff5722;
                }
                
            }

            .el-dialog__footer{
                text-align: center;
            }
        }
        

        .groupEdit{
            .el-dialog__header{
            }

            .el-dialog__body{
                padding:10px 20px 0;
            }

            .el-dialog__footer{
                text-align: center;
            }

            .el-select{
                width: 100%;
            }


            .inputWapper{
                border-top:1px solid #DCDFE6;
                border-bottom:1px solid #DCDFE6;
                color: #333;
                padding: 20px 0 0;

                
                .el-input__suffix,.el-input__suffix-inner{
                    height: 36px!important;
                    line-height: 36px!important;
                }

                .warn{
                    color: #ff3915;
                    font-size: 28px;
                    margin: auto 2px auto 0;
                    line-height: 65px;
                }

                .el-select{
                    margin: auto;
                }

                .el-form-item--medium .el-form-item__label{
                    width: auto!important;
                }

                .el-form-item--medium .el-form-item__content{
                    margin-left: 110px!important;
                }

                
                .el-input__inner{
                    color: #333;
                }
            }
            
        }

         .el-radio-group{
            width: 100%;
            padding-left: 20px;
            text-align: left;
        }

        ::v-deep .el-select{
            width: 100%;
        }

        ::v-deep .is-active{
            background-color: #f4f5f9!important;
        }

        ::v-deep .el-collapse-item__wrap{
            background-color: #f4f5f9!important;
            padding-left: 10px;
        }

        ::v-deep .el-collapse-item__content{
            padding-left: 15px;
        }

        ::v-deep .el-dialog__header{
            display: flex;
        }

        ::v-deep .el-dialog__headerbtn{
            position: inherit;
            margin-left: auto;
        }

    }
</style>