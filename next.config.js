const nextConfig = {
  reactStrictMode: true,

  trailingSlash: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    localeDetection: false
  },
}

module.exports = nextConfig
