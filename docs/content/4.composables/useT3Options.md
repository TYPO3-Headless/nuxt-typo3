# useT3Options

This composable provides access to configuration

## Type

```ts
export const useT3Options = (): {
  /**
   * Get all module options
   */
  options: T3Options
  /**
   * Get site settings
   */
  getSiteOptions: (domain?: string) => T3Site
  /**
   * Get current site options computed value
   */
  currentSiteOptions: ComputedRef<T3Site>
} 
```

## Example
```vue
<script lang="ts" setup>
const { options } = useT3Options()
const { api, i18n } = options
</script>
```

::alert{type="warning"}
Please be aware, the `@t3headless/nuxt-typo3` is available as Early Access Program and API might change.
::
