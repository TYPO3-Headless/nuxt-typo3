# 3. Customization

Now we can modify some layouts and play with content elements. 

## 1. Add navigation

To do this we should modify default [layout](/frontend/layouts), because layout is the wrapper of page content. You can define different frontend layouts, for example if you want to create page without the header. 

Just edit `layouts/default.vue`


```html
<template>
  <div class="container">
    <header>
      <nuxt-link :to="navMain.link">
        {{ navMain.title }}
      </nuxt-link>
      <template v-if="navMain.children">
        <nuxt-link
          v-for="(item, key) in navMain.children"
          :key="key"
          :to="item.link"
        >
          {{ item.title }}
        </nuxt-link>
      </template>
    </header>
    <nuxt />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      navMain: state => state.typo3.initial.navigation[0] || [] // get first instance from root
    })
  }
}
</script>
```

What we did here is just mapping some state from store and initialData. We get first instance from root tree. 

## 2. Play with content elements

`nuxt-typo3` provides core content elements with the basic logic and markup by default. One thing you have to make it nicer is add some styles, but you can also override HTML markup or JS logic.

### 2.1 Create own text content element
**Just add some styles.**

create `components/content/elements/CeText.vue`: 

```html
<script src="~typo3/components/content/elements/CeText.vue"/>
<style>
.ce-text {
  background: green;
}
</style>
```

We just imported component logic with markup and added some styles. 

**Now  we can override markup:**

edit `components/content/elements/CeText.vue`: 
```html
<template>
  <div class="ce-text">
    <strong> My custom text element </strong>
    {{ bodytext }}
  </div>
</template>
<script src="~typo3/components/content/elements/CeText.vue"/>
<style>
.ce-text {
  background: green;
}
</style>
```

::: tip Parse HTML content
Rembember that HTML content shipped by RTE should be parsed. Use `<html-parser>` component for it.
:::

**Override component logic**

edit `components/content/elements/CeText.vue`: 

```html
<template>
  <div class="ce-text">
    <strong> My custom text element </strong>
    <html-parser :content="bodytext" />
  </div>
</template>
<script>
import CeText from '~typo3/components/content/elements/CeText'
export default {
  extends: CeText,
  mounted () {
    console.log('my custom text element mounted')
  }
}
</script>
<style>
.ce-text {
  background: green;
}
</style>

```
### 2.2 Register your component

To override components registered in nuxt-typo3, they should be register as global. Thing to do is add them to main instance of Nuxt application as a plugin. [Read more](https://nuxtjs.org/guide/plugins/)

create `plugins/components.js`:
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

edit `nuxt.config.js`

```js
export default {
  plugins: ['~/plugins/components']
}
```
