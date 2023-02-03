import type { FetchOptions } from 'ohmyfetch'
import { $fetch } from 'ohmyfetch'
import { defu } from 'defu'
import { T3Site } from '../../types'
import type { T3InitialData, T3Page } from '../../types'

export interface T3Api {
  $fetch: <T>(request: RequestInfo, options?: FetchOptions<'json'>) => Promise<T>
  siteOptions: T3Site
  initialDataEndpoint: string
  fetchOptions?: FetchOptions<'json'>
  ssrHeaders?: Record<string, string>
  filterQuery: (path: string) => string
  getPage(path: string, options?: FetchOptions<'json'>): Promise<T3Page>
  getInitialData(
    path: string,
    options?: FetchOptions<'json'>
  ): Promise<T3InitialData>
}

export class T3ApiClient implements T3Api {
  private _$fetch: typeof $fetch
  initialDataEndpoint: string
  ssrHeaders: Record<string, string> = {}
  fetchOptions: FetchOptions<'json'> = {
    headers: {}
  }

  constructor (
    siteOptions: T3Site,
    fetchOptions?: FetchOptions<'json'>,
    ssrHeaders?: Record<string, string>
  ) {
    this.siteOptions = siteOptions
    this.initialDataEndpoint = siteOptions.api.endpoints!.initialData!
    this.fetchOptions = fetchOptions!
    this.ssrHeaders = ssrHeaders!

    // internal instance for using with merged options
    this._$fetch = $fetch.create({
      baseURL: siteOptions.api.baseUrl,
      headers: this.fetchOptions.headers,
      credentials: this.fetchOptions.credentials,
      retry: false
    })
  }

  siteOptions: T3Site

  $fetch <T> (
    request: RequestInfo,
    options?: FetchOptions<'json'>
  ): Promise<T> { return this._$fetch(request, this.getOptions(options)) }

  /**
   * Get TYPO3 Page data
   * @param {string} path
   * @param {FetchOptions} options
   * @returns {Promise<T3Page>} pageData promise
   */
  getPage (path: string, options?: FetchOptions<'json'>): Promise<T3Page> {
    return this.$fetch(this.filterQuery(path), this.getOptions(options))
  }

  /**
   * Get initial data
   * @param {string} path
   * @param {Fetchoptions} options
   * @returns {Promise<T3InitialData>} initialData promise
   */
  getInitialData (
    path: string,
    options?: FetchOptions<'json'>
  ): Promise<T3InitialData> {
    return this.$fetch(
      `${path}${this.initialDataEndpoint}`,
      this.getOptions(options)
    )
  }

  /**
   * Set options
   * @returns void
   */
  setHeaders (fetchOptions: Record<string, string>) {
    this.fetchOptions.headers = defu(fetchOptions, this.fetchOptions.headers)
  }

  /**
   * Merge fetch options with TYPO3 client setup
   * @param {FetchOptions} options
   * @returns {FetchOptions} merged options
   */
  getOptions (options?: FetchOptions<'json'>): FetchOptions<'json'> {
    return defu(options, this.fetchOptions, {
      headers: this.ssrHeaders
    }) as FetchOptions<'json'>
  }

  /**
   * Trim not whitelisted queries defined in api options
   * @param {String} path Page path
   * @returns {String} trimmed path
   */
  filterQuery (path: string): string {
    const { baseUrl, allowQuery } = this.siteOptions.api

    if (allowQuery && allowQuery === true) {
      return path
    }

    const url = new URL(path, baseUrl)

    if (!allowQuery) {
      return url.pathname
    }

    const params = url.searchParams
    const defaultAcceptedQuery = 'type'

    if (allowQuery && Array.isArray(allowQuery)) {
      Array.from(params).forEach(([key]) => {
        if (allowQuery.includes(key) || key === defaultAcceptedQuery) {
          return
        }
        params.delete(key)
      })
      return url.pathname + url.search
    }

    return path
  }
}
