<template>
  <div class="ce-textpic">
    <media-gallery :gallery="image.gallery" :files="image.images">
      <ce-header v-bind="$props" />
      <html-parser :content="bodytext" />
    </media-gallery>
  </div>
</template>
<script>
import baseCe from '../mixins/baseCe'
import MediaGallery from './media/Gallery'
export default {
  name: 'CeTextpic',
  components: {
    MediaGallery
  },
  extends: baseCe,
  props: {
    image: {
      type: Object,
      required: true,
      default: () => {}
    },
    bodytext: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>
