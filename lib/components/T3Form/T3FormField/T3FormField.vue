<template>
  <ValidationProvider
    v-slot="state"
    :vid="field.identifier"
    :name="field.label"
    :rules="rules"
    slim
  >
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
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'T3FormField',
  components: {
    ValidationProvider
  },
  inheritAttrs: false,
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      default: ''
    }
  },
  data () {
    return {
      innerValue: ''
    }
  },
  computed: {
    placeholder () {
      return this.field.properties?.fluidAdditionalAttributes?.placeholder || ''
    },
    required () {
      return !!Object.keys(this.rules).find(key => key === 'NotEmpty')
    },
    rules () {
      const rules = {}
      if (this.field.validators) {
        this.field.validators.forEach((validator) => {
          if (validator.options) {
            switch (validator.identifier) {
              case 'RegularExpression' : rules[validator.identifier] = validator.options.expression
                break
              case 'FileSize': rules[validator.identifier] = validator.options.maximum
                break
              default: rules[validator.identifier] = validator.options
            }
          } else {
            rules[validator.identifier] = true
          }
        })
      }

      return rules
    }
  },
  watch: {
    value (newVal) {
      this.innerValue = newVal
    }
  },
  created () {
    if (this.field.defaultValue && this.field.defaultValue.toString().length > 0) {
      this.innerValue = this.field.defaultValue
    }
  }
}
</script>
