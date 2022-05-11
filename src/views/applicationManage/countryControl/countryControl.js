/*
 * @Author: your name
 * @Date: 2021-07-22 11:02:35
 * @LastEditTime: 2021-08-26 19:58:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\applicationManage\countryControl\countryControl.js
 */
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
import {PCSDataList,PCSDataEdit} from '@/api/api.js'
// import { parseFloat } from 'core-js/core/number'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入aqi值'));
      } else if(!(/(^[1-9]\d*$)/.test(value))){
        callback(new Error('aqi值应为正整数'));
      }else{
        callback();
      }
    };
    return {
      dialogVisible: false,
      tableData: [],
      dialogFormVisible: false,
      pageSize:10,
      form: {
        aqi: '',
        pm10: '',
        pm2: '',
        fahrenheit: '',
        noise:''
      },
      formLabelWidth: '80px',
        loading :true,
        rules: {
            aqi: [
                { required: true, validator: validatePass, trigger: 'blur' }
            ],
            pm10: [
                { required: true, message: '请输入pm10值', trigger: 'blur' }
            ],
            pm2: [
                { required: true, message: '请输入pm2.5值', trigger: 'blur' }
            ],
            fahrenheit: [
                { required: true, message: '请输入温度值', trigger: 'blur' }
            ],
            noise: [
                { required: true, message: '请输入噪音值', trigger: 'blur' }
            ]
        }  ,
        page:1,
        total:0,
        dataValue:'',
        id:'',
        name:'',
    }
  },
  components:{
    globalProject
  },
  methods: {

    makeIndex(index) {
			return (this.page - 1) * this.pageSize + index + 1
		},

    changeInput(e,tag) {
      var regu = "^[0-9]+\.?[0-9]*$";
      var re = new RegExp(regu);
      if (!re.test(e)) {
        // input 框绑定的内容为空
        if(tag==1){
          this.form.pm10 = '';
        }else if(tag==2){
          this.form.pm2 = '';
        }else if(tag==3){
          this.form.fahrenheit = '';
        }else if(tag==4){
          this.form.noise = '';
        }
      }
    },

    cancle(){
      this.dialogFormVisible = false;
      this.$refs.ruleForm.resetFields();
    },
    
    handleOut(id) {
      this.$confirm('确认删除该项目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this;
        let params = {
          proid:id
        };
        this.loading = true;
        projectDel([id]).then(res => {
          if(res.code == 200){
            this.loading = false;
            this.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              showClose:false,
              closeOnClickModal:false,
              closeOnPressEscape:false,
              closeOnHashChange:false,
              callback: action => {
                that.showList();
              }
            });
          }else{
            this.$message.error(res.message);
            this.loading = false;
          }
        })
        .catch(() => {this.loading = false;})
      }).catch(() => {
        return        
      });  
      
    },

    editData(){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let that = this;
          this.form.aqi = parseInt(this.form.aqi);
          this.form.pm10 = parseFloat(this.form.pm10);
          this.form.pm2 = parseFloat(this.form.pm2);
          this.form.noise = parseFloat(this.form.noise);
          this.form.fahrenheit = parseFloat(this.form.fahrenheit);
          PCSDataEdit(this.form).then(res => {
            this.loading = false;
            if(res.code == 200){
              this.$alert('修改成功', '提示', {
                confirmButtonText: '确定',
                showClose:false,
                closeOnClickModal:false,
                closeOnPressEscape:false,
                closeOnHashChange:false,
                callback: action => {
                  that.dialogFormVisible = false;
                  that.showList();
                }
              });
            }else{
              this.$message.error(res.message);
              this.loading = false;
            }
          })
          .catch(() => {this.loading = false;})
        } else {
          return false;
        }
      });
      
    },

    editDataSure(row){
      this.form.aqi = row.aqi;
      this.form.pm10 = row.pm10;
      this.form.pm2 = row.pm2;
      this.form.noise = row.noise;
      this.form.fahrenheit = row.fahrenheit;
      this.form.number = row.number;
      this.dialogFormVisible = true;
    },

    handleCurrentChange(val) {
      this.page = val;
      this.showList()
    },

    handleSizeChange(val) {
			this.pageSize = val;
			this.showList();
		},

    //展示角色
    showList(){
      let that = this;
      let params = {
        pageNumber:that.page,
        limit:that.pageSize,
        name:that.name,
        number:that.id,
        dataValue: that.dataValue
      };
      this.loading = true;
      PCSDataList(params).then(res => {
        this.loading = false;
        if(res.code == 200){
          that.tableData = res.data.pageResult.items;
          that.loading = false;
          that.total = res.data.pageResult.total;
          console.log(that.tableData)
        }else{
          this.$message.error(res.message);
          this.loading = false;
        }
      })
      .catch(() => {this.loading = false;})
    },
  },
  mounted() {
    this.showList();
    this.buttonList =  this.$store.getters.button
  }
}
