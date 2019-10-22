<template>
  <div :class="galleryCss" class="ce-gallery">
    <slot name="before" />
    <slot v-if="gallery.position.vertical === 'above'" />
    <div v-if="files.length" class="ce-gallery__container">
      <div
        v-for="(row, rowKey) in gallery.rows"
        :key="rowKey"
        class="ce-gallery__row"
      >
        <div
          v-for="(col, colKey) in row.columns"
          :key="colKey"
          class="ce-gallery__col"
        >
          <media-image
            :image="
              files[
                rowKey * gallery.count.columns -
                  gallery.count.columns +
                  (colKey - 1)
              ]
            "
          />
        </div>
      </div>
    </div>
    <slot v-if="gallery.position.vertical === 'below'" />
    <slot name="after" />
  </div>
</template>
<script>
import MediaImage from './type/Image'
export default {
  name: 'MediaGallery',
  components: {
    MediaImage
  },
  props: {
    gallery: {
      type: Object,
      required: true,
      default: () => {}
    },
    files: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    galleryCss() {
      return [
        `ce-gallery--horizontal-${this.gallery.position.horizontal}`,
        `ce-gallery--vertical-${this.gallery.position.vertical}`,
        { 'ce-gallery--no-wrap': this.gallery.position.noWrap },
        { 'ce-gallery--border': this.gallery.border.enabled }
      ]
    }
  }
}
</script>
