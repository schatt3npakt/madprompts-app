import Vue from 'vue'
import Vuex from 'vuex'

// base vocab libraries
// challenges
import * as challenges from '@/lib/challenges.json'

// challenges
import * as headlines from '@/lib/headlines.json'

// themes
import * as themeBeasts from '@/lib/theme/base/beasts.json'
import * as themeBeastsSpecial from '@/lib/theme/base/beastsSpecial.json'
import * as themeFood from '@/lib/theme/base/food.json'
import * as themeFoodSpecial from '@/lib/theme/base/foodSpecial.json'
import * as themePeople from '@/lib/theme/base/people.json'
import * as themePeopleSpecial from '@/lib/theme/base/peopleSpecial.json'
import * as themePlaces from '@/lib/theme/base/places.json'
import * as themePlacesSpecial from '@/lib/theme/base/placesSpecial.json'

// adjectives
import * as adjectivesBeasts from '@/lib/adjectives/beasts.json'
import * as adjectivesFood from '@/lib/adjectives/food.json'
import * as adjectivesPeople from '@/lib/adjectives/people.json'
import * as adjectivesPlaces from '@/lib/adjectives/places.json'
import * as adjectivesStyle from '@/lib/adjectives/style.json'

// seasonal vocab libraries
// themes

Vue.use(Vuex)

// heloers
/**
 * Returns a random number between 0 and the passed max-1, because the length
 * of the Array is 1 larger that the indexes of the items
 * @param max: number
 * @returns number
*/
const arrayRandomizer = (max: number): number => {
  return Math.floor(Math.random() * (max))
}

/**
 * Returns a random integer, including the max
 * @param max: number
 * @returns number
*/
const randomizer = (max: number) => {
  return Math.floor(Math.random() * (max + 1))
}

/**
 * Returns a boolean based on the passed chance parameter according to pattern {chance}
 * @param chance: number
 * @returns boolean
*/
const chanceHelper = (chance: number) => {
  return randomizer(100) <= chance
}

/**
* helper function to get either:
* if the user has selected 1 adjective: a random item from the style Array
* OR first, a random item from the style Array, then the remaining random items from the passed Array,
* that ensures Adjectives are unique per prompt,
* @param state: any
* @param passedArray: any
* @returns void
*/
// eslint-disable-next-line
const adjectivesHelper = (state: any, passedArray: any): void => {
  /**
   * Empty Array and define Array for adjective Ids in use
  * This will be used to determine if an adjective id has already been added to the prompt,
  * preventing duplicates
  */
  state.promptBuilder.adjectives = []
  const exsistingAdjectiveIds = [{}]

  // Check if the user has selected one adjective
  if (parseInt(state.appView.formElements.numberInput.value) === 1) {
    // push adjective and index into state array
    state.promptBuilder.adjectives.push(
      {
        id: 'adjective0',
        text: state.lib.adjectives.style[arrayRandomizer(state.lib.adjectives.style.length)]
      }
    )
  } else {
    // first, push style adjective and index into state array
    state.promptBuilder.adjectives.push(
      {
        id: 'adjective0',
        text: state.lib.adjectives.style[arrayRandomizer(state.lib.adjectives.style.length)]
      }
    )

    // Run Loop for number of times based on user input, minus 1, because we already added the style adjective
    for (let i = 0; i < (state.appView.formElements.numberInput.value - 1); i++) {
      let currentAdjectiveKey

      // If the generated adjective Id already exists inside exsistingAdjectiveIds Array, reassign it
      do {
        currentAdjectiveKey = arrayRandomizer(passedArray.length)
      } while (exsistingAdjectiveIds.indexOf(currentAdjectiveKey) >= 1)

      // push adjective and index into state array
      state.promptBuilder.adjectives.push(
        {
          id: 'adjective' + (i + 1),
          text: passedArray[currentAdjectiveKey]
        }
      )

      // Update exsisting Ids with the currntly passed Id
      exsistingAdjectiveIds.push(currentAdjectiveKey)
    }
  }
}

/**
 * helper function for theme prompt determination. it takes in the state
 * of the store, the normal and special Array of the theme Category.
 * @param state: any
 * @param array: any
 * @param specialArray: any
 * @returns void
*/
// eslint-disable-next-line
const themeHelper = (state: any, array: any, specialArray: any): void => {
  // Determine whether to show normal or special value (5% Chance to get Special)
  if (chanceHelper(95)) {
    state.promptBuilder.theme =
    [
      // Add two values to theme Array inside the app state
      {
        id: 'theme0',
        // Get a random entry from general array
        text: state.lib.theme.general[arrayRandomizer(state.lib.theme.general.length)]
      },
      {
        id: 'theme1',
        // Get a random entry from normal theme array
        text: array[arrayRandomizer(array.length)]
      }
    ]
  } else {
    // Add one value to theme Array
    state.promptBuilder.theme =
    [
      {
        id: 'theme0',
        // Get a random entry from special theme array
        name: specialArray[arrayRandomizer(specialArray.length)]
      }
    ]
  }
}

export default new Vuex.Store({
  actions: {
    /**
     * Build a new Prompt and commit it to the app state.
     * @param context
     * @returns void
    */
    buildPrompt ({ commit }) {
      commit('setPromptHeadline')
      commit('setAdjectivesPrompt')
      commit('setThemePrompt')
      commit('setChallengePrompt')
      commit('setFirstPromptCreated')
    }
  },
  modules: {
  },
  mutations: {
    /**
     * Decrease the index of the currenlty active slider item by one.
     * @param state
     * @returns void
    */
    decreaseActiveItem (state): void {
      const slider = state.appView.formElements.slider

      slider.activeItem === 0
        ? slider.activeItem = slider.items.length - 1
        : slider.activeItem--
    },

    /**
     * Increase the index of the currenlty active slider item by one.
     * @param state
     * @returns void
    */
    increaseActiveItem (state): void {
      const slider = state.appView.formElements.slider

      slider.activeItem === slider.items.length - 1
        ? slider.activeItem = 0
        : slider.activeItem++
    },

    /**
       * Set zhe adjectives for the current prompt from the general array if challenge is enabled or
       * themed adjective array if challenge is disabled
       * @param state
       * @returns void
      */
    setAdjectivesPrompt (state): void {
      if (state.appView.formElements.challengeButton.isActive) {
        adjectivesHelper(state, state.lib.adjectives.general)
      } else {
        switch (state.appView.formElements.slider.activeItem) {
          // Case for People prompts
          case 0:
            adjectivesHelper(state, state.lib.adjectives.people)
            break

          // Case for Places prompts
          case 1:
            adjectivesHelper(state, state.lib.adjectives.places)
            break

          // Case for Beasts prompts
          case 2:
            adjectivesHelper(state, state.lib.adjectives.beasts)
            break

          // Case for Food prompts
          case 3:
            adjectivesHelper(state, state.lib.adjectives.food)
            break
        }
      }
    },

    /**
     * Set the number of adjectives for prompt to the passed user input value.
     * @param state
     * @param value: number
     * @returns void
    */
    setNumberInputValue (state, value: number): void {
      state.appView.formElements.numberInput.value = value
    },

    /**
     * Set zhe challenge for the current prompt to a random item in the challenge array
     * @param state
     * @returns void
    */
    setChallengePrompt (state): void {
      state.promptBuilder.challenge = state.lib.challenges[arrayRandomizer(state.lib.challenges.length)]
    },

    /**
     * Set zhe headline for the current prompt to a random item in the headlines array
     * @param state
     * @returns void
    */
    setPromptHeadline (state): void {
      state.promptBuilder.headline = state.lib.headlines[arrayRandomizer(state.lib.headlines.length)]
    },

    /**
     * Set zhe theme for the current prompt to a random item in the theme array
     * @param state
     * @returns void
    */
    setThemePrompt (state): void {
      /* Determine which theme pool should be used, by getting the index of the active item in the slider
      * and loading a theme pool based on that number. Correspondance between slider order and loading the
      * appropriate pool needs to be checked MANUALLY by checking the order inside appView.formElements.slider.items
      * This could be improved.
      */
      switch (state.appView.formElements.slider.activeItem) {
        // Case for People prompts
        case 0:
          themeHelper(state, state.lib.theme.people.normal, state.lib.theme.people.special)
          break

        // Case for Places prompts
        case 1:
          themeHelper(state, state.lib.theme.places.normal, state.lib.theme.places.special)
          break

        // Case for Beasts prompts
        case 2:
          themeHelper(state, state.lib.theme.beasts.normal, state.lib.theme.beasts.special)
          break

        // Case for Food prompts
        case 3:
          themeHelper(state, state.lib.theme.food.normal, state.lib.theme.food.special)
          break
      }
    },

    /**
     * Toggle the challenge state for the next prompt
     * @param state
     * @returns void
    */
    toggleChallenge (state): void {
      const challengeButton = state.appView.formElements.challengeButton

      challengeButton.isActive
        ? challengeButton.isActive = false
        : challengeButton.isActive = true
    },

    /**
     * Set first prompt created to true for valid prompt rendering
     * @param state
     * @returns void
    */
    setFirstPromptCreated (state): void {
      if (!state.promptBuilder.firstPromptCreated) {
        state.promptBuilder.firstPromptCreated = true
      }
    },

    /**
     * Toggle visibility of the prompt overlay
     * @param state
     * @returns void
    */
    togglePromptOverlay (state): void {
      const promptOverlay = state.appView.promptOverlay

      promptOverlay.isVisible
        ? promptOverlay.isVisible = false
        : promptOverlay.isVisible = true
    }
  },
  state: {
    appView: {
      formElements: {
        challengeButton: {
          isActive: false
        },
        numberInput: {
          value: 2
        },
        slider: {
          activeItem: 0,
          items: [
            { id: 0, name: 'People' },
            { id: 1, name: 'Places' },
            { id: 2, name: 'Beasts' },
            { id: 3, name: 'Food' }
          ]
        }
      },
      promptOverlay: {
        isVisible: false
      }
    },
    lib: {
      adjectives: {
        // general is used as library of applicable adje
        general: adjectivesPeople.data.concat(
          adjectivesBeasts.data,
          adjectivesFood.data,
          adjectivesStyle.data,
          adjectivesPlaces.data
        ),
        beasts: adjectivesBeasts.data,
        food: adjectivesFood.data,
        people: adjectivesPeople.data,
        places: adjectivesPlaces.data,
        style: adjectivesStyle.data
      },
      challenges: challenges.data,
      headlines: headlines.data,
      theme: {
        // general is used as library for the first part of the theme and includes all normal arrays
        general: themePeople.data.concat(
          themeBeasts.data,
          themePlaces.data
        ),
        beasts: {
          normal: themeBeasts.data,
          special: themeBeastsSpecial.data
        },
        food: {
          normal: themeFood.data,
          special: themeFoodSpecial.data
        },
        people: {
          normal: themePeople.data,
          special: themePeopleSpecial.data
        },
        places: {
          normal: themePlaces.data,
          special: themePlacesSpecial.data
        }
      }
    },
    promptBuilder: {
      activateAdjectiveLinks: false,
      adjectives: [{}],
      challenge: '',
      firstPromptCreated: false,
      headline: '',
      theme: [{}]
    }
  }
})
