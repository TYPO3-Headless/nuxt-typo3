<template>
  <T3CeTextpic
    v-bind="props"
    class="t3-ce-textmedia"
  />
</template>

<script setup lang="ts">
import type { T3CeGalleryProps } from '../../../module'

const props = defineProps<T3CeGalleryProps>()
</script>
