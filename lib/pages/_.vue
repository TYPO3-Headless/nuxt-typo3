<template>
  <div>
    <t3-dynamic
      :data="page.content"
      :type="backendLayout"
      layout
    />
  </div>
</template>

<script>
import defaultPage from '../mixins/page/default'
export default {
  name: 'Page',
  mixins: [defaultPage]
}
</script>
