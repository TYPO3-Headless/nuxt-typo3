<template>
  <fieldset class="t3-ce-form-fieldset">
    <legend> {{ field.label }} </legend>
    <slot />
  </fieldset>
</template>
<script>
export default {
  name: 'T3FormFieldset',
  inheritAttrs: false,
  props: {
    field: {
      type: Object,
      required: true
    }
  }
}
</script>
