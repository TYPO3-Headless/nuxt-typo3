<template>
  <ValidationProvider
    v-slot="state"
    :name="field.label"
    :rules="rules"
    slim
  >
    <div class="field-row">
      <label :for="field.identifier"> {{ field.label }} </label>
      <slot :state="state">
        <input
          :id="field.identifier"
          v-model="innerValue"
          :type="field.type"
          :label="field.label"
          :name="field.name || field.identifier"
          :class="state.classes"
          :placeholder="placeholder"
          :required="required"
          @input="(event) => $emit('input', event.target.value)"
        >
      </slot>
      <ul v-if="state.errors.length" class="t3-form-field__errors">
        <li v-for="(error, key) in state.errors" :key="key">
          {{ error }}
        </li>
      </ul>
    </div>
  </ValidationProvider>
</template>
<script>
import { T3FormField } from '~typo3/components/T3Form'
export default {
  name: 'T3FormField',
  extends: T3FormField
}
</script>
<style scoped>
.field-row {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

label {
  margin-right: 10px;
}

ul {
  margin: 0;
  color: red;
}
</style>
