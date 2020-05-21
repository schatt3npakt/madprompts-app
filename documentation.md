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