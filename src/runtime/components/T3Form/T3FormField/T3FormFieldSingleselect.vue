<template>
  <T3FormField v-bind="props" class="t3-form-field-singleselect">
    <select v-model="value" :name="name">
      <option v-if="prependOptionLabel" :value="null" disabled>
        {{ prependOptionLabel }}
      </option>
      <option
        v-for="option in options"
        :key="option.key"
        :value="option.key"
      >
        {{ option.label }}
      </option>
    </select>
  </T3FormField>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { useT3FormFieldSelect } from './useT3FormFieldSelect'
import T3FormField from './T3FormField.vue'

const props = defineProps<{ name: string, field: any }>()
const { options, prependOptionLabel } = useT3FormFieldSelect(props)
const { value } = useField(() => props.name)

</script>
