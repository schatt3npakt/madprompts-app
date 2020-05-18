<template>
  <div class="app-view">
      <div class="app-view__container">
        <a
          class="logo"
          href="#"
          >
          BADPROMPTS
        </a>

        <div class="form">
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
              oninput="javascript: this.value=this.value.slice(0,this.maxLength); this.select();"
              type="number"
              value="2"
            />
          </div>

          <BaseSlider />

          <ToggleButton
            button-id="challenge"
            button-type="button--challenge"
            button-text="Challenge me!"
          />
        </div>

        <BaseButton
          button-id="submit"
          button-type="button--submit"
          button-text="Let's go!"
        />

        <div class="footer-text">
          <a href="#">Artwork by a_very_long_artist_name</a>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from './BaseButton.vue'
import BaseSlider from './BaseSlider.vue'
import ToggleButton from './ToggleButton.vue'

export default Vue.extend({
  components: {
    BaseButton,
    BaseSlider,
    ToggleButton
  },
  name: 'HelloWorld',
  props: {
    msg: String
  }
})
</script>

<style scoped lang="scss">
  * {
    font-family: fonts.$base-font;
  }

  .app-view {
      background-image: url(../assets/img/bg.jpg);
      background-position: top 0 left 0;
      background-size: cover;
      height: 100%;
      margin: 0;
      overflow: hidden;
      width: 100%;

      &__container {
        margin: 25px auto 40px auto;
        max-width: calc(100% - 80px);
        width: 100%;

        @media screen and (min-width: 768px) {
          margin: 0 auto 40px auto;
          padding: 0 25px;
        }

        .form {
          margin-bottom: 100px;

          .number-input {
            display: flex;
            border-radius: 0;
            box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
            color: white;
            font-size: 30px;
            font-weight: normal;
            height: 61px;
            justify-content: space-between;
            overflow: hidden;
            width: 100%;

            &:not(:last-child) {
              margin: margins.$mobile-btn-margin;
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
              font-size: 30px;
              font-weight: normal;
              margin: 0;
              padding: 0;
              text-align: center;
              transition:
                background-color 0.1s ease-out,
                transform 0.1s ease-out;
              width: 60px;

              &:active,
              &:focus {
                background-color: colors.$green-sea;
                outline: none;
                transform: translateY(5px);
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
