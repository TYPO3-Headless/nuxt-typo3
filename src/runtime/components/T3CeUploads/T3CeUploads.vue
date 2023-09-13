<template>
  <div class="t3-ce-uploads">
    <T3CeHeader
      v-if="props.header"
      v-bind="props"
    />
    <ul v-if="props.media">
      <li
        v-for="(file, key) in props.media"
        :key="key"
      >
        <nuxt-link
          :to="file.publicUrl"
          :target="props.target || '_self'"
        >
          <span
            v-if="props.displayInformation === '1'"
            class="t3-ce-uploads__icon"
          >
            <img
              :src="getExtensionImg(file.properties.extension)"
              @error="onError"
            >
          </span>
          <span
            v-if="props.displayInformation === '2' && file.properties.type === 'image'"
            class="t3-ce-uploads__thumb"
          >
            <MediaFile :file="file" />
          </span>
          <span class="t3-ce-uploads__name">
            {{ file.properties.title || file.publicUrl }}
          </span>
          <span
            v-if="props.displayFileSizeInformation"
            class="t3-ce-uploads__size"
          >
            {{ file.properties.size }}
          </span>
        </nuxt-link>
        <p
          v-if="props.displayDescription && file.properties.description"
          class="t3-ce-uploads__desc"
        >
          {{ file.properties.description }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { T3CeUploadsProps } from '../../../types'
import { useT3CeUploads } from './useT3CeUploads'

const props = defineProps<T3CeUploadsProps>()
const { getExtensionImg, onError } = useT3CeUploads()

</script>
