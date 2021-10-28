<template>
  <div>
    <be-dynamic
      :page="page"
      :content="page.content"
      :type="backendLayout"
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
