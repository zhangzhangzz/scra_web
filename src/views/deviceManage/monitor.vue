
<!--
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-10 21:39:37
 * @LastEditTime: 2021-05-11 10:26:31
-->

<template>
    <div class="projectSpeed">
        <el-row>
            <el-col :span="24" class="formWapper row">
                <el-col :span="3" :class="active==0?'actived mr':'default mr'" @click.native="active=0">
                    监控设备
                </el-col>
                <el-col :span="3" :class="active==1?'actived mr':'default mr'" @click.native="active=1" style="margin:0 auto 0 0">
                    监控视频
                </el-col>
                <span style="line-height:36px;color:#666">项目名称：</span>
                <el-col :span="3" >
                    <el-select v-model="value1" placeholder="请选择">
                        <el-option label="项目状态" value="项目状态"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="3" style="margin:0 10px" v-if="active==0">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option label="项目状态" value="项目状态"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" v-if="active==0">
                    <el-input
                        placeholder="输入项目名称"
                        suffix-icon="el-icon-search"
                        v-model="input">
                    </el-input>
                </el-col>
                
                <el-button type="primary"  class="sureBtn" style="margin-left:10px" v-if="active==0" @click="dialogVisible=true">添加设备</el-button>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="24" style="padding-left:10px;background:#fff">
                <el-table
                    v-if="active==0"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                    prop="index"
                    align="center"
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
                    prop="sbbh"
                    align="center"
                    label="设备编号">
                    </el-table-column>
                    <el-table-column
                    prop="azwz"
                    align="center"
                    label="安装位置">
                    </el-table-column>
                    <el-table-column
                    prop="tjsj"
                    align="center"
                    label="添加时间">
                    </el-table-column>
                    <el-table-column
                    prop="sbzhzxsj"
                    align="center"
                    label="设备最后在线时间">
                    </el-table-column>
                    <el-table-column
                    prop="sbzt"
                    align="center"
                    label="设备状态">
                    </el-table-column>
                    <el-table-column label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <span @click="dialogVisible=true" class=" czBtn btn1">编辑</span>
                            <span @click="handleOut(0)" class="btn2">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-collapse v-model="activeNames" @change="handleChange" v-if="active==1">
                    <el-collapse-item title="施工区" name="1">
                        <el-row>
                            <el-col :span="24" class="imgWapper">
                                <el-col >
                                    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnews.chinaxiaokang.com%2Fuploads%2Fimage%2F20180821%2F1534844516711032.png&refer=http%3A%2F%2Fnews.chinaxiaokang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623291038&t=3a9bd5c037c9d1b01e97af3a422acccb" alt="">
                                </el-col>
                                <el-col >
                                    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnews.chinaxiaokang.com%2Fuploads%2Fimage%2F20180821%2F1534844516711032.png&refer=http%3A%2F%2Fnews.chinaxiaokang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623291038&t=3a9bd5c037c9d1b01e97af3a422acccb" alt="">
                                </el-col>
                                <el-col >
                                    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnews.chinaxiaokang.com%2Fuploads%2Fimage%2F20180821%2F1534844516711032.png&refer=http%3A%2F%2Fnews.chinaxiaokang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623291038&t=3a9bd5c037c9d1b01e97af3a422acccb" alt="">
                                </el-col>
                                <el-col >
                                    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnews.chinaxiaokang.com%2Fuploads%2Fimage%2F20180821%2F1534844516711032.png&refer=http%3A%2F%2Fnews.chinaxiaokang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623291038&t=3a9bd5c037c9d1b01e97af3a422acccb" alt="">
                                </el-col>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="生活区" name="2">
                        <el-row>
                            <el-col :span="24" class="imgWapper">
                                <el-col style="margin-right:10px">
                                    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnews.chinaxiaokang.com%2Fuploads%2Fimage%2F20180821%2F1534844516711032.png&refer=http%3A%2F%2Fnews.chinaxiaokang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623291038&t=3a9bd5c037c9d1b01e97af3a422acccb" alt="">
                                </el-col>
                                <el-col>
                                    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnews.chinaxiaokang.com%2Fuploads%2Fimage%2F20180821%2F1534844516711032.png&refer=http%3A%2F%2Fnews.chinaxiaokang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623291038&t=3a9bd5c037c9d1b01e97af3a422acccb" alt="">
                                </el-col>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
                
            </el-col>
        </el-row>
        <el-dialog
            class="groupEdit"
            title="编辑设备"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row class="inputWapper inputWapper1">
                    <el-col :span="24" class="">
                        <div style="margin-bottom:10px">
                            项目名称：深圳当时的项目
                        </div>
                        <el-form-item label="设备名称" prop="sbmc">
                            <el-input v-model="ruleForm.tzmc"></el-input>
                        </el-form-item>
                        <el-form-item label="设备编号" prop="sbbh">
                            <el-input v-model="ruleForm.scrxm"></el-input>
                        </el-form-item>
                        <el-form-item label="设备安装位置" prop="azwz">
                            <el-select v-model="ruleForm.azwz">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    
                </el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" class="sureBtn">确 定</el-button>
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
                sbbh:'GGDFHGGFYUJHU45',   
                azwz:'施工区',
                tjsj:'2022-05-10 09:32:02',
                sbzhzxsj:'2022-05-10 09:32:02',
                sbzt:'在线',
            };
            return {
                tableData: Array(8).fill(item),
                activeNames: ['1','2'],
                active:0,
                input:'',
                value:'设备状态',
                value1:'深圳的范德萨发',
                dialogVisible:false,
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

            handleChange(val) {
                console.log(val);
            },

            handleOut(tag){
                this.$confirm('确定将该人员删除吗?', '删除人员', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
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
            margin-right: 10px;
        }

        .imgWapper{
            display: flex;
            flex-direction: row;
            img{
                width: 100%;
                height: auto;
            }

            .el-col{
                width: calc(25% - 10px);
                margin-right: auto
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