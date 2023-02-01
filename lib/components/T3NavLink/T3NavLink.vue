<script>
// Detect and render internal or external link
import Vue from 'vue'
export default {
  name: 'T3NavLink',
  extends: Vue.component('RouterLink'),
  props: {
    to: {
      type: String,
      required: true
    }
  },
  render (h) {
    function prepareLink (url) {
      if (typeof url === 'string' && url.match(/^((http(s)?|ftp):\/\/)|(mailto|tel):/)) {
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
          to: url || '/'
        }
      }
    }

    const url = prepareLink(this.to)
    return h(
      url.tag,
      {
        ...this.$data,
        ...url.data,
        props: {
          ...this.$props,
          ...url.props
        }
      },
      this.$slots.default
    )
  }
}
</script>
