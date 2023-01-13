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
    this.trimNotWhitelistedQuery = this.trimNotWhitelistedQuery.bind(this)
  }

  /**
   * Trim not whitelisted queries defined in api options
   *
   * @param {String} path Page path
   * @returns {String} trimmed path
   */
  trimNotWhitelistedQuery (path) {
    const { baseURL, paramsWhitelist } = this.options
    const url = new URL(`${baseURL}${path}`)
    const params = url.searchParams
    const defaultAcceptedQuery = 'type'

    if (paramsWhitelist && Array.isArray(paramsWhitelist)) {
      Array.from(params).forEach(([key]) => {
        if (paramsWhitelist.includes(key) || key === defaultAcceptedQuery) {
          return
        }

        params.delete(key)
      })

      return `${url.pathname}${url.search}`
    }

    return path
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
    return this.$http.get(URI)
  }

  /**
   * Get page content
   *
   * @param {String} path Page path
   * @returns {AxiosPromise} promise
   */
  getPage (path) {
    const trimmedPath = this.trimNotWhitelistedQuery(path)
    return this.$http.get(trimmedPath)
  }
}
