<template functional>
  <div class="ce-media-image">
    <component
      :is="props.image.metaData.link ? 'nav-link' : 'div'"
      :to="props.image.metaData.link"
    >
      <figure>
        <img
          :src="props.image.publicUrl"
          :height="props.image.dimensions.height"
          :width="props.image.dimensions.width"
          :alt="props.image.metaData.alternative || false"
          :title="props.image.metaData.title || title"
        />
      </figure>
      <figcaption v-if="props.image.metaData.description">
        {{ props.image.metaData.description }}
      </figcaption>
    </component>
  </div>
</template>

<script>
export default {
  name: 'MediaImage',
  functional: true,
  props: {
    image: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>
