<template>
  <main>
    <T3Renderer
      v-if="content?.colPos0"
      :content="content.colPos0"
    />
  </main>
</template>

<script lang="ts" setup>
defineProps({
  content: {
    type: Object,
    default: () => ({})
  }
})
</script>
