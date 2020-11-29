export default class Helpers {
  /**
   * Returns a random number between 0 and the passed max-1, because the length
   * of the Array is 1 larger that the indexes of the items
   * @param max: number
   * @returns number
  */
  arrayRandomizer = (max: number): number => {
    return Math.floor(Math.random() * (max))
  }

  /**
   * Returns a random integer, including the max
   * @param max: number
   * @returns number
  */
  randomizer = (max: number) => {
    return Math.floor(Math.random() * (max + 1))
  }

  /**
   * Returns a boolean based on the passed chance parameter according to pattern {chance}
   * @param chance: number
   * @returns boolean
  */
  chanceHelper = (chance: number) => {
    return this.randomizer(100) <= chance
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
  adjectivesHelper = (state: any, passedArray: any): void => {
    // Too few terms in passed array exception
    try {
      if (state.appView.formElements.numberInput.value > passedArray.length) throw new Error('adjectivesHelper: Adjectives input exceeds passed array items.')
    } catch (err) {
      console.log(err)
      return
    }

    /**
     * Empty Array and define Array for adjective Ids in use
    * This will be used to determine if an adjective id has already been added to the prompt,
    * preventing duplicates
    */
    state.promptBuilder.adjectives = []
    const exsistingAdjectiveIds = [{}]

    // Detect if Challenge is active to determine whether to use style adjectives
    if (state.appView.formElements.challengeButton.isActive) {
      // Check if the user has selected one adjective and return if zero are given
      if (parseInt(state.appView.formElements.numberInput.value) === 0) {
        // Do nothing
      } else if (parseInt(state.appView.formElements.numberInput.value) === 1) {
        // push style adjective and index into state array
        state.promptBuilder.adjectives.push(
          {
            id: 'adjective0',
            text: state.lib.adjectives.style[this.arrayRandomizer(state.lib.adjectives.style.length)]
          }
        )
      } else {
        // first, push style adjective and index into state array
        state.promptBuilder.adjectives.push(
          {
            id: 'adjective0',
            text: state.lib.adjectives.style[this.arrayRandomizer(state.lib.adjectives.style.length)]
          }
        )

        // Run Loop for number of times based on user input, minus 1, because we already added the style adjective
        for (let i = 0; i < (state.appView.formElements.numberInput.value - 1); i++) {
          let currentAdjectiveKey

          // If the generated adjective Id already exists inside exsistingAdjectiveIds Array, reassign it
          do {
            currentAdjectiveKey = this.arrayRandomizer(passedArray.length)
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
          currentAdjectiveKey = this.arrayRandomizer(passedArray.length)
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
  themeHelper = (state: any, array: any, specialArray: any): void => {
    // Too few items in passed array exception
    try {
      if (array.length < 1 || specialArray.length < 1) throw new Error('themeHelper: Too few items in passed array for prompt contstruction.')
    } catch (err) {
      console.log(err)
      return
    }

    // Determine whether to show normal or special value (5% Chance to get Special)
    if (this.chanceHelper(95)) {
      state.promptBuilder.theme =
      [
        // Add two values to theme Array inside the app state
        {
          id: 'theme0',
          // Get a random entry from general array
          text: state.lib.theme.general[this.arrayRandomizer(state.lib.theme.general.length)]
        },
        {
          id: 'theme1',
          // Get a random entry from normal theme array
          text: array[this.arrayRandomizer(array.length)]
        }
      ]
    } else {
      // Add one value to theme Array
      state.promptBuilder.theme =
      [
        {
          id: 'theme0',
          // Get a random entry from special theme array
          text: specialArray[this.arrayRandomizer(specialArray.length)]
        }
      ]
    }
  }
}
