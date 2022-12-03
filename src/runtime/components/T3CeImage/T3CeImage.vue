<template>
  <div class="t3-ce-image">
    <T3CeGallery :gallery="props.gallery" />
    <T3CeHeader v-bind="props" />
  </div>
</template>

<script setup lang="ts">
import T3CeHeader from '../T3CeHeader/T3CeHeader.vue'
import type { T3CeHeaderProps } from '../T3CeHeader/useT3CeHeader'
import type { T3CeGalleryProp } from '../T3CeGallery/T3CeGallery.types'

interface Props extends T3CeHeaderProps {
  gallery: T3CeGalleryProp
}

const props = withDefaults(defineProps<Props>(), {
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
  subheader: '',
  gallery: null
})
</script>
