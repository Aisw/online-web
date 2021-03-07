<template>
<div class="login-container">
  <div class="login">
    <div style="margin: 20px;"></div>
    <div>在线培训</div>
    <div style="margin: 20px;"></div>

    <el-form label-position="right" :model="loginForm" class="demo-form-inline" label-width="80px">
      <el-form-item label="账号 ">
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码 ">
        <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="loginClick">登录</el-button>
  </div>
</div>
</template>

<script>
import {login} from "@/network/login";

export default {
  name: "Login",
  data() {
    return {
      loginForm:{
        username: '',
        password: ''
      },
    }
  },
  methods: {
    loginClick() {
      login(this.loginForm.username, this.loginForm.password).then(res => {
        let a = JSON.parse(res);//将json字符串转换成json对象
        if (a.code == 400) {
          this.loginFailed()
        } else if (a.code == 200) {
          this.GLOBAL.token = a.data;
          // this.GLOBAL.profile = '/profileDetail'
          // this.GLOBAL.isLogin = true
          // this.indexChanged()
          this.$router.replace('/home')
          console.log(this.GLOBAL.token)
        }
      })
    },
    loginFailed(){
      this.$notify.error({
        title: '错误',
        message: '登录信息出错'
      });
    }
  }
}
</script>

<style scoped>
.login-container{
  width: 100%;
  height: 100%;
  display: flex;/*设置外层盒子display为flex*/
  justify-content:center;/*设置内层盒子的水平居中*/
}
.login{
  width: 300px;
  height: 300px;
  margin-top: 10%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.02)
}

</style>