<template>
  <div class="t3-ce-textpic">
    <T3MediaGallery :gallery="gallery">
      <T3CeHeader v-bind="props" />
      <T3HtmlParser v-if="bodytext" :content="bodytext" />
    </T3MediaGallery>
  </div>
</template>

<script setup lang="ts">
import type { T3CeGallery } from '../../../types'

const props = defineProps<T3CeGallery>()
</script>
<script lang="ts">
export default {
  name: 'T3CeTextpic',
  inheritAttrs: false
}
</script>
