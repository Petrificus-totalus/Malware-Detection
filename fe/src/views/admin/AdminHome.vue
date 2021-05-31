<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../../assets/imgs/safe.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '180px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          default-active="/manage"
        >
          <el-menu-item index="/manage">
            <i class="iconfont icon-user"></i>
            <span slot="title">人员管理</span>
          </el-menu-item>

          <el-submenu index="/">
            <template slot="title">
              <i class="iconfont icon-shangpin"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item index="/statistics">数据表</el-menu-item>
            <el-menu-item index="/userchart">用户表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: "/manage",
    };
  },

  created() {
    document.title = "后台管理";
  },
  methods: {
    logout() {
      this.$router.push("/");
    },

    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  /* position: fixed;
  top: 0; */
}
.el-header > div {
  display: flex;
  align-items: center;
}
.el-header > div span {
  margin-left: 15px;
}

.el-aside {
  background-color: #333744;
  transition: all 0.3s linear;
}
.el-aside .el-menu {
  border-right: none;
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
