<template>
  <iframe
    :src="file.publicUrl"
    :width="file.properties.dimensions.width || 640"
    :height="file.properties.dimensions.height || 360"
    :title="file.properties.title || false"
    frameborder="0"
    class="t3-ce-media-video t3-ce-media-vimeo"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen
  />
</template>
<script>
export default {
  name: 'MediaVimeo',
  props: {
    file: {
      type: Object,
      required: true
    }
  }
}
</script>
