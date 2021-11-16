# Backend layouts

In the backednd layout you can define multiple columns where you want to put your content. Column (colPos from TYPO3 API) is object which contains array of content elements. On the frontend you can define placeholders where you want to show the content from these columns. [Read more about this concept](https://usetypo3.com/backend-layouts.html).

## Create backend layout component

If you would like to create multiple columns backend layout just define your layout and create some Vue component. Your API for selected page should returns 

`(partial) page response`:
``` json{4,5}
{
  ...
  "content": {
    "colPos0": [...Array with content elements],
    "colPos1": [...Array with content elements]
  },
  "appearance": {
    "layout": "layout-0",
    "backendLayout": "2Columns"
  },
  ...
}
```

We can see two objects - content and appearance with backendLayout property.

If the response is ok, we will receive 2 objects - content and appearance. The name of the backend layout is stored in the appearance object as backendLayout property, so we should create a layout file named after data provided by API.
To render content from selected colPos you can use T3Renderer.

create: `components/Bl2Columns.vue`:
```html
<template>
  <div>
    <strong>2 columns backend layout</strong>
    <main>
      <t3-renderer :content="content.colPos0" />
    </main>
    <aside>
      <t3-renderer :content="content.colPos1" />
    </aside>
  </div>
</template>
<script>
import T3BlDefault from '~typo3/components/T3BlDefault/T3BlDefault.vue'
export default {
  extends: T3BlDefault
}
</script>
```


## Register backend layouts

You have to register backend layout as a regular global Vue component. 

edit/create: `plugins/components.js`:

```js
import Vue from 'vue'
import Bl2Columns from '~/components/Bl2Columns'
Vue.component('T3Bl2Columns', Bl2Columns)
```

The last thing to do (if you haven't done it before) is edit Nuxt configuration file

edit `nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/components']
}
```

::: tip Be Prefix
Backend layouts are regular Vue components. You have to provide `T3Bl` prefix for name of your backend layout.
::: 
