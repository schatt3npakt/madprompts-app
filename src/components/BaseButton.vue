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
  button::-moz-focus-inner,
  input::-moz-focus-inner,
  a::-moz-focus-inner {
    border: 0;
  }

  .button {
    border: none;
    border-radius: 0;
    box-shadow: colors.$button-shadow;
    color: white;
    display: block;
    font-size: map_get(fonts.$button-sizes, "mobile");
    font-weight: normal;
    height: map_get(dimensions.$button-height, "mobile");
    position: relative;
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

    &::after,
    &::before {
      opacity: 0;
      transition: opacity 0.25s ease-out;
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

      &:hover:not(:active),
      &:focus:not(:active) {
        background-color: lighten(colors.$emerald, 5%);
        border-bottom: 5px solid lighten(colors.$nephritis, 5%);
      }
    }

    &--neutral {
        background-color: colors.$concrete;
        border-bottom: 5px solid colors.$asbestos;
    }

    &--image-button {
      background-color: colors.$peter-river;
      border-bottom: 5px solid colors.$belize-hole;

      &:active {
          background-color: colors.$belize-hole;
      }

      &:hover:not(:active),
      &:focus:not(:active) {
        background-color: lighten(colors.$peter-river, 5%);
        border-bottom: 5px solid lighten(colors.$belize-hole, 5%);
      }
    }

    &--hard-mode {
      background-color: colors.$alizarin;
      border-bottom: 5px solid colors.$pomegremade;

      &:active {
          background-color: colors.$pomegremade;
      }

      &:hover:not(:active),
      &:focus:not(:active) {
        background-color: lighten(colors.$alizarin, 5%);
        border-bottom: 5px solid lighten(colors.$pomegremade, 5%);
      }

      &::after,
      &::before {
        background-image: icons.$skull;
        background-position: top left;
        background-size: cover;
        content: '';
        display: block;
        height: 25px;
        opacity: 1;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 25px;
      }

      &::after {
        right: 20px;
      }

      &::before {
        left: 20px;
      }
    }

    &--highlighted {
      box-shadow: 0 0 15px colors.$emerald;
    }
  }
</style>
