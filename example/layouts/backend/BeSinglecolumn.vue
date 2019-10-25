<template>
  <div>
    <strong>Custom 1 column backend layout</strong>
    <ce-renderer :content="content.colPos0" />
  </div>
</template>
<script>
import BeDefault from '~typo3/layouts/backend/BeDefault'
export default {
  functional: false,
  extends: BeDefault
}
</script>
