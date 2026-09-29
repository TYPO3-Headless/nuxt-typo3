export default defineAppConfig({
  seo: {
    title: 'TYPO3 Headless',
    description: 'TYPO3 Frontend rendered in Vue.js and Nuxt (frontend for EXT:headless)',
    ogImage: 'https://pbs.twimg.com/profile_banners/1571770922461274114/1663762529/1500x500'
  },
  header: {
    logo: true,
    showLinkIcon: true,
    exclude: []
  },
  socials: {
    x: 'https://x.com/t3headless/',
    github: 'https://github.com/TYPO3-Headless/nuxt-typo3',
    youtube: 'https://www.youtube.com/@TYPO3Headless'
  },
  footer: {
    credits: false
  },
  ui: {
    colors: {
      primary: 'orange',
      // neutral: 'zinc'
    }
  }
})
