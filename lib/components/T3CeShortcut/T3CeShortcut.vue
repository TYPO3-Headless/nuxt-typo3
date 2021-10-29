<script>
export default {
  name: 'T3CeShortcut',
  functional: true,
  props: {
    shortcut: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  render (createElement, ctx) {
    return createElement('div', [
      createElement('ce-renderer', {
        props: {
          content: ctx.props.shortcut
        }
      })
    ])
  }
}
</script>
