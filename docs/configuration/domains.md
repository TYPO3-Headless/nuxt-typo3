# Multiply domains

You are able to setup multiple TYPO3 pages and handle them by one frontend application.

edit `nuxt.config.js`:

```js
{
  ...
  typo3: {
    ...
    domains: [{
        name: 'mywebsite.com', // name of your host
        baseURL: 'https://mywebsite.com',
        api: {
          baseURL: 'https://api.mywebsite.com'
        },
        i18n: {
          locales: [
            'en'
          ],
          defaultLocale: 'en'
        }
      },
      {
        name: 'pl.mywebsite.com', // name of your host
        baseURL: 'https://pl.mywebsite.com',
        api: {
          baseURL: 'https://api.pl.mywebsite.com'
        },
        i18n: {
          locales: [
            'pl', 'en'
          ],
          defaultLocale: 'pl'
        }
      }]
    ...
  }
  ...
}
```

::: tip NGINX Config
Remember to setup nginx configuration for all of your hosts as proxy to your frontend application. [Read more about nginx proxy for nuxt application](https://nuxtjs.org/faq/nginx-proxy/)
:::
