<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" auto-complete="on" label-position="left" :model="loginForm" :rules="rules">

      <div class="title-container">
        <h3 class="logo">
          <img src="@/assets/common/logo.png" alt="">
        </h3>
      </div>
      <el-form-item prop="loginName">
        <span class="iconfont icon-shouji_o" />
        <el-input v-model.trim="loginForm.loginName" placeholder="请输入账号" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="iconfont icon-suo" />
        <el-input ref="pwd" v-model.trim="loginForm.password" :type="passwordType" placeholder="请输入密码" />
        <span :class="['iconfont','yanjing',{'icon-yanjing-zhengyan': passwordType==='password'},{'icon-biyanjing': passwordType!=='password'}]" @click="showPsw" />
      </el-form-item>

      <el-form-item prop="code">
        <span class="iconfont icon-dunpai" />
        <el-input v-model.trim="loginForm.code" placeholder="请输入验证码" />
        <span><img class="codeImg" :src="imgCodeURL" alt="" @click="changeImgCode"></span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" class="loginBtn" :loading="isLoading" @click="login">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'// 随机数 用时间戳其实更方便
import { getImageCodeAPI } from '@/api'
export default {
  name: 'Login',
  data() {
    return {
      passwordType: 'password',
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '', // 验证码
        clientToken: ''
      },
      rules: {
        loginName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      imgCodeURL: '',
      isLoading: false
    }
  },
  async  created() {
    // await login({})
    this.getImageCode()
  },
  methods: {
    showPsw() {
      this.passwordType === 'password' ? this.passwordType = 'text' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    async getImageCode() {
      this.loginForm.clientToken = nanoid()
      const data = await getImageCodeAPI(this.loginForm.clientToken)
      // console.log(res)
      const blob = new Blob([data], { type: 'image/png' })
      this.imgCodeURL = window.URL.createObjectURL(blob)
    },
    async login() {
      try {
        // 表单验证通过
        await this.$refs.loginForm.validate()
        this.isLoading = true
        // 发起请求——在vuex中发起
        await this.$store.dispatch('user/login', this.loginForm)
        // 路由跳转的逻辑不放在vuex里面
        this.$router.push('/')
      } finally {
        this.isLoading = false
      }
    },
    changeImgCode() {
      this.getImageCode()
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#999;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    margin-bottom: 24px;
    color: #454545;
    .el-form-item__content{
      padding: 0 10px;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  background: url("~@/assets/common/background.png");
  overflow: hidden;
  .iconfont{
    font-size: 18px;
    color: #b0bcc2;
    .icon-shouji_o{
      font-size: 20px;
    }
  }

  .login-form {
    position: absolute;
    width: 518px;
    height: 378px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgba(30,111,72,.35);
    box-shadow: 0 3px 70px 0 rgba(30,111,72,.35);
    border-radius: 10px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    .logo{
      position: absolute;
      top: -65px;
      left: 50%;
      transform: translate(10px, 10px);
      transition: translate(-50%);
      height: 96px;
      width: 96px;
      transform: translate(-50%);
      img{
        height: 100%;
        width: 100%;
      }
    }
  }
  .loginBtn{
    height: 52px;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    opacity: .91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .yanjing{
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .codeImg{
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    }
}
</style>
