<template>
  <NuxtLayout>
    <div class="container">
      <h1>{{ error.statusCode }}</h1>
    </div>
    <T3BackendLayout v-if="pageData" :content="pageData.content" />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { H3Error } from 'h3'
const props = defineProps<{
  error: H3Error
}>()

const { getFallbackDataFromError } = useT3ErrorHandling()
const { getPage, pageData } = useT3Api()
const { T3BackendLayout } = useT3Page()
getFallbackDataFromError(props.error)

try {
  await getPage(useRoute().fullPath, {
    onResponseError (payload) {
      pageData.value = payload.response?._data
    }
  })
} catch (err) {}

</script>
