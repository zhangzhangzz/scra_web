<template>
  <div class="login-container columns">
    <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="userName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="userName"
          v-model="loginForm.userName"
          placeholder="userName"
          name="userName"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="pwd">
          <span class="svg-container">
            <svg-icon icon-class="pwd" />
          </span>
          <el-input
            :key="pwdType"
            ref="pwd"
            v-model="loginForm.pwd"
            :type="pwdType"
            placeholder="pwd"
            name="pwd"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>userName : admin</span>
          <span>pwd : any</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">userName : editor</span>
          <span>pwd : any</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          Or connect with
        </el-button>
      </div>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog> -->

    <div class="mainWapper row">
      <div class="wapper1 columns" :style="{height:height}">
        <div class="title1">
          智慧工地整体解决方案
          <div class="lineHang"></div>
        </div>
        <div class="mini-title">蜀工云</div>
        <div class="bottom-wapper">
          <div class="row">
             <span>开发文档</span>
             <span class="sec">对接文档</span>
             <span>联系文档</span>
          </div>
        </div>
      </div>
      <div class="wapper2 columns" :style="{height:height}" v-loading="loading" element-loading-text="登陆中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.3)">
        <div class="tabWapper row">
          <span class="topWapper tw" @click="actived=0">账号<span :class="actived==0?'actived':''" >密码</span>登录</span>
          <span class="topWapper" @click="actived=1">手机<span :class="actived==1?'actived':''" >快捷</span>登录</span>
        </div>

        <div class="columns centerWapper" v-if="actived==0" >
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <el-form-item prop="userName">
              <div class="row inputWapper">
                <img src="../../assets/images/login/phone.svg" />
                <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="pwd">
              <div class="row inputWapper">
                <img src="../../assets/images/login/pwd.svg" />
                <el-input v-model="loginForm.pwd" type="password" placeholder="请输入登录密码"></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="check">
               <div class="checkWapper row">
                <el-checkbox v-model="loginForm.checked"></el-checkbox>
                <span>我已审慎阅读并同意《客户协议》《风险披露说明》《法律声明》</span>
              </div>
            </el-form-item>
           
          </el-form>
        </div>

        <div class="columns centerWapper" v-if="actived==1">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left" v-loading="loading">
            <el-form-item prop="userName">
              <div class="row inputWapper">
                <img src="../../assets/images/login/phone.svg" />
                <el-input v-model="loginForm.userName" placeholder="请输入手机号" ></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="pwd">
              <div class="row inputWapper">
                <img src="../../assets/images/login/code.svg" />
                <div class="row yzmWapper">
                  <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
                  <div class="code" @click="timeClock('login')">{{content}}</div>
                </div>
                
              </div>
            </el-form-item>
            <el-form-item prop="check">
               <div class="checkWapper row">
                <el-checkbox v-model="loginForm.checked"></el-checkbox>
                <span>我已审慎阅读并同意《客户协议》《风险披露说明》《法律声明》</span>
              </div>
            </el-form-item>
           
          </el-form>
        </div>


        <div class="loginBtn" @click="handleLogin">登陆</div>
      </div>
    </div>
  </div>
</template>

<script>
import { validuserName } from '@/utils/validate'
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateuserName = (rule, value, callback) => {
      // if (!validuserName(value)) {
      if (value=='') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatepwd = (rule, value, callback) => {
      if (value=='') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: '',
        pwd: '',
        checked:true
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', validator: validateuserName }],
        pwd: [{ required: true, trigger: 'blur', validator: validatepwd }],
        checked:[{ required: true, message: '请同意用户协议', trigger: 'change' }]
      },
      pwdType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      height:'',
      actived:0,
      textSend:0,            //短信是否发送
      content: '发送验证码',  // 按钮里显示的内容
      totalTime: 60,       //记录具体倒计时时间
      canClick: true,      //添加canClick
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    document.onkeydown = (e) => {
      e = window.event || e
      if (this.$route.path === '/login' && e.keyCode === 13) this.handleLogin()  // submitLoginForm() 为登录函数
    }
  },
  mounted() {
    
    let width1 = document.getElementsByTagName("html")[0].style.fontSize;
    let width2 = width1.substring(0,width1.length-2);
    let width = width2 * 15 * 0.6;
    let height = 739*width/942;
    this.height = height+'px';
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    handleLogin() {
      if(!this.actived){
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm)
              .then((res) => {
                if(res.code == 200){
                  localStorage.setItem('user', JSON.stringify(res.data.sysUser));
                  localStorage.setItem('userProject', JSON.stringify(res.data.proProjectList));
                  console.log(res.data.sysUser.userType)
                  if(res.data.sysUser.userType===1){
                    let obj = {
                      id:res.data.proProjectList[0].projectId,
                      value:res.data.proProjectList[0].projectName
                    }
                    localStorage.setItem('allProjectId', JSON.stringify(obj));
                    console.log(localStorage.getItem('allProjectId'))
                  }
                  // localStorage.setItem('button', JSON.stringify(res.data.button));
                  // localStorage.setItem('menu', JSON.stringify(res.data.menu));
                  this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                  this.$emit('toIndex', 6)
                }else{
                  this.$message.error(res.message);
                }
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }else{
        this.$message('手机快捷登录暂无开通');
      }
      
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    /**
     * @Description: 倒计时
     * @Author: zhangjing
     */    
    timeClock(){
      if (!this.canClick) return  //改动的是这两行代码
      if(this.loginForm.userName == ''){
        this.$message({
          message: '请输入手机号码',
          type: 'warning'
        });
        return;
      }
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      // this.onGetCode(type);
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
        window.clearInterval(clock)
        this.content = '重新发送验证码'
        this.totalTime = 60
        // this.onGetImgCode();
        this.canClick = true  //这里重新开启
        }
      },1000)
    },
  }
}
</script>



<style scoped>

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url("../../assets/images/login/bg1.jpg");
  background-repeat:no-repeat;
  background-size:100% 100%;
  -moz-background-size:100% 100%;
  overflow: hidden;
}

.login-form {
    width: 100%;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }

  .tips  span:first-of-type{
    margin-right: 16px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
  }

  .title-container .title {
    font-size: 26px;
    color: #eee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .inputWapper  /deep/ .el-input--medium .el-input__inner{
    background: transparent;
    border: none;
    color: #fff;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }

  .mainWapper{
    margin: auto;
    width: 15rem;
  }

  .wapper1{
    width: 65%;
    background-image: url("../../assets/images/login/web.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    font-size: 16px;
  }

  .title1{
    width: 100%;
    padding: 0.85rem 0 0 1rem;
    font-size: 0.7rem;
    position: relative;
    color: #fff;
  }   

  .lineHang{
    position: absolute;
    width: 0.65rem;
    bottom: -0.4rem;
    height: 10px;
    background-color: #fff;
  }

  .mini-title{
    font-size: 0.5rem;
    color: #fff;
    width: 100%;
    padding: 0.6rem 0 0 1rem;
  }

  .bottom-wapper{
    width: calc(70% - 0.6rem);
    margin: auto auto 0.85rem 0;
    padding-left: 0.6rem;
  }

  .bottom-wapper div{
    font-size: 0.2rem;
    color: #fff;    
  }

  .bottom-wapper .sec{
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
  }

  .bottom-wapper span{
    flex: 1;
    text-align: center;
    padding: 0.04rem 0;
    cursor: pointer;
  }

  .wapper2{
    width: 35%;
    position: relative;
    padding: 0.85rem 0.4rem 0.7rem;
    background-image: url("../../assets/images/login/web2.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    margin-left: -0.3rem;
  }

  .tabWapper{
    width: 100%;
    font-size: 0.25rem;
    color: #fff;
  }

  .tw{
    border-right: 1px solid #fff;
  }

  .topWapper{
    text-align: center;
    padding: 0.1rem 0;
    flex: 1;
    cursor: pointer;
  }

  .topWapper span{
    padding-bottom: 0.05rem;
  }

  .topWapper  .actived{
    border-bottom: 0.05rem solid rgb(58,135,247);
  }

  .centerWapper{
    width: 100%;
    margin: auto 0;
  }

  .inputWapper{
    width: calc(100% - 0.6rem);
    margin: 0 0.3rem 0.2rem;
    border-bottom: 1px solid #fff;
    padding-bottom: 0.15rem;
  }

  .inputWapper img{
    width: 0.25rem;
    height: 0.25rem;
    margin: auto 0;
  }

  .yzmWapper{
    width: 100%;
  }

  .yzmWapper /deep/ .el-input{
    width: 50%;
  }

  .code{
    /* width: 1.5rem; */
    color: #fff;
    padding: 0 5px;
    border: 1px solid #fff;
    border-radius: 5px;
    margin-left: auto;
    /* height: 0.4rem; */
    text-align: center;
    cursor: pointer;
  }

  .checkWapper{
    width: calc(100% - 0.6rem);
    line-height: 0.3rem;
    margin: 0 0.3rem;
  }

  .checkWapper span{
    color: #fff;
    margin-left: 17px;
  }

  .loginBtn{
    width: calc(100% - 0.6rem);
    margin: 0 0.3rem 0;
    cursor: pointer;
    background-color: rgb(58,136,246);
    color: #fff;
    border-radius: 4px;
    text-align: center;
    padding: 0.15rem 0;
    font-size: 0.2rem;
  }

  /deep/ .el-form-item__error{
    margin-left: 0.75rem;
  }
</style>
