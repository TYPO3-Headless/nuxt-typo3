# Backend layouts

In the backednd layout you can define multiple columns where you want to put your content. Column (colPos from TYPO3 API) is object which contains array of content elements. On the frontend you can define placeholders where you want to show the content from these columns. [Read more about this concept](https://usetypo3.com/backend-layouts.html).

## Create backend layout component

If you would like to create multiple columns backend layout just define your layout and create some Vue component. Your API for selected page should returns 

`...page.appearance`:
``` json{4,5}
{
  ...
  "content": {
    "colPos0": [...Array with content elements],
    "colPos1": [...Array with content elements]
  }
  ...
}
```

If the response is ok, we can create component file. 

create: `components/T3Bl2Columns.vue`:
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

You have to register component layouts to Nuxt application context - this is needed to provide the backend layout for SSR purposes. Just use `registerBackendLayouts` plugin
   
create: `plugins/layouts.js`:

```js
import Vue from 'vue'
import { registerBackendLayouts } from '~typo3/plugins/layouts'
import T3Bl2Columns from '~/components/T3Bl2Columns'
const layouts = {
  T3Bl2Columns
}

export default ({ app }) => {
  Vue.use(registerBackendLayouts, {
    context: app,
    layouts
  })
}
```

The last thing to do is edit Nuxt configuration file

edit `nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/layouts']
}
```

::: tip Be Prefix
Backend layouts are regular Vue components. You have to provide `T3Bl` prefix for name of your backend layout.
::: 
