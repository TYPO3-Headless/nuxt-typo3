# Content elements

## Base content element

📍 Each content element contain base and common props.

📍 Each content element has `Ce` prefix


::: tip Be aware of
To avoids conflicts with other UI libraries or your design system we use `T3` prefix for all components. 
For instance new content elements should be named `T3CeMycontentelement`. 


We use `T3` prefix because some of our global components are not ContentElement e.g. `T3NavLink`


You don't have name your content elements component file this way, but this is imporant when you register them as global (look below).
:::

Base props are used by [render components](https://github.com/TYPO3-Initiatives/nuxt-typo3/tree/master/lib/components/T3Dynamic/T3Dynamic.js.js): 

```js
 props: {
    ...{
      id: this.data.id,
      type: this.data.type,
      appearance: this.data.appearance,
      index: this.index
    },
    ...this.data.content
 }
```

📍 ```this.data.content``` contains all custom props shipped by API

📍 Common props are related mainly with header, check [shareProps](https://github.com/TYPO3-Initiatives/nuxt-typo3/tree/master/lib/mixins/component/shareProps.js)

## Create own content element 

We will create new custom ContentElement in our frontend application. 

::: tip Be aware 
We assume our API deliver new content element - with type "keyvisual".
```json
{
  "id": 251,
  "type": "keyvisual",
  "appearance": {
    "layout": "default",
    "frameClass": "default",
    "spaceBefore": "",
    "spaceAfter": ""
  },
  "index": 3,
  "header": "Apple pie",
  "lead": "Don't you just love a lazy Sunday afternoon with a nice piece of pie and a freshly-brewed cup of coffee?\nThis apple pie recipe is simple and so good."
}
```
:::

1. to create new content element, you can use [base content element](https://github.com/TYPO3-Initiatives/nuxt-typo3/tree/master/lib/mixins/component/baseCe.js) mixin to inherit all common props. 

`components/CeKeyvisual.vue`:

```html
<template>
  <div>
    <strong> Hello {{ header }} and {{ lead }} </strong>
  </div>
</template>
<script>
import baseCe from '~typo3/mixins/component/baseCe.js'
export default {
  name: 'CeKeyvisual',
  extends: baseCe, // here is defined header prop
  props: {
    // lead should be delivered by API
    lead: {
      type: String,
      required: true
    }
  }
}
</script>
```

2. Register your content elements as global component by [plugin for Nuxt](https://nuxtjs.org/guide/plugins/). Create `components.js` in `/plugins/` directory   

`components.js`:
   
```js
import Vue from 'vue'
import CeKeyvisual from '~/components/CeKeyvisual'

Vue.component('T3CeKeyvisual', CeKeyVisual)
const components = {
  T3CeKeyvisual
}
```

3. Setup nuxt configuration

```js
export default {
  plugins: ['~/plugins/components']
}
```

