<template>
  <video
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
defineProps<{
  file: {
    type: Object
    required: true
  }
}>()
</script>
