module.exports = {
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
    manifestOptions: {
      backgroundColor: '#2c3e50',
      icons: [
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'android-chrome-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: 'android-chrome-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: 'android-chrome-maskable-384x384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    name: 'Madprompts',
    themeColor: '#2c3e50'
  }
}
