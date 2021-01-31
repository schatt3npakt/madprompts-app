<template>
  <div class="cookie-layer__bg">
    <div class="cookie-layer__body">
      <p class="cookie-layer__headline">GIANT SHARKS!</p>
      <p class="cookie-layer__paragraph">
        Now that we've got your attention, we have to talk <b>cookies</b>.
        They are there. Nobody likes them. But, we use cookies to bring this
        service to you and continuosly improve it.<br/><br/>
        Or not.<br/><br/>
        Below, you can save and edit your cookie preferences so you don't
        have to see this ugly banner again.
      </p>

      <div class="cookie-layer__save-buttons">
        <BaseButton
          button-id="submit"
          button-type="button--neutral"
          button-text="Save configuration"
          :class="test"
          @click.native="submitClickHandler"
        />

        <BaseButton
          button-id="submit"
          button-type="button--submit"
          button-text="Accept all"
          :class="test"
          @click.native="submitClickHandler"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from './BaseButton.vue'

export default Vue.extend({
  components: {
    BaseButton
  },
  methods: {
    /**
     * Call to Google Analytics for setup
     * @returns void
    */
    setupGoogleAnalytics (): void {
      // eslint-disable-next-line
      window.dataLayer = window.dataLayer || []
      // eslint-disable-next-line
      function gtag () { dataLayer.push(arguments) }
      gtag('js', new Date())

      gtag('config', 'UA-188508106-1')
    },

    /**
     * Displays the Cookie Layer if it was not interacted with yet
     * @returns void
    */
    showCookieLayer (): void {
      if (!window.localStorage.getItem('interactedWithCookieLayer')) {
      }
    }
  },
  mounted: function () {
    if (window.localStorage.getItem('interactedWithCookieLayer')) {
      if (window.localStorage.getItem('acceptedAnalyticsCookies')) {
        this.setupGoogleAnalytics()
      }
    } else {
      this.showCookieLayer()
    }
  },
  name: 'BaseNumberInput'
})
</script>

<style lang="scss" scoped>
  .cookie-layer {
    &__body {
      background-color: colors.$pickled-bluewood;
      width: 100%;
      height: 100%;
      max-width: 500px;
      max-height: 500px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 40px;
    }

    &__bg {
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.5);
      width: 100vw;
      height: 100vh;
      z-index: z-index.$cookie-layer;
    }

    &__headline {
      text-align: center;
      font-size: 60px;
      color: white;
      margin: 0 0 30px 0;
    }

    &__paragraph {
      color: white;
      font-size: 20px;
    }

    &__save-buttons {
      display: flex;

      *:first-child {
        margin-right: 20px;
      }
    }
  }
</style>
