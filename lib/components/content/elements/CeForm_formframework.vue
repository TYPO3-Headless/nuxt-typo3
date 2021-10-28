<template>
  <div>
    <FormulateForm :name="form.id" @submit="submit">
      <fieldset
        v-for="(step, stepKey) in schema"
        v-show="stepKey === currentStep"
        :key="stepKey"
      >
        <legend>{{ step.label }}</legend>
        <FormulateInput
          v-for="(input, key) in step.renderables"
          :key="key"
          v-bind="input"
        />
        <template v-if="schema.length > 1">
          <button
            v-if="currentStep !== 0"
            type="button"
            @click="setStep(currentStep - 1)"
          >
            {{ step.renderingOptions.previousButtonLabel }}
          </button>
          <button
            v-if="currentStep !== schema.length - 1"
            type="button"
            @click="setStep(currentStep + 1)"
          >
            {{ step.renderingOptions.nextButtonLabel }}
          </button>
        </template>
      </fieldset>
      <template v-if="showCTA">
        <FormulateInput type="submit" label="Send" />
      </template>
    </FormulateForm>
    <template v-if="state.success">
      <div>Thank you!</div>
    </template>
    <template v-if="state.error">
      <div>Error occurred</div>
    </template>
    <template v-if="state.loading">
      <div>loading...</div>
    </template>
  </div>
</template>
<script>
// Map TYPO3 Input types to vueformulate
const TYPES = {
  Text: 'text',
  Textarea: 'textarea',
  Password: 'password',
  Email: 'email',
  Telephone: 'tel',
  Url: 'url',
  Number: 'number',
  Date: 'date',
  SingleSelect: 'select',
  FileUpload: 'file',
  Checkbox: 'checkbox',
  RadioButton: 'radio'
}

// Map TYPO3 validation rules to vueformulate
const VALIDATIONS = {
  EmailAddress: 'email',
  NotEmpty: 'required',
  Number: 'number'
}

export default {
  name: 'CeFormFormframework',
  props: {
    form: {
      type: Object,
      required: true
    },
    link: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      currentStep: 0,
      state: {
        success: false,
        error: false,
        loading: false
      }
    }
  },
  computed: {
    showCTA () {
      return this.currentStep === 0 && this.schema.length === 1
    },
    hiddenFields () {
      return Object.keys(this.form.hidden).map(key => ({
        [`tx_form_formframework[${this.form.id}][${key}]`]: this.form.hidden[
          key
        ]
      }))
    },
    schema () {
      // copy array without nested object references
      const steps = JSON.parse(JSON.stringify(this.form.renderables))
      // map fields delivered by API to vueformulate schema
      return steps
        .map((step) => {
          step.renderables &&
            step.renderables.map((item) => {
              item.id = item.identifier
              item.validationName = item.label
              item.name = `tx_form_formframework[${this.form.id}][${item.identifier}]`
              item.value = item.defaultValue || null
              item.type = TYPES[item.type] || 'hidden'
              if (item.properties) {
                if (item.properties.options) {
                  item.options = item.properties.options
                }
                if (item.properties.elementDescription) {
                  item.help = item.properties.elementDescription
                }
              }
              if (item.validators) {
                item.validation = ''
                item.validators.map(
                  validator =>
                    (item.validation += `${VALIDATIONS[validator.identifier]}|`)
                )
              }
              return item
            })
          return step
        })
        .slice(0, 1) // just get first step until backend supports more
    }
  },
  methods: {
    toggleState (state, value) {
      this.state[state] = value || !this.state[state]
    },
    resetState () {
      Object.keys(this.state).map(state => (this.state[state] = false))
    },
    setStep (step) {
      this.currentStep = step
    },
    submit (data) {
      this.resetState()
      this.toggleState('loading')
      this.$typo3.api.$http
        .$post(this.link.url, {
          ...data,
          ...Object.assign({}, ...this.hiddenFields)
        })
        .then((data) => {
          this.$formulate.reset(this.form.id)
          this.toggleState('loading')
          this.toggleState('success')
        })
        .catch(() => {
          this.toggleState('loading')
          this.toggleState('error')
        })
    }
  }
}
</script>
<style>
input,
textarea {
  border: 1px solid black;
}

.formulate-input {
  margin-bottom: 1em;
}

.formulate-input .formulate-input {
  margin-bottom: initial;
}

[data-classification='box'] .formulate-input-wrapper {
  display: flex;
  align-items: center;
}

[data-classification='box'] .formulate-input-element {
  margin-right: 0.4em;
}
</style>
