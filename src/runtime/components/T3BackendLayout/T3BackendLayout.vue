<template>
  <component
    :is="useT3DynamicBl(name)"
    :content="content"
    v-bind="$attrs"
  />
</template>
<script setup lang="ts">
import { useT3DynamicBl } from '../../composables/useT3DynamicComponent'
import type { T3BackendLayout } from '../../../types'
defineProps<{
  name: string
} & T3BackendLayout>()
</script>
