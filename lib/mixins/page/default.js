import getMeta from '../seo/getMeta'
export default {
  mixins: [getMeta],
  layout ({ layout }) {
    return layout
  },
  head () {
    return this.getMeta()
  },
  asyncData ({ t3page }) {
    if (t3page) {
      return {
        t3page
      }
    }
  }
}
