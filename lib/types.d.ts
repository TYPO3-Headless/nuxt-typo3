export namespace TYPO3 {
  namespace Types {
    interface Domain {
      /*** Domain name eg. mysite.com */
      name: string,
      /** Full url eg. https://mysite.com */
      baseURL: string,
      /** API for specific domain eg. https://api.mysite.com */
      api: Options.Api,
      /** I18n settings */
      i18n: Options.I18n
    }
  }

  namespace Options {
    interface I18n {
      /** all available locales, ISO 3166-1 alpha-2 code */
      locales: string[],
      /** default/fallback locale */
      defaultLocale: string,
    }

    interface Endpoints {
      /** TYPO3 API endpoint to get initial menu/locales data */
      initialData: string
    }

    interface Api {
      /** Full url eg. https://mysite.com */
      baseURL: string,
      /** TYPO3 Endpoints configuration */
      endpoints?: Options.Endpoints
    }
  }

  interface Options {
    /** Full url eg. https://mysite.com */
    baseURL: string,
    /** TYPO3 API Configuration */
    api: Options.Api
    /** Custom frontend layout mapping */
    layouts?: object,
    /** I18n configuration */
    i18n: Options.I18n,
    /**
     * Register all components by default
     * you can disable it by setup on false
     */
    components?: boolean,
    /**
     * Enable form components with vee-validate
     */
    forms?: boolean,
    /**
     * Additional domains configuration
     */
    domains?: Types.Domain[]
    /**
     * Enable forwarding headers on SSR
     */
    headers?: boolean | Array<string>,
  }

  namespace Plugin {
    interface I18n {
      /** Gett current lcale code */
      readonly locale: string,
      /** Get current available locales */
      readonly locales: string[],
      /** Get currentlocale code for URL path purposes */
      getLocaleCodeByPath(): string,
      /** Get current locale code */
      getLocaleByPath(): string,
      /** Set current locale and get initialData */
      setLocale(localeCode: string, updateInitialData: boolean): Promise<void>,
    }

    interface Domains {
      /** get all domain lists */
      list: Types.Domain[],
      /** get current domain */
      getDomain(): Types.Domain | boolean
      /** set current doamin */
      setDomain(domain: Types.Domain): void
    }

    interface Api {
      /** get available languages and menu data for current page and locale */
      getInitialData(params: { path: string }): Promise<void>,
      /** get page response  */
      getPage(path: string): Promise<TYPO3.Response>,
      /** set different API options */
      setOptions(options: Options.Api): void
    }
  }

  interface Plugin {
    api: Plugin.Api,
    i18n: Plugin.I18n,
    domains: Plugin.Domains,
    options: Options,
  }

  interface Typo3Link {
    href: string,
    target: string | null,
    class: string | null,
    title: string | null,
    linkText: string,
    additionalAttributes: []
  }

  interface Metadata {
    title: string,
    subtitle: string,
    abstract: string,
    description: string,
    keywords: string,
    canonical: TYPO3.Typo3Link,
    robots: {
      noIndex: boolean
      noFollow: boolean
    },
    author: string,
    authorEmail: string,
    ogTitle: string,
    ogDescription: string,
    ogImage: object | null,
    twitterTitle: string,
    twitterDescription: string,
    twitterCard: string,
    twitterImage: object | null
    schema: string
  }

  interface Breadcrumbs {
    title: string,
    link: string,
    target: string,
    active: number,
    current: number,
    spacer: number
  }

  interface Appearance {
    appearance: string
    backendLayout: string
  }

  interface Response {
    /** typo3 page id */
    id: number
    type: string
    slug: string
    /** page metadata */
    meta: Metadata,
    /** breadcrumbs data */
    breadcrumbs: TYPO3.Breadcrumbs
     /** page appearance */
    appearance: TYPO3.Appearance
    /** page content */
    content: object,
  }
}

declare module '@nuxt/vue-app' {
  interface Context {
    /** frontend layout */
    layout: string,
    /** backend layout */
    backendLayout: string,
    /** page content */
    pageContent: TYPO3.Response
  }

  interface NuxtAppOptions {
    /** TYPO3 plugin */
    $typo3: TYPO3.Plugin
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    /** page content */
    t3page: TYPO3.Response
  }
  interface NuxtAppOptions {
    /** TYPO3 plugin */
    $typo3: TYPO3.Plugin
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $typo3: TYPO3.Plugin
  }
}
