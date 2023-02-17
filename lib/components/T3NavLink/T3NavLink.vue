<script>
// Detect and render internal or external link
import Vue from 'vue'
export default {
  name: 'T3NavLink',
  extends: Vue.component('RouterLink'),
  props: {
    to: {
      type: String,
      default: '/'
    }
  },
  render (h) {
    if (typeof this.to === 'string' && this.to.match(/^((http(s)?|ftp):\/\/)|(mailto|tel):/)) {
      return h('a', {
        attrs: {
          href: this.to,
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      }, this.$slots.default)
    }

    const { tag, event, ...props } = { ...this.$props }

    return h('nuxt-link', {
      props: {
        ...{ to: this.to },
        ...props
      }
    }, this.$slots.default)
  }
}
</script>
