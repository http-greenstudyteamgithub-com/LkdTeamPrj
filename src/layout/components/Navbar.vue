<template>
  <div class="navbar">
    <!-- logo -->
    <img src="@/assets/common/logoone.png" class="logo">
    <!-- 右侧导航 -->
    <div class="right-menu">
      <!-- 用户头像 -->
      <img v-imageError="defaultImg" :src="avatar" class="userAvatar">
      <!-- 欢迎语 -->
      <span class="userName">欢迎您, {{ $store.getters.userName }}</span>
      <!-- 退出登录 -->
      <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom" @click.native="logout">
        <span class="logout">退出<i class="el-icon-caret-bottom" /></span>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import defaultImg from '@/assets/common/user.png'
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    // Breadcrumb
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    defaultImg() {
      return defaultImg
    }
  },
  methods: {
    // 退出登录
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss">
.el-dropdown{
  font-size: 16px;
  color: white;
}

</style>

<style lang="scss" scoped>
.navbar {
  height:60px;
  // overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  // background: #fff;
  background: url("~@/assets/common/backgroundone.png");
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .logo{
    position: relative;
    top: 4px;
    margin-top: 6px;
    margin-left: 15px;
    width: 88px;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;
    vertical-align: middle;
    display: flex;
    align-items: center;
    padding-right: 30px;
    .userAvatar{
      width: 35px;
      height: 35px;
      margin-right: 10px;
    }
    .userName{
      color: #fff;
      font-size: 16px;
      padding-right: 30px;
    }
    .logout{
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
