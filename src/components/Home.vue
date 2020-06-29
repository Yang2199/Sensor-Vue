<template>
  <el-container class="home-container">
    <el-aside width="225px">
        <div style="height:60px;color:white;">
          <p>欢迎 {{username}}</p>
        </div>
        <el-menu
          :default-active="activePath"
          :unique-opened=true
          class="el-menu-vertical-demo"
          background-color="#0065f8"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/welcome" @click="saveNavState('/welcome')">
            <i class="el-icon-menu"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-submenu index="device">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>设备</span>
            </template>
            <el-menu-item-group>
              <span slot="title">传感器</span>
              <el-menu-item index="/list/sensor" @click="saveNavState('/list/sensor')">传感器</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <span slot="title">网关</span>
              <el-menu-item index="/list/gateway" @click="saveNavState('/list/gateway')">网关</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <span slot="title">数据采集器</span>
              <el-menu-item index="/list/datacollector" @click="saveNavState('/list/datacollector')">数据采集器</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/solution" :disabled="!isSolution">
            <i class="el-icon-document"></i>
            <span slot="title">方案</span>
          </el-menu-item>
          <el-menu-item index="/info"  @click="saveNavState('/info')">
            <i class="el-icon-setting"></i>
            <span slot="title">我的</span>
          </el-menu-item>
           <!--<el-submenu index="setting">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>我的</span>
            </template>
            <el-menu-item index="/info" @click="saveNavState('/info')">我的信息</el-menu-item>
            <el-menu-item index="/list/collect" @click="saveNavState('/list/collect')">我的收藏</el-menu-item>
            <el-menu-item index="/list/device" @click="saveNavState('/list/device')" v-if="usertype">我的设备</el-menu-item>
           </el-submenu>-->
        </el-menu>
      </el-aside>
    <el-container>
      <el-header>
        <!--    <el-button type="warning" icon="el-icon-search" circle></el-button>    有点丑-->
        <input type="text" autocomplete="off" placeholder=" 快捷搜索" class="el-input__inner" id="input-inner" v-model="searchValue" @keyup.enter="enterSearch">
        <el-button @click="logout">退出</el-button>
    </el-header>
      <el-main>
        <router-view @flushMenu="saveNavState"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      searchValue: '',
      activePath: '/welcome',
      isSolution: false
    }
  },
  created () {
    this.username = window.sessionStorage.getItem('username')
    // this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.$message.success('退出成功')
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
      if (this.activePath === '/solution') this.isSolution = true
      else this.isSolution = false
    },
    enterSearch () {
      if (this.searchValue.length < 2) return this.$message.error('输入长度过短，无法检索。')
      this.$router.push({
        name: 'search',
        params: {
          word: this.searchValue
        }
      })
    }
  }
}
</script>

<style>
.home-container {
  height: 100%;
}

.el-menu{
  border-right: 0;
}

.el-header {
  display: flex;
  padding-left:0;
  justify-content: space-between;
  background-color: #cfffff;
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
}

#input-inner{
  border:0;
  height:100%;
  margin-right: 20px;
  color:white;
  background-color: #cfffff;
}

.el-aside {
  background-color: #0079f8;
}
</style>
