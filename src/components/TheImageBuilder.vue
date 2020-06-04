<template>
  <div class="image-builder">
    <BaseButton
      button-id="submit"
      button-type="button--image-button"
      button-text="Download image"
      class="image-builder__button"
      @click.native="toggleImageVisibility"
    />

    <div
      class="image-builder__background"
      :class="[showImage? 'show' : '']"
      @click="toggleImageVisibility"
    >
    </div>

    <a
      href=""
      class="image-builder__download-link"
      :class="[showImage? 'show' : '']"
      @click="imageClickHandler"
      id="imageDownload"
      title="Download your prompt as an Image!"
    >
      <img
        alt="Your Prompt"
        id="imageBuilderImage"
        src=""
      />

      <span class="image-builder__download-hint">
        Click to download!
      </span>
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
import BaseButton from '@/components/BaseButton.vue'

export default Vue.extend({
  components: {
    BaseButton
  },
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
      display: block;
      height: 100%;
      transform: scale(1);
      transition: transform 0.25s ease-out;
      width: 100%;

      &:active {
        transform: scale(0.98);
      }
    }

    &__background {
      &.show {
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: 400;
      }
    }

    &__button {
      margin-left: auto;
      margin-right: auto;
      max-width: 341px;
    }

    &__download-link {
      display: block;
      height: 0;
      left: 50%;
      max-height: 500px;
      max-width: 500px;
      opacity: 0;
      position: absolute;
      text-decoration: none;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: opacity 0.25s ease-out;
      width: 0;
      z-index: 500;

      &.show {
        height: 100%;
        opacity: 1;
        width: 100%;

        .image-builder__download-hint {
          &,
          &:link,
          &:visited,
          &:focus,
          &:hover,
          &:active {
            color: white;
            display: block;
            font-size: 35px;
            height: auto;
            opacity: 1;
            text-decoration: none;
          }
        }
      }
    }

    &__download-hint {
      &,
      &:link,
      &:visited,
      &:focus,
      &:hover,
      &:active {
        display: none;
      }
    }
  }
</style>
