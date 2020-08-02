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

  // Detect if Challenge is active to determine whether to use style adjectives
  if (state.appView.formElements.challengeButton.isActive) {
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
  } else {
    // Run Loop for number of times based on user input
    for (let i = 0; i < state.appView.formElements.numberInput.value; i++) {
      let currentAdjectiveKey

      // If the generated adjective Id already exists inside exsistingAdjectiveIds Array, reassign it
      do {
        currentAdjectiveKey = arrayRandomizer(passedArray.length)
      } while (exsistingAdjectiveIds.indexOf(currentAdjectiveKey) >= 1)

      // push adjective and index into state array
      state.promptBuilder.adjectives.push(
        {
          id: 'adjective' + i,
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
        text: specialArray[arrayRandomizer(specialArray.length)]
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
      commit('constructPromptString')
    }
  },
  modules: {
  },
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
        themeString = state.promptBuilder.theme[0].text + " " + state.promptBuilder.theme[1].text
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
      let iconYPosition: Number

      const icons = {
        beasts: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAWZJREFUeJzt201Kw2AURuFGilpqoJBZN+EyHLkhh27A9RV/wEkEf1uSJtZJ3MILJ21FzjO+XMrhm1xCJxNJkiRJOrQiHRyGIZprtrtorpyfRQvvn9+ifXsQtTnZ96/47wwIGRAyIGRAyICQASEDQgaEpungx3obzVWL+V+/MCJN00dzvkDIgJABIQNCBoQMCBkQMiBkQKhIv3Wkl8jnpssWhlarlzHXxarqwm8ih2BAyICQASEDQgaEDAgZEDIgVLx/tdHg2N860gtjNjuNLoK+/4n2jc0XCBkQMiBkQMiAkAEhA0IGhAwIFfXrJhpsu110iaQXRlmeRxdG03xH+66vLqO5sfkCIQNCBoQMCBkQMiBkQMiAkAGhadtl/zBPLZeL6MKo63W071gXRsoXCBkQMiBkQMiAkAEhA0IGhAwIFTe3d9Fgu83+J5J6eHwadd+x+AIhA0IGhAwIGRAyIGRAyICQAaFfbKFHBqA75a4AAAAASUVORK5CYII=',
        food: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAARRJREFUeJzt27FNAzEYgNELugGoMxIdqzAIq9AxBn2o0hCkFBFSCkpYwdFnIgTv1adfd5/cWGcvCwAAwLVtXvfH2TO/Zg+cbDNz2M3MYf+RgJGAkYCRgJGAkYCRgJGA0XrBs799hzFq9DuGdixWYCRgJGAkYCRgJGAkYCRgJGAkYCRgJGAkYCRgJGAkYCRgJGAkYLQuf+dfx2xDXazASMBIwEjASMBIwEjASMBIwOiS01lD7h7uZ4+c6vnxaeo8KzASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjBaz+fPoZvZh8PH0Gml08tbe6Mfttu9Dz233d66sX4NAkYCRgJGAkYCRgJGAkYCRt8WRhdNmVylTAAAAABJRU5ErkJggg==',
        people: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAARlJREFUeJzt2yFOA1EUQNGWNA0WBIYgSCVrQzWsgqBYH4pgEGBJDWzhDbc0iHP0y/w/N1/MiL9aAQAAnNp6Onj/8DQd/f7dVk5m9M7Pj/vRw87SVhCwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjASMBIwEjBaL7j/MXI4fI3mXt9ejnqf5OZ6N7r/sd2eH3NZJ7ASMBIwEjASMBIwEjASMBIw2iyYHf05TL/0d7d3C5YeOfZN+dGfjRMYCRgJGAkYCRgJGAkYCRgJGG0+Pt9Hg5cXV3+8lf9l2sUJjASMBIwEjASMBIwEjASMBIx+AL6MFUd9JvdPAAAAAElFTkSuQmCC',
        places: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAUFJREFUeJzt3DEOAVEUQNE/Mp1eS6Ibpd7EAnSsQmsXdJZBoqKwD1pLYQtP7ssg7qlffiY3v5m8oXrMxiXZM/vAZFXmYb3Mw/6RASEDQgaEDAgZEDIgZEDIgFD9xmz2G0bqG0GJP190LvR83kDIgJABIQNCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQAaF3diLRHUb2biKbX2d9EwNCBoQMCBkQMiBkQMiAkAGh+rjahQab2zU2d4/Nfcq5PwzNXfqj0Jw3EDIgZEDIgJABIQNCBoQMCBkQqrb7U3Q2dYexPGwyjyvrQZt63qSZ+juRLhgQMiBkQMiAkAEhA0IGhAwI1eX7/+sq1bxdREdDXbyBkAEhA0IGhAwIGRAyIGRAyIDQx3YiP8CdSBcMCBkQMiBkQMiAkAEhA0IGhF6fjxnFy0MgqAAAAABJRU5ErkJggg==',
        skull: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAThJREFUeJzt2zESwUAYQOGNSamioMZwgTSUDq6kyQUY1BRU+nUAzW9ekJH31TsrefMX2TFb5JxTUHjhnygii3qffop/Z0DIgJABIQNCBoQMCBkQMiBUpu6dMKJCXZxAyICQASEDQgaEDAgZEDIgZECojC6sVutGf7jebhrd71fP5wRCBoQMCBkQMiBkQMiAkAEhA0IGhAwIGRAyIGRAyICQASEDQgaEDAgV+Y2LInrlBEIGhAwIGRAyIGRAyICQASEDQmUK3sxO3btP4o31bzAgZEDIgJABIQNCBoQMCBkQCt8Tud0foS/zXX1u9YllWU1C7zEc9EP7OYGQASEDQgaEDAgZEDIgZEDIgFD0/5C0P15C6+bTUatPIofTNfTOi9k4tJ8TCBkQMiBkQMiAkAEhA0IGhAwIPQEKHx+fFWrmBAAAAABJRU5ErkJggg=='
      }
      
      //Image style
      const borderWidth = 25
      const promptFont = (state.promptBuilder.promptString.length <= 6) ? '50px VT323' : '40px VT323'
      const fontColor = "rgb(255, 255, 255)"
      const promptLineheight = (state.promptBuilder.promptString.length <= 6) ? 60 : 50

      //draw blue background
      ctx.fillStyle = "rgb(44, 62, 80)"
      ctx.fillRect(0, 0, 1080, 1080)

      //draw image, then generate Logo and download link
      logo.onload = function() {
        // draw hardmodeIcon
        if ( state.appView.formElements.challengeButton.isActive && state.appView.formElements.numberInput.value >= 3 || state.appView.formElements.numberInput.value >= 5) {
          ctx.drawImage(hardmodeIcon, 570, iconYPosition, 64, 64);
        }

        // draw challengeicon centered if hardmode is enabled and left of skull if it is not
        if ( state.appView.formElements.challengeButton.isActive && state.appView.formElements.numberInput.value >= 3 || state.appView.formElements.numberInput.value >= 5) {
          ctx.drawImage(themeIcon, 437, iconYPosition, 64, 64);
        } else {
          ctx.drawImage(themeIcon, 508, iconYPosition, 64, 64);
        }
        
        ctx.drawImage(logo, 40, 944, 460, 85.5);

        // generate download link and set canvas to image
        const dataURI = canvas.toDataURL()
        imageElement.src = dataURI
        imageDownload.href = dataURI
        imageDownload.download = "madprompt.png"
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
      }

      hardmodeIcon.src = icons.skull
      logo.src = "/img/logo-desktop.svg";

      //draw border
      ctx.strokeStyle = fontColor
      ctx.lineWidth = borderWidth
      ctx.strokeRect(0, 0, 1080, 1080)

      // Drwa prompt to image
      let x = 540;
      let y = 100;
      ctx.fillStyle = fontColor
      ctx.font = promptFont
      ctx.textAlign = 'center'

      //loop through items in prompt array
      for (let i = 0; i < state.promptBuilder.promptString.length; i++) {
        if (i === 1) {
          ctx.fillText(state.promptBuilder.promptString[i], x, y + (i*(promptLineheight*2)) );
        } else if (i > 1) {
          ctx.fillText(state.promptBuilder.promptString[i], x, y + (i*promptLineheight) + promptLineheight);
        } else {
          ctx.fillText(state.promptBuilder.promptString[i], x, y + (i*promptLineheight));
        }

        if (i < state.promptBuilder.promptString.length - 1) {
          iconYPosition =  y + (i*promptLineheight) + promptLineheight + 150
        }
      }

      ctx.textAlign = 'right'
      // SoMe Handle
      ctx.fillText('@madprompts', 1020 , 950);
      ctx.fillText('#madpromptAccepted', 1020 , 1010);
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
