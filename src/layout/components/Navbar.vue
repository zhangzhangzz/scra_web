<template>
  <div class="navbar">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <div class="imgBBox">
            <img src="../../assets/img/land.png" class="user-avatar">
            <div class="warnMe" v-if="data!==0" :style="{width:data>10?'20px':'15px',height:data>10?'20px':'15px',lineHeight:data>10?'20px':'15px'}">{{data}}</div>s
          </div>
          
          <div class="names">{{username}}</div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="ModifyPass(3)">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="ModifyPass(4)">
            <span style="display:block;">修改邮箱</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="ModifyPass(1)">
            <span style="display:block;">修改手机号</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="ModifyPass(1)">
            <span style="display:block;">修改头像</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="$router.push('/Admin/stationLetter')">
            <span style="display:block;">消息</span>
            <div class="msgNum" v-if="data!==0" :style="{width:data>10?'20px':'15px',height:data>10?'20px':'15px',lineHeight:data>10?'20px':'15px',top:data>10?'10px':'13px'}">{{data}}</div>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'

export default {
  components: {
    Breadcrumb,
    // Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  props:["data"],
  data(){
    return{
      username:''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'device'
    ])
  },
  mounted(){
    if(JSON.parse(localStorage.getItem('user')).userType===1){
      this.username = JSON.parse(localStorage.getItem('userProject'))[0].projectName
    }else{
      this.username = JSON.parse(localStorage.getItem('user')).userName
    }
    
  },
  methods: {
    toggleSideBar() {
      
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    ModifyPass(index) {
      this.$emit('toIndex', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.msgNum{
    position: absolute;
    width: 15px;
    height: 15px;
    color: #fff;
    border-radius: 50%;
    background-color: #ff3915;
    font-size: 0.1rem;
    line-height: 15px;
    text-align: center;
    top: 13px;
    right: 15px;
  }
.navbar {
  
  height: 66px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  // background: linear-gradient(to right, #1ca095, #18a195);
  background-color: #1D73B1;
  .hamburger-container {
    line-height: 60px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 66px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        margin-top: 13px;
        display: flex;
        flex-direction: row;

        .imgBBox{
          width: 40px;
          height: 40px;
          font-size: 14pxs;
          position: relative;
        }

        .names{
          float: right;
          height: 40px;
          line-height: 40px;
          color: #fff;
          padding: 0 5px;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 15px;
          font-size: 12px;
          color: #fff;
        }
      }

      .warnMe{
        position: absolute;
        width: 15px;
        height: 15px;
        color: #fff;
        border-radius: 50%;
        background-color: #ff3915;
        font-size: 0.1rem;
        line-height: 15px;
        text-align: center;
        top: 0;
        right: -5px;
      }

      
    }

    
  }
}
</style>
