<template>
  <div
    class="prompt-overlay"
    :class="[storeIsVisible ? activeClass : '', startHiding ? hidingClass : '']"
  >
    <ThePromptBuilder/>

    <BaseButton
      button-id="submit"
      button-type="button--submit"
      button-text="New Prompt"
      @click.native="storeTogglePromptVisibility"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import ThePromptBuilder from '@/components/ThePromptBuilder.vue'

export default Vue.extend({
  components: {
    BaseButton,
    ThePromptBuilder
  },
  computed: {
    storeIsVisible () {
      return this.$store.state.appView.promptOverlay.isVisible
    }
  },
  data () {
    return {
      activeClass: 'prompt-overlay--show',
      hidingClass: 'prompt-overlay--hide',
      startHiding: false
    }
  },
  methods: {
    /**
     * Initiate layer hiding and commit togglePromptOverlay store mutation
     * @returns void
     */
    storeTogglePromptVisibility (): void {
      this.startHiding = true
      this.$store.commit('togglePromptOverlay')

      window.setTimeout(() => {
        this.startHiding = false
      }, 500)
    }
  },
  name: 'ThePromptOverlay'
})
</script>

<style lang="scss" scoped>
@use "~@/scss/vars/_breakpoints";
@use "~@/scss/vars/_z-index";

.prompt-overlay {
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  display: flex;
  flex-flow: column nowrap;
  height: calc(100% - 70px);
  justify-content: space-between;
  left: 0;
  overflow: hidden;
  padding: 40px 40px 30px 40px;
  position: fixed;
  top: 0;
  transform: translateY(-100%);
  transition: transform 0.7s ease-out;
  width: calc(100vw - 80px);
  z-index: z-index.$prompt-layer;

  @media screen and (min-width: breakpoints.$tablet-portrait) {
    height: calc(100% - 80px);
    padding: 40px;
  }

  .button--submit {
    opacity: 0;
    transition: opacity 0.5s;
    transition-delay: 0.55s;

    @media screen and (min-width: breakpoints.$tablet-portrait) {
      margin-left: auto;
      margin-right: auto;
      max-width: 341px;
    }
  }

  &__text-wrapper {
    font-size: 33px;
    line-height: 35px;
    text-align: center;
    opacity: 0;
    transition: opacity 0.5s;
    transition-delay: 0.55s;

    @media screen and (min-width: breakpoints.$tablet-portrait) {
      font-size: 43px;
      line-height: 45.3px;
    }

    &--small-text {
      font-size: 25px;
      line-height: 30px;

      @media screen and (min-width: breakpoints.$tablet-portrait) {
        font-size: 35px;
        line-height: 40px;
      }
    }

    &--very-small-text {
      font-size: 25px;
      line-height: 30px;

      @media screen and (min-width: breakpoints.$tablet-portrait) {
        font-size: 30px;
        line-height: 33px;
      }
    }
  }

  &--hide {
    transform: translateY(0);

    .button--submit,
    .prompt-overlay__text-wrapper {
      opacity: 0;
      transition-delay: 0s;
    }
  }

  &--show {
    transform: translateY(0);

    .button--submit,
    .prompt-overlay__text-wrapper {
      opacity: 1;
    }
  }
}
</style>
