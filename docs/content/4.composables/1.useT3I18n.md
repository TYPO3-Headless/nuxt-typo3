# useT3i18n

This composable provides methods to deal with internationalization

## Type
```ts
export const useT3i18n = (
  path?: string | undefined
): {
  /**
   * Get current locale code by path
   */
  getLocale: (path?: string) => string
  /**
   * Set new locale and update initialData
   */
  setLocale: (localeCode: string) => void
  /**
   * Initialize locale (check if different than default)
   */
  initLocale: () => void
  /**
   * Return current locale state
   */
  currentLocale: Ref<string>
  /**
   * Get current locale object
   */
  getCurrentLocaleData: () => T3I18N | null
  /**
   * Return locale code for url path
   */
  getPathWithLocale: (path?: string) => string
}
```

## Example
```vue
<script lang="ts" setup>
const { currentLocale } = useT3i18n()
</script>
```

::alert{type="warning"}
Please be aware, the `@t3headless/nuxt-typo3` is available as Early Access Program and API might change.
::
