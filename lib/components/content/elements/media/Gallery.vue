<template>
  <div :class="galleryCss" class="ce-gallery">
    <slot name="before" />
    <div v-if="gallery.position.vertical === 'below'" class="ce-gallery__text">
      <slot />
    </div>
    <div v-if="gallery.count.files" class="ce-gallery__container">
      <div
        v-for="(row, rowKey) in gallery.rows"
        :key="rowKey"
        class="ce-gallery__row"
      >
        <component
          :is="enlargeImageOnClick ? 'a' : 'div'"
          v-for="(col, colKey) in row.columns"
          :key="colKey"
          class="ce-gallery__col"
          v-bind="{
            ...(enlargeImageOnClick && {
              target: '_blank',
              href: col.publicUrl
            })
          }"
        >
          <ce-media-file :file="col" />
        </component>
      </div>
    </div>
    <div
      v-if="
        gallery.position.vertical === 'above' ||
          gallery.position.vertical === 'intext'
      "
      class="ce-gallery__text"
    >
      <slot />
    </div>
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
      default: () => ({})
    },
    enlargeImageOnClick: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    galleryCss () {
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
