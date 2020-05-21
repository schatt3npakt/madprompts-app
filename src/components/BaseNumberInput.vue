<template>
  <div class="number-input">
    <div class="number-input__label">
      <label class="number-input__label__text">Adjectives</label>
    </div>

    <input
      class="number-input__input"
      id="adjectives"
      maxlength="1"
      name="adjectives"
      onclick="javascript: this.select();"
      @input="inputHandler"
      type="number"
      :value="storeNumberInputValue"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    storeNumberInputValue () {
      return this.$store.state.appView.formElements.numberInput.value
    }
  },
  methods: {
    /**
     * Keep user input to one digit and pass value to commit-function
     * @param event: any
     * @returns void
    */
    inputHandler (event: any): void { // eslint-disable-line
      const target = event.target
      let targetValue = target.value

      targetValue = targetValue.slice(0, target.maxLength)
      target.select()
      this.storeSetNumberInputValue(targetValue)
    },

    /**
     * Take in user input value and commit store mutation
     * @param value: number
     * @returns void
    */
    storeSetNumberInputValue (value: number): void {
      this.$store.commit('setNumberInputValue', value)
    }
  },
  name: 'BaseNumberInput'
})
</script>

<style lang="scss" scoped>
  .number-input {
    display: flex;
    border-radius: 0;
    box-shadow: colors.$button-shadow;
    color: white;
    font-size: map_get(fonts.$button-sizes, "mobile");
    font-weight: normal;
    height: map_get(dimensions.$button-height, "mobile");;
    justify-content: space-between;
    overflow: hidden;
    width: 100%;

    @media screen and (min-width: breakpoints.$tablet-portrait) {
      font-size: map_get(fonts.$button-sizes, "tablet");
      height: map_get(dimensions.$button-height, "tablet");
    }

    @media screen and (min-width: breakpoints.$desktop) {
      font-size: map_get(fonts.$button-sizes, "desktop");
      height: map_get(dimensions.$button-height, "desktop");
    }

    &:active,
    &:focus {
      outline: none;
    }

    &__input {
      background-color: colors.$turqouise;
      border: 0;
      border-bottom: 5px solid colors.$green-sea;
      color: white;
      font-size: map_get(fonts.$button-sizes, "mobile");
      font-weight: normal;
      margin: 0;
      padding: 0;
      text-align: center;
      transition:
        background-color 0.1s ease-out,
        transform 0.1s ease-out;
      width: map_get(dimensions.$button-height, "mobile");

      @media screen and (min-width: breakpoints.$tablet-portrait) {
        font-size: map_get(fonts.$button-sizes, "tablet");
        width: map_get(dimensions.$button-height, "tablet");
      }

      @media screen and (min-width: breakpoints.$desktop) {
        cursor: pointer;
        font-size: map_get(fonts.$button-sizes, "desktop");
        margin-left: -1px;
        width: 70px;
      }

      &:active,
      &:focus {
        background-color: colors.$green-sea;
        outline: none;
        transform: translateY(5px);
      }

      &:hover:not(:active):not(:focus) {
        background-color: lighten(colors.$turqouise, 5%);
        border-bottom: 5px solid lighten(colors.$green-sea, 5%);
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type=number] {
        -moz-appearance: textfield;
      }
    }

    &__label {
      align-items: center;
      background-color: colors.$concrete;
      border: 0;
      border-bottom: 5px solid colors.$asbestos;
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0;
      text-align: center;
      text-transform: uppercase;
      transform: none;
      width: 100%;
    }
  }
</style>
