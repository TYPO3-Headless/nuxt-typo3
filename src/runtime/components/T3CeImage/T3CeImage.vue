<template>
  <div class="t3-ce-image">
    <T3MediaGallery :gallery="props.gallery" />
    <T3CeHeader v-bind="props" />
  </div>
</template>

<script setup lang="ts">
import T3CeHeader from '../T3CeHeader/T3CeHeader.vue'
import type { T3CeGalleryProps } from '../../../types'

const props = withDefaults(defineProps<T3CeGalleryProps>(), {
  header: '',
  headerLayout: 0,
  headerPosition: '',
  headerLink: () => ({
    additionalAttributes: [],
    class: '',
    href: '',
    linkText: '',
    target: '',
    title: ''
  }),
  subheader: ''
})
</script>
