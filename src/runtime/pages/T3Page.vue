<template>
  <T3DynamicComponent
    :data="pageData.content"
    :type="pageData.appearance?.backendLayout"
    layout
  />
</template>

<script setup lang="ts">
import { useHead } from '#app'
import { useT3Api } from '../composables/useT3Api'
import { useT3Meta } from '../composables/useT3Meta'
const { pageData } = useT3Api()
const { getMeta } = useT3Meta()
useHead(getMeta)
</script>
