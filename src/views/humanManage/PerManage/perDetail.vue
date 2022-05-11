<!--
 * @Author: your name
 * @Date: 2021-08-12 14:47:11
 * @LastEditTime: 2021-11-23 15:30:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\humanManage\PerManage\perDetail.vue
-->
<template>
  <div v-loading="loading" style="padding:10px 20px;overflow-y: auto;height: calc(100% - 20px);" class="perDetail">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="人员信息" name="1">
                <div class="columns" style="padding:20px">
                    <div class="lineBox row">
                        <div class="row">
                            <span>姓名：</span>
                            <span>{{ruleForm.persName}}</span>
                        </div>
                        <div class="row">
                            <span>性别：</span>
                            <span>{{ruleForm.gender}}</span>
                        </div>
                        <div class="row" v-if="ruleForm.nations!=null||ruleForm.nations!=undefined">
                            <span>民族：</span>
                            <span :style="{color:ruleForm.nations.isEthnicHan?'#888':'red'}">{{ruleForm.nations.nation}}</span>
                        </div>
                        <div class="row">
                            <span>身份证号码：</span>
                            <span>{{ruleForm.idno}}</span>
                        </div>
                    </div>
                    <div class="lineBox row" style="margin-top:10px">
                        <div class="row">
                            <span>出生日期：</span>
                            <span>{{ruleForm.birthday}}</span>
                        </div>
                        <div class="row">
                            <span>证件有效期：</span>
                            <span>{{ruleForm.idperiod}}</span>
                        </div>
                        <div class="row">
                            <span>发证机关：</span>
                            <span>{{ruleForm.idissue}}</span>
                        </div>
                        <div class="row">
                            <span>地址：</span>
                            <span>{{ruleForm.address}}</span>
                        </div>
                    </div>
                </div>
                
            </el-collapse-item>
            <el-collapse-item title="人员照片" name="2">
                <div class="row" style="padding:20px;font-size:16px">
                    <!-- <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" class="imgUrlWapper">
                    </el-dialog>
                    <el-upload
                        ref="upload"
                        :data="data"   
                        list-type="picture-card"
                        :multiple="true"
                        class="avatar-uploader"
                        action="https://test.bjzstech.com/mall-web/register/userRegistry"
                        :show-file-list="false"
                        :on-change="handlePreview"
                        :auto-upload="false"
                        :limit="3"
                        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                        :before-upload="beforeAvatarUpload">
                            <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{file}">
                            <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt=""
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
                        </el-upload> -->
                        
                        <el-upload
                            action="#"
                            :class="{hide:fileList.length>=3}"
                            list-type="picture-card"
                            :on-change="handlePreview"
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                            :file-list="fileList"
                            :limit="3"
                            :auto-upload="false">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                <img
                                    class="el-upload-list__item-thumbnail"
                                    :src="file.url" alt=""
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
                            <el-dialog :visible.sync="dialogVisible" width="700px" class="imgDialog">
                                <div class="row">
                                    <img style="width:auto;height:400px;margin:auto" :src="dialogImageUrl" alt="">
                                </div>
                            </el-dialog>
                    
                    <div class="columns textWapper">
                        <div>照片示例图</div>
                        <div>1、小于2M</div>
                        <div>2、面部区域像素不低于128x128</div>
                        <div>3、人像大小占整张照片1/3以上</div>
                        <div>4、照片格式支持JPG/JPEG/PNG</div>
                        <div>5、确保照片是正脸，且足够清晰，同一个人最多三张注册照</div>
                    </div>
                    <img src="../../../assets/images/permanage/eg.png" style="height:148px;width:auto">
                </div>
            </el-collapse-item>
            <el-collapse-item title="基本信息" name="3">
                <div class="row lineBox" style="padding:20px">
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="紧急联系人" prop="urgencyName">
                        <el-input v-model="ruleForm.urgencyName"></el-input>
                    </el-form-item>
                    <el-form-item label="紧急联系人电话" prop="urgencyPhone">
                        <el-input v-model="ruleForm.urgencyPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="文化程度" prop="name">
                        <div style="width:185px">
                            <el-select v-model="ruleForm.cultureLevelId" placeholder="请选择文化程度">
                                <el-option :label="s.name" :value="s" v-for="(s,index) in searchList.cultureLevel" :key="index"></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="政治面貌" prop="name">
                        <div style="width:185px">
                            <el-select v-model="ruleForm.region" placeholder="请选择政治面貌">
                                 <el-option :label="s.name" :value="s" v-for="(s,index) in searchList.politicsStatus" :key="index"></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                </div>
            </el-collapse-item>
            <el-collapse-item title="班组信息" name="4">
                <div class="row lineBox" style="padding:20px">
                    <div class="row">
                        <span>入场时间：</span>
                        <span>{{ruleForm.entryTime}}</span>
                    </div>
                    <el-form-item label="主体单位" prop="name">
                        <div style="width:185px">
                            <el-select v-model="ruleForm.region" placeholder="请选择主体单位">
                                <el-option :label="s.name" :value="s" v-for="(s,index) in searchList.unit" :key="index"></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="人员类型" prop="name">
                        <div style="width:185px">
                            <el-select v-model="ruleForm.region" placeholder="请选择人员类型">
                                <el-option :label="s.name" :value="s" v-for="(s,index) in searchList.persType" :key="index"></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="班组" prop="name">
                        <div style="width:185px">
                            <el-select v-model="ruleForm.region" placeholder="请选择班组">
                                <el-option :label="s.name" :value="s" v-for="(s,index) in searchList.team" :key="index"></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="工种" prop="name">
                        <div style="width:185px">
                            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                                <el-option :label="s.name" :value="s" v-for="(s,index) in searchList.work" :key="index"></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                </div>
                
            </el-collapse-item>
            <el-collapse-item title="银行卡信息" name="4">
                <div class="row lineBox" style="padding:20px">
                    <el-form-item label="银行名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="银行卡号" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行号" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </div>
            </el-collapse-item>
        </el-collapse>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="资格证书" name="first">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="劳务银行卡" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="教育培训" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="劳务合同" name="fourth">定时任务补偿</el-tab-pane>
            <el-tab-pane label="工作轨迹" name="fifth">定时任务补偿</el-tab-pane>
        </el-tabs>
        <el-form-item style="margin-top:20px">
            <el-button @click="resetForm('ruleForm')" style="margin-right:20px" type="primary">确定</el-button>
            <el-button  @click="$router.back()">取消</el-button>
            
        </el-form-item>
    </el-form>

  </div>
</template>
<script>
import {perDetails,getTeamAndDictionariesData} from '@/api/api.js'
export default {
  data() {
    return {
      tableData: [],
      loading:false,
      page:1,
      total:0,
      pageSize:10,
      disabled: false,
      ruleForm: {},
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        activeNames: ['1','2','3','4'],
        activeName: 'first',
        data:{},
        user:JSON.parse(localStorage.getItem('user')),
        searchList:[],
        projectId:'',
        dialogImageUrl :[],
        fileImg:[],
        show: 0 ,
        dialogVisible:false,
        fileList:[],
        tag:true
    }
  },
  mounted(){
		this.showList();
        this.getSearchList();
        
	},
  methods: {
    handleRemove(file) {
        let that = this;
        this.$confirm(`确定删除该照片?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fileList.forEach(function(item,index,arr){
            if(item.name === file.name){
                that.fileList.splice(index, 1);
            }
          })
        }).catch(() => {
          
        })
        
    },
    handlePictureCardPreview(file) {
    this.dialogImageUrl = [file.url];
    this.dialogVisible = true;
    },
    handleDownload(file) {
    console.log(file);
    },
    makeIndex(index) {
        return (this.page - 1) * this.pageSize + index + 1
    },

    //手风琴点击效果
    handleChange(val) {
        console.log(val);
    },

    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },

    handleClick(tab, event) {
        console.log(tab, event);
    },

    resetForm(formName) {
        this.$refs[formName].resetFields();
    },

    handlePreview(file,fileList) {
      this.fileList = fileList;
      console.log(fileList )
    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      
    },

    //列表查询
    showList(){
      let that = this;
      that.loading = true;
      let params = {
        persId:that.$route.query.id
      };
      perDetails(params).then(res => {
          if(res.code == 200){
            that.loading = false;
            that.ruleForm = res.data
            res.data.collections.forEach(function(item,index,arr){
                let obj = {};
                obj.url = item
                that.fileList.push(obj)
            })
            console.log(that.dialogImageUrl)    
          }else{
            this.$message.error(res.message);
          }
        })
        .catch(() => {})
    },

    getSearchList(){
      let that = this;
      that.loading = true;
      let params = {
        projectId:that.$route.query.projectId
      };
      getTeamAndDictionariesData(params).then(res => {
          if(res.code == 200){
            that.searchList = res.data;
          }else{
            this.$message.error(res.message);
          }
        })
        .catch(() => {})
    },


  }
}

</script>
<style lang="scss" scoped >
    .perDetail{
        .el-collapse-item__header{
            background-color: #f5f5f5;
            padding: 0 20px;
            height: 35px;
        }

        .el-collapse-item__header.is-active{
            border: none;
        }

        .el-collapse-item__content{
            padding-bottom: 0;
        }

        .el-collapse{
            border: none;
        }

        .lineBox{
            width: 100%;
            .row{
                // width: 15%;
                span{
                    font-size: 13px;
                    line-height: 36px;
                    &:first-child{
                        width: 120px;
                        padding: 0 12px 0 0;
                        text-align: right;
                        color: #606266;
                        font-weight: 700;
                    }
                    &:last-child{
                        color: #888;
                        min-width: 185px;
                    }
                }
            }
        }

        .textWapper{
            margin: 0 20px;
            div{
                width: 100%;
                text-align: left;
            }
        }

        .uploadBox{
            margin-left: 20px;
            width: 148px;
            height: 148px;
            display:none;
            cursor: pointer;
            line-height: 146px;
            vertical-align: top;
            background-color: #fbfdff;
            border: 1px dashed #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
            text-align: center;
        }

        .imgUrlWapper{
            width: 148px;
            height: 148px;
            margin-right: 20px;
        }

        .hide{
            .el-upload--picture-card{
                display: none!important;
            }
        }

        .el-select{
            width: 100%;
        }

        .imgDialog ::v-deep .el-dialog__header{
            height: 40px;
        }

        ::v-deep .el-upload-list__item-thumbnail{
            width: 148px;
            height: 148px;
        }
    }
    
</style>