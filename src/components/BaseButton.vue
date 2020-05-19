<template>
  <button
    :class="buttonType"
    :id="buttonId"
    class="button"
  >
    {{buttonText}}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseButton',
  props: {
    buttonId: String,
    buttonText: String,
    buttonType: String
  }
})
</script>

<style lang="scss" scoped>
  .button {
    border: none;
    border-radius: 0;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
    color: white;
    display: block;
    font-size: 30px;
    font-weight: normal;
    height: 61px;
    text-transform: uppercase;
    transition: background-color 0.1s ease-out, box-shadow 0.1s ease-out,
      transform 0.1s ease-out;
    width: 100%;

    &:active,
    &:focus {
      outline: none;
    }

    &:active {
      box-shadow: 0 0 0 rgb(0, 0, 0);
      transform: scale(0.985) translateY(5px);
    }

    &--submit {
      background-color: colors.$emerald;
      border-bottom: 5px solid colors.$nephritis;

      &:active {
          background-color: colors.$nephritis;
      }
    }
  }
</style>
