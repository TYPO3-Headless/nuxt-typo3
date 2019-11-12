# Layouts
Layout is the main structure of your page. It's usually includes header navigation, footer and placeholder for your content . By default we use `layouts/default.vue`. This is standard feature of Nuxt.js. We only get selected layout information for page from API and provide it for asyncData.

Example of simple layout:
```html
 <template>
  <header/>
  <main>
    <nuxt/>
  </main>
  <footer/>
</template>
```

::: tip Be aware
Rembember about `<nuxt/>` component. This is placeholder for content of your pages.
:::

## Define your frontend layout

Frontend layout you can set in appearance tab on the page settings level (TYPO3 Backend panel). Then for your current page API should returns layout information - for example: 

`...page.appearance`:
``` json{4}
{
  ...
  "appearance": {
    "layout": "layout-2",
    "backendLayout": "default",
    "backendLayoutNextLevel": "",
    "newUntil": 0
  }
  ...
}
```

As you can see the name of layout is not descriptive too much. TYPO3 returns here only integer values. We added some prefix to avoid weird file name of Vue layout file. We provided also optional support to map them on some more regular file names. 

### Create layout

Thing to do is just create layout file. In case when your API returns `layout-2` then you have to create `layout-2.vue`. 

create `layouts/layout-2.vue`

```html
<template>
  <div>
    <h1> My custom layout </h1>
    <nuxt />
  </div>
</template>
```

Just it. Now your page should be render with new frontend layout.

## Map layout file names

If you don't like weird file names, you can provide some mapping as option to nuxt-typo3 module. 

For example if your catalog page has a different layout, you can create `layouts/catalog.vue` and add some mappings.

edit ```nuxt.config.js```:
```js{5}
{
  ...
  typo3: {
    layouts: {
      'layout-1': 'catalog'
    }
  }
  ...
}
```
