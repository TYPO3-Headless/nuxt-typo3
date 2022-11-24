<template>
  <T3Form
    ref="form"
    :elements="elements"
    @submit="onSubmit"
  >
    <template #after="{state}">
      <p v-if="state.error || state.failure">
        {{ i18n.serverError }}
      </p>
      <p v-if="state.success">
        {{ i18n.serverSuccess }}
      </p>
    </template>
  </T3Form>
</template>
<script>
export default {
  name: 'T3CeFormFormframework',
  props: {
    id: {
      type: Number,
      required: true
    },
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
      i18n: {
        submitButton: 'Submit',
        sendingLabel: 'Sending',
        resetButton: 'Reset form',
        serverSuccess: 'The form was sent, thank you.',
        serverError: 'We can not process form right now, please try again later.',
        validationErrors: 'There were some errors, review the form'
      },
      // map TYPO3 validation rules to
      // https://vee-validate.logaretm.com/v3/guide/rules.html#rules
      rules: {
        Alphanumeric: 'alpha',
        Integer: 'integer',
        NotEmpty: 'required',
        EmailAddress: 'email',
        RegularExpression: {
          identifier: 'regex',
          options: {
            expression: 'regex'
          }
        }
      }
    }
  },
  computed: {
    elements () {
      return this.prepareElements(this.form.elements)
    }
  },
  created () {
    this.i18n = Object.freeze(Object.assign(this.i18n, this.form.i18n))
  },
  methods: {
    /**
     * T3Form Submit callback
     * @param {T3FormSubmitObject} FormObject
     */
    async onSubmit ({ validator, form, formRef }) {
      const { flags, setErrors } = validator
      const { resetForm, setState } = form
      const formData = new FormData(formRef)
      formData.append('responseElementId', this.id)
      formData.append('responseElementRecursive', 1)

      if (flags.valid) {
        setState('sending')
        try {
          const response = await this.sendForm(formData, this.link.href)
          const formResponse = response?.content?.form?.api

          if (formResponse.status === 'success') {
            setState('success')
            resetForm()
            return this.onSuccess(formResponse.actionAfterSuccess)
          }
          if (formResponse.status === 'failure') {
            setErrors(this.prepareErrors(formResponse.errors))
            setState('failure')
          }
        } catch (err) {
          setState('error')
        }
      }
    },
    /**
     * Send form used $typo3 http client
     * @param {FormData} parsed form data object
     * @param {string} url API Endpoint to call contact form
     * @returns {Promise<TYPO3.Response.Page>} whole page content
     */
    async sendForm (formData, url) {
      return await this.$typo3.api.$http.$post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    },
    /**
     * Action to call on success
     * @param {ActionAfterSuccess} actionAfterSuccess object
     * @returns {void}
     */
    onSuccess (actionAfterSuccess) {
      if (actionAfterSuccess?.redirectUri) {
        this.$router.push(actionAfterSuccess.redirectUri)
      }
    },
    /**
     * Map errors from api to vee-validate schema
     * @param {{[key: string]: string}} errors object
     * @returns {Record<string, string[] | string>} errors object for vee-validate
     */
    prepareErrors (errors) {
      const errObj = { ...errors }
      Object.values(errObj).map(value => ([value]))
      return errObj
    },
    /**
     * Map TYPO3 Form Framework to T3Form Schema
     * @param {FormFrameworkElement[]} elements
     * @returns {T3FormELement[]} elements
     */
    prepareElements (elements) {
      let _elements = []
      _elements = elements.map((element) => {
        const _element = Object.assign({}, element)
        if (_element.elements) {
          _element.elements = this.prepareElements(_element.elements)
        }
        if (!Array.isArray(_element.properies)) {
          _element.placeholder = element.properties?.fluidAdditionalAttributes?.placeholder
          _element.required = element.properties?.fluidAdditionalAttributes?.required
        }
        _element.value = element.defaultValue
        _element.type = _element.type.toLowerCase()

        if (_element.type === 'fieldset') {
          _element.fieldlist = true
        }

        if (_element.validators) {
          _element.validators = this.mapValidationRules(_element.validators)
        }

        return _element
      })
      return _elements
    },
    /**
     * Map TYPO3 Form Framework
     * @param {FormFramworkRule[]} FormFramework element rules
     * @returns {T3FormRule[]} rules
     * https://vee-validate.logaretm.com/v3/advanced/rules-object-expression.html
     */
    mapValidationRules (elementRules) {
      const rules = []

      elementRules.forEach((rule) => {
        const ruleToMap = this.rules[rule.identifier]
        let newRule = {}

        if (ruleToMap) {
          if (typeof ruleToMap === 'string') {
            newRule.identifier = ruleToMap
          } else {
            newRule = {
              identifier: ruleToMap.identifier,
              options: {}
            }
            if (rule.options && ruleToMap.options && Object.keys(rule.options).length) {
              Object.entries(ruleToMap.options).forEach(([key, option]) => {
                newRule.options[option] = rule.options[key]
              })
            }
          }
        } else {
          newRule = rule
        }

        if (rule.errorMessage) {
          newRule.message = rule.errorMessage
        }

        rules.push(newRule)
      })

      return rules
    }

  }
}
</script>
