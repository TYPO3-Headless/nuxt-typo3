<template>
  <fieldset class="t3-form-gridrow">
    <slot />
  </fieldset>
</template>
<script>
export default {
  name: 'T3FormGridRow',
  inheritAttrs: false,
  props: {
    field: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
.t3-form-gridrow > div {
  display: flex;
}

.t3-form-gridrow > div > div {
  flex: 1;
}
</style>
