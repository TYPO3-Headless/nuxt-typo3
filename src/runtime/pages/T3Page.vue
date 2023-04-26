<template>
  <T3BackendLayout v-if="pageData?.content" :content="pageData.content" />
</template>

<script setup lang="ts">
import { useT3Page } from '../composables/useT3Page'
import { useHead } from '#app'
const { headData, T3BackendLayout, pageData } = await useT3Page()
useHead(headData)
</script>
