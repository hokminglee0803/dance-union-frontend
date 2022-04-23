const nextConfig = {
  reactStrictMode: true,

  trailingSlash: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  i18n: {
    locales: ['zh'],
    defaultLocale: 'zh',
    localeDetection: false
  },
}

module.exports = nextConfig
