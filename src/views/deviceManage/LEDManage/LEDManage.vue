<!--
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-10 21:39:37
 * @LastEditTime: 2021-09-13 16:17:20
-->

<template>
    <div class="LEDMange" style="height:100%;overflow-y: auto;">
        <!-- <globalProject data="pageName" @showList="showList"/> -->
        <div class="all" style="min-height:calc(100% - 47px)">
            <ul class="sys_top" v-if="user.userType!==1">
                <globalProject  @queryProId="queryProId" v-if="user.userType!=1"/>
                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">设备名称</span>
                    <div class="width:199px"><el-input v-model="deviceName" placeholder="请输入设备名称" suffix-icon="el-icon-search"></el-input></div>
                </li>
                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">设备编号</span>
                    <div class="width:199px"><el-input v-model="deviceId" placeholder="请输入设备名称" suffix-icon="el-icon-search"></el-input></div>
                </li>

                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">设备状态</span>
                    <div style="width:199px">
                        <el-select v-model="onlineStatus" placeholder="请选择" clearable >
                            <el-option label="在线" :value=0></el-option>
                            <el-option label="离线" :value=1></el-option>
                        </el-select>
                    </div>
                </li>
                <div class="firBtn" style="margin: 0 0 0 auto " @click="addDevice" >添加设备</div>
                <!-- <div class="thirdBtn"  @click="">批量删除</div> -->
            </ul>    
                <!-- <el-button type="primary"  class="sureBtn" style="margin-left:10px" v-if="active==0" @click="dialogVisible=true">添加设备</el-button>
                    <el-button  plain="true" style="margin-left:10px" v-if="active==1">导出数据</el-button> -->
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
                            label="项目名称">
                            </el-table-column>
                            <el-table-column
                            prop="deviceName"
                            align="center"
                            label="设备名称">
                            </el-table-column>
                            <el-table-column
                            prop="deviceId"
                            align="center"
                            width="200"
                            label="设备编号">
                            </el-table-column>
                            
                            <el-table-column
                            prop="weight"
                            align="center"
                            width="80"
                            label="屏幕宽度">
                            </el-table-column>
                            <el-table-column
                            prop="height"
                            align="center"
                            width="80"
                            label="屏幕高度">
                            </el-table-column>
                            <el-table-column
                            prop="onlineStatus"
                            align="center"
                            width="80"
                            label="设备状态">
                                <template slot-scope="scope">
                                    <span  :style="{color:scope.row.onlineStatus?'rgb(252,103,71)':'rgb(128,204,93)'}">{{scope.row.onlineStatus?'离线':'在线'}}</span> 
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="createTime"
                            align="center"
                            width="180"
                            label="添加时间" />
                            
                            <el-table-column label="操作" width="150" align="center" fixed="right">
                                <template slot-scope="scope" >
                                    <!-- $router.push({path: 'LEDView',query: {deviceId:scope.row.deviceId}}) -->
                                    <el-button @click="$router.push({path: 'LEDView',query: {id: scope.row.deviceId,time:JSON.stringify(appList)}})" type="text" size="small">显示设置</el-button>
                                    <el-button  type="text" size="small" @click="setDevice(scope.row)" v-if="scope.row.deviceType!=2">编辑</el-button>
                                    <el-button @click="handleOut(scope.row)" type="text" size="small"  style="color:red">删除</el-button>
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
        <el-dialog
            class="groupEdit"
            :title="setDeviceData==''?'添加设备':'修改设备'"
            style="text-align:center"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="25%"
            :show-close="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="项目名称" prop="projectId" v-if="setDeviceData==''"> 
                    <div class="fw">
                        <el-select v-model="ruleForm.projectId" :disabled="user.userType==1?true:false"  placeholder="请选择">
                            <el-option v-for="(item,i) of deviceData" :key="i" :label="item.projectName" :value="item.projectId" />
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="设备名称" prop="deviceName">
                    <div class="fw">
                    <el-input v-model="ruleForm.deviceName"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="设备编号" prop="deviceId">
                    <div class="fw">
                    <el-input v-model="ruleForm.deviceId"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="屏幕高度" prop="height">
                    <div class="fw">
                    <el-input v-model="ruleForm.height"  type="number"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="屏幕宽度" prop="weight">
                    <div class="fw">
                    <el-input v-model="ruleForm.weight" type="number"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="设备IP" prop="deviceIp">
                    <div class="fw">
                    <el-input v-model="ruleForm.deviceIp"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="设备端口" prop="devicePort">
                    <div class="fw">
                    <el-input v-model="ruleForm.devicePort"></el-input>
                    </div>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle" >取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" v-loading="loading1">确 定</el-button>
            </span>
        </el-dialog>

        
    </div>
</template>
<script src="./LEDManage.js"></script>

<style lang="scss" scoped>
  @import "./LEDManage.scss"
</style>
