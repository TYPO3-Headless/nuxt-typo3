import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defu } from 'defu'

import {
  defineNuxtModule,
  addPlugin,
  extendPages,
  addImportsDir,
  createResolver,
  addComponentsDir
} from '@nuxt/kit'
import type { $Fetch } from 'ofetch'
import { T3ApiClient } from './runtime/lib/apiClient'
import type { T3InitialData, T3Page, T3RedirectData, ModuleOptions } from './types'

export * from './types'

export interface ModuleHooks {
  't3:initialData': (initialData: T3InitialData) => Promise<void> | void
  't3:page': (pageData: T3Page) => Promise<void> | void
  't3:i18n': (newLocale: string, oldLocale: string) => Promise<void> | void
  't3:redirect': (
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
      proxyHeaders: false,
      proxyReqHeaders: false,
      endpoints: {
        initialData: '/?type=834',
        initialDataFallback: '/?type=834'
      },
      allowQuery: true
    },
    i18n: {
      default: 'en',
      locales: ['en']
    },
    features: {
      initInitialData: true,
      i18nMiddleware: true,
      debug: false
    }
  },
  hooks: {
    't3:initialData': () => { },
    't3:page': () => { },
    't3:i18n': () => { },
    'components:dirs' (dirs) {
      dirs.push({
        path: fileURLToPath(new URL('./runtime/components', import.meta.url)),
        extensions: ['vue'],
        pathPrefix: false,
        ignore: ['**/*.types.ts'],
        global: true,
        extendComponent: (component) => {
          component.priority = -1
          return component
        }
      })
    }

  },
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    const resolver = createResolver(import.meta.url)
    nuxt.options.pages = true
    nuxt.options.alias['#typo3'] = resolve(runtimeDir)
    nuxt.options.build.transpile.push(runtimeDir)

    if (options.sites) {
      options = {
        sites: mergeSiteOptions(options)
      }
    }

    nuxt.options.runtimeConfig.public.typo3 = defu(
      nuxt.options.runtimeConfig.public.typo3,
      options
    )

    addPlugin(resolve(runtimeDir, 'plugin'))

    addImportsDir(resolver.resolve('runtime/composables/**/*'))
    addImportsDir(resolver.resolve('runtime/components/**/*'))

    addComponentsDir({
      path: fileURLToPath(new URL('./runtime/components', import.meta.url)),
      extensions: ['vue'],
      pathPrefix: false,
      ignore: ['**/*.types.ts'],
      global: true
    })

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
    const defaulOptions = { ...options }
    delete defaulOptions.sites
    const siteOptions = defu(site, defaulOptions)
    if (site.i18n?.locales) {
      siteOptions.i18n.locales = [...new Set([...defaulOptions.i18n!.locales, ...site.i18n?.locales])]
    }
    return siteOptions
  })
}

declare module '#app' {
  interface NuxtApp {
    $typo3: {
      api: T3ApiClient
      $fetch: $Fetch
    }
  }

  interface RuntimeNuxtHooks extends ModuleHooks { }
}

declare module '@nuxt/schema' {
  interface NuxtHooks extends ModuleHooks { }

  interface ConfigSchema {
    runtimeConfig: {
      public?: {
        typo3?: ModuleOptions
        typo3current: any
      }
    }
  }
}
