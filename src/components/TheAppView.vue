<template>
  <div class="app-view">
      <div class="app-view__container">
        <div class="app-view__container__inner">
          <a
            class="logo"
            href="#"
          >
            BADPROMPTS
          </a>

          <div>
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
              @click.native="submitClickHandler"
            />
          </div>
        </div>

        <div class="footer-text">
          <a
            class="footer-text__artist"
            :href="footerText.artistLink"
            target="_blank"
            :title="footerText.artistTitle"
          >
            {{footerText.artist}}
          </a>
          <a class="footer-text__version" href="#">{{footerText.version}}</a>
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
  data () {
    return {
      footerText: {
        artist: 'Artwork by a_very_long_artist_name',
        artistTitle: 'Visit a_very_long_artist_name on Instagram!',
        artistLink: '#',
        version: '0.5.0'
      }
    }
  },
  methods: {
    /**
     * Commit togglePromptOverlay store mutation
     * @param state
     * @returns void
    */
    storeTogglePromptVisibility (): void {
      this.$store.commit('togglePromptOverlay')
    },

    /**
     * Set a new challenge in the app state
     * @param state
     * @returns void
    */
    storeBuildPrompt (): void {
      this.$store.dispatch('buildPrompt')
    },

    /**
     * Build a new Prompt and toggle layer visibility on submit click
     * @param state
     * @returns void
    */
    submitClickHandler (): void {
      this.storeTogglePromptVisibility()
      this.storeBuildPrompt()
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
      background-image: url(../assets/img/bg-mobile.jpg);
      background-position: top 0 left 0;
      background-size: cover;
      height: 100%;
      margin: 0;
      overflow: hidden;
      width: 100%;

      @media screen and (min-width: breakpoints.$tablet-portrait) {
        background-image: url(../assets/img/bg-tablet.jpg);
      }

      @media screen and (min-width: breakpoints.$desktop) {
        background-image: url(../assets/img/bg-desktop.jpg);
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

        @media screen and (min-width: breakpoints.$desktop) {
          background-color: colors.$pickled-bluewood;
          box-shadow: 20px 0 20px rgba(0, 0, 0, 0.1);
          margin: 0;
          max-height: calc(100% - 100px);
          max-width: 350px;
          padding: 50px 47px;
        }

        &__inner {
          display: flex;
          height: 100%;
          flex-flow: column nowrap;
          justify-content: space-between;
          max-height: 400px;
          margin-bottom: 15px;

          @media screen and (min-width: breakpoints.$tablet-portrait) {
            max-height: 480px;
          }

          @media screen and (min-width: breakpoints.$desktop) {
            background-color: colors.$pickled-bluewood;
          }
        }

        .form {
          margin-bottom: 60px;

          @media screen and (min-width: breakpoints.$tablet-portrait) {
            margin-bottom: 65px;
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
          font-size: map_get(fonts.$logo-size, "mobile");
          margin-bottom: 15px;
          text-align: center;
          text-decoration: none;
          text-shadow: colors.$button-shadow;

          @media screen and (min-width: breakpoints.$tablet-portrait) {
            font-size: map_get(fonts.$logo-size, "tablet");
            text-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
          }

          @media screen and (min-width: breakpoints.$desktop) {
            font-size: map_get(fonts.$logo-size, "desktop");
            text-shadow: 0 13px 13px rgba(0, 0, 0, 0.3);
            transition: text-shadow 0.25s;
          }

          &:active,
          &:hover,
          &:focus {
            @media screen and (min-width: breakpoints.$desktop) {
              text-shadow: 0 0 13px rgba(255, 255, 255, 0.3);
            }
          }

          &:focus {
            outline: none;
          }
        }

        .footer-text {
          justify-self: flex-end;
          font-size: 25px;
          text-align: center;

          > a {
            &:link,
            &:visited,
            &:focus,
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

          @media screen and (min-width: breakpoints.$desktop) {
            font-size: 25px;
          }

          &__artist,
          &__version {
            @media screen and (min-width: breakpoints.$desktop) {
              bottom: 40px;
              display: inline;
              letter-spacing: 0;
              position: fixed;
              transition: letter-spacing 0.25s ease-out;

              &:active,
              &:focus,
              &:hover {
                letter-spacing: 1px;
                outline: none;
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
              }
            }
          }

          &__artist {
            @media screen and (min-width: breakpoints.$desktop) {
              bottom: 40px;
              display: inline;
              position: fixed;
              right: 47px;
              text-align: right;
              z-index: z-index.$artist-text;
            }
          }

          &__version {
            display: none;

            @media screen and (min-width: breakpoints.$tablet-portrait) {
              bottom: 40px;
              display: inline;
              position: fixed;
              right: 50px;
              z-index: z-index.$version-text;
            }

            @media screen and (min-width: breakpoints.$desktop) {
              left: 47px;
              right: unset;
            }
          }
        }
      }
  }
</style>
