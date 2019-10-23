<template>
  <div class="ce-image">
    <ce-header v-bind="$props" />
    <media-gallery :gallery="gallery" />
  </div>
</template>
<script>
import baseCe from '../mixins/baseCe'
import MediaGallery from './media/Gallery'
export default {
  name: 'CeImage',
  components: {
    MediaGallery
  },
  extends: baseCe,
  props: {
    gallery: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>
