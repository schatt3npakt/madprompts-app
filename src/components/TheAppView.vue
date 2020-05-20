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
      background-image: url(../assets/img/bg.jpg);
      background-position: top 0 left 0;
      background-size: cover;
      height: 100%;
      margin: 0;
      overflow: hidden;
      width: 100%;

      &__container {
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
        justify-content: space-between;
        margin: 25px auto 30px auto;
        max-height: calc(100% - 55px);
        max-width: calc(100% - 80px);
        width: 100%;

        @media screen and (min-width: 768px) {
          margin: 0 auto 40px auto;
          padding: 0 25px;
        }

        .form {
          margin-bottom: 60px;

          > * {
            &:not(:last-child) {
              margin: margins.$mobile-btn-margin;
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
          transition: filter 0.1s ease-out;
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
        }
      }
  }
</style>
