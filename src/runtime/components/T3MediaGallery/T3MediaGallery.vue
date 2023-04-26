<script lang="ts" setup>
import { resolveComponent } from 'vue'
import type { T3Gallery } from '../../../types'
import { useT3MediaGallery } from './useT3MediaGallery'

const props = defineProps<{
  gallery: T3Gallery
}>()

const { galleryClassList } = useT3MediaGallery(props.gallery)
</script>

<template>
  <div :class="galleryClassList" class="t3-ce-gallery">
    <slot name="before" />
    <div
      v-if="gallery.position.vertical === 'below'"
      class="t3-ce-gallery__text"
    >
      <slot />
    </div>
    <div v-if="gallery.count.files" class="t3-ce-gallery__container">
      <div
        v-for="(row, rowKey) in gallery.rows"
        :key="`${rowKey}-r`"
        class="t3-ce-gallery__row"
      >
        <div
          v-for="(col, colKey) in row.columns"
          :key="`${colKey}-c`"
          class="t3-ce-gallery__col"
        >
          <component :is="resolveComponent('MediaFile')" :file="col" />
        </div>
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
