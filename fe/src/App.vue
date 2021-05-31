<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
.el-drawer__body {
  /* opacity: 0.8; */
  background-color: #fff;
  /* color: #fff; */
}
</style>
