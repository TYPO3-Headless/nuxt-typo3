<template>
  <T3Form
    ref="form"
    :elements="form.elements"
    @submit="onSubmit"
  >
    <template #after="{state}">
      <p v-if="state.error || state.failture">
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
      }
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
    }

  }
}
</script>
