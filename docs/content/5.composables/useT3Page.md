# useT3Page

Useful composable to recreate your own page file.

## Type
```ts
const useT3Page: (options?: {
    route?: RouteLocationNormalized
    fetchOnInit?: boolean;
}) => Promise<{
    pageDataFallback: ComputedRef<T3Page | null>;
    pageData: Ref<T3Page | null>;
    getPageData: (path: string) => Promise<{
        data: Ref<T3Page | null>;
        error: Ref<Error | null>;
    }>;
    headData: ComputedRef<ReactiveHead>
    backendLayout: string
    frontendLayout: string | undefined
}>
```
## example
Create your own page layout. 
Create/edit `pages/[...slug].vue`

```vue [pages/[...slug].vue]
<template>
  <T3BackendLayout
    v-if="pageData?.content"
    :name="backendLayout"
    :content="pageData.content"
  />
</template>

<script setup lang="ts">
const { headData, pageData, backendLayout } = await useT3Page()
useHead(headData)
</script>
```

::alert{type="warning"}
Please be aware that `await useT3Page()` is responsible for fetching the current page data. If you use it in multiple places, it may lead to unexpeceted API call. To avoid this, you can either use await `useT3Page({fetchOnInit: false})` to prevent fetching on initialization, or alternatively use [useT3Api()](./useT3Api.md).
::

