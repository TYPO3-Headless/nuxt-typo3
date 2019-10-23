<template>
  <textpic v-bind="$props" class="ce-textmedia" />
</template>
<script>
import Textpic from './CeTextpic'
export default {
  name: 'CeTextmedia',
  components: {
    Textpic
  },
  extends: Textpic
}
</script>
