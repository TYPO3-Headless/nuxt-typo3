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
const { headData, pageData, backendLayout } = await useT3Page()
useHead(headData)
</script>
