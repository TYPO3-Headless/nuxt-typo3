# Error page handling

You can define your own custom error pages. You can do it by creating a `layouts/error.vue`

create `layouts/error.vue`:

```js
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>
```

More information you can read [here](https://nuxtjs.org/docs/2.x/directory-structure/layouts#error-page)

## Display specific content from TYPO3 API.

You can display content from selected page by API. 

1. Chose selected page by "Show content from page" select in [error handling setup](https://docs.typo3.org/m/typo3/reference-coreapi/master/en-us/ApiOverview/SiteHandling/ErrorHandling.html)

<p align="center">
  <img align="center" src="https://docs.typo3.org/m/typo3/reference-coreapi/master/en-us/_images/SiteHandlingErrorHandling-1.png" alt="nuxt-typo3">
</p>

2. Page content from API you can grab by error props. 

edit `layouts.error.vue`:

```vue
<template>
  <div>
    <h1>ERROR PAGE {{ error.statusCode }}</h1>
    <t3-dynamic
      v-if="t3page"
      :data="t3page.content"
      :type="t3page.appearance.backendLayout"
      layout
    />
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    t3page () {
      return this.error?.ssr?.t3page
    }
  }
}
</script>

```
