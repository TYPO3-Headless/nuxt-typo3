# 2. Bootstrap frontend application

Let start with the frontend. In that phase we will provide frontend application based on Nuxt.js. 

## 1. Nuxt.js installation

The easiest way to start is just use the [CLI](https://github.com/TYPO3-Initiatives/create-nuxt-typo3) which we provided. 

### Scaffold project 

Run in the console and follow with the instruction.

```bash
$ yarn create nuxt-typo3 <project-name>
```

it will ask you some questions:

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
6. **Choose between integrated server-side frameworks**
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

::: warning Be aware
Be aware of the last step where you should select Universal as Nuxt mode if you want support server side rendering.  
:::


## 2. Is it works?

After scaffolind you should be able to run your application:

```bash
$ cd <project-name>
$ yarn run dev
```

By default it works on [http://localhost:3000](http://localhost:3000)

## 3. Provide configuration
 
 CLI preconfigured some settings for you, but you can check it and reconfigure your module acording to [Configuration](/configuration)
 
```js {
{
  modules: [
    'nuxt-typo3', // register module 
  ],

  typo3: {
    baseURL: 'https://yourwebsite.com', // provide your front app domain
    api: {
      baseURL: 'https://api.yourwebsite.com' // provide API address
    },
    i18n: {
      locales: ['en', 'pl', 'de'],
      defaultLocale: 'en'
    }
  }
}
```

::: tip CORS
If you use various domain for your frontend and API - please make sure that API sends responses with [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) header. For your local development you can use [proxy-module](https://github.com/nuxt-community/proxy-module)
:::

#### Now it's time to some customize. 
