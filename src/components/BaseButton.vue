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
    box-shadow: colors.$button-shadow;
    color: white;
    display: block;
    font-size: map_get(fonts.$button-sizes, "mobile");
    font-weight: normal;
    height: map_get(dimensions.$button-height, "mobile");
    text-transform: uppercase;
    transition:
      background-color 0.1s ease-out,
      box-shadow 0.1s ease-out,
      border-bottom 0.1s ease-out,
      transform 0.1s ease-out;
    width: 100%;

    @media screen and (min-width: breakpoints.$tablet-portrait) {
      font-size: map_get(fonts.$button-sizes, "tablet");
      height: map_get(dimensions.$button-height, "tablet");
    }

    @media screen and (min-width: breakpoints.$desktop) {
      cursor: pointer;
      font-size: map_get(fonts.$button-sizes, "desktop");
      height: map_get(dimensions.$button-height, "desktop");
    }

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

      &:hover:not(:active) {
        background-color: lighten(colors.$emerald, 5%);
        border-bottom: 5px solid lighten(colors.$nephritis, 5%);
      }
    }

    &--highlighted {
      box-shadow: 0 0 15px colors.$emerald;
    }
  }
</style>
