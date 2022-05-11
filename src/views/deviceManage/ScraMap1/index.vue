<!--
 * @Description: 
 * @Author: zhangjing
 * @Date: 2021-05-14 09:14:07
 * @LastEditTime: 2021-12-23 20:21:51
-->
<template>
  <div class="allScra">
    <div class="row searchWapper">
      <el-select v-model="value" placeholder="请选择"  @change="changeSelect" class="select1">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-autocomplete
        class="inline-input"
        v-model="state2"
        suffix-icon="el-icon-search"
        :fetch-suggestions="querySearch"
        placeholder="请输入关键字"
        @select="handleSelect"
      ></el-autocomplete>
    </div>

    <div class="row onLineWapper">
      <span>设备数：{{orderByData.deviceTotal}}</span>
      <span>离线数：{{orderByData.deviceOfflineNumber}}</span>
      <span>在线数：{{orderByData.deviceOnlineNumber}}</span>
    </div>

    <div class="leftBar">
      <div class="f_title">筛选</div>
      <div class="columns f_con_type">
        <div class="row second">
          <span>工地显示</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="choose">所有工地</div>
        <div class="rightBar row">
          <div class="kb"></div>
          <div class="r_b">
            <!-- <el-radio-group v-model="checkList" @change="areaChange"> -->
              <el-radio :label="1" >所有工地</el-radio>
              <el-radio :label="2" >在线</el-radio>
              <el-radio :label="3" >离线</el-radio>
              <el-radio :label="4">一次超标</el-radio>
              <el-radio :label="5">二次超标</el-radio>
            <!-- </el-radio-group> -->
          </div>
        </div>
      </div>
      <div class="columns f_con_type">
        <div class="row second">
          <span>工地类型</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="choose" style="opacity: 0">市政</div>
        <div class="rightBar row">
          <div class="kb"></div>
          <div class="r_b">
            <el-checkbox-group v-model="checkList1">
              <el-checkbox label="所有"></el-checkbox>
              <el-checkbox label="房建"></el-checkbox>
              <el-checkbox label="轨道交通"></el-checkbox>
              <el-checkbox label="市政"></el-checkbox>
              <el-checkbox label="深基坑"></el-checkbox>
              <el-checkbox label="装饰装修"></el-checkbox>
              <el-checkbox label="砂浆站"></el-checkbox>
              <el-checkbox label="混凝土"></el-checkbox>
              <el-checkbox label="砂浆混凝土"></el-checkbox>
              <el-checkbox label="城管委"></el-checkbox>
              <el-checkbox label="交通运输局"></el-checkbox>
              <el-checkbox label="公园城市局"></el-checkbox>
              <el-checkbox label="水务局"></el-checkbox>
              <el-checkbox label="规自局"></el-checkbox>
              <el-checkbox label="经信局"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="columns map_show_option">
        <div class="row">
          <span>所有工地</span>
          <el-switch v-model="value_1" @change="add"></el-switch>
        </div>
        <div class="row">
          <span>区域边界</span>
          <el-switch v-model="value_2"></el-switch>
        </div>
        <div class="row">
          <span>显示数值</span>
          <el-switch v-model="value_3" @change="showNum"></el-switch>
        </div>
      </div>
    </div>

    <div
      :class="!pickerState ? 'picBack picBack_hide' : 'picBack_show picBack'" 
      v-click-outside="Close"
    >
    
      <div class="tops" :style="{borderBottom:onlineStatus==0?'1px solid rgba(255, 255, 255, 0.2)':'0'}">
        <div class="row topWapper1">
          <img src="../../../assets/images/scramap/zxt.svg" />
          <span style="color:#fff">{{ proname }}</span>
          <!-- <span>设备ID:{{ sn }}</span> -->
          <span class="selectWapper ">
            <el-select v-model="sn" placeholder="请选择" v-if="deviceList.length>0" @change="changeSelect1" >
              <el-option
                v-for="item in deviceList"
                :key="item.deviceId"
                :label="item.deviceId"
                :value="item.deviceId">
              </el-option>
            </el-select>
          </span>
          <span>超标记录</span>
          <img src="../../../assets/images/scramap/video.svg" style="margin-left:0.1rem"/>
          <span>视频</span>
          <span>离线预警</span>
          <img src="../../../assets/images/scramap/refresh.svg" style="width:0.2rem;height:0.2rem;margin-left:auto;cursor: pointer;"/>
          <img src="../../../assets/images/scramap/close.svg" @click="Closebg" style="width:0.22rem;height:0.22rem;margin-left:0.2rem;cursor: pointer;"/>
        </div>
        <!-- 更多数据 -->
        <div class="moreData row">
          <div class="columns" v-for="m in moreDataList" v-if="onlineStatus==0">
            <div class="row">
              <span>
                <span class="num">{{m.num==null?0:m.num}}</span> 
                <span class="unit">(单位：{{m.unit}})</span>
              </span>
            </div>
            <div class="bottom_text">{{m.label}}</div>
          </div>
          <div id="fourth"></div>
          <div class="row" v-if="onlineStatus==1" style="color:#fff;margin-left:20%">
              
              <div class="columns"> 
                <span style="font-size:22px;margin-top:auto">{{deviceData.offlineTime}}</span>  
                <span style="margin:auto 0">最后在线时间：{{deviceData.lastTime}}</span>
              </div>
          </div>
        </div>
      </div>
      <div class="bottoms" v-if="onlineStatus==0">
        <div class="tabWapper1 row">
          <div v-for="(t,index) in tagTextWapper" :key="index" @click="hickState(index)">
            <span :class="active==index?'lineScra':''"></span>
            <span class="lineText" >{{t}}</span>
          </div>
        </div>
        <div class="bottoms_B">
          <div id="myChart5"></div>
        </div>
      </div>
    </div>

    <!-- 右侧bar -->
    <div
      :class="rightBar ? 'posirig posirig_show' : 'posirig posirig_hide'"
      id="posirigs"
      v-clickoutside="close1"
    >
      <div>
        <!-- 1 -->
        <div>
          <div class="columns" @click="showp" :style="{color:type == 0?'#888':'#045B9C'}">排行</div>
        </div>
        <!-- 2 -->
        <!-- <div>
          <div class="columns" @click="showt" :style="{color:type == 1?'#888':'#045B9C'}">统计</div>
        </div> -->
      </div>
      <div class="posirig_right">
        <div v-show="type == 1" class="sort">
          <div v-for="(item, i) of orderByData.voProjectDustInfoList" v-if="orderByData.length!=0" :key="i">
            <ul>
              <li class="row">
                <p class="l0">
                  <span class="l1">{{ i + 1 }}</span>
                  <span>{{item.projectName}}</span>
                </p>
              </li>
              <li>
                <span>ID:</span>
                <span>{{item.deviceId}}</span>
                <span>在线率:</span>
                <span>{{ item.onlineRate }}</span>
              </li>
            </ul>

            <div class="columns" style="border-left: 1px solid #e6e6e6">
              <p>PM10</p>
              <p>{{ item.pm10Value }}</p>
              <p style="margin: 0 0 auto 0">
                国控<span>{{ item.chinaStandardPm10Value }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- <div class="close" @click="Close()">X</div> -->
        <!-- 统计 -->
        <div class="tong" v-show="type == 0">
          <div>
            <div id="myChart"></div>
            <p style="font-size: 40px">
              0<span style="font-size: 14px; color: #999">次</span>
            </p>
          </div>
          <div>
            <div id="myChart2"></div>
            <p style="font-size: 40px">
              0<span style="font-size: 14px; color: #999">次</span>
            </p>
          </div>
          <div>
            <div id="myChart3" style="margin-top:auto"></div>
            <ul style="margin-top:auto">
              <li>
                <img src="../../../assets/images/scramap/curcler.png" />
                <span>超标:</span>
                <span>0.000%</span>
              </li>
              <li>
                <img src="../../../assets/images/scramap/curcleh.png" />
                <span>未超标:</span>
                <span>100.000%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- <baidu-map
      ak="epeLWQ4Br29IIKkmMPsD9RZGeMPSOysj"
      :center="center"
      :zoom="zoom"
      @ready="handler"
      style="height: 100vh"
      :scroll-wheel-zoom="true"
    >
    </baidu-map> -->
    <baidu-map
      :center="center"
      :zoom="zoom"
      @ready="handler"
      style="height: 100vh"
      :scroll-wheel-zoom="true"
    >
    </baidu-map>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" scoped></style>