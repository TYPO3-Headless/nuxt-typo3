<template>
  <div>
    <h1>ERROR PAGE {{ error.message }}</h1>

    <t3-dynamic
      v-if="t3page && t3page.content"
      :data="t3page.content"
      :type="t3page.appearance.backendLayout"
      layout
    />
  </div>
</template>
<script>
export default {
  name: 'ErrorPage',
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
