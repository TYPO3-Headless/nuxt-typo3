import type { NuxtError } from '#app'
import type { T3ContentElement } from './T3ContentElement'
import type { T3CeBaseProps } from './content'
import type { T3Link } from './T3Link'
import type { T3File } from './T3File'
export * from './T3Link'
export * from './T3File'
export * from './T3Gallery'
export * from './T3Menu'
export * from './T3MenuAbstract'
export * from './T3Appearance'
export * from './T3ContentElement'
export * from './T3BackendLayout'
export * from './content'

type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

export interface T3Site {
  /**
     * Base app url for handling default canonical links
  */
  baseUrl?: string
  api: {
    /**
     * TYPO3 headless API base url
     * @default 'https://api.t3pwa.com'
     */
    baseUrl: string
    /**
     * Initial headers for TYPO3 Client
     * @default: {}
     */
    headers?: Record<string, string>
    /**
     * Should use Fetch credentails?
     * @default 'omit'
     */
    credentials?: 'include' | 'omit' | 'same-origin';
    /**
     * Should proxy headers on SSR?
     * @default false
     */
    proxyReqHeaders?: false | Array<string>,
    proxyHeaders?: false | Array<string>
    /**
     * Should API make calls for each query param?
     * provide whitelist as array of string or disable
     * @default true
     */
    allowQuery?: Boolean | Array<string>,
    /**
     * Provide custom endpoints
     */
    endpoints?: {
      /**
       * initialData GET param or page
       * @default ?type=834
       */
      initialData?: string
      /**
       * InitialData fallback, eg. for static pages
       * @default /?type=834
       */
      initialDataFallback?: string | boolean
    }
  }
  /**
   * Internationalization settings
   */
  i18n: {
    /**
     * Default locale code
     * @default 'en'
     */
    default: string
    /**
     * Array of available locale codes
     * @default ['en']
     */
    locales: Array<string>
  }
  /**
   *
   */
  features?: {
    /**
     * fetch initial data on first ssr request
     * @default true
     */
    initialDataPlugin?: boolean
    /**
     * use built middleware to detect language changes
     * * @default true
     */
    i18nMiddleware?: boolean
    /**
     * show content element data on each frontend component
     */
    debug?: boolean
    /**
     * generate dynamic page key for async data
     */
    dynamicPageKey?: boolean
    /**
     * Automatically backslash API data properties to prevent SEO/crawler issues
     *
     * Search engine bots and crawlers scan JSON responses and extract strings containing
     * slashes (e.g., '/about/team', '/products/item') assuming they are valid page URLs.
     * Bots then attempt to visit these URLs, causing 404 errors when the strings are just
     * data fields (like slugs, paths in objects) and not actual accessible pages.
     *
     * This feature escapes slashes (/ -> \/) on the server to hide them from crawlers,
     * and optionally unescapes them on the client for normal display.
     *
     * Supports nested properties and arrays with wildcard notation:
     * - Simple: 'slug'
     * - Nested: 'meta.description'
     * - Arrays: 'breadcrumbs.*.title'
     * - Multiple levels: 'navigation.*.children.*.link'
     * @default undefined
     *
     * @example
     * // Apply to both pageData and initialData
     * backslashApiProperties: ['slug', 'breadcrumbs.*.title']
     *
     * @example
     * // Separate configuration with client unescaping disabled
     * backslashApiProperties: {
     *   pageDataProps: ['slug', 'navigation.*.link'],
     *   initialDataProps: ['menu.items.*.slug'],
     *   unbackslashOnClient: true // remove backslashes on client-side
     * }
     */
    backslashApiProperties?: Array<string> | {
      /** Properties to backslash in initialData */
      initialDataProps?: Array<string>
      /** Properties to backslash in pageData */
      pageDataProps?: Array<string>,
       /**
        * Whether to remove backslashes on client-side (default: false)
        * @warning Setting unbackslashOnClient to true may cause hydration mismatches
        * if the unescaped values differ from server-rendered content. Only enable if
        * you're certain the affected properties are not part of SSR HTML output.
       */
      unbackslashOnClient?: boolean
    }
  }
}

export declare type T3Sites = {
  hostname: string | Array<string>
} & T3Site

export interface T3Options extends T3Site {
  sites?: T3Sites[]
}

export interface T3RedirectData {
  redirectUrl: string
  statusCode: number
}

export interface T3Navigation {
  title: string
  link: string
  target: string
  active: number
  current: number
  spacer: number
  hasSubpages: number
  children?: T3Navigation[]
}

export interface T3I18N {
  languageId: number
  locale: string
  title: string
  navigationTitle: string
  twoLetterIsoCode: string
  hreflang: string
  direction: 'ltr' | 'rtl'
  flag: string
  link: string
  active: number
  current: number
  available: number
}
export interface T3Robots {
  noIndex: boolean
  noFollow: boolean
  [key: string]: any
}
export interface T3Meta {
  title: string
  subtitle: string
  abstract: string
  description: string
  keywords: string
  canonical: T3Link
  robots: T3Robots
  author: string
  authorEmail: string
  ogTitle: string
  ogDescription: string
  ogImage: T3File | null
  twitterTitle: string
  twitterDescription: string
  twitterCard: string
  twitterImage: T3File | null
}

export type T3HeadMeta =
  | { name: string; content: string }
  | { property: string; content: string }

export type T3HeadLink =
  | { rel: 'canonical'; href: string }
  | { rel: 'alternate'; hreflang: string; href: string }

interface T3Seo {
  title?: string
  htmlAttrs?: Record<string, any>
  bodyAttrs?: Record<string, any>
  meta?: T3HeadMeta[]
  link?: T3HeadLink[]
  [key: string]: any
}

export interface T3PageAppearance {
  layout: string
  backendLayout: string
  [key: string]: any
}

export interface T3Page extends T3RedirectData {
  id: number
  type: string
  slug: string
  media: any[]
  meta?: T3Meta
  seo?: T3Seo
  categories: string
  breadcrumbs: any[]
  appearance: T3PageAppearance
  content: {
    [key: string]: T3ContentElement<T3CeBaseProps>[]
  }
  i18n: T3I18N[]
}

export interface T3InitialData {
  navigation: T3Navigation[]
  i18n: T3I18N[]
  [key: string]: any
}

export interface T3ErrorData {
  initialData: T3InitialData
  pageData: T3Page
}
export interface T3Error extends NuxtError<T3ErrorData> {
  data: T3ErrorData
}
export interface ModuleOptions extends Partial<T3Options> {

}

export interface T3RuntimeConfig {
  public?: {
    typo3?: ModuleOptions
  }
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    typo3: ModuleOptions
  }
  interface RuntimeConfig {
    typo3: DeepPartial<ModuleOptions>
  }
  interface PublicRuntimeConfig {
    typo3: ModuleOptions
  }
  interface ConfigSchema {
    runtimeConfig: T3RuntimeConfig
  }
}

// Augmenting `PageMeta` also types `route.meta`, because Nuxt declares
// `RouteMeta extends UnwrapRef<PageMeta>`. This makes the flags discoverable
// both in `definePageMeta({ ... })` and when reading `route.meta`.
declare module '#app' {
  interface PageMeta {
    /**
     * Marks a route as handled by Nuxt-TYPO3. The module sets this on its
     * default catch-all route. Set it yourself (`definePageMeta({ t3Page: true })`)
     * when you re-implement the catch-all page, so server-side page resolution
     * still runs. Routes without this flag are left untouched by the module.
     */
    t3Page?: boolean
    /**
     * Set to `false` to skip the initial-data fetch for this route while still
     * resolving TYPO3 page data. Defaults to enabled when omitted.
     */
    t3InitialData?: boolean
  }
}
