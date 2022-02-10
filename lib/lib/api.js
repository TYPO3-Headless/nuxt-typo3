import logger from '~typo3/lib/logger'
export default class API {
  /**
   * typo3 API Constructor
   *
   * @constructor
   * @param {Object} options
   */
  constructor (options = {}, axios) {
    this.$http = axios.create(options)
    this.options = options
    this.getInitialData = this.getInitialData.bind(this)
    this.getPage = this.getPage.bind(this)
  }

  /**
   * Get initial menu and available languages
   *
   * @param {Object} params
   * @returns {AxiosPromise} promise
   */
  getInitialData (
    params = {
      path: ''
    }
  ) {
    const URI = encodeURI(`${params.path}${this.options.endpoints.initialData}`)
    return this.$http
      .get(URI)
      .catch((error) => {
        logger.warn(`Can't get the initial config of ${this.options.baseURL}`)
        logger.error(new Error(error))
        throw error
      })
  }

  /**
   * Get page content
   *
   * @param {String} path Page path
   * @returns {AxiosPromise} promise
   */
  getPage (path) {
    return this.$http.get(path)
  }
}
