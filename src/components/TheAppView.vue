<template>
  <div class="app-view">
      <div class="app-view__container">
        <img
          class="logo"
          src="@/assets/img/logo.svg"
        />

        <div class="form">
          <div class="number-input">
            <label
              class="number-input__label"
              for="adjectives"
            >
              Adjectives
            </label>

            <input
              class="number-input__input"
              id="adjectives"
              maxlength="1"
              name="adjectives"
              oninput="javascript: this.value=this.value.slice(0,this.maxLength)"
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
              for="adjectives"
            >
              <p class="slider__item">People</p>
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

          .button,
          .number-input,
          .slider {
              border-radius: 15px;
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
              color: white;
              display: block;
              font-size: 22px;
              font-weight: 700;
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
                box-shadow: 0 0 0 rgb(0, 0, 0);
                transform: scale(0.985);
              }
            }

          .button {
            background-color: colors.$amethyst;
            border: none;

            &:active,
            &:focus {
              outline: none;
            }

            &:active {
              background-color: colors.$wisteria;
            }
          }

          .number-input {
            background-color: colors.$concrete;
            display: flex;
            justify-content: space-between;
            overflow: hidden;

            &__input {
              background-color: colors.$turqouise;
              border: none;
              color: white;
              font-size: 22px;
              font-weight: 700;
              margin: 0;
              padding: 0;
              text-align: center;
              width: 60px;

              &:active,
              &:focus {
                background-color: colors.$green-sea;
                outline: none;
              }
            }

            &__label {
              display: block;
              margin: 13px 0 0 0;
              padding: 0;
              text-align: center;
              width: 100%;
            }
          }

          .slider {
            background-color: colors.$peter-river;
            display: flex;
            overflow: hidden;

            &__button {
              background-color: transparent;
              border: none;
              color: white;
              font-size: 22px;
              font-weight: 700;
              margin: 0;
              padding: 0;
              position: relative;
              text-align: center;
              transition: background-color 0.1s ease-out;
              width: 60px;

              &:active,
              &:focus {
                outline: none;
              }

              &:active {
                background-color: colors.$belize-hole;
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

            &__item {
                background-color: transparent;
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
              }

            &__label {
              margin: 0;
              padding: 13px 0 0 0;
              text-align: center;
              width: 100%;
            }
          }
        }

        .submitbutton {
          background-color: colors.$emerald;
          border: none;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          color: white;
          display: block;
          font-size: 22px;
          font-weight: 700;
          height: 61px;
          margin: margins.$mobile-btn-margin;
          transition:
            background-color 0.1s ease-out,
            box-shadow 0.1s ease-out,
            transform 0.1s ease-out;
          width: 100%;

          &:active,
          &:focus {
            outline: none;
          }

          &:active {
            box-shadow: 0 0 0 rgb(0, 0, 0);
            transform: scale(0.985);
          }
        }
      }
  }
</style>
