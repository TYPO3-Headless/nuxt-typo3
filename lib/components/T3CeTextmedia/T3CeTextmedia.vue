<template>
  <t3-ce-textpic v-bind="$props" class="t3-ce-textmedia" />
</template>
<script>
import T3CeTextpic from '../T3CeTextpic/T3CeTextpic.vue'
export default {
  name: 'T3CeTextmedia',
  components: {
    T3CeTextpic
  },
  extends: T3CeTextpic
}
</script>
