<template>
    <div class="prompt-overlay__text-wrapper">
      <span>You should draw a</span><br />

      <span class="prompt-overlay__text--adjective">test,</span><br />
      <span class="prompt-overlay__text--adjective">ancient,</span><br />

      <span class="prompt-overlay__text--theme">anime character</span><br />

      <span
        class="prompt-overlay__text--challenge"
        v-show="storeGetChallengeValidation"
      >
        {{storeGetChallengePrompt}}
      </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    /**
     * Get the current challenge from the store
     * @returns string
    */
    storeGetChallengePrompt (): string {
      return this.$store.state.promptBuilder.challenge
    },

    /**
     * Get whether the user disabled challenges in the Ui
     * @returns boolean
    */
    storeGetChallengeValidation (): boolean {
      return this.$store.state.appView.formElements.challengeButton.isActive
    }
  },
  name: 'thePromptBuilder'
})
</script>

<style lang="scss" scoped>
  .prompt-overlay {
    &__text {
      &--adjective {
        color: colors.$emerald;
      }

      &--challenge {
        color: colors.$wisteria;
      }

      &--theme {
        color: colors.$peter-river;
      }
    }
  }
</style>