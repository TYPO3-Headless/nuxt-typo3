<template>
  <div class="t3-ce-image">
    <T3MediaGallery :gallery="props.gallery" />
    <T3CeHeader v-bind="props" />
  </div>
</template>

<script setup lang="ts">
import T3CeHeader from '../T3CeHeader/T3CeHeader.vue'
import type { T3CeGalleryProps } from '../../../module'

const props = defineProps<T3CeGalleryProps>()
</script>
