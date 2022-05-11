<!--
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-10 23:41:10
 * @LastEditTime: 2021-08-27 11:03:00
-->
<template>
    <div class="editProject">
        <div class="editWapper">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="项目名称" prop="projectName">
                                <el-input v-model="ruleForm.projectName"></el-input>
                            </el-form-item>
                        </el-col>
                        
                        <el-col :span="6">
                            <el-form-item label="建筑面积" prop="area">
                                <el-input v-model="ruleForm.area" type="number"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="施工单位" prop="consOrg">
                                <el-input v-model="ruleForm.consOrg"></el-input>
                            </el-form-item>
                        </el-col>   
                        <el-col :span="6">
                            <el-form-item label="项目造价(万)" prop="cost">
                                <el-input v-model="ruleForm.cost" type="number"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="监理单位" prop="supervisorUnit">
                                <el-input v-model="ruleForm.supervisorUnit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="开工日期" prop="startTime">
                                <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="ruleForm.startTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="建设单位" prop="constructionUnit">
                                <el-input v-model="ruleForm.constructionUnit" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="竣工日期" prop="finishTime">
                                <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="ruleForm.finishTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="设计单位" prop="designUnit">
                                <el-input v-model="ruleForm.designUnit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="项目分类" prop="projectType">
                                <el-select v-model="ruleForm.projectType" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.dicKey"
                                        :label="item.dicValue"
                                        :value="item.dicKey">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="勘察单位" prop="reconnaissanceUnit">
                                <el-input v-model="ruleForm.reconnaissanceUnit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="项目区域" prop="region">
                                <!-- 省市区 -->
                                <div class="block">
                                <el-cascader
                                    placeholder="请选择省市区"
                                    v-if="selected"
                                    ref="cascaderRef"
                                    @change="onChangeAddress"
                                    v-model="ruleForm.region"
                                    :options="address"></el-cascader>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="经度" prop="longitude">
                                <el-input v-model="ruleForm.longitude" type="number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="纬度" prop="latitude">
                                <el-input v-model="ruleForm.latitude" type="number"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="安监备案号" prop="ssrNum">
                                <el-input v-model="ruleForm.ssrNum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系方式" prop="customerPhone">
                                <el-input v-model="ruleForm.customerPhone"></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-col>
                </el-row>

                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="安装时间" prop="installTime">
                                <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="ruleForm.installTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="扬尘接入时间" prop="ycTurnTime">
                                <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="ruleForm.ycTurnTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        
                    </el-col>
                </el-row>

                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="门禁接入时间" prop="mjTurnTime">
                                <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="ruleForm.mjTurnTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="视频接入时间" prop="spTurnTime">
                                <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="ruleForm.spTurnTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        
                    </el-col>
                </el-row>

                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="运渣车接入时间" prop="yzcTurnTime">
                                <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="ruleForm.yzcTurnTime" style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="销售人员" prop="salesmanId">
                                <!-- <el-input v-model="ruleForm.salesman"></el-input> -->
                                <div class="fw">
                                    <el-select v-model="ruleForm.salesman"  placeholder="请选择" @change="saleManChange">
                                        <el-option v-for="(item,i) of saleList" :key="i" :label="item.name" :value="item.id" />
                                    </el-select>
                                </div>
                            </el-form-item>
                        </el-col>
                        
                    </el-col>
                </el-row>



                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="负责人" prop="customerName">
                                <el-input v-model="ruleForm.customerName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="备注" prop="remark">
                                <el-input v-model="ruleForm.remark"></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="是否自动下发人脸" label-width="160px" prop="authFace">
                                <el-radio-group v-model="ruleForm.authFace">
                                <el-radio label=1 ><span>是</span></el-radio>
                                <el-radio label=0 ><span>否</span></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="24" class="btnWapper">
                        <el-button @click="resetForm('ruleForm')" style="margin-right:50px">取消</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')" >提交</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
    import common from '@/components/common'
    import {projectUpdate,projectAdd,addProjectList,getSaleMan} from '@/api/api.js'
    export default {
        data() {
            var jd = (rule, value, callback) => {
                var longrg = /^(([1-9]{1}\d{0,180})|(0{1})).((\d{6})|(\d{0}))$/;
                if (value == '' ) {
                    callback(new Error('请输入经度'));
                } else if(!longrg.test(value)){
                    callback(new Error('经度整数部分为0-180,小数部分需精准到6位'));
                }else {
                    callback();
                }
            };
            var wd = (rule, value, callback) => {
                var latreg = /^(([1-9]{1}\d{0,90})|(0{1})).((\d{6})|(\d{0}))$/;
                if (value == '' ) {
                    callback(new Error('请输入经度'));
                } else if(!latreg.test(value)){
                    callback(new Error('纬度整数部分为0-90,小数部分需精准到6位'));
                }else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                var pattern = new RegExp("^1[3456789][0-9]{9}$", 'i');
                if(value==''){
                    callback(new Error('请输入手机号'));
                }else if (!pattern.test(value)) {
                    callback(new Error('请输入正确的手机号'));
                }else {
                    callback();
                }
            };
            var validatePass1 = (rule, value, callback) => {
                value = value == null?'':value;
                let date = new Date(this.ruleForm.startTime);
                let time1 = date.getTime() / 1000;
                let date2 = new Date(value==''?0:value);
                let time2 = date2.getTime() / 1000;
                if(value !='' && time1 >= time2){
                    callback(new Error('开工日期不能大于竣工日期'));
                }else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                value = value == null?'':value;
                if(this.ruleForm.finishTime && value == ''){
                    callback(new Error('请选择开工日期'));
                }else {
                    callback();
                }
            };
            return {
                checkList:[],
                checkValue:[],
                userName:'',
                selected:true,
                ruleForm: {
                    projectName: '',
                    projectType: '',
                    longitude:'',
                    latitude: '',
                    customerPhone:'',
                    authFace:"1",
                    area:'',
                    consOrg:'',
                    cost:'',
                    supervisorUnit:'',
                    constructionUnit:'',
                    designUnit:'',
                    reconnaissanceUnit:'',
                    startTime:'',
                    finishTime:'',
                    province:'',
                    city:'',
                    district:'',
                    ssrNum:'',
                    customerName:'',
                    remark:'',
                    installTime:'',
                    ycTurnTime:'',
                    mjTurnTime:'',
                    spTurnTime:'',
                    yzcTurnTime:'',
                    salesmanId:''
                },
                saleList:[],
                options: [],
                address:common.province,
                rules: {
                    projectName: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' }
                    ],
                    projectType: [
                        { required: true, message: '请选择项目分类', trigger: 'blur' }
                    ],
                    longitude: [
                        {required: true, validator : jd, trigger: 'blur' }
                    ],
                    latitude: [
                        {required: true, validator : wd, trigger: 'blur' }
                    ],
                    customerPhone: [
                        { required: true,validator: validatePass, trigger: 'blur' }
                    ],
                    authFace: [
                        { required: true, message: '请选择是否自动下发人脸', trigger: 'blur' }
                    ],
                    finishTime: [
                        { validator: validatePass1, trigger: 'blur' }
                    ],
                    startTime: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    consOrg: [
                        { required: true, message: '请输入施工单位', trigger: 'blur' }
                    ],
                    customerName: [
                        { required: true, message: '请输入负责人', trigger: 'blur' }
                    ],
                    salesmanId: [
                        { required: true, message: '请选择销售人员', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择项目区域', trigger: 'blur' }
                    ],
                }  
            }
        },
        methods: {
            onChangeAddress(e){
                this.selected  = false;
                let nodeContent = this.$refs['cascaderRef'].getCheckedNodes();
                let dq = nodeContent[0].path;
                this.ruleForm.province = dq[0];
                this.ruleForm.city = dq[1]==undefined?'':dq[1];
                this.ruleForm.district = dq[2]==undefined?'':dq[2];
                this.ruleForm.region = dq;
                console.log(dq)
                this.ruleForm.salesmanId = this.ruleForm.salesmanId*1;
                this.selected  = true;
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    let that = this;
                    this.ruleForm.projectType = this.ruleForm.projectType;
                    this.ruleForm.authFace = parseInt(this.ruleForm.authFace);
                    this.ruleForm.latitude = parseFloat(this.ruleForm.latitude);
                    this.ruleForm.longitude = parseFloat(this.ruleForm.longitude);
                    delete this.ruleForm.region;
                    let param = {
                        userName :this.userName,
                        project : this.ruleForm
                    }
                    if(this.$route.query.data==undefined){
                        projectAdd(param).then(res => {
                        if(res.code == 200){
                            this.$alert('添加成功', '提示', {
                            confirmButtonText: '确定',
                            showClose:false,
                            closeOnClickModal:false,
                            closeOnPressEscape:false,
                            closeOnHashChange:false,
                            callback: action => {
                                that.resetForm('ruleForm');
                            }
                            });
                          
                        }else{
                          this.$message.error(res.message);
                        }
                      })
                      .catch(() => {})
                    }else{
                        projectUpdate(this.ruleForm).then(res => {
                        if(res.code == 200){
                              this.$alert('修改成功', '提示', {
                                confirmButtonText: '确定',
                                showClose:false,
                                closeOnClickModal:false,
                                closeOnPressEscape:false,
                                closeOnHashChange:false,
                                callback: action => {
                                that.resetForm('ruleForm');
                                }
                            });
                        }else{
                          this.$message.error(res.message);
                        }
                      })
                      .catch(() => {})
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$router.push('/projectManage/projectList')
            },

            //展示角色
            showList(){
                let that = this;
                let params = {
                };
                addProjectList(params).then(res => {
                    if(res.code == 200){
                        that.checkList = res.data.platformList;
                        this.options = res.data.projectTypeList;
                    }else{
                      this.$message.error(res.message);
                    }
                  })
                  .catch(() => {})
            },

        //展示角色
            quertSaleList(){
                let that = this;
                let params = {
                };
                getSaleMan(params).then(res => {
                    if(res.code == 200){
                        that.saleList = res.data;
                        res.data.forEach(function(item,index,arr){
                            if(item.id==that.ruleForm.salesmanId){
                                that.ruleForm.salesman = item.name
                            }
                        })
                    }else{
                      this.$message.error(res.message);
                    }
                  })
                  .catch(() => {})
            },

            saleManChange(e){
                this.ruleForm.salesmanId = e;
            }
        },

        mounted() {
            this.userName = this.$route.query.id
            this.options = JSON.parse(this.$route.query.options)
            if(this.$route.query.data!=undefined){
                this.ruleForm = JSON.parse(this.$route.query.data)
                this.ruleForm.authFace = this.ruleForm.authFace+'';
                this.ruleForm.region = [this.ruleForm.province,this.ruleForm.city,this.ruleForm.district]
                console.log(this.ruleForm.region)
            }
            this.quertSaleList();
        }
    }

</script>
<style lang="scss">
    .editProject{
        padding: 0 15px 15px;
        background-color: #f5f6f7;
        height: calc(100% - 30px);
        overflow-y: auto;
        .el-row{
            margin-bottom: 20px;
        }
        .editWapper{
            padding: 15px;
            background-color: #fff;
            .title{
                align-items: flex-start;
                margin-bottom: 10px;
                span:first-child{
                    font-size: 16px;
                    font-weight: bold;
                }
                .bz{
                    font-size: 12px;
                    color: #ccc;
                    height: 30px;
                    line-height: 30px;
                }
            }
            
            .el-select{
                width: 100%;
            }
            .sureBtn{
                background-color:#009688;
                border: 1px solid transparent;
                color: #fff;
            }
        }

        .el-cascader--medium{
            width: 100%;
        }

        .btnWapper{
            padding-left: 80px;
            margin-top: 40px;
        }
    }
</style>