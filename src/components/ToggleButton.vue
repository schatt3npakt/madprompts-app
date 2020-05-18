<template>
  <BaseButton
    :buttonId="buttonId"
    :buttonText="buttonText"
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
    storeToggleChallenge () {
      this.$store.commit('toggleChallenge')
    }
  },
  name: 'ToggleButton',
  props: {
    buttonId: String,
    buttonName: String,
    buttonText: String,
    buttonType: String
  }
})
</script>

<style lang="scss" scoped>
.toggle-button {
  background-color: colors.$concrete;
  border-bottom: 5px solid colors.$asbestos;

  &--active {
    background-color: colors.$amethyst;
    border-bottom: 5px solid colors.$wisteria;
  }

  &:active {
    background-color: colors.$wisteria;
    border-bottom: none;
  }
}
</style>
