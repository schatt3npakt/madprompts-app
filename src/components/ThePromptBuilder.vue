<template>
  <div
    class="prompt-overlay__text-wrapper"
    :class="[storeDisplaySmallPromptText? smallTextClass: '', storeDisplayVerySmallPromptText? verySmallTextClass: '']"
  >
    <span>{{ storeGetPromptHeadline }}</span><br/><br/>

    <div class="prompt-overlay__prompt-wrapper" v-if="storeGetFirstPromptCreated">
      <div
        v-for="item in storeGetPromptAdjectives"
        :key="item.id"
      >
        <a
          class="prompt-overlay__text--adjective"
          :href="linkBuilder(item.text)"
          target="_blank"
          :title="linkTitleBuilder(item.text)"
        >
          <span v-if="checkIfItemIdIsFirst(item.id)">{{ promptArticle }}&nbsp;</span>
          {{ item.text }}<span v-if="checkIfItemIdIsLast(item.id, storeGetPromptAdjectives)">,</span>
        </a><br/>
      </div>

      <div
        class="prompt-overlay__text__outer"
        v-for="item in storeGetPromptTheme"
        :key="item.id"
      >
          <a
            class="prompt-overlay__text--theme"
            :href="linkBuilder(item.text)"
            target="_blank"
            :title="linkTitleBuilder(item.text)"
          >{{ item.text }}</a>

          <pre
            class="prompt-overlay__text__space"
            v-if="checkIfItemIdIsLast(item.id, storeGetPromptTheme)">&nbsp;</pre>
        </div><br/>

      <span
        class="prompt-overlay__text--challenge"
        v-show="storeGetChallengeValidation"
      >
          {{ storeGetPromptChallenge }}
        </span>
    </div>

    <theImageBuilder/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheImageBuilder from '@/components/TheImageBuilder.vue'

export default Vue.extend({
  components: {
    TheImageBuilder
  },
  computed: {
    /**
     * Checks eheter the first adjective starts with a vowel and returns An if matched or A if not
     * @returns boolean
     */
    promptArticle (): string {
      return this.storeGetPromptAdjectives[0].text.match('^[aieouAIEOU].') ? 'An' : 'A'
    },

    /**
     * Get the current Adjectives from the store
     * @returns any
     */
    // eslint-disable-next-line
    storeGetPromptAdjectives (): any {
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
     * Returns the random headline for the prompt
     * @returns boolean
     */
    storeGetPromptHeadline (): boolean {
      return this.$store.state.promptBuilder.headline
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
     * @returns any
     */
    // eslint-disable-next-line
    storeGetPromptTheme (): any {
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
      return Object.keys(this.storeGetPromptAdjectives).length > 3
    },

    /**
     * Check the number of prompt adjectives and return true if it's above 6
     * @returns boolean
     */
    storeDisplayVerySmallPromptText (): boolean {
      return Object.keys(this.storeGetPromptAdjectives).length > 6
    }
  },
  data () {
    return {
      smallTextClass: 'prompt-overlay__text-wrapper--small-text',
      verySmallTextClass: 'prompt-overlay__text-wrapper--very-small-text'
    }
  },
  methods: {
    /**
     * Reutrn whether the sliced item id (eg. theme1 -> 1) is identical to the last index of the
     * passed Array
     * @param itemId: string
     * @param storeProperty: Record<string, string | number>
     * @returns boolean
     */
    checkIfItemIdIsLast (itemId: string, storeProperty: Record<string, string | number>): boolean {
      return parseInt(itemId.slice(-1)) !== Object.keys(storeProperty).length - 1
    },

    /**
     * Reutrn whether the sliced item id is identical to the first index of the
     * passed Array
     * @param itemId: string
     * @returns boolean
     */
    checkIfItemIdIsFirst (itemId: string): boolean {
      return parseInt(itemId.slice(-1)) === 0
    },

    /**
     * Build a link to a google images search for the passed topic and return the link as a string
     * @param searchTopic: string
     * @returns string
     */
    linkBuilder (searchTopic: string): string {
      return 'https://www.google.com/search?tbm=isch&q=' + searchTopic.replace(' ', '%20')
    },

    /**
     * Build the link title from some predefined text and a search topic
     * @param searchTopic: string
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
@use "~@/scss/vars/_breakpoints";
@use "~@/scss/vars/_colors";

.prompt-overlay {
  .hashtag {
    font-size: 30px;

    @media screen and (min-width: breakpoints.$tablet-portrait) {
      font-size: 40px;
    }
  }

  &__prompt-wrapper {
    margin-bottom: 40px;
  }

  &__text {
    &__outer {
      display: inline;
    }

    &-wrapper {
      @media screen and (max-height: 500px) {
        max-height: 400px;
        overflow: auto;
      }

      a {
        &:active,
        &:hover,
        &:focus,
        &:link,
        &:visited {
          outline: none;
          position: relative;
          text-decoration: none;

          @media screen and (max-width: breakpoints.$tablet-portrait-max) {
            text-decoration: underline;
          }

          &::after {
            bottom: 0;
            content: "";
            display: block;
            position: absolute;
            height: 3px;
            left: 50%;
            outline: none;
            transform: translateX(-50%);
            transition: width 0.25s;
            width: 0;
            z-index: 500;
          }
        }

        &:active,
        &:focus,
        &:hover {
          text-decoration: underline;

          @media screen and (min-width: breakpoints.$desktop) {
            text-decoration: none;

            &::after {
              width: 100%;
            }
          }
        }
      }
    }

    &--adjective {
      color: colors.$turqouise;

      &:active,
      &:focus,
      &:hover {

        @media screen and (min-width: breakpoints.$desktop) {
          &::after {
            background-color: colors.$turqouise;
          }
        }
      }
    }

    &--challenge {
      color: colors.$wisteria;
    }

    &--theme {
      color: colors.$peter-river;
      display: inline;

      &:active,
      &:focus,
      &:hover {
        @media screen and (min-width: breakpoints.$desktop) {
          &::after {
            background-color: colors.$peter-river;
          }
        }
      }
    }

    &__space {
      display: inline-block;
      margin: 0;
    }
  }
}
</style>
