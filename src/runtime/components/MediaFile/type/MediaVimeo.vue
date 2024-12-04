<template>
  <iframe
    v-bind="$attrs"
    :class="[$attrs.class, $attrs.staticClass]"
    :src="file.publicUrl"
    :width="file.properties.dimensions.width || 640"
    :height="file.properties.dimensions.height || 360"
    :title="file.properties.title!"
    frameborder="0"
    class="t3-ce-media-video t3-ce-media-vimeo"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen
  />
</template>
<script lang="ts" setup>
import type { T3File } from '../../../../module'
defineProps<{
  file: T3File
}>()
</script>
