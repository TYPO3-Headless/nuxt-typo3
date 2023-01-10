import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defu } from 'defu'

import {
  defineNuxtModule,
  addPlugin,
  extendPages,
  addImportsDir,
  createResolver,
  installModule
} from '@nuxt/kit'
import type { $Fetch, FetchOptions } from 'ohmyfetch'
import { T3ApiClient } from './runtime/lib/apiClient'
import type { T3InitialData, T3Page, T3RedirectData, ModuleOptions } from './types'

export * from './types'

export interface ModuleHooks {
  't3:initialData': (initialData: T3InitialData) => Promise<void> | void
  't3:page': (pageData: T3Page) => Promise<void> | void
  't3:i18n': (newLocale: string, oldLocale: string) => Promise<void> | void
  't3:middleware:redirect': (
    redirectData: T3RedirectData
  ) => Promise<void> | void
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-typo3',
    configKey: 'typo3'
  },
  defaults: {
    api: {
      baseUrl: 'https://api.t3pwa.com',
      headers: {},
      credentials: 'omit',
      proxyHeaders: false
    },
    i18n: {
      default: 'pl',
      locales: ['pl']
    },
    endpoints: {
      initialData: '?type=834',
      initialDataFallback: '/?type=834'
    },
    features: {
      pageMiddleware: true,
      i18nMiddleware: true,
      debug: false
    }
  },
  hooks: {
    't3:initialData': () => {},
    't3:page': () => {},
    't3:i18n': () => {},
    'components:dirs' (dirs) {
      dirs.push({
        path: fileURLToPath(new URL('./runtime/components', import.meta.url)),
        extensions: ['vue', 'ts'],
        ignore: ['**/*.types.ts'],
        global: true
      })
    }
  },
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    const resolver = createResolver(import.meta.url)
    nuxt.options.pages = true
    nuxt.options.build.transpile.push(runtimeDir)

    if (options.sites) {
      options.sites = mergeSiteOptions(options)
    }

    nuxt.options.runtimeConfig.public.typo3 = defu(
      nuxt.options.runtimeConfig.public.typo3,
      options
    )

    addPlugin(resolve(runtimeDir, 'plugin'))
    installModule('vite-plugin-vue-type-imports/nuxt')

    addImportsDir(resolver.resolve('runtime/composables/**/*'))

    extendPages((pages) => {
      pages.push({
        name: 'page',
        path: '/:slug(.*)*',
        file: resolve(__dirname, './runtime/pages/T3Page.vue')
      })
    })
  }
})

const mergeSiteOptions = (options: ModuleOptions) => {
  return options.sites?.map((site) => {
    const _options = { ...options }
    delete _options.sites
    return defu(site, _options)
  })
}

declare module '#app' {
  interface NuxtApp {
    $typo3: {
      api: T3ApiClient
      $fetch: $Fetch
    }
    _t3State: {
      client: FetchOptions<'json'>
    }
  }

  interface RuntimeNuxtHooks extends ModuleHooks {}
}

declare module '@nuxt/schema' {
  interface NuxtHooks extends ModuleHooks {}

  interface ConfigSchema {
    runtimeConfig: {
      public?: {
        typo3?: ModuleOptions
      }
    }
  }
}
