<template>
  <div
    v-bind="$attrs"
    :class="[$attrs.class, $attrs.staticClass]"
    class="t3-ce-media-image"
  >
    <component :is="isNuxtLink" :to="file.properties.link">
      <figure>
        <img
          :src="file.publicUrl"
          :height="file.properties.dimensions.height"
          :width="file.properties.dimensions.width"
          :alt="file.properties.alternative || false"
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
const props = defineProps<{
  file: {
    type: Object
    required: true
  }
}>()

const isNuxtLink = computed(() => {
  return props.file?.properties?.link ? 'nuxt-link' : 'div'
})
</script>
