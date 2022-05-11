<!--
 * @Description:
 * @Author: zhangjing
 * @Date: 2021-05-10 21:39:37
 * @LastEditTime: 2021-10-28 12:16:56
-->

<template>
    <div class="monthly" style="height: 100%; overflow-y: auto;">
        <div class="all" style="min-height:calc(100% - 47px)">
            <ul class="sys_top">
                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">姓名</span>
                    <div style="width:199px"><el-input v-model="attendName" placeholder="请输入姓名"></el-input></div>
                    
                </li>
                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">班组</span>
                    <div style="width:199px" >
                        <el-select v-model="team" clearable placeholder="请选择" style="width:100%!important">
                        <el-option :label="q" :value='q' v-for="q in queryData.teamQueryConditions" :key="q"></el-option>
                        </el-select>
                    </div>
                    
                </li>
                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">工种</span>
                    <div style="width:199px">
                        <el-select v-model="attendWork" clearable placeholder="请选择" style="width:100%!important">
                            <el-option :label="q" :value='q' v-for="q in queryData.attendWorkQueryConditions" :key="q"></el-option>
                        </el-select>
                    </div>
                </li>

                <li class="sys_top_1 row" v-if="user.userType!=1">
                    <span class="spanM" style="line-height:36px">所属项目</span>
                    <div style="width:199px">
                        <el-select v-model="projectId" clearable placeholder="请选择" style="width:100%!important">
                            <el-option :label="q.projectName" :value='q.projectId' v-for="q in queryData.projectQueryConditions" :key="q.projectId"></el-option>
                        </el-select>
                    </div>
                </li>

                <li class="sys_top_1 row">
                    <span class="spanM" style="line-height:36px">考勤时间</span>
                    <div style="width:3.2rem;" class="date">
                    <el-date-picker
                        style="width:100%"
                        v-model="date"
                        type="monthrange"
                        value-format="yyyy-MM"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>      
                    </div>
                </li>
                
                <div class="firBtn" @click="query" style="margin-left:auto;margin-right:0">查询</div>
                <div class="thirdBtn" @click="exportData(1)" style="margin-left:10px">导出当前</div>
                <div class="thirdBtn" @click="exportData(0)" style="margin-left:10px">导出所有</div>
                </ul>
                <div class="sys_bottom">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        v-loading="loading"
                        border max-height="calc(100% - 110px)"
                        class="customer-no-border-table"
                        :header-cell-style="{background:'#4B5365',color:'#fff'}"
                        style="width: 100%">
                        <el-table-column
                            type="index"
                            label="序号"
                            header-align="center"
                            align="center"
                            width="50">
                        </el-table-column>
                        <el-table-column
                        prop="attendName"
                        align="center"
                        label="姓名">
                        </el-table-column>
                        <el-table-column
                        prop="showIdno"
                        align="center"
                        label="身份证"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="team"
                        align="center"
                        width="100"
                        label="班组">
                        </el-table-column>
                        <el-table-column
                        prop="projectName"
                        align="center"
                        label="所属项目"
                        min-width="120">
                        </el-table-column>
                        <el-table-column
                        prop="yearMonth"
                        align="center"
                        label="月份">
                        </el-table-column>
                        <el-table-column
                        align="center"
                        label="月固定天数">
                            <el-table-column
                            align="center"
                            v-for="index of month"
                            width="40"
                            :key="index"
                            :label="index+''">
                                <template slot-scope="scope">
                                    {{querySign(scope.row.checkInDayList,index)}}
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                        align="center"
                        fixed="right"
                        width="160"
                        label="操作">
                            <el-table-column
                            prop="workingHours"
                            align="center"
                            fixed
                            label="工时">
                            </el-table-column>
                            <el-table-column
                            prop="checkInDays"
                            fixed
                            align="center"
                            label="天数">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
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
</template>
<script src="./monthlyRecord.js"></script>
<style lang="scss" scoped>
  @import "./monthlyRecord.scss"
</style>
