<template>
  <T3FormField
    :name="props.name"
    :field="{ ...props.field, type: 'hidden' }"
    class="t3-form-field-hidden"
  />
</template>

<script setup lang="ts">
import T3FormField from './T3FormField.vue'

const props = defineProps<{ name: string, field: any }>()
</script>
