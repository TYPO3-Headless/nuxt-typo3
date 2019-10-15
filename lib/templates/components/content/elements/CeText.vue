<template>
  <div class="ce-text">
    <ce-header v-bind="$props" />
    <html-parser :content="bodytext" />
  </div>
</template>
<script>
import baseCe from '../mixins/baseCe'
export default {
  name: 'CeText',
  extends: baseCe,
  props: {
    bodytext: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>
