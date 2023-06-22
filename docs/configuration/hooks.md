# Hooks
You can use hooks to extend default behavior or override data. 

## Available hooks

### Before context is setup by router middleware

```js
$nuxt.$typo3.hook('context', (context, response) => {})
```

### Before redirect in router middleware 
```js
$nuxt.$typo3.hook('redirect', (context, redirectData) => {})
```

### Before locale change
```js
$nuxt.$typo3.hook('beforeLocaleChange', (newLocale, oldLocale) => {})
```

### On locale change
```js
$nuxt.$typo3.hook('localeChange', (newLocale, oldLocale) => {})
```

### Before initialData is setup in the store
```js
$nuxt.$typo3.hook('initialData', (response) => {})
```

### After initial typo3 fetch on SSR
```js
$nuxt.$typo3.hook('ssr:headers', (headers) => {})
```
