# nuxt-typo3

### EAP
Please be aware, the `@t3headless/nuxt-typo3` is available as Early Access Program.
Please contact us to get the access.
# Setup

Learn how to setup nuxt-typo3 module in your Nuxt 3 application.

---
Check out the [Nuxt 3 documentation](https://nuxt.com/docs/guide/concepts/modules)  for more information about installing and using modules.

## Instalation

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





## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
