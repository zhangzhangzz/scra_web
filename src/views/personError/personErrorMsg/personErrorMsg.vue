<!--
 * @Author: your name
 * @Date: 2021-07-16 14:48:02
 * @LastEditTime: 2021-08-26 21:13:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\personError\personErrorMsg\personErrorMsg.vue
-->
<template>
    <div class="projectSpeed">
        <ul class="sys_top">
            <li class="sys_top_1 row" v-if="user.userType!=1">
                <span class="spanM" style="line-height:36px">项目名称</span>
                <div class="width:199px"><el-input v-model="input" placeholder="请输入项目名称" suffix-icon="el-icon-search"></el-input></div>
                
            </li>
            <li class="sys_top_1 row">
                <span class="spanM" style="line-height:36px">姓名</span>
                <div class="width:199px"><el-input v-model="input" placeholder="请输入姓名" suffix-icon="el-icon-search"></el-input></div>
            </li>
            <div class="thirdBtn" @click="">批量上传</div>
        </ul>    
            <!-- <el-button type="primary"  class="sureBtn" style="margin-left:10px" v-if="active==0" @click="dialogVisible=true">添加设备</el-button>
                <el-button  plain="true" style="margin-left:10px" v-if="active==1">导出数据</el-button> -->
        <div class="sys_bottom">
        <el-row>
            <el-col :span="24">
                <el-table
                    ref="multipleTable"
                    v-loading="loading"
                    :data="tableData"
                    border max-height="calc(100% - 110px)"
                    class="customer-no-border-table"
                    :header-cell-style="{background:'#4B5365',color:'#fff'}"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        header-align="center"
                    align="center"
                        width="55">
                    </el-table-column>
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
                    label="姓名" />
                    <el-table-column
                    prop="projectName"
                    align="center"
                    label="图片" />
                    <el-table-column
                    prop="projectName"
                    align="center"
                    label="项目名称">
                    </el-table-column>
                    <el-table-column
                    prop="deviceId"
                    align="center"
                    width="200"
                    label="班组">
                    </el-table-column>
                    <el-table-column
                    prop="softwareVersion"
                    align="center"
                     width="100"
                    label="采集时间">
                    </el-table-column>
                    <el-table-column
                    prop="inOut"
                    align="center"
                     width="80"
                    label="异常时间">
                    </el-table-column>
                    <el-table-column label="操作" width="150" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button @click="$router.push('docking')" type="text" size="small">对接</el-button>
                            <el-button  type="text" size="small" @click="setDevice(scope.row)">配置</el-button>
                            <el-button @click="handleOut(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-pagination 
                class="pageLine"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handleCurrentChange"
                :page-size="10"
                
                :total="total">
            </el-pagination>
        </el-row>
        </div>
        
    </div>
</template>
<script>

import {smzDeviceList,addDevice,deleteDevice} from '@/api/api.js'
export default {
    data() {
        return {
            loading:false,
            multipleSelection:[],
            form:{
                name:'',
                device:'',
                status:''
            },
            tableData: [],
            input:'',
            value:'设备状态',
            value1:'深圳的范德萨发',
            
            setDeviceData:'',
            page:1,
            total:0,
            radio:'',
            deviceType:[],
            deviceData:'',
            user:JSON.parse(localStorage.getItem('user')),
        }
    },
     mounted() {
        this.showList();
    },
    methods: {
        

        //展示角色
        showList(){
          let that = this;
          let params = {
                page:that.page+'',
                num:10+'',
                allProjectId:localStorage.getItem('allProjectId')=='undefined'?'':JSON.parse(localStorage.getItem('allProjectId')).id
            };
            smzDeviceList(params).then(res => {
                if(res.code == 200){
                    that.tableData = res.data.deviceList;
                    that.deviceType = res.data.deviceTypeList;
                    that.deviceData = res.data;
                    that.loading = false;
                    that.total = res.data.total;
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