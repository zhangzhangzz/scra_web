/*
 * @Author: your name
 * @Date: 2021-07-22 13:22:07
 * @LastEditTime: 2021-08-26 20:02:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\applicationManage\dataManage\dataManage.js
 */
import globalProject from '../../../components/custom/globalProject/globalProject.vue'
import {ycDataManage} from '@/api/api.js'
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      dialogFormVisible: false,
      form: {
        sqzh: '',
        sqmy: '',
        sbxh: '',
        tbbh: ''
      },
      formLabelWidth: '80px',
        loading :true,
        rules: {
            xmmc: [
                { required: true, message: '请输入项目名称', trigger: 'blur' }
            ],
            xmfl: [
                { required: true, message: '请选择项目分类', trigger: 'blur' }
            ],
            jd: [
                { required: true, message: '请输入经度', trigger: 'blur' }
            ],
            wd: [
                { required: true, message: '请输入纬度', trigger: 'blur' }
            ],
            lxfs: [
                { required: true, message: '请输入联系方式', trigger: 'blur' }
            ],
            scjw: [
                { required: true, message: '请选择是否自动上传成都建委', trigger: 'blur' }
            ],
            xfrl: [
                { required: true, message: '请选择是否自动下发人脸', trigger: 'blur' }
            ]
        }  ,
        page:1,
        total:0,
        pageSize:10,
        projectName:'',         //搜索框项目名称
        regionName:'',          //搜索框设备区域
        deviceId:'',            //搜索框设备编号
        user:JSON.parse(localStorage.getItem('user')),
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
   
    //展示角色
    showList(){
      let that = this;
      let params = {
        pageNumber:that.page,
        limit:that.pageSize,
        regionName:that.regionName,
        projectName:that.projectName,
        deviceId:that.deviceId
      };
      this.loading = true;
      ycDataManage(params).then(res => {
        this.loading = false;
        if(res.code == 200){
          that.tableData = res.data.items;
          that.loading = false;
          that.total = res.data.total;
          console.log(that.tableData)
        }else{
          this.$message.error(res.message);
          this.loading = false;
        }
      })
      .catch(() => {this.loading = false;})
    },
  },
  mounted() {
    this.showList();
    this.buttonList =  this.$store.getters.button
  }
}
