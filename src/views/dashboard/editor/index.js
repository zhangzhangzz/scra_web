/*
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-11-08 13:02:49
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
import globalProject from '../../../components/custom/globalProject/globalProject.vue'

import {homeData,fifteenData,getFifthGroup,getFifthWork,getDevice,getGroupNum,getWorkNum,getAgeNum,getSexNum,getFifthDay,getProvinceData} from '@/api/api.js'
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
    GroupTypeChart,
    globalProject
  },
  data() {
    return {
      loading:false,
      loading1:false,
      loading7:false,
      loading8:false,
      loading9:false,
      loading10:false,
      loading15:false,
      loading11:false,
      loading12:false,
      loading13:false,
      loading14:false,
      loading9Tag:false,
      ageData12Tag:false,
      workNum11Tag:false,
      groupNum10Tag:false,
      fifthData14Tag:false,
      provinceData15Tag:false,
      fifthTag:false,
      data:'',
      lineChartData: {},
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
     
      value: '',     //近15天考勤人数情况查询所需班组名称组
      value1: '',    //近15天考勤人数情况查询所需工种名称组
      value2: '项目1',
      value3: '选项1',
      p_width:'60%',
      p_width1:'40%',
      p_num:'123',
      p_num1:'23',
      globalProjectId:'',
      numberOfDeviceList:[],                  //设备类别
      numberOfTeamPersonnelList:'',           //班组
      numberOfWorkPersonnelList:'',           //工种
      numberOfSexPersonnel:'',                //性别
      numberOfAttendInFifteenDays:'',         //近15天通勤情况
      numberOfProvincePersonnel:'',           //各省份人员数量
      numberOfAllAgesPersonnel:'',            //年龄段分布
      todayShouldAttend:0,
      todayAttend:0,
      x_data:[],
      flag:false,
      user:JSON.parse(localStorage.getItem('user')),
      
      teamNameListOfAttendPersInFifteenDays:'',
      workNameListOfAttendPersInFifteenDays:'',
      deviceData9:'',
      groupNum10:'',
      workNum11:'',
      ageData12:'',
      sexData13:'',
      fifthData14:'',
      provinceData15:'',
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },

    //展示角色
    showList(){
      let that = this;
      let params = {
      };
      this.loading = true;
      homeData(params).then(res => {
        this.loading = false;
        if(res.code == 200){
          that.data= res.data;
          // that.value = res.data.teamNameListOfAttendPersInFifteenDays[0]
          // that.value1 = res.data.workNameListOfAttendPersInFifteenDays[0]
          that.loading = false;
          
          //最近15天
//           let a1 = [];
//           let a2 = [];
//           let a3 = [];
//           let array = [];
//           res.data.numberOfAttendPersInFifteenDays.forEach(function(item,index,arr){
//             a1.push(item.shouldAttend)
//             a2.push(item.attendance)
//             a3.push(item.date);
//           })
//           a3.forEach(function(item,index,arr){
//             var m = item.split("-");
//             let obj = m[1]+'/'+m[2]
//             array.push(obj);
//           })
//           let szNum = a1.concat(a2);
//           let max1 = Math.max(...szNum);
//           let obj = {
//             expectedData:a1.reverse(),
//             actualData:a2.reverse(),
//             max:max1+1
//           }
//           this.todayShouldAttend = obj.expectedData[a1.length-1]
//           this.todayAttend = obj.actualData[a2.length-1]
//           this.x_data = array.reverse();
//           this.lineChartData = obj;


          

          

          this.flag = true;
          
        }else{
          this.$message.error(res.message);
          this.loading = false;
        }
      })
      .catch(() => {this.loading = false;})
    },

    queryProId(id){
      this.globalProjectId = id;
      this.showList();
    },

    teamSelect(e){
      this.getFifteenData();
    },

    workSelect(e){
      this.getFifteenData();
    },

    clearTeam(e){
      this.getFifteenData();
    },

    clearWork(e){
      this.getFifteenData();
    },

    getFifteenData(){
      let that = this;
      that.loading1 = true;
      let params = {
        teamName:this.value,
        workName:this.value1
      };
      fifteenData(params).then(res => {
        if(res.code == 200){
            //最近15天
          let a1 = [];
          let a2 = [];
          let a3 = [];
          let array = [];
          res.data.forEach(function(item,index,arr){
            a1.push(item.shouldAttend)
            a2.push(item.attendance)
            a3.push(item.date);
          })
          a3.forEach(function(item,index,arr){
            var m = item.split("-");
            let obj = m[1]+'/'+m[2]
            array.push(obj);
          })
          let obj = {
            expectedData:a1.reverse(),
            actualData:a2.reverse()
          }
          this.todayShouldAttend = obj.expectedData[a1.length-1]
          this.todayAttend = obj.actualData[a2.length-1]
          this.x_data = array.reverse();
          this.loading1 = false;
          this.lineChartData = obj;
          this.$refs.child.initChart();
          this.fifthTag = true;
        }else{
          this.$message.error(res.message);
          this.loading1 = false;
        }
        
      })
      .catch(() => {}) 
    },

    

    //获取近15天考勤人数情况查询所需班组名称组
    queryFifthGroup(){
      let that = this;
      that.loading7 = true;
      getFifthGroup().then(res => {
        if(res.code == 200){
          that.teamNameListOfAttendPersInFifteenDays = res.data.teamNameListOfAttendPersInFifteenDays;
        }else{
          this.$message.error(res.message);
          this.loading7 = false;
        }
      })
      .catch(() => {}) 
    },

    //获取近15天考勤人数情况查询所需工种名称组
    queryFifthWork(){
      let that = this;
      that.loading8 = true;
      getFifthWork().then(res => {
        if(res.code == 200){
          that.workNameListOfAttendPersInFifteenDays = res.data.workNameListOfAttendPersInFifteenDays;
        }else{
          this.$message.error(res.message);
          this.loading8 = false;
        }
      })
      .catch(() => {}) 
    },

    //获取不同类型设备数量（在线、离线）
    queryDevice(){
      let that = this;
      that.loading9 = true;
      getDevice().then(res => {
        if(res.code == 200){
          //设备统计
          let d1 = [];
          let d2 = [];
          let d3 = [];
          let d4 = [];
          let d5 = [];
          res.data.numberOfDeviceList.forEach(function(item,index,arr){
            d1.push(item.deviceType)
            d2.push(item.offlineNumber)
            d3.push(item.onlineNumber);
            let obj = {
              value:item.total,
              name:item.deviceType
            }
            d4.push(obj);
            d5.push(item.total)
          })
          let max = Math.max(...d5);
          let obj1 = {
            deviceType : d1,
            offlineNumber:d2,
            onlineNumber:d3,
            total:d4,
            max:max+1
          };
          this.deviceData9 = obj1;
          this.loading9 = false;
          this.loading9Tag = true;
        }else{
          this.$message.error(res.message);
          this.loading9 = false;
        }
      })
      .catch(() => {}) 
    },

    

    //获取各工种人员数量
    queryWorkNum(){
      let that = this;
      that.loading10 = true;
      getWorkNum().then(res => {
        if(res.code == 200){
          //工种
          let workArray = [];
          res.data.numberOfWorkPersonnelList.forEach(function(item,index,arr){
            let obj = {
              value:item.numberOfPersonnel,
              name:item.workName
            }
            workArray.push(obj)
          })
          this.workNum11 = workArray;
          this.loading11 = false;
          this.workNum11Tag = true;
        }else{
          this.$message.error(res.message);
          this.loading11 = false;
        }
      })
      .catch(() => {}) 
    },

    //获取各班组人员数量
    queryGroupNum(){
      let that = this;
      that.loading10 = true;
      getGroupNum().then(res => {
        if(res.code == 200){
          //班组
          let teamArray = [];
          res.data.numberOfTeamPersonnelList.forEach(function(item,index,arr){
            let obj = {
              value:item.numberOfPersonnel,
              name:item.teamName
            }
            teamArray.push(obj)
                  })
          this.groupNum10 = teamArray;
          this.loading10 = false;
          this.groupNum10Tag = true;
        }else{
          this.$message.error(res.message);
          this.loading10 = false;
        }
      })
      .catch(() => {}) 
    },

    //获取各年龄段人员数量
    queryAgeNum(){
      let that = this;
      that.loading12 = true;
      getAgeNum().then(res => {
        if(res.code == 200){
          //年龄
          let ageArray = [];
          res.data.numberOfAllAgesPersonnel.forEach(function(item,index,arr){
            let obj = {
              name:item.generation,
              value:item.quantity
            }
            ageArray.push(obj)
          })
          this.ageData12 = ageArray;
          this.querySexNum();
        }else{
          this.$message.error(res.message);
          this.loading12 = false;
        }
      })
      .catch(() => {}) 
    },

    //获取各性别人员数量
    querySexNum(){
      let that = this;
      getSexNum().then(res => {
        if(res.code == 200){
          //性别
          this.sexData13 = res.data.numberOfSexPersonnel;
          this.loading12 = false;
          this.ageData12Tag = true;
        }else{
          this.$message.error(res.message);
          this.loading12 = false;
        }
      })
      .catch(() => {}) 
    },

    //获取近15天通勤情况
    queryFifthDay(){
      let that = this;
      that.loading14 = true;
      getFifthDay().then(res => {
        if(res.code == 200){
          //近15天通勤
          let fifArr1 = [];
          let fifArr2 = [];
          let fifArr3 = [];
          let fifDate = [];
          res.data.numberOfAttendInFifteenDays.forEach(function(item,index,arr){
            fifArr1.push(item.numberOfVisitors)
            fifArr2.push(item.numberOfExits*-1)
            fifArr3.push(item.date);
                  })
          fifArr3.forEach(function(item,index,arr){
                var m = item.split("-");
            let obj = m[1]+'/'+m[2]
            fifDate.push(obj);
              })
          let obj2 = {
            numberOfVisitors:fifArr1,
            numberOfExits:fifArr2,
            date:fifDate
          }
          this.fifthData14 = obj2;
          this.fifthData14Tag = true;
          this.loading14 = false;
        }else{
          this.$message.error(res.message);
          this.loading14 = false;
        }
      })
      .catch(() => {}) 
    },

    //获取各省份人员数量
    queryProvinceData(){
      let that = this;
      that.loading15 = true;
      getProvinceData().then(res => {
        if(res.code == 200){
          //各省份
          let proviceArray = [];
          res.data.numberOfProvincePersonnel.forEach(function(item,index,arr){
            let obj = {
              name:item.province,
              value:item.numberOfPersonnel
            }
            proviceArray.push(obj)
          })
          this.provinceData15 = proviceArray;
          this.loading15 = false;
          this.provinceData15Tag = true;
        }else{
          this.$message.error(res.message);
          this.loading15 = false;
        }
      })
      .catch(() => {}) 
    },

  },
  mounted() {
    // this.showList();
    this.getFifteenData();
    this.queryFifthGroup();
    this.queryFifthWork();
    this.queryDevice();
    this.queryWorkNum();
    this.queryGroupNum();
    this.queryAgeNum();
    this.queryFifthDay();
    this.queryProvinceData();
  }
}