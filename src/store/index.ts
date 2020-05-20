import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
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
    }
  }
})
