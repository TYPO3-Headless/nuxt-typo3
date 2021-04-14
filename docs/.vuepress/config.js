module.exports = {
  title: 'nuxt-typo3',
  base: '/nuxt-typo3/',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/' },
      { text: 'Glossary', link: '/more/glossary' },
      { text: 'TYPO3PWA.COM', link: 'https://typo3pwa.com' },
      {
        text: 'Github',
        link: 'https://github.com/TYPO3-Initiatives/nuxt-typo3'
      }
    ],
    sidebar: {
      '/': [
        {
          title: 'General Information',
          collapsable: false,
          children: ['/', 'getting-started']
        },
        {
          title: 'From scratch',
          collapsable: false,
          children: [
            'from-scratch/',
            'from-scratch/1-backend',
            'from-scratch/2-frontend',
            'from-scratch/3-customization'
          ]
        },
        {
          title: 'Frontend',
          collapsable: false,
          children: [
            'frontend/',
            'frontend/layouts',
            'frontend/_.vue',
            'frontend/backend-layouts',
            'frontend/content-elements'
          ]
        },
        {
          title: 'Configuration',
          collapsable: false,
          children: [
            'configuration/i18n',
            'configuration/domains',
            'configuration/static-generate',
            'configuration/404-handling',
            'configuration/redirects/'
          ]
        }
      ],
      '/more': [
        {
          title: 'More information',
          collapsable: false,
          children: ['more/', 'more/glossary']
        }
      ]
    }
  }
}
