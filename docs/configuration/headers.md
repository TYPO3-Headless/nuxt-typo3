# Forwarding headers

You can enable forwarding headers on SSR response. This might be especially useful when implementing cookie-based authentication tokens or caching directives.

This feature is disabled by default.

::: warning Be aware
Headers forwarded using this method **will overwrite** existing headers with the same name.
:::

edit `nuxt.config.js`:

```js
{
  ...
  typo3: {
    headers: true,
  },
  ...
}
```

::: tip Header allowlist
Setting this option to `true` sets up forwarding for all headers sent by Typo3. This might lead to unexpected behaviour, as some headers are probably not desirable on your front-end application (e.g. *Content-Type*)
:::

In order to gain more control over headers, you can simply set this option to an array of header names you want to forward.

```js
{
  ...
  typo3: {
    headers: ['set-cookie'], // case-insensitive
  },
  ...
}
```

## Manual header passthrough

As the built-in `headers` option leads to overwriting existing headers, you might instead consider implementing your own plugin to forward headers to fine-tune the behaviour of certain headers.

To achieve this, make sure the `headers` option is set to false and create a new script in `plugins` folder, e.g. `~/plugins/headers.js`:

```js
export default function({ $typo3, res }) {
  if (!process.server) return

  $typo3.hook('ssr:headers', (headers) => {
    const cookies = headers['set-cookie'] ?? []

    res.setHeader(
      'set-cookie',
      cookies.filter((cookie) => !cookie.includes('BadCookie'))
    )
  })
}
```

In the example above, only `set-cookie` header is forwarded, stripped from cookies containing string `BadCookie`.

In order to get plugin to work, you should register it inside `nuxt.config.js`:

```js
{
  ...
  plugins: ['~/plugins/headers.js'],
  ...
}
```
