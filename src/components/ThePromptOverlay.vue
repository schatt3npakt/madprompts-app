<template>
  <div class="prompt-overlay">
    <div class="prompt-overlay__text-wrapper">
      <span>You should draw a</span><br />

      <span class="prompt-overlay__text--adjective">possesed,</span><br />
      <span class="prompt-overlay__text--adjective">ancient,</span><br />

      <span class="prompt-overlay__text--theme">anime character</span><br />

      <span class="prompt-overlay__text--challenge">made of bagels </span>
    </div>

    <BaseButton
      button-id="submit"
      button-type="button--submit button--highlighted"
      button-text="New Prompt"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from '@/components/BaseButton.vue'

export default Vue.extend({
  components: {
    BaseButton
  },
  name: 'ThePromptOverlay'
})
</script>

<style lang="scss" scoped>
  .prompt-overlay {
    color: white;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    flex-flow: column nowrap;
    height: calc(100vh - 80px);
    justify-content: space-between;
    left: 0;
    overflow: hidden;
    padding: 40px;
    position: fixed;
    top: 0;
    transform: translateY(-100%);
    transition: transform 0.85s ease-out;
    width: calc(100vw - 80px);
    z-index: 999;

    &--show {
      transform: translateY(0);
    }

    &__text {
      &--adjective {
        color: colors.$emerald;
      }

      &--challenge {
        color: colors.$wisteria;
      }

      &--theme {
        color: colors.$peter-river;
      }
    }

    &__text-wrapper {
      font-size: 40px;
      line-height: 40px;
      text-align: center;
    }
  }
</style>
