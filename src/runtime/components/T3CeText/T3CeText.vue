<template>
  <div class="t3-ce-text">
    <T3CeHeader v-bind="props" />
    <T3HtmlParser
      v-if="bodytext"
      :content="bodytext"
    />
  </div>
</template>

<script setup lang="ts">
import type { T3CeTextProps } from '../../../types'
const props = defineProps<T3CeTextProps>()
</script>
