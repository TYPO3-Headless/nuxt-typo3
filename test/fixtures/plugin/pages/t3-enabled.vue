<template>
  <div>
    <span>page title: {{ pageData?.meta?.title ?? 'none' }}</span>
    <span>initial nav: {{ initialData?.navigation?.[0]?.title ?? 'none' }}</span>
  </div>
</template>

<script setup lang="ts">
import { useT3Api } from '../../../../src/runtime/composables/useT3Api'

// opts this static route into full TYPO3 handling
definePageMeta({ t3Page: true })

const { pageData, initialData } = useT3Api()
</script>
