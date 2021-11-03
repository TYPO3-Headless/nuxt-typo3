<template functional>
  <div class="ce-html">
    <t3-html-parser :content="props.bodytext" />
  </div>
</template>
<script>
import baseCe from '../../mixins/component/baseCe'
export default {
  name: 'T3CeHtml',
  functional: true,
  extends: baseCe,
  props: {
    bodytext: {
      type: String,
      default: ''
    }
  }
}
</script>
