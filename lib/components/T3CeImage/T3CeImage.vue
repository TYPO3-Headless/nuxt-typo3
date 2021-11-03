<template>
  <div class="t3-ce-image">
    <t3-ce-header v-bind="$props" />
    <t3-media-gallery :gallery="gallery" :enlarge-image-on-click="enlargeImageOnClick" />
  </div>
</template>
<script>
import baseCe from '../../mixins/component/baseCe'
import T3MediaGallery from '../T3MediaGallery/T3MediaGallery.vue'
export default {
  name: 'T3CeImage',
  components: {
    T3MediaGallery
  },
  extends: baseCe,
  props: {
    gallery: {
      type: Object,
      required: true
    },
    enlargeImageOnClick: {
      type: Boolean,
      default: false
    }
  }
}
</script>
