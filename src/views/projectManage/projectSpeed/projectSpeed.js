export default {
  data() {
    return {
      options: [1, 2, 3, 4, 5, 6],
      option: [],
      tableData: [{
        d: 1,
        d1: '2020-12-12',
        d2: '项目正式开工'
      }, {
        d: 2,
        d1: '2020-11-11',
        d2: '劳务人员进场'
      }, {
        d: 3,
        d1: '2020-10-10',
        d2: '管理人员进场'
      }, {
        d: 4,
        d1: '2020-09-09',
        d2: '项目交互'
      }]
    }
  },
  methods: {
    handleOut1() {
      this.$confirm('确定批量删除人员吗?', '批量删除人员', {
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
    },
    handleOut2() {
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
