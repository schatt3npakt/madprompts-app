<template>
  <div class="app-view">
      <div class="app-view__container">
        <img
          class="logo"
          src="@/assets/img/logo.svg"
        />

        <div class="form">
          <button id="challenge">Challenge me!</button>

          <div class="slider">
            <label
              class="slider__label"
              for="adjectives"
              >Adjectives</label>

            <input
              class="slider__input"
              id="adjectives"
              maxlength="1"
              name="adjectives"
              oninput="javascript: this.value=this.value.slice(0,this.maxLength)"
              type="number"
              value="2"
            />
          </div>
        </div>
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
          button,
          .slider {
              border-radius: 15px;
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

          button {
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

          .slider {
            background-color: colors.$concrete;
            display: flex;
            justify-content: space-between;
            overflow: hidden;

            &__input {
              background-color: colors.$peter-river;
              border: none;
              color: white;
              font-size: 22px;
              font-weight: 700;
              margin: 0;
              padding: 0;
              text-align: center;
              width: 60px;
            }

            &__label {
              display: block;
              margin: 13px 0 0 0;
              padding: 0;
              text-align: center;
              width: 100%;
            }
          }
        }
      }
  }
</style>
