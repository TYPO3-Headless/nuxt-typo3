# useT3Page

Useful composable to recreate your own page file.


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
