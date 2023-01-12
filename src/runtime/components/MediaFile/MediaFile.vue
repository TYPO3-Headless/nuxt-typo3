<script lang="ts" setup>
import { resolveComponent } from 'vue'
import type { T3File } from '../../../types'

defineProps<{
  file: T3File
}>()

function getMediaType (file: T3File) {
  switch (file.properties.type) {
    case 'video': {
      if (file.properties.mimeType.includes('youtube')) {
        return resolveComponent('MediaYoutube')
      }
      if (file.properties.mimeType.includes('vimeo')) {
        return resolveComponent('MediaVimeo')
      }
      return resolveComponent('MediaVideo')
    }
    case 'audio':
      return resolveComponent('MediaAudio')
    default:
      return resolveComponent('MediaImage')
  }
}
</script>

<template>
  <component :is="getMediaType(file)" :file="file" />
</template>
