<template>
  <div class="app-view">
      <div class="app-view__container">
        <div>
          <a
            class="logo"
            href="#"
          >
            BADPROMPTS
          </a>

          <div class="form">
            <BaseNumberInput />

            <BaseSlider />

            <ToggleButton
              active-text="Disable challenge"
              button-id="challenge"
              button-type="button--challenge"
              inactive-text="Enable challenge"
            />
          </div>

          <BaseButton
            button-id="submit"
            button-type="button--submit"
            button-text="Let's go!"
            @click.native="storeTogglePromptVisibility"
          />
        </div>

        <div class="footer-text">
          <a href="#">Artwork by a_very_long_artist_name</a>
          <a class="footer-text__version" href="#">v. 1.0.3</a>
        </div>

        <ThePromptOverlay />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from './BaseButton.vue'
import BaseNumberInput from './BaseNumberInput.vue'
import BaseSlider from './BaseSlider.vue'
import ThePromptOverlay from '@/components/ThePromptOverlay.vue'
import ToggleButton from './ToggleButton.vue'

export default Vue.extend({
  components: {
    BaseButton,
    BaseNumberInput,
    BaseSlider,
    ThePromptOverlay,
    ToggleButton
  },
  methods: {
    /**
     * Commit togglePromptOverlay store mutation
     * @param state
     * @returns void
    */
    storeTogglePromptVisibility (): void {
      this.$store.commit('togglePromptOverlay')
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  }
})
</script>

<style scoped lang="scss">
  .app-view {
      background-image: url(../assets/img/bg-376px.jpg);
      background-position: top 0 left 0;
      background-size: cover;
      height: 100%;
      margin: 0;
      overflow: hidden;
      width: 100%;

      @media screen and (min-width: breakpoints.$tablet-portrait) {
        background-image: url(../assets/img/bg-768px.jpg);
      }

      &__container {
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
        justify-content: space-between;
        margin: 25px auto 30px auto;
        max-height: calc(100% - 55px);
        max-width: calc(100% - 80px);
        width: 100%;

        @media screen and (min-width: breakpoints.$tablet-portrait) {
          margin: 80px auto 40px 50px;
          max-height: calc(100% - 120px);
          max-width: 344px;
          padding: 0;
        }

        .form {
          margin-bottom: 60px;

          @media screen and (min-width: breakpoints.$tablet-portrait) {
            margin-bottom: 97px;
          }

          > * {
            &:not(:last-child) {
              margin: map_get(margins.$button-margins, "mobile");

              @media screen and (min-width: breakpoints.$tablet-portrait) {
                margin: map_get(margins.$button-margins, "tablet");
              }
            }
          }
        }

        .logo {
          color: white;
          display: block;
          font-size: 68px;
          margin-bottom: 77px;
          text-align: center;
          text-decoration: none;
          text-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);

          @media screen and (min-width: breakpoints.$tablet-portrait) {
            font-size: 85px;
            text-align: left;
          }
        }

        .footer-text {
          justify-self: flex-end;
          font-size: 20px;
          text-align: center;

          > a {
            &:link,
            &:visited,
            &:hover,
            &:active {
              color: white;
              text-decoration: none;
            }
          }

          @media screen and (min-width: breakpoints.$tablet-portrait) {
            font-size: 29px;
            text-align: left;
          }

          &__version {
            display: none;

            @media screen and (min-width: breakpoints.$tablet-portrait) {
              bottom: 40px;
              display: block;
              position: fixed;
              right: 50px;
              z-index: z-index.$version-text;
            }
          }
        }
      }
  }
</style>
