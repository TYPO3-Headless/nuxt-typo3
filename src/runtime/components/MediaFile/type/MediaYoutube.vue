<template>
  <iframe
    v-if="file.publicUrl"
    id="ytplayer"
    v-bind="$attrs"
    :class="[$attrs.class, $attrs.staticClass]"
    :width="file.properties.dimensions.width || 640"
    :height="file.properties.dimensions.height || 360"
    :src="file.publicUrl"
    class="t3-ce-media-video t3-ce-media-youtube"
    type="text/html"
    frameborder="0"
  />
</template>
<script lang="ts" setup>
import type { T3File } from '../../../../module'
defineProps<{
  file: T3File
}>()
</script>
