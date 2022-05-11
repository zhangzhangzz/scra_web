<template>
  <div style="height:100%;overflow-y: auto;" class="roleAdmin">
    <div class="all" style="min-height:calc(100% - 47px);">
        <ul class="sys_top">
          <li class="sys_top_1 row">
            <span class="spanM" style="line-height:36px">角色名称</span>
            <div class="width:199px"><el-input v-model="roleNameFirst" placeholder="请输入菜单名称" suffix-icon="el-icon-search" @input="inputChange"></el-input></div>
          </li>
          <div class="firBtn"  @click="editRole(1)" v-if="buttonList.includes('roleAddBtn')" style="margin-right:0" >新增</div>
        </ul>

        <div class="sys_bottom">
          <!-- <ul class="sys_bottom_1">
            <li class="sys_bottom_1_add" @click="getIndex(1)" v-if="buttonList.includes('roleAddBtn')">
              <img src="../../../assets/images/button/add.png">
              <span>新增</span>
            </li>
            <li class="sys_bottom_1_del">
              <img src="../../../assets/images/button/del.png">
              <span>删除</span>
            </li>
            <li class="sys_bottom_1_export">
              <img src="../../../assets/images/button/export.png">
              <span>导出</span>
            </li>
          </ul> -->
          <template>
            <el-table
              :data="tableData"
              v-loading="loading"
              class="customer-no-border-table"
              border
              :header-cell-style="{background:'#4B5365',color:'#fff'}"
              style="width: 100%"
            >
              <el-table-column
                align="center"
                type="index"
                label="序号"
                :index="makeIndex"
                min-width="40"
              />
              <el-table-column
                align="center"
                prop="roleName"
                label="角色名称"
                min-width="150"
              />
              <el-table-column
                align="center"
                prop="createBy"
                label="创建者"
                min-width="150"
              />
              <el-table-column
                align="center"
                prop="createTime"
                label="创建时间"
                min-width="150"
              />
              <el-table-column
                align="center"
                prop="updateBy"
                label="修改者"
                min-width="150"
              />
              <el-table-column
                align="center"
                prop="updateTime"
                label="修改时间"
                min-width="150"
              />
               
              <el-table-column
                align="center"
                prop="remark"
                label="备注"
                min-width="150"
              />
              <!-- <el-table-column
                align="center"
                min-width="150"
                label="角色禁用状态"
                v-if="buttonList.includes('roleChangeStatusBtn')"
              >
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.roleStates"
                    :active-value="0"
                    :inactive-value="1"
                    @change="changeRole($event,scope.row)"
                  />
                </template>
              </el-table-column> -->
              <el-table-column
                align="center"
                min-width="150"
                label="角色状态"
              >
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.roleStatus"
                    :active-value="0"
                    :inactive-value="1"
                    @change="changeRole($event,scope.row)"
                  />
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作"
                width="350"
              >
              <template slot-scope="scope">
                <el-button  @click="showUser(scope.row.roleId)" type="text" size="small" v-if="buttonList.includes('roleSetUserBtn')">分配用户</el-button>
                <el-button  @click="editRole(0,scope.row)" type="text" size="small" v-if="buttonList.includes('roleEditBtn')">编辑</el-button>
                <el-button  @click="fpMenu(scope.row.roleId,scope.row.roleName)" type="text" size="small" v-if="buttonList.includes('roleSetMenuBtn')">分配菜单</el-button>
                <el-button  @click="delRole(scope.row.roleId)" type="text" size="small"  style="color:red" v-if="buttonList.includes('roleDelBtn')">删除</el-button>



                <!-- <ul class="table_button" >
                  <li class="table_button_del" @click="delRole(scope.row.roleId)" v-if="buttonList.includes('roleDelBtn')"   :style="{visibility:scope.row.roleName=='超级管理员'?'hidden':''}">
                    <img src="../../../assets/images/button/del.png">
                    <span>删除</span>
                  </li>
                  <li class="table_button_del"  @click="editRole(scope.row)" v-if="buttonList.includes('roleEditBtn')" >
                    <img src="../../../assets/images/button/del.png">
                    <span>编辑</span>
                  </li>
                  <li class="table_button_more" @click="fpjs(scope.row.roleId)" v-if="buttonList.includes('roleSetUserBtn')" >
                    <img src="../../../assets/images/button/add.png">
                    <span>分配用户</span>
                  </li>
                  <li class="table_button_more" @click="fpMenu(scope.row.roleId,scope.row.roleName)" v-if="buttonList.includes('roleSetMenuBtn')">
                    <img src="../../../assets/images/button/add.png">
                    <span>分配菜单</span>
                  </li>
                </ul> -->
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
      @size-change="handleSizeChange"
      :page-size="10"
      :total="total">
    </el-pagination>
    <el-dialog :title="update+'角色'" :visible.sync="dialogFormVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%" >
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole" v-loading="loading1">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配用户" :visible.sync="dialogFormVisible2" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="35%" >
      <el-transfer v-model="value1" :data="data1" :titles="['未授权', '已授权']" filterable :filter-method="filterMethod" filter-placeholder="请输入菜单名称" @change="handleChange"></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="assUser">确 定</el-button>
      </div>
    </el-dialog>


    <role-add v-if="index==1" @getIndex="getIndex2" :data="data"/>
    <role-modify v-if="index==2" @getIndex="getIndex" />
    <assign-user v-if="index==3" @getIndex="getIndex" :id="roleid" :data="tableData1"/>
    <roleMenu v-if="index==4" @getIndex="getIndex" :id="roleid" :name="roleName"/>
  </div>

</template>

<script src="./RoleAdmin.js"></script>

<style lang="scss" >
  @import "./RoleAdmin.scss"
</style>
