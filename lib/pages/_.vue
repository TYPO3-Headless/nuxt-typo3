<template>
  <div>
    <t3-dynamic
      :data="t3page.content"
      :type="t3page.appearance.backendLayout"
      layout
    />
  </div>
</template>

<script>
import defaultPage from '../mixins/page/default'
export default {
  name: 'T3Page',
  mixins: [defaultPage]
}
</script>
