<template>
  <div :class="galleryCss" class="ce-gallery">
    <slot name="before" />
    <slot v-if="gallery.position.vertical === 'below'" />
    <div v-if="gallery.count.files" class="ce-gallery__container">
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
          <ce-media-file :file="col" />
        </div>
      </div>
    </div>
    <slot v-if="gallery.position.vertical === 'above'" />
    <slot name="after" />
  </div>
</template>
<script>
export default {
  name: 'MediaGallery',
  props: {
    gallery: {
      type: Object,
      required: true,
      default: () => {}
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
