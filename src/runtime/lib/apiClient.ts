import type { FetchContext, FetchOptions, FetchResponse } from 'ofetch'
import { $fetch } from 'ofetch'
import { cleanDoubleSlashes, getQuery } from 'ufo'
import { defu } from 'defu'
import { T3Site } from '../../types'
import type { T3InitialData, T3Page } from '../../types'

export interface T3Api {
  $fetch: <T>(request: RequestInfo, options?: FetchOptions<'json'>) => Promise<T>
  siteOptions: T3Site
  apiHeaders: Record<string, string>
  initialDataEndpoint: string
  fetchOptions?: FetchOptions<'json'>
  filterQuery: (path: string) => string
  mapResponseHeaders: (headers: Headers) => Record<string, string>
  getPage(path: string, options?: FetchOptions<'json'>): Promise<T3Page>
  getInitialData(
    path: string,
    options?: FetchOptions<'json'>
  ): Promise<T3InitialData>
}

export class T3ApiClient implements T3Api {
  private _$fetch: typeof $fetch
  initialDataEndpoint: string
  fetchOptions: FetchOptions<'json'> = {
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
    options?: FetchOptions<'json'>
  ): Promise<T> { return this._$fetch(request, this.getOptions(options)) }

  /**
   * Get TYPO3 Page data
   * @param {string} path
   * @param {FetchOptions} options
   * @returns {Promise<T3Page>} pageData promise
   */
  getPage (path = '/', options?: FetchOptions<'json'>): Promise<T3Page> {
    return this.$fetch(this.filterQuery(path), this.getOptions(options))
  }

  /**
   * Get initial data
   * @param {string} path
   * @param {Fetchoptions} options
   * @returns {Promise<T3InitialData>} initialData promise
   */
  getInitialData (
    path = '/',
    options?: FetchOptions<'json'>
  ): Promise<T3InitialData> {
    const isQuery = getQuery(this.initialDataEndpoint)
    const initialDataPath = !Object.keys(isQuery).length ? this.initialDataEndpoint : ''

    return this.$fetch(this.filterQuery(cleanDoubleSlashes(path + initialDataPath)),
      { query: isQuery ?? {}, ...this.getOptions(options) }
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
    return defu(options, {
      onResponse: (context: FetchContext & {
        response: FetchResponse<'json'>;
    }) => {
        if (this.fetchOptions.onResponse) {
          this.fetchOptions.onResponse(context)
        }
        if (process.server && Array.isArray(this.siteOptions.api?.proxyHeaders) && context.response.headers) {
          this.apiHeaders = this.mapResponseHeaders(context.response.headers)
        }
      }
    }, this.fetchOptions) as FetchOptions<'json'>
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
