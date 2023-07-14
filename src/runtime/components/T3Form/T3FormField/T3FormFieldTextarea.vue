<template>
  <T3FormField
    class="t3-form-field-textarea"
    v-bind="props"
  >
    <textarea v-model="value" :name="name" />
  </T3FormField>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import T3FormField from './T3FormField.vue'

const props = defineProps<{ name: string, field: any }>()
const { value } = useField<string>(() => props.name)
</script>
