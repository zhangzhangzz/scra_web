<!--
 * @Author: your name
 * @Date: 2021-07-26 12:20:22
 * @LastEditTime: 2021-09-17 11:18:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\views\deviceManage\ycMonitor\ycMonitor.vue
-->
<template>
    <div class="ycMonitor" style="height:100%;overflow-y: auto;">
        <globalProject  @queryProId="queryProId" @showList="showList" style="position: absolute;z-index: 999;top: 12px;left: calc(50% - 75px);" v-if="user.userType!=1"/> 
        <div class="all" style="height:100%">
            <div class="row">
                <div class="row" style="width:calc(50% - 0.1rem);margin-right: 0.2rem;">
                    <div class="row dataWapper">
                        <div class="title PM">PM10<br/>PM2.5<br/>数据</div>
                        <div class="row rightBox line">
                            <img src="../../../assets/images/ycMonitor/PM10.svg" />
                            <div class="columns data">
                                <span>PM10小时平均值</span>
                                <span v-if="data.proDustMonitorInfo!=null">{{data.proDustMonitorInfo.pm10Value==null?0:data.proDustMonitorInfo.pm10Value}}μp/m³</span>
                            </div>
                        </div>
                        <div class="row rightBox">
                            <img src="../../../assets/images/ycMonitor/pm25.svg" />
                            <div class="columns data">
                                <span>PM2.5小时平均值</span>
                                <span v-if="data.proDustMonitorInfo!=null">{{data.proDustMonitorInfo.pm25Value==null?0:data.proDustMonitorInfo.pm25Value}}up/m³</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row"  style="width:calc(50% - 0.1rem);">
                    <div class="row dataWapper">
                        <div class="title zy">TSP<br/>噪音<br/>数据</div>
                        <div class="row rightBox line">
                            <img src="../../../assets/images/ycMonitor/tsp.svg" />
                            <div class="columns data">
                                <span>TSP小时平均值</span>
                                <span v-if="data.proDustMonitorInfo!=null">{{data.proDustMonitorInfo.tsp==null?0:data.proDustMonitorInfo.tsp}}up/m³</span>
                            </div>
                        </div>
                        <div class="row rightBox">
                            <img src="../../../assets/images/ycMonitor/zy.svg" />
                            <div class="columns data">
                                <span>噪音小时平均值</span>
                                <span v-if="data.proDustMonitorInfo!=null">{{data.proDustMonitorInfo.voice==null?0:data.proDustMonitorInfo.voice}}dB</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" style="margin-top:0.2rem">
                <div class="row" style="width:calc(50% - 0.1rem);margin-right: 0.2rem;">
                    <div class="row dataWapper">
                        <div class="title wd">温度<br/>湿度<br/>数据</div>
                        <div class="row rightBox line">
                            <img src="../../../assets/images/ycMonitor/wd.svg" />
                            <div class="columns data">
                                <span>温度小时平均值</span>
                                <span v-if="data.proDustMonitorInfo!=null">{{data.proDustMonitorInfo.temperature==null?0:data.proDustMonitorInfo.temperature}}℃</span>
                            </div>
                        </div>
                        <div class="row rightBox">
                            <img src="../../../assets/images/ycMonitor/sd.svg" />
                            <div class="columns data">
                                <span>湿度小时平均值</span>
                                <span v-if="data.proDustMonitorInfo!=null">{{data.proDustMonitorInfo.humidity==null?0:data.proDustMonitorInfo.humidity}}RH</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row"  style="width:calc(50% - 0.1rem);">
                    <div class="row dataWapper">
                        <div class="title fs">风速<br/>风向<br/>数据</div>
                        <div class="row rightBox line">
                            <img src="../../../assets/images/ycMonitor/fs.svg" />
                            <div class="columns data">
                                <span>风速小时平均值</span>
                                <span v-if="data.proDustMonitorInfo!=null">{{data.proDustMonitorInfo.windSpeed==null?0:data.proDustMonitorInfo.windSpeed}}m/s</span>
                            </div>
                        </div>
                        <div class="row rightBox">
                            <img src="../../../assets/images/ycMonitor/fx.svg" />
                            <div class="columns data">
                                <span>风向小时平均值</span>
                                <span v-if="data.proDustMonitorInfo!=null">{{data.proDustMonitorInfo.windDirectionStr==null?0:data.proDustMonitorInfo.windDirectionStr}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row " style="margin-top:0.2rem;height: calc(100% - 3.2rem);">
                <div class="columns tableWapper" style="width:calc(50% - 0.1rem);margin-right: 0.2rem;" v-loading="loading">
                    <div class="row" style="padding:0 0.2rem">
                        <span style="font-size:0.25rem;margin-right:auto">
                            设备信息
                        </span>
                        <div class="row">
                            <el-button size="mini" v-for="(d,index) in deviceList" :key="index" @click="showList1(d.deviceId)">{{d.deviceName}}</el-button>
                        </div>
                    </div>
                    <div class="lineWapper row">
                        <div>项目名称</div>
                        <div>{{data.projectName}}</div>
                    </div>
                    <div class="lineWapper row">
                        <div>设备编号</div>
                        <div>{{data.deviceId}}</div>
                    </div>
                    <div class="lineWapper row">
                        <div>所属区域</div>
                        <div>{{data.regionName}}</div>
                    </div>
                    <div class="lineWapper row">
                        <div>物联网卡号</div>
                        <div>{{data.sim}}</div>
                    </div>
                    <div class="lineWapper row">
                        <div>PM10国控值</div>
                        <div>{{data.chinaStanderPm10Value}}</div>
                    </div>
                    <div class="lineWapper row">
                        <div>设备状态</div>
                        <div>{{ data!=''?(data.onlineStatus===1?'离线':'在线'):''}}</div>
                    </div>
                    <div class="lineWapper row">
                        <div>设备对接</div>
                        <div>{{data.appName}}</div>
                    </div>
                    <div class="lineWapper row">
                        <div>喷淋联动</div>
                        <div class="row">
                            <el-radio-group class="row" v-model="data.proDustDeviceRelayConfig.oneAutomatic" v-if="data.proDustMonitorInfo!=null">
                                <el-radio :label=0 style="width:calc(30% - 0.7rem);margin-left:0.7rem">手动</el-radio>
                                <div class="row">
                                    <el-radio :label=1 style="width:calc(70% - 0.5rem);margin-left:0.5rem" class="row">自动</el-radio>
                                     <div class="inputWapper row" v-if="data.proDustDeviceRelayConfig!=null && data.proDustDeviceRelayConfig.oneAutomatic==1"> 
                                        <el-input type="number" v-model="data.proDustDeviceRelayConfig.oneThreshold" placeholder="请输入PM10阀值" style="width:1.5rem;margin-right:0.1rem"/>
                                        <el-button size="mini" @click="editDeviceInfo" >确认</el-button>
                                    </div>
                                </div>
                            </el-radio-group>
                            <el-switch
                                v-if="data.proDustMonitorInfo!=null"
                                @change="changeSwitch"
                                v-model="data.proDustDeviceRelayConfig.oneState">
                            </el-switch>
                        </div>
                    </div>
                    <div class="lineWapper row">
                        <div>雾炮联动</div>
                        <div class="row" >
                            <el-radio-group class="row" v-model="data.proDustDeviceRelayConfig.twoAutomatic"  v-if="data.proDustMonitorInfo!=null">
                                <el-radio :label=0 style="width:calc(30% - 0.7rem);margin-left:0.7rem">手动</el-radio>
                                <div class="row">
                                    <el-radio :label=1 style="width:calc(70% - 0.5rem);margin-left:0.5rem" class="row">自动</el-radio>
                                     <div class="inputWapper row" v-if="data.proDustDeviceRelayConfig!=null && data.proDustDeviceRelayConfig.twoAutomatic==1"> 
                                        <el-input type="number" v-model="data.proDustDeviceRelayConfig.twoThreshold" placeholder="请输入PM10阀值" style="width:1.5rem;margin-right:0.1rem"/>
                                        <el-button size="mini" @click="editDeviceInfo">确认</el-button>
                                    </div>
                                </div>
                                
                            </el-radio-group>
                            <el-switch
                                v-if="data.proDustMonitorInfo!=null"
                                 @change="changeSwitch1"
                                v-model="data.proDustDeviceRelayConfig.twoState">
                            </el-switch>
                        </div>
                    </div>
                </div>
                
                <div class="row"  style="width:calc(50% - 0.1rem);">
                    <img src="../../../assets/images/ycMonitor/img.png" style="width:100%;height:100%">
                </div>
            </div>

        </div>
    </div>
</template>
<script src="./ycMonitor.js"></script>

<style lang="scss" >
  @import "./ycMonitor.scss"
</style>