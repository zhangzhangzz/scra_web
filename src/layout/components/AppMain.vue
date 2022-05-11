<!--
 * @Author: your name
 * @Date: 2021-05-27 10:28:57
 * @LastEditTime: 2021-11-26 14:05:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scra_web1\src\layout\components\AppMain.vue
-->
<template>
  <section class="app-main">
    <div>
      <div class="page-title">{{$route.name}}</div>
      
    </div>
    
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data(){
    return{
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  created() {
    
  },
  methods:{
  }
}
</script>


<style lang="scss" >
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - 100px);
  width: 100%;
  // min-width: 1100px; 
  position: relative;
  overflow: hidden;
  background-color: #f6f7f8;
  padding-top:57px;

  
  
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    height: calc(100vh - 100px);
    background-color: #fff;
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}

.el-dropdown-menu{
  margin-top: -10px!important;
}
</style>
