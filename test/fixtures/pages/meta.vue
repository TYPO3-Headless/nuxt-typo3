<template>
  <div>
    {{ metaData }}
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useAsyncData, useHead } from '#app'
import { useT3Api } from '../../../src/runtime/composables/useT3Api'
import { useT3Meta } from '../../../src/runtime/composables/useT3Meta'
const { pageData, getPage } = useT3Api()
const { metaData, headData } = useT3Meta()
useHead(headData)
const route = useRoute().fullPath
const { data: t3PageData } = await useAsyncData(() =>
  getPage(route, {
    baseURL: 'http://localhost:9879'
  })
)

pageData.value = t3PageData.value
</script>
