<!--
 * @Author: your name
 * @Date: 2021-07-26 12:04:12
 * @LastEditTime: 2021-09-09 14:09:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\deviceManage\realTime\realTime.vue
-->
<template>
    <div style="height:100%;overflow-y: auto;">
        <div class="all" style="min-height:calc(100% - 47px)">
            <el-row>
                <el-col :span="24" class="row sys_top">
                    <!-- <div class="row searchWapper" v-if="user.userType==1"> -->
                    <div class="row searchWapperReatime" >
                        <el-select v-model="value" placeholder="请选择" class="selectWapper" @change="selectChange">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-input class="inline-input" v-model="projectName" placeholder="请输入关键字" ></el-input>
                    </div>
                    <div class="thirdBtn" @click="showList" style="margin-left:auto">查询</div>
                </el-col>
            </el-row>	
                
            <div class="sys_bottom" >
                <el-table
                    v-loading="loading"
                    border max-height="calc(100% - 110px)"
                    class="customer-no-border-table"
                    :data="tableData"
                    :header-cell-style="{background:'#4B5365',color:'#fff'}"
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        header-align="center"
                        align="center"
                        :index="makeIndex"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="projectName"
                        header-align="center"
                        align="center"
                        min-width="150"
                        label="项目名称">
                    </el-table-column>
                    <el-table-column
                        prop="deviceId"
                        header-align="center"
                        align="center"
                        min-width="150"
                        label="设备编号">
                    </el-table-column>
                    <el-table-column
                        prop="regionName"
                        header-align="center"
                        align="center"
                        width="170"
                        label="设备区域">
                    </el-table-column>
                    <el-table-column
                        prop="pm10Value"
                        header-align="center"
                        align="center"
                        width="120"
                        label="pm10(μg/m³)">
                    </el-table-column>
                    <el-table-column
                        prop="pm25Value"
                        header-align="center"
                        align="center"
                        width="120"
                        label="pm2.5(μg/m³)">
                    </el-table-column>
                    
                    <el-table-column
                        prop="tsp"
                        header-align="center"
                        align="center"
                        width="100"
                        label="TSP(μg/m³)">
                        <!-- <template slot-scope="scope">
                            <div style="color:#5bbc2d">{{scope.row.tsp}}</div>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                        prop="windSpeed"
                        header-align="center"
                        align="center"
                        width="100"
                        label="风速(m/s)">
                        <!-- <template slot-scope="scope">
                            <div style="color:#5bbc2d">{{scope.row.windSpeed}}</div>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                        prop="windDirectionStr"
                        header-align="center"
                        align="center"
                        width="80"
                        label="风向">
                        <!-- <template slot-scope="scope">
                            <div style="color:#5bbc2d">{{scope.row.windDirection}}</div>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                        prop="voice"
                        header-align="center"
                        align="center"
                        width="80"
                        label="噪音(dB)">
                        <!-- <template slot-scope="scope">
                            <div style="color:#5bbc2d">{{scope.row.voice}}</div>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                        prop="temperature"
                        header-align="center"
                        align="center"
                        width="80"
                        label="温度(RH)">
                        <!-- <template slot-scope="scope">
                            <div style="color:#5bbc2d">{{scope.row.temperature}}</div>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                        prop="humidity"
                        header-align="center"
                        align="center"
                        width="80"
                        label="湿度(°C)">
                        <!-- <template slot-scope="scope">
                            <div style="color:#5bbc2d">{{scope.row.humidity}}</div>
                        </template> -->
                    </el-table-column>
                    
                    
                    <!-- <el-table-column
                        prop="online"
                        header-align="center"
                        align="center"
                        width="50"
                        label="在线状态">
                        <template slot-scope="scope">
                            <div :style="{color:scope.row.online==1?'#26bd9e':'#fe0606'}">{{scope.row.online==1?'在线':'离线'}}</div>
                            <div style="color:#26bd9e">在线</div>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        prop="monitoringTime"
                        header-align="center"
                        align="center"
                        width="170"
                        label="采集时间">
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
    </div>
</template>

<script src="./realTime.js"></script>
<style src="./realTime.css" scoped></style>