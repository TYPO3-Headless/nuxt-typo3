<template>
  <T3BackendLayout
    v-if="pageData?.content"
    :name="backendLayout"
    :content="pageData.content"
  />
</template>

<script setup lang="ts">
import { useHead } from '#app'
import { useT3Page } from '../composables/useT3Page'
import { useRoute, watch } from '#imports'
const { headData, pageData, backendLayout, getPageData } = await useT3Page()
useHead(headData)
watch(() => useRoute().query, getPageData)
</script>
