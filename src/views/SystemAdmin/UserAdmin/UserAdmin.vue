<template>
  <div class="userAdmin" style="height:100%;overflow-y: auto;">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-if="user.sysRole.roleId==30" style="min-height:calc(100% - 47px)">
      <el-tab-pane :label="ut.dicValue" :name="ut.dicKey+''" v-for="(ut,index) in userType" :key="index"> 
          <div class="all" style="min-height:100%">
            <ul class="sys_top">
              <li class="sys_top_1 row">
                <span class="spanM" style="line-height:36px">{{ut.dicKey==1?'项目名称':'公司名称'}}</span>
                <div class="width:199px"><el-input v-model="input1" :placeholder="ut.dicKey==1?'请输入项目名称':'请输入公司名称'" suffix-icon="el-icon-search"></el-input></div>
              </li>
              <li class="sys_top_1 row" v-if="user.userType!=1">
                <span class="spanM" style="line-height:36px">{{ut.dicKey==1?'项目账号':'公司账号'}}</span>
                <div class="width:199px"><el-input v-model="input2" :placeholder="ut.dicKey==1?'请输入项目账号':'请输入公司账号'" suffix-icon="el-icon-search"></el-input></div>
              </li>
              <div class="thirdBtn"  @click="showList" style="margin:0 20px 0 auto" >查询</div>
              <div class="firBtn"  @click="addUser" style="margin:0" >新增</div>
            </ul>

            <div class="sys_bottom">
                <el-table
                  :data="tableData" border
                  class="customer-no-border-table"
                  :header-cell-style="{background:'#4B5365',color:'#fff'}"
                  v-loading="loading"
                  style="width: 100%"
                >
                  <el-table-column
                    align="center"
                    type="index"
                    :index="makeIndex"
                    label="序号"
                    width="60"
                  />
                  <el-table-column
                    align="center"
                    prop="userName"
                    label="用户名称"
                    min-width="150"
                  />
                
                  <el-table-column
                    align="center"
                    :label="ut.dicKey==1?'项目名称':'公司名称' "
                    min-width="250"
                  >
                    <template slot-scope="scope">
                      {{ut.dicKey==1?scope.row.projectName:scope.row.company}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="userType"
                    label="用户类型"
                    min-width="100"
                  >
                    <template slot-scope="scope">
                      {{queryType(scope.row.userType,0)}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="phone"
                    label="电话号码"
                    min-width="150"
                  />
                  <el-table-column
                    align="center"
                    prop="email"
                    label="邮箱"
                    min-width="170"
                  />
                  <!-- <el-table-column
                    align="center"
                    label="用户禁用状态"
                    prop="userStatus"
                    min-width="80"
                    v-if="buttonList.includes('userDisableBtn')"
                  > -->
                  <el-table-column
                    align="center"
                    label="用户状态"
                    prop="userStatus"
                    min-width="80"
                  >
                    <template slot-scope="scope">
                      <el-switch
                        v-model="scope.row.userStatus"
                        @change="changeRole($event,scope.row)"
                        :active-value="0"
                        :inactive-value="1"
                        >
                      </el-switch>
                    </template>
                    
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="createTime"
                    label="创建时间"
                    min-width="150"
                  />
                  <el-table-column
                    align="center"
                    label="操作"
                    min-width="300"
                  >
                    <template slot-scope="scope">
                        <el-button @click="showProject(scope.row)" type="text" size="small" v-if="buttonList.includes('userEditMailBtn') && ut.dicKey!=1" >分配项目</el-button>
                        <el-button @click="bindEmail(scope.row)" type="text" size="small"  v-if="buttonList.includes('userEditMailBtn')">绑定邮箱</el-button>
                        <el-button @click="resetPwd(scope.row)" type="text" size="small" v-if="buttonList.includes('userEditPwdBtn') && user.userType!==1">重置密码</el-button>
                        <el-button @click="bindPhone(scope.row)" type="text" size="small"  v-if="buttonList.includes('userEditPhoneBtn')">绑定手机</el-button>
                        <el-button @click="delUser(scope.row.userName)" type="text" size="small" v-if="buttonList.includes('userDelBtn')">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="all" style="min-height:calc(100% - 47px);"  v-if="user.sysRole.roleId!=30">
      <ul class="sys_top" v-if="user.userType!==1">
        <li class="sys_top_1 row">
          <span class="spanM" style="line-height:36px">项目名称</span>
          <div class="width:199px"><el-input v-model="input1" placeholder="请输入项目名称" suffix-icon="el-icon-search"></el-input></div>
        </li>
        <li class="sys_top_1 row">
          <span class="spanM" style="line-height:36px">项目账号</span>
          <div class="width:199px"><el-input v-model="input2" placeholder="请输入项目账号" suffix-icon="el-icon-search"></el-input></div>
        </li>
        <div class="thirdBtn"  @click="showList" style="margin:0 20px 0 auto" >查询</div>
        <div class="firBtn"  @click="addUser" style="margin:0" >新增</div>
      </ul>

      <div class="sys_bottom">
        <el-table
          :data="tableData" border
          class="customer-no-border-table"
          :header-cell-style="{background:'#4B5365',color:'#fff'}"
          v-loading="loading"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            type="index"
            :index="makeIndex"
            label="序号"
            width="60"
          />
          <el-table-column
            align="center"
            prop="userName"
            label="用户名称"
            min-width="150"
          />
        
          <el-table-column
            align="center"
            label="项目名称"
            min-width="250"
          >
            <template slot-scope="scope">
              {{scope.row.projectName}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="userType"
            label="用户类型"
            min-width="100"
          >
            <template slot-scope="scope">
              {{queryType(1,0)}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="phone"
            label="电话号码"
            min-width="150"
          />
          <el-table-column
            align="center"
            prop="email"
            label="邮箱"
            min-width="170"
          />
          <!-- <el-table-column
            align="center"
            label="用户禁用状态"
            prop="userStatus"
            min-width="80"
            v-if="buttonList.includes('userDisableBtn')"
          > -->
          <el-table-column
            align="center"
            label="用户状态"
            prop="userStatus"
            min-width="80"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.userStatus"
                @change="changeRole($event,scope.row)"
                :active-value="0"
                :inactive-value="1"
                >
              </el-switch>
            </template>
            
          </el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="创建时间"
            min-width="150"
          />
          <el-table-column
            align="center"
            label="操作"
            min-width="300"
          >
            <template slot-scope="scope">
                <!-- <el-button @click="dialogFormVisible3 = true" type="text" size="small" v-if="buttonList.includes('userEditMailBtn') && user.userType!=1">分配项目</el-button> -->
                <el-button @click="bindEmail(scope.row)" type="text" size="small"  v-if="buttonList.includes('userEditMailBtn')">绑定邮箱</el-button>
                <el-button @click="resetPwd(scope.row)" type="text" size="small" v-if="buttonList.includes('userEditPwdBtn')">重置密码</el-button>
                <el-button @click="bindPhone(scope.row)" type="text" size="small"  v-if="buttonList.includes('userEditPhoneBtn')">绑定手机</el-button>
                <el-button @click="delUser(scope.row.userName)" type="text" size="small" style="color:red" v-if="buttonList.includes('userDelBtn')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
    <el-pagination 
      class="pageLine"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-size="pageSize"
      :total="total">
    </el-pagination>

    <el-dialog title="新增账号" :visible.sync="dialogFormVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%" >
      <el-form :model="form" >
        <el-form-item label="项目账号" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off" :disabled="this.activeName=='1'?true:false"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" :label-width="formLabelWidth">
          <el-select v-model="addType"  disabled>
            <el-option :label="addType" :value="addType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="邮件地址" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" placeholder="请输入邮件地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="addUserForm" v-loading="loading1">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="绑定手机" :visible.sync="dialogFormVisible1" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%" >
      <el-form :model="form">
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input prefix-icon="el-icon-mobile" v-model="phone" autocomplete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <div class="row fw">
            <el-input prefix-icon="el-icon-chat-dot-round" v-model="code" autocomplete="off" placeholder="请输入验证码"></el-input>
            <el-button type="primary" size="mini" @click="timeClock(1)">{{content}}</el-button>
          </div>
          
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleBind">取 消</el-button>
        <el-button type="primary" @click="bindPhoneSure">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="绑定邮箱" :visible.sync="dialogFormVisible2" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="25%" >
      <el-form :model="form">
        <el-form-item label="邮箱地址" :label-width="formLabelWidth">
          <el-input prefix-icon="el-icon-message" v-model="email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <div class="row fw">
            <el-input prefix-icon="el-icon-chat-dot-round" v-model="code" autocomplete="off" placeholder="请输入验证码"></el-input>
            <el-button type="primary" size="mini" @click="timeClock(0)">{{content}}</el-button>
          </div>
          
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleBind">取 消</el-button>
        <el-button type="primary" @click="bindEmailSure">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配项目" :visible.sync="dialogFormVisible3" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="35%" >
      <el-transfer v-model="value" :data="data" :titles="['未分配', '已分配']" filterable :filter-method="filterMethod" filter-placeholder="请输入菜单名称" @change="handleChange"></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="assUser">确 定</el-button>
      </div>
    </el-dialog>

    <phone-first v-if="index==1" @toIndex="getIndex2" :data="rowData"/>
    <phone-second v-if="index==2" @toIndex="getIndex2" />
    <password-first v-if="index==3" @toIndex="getIndex2" :data="rowData"/>
    <mail-first v-if="index==4" @toIndex="getIndex2" :email="rowData"/>
    <mail-second v-if="index==5" @toIndex="getIndex2" />
    <assign-roles v-if="index==6" @toIndex="getIndex2" />
    <assign-Items v-if="index==7" @toIndex="getIndex2" :userid="userid"/>
  </div>

</template>

<script src="./UserAdmin.js"></script>

<style lang="scss" scoped>
  @import "./UserAdmin.scss"
</style>
