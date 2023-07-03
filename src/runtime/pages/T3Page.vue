<template>
  <T3BackendLayout v-if="pageData?.content" :content="pageData.content" />
</template>

<script setup lang="ts">
import { useHead } from '#app'
import { useT3Page } from '../composables/useT3Page'
const { headData, T3BackendLayout, pageData } = await useT3Page()
useHead(headData)
</script>
