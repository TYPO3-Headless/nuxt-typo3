<template>
  <div class="t3-ce-textpic">
    <T3CeGallery :gallery="props.gallery">
      <T3CeHeader v-bind="props" />
      <T3HtmlParser :content="props.bodytext" />
    </T3CeGallery>
  </div>
</template>

<script setup lang="ts">
import type { T3CeHeaderProps } from '../T3CeHeader/useT3CeHeader'
import type { T3CeGalleryProp } from '../T3CeGallery/T3CeGallery.types'

interface Props extends T3CeHeaderProps {
  gallery: T3CeGalleryProp
  bodytext: string
}

const props = defineProps<Props>()
</script>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
