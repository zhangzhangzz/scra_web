<!--
 * @Author: your name
 * @Date: 2021-06-10 16:25:16
 * @LastEditTime: 2021-06-10 21:29:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\projectManage\partment\partment.vue
-->
<template>
    <div class="partment">
        <div class="row">
            <el-button  icon="el-icon-plus" size="small" @click="dialogFormVisible=true">新增</el-button>
            <el-button type="primary"  icon="el-icon-edit-outline" size="small">修改</el-button>
            <el-button type="success"  icon="el-icon-sort" size="small" @click="data[0].open=!data[0].open">展开/折叠</el-button>
        </div>
        <div class="columns table">
            <div class="row thead">
                <div class="first">部门名称</div>
                <div>排序</div>
                <div>状态</div>
                <div>创建时间</div>
                <div>操作</div>
            </div>
            <div class="columns tbody"  v-for="(d,index) in data" >
                <div class="row t-line" @click="closeFirst(index)" :style="{background:radio==d.label?'#f5f5f5':'#fff'}">
                    <div class="radioWapper">
                        <el-radio v-model="radio" :label="d.label"><span></span></el-radio>
                    </div>
                    <div class="row first">
                        <i class="el-icon-arrow-down"></i>{{d.label}}
                    </div>
                    <div>0</div>
                    <div>
                        <span>正常</span>
                    </div>
                    <div>
                        2020-03-03 19:55:20
                    </div>
                    <div class="row">
                        <el-button  icon="el-icon-plus" size="mini">新增</el-button>
                        <el-button type="primary"  icon="el-icon-edit-outline" size="mini">修改</el-button>
                        <el-button type="danger"  icon="el-icon-delete" size="mini">删除</el-button>
                    </div>
                </div>
                <div class="columns treeOpen" v-for="(dc1,index1) in d.children" :style="{maxHeight: d.open ? (dc1.children.length+1)*40+'px': '0'}">
                    <div class="row t-line"  @click="closeSecond(index,index1)">
                        <div class="radioWapper">
                            <el-radio v-model="radio" :label="dc1.label"><span></span></el-radio>
                        </div>
                        <div class="row first">
                            <span class="second"></span>
                            <i class="el-icon-arrow-down"></i>吉祥科技
                        </div>
                        <div>0</div>
                        <div>
                            <span>正常</span>
                        </div>
                        <div>
                            2020-03-03 19:55:20
                        </div>
                        <div class="row">
                            <el-button  icon="el-icon-plus" size="mini">新增</el-button>
                            <el-button type="primary"  icon="el-icon-edit-outline" size="mini">修改</el-button>
                            <el-button type="danger"  icon="el-icon-delete" size="mini">删除</el-button>
                        </div>
                    </div>

                    <div class="columns treeOpen" v-for="(dc2,index2) in dc1.children" :style="{maxHeight: dc1.open ? dc1.children.length*40+'px': '0'}">
                        <div class="row t-line">
                            <div class="radioWapper">
                                <el-radio v-model="radio" :label="dc2.label"><span></span></el-radio>
                            </div>
                            <div class="row first">
                                <span class="third"></span>
                                吉祥科技1
                            </div>
                            <div>0</div>
                            <div>
                                <span>正常</span>
                            </div>
                            <div>
                                2020-03-03 19:55:20
                            </div>
                            <div class="row">
                                <el-button  icon="el-icon-plus" size="mini" @click.stop="dialogFormVisible=true">新增</el-button>
                                <el-button type="primary"  icon="el-icon-edit-outline" size="mini">修改</el-button>
                                <el-button type="danger"  icon="el-icon-delete" size="mini">删除</el-button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <el-dialog
                title="添加"
                :visible.sync="dialogFormVisible"
                width="30%"
                :before-close="handleClose">
                <el-form :model="form">
                    <el-form-item label="上级名称" :label-width="formLabelWidth" >
                        <div @click="dialogFormVisible1=true">
                            <el-input v-model="form.name" autocomplete="off" disabled suffix-icon="el-icon-search" ></el-input>
                        </div>
                    
                    </el-form-item>
                    <el-form-item label="菜单名称" :label-width="formLabelWidth">
                        <el-input v-model="form.cdname" autocomplete="off" ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog
                title="提示"
                :visible.sync="dialogFormVisible1"
                width="20%">
                    <div style="padding: 0 30px">
                        <div class="columns tree" v-for="(d,index) in data1"> 
                            <div :class="bossName==d.label?'row first hicked':'row first' ">
                                <div class="imgWapper" @click="closeFirst1(index)">
                                    <img :src="d.icon" class="minus">
                                    </div>
                                <span @click="hickFirst1(d.label)">{{d.label}}</span>
                            </div>
                            <div class="columns treeOpen" v-for="(dc1,index1) in d.children" :style="{maxHeight: d.open ? (dc1.children.length+1)*24+'px': '0'}">
                                <div :class="bossName==dc1.label?'row second hicked':'row second' ">
                                    <div class="imgWapper"  @click="closeSecond1(index,index1)">
                                    <img :src="dc1.icon" class="minus">
                                    </div>
                                    <div class="xx"></div>
                                    <img src="../../../assets/images/permanage/file.svg" class="file_icon">
                                    <span @click="hickFirst1(dc1.label)">{{dc1.label}}</span>
                                </div>
                                <div class="secondWapper treeClose" v-for="(dc2,index2) in dc1.children" :style="{borderLeft:index1+1== d.children.length?'none':'1px dotted #000',maxHeight: dc1.open ? dc1.children.length*24+'px': '0'}">
                                    <div :class="bossName==dc2.label?'row second_child hicked':'row second_child' " >
                                        <div class="xx"></div>
                                        <div class="white_xx" :style="{background:bossName==dc2.label?'#ccc':'#fff'}" v-if="index2+1 == dc1.children.length"></div>
                                        <img src="../../../assets/images/permanage/file1.svg" class="file1_icon">
                                        <span @click="hickFirst1(dc2.label)">{{dc2.label}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                        <el-button type="primary" @click="menuSure">确 定</el-button>
                    </div>
            </el-dialog>

        </div>
    </div>
</template>

<script src="./partment.js"></script>

<style lang="scss">
  @import "./partment.scss"
</style>
