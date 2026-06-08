<template>
  <div>
    {{ metaData }}
  </div>
</template>

<script lang="ts" setup>
import { useAsyncData, useHead } from '#app'
import { useT3Api } from '../../../src/runtime/composables/useT3Api'
import { useT3Meta } from '../../../src/runtime/composables/useT3Meta'
// simulates a TYPO3-handled page: opt in so the plugin resolves page data
definePageMeta({ t3Page: true })

const { getInitialData, initialData } = useT3Api()

const { data: t3InitialData } = await useAsyncData(() =>
  getInitialData('/')
)
initialData.value = t3InitialData.value
const { metaData, headData } = useT3Meta()
useHead(headData)
</script>
