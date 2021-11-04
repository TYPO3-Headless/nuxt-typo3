<template>
  <T3FormField :field="field">
    <template #default="{state}">
      <select
        :id="field.identifier"
        v-model="innerValue"
        :name="field.name || field.identifier"
        :class="state.classes"
        @input="(event) => $emit('input', event.target.value)"
      >
        <option
          v-if="placeholder"
          selected
          :disabled="required"
        >
          {{ placeholder }}
        </option>
        <option v-else />
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </template>
  </T3FormField>
</template>
<script>
import extendableComponents from '../../../mixins/component/extendableComponents'
import T3FormField from '../T3FormField/T3FormField.vue'
export default {
  name: 'T3FormFieldSelect',
  components: {
    T3FormField
  },
  extends: T3FormField,
  mixins: [extendableComponents],
  computed: {
    options () {
      return Object.entries(this.field.properties?.options).map(([value, label]) => ({
        label,
        value
      }))
    },
    placeholder () {
      return this.field?.properties?.prependOptionLabel
    }
  }
}
</script>
