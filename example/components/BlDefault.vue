<template>
  <div>
    <strong>Override backend layout</strong>
    <t3-renderer :content="content.colPos0" />
  </div>
</template>
<script>
import T3BlDefault from '~typo3/components/T3BlDefault/T3BlDefault.vue'
export default {
  name: 'T3BlDefault',
  extends: T3BlDefault
}
</script>
