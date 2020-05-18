module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @use "src/scss/vars/animations" as animations;
            @use "src/scss/vars/colors" as colors;
            @use "src/scss/vars/margins" as margins;
            @use "src/scss/fonts" as fonts;
            `
      }
    }
  }
}
