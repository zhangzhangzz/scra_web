export default {
  data() {
    return {
      input3: '',
      tableData: [{
        d: 1,
        loginName: '超级管理员1',
        ip: 'admin1',
        time: '2021-05-01 22:22:11'
      }, {
        d: 2,
        loginName: '超级管理员2',
        ip: 'admin2',
        time: '2021-05-01 22:22:29'
      }, {
        d: 3,
        loginName: '普通管理员',
        ip: 'admin3',
        time: '2021-05-01 22:22:45'
      }]
    }
  },
  methods: {
    ModifyPass(index) {
      this.$emit('toIndex', index)
    }
  }
}
