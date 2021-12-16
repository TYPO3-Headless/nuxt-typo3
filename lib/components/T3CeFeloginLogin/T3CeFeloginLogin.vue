<template>
  <div class="fe-login">
    <p>{{ $props.data.message.header }}</p>
    <p>{{ $props.data.message.message }}</p>
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
      return this.data.form.elements.map(function (element) {
        return {
          value: element.value || '',
          type: element.type || '',
          identifier: '', // TODO get from form element
          label: element.label || '',
          placeholder: element.placeholder || '',
          required: false, // TODO: parse required form validators
          name: element.name || '',
          validators: element.validators ? [element.validators] : [] // TODO: Create a function to proper parse validators.
        }
      })
    }
  },
  methods: {
    onSubmit ({ validator, form, formRef }) {
      const data = new FormData(formRef)
      data.append('responseElementId', this.id.toString())
      data.append('responseElementRecursive', '1')

      this.$typo3.api.$http
        .$post(this.data.form.action, data)
        .then((data) => {
          // Get to the actual data we need from the response
          data = data.content.data
          if (data.status === 'success') {
            this.$store.dispatch('getInitialData', { path: this.$route.path })
              .then((response) => {
                if (this.redirectUrl !== '') {
                  this.$route.push(this.redirectUrl)
                }
              })
          } else {
            alert('Login status was not success')
            // TODO: Error handling
          }
        })
    }
  }
}
</script>
