import consola from 'consola'
import axios from 'axios'
export default class API {
  /**
   * typo3 API Constructor
   *
   * @constructor
   * @param {Object} options
   */
  constructor(options = {}) {
    this.$http = axios.create({
      ...options.api
    })
    this.options = options
    this.getInitialData = this.getInitialData.bind(this)
  }

  /**
   * Get initial menu and available languages
   *
   * @param {Object} params
   * @returns {AxiosPromise} promise
   */
  getInitialData(
    params = {
      path: ''
    }
  ) {
    return this.$http
      .get(`${params.path}/${this.options.api.endpoints.initialData}`)
      .catch(error => {
        consola.info('Check your API host: ', error.config.url)
        consola.error(new Error(error))
        throw error
      })
  }

  /**
   * Get page content
   *
   * @param {String} path Page path
   * @returns {AxiosPromise} promise
   */
  getPage(path) {
    return this.$http.get(path)
  }
}
