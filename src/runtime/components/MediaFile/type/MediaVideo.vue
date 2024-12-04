<template>
  <video
    v-if="file.publicUrl"
    v-bind="$attrs"
    :class="[$attrs.class, $attrs.staticClass]"
    class="t3-ce-media-video"
    controls
  >
    <source
      :src="file.publicUrl"
      :height="file.properties.dimensions.height"
      :width="file.properties.dimensions.width"
      :type="file.properties.mimeType"
    >
  </video>
</template>
<script lang="ts" setup>
import type { T3File } from '../../../../module'
defineProps<{
  file: T3File
}>()
</script>
