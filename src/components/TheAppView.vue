<template>
  <div class="app-view">
      <div class="app-view__container">
        <img
          class="logo"
          src="@/assets/img/logo.svg"
        />

        <div class="form">
          <button>Challenge me!</button>
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
          margin: 0 auto 77px auto;
          max-height: 132px;
          max-width: 132px;
        }

        .form {
          button {
            background-color: colors.$amethyst;
            border: none;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(31, 6, 90, 0.3);
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
              background-color: colors.$wisteria;
              box-shadow: 0 0 0 black;
              transform: scale(0.985);
            }
          }
        }
      }
  }
</style>
