<template>
  <component :is="getMediaType(file.properties)" :file="file" />
</template>
<script>
import MediaImage from './type/Image'
import MediaYoutube from './type/Youtube'
import MediaVimeo from './type/Vimeo'
import MediaVideo from './type/Video'
import MediaAudio from './type/Audio'
export default {
  name: 'MediaFile',
  components: {
    MediaImage,
    MediaYoutube,
    MediaVimeo,
    MediaVideo,
    MediaAudio
  },
  props: {
    file: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    getMediaType(file) {
      switch (file.type) {
        case 'video': {
          if (file.mimeType.includes('youtube')) {
            return 'media-youtube'
          }
          if (file.mimeType.includes('vimeo')) {
            return 'media-vimeo'
          }
          return 'media-video'
        }
        case 'audio':
          return 'media-audio'
        default:
          return 'media-image'
      }
    }
  }
}
</script>
