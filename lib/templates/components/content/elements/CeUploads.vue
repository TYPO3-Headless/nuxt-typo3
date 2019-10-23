<template>
  <div class="ce-uploads">
    <ce-header v-bind="$props" />
    <ul v-if="media">
      <li v-for="(file, key) in media" :key="key">
        <nav-link :to="file.publicUrl" :target="target">
          <span v-if="displayInformation === 1" class="ce-uploads__icon">
            <img
              :src="getExtensionImg(file.properties.extension)"
              @error="onError"
            />
          </span>
          <span
            v-if="displayInformation === 2 && file.properties.type === 'image'"
            class="ce-uploads__thumb"
          >
            <ce-media-file :file="file" />
          </span>
          <span class="ce-uploads__name">
            {{ file.properties.title || file.publicUrl }}
          </span>
          <span v-if="displayFileSizeInformation" class="ce-uploads__size">
            {{ file.properties.size }}
          </span>
        </nav-link>
        <p
          v-if="displayDescription && file.properties.description"
          class="ce-uploads__desc"
        >
          {{ file.properties.description }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import baseCe from '../mixins/baseCe'
import UrlMixins from '~typo3/mixins/utils/urls'
export default {
  name: 'CeUploads',
  extends: baseCe,
  mixins: [UrlMixins],
  props: {
    media: {
      type: Array,
      required: true,
      default: () => []
    },
    displayDescription: {
      type: Number,
      required: false,
      default: 0
    },
    displayFileSizeInformation: {
      type: Number,
      required: false,
      default: 0
    },
    displayInformation: {
      type: Number,
      required: false,
      default: 0
    },
    target: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    getExtensionImg(extension) {
      return this.getApiBaseUrl(
        `typo3/sysext/frontend/Resources/Public/Icons/FileIcons/${extension}.gif`
      )
    },
    onError(err) {
      // resolve default icon on error
      // @todo make it nicer
      // https://github.com/TYPO3/TYPO3.CMS/tree/master/typo3/sysext/core/Resources/Public/Icons/T3Icons/mimetypes
      err.target.src = this.getExtensionImg('default')
    }
  }
}
</script>
