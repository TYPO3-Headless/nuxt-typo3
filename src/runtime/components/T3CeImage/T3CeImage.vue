<template>
  <div class="t3-ce-image">
    <T3MediaGallery :gallery="props.gallery" />
    <T3CeHeader v-bind="props" />
  </div>
</template>

<script setup lang="ts">
import T3CeHeader from '../T3CeHeader/T3CeHeader.vue'
import type { T3CeGallery } from '../../../types'

const props = withDefaults(defineProps<T3CeGallery>(), {
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
