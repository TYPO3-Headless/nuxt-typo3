<template>
  <div class="t3-ce-textpic">
    <t3-media-gallery :gallery="gallery" :enlarge-image-on-click="enlargeImageOnClick">
      <t3-ce-header v-bind="$props" />
      <t3-html-parser :content="bodytext" />
    </t3-media-gallery>
  </div>
</template>
<script>
import baseCe from '../../mixins/component/baseCe'
import T3MediaGallery from '../T3MediaGallery/T3MediaGallery.vue'
export default {
  name: 'T3CeTextpic',
  components: {
    T3MediaGallery
  },
  extends: baseCe,
  props: {
    gallery: {
      type: Object,
      required: true
    },
    bodytext: {
      type: String,
      required: true
    },
    enlargeImageOnClick: {
      type: Boolean,
      default: false
    }
  }
}
</script>
