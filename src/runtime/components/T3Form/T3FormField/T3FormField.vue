<template>
  <div
    class="t3-form-field"
  >
    <label>{{ field.label }}</label>
    <slot :value="value">
      <input
        v-model="value"
        :name="name"
        :type="type"
        :placeholder="field.properties?.fluidAdditionalAttributes?.placeholder"
      >
    </slot>

    <slot name="error">
      <div v-if="showErrorMessage" style="color: red;">
        {{ customErrorMessage }}
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useIsFormTouched, useField } from 'vee-validate'
import type { T3FormField } from '../../../../types'

const props = defineProps<T3FormField>()
const { value, meta, errorMessage } = useField(() => props.name)

const customErrorMessage = computed(() => {
  if (!errorMessage.value) {
    return ''
  }
  if (!props.field?.label) {
    return errorMessage
  }

  const strArr = errorMessage.value.split(' ')
  strArr[0] = props.field.label
  return strArr.join(' ')
})

const isFormTouched = useIsFormTouched()
const showErrorMessage = computed(() => meta.dirty || isFormTouched.value)

</script>
