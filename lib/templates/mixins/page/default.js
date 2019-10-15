import getMeta from '../seo/getMeta'
export default {
  mixins: [getMeta],
  head() {
    return this.getMeta()
  },
  asyncData({ pageContent, backendLayout }) {
    if (pageContent) {
      return {
        page: pageContent,
        backendLayout
      }
    }
  }
}
