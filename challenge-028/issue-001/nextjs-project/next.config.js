//const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true
  //,i18n
}

module.exports = nextConfig


/*module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,

    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          "fs": false,
          "path": false,
          "os": false,
        }
      }
      return config
    },
  }
}*/