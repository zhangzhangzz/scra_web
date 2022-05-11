/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-06-10 14:00:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit,
 * @FilePath: \scra_web1\src\views\projectManage\projectDrawing\projectDrawing.js
 */
export default {
  data() {
    return {
      options: [1, 2, 3, 4, 5, 6],
      option: [],
      tableData: [{
        d: 1,
        d1: '成都智慧工地项目图纸1',
        d2: '成都实名制1',
        d3: '小红',
        d4: '2020-12-12'
      }, {
        d: 2,
        d1: '成都智慧工地项目图纸3',
        d2: '成都实名制3',
        d3: '小化',
        d4: '2020-11-11'
      }, {
        d: 3,
        d1: '成都智慧工地项目图纸3',
        d2: '成都实名制3',
        d3: '小懂',
        d4: '2020-09-09'
      }, {
        d: 1,
        d1: '成都智慧工地项目图纸4',
        d2: '成都实名制4',
        d3: '小东',
        d4: '2020-01-01'
      }],
      dialogVisible:false,

    }
  },
  methods: {
    handleSelectionChange(val){

    },
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
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleNodeClick(data) {
      console.log(data);
    },
  },
  mounted() {
  
  }
}
