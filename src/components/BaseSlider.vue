<template>
  <div class="slider">
    <button
      class="slider__button"
      @click="storeDecreaseActiveItem"
    />

    <div class="slider__label">
      <span
        class="slider__label__text"
        :class="[isActiveItem(item.id)? activeClass: '']"
        :key="item.id"
        v-for="item in storeSliderItems"
      >
        {{ item.name }}
      </span>
    </div>

    <button
      class="slider__button"
      @click="storeIncreaseActiveItem"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    storeSliderItems (): Record<string, string | number> {
      return this.$store.state.appView.formElements.slider.items
    },
    storeSliderItemsLength (): boolean {
      return this.$store.state.appView.formElements.slider.items.length()
    },
    storeActiveSliderItem (): number {
      return this.$store.state.appView.formElements.slider.activeItem
    }
  },
  data () {
    return {
      activeClass: 'slider__label__text--active'
    }
  },
  methods: {
    /**
     * Returns whether the passed itemId is identical to the id of the active item
     * @param itemId: number
     * @returns boolean
    */
    isActiveItem: function (itemId: number): boolean {
      return itemId === this.storeActiveSliderItem
    },

    /**
     * Commit decrease active item mutation
     * @returns void
    */
    storeDecreaseActiveItem: function (): void {
      this.$store.commit('decreaseActiveItem')
    },

    /**
     * Commit increase active item mutation
     * @returns void
    */
    storeIncreaseActiveItem: function (): void {
      this.$store.commit('increaseActiveItem')
    }
  },
  name: 'BaseSlider'
})
</script>

<style lang="scss" scoped>
.slider {
  border: none;
  border-radius: 0;
  box-shadow: colors.$button-shadow;
  display: flex;
  color: white;
  font-size: map_get(fonts.$button-sizes, "mobile");
  font-weight: normal;
  height: map_get(dimensions.$button-height, "mobile");
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

  &__button {
    background-color: colors.$peter-river;
    border-bottom: 5px solid colors.$belize-hole;
    border-left: none;
    border-right: none;
    border-top: none;
    color: white;
    display: block;
    font-size: 30px;
    font-weight: normal;
    margin: 0;
    padding: 0;
    position: relative;
    text-align: center;
    transition:
      background-color 0.1s ease-out,
      transform 0.1s ease-out;
    width: map_get(dimensions.$slider-button-width, "mobile");

    @media screen and (min-width: breakpoints.$tablet-portrait) {
      width: map_get(dimensions.$slider-button-width, "tablet");
    }

    @media screen and (min-width: breakpoints.$desktop) {
      cursor: pointer;
      width: map_get(dimensions.$slider-button-width, "desktop");
    }

    &:active,
    &:focus {
      outline: none;
    }

    &:active {
      background-color: colors.$belize-hole;
      transform: translateY(5px);
    }

    &:hover:not(:active):not(:focus),
    &:focus:not(:active) {
      @media screen and (min-width: breakpoints.$desktop) {
        background-color: lighten(colors.$peter-river, 5%);
        border-bottom: 5px solid lighten (colors.$belize-hole);
      }
    }

    &::after {
      content: "";
      display: block;
      height: map_get(dimensions.$slider-arrows-height, mobile);
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: map_get(dimensions.$slider-arrows-width, mobile);

      @media screen and (min-width: breakpoints.$tablet-portrait) {
        height: map_get(dimensions.$slider-arrows-height, tablet);
        width: map_get(dimensions.$slider-arrows-width, tablet);
      }

      @media screen and (min-width: breakpoints.$desktop) {
        height: map_get(dimensions.$slider-arrows-height, desktop);
        width: map_get(dimensions.$slider-arrows-width, desktop);
      }
    };

    &::after {
      background-size: 100% 100%;
      background-position: top left;
    }

    &:first-of-type {
      margin-right: -1px;

      &::after {
        background-image: icons.$arrow-left;
      }
    }

    &:last-of-type {
      margin-left: -1px;

      &::after {
        background-image: icons.$arrow-right;
      }
    }
  }

  &__label {
    background-color: colors.$peter-river;
    border-bottom: 5px solid colors.$belize-hole;
    margin: 0;
    position: relative;
    text-align: center;
    width: 100%;

    &__text {
      background-color: transparent;
      left: 50%;
      margin: 0;
      opacity: 0;
      padding: 0;
      position: absolute;
      text-transform: uppercase;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: opacity 0.25s;
      width: 100%;

      &--active {
        opacity: 1;
      }
    }
  }
}
</style>
