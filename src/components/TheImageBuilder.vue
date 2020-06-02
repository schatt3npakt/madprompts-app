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
        @click="imageClickHandler"
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
    /*
    * Toggle the visibility of the Downloadable image
    * @returns void
    */
    imageClickHandler (): void {
      window.setTimeout(this.toggleImageVisibility, 150)
    },

    /*
    * Toggle the visibility of the Downloadable image
    * @returns void
    */
    toggleImageVisibility (): void {
      if (this.showImage === false) {
        this.showImage = true
      } else {
        this.showImage = false
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
      transition: opacity 1s ease-out;
      z-index: 500;

      &.show {
        display: block;
        transition: opacity 1s ease-out;
        opacity: 1;
      }
    }
  }
</style>
