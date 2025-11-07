import type { $Fetch, FetchContext, FetchOptions } from 'ofetch'
import { $fetch } from 'ofetch'
import { cleanDoubleSlashes, parseQuery, parseURL, filterQuery, getQuery, stringifyQuery, withQuery } from 'ufo'
import { defu } from 'defu'
import type { T3Site, T3Page, T3InitialData } from '../../module'

export interface T3Api {
  $fetch: <T>(request: RequestInfo, options?: FetchOptions) => Promise<T>
  siteOptions: T3Site
  apiHeaders: Record<string, string>
  initialDataEndpoint: string
  fetchOptions?: FetchOptions
  filterQuery: (path: string) => string
  mapResponseHeaders: (headers: Headers) => Record<string, string>
  getPage(path: string, options?: FetchOptions): Promise<T3Page>
  getInitialData(
    path: string,
    options?: FetchOptions
  ): Promise<T3InitialData>
}

export class T3ApiClient implements T3Api {
  private _$fetch: $Fetch
  initialDataEndpoint: string
  fetchOptions: FetchOptions = {
    headers: {}
  }

  constructor (
    siteOptions: T3Site
  ) {
    this.siteOptions = siteOptions
    this.initialDataEndpoint = siteOptions.api.endpoints!.initialData!
    this.apiHeaders = {}

    this.fetchOptions = {
      baseURL: this.siteOptions.api.baseUrl,
      headers: this.siteOptions.api.headers,
      credentials: this.siteOptions.api.credentials,
      retry: false
    }

    this._$fetch = $fetch.create(this.fetchOptions)
  }

  apiHeaders: Record<string, string>
  siteOptions: T3Site

  $fetch <T> (
    request: RequestInfo,
    options?: FetchOptions
  ): Promise<T> {
    return this._$fetch<T>(request, this.getOptions(options) as FetchOptions<'json'>)
  }

  /**
   * Get TYPO3 Page data
   * @param {string} path
   * @param {FetchOptions} options
   * @returns {Promise<T3Page>} pageData promise
   */
  getPage (path = '/', options?: FetchOptions) {
    return this.$fetch<T3Page>(this.filterQuery(path), this.getOptions(options))
  }

  /**
   * Get initial data
   * @param {string} path
   * @param {Fetchoptions} options
   * @returns {Promise<T3InitialData>} initialData promise
   */
  getInitialData (
    path: string = '/',
    options?: FetchOptions
  ): Promise<T3InitialData> {
    const { pathname, search } = parseURL(path)
    const queryFromPath = parseQuery(search)
    const mergedQuery = { ...queryFromPath, ...(options?.query ?? {}) }

    const fullPath = withQuery(pathname, mergedQuery)

    return this.$fetch(
      this.filterQuery(cleanDoubleSlashes(fullPath)),
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
  getOptions (options?: FetchOptions): FetchOptions {
    return defu(options, {
      onResponse: async (context: FetchContext) => {
        if (this.fetchOptions.onResponse) {
          const interceptors = Array.isArray(this.fetchOptions.onResponse)
            ? this.fetchOptions.onResponse
            : [this.fetchOptions.onResponse]

          for (const interceptor of interceptors) {
            await interceptor(context as any)
          }
        }

        if (import.meta.server && Array.isArray(this.siteOptions.api?.proxyHeaders) && context.response?.headers) {
          this.apiHeaders = this.mapResponseHeaders(context.response.headers)
        }
      }
    }, this.fetchOptions)
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

    const fullUrl = new URL(path, baseUrl).href
    const defaultAcceptedQuery = 'type'

    if (!allowQuery) {
      return filterQuery(fullUrl, key => key === defaultAcceptedQuery)
    }

    if (Array.isArray(allowQuery)) {
      return filterQuery(fullUrl, (key) => {
        return allowQuery.includes(key) || key === defaultAcceptedQuery
      })
    }

    return path
  }

  /**
   * Map API Headers to setup on Response
   * @param resHeaders
   * @returns {Headers} headers
   */
  mapResponseHeaders (resHeaders: Headers): Record<string, string> {
    const proxyHeaders = this.siteOptions.api?.proxyHeaders as string[]

    if (!proxyHeaders || !proxyHeaders.length) {
      return {}
    }

    let headers = Array.from(resHeaders.entries())
    headers = headers.filter(header => proxyHeaders.includes(header[0]))
    return Object.fromEntries(new Headers(headers))
  }
}
