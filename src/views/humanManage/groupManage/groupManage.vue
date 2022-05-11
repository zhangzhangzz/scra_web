<!--
 * @Author: your name
 * @Date: 2021-08-10 13:17:10
 * @LastEditTime: 2021-11-24 11:22:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\groupManage\groupManage.vue
-->
<template>
  <div class="groupManage" style="height:100%;overflow-y: auto;">    
      <!-- <globalProject />   -->
    <div class="all" style="height:100%;overflow-y: auto;" ref="bigBox">
        <div class="row sys_top">
            <div class="thirdBtn" style="margin-left:auto" @click="editTag(2)">新增班组</div>
            <div class="thirdBtn" @click="exportData(1)">导出当前</div>
            <div class="thirdBtn" @click="exportData(0)">导出全部</div>
        </div>
        <div class="row" style="min-height:calc(100% - 54px)" >
            <el-aside  :style="{height:asideHeight}" v-clickoutside="close" class="asideWapper columns" v-loading="loading1" >
                <div style="overflow: auto;width:100%;height:calc(100% - 30px)" ref="aside1">
                    <el-col v-for="(t,index) in tabList" :key="index" :span="24" :class="index==t_actived?'active groupList':'groupList'" @click.native="hick_group(index,t)">
                        <el-col :span="20">
                            <span>
                                {{ t.teamName }}
                            </span>
                            
                        </el-col>
                        <el-col :span="4" @click.stop.native="editGroup(index)" >
                            <i class="el-icon-more" />
                        </el-col>
                        <div v-if="editDialog_index === index" class="columns editDialog">
                            <span class="edit_tag==1?'e_active ':''" @click.stop="editTag(1,t)">编辑班组</span>
                            <span class="edit_tag==0?'e_active ':''" @click.stop="editTag(0,t)">删除班组</span>
                        </div>
                        <el-col :span="24" style="font-size:14px;">
                            <div class="row">
                                <span> 班组长：{{t.teamLeaderName==''?'暂无':t.teamLeaderName}}</span>
                                <span style="margin-left:auto">班组人数：{{t.teamPerNum}}人</span>
                            </div>
                           
                        </el-col>
                    </el-col>
                    <div v-if="tabList.length==0" style="text-align:center;font-size:14px;color:#888">暂无数据</div>
                </div>
                
                <div style="width:100%;overflow-x:auto;overflow-y: hidden;">
                    <el-pagination 
                        v-if="paginationShow1"
                        class="pageLine"
                        small
                        layout="total, prev, pager, next, jumper"
                        @current-change="handleCurrentChange1"
                        :current-page.sync="page1"
                        :page-size="pageSize1"
                        :pager-count='5'
                        :total="total1">
                    </el-pagination>
                </div>
                

            </el-aside>
            <div class="columns" style="width: calc(100% - 300px);min-height:calc(100% - 54px)" >
                <div style="width:100%;height:100%" ref="secBox">
                    <div class="sys_bottom" style="height:100%" ref="bbbox">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            v-loading="loading"
                            border 
                            class="customer-no-border-table"
                            :header-cell-style="{background:'#4B5365',color:'#fff'}"
                            style="width: 100%"
                            >
                            <el-table-column
                                type="index"
                                label="序号"
                                :index="makeIndex"
                                align="center"
                                min-width="50"
                            />
                            <el-table-column
                                prop="persName"
                                label="姓名"
                                align="center"
                                min-width="80"
                            />
                            <el-table-column
                                prop="portrait"
                                label="人员头像"
                                align="center"
                                min-width="80"
                            >
                                <template slot-scope="scope">
                                    <img :src="scope.row.portrait" alt="" style="width: 40px;height: 40px;">
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="persType"
                                label="人员类型"
                                align="center"
                                min-width="80"
                            />
                            <el-table-column
                                prop="showIdno"
                                label="身份证号"
                                align="center"
                                min-width="120"
                            />
                            <el-table-column
                                prop="projectName"
                                label="项目名称"
                                align="center"
                                min-width="120"
                            />
                            <el-table-column
                                prop="teamName"
                                label="班组"
                                align="center"
                                min-width="120"
                            />
                            <el-table-column
                                label="工种"
                                prop="workName"
                                align="center"
                                min-width="120"
                            />
                            <el-table-column
                                prop="d10"
                                label="操作"
                                align="center"
                                min-width="200"
                            >
                                <template slot-scope="scope">
                                <el-button  type="text" size="small" @click="lookDetail(scope.row)" >详情</el-button>
                                <el-button v-if="leader!==scope.row.persId" type="text" size="small" @click="setMonitor(scope.row)">设置班组长</el-button>
                                <el-button v-if="leader===scope.row.persId" type="text" size="small" @click="cancleLeader1(scope.row)">取消班组长</el-button>
                                <!-- <el-button  type="text" size="small" @click="transferGroup0(scope.row)" v-if="user.userType!==1">转移班组</el-button> -->
                                <el-button  type="text" size="small" @click="transferGroup0(scope.row)" >转移班组</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                
                <el-pagination 
                    v-if="paginationShow2"
                    class="pageLine"
                    ref="pageLine1"
                    layout="total, sizes, prev, pager, next, jumper"
                    @current-change="handleCurrentChange2"
                    :current-page.sync="page2"
                    :page-size="pageSize2"
                    @size-change="handleSizeChange2"
                    :total="total2">
                </el-pagination>
            </div>
            
        </div>
    </div>  

    <el-dialog :visible.sync="dialogVisible1" :title="type?'编辑班组':'添加班组'" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="columns">
            <el-form-item label="项目" prop="projectId" v-if="type==0">
                <div style="width:199px">
                    <el-select v-model="ruleForm.projectId" placeholder="请选择">
                        <el-option
                        v-for="item in deviceData"
                        :key="item.projectId"
                        :label="item.projectName"
                        :value="item.projectId">
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="班组名称" prop="teamName">
                <div style="width:199px">
                <el-input v-model="ruleForm.teamName" class="inputWidth1" />
                </div>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancle">取 消</el-button>
            <el-button type="primary" @click="editMonitor">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible2" title="转移班组" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%">
        <el-form ref="ruleForm1" :model="ruleForm1" :rules="rules1" label-width="100px" class="columns">
            <el-form-item label="原班组" prop="teamName">
                <el-input v-model="ruleForm1.teamName" disabled class="inputWidth1" />
            </el-form-item>
            <el-form-item label="转移班组" prop="teamId">
                <el-select v-model="ruleForm1.teamId" placeholder="请选择">
                <el-option
                    v-for="item in deviceData1"
                    :key="item.teamId"
                    :label="item.teamName"
                    :value="item.teamId">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancle">取 消</el-button>
            <el-button type="primary" @click="transferGroup" v-loading="loading2">确 定</el-button>
        </span>
    </el-dialog>

    <!-- <el-dialog :visible.sync="dialogVisible" title="设置班组长" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%" v-loading="loading2">
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
    </el-dialog> -->
    
</div>
</template>

<script src="./groupManage.js"></script>

<style lang="scss" scoped>
  @import "./groupManage.scss"
</style>
