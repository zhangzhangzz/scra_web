/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-05-28 16:36:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\dashboard\admin\index.js
 */
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

import EnvirmentChart from './components/envirmentChart'
import WorkTypeChart from './components/workTypeChart'
import GroupTypeChart from './components/GroupTypeChart'
import WorkOldSexChart from './components/workOldSexChart'
import PeopleTypeChart from './components/peopleTypeChart'
import FifthDayChart from './components/fifthDayChart'
// fifthDayChart.vue
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 171, 181, 160, 165,100, 120, 161, 134, 105, 160, 165,166],
    actualData: [120, 82, 91, 154, 162, 140, 145,120, 82, 91, 154, 162, 140, 145,150]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    EnvirmentChart,
    WorkTypeChart,
    WorkOldSexChart,
    PeopleTypeChart,
    FifthDayChart,
    GroupTypeChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      options: [{
        value: '班组1',
        label: '班组1'
      }, {
        value: '班组2',
        label: '班组2'
      }, {
        value: '班组3',
        label: '班组3'
      }, {
        value: '班组4',
        label: '班组4'
      }, {
        value: '班组5',
        label: '班组5'
      }],
      options1: [{
        value: '工种1',
        label: '工种1'
      }, {
        value: '工种2',
        label: '工种2'
      }, {
        value: '工种3',
        label: '工种3'
      }, {
        value: '工种4',
        label: '工种4'
      }, {
        value: '工种5',
        label: '工种5'
      }],
      options2: [{
        value: '项目1',
        label: '项目1'
      }, {
        value: '项目2',
        label: '项目2'
      }, {
        value: '项目3',
        label: '项目3'
      }],
      value: '班组5',
      value1: '工种5',
      value2: '项目1',
      value3: '选项1',
      p_width:'60%',
      p_width1:'40%',
      p_num:'123',
      p_num1:'23'
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}