<!--
 * @Author: your name
 * @Date: 2021-06-11 10:52:09
 * @LastEditTime: 2021-06-25 16:29:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\projectManage\protectRecord\protectRecord.vue
-->
<template>
    <div class="protectRecord">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1', '3']">
                <el-submenu index="1">
                    <template slot="title" style="display:flex"><i style="color:#fff;width:30px"></i>运维记录</template>
                    <el-menu-item-group>
                    <template slot="title">所有工单<span class="num">720</span></template>
                        <el-menu-item index="1-1">未完成<span class="num">3</span></el-menu-item>
                        <el-menu-item index="1-2">环境设施运维<span class="num">1</span></el-menu-item>
                        <el-menu-item index="1-3">视频设备连接<span class="num">3</span></el-menu-item>
                        <el-menu-item index="1-4">实名制设备运维<span class="num">3</span></el-menu-item>
                        <el-menu-item index="1-5">运渣车设备运维<span class="num">3</span></el-menu-item>
                        <el-menu-item index="1-6">其他设备运维<span class="num">3</span></el-menu-item>
                        <el-menu-item index="1-7">设备安装<span class="num">3</span></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                
                </el-menu>
            </el-aside>
            
            <el-container>
                <el-main>
                <div class="mini-title">运维列表</div>
                <div style="margin:0 30px">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="bh"
                            label="工单编号"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="项目名称">
                        </el-table-column>
                        <el-table-column
                            prop="lx"
                            label="设备类型">
                        </el-table-column>
                        <el-table-column
                            prop="ywry"
                            label="运维人员">
                        </el-table-column>
                        <el-table-column
                            prop="gdlx"
                            label="工单类型">
                        </el-table-column>
                        <el-table-column
                            prop="clgc"
                            label="处理过程">
                        </el-table-column>
                        <el-table-column
                            prop="gdzt"
                            label="工单状态">
                        </el-table-column>
                        <el-table-column
                            prop="cjsj"
                            label="创建时间">
                        </el-table-column>
                    </el-table>
                </div>
                
                </el-main>
            </el-container>
        </el-container>
        
    </div>

</template>

<script src="./protectRecord.js"></script>

<style lang="scss">
  @import "./protectRecord.scss"
</style>