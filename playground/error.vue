<template>
  <NuxtLayout>
    <div class="container">
      <h1>{{ error.statusCode }}</h1>
    </div>
    <T3BackendLayout v-if="pageDataFallback" :content="pageDataFallback.content" />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { H3Error } from 'h3'
import { useHead } from '#app'
import { useT3Page } from '../src/runtime/composables/useT3Page'
defineProps<{
  error: H3Error
}>()

const { T3BackendLayout, pageDataFallback, headData } = await useT3Page({
  fetchOnInit: false
})
useHead(headData)
</script>
