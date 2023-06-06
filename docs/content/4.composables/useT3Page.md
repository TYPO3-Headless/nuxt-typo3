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
    T3BackendLayout: ComputedRef<DefineComponent<T3BackendLayout>>
}>
```
## example
Create your own page layout. 
Create/edit `pages/[...slug].vue`

```vue [pages/[...slug].vue]
<template>
  <T3BackendLayout :content="pageData.content" />
</template>

<script setup lang="ts">
const { headData, pageData, T3BackendLayout } = useT3Page()
useHead(headData)
</script>
```
