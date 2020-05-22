# Documentation

## Assets
The app uses images such as the background and logo. The fonts are self-hosted.
- The **included fonts** are located under src/assets/fonts and declared under src/scss/_fonts.scss.
- **Images** are located under src/assets/img

## Components
All Components are stored in Single-File-Components under src/components.
**The App View** is the main component including all components rendered
to the front end.

Components available:
  - **BaseButton**: The basic Button in the UI of the app
  - **BaseSlider**: A slider with left and right buttons and label text, that goes through a number of options in the store.
  - **ToggleButton**: Extends the BaseButton. Toggles an active and inactive state.

## Prompt Configuration
The **Prompt Configuration** is set by the user using the frontend UI.
The configuration is inside the store under src/store/index.ts.
All frontend components commit changes to the store.

## SCSS
All variables are declared in their respective files  under src/scss/vars.
They are made available to the components via inclusion in the
vue.config.js, which prepends the components with use declarations for 
these files and gives them a namespace.

## Adding a theme to the theme slider
1. Add Item to the theme slider in store under appview -> items
1. Create JSON-Files under src/libs/theme
2. Import them inside the store under //vocab libraries
3. add the arrays to the lib.theme property of the state
4. Updata general property under lib.theme.general
5. Add a switch case to the setThemePrompt Mutation

## Library data flow
**For themes**
Possible themes are defined in JSON-Files under the src/lib folder.
Each file consists of a Javascript Object, containing an Array under
it's data property. The Array holds all terms for the topic of this file.

In the store, under store/index.ts, the file is imported under a given
namespace **import * as namespace from 'path**. In the app state.lib.theme
property, the data-Array of the file is mapped to it's applicable property
and exposed to the store. 
In the general property **theme.general**, all data
Arrays are concatenated for a pool of all possible values. This is used
for the first part of the theme in the prompt, which could be anything.

When the User clicks 'Let's go!' in the UI, the buildPrompt-Action inside
the store is called upon and commits Mutations for the various parts of the
prompt, closing with the setFirstPromptCreated-Mutation, so the prompt
gets rendered to the frontend.

For themes, the applicable mutation is setThemePrompt. It's documented
as such:

  Determine which theme pool should be used, by getting the index of the active item in the slider
  and loading a theme pool based on that number. Correspondance between slider order and loading the
  appropriate pool needs to be checked MANUALLY by checking the order inside appView.formElements.slider.items

For the appropriate case inside the switch, the appropriate
normal (use two parts for theme construction) and special (use one part for theme construction)
theme pool are passed to the theme helper function. The helper
function is documented inline. It writes a number of objects
with an index (needed for the v-for directive inside the component)
and the theme text into the theme property of the store.

In the front end, inside the PromptBuilder-Component, that Array
is iterated over by a v-for directive and the themes appear in
the front end.