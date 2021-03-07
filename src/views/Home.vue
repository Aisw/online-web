<template>
<div class="home-container">
  <el-row class="tac">
    <el-col :span="5">
      <div style="margin: 10px;"></div>
      <div class="block"><el-avatar :size="60" :src="circleUrl"></el-avatar></div>
      <div style="margin: 40px;"></div>

      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="1" >
          <i class="el-icon-document"></i>
          <span slot="title" @click="goTo('/organization')">组织机构管理</span>
        </el-menu-item>

        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title" @click="goTo('/user')">用户管理</span>
        </el-menu-item>

        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title" @click="goTo('/train')">培训计划</span>
        </el-menu-item>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>知识库管理</span>
          </template>
          <el-menu-item index="1-3" @click="goTo('/book')">电子书维护</el-menu-item>
          <el-menu-item index="1-3" @click="goTo('/doc')">文件管理</el-menu-item>
        </el-submenu>

      </el-menu>
    </el-col>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>{{user.username}}</span>
      </el-header>
    </el-container>
    <el-main>
      <div>
        <router-view/>
      </div>
    </el-main>
  </el-row>
</div>
</template>

<script>
import {getUser} from "@/network/Home";

export default {
  name: "Home",
  data() {
    return {
      isCollapse: true,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      user: Object
    };
  },
  created() {
    this.getUser()
  },
  methods: {
      handleOpen(key,keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      goTo(path) {
        if (path != '/login'){
          this.$router.push(path);
        }
      },
    getUser(){
        getUser(this.GLOBAL.token).then(res => {
          this.user = res.data
          console.log(this.user)
        })
    }
    }
}
</script>

<style scoped>
.el-menu-vertical-demo{
  margin-left: 40px;
  text-align: left;
}
</style>