<template>
  <div class="perTemp" style="height:100%;overflow-y: auto;" ref="bigbox"> 
    <div class="all" style="min-height:calc(100% - 47px)">
        <ul class="row sys_top">
          <li class="sys_top_2" style="margin:0 20px 0 0">
            <span class="spanM">姓名</span>
            <el-input v-model="persName" placeholder="请输入姓名" class="inputWidth"></el-input>
          </li>
           <div class="thirdBtn" @click="queryShow" style="margin-left:auto">查询</div>
          <div class="thirdBtn" @click="exportData(1)">导出当前</div>
        <div class="thirdBtn" @click="exportData(0)" style="margin-right:10px">导出全部</div>
          <!-- <div class="firBtn" @click="migratePerson(0)" style="margin-left:10px">批量迁移</div> -->
          <div class="secBtn" @click="countDel">批量删除</div>
        </ul>

        <div class="sys_bottom">
          <el-table
          ref="multipleTable"
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
            label="人员类型"
            prop="persType"
            align="center"
            width="110"
          />
          <el-table-column
            prop="showIdno"
            label="身份证号"
            align="center"
            width="160"
          />
          <el-table-column
            prop="age"
            label="年龄"
            align="center"
            width="50"
          />
          <el-table-column
            prop="nation"
            label="民族"
            align="center"
            width="50"
          >
            <template slot-scope="scope">
              <span :style="{color:scope.row.nations.isEthnicHan!=1?'red':'#606266'}">{{scope.row.nations.nation}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="teamName"
            label="班组"
            align="center"
          />
          <el-table-column
            label="工种"
            prop="workName"
            align="center"
          />
          <el-table-column
            prop="card"
            label="IC卡号"
            align="center"
            width="120"
          />
          <el-table-column
            prop="online"
            label="人员状态"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
                  <span :style="{color:scope.row.online=='在岗'?'rgb(128,204,93)':'rgb(252,103,71)'}">{{scope.row.online}}</span>
              </template>
          </el-table-column>
          
          <el-table-column
            label="人员同步状态"
            align="center"
            width="180"
          >
          <template slot-scope="scope">
            <div class="type" >
              <p class="type_1">
                <span class="type_font1">{{scope.row.issueDevice.length}}</span>
                <span>/</span>
                <span class="type_font2">{{scope.row.allDevice.length}}</span>
              </p>
              <p class="type_2">下发人脸</p>
            </div>
            <div class="type">
              <p class="type_1">
                <img :src="scope.row.uploadStatus===1?img8:img6">
              </p>
              <p class="type_2">上传建委</p>
            </div>
            <div class="type">
              <p class="type_1">
                <img :src="scope.row.syncStatus===1?img7:img5">
              </p>
              <p class="type_2">同步建委</p>
            </div>
          </template>
          </el-table-column>

          <el-table-column
            prop="d10"
            label="操作"
            align="center"
            width="60"
          >
          <template slot-scope="scope">
              <el-button  type="text" size="small" @click="lookDetail(scope.row)">详情</el-button>
              <el-button  type="text" size="small" @click="getMigratePerson(scope.row.persId)">迁移</el-button>
          </template>
          </el-table-column>
        </el-table>
        </div>
    </div>
      
    <el-pagination 
      v-if="paginationShow"
      class="pageLine"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      :total="total">
    </el-pagination>


  <el-dialog title="迁移人员" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%" >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="迁移人员" prop="persType" :label-width="formLabelWidth">
          <el-radio-group v-model="ruleForm.persType">
            <el-radio :label="3">备案人员</el-radio>
            <el-radio :label="1">劳务人员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班组" prop="teamId" :label-width="formLabelWidth"> 
            <div class="fw">
                <el-select v-model="ruleForm.teamId"   placeholder="请选择" style="width:100%important">
                    <el-option v-for="(item,i) of selectData.team" :key="i" :label="item.teamName" :value="item.teamId" />
                </el-select>
            </div>
        </el-form-item>
        <el-form-item label="工种" prop="workId" :label-width="formLabelWidth"> 
            <div class="fw">
                <el-select v-model="ruleForm.workId"   placeholder="请选择" style="width:100%important">
                    <el-option v-for="(item,i) of selectData.work" :key="i" :label="item.dicValue" :value="item.dicKey" />
                </el-select>
            </div>
        </el-form-item>
        <el-form-item label="所属单位" prop="unitId" :label-width="formLabelWidth"> 
            <div class="fw">
                <el-select v-model="ruleForm.unitId"  placeholder="请选择" style="width:100%important">
                    <el-option v-for="(item,i) of selectData.unit" :key="i" :label="item.dicValue" :value="item.dicKey" />
                </el-select>
            </div>
        </el-form-item>
        
        <el-form-item label="联系方式" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.phone" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人" prop="urgencyName" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.urgencyName" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="紧急联系方式" prop="urgencyPhone" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.urgencyPhone" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="addDeviceSure('ruleForm')" v-loading="loading1">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script src="./PerTemp.js"></script>
<style lang="scss" scoped>
  @import "./PerTemp.scss"
</style>
