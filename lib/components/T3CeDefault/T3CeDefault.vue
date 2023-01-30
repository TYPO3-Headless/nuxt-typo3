<template>
  <pre :style="{ overflowX: 'scroll' }">
    <code
      :style="{
        fontSize: '12px',
        fontFamily: 'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace'
      }"
    >
      {{ content }}
    </code>
  </pre>
</template>

<script>
export default {
  name: 'T3CeDefault',
  computed: {
    content () {
      return JSON.stringify(this.$attrs, null, 2)
    }
  }
}
</script>
