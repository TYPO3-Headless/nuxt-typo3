<template>
  <div class="t3-ce-html">
    <t3-html-parser :content="bodytext" />
  </div>
</template>
<script>
import baseCe from '../../mixins/component/baseCe'
export default {
  name: 'T3CeHtml',
  extends: baseCe,
  props: {
    bodytext: {
      type: String,
      default: ''
    }
  }
}
</script>
