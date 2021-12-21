<template>
  <div class="fe-login">
    <p>{{ data.message.header }}</p>
    <p>{{ data.message.message }}</p>
    <T3Form ref="form" :elements="elements" @submit="onSubmit" />
  </div>
</template>
<script>
import T3Form from '../../components/T3Form/T3Form'
import baseCe from '../../mixins/component/baseCe'

export default {
  name: 'T3CeFeloginLogin',
  components: {
    T3Form
  },
  extends: baseCe,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    redirectUrl () {
      const element = this.data.form.elements.filter(function (element) {
        return element.name === 'redirect_url'
      })

      if (element.length > 0) {
        return element?.value || ''
      }

      return ''
    },
    elements () {
      return this.compileFormElements(this.data.form.elements)
    }
  },
  methods: {
    compileFormElements (elements) {
      return elements
        .filter(element => element.type !== 'submit')
        .map((element) => {
          return {
            id: element.name,
            value: element.value || '',
            type: element.type || '',
            identifier: '', // TODO get from form element
            label: element.label || '',
            placeholder: element.placeholder || '',
            required: false, // TODO: parse required form validators
            name: element.name || '',
            validators: element.validators
          }
        })
    },
    async onSubmit ({ validator, form, formRef }) {
      const { flags } = validator
      const data = new FormData(formRef)
      data.append('responseElementId', this.id.toString())
      data.append('responseElementRecursive', '1')

      if (flags.valid) {
        try {
          const response = await this.$typo3.api.$http.$post(this.data.form.action, data)
          const { redirectUrl, status } = response.content.data

          if (status === 'success') {
            try {
              await this.$store.dispatch('getInitialData', { path: redirectUrl || this.$route.path })
            } finally {
              this.onSuccess(redirectUrl)
            }
          }
        } catch {
          this.onFailure()
        }
      }
    },
    /**
     * @param redirectUrl
     */
    onSuccess (redirectUrl) {
      if (redirectUrl) {
        this.$router.push(redirectUrl)
      }
    },
    /**
     * TODO: Proper error handling
     */
    onFailure () {
      alert('Login status was not success')
    }
  }
}
</script>
