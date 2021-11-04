<template>
  <T3Form
    ref="form"
    :elements="elements"
    @submit="onSubmit"
  />
</template>
<script>
import FormData from '../../lib/components/T3Form/__tests__/T3Form.data'
export default {
  data () {
    return {
      elements: FormData.elements
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.state.setState('success', true)
    }
  }
}
</script>
