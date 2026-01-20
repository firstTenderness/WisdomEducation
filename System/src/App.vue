<template>
  <!-- 路由出口：所有页面都会渲染在这里 -->
  <router-view></router-view>
</template>

<script setup>
// 无额外逻辑，仅保留路由出口
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Helvetica Neue", "Microsoft YaHei", sans-serif;
  background-color: #f9f9f9;
}
</style>