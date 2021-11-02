<template>
  <div>
    <strong>2 columns layout</strong>
    <div class="two-columns">
      <div>
        <t3-renderer :content="content.colPos0" />
      </div>
      <div>
        <t3-renderer :content="content.colPos1" />
      </div>
    </div>
  </div>
</template>
<script>
import T3BlDefault from '~typo3/components/T3BlDefault/T3BlDefault.vue'
export default {
  extends: T3BlDefault
}
</script>
<style>
.two-columns {
  display: flex;
  flex-direction: row;
}
.two-columns > div {
  flex: 1;
}
</style>
