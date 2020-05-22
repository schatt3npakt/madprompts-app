<template>
  <BaseButton
    :buttonId="buttonId"
    :buttonText="storeIsActive? activeText : inactiveText"
    :buttonType="buttonType"
    class="toggle-button"
    :class="[storeIsActive? activeClass : '']"
    @click.native="storeToggleChallenge" />
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from './BaseButton.vue'

export default Vue.extend({
  components: {
    BaseButton
  },
  computed: {
    storeIsActive (): boolean {
      return this.$store.state.appView.formElements.challengeButton.isActive
    }
  },
  data () {
    return {
      activeClass: 'toggle-button--active'
    }
  },
  methods: {
    /**
     * Commit toggleChallenge mutation
     * @returns void
    */
    storeToggleChallenge () {
      this.$store.commit('toggleChallenge')
    }
  },
  name: 'ToggleButton',
  props: {
    activeText: String,
    buttonId: String,
    buttonName: String,
    buttonType: String,
    inactiveText: String
  }
})
</script>

<style lang="scss" scoped>
.toggle-button {
  background-color: colors.$concrete;
  border-bottom: 5px solid colors.$asbestos;

  &:active {
    background-color: colors.$wisteria;
    border-bottom: none;
  }

  &:hover:not(:active) {
    @media screen and (min-width: breakpoints.$desktop) {
      background-color: lighten(colors.$amethyst, 5%);
      border-bottom: 5px solid lighten(colors.$wisteria, 5%);
    }
  }

  &--active {
    background-color: colors.$amethyst;
    border-bottom: 5px solid colors.$wisteria;
  }
}
</style>
