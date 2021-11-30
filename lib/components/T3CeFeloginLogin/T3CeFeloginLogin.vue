<template>
  <div class="fe-login">
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
      return this.data.form.fields.pages
    }
  },
  methods: {
    onSubmit ({ validator, form, formRef }) {
      const data = new FormData(formRef)
      this.$typo3.api.$http
        .$post(this.data.form.action, data)
        .then((data) => {
          alert(data)
        })
    }
  }
}
</script>
