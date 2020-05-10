<template>
  <div id="app">
    <TheAppView />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheAppView from './components/TheAppView.vue'

export default Vue.extend({
  name: 'App',
  components: {
    TheAppView
  }
})
</script>

<style lang="scss">
  body,
  html,
  #app {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  #app {
    font-family: 'Open Sans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
  }
</style>
