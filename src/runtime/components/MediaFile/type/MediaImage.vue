<template>
  <div
    v-bind="$attrs"
    :class="[$attrs.class, $attrs.staticClass]"
    class="t3-ce-media-image"
  >
    <component
      :is="wrapperComponent"
      :link="file.properties.linkData"
    >
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
import { computed, resolveComponent } from 'vue'
import type { T3File } from '../../../../types'
import { useMediaFile } from '../useMediaFile'

const props = defineProps<{
  file: T3File
}>()

const { hasLink } = useMediaFile(props.file)
const wrapperComponent = computed(() => hasLink.value ? resolveComponent('T3Link') : 'div')
</script>
