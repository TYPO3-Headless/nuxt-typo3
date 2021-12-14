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
          alert(data)
        })
    }
  }
}
</script>
