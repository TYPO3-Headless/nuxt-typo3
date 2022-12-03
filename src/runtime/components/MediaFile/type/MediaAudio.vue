<template>
  <audio
    v-bind="$attrs"
    :class="[$attrs.class, $attrs.staticClass]"
    class="t3-ce-media-audio"
    controls
  >
    <source :src="file.publicUrl" type="audio/mp3">
  </audio>
</template>

<script lang="ts" setup>
defineProps<{
  file: {
    type: Object
    required: true
  }
}>()
</script>
