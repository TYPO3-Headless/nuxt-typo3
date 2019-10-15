// Default backend layout
// Display one column (colPos0)
import baseBackendLayout from './mixins/baseBe'
export default {
  extends: baseBackendLayout,
  render(createElement, ctx) {
    return createElement('div', [
      createElement('ce-renderer', {
        props: {
          content: this.content.colPos0
        }
      })
    ])
  }
}
