<script lang="ts" setup>
import { resolveComponent } from 'vue'
defineProps<{
  file: {
    type: Object
    required: true
  }
}>()

function getMediaType (file) {
  switch (file.type) {
    case 'video': {
      if (file.mimeType.includes('youtube')) {
        return resolveComponent('MediaYoutube')
      }
      if (file.mimeType.includes('vimeo')) {
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
  <component :is="getMediaType(file.properties)" :file="file" />
</template>
