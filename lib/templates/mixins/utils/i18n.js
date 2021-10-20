export default {
  methods: {
    /**
     * Get current locale code
     *
     * @param {Boolean} avoidDefault - set false if you want to get default locale code
     * @returns {String} locale code
     * @public
     */
    getCurrentLocaleCode (avoidDefault = true) {
      const locale = this.$store.state.typo3.locale
      return avoidDefault && locale === this.$typo3.i18n.defaultLocale
        ? ''
        : locale
    }
  }
}
