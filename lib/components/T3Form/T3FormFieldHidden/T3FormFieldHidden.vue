<template>
  <input
    :id="field.identifier"
    v-model="innerValue"
    :name="field.name || field.identifier"
    type="hidden"
    v-on="$listeners"
  >
</template>
<script>
import Vue from 'vue'
import T3FormField from '../T3FormField/T3FormField.vue'
export default Vue.extend({
  name: 'T3FormFieldHidden',
  extends: T3FormField
})
</script>
