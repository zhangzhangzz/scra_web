/*
 * @Author: your name
 * @Date: 2021-07-29 14:58:49
 * @LastEditTime: 2021-12-03 10:03:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\applicationManage\dataSet\dataSet.js
 */
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
import {ycDataManageConfig,configType,configEditStatus,configEdit} from '@/api/api.js'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      var reg = /^([1-9][0-9]*)$/;
      console.log(value!=='' && !reg.test(value) )
      if(value!=='' && !reg.test(parseInt(value))){
        callback(new Error('请输入10以上的正整数'));
      }else if (value!=='' && parseInt(value)<=10) {
          callback(new Error('请输入10以上的正整数'));
        }else {
          callback();
        }
      };
    return {
      tableData: [],
      dialogFormVisible: false,
      loading:true,
      loading1:false,
      name:'',
      form: {
        deviceId: '',
        conType:'',
        chinaStandardNumber: '',
        ruleId: '',
        triggerVal: '',
        floatVal:'',
        exceedStandardFrequency:'',
        highest:'',
        ncv:''
      },
      formLabelWidth: '90px',
        loading :true,
        rules: {
            chinaStandardNumber: [
                { required: true, message: '请输入国控编号', trigger: 'blur' }
            ],
            ruleId: [
                { required: true, message: '请输入国控规则', trigger: 'blur' }
            ],
            triggerVal: [
                { required: true, message: '请输入触发值', trigger: 'blur' }
            ],
            floatVal: [
                { required: true, message: '请输入随机浮动值', trigger: 'blur' }
            ],
            exceedStandardFrequency: [
                { required: true, message: '请输入超标预期次数', trigger: 'blur' }
            ],
            highest: [
                { required: true, message: '请输入阈值', trigger: 'blur' }
            ],
            ncv:[
                { validator: validatePass, trigger: 'blur' }
            ]
        }  ,
        typeList:[]
    }
  },
  components:{
    globalProject
  },
  methods: {

    handleCurrentChange(val) {
      this.page = val;
      this.showList()
    },

    edit(row){
        this.form.conType = row.conType;
        this.form.chinaStandardNumber = row.chinaStandardNumber;
        this.form.floatVal = row.floatVal;
        this.form.highest = row.highest;
        this.form.ruleId = row.ruleId;
        this.form.triggerVal = row.triggerVal;
        this.form.deviceId = row.deviceId;
        this.form.ncv = '';
        this.form.exceedStandardFrequency = row.exceedStandardFrequency;
        this.dialogFormVisible = true;
        this.name = this.queryDeviceType(row.conType);
    },

    queryDeviceType(type){
        if(type==null)
        return
        let name 
        this.typeList.forEach(function(item,index,arr){
            if(item.dicKey == type){
                name = item.dicValue
                return
            }
        })
        return name
    },

    //修改状态
    changeRole(e,row){
        this.editStatus(e,row);
    },

    editData(){
        this.$refs.form.validate((valid) => {
            if (valid) {
                this.loading1 = true;
                this.form.ncv = this.form.ncv!=''?this.form.ncv*1:'';
                configEdit(this.form).then(res => {
                this.loading1 = false;
                this.dialogFormVisible = false;
                if(res.code == 200){
                  this.$alert(res.message, '提示', {
                    confirmButtonText: '确定',
                    showClose:false,
                    closeOnClickModal:false,
                    closeOnPressEscape:false,
                    closeOnHashChange:false,
                    callback: action => {
                        this.showList();
                    }
                    });
                }else{
                  this.$message.error(res.message);
                    this.loading1 = false;
                }
              })
              .catch(() => {this.loading1 = false;})
            } else {
              console.log('error submit!!');
              return false;
            }
        });
    },

    editStatus(e,row){
        let params = {
            deviceId:row.deviceId,
            conType:row.conType,
            enableControl:e
        };
        this.loading = true;
        configEditStatus(params).then(res => {
        this.loading = false;
        if(res.code == 200){
          this.$alert(res.message, '提示', {
            confirmButtonText: '确定',
            showClose:false,
            closeOnClickModal:false,
            closeOnPressEscape:false,
            closeOnHashChange:false,
            callback: action => {
                this.showList();
            }
            });
        }else{
          this.$message.error(res.message);
            this.loading = false;
        }
      })
      .catch(() => {this.loading = false;})
    },

    //展示角色
    showType(){
        let that = this;
        let params = {
        };
        configType(params).then(res => {
            if(res.code == 200){
                that.typeList = res.data;
            }else{
              this.$message.error(res.message);
            }
          })
          .catch(() => {})
    },
   
    //展示角色
    showList(){
      let that = this;
      let params = {
        deviceId:that.$route.query.id
      };
      this.loading = true;
      ycDataManageConfig(params).then(res => {
        this.loading = false;
        if(res.code == 200){
          that.tableData = res.data;
          that.showType();
          that.loading = false;
        }else{
          this.$message.error(res.message);
          this.loading = false;
        }
      })
      .catch(() => {this.loading = false;})
    },
  },
  mounted() {
      this.form.deviceId = this.$route.query.id
    this.showList();
    this.buttonList =  this.$store.getters.button
  }
}
