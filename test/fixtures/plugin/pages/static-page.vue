<template>
  <div>
    <span>static rendered</span>
    <span>page title: {{ pageData?.meta?.title ?? 'none' }}</span>
  </div>
</template>

<script setup lang="ts">
import { useT3Api } from '../../../../src/runtime/composables/useT3Api'

// no t3Page meta -> the module must leave this page untouched
const { pageData } = useT3Api()
</script>
