# 2. Bootstrap the frontend application

Let's start with the frontend. In this phase we will provide a frontend application based on [Nuxt.js](https://nuxtjs.org/).

## 1. Nuxt.js installation

The easiest way to start building a frontend application for a TYPO3 headless project is to use the [CLI](https://github.com/TYPO3-Initiatives/create-nuxt-typo3) which we provide.

### Scaffold project

Run the following command in the console:

```bash
$ yarn create nuxt-typo3 <project-name>
```

Then answer these questions and choose your preferred technologies:

1. **Project name** - provide name for package.json
2. **Project description** - provide description for package.json
3. **Author name** - provide author for package.json
4. **Choose the package manager**:
  - Yarn
  - Npm
5. **Choose UI framework**:
  - None (feel free to add one later)
  - Bootstrap
  - Vuetify
  - Bulma
  - Tailwind
  - Element UI
  - Ant Design Vue
  - Buefy
  - iView
  - Tachyons
6. **Choose one of the integrated server-side frameworks**
  - None (Nuxt default server)
  - Express
  - Koa
  - Hapi
  - Feathers
  - Micro
  - Fastify
  - Adonis (WIP)
7. **Choose Nuxt.js module**
  - TYPO3 <Badge text="checked by default" type="tip"/>
  - Axios - Plugin for Ajax requests.
  - Progressive Web App (PWA) Support <Badge text="checked by default" type="tip"/>
8. **Your TYPO3 API Url** - Provide your TYPO3 headless address
9. **Choose linting tools**:
  - ESLint <Badge text="recommended" type="warning"/>
  - Prettier <Badge text="recommended" type="warning"/>
  - Lint staged files <Badge text="recommended" type="warning"/>
9. **Choose test framework**:
  - None (feel free to add one later)
  - Jest
  - AVA
10. **Choose rendering mode**
  - Universal (SSR) <Badge text="checked by default" type="tip"/>
  - Single Page App

::: warning About Rendering Modes
Be aware of the last step where you should select `Universal` as rendering mode if you want to support server side rendering.
:::


## 2. Does it work?

After scaffolding you should be able to run your application:

```bash
$ cd <project-name>
$ yarn run dev
```

By default the application runs on [http://localhost:3000](http://localhost:3000)

## 3. Provide configuration

Our CLI preconfigured some settings for you, but you can always reconfigure your module to your likings. All the configuration options can be found in the [Configuration](/configuration) section.

```js {
{
  modules: [
    'nuxt-typo3', // register module
  ],
  typo3: {
    baseURL: 'https://yourwebsite.com', // provide the frontend domain
    api: {
      baseURL: 'https://api.yourwebsite.com' // provide the backend domain (API)
    },
    i18n: {
      locales: ['en', 'pl', 'de'],
      defaultLocale: 'en'
    }
  }
}
```

::: tip CORS
If you use various domains for your frontend and/or the API, please make sure that the API sends responses incorporating the [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) header. For your local development you can use [proxy-module](https://github.com/nuxt-community/proxy-module)
:::

#### Now it's time for some customisations.
