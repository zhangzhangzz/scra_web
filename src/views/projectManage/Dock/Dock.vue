<template>
  <div>
    <ul class="sys_top">
      <li class="sys_top_2">
        <span class="spanM">设备编号</span>
        <el-input v-model="input" placeholder="请输入内容" class="inputWidth"></el-input>
      </li>
      <div class="button_search">
        <img src="../../../assets/images/button/search.png">
        <span>搜索</span>
      </div>
      <div class="button_reset">
        <img src="../../../assets/images/button/reset.png">
        <span>重置</span>
      </div>
    </ul>

    <div class="sys_bottom">
      <ul class="sys_bottom_1">
        <li class="sys_bottom_1_del" @click="handleOut">
          <img src="../../../assets/images/button/del.png">
          <span>批量删除</span>
        </li>
        <li class="sys_bottom_1_export" @click="dialogVisible = true">
          <img src="../../../assets/images/button/export.png">
          <span>添加对接</span>
        </li>
        <li class="sys_bottom_1_modify" @click="exit">
          <img src="../../../assets/images/button/modify.png">
          <span>返回</span>
        </li>
      </ul>
      <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="环境设备" name="first">
            <template>
              <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"/>
                <el-table-column prop="d" label="序号" align="center" min-width="40" />
                <el-table-column prop="d1" label="设备名称" align="center" min-width="120" />
                <el-table-column prop="d2" label="设备SN" align="center" min-width="120" />
                <el-table-column prop="d6" label="设备类型" align="center" min-width="120" />
                <el-table-column prop="d3" label="地区" align="center" min-width="100" />
                <el-table-column prop="d4" label="经度" align="center" min-width="90" />
                <el-table-column prop="d5" label="纬度" align="center" min-width="90" />
                <el-table-column label="状态" align="center" min-width="120">
                  <ul class="table_button">
                    <li class="table_button_del">
                      <img src="../../../assets/images/button/del.png">
                      <span>删除</span>
                    </li>
                  </ul>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="实名制设备" name="second">
            <template>
              <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"/>
                <el-table-column prop="d" label="序号" align="center" min-width="40" />
                <el-table-column prop="d1" label="设备名称" align="center" min-width="120" />
                <el-table-column prop="d2" label="设备SN" align="center" min-width="120" />
                <el-table-column prop="d6" label="设备类型" align="center" min-width="120" />
                <el-table-column prop="d3" label="地区" align="center" min-width="100" />
                <el-table-column prop="d4" label="经度" align="center" min-width="90" />
                <el-table-column prop="d5" label="纬度" align="center" min-width="90" />
                <el-table-column label="状态" align="center" min-width="120">
                  <ul class="table_button">
                    <li class="table_button_del">
                      <img src="../../../assets/images/button/del.png">
                      <span>删除</span>
                    </li>
                  </ul>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="视频设备" name="third">
            <template>
              <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"/>
                <el-table-column prop="d" label="序号" align="center" min-width="40" />
                <el-table-column prop="d1" label="设备名称" align="center" min-width="120" />
                <el-table-column prop="d2" label="设备SN" align="center" min-width="120" />
                <el-table-column prop="d6" label="设备类型" align="center" min-width="120" />
                <el-table-column prop="d3" label="地区" align="center" min-width="100" />
                <el-table-column prop="d4" label="经度" align="center" min-width="90" />
                <el-table-column prop="d5" label="纬度" align="center" min-width="90" />
                <el-table-column label="状态" align="center" min-width="120">
                  <ul class="table_button">
                    <li class="table_button_del">
                      <img src="../../../assets/images/button/del.png">
                      <span>删除</span>
                    </li>
                  </ul>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>

    </div>
    <!-- 设置对接参数 -->
    <el-dialog title="设置对接参数" :visible.sync="dialogVisible" width="600px" :before-close="handleClose" :close-on-click-modal = "false">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="columns">
        <el-form-item label="类型">
          <el-select v-model="uuu" placeholder="请选择活动区域" class="inputWidth1" @change="ooo()">
            <el-option label="采集设备" value="采集设备" />
            <el-option label="考勤设备" value="考勤设备" />
            <el-option label="扬尘设备" value="扬尘设备" />
            <el-option label="对接建委" value="对接建委" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="bgs==1||bgs==2||bgs==3" label="项目名称" prop="name">
          <el-input v-model="ruleForm.name" class="inputWidth1" disabled/>
        </el-form-item>
        <el-form-item v-if="bgs==2" label="设备厂家">
          <el-input class="inputWidth1" />
        </el-form-item>
        <el-form-item v-if="bgs==1||bgs==2||bgs==3" label="设备SN">
          <el-input class="inputWidth1" />
        </el-form-item>
        <el-form-item v-if="bgs==4||bgs==5" label="设备SN">
          <el-select v-model="uuu1" placeholder="请选择" class="inputWidth1" @change="JW()">
            <el-option label="cjidij123" value="采集设备" />
            <el-option label="mjwe82991" value="门禁设备" />
            <el-option label="ycqw82314" value="杨尘设备" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="bgs==4||bgs==5" label="设备类型">
          <el-input class="inputWidth1" disabled />
        </el-form-item>
        <el-form-item v-if="bgs==2||bgs==3||bgs==4||bgs==5" label="设备名称">
          <el-input class="inputWidth1" :disabled="bgs==4||bgs==5" />
        </el-form-item>
        <el-form-item v-if="bgs==4||bgs==5" label="建委SN">
          <el-input class="inputWidth1" />
        </el-form-item>
        <el-form-item v-if="bgs==4||bgs==5" label="建委KEY">
          <el-input class="inputWidth1" />
        </el-form-item>
        <el-form-item v-if="bgs==5" label="建委IP">
          <el-input class="inputWidth1" />
        </el-form-item>
        <el-form-item v-if="bgs==5" label="IP端口">
          <el-input class="inputWidth1" />
        </el-form-item>
        <el-form-item v-if="bgs==5" label="地区编号">
          <el-input class="inputWidth1" />
        </el-form-item>
        <el-form-item v-if="bgs==2" label="进出设置">
          <el-select v-model="uuu2" placeholder="请选择" class="inputWidth1">
            <el-option label="进门" value="进门" />
            <el-option label="出门" value="出门" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" class="sureBtn" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./Dock.js"></script>

<style lang="scss" scoped>
  @import "./Dock.scss"
</style>
