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
      initialDataFallback?: string
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
     * fetch initial data before each page render
     * @default true
     */
    initInitialData?: boolean
    /**
     * use built middleware to detect language changes
     * * @default true
     */
    i18nMiddleware?: boolean
    /**
     * show content element data on each frontend component
     */
    debug?: boolean
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
  meta: T3Meta
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

export interface ModuleOptions extends Partial<T3Options> {
  fallback?: {
    useLegacyAsyncDataPageKey?: boolean
  }
}

export interface T3RuntimeConfig {
  public?: {
    typo3?: ModuleOptions
    typo3Internals?: {
      useLegacyAsyncDataPageKey?: boolean
    }
  }
}

declare module '@nuxt/schema' {
  interface ConfigSchema {
    runtimeConfig: T3RuntimeConfig
  }
}
