<template>
  <div style="height:100%;overflow-y: auto;">
    <div class="all" style="min-height:calc(100% - 47px)">
        <ul class="sys_top">
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">点位编号</span>
            <div class="width:199px"><el-input v-model="id" placeholder="请输入ID编号"></el-input></div>
            
          </li>
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">国控数据</span>
            <div class="width:199px"><el-input v-model.trim="dataValue" type="number" placeholder="请输入国控数据"></el-input></div>
          </li>
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">国控区域</span>
            <div class="width:199px"><el-input v-model="name" placeholder="请输入国控区域"></el-input></div>
          </li>
          
          <div class="thirdBtn" @click="showList" style="margin-left:auto">查询</div>
        </ul>
        <div class="sys_bottom">
          <template>
            <el-table
              :data="tableData "
              v-loading="loading"
              border max-height="calc(100% - 110px)"
              class="customer-no-border-table"
              :header-cell-style="{background:'#4B5365',color:'#fff'}"
              style="width: 100%"
            >
              <el-table-column
                align="center"
                type="index"
                label="序号"
                :index="makeIndex"
                width="50"
              />
              <el-table-column
                align="center"
                prop="number"
                label="点位编号"
              />
              <el-table-column
                align="center"
                prop="name"
                label="国控区域"
              />
              <el-table-column
                align="center"
                prop="projectType"
                label="设备区域"
              >
              <template slot-scope="scope">
                
              </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="aqi"
                label="AQI"
                width="90"
              />
              <el-table-column
                align="center"
                prop="pm10"
                label="国控PM10"
                width="90"
              />
              <el-table-column
                align="center"
                prop="pm2"
                label="国控PM2.5"
                width="100"
              />
              <el-table-column
                align="center"
                prop="noise"
                label="标准噪音"
                width="90"
              />
                <el-table-column
                    align="center"
                    prop="fahrenheit"
                    label="温度"
                    width="90"
                >
                  <template slot-scope="scope">
                    {{scope.row.fahrenheit}}°C
                  </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="finishTime"
                    label="经纬度"
                    width="190"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.latitude!=null && scope.row.longitude!=null">
                      {{scope.row.latitude+','+scope.row.longitude}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="dataTime"
                    label="国控时间"
                    width="170"
                />
              <el-table-column
                align="center"
                prop="updateTime"
                label="更新时间"
                width="170"
              />
                <!-- <template slot-scope="scope"> 
                  <span :style="{color:scope.row.projectState.search('距离')!==-1?'red':'#606266'}">{{scope.row.projectState}}</span>
                  <span >{{scope.row.projectState}}</span>
                </template>
              </el-table-column> -->
              <el-table-column
                align="center"
                label="操作"
                width="70"
              >
                <template slot-scope="scope">
                  <el-button @click="editDataSure(scope.row)"  type="text" size="small">编辑</el-button>
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

    <!-- 创建项目
    .0 -->
    <el-dialog
      title="修改"
      :visible.sync="dialogFormVisible"
      :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
      width="30%">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="AQI" :label-width="formLabelWidth" prop="aqi">
          <el-input v-model.number="form.aqi" type="number" autocomplete="off" placeholder="请输入AQI"></el-input>
        </el-form-item>
        <el-form-item label="PM10" :label-width="formLabelWidth" prop="pm10" >
          <el-input v-model.number="form.pm10" type="number" autocomplete="off" placeholder="请输入PM10" @input="changeInput($event,1)"></el-input>
        </el-form-item>
        <el-form-item label="PM2.5" :label-width="formLabelWidth" prop="pm2">
          <el-input v-model.number="form.pm2" type="number" autocomplete="off" placeholder="请输入PM2.5" @input="changeInput($event,2)"></el-input>
        </el-form-item>
        <el-form-item label="温度" :label-width="formLabelWidth" prop="fahrenheit">
          <el-input v-model.number="form.fahrenheit" type="number" autocomplete="off" placeholder="请输入温度" @input="changeInput($event,3)"></el-input>
        </el-form-item>
        <el-form-item label="噪音" :label-width="formLabelWidth" prop="noise">
          <el-input v-model.number="form.noise" type="number" autocomplete="off" placeholder="请输入噪音" @input="changeInput($event,4)"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="editData" v-loading="loading">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script src="./countryControl.js"></script>
<style lang="scss" scoped>
  @import "./countryControl.scss"
</style>
