<script>
// helper component to render nested list
export default {
  functional: true,
  props: {
    children: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  render(createElement, ctx) {
    return createElement(
      'ul',
      ctx.props.children.map(el => {
        return createElement('li', {}, [
          createElement(
            'nav-link',
            {
              props: {
                to: el.link
              },
              attrs: {
                target: el.target || false,
                title: el.title
              }
            },
            el.title
          ),
          el.children
            ? createElement('menu-nested-list', {
                props: {
                  children: el.children
                }
              })
            : false
        ])
      })
    )
  }
}
</script>
