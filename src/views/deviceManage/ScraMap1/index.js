import gisGreen from "../../../assets/images/scramap/map_circle_green.png";
import gisWhite from "../../../assets/images/scramap/offline.png";
import Clickoutside from 'element-ui/src/utils/clickoutside'
import EnvirmentChart from './components/envirmentChart'  
// import mapJson from '@/components/custom_map_config.json'
import {ycSjData,ycSjDataDevice,oneHourData,oneDayData} from '@/api/api.js'
import echarts from 'echarts'
require ('echarts/lib/chart/pie')

export default {
    directives: { Clickoutside },
    components: {
        EnvirmentChart
      },
    data() {
        return {
            center: { lng: 104.072941, lat: 30.638195 },
            zoom: 14,
            options: [
                {
                    value: "1",
                    label: "工地",
                },
                {
                    value: "0",
                    label: "ID",
                },
            ],
            value: "1",
            state2: "",
            mapJson: require('../../../assets/json/custom_map_config.json'),
            value_1: true,
            value_2: true,
            value_3: false,
            checkList: 1,
            checkList1: [
                "所有",
                "房建",
                "轨道交通",
                "市政",
                "深基坑",
                "装饰装修",
                "砂浆站",
                "混凝土",
                "砂浆混凝土",
                "城管委",
                "交通运输局",
                "公园城市局",
                "水务局",
                "规自局",
                "经信局",
            ],
            proname: "",
            PM10AVG: "",
            NCV10ARR1: "",
            sn: "",
            echar: [], //底部echarts的数据展示
            PM10ARR: [], //pm10前10条数据
            NCV10ARR: [], //国控10前10条数据
            NCV10ARR1: "", //国控的最新数据值
            xData: [], //X轴数据
            pm10: "", //国控PM10
            PM10AVG: "", //国控Pm10avg
            proname: "", //项目名称
            sn: "", //设备id
            NCV10ARRMAX: [], //Y轴的数据   获得最大值的数组
            OnlineRate: "", //在线率

            // 搜索的变量
            // options: ["工地", "设备ID", "设备名称"], //工地 ID
            values1: "", //搜索中的选择值
            options1: [], //后台返回的工地，设备ID...值
            ChooseSBName: [], //设备名称查询经纬度
            ChoosePName: [], //项目名称查询经纬度
            ChooseSN: [], //设备SN查询经纬度
            longitude: "", //查询获得的经度
            latitude: "", //查询获得的纬度
            pickerState: false,
            tag: 0,
            type: "",
            showcolorp: "",
            allplace: "",
            userName: this.$store.state.userName, //登录名
            allplaceC: [], //返回在线和不在线工地
            allplace: [], //合并在线不在线工地
            online: [],
            Notonline: [],
            map: "",
            rightBar: false,
            moreDataList: [{
                label: '实时PM10',
                name:'pm10Value',
                num: 0,
                unit: 'ug/m³'
            }, {
                label: '实时PM2.5',
                name:'pm25Value',
                num: 0,
                unit: 'ug/m³'
            },{
                label: '实时噪声',
                name:'voice',
                num: 0,
                unit: 'dB'
            }, {
                label: '实时温度',
                name:'temperature',
                num: 0,
                unit: '℃'
            }, {
                label: '实时湿度',
                name:'humidity',
                num: 0,
                unit: '%RH'
            }, {
                label: '实时风速',
                name:'windSpeed',
                num: 0,
                unit: 'm/s'
            }, {
              label: '实时风向',
              name:'windDirectionStr',
              num: '',
              unit: '风'
          }],
            myChart4:'',

            //----------------------
            orderByData:[],                   //右侧排行数据及绿点数据
            deviceData:[],                    //绿点弹窗数据
            dataType:1,                       //1为实时0 为一天
            active:0,                         //选中状态  
            tagTextWapper:['实时动态','对比国控','噪声','PM2.5','温度','湿度','风速','风向','TSP'],
            restaurants:[],
            obj1:[],
            obj2:[],
            deviceList:[],
            onlineStatus:''
        };
    },
    methods: {
        Close(e) {
            if (e.target.className == "BMap_Marker BMap_noprint") return;
            console.log(e.target.className)
            this.pickerState = false;
        },

        close1() {
            this.rightBar = false;
        },

        async handler({ BMap, map }) {
            let that = this;
            that.map = map;
            //   地图样式
            // map.setMapStyleV2({
            //     styleId: "e46adc2e0d1d52e4c79f8e40fcce758b",
            // });
            map.setMapStyle({ styleJson: that.mapJson });
            that.orderByList();
            // await this.axios
            //     .post("https://test.xhylot.com/scrayc/dt/project", {
            //         // loginName: this.userName,
            //         loginName: JSON.parse(localStorage.getItem('user')).userName
            //     })
            //     .then((res) => {
            //         this.allplaceC = JSON.parse(JSON.stringify(res.data));
            //         var online1 = [];
            //         var Notonline1 = [];
            //         var online5 = [];
            //         var Notonline5 = [];
            //         var allplace5 = [];
            //         for (let i = 0; i < this.allplaceC.length; i++) {
            //             online1.push(this.allplaceC[i].Online);
            //             Notonline1.push(this.allplaceC[i].NotOnline);
            //             for (let g = 0; g < online1.length; g++) {
            //                 var online2 = online1[g];
            //                 for (let k = 0; k < online2.length; k++) {
            //                     online5.push(online2[k]);
            //                     allplace5.push(online2[k]);
            //                 }
            //             }
            //             for (let g = 0; g < Notonline1.length; g++) {
            //                 var Notonline2 = Notonline1[g];
            //                 for (let k = 0; k < Notonline2.length; k++) {
            //                     Notonline5.push(Notonline2[k]);
            //                     allplace5.push(Notonline2[k]);
            //                 }
            //             }
            //             for (let s = 0; s < allplace5.length; s++) {
            //                 allplace5[s].OnlineRate = this.allplaceC[i].OnlineRate;
            //             }
            //         }
            //         var obj = {};
            //         var obj1 = {};
            //         var obj2 = {};
            //         for (let i = 0; i < Notonline5.length; i++) {
            //             if (!obj[Notonline5[i].SN]) {
            //                 this.Notonline.push(Notonline5[i]);
            //                 obj[Notonline5[i].SN] = true;
            //             }
            //         }
            //         for (let i = 0; i < online5.length; i++) {
            //             if (!obj1[online5[i].SN]) {
            //                 this.online.push(online5[i]);
            //                 obj1[online5[i].SN] = true;
            //             }
            //         }
            //         for (let i = 0; i < allplace5.length; i++) {
            //             if (!obj2[allplace5[i].SN]) {
            //                 this.allplace.push(allplace5[i]);
            //                 obj2[allplace5[i].SN] = true;
            //             }
            //         }

            //         function compare(property) {
            //             //数组时间从大到小排序
            //             return function (a, b) {
            //                 var value1 = a[property];
            //                 var value2 = b[property];
            //                 return value1 - value2;
            //             };
            //         }

            //         this.allplace.sort(compare("pm10"));
            //     });

            // this.add();
        },

        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString
                ? restaurants.filter(this.createFilter(queryString))
                : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },

        add(tag) {
          if(this.value_1){
            this.map.clearOverlays();
            var showdian = [];
            let that = this;
            if (this.checkList == 1) {
                showdian = this.allplace;
            } else if (this.checkList == 2) {
                showdian = this.online;
            } else if (this.checkList == 3) {
                showdian = this.Notonline;
            }
            let circle = that.orderByData.voProProjectList;
            for (let i = 0; i < circle.length; i++) {
                //创建点
                var latitude = Number(circle[i].latitude);
                var longitude = Number(circle[i].longitude);
                // 创建Marker标注，使用小车图标
                var point = new BMap.Point(longitude, latitude);
                if (i == 0 && tag) {
                    this.map.centerAndZoom(point, 15);
                }
                // 创建小车图标
                if(circle[i].onlineStatus==0){
                  var myIcon = new BMap.Icon(gisGreen, new BMap.Size(70, 70));
                }else{
                  var myIcon = new BMap.Icon(gisWhite, new BMap.Size(70, 70));
                }
                
                var marker = new BMap.Marker(point, {
                    icon: myIcon,
                });
                // 创建信息窗口
                var sContent = `<div class="infobox_content">	
                                  <p class="con_name">
                                    <span class="flag">
                                      <span style="color:${circle[i].onlineStatus==0?'#16B16A':'#888'};font-size:12px;">【${circle[i].onlineStatus==0?'正常':'离线'}】</span>
                                      <span>${circle[i].voProjectDustInfoList[0].projectName}</span>
                                    </span>
                                  </p>
                                  <div class="nextWapper">
                                    <span>
                                      <span style="color:${circle[i].onlineStatus==0?'#16B16A':'#ccc'};font-size:25px;font-weight:700">${circle[i].voProjectDustInfoList[0].pm10Value==null?0:circle[i].voProjectDustInfoList[0].pm10Value}</span> 
                                      <span class="unit">ug/m³</span>
                                    </span>
                                    <span class="gk_val unit">国控：${circle[i].voProjectDustInfoList[0].chinaStandardPm10Value==null?0:circle[i].voProjectDustInfoList[0].chinaStandardPm10Value}</span>
                                  </div>
                                  <div class="tag_container">
                                    <div class="tag"></div>
                                  </div>
                                </div>`;
                marker.content = sContent;                
                marker.deviceId = circle[i].voProjectDustInfoList[0].deviceId
                marker.projectName = circle[i].voProjectDustInfoList[0].projectName;
                marker.deviceList = circle[i].voProjectDustInfoList;
                marker.onlineStatus = circle[i].onlineStatus;
                marker.addEventListener("click", function (e) {
                    //点击控制foot echarts的显隐
                    that.pickerState = !that.pickerState;
                    if (!that.pickerState) return;
                    that.echar.length = 0; //初始显示值
                    that.proname = e.target.projectName;
                    that.sn = e.target.deviceId;
                    that.deviceList = e.target.deviceList;
                    that.onlineStatus = e.target.onlineStatus;
                    if(that.onlineStatus==1){
                      that.NowData();
                    }
                    that.getDeviceData(e.target.deviceId);
                    that.getEchartsData(e.target.deviceId);
                });
               

                // 点标记添加点击事件
                marker.addEventListener("mouseover", function (e) {
                    let p1 = new BMap.Point(e.target.point.lng, e.target.point.lat);
                    var infoWindow = new BMap.InfoWindow(e.target.content);
                    this.map.openInfoWindow(infoWindow, p1); // 开启信息窗口
                });

                marker.addEventListener("mouseout", function (e) {
                  var infoWindow = new BMap.InfoWindow(e.target.content);
                    this.map.closeInfoWindow(infoWindow);
                });
                
                this.map.addOverlay(marker); // 将标注添加到地图中
              }
          }else{
            this.map.clearOverlays();
          }
        },

        //显示排行
        showp() {
            if (this.type == 0 || this.type == "") {
                this.type = 1;
                this.rightBar = true;
            } else {
                this.rightBar = false;
                this.type = "";
            }
        },

        //显示统计
        showt() {
            if (this.type == 1 || this.type === "") {
                this.type = 0;
                this.rightBar = true;
            } else if (this.type === 0) {
                this.rightBar = false;
                this.type = "";
            }
            this.drawcao(); //是否超标
            this.drawday(); //当日连续两次超标数量
            this.draw(); //上小时超标数
        },

        //显示数值
        showNum(){
          //显示数值
            let that = this;
            let circle = that.orderByData.voProProjectList;
            if(this.value_3){
              for (let i = 0; i < circle.length; i++) {
                //创建点
                var latitude = Number(circle[i].latitude);
                var longitude = Number(circle[i].longitude);
                var opts = {
                    position: new BMap.Point(longitude, latitude), // 指定文本标注所在的地理位置
                    offset: new BMap.Size(-18, 15), // 设置文本偏移量
                };
                // 创建文本标注对象
                var label = new BMap.Label(circle[i].voProjectDustInfoList[0].pm10Value, opts);
                // 自定义文本标注样式
                label.setStyle({
                    color: '#fff',
                    borderRadius: '5px',
                    borderColor: 'rgba(0,0,0,0.8)',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: '0',
                    marginLeft:'-13px',
                    textAlign:'center',
                    fontSize: '12px',
                    height: '20px',
                    width:'50px',
                    lineHeight: '20px',
                    fontFamily: '微软雅黑'
                });
                this.map.addOverlay(label);
              }
            }else{
              let str = this.map.getOverlays();
              for (var i = 0; i <= str.length; i++){
                if(str[i]!=undefined && typeof(str[i].content)=='number' ){
                  this.map.removeOverlay(str[i]);
                }
              }
            }
            
          
        },

        Closebg() {
            this.pickerState = false;
        },

        createFilter(queryString) {
            return (restaurant) => {
                return (
                    restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
                    0
                );
            };
        },

        //搜索框选中事件
        handleSelect(item) {
          var point = new BMap.Point(item.longitude, item.latitude);
          this.map.centerAndZoom(point, 15);
          let that = this;
          let circle = that.orderByData.voProProjectList;
          var sContent = `<div class="infobox_content">	
          <p class="con_name">
            <span class="flag">
              <span style="color:${circle[item.index].onlineStatus==0?'#16B16A':'#888'};font-size:12px;">【${circle[item.index].onlineStatus==0?'正常':'离线'}】</span>
              <span>${circle[item.index].voProjectDustInfoList[0].projectName}</span>
            </span>
          </p>
          <div class="nextWapper">
            <span>
              <span style="color:${circle[item.index].onlineStatus==0?'#16B16A':'#ccc'};font-size:25px;font-weight:700">${circle[item.index].voProjectDustInfoList[0].pm10Value}</span> 
              <span class="unit">ug/m³</span>
            </span>
            <span class="gk_val unit">国控：${circle[item.index].voProjectDustInfoList[0].chinaStandardPm10Value}</span>
          </div>
          <div class="tag_container">
            <div class="tag"></div>
          </div>
        </div>`;
          var infoWindow = new BMap.InfoWindow(sContent);
          this.map.openInfoWindow(infoWindow, point); // 开启信息窗口
        },

        //搜索选中事件
        changeSelect(){
          this.restaurants = [];
          this.state2 = ''
          if(this.value==1){
            this.restaurants = this.obj1
          }else{
            this.restaurants = this.obj2
          }
        },

        //设备选中事件
        changeSelect1(){
          this.getDeviceData(this.sn);
          this.getEchartsData(this.sn);
        },

        loadAll() {
            return [{ value: "岷江新城基础教育与普兴安置房周边道路工程(一期)" }];
        },

        draw() {
            let myChart = echarts.init(document.getElementById("myChart"));
            myChart.setOption({
                title: {
                    show: true,
                    text: "上小时\n超标数",
                    x: "center",
                    y: "center",// 通过x,y将标题(进度)定位在圆环中心
                    textStyle: {
                      fontSize: "17",
                      color: "#555",
                      fontWeight: "400",
                      fontFamily: "DINPro, DINPro-Regular",
                    },
                  },
                  tooltip: {
                    trigger: "item",
                    formatter: "当日连续\n两次超标数",
                    show: false,
                  },
                  legend: {
                    orient: "vertical",
                    x: "left",
                    show: false,
                  },
                  series: {
                    name: "",
                    itemStyle: {
                        borderCap:'round'
                    },
                    type: "pie",
                    backgroundStyle: {
                        //反向颜色
                        color: "#33373a",
                    },
                    radius: ["85%", "95%"],
                    avoidLabelOverlap: true,
                    hoverAnimation: false,
                    label: {
                      normal: {
                        show: false,
                        position: "center",
                      },
                      emphasis: {
                        show: false,
                      },
                    },
                    labelLine: {
                      normal: {
                        show: false,
                      },
                    },
                    data: [
                      {
                        value: 56,
                        name: "",
                        itemStyle: {
                          color: "#f5bf4a",
                        },
                      },
                      {
                        value: 200 - 56,
                        name: "",
                        itemStyle: {
                          color: "#f0f0f0",
                        },
                      },
                    ]}

            });
        },
        //连续两天超标数
        drawday() {
            let myChart2 = echarts.init(document.getElementById("myChart2"));
            myChart2.setOption({
                title: {
                    show: true,
                    text: "当日连续\n两次超标数",
                    x: "center",
                    y: "center",// 通过x,y将标题(进度)定位在圆环中心
                    textStyle: {
                      fontSize: "17",
                      color: "#555",
                      fontWeight: "400",
                      fontFamily: "DINPro, DINPro-Regular",
                    },
                  },
                  tooltip: {
                    trigger: "item",
                    formatter: "当日连续\n两次超标数",
                    show: false,
                  },
                  legend: {
                    orient: "vertical",
                    x: "left",
                    show: false,
                  },
                  series: {
                    name: "",
                    itemStyle: {
                        borderCap:'round'
                    },
                    type: "pie",
                    backgroundStyle: {
                        //反向颜色
                        color: "#33373a",
                    },
                    radius: ["85%", "95%"],
                    avoidLabelOverlap: true,
                    hoverAnimation: false,
                    label: {
                      normal: {
                        show: false,
                        position: "center",
                      },
                      emphasis: {
                        show: false,
                      },
                    },
                    labelLine: {
                      normal: {
                        show: false,
                      },
                    },
                    data: [
                      {
                        value: 56,
                        name: "",
                        itemStyle: {
                          color: "#ff4c4c",
                        },
                      },
                      {
                        value: 200 - 56,
                        name: "",
                        itemStyle: {
                          color: "#f0f0f0",
                        },
                      },
                    ]}

            });
        },
        //连续两天超标数
        drawcao() {
            let myChart3 = echarts.init(document.getElementById("myChart3"));
            myChart3.setOption({
                title: {
                    show: true,
                    text: "",
                    x: "center",
                    y: "center",// 通过x,y将标题(进度)定位在圆环中心
                    textStyle: {
                      fontSize: "17",
                      color: "#555",
                      fontWeight: "400",
                      fontFamily: "DINPro, DINPro-Regular",
                    },
                  },
                  tooltip: {
                    trigger: "item",
                    formatter: "",
                    show: false,
                  },
                  legend: {
                    orient: "vertical",
                    x: "left",
                    show: false,
                  },
                  series: {
                    name: "",
                    itemStyle: {
                        borderCap:'round'
                    },
                    type: "pie",
                    backgroundStyle: {
                        //反向颜色
                        color: "#33373a",
                    },
                    radius: ["0", "95%"],
                    avoidLabelOverlap: true,
                    hoverAnimation: false,
                    label: {
                      normal: {
                        show: false,
                        position: "center",
                      },
                      emphasis: {
                        show: false,
                      },
                    },
                    labelLine: {
                      normal: {
                        show: false,
                      },
                    },
                    data: [
                      {
                        value: 200,
                        name: "",
                        itemStyle: {
                          color: "#c1c7d8",
                        },
                      },
                      {
                        value: 0 ,
                        name: "",
                        itemStyle: {
                          color: "#c1c7d8",
                        },
                      },
                    ]}
            });
            // var resizeTimer = null;
            // window.addEventListener("resize", () => {
            //   if (resizeTimer) {
            //     clearTimeout(resizeTimer);
            //   }
            //   resizeTimer = setTimeout(function () {
            //     myChart3.resize();
            //   }, 400);
            // });
        },
        NowData() {
          console.log('---')
          var myChart = echarts.init(document.getElementById("fourth"));
          var e = 80;
          var option = {
            title: {
              show: true,
              text: e + "%",
              x: "center",
              y: "center",// 通过x,y将标题(进度)定位在圆环中心
              textStyle: {
                fontSize: "25",
                color: "white",
                fontWeight: "400",
                fontFamily: "DINPro, DINPro-Regular",
              },
            },
            tooltip: {
              trigger: "item",
              formatter: "{d}%",
              show: false,
            },
            legend: {
              orient: "vertical",
              x: "left",
              show: false,
            },
            series: {
              name: "",
              type: "pie",
              radius: ["65%", "85%"],
              avoidLabelOverlap: true,
              hoverAnimation: false,
              label: {
                normal: {
                  show: false,
                  position: "center",
                },
                emphasis: {
                  show: false,
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: [
                {
                  value: e,
                  name: "",
                  itemStyle: {
                    color: "#6790D8",
                  },
                },
                {
                  value: 100 - e,
                  name: "",
                  itemStyle: {
                    color: "transparent",
                  },
                },
              ],
            },
          };
          myChart.setOption(option);          
        },

        //绘图
        drawNowData(MaxC,title) {
          // console.log(this.PM10ARR)
          // console.log(this.NCV10ARR)
            // 基于准备好的dom，初始化echarts实例
            let myChart5 = echarts.init(document.getElementById("myChart5"));
            console.log(title)
            // 绘制图表
            myChart5.setOption({
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                    },
                    padding: [5, 10],
                },
                xAxis: {
                    data: this.xData,
                    boundaryGap: false,
                    axisLabel: {
                        interval: 0, //横轴信息全部显示
                        textStyle: {
                            fontSize: "12",
                            color: "#fff",
                        },
                    },
                },

                grid: {
                    // bottom: 35,
                    // left: 40,
                    // right: 20,
                    // top: 40,
                    left: 10,
                    right: 25,
                    bottom: 0,
                    top: 40,
                    containLabel: true,
                },
                yAxis: {
                    min: 0,
                    max: MaxC, //MaxC
                    interval: parseInt(MaxC / 5),
                    axisLabel: {
                        textStyle: {
                            fontSize: "12",
                            color: "#fff",
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: "dashed",
                            color: "#33363b",
                        },
                    },
                },
                legend: {
                    data: title,
                    top: 10,
                    textStyle: {
                        //图例文字的样式
                        color: "#fff",
                        fontSize: 12,
                    },
                },
                series: [
                    {
                        name: title[0],
                        smooth: true,
                        type: "line",
                        color: ["#2b6ff7"],
                        data: this.PM10ARR,
                    },
                    {
                        name: title[1]==undefined?'':title[1],
                        smooth: true,
                        type: "line",
                        color: ["#42f706"],
                        data: this.NCV10ARR,
                    },
                ],
            });
            var resizeTimer = null;
            window.addEventListener("resize", () => {
                if (resizeTimer) {
                    clearTimeout(resizeTimer);
                }
                resizeTimer = setTimeout(function () {
                    myChart5.resize();
                    console.log('自适应')
                }, 400);
            });
        },



        //排行榜
        orderByList(){
          let that = this;
          let params = {
          };
          ycSjData().then(res => {
              if(res.code == 200){
                  that.orderByData= res.data;
                  let arr1 = [];
                  let arr2 = [];
                  let data = res.data.voProjectDustInfoList;
                  data.forEach(function(item,index,arr){
                    let obj = {value:item.projectName,id:item.deviceId,latitude:item.latitude,longitude:item.longitude,index:index}
                    let obj1 = {value:item.deviceId,id:item.deviceId,latitude:item.latitude,longitude:item.longitude,index:index}
                    arr1.push(obj)
                    arr2.push(obj1)
                  })
                  that.obj1 = arr1;
                  that.obj2 = arr2;
                  that.restaurants = arr1;
                  that.add(true);
              }else{
                this.$message.error(res.message);
              }
            })
            .catch(() => {})
        },
        

        //获取设备数据
        getDeviceData(id){
          let params = {
            deviceId:id
          };
          let that = this;
          ycSjDataDevice(params).then(res => {
              if(res.code == 200){
                  that.deviceData = res.data;
                  that.moreDataList.forEach(function(item,index,arr){
                    if(item.name =='pm10Value'){
                      that.moreDataList[index].num = that.deviceData.pm10Value
                    }else if(item.name =='pm25Value'){
                      that.moreDataList[index].num = that.deviceData.pm25Value
                    }else if(item.name =='voice'){
                      that.moreDataList[index].num = that.deviceData.voice
                    }else if(item.name =='temperature'){
                      that.moreDataList[index].num = that.deviceData.temperature
                    }else if(item.name =='humidity'){
                      that.moreDataList[index].num = that.deviceData.humidity
                    }else if(item.name =='windSpeed'){
                      that.moreDataList[index].num = that.deviceData.windSpeed
                    }else if(item.name =='windDirectionStr'){
                      that.moreDataList[index].num = that.deviceData.windDirectionStr
                    }
                  })
              }else{
                this.$message.error(res.message);
              }
            })
            .catch(() => {})
        },

        formatInt(num, prec = 2, ceil = true){
          const len = String(num).length;
          if (len <= prec) { return num }; 
        
          const mult = Math.pow(10, prec);
          return ceil ? 
            Math.ceil(num / mult) * mult : 
            Math.floor(num / mult) * mult;
        },

        //获取底部弹框实时数据
        getEchartsData(id){
          let that = this;
          let params = {
            deviceId:id
          };
          if(this.dataType){
            oneHourData(params).then(res => {
              if(res.code == 200){
                  that.echartsData = res.data
                  that.NCV10ARR = [];
                  that.PM10ARR = [];
                  that.xData = [];
                  let title = [];
                  if(that.active==0||that.active==1){
                    title = ["pm10", "国控"];
                  }else if(that.active==2){
                    title = ["噪音", "国控"];
                  }else if(that.active==3){
                    title = ["pm2.5", "国控"];
                  }else{
                    title = [that.tagTextWapper[that.active]];
                  }
                  that.echartsData.proDustMonitorInfoList.forEach(function(item,index,arr){
                    let time = item.monitoringTime.split(' ');
                    let time1 = time[1].slice(0,time[1].length-3)
                    that.xData.push(time1)
                    if(that.active==0){
                      that.PM10ARR.push(item.pm10Value)
                      if(that.echartsData.proChinaStandardDataShowList.length>0){
                        that.NCV10ARR.push(that.echartsData.proChinaStandardDataShowList[0].pm10)
                      }
                    }else if(that.active==2){
                      that.PM10ARR.push(item.voice)
                      if(that.echartsData.proChinaStandardDataShowList.length>0){
                        that.NCV10ARR.push(that.echartsData.proChinaStandardDataShowList[0].noise)
                      }
                    }else if(that.active==3){
                      that.PM10ARR.push(item.pm25Value)
                      if(that.echartsData.proChinaStandardDataShowList.length>0){
                        that.NCV10ARR.push(that.echartsData.proChinaStandardDataShowList[0].pm2)
                      }
                    }else if(that.active==4){
                      that.PM10ARR.push(item.temperature)
                    }else if(that.active==5){
                      that.PM10ARR.push(item.humidity)
                    }else if(that.active==6){
                      that.PM10ARR.push(item.windSpeed)
                    }else if(that.active==7){
                      that.PM10ARR.push(item.windDirection)
                    }else if(that.active==8){
                      that.PM10ARR.push(item.tsp)
                    }
                  })
                  that.xData = that.xData.reverse()
                  
                  let max = Math.max(...that.PM10ARR)
                  let max1 = ''
                  if(max < that.NCV10ARR[0]){
                    max1 = that.NCV10ARR[0]
                  }else{
                    max1 = this.formatInt(max,1,true)
                  }
                  that.drawNowData(max1,title);
              }else{
                this.$message.error(res.message);
              }
            })
            .catch(() => {})
          }else{
            oneDayData(params).then(res => {
              if(res.code == 200){
                  that.echartsData = res.data
                  that.NCV10ARR = [];
                  that.PM10ARR = [];
                  that.xData = [];
                  that.echartsData.proDustMonitorInfoList.forEach(function(item,index,arr){
                    let time = item.monitoringTime.split(' ');
                    let time1 = time[1].slice(0,time[1].length-3)
                    that.xData.push(time1)
                    that.PM10ARR.push(item.pm10Value)
                    if(that.echartsData.proChinaStandardDataShowList.length>0){
                      that.NCV10ARR.push(that.echartsData.proChinaStandardDataShowList[index].pm10)
                    }
                  })
                  that.xData = that.xData.reverse()
                  console.log(that.NCV10ARR)
                  let max = Math.max(...that.PM10ARR)
                  let max2 = Math.max(...that.NCV10ARR)
                  let max1 = ''
                  if(max > max2){
                    max1 = max
                  }else{
                    max1 = max2
                  }
                  console.log(max1)
                  that.drawNowData(max1,["pm10", "国控"]);
              }else{
                this.$message.error(res.message);
              }
            })
            .catch(() => {})
          }
        },

        hickState(index){
          let that = this;
          this.active = index
          if(index!=1){
            that.dataType = 1
          }else{
            that.dataType = 0
          }
          
          that.getEchartsData(that.sn);
        }
       
    },
    mounted() {
        // this.restaurants = this.loadAll();
        this.NowData();
    },
};