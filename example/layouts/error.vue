<template>
  <div>
    <h1>ERROR PAGE {{ error.statusCode }}</h1>
    <t3-dynamic
      v-if="t3page"
      :data="t3page.content"
      :type="t3page.appearance.backendLayout"
      layout
    />
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    t3page () {
      return this.error?.ssr?.t3page
    }
  }
}
</script>
