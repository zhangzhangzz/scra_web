
<!--
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-10 21:39:37
 * @LastEditTime: 2021-06-04 15:47:17
-->

<template>
    <div class="projectSpeed">
        <el-row>
            <el-col :span="24" class="formWapper row">
                <el-col :span="3" :class="active==0?'actived mr':'default mr'" style="margin-right:auto">
                    考勤机设备
                </el-col>
                <span style="line-height:36px;color:#666">项目名称：</span>
                <el-col :span="3" >
                    <el-select v-model="value1" placeholder="请选择">
                        <el-option label="项目状态" value="项目状态"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="3" style="margin:0 10px">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option label="项目状态" value="项目状态"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-input
                        placeholder="输入项目名称"
                        suffix-icon="el-icon-search"
                        v-model="input">
                    </el-input>
                </el-col>
                
                <el-button type="primary"  class="sureBtn" style="margin-left:10px" v-if="active==0" @click="dialogVisible=true">添加设备</el-button>
                <el-button  plain="true" style="margin-left:10px" v-if="active==1">导出数据</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                    prop="index"
                    align="center"
                    width="80"
                    label="序号">
                    </el-table-column>
                    <el-table-column
                    prop="xmmc"
                    align="center"
                    label="项目名称">
                    </el-table-column>
                    <el-table-column
                    prop="sbmc"
                    align="center"
                    label="设备名称">
                    </el-table-column>
                    <el-table-column
                    prop="sblx"
                    align="center"
                    label="设备类型">
                    </el-table-column>
                    <el-table-column
                    prop="sbbh"
                    align="center"
                    label="设备编号">
                    </el-table-column>
                    <el-table-column label="操作" width="250" align="center" fixed="right">
                        <template slot-scope="scope">
                            <span @click="handleOut(0)" class="btn1">对接</span>
                            <span  class=" btn1" style="color:red;border-left:1px solid #ccc;margin-left:10px;padding-left:10px">删除</span>
                        </template>
                    </el-table-column>
                </el-table>

                
                
            </el-col>
        </el-row>
        <el-dialog
            class="groupEdit"
            title=""
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            <div>
                <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2248325921,918510252&fm=26&gp=0.jpg" style="width:100%;height:auto">
            </div>
        </el-dialog>
        
        <el-dialog
            title="同步考勤机详情"
            class="kqWapper"
            :visible.sync="dialogVisible1"
            width="40%">
            <div class="columns" style="padding:10px">
                <div class="row">
                    <div class="columns tbState ">
                        <span class="success">8</span>
                        <span>同步成功</span>
                    </div>
                    <div class="columns tbState ">
                        <span class="fail">2</span>
                        <span>同步失败</span>
                    </div>
                </div>
                <span class="bz">注：仅支持自动同步WZY考勤机、YF考勤机</span>
                <span class="t_title">同步失败列表</span>
                <div>
                    <el-table
                        :data="tableData1"
                        style="width: 100%"
                        :header-cell-style="{background:'#FAFAFA'}">
                        <el-table-column
                            prop="name"
                            label="设备名称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="deviceID"
                            label="设备编号"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="reason"
                            label="同步失败原因">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">关闭</el-button>
                <el-button type="primary" @click="dialogVisible1 = false" class="sureBtn">下载</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            const item = {
                index:1,
                xmmc:'为中云实名制',
                sbmc: '电箱监测点#1',
                sblx:'WYZ考勤机',
                sbbh:'GGDFHGGFYUJHU45',   
                bbh:'2.2.3',
                kqState:[8,2],
                jcfx:'进入',
                sbzt:'在线',
                azwz:'施工区',
                tjsj:'2022-05-10 09:32:02',
                sbzhzxsj:'2022-05-10 09:32:02',
            };
            return {
                tableData: Array(5).fill(item),
                tableData1:[{
                    name:'施工门口考勤机#1',
                    deviceID:'ONSDNKSDNKJQD43SD4',
                    reason:'人脸图像像素大小超出1920*1080px限制'
                },{
                    name:'施工门口考勤机#2',
                    deviceID:'ONSDNKSDNKJQD43SD4',
                    reason:'人脸图像过于模糊'
                }],
                active:0,
                input:'',
                value:'设备状态',
                value1:'深圳的范德萨发',
                dialogVisible:false,
                dialogVisible1:false,
                ruleForm: {
                    sbmc:'',
                    sbbh:'',
                    azwz:''
                },
                rules: {
                    sbmc: [
                        { required: true, message: '请输入授权账号', trigger: 'blur' }
                    ],
                    sbbh: [
                        { required: true, message: '请输入授权密钥', trigger: 'blur' }
                    ],
                    azwz: [
                        { required: true, message: '请输入授权密钥', trigger: 'blur' }
                    ]
                } 
            }
        },
        methods: {
            handleClose(){
                this.dialogVisible = false;
            },

            handleClose1(){
                this.dialogVisible1 = false;
            },

            handleCommand(command) {
                if(command!=6){
                    this.handleOut(command);
                }else{
                    this.dialogVisible = true;
                }
                
            },

            handleOut(tag){
                let text='';
                let title='';
                if(tag == 0){
                    text = '升级';
                    title='设备升级';
                }else if(tag == 5){
                    text = '删除';
                    title='人员删除';
                }else if(tag == 1){
                    text = '重置';
                    title='设备重置';
                }else if(tag == 2){
                    text = '清空';
                    title='清空人脸';
                }else if(tag == 3){
                    text = '下发';
                    title='重新下发';
                }else if(tag == 4){
                    text = '开门';
                    title='远程开门';
                }
                this.$confirm('确定将该设备'+text+'吗?', title, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: text+'成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'+text
                    });          
                });
            },
        }
    }

</script>
<style lang="scss">
    .projectSpeed{
        padding: 15px;
        background-color: #f5f6f7;

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
            border-left:1px solid #ccc;
            }

        .kqWapper{
            .el-dialog__header{
                text-align: center;
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
                text-align: center;
                padding: 20px 20px 0;
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

    }
</style>