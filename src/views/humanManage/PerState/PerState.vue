<template>
  <div style="height:100%;overflow-y: auto;" class="PerState">
    <div  class="all" style="min-height:calc(100% - 47px)">
        <ul class="sys_top">
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">姓名</span>
            <div style="width:199px">
              <el-input v-model="persName" placeholder="请输入姓名"></el-input>
            </div>
          </li>
          <li class="sys_top_1 row" v-if="user.userType!=1">
            <span class="spanM" style="line-height:36px">项目名称</span>
            <div style="width:199px">
              <el-input v-model="projectName" placeholder="请输入项目名称"></el-input>
            </div>
          </li>

          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">班组</span>
            <div style="width:180px">
              <el-select v-model="teamName" clearable  placeholder="请选择班组">
                <el-option
                  v-for="i in item"
                  :key="i.teamId"
                  :label="i.teamName"
                  :value="i.teamName">
                </el-option>
              </el-select>
            </div>
          </li>

          <div class="thirdBtn" style="margin-left:auto;margin-right:0" @click="showList">查询</div>
          <div class="firBtn" style="margin-left:10px;margin-right:0" @click="batchSq(1)">批量授权</div>
          <div class="secBtn" style="margin-left:10px" @click="batchSq(0)">批量销权</div>
          <div class="thirdBtn" @click="countDel" style="margin-left:10px">批量删除</div>
          <div class="thirdBtn" @click="exportData(1)">导出当前</div>
        <div class="thirdBtn" @click="exportData(0)">导出全部</div>
        </ul>
        
        <div class="sys_bottom" @mouseleave="mouseLeave">
          <el-table
            ref="multipleTable"
            :data="tableData"
            v-loading="loading"
            border max-height="calc(100% - 110px)"
            class="customer-no-border-table"
            :row-class-name="tableRowClassName"
            :header-cell-style="{background:'#4B5365',color:'#fff'}"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              min-width="45"
              header-align="center"
              align="center"
            />
            <el-table-column
              :index="makeIndex"
              label="序号"
              type="index"
              align="center"
              width="50"
            />
            <el-table-column
              prop="persName"
              label="姓名"
              align="center"
              width="80"
            />
            <el-table-column
              prop="portrait"
              label="人员头像"
              align="center"
              width="110"
            >
              <template slot-scope="scope">
                <img :src="scope.row.portrait" alt="" style="width: 40px;height: 40px;">
              </template>
            </el-table-column>
            <el-table-column
              prop="showIdno"
              label="身份证号"
              align="center"
              width="160"
            />
            <el-table-column
              prop="projectName"
              label="项目名称"
              align="center"
              width="240"
            />
            <el-table-column
              prop="teamName"
              label="班组名称"
              align="center"
              width="150"
            />
            <el-table-column
              prop="guid"
              label="guid"
              align="center"
              width="290"
            >
              <template slot-scope="scope">
                <div class="sl_Wapper" @mouseenter="mouseEnter(scope.row.index)">
                  {{scope.row.guid}}
                </div>
                <span class="xsBox" :style="{display:showIndex===scope.row.index?'block':'none'}">
                  {{scope.row.guid}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="voDeviceAuthorizationStatusList"
              label="授权设备"
              align="center"
              min-width="200"
            >
              <template slot-scope="scope">
                <div class="row"> 
                  <div class="columns outInWapper" v-for="(v,index) in scope.row.voDeviceAuthorizationStatusList" :key="index">
                    <img :src="v.authorizationStatus?img1:img2" style="width:20px">
                    <span>{{v.inoutFlag?'进门':'出门'}}</span>
                    <div class="xsDeviceName">
                      {{v.deviceName}}
                    </div>
                  </div>
                  
                </div>
              </template>
            </el-table-column>
            
            <el-table-column
              prop="d10"
              label="操作"
              align="center"
              width="120"
            >
            <template slot-scope="scope">
                <el-button  type="text" size="small" @click="giveAuthorize(scope.row,1)">授权</el-button>
                <el-button  type="text" size="small" @click="giveAuthorize(scope.row,0)">销权</el-button>
                <el-button  type="text" @click="dels1(scope.row)" size="small" style="color:red">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
    
    <el-pagination 
      class="pageLine"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :page-size="10"
      @size-change="handleSizeChange"
      :total="total">
    </el-pagination>
       
    
    <el-dialog title="授权" :visible.sync="dialogFormVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="35%" >
      <div v-loading="loading1">
        <el-transfer v-model="value1" :data="data1" class="transferWapper"   :titles="['未授权', '已授权']" filterable :filter-method="filterMethod" filter-placeholder="请输入设备名称" @change="handleChange"></el-transfer>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="assUser(1)">确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="销权" :visible.sync="dialogFormVisible1" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="35%" >
      <div  v-loading="loading1">
        <el-transfer v-model="value1" :data="data1" class="transferWapper"  :titles="['已授权', '未授权']" filterable :filter-method="filterMethod" filter-placeholder="请输入设备名称" @change="handleChange"></el-transfer>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="assUser(0)">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    
    <el-dialog :title="editName" :visible.sync="dialogFormVisible2" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="35%" >
      <div  v-loading="loading1">
        <el-transfer v-model="value1" :data="data1" class="transferWapper"  :titles="['设备列表', editName=='批量授权'?'需授权列表':'需销权列表']" filterable :filter-method="filterMethod" filter-placeholder="请输入设备名称" @change="handleChange"></el-transfer>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="assUser(0)">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    
  </div>
</template>

<script src="./PerState.js"></script>

<style lang="scss" scoped>
  @import "./PerState.scss"
</style>
