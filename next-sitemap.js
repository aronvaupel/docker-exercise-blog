module.exports = {
  siteUrl: 'https://devhausleipzig.de',
  generateRobotsTxt: true,
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [
        {
          href: `${config.siteUrl}/en/${path}`,
          hreflang: 'en',
        },
        {
          href: `${config.siteUrl}/de/${path}`,
          hreflang: 'de',
        },
      ],
    }
  },
}
