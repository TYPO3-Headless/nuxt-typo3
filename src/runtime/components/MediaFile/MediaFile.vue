<script lang="ts" setup>
import type { T3File } from '../../../module'
import { useMediaFile } from './useMediaFile'

const props = defineProps<{
  file: T3File
}>()

const { mediaTypeComponent } = useMediaFile(props.file)
</script>

<template>
  <component
    :is="mediaTypeComponent"
    :file="file"
  />
</template>
