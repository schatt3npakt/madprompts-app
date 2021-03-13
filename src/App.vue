<template>
  <div id="app">
    <TheAppView/>
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
@use "~@/scss/vars/_fonts";

@font-face {
  font-family: 'VT323';
  src: url('./assets/fonts/VT323-Regular.eot');
  src: url('./assets/fonts/VT323-Regular.eot?#iefix') format('embedded-opentype'),
  url('./assets/fonts/VT323-Regular.woff2') format('woff2'),
  url('./assets/fonts/VT323-Regular.woff') format('woff'),
  url('./assets/fonts/VT323-Regular.ttf') format('truetype'),
  url('./assets/fonts/VT323-Regular.svg#VT323-Regular') format('svg');
  font-weight: normal;
  font-style: normal;
}

* {
  font-family: fonts.$base-font;
}

body,
html,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

.sr-only {
  clip: rect(0, 0, 0, 0);
  display: none;
  font-size: 0;
  height: 0;
  opacity: 0;
  width: 0;
}
</style>
