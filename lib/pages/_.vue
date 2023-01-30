<template>
  <div>
    <t3-dynamic
      :data="t3page.content"
      :type="t3page.appearance.backendLayout"
      layout
    />
    <TestComponent />
  </div>
</template>

<script>
import defaultPage from '../mixins/page/default'
export default {
  mixins: [defaultPage]
}
</script>
