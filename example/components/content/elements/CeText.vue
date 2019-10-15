<template>
  <div class="ce-text">
    <strong> Overrided Text Element </strong>
    <ce-header v-bind="$props" />
    <html-parser :content="bodytext" />
  </div>
</template>
<script>
import CeText from '~typo3/components/content/elements/CeText.vue'
export default {
  name: 'CeText',
  extends: CeText
}
</script>
