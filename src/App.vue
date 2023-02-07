<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  margin: 0 auto;
  overflow-y: scroll;
}
</style>
