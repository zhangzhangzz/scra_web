<template>
  <div style="height:100%;overflow-y: auto;">
    <div class="all" style="min-height:calc(100% - 47px);position: relative;">
        <ul class="sys_top ">
          <globalProject  @queryProId="queryProId" style="z-index:999;" v-if="user.userType!=1"/>
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">姓名</span>
            <div style="width:199px"><el-input v-model="attendName" placeholder="请输入姓名"></el-input></div>
            
          </li>
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">班组</span>
            <div style="width:199px">
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

          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">考勤状态</span>
            <div style="width:199px">
                <el-select v-model="attendStatus" clearable placeholder="请选择" style="width:100%!important">
                    <el-option label="出门" :value=0></el-option>
                    <el-option label="进门" :value=1></el-option>
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
          
          <div class="thirdBtn" @click="showList" style="margin-left:auto;z-index:999">查询</div>
          <div class="thirdBtn" @click="exportData(1)" style="margin-left:10px;z-index:999">导出当前</div>
          <div class="thirdBtn" @click="exportData(0)" style="margin-left:10px;z-index:999">导出所有</div>
          <div class="firBtn" @click="query" style="margin-left:10px;margin-right:0;z-index:999">预警设置</div>
          <div class="secBtn" @click="showList" style="margin-left:10px;z-index:999">删除</div>
          
        </ul>
        <div style="padding:15px 20px">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="管理人员" name="first">
                  <div class="sys_bottom" style="padding:0 0 20px 0">
                    <template>
                      <el-table
                        :data="tableData"
                        v-loading="loading"
                        border max-height="calc(100% - 110px)"
                        class="customer-no-border-table"
                        :header-cell-style="{background:'#4B5365',color:'#fff'}"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                      >
                        <el-table-column
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
              </el-tab-pane>
              <el-tab-pane label="备案人员" name="second">
                <div class="sys_bottom">
                  <template>
                    <el-table
                      :data="tableData"
                      v-loading="loading"
                      border max-height="calc(100% - 110px)"
                      class="customer-no-border-table"
                      :header-cell-style="{background:'#4B5365',color:'#fff'}"
                      style="width: 100%"
                      @selection-change="handleSelectionChange"
                    >
                      <el-table-column
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
                        {{scope.row.inOut==1?'进门':'出门'}}
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
                          {{queryStatus(scope.row.proAttendStatusList)}}
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
                          <el-button @click="editDataSure(scope.row)"  type="text" size="small">详情</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </div>
              </el-tab-pane>
            </el-tabs>
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

<script src="./unUpRecord.js"></script>
<style lang="scss" >
  @import "./unUpRecord.scss"
</style>
