<template>
    <div class="outLineStatis" style="height:100%;overflow-y: auto;">
        <!-- <globalProject data="pageName" @showList="showList"/> -->
        <div class="all" style="min-height:calc(100% - 47px)">
            <ul class="sys_top" v-if="user.userType!==1">
                <globalProject  @queryProId="queryProId" v-if="user.userType!=1"/>
                 <div class="thirdBtn" @click="showList" style="margin-left:auto">查询</div>


            </ul>    
                
                      <div class="sys_bottom">
                <el-row>
                    <el-col :span="24" >
                        <el-table
                            ref="multipleTable"
                            v-loading="loading"
                            :data="tableData"
                            border
                            class="customer-no-border-table"
                            :header-cell-style="{background:'#4B5365',color:'#fff'}"
                            @selection-change="handleSelectionChange"
                            style="width: 100%">
                            <el-table-column
                            type="index"
                            width="50"
                            header-align="center"
                            align="center"
                            label="序号">
                            </el-table-column>
                            <el-table-column
                            prop="projectName"
                            align="center"
                            label="项目名称">
                            </el-table-column>
                            <el-table-column
                            prop="deviceCount"
                            align="center"
                            width="100"
                            label="设备总数">
                            </el-table-column>
                            <el-table-column
                            prop="offlineTimes"
                            align="center"
                            width="150"
                            label="设备总离线次数">
                            </el-table-column>
                            <el-table-column
                            prop="deviceOnlineCount"
                            align="center"
                            width="100"
                            label="在线数量">
                            </el-table-column>
                            <el-table-column label="操作" width="200" align="center">
                                <template slot-scope="scope">
                                    <span @click="queryDetail(scope.row.projectId)" class="btn1">详情</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    
                </el-row>
            </div>
        </div>
        <el-pagination 
            class="pageLine"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            :total="total">
        </el-pagination>
        
        <el-dialog title="设备详情" :visible.sync="dialogTableVisible"   style="text-align:center" :close-on-click-modal="false">
            <div class="tableWapper">
                <el-table :data="tableData1" class="customer-no-border-table" border :header-cell-style="{background:'#4B5365',color:'#fff'}">
                    <el-table-column
                        type="index"
                        width="50"
                        header-align="center"
                        align="center"
                        label="序号">
                    </el-table-column>
                    <el-table-column
                        prop="deviceName"
                        align="center"
                        label="设备名称">
                    </el-table-column>
                    <el-table-column
                        prop="deviceId"
                        align="center"
                        label="设备编号">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        align="center"
                        label="IP地址">
                    </el-table-column>
                    <el-table-column
                    prop="onlineStatus"
                    align="center"
                    width="80"
                    label="状态">
                        <template slot-scope="scope">
                            <span :style="{color:scope.row.onlineStatus?'rgb(252,103,71)':'rgb(128,204,93)'}">{{scope.row.onlineStatus?'离线':'在线'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="offlineTimes"
                        align="center"
                        width="80"
                        label="离线次数">
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        
    </div>
</template>
<script>
import globalProject from '../../components/custom/globalProject/globalProject.vue'
import {getDeviceNum,getDeviceOutNum} from '@/api/api.js'
export default {
    components:{
        globalProject
    },
    data() {
        return {
            loading:false,
            multipleSelection:[],
            tableData: [],
            tableData1: [],
            dialogTableVisible:false,
            page:1,
            total:0,
            pageSize:10,
            globalProjectId:'',
            user:JSON.parse(localStorage.getItem('user'))
        }
    },
     mounted() {
        this.showList();
    },
    methods: {
        queryProId(id){
            this.globalProjectId = id;
        },


        handleSizeChange(val) {
			this.pageSize = val;
			this.showList(this.type);
		},

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        handleCommand(command) {
            if(command!=6){
                // this.handleOut(command);
            }else{
                this.dialogVisible = true;
            }
            
        },

        //展示角色
        showList(){
          let that = this;
          let params = {
                pageNumber:that.page,
                limit:that.pageSize,
                projectName:that.globalProjectId.value
            };
            that.loading = true;
            getDeviceNum(params).then(res => {
                if(res.code == 200){
                    that.tableData = res.data.items;
                    that.loading = false;
                    that.total = res.data.total;
                }else{
                  this.$message.error(res.message);
                that.loading = false;
                }
              })
              .catch(() => {that.loading = false;})
        },

        queryDetail(id){
          let that = this;
          let params = {
                projectId:id
            };
            getDeviceOutNum(params).then(res => {
                if(res.code == 200){
                    that.tableData1 = res.data;
                    that.dialogTableVisible = true;
                }else{
                  this.$message.error(res.message);
                that.loading = false;
                }
              })
              .catch(() => {that.loading = false;})
        },

        handleCurrentChange(val) {
            this.page = val;
            this.showList()
        },


    }
}

</script>

<style lang="scss" scoped>
.outLineStatis{
    background-color: #fff;
    .el-form-item{
        margin-bottom: 15px;
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

    }
    

    .groupEdit{
        .el-dialog__header{
        }

        .el-dialog__body{
            padding:10px 20px 0;
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

    

    ::v-deep .el-dialog__header{
        text-align: left!important;
    }

}
::v-deep .el-select{
    width: 100%!important;
}

.tableWapper{
    max-height: 70vh;
    overflow-y: auto;
}
</style>
