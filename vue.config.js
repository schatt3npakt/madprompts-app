module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @use "src/scss/vars/colors" as colors;
            @use "src/scss/vars/margins" as margins;
            @use "src/scss/fonts";
            `
      }
    }
  }
}
