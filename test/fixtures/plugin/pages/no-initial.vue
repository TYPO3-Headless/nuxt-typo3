<template>
  <div>
    <span>page title: {{ pageData?.meta?.title ?? 'none' }}</span>
    <span>initial nav: {{ initialData?.navigation?.[0]?.title ?? 'none' }}</span>
  </div>
</template>

<script setup lang="ts">
import { useT3Api } from '../../../../src/runtime/composables/useT3Api'

// TYPO3 page handling on, but initial-data fetch explicitly disabled
definePageMeta({ t3Page: true, t3InitialData: false })

const { pageData, initialData } = useT3Api()
</script>
