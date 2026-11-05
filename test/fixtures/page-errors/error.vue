<template>
  <p id="error-status">
    {{ error.statusCode }}
  </p>
</template>

<script lang="ts" setup>
defineProps<{ error: { statusCode: number } }>()
</script>
