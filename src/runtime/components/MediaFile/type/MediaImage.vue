<template>
  <div
    v-bind="$attrs"
    :class="[$attrs.class, $attrs.staticClass]"
    class="t3-ce-media-image"
  >
    <component :is="isNuxtLink" :to="file.properties.link">
      <figure>
        <img
          v-if="file.publicUrl"
          :src="file.publicUrl"
          :height="file.properties.dimensions.height"
          :width="file.properties.dimensions.width"
          :alt="file.properties.alternative!"
          :title="file.properties.title || ''"
        >
        <figcaption v-if="file.properties.description">
          {{ file.properties.description }}
        </figcaption>
      </figure>
    </component>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { T3File } from '../../../../types'
const props = defineProps<{
  file: T3File
}>()

const isNuxtLink = computed(() => {
  return props.file?.properties?.link ? 'nuxt-link' : 'div'
})
</script>
