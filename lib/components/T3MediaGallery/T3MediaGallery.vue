<template>
  <div :class="galleryClass" class="t3-ce-gallery">
    <slot name="before" />
    <div v-if="gallery.position.vertical === 'below'" class="t3-ce-gallery__text">
      <slot />
    </div>
    <div v-if="gallery.count.files" class="t3-ce-gallery__container">
      <div
        v-for="(row, rowKey) in gallery.rows"
        :key="rowKey"
        class="t3-ce-gallery__row"
      >
        <component
          :is="enlargeImageOnClick ? 'a' : 'div'"
          v-for="(col, colKey) in row.columns"
          :key="colKey"
          class="t3-ce-gallery__col"
          v-bind="{
            ...(enlargeImageOnClick && {
              target: '_blank',
              href: col.publicUrl
            })
          }"
        >
          <t3-media-file :file="col" />
        </component>
      </div>
    </div>
    <div
      v-if="
        gallery.position.vertical === 'above' ||
          gallery.position.vertical === 'intext'
      "
      class="t3-ce-gallery__text"
    >
      <slot />
    </div>
    <slot name="after" />
  </div>
</template>
<script>
export default {
  name: 'T3MediaGallery',
  props: {
    gallery: {
      type: Object,
      required: true
    },
    enlargeImageOnClick: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    galleryClass () {
      return [
        `t3-ce-gallery--horizontal-${this.gallery.position.horizontal}`,
        `t3-ce-gallery--vertical-${this.gallery.position.vertical}`,
        { 't3-ce-gallery--no-wrap': this.gallery.position.noWrap },
        { 't3-ce-gallery--border': this.gallery.border.enabled }
      ]
    }
  }
}
</script>
