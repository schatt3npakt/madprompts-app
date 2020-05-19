import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
  },
  modules: {
  },
  mutations: {
    decreaseActiveItem (state) {
      const slider = state.appView.formElements.slider

      slider.activeItem === 0
        ? slider.activeItem = slider.items.length - 1
        : slider.activeItem--
    },
    increaseActiveItem (state) {
      const slider = state.appView.formElements.slider

      slider.activeItem === slider.items.length - 1
        ? slider.activeItem = 0
        : slider.activeItem++
    },
    toggleChallenge (state) {
      const challengeButton = state.appView.formElements.challengeButton

      challengeButton.isActive
        ? challengeButton.isActive = false
        : challengeButton.isActive = true
    }
  },
  state: {
    appView: {
      formElements: {
        challengeButton: {
          isActive: false
        },
        slider: {
          activeItem: 0,
          items: [
            { id: 0, name: 'People' },
            { id: 1, name: 'Places' }
          ]
        }
      }
    }
  }
})
