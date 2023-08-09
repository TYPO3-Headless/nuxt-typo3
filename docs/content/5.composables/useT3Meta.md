# useT3Meta

Composable to get all meta information

## Type

```ts
export const useT3Meta = (): {
  metaData: ComputedRef<T3Meta>
  /**
   * TYPO3 head attributes for Nuxt Head
   */
  headData: ComputedRef<ReactiveHead>
  /**
   * TYPO3 Twitter meta data
   */
  twitter: ComputedRef<Meta[]>
  /**
   * TYPO3 Open Graph meta data
   */
  opengraph: ComputedRef<Meta[]>
  /**
   * TYPO3 base attributes (description, robots, generator)
   */
  base: ComputedRef<Meta[]>
} 
```

## Example
```vue
<script setup lang="ts">
const { headData } = useT3Meta()
useHead(headData)
</script>

```

::alert{type="warning"}
Please be aware, the `@t3headless/nuxt-typo3` is available as Early Access Program and API might change.
::
