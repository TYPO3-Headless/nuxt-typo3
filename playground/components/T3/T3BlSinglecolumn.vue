<template>
  <div>
    Custom Backend Layout
    <T3Renderer
      v-if="content?.colPos0"
      :content="content.colPos0"
    />
  </div>
</template>

<script lang="ts" setup>
import type { T3BackendLayout } from '../../../src/types'
defineProps<T3BackendLayout>()
</script>
