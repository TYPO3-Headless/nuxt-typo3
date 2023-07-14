<template>
  <form
    ref="formRef"
    class="t3-form"
    novalidate
    @submit.prevent
  >
    <slot name="fields">
      <T3FormFieldList
        :elements="elements"
        :custom-components="customComponents"
      />

      <T3FormCta
        :i18n="i18n"
        :state="{ sending: isSubmitting }"
        @click:reset="resetForm"
        @click:submit="onSubmit"
      />
    </slot>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { T3FormProps, T3FormSubmitPayload } from '../../../types'
import { useT3Form } from './useT3Form'
import T3FormCta from './T3FormCta/T3FormCta.vue'
import T3FormFieldList from './T3FormFieldList/T3FormFieldList.vue'

const props = defineProps<T3FormProps>()
const formRef = ref<HTMLFormElement>()
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'submit', payload: T3FormSubmitPayload): void
}>()

const { i18n, resetForm, handleSubmit, isSubmitting, errors, meta, setErrors } = useT3Form(props)
const onSubmit = handleSubmit((values) => {
  emit('submit', { values, formRef } as T3FormSubmitPayload)
})

defineExpose({
  isSubmitting,
  resetForm,
  errors,
  meta,
  i18n,
  setErrors
})
</script>
