<script>
export default {
  name: 'T3CeShortcut',
  functional: true,
  props: {
    shortcut: {
      type: Array,
      required: true
    }
  },
  render (createElement, ctx) {
    return createElement('div', [
      createElement('t3-ce-renderer', {
        props: {
          content: ctx.props.shortcut
        }
      })
    ])
  }
}
</script>
