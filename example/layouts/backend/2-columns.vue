<template>
  <div>
    <strong>2 columns layout</strong>
    <div class="two-columns">
      <div>
        <ce-renderer :content="content.colPos0" />
      </div>
      <div>
        <ce-renderer :content="content.colPos1" />
      </div>
    </div>
  </div>
</template>
<script>
import BeLayoutDefault from '~typo3/layouts/backend/BeDefault'
export default {
  functional: false,
  extends: BeLayoutDefault
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
