<template>
  <div class="t3-ce-html">
    <T3HtmlParser :content="bodytext" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  bodytext: string
}>()
</script>
