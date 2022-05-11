<template>
  <div>
    <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div :class="{hasTagsView:needTagsView}" class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar @toIndex="getIndex" :data="mailNum"/>
        <!-- <tags-view v-if="needTagsView" /> -->
        </div>
        <app-main />
        <div class="Bottom"><a href="https://beian.miit.gov.cn/"> Copyright © 2019 蜀工云 版权所有</a></div>
        <right-panel v-if="showSettings">
          <settings />
        </right-panel>
      </div>
    </div>
    <phone-first v-if="index==1" @toIndex="getIndex" />
    <phone-second v-if="index==2" @toIndex="getIndex" />
    <password-first v-if="index==3" @toIndex="getIndex" />
    <mail-first v-if="index==4" @toIndex="getIndex" />
    <mail-second v-if="index==5" @toIndex="getIndex" />
    <!-- <message-box v-if="index==6" @toIndex="getIndex" :data="index"/> -->
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import PhoneFirst from '../components/custom/PhoneFist/PhoneFist.vue'
import PhoneSecond from '../components/custom/PhoneSecond/PhoneSecond.vue'
import PasswordFirst from '../components/custom/PasswordFirst/PasswordFirst.vue'
import MailFirst from '../components/custom/MailFirst/MailFirst.vue'
import MailSecond from '../components/custom/MailSecond/MailSecond.vue'
// 右下角弹窗
import messageBox from '../components/custom/messageBox/messageBox.vue'
import axios from 'axios'
import { getToken } from '@/utils/auth'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    PhoneFirst,
    PhoneSecond,
    PasswordFirst,
    MailFirst,
    MailSecond,
    messageBox
  },
  mixins: [ResizeMixin],
  data() {
    return {
      index: 100,
      mailNum:''
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        if(route.path!='/login'){
          let url = process.env.VUE_APP_BASE_API;
          let that = this;
          const query = route.query
          let params = {};
          axios.get(url+"/pro/inMailController/getUnreadMail", { params, headers: { token: getToken()}},
            ).then((res) => {
              if(res.data.code == 200){
                that.mailNum = res.data.data;
              }     
          });
        } 
        
      },
      immediate: true
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    getIndex(val) {
      this.index = val
      console.log(this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .Bottom{
    height: 34px;
    line-height: 34px;
    text-align: center;
    font-size: 14px;
    background-color: #eee;
  }
</style>
