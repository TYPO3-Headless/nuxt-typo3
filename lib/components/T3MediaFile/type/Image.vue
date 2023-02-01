<template>
  <div
    class="t3-ce-media-image"
  >
    <component
      :is="file.properties.link ? 't3-nav-link' : 'div'"
      :to="file.properties.link"
    >
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

<script>
export default {
  name: 'MediaImage',
  props: {
    file: {
      type: Object,
      required: true
    }
  }
}
</script>
