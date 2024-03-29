import Vue from 'vue'
import Vuex from 'vuex'
import Helpers from './modules/helpers'

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
import * as themeSetting from '@/lib/theme/base/setting.json'
import * as themeSettingSpecial from '@/lib/theme/base/settingSpecial.json'

// adjectives
import * as adjectivesBeasts from '@/lib/adjectives/beasts.json'
import * as adjectivesFood from '@/lib/adjectives/food.json'
import * as adjectivesPeople from '@/lib/adjectives/people.json'
import * as adjectivesPlaces from '@/lib/adjectives/places.json'
import * as adjectivesSetting from '@/lib/adjectives/setting.json'
import * as adjectivesStyle from '@/lib/adjectives/style.json'

// seasonal vocab libraries
// themes

// init helpers object
const helpers = new Helpers()

Vue.use(Vuex)

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
      commit('constructPromptString')
    }
  },
  modules: {},
  mutations: {
    /**
     * Construct the prompt String for the downloadable image, render image and set download link
     * @param state
     * @returns void
     */
    constructPromptString (state): void {
      /* eslint-disable */
      //empty prompt array
      state.promptBuilder.promptString = []

      state.promptBuilder.promptString.push('Draw this:')

      // push adjectives into prompt array
      for (let i = 0; i < state.promptBuilder.adjectives.length; i++) {
        if (i === 0) {
          // set edjective for first article and push
          let promptArticle = state.promptBuilder.adjectives[i].text.match('^[aieouAIEOU].') ? 'An' : 'A'

          state.promptBuilder.promptString.push(promptArticle + ' ' + state.promptBuilder.adjectives[i].text + ',')
        } else {
          state.promptBuilder.promptString.push(state.promptBuilder.adjectives[i].text + ',')
        }
      }

      // combine theme strings and push theme into prompt array
      let themeString
      if (state.promptBuilder.theme.length > 1) {
        themeString = state.promptBuilder.theme[0].text + ' ' + state.promptBuilder.theme[1].text
      } else {
        themeString = state.promptBuilder.theme[0].text
      }
      state.promptBuilder.promptString.push(themeString)

      // push challenge into prompt array
      if (state.appView.formElements.challengeButton.isActive) {
        state.promptBuilder.promptString.push(state.promptBuilder.challenge)
      }

      // start drawing canvas
      const canvas: any = document.querySelector('#imageBuilderCanvas')
      const imageElement: any = document.querySelector('#imageBuilderImage')
      const imageDownload: any = document.querySelector('#imageDownload')
      const ctx = canvas.getContext('2d')
      const logo = new Image()
      const hardmodeIcon = new Image()
      const themeIcon = new Image()
      const fileName = 'madprompt_' + themeString.replace(' ', '_').toLowerCase()
      let iconYPosition: Number

      const icons = {
        beasts: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAWZJREFUeJzt201Kw2AURuFGilpqoJBZN+EyHLkhh27A9RV/wEkEf1uSJtZJ3MILJ21FzjO+XMrhm1xCJxNJkiRJOrQiHRyGIZprtrtorpyfRQvvn9+ifXsQtTnZ96/47wwIGRAyIGRAyICQASEDQgaEpungx3obzVWL+V+/MCJN00dzvkDIgJABIQNCBoQMCBkQMiBkQKhIv3Wkl8jnpssWhlarlzHXxarqwm8ih2BAyICQASEDQgaEDAgZEDIgVLx/tdHg2N860gtjNjuNLoK+/4n2jc0XCBkQMiBkQMiAkAEhA0IGhAwIFfXrJhpsu110iaQXRlmeRxdG03xH+66vLqO5sfkCIQNCBoQMCBkQMiBkQMiAkAGhadtl/zBPLZeL6MKo63W071gXRsoXCBkQMiBkQMiAkAEhA0IGhAwIFTe3d9Fgu83+J5J6eHwadd+x+AIhA0IGhAwIGRAyIGRAyICQAaFfbKFHBqA75a4AAAAASUVORK5CYII=',
        setting: 'data:image/png;base64,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',
        food: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAARRJREFUeJzt27FNAzEYgNELugGoMxIdqzAIq9AxBn2o0hCkFBFSCkpYwdFnIgTv1adfd5/cWGcvCwAAwLVtXvfH2TO/Zg+cbDNz2M3MYf+RgJGAkYCRgJGAkYCRgJGA0XrBs799hzFq9DuGdixWYCRgJGAkYCRgJGAkYCRgJGAkYCRgJGAkYCRgJGAkYCRgJGAkYLQuf+dfx2xDXazASMBIwEjASMBIwEjASMBIwOiS01lD7h7uZ4+c6vnxaeo8KzASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjBaz+fPoZvZh8PH0Gml08tbe6Mfttu9Dz233d66sX4NAkYCRgJGAkYCRgJGAkYCRt8WRhdNmVylTAAAAABJRU5ErkJggg==',
        people: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAARlJREFUeJzt2yFOA1EUQNGWNA0WBIYgSCVrQzWsgqBYH4pgEGBJDWzhDbc0iHP0y/w/N1/MiL9aAQAAnNp6Onj/8DQd/f7dVk5m9M7Pj/vRw87SVhCwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjBaL7j/MXI4fI3mXt9ejnqf5OZ6N7r/sd2eH3NZJ7ASMBIwEjASMBIwEjASMBIw2iyYHf05TL/0d7d3C5YeOfZN+dGfjRMYCRgJGAkYCRgJGAkYCRgJGG0+Pt9Hg5cXV3+8lf9l2sUJjASMBIwEjASMBIwEjASMBIx+AL6MFUd9JvdPAAAAAElFTkSuQmCC',
        places: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAUFJREFUeJzt3DEOAVEUQNE/Mp1eS6Ibpd7EAnSsQmsXdJZBoqKwD1pLYQtP7ssg7qlffiY3v5m8oXrMxiXZM/vAZFXmYb3Mw/6RASEDQgaEDAgZEDIgZEDIgFD9xmz2G0bqG0GJP190LvR83kDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQAaF3diLRHUb2biKbX2d9EwNCBoQMCBkQMiBkQMiAkAGh+rjahQab2zU2d4/Nfcq5PwzNXfqj0Jw3EDIgZEDIgJABIQNCBoQMCBkQqrb7U3Q2dYexPGwyjyvrQZt63qSZ+juRLhgQMiBkQMiAkAEhA0IGhAwI1eX7/+sq1bxdREdDXbyBkAEhA0IGhAwIGRAyIGRAyIDQx3YiP8CdSBcMCBkQMiBkQMiAkAEhA0IGhF6fjxnFy0MgqAAAAABJRU5ErkJggg==',
        skull: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAThJREFUeJzt2zESwUAYQOGNSamioMZwgTSUDq6kyQUY1BRU+nUAzW9ekJH31TsrefMX2TFb5JxTUHjhnygii3qffop/Z0DIgJABIQNCBoQMCBkQMiBUpu6dMKJCXZxAyICQASEDQgaEDAgZEDIgZECojC6sVutGf7jebhrd71fP5wRCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgV+Y2LInrlBEIGhAwIGRAyIGRAyICQASEDQmUK3sxO3btP4o31bzAgZEDIgJABIQNCBoQMCBkQCt8Tud0foS/zXX1u9YllWU1C7zEc9EP7OYGQASEDQgaEDAgZEDIgZEDIgFD0/5C0P15C6+bTUatPIofTNfTOi9k4tJ8TCBkQMiBkQMiAkAEhA0IGhAwIPQEKHx+fFWrmBAAAAABJRU5ErkJggg=='
      }

      //Image style
      const borderWidth = 25
      const promptFont = (state.promptBuilder.promptString.length <= 6) ? '50px VT323' : '40px VT323'
      const fontColor = 'rgb(255, 255, 255)'
      const promptLineheight = (state.promptBuilder.promptString.length <= 6) ? 60 : 50

      //draw blue background
      ctx.fillStyle = 'rgb(44, 62, 80)'
      ctx.fillRect(0, 0, 1080, 1080)

      //draw image, then generate Logo and download link
      logo.onload = function () {
        // draw hardmodeIcon
        if (state.appView.formElements.challengeButton.isActive && state.appView.formElements.numberInput.value >= 3 || state.appView.formElements.numberInput.value >= 5) {
          ctx.drawImage(hardmodeIcon, 570, iconYPosition, 64, 64)
        }

        // draw challengeicon centered if hardmode is enabled and left of skull if it is not
        if (state.appView.formElements.challengeButton.isActive && state.appView.formElements.numberInput.value >= 3 || state.appView.formElements.numberInput.value >= 5) {
          ctx.drawImage(themeIcon, 437, iconYPosition, 64, 64)
        } else {
          ctx.drawImage(themeIcon, 508, iconYPosition, 64, 64)
        }

        ctx.drawImage(logo, 40, 944, 460, 85.5)

        // generate download link and set canvas to image
        const dataURI = canvas.toDataURL()
        imageElement.src = dataURI
        imageDownload.href = dataURI
        imageDownload.download = fileName
      }

      // set theme icon sources based on theme slider
      switch (state.appView.formElements.slider.activeItem) {
        case 0:
          themeIcon.src = icons.people
          break

        // Case for Places prompts
        case 1:
          themeIcon.src = icons.places
          break

        // Case for Beasts prompts
        case 2:
          themeIcon.src = icons.beasts
          break

        // Case for Food prompts
        case 3:
          themeIcon.src = icons.food
          break

        // Case for Setting prompts
        case 4:
          themeIcon.src = icons.setting
          break
      }

      hardmodeIcon.src = icons.skull
      logo.src = '/img/logo-desktop.svg'

      //draw border
      ctx.strokeStyle = fontColor
      ctx.lineWidth = borderWidth
      ctx.strokeRect(0, 0, 1080, 1080)

      // Drwa prompt to image
      let x = 540
      let y = 100
      ctx.fillStyle = fontColor
      ctx.font = promptFont
      ctx.textAlign = 'center'

      //loop through items in prompt array
      for (let i = 0; i < state.promptBuilder.promptString.length; i++) {
        if (i === 1) {
          ctx.fillText(state.promptBuilder.promptString[i], x, y + (i * (promptLineheight * 2)))
        } else if (i > 1) {
          ctx.fillText(state.promptBuilder.promptString[i], x, y + (i * promptLineheight) + promptLineheight)
        } else {
          ctx.fillText(state.promptBuilder.promptString[i], x, y + (i * promptLineheight))
        }

        if (i < state.promptBuilder.promptString.length - 1) {
          iconYPosition = y + (i * promptLineheight) + promptLineheight + 150
        }
      }

      ctx.textAlign = 'right'
      // SoMe Handle
      ctx.fillText('@madprompts', 1020, 950)
      ctx.fillText('#madpromptAccepted', 1020, 1010)
    },

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
        helpers.adjectivesHelper(state, state.lib.adjectives.general)
      } else {
        switch (state.appView.formElements.slider.activeItem) {
          // Case for People prompts
          case 0:
            helpers.adjectivesHelper(state, state.lib.adjectives.people)
            break

          // Case for Places prompts
          case 1:
            helpers.adjectivesHelper(state, state.lib.adjectives.places)
            break

          // Case for Beasts prompts
          case 2:
            helpers.adjectivesHelper(state, state.lib.adjectives.beasts)
            break

          // Case for Food prompts
          case 3:
            helpers.adjectivesHelper(state, state.lib.adjectives.food)
            break

          // Case for setting prompts
          case 4:
            helpers.adjectivesHelper(state, state.lib.adjectives.setting)
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
      state.promptBuilder.challenge = state.lib.challenges[helpers.arrayRandomizer(state.lib.challenges.length)]
    },

    /**
     * Set zhe headline for the current prompt to a random item in the headlines array
     * @param state
     * @returns void
     */
    setPromptHeadline (state): void {
      state.promptBuilder.headline = state.lib.headlines[helpers.arrayRandomizer(state.lib.headlines.length)]
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
          helpers.themeHelper(state, state.lib.theme.people.normal, state.lib.theme.people.special)
          break

        // Case for Places prompts
        case 1:
          helpers.themeHelper(state, state.lib.theme.places.normal, state.lib.theme.places.special)
          break

        // Case for Beasts prompts
        case 2:
          helpers.themeHelper(state, state.lib.theme.beasts.normal, state.lib.theme.beasts.special)
          break

        // Case for Food prompts
        case 3:
          helpers.themeHelper(state, state.lib.theme.food.normal, state.lib.theme.food.special)
          break

        // Case for setting prompts
        case 4:
          helpers.themeHelper(state, state.lib.theme.setting.normal, state.lib.theme.setting.special)
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
          value: 1
        },
        slider: {
          activeItem: 0,
          items: [
            {
              id: 0,
              name: 'People'
            },
            {
              id: 1,
              name: 'Places'
            },
            {
              id: 2,
              name: 'Beasts'
            },
            {
              id: 3,
              name: 'Food'
            },
            {
              id: 4,
              name: 'Setting'
            }
          ]
        }
      },
      promptOverlay: {
        isVisible: false
      }
    },
    lib: {
      adjectives: {
        // general is used as library of applicable adjectives
        general: adjectivesPeople.data.concat(
          adjectivesBeasts.data,
          adjectivesFood.data,
          adjectivesPlaces.data
        ),
        beasts: adjectivesBeasts.data,
        food: adjectivesFood.data,
        people: adjectivesPeople.data,
        places: adjectivesPlaces.data,
        setting: adjectivesSetting.data,
        style: adjectivesStyle.data
      },
      challenges: challenges.data,
      headlines: headlines.data,
      theme: {
        // general is used as library for the first part of the theme and includes all normal arrays
        general: themePeople.data.concat(
          themeBeasts.data,
          themeFood.data,
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
        },
        setting: {
          normal: themeSetting.data,
          special: themeSettingSpecial.data
        }
      }
    },
    promptBuilder: {
      adjectives: Array,
      challenge: '',
      firstPromptCreated: false,
      headline: '',
      promptString: [''],
      theme: Array
    }
  }
})
