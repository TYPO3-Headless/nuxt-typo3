# 3. Customization

Now we can modify the layout and play with content elements.

## 1. Add navigation

To add a navigation we can modify the default [layout](/frontend/layouts), because a `layout` wraps page content. You can define different frontend layouts, e.g. if you want to provide a page layout that does not integrate a `header` block.

Just edit `layouts/default.vue`:

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
      navMain: state => state.typo3.initial.navigation[0] || [] // get first level from the root page tree
    })
  }
}
</script>
```

Here we fetch the initial navigation data using the integrated (Vuex) `store` module and map it to the computed property `navMain`. That way we have access to all the pages, including their children, of the page tree defined in the TYPO3 backend. Now `navMain` holds data that is structured like this:

```js
navMain = {
  "active": 1,
  "children": {...},
  "current": 1,
  "link": "/",
  "spacer": 0,
  "target": "",
  "title": "[e.g.: 'API Root Page']"
}
```

::: tip
The call to the `store` is actually done in the `nuxt-typo3` plugin. If you want to learn more about how the `store` works, have a look at the [nuxt-typo3](https://github.com/mercs600/nuxt-typo3-skin) plugin, specifically at its store folder.
:::

## 2. Play with content elements

`nuxt-typo3` provides core content elements with the basic logic and markup by default. One thing you have to do to make it nicer is to add some styles. But you can also override the HTML markup and / or the Javascript logic. To do so, follow these steps:

### 2.1 Create own `CeText` component

**Just add / override some CSS styles.**

If you just want to override existing or add new CSS styles (and not change any Javascript), simply create a component of the same name in the same folder structure, e.g. `components/content/elements/CeText.vue`. Then import the original component from the `nuxt-typo3` module using the `script` tag's `src` parameter:

```html
<script src="~typo3/components/content/elements/CeText.vue" />
```

Next, add some CSS and override the markup so that the component looks like this:

```html
<template>
  <div class="ce-text">
    <strong> My custom text element </strong>
    <html-parser :content="bodytext" />
  </div>
</template>
<script src="~typo3/components/content/elements/CeText.vue" />
<style>
.ce-text {
  background: green;
}
</style>
```

The important part to remember here is that the original component can be imported via a `script` tag's `src` parameter. If you intend to override Javascript, though, you have to choose a different method – see below.

::: tip Parse HTML content
Rembember that HTML content shipped by RTE should be parsed. To do so, use the `<html-parser>` component.
:::

**Override component logic**

If you want to change the Javascript of the original component, then you first have to setup the component as explained in #2.1. However, now the origianl component is imported via the `import` statement. That way we can employ the `extends` method on `export default {}` and add or override Javascript:

```html
<template>  <div class="ce-text">
    <strong> My custom text element </strong>
    <html-parser :content="bodytext" />
  </div>
</template>

<script>
import CeText from '~typo3/components/content/elements/CeText'
export default {
  extends: CeText,
  mounted () {
    console.log('My custom text element has benn mounted.')
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

Eventually, to override existing `nuxt-typo3` components with your own ones, your components must be registered globally. This is done by adding them as a plugin to the main instance of your Nuxt application. [Read more about plugins](https://nuxtjs.org/guide/plugins/). This involves 2 steps:

1. Create `plugins/components.js`:

```js
import Vue from 'vue'
import CeText from '~/components/content/elements/CeText'
const components = {
  CeText
}
export default ({ app }) => {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}
```

2. Edit your `nuxt.config.js`

```js
export default {
  plugins: ['~/plugins/components']
}
```
