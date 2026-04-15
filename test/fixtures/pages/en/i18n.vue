<template>
  <div>
    <p>currentLocale: {{ currentLocale }}</p>
    {{ pageData?.meta?.title }}

    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import { useT3i18n } from '../../../../src/runtime/composables/useT3i18n'
import { useT3Api } from '../../../../src/runtime/composables/useT3Api'
const { currentLocale } = useT3i18n()
const { pageData } = useT3Api()
</script>
