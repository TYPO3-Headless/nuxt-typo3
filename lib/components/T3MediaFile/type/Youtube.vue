<template>
  <iframe
    v-if="file.publicUrl"
    id="ytplayer"
    :width="file.properties.dimensions.width || 640"
    :height="file.properties.dimensions.height || 360"
    :src="file.publicUrl"
    class="t3-ce-media-video t3-ce-media-youtube"
    type="text/html"
    frameborder="0"
  />
</template>
<script>
export default {
  name: 'MediaYoutube',
  props: {
    file: {
      type: Object,
      required: true
    }
  }
}
</script>
