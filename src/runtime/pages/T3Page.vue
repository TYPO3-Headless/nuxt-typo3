<template>
  <T3BackendLayout :content="pageData.content" />
</template>

<script setup lang="ts">
import { useHead } from '#app'
import { useT3Page } from '../composables/useT3Page'
const { metaData, pageData, T3BackendLayout } = useT3Page()
useHead(metaData)
</script>
