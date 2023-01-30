<template functional>
  <div>
    <T3CeDiv :test="props.test" class="hello" />
  </div>
</template>

<script>
import T3CeDiv from '../T3CeDiv'
export default {
  name: 'TestComponent',
  functional: true,
  components: {
    T3CeDiv
  },
  props: {
    test: {
      type: String,
      required: true
    }
  }
}
</script>
