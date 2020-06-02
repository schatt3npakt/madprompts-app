<template>
  <div class="image-builder">
    <button
      @click="toggleImageVisibility"
    >
      show image
    </button>

    <a
      href=""
      id="imageDownload"
      title="Download your prompt as an Image!"
    >
      <img
        alt="Your Prompt"
        :class="[showImage? 'show' : '']"
        id="imageBuilderImage"
        src=""
      />
    </a>

    <canvas
      height="1080"
      id="imageBuilderCanvas"
      width="1080">
    </canvas>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      showImage: false
    }
  },
  methods: {
    toggleImageVisibility () {
      if (this.showImage === false) {
        this.showImage = true
      }
    }
  },
  name: 'theImageBuilder'
})
</script>

<style lang="scss" scoped>
  .image-builder {
    canvas {
      background-color: colors.$pickled-bluewood;
      display: none;
      left: 0;
      position: absolute;
      top: 0;
      z-index: 400;
    }

    img {
      box-shadow: 0 0 40px rgb(0,0,0);
      display: none;
      left: 50%;
      max-height: 500px;
      max-width: 500px;
      opacity: 0;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 500;

      &.show {
        display: block;
        opacity: 1;
      }
    }
  }
</style>
