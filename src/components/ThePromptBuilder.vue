<template>
    <div
      class="prompt-overlay__text-wrapper"
      :class="[storeDisplaySmallPromptText? smallTextClass: '']"
    >
      <span>Here's your prompt:</span><br />

      <div v-if="storeGetFirstPromptCreated">
        <div
          v-for="item in storeGetPromptAdjectives"
          :key="item.id"
        >
          <span class="prompt-overlay__text--adjective">
            {{item.text}}<span v-if="checkItemId(item.id, storeGetPromptAdjectives)">,</span>
          </span><br />
        </div>

        <span
          v-for="item in storeGetPromptTheme"
          :key="item.id"
        >
          <a
            class="prompt-overlay__text--theme"
            :href="linkBuilder(item.name)"
            target="_blank"
            :title="linkTitleBuilder(item.name)"
          >{{item.name}}</a>

          <pre
            class="prompt-overlay__text__space"
            v-if="checkItemId(item.id, storeGetPromptTheme)">&nbsp;</pre>
        </span><br />

        <span
          class="prompt-overlay__text--challenge"
          v-show="storeGetChallengeValidation"
        >
          {{storeGetPromptChallenge}}
        </span>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    /**
     * Get the current Adjectives from the store
     * @returns Array
    */
    storeGetPromptAdjectives (): Array {
      return this.$store.state.promptBuilder.adjectives
    },

    /**
     * Returns whether a prompt has already been created in this session
     * @returns boolean
    */
    storeGetFirstPromptCreated (): boolean {
      return this.$store.state.promptBuilder.firstPromptCreated
    },

    /**
     * Get the current challenge from the store
     * @returns string
    */
    storeGetPromptChallenge (): string {
      return this.$store.state.promptBuilder.challenge
    },

    /**
     * Get the current Theme from the store
     * @returns string
    */
    storeGetPromptTheme (): Array {
      return this.$store.state.promptBuilder.theme
    },

    /**
     * Get whether the user disabled challenges in the Ui
     * @returns boolean
    */
    storeGetChallengeValidation (): boolean {
      return this.$store.state.appView.formElements.challengeButton.isActive
    },

    /**
     * Check the number of prompt adjectives and return true if it's above 4
     * @returns boolean
    */
    storeDisplaySmallPromptText (): boolean {
      return Object.keys(this.storeGetPromptAdjectives).length > 4
    }
  },
  data () {
    return {
      smallTextClass: 'prompt-overlay__text-wrapper--small-text'
    }
  },
  methods: {
    /**
     * Reutrn whether the sliced item id (eg. theme1 -> 1) is identical to the last index of the
     * passed Array
     * @param itemId: string
     * @param storeProperty: Array
     * @returns boolean
    */
    checkItemId (itemId: string, storeProperty: Array): boolean {
      return parseInt(itemId.slice(-1)) !== Object.keys(storeProperty).length - 1
    },

    /**
     * Build a link to a google images search for the passed topic and return the link as a string
     * @param string: string
     * @returns string
    */
    linkBuilder (searchTopic: string): string {
      return 'https://www.google.com/search?tbm=isch&q=' + searchTopic.replace(' ', '%20')
    },

    /**
     * Build the link title from some predefined text and a search topic
     * @param string: string
     * @returns string
    */
    linkTitleBuilder (searchTopic: string): string {
      return 'Search Google Images for ' + searchTopic
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
        display: inline;
      }

      &__space {
        display: inline;
      }
    }
  }
</style>
