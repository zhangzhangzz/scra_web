<!--
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-09-13 11:42:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\layout\components\Sidebar\index.vue
-->
<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
      ref="menu"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
         :router="true" 
        mode="vertical"
        @open="handleOpen"
      >

      <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" style="height:56px;line-height:56px;text-align:center"/>
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" :isShow="sidebar.opened"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import Hamburger from '@/components/Hamburger'
import SidebarItem from './SidebarItem'
import router from '../../../router'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo,Hamburger },
  data(){
    return{
      c:''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },

    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    handleOpen(key, keyPath) {
      let routeData = this.$store.getters.permission_routes;
      console.log(routeData)
      let path = '';
      try{
        routeData.forEach(function(item,index) {
              if(item.path == keyPath){
                  path = item.redirect
                  throw new Error("EndIterative");
              }
              console.log(index); // first second
          });
      }catch(e){
          if(e.message != "EndIterative") throw e;
      }// 下面的代码不影响继续执行
      // console.log(path)
      router.push(path)
      },
  }
}
</script>
