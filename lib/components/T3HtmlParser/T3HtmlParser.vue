<template>
  <!-- eslint-disable-next-line vue/no-v-html vue/no-v-text-v-html-on-component -->
  <component :is="tag" v-html="content" />
</template>

<script>
// source: https://github.com/nuxt/nuxtjs.org/blob/master/components/HtmlParser.vue
export default {
  name: 'T3HtmlParser',
  props: {
    /**
     * HTML Content to parse
     */
    content: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  watch: {
    content: 'contentUpdated'
  },
  mounted () {
    this.$nextTick(this.addListeners)
  },
  beforeDestroy () {
    this.removeListeners()
  },
  methods: {
    navigate (event) {
      let target = event.target
      let i = 0
      // Go throught 5 parents max to find a tag
      while (
        i < 5 &&
        !(target instanceof HTMLAnchorElement) &&
        target.parentNode
      ) {
        target = target.parentNode
        i++
      }
      // If target is still not a link, ignore
      if (!(target instanceof HTMLAnchorElement)) { return }
      const href = target.getAttribute('href')
      // Get link target, if local link, navigate with router link
      if (href && href[0] === '/') {
        event.preventDefault()
        this.$router.push(href)
      }
    },
    contentUpdated () {
      this.removeListeners()
      this.$nextTick(() => {
        this.addListeners()
      })
    },
    addListeners () {
      this._links = this.$el.getElementsByTagName('a')
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].addEventListener('click', this.navigate, false)
      }
    },
    removeListeners () {
      if (this._links) {
        for (let i = 0; i < this._links.length; i++) {
          this._links[i].removeEventListener('click', this.navigate, false)
        }
        this._links = []
      }
    }
  }
}
</script>
