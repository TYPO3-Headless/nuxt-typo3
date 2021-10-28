<template functional>
  <iframe
    v-bind="data.attrs"
    :class="[data.class, data.staticClass]"
    :src="props.file.publicUrl"
    :width="props.file.properties.dimensions.width || 640"
    :height="props.file.properties.dimensions.height || 360"
    :title="props.file.properties.title || false"
    frameborder="0"
    class="ce-media-video ce-media-vimeo"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen
  />
</template>
<script>
export default {
  name: 'MediaVimeo',
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
