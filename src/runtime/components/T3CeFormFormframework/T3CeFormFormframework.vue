<template>
  <div class="t3-ce-form-framework">
    <T3Form
      v-if="props.form"
      ref="t3form"
      :elements="elements"
      :i18n="{}"
      @submit="onSubmit"
    />
    <div v-if="responseMessage">
      <p>{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { T3CeFormFormframeworkProps, Form } from '../../../types'
import T3Form from '../T3Form/T3Form.vue'
import { useT3CeFormFormframework } from './useT3CeFormFormframework'
const t3form = ref<Form | null>(null)
const props = defineProps<T3CeFormFormframeworkProps>()
const { elements, onSubmit, responseMessage } = useT3CeFormFormframework(props, t3form)
</script>
