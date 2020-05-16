<template>
  <div class="app-view">
      <div class="app-view__container">
        <img
          class="logo"
          src="@/assets/img/logo.svg"
        />

        <div class="form">
          <div class="number-input">
            <div
              class="number-input__label"
            >
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

          <div class="slider">
            <button
              class="slider__button"
              id="left"
            />

            <div
              class="slider__label"
            >
              <label class="slider__label__text">People</label>
            </div>

            <button
              class="slider__button"
              id="right"
            />
          </div>

          <button
            class="button"
            id="challenge"
          >
            Challenge me!
          </button>
        </div>

        <button
          class="submitbutton"
          id="submit"
        >
          Let's go!
        </button>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String
  }
})
</script>

<style scoped lang="scss">
  @font-face {
      font-family: 'VT323';
      src: url('../assets/fonts/VT323-Regular.eot');
      src: url('../assets/fonts/VT323-Regular.eot?#iefix') format('embedded-opentype'),
          url('../assets/fonts/VT323-Regular.woff2') format('woff2'),
          url('../assets/fonts/VT323-Regular.woff') format('woff'),
          url('../assets/fonts/VT323-Regular.ttf') format('truetype'),
          url('../assets/fonts/VT323-Regular.svg#VT323-Regular') format('svg');
      font-weight: normal;
      font-style: normal;
  }

  * {
    font-family: fonts.$base-font;
  }

  .app-view {
      background-color: colors.$wet-asphalt;
      height: 100%;
      margin: 0;
      overflow: hidden;
      width: 100%;

      &__container {
          margin: 25px auto 40px auto;
          max-width: calc(100% - 80px);
          width: 100%;

        .logo {
          display: block;
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
          margin: 0 auto 77px auto;
          max-height: 132px;
          max-width: 132px;
          transition: filter 0.1s ease-out;

          &:active {
            filter: drop-shadow(0 0 0 rgb(0, 0, 0));
            transform: scale(0.985);
          }
        }

        .form {
          margin-bottom: 100px;

          .button {
            background-color: colors.$amethyst;
            border: none;
            border-bottom: 5px solid colors.$wisteria;
            border-radius: 0;
            box-shadow: 0 5px 0px rgba(0, 0, 0, 0.3);
            color: white;
            display: block;
            font-size: 30px;
            font-weight: normal;
            height: 61px;
            transition:
              background-color 0.1s ease-out,
              box-shadow 0.1s ease-out,
              transform 0.1s ease-out;
            width: 100%;

            &:not(:last-child) {
              margin: margins.$mobile-btn-margin;
            }

            &:active,
            &:focus {
              outline: none;
            }

            &:active {
              background-color: colors.$wisteria;
              box-shadow: 0 0 0 rgb(0, 0, 0);
              transform: scale(0.985);
            }
          }

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
              transform: none;
              width: 100%;
            }
          }

          .slider {
            border: none;
            border-bottom: 5px solid colors.$belize-hole;
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

            &__button {
              background-color: colors.$peter-river;
              border: none;
              color: white;
              font-size: 30px;
              font-weight: normal;
              margin: 0;
              padding: 0;
              position: relative;
              text-align: center;
              transition:
                background-color 0.1s ease-out,
                transform 0.1s ease-out;
              width: 60px;

              &:active,
              &:focus {
                outline: none;
              }

              &:active {
                background-color: colors.$belize-hole;
                transform: translateY(5px);
              }

              &#left {
                &::after {
                  border-bottom: 12px solid transparent;
                  border-right:12px solid white;
                  border-top: 12px solid transparent;
                  content: "";
                  display: block;
                  height: 0;
                  left: 50%;
                  position: absolute;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  width: 0;
                }
              }

              &#right {
                &::after {
                  border-bottom: 12px solid transparent;
                  border-left:12px solid white;
                  border-top: 12px solid transparent;
                  content: "";
                  display: block;
                  height: 0;
                  left: 50%;
                  position: absolute;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  width: 0;
                }
              }
            }

            &__label {
              align-items: center;
              background-color: colors.$peter-river;
              display: flex;
              justify-content: center;
              margin: 0;
              text-align: center;
              width: 100%;

              &__text {
                background-color: transparent;
                margin: 0;
                padding: 0;
              }
            }
          }
        }

        .submitbutton {
          background-color: colors.$emerald;
          border: none;
          border-bottom: 5px solid colors.$nephritis;
          border-radius: 0;
          box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
          color: white;
          display: block;
          font-size: 30px;
          font-weight: normal;
          height: 61px;
          transition:
            background-color 0.1s ease-out,
            box-shadow 0.1s ease-out,
            transform 0.1s ease-out;
          width: 100%;

          &:not(:last-child) {
            margin: margins.$mobile-btn-margin;
          }

          &:active,
          &:focus {
            outline: none;
          }

          &:active {
            background-color: colors.$nephritis;
            box-shadow: 0 0 0 rgb(0, 0, 0);
            transform: scale(0.985);
          }
        }
      }
  }
</style>
