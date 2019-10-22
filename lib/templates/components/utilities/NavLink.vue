<script>
// Detect and render internal or external link
import Vue from 'vue'
export default {
  name: 'NavLink',
  functional: true,
  extends: Vue.component('RouterLink'),
  render(h, ctx) {
    function prepareLink(url) {
      if (url.match(/^(http(s)?|ftp):\/\//)) {
        return {
          tag: 'a',
          data: {
            attrs: {
              href: url,
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          },
          props: {}
        }
      }
      return {
        tag: 'nuxt-link',
        data: {},
        props: {
          to: ctx.props.to || '/'
        }
      }
    }
    const url = prepareLink(ctx.props.to)
    return h(
      url.tag,
      {
        ...ctx.data,
        ...url.data,
        props: {
          ...ctx.props,
          ...url.props
        }
      },
      ctx.children
    )
  }
}
</script>
