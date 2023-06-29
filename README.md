<p align="center">
  <img align="center" width="500" src="docs/static/nuxt_typo3.svg" alt="nuxt-typo3">
</p>
<p align="center">
  <a href="https://npmjs.com/package/nuxt-typo3"><img src="https://img.shields.io/npm/v/nuxt-typo3/latest.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.com/package/nuxt-typo3"><img src="https://img.shields.io/npm/dt/nuxt-typo3.svg?style=flat-square" alt="npm version"></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square" alt="standard js"></a>
  <a href="https://www.npmjs.com/package/nuxt-typo3"><img src="https://img.shields.io/npm/l/nuxt-typo3.svg?style=flat-square" alt="License"></a>
</p>

#### TYPO3 module for [Nuxt.js](https://nuxtjs.org) and [TYPO3 headless](https://github.com/TYPO3-Initiatives/headless) provides API handling and frontend rendering.

#### TYPO3 & Headless Ext compability

TYPO3 >= v11.5 & Headless version 3.x -> nuxt-typo3@1.x.x (master)

TYPO3 < 11.5 & Headless version 2.x -> nuxt-typo3@0.x.x [(0.9x)](https://github.com/TYPO3-Headless/nuxt-typo3/tree/0.9x) 
### [DOCUMENTATION](https://typo3-headless.github.io/nuxt-typo3/)

### NUXT3
Are you looking for the newest version compatible with Nuxt3?
https://t3headless.macopedia.io/nuxt-typo3/ 

# Features

✅ Handle dynamic API routes

✅ Frontend layouts

✅ Backend layouts

✅ Multilanguage

✅ Meta tags provided by API

✅ Most of the standard TYPO3 Content Elements

✅ SSR Ready

# Setup

## Installation

Install with yarn

```sh
yarn add nuxt-typo3
```

Install with npm

```sh
npm install nuxt-typo3
```

## Configuration

1. Add `typo3` object to your nuxt.config.js to configure all required settings.

```js
{
  modules: [
    'nuxt-typo3',
  ],

  typo3: {
    baseURL: 'https://yourwebsite.com',
    api: {
      baseURL: 'https://api.yourwebsite.com'
    },
    i18n: {
      locales: ['en', 'pl', 'de'],
      defaultLocale: 'en'
    }
  }
}
```

2. By default this plugin uses dynamic routing (`_.vue`), please remove `index.vue` from pages directory - now your pages provides TYPO3 API. 

## See In action

- [Macmillan English](https://www.macmillanenglish.com)
- [jwied agency](https://www.jwied.de)
- [Karta Multisport](https://www.kartamultisport.pl/)
- [Raben Group](https://raben-group.com/)
- [Robomow.com](https://www.robomow.com/)
- [Macopedia.com](https://macopedia.com/)

## Development

1. Clone this repository
2. Install dependencies using `yarn install`
3. Start development server using `yarn dev`

Please read [contributing guide](CONTRIBUTING.md)

## License

[MIT License](./LICENSE)

Copyright (c) MACOPEDIA
 
