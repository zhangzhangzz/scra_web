<!--
 * @Author: your name
 * @Date: 2021-06-10 13:37:59
 * @LastEditTime: 2021-07-09 16:14:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\projectManage\projectDetail\projectDetail.vue
-->
<template>
    <div class="projectDetail">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="auto" style="box-shadow:2px 2px 5px #ccc;background: #fff;">
                <div class="row title1">
                    <span>设备安装区域</span>
                    <div class="dbtn" @click="addQy">添加区域</div>
                    
                </div>
                <div style="padding: 10px 30px">
                    <div class="columns tree" v-for="(d,index) in data"> 
                        <div class="row first">
                            <div class="imgWapper" @click="closeFirst(index)">
                                <img :src="d.icon" class="minus">
                                </div>
                            <span @click="hickFirst(d.label,1)">{{d.label}}</span>
                            <div style="position: absolute;right:0;top:-4px">
                                <el-dropdown @command="handleClick">
                                    <span class="el-dropdown-link">
                                        <i class="el-icon-more" ></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="1">修改区域</el-dropdown-item>
                                        <el-dropdown-item command="0">删除区域</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            
                        </div>
                        <div class="columns treeOpen" v-for="(dc1,index1) in d.children" :style="{maxHeight: d.open ? (dc1.children.length+1)*24+'px': '0'}">
                        <div class="row second">
                            <div class="imgWapper"  @click="closeSecond(index,index1)">
                            <img :src="dc1.icon" class="minus">
                            </div>
                            <div class="xx"></div>
                            <img src="../../../assets/images/permanage/file.svg" class="file_icon">
                            <span @click="hickFirst(dc1.label,0)">{{dc1.label}}</span>
                            <div style="position: absolute;right:0;top:-4px">
                                <el-dropdown @command="handleClick">
                                    <span class="el-dropdown-link">
                                        <i class="el-icon-more" ></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="1">修改区域</el-dropdown-item>
                                        <el-dropdown-item command="0">删除区域</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                        <div class="secondWapper treeClose" v-for="(dc2,index2) in dc1.children" :style="{borderLeft:index1+1== d.children.length?'none':'1px dotted #000',maxHeight: dc1.open ? dc1.children.length*24+'px': '0'}">
                            <div class="row second_child">
                                <div class="xx"></div>
                                <div class="white_xx" v-if="index2+1 == dc1.children.length"></div>
                                <img src="../../../assets/images/permanage/file1.svg" class="file1_icon">
                                <span @click="hickFirst(dc1.label+' / '+dc2.label,2)">{{dc2.label}}</span>
                            </div>
                            <div style="position: absolute;right:0;top:-4px">
                                <el-dropdown @command="handleClick">
                                    <span class="el-dropdown-link">
                                        <i class="el-icon-more" ></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="1">修改区域</el-dropdown-item>
                                        <el-dropdown-item command="0">删除区域</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
                
            </el-aside>
            
            <el-container>
                <el-main class="main">
                    <div class="row">
                        <span>{{leftTitle}}</span>
                        <div class="firBtn" @click="dialogVisible1 = true">上传照片</div>
                    </div>
                    
                    <div class="video" v-if="type==1"></div>
                    <div class="row video2">
                        <div v-for="(v,index) in video">
                            <i class="el-icon-error" @click="remove(index)"></i>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>

        <el-dialog
            class="groupEdit"
            :title="tag?'添加区域':'修改区域'"
            style="text-align:center"
            :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
            :visible.sync="dialogVisible"
            width="25%"
            :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="上级区域" v-if="tag"> 
                    <div class="fw">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="区域名称" prop="qymc">
                    <div class="fw">
                    <el-input v-model="ruleForm.qymc"></el-input>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer row">
                <div @click="dialogVisible = false" class="firBtn" style="margin:auto 30px auto auto">取 消</div>
                <div type="primary" @click="dialogVisible = false" class="secBtn" style="margin:auto auto auto 0">确 定</div>
            </span>
        </el-dialog>

        <el-dialog
            class="groupEdit"
            title="上传施工照片"
            :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
            style="text-align:center"
            :visible.sync="dialogVisible1"
            width="25%"
            :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="上级区域" v-if="tag"> 
                    <div class="fw">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="照片名称" prop="qymc">
                    <div class="fw">
                    <el-input v-model="ruleForm.qymc"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="上传照片" >
                    <el-upload
                        class="upload-demo columns"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer row" style="text-align:center">
                <div @click="dialogVisible1 = false" class="firBtn" style="margin:auto 30px auto auto">取 消</div>
                <div type="primary" @click="dialogVisible1 = false" class="secBtn" style="margin:auto auto auto 0">确 定</div>
            </span>
        </el-dialog>

    </div>
</template>

<script src="./projectDetail.js"></script>

<style lang="scss" scoped>
  @import "./projectDetail.scss"
</style>