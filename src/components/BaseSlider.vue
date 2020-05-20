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
  border-bottom: 5px solid colors.$belize-hole;
  display: flex;
  border-radius: 0;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  color: white;
  font-size: map_get(fonts.$button-sizes, "mobile");
  font-weight: normal;
  height: map_get(dimensions.$buttonHeight, "mobile");
  justify-content: space-between;
  overflow: hidden;
  width: 100%;

  @media screen and (min-width: breakpoints.$tablet-portrait) {
    font-size: map_get(fonts.$button-sizes, "tablet");
    height: map_get(dimensions.$buttonHeight, "tablet");
  }

  &:active,
  &:focus {
    outline: none;
  }

  &__button {
    background-color: colors.$peter-river;
    border: none;
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
    width: 85px;

    @media screen and (min-width: breakpoints.$tablet-portrait) {
      width: 100px;
    }

    &:active,
    &:focus {
      outline: none;
    }

    &:active {
      background-color: colors.$belize-hole;
      transform: translateY(5px);
    }

    &::after {
      border-bottom: 12px solid transparent;
      border-top: 12px solid transparent;
      content: "";
      display: block;
      height: 0;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 0;
    };

    &:first-of-type {
      &::after {
        border-right:12px solid white;
      }
    }

    &:last-of-type {
      &::after {
        border-left:12px solid white;
      }
    }
  }

  &__label {
    background-color: colors.$peter-river;
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
      width: 100%;

      &--active {
        opacity: 1;
      }
    }
  }
}
</style>
