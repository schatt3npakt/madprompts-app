module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @use "src/scss/vars/animations" as animations;
            @use "src/scss/vars/breakpoints" as breakpoints;
            @use "src/scss/vars/colors" as colors;
            @use "src/scss/vars/dimensions" as dimensions;
            @use "src/scss/vars/icons" as icons;
            @use "src/scss/vars/margins" as margins;
            @use "src/scss/vars/fonts" as fonts;
            @use "src/scss/vars/z-index" as z-index;
            `
      }
    }
  },
  publicPath: ''
}
