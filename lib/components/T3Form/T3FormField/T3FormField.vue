<template>
  <ValidationProvider
    v-slot="state"
    :vid="field.identifier"
    :name="field.label"
    :rules="rules"
    :custom-messages="messages"
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
      return this.field.placeholder || ''
    },
    required () {
      return this.field.required || !!Object.keys(this.rules).find(key => key === 'required')
    },
    rules () {
      const rules = {}
      if (this.field.validators) {
        this.field.validators.forEach((validator) => {
          rules[validator.identifier] = validator.options || true
        })
      }
      if (this.field.required) {
        rules.required = true
      }
      return rules
    },
    messages () {
      const messages = {}
      if (this.field.validators) {
        this.field.validators.forEach((validator) => {
          if (validator.message) {
            messages[validator.identifier] = validator.message
          }
        })
      }
      return messages
    }
  },
  watch: {
    value (newVal) {
      this.innerValue = newVal
    }
  },
  created () {
    if (this.field.value && this.field.value.toString().length > 0) {
      this.innerValue = this.field.value
    }
  }
}
</script>
