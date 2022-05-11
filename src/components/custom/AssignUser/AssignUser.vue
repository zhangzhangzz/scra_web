<template>
  <div>
    <div class="bg" style="z-index:9">
      <ul class="sys_top">
        <li class="sys_top_1">
          <span class="spanM">项目名称</span>
          <el-select v-model="option" placeholder="项目选择" clearable size="small">
            <el-option v-for="(item,i) of options" :key="i" :label="item" :value="item" />
          </el-select>
        </li>
        <li class="sys_top_1">
          <span class="spanM">项目账号</span>
          <el-select v-model="option" placeholder="项目选择" clearable size="small">
            <el-option v-for="(item,i) of options" :key="i" :label="item" :value="item" />
          </el-select>
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
        <el-tabs v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane label="已授权人员" name="first">
            <ul class="sys_bottom_1">
              <li class="sys_bottom_1_del" @click="groupSq(0)">
                <img src="../../../assets/images/button/del.png">
                <span>批量更权</span>
              </li>
              <li class="sys_bottom_1_del" @click="BGY(0)">
                <img src="../../../assets/images/button/del.png">
                <span>详情</span>
              </li>
              <li class="sys_bottom_1_export">
                <img src="../../../assets/images/button/export.png">
                <span>导出</span>
              </li>
            </ul>
            <template>
              <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" v-loading="loading"
                @selection-change="handleSelectionChange" >
                <el-table-column type="selection" width="55" />
                <el-table-column prop="d" align="center" label="序号" width="50" />
                <el-table-column prop="projectName" label="项目账号" align="center" min-width="100" />
                <el-table-column prop="userName" label="用户名称" align="center" min-width="100" />
                <el-table-column prop="email" label="邮箱" align="center" min-width="130" />
                <el-table-column prop="phone" label="手机" align="center" min-width="100" />
                <el-table-column prop="userStatus" label="用户状态" align="center" min-width="100">
                  <template slot-scope="scope">
                    <span class="suss">{{scope.row.userStatus?'禁用':'启用'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" align="center" min-width="150" label="创建时间" >
                  <template slot-scope="scope">
                    <span>{{formatDate(new Date(scope.row.createTime))}}</span>
                  </template>
                </el-table-column>    
                <el-table-column label="操作" align="center" min-width="100">
                  <template slot-scope="scope">
                  <ul class="table_button">
                    <li class="table_button_del" @click="sqUser(0,[scope.row.userId])">
                      <img src="../../../assets/images/button/del.png">
                      <span>更改授权</span>
                    </li>
                  </ul>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>

          <el-tab-pane label="未授权人员" name="second">
            <ul class="sys_bottom_1">
              <li class="sys_bottom_1_del" @click="groupSq(1)">
                <img src="../../../assets/images/button/del.png">
                <span>批量授权</span>
              </li>
              <li class="sys_bottom_1_del">
                <img src="../../../assets/images/button/del.png">
                <span>详情</span>
              </li>
              <li class="sys_bottom_1_export">
                <img src="../../../assets/images/button/export.png">
                <span>导出</span>
              </li>
            </ul>
            <template>
              <el-table ref="multipleTable1" :data="tableData1" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column type="index" align="center" label="序号" width="50" />
                <el-table-column prop="projectName" label="项目名称" align="center" min-width="100" />
                <el-table-column prop="userName" label="用户名称" align="center" min-width="100" />
                <el-table-column prop="email" label="邮箱" align="center" min-width="130" />
                <el-table-column prop="phone" label="手机" align="center" min-width="100" />
                <el-table-column prop="czxx" label="用户状态" align="center" min-width="100">
                  <template slot-scope="scope">
                    <span class="suss">{{scope.row.userStatus?'禁用':'启用'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="time" align="center" min-width="150" label="创建时间" />
                <el-table-column label="操作" align="center" min-width="100">
                  <template slot-scope="scope">
                    <ul class="table_button">
                      <li class="table_button_del" @click="sqUser(1,[scope.row.userId])">
                        <img src="../../../assets/images/button/del.png">
                        <span>授权</span>
                      </li>
                    </ul>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
        <el-pagination 
          class="pageLine"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
        <div class="bg_4">
          <!-- <span class="bg_4_1" style="color:#fff" @click="sqUser(1,scope.row.userId)">添加</span> -->
          <span class="bg_4_2" @click="setIndex(0)" style="color:#fff">返回</span>
        </div>
      </div>
      
    </div>
    <el-dialog title="选择分配角色" :visible.sync="dialogTableVisible" width="30%" :show-close="false">
      <el-table :data="gridData" @selection-change="handleSelectionChange1" ref="tb" @select-all="onSelectAll">
        <el-table-column type="selection" width="80px" align="center" header-align="center"></el-table-column>  
        <el-table-column property="roleName" label="角色名称" ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script src="./AssignUser.js"></script>

<style scoped lang="scss">
  @import './AssignUser.scss';
</style>
