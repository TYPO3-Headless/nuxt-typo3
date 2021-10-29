<template functional>
  <iframe
    v-if="props.file.publicUrl"
    id="ytplayer"
    v-bind="data.attrs"
    :class="[data.class, data.staticClass]"
    :width="props.file.properties.dimensions.width || 640"
    :height="props.file.properties.dimensions.height || 360"
    :src="props.file.publicUrl"
    class="ce-media-video ce-media-youtube"
    type="text/html"
    frameborder="0"
  />
</template>
<script>
export default {
  name: 'MediaYoutube',
  functional: true,
  props: {
    file: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>
