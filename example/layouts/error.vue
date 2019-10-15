<template>
  <div>
    <h1>ERROR PAGE {{ error.statusCode }}</h1>
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
