import Vue from 'vue'
import Vuex from 'vuex'

// vocab libraries
import * as challenges from '@/lib/challenges.json'
import * as people from '@/lib/theme/people.json'
import * as peopleSpecial from '@/lib/theme/peopleSpecial.json'
import * as places from '@/lib/theme/places.json'
import * as placesSpecial from '@/lib/theme/placesSpecial.json'

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
 * helper function for theme prompt determination. it takes in the state
 * of the store, the normal and special Array of the theme Category
 * @param themeVar: any
 * @param array: any
 * @param specialArray: any
 * @returns void
*/
// eslint-disable-next-line
const themeHelper = (state: any, array: any, specialArray: any): void => {
  // Determine whether to show normal or special value (20% Chance to get Special)
  if (chanceHelper(85)) {
    state.promptBuilder.theme =
    [
      // Add two values to theme Array
      {
        id: 0,
        name: state.lib.theme.general[arrayRandomizer(state.lib.theme.general.length)] // Get a random entry from general array
      },
      {
        id: 1,
        name: array[arrayRandomizer(array.length)]
      }
    ]
  } else {
    state.promptBuilder.theme =
    [
      {
        id: 0,
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
      commit('setThemePrompt')
      commit('setChallengePrompt')
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
     * Set zhe theme for the current prompt to a random item in the theme array
     * @param state
     * @returns void
    */
    setThemePrompt (state): void {
      // Determine whether to show normal or special value (Chance 50%)
      switch (state.appView.formElements.slider.activeItem) {
        // Case for People prompts
        case 0:
          themeHelper(state, state.lib.theme.people.normal, state.lib.theme.people.special)
          break

        case 1:
          themeHelper(state, state.lib.theme.places.normal, state.lib.theme.places.special)
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
            { id: 1, name: 'Places' }
          ]
        }
      },
      promptOverlay: {
        isVisible: false
      }
    },
    lib: {
      challenges: challenges.data,
      theme: {
        // general is used as library for the first part of the theme and includes all normal arrays
        general: people.data.concat(places.data),
        people: {
          normal: people.data,
          special: peopleSpecial.data
        },
        places: {
          normal: places.data,
          special: placesSpecial.data
        }
      }
    },
    promptBuilder: {
      challenge: '',
      theme: [{}]
    }
  }
})
