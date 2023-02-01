<template>
  <audio
    class="t3-ce-media-audio"
    controls
  >
    <source :src="file.publicUrl" type="audio/mp3">
  </audio>
</template>
<script>
export default {
  name: 'MediaAudio',
  props: {
    file: {
      type: Object,
      required: true
    }
  }
}
</script>
