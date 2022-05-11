export default {
  data() {
    return {
      activeName: 'first',
      bgs: 1,
      uuu: '采集设备',
      uuu1:"",
      uuu2:"",
      dialogVisible: false,
      options: [1, 2, 3, 4, 5, 6],
      option: [],
      ruleForm: {
        name: '成都吉广润投资有限公司'
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      tableData: [{
        d: 1,
        d1: '维尚家居新建厂房B地块',
        d2: 'f60dac9d73523a53',
        d3: '成都',
        d4: '30.521',
        d5: '104.230',
        d6: '杨尘设备'
      }],
      tableData2:[{
        d: 1,
        d1: '机投北片区路网工程-出门',
        d2: 'f60dyddsv10909',
        d3: '北京',
        d4: '32.523',
        d5: '166.766',
        d6: '采集设备'
      }],
      tableData3:[{
        d: 1,
        d1: '机投北片区路网工程',
        d2: 'f60dyddsv23432',
        d3: '上海',
        d4: '32.666',
        d5: '166.123',
        d6: '视频设备'
      }],
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    JW(){
      console.log(this.uuu1)
      this.uuu1=="杨尘设备"?this.bgs=5:this.bgs=4;

    },
    ooo() {
      console.log(this.uuu)
      this.uuu == '采集设备' ? this.bgs = 1 : this.uuu == '考勤设备' ? this.bgs = 2 : this.uuu == '扬尘设备' ? this.bgs = 3 : this.bgs = 4
      console.log(this.bgs)
    },
    exit() {
      this.$router.push('/projectManage/ProjectList')
    },
    handleOut() {
      this.$confirm('确定将该人员删除吗?', '删除人员', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted() {

  }
}
