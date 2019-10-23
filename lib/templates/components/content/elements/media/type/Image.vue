<template functional>
  <div
    v-bind="data.attrs"
    :class="[data.class, data.staticClass]"
    class="ce-media-image"
  >
    <component
      :is="props.file.properties.link ? 'nav-link' : 'div'"
      :to="props.file.properties.link"
    >
      <figure>
        <img
          :src="props.file.publicUrl"
          :height="props.file.properties.dimensions.height"
          :width="props.file.properties.dimensions.width"
          :alt="props.file.properties.alternative || false"
          :title="props.file.properties.title || title"
        />
      </figure>
      <figcaption v-if="props.file.properties.description">
        {{ props.file.properties.description }}
      </figcaption>
    </component>
  </div>
</template>

<script>
export default {
  name: 'MediaImage',
  functional: true,
  props: {
    file: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>
