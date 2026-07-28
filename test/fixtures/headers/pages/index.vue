<template>
  <div>headers fixture</div>
</template>

<script setup lang="ts">
import { useT3Api } from '../../../../src/runtime/composables/useT3Api'

// a runtime header added during SSR, this one is expected to hydrate
const { setHeaders } = useT3Api()
setHeaders({ 'x-t3-runtime': 'hydrate-me' })
</script>
