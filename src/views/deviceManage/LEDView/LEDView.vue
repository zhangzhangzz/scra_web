<!--
 * @Author: your name
 * @Date: 2021-09-22 15:06:07
 * @LastEditTime: 2021-10-08 11:25:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\LEDView\LEDView.vue
-->

<template>
    <div class="projectSpeed" style="height:100%;overflow-y: auto;">
        <!-- <globalProject data="pageName" @showList="showList"/> -->
        <div class="all" style="min-height:calc(100% - 47px)">
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
                            prop="ledDeviceInfo.content"
                            align="center"
                            label="显示内容">
                            </el-table-column>
                            <el-table-column
                            prop="ledDeviceInfo.showTime"
                            align="center"
                            label="显示时间">
                            </el-table-column>
                            <el-table-column
                            prop="ledDeviceInfo.showSwitch"
                            align="center"
                            width="200"
                            label="固定显示">
                            </el-table-column>
                            <el-table-column
                            prop="updateTime"
                            align="center"
                            width="100"
                            label="修改时间">
                            </el-table-column>
                            <el-table-column label="操作" width="150" align="center" fixed="right">
                                <template slot-scope="scope" >
                                    <el-button  type="text" size="small" @click="setDevice(scope.row)" v-if="scope.row.deviceType!=2">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    
                </el-row>
            </div>
        </div>
        <el-dialog
            class="groupEdit"
            title="编辑"
            style="text-align:center"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="25%"
            :show-close="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="显示内容" prop="content">
                    <div class="fw">
                    <el-input v-model="ruleForm.content" type="textarea"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="默认显示时间" prop="showTime"> 
                    <div class="fw">
                        <el-select v-model="ruleForm.showTime" :disabled="user.userType==1?true:false"  placeholder="请选择">
                            <el-option v-for="(item,i) of time" :key="i" :label="item.dicValue" :value="item.dicKey" />
                        </el-select>
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
<script src="./LEDView.js"></script>

<style lang="scss" >
  @import "./LEDView.scss"
</style>
