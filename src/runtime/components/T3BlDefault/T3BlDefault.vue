<template>
  <T3Renderer
    v-if="content?.colPos0"
    :content="content.colPos0"
  />
</template>

<script lang="ts" setup>
import type { T3BackendLayout } from '../../../module'
defineProps<T3BackendLayout>()
</script>
