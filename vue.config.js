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
  publicPath: '',
  pwa: {
    appleMobileWebAppCapable: true,
    iconPaths: {
      favicon32: 'favicon-32x32.png',
      favicon16: 'favicon-16x16.png',
      appleTouchIcon: 'apple-touch-icon-152x152.png',
      maskIcon: 'safari-pinned-tab.svg',
      msTileImage: 'mstile-150x150.png'
    },
    name: 'MADPROMPTS',
    themeColor: '#2c3e50'
  }
}
