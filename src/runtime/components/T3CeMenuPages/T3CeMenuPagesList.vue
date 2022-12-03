<script lang="ts" setup>
// helper component to render nested list
import { h } from 'vue'

interface T3CeMenuPagesListProps {
  children: Array<any>
}
const props = defineProps<T3CeMenuPagesListProps>()

const T3CeMenuPagesList = h(
  'ul',
  props.children.map((el) => {
    return h('li', {}, [
      h(
        'NuxtLink',
        {
          to: el.link,
          target: el.target || null,
          title: el.title
        },
        el.title
      ),
      el.children
        ? h('T3CeMenuPagesList', {
          children: el.children
        })
        : false
    ])
  })
)
</script>

<template>
  <T3CeMenuPagesList />
</template>
