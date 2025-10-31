<template>
  <NuxtLayout>
    <div class="container">
      <h1>{{ error.statusCode }}</h1>
    </div>

    <T3BackendLayout
      v-if="pageData"
      :name="pageData.appearance.backendLayout"
      :content="pageData.content"
    />
  </NuxtLayout>
</template>
<script setup lang="ts">
import type { H3Error } from 'h3'
import { useT3Page } from '~/../src/runtime/composables/useT3Page'
import { useHead } from '#app'
defineProps<{
  error: H3Error
}>()
const { headData, pageData } = await useT3Page()
useHead(headData)
</script>
