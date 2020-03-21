<template>
  <div>
    <h1>ERROR PAGE {{ error.statusCode }}</h1>
    <be-dynamic
      v-if="error.ssr"
      :page="error.ssr.pageContent.page"
      :content="error.ssr.pageContent.content"
      :type="error.ssr.backendLayout"
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
  }
}
</script>
