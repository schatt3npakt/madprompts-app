# Documentation

## Project Structure

### Assets
The app uses images such as the background and arrows. The fonts are self-hosted.
- The **included fonts** are located under src/assets/fonts and declared under src/scss/_fonts.scss. The used font is "VT323" by Peter Hull
- **Images** are located under src/assets/img, e.g. the background. icons such as the arrows are base64-encoded and stored inside scss-variables
- the **favicon, index.html and robots.txt** are located outside of the src folder, inside the public folder.

### Components
All Components are stored in Single-File-Components under src/components.

Components available:
  - **BaseButton**: The basic Button in the UI of the app, for exammple the "Let's go!" Button
  - **BaseNumberInput**: Consists of label text and an input on the right side. the input allows inputs from 1-9 and is used to set the number of wanted adjectives
  - **BaseSlider**: A slider with left and right buttons and label text. it is used to select the theme of the prompt.
  - **TheAppView** is the main component including all components rendered to the front end.
  - **ThePromptBuilder** renders the prompt to the prompt overlay.
  - **ThePromptOverlay** is the Overlay that is shown when the user submits his prompt configuration. It implements ThePromptBuilder.
  - **ToggleButton**: Extends the BaseButton. Toggles an active and inactive state. It is used to enable and disable challenge mode.

### Lib
The Prompts are generated by constructing a sequence of strings from JSON-Files. The underlying scheme for prompt construction
can be found in the notes/schema.md. The files are stored inside the lib folder. 

It is divided into the different types needed for
prompt construction. The files of the theme folder are separated into base and seasonal files. 
Base files provide the core vocabulary for themes. Seasonal Files provide limited-time-vocabulary and are suited for timed
challenges or seasonally changing content. Each JSON-File stores the terms inside an Array under the property data.

### SCSS
All variables are declared in their respective files  under src/scss/vars.
They are made available to the components via inclusion in the
vue.config.js, which prepends the components with use declarations for 
these files and gives them a namespace.

## Prompt Builder and extending the prompt builder

### Prompt Configuration
The **Prompt Configuration** is set by the user using the frontend UI.
The configuration is inside the store under src/store/index.ts.
All Options are found under the state.appView-property.

### Adding a theme to the theme slider and prompt builder
1. Add Item to the theme slider in store/index.ts under state.appview.formElements.slider.items
2. Create both normal and special JSON-Files under src/libs/theme
3. Add desired terms to the Arrays under data-Property
4. Import them inside the store/index.ts under //vocab libraries
5. add the arrays to the state.lib.theme property of the state
6. Update general theme Array with the new Arrays under state.lib.theme.general
7. Add a switch case to the setThemePrompt Mutation

### Library data flow
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