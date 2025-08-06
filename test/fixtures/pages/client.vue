<template>
  <div>
    <span>initial data: {{ initialData.navigation[0].title }}</span>
    <span>page data: {{ pageData?.meta.title }}</span>
    <span>headers test: {{ headersTest['accept-only'] }}</span>
  </div>
</template>

<script setup lang="ts">
import { useT3Api } from '../../../src/runtime/composables/useT3Api'
import { useNuxtApp, useAsyncData, useState } from '#app'
const { initialData, pageData, getPage, getInitialData, setHeaders } =
  useT3Api()
const headersTest = useState('headers', () => ({}))
const { $typo3 } = useNuxtApp()
setHeaders({ 'accept-only': 'typo3 is the best' })

$typo3.api.$fetch('/', {
  baseURL: 'http://localhost:9876',

  // eslint-disable-next-line require-await
  async onRequest ({ options }) {
    headersTest.value = options.headers
  }
})

const { data: t3InitialData } = await useAsyncData(() =>
  getInitialData('/', {
    baseURL: 'http://localhost:9876'
  })
)

initialData.value = t3InitialData.value

const { data: t3PageData } = await useAsyncData(() =>
  getPage('/', {
    baseURL: 'http://localhost:9876'
  })
)

pageData.value = t3PageData.value
</script>
