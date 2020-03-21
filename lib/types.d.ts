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
      /** register your callback method on locale change */
      onLocaleChange(oldLocale: string, newLocale: string): void,
      /** register your callback method before locale change */
      beforeLocaleChange(oldLocale: string, newLocale: string): void
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
    registerComponents?: boolean,
    /**
     * Register all default layouts
     * you can disable it by setup on false
     */
    registerLayouts?: boolean,
    /**
     * Additional domains configuration
     */
    domains?: Types.Domain[]
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
      /** Call method on locale change */
      onLocaleChange(oldLocale: string, newLocale: string): void,
      /** Call method before locale change */
      beforeLocaleChange(oldLocale: string, newLocale: string): void
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
      getPage(path: string): Promise<void>,
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

  namespace Response {
    interface Page {
      /** page settings */
      page: object,
      /** page content */
      content: object,
      /** available page languages */
      languages: object[]
    }
  }
}

declare module '@nuxt/vue-app' {
  interface Context {
    /** frontend layout */
    layout: string,
    /** backend layout */
    backendLayout: string,
    /** page content */
    pageContent: TYPO3.Response.Page
  }

  interface NuxtAppOptions {
    /** TYPO3 plugin */
    $typo3: TYPO3.Plugin
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    /** frontend layout */
    layout: string,
    /** backend layout */
    backendLayout: string,
    /** page content */
    pageContent: TYPO3.Response.Page
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
