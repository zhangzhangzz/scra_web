<!--
 * @Author: your name
 * @Date: 2021-06-22 10:08:58
 * @LastEditTime: 2021-07-09 16:13:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\components\custom\AssignItems\AssignItems.vue
-->
<template>
    <el-dialog
        title="分配项目"
        :visible.sync="dialogVisible"
        :show-close="false"
        v-loading="loading"
        :close-on-click-modal="false" :close-on-press-escape="false"
        width="30%"
        :before-close="setIndex2">
        <el-tabs v-model="activeName" @tab-click="handleClick2">
            <el-tab-pane label="已授权" name="first">
                <el-table :data="gridData.havePowerList"  @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                    </el-table-column>
                    <el-table-column property="projectName" label="项目名称" header-align="center" align="center"></el-table-column>
                    <el-table-column
                        label="操作"
                        header-align="center" 
                        align="center"
                        width="100">
                        <template slot-scope="scope" >
                            <el-button @click="handleClick(scope.row,0)" type="text" size="small" style="color:red">销权</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                    <el-button @click="sq(0)">销权</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="未授权" name="second">
                <el-table :data="gridData.notHavePowerList"  @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    align="center"
                    width="55">
                    </el-table-column>
                    <el-table-column property="projectName" label="项目名称" header-align="center" align="center"></el-table-column>
                    <el-table-column
                        label="操作"
                        header-align="center" 
                        align="center"
                        width="100">
                        <template slot-scope="scope" >
                            <el-button @click="handleClick(scope.row,1)" type="text" size="small">授权</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                    <el-button @click="sq(1)">授权</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
        
    </el-dialog>
</template>

<script src="./AssignItems.js"></script>

<style lang="scss" scoped>
  @import "./AssignItems.scss"
</style>