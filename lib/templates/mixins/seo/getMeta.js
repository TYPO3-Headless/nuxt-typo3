export default {
  methods: {
    getMeta() {
      const baseUrl = this.$typo3.options.baseURL
      const meta = {
        title:
          this.page.page.meta.title ||
          this.page.page.title ||
          this.$nuxt.$options.head.title,
        meta: [
          {
            hid: 'generator',
            name: 'generator',
            content: 'TYPO3 CMS x TYPO3PWA'
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content:
              this.page.page.meta.title ||
              this.page.page.title ||
              this.$nuxt.$options.head.title
          }
        ]
      }

      if (this.page.page.meta.description.length) {
        meta.meta.push({
          hid: 'description',
          name: 'description',
          content: this.page.page.meta.description
        })
        meta.meta.push({
          hid: 'og:description',
          name: 'og:description',
          content: this.page.page.meta.description
        })
      }

      if (this.page.page.meta.canonical.link.length) {
        meta.link = [
          {
            rel: 'canonical',
            href: `${baseUrl}${this.page.page.meta.canonical.link}`
          }
        ]
      }

      return meta
    }
  }
}
