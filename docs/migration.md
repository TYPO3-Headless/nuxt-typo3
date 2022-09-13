# Migration from 0.9.x to 1.0.0

We reactored some part of frontend app due to changes of Headless extension v3.x and change requests from community.

During migration you may encounter following errors:
### Errors with component imports:
All `nuxt-typo3` components have `T3` Prefix. Content elements have `T3Ce`

```jsx
These dependencies were not found:                                                                                                                       friendly-errors 15:22:42
                                                                                                                                                         friendly-errors 15:22:42
* ~typo3/components/content/elements/CeImage in ../node_modules/babel-loader/lib??ref--2-0!../node_modules/vue-loader/lib??vue-loader-options!./components/Component.vue?vue&type=script&lang=js&
```

replace 

```jsx
import CeImage from '~typo3/components/content/elements/CeImage'
```

to

```jsx
import T3CeImage from '~typo3/components/T3CeImage'
```

Component name doesn't have underscore, please use camelCase 

### pages/_.vue

Component responsible for backend layout rendering use `T3Dynamic` (for dynamic content elements and backend layouts)

replace

```html
<be-dynamic
      :page="page.page"
      :content="page.content"
      :type="backendLayout"
    />
```

with

```html
<t3-dynamic
      :data="t3page.content"
      :type="t3page.appearance.backendLayout"
      layout
    />
```

### layouts/backend/BeDefault.vue:

replace

```jsx
<ce-renderer :content="content.colPos0" />
```

with

```jsx
<t3-renderer :content="content.colPos0" />
```

### AsyncData

With 0.9.x version you could receive `page` object from asyncData, now it use `t3` prefix - `t3page`


### Store

Vuex store are namespaced now 

replace
```js
store.dispatch('getInitialData')
```

with

```js
store.dispatch('typo3/getInitialData')
```

If you have found another issue please create an issue on github
