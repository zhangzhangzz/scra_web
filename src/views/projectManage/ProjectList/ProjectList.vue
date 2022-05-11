<template>
  <div style="height:100%;overflow-y: auto;" class="projectList">
    <div class="all" style="min-height:calc(100% - 47px)">
        <ul class="sys_top" v-if="user.userType!==1">
          <globalProject  @queryProId="queryProId" />
          
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">项目账号</span>
            <div class="width:199px"><el-input v-model="userName" placeholder="请输入项目账号"></el-input></div>
          </li>
          
          <div class="thirdBtn" @click="showList" style="margin-left:auto">查询</div>
          <div class="firBtn" @click="dialogVisible = true" style="margin-left:10px" v-if="buttonList.includes('projectListAddBtn')">创建项目</div>
          <div class="secBtn" @click="getIndex(1)">项目地图</div>
        </ul>
        <div class="sys_bottom">
          <template>
            <el-table
              :data="tableData"
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
                prop="projectName"
                label="项目名称"
                
              />
              <el-table-column
                align="center"
                prop="consOrg"
                label="施工单位"
                
              />
              <el-table-column
                align="center"
                prop="projectType"
                label="项目类型"
                width="120"
              >
              <template slot-scope="scope">
                {{queryItemType(scope.row.projectType)}}
              </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="customerName"
                label="负责人"
                width="120"
              />
              <el-table-column
                align="center"
                prop="customerPhone"
                label="联系方式"
                width="130"
              />
              <el-table-column
                align="center"
                prop="startTime"
                label="开工时间"
                width="110"
              >
                <template slot-scope="scope">
                  {{formatDate(scope.row.startTime)}}
                  <!-- {{scope.row.finishTime}} -->
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="finishTime"
                label="竣工时间"
                width="110"
              >
                <template slot-scope="scope">
                  {{formatDate(scope.row.finishTime)}}
                  <!-- {{scope.row.finishTime}} -->
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="projectState"
                label="项目状态"
                width="110"
              >
                <template slot-scope="scope"> 
                  <!-- <span :style="{color:scope.row.projectState.search('距离')!==-1?'red':'#606266'}">{{scope.row.projectState}}</span> -->
                  <span >{{scope.row.projectState}}</span>
                </template>
              </el-table-column>

              <el-table-column
                v-if="user.userType!==1"
                prop="smsReminderSwitch"
                width="80"
                align="center"
                label="短信预警">
                  <template slot-scope="scope">
                      <el-switch
                          v-model="scope.row.smsReminderSwitch"
                          :active-value=1
                          :inactive-value=0
                          @change="changeSwitch($event,scope.row)"
                      />
                  </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="图片管理"
                width="80"
              >
                <template slot-scope="scope">
                  <el-button  type="text" size="small" @click="review(scope.row)">预览</el-button>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作"
                width="180"
              >
                <template slot-scope="scope">
                  <!-- <el-button @click="duijie" type="text" size="small">对接</el-button> -->
                  <el-button @click="$router.push({path: '/projectManage/projectEdit',query: {data:JSON.stringify(scope.row),options:JSON.stringify(options)}})" v-if="buttonList.includes('projectListAddBtnEditBtn')" type="text" size="small">编辑</el-button>
                  <el-button  type="text" size="small" v-if="user.userType!==1">运维</el-button>
                  <el-button @click=" handleOut(scope.row.projectId)" v-if="buttonList.includes('projectListAddBtnDelBtn') && user.userType!==1" type="text" size="small" style="color:red" >删除</el-button>
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
        :page-size="10"
        @size-change="handleSizeChange"
        :total="total">
      </el-pagination>

    <!-- 创建项目
    .0 -->
    <el-dialog
      title="创建项目"
      :visible.sync="dialogVisible"
      :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
      width="30%"
      class="projectCreate"
      :before-close="handleClose_item">
      <div class="row" style="height: 36px;line-height:36px">
        <span style="margin-right:10px">项目账号</span>
        <div style="width:199px">
          <el-select v-model="userId" placeholder="请选择" @change="changeUserID">
            <el-option
              v-for="item in item_options"
              :key="item.userName"
              :label="item.userName"
              :value="item.userName">
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose_item">取 消</el-button>
        <el-button type="primary" @click="goCreate">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="图片管理"
      :visible.sync="dialogVisible1"
      :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false"
      width="30%"
      class="projectCreate"
      :before-close="handleClose_item">
      <div class="row">
        <el-upload
          action="#"
          :class="fileList.length>=1?'hide':''"
          list-type="picture-card"
          :on-change="handlePreview"
          accept=".jpg,.jpeg,.png,.JPG,.JPEG"
          :file-list="fileList"
          :limit="1"
          :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt="" style="margin:auto"
                  >
              
              <span class="el-upload-list__item-actions">
                  <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                  >
                  <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                  >
                  <i class="el-icon-delete"></i>
                  </span>
              </span>
              </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible2" width="700px" class="imgDialog">
              <div class="row">
                  <img style="width:auto;height:400px;margin:auto" :src="dialogImageUrl" alt="">
              </div>
          </el-dialog>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onEvaluation1" type="primary" v-if="fileList.length>0">上传</el-button>
        <el-button @click="closePic">关闭</el-button>
      </span>
    </el-dialog>

    <pro-map v-if="index==1" @toIndex="getIndex"></pro-map>
  </div>
</template>

<script src="./ProjectList.js"></script>
<style lang="scss" scoped>
  @import "./ProjectList.scss"
</style>
