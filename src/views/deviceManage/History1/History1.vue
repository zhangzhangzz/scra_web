<!--
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-19 16:25:24
 * @LastEditTime: 2021-09-09 16:03:57
-->
<template>
    <div style="height:100%;overflow-y: auto;">
        <div class="all" style="min-height:calc(100% - 47px)">
            <div class="row sys_top">
                <div class="btnBox">
                    <div :class="actived==index?'active btnWapper':'btnWapper'" @click="hick(index,t)" v-for="(t,index) in typeList" :key="index">{{t.dicValue}}</div>
                </div>

                <div style="width:3.2rem;margin:0 20px" class="date">
                    <el-date-picker
                        style="width:100%"
                        v-model="date"
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>      
                </div>
                              

                <div class="row searchWapperScra" v-if="user.userType!=1">
                    <el-select v-model="value" placeholder="请选择" class="selectWapper">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <el-autocomplete
                        class="inline-input"
                        v-model="projectName"
                        placeholder="请输入关键字"
                        :trigger-on-focus="false"
                    ></el-autocomplete>
                </div>
                <div class="thirdBtn" @click="showList" style="margin-left:auto">查询</div>
                <div class="thirdBtn" @click="exportData(1)" style="margin-left:10px;margin-right:0">导出当前页</div>
                <div class="thirdBtn" @click="exportData(0)" style="margin-left:10px;margin-right:0;padding:0 3px">导出查询结果</div>
            </div>
                
            <div class="sys_bottom" >
                <el-table
                    v-loading="loading"
                    :data="tableData"
                    border max-height="calc(100% - 110px)"
                    class="customer-no-border-table"
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
            
            
            <!-- <el-dialog title="扬尘历史数据" :visible.sync="dialogTableVisible" width="90%" class="dw">
                <el-row>
                    <el-col :span="24" class="top_wapper">
                        <el-date-picker
                            v-model="date"
                            prefix-icon="el-icon-timer"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                        <el-select v-model="value" placeholder="实时值">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
                        <el-button type="warning" icon="el-icon-upload" size="small">导出</el-button>
                    </el-col>
                </el-row>	
                <div class="dialogTable">
                    <el-table
                        stripe border :header-cell-style="{background:'#e9eef4'}"
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            type="index"
                            label="序号"
                            header-align="center"
                            align="center"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            prop="sn"
                            header-align="center"
                            align="center"
                            width="150"
                            label="设备编号">
                        </el-table-column>
                        <el-table-column
                            prop="proname"
                            header-align="center"
                            align="center"
                            label="项目名称">
                        </el-table-column>
                        <el-table-column
                            prop="xmlx"
                            header-align="center"
                            align="center"
                            label="项目类型">
                        </el-table-column>
                        <el-table-column
                            prop="pm10"
                            header-align="center"
                            align="center"
                            width="50"
                            label="pm10">
                            <template slot-scope="scope">
                                <div style="color:#5bbc2d">{{scope.row.pm10}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="gkpm10"
                            header-align="center"
                            align="center"
                            width="50"
                            label="国控值pm10值">
                            <template slot-scope="scope">
                                <div style="color:#5bbc2d">{{scope.row.gkpm10}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="pm25"
                            header-align="center"
                            align="center"
                            width="50"
                            label="pm2.5">
                            <template slot-scope="scope">
                                <div style="color:#5bbc2d">{{scope.row.pm25}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="tsp"
                            width="50"
                            header-align="center"
                            align="center"
                            label="TSP">
                            <template slot-scope="scope">
                                <div style="color:#5bbc2d">{{scope.row.tsp}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="zy"
                            header-align="center"
                            align="center"
                            width="50"
                            label="噪声值">
                            <template slot-scope="scope">
                                <div style="color:#5bbc2d">{{scope.row.zy}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="wd"
                            header-align="center"
                            align="center"
                            width="50"
                            label="温度">
                            <template slot-scope="scope">
                                <div style="color:#5bbc2d">{{scope.row.wd}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="sd"
                            header-align="center"
                            align="center"
                            width="50"
                            label="湿度">
                            <template slot-scope="scope">
                                <div style="color:#5bbc2d">{{scope.row.sd}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="fs"
                            header-align="center"
                            align="center"
                            width="50"
                            label="风速">
                            <template slot-scope="scope">
                                <div style="color:#5bbc2d">{{scope.row.fs}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="fx"
                            header-align="center"
                            align="center"
                            width="50"
                            label="风向">
                            <template slot-scope="scope">
                                <div style="color:#5bbc2d">{{scope.row.fx}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="cjsj"
                            header-align="center"
                            align="center"
                            label="采集时间">
                        </el-table-column>
                    </el-table>
                </div>
                
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </el-dialog> -->

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

<script src="./History1.js"></script>
<style src="./History1.css" scoped></style>