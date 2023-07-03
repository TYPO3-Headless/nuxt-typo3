<template>
  <div>
    <p>currentLocale: {{ currentLocale }}</p>
    {{ pageData.meta.title }}

    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useAsyncData } from '#app'
import { useT3i18n } from '../../../../src/runtime/composables/useT3i18n'
import { useT3Api } from '../../../../src/runtime/composables/useT3Api'
const { currentLocale } = useT3i18n()
const { pageData, getPage } = useT3Api()
const route = useRoute().fullPath
const { data: t3PageData } = await useAsyncData(() =>
  getPage(route, {
    baseURL: 'http://localhost:9878'
  })
)

pageData.value = t3PageData.value
</script>
