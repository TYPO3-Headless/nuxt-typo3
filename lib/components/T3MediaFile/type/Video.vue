<template>
  <video
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
<script>
export default {
  name: 'MediaVideo',
  props: {
    file: {
      type: Object,
      required: true
    }
  }
}
</script>
