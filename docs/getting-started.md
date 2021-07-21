# Getting started

## Installation

To get started you have to add the `nuxt-typo3` module to your [Nuxt.js](https://nuxtjs.org/) application. To bootstrap your app we recommend to use [create-nuxt-typo3](https://github.com/TYPO3-Initiatives/create-nuxt-typo3), which is an exact fork of `create-nuxt-app`, but includes preconfigured options to start with `nuxt-typo3`.

### Install with yarn

```sh
yarn add nuxt-typo3
```

### Install with npm

```sh
npm install nuxt-typo3
```

## Configuration

Add the `typo3` object to your `nuxt.config.js` to configure all required settings. Read more about configuration [here](https://typo3-initiatives.github.io/nuxt-typo3/configuration/i18n.html).

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
`nuxt-typo3` requires [Vuex](https://vuex.vuejs.org/). Create an empty index.js file in the store directory. (Read more about Vuex in Nuxt.js [here](https://nuxtjs.org/guide/vuex-store).)
:::

::: tip
If you want to see TYPO3 headless API response on your homepage, please remove your `pages/index.vue` file.
:::
