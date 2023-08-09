# useT3DynamicComponent

Instead of additional T3DynamicComponent which is responsible for rendering <pre>`<component is="{Type}"/>`</pre> we use `useT3DynamicComponent` composable. You can use it to resolve any `T3` component. 

`T3Renderer.vue` use this composable to render content elements based on provided type.

## Type
```ts
export const useT3DynamicComponent = (
  {
    type,
    prefix,
    mode
  }: DynamicComponentParams = {
    type: 'Default',
    prefix: 'T3Ce',
    mode: 'Lazy'
  }
) : ConcreteComponent | string
```
## Render Dynamic Content Element by type
```vue
<template>
  <component
    :is="useT3DynamicComponent({
      type: element.type
      prefix: 'T3Ce',
      mode: 'Lazy'
    })"/>
</template>
```

or just 

```vue
<template>
  <component :is="useT3DynamicCe(element.type)" />
</template>
```

## Render Dynamic Backend layout

```vue
<template>
  <component :is="useT3DynamicBl(pageData.value.appearance.backendLayout)" />
</template>
```
