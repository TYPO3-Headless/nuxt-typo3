# Content elements

## Base content element

📍 Each content element contain base and common props.

📍 Each content element has `Ce` prefix ( We would like to avoid conflicts with other libraries or with your UI components )


Base props are used by [render components](lib/templates/components/content/CeDynamic.js): 

```js
 props: {
    ...{
      id: this.data.uid,
      type: this.data.type,
      appearance: this.data.appearance
    },
    ...this.data.content
 }
```

📍 ```this.data.content``` contains all custom props shipped by API

📍 Common props are related mainly with header, check [shareProps](lib/templates/components/mixins/../content/mixins/shareProps.js)

## Create own content element 

1. Create component, you can use [base content element](lib/templates/components/content/mixins/baseCe.js) mixin to inherit all common props. 

`CeText.vue`:

```html
<template>
  <div>
    <strong> Hello {{ header }} </strong>
  </div>
</template>
<script>
import baseCe from '~typo3/components/content/elements/baseCe'
export default {
  name: 'CeText',
  extends: baseCe
}
</script>
```

2. Register your content elements as [plugin for Nuxt](https://nuxtjs.org/guide/plugins/). Create `components.js` in `/plugins/` directory   

`components.js`:
   
```js
import Vue from 'vue'
import CeText from '~/components/content/elements/CeText'

const components = {
  CeText
}

export default ({ app }) => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
```

3. Setup nuxt configuration

```js
export default {
  plugins: ['~/plugins/components']
}
```


To render this content element your API should returns content element with type `text`
