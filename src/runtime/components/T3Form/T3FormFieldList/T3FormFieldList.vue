<template>
  <div class="t3-form-field-list">
    <div
      v-for="(field) in elements"
      :key="field.identifier"
    >
      <component
        :is="resolveFieldComponent(field)"
        v-if="field.name && !field.fieldlist"
        :name="field.name"
        :field="field"
      />
      <T3FormFieldList
        v-else-if="field.fieldlist && field.elements"
        :elements="field.elements"
        :custom-components="customComponents"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { T3FormFieldListProps } from '../../../../types'
import { useT3FormFieldList } from './useT3FormFieldList'

const props = defineProps<T3FormFieldListProps>()
const { resolveFieldComponent } = useT3FormFieldList(props)
</script>
