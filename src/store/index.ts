import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
  },
  modules: {
  },
  mutations: {
    toggleChallenge (state) {
      state.appView.formElements.challengeButton.isActive
        ? state.appView.formElements.challengeButton.isActive = false
        : state.appView.formElements.challengeButton.isActive = true
    }
  },
  state: {
    appView: {
      formElements: {
        challengeButton: {
          isActive: false
        }
      }
    }
  }
})
