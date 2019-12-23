# Getting started

## Installation

To get started you have to add nuxt-typo3 module for your [Nuxt.js](https://nuxtjs.org/) application. To bootstrap your app we recommend [create-nuxt-typo3-app](https://github.com/TYPO3-Initiatives/create-nuxt-typo3) which is exactly fork of nuxt-create-app but included preconfigured options to start with nuxt-typo3.

### Install with yarn

```sh
yarn add nuxt-typo3
```

### Install with npm

```sh
npm install nuxt-typo3
```

## Configuration

Add `typo3` object to your nuxt.config.js to configure all required settings. Read more about configuration here

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

::: warning
`nuxt-typo3` require [Vuex](https://vuex.vuejs.org/) store. Create empty index.js file in store directory, read more [here](https://nuxtjs.org/guide/vuex-store).
:::

::: tip
If you want to see TYPO3 headless API response on your homepage, please remove your `pages/index.vue` file.
:::
