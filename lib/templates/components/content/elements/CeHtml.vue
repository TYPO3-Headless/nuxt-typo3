<template functional>
  <div class="ce-html">
    <html-parser :content="props.bodytext" />
  </div>
</template>
<script>
import baseCe from '../mixins/baseCe'
export default {
  name: 'CeHtml',
  functional: true,
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
