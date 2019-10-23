<template functional>
  <audio
    v-bind="data.attrs"
    :class="[data.class, data.staticClass]"
    class="ce-media-audio"
    controls
  >
    <source :src="props.file.publicUrl" type="audio/mp3" />
  </audio>
</template>
<script>
export default {
  name: 'MediaAudio',
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
