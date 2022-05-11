<!--
 * @Description:
 * @Author: zhangjing
 * @Date: 2021-05-10 21:39:37
 * @LastEditTime: 2021-10-30 12:14:08
-->

<template>
    <div class=" overOldRecord">
        <el-container style="height: auto; border: 1px solid #eee">
            <!-- <el-aside  style="background-color: #fff;border-right: 2px solid #eee;" v-clickoutside="close" class="asideWapper columns" v-loading="loading1">
                <div style="height:calc(100% - 54px);overflow-y: auto;width:100%">
                    <el-col v-for="(t,index) in tabList" :key="index" :span="24" :class="index==t_actived?'active groupList':'groupList'" @click.native="hick_group(index,t.teamName)">
                        <el-col :span="20">
                            {{ t.teamName }}
                            <span style="color:#ccc;">{{ '('+t.teamPerNum+')' }}</span>
                        </el-col>
                        <el-col :span="4" @click.stop.native="editGroup(index)" >
                            <i class="el-icon-more" />
                        </el-col>
                        <div v-if="editDialog_index === index" class="columns editDialog">
                            <span class="edit_tag==1?'e_active ':''" @click.stop="editTag(1,t)">编辑班组</span>
                            <span class="edit_tag==0?'e_active ':''" @click.stop="editTag(0,t)">删除班组</span>
                            <span class="edit_tag==0?'e_active ':''" @click.stop="editTag(2,t)">设置班组长</span>
                        </div>
                    </el-col>
                </div>
                
                <div>
                    <el-pagination 
                        class="pageLine"
                        small
                        layout="total, prev, pager, next, jumper"
                        @current-change="handleCurrentChange1"
                        :page-size="pageSize1"
                        :pager-count='5'
                        @size-change="handleSizeChange1"
                        :total="total1">
                    </el-pagination>
                </div>
                

            </el-aside> -->

            <el-container class="mainWapper">
                <div style="height:100%;overflow-y: auto;width:100%">
                    <div class="all" style="min-height:calc(100% - 47px)">
                        <ul class="sys_top">
                        <globalProject  @queryProId="queryProId" v-if="user.userType!=1"/>
                        <li class="sys_top_1 row">
                            <span class="spanM" style="line-height:36px">姓名</span>
                            <div style="width:199px"><el-input v-model="attendName" placeholder="请输入姓名"></el-input></div>
                            
                        </li>

                        <li class="sys_top_1 row">
                            <span class="spanM" style="line-height:36px">考勤状态</span>
                            <div style="width:199px">
                                <el-select v-model="attendStatus" clearable placeholder="请选择" style="width:100%!important">
                                    <el-option label="在线" :value=0></el-option>
                                    <el-option label="离线" :value=1></el-option>
                                </el-select>
                            </div>
                        </li>

                        <li class="sys_top_1 row">
                            <span class="spanM" style="line-height:36px">考勤时间</span>
                            <div style="width:3.2rem;" class="date">
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
                        </li>
                        
                        <div class="thirdBtn" @click="query" style="margin-left:auto">查询</div>
                        <div class="thirdBtn" @click="exportData(1)" style="margin-left:10px">导出当前</div>
            <div class="thirdBtn" @click="exportData(0)" style="margin-left:10px;">导出所有</div>
                        </ul>
                        <div class="sys_bottom">
                        <template>
                            <el-table
                            :data="tableData"
                            lazy
                            v-loading="loading"
                            border max-height="calc(100% - 110px)"
                            class="customer-no-border-table"
                            :header-cell-style="{background:'#4B5365',color:'#fff'}"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                            >
                            <el-table-column
                            align="center"
                                    type="selection"
                                    width="55"
                                />
                            <el-table-column
                                align="center"
                                type="index"
                                label="序号"
                                :index="makeIndex"
                                width="60"
                            />
                            <el-table-column
                                align="center"
                                prop="projectName"
                                label="项目名称"
                                min-width="180"
                            />
                            <el-table-column
                                align="center"
                                prop="attendName"
                                label="姓名"
                                min-width="100"
                            />
                            <el-table-column
                                align="center"
                                prop="showIdno"
                                label="身份证号"
                                min-width="170"
                            />
                            <el-table-column
                                align="center"
                                prop="age"
                                label="年龄"
                                min-width="60"
                            />
                            <el-table-column
                                align="center"
                                prop="team"
                                label="班组"
                                min-width="100"
                            />
                            <el-table-column
                                align="center"
                                prop="attendWork"
                                label="工种"
                                min-width="100"
                            />
                            <el-table-column
                                align="center"
                                prop="inOut"
                                label="进出门"
                                min-width="80"
                            >
                                <template slot-scope="scope">
                                    <span :style="{color:scope.row.inOut?'rgb(128,204,93)':'rgb(252,103,71)'}">{{scope.row.inOut==1?'进门':'出门'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="deviceName"
                                label="打卡设备"
                                min-width="250"
                            />
                            <el-table-column
                                align="center"
                                prop="animalHeat"
                                label="当前体温"
                                min-width="80"
                            >
                                <template slot-scope="scope">
                                {{scope.row.animalHeat}}°C
                                </template>
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="attendStatus"
                                label="考勤状态"
                                min-width="160"
                            >
                                <template slot-scope="scope">
                                    <p v-html="queryStatus(scope.row.proAttendStatusList)"></p>
                                </template>
                            
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="attendTime"
                                label="打卡时间"
                                min-width="160"
                            />
                            <el-table-column
                                align="center"
                                label="操作"
                                width="80"
                            >
                                <template slot-scope="scope">
                                <el-button @click="$router.push({path: 'dailyRecord',query: {id:scope.row.persId}})"  type="text" size="small">详情</el-button>
                                </template>
                            </el-table-column>
                            </el-table>
                        </template>
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

                </div>
            </el-container>
        </el-container>
        <el-dialog :visible.sync="dialogVisible4" title="编辑班组" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="columns">
                <el-form-item label="班组名称" prop="teamName">
                    <el-input v-model="ruleForm.teamName" class="inputWidth1" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" @click="editMonitor">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog :visible.sync="dialogVisible" title="设置班组长" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%" v-loading="loading2">
            <div class="columns">
                <el-input v-model="persName" placeholder="试试搜索：人名" @input="selectPerson"></el-input>
                <div class="columns personWapper">
                    <div  v-for="(g,index) in gropuList" :key="index" :class="index===perIndex?'active':''" @click="choosePerson(g.persId,index)">
                        {{g.name}}
                    </div>
                </div>
                <el-pagination 
                    class="pageLine"
                    small
                    layout="total, prev, pager, next, jumper"
                    @current-change="handleCurrentChange2"
                    :page-size="pageSize2"
                    :pager-count='5'
                    @size-change="handleSizeChange2"
                    :total="total2">
                </el-pagination>
                
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" @click="setMonitor">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script src="./overOldRecord.js"></script>
<style lang="scss" >
    @import "./overOldRecord.scss"
</style>
