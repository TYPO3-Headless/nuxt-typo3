<template>
  <div class="t3-ce-uploads">
    <t3-ce-header v-bind="$props" />
    <ul v-if="media">
      <li v-for="(file, key) in media" :key="key">
        <t3-nav-link :to="file.publicUrl" :target="target">
          <span v-if="displayInformation === 1" class="t3-ce-uploads__icon">
            <img
              :src="getExtensionImg(file.properties.extension)"
              @error="onError"
            >
          </span>
          <span
            v-if="displayInformation === 2 && file.properties.type === 'image'"
            class="t3-ce-uploads__thumb"
          >
            <t3-ce-media-file :file="file" />
          </span>
          <span class="t3-ce-uploads__name">
            {{ file.properties.title || file.publicUrl }}
          </span>
          <span v-if="displayFileSizeInformation" class="t3-ce-uploads__size">
            {{ file.properties.size }}
          </span>
        </t3-nav-link>
        <p
          v-if="displayDescription && file.properties.description"
          class="t3-ce-uploads__desc"
        >
          {{ file.properties.description }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import baseCe from '../../mixins/component/baseCe'
import UrlMixins from '~typo3/mixins/utils/urls'
export default {
  name: 'T3CeUploads',
  extends: baseCe,
  mixins: [UrlMixins],
  props: {
    media: {
      type: Array,
      required: true
    },
    displayDescription: {
      type: Number,
      default: 0
    },
    displayFileSizeInformation: {
      type: Number,
      default: 0
    },
    displayInformation: {
      type: Number,
      default: 0
    },
    target: {
      type: String,
      default: ''
    }
  },
  methods: {
    getExtensionImg (extension) {
      return this.getApiBaseUrl(
        `typo3/sysext/frontend/Resources/Public/Icons/FileIcons/${extension}.gif`
      )
    },
    onError (err) {
      // resolve default icon on error
      // @todo make it nicer
      // https://github.com/TYPO3/TYPO3.CMS/tree/master/typo3/sysext/core/Resources/Public/Icons/T3Icons/mimetypes
      err.target.src = this.getExtensionImg('default')
    }
  }
}
</script>
