<template>
  <NuxtLink
    :to="parsedLink.href"
    :target="parsedLink.target"
    :title="parsedLink.title"
    :class="parsedLink.class"
    v-bind="parsedLink.additionalAttributes"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { T3Link } from '../../../types'

const props = defineProps<{ link: string | T3Link }>()

const parsedLink = computed<T3Link>(() => {
  return typeof props.link === 'string' ? { href: props.link } : props.link
})
</script>
