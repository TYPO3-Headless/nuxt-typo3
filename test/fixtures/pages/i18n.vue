<template>
  <div>
    <p>currentLocale: {{ currentLocale }}</p>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import { useT3i18n } from '../../../src/runtime/composables/useT3i18n'
const { currentLocale } = useT3i18n()
</script>
