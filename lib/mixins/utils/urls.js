import i18n from './i18n'
export default {
  mixins: [i18n],
  methods: {
    /**
     * Get base url + optional path
     *
     * @param {String} path
     * @returns {String} Full base url + path
     * @public
     */
    getBaseUrl (path = '') {
      return `${this.$typo3.options.baseURL}/${path}`
    },

    /**
     * Get api base url + optional path
     *
     * @param {String} path
     * @returns {String} Full api base url + path
     * @public
     */
    getApiBaseUrl (path = '') {
      return `${this.$typo3.options.api.baseURL}/${path}`
    },

    /**
     * Get home url with correct locale
     *
     * @returns {String} Homepag url
     * @public
     */
    getHomeUrl (locale = this.getCurrentLocaleCode()) {
      return `/${locale}`
    }
  }
}
