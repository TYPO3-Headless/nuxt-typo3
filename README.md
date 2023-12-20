<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://t3headless.macopedia.io/nuxt-typo3/logo-dark.svg">
    <img alt="T3H Logo'" src="https://t3headless.macopedia.io/nuxt-typo3/logo-light.svg" width="500">
  </picture>
</p>

# nuxt-typo3

TYPO3 Headless Frontend Rendering module based on Nuxt and Vue.js

- ✨ [Release Notes](https://github.com/TYPO3-Headless/nuxt-typo3/releases)

- 📖 [Documentation](https://t3headless.macopedia.io/nuxt-typo3)

## Features

+ 🌐 Handling of dynamic API Routes provided by Headless EXT
+ 🖼️ Frontend and backend layouts
+ 🧩 Support for most standard TYPO3 Content Elements
+ ✨ Easily customizable
+ 🌍 Multilanguage support
+ 📈 SEO Support
+ 🚀 Server Side ready

## Setup

Learn how to setup nuxt-typo3 module in your Nuxt 3 application.

You can also use the playground on [StackBlitz](https://stackblitz.com/edit/nuxt-starter-fpc2gq?file=app.vue)

## Kickstart nuxt-typo3 project

You can use the `nuxi init` command to initialize a fresh Nuxt project with the required nuxt-typo3 setup. Learn more about [nuxi](https://nuxt.com/docs/api/commands/init)

```bash [npx]
npx nuxi@latest init -t gh:TYPO3-Headless/nuxt-typo3-starter <project-name>
```

## Instalation nuxt-typo3 module

Add `@t3headless/nuxt-typo3` dev dependency to your project:

```bash [yarn]
yarn add --dev @t3headless/nuxt-typo3
```

```bash [npm]
npm install @t3headless/nuxt-typo3 --save-dev
```

Then, add `@t3headless/nuxt-typo3` to the [`modules`](https://nuxt.com/docs/guide/concepts/modules) section of your Nuxt configuration:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@t3headless/nuxt-typo3'],
  typo3: {
    api: {
      baseUrl: 'https://api.t3pwa.com'
    }
  }
})
```

---

Check out the [Nuxt 3 documentation](https://nuxt.com/docs/guide/concepts/modules) for more information about installing and using modules.

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
