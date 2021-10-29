<template>
  <div class="ce-text">
    <strong> Overrided Text Element </strong>
    <t3-ce-header v-bind="$props" />
    <t3-html-parser :content="bodytext" />
  </div>
</template>
<script>
import CeText from '~typo3/components/T3CeText/T3CeText.vue'
export default {
  name: 'CeText',
  extends: CeText
}
</script>
