export default {
  beforeCreate () {
    Object.keys(this.$options.components).forEach((key) => {
      if (typeof this.$root.$options?.components?.[key] !== 'undefined') {
        delete this.$options?.components?.[key]
      }
    })
  }
}
