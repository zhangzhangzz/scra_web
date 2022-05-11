<template>
  <el-row :gutter="40" class="panel-group row">
    <div class="card-panel-col" v-loading="loading1">
      <div class="card-panel columns" @click="handleSetLineChartData('newVisitis')"  >
        <div class="row" style="width:100%">
          <div class="columns card-panel-description">
            <count-to :start-val="0" :end-val="numberOfVisitorsToday" :duration="2600" class="card-panel-num" />
            <div class="card-panel-text">
              今日进场人数
            </div>
          </div>
          <div class="card-panel-icon-wrapper icon-people row">
            <svg t="1622096617427" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1057" width="30" height="30"><path d="M96 64v320h-64v256h64v320h832V64h-832z m512 448.064V768l213.312 128H160v-256h128v160l320-287.936z m256-335.104v670.016l-192-115.2V292.16l192-115.2z m-512 190.72L512.32 512 352 656.256V576h-256V448h256V367.68zM160 128h661.312L608 256v255.936L288 224V384h-128V128z" fill="#40C9C6" p-id="1058"></path></svg>
          </div>
        </div>
        <el-progress :percentage="50" :show-text="false" color="#ff750f" />
      </div>
    </div>

    <div class="card-panel-col" v-loading="loading2">
      <div class="card-panel columns" @click="handleSetLineChartData('messages')" >
        <div class="row" style="width:100%">
          <div class="columns card-panel-description">
            <count-to :start-val="0" :end-val="numberOfExitsToday" :duration="2600" class="card-panel-num" />
            <div class="card-panel-text">
              今日离场人数
            </div>
          </div>
          <div class="card-panel-icon-wrapper icon-people row">
            <!-- <svg-icon icon-class="message" class-name="card-panel-icon" /> -->
            <svg t="1622096590552" class="icon goout" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4854" width="30" height="30"><path d="M928 64v376.064L1008 512 928 583.936V960h-832V64h832z m-64 64H192l192 128v512l-192 128h672v-254.464L688 800V640h-256V384h256V224l176 158.464V128z m-704 55.552v656.832L320 733.696V290.24L160 183.552z m592 184.128V448h-256v128h256v80.256L912.32 512 752 367.68z" fill="#40C9C6" p-id="4855"></path></svg>
          </div>
        </div>
        <el-progress :percentage="50" :show-text="false" color="#ff750f" />
      </div>
    </div>
    <div class="card-panel-col" v-loading="loading3">
      <div class="card-panel columns" @click="handleSetLineChartData('shoppings')" >
        <div class="row" style="width:100%">
          <div class="columns card-panel-description">
            <count-to :start-val="0" :end-val="numberOfPeopleEnteredToday" :duration="2600" class="card-panel-num" />
            <div class="card-panel-text">
              当日采集
            </div>
          </div>
          <div class="card-panel-icon-wrapper icon-people row">
            <svg t="1622099661782" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9814" width="30" height="30"><path d="M910.222222 815.672889v-512a85.333333 85.333333 0 0 0-85.333333-85.333333h-625.777778a85.333333 85.333333 0 0 0-85.333333 85.333333v512a85.333333 85.333333 0 0 0 85.333333 85.333333h625.777778a85.333333 85.333333 0 0 0 85.333333-85.333333z m-711.111111 142.222222a142.222222 142.222222 0 0 1-142.222222-142.222222v-512a142.222222 142.222222 0 0 1 142.222222-142.222222h625.777778a142.222222 142.222222 0 0 1 142.222222 142.222222v512a142.222222 142.222222 0 0 1-142.222222 142.222222h-625.777778z" p-id="9815" fill="#40C9C6"></path><path d="M498.972444 494.364444a28.444444 28.444444 0 1 1 0-56.888888h56.888889a28.444444 28.444444 0 0 1 0 56.888888h-56.888889zM498.972444 639.431111a28.444444 28.444444 0 1 1 0-56.888889h56.888889a28.444444 28.444444 0 0 1 0 56.888889h-56.888889zM498.972444 784.497778a28.444444 28.444444 0 1 1 0-56.888889h56.888889a28.444444 28.444444 0 0 1 0 56.888889h-56.888889zM288.768 639.431111a28.444444 28.444444 0 1 1 0-56.888889h56.888889a28.444444 28.444444 0 1 1 0 56.888889h-56.888889zM288.768 784.497778a28.444444 28.444444 0 1 1 0-56.888889h56.888889a28.444444 28.444444 0 1 1 0 56.888889h-56.888889zM731.079111 494.364444a28.444444 28.444444 0 0 1 0-56.888888h56.888889a28.444444 28.444444 0 1 1 0 56.888888h-56.888889zM731.079111 639.431111a28.444444 28.444444 0 0 1 0-56.888889h56.888889a28.444444 28.444444 0 1 1 0 56.888889h-56.888889zM731.079111 784.497778a28.444444 28.444444 0 0 1 0-56.888889h56.888889a28.444444 28.444444 0 1 1 0 56.888889h-56.888889zM256 94.549333a28.444444 28.444444 0 1 1 56.888889 0v170.666667a28.444444 28.444444 0 0 1-56.888889 0v-170.666667zM711.111111 94.549333a28.444444 28.444444 0 1 1 56.888889 0v170.666667a28.444444 28.444444 0 1 1-56.888889 0v-170.666667z" p-id="9816" fill="#40C9C6"></path><path d="M400.099556 367.502222L317.155556 450.56l-31.914667-32.028444a24.974222 24.974222 0 0 0-35.271111 35.271111l52.792889 52.792889a25.031111 25.031111 0 0 0 27.306666 5.233777 27.192889 27.192889 0 0 0 10.979556-6.485333l98.417778-98.474667c10.865778-10.922667 10.865778-28.501333 0-39.424a27.932444 27.932444 0 0 0-39.367111 0z" p-id="9817" fill="#40C9C6"></path></svg>
          </div>
        </div>
        <el-progress :percentage="100" :show-text="false" color="#ff750f" />
      </div>
    </div>
    <div class="card-panel-col" v-loading="loading4">
      <div class="card-panel columns" @click="handleSetLineChartData('purchases')" v-if="nowData4!==''">
        <div class="row" style="width:100%">
          <div class="columns card-panel-description">
            <count-to :start-val="0" :end-val="nowData4.numberOfPeopleOnSiteTodayTotal" :duration="2600" class="card-panel-num" />
            <div class="card-panel-text">
              现场人数
            </div>
          </div>
          <div class="card-panel-icon-wrapper icon-people row">
            <svg t="1622180662910" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2067" width="30" height="30"><path d="M261.7 522.6h0.2c19.3 0 35-15.7 35-35s-15.7-35-35-35c-31.9 0-58.8-37.7-58.8-82.4s26.9-82.4 58.8-82.4c19.3 0 35-15.7 35-35s-15.7-35-35-35c-35.4 0-69.5 17.3-93.7 47.5-22.6 28.4-35.1 65.6-35.1 104.9s12.5 76.5 35.1 104.9c0.6 0.8 1.3 1.6 2 2.4-22.9 13.2-43.4 31-61.1 53.2-38.3 48-59.5 111.4-59.5 178.4 0 19.3 15.7 35 35 35s35-15.7 35-35c0-51.2 15.7-99.1 44.1-134.7 26.6-33.3 61.3-51.7 97.7-51.7 0.2 0 0.3-0.1 0.3-0.1zM914.8 530.7c-17.7-22.2-38.2-40-61.1-53.2 0.7-0.8 1.3-1.6 2-2.4 22.6-28.4 35.1-65.6 35.1-104.9s-12.5-76.5-35.1-104.9c-24.1-30.2-58.3-47.5-93.7-47.5-19.3 0-35 15.7-35 35s15.7 35 35 35c31.9 0 58.8 37.7 58.8 82.4s-26.9 82.4-58.8 82.4c-19.3 0-35 15.7-35 35s15.7 35 35 35H762.3c36.4 0 71.1 18.4 97.7 51.7 28.5 35.6 44.1 83.5 44.1 134.7 0 19.3 15.7 35 35 35s35-15.7 35-35c0.2-67-21-130.3-59.3-178.3z" p-id="2068" fill="#40C9C6"></path><path d="M747.4 541c-30.9-30.8-66.9-54.7-106.1-70.8 40.3-34.7 65.8-86 65.8-143.2 0-104.2-84.8-188.9-188.9-188.9-104.2 0-188.9 84.8-188.9 188.9 0 57 25.4 108.2 65.4 142.9C355.2 486 318.9 510 287.8 541c-61.2 61.1-95.1 142.4-95.5 228.9V850.8c0 19.3 15.7 35 35 35h580.5c19.3 0 35-15.7 35-35v-80.2-0.8c-0.3-86.4-34.2-167.6-95.4-228.8zM518.2 208.1c65.6 0 118.9 53.4 118.9 118.9s-53.4 118.9-118.9 118.9S399.3 392.6 399.3 327s53.4-118.9 118.9-118.9z m254.7 607.8H262.3v-44.6-0.6c0.2-140.5 114.8-254.8 255.3-254.8s255 114.3 255.3 254.8v45.2z" p-id="2069" fill="#40C9C6"></path></svg>
          </div>
          <div class="progress_zdy">
            <div class="row">
              <!-- <el-progress v-if="nowData4!==''" :percentage="0" :show-text="false" color="#ff750f" /> -->
              <div class="l_line" :style="{width:((nowData4.numberOfOnsiteNonManagementPersonnelToday/nowData4.numberOfPeopleOnSiteTodayTotal*100)-2+'%')}"></div>
              <div class="l_text" >劳务工 : {{nowData4.numberOfOnsiteNonManagementPersonnelToday}}</div>
              <div class="c_line" :style="{left:(nowData4.numberOfOnsiteNonManagementPersonnelToday/nowData4.numberOfPeopleOnSiteTodayTotal*100)-2+'%'}" v-if="nowData4.numberOfOnsiteNonManagementPersonnelToday/nowData4.numberOfPeopleOnSiteTodayTotal!==1 && nowData4.numberOfOnsiteManagementPersonnelToday/nowData4.numberOfPeopleOnSiteTodayTotal!==1"></div>
              <div class="r_line" :style="{width:(nowData4.numberOfOnsiteManagementPersonnelToday/nowData4.numberOfPeopleOnSiteTodayTotal*100+'%')}"></div>
              <div class="r_text">管理员:{{nowData4.numberOfOnsiteManagementPersonnelToday}}  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-panel-col" v-loading="loading5">
      <div class="card-panel columns" @click="handleSetLineChartData('shoppings')" v-if="itemData5!==''">
        <div class="row" style="width:100%;position: relative;">
          <div class="columns card-panel-description">
            <count-to :start-val="0" :end-val="itemData5.numberOfPeopleInProjectTotal" :duration="2600" class="card-panel-num" />
            <div class="card-panel-text">
              项目总人数
            </div>
          </div>
          <div class="card-panel-icon-wrapper icon-people row">
            <svg t="1622096491329" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3786" width="30" height="30"><path d="M327.6 682.7c-31.8-31.5-49.7-74.4-49.7-119.3V385.3c0-33.5 9.8-64.7 26.8-91-7.8-1.9-15.7-2.9-23.7-2.9H154.3c-56.6 0-102.9 46.9-102.9 104v163.7c0 38.8 21.5 74.4 55.7 92.3v319.9h83l30.6-202.5 30.6 202.5h76.4V682.7z m304.1-18.5c36.3-18.8 61.2-57.1 61.2-100.8V385.3c0-62.2-50.4-113.2-112-113.2h-138c-61.6 0-112 50.9-112 113.2v178.1c0 43.6 24.7 81.6 60.6 100.5V1012H482l33.3-220.3 33.3 220.3h83.1V664.2zM515.1 12c65.2 0 118 53.4 118 119.3 0 65.8-52.8 119.3-118 119.3s-118-53.4-118-119.3c0-66.1 52.8-119.3 118-119.3z m182.2 670.7v288.8h76.4L804.3 769l30.6 202.5H918V651.7c33-17.4 55.6-52.3 55.6-92.3V395.6c0-57.2-46.4-104-103-104H744.1c-8.2 0-16.2 1-23.7 2.9 17.6 27.1 26.9 58.7 26.8 91v178.1c0 45.4-18.5 88.2-49.9 119.1zM804.6 52.4c-60 0-108.5 49-108.5 109.5s48.5 109.6 108.5 109.6c59.8 0 108.3-49 108.3-109.6 0-60.6-48.5-109.5-108.3-109.5z m-584.1 0c59.8 0 108.5 49 108.5 109.5s-48.5 109.6-108.5 109.6c-59.9 0-108.3-49-108.3-109.6-0.1-60.6 48.4-109.5 108.3-109.5z" fill="#40C9C6" p-id="3787"></path></svg>
          </div>
          <div class="progress_zdy">
            <div class="row">
              <!-- <el-progress v-if="itemData5!==''" :percentage="0" :show-text="false" color="#ff750f" /> -->
              <div class="l_line" :style="{width:(itemData5.numberOfNonManagementPersonnelInProject/itemData5.numberOfPeopleInProjectTotal*100)-2+'%'}"></div>
              <div class="l_text">劳务工 : {{itemData5.numberOfNonManagementPersonnelInProject}}</div>
              <div class="c_line" :style="{left:(itemData5.numberOfNonManagementPersonnelInProject/itemData5.numberOfPeopleInProjectTotal*100)-2+'%'}" v-if="itemData5.numberOfNonManagementPersonnelInProject/itemData5.numberOfPeopleInProjectTotal!=1 && itemData5.numberOfManagementPersonnelInProject/itemData5.numberOfPeopleInProjectTotal!=1"></div>
              <div class="r_line" :style="{width:itemData5.numberOfManagementPersonnelInProject/itemData5.numberOfPeopleInProjectTotal*100+'%'}"></div>
              <div class="r_text">管理员:{{itemData5.numberOfManagementPersonnelInProject}} </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <div class="card-panel-col" v-loading="loading6">
      <div class="card-panel columns" @click="handleSetLineChartData('shoppings')"  v-if="jWData6!==''">
        <div class="row" style="width:100%">
          <div class="columns card-panel-description">
            <count-to :start-val="0" :end-val="jWData6.numberOfUploadConstructionCommittees+jWData6.numberOfNonUploadConstructionCommittees" :duration="2600" class="card-panel-num" />
            <div class="card-panel-text">
              上传建委
            </div>
          </div>
          <div class="card-panel-icon-wrapper icon-people row">
            <svg t="1622099581466" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7222" width="30" height="30"><path d="M771.676772 844.966484l-493.818868-2.409202C155.877326 826.595933 63.123554 722.814917 63.123554 597.698178c0-130.716368 102.592286-238.521254 231.509687-246.711313 49.19257-103.481018 153.09031-169.576911 268.529285-169.576911 163.496056 0 296.588862 132.64332 297.338346 295.968388 60.968276 35.243157 98.267394 99.284112 98.267394 170.402163 0 97.314157-71.032044 179.008943-165.167037 194.371318l-21.924457 2.814661z m-459.914953-43.849937l458.661718-0.48225c81.031308-4.62489 144.493769-71.770266 144.493768-152.854816 0-59.084327-33.145216-111.895308-86.501928-137.82418l-12.921432-6.284608 0.888732-19.292047c0.127986-1.87371 0.267234-3.736158 0.267234-5.63137 0-139.772633-113.715776-253.488409-253.488409-253.488409-102.463276 0-194.264834 61.086022-233.875886 155.627498l-5.598605 13.370918-14.495144 0.086007c-111.499064 0.653239-202.219399 91.876302-202.2194 203.353864 0 108.704881 85.142208 197.830003 193.825588 202.904379l10.963764 0.515014z" fill="#40C9C6" p-id="7223"></path><path d="M532.875998 390.961396L370.321916 553.516502l34.921657 34.921657 102.935287-102.935287V711.5317h49.385061V485.502872l102.934263 102.935287 34.93292-34.921657z" fill="#40C9C6" p-id="7224"></path></svg>
          </div>
        </div>
        <div class="progress_zdy">
            <div class="row">
              <!-- <el-progress v-if="data.numberOfPeopleInProject.numberOfUploadConstructionCommittees==0 && data.numberOfPeopleInProject.numberOfNonUploadConstructionCommittees==0" :percentage="0" :show-text="false" color="#ff750f" /> -->
              <div class="l_line" :style="{width:(jWData6.numberOfUploadConstructionCommittees/(jWData6.numberOfUploadConstructionCommittees+jWData6.numberOfNonUploadConstructionCommittees)*100)-2+'%'}"></div>
              <div class="l_text">已上传 : {{jWData6.numberOfUploadConstructionCommittees}}</div>
              <div class="c_line" :style="{left:(jWData6.numberOfUploadConstructionCommittees/(jWData6.numberOfUploadConstructionCommittees+jWData6.numberOfNonUploadConstructionCommittees)*100)-2+'%'}" v-if="jWData6.numberOfUploadConstructionCommittees/(jWData6.numberOfUploadConstructionCommittees+jWData6.numberOfNonUploadConstructionCommittees)!=1 && jWData6.numberOfNonUploadConstructionCommittees/(jWData6.numberOfUploadConstructionCommittees+jWData6.numberOfNonUploadConstructionCommittees)!=1"></div>
              <div class="r_line" :style="{width:jWData6.numberOfNonUploadConstructionCommittees/(jWData6.numberOfUploadConstructionCommittees+jWData6.numberOfNonUploadConstructionCommittees)*100+'%'}"></div>
              <div class="r_text"> 未上传: {{jWData6.numberOfNonUploadConstructionCommittees}}</div>
            </div>
          </div>
      </div>
    </div>

    <div class="card-panel-col" v-loading="loading6">
      <div class="card-panel columns" @click="handleSetLineChartData('shoppings')" v-if="jWData6!==''">
        <div class="row" style="width:100%">
          <div class="columns card-panel-description">
            <count-to :start-val="0" :end-val="jWData6.numberOfSimultaneousConstructionCommittees+jWData6.numberOfNonSimultaneousConstructionCommittees" :duration="2600" class="card-panel-num" />
            <div class="card-panel-text">
               同步建委
            </div>
          </div>
          <div class="card-panel-icon-wrapper icon-people row">
            <svg t="1622099619994" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8856" width="30" height="30"><path d="M752 240l-13.632 4.544a349.376 349.376 0 0 0-569.088 189.696l-67.712 22.592a411.648 411.648 0 0 1 676.544-261.568L923.072 96l4.928 320zM640 672H384a32 32 0 0 1 0-64h256a32 32 0 0 1 0 64z m0-256H384a32 32 0 0 1 0-64h256a32 32 0 0 1 0 64z m0 128H384a32 32 0 0 1 0-64h256a32 32 0 0 1 0 64z m-354.432 235.456a349.44 349.44 0 0 0 569.152-189.696l67.712-22.592A411.648 411.648 0 0 1 245.888 828.8L100.928 928l-4.928-320 176 176z" fill="#40C9C6" p-id="8857"></path></svg>
          </div>
        </div>
        <div class="progress_zdy">
            <div class="row">
              <!-- <el-progress v-if="jWData6.numberOfSimultaneousConstructionCommittees==0 && jWData6.numberOfNonSimultaneousConstructionCommittees==0" :percentage="0" :show-text="false" color="#ff750f" /> -->
              <div class="l_line" :style="{width:jWData6.numberOfSimultaneousConstructionCommittees/(jWData6.numberOfSimultaneousConstructionCommittees+jWData6.numberOfNonSimultaneousConstructionCommittees)*100+'%'}"></div>
              <div class="l_text">已同步 : {{jWData6.numberOfSimultaneousConstructionCommittees}}</div>
              <div class="c_line" :style="{left:jWData6.numberOfSimultaneousConstructionCommittees/(jWData6.numberOfSimultaneousConstructionCommittees+jWData6.numberOfNonSimultaneousConstructionCommittees)*100-1+'%'}" v-if="jWData6.numberOfSimultaneousConstructionCommittees/(jWData6.numberOfSimultaneousConstructionCommittees+jWData6.numberOfNonSimultaneousConstructionCommittees)!=1 && jWData6.numberOfNonSimultaneousConstructionCommittees/(jWData6.numberOfSimultaneousConstructionCommittees+jWData6.numberOfNonSimultaneousConstructionCommittees)!=1"></div>
              <div class="r_line" :style="{width:jWData6.numberOfNonSimultaneousConstructionCommittees/(jWData6.numberOfSimultaneousConstructionCommittees+jWData6.numberOfNonSimultaneousConstructionCommittees)*100+'%'}"></div>
              <div class="r_text">未同步 : {{jWData6.numberOfNonSimultaneousConstructionCommittees}}</div>
            </div>
          </div>
      </div>
    </div>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import {getNumberOfCome,getNumberOfExitMan,getNumberOfInsert,getNumberOfPerople,getNumberOfTotal,getNumberOfJw} from '@/api/api.js'
export default {
  components: {
    CountTo
  },
  props: {
    width: {
      type: String,
      default: '0'
    },
    width1: {
      type: String,
      default: '0'
    },
    num: {
      type: String,
      default: '0'
    },
    num1: {
      type: String,
      default: '0'
    },
    data:''
  },
  data(){
    return{
      numberOfVisitorsToday:0,
      numberOfExitsToday:0,
      numberOfPeopleEnteredToday:0,
      nowData4:'',
      itemData5:'',
      jWData6:'',
      loading1:false,
      loading2:false,
      loading3:false,
      loading4:false,
      loading5:false,
      loading6:false,
    }
  },
  mounted(){
    this.queryTodayComeNum();
    this.queryExitNum();
    this.queryNowManNum();
    this.queryInsertNum();
    this.queryTotalNum();
    this.queryJwNum();
  },
  methods: {
    handleSetLineChartData(type) {
      // this.$emit('handleSetLineChartData', type)
    },

    //获取今日进场人数
    queryTodayComeNum(){
      let that = this;
      that.loading1 = true;
      getNumberOfCome().then(res => {
        if(res.code == 200){
          that.numberOfVisitorsToday = res.data.numberOfVisitorsToday;
          this.loading1 = false;
        }else{
          this.$message.error(res.message);
          this.loading1 = false;
        }
      })
      .catch(() => {}) 
    },

    //获取今日退场人数
    queryExitNum(){
      let that = this;
      that.loading2 = true;
      getNumberOfExitMan().then(res => {
        if(res.code == 200){
          that.numberOfExitsToday = res.data.numberOfExitsToday;
          this.loading2 = false;
        }else{
          this.$message.error(res.message);
          this.loading2 = false;
        }
      })
      .catch(() => {}) 
    },

    //获取现在现场人数
    queryNowManNum(){
      let that = this;
      that.loading4 = true;
      getNumberOfPerople().then(res => {
        if(res.code == 200){
          that.nowData4 = res.data.numberOfPeopleOnSiteToday;
          this.loading4 = false;
        }else{
          this.$message.error(res.message);
          this.loading4 = false;
        }
      })
      .catch(() => {}) 
    },

    //获取今日录入人数
    queryInsertNum(){
      let that = this;
      that.loading3 = true;
      getNumberOfInsert().then(res => {
        if(res.code == 200){
          that.numberOfPeopleEnteredToday = res.data.numberOfPeopleEnteredToday;
          this.loading3 = false;
        }else{
          this.$message.error(res.message);
          this.loading3 = false;
        }
      })
      .catch(() => {}) 
    },

    //获取项目总人数
    queryTotalNum(){
      let that = this;
      that.loading5 = true;
      getNumberOfTotal().then(res => {
        if(res.code == 200){
          that.itemData5 = res.data.numberOfPeopleInProject;
          this.loading5 = false;
        }else{
          this.$message.error(res.message);
          this.loading5 = false;
        }
      })
      .catch(() => {}) 
    },

    //获取项目需上传建委人数
    queryJwNum(){
      let that = this;
      that.loading6 = true;
      getNumberOfJw().then(res => {
        if(res.code == 200){
          that.jWData6 = res.data.numberOfPeopleInConstructionCommittees;
          this.loading6 = false;
        }else{
          this.$message.error(res.message);
          this.loading6 = false;
        }
      })
      .catch(() => {}) 
    },

    
  }
}
</script>

<style lang="scss">
.panel-group {
  margin : 0 0 15px!important;

  .card-panel-col {
    flex: 1;
    padding:10px 20px 30px;
    border-radius: 5px;
    margin: auto 20px auto 0;
    background-color: #fff;
    
    // padding-right: 2%;
    .progress_zdy{
      position: absolute;
      width: 100%;
      bottom: -3px;
      .row{
        height: 6px;
        position: relative;
        width: 100%;
        .l_line{
          background-color: #ff750f;
          border-radius: 100px; 
        }

        .l_text{
          position: absolute;
          font-size: 10px;
          color: rgba(0, 0, 0, 0.6);
          left: 0;
          bottom: -20px;
        }

        .c_line{
          position: absolute;
          background-color: #fff;
          width: 4px;
          height: 12px;
          top: -3px;
          transform: rotate(45deg);
        }

        .r_line{
          background-color: rgb(255,195,30);
          border-radius: 100px ; 
        }

        .r_text{
          position: absolute;
          font-size: 10px;
          color: rgba(0, 0, 0, 0.6 );
          right: 0;
          bottom: -20px;
        }
      }
      
    }
  }

  .card-panel-col:nth-of-type(7){
   margin-right: 0;
  }

  .el-progress{
    width: 100%;
    .el-progress-bar__outer{
      background-color: #f5f6f7;
    }
  }

  .card-panel {
    // padding: 16px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    // overflow: hidden;
    color: #666;
    border-color: rgba(0, 0, 0, .05);

    

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      // float: left;
      margin:  18px 0 auto auto;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      .icon{
        margin:auto 0;
      }
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      // float: right;
      margin: auto auto auto 0;

      .card-panel-text {
        line-height: 14px;
        color: rgba(0, 0, 0, 0.7);
        font-size: 15px;
        // font-weight: bold;
        margin-bottom: 15px;
      }

      .card-panel-num {
        font-size: 25px;
        color: #000;
        margin: 18px auto 18px 0;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
