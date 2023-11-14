<script lang="ts" setup>
// helper component to render nested list
import { h, resolveComponent } from 'vue'

interface T3CeMenuPagesListProps {
  children: Array<any>;
}

const props = withDefaults(defineProps<T3CeMenuPagesListProps>(), {
  children: () => []
})

const renderItems = () => {
  return props.children.map((el) => {
    return h('li', {}, [
      h(
        resolveComponent('NuxtLink'),
        {
          to: el.link,
          target: el.target || null,
          title: el.title
        },
        () => [el.title]
      ),
      el.children
        ? h(resolveComponent('T3CeMenuPagesList'), { children: el.children })
        : null
    ])
  })
}
const T3CeMenuPagesList = () => {
  return h(
    'ul',
    {},
    {
      default: () => renderItems()
    }
  )
}
</script>

<template>
  <T3CeMenuPagesList />
</template>
