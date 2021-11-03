<template>
  <div class="t3-ce-text">
    <t3-ce-header v-bind="$props" />
    <t3-html-parser :content="bodytext" />
  </div>
</template>
<script>
import baseCe from '../../mixins/component/baseCe'
export default {
  name: 'T3CeText',
  extends: baseCe,
  props: {
    bodytext: {
      type: String,
      default: ''
    }
  }
}
</script>
