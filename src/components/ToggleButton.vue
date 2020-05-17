<template>
  <BaseButton
    :buttonId="buttonId"
    :buttonName="buttonName"
    :buttonType="buttonType"
    class="toggle-button"
    :class="[this.$store.state.appView.formElements.challengeButton.isActive ? activeClass : '']"
    @click.native="toggleChallenge"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from './BaseButton.vue'
import { mapState } from 'vuex'

export default Vue.extend({
  components: {
    BaseButton
  },
  data () {
    return {
      activeClass: 'toggle-button--active'
    }
  },
  methods: {
    toggleChallenge () {
      this.$store.commit('toggleChallenge')
    }
  },
  name: 'ToggleButton',
  props: {
    buttonId: String,
    buttonName: String,
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
