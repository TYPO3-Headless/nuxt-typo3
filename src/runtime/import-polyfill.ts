import { defineNuxtPlugin } from '#app'
import { defineAsyncComponent } from 'vue'

const typo3Components = import.meta.glob('./components/**/*.vue') as Record<string, () => Promise<Component>>

export default defineNuxtPlugin((nuxtApp) => {
  const { component: registerComponent } = nuxtApp.vueApp

  const registeredComponents = Object.keys(nuxtApp.vueApp._context.components)

  Object.entries(typo3Components).forEach(([path, importFn]) => {
    const name = path.split('/').at(-1)?.split('.').at(0) ?? path

    if (registeredComponents.includes(name)) {
      return
    }

    registerComponent(name, defineAsyncComponent(importFn))
    registerComponent(`Lazy${name}`, defineAsyncComponent(importFn))
  })
})
