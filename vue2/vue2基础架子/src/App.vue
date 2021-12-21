<!--
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-10-13 16:20:53
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-12-21 10:30:57
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  created() {
    console.log("process", process);
  },
};
</script>

<style>
#app {
  height: 100%;
}
</style>
